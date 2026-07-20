import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Oa as init_development, ka as Link, ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import "react";
import PropTypes, { oneOfType } from "prop-types";
//#region src/js/components/sharedComponents/Note.jsx
var import_jsx_runtime, propTypes, Note, dodNote;
var init_Note = __esmMin((() => {
	init_development();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		title: PropTypes.string,
		message: oneOfType([PropTypes.string, PropTypes.element])
	};
	Note = ({ title, message }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "default-note",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title || "NOTE:" }),
			"\xA0",
			message
		]
	});
	Note.propTypes = propTypes;
	dodNote = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		"There is a 90-day delay in displaying contract award data, subcontract data, and Account Breakdown by Award (File C) data for the Department of Defense (DOD). For more information, visit our ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			className: "usa-bold-link",
			to: "/about?section=data-quality",
			children: "About Page"
		}),
		"."
	] });
}));
//#endregion
export { dodNote as n, init_Note as r, Note as t };
