import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // -----------------------------
  // 1️⃣ Detect protected routes
  // -----------------------------
  const isShopPath = pathname.startsWith("/shop/");
  const shopMatch = pathname.match(/^\/shop\/(shop_[A-Za-z0-9_-]+)/);;
  const requestedShopId = shopMatch?.[1] || null;
  const isValidShopIdFormat = Boolean(requestedShopId);

  const isAdminRoute = pathname.startsWith("/admin");
  const isShopApi = pathname.startsWith("/api/shop");
  const isAdminApi = pathname.startsWith("/api/admin");

  const isPrivate = isShopPath || isAdminRoute || isShopApi || isAdminApi;

  if (!isPrivate) return NextResponse.next();

  // -----------------------------
  // 2️⃣ JWT auth check
  // -----------------------------
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let user;
  try {
    const { payload } = await jwtVerify(token, secret);
    user = payload; // { email, name, role, iat, exp }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // -----------------------------
  // 3️⃣ Admin protection
  // -----------------------------
  if (isAdminRoute || isAdminApi) {
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // -----------------------------
  // 4️⃣ SHOP pages protection
  // -----------------------------
  if (isShopPath) {
    if (user.role !== "SHOP") {
      return NextResponse.redirect(new URL("/", req.url));
    }


    if (!isValidShopIdFormat) {
      return NextResponse.redirect(new URL("/", req.url));
    }


    // --------------------------------------------------
    // ⭐ 5️⃣ CALL INTERNAL API FOR SHOP + SUBSCRIPTION CHECK
    // --------------------------------------------------
    const resp = await fetch(`${req.nextUrl.origin}/api/internal/subscription-check`, {
      method: "POST",
      body: JSON.stringify({
        shopId: requestedShopId,
        userEmail: user.email, // check ownership inside API
      }),
      headers: { "Content-Type": "application/json" }
    });

    const { status } = await resp.json();


    // -----------------------------
    // 🚦 Handle Subscription Result
    // -----------------------------

    if (status === "NO_SHOP" || status === "NOT_OWNER") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (status === "NO_SUBSCRIPTION") {
      return NextResponse.redirect(new URL("/plans", req.url));
    }

    if (status === "TRIAL_ACTIVE") {
      return NextResponse.next();
    }

    if (status === "EXPIRED") {
      return NextResponse.redirect(new URL("/billing", req.url));
    }

    if (status === "PAID_ACTIVE") {
      return NextResponse.next();
    }

    // fallback (should never happen)
    return NextResponse.redirect(new URL("/", req.url));
  }

  // -----------------------------
  // 6️⃣ SHOP API protection
  // -----------------------------
  if (isShopApi) {
    if (user.role !== "SHOP") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
