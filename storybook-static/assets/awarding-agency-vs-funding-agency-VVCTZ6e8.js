import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/awarding-agency-vs-funding-agency.mdx
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
			"In the “Agency” section of USAspending’s ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "advanced search"
			}),
			", you’ll see the option to search by Awarding Agency or Funding Agency."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "But what’s the difference between these two terms? And how does it affect your search for U.S. government spending data?" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "awarding-agency-funding-agency.png",
			alt: "Awarding Agency vs. Funding Agency"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Defining Each Term" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Let’s start with the definitions for both terms." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "Awarding Agency" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"An ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "awarding-agency",
				label: "Awarding Agency"
			}),
			"is the agency that issues and administers the award. This agency usually pays for the funding out of its own budget. In some cases, the money is financed by another agency, called the Funding Agency."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "Funding Agency" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"A ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "funding-agency",
				label: "Funding Agency"
			}),
			"pays for the majority of funds for an award out of its budget. Typically, the Funding Agency is the same as the Awarding Agency. In some cases, one agency will administer an award (Awarding Agency) and another agency will pay for it (Funding Agency)."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Putting It All Together" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Put simply: the awarding agency decides who gets the award, and the funding agency is the one that pays for it." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "For example, the General Services Administration (GSA), which manages federal buildings and contracts, may award a lease for a new office space. However, the Department of Veterans Affairs (VA), which provides services to veterans, would supply the funding because the building will be used for veterans’ programs." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Ready to try it out? Explore agency-level spending in our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/agency",
				children: "Agency Profiles"
			}),
			" or visit our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Advanced Search"
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
