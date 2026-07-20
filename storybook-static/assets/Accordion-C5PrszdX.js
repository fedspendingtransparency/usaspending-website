import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Kr as FontAwesomeIcon, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import { useState } from "react";
import PropTypes from "prop-types";
//#region src/_scss/elements/_accordion.scss
var init__accordion = __esmMin((() => {}));
//#endregion
//#region src/js/components/sharedComponents/accordion/Accordion.jsx
var import_jsx_runtime, propTypes, Accordion;
var init_Accordion = __esmMin((() => {
	init_dist();
	init__accordion();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		title: PropTypes.any.isRequired,
		children: PropTypes.element || PropTypes.string,
		iconClassName: PropTypes.string,
		contentClassName: PropTypes.string,
		closedIcon: PropTypes.string,
		openIcon: PropTypes.string,
		setOpen: PropTypes.func,
		openObject: PropTypes.bool,
		selectedChipCount: PropTypes.number
	};
	Accordion = ({ title, children, closedIcon = "plus", openIcon = "minus", iconClassName, setOpen = () => {}, contentClassName = "", openObject = false, selectedChipCount = 0 }) => {
		const [closed, setClosed] = useState(!openObject);
		const sectionClassName = !closed ? `open accordion--open accordion` : `accordion`;
		const buttonAriaLabel = closed ? "Open toggle" : "Close toggle";
		const toggleOpen = (e) => {
			e.stopPropagation();
			setClosed((prevClosed) => !prevClosed);
			if (openObject) setOpen();
			else setOpen((prevOpen) => !prevOpen);
		};
		const keyClickToggle = (e) => {
			if (e.key === "Enter") e.stopPropagation();
		};
		const selectedChip = (count) => count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "selected-chip-count",
			children: ` ${count} selected`
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "accordion-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-testid": "accordion",
				className: sectionClassName,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: toggleOpen,
					onKeyDown: keyClickToggle,
					className: "heading",
					children: [title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "heading--chip-container",
						children: [selectedChip(selectedChipCount), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: toggleOpen,
							onKeyDown: keyClickToggle,
							className: "toggle",
							"aria-label": buttonAriaLabel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
								icon: closedIcon,
								className: iconClassName || "plus"
							}, "open"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
								icon: openIcon,
								className: iconClassName || "minus"
							}, "close")]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `content ${contentClassName}`,
					children
				})]
			})
		});
	};
	Accordion.propTypes = propTypes;
}));
//#endregion
export { init_Accordion as n, Accordion as t };
