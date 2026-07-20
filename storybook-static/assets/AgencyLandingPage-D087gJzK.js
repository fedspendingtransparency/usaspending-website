import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ai as formatMoneyWithPrecision, Ha as Link, Hn as isCancel, Ii as init_moneyFormatter, Kr as FontAwesomeIcon, Nr as init_index_es, Va as init_development, Vn as init_axios, an as init_url, cr as init_socialShare, dn as init_apiRequest, fn as init_modalActions, go as require_jsx_runtime, gr as $s, lo as bindActionCreators, no as init_es, on as sanitizeUrl, oo as useDispatch, or as getBaseUrl, pn as showModal, qr as init_dist, so as connect_default, sr as handleShareOptionClick, un as apiRequest, uo as init_redux, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, c as agencyLandingPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { i as init_LegacyTableHeaderCell, n as init_GenericCell, r as TableHeaderCell, t as ResultsTableGenericCell } from "./GenericCell-gTrdqYrS.js";
import { n as replaceString, t as init_replaceString } from "./replaceString-BjdNP_oA.js";
import { n as init_H2PageHeader, t as H2PageHeader } from "./H2PageHeader-Bpp68zbf.js";
import { t as require_commonjs } from "./commonjs-CBrKYqL5.js";
import { n as init_LandingSearchBar, t as LandingSearchBar } from "./LandingSearchBar-Dj32OQrM.js";
import React from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash-es";
//#region src/js/dataMapping/agencyLanding/agenciesTableFields.js
var agenciesTableFields;
var init_agenciesTableFields = __esmMin((() => {
	agenciesTableFields = {
		defaultSortDirection: {
			agency_name: "asc",
			budget_authority_amount: "desc",
			percentage_of_total_budget_authority: "desc"
		},
		defaultSortField: "agency_name",
		order: [
			"agency_name",
			"congressional_justification_url",
			"budget_authority_amount",
			"percentage_of_total_budget_authority"
		],
		agency_name: "Agency Name",
		congressional_justification_url: "Congressional Justification of Budget (CJ)",
		budget_authority_amount: "Budgetary Resources",
		percentage_of_total_budget_authority: "Percent of Total"
	};
}));
//#endregion
//#region src/js/helpers/agencyLandingHelper.js
var fetchAllAgencies;
var init_agencyLandingHelper = __esmMin((() => {
	init_apiRequest();
	fetchAllAgencies = (params) => apiRequest({
		url: "v2/references/toptier_agencies/",
		params
	});
}));
//#endregion
//#region src/js/components/agencyLanding/ResultsTableMessage.jsx
var import_jsx_runtime$9, propTypes$6, ResultsTableMessage;
var init_ResultsTableMessage = __esmMin((() => {
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$6 = { message: PropTypes.string };
	ResultsTableMessage = ({ message = "" }) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
		className: "results-table-message",
		children: message
	});
	ResultsTableMessage.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/redux/actions/agencyLanding/agencyLandingActions.js
var setAgenciesOrder;
var init_agencyLandingActions = __esmMin((() => {
	setAgenciesOrder = (state) => ({
		type: "SET_AGENCIES_ORDER",
		order: state
	});
}));
//#endregion
//#region src/js/containers/agencyLanding/table/AgencyLandingHeaderCellContainer.jsx
/**
* AgencyLandingHeaderCellContainer.jsx
* Created by Lizzie Salita 7/11/17
*/
var import_jsx_runtime$8, actions, propTypes$5, AgencyLandingHeaderCellContainer, AgencyLandingHeaderCellContainer_default;
var init_AgencyLandingHeaderCellContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_agencyLandingActions();
	init_LegacyTableHeaderCell();
	import_jsx_runtime$8 = require_jsx_runtime();
	actions = { setAgenciesOrder };
	propTypes$5 = {
		setAgenciesOrder: PropTypes.func,
		order: PropTypes.object,
		displayName: PropTypes.string,
		defaultDirection: PropTypes.string,
		columnName: PropTypes.string,
		isLast: PropTypes.bool
	};
	AgencyLandingHeaderCellContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.setAgenciesOrder = this.setAgenciesOrder.bind(this);
		}
		setAgenciesOrder(field, direction) {
			this.props.setAgenciesOrder({
				field,
				direction
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(TableHeaderCell, {
				title: this.props.displayName,
				defaultDirection: this.props.defaultDirection,
				column: this.props.columnName,
				field: this.props.columnName,
				isLast: this.props.isLast,
				currentSort: this.props.order,
				updateSort: this.setAgenciesOrder
			});
		}
	};
	AgencyLandingHeaderCellContainer.propTypes = propTypes$5;
	AgencyLandingHeaderCellContainer_default = connect_default((state) => ({ order: state.agencyLanding.agenciesOrder }), (dispatch) => bindActionCreators(actions, dispatch))(AgencyLandingHeaderCellContainer);
}));
//#endregion
//#region src/js/components/agencyLanding/table/HeaderRow.jsx
/**
* HeaderRow.jsx
* Created by Lizzie Salita 08/01/17
**/
var import_jsx_runtime$7, propTypes$4, HeaderRow;
var init_HeaderRow = __esmMin((() => {
	init_AgencyLandingHeaderCellContainer();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$4 = { columns: PropTypes.array };
	HeaderRow = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("tr", { children: this.props.columns.map((column, i) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(AgencyLandingHeaderCellContainer_default, {
				...column,
				isLast: i === this.props.columns.length - 1
			}) }, column.columnName)) });
		}
	};
	HeaderRow.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/agencyLanding/table/cells/AgencyLinkCell.jsx
/**
* AgencyLinkCell.jsx
* Created by Lizzie Salita 7/13/17
**/
var import_jsx_runtime$6, AgencyLinkCell;
var init_AgencyLinkCell = __esmMin((() => {
	init_replaceString();
	init_development();
	import_jsx_runtime$6 = require_jsx_runtime();
	AgencyLinkCell = class extends React.Component {
		static propTypes = {
			name: PropTypes.string,
			column: PropTypes.string,
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			agencySearchString: PropTypes.string
		};
		render() {
			let name = this.props.name;
			if (this.props.agencySearchString !== "") name = replaceString(this.props.name, this.props.agencySearchString, "matched");
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: `agency-link-cell column-${this.props.column}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "cell-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Link, {
						to: `/agency/${this.props.id}`,
						children: name
					})
				})
			});
		}
	};
}));
//#endregion
//#region src/js/components/agencyLanding/table/TableRow.jsx
/**
* TableRow.jsx
* Created by Lizzie Salita 08/01/17
**/
var import_jsx_runtime$5, propTypes$3, TableRow;
var init_TableRow = __esmMin((() => {
	init_dist();
	init_AgencyLinkCell();
	init_GenericCell();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = {
		columns: PropTypes.array.isRequired,
		agency: PropTypes.object,
		rowIndex: PropTypes.number.isRequired,
		agencySearchString: PropTypes.string
	};
	TableRow = class extends React.PureComponent {
		render() {
			let rowClass = "row-even";
			if (this.props.rowIndex % 2 === 0) rowClass = "row-odd";
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("tr", { children: this.props.columns.map((column) => {
				if (column.columnName === "agency_name") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
					className: rowClass,
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(AgencyLinkCell, {
						rowIndex: this.props.rowIndex,
						name: this.props.agency.agency_name,
						id: this.props.agency.agency_id,
						agencySearchString: this.props.agencySearchString,
						column: column.columnName
					})
				}, `${column.columnName}-${this.props.agency.agency_id}`);
				if (column.columnName === "congressional_justification_url") {
					if (this.props.agency.display[column.columnName] !== "not available") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
						className: rowClass,
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
							className: `column-${column.columnName}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
								className: "cell-content",
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("a", {
									href: `${this.props.agency.display[column.columnName]}`,
									target: "_blank",
									children: [`${this.props.agency.display[column.columnName]} `, /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FontAwesomeIcon, { icon: "external-link-alt" })]
								})
							})
						})
					}, `${column.columnName}-${this.props.agency.agency_id}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
						className: rowClass,
						children: this.props.agency.display[column.columnName]
					}, `${column.columnName}-${this.props.agency.agency_id}`);
				}
				return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("td", {
					className: rowClass,
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableGenericCell, {
						rowIndex: this.props.rowIndex,
						data: this.props.agency.display[column.columnName],
						column: column.columnName
					})
				}, `${column.columnName}-${this.props.agency.agency_id}`);
			}) });
		}
	};
	TableRow.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/agencyLanding/table/AgencyLandingTable.jsx
/**
* AgencyLandingTable.jsx
* Created by Lizzie Salita 7/7/17
*/
var import_jsx_runtime$4, propTypes$2, AgencyLandingTable;
var init_AgencyLandingTable = __esmMin((() => {
	init_HeaderRow();
	init_TableRow();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = {
		results: PropTypes.array,
		columns: PropTypes.array,
		agencySearchString: PropTypes.string
	};
	AgencyLandingTable = class extends React.PureComponent {
		render() {
			let noResultsClass = "";
			if (this.props.results.length === 0) noResultsClass = " no-results";
			const rows = this.props.results.map((agency, index) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TableRow, {
				agency,
				rowIndex: index,
				columns: this.props.columns,
				agencySearchString: this.props.agencySearchString
			}, agency.agency_id));
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: `agency-landing-results-table${noResultsClass}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(HeaderRow, { columns: this.props.columns }) }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("tbody", { children: rows })] })
			});
		}
	};
	AgencyLandingTable.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/agencyLanding/AgencyLandingResultsSection.jsx
/**
* AgencyLandingResultsSection.jsx
* Created by Lizzie Salita 7/11/17
*/
var import_jsx_runtime$3, propTypes$1, AgencyLandingResultsSection;
var init_AgencyLandingResultsSection = __esmMin((() => {
	init_ResultsTableMessage();
	init_AgencyLandingTable();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		inFlight: PropTypes.bool,
		results: PropTypes.array,
		columns: PropTypes.array,
		agencySearchString: PropTypes.string
	};
	AgencyLandingResultsSection = class extends React.Component {
		render() {
			let loadingWrapper = "";
			let message = null;
			if (this.props.inFlight) {
				loadingWrapper = "loading-table";
				message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ResultsTableMessage, { message: "Loading data..." });
			} else if (this.props.results.length === 0) if (this.props.agencySearchString) message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "results-table-message",
				children: [
					"No results found for “ ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: this.props.agencySearchString }),
					" ”."
				]
			});
			else message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ResultsTableMessage, { message: "No results found." });
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "agency-landing-results",
				id: "agency-landing-results",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: loadingWrapper,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AgencyLandingTable, { ...this.props })
				}), message]
			});
		}
	};
	AgencyLandingResultsSection.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/agencyLanding/AgencyLandingContent.jsx
var import_jsx_runtime$2, propTypes, AgencyLandingContent;
var init_AgencyLandingContent = __esmMin((() => {
	init_index_es();
	init_LandingSearchBar();
	init_AgencyLandingResultsSection();
	init_H2PageHeader();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		resultsText: PropTypes.string,
		results: PropTypes.array,
		agencySearchString: PropTypes.string,
		inFlight: PropTypes.bool,
		columns: PropTypes.array,
		setAgencySearchString: PropTypes.func
	};
	AgencyLandingContent = ({ resultsText, results, agencySearchString, inFlight, columns, setAgencySearchString }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(Qs, {
			className: "content__row landing-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(H2PageHeader, {
				title: "Find an Agency Profile.",
				subtitle: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", { children: "Dive into federal agency spending with our Agency Profiles. Find details on agencies' total obligations and outlays to understand how each agency spends its funding." }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", { children: [
					"P.L. 117-40 requires the posting of a list of all Executive Branch agencies that have submitted Congressional Justifications which include: the date that those materials were submitted to Congress, the date those materials were posted on a public website, and the website address (URL) of those materials.",
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
						className: "usa-bold-link",
						href: "https://portal.max.gov/portal/assets/public/treasury/CJ_DATA_FOR_USAS.csv",
						download: "cj_list.csv",
						children: " Click here "
					}),
					"to download a machine-readable version of this list. Note that this list contains agencies that do not currently submit data to USAspending.gov and therefore do not appear elsewhere on the website."
				] })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)($s, {
				width: 12,
				className: "content__col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LandingSearchBar, {
						onSubmit: setAgencySearchString,
						placeholder: "Search by Agency Name or Abbreviation",
						buttonAltText: "Search Agencies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "results-count",
						children: resultsText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AgencyLandingResultsSection, {
						columns,
						results,
						inFlight,
						agencySearchString
					})
				]
			})]
		});
	};
	AgencyLandingContent.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/agencyLanding/AgencyLandingContainer.jsx
/**
* AgencyLandingContainer.jsx
* Created by Lizzie Salita 7/7/17
*/
var import_commonjs, import_jsx_runtime$1, AgencyLandingContainer, AgencyLandingContainer_default;
var init_AgencyLandingContainer = __esmMin((() => {
	init_es();
	init_axios();
	import_commonjs = require_commonjs();
	init_agenciesTableFields();
	init_agencyLandingHelper();
	init_moneyFormatter();
	init_url();
	init_AgencyLandingContent();
	import_jsx_runtime$1 = require_jsx_runtime();
	AgencyLandingContainer = class extends React.Component {
		static propTypes = { agenciesOrder: PropTypes.object };
		constructor(props) {
			super(props);
			this.state = {
				columns: [],
				inFlight: false,
				currentFY: "",
				agencySearchString: "",
				fullData: [],
				results: []
			};
			this.agenciesRequest = null;
		}
		componentDidMount() {
			this.showColumns();
		}
		componentDidUpdate(prevProps) {
			if (this.props.agenciesOrder !== prevProps.agenciesOrder) this.performSearch();
		}
		componentWillUnmount() {
			if (this.agenciesRequest) this.agenciesRequest.cancel();
		}
		setAgencySearchString = (agencySearchString) => {
			let searchValue = "";
			if (agencySearchString.length > 2) searchValue = agencySearchString;
			this.setState({ agencySearchString: searchValue }, () => {
				this.performSearch();
			});
		};
		showColumns() {
			const columns = [];
			const sortOrder = agenciesTableFields.defaultSortDirection;
			agenciesTableFields.order.forEach((col) => {
				let displayName = agenciesTableFields[col];
				if (col === "budget_authority_amount" || col === "percentage_of_total_budget_authority") {
					if (this.state.fy) displayName = `${displayName} (FY ${this.state.currentFY})`;
				}
				const column = {
					columnName: col,
					displayName,
					defaultDirection: sortOrder[col]
				};
				columns.push(column);
			});
			this.setState({ columns }, () => {
				this.fetchAgencies();
			});
		}
		fetchAgencies() {
			if (this.agenciesRequest) this.agenciesRequest.cancel();
			this.setState({ inFlight: true });
			const params = {
				sort: this.props.agenciesOrder.field,
				order: this.props.agenciesOrder.direction
			};
			this.agenciesRequest = fetchAllAgencies(params);
			this.agenciesRequest.promise.then((res) => {
				this.setState({ inFlight: false });
				this.parseAgencies(res.data);
			}).catch((err) => {
				this.agenciesRequest = null;
				if (!isCancel(err)) {
					this.setState({ inFlight: false });
					console.log(err);
				}
			});
		}
		parseAgencies(data) {
			const agencies = [];
			data.results.forEach((item) => {
				const formattedCurrency = formatMoneyWithPrecision(item.budget_authority_amount, 0);
				let percent = `${(item.percentage_of_total_budget_authority * 100).toFixed(2)}%`;
				if (percent === "0.00%") percent = "Less than 0.01%";
				let abbreviation = "";
				if (item.abbreviation !== null && item.abbreviation !== "") abbreviation = `(${item.abbreviation})`;
				const agency = {
					agency_id: item.agency_slug || item.agency_id,
					agency_name: `${item.agency_name} ${abbreviation}`,
					budget_authority_amount: item.budget_authority_amount,
					percentage_of_total_budget_authority: item.percentage_of_total_budget_authority,
					display: {
						agency_name: `${item.agency_name} (${item.abbreviation})`,
						budget_authority_amount: formattedCurrency,
						percentage_of_total_budget_authority: percent,
						congressional_justification_url: sanitizeUrl(item.congressional_justification_url) || "not available"
					}
				};
				agencies.push(agency);
			});
			this.setState({ fullData: agencies }, () => {
				this.performSearch();
			});
		}
		performSearch() {
			const search = new import_commonjs.Search("agency_id");
			search.addIndex("agency_name");
			search.addDocuments(this.state.fullData);
			let results = this.state.fullData;
			if (this.state.agencySearchString !== "") results = search.search(this.state.agencySearchString);
			const orderedResults = orderBy(results, [this.props.agenciesOrder.field], [this.props.agenciesOrder.direction]);
			this.setState({ results: orderedResults });
		}
		render() {
			const resultsCount = this.state.results.length;
			let resultsText = `${resultsCount} results`;
			if (resultsCount === 1) resultsText = `${resultsCount} result`;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AgencyLandingContent, {
				resultsText,
				results: this.state.results,
				agencySearchString: this.state.agencySearchString,
				inFlight: this.state.inFlight,
				columns: this.state.columns,
				sort: this.props.agenciesOrder,
				setAgencySearchString: this.setAgencySearchString
			});
		}
	};
	AgencyLandingContainer_default = connect_default((state) => ({ agenciesOrder: state.agencyLanding.agenciesOrder }))(AgencyLandingContainer);
}));
//#endregion
//#region src/_scss/pages/agencyLanding/agencyLandingPage.scss
var require_agencyLandingPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/agencyLanding/AgencyLandingPage.jsx
var import_jsx_runtime, emailSubject, AgencyLandingPage;
//#endregion
__esmMin((() => {
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_PageWrapper();
	init_ShareIcon508();
	init_AgencyLandingContainer();
	init_modalActions();
	import_jsx_runtime = require_jsx_runtime();
	require_agencyLandingPage();
	emailSubject = "USAspending.gov Agency Profiles";
	AgencyLandingPage = () => {
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, "agency", {
				subject: emailSubject,
				body: `View all of the Agency Profiles on USAspending.gov: ${getBaseUrl("agency")}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Agency Profiles",
			classNames: "usa-da-agency-landing",
			title: "Agency Profiles",
			metaTagProps: agencyLandingPageMetaTags,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				onShareOptionClick: handleShare,
				url: getBaseUrl("agency")
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgencyLandingContainer_default, {})
			})
		});
	};
}))();
export { AgencyLandingPage as default };
