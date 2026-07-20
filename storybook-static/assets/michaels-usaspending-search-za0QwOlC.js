import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/michaels-usaspending-search.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The reasons for visiting USAspending.gov are as unique and varied as the users themselves. Many of our users have specific, personalized searches they have carefully crafted to help them find the exact government spending data they’re looking for." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "In our feature, “My USAspending Search,” we highlight one of our users and their unique approach to searching government spending open data." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Meet Michael LeJeune, a professional government contracting coach with RSM Federal." }),
		"\n",
		(0, import_jsx_runtime.jsx)("iframe", {
			width: "560",
			height: "315",
			src: "https://www.youtube.com/embed/c-bqfpWSSrI?si=fMCGiKGGDs4Mhm_d",
			title: "YouTube video player",
			frameborder: "0",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
			referrerpolicy: "strict-origin-when-cross-origin",
			allowfullscreen: true
		}),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"In our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.youtube.com/watch?v=c-bqfpWSSrI",
				children: "Your Data, Your Story video"
			}),
			", Michael shares how he uses USAspending.gov to help business owners navigate the government market and find out who’s buying what his clients are selling."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Michael appreciates that USAspending’s Advanced Search has a flexible user interface with different filters and fields, so he can adjust his searches in real time." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "“I like how I can change the fields, and thus change my report, on the fly,” Michael said." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"While conducting their market research, Michael and his clients use the Spending by Category tables in their search results to view a list of the top ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "agency",
				label: "Agencies"
			}),
			"or Awarding Sub-Agencies from highest to lowest. They can also toggle over to the ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "recipient",
				label: "Recipient"
			}),
			" table to view a list of the top recipients, or visit other tables for information based on ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "naics",
				label: "NAICS"
			}),
			" or ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "product-or-service-code-psc",
				label: "psc"
			}),
			" codes or ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "assistance-listings-cfda-program",
				label: "Assistance Listings"
			}),
			"."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Michael’s advice? Try the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "USAspending Award Search"
			}),
			" yourself."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "“Once you see it in use, lightbulbs will just go off instantly about the things you can do with this tool,” he said." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To learn more about how people are using USAspending to make data-driven decisions related to their personal and professional goals, visit our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.youtube.com/@usaspendinggov",
				children: "YouTube page"
			}),
			" for more “Your Data, Your Story” testimonials."
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
