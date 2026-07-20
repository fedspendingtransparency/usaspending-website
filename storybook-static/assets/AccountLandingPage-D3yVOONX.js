import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $t as init_apiRequest, An as isCancel, En as Search, Jn as getBaseUrl, Oa as init_development, On as init_Icons, Qt as apiRequest, Ua as init_es, Xn as init_socialShare, Yn as handleShareOptionClick, _i as formatMoney, at as init_index_esm, en as init_modalActions, fr as Qs, hn as Close, ir as $s, it as Q, ka as Link, kn as init_axios, lr as Ka, ot as le, qa as useDispatch, ro as require_jsx_runtime, tn as showModal, wi as init_moneyFormatter, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, s as accountLandingPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { i as withLatestFy, t as init_WithLatestFy } from "./WithLatestFy-D_VFY3b6.js";
import { i as init_ResultsTableLoadingMessage, n as init_ResultsTableErrorMessage, r as ResultsTableLoadingMessage, t as ResultsTableErrorMessage } from "./ResultsTableErrorMessage-CPlw0IGY.js";
import { i as init_LegacyTableHeaderCell, n as init_GenericCell, r as TableHeaderCell, t as ResultsTableGenericCell } from "./GenericCell-lwr33JTB.js";
import { n as replaceString, t as init_replaceString } from "./replaceString-CWyAUKlR.js";
import { n as init_H2PageHeader, t as H2PageHeader } from "./H2PageHeader-5SXK0ZMz.js";
import { d as SUBMISSION_PERIOD_PROPS, f as init_propTypes, u as LATEST_PERIOD_PROPS } from "./propTypes-XCgVPU6o.js";
import React from "react";
import PropTypes from "prop-types";
import { flowRight, inRange } from "lodash-es";
//#region src/js/dataMapping/accountLanding/accountsTableFields.js
var accountsTableFields;
var init_accountsTableFields = __esmMin((() => {
	accountsTableFields = {
		defaultSortDirection: {
			accountNumber: "desc",
			accountName: "asc",
			managingAgency: "asc",
			budgetaryResources: "desc"
		},
		modelMapping: {
			accountNumber: "account_number",
			accountName: "account_name",
			managingAgency: "managing_agency",
			budgetaryResources: "budgetary_resources"
		},
		order: [
			"accountNumber",
			"accountName",
			"managingAgency",
			"budgetaryResources"
		],
		accountNumber: "Account Number",
		accountName: "Account Name",
		managingAgency: "Owning Agency",
		budgetaryResources: "Budgetary Resources"
	};
}));
//#endregion
//#region src/js/helpers/accountLandingHelper.js
var fetchAllAccounts;
var init_accountLandingHelper = __esmMin((() => {
	init_apiRequest();
	fetchAllAccounts = (data) => apiRequest({
		url: "v2/federal_accounts/",
		method: "post",
		data
	});
}));
//#endregion
//#region src/js/components/accountLanding/AccountLandingSearchBar.jsx
/**
* AccountLandingSearchBar.jsx
* Created by Lizzie Salita 8/4/17
*/
var import_jsx_runtime$8, propTypes$6, AccountLandingSearchBar;
var init_AccountLandingSearchBar = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$6 = { setAccountSearchString: PropTypes.func.isRequired };
	AccountLandingSearchBar = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				keyword: "",
				hasSubmit: false
			};
			this.onChange = this.onChange.bind(this);
			this.handleClick = this.handleClick.bind(this);
		}
		onChange(e) {
			this.setState({
				[e.target.name]: e.target.value,
				hasSubmit: false
			});
		}
		onSubmit(e) {
			e.preventDefault();
			this.setState({ hasSubmit: true });
			this.props.setAccountSearchString(this.state.keyword);
		}
		resetSearch(e) {
			e.preventDefault();
			this.setState({
				hasSubmit: false,
				keyword: ""
			});
			this.props.setAccountSearchString("");
		}
		handleClick(e) {
			if (this.state.hasSubmit) this.resetSearch(e);
			else this.onSubmit(e);
		}
		render() {
			let icon = /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Search, { alt: "Search Federal Accounts" });
			if (this.state.hasSubmit) icon = /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Close, { alt: "Reset federal accounts search" });
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "search-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("form", {
					className: "search-section__form",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("input", {
						className: "search-section__input",
						"aria-label": "Search Input",
						name: "keyword",
						value: this.state.keyword,
						type: "text",
						onChange: this.onChange,
						placeholder: "Search by Account Number, Account Name, or Agency..."
					}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
						"aria-label": "Search",
						onClick: this.handleClick,
						className: "search-section__button",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
							className: "search-section__button-icon",
							children: icon
						})
					})]
				})
			});
		}
	};
	AccountLandingSearchBar.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/accountLanding/table/cells/AccountLinkCell.jsx
/**
* AccountLinkCell.jsx
* Created by Lizzie Salita 8/4/17
**/
var import_jsx_runtime$7, propTypes$5, AccountLinkCell;
var init_AccountLinkCell = __esmMin((() => {
	init_replaceString();
	init_development();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$5 = {
		name: PropTypes.string,
		rowIndex: PropTypes.number,
		column: PropTypes.string,
		accountNumber: PropTypes.string,
		accountSearchString: PropTypes.string
	};
	AccountLinkCell = class extends React.Component {
		render() {
			let name = this.props.name;
			if (this.props.accountSearchString) name = replaceString(this.props.name, this.props.accountSearchString, "results-table-cell__matched results-table-cell__matched_highlight");
			return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: `results-table-cell results-table-cell_column_${this.props.column}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "results-table-cell__content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Link, {
						to: `/federal_account/${this.props.accountNumber}`,
						children: name
					})
				})
			});
		}
	};
	AccountLinkCell.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/accountLanding/table/cells/HighlightedCell.jsx
/**
* HighlightedCell.jsx
* Created by Lizzie Salita 08/10/17
**/
var import_jsx_runtime$6, propTypes$4, HighlightedCell;
var init_HighlightedCell = __esmMin((() => {
	init_replaceString();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$4 = {
		data: PropTypes.string,
		rowIndex: PropTypes.number,
		column: PropTypes.string,
		searchString: PropTypes.string
	};
	HighlightedCell = class extends React.Component {
		render() {
			let data = this.props.data;
			if (this.props.searchString) data = replaceString(this.props.data, this.props.searchString, "results-table-cell__matched results-table-cell__matched_highlight");
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: `results-table-cell results-table-cell_column_${this.props.column}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "results-table-cell__content",
					children: data
				})
			});
		}
	};
	HighlightedCell.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/accountLanding/table/TableRow.jsx
/**
* TableRow.jsx
* Created by Lizzie Salita 8/4/17
**/
var import_jsx_runtime$5, propTypes$3, TableRow;
var init_TableRow = __esmMin((() => {
	init_GenericCell();
	init_AccountLinkCell();
	init_HighlightedCell();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = {
		columns: PropTypes.array.isRequired,
		account: PropTypes.object,
		rowIndex: PropTypes.number.isRequired,
		accountSearchString: PropTypes.string
	};
	TableRow = class extends React.PureComponent {
		render() {
			let rowClass = "";
			if (this.props.rowIndex % 2 === 0) rowClass = "results-table__data_even";
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("tr", {
				className: "results-table__row",
				children: this.props.columns.map((column) => {
					if (column.columnName === "accountName") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
						className: `results-table__data ${rowClass}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(AccountLinkCell, {
							rowIndex: this.props.rowIndex,
							name: this.props.account.accountName,
							accountNumber: this.props.account.accountNumber,
							accountSearchString: this.props.accountSearchString,
							column: column.columnName
						})
					}, `${column.columnName}-${this.props.account.accountId}`);
					else if (column.columnName === "budgetaryResources") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
						className: `results-table__data ${rowClass}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableGenericCell, {
							rowIndex: this.props.rowIndex,
							data: this.props.account[column.columnName],
							column: column.columnName
						})
					}, `${column.columnName}-${this.props.account.accountId}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
						className: `results-table__data ${rowClass}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(HighlightedCell, {
							rowIndex: this.props.rowIndex,
							data: this.props.account[column.columnName],
							column: column.columnName,
							searchString: this.props.accountSearchString
						})
					}, `${column.columnName}-${this.props.account.accountId}`);
				})
			});
		}
	};
	TableRow.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/accountLanding/table/AccountLandingTable.jsx
/**
* AccountLandingTable.jsx
* Created by Lizzie Salita 8/4/17
*/
var import_jsx_runtime$4, propTypes$2, AccountLandingTable;
var init_AccountLandingTable = __esmMin((() => {
	init_accountsTableFields();
	init_LegacyTableHeaderCell();
	init_TableRow();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = {
		results: PropTypes.array,
		columns: PropTypes.array,
		order: PropTypes.object,
		updateSort: PropTypes.func,
		error: PropTypes.bool,
		inFlight: PropTypes.bool,
		searchString: PropTypes.string,
		loading: PropTypes.bool
	};
	AccountLandingTable = class extends React.PureComponent {
		render() {
			const hideBody = this.props.inFlight || this.props.error || this.props.results.length === 0 ? "results-table__body_hide" : "";
			let message = null;
			if (!this.props.inFlight && !this.props.error && this.props.results.length === 0) if (this.props.searchString) message = /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "results-table__message",
				children: [
					"No results found for “",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "results-table__message_highlight",
						children: this.props.searchString
					}),
					"”."
				]
			});
			else message = /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "results-table__message",
				children: "No results found."
			});
			const rows = this.props.results.map((account, index) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TableRow, {
				account,
				rowIndex: index,
				columns: this.props.columns,
				accountSearchString: this.props.searchString
			}, account.accountId));
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "results-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("thead", {
					className: "results-table__head",
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("tr", {
						className: "results-table__row",
						children: this.props.columns.map((column, index) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("td", {
							className: "results-table__data",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TableHeaderCell, {
								isLast: index === this.props.columns.length - 1,
								field: accountsTableFields.modelMapping[column.columnName],
								title: column.displayName,
								defaultDirection: column.defaultDirection,
								currentSort: this.props.order,
								updateSort: this.props.updateSort
							})
						}, index))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("tbody", {
					className: `results-table__body ${hideBody}`,
					children: rows
				})] }), message]
			});
		}
	};
	AccountLandingTable.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/accountLanding/AccountLandingResultsSection.jsx
/**
* AccountLandingResultsSection.jsx
* Created by Lizzie Salita 8/4/17
*/
var import_jsx_runtime$3, propTypes$1, AccountLandingResultsSection;
var init_AccountLandingResultsSection = __esmMin((() => {
	init_index_esm();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_AccountLandingTable();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		results: PropTypes.array,
		columns: PropTypes.array,
		searchString: PropTypes.string,
		order: PropTypes.object,
		updateSort: PropTypes.func
	};
	AccountLandingResultsSection = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "results-table-section",
				id: "account-landing-results",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Q, { children: (this.props.error || this.props.inFlight) && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(le, {
					classNames: "table-message-fade",
					timeout: {
						exit: 225,
						enter: 195
					},
					exit: true,
					children: [this.props.error && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "results-table-message-container full",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ResultsTableErrorMessage, {})
					}), this.props.inFlight && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "results-table-message-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ResultsTableLoadingMessage, {})
					})]
				}) }), !this.props.inFlight && !this.props.error && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AccountLandingTable, { ...this.props })]
			});
		}
	};
	AccountLandingResultsSection.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/accountLanding/AccountLandingContent.jsx
var import_jsx_runtime$2, propTypes, AccountLandingContent;
var init_AccountLandingContent = __esmMin((() => {
	init_index_es();
	init_AccountLandingSearchBar();
	init_AccountLandingResultsSection();
	init_H2PageHeader();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		results: PropTypes.array,
		searchString: PropTypes.string,
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		columns: PropTypes.array,
		setAccountSearchString: PropTypes.func,
		onChangePage: PropTypes.func,
		pageNumber: PropTypes.number,
		totalItems: PropTypes.number,
		pageSize: PropTypes.number,
		order: PropTypes.object,
		updateSort: PropTypes.func
	};
	AccountLandingContent = ({ results, searchString, inFlight, error, columns, setAccountSearchString, onChangePage, pageNumber, totalItems, pageSize, order, updateSort }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(Qs, {
			className: "content__row landing-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(H2PageHeader, {
				title: "Find a Federal Account Profile.",
				subtitle: "The government has more than 2,000 unique Federal Accounts, which are similar to bank accounts. Use our Federal Account Profiles to get a better understanding of how agencies receive and spend congressional funding to carry out their programs, projects, and activities."
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)($s, {
				width: 12,
				className: "content__col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AccountLandingSearchBar, { setAccountSearchString }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Ka, {
						resultsText: true,
						changePage: onChangePage,
						currentPage: pageNumber,
						totalItems,
						pageSize
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AccountLandingResultsSection, {
						columns,
						results,
						inFlight,
						error,
						searchString,
						order,
						updateSort
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Ka, {
						changePage: onChangePage,
						currentPage: pageNumber,
						totalItems,
						pageSize
					})
				]
			})]
		});
	};
	AccountLandingContent.propTypes = propTypes;
}));
//#endregion
//#region src/js/models/v1/accountLanding/BaseFederalAccountLandingRow.js
var BaseFederalAccountLandingRow;
var init_BaseFederalAccountLandingRow = __esmMin((() => {
	init_moneyFormatter();
	BaseFederalAccountLandingRow = {
		parse: function(data) {
			this.accountId = data.account_id || "";
			this.accountNumber = data.account_number || "";
			this._managingAgency = data.managing_agency || "";
			this._managingAgencyAcronym = data.managing_agency_acronym || "";
			this.accountName = data.account_name || "";
			this._budgetaryResources = data.budgetary_resources;
		},
		get managingAgency() {
			if (!this._managingAgencyAcronym) return this._managingAgency;
			return `${this._managingAgency} (${this._managingAgencyAcronym})`;
		},
		get budgetaryResources() {
			return this._budgetaryResources == null ? "--" : formatMoney(this._budgetaryResources);
		}
	};
}));
//#endregion
//#region src/_scss/pages/accountLanding/accountLandingPage.scss
var require_accountLandingPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/containers/accountLanding/AccountLandingContainer.jsx
/**
* AccountLandingContainer.jsx
* Created by Lizzie Salita 8/4/17
*/
var import_jsx_runtime$1, AccountLandingContainer, AccountLandingContainer_default;
var init_AccountLandingContainer = __esmMin((() => {
	init_axios();
	init_accountsTableFields();
	init_accountLandingHelper();
	init_WithLatestFy();
	init_AccountLandingContent();
	init_BaseFederalAccountLandingRow();
	init_propTypes();
	import_jsx_runtime$1 = require_jsx_runtime();
	require_accountLandingPage();
	AccountLandingContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				pageNumber: 1,
				order: {
					field: "budgetary_resources",
					direction: "desc"
				},
				columns: [],
				inFlight: false,
				error: false,
				searchString: "",
				results: [],
				totalItems: 0,
				pageSize: 50
			};
			this.accountsRequest = null;
			this.setAccountSearchString = this.setAccountSearchString.bind(this);
			this.onChangePage = this.onChangePage.bind(this);
			this.updateSort = this.updateSort.bind(this);
		}
		componentDidMount() {
			if (this.props.latestPeriod.year) this.showColumns();
		}
		componentDidUpdate(prevProps) {
			if (!prevProps.latestPeriod.year && this.props.latestPeriod.year) this.showColumns();
		}
		componentWillUnmount() {
			if (this.accountsRequest) this.accountsRequest.cancel();
		}
		onChangePage(pageNumber) {
			if (inRange(pageNumber, 1, Math.ceil(this.state.totalItems / this.state.pageSize) + 1)) this.setState({ pageNumber }, () => {
				this.fetchAccounts();
			});
		}
		setAccountSearchString(searchString) {
			this.setState({
				searchString,
				pageNumber: 1
			}, () => {
				this.fetchAccounts();
			});
		}
		updateSort(field, direction) {
			this.setState({
				order: {
					field,
					direction
				},
				pageNumber: 1
			}, () => {
				this.fetchAccounts();
			});
		}
		showColumns() {
			const { year: fy } = this.props.latestPeriod;
			const columns = [];
			const sortOrder = accountsTableFields.defaultSortDirection;
			accountsTableFields.order.forEach((col) => {
				let displayName = accountsTableFields[col];
				if (col === "budgetaryResources") displayName = `${fy} ${displayName}`;
				const column = {
					columnName: col,
					displayName,
					defaultDirection: sortOrder[col]
				};
				columns.push(column);
			});
			this.setState({ columns }, () => {
				this.fetchAccounts();
			});
		}
		fetchAccounts() {
			if (this.accountsRequest) this.accountsRequest.cancel();
			this.setState({
				inFlight: true,
				error: false
			});
			const params = {
				sort: this.state.order,
				page: this.state.pageNumber,
				limit: 50,
				filters: { fy: `${this.props.latestPeriod.year}` }
			};
			if (this.state.searchString) params.keyword = this.state.searchString;
			this.accountsRequest = fetchAllAccounts(params);
			this.accountsRequest.promise.then((res) => {
				this.setState({ inFlight: false });
				this.parseAccounts(res.data);
			}).catch((err) => {
				this.accountsRequest = null;
				if (!isCancel(err)) {
					this.setState({
						inFlight: false,
						error: true
					});
					console.log(err);
				}
			});
		}
		parseAccounts(data) {
			const accounts = [];
			data.results.forEach((item) => {
				const account = Object.create(BaseFederalAccountLandingRow);
				account.parse(item);
				accounts.push(account);
			});
			this.setState({
				totalItems: data.count,
				results: accounts
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AccountLandingContent, {
				results: this.state.results,
				inFlight: this.state.inFlight,
				error: this.state.error,
				columns: this.state.columns,
				order: this.state.order,
				updateSort: this.updateSort,
				searchString: this.state.searchString,
				setAccountSearchString: this.setAccountSearchString,
				onChangePage: this.onChangePage,
				pageNumber: this.state.pageNumber,
				totalItems: this.state.totalItems,
				pageSize: this.state.pageSize
			});
		}
	};
	AccountLandingContainer.propTypes = {
		submissionPeriods: SUBMISSION_PERIOD_PROPS,
		latestPeriod: LATEST_PERIOD_PROPS
	};
	AccountLandingContainer_default = flowRight(withLatestFy)(AccountLandingContainer);
}));
//#endregion
//#region src/js/components/accountLanding/AccountLandingPage.jsx
var import_jsx_runtime, slug, emailSubject, AccountLandingPage;
//#endregion
__esmMin((() => {
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_PageWrapper();
	init_ShareIcon508();
	init_AccountLandingContainer();
	init_modalActions();
	import_jsx_runtime = require_jsx_runtime();
	slug = "federal_account";
	emailSubject = "USAspending.gov Federal Account Profiles";
	AccountLandingPage = () => {
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, {
				subject: emailSubject,
				body: `View all of the Federal Account Profiles on USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Federal Account Profiles",
			classNames: "usa-da-account-landing",
			title: "Federal Account Profiles",
			metaTagProps: accountLandingPageMetaTags,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				onShareOptionClick: handleShare,
				url: getBaseUrl(slug)
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLandingContainer_default, {})
			})
		});
	};
}))();
export { AccountLandingPage as default };
