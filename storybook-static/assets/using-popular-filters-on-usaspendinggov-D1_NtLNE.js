import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/using-popular-filters-on-usaspendinggov.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		img: "img",
		li: "li",
		p: "p",
		ul: "ul",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Federal spending touches nearly every community in the nation—but with billions of records available, finding the details that matter to you can feel like looking for a needle in a haystack." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"USAspending’s ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Advanced Search"
			}),
			" feature is designed to change that. With a set of powerful filters, you can pinpoint exactly where and how federal dollars are spent."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "using-popular-filters.png",
			alt: "Using Popular Filters on USAspending.gov"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Here’s how some of the most popular filters work:" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.ul, { children: [
			"\n",
			(0, import_jsx_runtime.jsx)(_components.li, { children: "Keyword: Enter a word or phrase, such as “renewable energy,” “STEM education,” or “highway construction,” to quickly locate spending tied to specific programs, topics, or project descriptions." }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "recipient",
				label: "Recipient",
				boldLink: true
			}), ": Search for awards made to a particular organization, company, university, or government entity. This is especially useful for understanding who is receiving federal contracts or grants."] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "fiscal-year-fy",
				label: "Fiscal Year",
				boldLink: true
			}), ": Narrow results by the year in which funds were obligated. Tracking by fiscal year helps you see year-over-year trends, shifts in priorities, or changes in funding levels."] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "sub-award",
				label: "Sub-award",
				boldLink: true
			}), ": Go beyond prime award data to see how recipients pass funding along to other organizations, revealing a fuller picture of how federal money flows."] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "award-id",
				label: "Award ID",
				boldLink: true
			}), ": Every federal award has a unique identifier. If you have this ID, you can jump straight to the details for that specific contract, grant, or loan."] }),
			"\n"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"The real strength of Advanced Search lies in combining filters. For example, you might search for all “clean energy” awards in Fiscal Year 2024 made to ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/featured-content/data-definitions/what-is-a-recipient",
				children: "recipients"
			}),
			" in your state, then drill down to see which subrecipients benefit. Or you could use the ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "award-id",
				label: "Award ID"
			}),
			" to confirm details you found in a news article."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Whether you’re curious how federal spending affects you, researching a federal program, or checking facts for a story to report, Advanced Search makes big datasets easy to understand and use." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Start exploring at ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "USAspending.gov/search"
			}),
			" and discover how to turn federal spending data into knowledge you can use. Also, stay tuned for future articles offering a deeper dive on how to use various search filters."
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
