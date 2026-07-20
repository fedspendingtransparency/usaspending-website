import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
//#region src/content/featuredContent/what-is-a-loan.mdx
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
		(0, import_jsx_runtime.jsx)(_components.p, { children: "There are many examples of a loan in everyday life. Some loans are simple and very temporary, such as borrowing a pen from the store cashier to sign a receipt. Some loans are longer-term and more complex, like Federal Student Aid or small business loans." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"In the world of government spending, a ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "loan",
				label: "loan"
			}),
			" is defined as “a federal award from the government that the borrower will eventually have to pay back.”"
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"On USAspending.gov’s ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "Advanced Search"
			}),
			", loans are found under Award Type; users can search for two different types of loans: direct loans and guaranteed/insured loans."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "what-is-a-loan.png",
			alt: "Illustration showing two people completing a loan transaction"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Types of Loans" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "Direct Loans" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Direct loans are those made for a specific time period with a reasonable expectation of repayment; they may or may not require interest payments." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "Guaranteed/Insured Loans" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Guaranteed or insured loans require the federal government to pay the bank and take over the loan if the borrower defaults." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "The Value of a Loan" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "There are two data elements used to measure the value of a loan: the face value of the loan and the loan subsidy cost." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "Face Value of a Loan" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The face value of a loan is the total amount of the loan." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Because federal loans are expected to be repaid, the face value of a loan is not considered federal spending (and for loan guarantees, the face value is not even directly provided by the government, but instead from a third-party financial institution)." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The face value of a loan is not included in obligations or outlays." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h3, { children: "Loan Subsidy Cost" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The loan subsidy cost is the government’s estimate of the loan’s likely cost to the government, in net present value terms.\nLoan subsidy costs can be positive, negative, or zero depending on whether the government expects to lose money, gain money, or break even on a loan." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Loan subsidy cost is calculated based on a credit model specific to the program and, in some cases, the recipient’s characteristics or credit history. Loan subsidy cost allows the government to budget for potential defaults on loans." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Additionally, positive loan subsidy costs are included in ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "obligation",
				label: "obligations"
			}),
			" and ",
			(0, import_jsx_runtime.jsx)(GlossaryLink, {
				term: "outlay",
				label: "outlays"
			}),
			"."
		] }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"To learn more about how loans are used in U.S. government spending, visit the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/federal-spending-guide",
				children: "Federal Spending Guide"
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
