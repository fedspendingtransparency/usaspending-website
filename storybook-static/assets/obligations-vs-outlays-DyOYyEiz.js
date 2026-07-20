import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/obligations-vs-outlays.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		h2: "h2",
		img: "img",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"For this series, we asked our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "mailto:usaspending.help@fiscal.treasury.gov",
				children: "Transparency Experience Desk"
			}),
			" to answer the most commonly-asked questions about USAspending.gov’s open data."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Today’s topic: Obligations and Outlays." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "You might have seen these terms floating around in your USAspending Search results; but what do they really mean? And how are they different from each other?" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "obligations-vs-outlays.png",
			alt: "Obligations vs Outlays"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Obligations" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "When funding awards, the U.S. government enters a binding agreement called an obligation. The government promises to spend the money, either immediately or in the future." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "An agency incurs an obligation, for example, when it places an order, signs a contract, awards a grant, purchases a service, or engages in other actions that require it to make a payment." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [(0, import_jsx_runtime.jsx)(GlossaryLink, {
			term: "loan-subsidy-cost",
			label: "Loan Subsidy Cost"
		}), " has a direct budgetary impact and is factored into obligations and outlays when it is positive."] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "To use a real-world example, let’s say that you promised to buy some cookies to support a local youth organization. You made this promise by filling out an order form with your name, address, and how many boxes of cookies you’d like, knowing the cookies you selected will arrive a few weeks later." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Outlays" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "An outlay occurs when federal money is actually paid out, not just promised to be paid (\"obligated\")." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "To return to the cookie sales example: this is when your cookies are delivered, and you pay for your sweet treat." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Again, your cookie order is like an obligation (a promise of spending money), and your payment for the cookies is like an outlay (money is exchanged because you received your goodies)." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To read more frequently-asked questions and browse the latest posts from users helping each other, visit the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://onevoicecrm.my.site.com/usaspending/s/",
				children: "USAspending Community"
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
