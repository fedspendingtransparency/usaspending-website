import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/understanding-four-government-data-source-systems.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		h2: "h2",
		h3: "h3",
		img: "img",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"You might be wondering: where does the data on ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov",
				children: "USAspending.gov"
			}),
			" come from? Since our goal is to promote open data and foster open government, we’d love to tell you!"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/data-sources",
				children: "Data Sources page"
			}),
			" is a great place to start, so let’s dive a little deeper into what government data systems flow into USAspending.gov."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "USAspending source systems can be grouped by the type of data they provide: Account Data, Award Data, and Additional Data." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "understanding-four-government-data-source-systems.png",
			alt: "Understanding Four Government Data Source Systems"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Source Systems" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "1. Agency Budget Execution:" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Agency budget execution information (compiled in SF 133 reports) shows how agencies across the federal government spend their funding, as required by the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.whitehouse.gov/wp-content/uploads/2018/06/a11.pdf",
				children: "Office of Management and Budget's Circular A-11"
			}),
			". Some agencies submit financial data directly to the Governmentwide Treasury Account Symbol Adjusted Trial Balance System (GTAS) but not to USAspending.gov; USAspending.gov extracts data from GTAS daily."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "2. Agency Financial Systems:" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Federal agencies maintain business systems to track their own finances, such as for operational costs, employee salaries, and spending for federal awards. Data from these systems are submitted directly to USAspending.gov in accordance with the DATA Act and guidance from the Office of Management and Budget." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "3. Governmentwide Award Systems:" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Agencies maintain detailed records of their federal awards in governmentwide award systems. These award systems track obligations for ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "transaction",
				label: "award transactions"
			}),
			", as well as related data about federal awards such as recipients, locations, and purposes. Any individual award is composed of one or more transactions with a common ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "award-id",
				label: "award ID"
			}),
			"."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Separate systems exist for  ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "contract",
				label: "contract awards"
			}),
			",  ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "financial-assistance",
				label: "financial assistance awards"
			}),
			",  ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "sub-award",
				label: "sub-awards"
			}),
			", as well as recipient registration data."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "4. Additional Government Data:" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Certain agencies are considered authoritative sources for information related to the spending data that USAspending.gov publishes. USAspending.gov draws from these agencies' systems as needed to provide standardized names, codes, and element relationships." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Now that you understand the various sources from which USAspending.gov gets its data, you’re ready to start searching our site for more information on federal government spending. ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Start searching"
			}),
			" and see for yourself!"
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
