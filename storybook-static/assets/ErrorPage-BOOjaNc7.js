import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Va as init_development, go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, x as errorPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import "react";
//#region src/_scss/pages/errorPage/errorPage.scss
var require_errorPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/errorPage/ErrorPage.jsx
var import_jsx_runtime, ErrorPage;
//#endregion
__esmMin((() => {
	init_development();
	init_PageWrapper();
	init_metaTagHelper();
	import_jsx_runtime = require_jsx_runtime();
	require_errorPage();
	ErrorPage = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
		pageName: "Error",
		classNames: "usa-da-error-page",
		metaTagProps: errorPageMetaTags,
		title: "Page Not Found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "main-content",
			className: "main-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sorry, the page you are looking for does not exist." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					srcSet: "img/errorPage/ErrorPage404-mobile.webp 1x, img/errorPage/ErrorPage404-desktop.webp 2x",
					type: "image/webp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "img/errorPage/ErrorPage404-02.svg",
					alt: "404"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Please check that you typed the address correctly, go back to your previous page or try these helpful links instead:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Back to Home"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:usaspending.help@fiscal.treasury.gov?subject=${encodeURIComponent("Report an Error")}`,
						children: "Report Problem"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						children: "Search Award Data"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://api.usaspending.gov/",
						rel: "noopener noreferrer",
						target: "_blank",
						children: "Learn about our APIs"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://fiscalservice.force.com/usaspending/s/",
						rel: "noopener noreferrer",
						target: "_blank",
						children: "Visit our Community Page"
					}) })
				] })
			]
		})
	});
}))();
export { ErrorPage as default };
