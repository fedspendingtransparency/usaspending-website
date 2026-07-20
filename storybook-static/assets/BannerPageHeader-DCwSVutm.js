import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Da as IsMobileContext, Kr as FontAwesomeIcon, Nr as init_index_es, Oa as init_IsMobileContext, go as require_jsx_runtime, gr as $s, qr as init_dist, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { memo, useContext } from "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/header/BannerPageHeader.jsx
var import_jsx_runtime, propTypes, BannerPageHeader;
var init_BannerPageHeader = __esmMin((() => {
	init_index_es();
	init_dist();
	init_IsMobileContext();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		kicker: PropTypes.string,
		title: PropTypes.string,
		body: PropTypes.string,
		faIcon: PropTypes.string,
		primaryColor: PropTypes.string,
		secondaryColor: PropTypes.string,
		overrideBackgroundColor: PropTypes.string,
		overrideIconColor: PropTypes.string,
		overrideKickerColor: PropTypes.string,
		overrideBoxOneColor: PropTypes.string,
		overrideBoxTwoColor: PropTypes.string,
		className: PropTypes.string,
		titleOnly: PropTypes.bool,
		showIconHighlight: PropTypes.bool
	};
	BannerPageHeader = memo(function BannerPageHeader({ kicker = "KICKER", title = "Title", body = "Body: Need short description here", faIcon = "chevron-up", primaryColor = "blue", secondaryColor = "cornflowerblue", overrideBackgroundColor, overrideIconColor, overrideKickerColor, overrideBoxOneColor, overrideBoxTwoColor, className, titleOnly = false, showIconHighlight = true }) {
		const { isTablet } = useContext(IsMobileContext);
		const bannerColor = overrideBackgroundColor || primaryColor;
		const iconColor = overrideIconColor || primaryColor;
		const kickerColor = overrideKickerColor || primaryColor;
		const boxOneColor = overrideBoxOneColor || secondaryColor;
		const boxTwoColor = overrideBoxTwoColor || secondaryColor;
		let sectionHeaderClass = `banner-page-header${className ? ` ${className}` : ""}`;
		if (titleOnly) sectionHeaderClass += " title-only";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: sectionHeaderClass,
			style: { backgroundColor: bannerColor },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
				className: "banner-page-header__row",
				children: [!isTablet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
					width: "auto",
					className: "icon-column",
					children: showIconHighlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "accent-box-one",
							style: { backgroundColor: boxOneColor }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "accent-box-two",
							style: { backgroundColor: boxTwoColor }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "icon-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
								icon: faIcon,
								color: iconColor
							})
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "icon-container no-hightlight",
						style: { backgroundColor: bannerColor },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
							icon: faIcon,
							color: iconColor
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
					width: "fill",
					className: "text-column",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-container",
						children: [isTablet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "icon-container__mobile ",
							style: { backgroundColor: titleOnly ? bannerColor : "#FFF" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
								icon: faIcon,
								color: iconColor
							})
						}), titleOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text__title title-only",
							children: title
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text__kicker",
								style: { color: kickerColor },
								children: kicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text__title",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text__body",
								children: body
							})
						] })]
					})
				})]
			})
		});
	});
	BannerPageHeader.propTypes = propTypes;
}));
//#endregion
export { init_BannerPageHeader as n, BannerPageHeader as t };
