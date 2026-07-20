import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/celebrating-small-business-week.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		h2: "h2",
		img: "img",
		li: "li",
		ol: "ol",
		p: "p",
		ul: "ul",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [(0, import_jsx_runtime.jsx)(_components.a, {
			href: "https://www.sba.gov/national-small-business-week",
			children: "National Small Business Week"
		}), " shines a spotlight on the entrepreneurs and innovators who drive America’s economy. From neighborhood start-ups to national companies, small businesses are the backbone of communities across the country."] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Federal spending plays an important role in helping those businesses grow. Through ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "contract",
				label: "contracts"
			}),
			"  and ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "grant",
				label: "grants"
			}),
			" , federal agencies work with small businesses to deliver key resources like technology solutions, infrastructure improvements, and community programs."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "small-business-week.png",
			alt: "National Small Business Week"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Searching Small Business Spending on USAspending.gov" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"On ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov",
				children: "USAspending.gov"
			}),
			", anyone can explore how federal dollars flow into America’s small businesses. Using the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Advanced Search"
			}),
			" and the Spending by ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "recipient",
				label: "Recipient Type"
			}),
			" filter, you can see which agencies award the most funding to small businesses, where those awards are concentrated, and what types of work they support."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Getting Started" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.ol, { children: [
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [
				"Visit our ",
				(0, import_jsx_runtime.jsx)(_components.a, {
					href: "https://www.usaspending.gov/search?hash=8270cdedffc237b3f7cf6ef106f99bad",
					children: "Advanced Search page"
				}),
				": This feature lets you build custom searches using filters such as award type, agency, location, and recipient details."
			] }),
			"\n",
			(0, import_jsx_runtime.jsx)(_components.li, { children: "Select the Award Type: Under Award Type, choose Contracts or Grants (or both) to narrow your search to the types of awards small businesses typically receive." }),
			"\n",
			(0, import_jsx_runtime.jsx)(_components.li, { children: "Filter by Recipient Type: Scroll to Recipient Type and select Small Business. This filter shows awards reported to businesses that meet the federal small business criteria." }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [
				"Refine Your Search: Add more filters to narrow your results.",
				"\n",
				(0, import_jsx_runtime.jsxs)(_components.ul, { children: [
					"\n",
					(0, import_jsx_runtime.jsx)(_components.li, { children: "Agency: to see which agencies award the most to small businesses." }),
					"\n",
					(0, import_jsx_runtime.jsx)(_components.li, { children: "Place of Performance: to view results by state or city." }),
					"\n",
					(0, import_jsx_runtime.jsx)(_components.li, { children: "Fiscal Year: to explore trends over time." }),
					"\n"
				] }),
				"\n"
			] }),
			"\n",
			(0, import_jsx_runtime.jsx)(_components.li, { children: "Explore and Download Results: View results in charts, tables, or maps, and click any award to see details like recipient name, funding agency, amount, and description. You can also download the data for deeper analysis or reporting." }),
			"\n"
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "By making this information open and accessible, USAspending.gov helps connect the dots between federal investment and local impact, celebrating the role small businesses play in powering innovation and opportunity across America." })
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
