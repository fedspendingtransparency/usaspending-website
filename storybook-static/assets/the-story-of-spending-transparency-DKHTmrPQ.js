import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/the-story-of-spending-transparency.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		h2: "h2",
		img: "img",
		p: "p",
		strong: "strong",
		...props.components
	};
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"The U.S. is one of the few countries worldwide that makes federal spending data accessible to the public. Before ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov",
				children: "USAspending.gov"
			}),
			" existed, much of this information was difficult for the average person to find or understand. Transparency in federal spending didn’t happen overnight—it’s the result of nearly two decades of progress in opening government data to the public."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Data Transparency Timeline" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			(0, import_jsx_runtime.jsx)(_components.strong, { children: "2006" }),
			": Congress passed the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.govinfo.gov/content/pkg/PLAW-109publ282/pdf/PLAW-109publ282.pdf",
				children: "Federal Funding Accountability and Transparency Act (FFATA)"
			}),
			" with a simple but transformative goal: give Americans an easy way to see how their tax dollars are spent. The law required the creation of a public website showing federal contracts, grants, and other awards."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [(0, import_jsx_runtime.jsx)(_components.strong, { children: "2007" }), ": USAspending.gov launched, making detailed federal award level data available to the public for the first time. As technology and data standards evolved, so did the vision for transparency."] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			(0, import_jsx_runtime.jsx)(_components.img, {
				src: "usaspending2007.png",
				alt: "The USAspending.gov home page when the site launched in December 2007"
			}),
			"\n",
			(0, import_jsx_runtime.jsx)("span", {
				className: "caption",
				children: "The USAspending.gov home page when the site launched in December 2007"
			})
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			(0, import_jsx_runtime.jsx)(_components.strong, { children: "2014" }),
			": The ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.congress.gov/113/bills/s994/BILLS-113s994enr.pdf",
				children: "Digital Accountability and Transparency Act of 2014 (DATA Act)"
			}),
			" was passed, expanding FFATA’s foundation by requiring all federal agencies to report spending data in a consistent open format. This allowed USAspending.gov to grow beyond award data, to connect appropriations, obligations, and outlays across the federal spending lifecycle."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			(0, import_jsx_runtime.jsx)(_components.img, {
				src: "usaspending2014.png",
				alt: "The USAspending.gov home page in 2014"
			}),
			"\n",
			(0, import_jsx_runtime.jsx)("span", {
				className: "caption",
				children: "The USAspending.gov home page in 2014"
			})
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Today, ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov",
				children: "USAspending.gov"
			}),
			" continues to evolve as a central source for federal spending data. The site allows anyone to follow how taxpayer dollars move from Congress to agencies, recipients, and communities across the country. From research grants to infrastructure projects, the DATA Act makes this information accessible and consistent, offering a full picture of how public funds are spent."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Want to see where your tax dollars go? Try our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Advanced Search"
			}),
			" and explore government spending in your community."
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
