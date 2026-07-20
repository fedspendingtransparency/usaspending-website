import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/what-is-an-award.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		img: "img",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.p, { children: "When you think of the word “award,” you might picture an actor receiving an Oscar, an athlete earning a medal at the Olympics, or even yourself earning a gold star sticker from a teacher for a job well done." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "But in the world of government spending, “award” has a very specific meaning." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "On USAspending.gov, an award is money the federal government has promised to pay a recipient." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "what-is-an-award.png",
			alt: "What is an award"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Money may be “awarded” to a company, organization, government entity (i.e., state, local, tribal, federal, or foreign), or individual. It may be ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "obligation",
				label: "obligated"
			}),
			" (promised) in the form of a contract, grant, loan, insurance, direct payment, etc."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To learn more about government spending, visit the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/federal-spending-guide",
				children: "Federal Spending Guide"
			}),
			"."
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
