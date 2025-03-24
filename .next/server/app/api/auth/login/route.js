"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_bless_OneDrive_Desktop_dbms_project_Library_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\bless\\\\OneDrive\\\\Desktop\\\\dbms project\\\\Library\\\\app\\\\api\\\\auth\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_bless_OneDrive_Desktop_dbms_project_Library_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNibGVzcyU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q2RibXMlMjBwcm9qZWN0JTVDTGlicmFyeSU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYmxlc3MlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNkYm1zJTIwcHJvamVjdCU1Q0xpYnJhcnkmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQzJDO0FBQ3hIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlicmFyeS1tYW5hZ2VtZW50Lz84ZjY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGJsZXNzXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcZGJtcyBwcm9qZWN0XFxcXExpYnJhcnlcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXGxvZ2luXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGJsZXNzXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcZGJtcyBwcm9qZWN0XFxcXExpYnJhcnlcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXGxvZ2luXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/jwt */ \"(rsc)/./lib/jwt.ts\");\n\n\n\nasync function POST(request) {\n    try {\n        const { email, password } = await request.json();\n        // Find user by email\n        const user = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.findUserByEmail)(email);\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid credentials\"\n            }, {\n                status: 401\n            });\n        }\n        // Verify password\n        const isValidPassword = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyPassword)(password, user.password);\n        if (!isValidPassword) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid credentials\"\n            }, {\n                status: 401\n            });\n        }\n        // Generate JWT token\n        const token = (0,_lib_jwt__WEBPACK_IMPORTED_MODULE_2__.signToken)({\n            id: user.id,\n            email: user.email,\n            role: user.role\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            token\n        });\n    } catch (error) {\n        console.error(\"Login error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNrQjtBQUN2QjtBQUU5QixlQUFlSSxLQUFLQyxPQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1GLFFBQVFHLElBQUk7UUFFOUMscUJBQXFCO1FBQ3JCLE1BQU1DLE9BQU8sTUFBTVIsMERBQWVBLENBQUNLO1FBQ25DLElBQUksQ0FBQ0csTUFBTTtZQUNULE9BQU9ULHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO2dCQUFFRSxPQUFPO1lBQXNCLEdBQy9CO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxrQkFBa0I7UUFDbEIsTUFBTUMsa0JBQWtCLE1BQU1WLHlEQUFjQSxDQUFDSyxVQUFVRSxLQUFLRixRQUFRO1FBQ3BFLElBQUksQ0FBQ0ssaUJBQWlCO1lBQ3BCLE9BQU9aLHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO2dCQUFFRSxPQUFPO1lBQXNCLEdBQy9CO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxxQkFBcUI7UUFDckIsTUFBTUUsUUFBUVYsbURBQVNBLENBQUM7WUFDdEJXLElBQUlMLEtBQUtLLEVBQUU7WUFDWFIsT0FBT0csS0FBS0gsS0FBSztZQUNqQlMsTUFBTU4sS0FBS00sSUFBSTtRQUNqQjtRQUVBLE9BQU9mLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUs7UUFBTTtJQUNuQyxFQUFFLE9BQU9ILE9BQU87UUFDZE0sUUFBUU4sS0FBSyxDQUFDLGdCQUFnQkE7UUFDOUIsT0FBT1YscURBQVlBLENBQUNRLElBQUksQ0FDdEI7WUFBRUUsT0FBTztRQUF3QixHQUNqQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYnJhcnktbWFuYWdlbWVudC8uL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50cz80ZjI0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgeyBmaW5kVXNlckJ5RW1haWwsIHZlcmlmeVBhc3N3b3JkIH0gZnJvbSAnQC9saWIvYXV0aCdcclxuaW1wb3J0IHsgc2lnblRva2VuIH0gZnJvbSAnQC9saWIvand0J1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHJcbiAgICAvLyBGaW5kIHVzZXIgYnkgZW1haWxcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBmaW5kVXNlckJ5RW1haWwoZW1haWwpXHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmVyaWZ5IHBhc3N3b3JkXHJcbiAgICBjb25zdCBpc1ZhbGlkUGFzc3dvcmQgPSBhd2FpdCB2ZXJpZnlQYXNzd29yZChwYXNzd29yZCwgdXNlci5wYXNzd29yZClcclxuICAgIGlmICghaXNWYWxpZFBhc3N3b3JkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiAnSW52YWxpZCBjcmVkZW50aWFscycgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIEpXVCB0b2tlblxyXG4gICAgY29uc3QgdG9rZW4gPSBzaWduVG9rZW4oe1xyXG4gICAgICBpZDogdXNlci5pZCxcclxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgIHJvbGU6IHVzZXIucm9sZSxcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdG9rZW4gfSlcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZmluZFVzZXJCeUVtYWlsIiwidmVyaWZ5UGFzc3dvcmQiLCJzaWduVG9rZW4iLCJQT1NUIiwicmVxdWVzdCIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwidXNlciIsImVycm9yIiwic3RhdHVzIiwiaXNWYWxpZFBhc3N3b3JkIiwidG9rZW4iLCJpZCIsInJvbGUiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createUser: () => (/* binding */ createUser),\n/* harmony export */   findUserByEmail: () => (/* binding */ findUserByEmail),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function hashPassword(password) {\n    const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().genSalt(10);\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(password, salt);\n}\nasync function verifyPassword(password, hashedPassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hashedPassword);\n}\nasync function createUser(name, email, regNumber, password) {\n    const hashedPassword = await hashPassword(password);\n    return prisma.user.create({\n        data: {\n            name,\n            email,\n            regNumber,\n            password: hashedPassword\n        }\n    });\n}\nasync function findUserByEmail(email) {\n    return prisma.user.findUnique({\n        where: {\n            email\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE2QjtBQUNnQjtBQUU3QyxNQUFNRSxTQUFTLElBQUlELHdEQUFZQTtBQUV4QixlQUFlRSxhQUFhQyxRQUFnQjtJQUNqRCxNQUFNQyxPQUFPLE1BQU1MLHVEQUFjLENBQUM7SUFDbEMsT0FBT0Esb0RBQVcsQ0FBQ0ksVUFBVUM7QUFDL0I7QUFFTyxlQUFlRyxlQUFlSixRQUFnQixFQUFFSyxjQUFzQjtJQUMzRSxPQUFPVCx1REFBYyxDQUFDSSxVQUFVSztBQUNsQztBQUVPLGVBQWVFLFdBQVdDLElBQVksRUFBRUMsS0FBYSxFQUFFQyxTQUFpQixFQUFFVixRQUFnQjtJQUMvRixNQUFNSyxpQkFBaUIsTUFBTU4sYUFBYUM7SUFDMUMsT0FBT0YsT0FBT2EsSUFBSSxDQUFDQyxNQUFNLENBQUM7UUFDeEJDLE1BQU07WUFDSkw7WUFDQUM7WUFDQUM7WUFDQVYsVUFBVUs7UUFDWjtJQUNGO0FBQ0Y7QUFFTyxlQUFlUyxnQkFBZ0JMLEtBQWE7SUFDakQsT0FBT1gsT0FBT2EsSUFBSSxDQUFDSSxVQUFVLENBQUM7UUFDNUJDLE9BQU87WUFBRVA7UUFBTTtJQUNqQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlicmFyeS1tYW5hZ2VtZW50Ly4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJ1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuXHJcbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKVxyXG4gIHJldHVybiBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdClcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcsIGhhc2hlZFBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGhhc2hlZFBhc3N3b3JkKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVXNlcihuYW1lOiBzdHJpbmcsIGVtYWlsOiBzdHJpbmcsIHJlZ051bWJlcjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpXHJcbiAgcmV0dXJuIHByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIGVtYWlsLFxyXG4gICAgICByZWdOdW1iZXIsXHJcbiAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRVc2VyQnlFbWFpbChlbWFpbDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgd2hlcmU6IHsgZW1haWwgfSxcclxuICB9KVxyXG59ICJdLCJuYW1lcyI6WyJiY3J5cHQiLCJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsInNhbHQiLCJnZW5TYWx0IiwiaGFzaCIsInZlcmlmeVBhc3N3b3JkIiwiaGFzaGVkUGFzc3dvcmQiLCJjb21wYXJlIiwiY3JlYXRlVXNlciIsIm5hbWUiLCJlbWFpbCIsInJlZ051bWJlciIsInVzZXIiLCJjcmVhdGUiLCJkYXRhIiwiZmluZFVzZXJCeUVtYWlsIiwiZmluZFVuaXF1ZSIsIndoZXJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/jwt.ts":
/*!********************!*\
  !*** ./lib/jwt.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"your-secret-key\";\nfunction signToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"1d\"\n    });\n}\nfunction verifyToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n    } catch (error) {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvand0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEI7QUFFOUIsTUFBTUMsYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVLElBQUk7QUFFdEMsU0FBU0csVUFBVUMsT0FBWTtJQUNwQyxPQUFPTCx3REFBUSxDQUFDSyxTQUFTSixZQUFZO1FBQUVNLFdBQVc7SUFBSztBQUN6RDtBQUVPLFNBQVNDLFlBQVlDLEtBQWE7SUFDdkMsSUFBSTtRQUNGLE9BQU9ULDBEQUFVLENBQUNTLE9BQU9SO0lBQzNCLEVBQUUsT0FBT1UsT0FBTztRQUNkLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlicmFyeS1tYW5hZ2VtZW50Ly4vbGliL2p3dC50cz9lYTIzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ3lvdXItc2VjcmV0LWtleSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaWduVG9rZW4ocGF5bG9hZDogYW55KSB7XHJcbiAgcmV0dXJuIGp3dC5zaWduKHBheWxvYWQsIEpXVF9TRUNSRVQsIHsgZXhwaXJlc0luOiAnMWQnIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiand0IiwiSldUX1NFQ1JFVCIsInByb2Nlc3MiLCJlbnYiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwic2lnbiIsImV4cGlyZXNJbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJ2ZXJpZnkiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/jwt.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbless%5COneDrive%5CDesktop%5Cdbms%20project%5CLibrary&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();