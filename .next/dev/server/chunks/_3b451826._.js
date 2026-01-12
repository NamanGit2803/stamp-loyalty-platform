module.exports = [
"[project]/lib/prisma.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[root-of-the-server]__7d27f5e0._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/prisma.js [app-route] (ecmascript)");
    });
});
}),
"[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/node_modules_5cb7c69b._.js",
  "server/chunks/[root-of-the-server]__7e391123._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
    });
});
}),
];