import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // -----------------------------
  // 1️⃣ Detect routes
  // -----------------------------

  // Any /shop/... url
  const isShopPath = pathname.startsWith("/shop/");

  // Valid shopId format: /shop/shop_xxxxx
  const shopMatch = pathname.match(/^\/shop\/(shop_[A-Za-z0-9]+)/);
  const requestedShopId = shopMatch?.[1] || null;
  const isValidShopIdFormat = Boolean(requestedShopId);

  const isAdminRoute = pathname.startsWith("/admin");
  const isShopApi = pathname.startsWith("/api/shop");
  const isAdminApi = pathname.startsWith("/api/admin");

  // Any private route (requires auth)
  const isPrivate = isShopPath || isAdminRoute || isShopApi || isAdminApi;

  // Public route → go through
  if (!isPrivate) {
    return NextResponse.next();
  }

  // -----------------------------
  // 2️⃣ Auth check (JWT cookie)
  // -----------------------------
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // your login is in (auth)/login → /login
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
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
    // must be SHOP user
    if (user.role !== "SHOP") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ❗ If /shop/** BUT id is NOT in "shop_..." format → INVALID → redirect home
    if (!isValidShopIdFormat) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Optional: shop ownership check if you added shopIds to JWT
    if (user.shopIds && !user.shopIds.includes(requestedShopId)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  // -----------------------------
  // 5️⃣ SHOP API
  // -----------------------------
  if (isShopApi) {
    if (user.role !== "SHOP") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// apply to all pages except static files
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
