import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Bn as init_Icons, Fa as init_slideoutHelper, Ga as useLocation, Ha as Link, Ia as showSlideout, Kr as FontAwesomeIcon, Mn as Glossary, Va as init_development, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/GlossaryLink.jsx
var import_jsx_runtime, propTypes, GlossaryLink;
var init_GlossaryLink = __esmMin((() => {
	init_development();
	init_dist();
	init_slideoutHelper();
	init_Icons();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		term: PropTypes.string.isRequired,
		hidden: PropTypes.bool,
		label: PropTypes.string,
		alt: PropTypes.string,
		showHoverText: PropTypes.bool,
		displayIcon: PropTypes.bool,
		boldLink: PropTypes.bool
	};
	GlossaryLink = ({ term, hidden, label = "", alt = "", showHoverText = false, displayIcon = true, boldLink = false }) => {
		const { pathname, search } = useLocation();
		new URLSearchParams(search).set("glossary", term);
		const glossaryUrl = `${pathname}`;
		const stopBubble = (e) => {
			e.preventDefault();
			e.stopPropagation();
			showSlideout("glossary", { url: term });
		};
		const innerContent = () => {
			if (showHoverText) {
				if (label) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					label,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glossary, { alt })
				] });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glossary, { alt });
			}
			if (label) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				label,
				" ",
				displayIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "book" })
			] });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "book" });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: glossaryUrl,
			className: `usda-glossary-link ${boldLink ? "usa-bold-link" : ""}`,
			"aria-label": "Open the Glossary",
			tabIndex: hidden ? -1 : 0,
			onClick: stopBubble,
			replace: true,
			alt,
			children: innerContent()
		});
	};
	GlossaryLink.propTypes = propTypes;
}));
//#endregion
export { init_GlossaryLink as n, GlossaryLink as t };
