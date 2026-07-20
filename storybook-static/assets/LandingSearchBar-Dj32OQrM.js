import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Bn as init_Icons, Rn as Search, go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import React from "react";
import PropTypes from "prop-types";
//#region src/js/components/sharedComponents/LandingSearchBar.jsx
/**
* LandingSearchBar.jsx
* Created by Lizzie Salita 7/10/17
*/
var import_jsx_runtime, LandingSearchBar;
var init_LandingSearchBar = __esmMin((() => {
	init_Icons();
	import_jsx_runtime = require_jsx_runtime();
	LandingSearchBar = class extends React.Component {
		static propTypes = {
			onSubmit: PropTypes.func.isRequired,
			placeholder: PropTypes.string.isRequired,
			buttonAltText: PropTypes.string.isRequired
		};
		onSubmit = (e) => {
			e.preventDefault();
			this.props.onSubmit(e.target[0].value);
		};
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "search-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "search-section__form",
					onSubmit: this.onSubmit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "search-section__input",
						"aria-label": "Search Input",
						type: "text",
						placeholder: this.props.placeholder
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						"aria-label": "Search",
						className: "search-section__button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "search-section__button-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { alt: this.props.buttonAltText })
						})
					})]
				})
			});
		}
	};
}));
//#endregion
export { init_LandingSearchBar as n, LandingSearchBar as t };
