import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Kr as FontAwesomeIcon, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/buttons/DownloadButton508.jsx
var import_jsx_runtime, propTypes, DownloadIconButton508;
var init_DownloadButton508 = __esmMin((() => {
	init_dist();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		onClick: PropTypes.func.isRequired,
		downloadInFlight: PropTypes.bool,
		isEnabled: PropTypes.bool,
		key: PropTypes.string,
		downloadIcon: PropTypes.string
	};
	DownloadIconButton508 = ({ onClick, downloadInFlight, isEnabled = true, key, downloadIcon = "download" }) => {
		const startDownload = (e) => {
			e.preventDefault();
			if (!downloadInFlight && isEnabled) onClick();
		};
		let wrapperclass = "usa-download-icon ";
		if (downloadInFlight || !isEnabled) wrapperclass += " disabled";
		const buttonText = downloadInFlight ? "Preparing Download..." : "Download";
		const icon = downloadInFlight ? "spinner" : downloadIcon;
		const downloadButton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "usa-button",
			title: buttonText,
			"aria-label": !isEnabled ? buttonText : "",
			disabled: downloadInFlight,
			onClick: startDownload,
			tabIndex: !isEnabled ? -1 : 0,
			"aria-hidden": !isEnabled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
				icon: ["fa", icon],
				spin: downloadInFlight
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buttonText })]
		}, key);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: wrapperclass,
			children: downloadButton()
		});
	};
	DownloadIconButton508.propTypes = propTypes;
}));
//#endregion
export { init_DownloadButton508 as n, DownloadIconButton508 as t };
