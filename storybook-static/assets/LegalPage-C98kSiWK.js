import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, j as privacyPageMetaTags, o as accessibilityPageMetaTags, w as foiaPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { t as require_aboutPage } from "./aboutPage-BPtHvv7H.js";
import React from "react";
import PropTypes from "prop-types";
//#region src/js/components/about/legal/common/LegalContent.jsx
var import_jsx_runtime$1, propTypes$1, LegalContent;
var init_LegalContent = __esmMin((() => {
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		activePage: PropTypes.string,
		title: PropTypes.string,
		children: PropTypes.node
	};
	LegalContent = (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "about-content-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "about-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "about-padded-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "about-section-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
						className: "about-section-title",
						children: props.title
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "about-section-content",
						children: props.children
					})]
				})
			})
		})
	});
	LegalContent.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/about/legal/common/LegalPage.jsx
/**
* LegalPage.jsx
* Created by Kevin Li 2/21/18
*/
var import_jsx_runtime, propTypes, LegalPage;
var init_LegalPage = __esmMin((() => {
	init_metaTagHelper();
	init_PageWrapper();
	init_LegalContent();
	import_jsx_runtime = require_jsx_runtime();
	require_aboutPage();
	propTypes = {
		activePage: PropTypes.string,
		title: PropTypes.string,
		children: PropTypes.node
	};
	LegalPage = class extends React.Component {
		render() {
			let metaTags = accessibilityPageMetaTags;
			if (this.props.activePage === "privacy") metaTags = privacyPageMetaTags;
			else if (this.props.activePage === "foia") metaTags = foiaPageMetaTags;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
				pageName: "Legal",
				classNames: "usa-da-legal-page",
				title: "Legal",
				metaTagProps: metaTags,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "main-content",
					className: "main-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalContent, {
						activePage: this.props.activePage,
						title: this.props.title,
						children: this.props.children
					})
				})
			});
		}
	};
	LegalPage.propTypes = propTypes;
}));
//#endregion
export { init_LegalPage as n, LegalPage as t };
