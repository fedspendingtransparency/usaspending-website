import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Fr as init_dist, Pr as FontAwesomeIcon, cr as Js, ga as init_IsMobileContext, ha as IsMobileContext, ro as require_jsx_runtime, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { n as init_DownloadButton508, t as DownloadIconButton508 } from "./DownloadButton508-B7Wr-YjM.js";
import { useContext } from "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/buttons/ShareDownloadButtonGroup.jsx
/**
* ShareDownloadButtonGroup.jsx
* Created by JD House 6/22/2026
**/
var import_jsx_runtime, propTypes, ShareDownloadButtonGroup;
var init_ShareDownloadButtonGroup = __esmMin((() => {
	init_dist();
	init_index_es();
	init_IsMobileContext();
	init_DownloadButton508();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		url: PropTypes.string.isRequired,
		onShareClick: PropTypes.func.isRequired,
		className: PropTypes.string,
		hideDownload: PropTypes.bool,
		downloadLink: PropTypes.string,
		showDownloadBtn: PropTypes.bool,
		onDownloadClick: PropTypes.func,
		downloadInFlight: PropTypes.bool,
		downloadIcon: PropTypes.string
	};
	ShareDownloadButtonGroup = ({ url = "", onShareClick = () => {}, className = "", hideDownload = false, downloadLink = "", showDownloadBtn = false, onDownloadClick = () => {}, downloadInFlight, downloadIcon }) => {
		const { isMedium } = useContext(IsMobileContext);
		const dropdownDirection = isMedium ? "right" : "left";
		const getDownloadOption = () => {
			if (showDownloadBtn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "share-dl-group__download-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadIconButton508, {
					downloadInFlight,
					onClick: onDownloadClick,
					downloadIcon,
					className
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "share-dl-group__download-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: downloadLink,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "share-dl-group__download-button",
					"aria-label": "download",
					download: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
						"data-href": downloadLink,
						icon: "file-download",
						className: "share-dl-group__download-icon"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download" }) })]
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "share-dl-group",
			"data-testid": "share-dl-group",
			children: [!hideDownload && getDownloadOption(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "share-dl-group__share-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Js, {
					url,
					onShareOptionClick: onShareClick,
					colors: {
						backgroundColor: "white",
						color: "#0071bc",
						confirmationBackgroundColor: "white"
					},
					dropdownDirection,
					pickerButtonClassNames: "side-margin",
					pickerListClassNames: "padding top-margin min-width"
				})
			})]
		});
	};
	ShareDownloadButtonGroup.propTypes = propTypes;
}));
//#endregion
export { init_ShareDownloadButtonGroup as n, ShareDownloadButtonGroup as t };
