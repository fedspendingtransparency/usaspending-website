import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/what-is-a-recipient.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		img: "img",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"When ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/search",
				children: "searching"
			}),
			" for government spending data on USAspending.gov, you’re very likely to see the word “recipient.”"
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Whether you’re using our filters to refine your search query or viewing the prime award results table, recipients are a key component of USAspending data. But what is a recipient?" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"On ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/search",
				children: "USAspending.gov"
			}),
			", a recipient is a company, organization, individual, or government entity (i.e., state, local, tribal, federal, or foreign), that receives funding from the U.S. government."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "what-is-a-recipient.png",
			alt: "What is a Recipient"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Think of our open data like the government’s credit card statement: there’s both the dollar amount that’s been paid ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "outlay",
				label: "(outlays)"
			}),
			" and the name of the entity that received the payment ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "recipient",
				label: "(recipient)"
			}),
			"."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Understanding who the recipient is helps you to follow the money and see exactly how your tax dollars are being spent, right down to who received federal funding." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To learn more about the different types of recipients, visit the “Recipient Data Elements” section of the ",
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
