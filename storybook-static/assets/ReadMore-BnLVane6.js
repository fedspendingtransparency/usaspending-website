import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Kr as FontAwesomeIcon, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import { useState } from "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/ReadMore.jsx
/**
* ReadMore.jsx
* Created by Lizzie Salita 7/24/20
*/
var import_jsx_runtime, propTypes, ReadMore;
var init_ReadMore = __esmMin((() => {
	init_dist();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.array,
			PropTypes.string,
			PropTypes.object
		]),
		text: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
			PropTypes.array
		]),
		limit: PropTypes.number,
		initiallyExpanded: PropTypes.bool,
		inline: PropTypes.bool,
		openIcon: PropTypes.string,
		closeIcon: PropTypes.string,
		openPrompt: PropTypes.string,
		closePrompt: PropTypes.string,
		iconColor: PropTypes.string,
		id: PropTypes.string,
		additionalFunctionality: PropTypes.func,
		showPreview: PropTypes.bool,
		previewLines: PropTypes.string
	};
	ReadMore = ({ children, text, limit = 300, initiallyExpanded = false, openIcon = "", closeIcon = "", openPrompt = "", closePrompt = "", additionalFunctionality = null, id = "", showPreview = false, previewLines = "" }) => {
		const [expanded, setExpanded] = useState(!!initiallyExpanded);
		const readLess = () => {
			if (closeIcon && closePrompt) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "readMoreUpdated__button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(false);
					if (additionalFunctionality !== null) additionalFunctionality(expanded);
				},
				children: [
					closePrompt,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "usa-button-link__icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
							className: "readMoreUpdated__link-icon",
							icon: closeIcon
						})
					})
				]
			});
			else if (closeIcon) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "readMoreUpdated__button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(false);
					if (additionalFunctionality !== null) additionalFunctionality(expanded);
				},
				children: [
					"Read Less",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "usa-button-link__icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
							className: "readMoreUpdated__link-icon",
							icon: closeIcon
						})
					})
				]
			});
			else if (closePrompt) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "readMoreUpdated__button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(false);
					if (additionalFunctionality !== null) additionalFunctionality(expanded);
				},
				children: closePrompt
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "read-more-button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(false);
				},
				children: "Read Less"
			});
		};
		const readMore = () => {
			if (openPrompt && openIcon) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "readMoreUpdated__button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(true);
					if (additionalFunctionality !== null) additionalFunctionality(expanded);
				},
				children: [
					openPrompt,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "usa-button-link__icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
							className: "readMoreUpdated__link-icon",
							icon: openIcon
						})
					})
				]
			});
			else if (openPrompt) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "readMoreUpdated__button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(true);
					if (additionalFunctionality !== null) additionalFunctionality(expanded);
				},
				children: openPrompt
			});
			else if (openIcon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "readMoreUpdated__button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(true);
					if (additionalFunctionality !== null) additionalFunctionality(expanded);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "usa-button-link__icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
						className: "readMoreUpdated__link-icon",
						icon: openIcon
					})
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "read-more-button",
				onClick: (e) => {
					e.stopPropagation();
					setExpanded(true);
				},
				children: "Read More"
			});
		};
		if (expanded && children) {
			if (showPreview === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "read-more__preview-lines",
					children: previewLines
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: readLess() })
			] });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id,
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: readLess() })] });
		}
		if (!expanded && children) {
			if (showPreview === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "read-more__preview-lines",
				children: previewLines
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: readMore() })] });
		}
		if (expanded && text && text.length > limit) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "read-more__preview-lines",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: readLess() })] });
		if (!expanded && text && text.length > limit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "read-more__preview-lines",
			children: [
				`${text.substring(0, limit)}...`,
				" ",
				readMore()
			]
		}) });
		if (text && text.length <= limit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "read-more__preview-lines",
			children: text
		}) });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: readMore() });
	};
	ReadMore.propTypes = propTypes;
}));
//#endregion
export { init_ReadMore as n, ReadMore as t };
