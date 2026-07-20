import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/keons-usaspending-search.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"The reasons for visiting ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "http://www.usaspending.gov",
				children: "USAspending.gov"
			}),
			" are as unique and varied as the users themselves. Many of our users have specific, personalized searches they have carefully crafted to help them find the exact government spending data they’re looking for."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "In our feature, “My USAspending Search,” we highlight one of our users and their unique approach to searching government spending open data." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Meet Keon Muldrow, Subcenter Director for the Kansas Apex Accelerators at Johnson County Community College. In his ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.youtube.com/watch?v=3oJCWiGfl04",
				children: "Your Data, Your Story"
			}),
			" video, Keon talks about using USAspending as a first step for clients to help them search for government contracts at the federal, state, and local level."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "“With every client that I’ve sat down with, I’ve taken them to USAspending to do market research,” Keon said." }),
		"\n",
		(0, import_jsx_runtime.jsx)("iframe", {
			width: "560",
			height: "315",
			src: "https://www.youtube.com/embed/3oJCWiGfl04?si=8RihO2u60p2G9AU-",
			title: "Your Data, Your Story: Keon Muldrow",
			frameborder: "0",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
			referrerpolicy: "strict-origin-when-cross-origin",
			allowfullscreen: true
		}),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Keon walks his clients through using ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Advanced Search"
			}),
			" filters such as keywords, ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "naics",
				label: "NAICS code"
			}),
			", ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "product-or-service-code-psc",
				label: "PSC codes"
			}),
			", and ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "fiscal-year-fy",
				label: "Fiscal Year"
			}),
			"; the Award Profile pages found in his search offer additional details as to start date, end date, description, acquisition, procurement, and location. Keon uses the information from his searches to create pivot tables in Microsoft Excel to show clients spending opportunities and trends within the government and how their businesses can offer the government their product or service."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Keon’s best advice for using USAspending.gov: “Just use it!”" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "“USAspending makes it so easy to read the data to find exactly what you’re looking for to build that picture for market research,” Keon said. “It’s an all-around great resource.”" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Curious about U.S. government contracts and spending? Start your own ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "USAspending search"
			}),
			" and follow the money wherever your interests take you."
		] })
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? (0, import_jsx_runtime.jsx)(MDXLayout, {
		...props,
		children: (0, import_jsx_runtime.jsx)(_createMdxContent, { ...props })
	}) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
	throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
}))();
export { MDXContent as default };
