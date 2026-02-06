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
  `}e.s(["baseEmailTemplate",()=>t])},40743,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),o=e.i(61916),i=e.i(14444),s=e.i(37092),l=e.i(69741),d=e.i(16795),p=e.i(87718),u=e.i(95169),c=e.i(47587),x=e.i(66012),h=e.i(70101),f=e.i(26937),m=e.i(10372),g=e.i(93695);e.i(52474);var y=e.i(220),R=e.i(89171),v=e.i(21892),w=e.i(71632);async function b({to:e,name:t,shopName:r,trialEndDate:a,dashboardUrl:n}){return(0,v.sendEmail)({to:e,subject:"Welcome to Stampi! Your Shop Is Live 🎉",html:function({name:e,shopName:t,trialEndDate:r,dashboardUrl:a}){return(0,w.baseEmailTemplate)({title:"Your Shop is Live! 🎉",content:`
      <p>Hi <strong>${e}</strong>,</p>

      <p>
        Welcome to <strong>Stampi</strong>! Your shop 
        <strong>${t}</strong> has been successfully created.
      </p>

      <p>
        Your <strong>15-days free trial</strong> has officially started.
        During this period, you can explore:
      </p>

      <ul style="padding-left:18px; line-height:1.6;">
        <li>Customer visit tracking</li>
        <li>Reward & stamp management</li>
        <li>Automatic reward notifications</li>
        <li>Analytics & insights</li>
      </ul>

      <p style="margin-top:20px;">
        Your trial will end on: <strong>${r}</strong>
      </p>

      <a href="${a}"
         style="
           display:inline-block;
           padding:12px 24px;
           background:#c9a7ff;
           color:#000;
           border-radius:8px;
           text-decoration:none;
           font-weight:600;
           margin:25px 0;
         ">
        Go to Dashboard
      </a>

      <p>
        If you need help, reply to this email anytime — we’re here for you.
      </p>
    `})}({name:t,shopName:r,trialEndDate:a,dashboardUrl:n})})}async function E(e){try{let{email:t,name:r,shopName:a,trialEndDate:n,dashboardUrl:o}=await e.json();return await b({to:t,name:r,shopName:a,trialEndDate:n,dashboardUrl:o}),R.NextResponse.json({success:!0})}catch(e){return console.error("[send-welcome error]",e),R.NextResponse.json({error:"Server error"},{status:500})}}e.s(["POST",()=>E,"dynamic",0,"force-dynamic","runtime",0,"nodejs"],8437);var C=e.i(8437);let A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/email/sendWelcomeEmail/route",pathname:"/api/email/sendWelcomeEmail",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/email/sendWelcomeEmail/route.js",nextConfigOutput:"",userland:C}),{workAsyncStorage:S,workUnitAsyncStorage:T,serverHooks:k}=A;function q(){return(0,a.patchFetch)({workAsyncStorage:S,workUnitAsyncStorage:T})}async function N(e,t,a){A.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/email/sendWelcomeEmail/route";R=R.replace(/\/index$/,"")||"/";let v=await A.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:w,params:b,nextConfig:E,parsedUrl:C,isDraftMode:S,prerenderManifest:T,routerServerContext:k,isOnDemandRevalidate:q,revalidateOnlyGenerated:N,resolvedPathname:P,clientReferenceManifest:j,serverActionsManifest:O}=v,_=(0,l.normalizeAppPath)(R),H=!!(T.dynamicRoutes[_]||T.routes[P]),D=async()=>((null==k?void 0:k.render404)?await k.render404(e,t,C,!1):t.end("This page could not be found"),null);if(H&&!S){let e=!!T.routes[P],t=T.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await D();throw new g.NoFallbackError}}let I=null;!H||A.isDev||S||(I="/index"===(I=P)?"/":I);let M=!0===A.isDev||!H,U=H&&!M;O&&j&&(0,i.setReferenceManifestsSingleton)({page:R,clientReferenceManifest:j,serverActionsManifest:O,serverModuleMap:(0,s.createServerModuleMap)({serverActionsManifest:O})});let $=e.method||"GET",F=(0,o.getTracer)(),K=F.getActiveScopeSpan(),W={params:b,prerenderManifest:T,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:M,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>A.onRequestError(e,t,a,k)},sharedContext:{buildId:w}},L=new d.NodeNextRequest(e),Y=new d.NodeNextResponse(t),z=p.NextRequestAdapter.fromNodeNextRequest(L,(0,p.signalFromNodeResponse)(t));try{let i=async e=>A.handle(z,W).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=F.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${$} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${R}`)}),s=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var o,l;let d=async({previousCacheEntry:r})=>{try{if(!s&&q&&N&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await i(n);e.fetchMetrics=W.renderOpts.fetchMetrics;let l=W.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=W.renderOpts.collectedTags;if(!H)return await (0,x.sendResponse)(L,Y,o,W.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(o.headers);d&&(t[m.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&W.renderOpts.collectedRevalidate,a=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:W.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:q})},k),t}},p=await A.handleResponse({req:e,nextConfig:E,cacheKey:I,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:q,revalidateOnlyGenerated:N,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:s});if(!H)return null;if((null==p||null==(o=p.value)?void 0:o.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",q?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,h.fromNodeOutgoingHttpHeaders)(p.value.headers);return s&&H||u.delete(m.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,f.getCacheControlHeader)(p.cacheControl)),await (0,x.sendResponse)(L,Y,new Response(p.value.body,{headers:u,status:p.value.status||200})),null};K?await l(K):await F.withPropagatedContext(e.headers,()=>F.trace(u.BaseServerSpan.handleRequest,{spanName:`${$} ${R}`,kind:o.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},l))}catch(t){if(t instanceof g.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:q})}),H)throw t;return await (0,x.sendResponse)(L,Y,new Response(null,{status:500})),null}}e.s(["handler",()=>N,"patchFetch",()=>q,"routeModule",()=>A,"serverHooks",()=>k,"workAsyncStorage",()=>S,"workUnitAsyncStorage",()=>T],40743)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__3db4b89f._.js.map