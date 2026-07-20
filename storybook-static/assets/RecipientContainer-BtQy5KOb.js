import { n as __esmMin, o as __toESM, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, $t as init_apiRequest, An as isCancel, Ba as init_GlobalConstants, C as getFiscalYearsWithLatestAndAll, E as isFyValid, Fr as init_dist, Ja as connect_default, Jn as getBaseUrl, Mn as getQueryParamString, Mr as ws, Na as useMatch, Nn as init_queryParams, O as require_dayjs_min, Oa as init_development, Oi as init_searchFiltersReducer, On as init_Icons, Pa as useNavigate, Pr as FontAwesomeIcon, Qt as apiRequest, S as earliestFiscalYear, Si as formatNumberWithPrecision, Sn as InfoCircle, T as init_fiscalYearHelper, Ta as useQueryParams, Ti as unitValues, Ua as init_es, Xa as bindActionCreators, Xn as init_socialShare, Yn as handleShareOptionClick, Yt as require_react_aria_modal, Za as init_redux, _i as formatMoney, at as init_index_esm, bi as formatMoneyWithUnitsShortLabel, en as init_modalActions, er as init_Analytics, fr as Qs, gi as calculateUnits, hi as calculateUnitForSingleValue, hn as Close, in as AngleDown, ir as $s, it as Q, jn as combineQueryParams, ka as Link, ki as initialState, kn as init_axios, ma as require_immutable, n as init_Loading, oi as BaseRecipientOverview, ot as le, pr as Vs, qa as useDispatch, ro as require_jsx_runtime, si as init_BaseRecipientOverview, t as LoadingWrapper, tn as showModal, tr as init_stickyHeader, v as convertFYToDateRange, vi as formatMoneyWithPrecision, vr as ds, w as getTrailingTwelveMonths, wa as init_useQueryParams, wi as init_moneyFormatter, xi as formatNumber, xr as init_index_es, y as currentFiscalYear, za as globalConstants } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, N as recipientPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { n as init_LoadingSpinner, t as LoadingSpinner } from "./LoadingSpinner-jDBlqvPj.js";
import { n as useAgencySlugs, t as init_useAgencySlugs } from "./useAgencySlugs-CKoWB5QX.js";
import { B as linear, at as band, t as init_src } from "./src-BVb2vAbu.js";
import { N as init_InfoTooltipContent$1, i as CondensedCDTooltip } from "./InfoTooltipContent-Cv_ctU5w.js";
import { D as performSpendingOverTimeSearch, _ as generateUrlHash, w as performSpendingByCategorySearch, y as init_searchHelper } from "./searchHelper-D0TEuy-H.js";
import { n as init_StateLandingTableSorter, t as StateLandingTableSorter } from "./StateLandingTableSorter-rYOYnX_Q.js";
import { n as init_ProfileBackLink, t as ProfileBackLink } from "./ProfileBackLink-Bi5rIoQ4.js";
import { n as init_Error, t as Error } from "./Error-NjAxAGy3.js";
import { i as init_recipientIdentifiers, n as init_ChartError, r as idList, t as ChartError } from "./ChartError-CJoBTXY2.js";
import { i as init_monthHelper, n as convertNumToShortMonth, t as convertMonthToFY } from "./monthHelper-CZs7ZP4t.js";
import { i as init_BaseStateCategoryResult, n as init_TopFive, o as init_topCategories, r as BaseStateCategoryResult, s as recipientCategories, t as TopFive } from "./TopFive-BiXljc5_.js";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { find, flattenDeep, forEach, isEqual, max, mean, min, orderBy, sum, throttle, uniqueId } from "lodash-es";
//#region src/js/redux/actions/recipient/recipientActions.js
var recipientActions_exports = /* @__PURE__ */ __exportAll({
	resetRecipient: () => resetRecipient,
	setRecipientChildren: () => setRecipientChildren,
	setRecipientFiscalYear: () => setRecipientFiscalYear,
	setRecipientOverview: () => setRecipientOverview
});
var setRecipientOverview, setRecipientFiscalYear, setRecipientChildren, resetRecipient;
var init_recipientActions = __esmMin((() => {
	setRecipientOverview = (state) => ({
		type: "SET_RECIPIENT_OVERVIEW",
		overview: state
	});
	setRecipientFiscalYear = (state) => ({
		type: "SET_RECIPIENT_FY",
		fy: state
	});
	setRecipientChildren = (state) => ({
		type: "SET_RECIPIENT_CHILDREN",
		children: state
	});
	resetRecipient = () => ({ type: "RESET_RECIPIENT" });
}));
//#endregion
//#region src/js/helpers/recipientHelper.js
var fetchRecipientOverview, fetchChildRecipients, fetchNewAwardCounts;
var init_recipientHelper = __esmMin((() => {
	init_apiRequest();
	fetchRecipientOverview = (id, year) => apiRequest({
		url: `v2/recipient/${id}/`,
		params: { year }
	});
	fetchChildRecipients = (id, year) => apiRequest({
		url: `v2/recipient/children/${id}/`,
		params: { year }
	});
	fetchNewAwardCounts = (params) => apiRequest({
		url: "v2/search/new_awards_over_time/",
		method: "post",
		data: params
	});
}));
//#endregion
//#region src/js/components/recipient/modal/table/ChildRecipientModalTable.jsx
var import_jsx_runtime$33, propTypes$29, ChildRecipientModalTable;
var init_ChildRecipientModalTable = __esmMin((() => {
	init_development();
	init_StateLandingTableSorter();
	init_GlobalConstants();
	import_jsx_runtime$33 = require_jsx_runtime();
	propTypes$29 = {
		total: PropTypes.number,
		childRecipients: PropTypes.array,
		fy: PropTypes.string,
		updateSort: PropTypes.func,
		sortField: PropTypes.string,
		hideModal: PropTypes.func,
		sortDirection: PropTypes.string
	};
	ChildRecipientModalTable = (props) => {
		const body = props.childRecipients.map((child) => /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("tr", {
			className: "recipients-list__body-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("td", {
					className: "recipients-list__body-cell",
					children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(Link, {
						to: `/recipient/${child.id}/latest`,
						onClick: props.hideModal,
						children: child.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("td", {
					className: "recipients-list__body-cell",
					children: child.uei
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("td", {
					className: "recipients-list__body-cell",
					children: child.duns
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("td", {
					className: "recipients-list__body-cell",
					children: child.stateProvince
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("td", {
					className: "recipients-list__body-cell recipients-list__body-cell_right",
					children: child.amount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("td", {
					className: "recipients-list__body-cell recipients-list__body-cell_right",
					children: child.percentage(props.total)
				})
			]
		}, child.uei));
		let timePeriod = `(FY ${props.fy})`;
		if (props.fy === "latest") timePeriod = "(Last 12 Months)";
		else if (props.fy === "all") timePeriod = "(All Fiscal Years)";
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("table", {
			className: "recipients-list",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("thead", {
				className: "recipients-list__head",
				children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("tr", {
					className: "recipients-list__head-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("th", {
							className: "recipients-list__head-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
								className: "header-cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
									className: "header-cell__text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
										className: "header-cell__title",
										children: "Recipient Name"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StateLandingTableSorter, {
									field: "name",
									label: "recipient name",
									active: {
										field: props.sortField,
										direction: props.sortDirection
									},
									setSort: props.updateSort
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("th", {
							className: "recipients-list__head-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
								className: "header-cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
									className: "header-cell__text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
										className: "header-cell__title",
										children: "UEI"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StateLandingTableSorter, {
									field: "uei",
									label: "UEI",
									active: {
										field: props.sortField,
										direction: props.sortDirection
									},
									setSort: props.updateSort
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("th", {
							className: "recipients-list__head-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
								className: "header-cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
									className: "header-cell__text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
										className: "header-cell__title",
										children: [globalConstants.DUNS_LABEL, "DUNS"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StateLandingTableSorter, {
									field: "duns",
									label: "DUNS",
									active: {
										field: props.sortField,
										direction: props.sortDirection
									},
									setSort: props.updateSort
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("th", {
							className: "recipients-list__head-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
								className: "header-cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
									className: "header-cell__text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
										className: "header-cell__title",
										children: "State"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StateLandingTableSorter, {
									field: "stateProvince",
									label: "state",
									active: {
										field: props.sortField,
										direction: props.sortDirection
									},
									setSort: props.updateSort
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("th", {
							className: "recipients-list__head-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
								className: "header-cell header-cell_right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
									className: "header-cell__text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
										className: "header-cell__title header-cell__title_right header-cell__longer-title",
										children: ["Transaction Amount", /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
											className: "header-cell__subtitle",
											children: timePeriod
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StateLandingTableSorter, {
									field: "_amount",
									label: "awarded amount",
									active: {
										field: props.sortField,
										direction: props.sortDirection
									},
									setSort: props.updateSort
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("th", {
							className: "recipients-list__head-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
								className: "header-cell  header-cell_right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
									className: "header-cell__text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
										className: "header-cell__title header-cell__title_right",
										children: "Percent"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(StateLandingTableSorter, {
									field: "_amount",
									label: "percent of total",
									active: {
										field: props.sortField,
										direction: props.sortDirection
									},
									setSort: props.updateSort
								})]
							})
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("tbody", {
				className: "recipients-list__body",
				children: body
			})]
		});
	};
	ChildRecipientModalTable.propTypes = propTypes$29;
}));
//#endregion
//#region src/js/components/recipient/modal/ChildRecipientModal.jsx
var import_react_aria_modal$1, import_jsx_runtime$32, propTypes$28, ChildRecipientModal;
var init_ChildRecipientModal = __esmMin((() => {
	import_react_aria_modal$1 = /* @__PURE__ */ __toESM(require_react_aria_modal(), 1);
	init_Icons();
	init_ChildRecipientModalTable();
	import_jsx_runtime$32 = require_jsx_runtime();
	propTypes$28 = {
		mounted: PropTypes.bool,
		error: PropTypes.bool,
		loading: PropTypes.bool,
		hideModal: PropTypes.func,
		recipient: PropTypes.object,
		sortField: PropTypes.string,
		sortDirection: PropTypes.string,
		updateSort: PropTypes.func,
		childRecipients: PropTypes.array
	};
	ChildRecipientModal = (props) => {
		let table = /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ChildRecipientModalTable, {
			sortField: props.sortField,
			hideModal: props.hideModal,
			sortDirection: props.sortDirection,
			updateSort: props.updateSort,
			fy: props.recipient.fy,
			total: props.recipient.overview._totalAmount,
			childRecipients: props.childRecipients
		});
		let message = null;
		if (props.loading) {
			message = "Loading...";
			table = null;
		} else if (props.error) {
			message = "There was an error loading the results.";
			table = null;
		} else if (props.childRecipients.length === 0) {
			message = "No results found.";
			table = null;
		}
		const resultCount = props.childRecipients.length;
		const resultCountDisplay = table ? `${resultCount} ${resultCount > 1 ? "results" : "result"}` : null;
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(import_react_aria_modal$1.default, {
			mounted: props.mounted,
			onExit: props.hideModal,
			titleText: "Child Recipients",
			dialogClass: "recipients-modal",
			verticallyCenter: true,
			escapeExits: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
				className: "recipients-modal__wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
					className: "recipients-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("h1", {
						className: "recipients-modal__title",
						children: "Child Recipients"
					}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("button", {
						className: "recipients-modal__close-button",
						onClick: props.hideModal,
						title: "Close",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Close, { alt: "Close modal" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
					className: "recipients-modal__body",
					children: [
						resultCountDisplay,
						table,
						resultCountDisplay,
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
							className: "recipients-modal__message",
							children: message
						})
					]
				})]
			})
		});
	};
	ChildRecipientModal.propTypes = propTypes$28;
}));
//#endregion
//#region src/js/models/v2/recipient/BaseChildRecipient.js
var BaseChildRecipient;
var init_BaseChildRecipient = __esmMin((() => {
	init_moneyFormatter();
	BaseChildRecipient = {
		populate(data) {
			this.id = data.recipient_id || null;
			this.name = data.name || "Name not provided";
			this.duns = data.duns || "DUNS not provided";
			this.uei = data.uei || "UEI not provided";
			this._amount = parseFloat(data.amount) || 0;
			this.stateProvince = data.state_province || "--";
		},
		get amount() {
			return formatMoneyWithPrecision(this._amount, 0);
		},
		percentage(total) {
			const decimal = this._amount / total;
			if (isNaN(decimal)) return "--%";
			return `${Math.round(decimal * 1e4) / 100}%`;
		}
	};
}));
//#endregion
//#region src/js/containers/recipient/modal/ChildRecipientModalContainer.jsx
/**
* ChildRecipientModalContainer.jsx
* Created by Lizzie Salita 6/20/18
*/
var import_jsx_runtime$31, propTypes$27, ChildRecipientModalContainer, ChildRecipientModalContainer_default;
var init_ChildRecipientModalContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_recipientActions();
	init_recipientHelper();
	init_ChildRecipientModal();
	init_BaseChildRecipient();
	import_jsx_runtime$31 = require_jsx_runtime();
	propTypes$27 = {
		setRecipientChildren: PropTypes.func,
		recipient: PropTypes.object,
		mounted: PropTypes.bool,
		hideModal: PropTypes.func
	};
	ChildRecipientModalContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				inFlight: false,
				error: false,
				sortField: "_amount",
				sortDirection: "desc",
				childRecipients: []
			};
			this.request = null;
			this.updateSort = this.updateSort.bind(this);
		}
		componentDidUpdate(prevProps) {
			if (this.props.mounted && !prevProps.mounted) this.loadChildRecipients();
			if (!isEqual(this.props.recipient.children, prevProps.recipient.children)) this.updateSort("_amount", "desc");
		}
		loadChildRecipients() {
			if (this.request) this.request.cancel();
			this.setState({ inFlight: true });
			const id = this.props.recipient.overview.uei || this.props.recipient.overview.duns;
			const year = this.props.recipient.fy;
			this.request = fetchChildRecipients(id, year);
			this.request.promise.then((res) => {
				this.setState({ loading: false }, () => {
					if (res.data.length > 0) this.parseChildren(res.data);
				});
			}).catch((err) => {
				if (!isCancel(err)) {
					console.log(err);
					this.setState({
						inFlight: false,
						error: true
					});
				}
			});
		}
		parseChildren(data) {
			this.setState({
				inFlight: false,
				error: false
			});
			const childRecipients = data.map((child) => {
				const childRecipient = Object.create(BaseChildRecipient);
				childRecipient.populate(child);
				return childRecipient;
			});
			this.props.setRecipientChildren(childRecipients);
		}
		updateSort(sortField, sortDirection) {
			const orderedResults = orderBy(this.props.recipient.children, [sortField], [sortDirection]);
			this.setState({
				sortField,
				sortDirection,
				childRecipients: orderedResults
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(ChildRecipientModal, {
				...this.props,
				error: this.state.error,
				loading: this.state.inFlight,
				sortField: this.state.sortField,
				sortDirection: this.state.sortDirection,
				updateSort: this.updateSort,
				childRecipients: this.state.childRecipients
			});
		}
	};
	ChildRecipientModalContainer_default = connect_default((state) => ({ recipient: state.recipient }), (dispatch) => bindActionCreators(recipientActions_exports, dispatch))(ChildRecipientModalContainer);
	ChildRecipientModalContainer.propTypes = propTypes$27;
}));
//#endregion
//#region src/js/components/recipient/modal/table/AlternateNamesRecipientModalTable.jsx
var import_jsx_runtime$30, propTypes$26, AlternateNamesRecipientModalTable;
var init_AlternateNamesRecipientModalTable = __esmMin((() => {
	init_StateLandingTableSorter();
	import_jsx_runtime$30 = require_jsx_runtime();
	propTypes$26 = {
		alternateNames: PropTypes.array,
		updateSort: PropTypes.func,
		sortField: PropTypes.string,
		hideModal: PropTypes.func,
		sortDirection: PropTypes.string
	};
	AlternateNamesRecipientModalTable = (props) => {
		const body = props.alternateNames.map((altName) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("tr", {
			className: "recipients-list__body-row",
			children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("td", {
				className: "recipients-list__body-cell",
				children: altName
			})
		}, uniqueId(altName)));
		return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("table", {
			className: "recipients-list",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("thead", {
				className: "recipients-list__head",
				children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("tr", {
					className: "recipients-list__head-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("th", {
						className: "recipients-list__head-cell",
						children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
							className: "header-cell",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
								className: "header-cell__text",
								children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
									className: "header-cell__title",
									children: "Name"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(StateLandingTableSorter, {
								field: "alternateName",
								label: "name",
								active: {
									field: props.sortField,
									direction: props.sortDirection
								},
								setSort: props.updateSort
							})]
						})
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("tbody", {
				className: "recipients-list__body",
				children: body
			})]
		});
	};
	AlternateNamesRecipientModalTable.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/components/recipient/modal/AlternateNamesRecipientModal.jsx
var import_react_aria_modal, import_jsx_runtime$29, propTypes$25, AlternateNamesRecipientModal;
var init_AlternateNamesRecipientModal = __esmMin((() => {
	import_react_aria_modal = /* @__PURE__ */ __toESM(require_react_aria_modal(), 1);
	init_Icons();
	init_AlternateNamesRecipientModalTable();
	import_jsx_runtime$29 = require_jsx_runtime();
	propTypes$25 = {
		mounted: PropTypes.bool,
		hideModal: PropTypes.func,
		recipient: PropTypes.object,
		sortField: PropTypes.string,
		sortDirection: PropTypes.string,
		updateSort: PropTypes.func,
		alternateNames: PropTypes.array
	};
	AlternateNamesRecipientModal = (props) => {
		let table = /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(AlternateNamesRecipientModalTable, {
			sortField: props.sortField,
			hideModal: props.hideModal,
			sortDirection: props.sortDirection,
			updateSort: props.updateSort,
			alternateNames: props.alternateNames
		});
		let message = null;
		if (props.alternateNames.length === 0) {
			message = "No results found.";
			table = null;
		}
		const resultCount = props.alternateNames.length;
		const resultCountDisplay = table ? `${resultCount} ${resultCount > 1 ? "results" : "result"}` : null;
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(import_react_aria_modal.default, {
			mounted: props.mounted,
			onExit: props.hideModal,
			titleText: `Other Names for ${props.recipient.overview.name}`,
			dialogClass: "recipients-modal",
			verticallyCenter: true,
			escapeExits: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
				className: "recipients-modal__wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "recipients-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("h1", {
						className: "recipients-modal__title",
						children: `Other Names for ${props.recipient.overview.name}`
					}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("button", {
						className: "recipients-modal__close-button",
						onClick: props.hideModal,
						title: "Close",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Close, { alt: "Close modal" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "recipients-modal__body",
					children: [
						resultCountDisplay,
						table,
						resultCountDisplay,
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
							className: "recipients-modal__message",
							children: message
						})
					]
				})]
			})
		});
	};
	AlternateNamesRecipientModal.propTypes = propTypes$25;
})), import_jsx_runtime$28, propTypes$24, AlternateNamesRecipientModalContainer;
var init_AlternateNamesRecipientModalContainer = __esmMin((() => {
	init_es();
	init_AlternateNamesRecipientModal();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$24 = {
		recipient: PropTypes.object,
		hideModal: PropTypes.func
	};
	AlternateNamesRecipientModalContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				sortField: "alternateNames",
				sortDirection: "asc"
			};
		}
		updateSort = (sortField, sortDirection) => this.setState({
			sortField,
			sortDirection
		});
		render() {
			const sortedAlternateNames = this.state.sortDirection === "asc" ? this.props.recipient.overview.alternateNames.sort((a, b) => a.localeCompare(b)) : this.props.recipient.overview.alternateNames.sort((a, b) => b.localeCompare(a));
			return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(AlternateNamesRecipientModal, {
				...this.props,
				sortField: this.state.sortField,
				sortDirection: this.state.sortDirection,
				updateSort: this.updateSort,
				alternateNames: sortedAlternateNames
			});
		}
	};
	connect_default((state) => ({ recipient: state.recipient }))(AlternateNamesRecipientModalContainer);
	AlternateNamesRecipientModalContainer.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/components/sharedComponents/timeChart/chart/BarXAxisItem.jsx
/**
* BarXAxisItem.jsx
* Created by Kevin Li 12/19/16
*/
var import_jsx_runtime$27, propTypes$23, BarXAxisItem;
var init_BarXAxisItem = __esmMin((() => {
	import_jsx_runtime$27 = require_jsx_runtime();
	propTypes$23 = {
		x: PropTypes.number,
		y: PropTypes.number,
		label: PropTypes.string
	};
	BarXAxisItem = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("g", {
				className: "axis-item x-axis",
				children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("text", {
					textAnchor: "middle",
					transform: `translate(${this.props.x},${this.props.y})`,
					children: this.props.label
				})
			});
		}
	};
	BarXAxisItem.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/components/sharedComponents/timeChart/chart/BarXAxis.jsx
/**
* BarXAxis.jsx
* Created by Kevin Li 12/19/16
*/
var import_jsx_runtime$26, propTypes$22, BarXAxis;
var init_BarXAxis = __esmMin((() => {
	init_BarXAxisItem();
	import_jsx_runtime$26 = require_jsx_runtime();
	propTypes$22 = {
		top: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		padding: PropTypes.object,
		axisPos: PropTypes.number,
		visualizationPeriod: PropTypes.string,
		data: PropTypes.array,
		scale: PropTypes.func,
		rawLabels: PropTypes.array
	};
	BarXAxis = ({ top, width = 0, padding = {
		left: 0,
		bottom: 0,
		top: 0,
		right: 0
	}, axisPos, visualizationPeriod, data, scale, rawLabels }) => {
		const [description, setDescription] = useState("");
		const [labels, setLabels] = useState([]);
		const calculateDateOffset = (item, type) => {
			const period = item.period;
			if (type === "month") return (12 - [
				"Oct",
				"Nov",
				"Dec",
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep"
			].indexOf(period)) % 12;
			return (4 - [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			].indexOf(period)) % 4;
		};
		const calculateEndIndex = (index, type, offset) => {
			if (type === "quarter") {
				let endIndex = index + 3;
				if (index < offset) endIndex = offset - 1;
				if (endIndex >= data.length) endIndex = data.length - 1;
				return endIndex;
			}
			let endIndex = index + 11;
			if (index < offset) endIndex = offset - 1;
			if (endIndex >= data.length) endIndex = data.length - 1;
			return endIndex;
		};
		const calculateLabel = (item) => {
			if (visualizationPeriod === "fiscal_year") return item.year;
			const year = item.year;
			if (visualizationPeriod === "quarter") return year;
			const increment = [
				"Oct",
				"Nov",
				"Dec"
			].indexOf(item.period) !== -1 ? 1 : 0;
			return (parseInt(year, 10) + increment).toString();
		};
		const calculateXPos = (item, index, labelOffset) => {
			if (visualizationPeriod === "fiscal_year") return scale(item.year) + scale.bandwidth() / 2;
			const endIndex = calculateEndIndex(index, data, visualizationPeriod, labelOffset);
			return (scale(data[index]) + scale(data[endIndex]) + scale.bandwidth()) / 2;
		};
		const parseLabels = () => {
			if (!data || data.length === 0) return data;
			let labelIterator = 1;
			let labelOffset = 0;
			if (visualizationPeriod === "quarter") labelIterator = 4;
			else if (visualizationPeriod === "month") labelIterator = 12;
			if (visualizationPeriod !== "fiscal_year" && rawLabels) labelOffset = calculateDateOffset(rawLabels[0], visualizationPeriod);
			return rawLabels.map((item, index) => {
				if ((index - labelOffset) % labelIterator !== 0 && index !== 0) return null;
				const label = calculateLabel(item);
				return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(BarXAxisItem, {
					x: calculateXPos(item, index, labelOffset),
					y: 15,
					label
				}, `label-x-${item}-${index}`);
			});
		};
		const drawAxis = () => {
			if (!scale) return;
			const labelsLocal = parseLabels();
			let descriptionLocal = "";
			if (data.length > 0) descriptionLocal = `The X-axis of the chart, showing a range of time periods from ${data[0]} to ${data[data.length - 1]}
                `;
			setLabels(labelsLocal);
			setDescription(descriptionLocal);
		};
		useEffect(() => {
			drawAxis();
		}, [
			top,
			width,
			padding,
			axisPos,
			visualizationPeriod,
			data,
			scale,
			rawLabels
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("g", {
			className: "bar-axis",
			transform: `translate(${padding.left},${top})`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("title", { children: "X-Axis" }),
				/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("desc", { children: description }),
				/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("line", {
					className: "x-axis",
					x1: 0,
					y1: -1 * axisPos,
					x2: width,
					y2: -1 * axisPos
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("g", {
					className: "axis-labels",
					children: labels
				})
			]
		});
	};
	BarXAxis.propTypes = propTypes$22;
}));
//#endregion
//#region src/js/components/sharedComponents/timeChart/chart/BarYAxisItem.jsx
/**
* BarYAxisItem.jsx
* Created by Kevin Li 12/19/16
*/
var import_jsx_runtime$25, propTypes$21, BarYAxisItem;
var init_BarYAxisItem = __esmMin((() => {
	import_jsx_runtime$25 = require_jsx_runtime();
	propTypes$21 = {
		x: PropTypes.number,
		y: PropTypes.number,
		label: PropTypes.string,
		lineStart: PropTypes.number,
		lineEnd: PropTypes.number
	};
	BarYAxisItem = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("g", {
				className: "axis-item y-axis",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("text", {
					textAnchor: "end",
					transform: `translate(${this.props.x},${this.props.y + 6})`,
					children: this.props.label
				}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("line", {
					className: "grid-line",
					x1: this.props.lineStart,
					y1: this.props.y,
					x2: this.props.lineEnd,
					y2: this.props.y
				})]
			});
		}
	};
	BarYAxisItem.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/components/sharedComponents/timeChart/chart/BarYAxis.jsx
/**
* BarYAxis.jsx
* Created by Kevin Li 12/19/16
*/
var import_jsx_runtime$24, propTypes$20, BarYAxis;
var init_BarYAxis = __esmMin((() => {
	init_moneyFormatter();
	init_BarYAxisItem();
	import_jsx_runtime$24 = require_jsx_runtime();
	propTypes$20 = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		padding: PropTypes.object,
		scale: PropTypes.func,
		average: PropTypes.number
	};
	BarYAxis = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				description: "",
				labels: [],
				gridLines: []
			};
		}
		shouldComponentUpdate(nextProps, nextState) {
			if (!isEqual(nextProps, this.props)) return true;
			else if (!isEqual(nextState, this.state)) return true;
			return false;
		}
		componentDidUpdate(prevProps) {
			if (!isEqual(prevProps, this.props)) this.drawAxis(this.props);
		}
		drawAxis(props) {
			if (!props.scale) return;
			const units = calculateUnits(props.data);
			const tickLabels = props.ticks.map((tick) => {
				let formattedValue = formatMoneyWithPrecision(tick / units.unit, units.precision);
				if (tick === 0) formattedValue = "$0";
				else formattedValue += units.unitLabel;
				return formattedValue;
			});
			const lineStart = props.padding.left;
			const lineEnd = props.width + props.padding.left;
			let description = "";
			if (tickLabels.length > 0) {
				description = `The Y-axis of the chart, showing a range of spending from `;
				description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
			}
			const xPos = props.padding.left - 10;
			const labels = props.ticks.map((tick, i) => {
				const yPos = props.height - props.scale(tick);
				return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(BarYAxisItem, {
					x: xPos,
					y: yPos,
					label: `${tickLabels[i]}`,
					lineStart,
					lineEnd
				}, `label-y-${tick}-${i}`);
			});
			this.setState({
				labels,
				description
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("g", {
				className: "bar-axis",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("title", { children: "Y-Axis" }),
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("desc", { children: this.state.description }),
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("line", {
						className: "y-axis",
						x1: this.props.padding.left,
						y1: 0,
						x2: this.props.padding.left,
						y2: this.props.height
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("g", {
						className: "axis-labels",
						children: this.state.labels
					})
				]
			});
		}
	};
	BarYAxis.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/chart/BarChartTrendlineLegend.jsx
/**
* BarChartTrendlineLegend.jsx
* Created by Lizzie Salita 7/13/18
*/
var import_jsx_runtime$23, propTypes$19, BarChartTrendlineLegend;
var init_BarChartTrendlineLegend = __esmMin((() => {
	import_jsx_runtime$23 = require_jsx_runtime();
	propTypes$19 = { legend: PropTypes.arrayOf(PropTypes.object) };
	BarChartTrendlineLegend = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("g", {
				className: "chart-legend",
				children: this.props.legend.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("g", {
					className: "chart-legend-item",
					transform: `translate(${item.offset}, 0)`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("circle", {
						className: "key-color",
						stroke: item.stroke,
						fill: item.color,
						strokeWidth: "3",
						cx: "6",
						cy: "6",
						r: "6"
					}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("text", {
						className: "key-label",
						x: "20",
						y: "10",
						children: item.label
					})]
				}, item.label))
			});
		}
	};
	BarChartTrendlineLegend.propTypes = propTypes$19;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/chart/BarTrendlineAxis.jsx
/**
* BarTrendlineAxis.jsx
* Created by Lizzie Salita 7/11/18
*/
var import_jsx_runtime$22, propTypes$18, BarTrendlineAxis;
var init_BarTrendlineAxis = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$22 = require_jsx_runtime();
	propTypes$18 = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		padding: PropTypes.object,
		scale: PropTypes.func,
		average: PropTypes.number,
		color: PropTypes.string
	};
	BarTrendlineAxis = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				description: "",
				labels: [],
				gridLines: []
			};
		}
		componentDidUpdate(prevProps) {
			if (!isEqual(prevProps, this.props)) this.drawAxis(this.props);
		}
		drawAxis(props) {
			if (!props.scale) return;
			const tickLabels = props.ticks.map((tick) => {
				if (tick >= unitValues.THOUSAND) {
					const units = calculateUnitForSingleValue(tick);
					return `${formatNumberWithPrecision(tick / units.unit, 1)} ${units.unitLabel}`;
				}
				return formatNumber(tick);
			});
			let description = "";
			if (tickLabels.length > 0) {
				description = `The second Y-axis of the chart, showing a range of new awards from `;
				description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
			}
			const xPos = props.width + props.padding.left + props.padding.right - 10;
			const labels = props.ticks.map((tick, i) => {
				const yPos = props.height - props.scale(tick);
				return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("g", {
					className: "axis-item y-axis",
					children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("text", {
						textAnchor: "end",
						transform: `translate(${xPos},${yPos + 6})`,
						children: tickLabels[i]
					})
				}, `label-trendline-${tick}`);
			});
			this.setState({
				labels,
				description
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("g", {
				className: "bar-axis",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("title", { children: "Trendline-Axis" }),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("desc", { children: this.state.description }),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("line", {
						className: "y-axis",
						x1: this.props.width + this.props.padding.left,
						y1: 0,
						x2: this.props.width + this.props.padding.left,
						y2: this.props.height
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("g", {
						className: "axis-labels",
						children: this.state.labels
					})
				]
			});
		}
	};
	BarTrendlineAxis.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/chart/PointItem.jsx
/**
* PointItem.jsx
* Created by Lizzie Salita 7/17/18
*/
var import_jsx_runtime$21, defaultProps$2, propTypes$17, PointItem;
var init_PointItem = __esmMin((() => {
	import_jsx_runtime$21 = require_jsx_runtime();
	defaultProps$2 = { active: false };
	propTypes$17 = {
		identifier: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		color: PropTypes.string,
		stroke: PropTypes.string,
		radius: PropTypes.number,
		strokeWidth: PropTypes.number,
		description: PropTypes.string,
		selectPoint: PropTypes.func,
		deselectPoint: PropTypes.func,
		deregisterPoint: PropTypes.func
	};
	PointItem = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { active: false };
			this.mouseEntered = this.mouseEntered.bind(this);
			this.mouseExited = this.mouseExited.bind(this);
			this.touchedPoint = this.touchedPoint.bind(this);
		}
		componentWillUnmount() {
			this.props.deregisterPoint(this.props.identifier);
		}
		mouseEntered() {
			this.props.selectPoint(this.props.identifier);
		}
		mouseExited() {
			this.props.deselectPoint();
		}
		touchedPoint() {
			this.props.selectPoint(this.props.identifier, true);
		}
		updateActive(currentActive) {
			this.setState({ active: currentActive === this.props.identifier });
		}
		render() {
			let hoverClass = "";
			if (this.state.active) hoverClass = " hover";
			return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("g", {
				"aria-label": this.props.description,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("desc", { children: this.props.description }), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("circle", {
					className: `point-item${hoverClass}`,
					cx: this.props.x,
					cy: this.props.y,
					r: this.props.radius,
					stroke: this.props.stroke,
					strokeWidth: this.props.strokeWidth,
					fill: this.props.color,
					tabIndex: -1,
					onFocus: this.mouseEntered,
					onBlur: this.mouseExited,
					onMouseEnter: this.mouseEntered,
					onMouseOut: this.mouseExited,
					onTouchStart: this.touchedPoint
				})]
			});
		}
	};
	PointItem.propTypes = propTypes$17;
	PointItem.defaultProps = defaultProps$2;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/chart/BarTrendlineItem.jsx
/**
* BarTrendlineItem.jsx
* Created by Lizzie Salita 7/18/18
*/
var import_jsx_runtime$20, defaultProps$1, propTypes$16, BarTrendlineItem;
var init_BarTrendlineItem = __esmMin((() => {
	import_jsx_runtime$20 = require_jsx_runtime();
	defaultProps$1 = { active: false };
	propTypes$16 = {
		identifier: PropTypes.string,
		dataY: PropTypes.number,
		dataX: PropTypes.string,
		graphHeight: PropTypes.number,
		height: PropTypes.number,
		width: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		color: PropTypes.string,
		description: PropTypes.string,
		selectBar: PropTypes.func,
		deselectBar: PropTypes.func,
		deregisterBar: PropTypes.func
	};
	BarTrendlineItem = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { active: false };
			this.mouseEntered = this.mouseEntered.bind(this);
			this.mouseExited = this.mouseExited.bind(this);
			this.touchedBar = this.touchedBar.bind(this);
		}
		componentWillUnmount() {
			this.props.deregisterBar(this.props.identifier);
		}
		mouseEntered() {
			this.props.selectBar(this.props.identifier);
		}
		mouseExited() {
			this.props.deselectBar();
		}
		touchedBar() {
			this.props.selectBar(this.props.identifier, true);
		}
		updateActive(currentActive) {
			this.setState({ active: currentActive === this.props.identifier });
		}
		render() {
			let hoverClass = "";
			if (this.state.active) hoverClass = " hover";
			return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("g", {
				"aria-label": this.props.description,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("desc", { children: this.props.description }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("rect", {
					className: `bar-item${hoverClass}`,
					x: this.props.x,
					y: this.props.y,
					width: this.props.width,
					height: this.props.height,
					fill: this.props.color,
					tabIndex: -1,
					onFocus: this.mouseEntered,
					onBlur: this.mouseExited,
					onMouseEnter: this.mouseEntered,
					onMouseOut: this.mouseExited,
					onTouchStart: this.touchedBar
				})]
			});
		}
	};
	BarTrendlineItem.propTypes = propTypes$16;
	BarTrendlineItem.defaultProps = defaultProps$1;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/chart/BarChartTrendline.jsx
/**
* BarChartTrendline.jsx
* Created by Lizzie Salita 7/9/18
*/
var import_jsx_runtime$19, propTypes$15, defaultProps, BarChartTrendline;
var init_BarChartTrendline = __esmMin((() => {
	init_src();
	init_moneyFormatter();
	init_BarXAxis();
	init_BarYAxis();
	init_BarChartTrendlineLegend();
	init_BarTrendlineAxis();
	init_PointItem();
	init_BarTrendlineItem();
	import_jsx_runtime$19 = require_jsx_runtime();
	propTypes$15 = {
		groups: PropTypes.array,
		width: PropTypes.number,
		height: PropTypes.number,
		xSeries: PropTypes.array,
		rawLabels: PropTypes.array,
		ySeries: PropTypes.array,
		zSeries: PropTypes.array,
		showTooltip: PropTypes.func,
		enableHighlight: PropTypes.bool,
		padding: PropTypes.object,
		legend: PropTypes.array,
		activeLabel: PropTypes.object,
		visualizationPeriod: PropTypes.string
	};
	defaultProps = {
		padding: {
			left: 70,
			bottom: 50,
			right: 50
		},
		enableHighlight: true,
		legend: []
	};
	BarChartTrendline = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				xScale: null,
				yScale: null,
				yTicks: null,
				zScale: null,
				zTicks: null,
				items: [],
				trendItems: [],
				xValues: [],
				yValues: [],
				zValues: [],
				yAverage: 0,
				zAverage: 0,
				xAxisPos: 0,
				graphHeight: 0,
				activeBar: null,
				activePoint: null,
				groupWidth: 0
			};
			this.dataPoints = {};
			this.trendlineData = {};
			this.selectBar = this.selectBar.bind(this);
			this.deselectBar = this.deselectBar.bind(this);
			this.deregisterBar = this.deregisterBar.bind(this);
			this.selectPoint = this.selectPoint.bind(this);
			this.deselectPoint = this.deselectPoint.bind(this);
			this.deregisterPoint = this.deregisterPoint.bind(this);
		}
		componentDidMount() {
			this.generateChart(this.props);
		}
		componentDidUpdate(prevProps) {
			if (!isEqual(prevProps, this.props)) this.generateChart(this.props);
		}
		generateChart(props) {
			const allY = flattenDeep(props.ySeries);
			const yRange = [];
			let yMin = min(allY);
			if (yMin > 0) yMin = 0;
			if (allY.length > 1) {
				yRange.push(yMin);
				yRange.push(max(allY));
			} else if (allY.length > 0) {
				const dataPoint = allY[0];
				if (dataPoint < 0) {
					yRange.push(dataPoint);
					yRange.push(0);
				} else if (dataPoint === 0) {
					yRange.push(dataPoint);
					yRange.push(1e3);
				} else {
					yRange.push(0);
					yRange.push(dataPoint);
				}
			} else {
				yRange.push(0);
				yRange.push(1e4);
			}
			const graphWidth = props.width - props.padding.left - props.padding.right;
			const graphHeight = props.height - props.padding.bottom;
			const xScale = band().domain(props.groups).range([0, graphWidth]).round(true);
			const yScale = linear().domain(yRange).range([0, graphHeight]).clamp(true);
			let xAxisPos = 0;
			if (yMin !== 0) xAxisPos = yScale(0);
			const items = [];
			props.groups.forEach((group, groupIndex) => {
				const yData = props.ySeries[groupIndex];
				const xData = props.xSeries[groupIndex];
				const itemWidth = min([xScale.bandwidth() / (xData.length * 3 + 1) * 3, 120]);
				let startingXPos = xScale(group) + itemWidth / 6;
				if (itemWidth === 120) {
					const realWidth = 120 * yData.length;
					startingXPos = xScale(group) + xScale.bandwidth() / 2 - realWidth / 2;
				}
				yData.forEach((item, i) => {
					const xPos = startingXPos + i * itemWidth;
					let barHeight = yScale(item) - yScale(0);
					let yPos = graphHeight - yScale(0) - barHeight;
					if (item < 0) {
						yPos = graphHeight - yScale(0);
						barHeight = yScale(0) - yScale(item);
					}
					const barIdentifier = `${groupIndex}-${i}`;
					const description = `Spending in ${xData[i]}: ${formatMoney(item)}`;
					const bar = {
						key: `data-${barIdentifier}`,
						identifier: barIdentifier,
						dataY: item,
						dataX: xData[i],
						graphHeight,
						height: barHeight,
						width: itemWidth,
						x: xPos,
						y: yPos,
						color: this.props.legend[0].color,
						description,
						selectBar: this.selectBar,
						deselectBar: this.deselectBar,
						deregisterBar: this.deregisterBar
					};
					items.push(bar);
				});
			});
			this.setState({
				xScale,
				yScale,
				items,
				xAxisPos,
				graphHeight,
				yValues: allY,
				xValues: props.groups,
				rawLabels: props.rawLabels,
				yAverage: mean(allY),
				yTicks: yScale.ticks(7)
			}, () => {
				this.generateTrendline(props);
			});
		}
		generateTrendline(props) {
			if (this.props.zSeries.length > 0) {
				const allZ = props.zSeries;
				const zRange = [];
				let zMin = min(allZ);
				if (zMin > 0) zMin = 0;
				if (allZ.length > 1) {
					zRange.push(zMin);
					zRange.push(max(allZ));
				} else if (allZ.length > 0) {
					const dataPointZ = allZ[0];
					if (dataPointZ < 0) {
						zRange.push(dataPointZ);
						zRange.push(0);
					} else if (dataPointZ === 0) {
						zRange.push(dataPointZ);
						zRange.push(100);
					} else {
						zRange.push(0);
						zRange.push(dataPointZ);
					}
				} else {
					zRange.push(0);
					zRange.push(100);
				}
				const zScale = linear().domain(zRange).range([0, this.state.graphHeight]).clamp(true);
				const newZSeries = props.zSeries;
				if (props.groups.length < props.zSeries.length) {
					const difference = props.zSeries.length - props.groups.length;
					for (let z = 0; z < difference; z++) newZSeries.shift();
				}
				const trendItems = [];
				props.groups.forEach((group, groupIndex) => {
					const zData = newZSeries[groupIndex];
					const bar = this.state.items[groupIndex];
					const xPos = bar.x + bar.width / 2;
					const pointHeight = zScale(zData);
					const yPos = this.state.graphHeight - pointHeight;
					const description = `New awards in ${group}: ${zData}`;
					const point = {
						key: `data-${group}-awards`,
						identifier: `${groupIndex}-${group}-awards`,
						dataZ: zData,
						x: xPos,
						y: yPos,
						stroke: this.props.legend[1].stroke,
						color: this.props.legend[1].color,
						description,
						selectPoint: this.selectPoint,
						deselectPoint: this.deselectPoint,
						deregisterPoint: this.deregisterPoint
					};
					trendItems.push(point);
				});
				this.setState({
					zScale,
					trendItems,
					zValues: allZ,
					zAverage: mean(allZ),
					zTicks: zScale.ticks(7)
				});
			}
		}
		selectBar(barIdentifier, isTouch = false) {
			if (!this.props.enableHighlight) return;
			if (isTouch && this.state.activeBar === barIdentifier) {
				this.deselectBar();
				return;
			}
			this.setState({ activeBar: barIdentifier }, () => {
				forEach(this.dataPoints, (value) => {
					value.updateActive(this.state.activeBar);
				});
				this.prepareTooltip(barIdentifier);
			});
		}
		selectPoint(pointIdentifier, isTouch = false) {
			if (!this.props.enableHighlight) return;
			if (isTouch && this.state.activePoint === pointIdentifier) {
				this.deselectPoint();
				return;
			}
			this.setState({ activePoint: pointIdentifier }, () => {
				forEach(this.trendlineData, (value) => {
					value.updateActive(this.state.activePoint);
				});
				this.preparePointTooltip(pointIdentifier);
			});
		}
		deselectBar() {
			if (!this.props.enableHighlight) return;
			this.setState({ activeBar: null }, () => {
				forEach(this.dataPoints, (value) => {
					value.updateActive(this.state.activeBar);
				});
				this.props.showTooltip(null, 0, 0);
			});
		}
		deselectPoint() {
			if (!this.props.enableHighlight) return;
			this.setState({ activePoint: null }, () => {
				forEach(this.trendlineData, (value) => {
					value.updateActive(this.state.activePoint);
				});
				this.props.showTooltip(null, 0, 0);
			});
		}
		deregisterBar(barIdentifier) {
			delete this.dataPoints[barIdentifier];
		}
		deregisterPoint(pointIdentifier) {
			delete this.trendlineData[pointIdentifier];
		}
		prepareTooltip(barIdentifier) {
			const groupIndex = barIdentifier.split("-")[0];
			const groupLabel = this.props.groups[groupIndex];
			const subIndex = barIdentifier.split("-")[1];
			const yValue = this.props.ySeries[groupIndex][subIndex];
			const chartTop = this.divRef.offsetTop;
			const chartLeft = this.divRef.offsetLeft;
			let yPos = chartTop + (this.state.graphHeight - this.state.yScale(0));
			if (yValue >= 0) {
				const barHeight = this.state.yScale(yValue) - this.state.yScale(0);
				yPos -= barHeight / 2;
			} else {
				const barHeight = this.state.yScale(0) - this.state.yScale(yValue);
				yPos += barHeight / 2;
			}
			const xPos = chartLeft + this.state.items[groupIndex].x + this.state.items[groupIndex].width + this.props.padding.left;
			const rawPercent = yValue / sum(this.state.yValues);
			let percentage = "N/A";
			if (!isNaN(rawPercent)) {
				percentage = Math.round(rawPercent * 1e3) / 10;
				if (percentage % 1 === 0) percentage += ".0";
			}
			this.props.showTooltip({
				type: "bar",
				xValue: this.state.items[groupIndex].dataX,
				yValue: this.state.items[groupIndex].dataY,
				percentage,
				group: groupLabel
			}, xPos, yPos, this.state.items[groupIndex].width);
		}
		preparePointTooltip(pointIdentifier) {
			const groupIndex = pointIdentifier.split("-")[0];
			const groupLabel = this.props.groups[groupIndex];
			const zValue = this.props.zSeries[groupIndex];
			const chartTop = this.divRef.offsetTop;
			const chartLeft = this.divRef.offsetLeft;
			const point = this.state.trendItems[groupIndex];
			const xPos = chartLeft + (point.x - 9) + this.state.items[groupIndex].width + this.props.padding.left;
			const yPos = chartTop + point.y;
			this.props.showTooltip({
				type: "point",
				xValue: this.state.items[groupIndex].dataX,
				zValue,
				group: groupLabel
			}, xPos, yPos, this.state.items[groupIndex].width);
		}
		render() {
			const bars = this.state.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(BarTrendlineItem, {
				identifier: item.identifier,
				dataY: item.dataY,
				dataX: item.dataX,
				graphHeight: item.graphHeight,
				height: item.height,
				width: item.width,
				x: item.x,
				y: item.y,
				color: item.color,
				description: item.description,
				selectBar: item.selectBar,
				deselectBar: item.deselectBar,
				deregisterBar: item.deregisterBar,
				ref: (component) => {
					this.dataPoints[item.identifier] = component;
				}
			}, item.key));
			let radius = 6;
			let strokeWidth = 3;
			if (this.props.visualizationPeriod === "quarter") {
				radius = 4;
				strokeWidth = 2;
			}
			if (this.props.visualizationPeriod === "month") {
				radius = 3;
				strokeWidth = 2;
			}
			const points = this.state.trendItems.map((point) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(PointItem, {
				identifier: point.identifier,
				description: point.description,
				x: point.x,
				y: point.y,
				stroke: point.stroke,
				color: point.color,
				radius,
				strokeWidth,
				selectPoint: point.selectPoint,
				deselectPoint: point.deselectPoint,
				deregisterPoint: point.deregisterPoint,
				ref: (component) => {
					this.trendlineData[point.identifier] = component;
				}
			}, point.key));
			let lines = null;
			if (this.state.trendItems.length > 1) {
				let lineStrokeWidth = 3;
				if (this.props.visualizationPeriod === "quarter" || this.props.visualizationPeriod === "month") lineStrokeWidth = 2;
				const style = {
					stroke: this.props.legend[1].stroke,
					strokeWidth: lineStrokeWidth
				};
				lines = this.state.trendItems.map((point, index) => {
					if (index + 1 < this.state.trendItems.length) {
						const nextPoint = this.state.trendItems[index + 1];
						const description = `Line with slope ${formatNumberWithPrecision(-(nextPoint.y - point.y) / (nextPoint.x - point.x), 2)}`;
						return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", {
							"aria-label": description,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("line", {
								x1: point.x,
								y1: point.y,
								x2: nextPoint.x,
								y2: nextPoint.y,
								style
							})]
						}, `line-${point.key}`);
					}
					return null;
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
				ref: (div) => {
					this.divRef = div;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("svg", {
					className: "bar-graph",
					width: this.props.width,
					height: this.props.height + 20,
					ref: (svg) => {
						this.svgRef = svg;
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", {
						className: "bar-graph-body",
						transform: "translate(0,20)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(BarYAxis, {
								height: this.props.height - this.props.padding.bottom,
								width: this.props.width - this.props.padding.left - this.props.padding.right,
								padding: this.props.padding,
								data: this.state.yValues,
								scale: this.state.yScale,
								ticks: this.state.yTicks,
								average: this.state.yAverage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(BarXAxis, {
								top: this.props.height - this.props.padding.bottom,
								width: this.props.width - this.props.padding.left - this.props.padding.right,
								padding: this.props.padding,
								data: this.state.xValues,
								rawLabels: this.state.rawLabels,
								scale: this.state.xScale,
								axisPos: this.state.xAxisPos,
								visualizationPeriod: this.props.visualizationPeriod
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(BarTrendlineAxis, {
								height: this.props.height - this.props.padding.bottom,
								width: this.props.width - this.props.padding.left - this.props.padding.right,
								padding: this.props.padding,
								data: this.state.zValues,
								scale: this.state.zScale,
								ticks: this.state.zTicks,
								average: this.state.zAverage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("g", {
								className: "bar-data",
								transform: `translate(${this.props.padding.left},0)`,
								children: bars
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", {
								className: "trendline-data",
								transform: `translate(${this.props.padding.left},0)`,
								children: [lines, points]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("g", {
								className: "legend-container",
								transform: `translate(
                                ${this.props.padding.left},
                                ${this.props.height - 20})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(BarChartTrendlineLegend, { legend: this.props.legend })
							})
						]
					})
				})
			});
		}
	};
	BarChartTrendline.propTypes = propTypes$15;
	BarChartTrendline.defaultProps = defaultProps;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/PointTooltip.jsx
/**
* TimeVisualizationTooltip.jsx
* Created by Lizzie Salita 7/16/18
*/
var import_jsx_runtime$18, propTypes$14, TimeVisualizationTooltip;
var init_PointTooltip = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$18 = require_jsx_runtime();
	propTypes$14 = {
		y: PropTypes.number,
		x: PropTypes.number,
		data: PropTypes.object,
		barWidth: PropTypes.number,
		chartWidth: PropTypes.number
	};
	TimeVisualizationTooltip = class extends React.Component {
		componentDidMount() {
			this.positionTooltip();
		}
		positionTooltip() {
			const tooltipWidth = this.div.offsetWidth;
			let direction = "left";
			if (tooltipWidth + this.props.x >= this.props.chartWidth - 20) direction = "right";
			let offset = 27 - this.props.barWidth;
			if (direction === "right") offset = -9 - tooltipWidth - this.props.barWidth;
			this.div.style.top = `${this.props.y}px`;
			this.div.style.left = `${this.props.x + offset}px`;
			this.div.className = `tooltip ${direction}`;
			this.pointerDiv.className = `tooltip-pointer ${direction}`;
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
				className: "visualization-tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "tooltip",
					ref: (div) => {
						this.div = div;
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
							className: "tooltip-pointer",
							ref: (div) => {
								this.pointerDiv = div;
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
							className: "tooltip-title",
							children: this.props.data.group
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
							className: "tooltip-body",
							children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "tooltip-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
									className: "tooltip-value",
									children: formatNumber(this.props.data.zValue)
								}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
									className: "tooltip-label",
									children: "New Awards"
								})]
							})
						})
					]
				})
			});
		}
	};
	TimeVisualizationTooltip.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/sharedComponents/ChartNoResults.jsx
var import_jsx_runtime$17, ChartNoResults;
var init_ChartNoResults = __esmMin((() => {
	import_jsx_runtime$17 = require_jsx_runtime();
	ChartNoResults = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
		className: "visualization-message-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
			className: "visualization-no-results",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", { className: "no-results-icon" }),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
					className: "title",
					children: "No results found."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
					className: "description",
					children: "Try again using different filters."
				})
			]
		})
	});
}));
//#endregion
//#region src/js/components/sharedComponents/ChartLoadingMessage.jsx
var import_jsx_runtime$16, ChartLoadingMessage;
var init_ChartLoadingMessage = __esmMin((() => {
	init_LoadingSpinner();
	import_jsx_runtime$16 = require_jsx_runtime();
	ChartLoadingMessage = () => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
		className: "visualization-message-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
			className: "visualization-loading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(LoadingSpinner, {}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "message",
				children: "Gathering your data..."
			})]
		})
	});
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/TimeTooltip.jsx
var import_jsx_runtime$15, propTypes$13, TimeTooltip;
var init_TimeTooltip = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$13 = {
		y: PropTypes.number,
		x: PropTypes.number,
		data: PropTypes.object,
		barWidth: PropTypes.number,
		chartWidth: PropTypes.number
	};
	TimeTooltip = ({ y, x, data, barWidth, chartWidth }) => {
		let divRef = useRef(null);
		let pointerDivRef = useRef(null);
		const positionTooltip = useCallback(() => {
			const tooltipWidth = divRef.offsetWidth;
			let direction = "left";
			if (tooltipWidth + x >= chartWidth - 20) direction = "right";
			let offset = 9;
			if (direction === "right") offset = -9 - tooltipWidth - barWidth;
			divRef.style.top = `${y}px`;
			divRef.style.left = `${x + offset}px`;
			divRef.className = `tooltip ${direction}`;
			pointerDivRef.className = `tooltip-pointer ${direction}`;
		}, [
			barWidth,
			chartWidth,
			x,
			y
		]);
		useEffect(() => {
			positionTooltip();
		}, [positionTooltip]);
		const dollarValue = formatMoneyWithUnitsShortLabel(data.yValue);
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "visualization-tooltip",
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "tooltip",
				ref: (div) => {
					divRef = div;
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "tooltip-pointer",
						ref: (div) => {
							pointerDivRef = div;
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "tooltip-title",
						children: data.xValue
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
						className: "tooltip-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "tooltip-label",
							children: "Obligations"
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "tooltip-value",
							children: dollarValue
						})]
					})
				]
			})
		});
	};
	TimeTooltip.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/RecipientTimeVisualization.jsx
/**
* RecipientTimeVisualization.jsx
* Created by Lizzie Salita 7/6/18
*/
var import_jsx_runtime$14, legend, propTypes$12, RecipientTimeVisualization;
var init_RecipientTimeVisualization = __esmMin((() => {
	init_index_esm();
	init_BarChartTrendline();
	init_PointTooltip();
	init_ChartNoResults();
	init_ChartError();
	init_ChartLoadingMessage();
	init_TimeTooltip();
	import_jsx_runtime$14 = require_jsx_runtime();
	legend = [{
		color: "#141D3B",
		stroke: "#141D3B",
		label: "All Transactions",
		offset: 0
	}, {
		color: "#FFFFFF",
		stroke: "#F5A623",
		label: "Count of New Awards",
		offset: 120
	}];
	propTypes$12 = {
		width: PropTypes.number,
		height: PropTypes.number,
		data: PropTypes.object,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		visualizationPeriod: PropTypes.string
	};
	RecipientTimeVisualization = ({ width = 0, height = 280, data = {
		groups: [],
		xSeries: [],
		ySeries: [],
		zSeries: [],
		rawLabels: []
	}, loading, error, visualizationPeriod }) => {
		const [tooltipData, setTooltipData] = useState(data);
		const [tooltipX, setTooltipX] = useState(0);
		const [tooltipY, setTooltipY] = useState(0);
		const [barWidth, setBarWidth] = useState(0);
		let tooltip = null;
		if (tooltipData && window.innerWidth > 720) {
			if (tooltipData.type === "bar") tooltip = /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(TimeTooltip, {
				barWidth,
				data: tooltipData,
				x: tooltipX,
				y: tooltipY,
				chartWidth: width
			});
			else if (tooltipData.type === "point") tooltip = /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(TimeVisualizationTooltip, {
				barWidth,
				data: tooltipData,
				x: tooltipX,
				y: tooltipY,
				chartWidth: width
			});
		}
		const showTooltipFunc = (ttData, ttX, ttY, ttWidth) => {
			setTooltipData(ttData);
			setTooltipX(ttX);
			setTooltipY(ttY);
			setBarWidth(ttWidth);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "recipient-visualization__time-wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Q, { children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(le, {
				classNames: "visualization-content-fade",
				timeout: {
					exit: 225,
					enter: 195
				},
				exit: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", { children: [
					data.groups.length > 0 && !loading && !error && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(BarChartTrendline, {
						height,
						width,
						ySeries: data.ySeries,
						xSeries: data.xSeries,
						zSeries: data.zSeries,
						groups: data.groups,
						rawLabels: data.rawLabels,
						legend,
						showTooltip: showTooltipFunc,
						visualizationPeriod,
						activeLabel: tooltipData
					}),
					data.groups.length === 0 && !loading && !error && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ChartNoResults, {}),
					error && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ChartError, {}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ChartLoadingMessage, {})
				] })
			}) }), tooltip]
		});
	};
	RecipientTimeVisualization.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/RecipientTimeVisualizationSectionHeader.jsx
var import_jsx_runtime$13, propTypes$11, RecipientTimeVisualizationSectionHeader;
var init_RecipientTimeVisualizationSectionHeader = __esmMin((() => {
	init_index_es();
	init_dist();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$11 = { sectionHrRef: PropTypes.object };
	RecipientTimeVisualizationSectionHeader = ({ sectionHrRef }) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ws, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(FontAwesomeIcon, {
				icon: "chart-bar",
				size: "2x"
			}),
			title: "Transactions Over Time",
			titleTooltip: { component: false },
			descTooltip: { component: false }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("hr", {
			className: "results-divider",
			ref: sectionHrRef
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "recipient-section__description",
			children: "This graph shows trends over time for all transactions to this recipient. Hover over the bars for more detailed information."
		})
	] });
	RecipientTimeVisualizationSectionHeader.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/TimeVisualizationPeriodButton.jsx
var import_jsx_runtime$12, propTypes$10, TimeVisualizationPeriodButton;
var init_TimeVisualizationPeriodButton = __esmMin((() => {
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$10 = {
		active: PropTypes.bool,
		value: PropTypes.string,
		label: PropTypes.string,
		changePeriod: PropTypes.func
	};
	TimeVisualizationPeriodButton = ({ active, value, label, changePeriod }) => {
		const clickedButton = () => {
			changePeriod(value);
		};
		let activeClass = "";
		if (active) activeClass = " active";
		let description = `Show results by ${label.toLowerCase()}`;
		if (active) description += " (currently selected)";
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("button", {
			className: `period-button${activeClass}`,
			value,
			title: description,
			"aria-label": description,
			onClick: clickedButton,
			children: label
		});
	};
	TimeVisualizationPeriodButton.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/RecipientTimeVisualizationSectionButtons.jsx
var import_jsx_runtime$11, propTypes$9, RecipientTimeVisualizationSectionButtons;
var init_RecipientTimeVisualizationSectionButtons = __esmMin((() => {
	init_TimeVisualizationPeriodButton();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$9 = {
		visualizationPeriod: PropTypes.string,
		updateVisualizationPeriod: PropTypes.func
	};
	RecipientTimeVisualizationSectionButtons = ({ visualizationPeriod, updateVisualizationPeriod }) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
		className: "recipient-visualization-period",
		children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: "visualization-period",
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(TimeVisualizationPeriodButton, {
						value: "fiscal_year",
						label: "Years",
						active: visualizationPeriod === "fiscal_year",
						changePeriod: updateVisualizationPeriod
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(TimeVisualizationPeriodButton, {
						value: "quarter",
						label: "Quarter",
						active: visualizationPeriod === "quarter",
						changePeriod: updateVisualizationPeriod
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(TimeVisualizationPeriodButton, {
						value: "month",
						label: "Month",
						active: visualizationPeriod === "month",
						changePeriod: updateVisualizationPeriod
					}) })
				] })
			})
		})
	});
	RecipientTimeVisualizationSectionButtons.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/recipient/spendingOverTime/RecipientTimeVisualizationSection.jsx
/**
* RecipientTimeVisualizationSection.jsx
* Created by Lizzie Salita 7/6/18
*/
var import_jsx_runtime$10, propTypes$8, RecipientTimeVisualizationSection;
var init_RecipientTimeVisualizationSection = __esmMin((() => {
	init_index_es();
	init_RecipientTimeVisualization();
	init_RecipientTimeVisualizationSectionHeader();
	init_RecipientTimeVisualizationSectionButtons();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$8 = {
		data: PropTypes.object,
		visualizationPeriod: PropTypes.string,
		updateVisualizationPeriod: PropTypes.func,
		loading: PropTypes.bool,
		error: PropTypes.bool
	};
	RecipientTimeVisualizationSection = ({ data, visualizationPeriod, updateVisualizationPeriod, loading, error }) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const sectionHrRef = useRef(null);
		useEffect(() => {
			let isMounted = true;
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth && isMounted) setWindowWidth(newWidth);
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => {
				isMounted = false;
				window.removeEventListener("resize", handleResize);
			};
		}, [windowWidth]);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(Qs, {
			id: "recipient-transactions-over-time",
			className: "recipient-section transactions-over-time",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(RecipientTimeVisualizationSectionHeader, { sectionHrRef }),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(RecipientTimeVisualizationSectionButtons, {
					visualizationPeriod,
					updateVisualizationPeriod
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(RecipientTimeVisualization, {
					visualizationPeriod,
					loading,
					error,
					data,
					width: sectionHrRef.current?.offsetWidth,
					color: "#141D3B"
				})
			]
		});
	};
	RecipientTimeVisualizationSection.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/containers/recipient/RecipientTimeVisualizationSectionContainer.jsx
/**
* RecipientTimeVisualizationSectionContainer.jsx
* Created by Lizzie Salita 7/6/18
*/
var import_jsx_runtime$9, dayjs, propTypes$7, logPeriodEvent, RecipientTimeVisualizationSectionContainer;
var init_RecipientTimeVisualizationSectionContainer = __esmMin((() => {
	init_axios();
	init_RecipientTimeVisualizationSection();
	init_Analytics();
	init_fiscalYearHelper();
	init_searchHelper();
	init_recipientHelper();
	init_monthHelper();
	import_jsx_runtime$9 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	propTypes$7 = { recipient: PropTypes.object };
	logPeriodEvent = (period) => {
		Analytics.event({
			event: "recipient_profile_viz_time_period",
			category: "Recipient - Time - Period",
			action: period
		});
	};
	RecipientTimeVisualizationSectionContainer = ({ recipient }) => {
		const [visualizationPeriod, setVisualizationPeriod] = useState("fiscal_year");
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [groups, setGroups] = useState([]);
		const [xSeries, setXSeries] = useState([]);
		const [ySeries, setYSeries] = useState([]);
		const [zSeries, setZSeries] = useState([]);
		const [rawLabels, setRawLabels] = useState([]);
		const request = useRef(null);
		const trendLineRequest = useRef(null);
		const timePeriod = useMemo(() => {
			const earliestYear = earliestFiscalYear;
			const thisYear = currentFiscalYear();
			const startDate = convertFYToDateRange(earliestYear)[0];
			let endDate = convertFYToDateRange(thisYear)[1];
			if (visualizationPeriod !== "fiscal_year") endDate = dayjs().endOf("month").format("YYYY-MM-DD");
			return [{
				start_date: startDate,
				end_date: endDate
			}];
		}, [visualizationPeriod]);
		const generateTime = (group, period, type) => {
			const month = convertNumToShortMonth(period.month);
			const year = convertMonthToFY(period.month, period.fiscal_year);
			if (group === "fiscal_year") return type === "label" ? `FY ${period.fiscal_year}` : {
				period: null,
				year: `FY ${period.fiscal_year}`
			};
			else if (group === "quarter") return type === "label" ? `Q${period.quarter} FY ${period.fiscal_year}` : {
				period: `Q${period.quarter}`,
				year: `FY ${period.fiscal_year}`
			};
			return type === "label" ? `${month} ${year}` : {
				period: `${month}`,
				year: `${year}`
			};
		};
		const parseData = useCallback((data) => {
			const newGroups = [];
			const newXSeries = [];
			const newYSeries = [];
			const newRawLabels = [];
			data.results.forEach((item) => {
				newGroups.push(generateTime(visualizationPeriod, item.time_period, "label"));
				newXSeries.push([generateTime(visualizationPeriod, item.time_period, "label")]);
				newYSeries.push([parseFloat(item.aggregated_amount)]);
				newRawLabels.push(generateTime(visualizationPeriod, item.time_period, "raw"));
			});
			setGroups(newGroups);
			setXSeries(newXSeries);
			setYSeries(newYSeries);
			setRawLabels(newRawLabels);
			setLoading(false);
			setError(false);
		}, [visualizationPeriod]);
		const fetchData = useCallback(() => {
			setLoading(true);
			setError(false);
			if (request.current) request.current.cancel();
			const searchParams = { recipient_id: recipient.id };
			searchParams.time_period = timePeriod;
			const apiParams = {
				group: visualizationPeriod,
				filters: searchParams
			};
			apiParams.auditTrail = "Recipient Spending Over Time Visualization";
			request.current = performSpendingOverTimeSearch(apiParams);
			request.current.promise.then((res) => {
				parseData(res.data);
				request.current = null;
			}).catch((err) => {
				if (isCancel(err)) return;
				request.current = null;
				console.log(err);
				setLoading(false);
				setError(true);
			});
		}, [
			parseData,
			recipient.id,
			timePeriod,
			visualizationPeriod
		]);
		const parseTrendLineData = (results) => {
			const newZSeries = [];
			results.forEach((item) => {
				newZSeries.push(parseFloat(item.new_award_count_in_period));
			});
			setZSeries(newZSeries);
		};
		const fetchTrendLineData = useCallback(() => {
			if (trendLineRequest.current) trendLineRequest.current.cancel();
			const searchParams = { recipient_id: recipient.id };
			searchParams.time_period = timePeriod;
			trendLineRequest.current = fetchNewAwardCounts({
				group: visualizationPeriod,
				filters: searchParams
			});
			trendLineRequest.current.promise.then((res) => {
				parseTrendLineData(res.data.results);
				trendLineRequest.current = null;
			}).catch((err) => {
				if (isCancel(err)) return;
				trendLineRequest.current = null;
				console.log(err);
			});
		}, [
			recipient.id,
			timePeriod,
			visualizationPeriod
		]);
		useEffect(() => {
			fetchData();
			fetchTrendLineData();
			logPeriodEvent(visualizationPeriod);
		}, [
			visualizationPeriod,
			recipient.id,
			fetchTrendLineData,
			fetchData
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(RecipientTimeVisualizationSection, {
			data: {
				xSeries,
				ySeries,
				zSeries,
				groups,
				rawLabels
			},
			loading,
			error,
			visualizationPeriod,
			updateVisualizationPeriod: setVisualizationPeriod
		});
	};
	RecipientTimeVisualizationSectionContainer.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/containers/recipient/topFive/TopFiveContainer.jsx
/**
* TopFiveContainer.jsx
* Created by Kwadwo Opoku-Debrah 07/10/18
*/
var import_jsx_runtime$8, propTypes$6, TopFiveContainer, TopFiveContainer_default;
var init_TopFiveContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_fiscalYearHelper();
	init_searchHelper();
	init_BaseStateCategoryResult();
	init_TopFive();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$6 = {
		total: PropTypes.number,
		category: PropTypes.string,
		fy: PropTypes.string,
		recipientHash: PropTypes.string,
		recipientName: PropTypes.string,
		agencyData: PropTypes.object
	};
	TopFiveContainer = ({ total, category, fy, recipientHash, recipientName, agencyData }) => {
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [results, setResults] = useState([]);
		const [noResults, setNoResults] = useState(false);
		let request = null;
		const dataParams = () => {
			let timePeriod = null;
			if (fy === "latest") {
				const trailing = getTrailingTwelveMonths();
				timePeriod = {
					start_date: trailing[0],
					end_date: trailing[1]
				};
			} else if (fy === "all") {
				const currentFY = currentFiscalYear();
				const earliestRange = convertFYToDateRange(parseInt(earliestFiscalYear, 10));
				const latestRange = convertFYToDateRange(parseInt(currentFY, 10));
				timePeriod = {
					start_date: earliestRange[0],
					end_date: latestRange[1]
				};
			} else if (fy !== "all" && fy) {
				const range = convertFYToDateRange(parseInt(fy, 10));
				timePeriod = {
					start_date: range[0],
					end_date: range[1]
				};
			}
			const filters = {
				recipient_id: recipientHash,
				recipient_name: recipientName
			};
			if (timePeriod) filters.time_period = [timePeriod];
			return {
				filters,
				category,
				limit: 5,
				page: 1
			};
		};
		const parseResults = (data, type) => {
			if (data.length < 1) setNoResults(true);
			else {
				const parsed = data.map((item, index) => {
					const result = Object.create(BaseStateCategoryResult);
					result.populate(item, index + 1);
					if (type === "awarding_agency" || type === "awarding_subagency") result.nameTemplate = (code, name) => {
						if (code) return `${name} (${code})`;
						return name;
					};
					else if (type === "country" || type === "state_territory") result.nameTemplate = (name) => name;
					return result;
				});
				setLoading(false);
				setError(false);
				setResults(parsed);
			}
		};
		const loadCategory = () => {
			if (request) request.cancel();
			setLoading(true);
			setError(false);
			request = performSpendingByCategorySearch(dataParams());
			request.promise.then((res) => {
				parseResults(res.data.results, res.data.category);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.error(err);
					setLoading(false);
					setError(true);
				}
			});
		};
		useEffect(() => {
			loadCategory();
		}, [recipientHash, fy]);
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: !noResults && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(TopFive, {
			category,
			total,
			dataParams: dataParams(),
			loading,
			error,
			results,
			agencyData
		}) });
	};
	TopFiveContainer.propTypes = propTypes$6;
	TopFiveContainer_default = connect_default((state) => ({
		total: state.recipient.overview._totalAmount,
		fy: state.recipient.fy,
		recipientHash: state.recipient.id,
		recipientName: state.recipient.overview.name
	}))(TopFiveContainer);
}));
//#endregion
//#region src/js/components/recipient/topFive/TopFiveSection.jsx
var import_jsx_runtime$7, TopFiveSection;
var init_TopFiveSection = __esmMin((() => {
	init_topCategories();
	init_TopFiveContainer();
	init_dist();
	init_index_es();
	init_useAgencySlugs();
	import_jsx_runtime$7 = require_jsx_runtime();
	TopFiveSection = () => {
		const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
		const agencyData = {
			agencySlugs,
			slugsLoading,
			slugsError
		};
		const content = recipientCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(TopFiveContainer_default, {
			agencyData,
			category
		}, category));
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Qs, {
			className: "recipient-section topfive",
			id: "recipient-top-five",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ws, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
						icon: "table",
						size: "2x"
					}),
					title: "Top 5",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("hr", { className: "results-divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "state-section__description",
					children: "The set of tables below provide a summary of awards to this recipient through multiple angles. To see more than the top 5, you can visit our Advanced Search page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "topfive__content",
					children: content
				})
			]
		});
	};
}));
//#endregion
//#region src/js/components/recipient/InfoTooltipContent.jsx
var import_jsx_runtime$6, recipientOverviewLoanInfo;
var init_InfoTooltipContent = __esmMin((() => {
	import_jsx_runtime$6 = require_jsx_runtime();
	recipientOverviewLoanInfo = /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		className: "recipient-overview-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "tooltip__title",
			children: "Face Value of Loans"
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", { children: "About Face Value of Loans" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: "From a budget perspective, the face value of loans is not considered Federal spending, since it does not in itself represent a long-term cost to the government. Thus, the face value of loans is not included in the Total Awarded Amount figure above or in any other part of this page where dollar amounts appear." }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", { children: "What’s Included in Total Awarded Amount" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: "While the face value of loans amounts are not included in the total award amount, the loan subsidy cost is included. All subsidy costs associated with loans this recipient has received during the filtered time period are captured within the \"Total Awarded Amount\" number above and anywhere else on this page dollar amounts are mentioned." }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", { children: "About Loan Subsidy Cost" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: "Subsidy cost is considered actual budgetary federal spending. The subsidy cost is the calculated net present value of the loan or loan guarantee to the government. It takes into account the size of the loan (face value), the interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full. Subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations." })
			]
		})]
	});
}));
//#endregion
//#region src/js/components/sharedComponents/FaceValueOfLoans.jsx
var import_jsx_runtime$5, propTypes$5, FaceValueOfLoans;
var init_FaceValueOfLoans = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$5 = {
		amount: PropTypes.string.isRequired,
		heading: PropTypes.string.isRequired,
		headingClass: PropTypes.string.isRequired,
		transactions: PropTypes.string.isRequired,
		tooltipComponent: PropTypes.element,
		tooltipClasses: PropTypes.string,
		tooltipPosition: PropTypes.string,
		tooltipIcon: PropTypes.string,
		primeAwards: PropTypes.bool
	};
	FaceValueOfLoans = (props) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "totals",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "totals__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h3", {
					className: props.headingClass,
					children: props.heading
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ds, {
					className: props.tooltipClasses,
					tooltipPosition: props.tooltipPosition,
					icon: props.tooltipIcon,
					wide: true,
					tooltipComponent: props.tooltipComponent
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "totals__amount",
				children: props.amount
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "totals__awards",
				children: ["from ", props.primeAwards ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "state-overview__total",
						children: props.transactions
					}),
					" ",
					props.transactions === "1" ? "prime award" : "prime awards"
				] }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "state-overview__total",
						children: props.transactions
					}),
					" ",
					props.transactions === "1" ? "transaction" : "transactions"
				] })]
			})
		]
	});
	FaceValueOfLoans.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/recipient/RecipientMultiParentCollapse.jsx
/**
* RecipientMultiParentCollapse.jsx
* Created by Kwadwo Opoku-Debrah 12/21/18
*/
var import_jsx_runtime$4, propTypes$4, RecipientMultiParentCollapse;
var init_RecipientMultiParentCollapse = __esmMin((() => {
	init_development();
	init_Icons();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = { parents: PropTypes.array };
	RecipientMultiParentCollapse = (props) => {
		const [open, setOpen] = useState(false);
		const collapse = () => {
			setOpen((prevState) => !prevState);
		};
		const renderMultipleParents = () => {
			const drawnArray = [];
			for (let i = 1; i < props.parents.length; i++) {
				const currentValue = props.parents[i];
				drawnArray.push(/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(Link, {
					className: "recipient-overview__multiparents",
					to: `/recipient/${currentValue.parent_id}/latest`,
					children: [currentValue.parent_name, currentValue.parent_duns ? `(${currentValue.parent_duns})` : ""]
				}, currentValue.parent_duns));
			}
			return drawnArray;
		};
		const isSingleParent = props.parents.length < 2;
		const initialParent = props.parents[0];
		let initialDuns = "";
		if (initialParent.parent_duns) initialDuns = `(${initialParent.parent_duns})`;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "recipient-overview__parent",
			children: isSingleParent ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "recipient-overview__parent",
				children: ["This recipient is a child of \xA0", /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
					className: "recipient-overview__parent-link",
					to: `/recipient/${initialParent.parent_id}/latest`,
					children: initialParent.parent_name
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "recipient-overview__parent",
				children: [
					"This recipient is associated with multiple parents in the dataset:",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
						className: "tooltip-popover-container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(InfoCircle, {}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
							className: "tooltip-popover above",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(InfoCircle, {}) }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
									className: "title",
									children: "Explanation of Multiple Parents"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
									className: "title",
									children: "This recipient is associated with multiple parents in the dataset. Among other cases, this could result from:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", { children: "1) A legal entity was bought or sold to another legal entity" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", { children: "2) An internal restructuring of a large company caused a legal entity to list another parent" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", { children: "3) A new entity was created to be used solely as the parent legal entity for a large organization" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", { children: "4) Data entry errors of parent information in SAM.gov or Dun and Bradstreet that were not immediately corrected" })
							] })]
						})]
					}),
					" \xA0",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
						className: "recipient-overview__multiparents",
						to: `/recipient/${initialParent.parent_id}/latest`,
						children: initialParent.parent_name
					}, initialDuns),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: open ? "" : "hide",
						children: renderMultipleParents()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
						className: "usa-button-link",
						onClick: collapse,
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", { children: ["Hide ", /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AngleDown, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", { children: [
							"Show ",
							props.parents.length - 1,
							" more"
						] })
					})
				]
			})
		});
	};
	RecipientMultiParentCollapse.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/recipient/RecipientOverview.jsx
var import_immutable, import_jsx_runtime$3, propTypes$3, RecipientOverview;
var init_RecipientOverview = __esmMin((() => {
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_axios();
	init_index_es();
	init_searchFiltersReducer();
	init_dist();
	init_development();
	init_InfoTooltipContent();
	init_recipientIdentifiers();
	init_searchHelper();
	init_FaceValueOfLoans();
	init_RecipientMultiParentCollapse();
	init_GlobalConstants();
	init_InfoTooltipContent$1();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		recipient: PropTypes.object,
		showChildRecipientModal: PropTypes.func,
		showAlternateNamesRecipientModal: PropTypes.func
	};
	RecipientOverview = (props) => {
		const recipient = props.recipient.overview;
		let label = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "recipient-overview__label",
			children: "Recipient"
		});
		let viewChildren = null;
		let parent = null;
		if (recipient.level === "C") {
			label = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "recipient-overview__label recipient-overview__label_child",
				children: "Child Recipient"
			});
			parent = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(RecipientMultiParentCollapse, { parents: recipient.parents });
		} else if (recipient.level === "P") {
			label = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "recipient-overview__label recipient-overview__label_parent",
				children: "Parent Recipient"
			});
			viewChildren = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
				className: "recipient-overview__children-button",
				onClick: props.showChildRecipientModal,
				children: ["View child recipients ", /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, { icon: "caret-right" })]
			});
		}
		const numberOfAlternateNames = recipient.alternateNames.length;
		const pluralizeAltNamesLabel = numberOfAlternateNames > 1 ? "names" : "name";
		const viewAlternateNames = numberOfAlternateNames > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
			className: "recipient-overview__alternate-names-button",
			onClick: props.showAlternateNamesRecipientModal,
			children: [
				`Also known by ${numberOfAlternateNames} other ${pluralizeAltNamesLabel}`,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, { icon: "caret-right" })
			]
		}) : null;
		let address = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", { children: "Address not provided in source system" });
		let congressionalDistrict = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", { children: "Not provided" });
		if (recipient.location.streetAddress && recipient.location.regionalAddress && recipient.location.fullCongressionalDistrict) {
			address = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: recipient.location.streetAddress }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: recipient.location.regionalAddress })] });
			congressionalDistrict = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: recipient.location.congressionalDistrict }) });
		} else if (recipient.location.streetAddress && recipient.location.regionalAddress) address = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: recipient.location.streetAddress }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: recipient.location.regionalAddress })] });
		let businessTypes = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", { children: "Not provided in source system" });
		if (recipient.businessTypes.length > 0) businessTypes = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", {
			className: "recipient-section__details-table-last-td",
			children: recipient.businessTypes.map((type, i) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: type }, i))
		});
		const getSelectedHash = (uei) => {
			let filters = null;
			if (recipient.level === "P") filters = {
				filters: {
					...initialState,
					keyword: { [uei]: uei }
				},
				version: globalConstants.REQUEST_VERSION
			};
			else {
				const filter = new import_immutable.Set().add(uei);
				filters = {
					filters: {
						...initialState,
						selectedRecipients: filter
					},
					version: REQUEST_VERSION
				};
			}
			let tempHash = generateUrlHash(filters);
			tempHash.promise.then((results) => {
				const hashData = results.data;
				window.open(`/search/?hash=${hashData.hash}`, "_blank");
				tempHash = null;
			}).catch((error) => {
				console.log(error);
				if (isCancel(error)) {} else if (error.response) (void 0).hash = null;
				else {
					tempHash = null;
					console.log(error);
				}
			});
		};
		const handleGoToAdvancedSearch = (e) => {
			e.preventDefault();
			getSelectedHash(recipient.uei);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(Qs, {
			id: "recipient-overview",
			className: "recipient-section recipient-overview",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("h2", {
					className: "recipient-overview__title",
					children: [recipient.name, viewAlternateNames]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ws, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, {
						icon: "building",
						size: "2x"
					}),
					title: "Overview",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("hr", { className: "results-divider" }),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "recipient-overview__content",
					children: [
						parent,
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "recipient-overview__children",
							children: [label, viewChildren]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "recipient-section__row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)($s, {
								desktop: 5,
								className: "recipient-section__viz totals-container",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "recipient-section__viz totals",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h3", {
											className: "recipient-overview__heading",
											children: "Total Awarded Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
											className: "totals__amount",
											children: recipient.totalAmount
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
											className: "totals__awards",
											children: [
												"from ",
												/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
													className: "state-overview__total",
													children: recipient.totalTransactions
												}),
												" transactions"
											]
										}),
										recipient.uei !== "" && recipient.uei !== null && recipient.uei !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Link, {
											className: "recipient-section__award-button",
											target: "_blank",
											rel: "noopener noreferrer",
											to: "/search",
											onClick: handleGoToAdvancedSearch,
											children: "View awards to this recipient"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "recipient-section__viz loan",
									children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FaceValueOfLoans, {
										amount: recipient.totalLoanFaceValueAmount,
										transactions: recipient.totalLoanTransactions,
										heading: "Face Value of Loans",
										headingClass: "recipient-overview__heading",
										tooltipIcon: "info",
										tooltipClasses: "recipient-section__viz-loan__tt",
										tooltipComponent: recipientOverviewLoanInfo,
										tooltipPosition: "right"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)($s, {
								desktop: 5,
								className: "recipient-section__viz details",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h3", {
									className: "recipient-overview__heading",
									children: "Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("table", {
									className: "recipient-section__details-table",
									children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tbody", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
											className: "recipient-section__details-table-first-th",
											children: "Recipient Identifier"
										}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", {
											className: "recipient-section__details-table-first-td",
											children: idList(recipient.duns, recipient.uei).map((i) => i)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", { children: "Address" }), address] }),
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("th", {
											className: "details__table-cd-row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
												className: "`details__table-cd-text`",
												children: "Congressional District"
											}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ds, {
												className: "congressional-district__tt",
												icon: "info",
												tooltipPosition: "left",
												styles: { position: "relative" },
												tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CondensedCDTooltip, { title: "Congressional District" })
											})]
										}), congressionalDistrict] }),
										/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
											className: "recipient-section__details-table-last-th",
											children: "Business Types"
										}), businessTypes] })
									] })
								})]
							})]
						})
					]
				})
			]
		});
	};
	RecipientOverview.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/recipient/RecipientContent.jsx
var import_jsx_runtime$2, propTypes$2, RecipientContent;
var init_RecipientContent = __esmMin((() => {
	init_RecipientTimeVisualizationSectionContainer();
	init_TopFiveSection();
	init_RecipientOverview();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = {
		recipient: PropTypes.object,
		showChildRecipientModal: PropTypes.func,
		showAlternateNamesRecipientModal: PropTypes.func
	};
	RecipientContent = ({ recipient, showChildRecipientModal, showAlternateNamesRecipientModal }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "recipient-content-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "recipient-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RecipientOverview, {
					showChildRecipientModal,
					showAlternateNamesRecipientModal,
					recipient
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RecipientTimeVisualizationSectionContainer, { recipient }),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TopFiveSection, {})
			]
		})
	});
	RecipientContent.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/recipient/RecipientPage.jsx
/**
* RecipientPage.jsx
* Created by Lizzie Salita 8/23/17
*/
var import_jsx_runtime$1, propTypes$1, RecipientPage;
var init_RecipientPage = __esmMin((() => {
	init_index_es();
	init_development();
	init_es();
	init_queryParams();
	init_fiscalYearHelper();
	init_metaTagHelper();
	init_Loading();
	init_socialShare();
	init_stickyHeader();
	init_ChildRecipientModalContainer();
	init_AlternateNamesRecipientModalContainer();
	init_PageWrapper();
	init_Error();
	init_ShareIcon508();
	init_ProfileBackLink();
	init_modalActions();
	init_useQueryParams();
	init_RecipientContent();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		loading: PropTypes.bool,
		error: PropTypes.bool,
		id: PropTypes.string,
		recipient: PropTypes.object,
		pickedFy: PropTypes.func
	};
	RecipientPage = ({ id, recipient, loading, error, pickedFy }) => {
		const history = useNavigate();
		const query = useQueryParams();
		const [isChildModalVisible, showChildModal] = useState(false);
		const [isAlternateModalVisible, showAlternateRecipientModal] = useState(false);
		const [activeSection, setActiveSection] = useState(query.section || "overview");
		const showAlternateModal = () => showAlternateRecipientModal(true);
		const hideAlternateModal = () => showAlternateRecipientModal(false);
		const showChildRecipientModal = () => showChildModal(true);
		const hideChildRecipientModal = () => showChildModal(false);
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const slug = `recipient/${encodeURIComponent(id)}/${encodeURIComponent(recipient.fy)}`;
		const emailArgs = {
			subject: encodeURIComponent(`USAspending.gov Recipient Profile: ${recipient.overview.name}`),
			body: encodeURIComponent(`View the spending activity for this recipient on USAspending.gov: ${getBaseUrl(slug)}`)
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
		};
		const recipientSections = [
			{
				section: "overview",
				label: "Overview"
			},
			{
				section: "transactions-over-time",
				label: "Transactions Over Time"
			},
			{
				section: "top-five",
				label: "Top 5"
			}
		];
		const jumpToSection = (section = "") => {
			const sectionObj = find(recipientSections, ["section", section]);
			if (!sectionObj) return;
			const sectionDom = document.querySelector(`#recipient-${sectionObj.section}`);
			if (!sectionDom) return;
			const newQueryParams = combineQueryParams(query, { section: `${section}` });
			history({ path: `${getQueryParamString(newQueryParams)}` }, { replace: true });
			const sectionTop = sectionDom.offsetTop - 66;
			window.scrollTo({
				top: sectionTop - 55,
				left: 0,
				behavior: "smooth"
			});
			setActiveSection(section);
		};
		useEffect(() => {
			if (!loading && query.section) jumpToSection(query.section);
		}, [query.section, loading]);
		let content = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RecipientContent, {
			id,
			showChildRecipientModal,
			showAlternateNamesRecipientModal: showAlternateModal,
			recipient,
			loading,
			error
		});
		if (error) content = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Error, {
			title: "Invalid Recipient",
			message: "The recipient ID provided is invalid. Please check the ID and try again."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "recipient",
			classNames: "usa-da-recipient-page",
			title: recipient.overview.name,
			loading,
			metaTagProps: recipient.overview.id && !loading ? recipientPageMetaTags(recipient.overview) : {},
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Vs, {
				backgroundColor: "#1a4480",
				selectedFy: recipient?.fy,
				handleFyChange: pickedFy,
				options: getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())
			}, "page-wrapper__fiscal-year-picker"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareIcon508, {
				onShareOptionClick: handleShare,
				url: getBaseUrl(slug)
			}, "page-wrapper__share-icon")],
			sections: recipientSections,
			activeSection,
			jumpToSection,
			inPageNav: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("main", {
				id: "main-content",
				className: "main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ProfileBackLink, {
					label: "Back to Recipient Profile Page",
					url: "/recipient"
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(LoadingWrapper, {
					isLoading: loading,
					children: [
						content,
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChildRecipientModalContainer_default, {
							mounted: isChildModalVisible,
							hideModal: hideChildRecipientModal,
							recipient
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AlternateNamesRecipientModalContainer, {
							mounted: isAlternateModalVisible,
							hideModal: hideAlternateModal,
							recipient
						})
					]
				})]
			})
		});
	};
	RecipientPage.propTypes = propTypes$1;
	RecipientPage.defaultProps = {
		loading: true,
		error: false,
		id: "",
		recipient: {},
		pickedFy: () => {}
	};
}));
//#endregion
//#region src/_scss/pages/recipient/recipientPage.scss
var require_recipientPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/containers/recipient/RecipientContainer.jsx
/**
* RecipientContainer.jsx
* Created by Lizzie Salita 8/23/17
**/
var import_jsx_runtime, defaultFy, propTypes, RecipientContainer, RecipientContainer_default;
//#endregion
__esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_development();
	init_BaseRecipientOverview();
	init_recipientActions();
	init_recipientHelper();
	init_fiscalYearHelper();
	init_RecipientPage();
	import_jsx_runtime = require_jsx_runtime();
	require_recipientPage();
	defaultFy = "latest";
	propTypes = {
		setRecipientOverview: PropTypes.func,
		setRecipientFiscalYear: PropTypes.func,
		resetRecipient: PropTypes.func,
		recipient: PropTypes.object
	};
	RecipientContainer = (props) => {
		const history = useNavigate();
		const { recipientId, fy } = useMatch(`/recipient/:recipientId/:fy?`).params;
		const [state, setState] = useState({
			loading: true,
			error: false
		});
		const parseRecipient = (data) => {
			const recipientOverview = Object.create(BaseRecipientOverview);
			recipientOverview.populate(data);
			props.setRecipientOverview(recipientOverview);
		};
		const loadRecipientOverview = useCallback((id, year) => {
			let request;
			if (request) request.cancel();
			request = fetchRecipientOverview(id, year);
			request.promise.then((res) => {
				setState({
					loading: false,
					error: false
				});
				parseRecipient(res.data);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.error(err);
					setState({
						loading: false,
						error: true
					});
				}
			});
		});
		const updateSelectedFy = (newFy) => {
			history(`/recipient/${props.recipient.id}/${newFy}`);
			props.setRecipientFiscalYear(newFy);
		};
		useEffect(() => {
			if (fy) if ([defaultFy, "all"].includes(fy) || isFyValid(fy)) {
				props.setRecipientFiscalYear(fy);
				loadRecipientOverview(recipientId, props.recipient.fy);
			} else {
				history(`/recipient/${recipientId}/${defaultFy}`, { replace: true });
				props.setRecipientFiscalYear(defaultFy);
				loadRecipientOverview(recipientId, defaultFy);
			}
			else history(`/recipient/${recipientId}/${defaultFy}`, { replace: true });
		}, []);
		useEffect(() => {
			props.setRecipientFiscalYear(defaultFy);
			props.resetRecipient();
		}, []);
		useEffect(() => {
			props.setRecipientFiscalYear(fy);
			loadRecipientOverview(recipientId, defaultFy);
		}, [recipientId]);
		useEffect(() => {
			props.setRecipientFiscalYear(fy);
		}, [fy]);
		useEffect(() => {
			loadRecipientOverview(recipientId, props.recipient.fy);
		}, [props.recipient.fy]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipientPage, {
			loading: state.loading,
			error: state.error,
			id: props.recipient.id,
			recipient: props.recipient,
			pickedFy: updateSelectedFy
		});
	};
	RecipientContainer.propTypes = propTypes;
	RecipientContainer_default = connect_default((state) => ({ recipient: state.recipient }), (dispatch) => bindActionCreators(recipientActions_exports, dispatch))(RecipientContainer);
}))();
export { RecipientContainer_default as default };
