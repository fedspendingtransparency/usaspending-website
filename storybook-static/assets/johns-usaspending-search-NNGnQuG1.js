import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/johns-usaspending-search.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		blockquote: "blockquote",
		li: "li",
		ol: "ol",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The reasons for visiting USAspending.gov are as unique and varied as the users themselves. Many of our users have specific, personalized searches they have carefully crafted to help them find the exact government spending data they’re looking for." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "In our feature, “My USAspending Search,” we highlight one of our users and their unique approach to searching government spending open data." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Meet John Ullrich, a lecturer in the Systems and Engineering Department at the University of Arizona." }),
		"\n",
		(0, import_jsx_runtime.jsx)("iframe", {
			width: "500",
			height: "280",
			src: "https://www.youtube.com/embed/zqGDGY2Qzko",
			title: "Your Data, Your Story: John Ullrich",
			frameborder: "0",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
			referrerpolicy: "strict-origin-when-cross-origin",
			allowfullscreen: true
		}),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"In our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.youtube.com/watch?v=zqGDGY2Qzko",
				children: "Your Data, Your Story"
			}),
			" video, John shares insights on how spending flows from an awarding agency down to a specific institution or partner. USAspending’s ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/explorer",
				children: "Spending Explorer"
			}),
			" offers three ways to view this data."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.ol, { children: [
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/explorer/budget_function",
				children: "Budget Function"
			}), ": View spending grouped by a given topic, such as Natural Resources and Environment"] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/explorer/agency",
				children: "Agency"
			}), ": View spending grouped by federal agency, such as Department of Transportation"] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/explorer/object_class",
				children: "Object Class"
			}), ": View spending grouped by the types of items and services purchased by the federal government, such as personnel compensation and benefits"] }),
			"\n"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Following the money from the ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "awarding-agency",
				label: "awarding agency"
			}),
			" down to an individual grant or contract helps users see relationships and dependencies in federal spending."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"In his testimonial, John discusses how he used data from USAspending.gov to create a model of all the spending dependencies tied to a specific ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "naics",
				label: "NAICS"
			}),
			" code."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.blockquote, { children: [
			"\n",
			(0, import_jsx_runtime.jsx)(_components.p, { children: "“So that allowed for the creation of a network from an awarding agency all the way through a prime contractor and into the supplier that allowed us to understand the supply dependencies within that specific NAICS code.”" }),
			"\n"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Curious about US government spending? Start your own ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/search",
				children: "USAspending"
			}),
			" search and follow the money wherever your interests take you."
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
