import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/exploring-spending-in-your-community.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		img: "img",
		li: "li",
		ol: "ol",
		p: "p",
		...props.components
	}, { GlossaryLink } = _components;
	if (!GlossaryLink) _missingMdxReference("GlossaryLink", true);
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Federal government spending may seem like a distant or complicated topic—one that is best understood by government officials or journalists. However, that couldn’t be further from the truth!" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "You may not realize it, but government spending directly impacts your community. Whether it's funding for public schools, health services, highways, or disaster relief, federal spending plays a critical role supporting everyday services." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "exploring-spending-in-your-community.jpg",
			alt: "Exploring Spending in Your Community"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [(0, import_jsx_runtime.jsx)(_components.a, {
			href: "https://www.usaspending.gov",
			children: "USAspending.gov"
		}), " opens the door for all people to understand government spending. Here are some ways you can explore our open data:"] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.ol, { children: [
			"\n",
			(0, import_jsx_runtime.jsxs)(_components.li, { children: [
				"Use our State Profile pages to easily locate insights into the ",
				(0, import_jsx_runtime.jsx)(GlossaryLink, {
					term: "award",
					label: "awards"
				}),
				" that fall within a particular U.S. state or territory."
			] }),
			"\n",
			(0, import_jsx_runtime.jsx)(_components.li, { children: "From there, you can drill down to federal spending at the county or congressional district level." }),
			"\n",
			(0, import_jsx_runtime.jsx)(_components.li, { children: "You can also view a summary of federal spending in your state from multiple viewpoints including the state agencies receiving funds, the federal agencies distributing funds, and what the funding is specifically for." }),
			"\n"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To start viewing federal spending in your community today, visit our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/state",
				children: "State Spending Profiles"
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
