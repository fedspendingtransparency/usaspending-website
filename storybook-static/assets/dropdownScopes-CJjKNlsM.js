import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { An as FederalAccount, Bn as init_Icons, Fn as ObjectClass, In as ProgramActivity, Ln as Recipient, Sn as Award, cr as init_socialShare, fn as init_modalActions, go as require_jsx_runtime, hn as Agency, no as init_es, oo as useDispatch, or as getBaseUrl, pn as showModal, sr as handleShareOptionClick, wn as BudgetFunction } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, S as explorerPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
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
