module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/components/plans/plans-section.jsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*#__PURE__*/ const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
_jsxDEV(Card, {
    onClick: ()=>setSelectedPlan(plan.name),
    className: `cursor-pointer flex flex-col h-full border-2 transition-all 
    ${selectedPlan === plan.name ? "border-blue-500 shadow-md" : "border-gray-200"}`,
    children: [
        /*#__PURE__*/ _jsxDEV(CardHeader, {
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ _jsxDEV(CardTitle, {
                            className: "text-2xl",
                            children: plan.name
                        }, void 0, false, {
                            fileName: "[project]/components/plans/plans-section.jsx",
                            lineNumber: 14,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        plan.popular && /*#__PURE__*/ _jsxDEV(Badge, {
                            className: "bg-blue-600 text-white",
                            children: "Popular"
                        }, void 0, false, {
                            fileName: "[project]/components/plans/plans-section.jsx",
                            lineNumber: 17,
                            columnNumber: 9
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/plans/plans-section.jsx",
                    lineNumber: 13,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-blue-600 text-3xl font-bold mt-2",
                    children: plan.price
                }, void 0, false, {
                    fileName: "[project]/components/plans/plans-section.jsx",
                    lineNumber: 21,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-gray-500",
                    children: plan.description
                }, void 0, false, {
                    fileName: "[project]/components/plans/plans-section.jsx",
                    lineNumber: 22,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            ]
        }, void 0, true, {
            fileName: "[project]/components/plans/plans-section.jsx",
            lineNumber: 12,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV(CardContent, {
            className: "flex-1 mt-4 space-y-2",
            children: plan.features.map((feat)=>/*#__PURE__*/ _jsxDEV("div", {
                    className: "flex items-center gap-2 text-gray-700",
                    children: [
                        /*#__PURE__*/ _jsxDEV("span", {
                            className: "text-green-500",
                            children: "✔"
                        }, void 0, false, {
                            fileName: "[project]/components/plans/plans-section.jsx",
                            lineNumber: 32,
                            columnNumber: 9
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("span", {
                            children: feat
                        }, void 0, false, {
                            fileName: "[project]/components/plans/plans-section.jsx",
                            lineNumber: 33,
                            columnNumber: 9
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, feat, true, {
                    fileName: "[project]/components/plans/plans-section.jsx",
                    lineNumber: 28,
                    columnNumber: 7
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e))
        }, void 0, false, {
            fileName: "[project]/components/plans/plans-section.jsx",
            lineNumber: 26,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV(CardFooter, {
            className: "mt-auto",
            children: /*#__PURE__*/ _jsxDEV(Button, {
                className: "w-full",
                variant: selectedPlan === plan.name ? "default" : "outline",
                children: selectedPlan === plan.name ? "Selected" : "Choose"
            }, void 0, false, {
                fileName: "[project]/components/plans/plans-section.jsx",
                lineNumber: 40,
                columnNumber: 5
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        }, void 0, false, {
            fileName: "[project]/components/plans/plans-section.jsx",
            lineNumber: 39,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
    ]
}, plan.name, true, {
    fileName: "[project]/components/plans/plans-section.jsx",
    lineNumber: 1,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/app/plans/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlansPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$plans$2f$plans$2d$section$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/plans/plans-section.jsx [app-rsc] (ecmascript)");
;
;
function PlansPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$plans$2f$plans$2d$section$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/plans/page.jsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/plans/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/plans/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1ee72f37._.js.map