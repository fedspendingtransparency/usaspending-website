import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/understanding-our-trusted-data.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		img: "img",
		li: "li",
		ol: "ol",
		p: "p",
		...props.components
	};
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [(0, import_jsx_runtime.jsx)(_components.a, {
			href: "https://www.usaspending.gov",
			children: "USAspending.gov"
		}), " is the official source for tracking federal government spending—but what makes our data different, where does it come from, and what makes it trustworthy?"] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Our site receives data directly from authoritative federal systems, providing reliability and transparency, as mandated by the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.grants.gov/learn-grants/grant-policies/data-act-2014.html",
				children: "DATA Act of 2014"
			}),
			"."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "understanding-our-trusted-data.png",
			alt: "Understanding Our Trusted Data"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Here is what happens behind the scenes:" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.ol, { children: [
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [
				"\n",
				(0, import_jsx_runtime.jsx)(_components.p, { children: "Federal agencies report detailed financial data through systems like the Financial Assistance Broker Submission (FABS) and the Procurement Data Standard (PDS), which collect standardized, machine-readable data on contracts, grants, loans, and other spending activities." }),
				"\n"
			] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [
				"\n",
				(0, import_jsx_runtime.jsx)(_components.p, { children: "Data from government systems flow into USAspending in one of two ways:" }),
				"\n",
				(0, import_jsx_runtime.jsxs)(_components.ol, { children: [
					"\n",
					(0, import_jsx_runtime.jsxs)(_components.li, { children: [
						"\n",
						(0, import_jsx_runtime.jsx)(_components.p, { children: "Submitted by federal agencies" }),
						"\n"
					] }),
					"\n",
					(0, import_jsx_runtime.jsxs)(_components.li, { children: [
						"\n",
						(0, import_jsx_runtime.jsx)(_components.p, { children: "Extracted from government sources" }),
						"\n"
					] }),
					"\n"
				] }),
				"\n"
			] }),
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [
				"\n",
				(0, import_jsx_runtime.jsx)(_components.p, { children: "Before publication, the data undergoes rigorous validation checks by the Department of the Treasury and the Office of Management and Budget (OMB), while agencies are held accountable through data quality reviews and quarterly certifications by senior officials" }),
				"\n"
			] }),
			"\n"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"This transparent pipeline—from agency reporting to public release—ensures that the data on ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov",
				children: "USAspending.gov"
			}),
			" is both reliable and up to date. Whether you’re a student researching a project, a small business owner looking for government contracts, or a curious citizen keeping tabs on spending in your community—USAspending.gov empowers the public with open data they can depend on."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To learn all about the data sources and more, visit the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://onevoicecrm.my.site.com/usaspending/s/",
				children: "USAspending Community"
			}),
			" today."
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
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
}))();
export { MDXContent as default };
