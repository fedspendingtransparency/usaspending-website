import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Dr as Xa, Kr as FontAwesomeIcon, Nr as init_index_es, cr as init_socialShare, go as require_jsx_runtime, qr as init_dist, ur as newSocialShareOptionsWithCopy } from "./index.js-Dk2VDaPz.js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash-es";
//#region src/js/components/sharedComponents/buttons/ShareIcon508.jsx
/**
* ShareIcon508.jsx
* Created by JD House 3/4/2026
**/
var import_jsx_runtime, propTypes, ShareIcon508;
var init_ShareIcon508 = __esmMin((() => {
	init_dist();
	init_index_es();
	init_socialShare();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		url: PropTypes.string.isRequired,
		onShareOptionClick: PropTypes.func.isRequired,
		classNames: PropTypes.string,
		dropdownDirection: PropTypes.string,
		isEnabled: PropTypes.bool,
		key: PropTypes.string
	};
	ShareIcon508 = ({ url = "", onShareOptionClick = () => {}, classNames = "", dropdownDirection = "left", isEnabled = true, key = "ShareIcon" }) => {
		const [showConfirmationText, setConfirmationText] = useState(false);
		const hideConfirmationText = debounce(() => setConfirmationText(false), 1750);
		const copyLink = async () => {
			await navigator.clipboard.writeText(url);
			setConfirmationText(true);
			onShareOptionClick("copy");
		};
		const socialShareOptions = newSocialShareOptionsWithCopy.map((option) => {
			if (option.name === "copy") return {
				...option,
				onClick: copyLink
			};
			return {
				...option,
				onClick: () => onShareOptionClick(option.name)
			};
		});
		useEffect(() => {
			if (showConfirmationText) hideConfirmationText();
			return hideConfirmationText.cancel;
		}, [hideConfirmationText, showConfirmationText]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `usda-share-icon usa-share-icon-508 
                ${!isEnabled ? "disabled" : ""} ${classNames}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "Share Input Link",
					type: "text",
					className: "share-icon-link",
					value: url,
					readOnly: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Xa, {
					dropdownDirection,
					options: socialShareOptions,
					selectedOption: "copy",
					backgroundColor: "#112F4E",
					notEnabled: !isEnabled,
					sortFn: () => 1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
						className: "share-icon",
						icon: "fa-share-nodes"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "usda-share-icon__share-text",
					children: "Share"
				}),
				showConfirmationText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "copy-confirmation",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: ["fa", "check-circle"] }),
						" ",
						"Copied!"
					]
				})
			]
		}, key);
	};
	ShareIcon508.propTypes = propTypes;
	ShareIcon508.displayName = "Share Icon";
}));
//#endregion
export { init_ShareIcon508 as n, ShareIcon508 as t };
