import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Cn as ObjectClass, Jn as getBaseUrl, On as init_Icons, Tn as Recipient, Ua as init_es, Xn as init_socialShare, Yn as handleShareOptionClick, en as init_modalActions, fn as BudgetFunction, qa as useDispatch, rn as Agency, ro as require_jsx_runtime, tn as showModal, un as Award, vn as FederalAccount, wn as ProgramActivity } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, S as explorerPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import "react";
import PropTypes from "prop-types";
//#region src/_scss/pages/explorer/explorerPage.scss
var require_explorerPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/explorer/ExplorerWrapperPage.jsx
var import_jsx_runtime, propTypes, slug, emailSubject, ExplorerWrapperPage;
var init_ExplorerWrapperPage = __esmMin((() => {
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_PageWrapper();
	init_ShareIcon508();
	init_modalActions();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		children: PropTypes.element,
		showShareIcon: PropTypes.bool
	};
	require_explorerPage();
	slug = "explorer";
	emailSubject = "USAspending.gov Federal Spending Explorer";
	ExplorerWrapperPage = ({ showShareIcon = false, children }) => {
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, {
				subject: emailSubject,
				body: `View the Spending Explorer on USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Spending Explorer",
			classNames: "usa-da-explorer-page",
			title: "Spending Explorer",
			metaTagProps: explorerPageMetaTags,
			toolBarComponents: showShareIcon ? [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				onShareOptionClick: handleShare,
				url: getBaseUrl(slug)
			})] : [],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children
			})
		});
	};
	ExplorerWrapperPage.propTypes = propTypes;
}));
//#endregion
//#region src/js/dataMapping/explorer/dropdownScopes.js
var dropdownScopes, rootScopes, icons;
var init_dropdownScopes = __esmMin((() => {
	init_Icons();
	dropdownScopes = {
		budget_function: [
			"budget_function",
			"budget_subfunction",
			"federal_account",
			"object_class",
			"recipient",
			"award"
		],
		agency: [
			"agency",
			"federal_account",
			"object_class",
			"recipient",
			"award"
		],
		object_class: [
			"object_class",
			"agency",
			"federal_account",
			"recipient",
			"award"
		]
	};
	rootScopes = [
		"budget_function",
		"agency",
		"object_class"
	];
	icons = {
		budget_function: BudgetFunction,
		budget_subfunction: BudgetFunction,
		federal_account: FederalAccount,
		program_activity: ProgramActivity,
		object_class: ObjectClass,
		recipient: Recipient,
		agency: Agency,
		award: Award
	};
}));
//#endregion
export { ExplorerWrapperPage as a, rootScopes as i, icons as n, init_ExplorerWrapperPage as o, init_dropdownScopes as r, dropdownScopes as t };
