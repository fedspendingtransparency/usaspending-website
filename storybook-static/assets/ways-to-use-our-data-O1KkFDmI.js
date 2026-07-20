import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/ways-to-use-our-data.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		h2: "h2",
		img: "img",
		p: "p",
		...props.components
	};
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.p, { children: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "If you want to understand how the United States government spends your money, searching USAspending.gov provides publicly accessible and transparent open data on federal government expenditures each year." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "But what can you do with that data, and how do others use it?" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "ways-to-use-our-data.png",
			alt: "Ways to use our data"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The wealth of information on USAspending.gov supports a variety of use cases by users of diverse backgrounds, from citizens and taxpayers to researchers, journalists, small business owners, public servants, government watchdogs, and more." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Here are four ways people use our data:" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "1. Federal Spending Transparency and Accountability" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Congressional staffers and researchers use USAspending.gov to identify award recipients and spending amounts to states and congressional districts." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "2. Market Research" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Small business owners use USAspending.gov to perform market research for particular locations, industries, and set asides." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "3. Grant Opportunities and Compliance" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "State and local government agencies use USAspending.gov to research potential grant opportunities and monitor their own grants for compliance purposes." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "4. Federal Spending Trends and Stories" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Journalists use USAspending.gov to find noteworthy trends or stories about federal spending." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"How would you use USAspending.gov data? Get started by using our ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "/search",
				children: "Advanced Search"
			}),
			", and see for yourself."
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
