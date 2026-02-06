module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},66680,(e,t,r)=>{t.exports=e.x("node:crypto",()=>require("node:crypto"))},88947,(e,t,r)=>{t.exports=e.x("stream",()=>require("stream"))},874,(e,t,r)=>{t.exports=e.x("buffer",()=>require("buffer"))},51615,(e,t,r)=>{t.exports=e.x("node:buffer",()=>require("node:buffer"))},71632,e=>{"use strict";function t({title:e,content:t}){return`
  <!DOCTYPE html>
  <html>
    <body style="margin:0;font-family:Arial;background:#f6f9fc;padding:20px">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff;border-radius:8px;padding:24px">
              <tr>
                <td style="text-align:center;font-size:24px;font-weight:bold;color:#6247AA">
                  Stampi
                </td>
              </tr>

              <tr><td style="padding:20px 0;font-size:18px;font-weight:bold">
                ${e}
              </td></tr>

              <tr><td style="font-size:15px;color:#444">
                ${t}
              </td></tr>

              <tr><td style="padding-top:30px;font-size:12px;color:#999;text-align:center">
                \xa9 ${new Date().getFullYear()} Stampi \xb7 All rights reserved
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `}e.s(["baseEmailTemplate",()=>t])},47503,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),s=e.i(61916),o=e.i(14444),i=e.i(37092),l=e.i(69741),d=e.i(16795),u=e.i(87718),p=e.i(95169),c=e.i(47587),x=e.i(66012),h=e.i(70101),f=e.i(26937),g=e.i(10372),w=e.i(93695);e.i(52474);var m=e.i(220),R=e.i(89171),v=e.i(21892),y=e.i(71632);async function b({email:e,resetLink:t}){try{return await (0,v.sendEmail)({to:e,subject:"Reset Your Stampi Password",html:function({resetLink:e}){return(0,y.baseEmailTemplate)({title:"Reset Your Password",content:`
      <p>We received a request to reset your Stampi account password.</p>

      <p>Click the button below to reset it:</p>

      <a href="${e}"
         style="
          display:inline-block;
          padding:12px 24px;
          background:#c9a7ff;
          color:#000;
          border-radius:8px;
          text-decoration:none;
          font-weight:600;
          margin:20px 0;
        ">
        Reset Password
      </a>

      <p>If you didn't request this, you can safely ignore this email.</p>
    `})}({resetLink:t})})}catch(e){throw console.error("[Reset Password Email Error]:",e),e}}var E=e.i(54799);async function C(t){try{let{default:r}=await e.A(75296),a=await t.json();if(!a)return R.NextResponse.json({error:"Email is required"},{status:400});if(await r.user.findUnique({where:{email:a}})){let e=E.default.randomBytes(32).toString("hex"),t=E.default.createHash("sha256").update(e).digest("hex"),n=new Date(Date.now()+9e5);await r.passwordReset.deleteMany({where:{userId:a}}),await r.passwordReset.create({data:{userId:a,tokenHash:t,expiresAt:n}});let s=`https://stampi.in/reset-password?token=${e}`;await b({email:a,resetLink:s})}return R.NextResponse.json({success:!0},{status:200})}catch(e){return console.error("[forgot password error]",e),R.NextResponse.json({error:"Server error"},{status:500})}}e.s(["POST",()=>C,"dynamic",0,"force-dynamic","runtime",0,"nodejs"],729);var A=e.i(729);let P=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/auth/forgotPassword/sendLink/route",pathname:"/api/auth/forgotPassword/sendLink",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/auth/forgotPassword/sendLink/route.js",nextConfigOutput:"",userland:A}),{workAsyncStorage:k,workUnitAsyncStorage:q,serverHooks:T}=P;function S(){return(0,a.patchFetch)({workAsyncStorage:k,workUnitAsyncStorage:q})}async function N(e,t,a){P.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/auth/forgotPassword/sendLink/route";R=R.replace(/\/index$/,"")||"/";let v=await P.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:y,params:b,nextConfig:E,parsedUrl:C,isDraftMode:A,prerenderManifest:k,routerServerContext:q,isOnDemandRevalidate:T,revalidateOnlyGenerated:S,resolvedPathname:N,clientReferenceManifest:j,serverActionsManifest:O}=v,_=(0,l.normalizeAppPath)(R),H=!!(k.dynamicRoutes[_]||k.routes[N]),I=async()=>((null==q?void 0:q.render404)?await q.render404(e,t,C,!1):t.end("This page could not be found"),null);if(H&&!A){let e=!!k.routes[N],t=k.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await I();throw new w.NoFallbackError}}let D=null;!H||P.isDev||A||(D="/index"===(D=N)?"/":D);let M=!0===P.isDev||!H,U=H&&!M;O&&j&&(0,o.setReferenceManifestsSingleton)({page:R,clientReferenceManifest:j,serverActionsManifest:O,serverModuleMap:(0,i.createServerModuleMap)({serverActionsManifest:O})});let $=e.method||"GET",L=(0,s.getTracer)(),F=L.getActiveScopeSpan(),K={params:b,prerenderManifest:k,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:M,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>P.onRequestError(e,t,a,q)},sharedContext:{buildId:y}},B=new d.NodeNextRequest(e),z=new d.NodeNextResponse(t),Y=u.NextRequestAdapter.fromNodeNextRequest(B,(0,u.signalFromNodeResponse)(t));try{let o=async e=>P.handle(Y,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=L.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${$} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${R}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var s,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&T&&S&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await o(n);e.fetchMetrics=K.renderOpts.fetchMetrics;let l=K.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=K.renderOpts.collectedTags;if(!H)return await (0,x.sendResponse)(B,z,s,K.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(s.headers);d&&(t[g.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,a=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await P.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:T})},q),t}},u=await P.handleResponse({req:e,nextConfig:E,cacheKey:D,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:k,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:S,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:i});if(!H)return null;if((null==u||null==(s=u.value)?void 0:s.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(l=u.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",T?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),A&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,h.fromNodeOutgoingHttpHeaders)(u.value.headers);return i&&H||p.delete(g.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,f.getCacheControlHeader)(u.cacheControl)),await (0,x.sendResponse)(B,z,new Response(u.value.body,{headers:p,status:u.value.status||200})),null};F?await l(F):await L.withPropagatedContext(e.headers,()=>L.trace(p.BaseServerSpan.handleRequest,{spanName:`${$} ${R}`,kind:s.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},l))}catch(t){if(t instanceof w.NoFallbackError||await P.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:T})}),H)throw t;return await (0,x.sendResponse)(B,z,new Response(null,{status:500})),null}}e.s(["handler",()=>N,"patchFetch",()=>S,"routeModule",()=>P,"serverHooks",()=>T,"workAsyncStorage",()=>k,"workUnitAsyncStorage",()=>q],47503)},75296,e=>{e.v(t=>Promise.all(["server/chunks/[root-of-the-server]__7d27f5e0._.js"].map(t=>e.l(t))).then(()=>t(35508)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e760d3a._.js.map