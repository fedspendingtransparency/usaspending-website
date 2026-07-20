import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import { n as init_LegalPage, t as LegalPage } from "./LegalPage-DKNRl7ef.js";
import "react";
//#region src/js/components/about/legal/AccessibilityPage.jsx
var import_jsx_runtime, AccessibilityPage;
//#endregion
__esmMin((() => {
	init_LegalPage();
	import_jsx_runtime = require_jsx_runtime();
	AccessibilityPage = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalPage, {
		activePage: "accessibility",
		title: "Accessibility",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"The U.S. Department of the Treasury is committed to making USASpending.gov accessible to all members of the public and ensuring that it meets or exceeds the requirements of",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "about-section-content do-wrap usa-bold-link",
					target: "_blank",
					rel: "noopener noreferrer",
					href: "https://section508.gov/",
					children: "Section 508 of the Rehabilitation Act"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"To help users who are visually impaired users more easily distinguish content, we regularly test contrast and color schemes using a tool called\xA0",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "usa-bold-link",
					target: "_blank",
					rel: "noopener noreferrer",
					href: "https://webaim.org/resources/contrastchecker/",
					children: "Web Accessibility in Mind"
				}),
				". To ensure the site is accessible, we evaluate the site regularly using screen readers to check the accuracy and quality of the content and navigation. We use a variety of other techniques to ensure that all users can easily access the site; some of these include providing methods for skipping repetitive navigation and alternate text."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In addition, we've incorporated the following throughout the site:" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Text equivalents provided for non-text elements" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Colored information made available without color" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Documents can be read without a style sheet" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Text-only versions of data appear to comply with Section 508 standards, with the exception of maps" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Forms are formatted to work with assistive technology to access the information, field elements, and functionality required to complete and submit forms" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "usa-bold-link",
				href: `mailto:usaspending.help@fiscal.treasury.gov?subject=${encodeURIComponent("Contact Us")}`,
				children: "Contact us"
			}), "\xA0if you have any difficulty accessing information on USASpending.gov."] })
		]
	});
}))();
export { AccessibilityPage as default };
