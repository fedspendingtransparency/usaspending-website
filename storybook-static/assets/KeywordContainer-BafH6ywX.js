import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, An as isCancel, En as Search, G as init_bulkDownloadActions, Ga as useSelector, J as setDownloadExpectedFile, Na as useMatch, O as require_dayjs_min, Oa as init_development, On as init_Icons, P as init_bulkDownloadHelper, Pa as useNavigate, R as requestAwardsDownload, Si as formatNumberWithPrecision, Ti as unitValues, Ua as init_es, X as setDownloadPending, Y as setDownloadExpectedUrl, _i as formatMoney, at as init_index_esm, cn as ArrowDown, da as init_awardType, er as init_Analytics, hi as calculateUnitForSingleValue, it as Q, ka as Link, kn as init_axios, ln as ArrowUp, mn as CircleArrowUp, oa as awardTypeGroups, ot as le, qa as useDispatch, ro as require_jsx_runtime, vi as formatMoneyWithPrecision, vr as ds, wi as init_moneyFormatter, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, k as keywordPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { i as init_ResultsTableLoadingMessage, n as init_ResultsTableErrorMessage, r as ResultsTableLoadingMessage, t as ResultsTableErrorMessage } from "./ResultsTableErrorMessage-CPlw0IGY.js";
import { n as init_DownloadButton508, t as DownloadIconButton508 } from "./DownloadButton508-B7Wr-YjM.js";
import { i as init_Tooltip, n as init_ResultsTableNoResults, r as Tooltip, t as ResultsTableNoResults } from "./ResultsTableNoResults-Dp2lVJId.js";
import { n as measureTableHeader, t as init_textMeasurement } from "./textMeasurement-Bf9kYCr1.js";
import { i as performTabCountSearch, n as init_keywordHelper, r as performKeywordSearch, t as fetchSummary } from "./keywordHelper-uUDfJwFI.js";
import { n as init_ResultsTableTabs, t as ResultsTableTabs } from "./ResultsTableTabs-DTjhbRvz.js";
import { n as init_BulkDownloadModalContainer, t as BulkDownloadModalContainer_default } from "./BulkDownloadModalContainer-BVZ-yIHf.js";
import { n as init_NoDownloadHover, t as NoDownloadHover } from "./NoDownloadHover-CaKz1YfZ.js";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { map, uniqueId } from "lodash-es";
//#region src/js/dataMapping/keyword/resultsTableColumns.js
var contractColumns, idvColumns, grantColumns, loanColumns, directPaymentColumns, otherColumns, availableColumns, defaultSort;
var init_resultsTableColumns = __esmMin((() => {
	contractColumns = [
		{ title: "Award ID" },
		{ title: "Mod" },
		{ title: "Recipient Name" },
		{ title: "Action Date" },
		{ title: "Transaction Amount" },
		{ title: "Awarding Agency" },
		{ title: "Awarding Sub Agency" },
		{ title: "Award Type" }
	];
	idvColumns = [
		{ title: "Award ID" },
		{ title: "Mod" },
		{ title: "Recipient Name" },
		{ title: "Action Date" },
		{ title: "Transaction Amount" },
		{ title: "Awarding Agency" },
		{ title: "Awarding Sub Agency" },
		{
			displayName: "IDV Type",
			title: "Award Type"
		}
	];
	grantColumns = [
		{ title: "Award ID" },
		{ title: "Mod" },
		{ title: "Recipient Name" },
		{ title: "Action Date" },
		{ title: "Transaction Amount" },
		{ title: "Awarding Agency" },
		{ title: "Awarding Sub Agency" },
		{ title: "Award Type" }
	];
	loanColumns = [
		{ title: "Award ID" },
		{ title: "Mod" },
		{ title: "Recipient Name" },
		{ title: "Action Date" },
		{
			title: "Loan Value",
			displayName: "Loan Face Value"
		},
		{
			title: "Subsidy Cost",
			displayName: "Loan Subsidy Cost (Total Obligations To Date)"
		},
		{ title: "Awarding Agency" },
		{ title: "Awarding Sub Agency" },
		{ title: "Award Type" }
	];
	directPaymentColumns = [
		{ title: "Award ID" },
		{ title: "Mod" },
		{ title: "Recipient Name" },
		{ title: "Action Date" },
		{ title: "Transaction Amount" },
		{ title: "Awarding Agency" },
		{ title: "Awarding Sub Agency" },
		{ title: "Award Type" }
	];
	otherColumns = [
		{ title: "Award ID" },
		{ title: "Mod" },
		{ title: "Recipient Name" },
		{ title: "Action Date" },
		{ title: "Transaction Amount" },
		{ title: "Awarding Agency" },
		{ title: "Awarding Sub Agency" },
		{ title: "Award Type" }
	];
	availableColumns = (type) => {
		return {
			contracts: contractColumns,
			idvs: idvColumns,
			grants: grantColumns,
			direct_payments: directPaymentColumns,
			loans: loanColumns,
			other: otherColumns
		}[type];
	};
	defaultSort = (type) => {
		return {
			contracts: "Transaction Amount",
			idvs: "Award Amount",
			grants: "Transaction Amount",
			direct_payments: "Transaction Amount",
			loans: "Loan Value",
			other: "Transaction Amount"
		}[type];
	};
}));
//#endregion
//#region src/js/dataMapping/shared/TableTabsTooltips.jsx
var import_jsx_runtime$14, tooltipContent, TableTabsTooltips;
var init_TableTabsTooltips = __esmMin((() => {
	init_index_es();
	init_Tooltip();
	import_jsx_runtime$14 = require_jsx_runtime();
	tooltipContent = () => ({ loans: {
		title: "Loans",
		sections: [{
			title: "Loan Face Value",
			paragraphs: ["The Face Value of a loan represents how much has actually been lent out to the entity that received the loan dollars. Sometimes loans are financed by a financial institution (with the Federal government merely providing a 'loan guarantee' to the financial institution and reimbursement in cases where the loan isn't paid back), and other times they are financed by the Federal government directly (direct loans). Regardless of how it is financed, a loan's face value is not considered Federal spending, because it does not, in itself, represent a long-term cost to the government. The estimated long-term cost to the government of a loan is captured in the subsidy cost field."]
		}, {
			title: "Loan Subsidy Cost (Total Obligations To Date)",
			paragraphs: ["The implications of a loan or loan guarantee for the Federal Budget (and thus the loan version of spending/obligations) are known as the loan's subsidy cost. Subsidy cost is the calculated net present value of the loan to the government, taking into account the interest rate and the modeled risk of the recipient failing to pay back the loan in part or full; subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations. Note that a loan's face value is not considered Federal spending, since it does not in itself represent a long-term cost to the government."]
		}]
	} });
	TableTabsTooltips = (type) => {
		const tooltipProps = tooltipContent()[type];
		if (!tooltipProps) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ds, {
			className: "award-section-tt",
			icon: "info",
			tooltipPosition: "left",
			tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Tooltip, { data: tooltipProps })
		});
	};
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableBeginMessage.jsx
var import_jsx_runtime$13, ResultsTableBeginMessage;
var init_ResultsTableBeginMessage = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$13 = require_jsx_runtime();
	ResultsTableBeginMessage = () => /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		className: "results-table-begin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "icon",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(CircleArrowUp, { alt: "Enter a keyword to begin your search." })
		}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "description",
			children: "Enter a keyword to begin your search."
		})]
	});
}));
//#endregion
//#region src/js/dataMapping/keyword/keywordTableColumnTypes.js
var keywordTableColumnTypes;
var init_keywordTableColumnTypes = __esmMin((() => {
	keywordTableColumnTypes = {
		"Award ID": "string",
		"Mod": "number",
		"Recipient Name": "string",
		"Action Date": "date",
		"Transaction Amount": "currency",
		"Awarding Agency": "string",
		"Awarding Sub Agency": "string",
		"Award Type": "string",
		"Loan Value": "currency",
		"Subsidy Cost": "currency"
	};
}));
//#endregion
//#region src/js/components/keyword/IBTable/managers/ScrollManager.js
/**
* ScrollManager.js
* Created by Kevin Li 12/9/17
*/
var ScrollManager, instance$1;
var init_ScrollManager = __esmMin((() => {
	ScrollManager = () => {
		let _state = {
			x: 0,
			y: 0
		};
		const _listeners = {};
		const update = (scroll) => {
			if (scroll.x === _state.x && scroll.y === _state.y) return;
			_state = Object.assign({}, scroll);
			Object.keys(_listeners).forEach((listenerId) => {
				_listeners[listenerId].call(null, _state);
			});
		};
		const subscribe = (listener) => {
			const listenerId = uniqueId();
			_listeners[listenerId] = listener;
			return listenerId;
		};
		const unsubscribe = (listenerId) => {
			if (_listeners[listenerId]) delete _listeners[listenerId];
		};
		return {
			update,
			subscribe,
			unsubscribe
		};
	};
	instance$1 = ScrollManager();
}));
//#endregion
//#region src/js/components/keyword/IBTable/managers/RenderQueue.js
var RenderQueue, instance;
var init_RenderQueue = __esmMin((() => {
	RenderQueue = () => {
		let _readQueue = [];
		let _writeQueue = [];
		let _triggered = null;
		const _executeQueue = (queue) => {
			const seenTypes = {};
			for (let i = queue.length - 1; i >= 0; i--) {
				const op = queue[i];
				if (op.isSingle && seenTypes[op.type]) continue;
				else if (op.isSingle) seenTypes[op.type] = op.type;
				op.operation.call(null, ...op.args);
			}
		};
		const _render = () => {
			_executeQueue(_readQueue);
			_executeQueue(_writeQueue);
			_readQueue = [];
			_writeQueue = [];
			_triggered = null;
		};
		const _add = (op, type) => {
			if (type === "read") _readQueue.push(op);
			else _writeQueue.push(op);
			if (!_triggered) _triggered = window.requestAnimationFrame(_render);
		};
		return {
			addRead: (op) => {
				_add(op, "read");
			},
			addWrite: (op) => {
				_add(op, "write");
			}
		};
	};
	instance = RenderQueue();
}));
//#endregion
//#region src/js/components/keyword/IBTable/components/HeaderRow.jsx
/**
* HeaderRow.jsx
* Created by Kevin Li 12/8/17
*/
var import_jsx_runtime$12, propTypes$10, HeaderRow;
var init_HeaderRow = __esmMin((() => {
	init_ScrollManager();
	init_RenderQueue();
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$10 = {
		tableId: PropTypes.string,
		contentWidth: PropTypes.number,
		headerHeight: PropTypes.number,
		columns: PropTypes.array,
		headerCellRender: PropTypes.func
	};
	HeaderRow = class extends React.Component {
		constructor(props) {
			super(props);
			this._scrollListener = null;
			this._lastX = 0;
			this._headerDiv = null;
			this._tableScrolled = this._tableScrolled.bind(this);
		}
		componentDidMount() {
			this._scrollListener = instance$1.subscribe(this._tableScrolled);
		}
		componentWillUnmount() {
			if (this._scrollListener) instance$1.unsubscribe(this._scrollListener);
		}
		get currentX() {
			return this._lastX;
		}
		_tableScrolled(scroll) {
			if (scroll.x !== this._lastX) {
				instance.addWrite({
					operation: () => {
						if (this._headerDiv) this._headerDiv.style.transform = `translate(${-1 * scroll.x}px, 0px)`;
					},
					type: "header",
					isSingle: true,
					args: []
				});
				this._lastX = scroll.x;
			}
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
				className: "ibt-header",
				role: "presentation",
				style: {
					width: this.props.contentWidth,
					height: this.props.headerHeight,
					top: 0
				},
				ref: (div) => {
					this._headerDiv = div;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "ibt-header-row",
					role: "row",
					children: this.props.columns.map((column, index) => {
						const cellStyle = {
							width: column.width,
							height: this.props.headerHeight
						};
						const headerCell = this.props.headerCellRender(index);
						return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "ibt-header-cell",
							role: "columnheader",
							id: `${this.props.tableId}-header-${index}`,
							style: cellStyle,
							children: headerCell
						}, index);
					})
				})
			});
		}
	};
	HeaderRow.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/components/keyword/IBTable/components/TableBody.jsx
/**
* TableBody.jsx
* Created by Kevin Li 12/8/17
*/
var import_jsx_runtime$11, propTypes$9, watchedProps, arrowKeys, TableBody;
var init_TableBody = __esmMin((() => {
	init_ScrollManager();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$9 = {
		tableId: PropTypes.string,
		columns: PropTypes.array,
		rowCount: PropTypes.number,
		rowHeight: PropTypes.number,
		bodyHeight: PropTypes.number,
		bodyWidth: PropTypes.number,
		contentWidth: PropTypes.number,
		onReachedBottom: PropTypes.func,
		bodyCellRender: PropTypes.func
	};
	watchedProps = [
		"rowCount",
		"rowHeight",
		"bodyHeight",
		"contentWidth",
		"bodyWidth"
	];
	arrowKeys = [
		"ArrowDown",
		"ArrowUp",
		"ArrowLeft",
		"ArrowRight"
	];
	TableBody = class extends React.PureComponent {
		constructor(props) {
			super(props);
			this.state = { visibleRange: "" };
			this._lastX = 0;
			this._lastY = 0;
			this._blockPagination = false;
			this._cellCache = {};
			this._visibleCells = [];
			this._scrollListener = null;
			this._tableScrolled = this._tableScrolled.bind(this);
			this._keyPressed = this._keyPressed.bind(this);
		}
		componentDidMount() {
			this._scrollListener = instance$1.subscribe(this._tableScrolled);
			document.addEventListener("keydown", this._keyPressed);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.rowCount > this.props.rowCount) this._blockPagination = true;
			for (const prop of watchedProps) if (prevProps[prop] !== this.props[prop]) {
				this._generateAllCells();
				break;
			}
		}
		componentWillUnmount() {
			if (this._scrollListener) instance$1.unsubscribe(this._scrollListener);
			document.removeEventListener("keydown", this._keyPressed);
		}
		reloadTable() {
			this.setState({ visibleRange: "" }, () => {
				this._generateAllCells();
			});
		}
		_findActiveCell(element) {
			if (!element || !this._tableDiv.contains(element)) return null;
			if (element.dataset.ibtTableElement === "cell" && element.dataset.ibtTableOwner === this.props.tableId) return element;
			return this._findActiveCell(element.parentElement);
		}
		_keyPressed(e) {
			const activeElement = document.activeElement;
			if (!activeElement) return;
			const active = this._findActiveCell(activeElement);
			if (!active || arrowKeys.indexOf(e.key) === -1) return;
			e.preventDefault();
			switch (e.key) {
				case "ArrowDown":
					this._focusDown(active);
					break;
				case "ArrowUp":
					this._focusUp(active);
					break;
				case "ArrowLeft":
					this._focusLeft(active);
					break;
				case "ArrowRight":
					this._focusRight(active);
					break;
			}
		}
		_focusRight(active) {
			const colIndex = parseInt(active.dataset.ibtColIndex, 10);
			const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
			let nextId = `${this.props.tableId}-cell-${colIndex + 1}-${rowIndex}`;
			if (colIndex + 1 >= this.props.columns.length) if (rowIndex + 1 < this.props.rowCount) nextId = `${this.props.tableId}-cell-0-${rowIndex + 1}`;
			else return;
			const nextCell = document.getElementById(nextId);
			if (nextCell) nextCell.focus();
		}
		_focusLeft(active) {
			const colIndex = parseInt(active.dataset.ibtColIndex, 10);
			const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
			let nextId = `${this.props.tableId}-cell-${colIndex - 1}-${rowIndex}`;
			if (colIndex === 0) if (rowIndex > 0) nextId = `${this.props.tableId}-cell-${this.props.columns.length - 1}-${rowIndex - 1}`;
			else return;
			const nextCell = document.getElementById(nextId);
			if (nextCell) nextCell.focus();
		}
		_focusUp(active) {
			const colIndex = parseInt(active.dataset.ibtColIndex, 10);
			const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
			const nextId = `${this.props.tableId}-cell-${colIndex}-${rowIndex - 1}`;
			if (rowIndex === 0) return;
			const nextCell = document.getElementById(nextId);
			if (nextCell) nextCell.focus();
		}
		_focusDown(active) {
			const colIndex = parseInt(active.dataset.ibtColIndex, 10);
			const rowIndex = parseInt(active.dataset.ibtRowIndex, 10);
			const nextId = `${this.props.tableId}-cell-${colIndex}-${rowIndex + 1}`;
			if (rowIndex + 1 >= this.props.rowCount) return;
			const nextCell = document.getElementById(nextId);
			if (nextCell) nextCell.focus();
		}
		_tableScrolled(scroll) {
			const visibleCoords = this._calculateVisibleRows(scroll.x, scroll.y);
			if (!visibleCoords || visibleCoords.length === 0) return;
			const visibleRange = visibleCoords.range;
			this._lastX = scroll.x;
			this._lastY = scroll.y;
			if (visibleRange !== this.state.visibleRange) {
				this._visibleCells = visibleCoords.rows.reduce((cells, rowCoords, index) => {
					const rowCells = rowCoords.map((coord) => this._cellCache[coord]);
					const row = /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "ibt-table-row",
						"aria-rowindex": visibleCoords.firstRow + index + 1,
						role: "row",
						children: rowCells
					}, visibleCoords.firstRow + index);
					cells.push(row);
					return cells;
				}, []);
				if (this.props.onReachedBottom && this._isAtBottom() && this.props.rowCount > 0) {
					if (this._blockPagination) {
						this._blockPagination = false;
						return;
					}
					this.props.onReachedBottom();
				}
				this.setState({ visibleRange });
			}
		}
		_calculateVisibleRows(x, y) {
			if (this.props.rowCount === 0 || this.props.columns.length === 0) return null;
			const mathematicalTopRow = Math.floor(y / this.props.rowHeight);
			const bottomY = y + this.props.bodyHeight;
			const mathematicalBottomRow = Math.ceil(bottomY / this.props.rowHeight);
			const topRow = Math.max(0, mathematicalTopRow - 1);
			const bottomRow = Math.min(this.props.rowCount - 1, mathematicalBottomRow + 1);
			const leftX = x;
			const rightX = x + this.props.bodyWidth;
			const visibleColumns = [];
			let leadingColumn = null;
			let trailingColumn = null;
			for (let i = 0; i < this.props.columns.length; i++) {
				const column = this.props.columns[i];
				const columnStartX = column.x;
				if (column.x + column.width < leftX) {
					leadingColumn = i;
					continue;
				} else if (columnStartX > rightX) {
					trailingColumn = i;
					break;
				}
				visibleColumns.push(i);
			}
			if (leadingColumn) visibleColumns.unshift(leadingColumn);
			if (trailingColumn) visibleColumns.push(trailingColumn);
			const visibleRows = [];
			for (let i = topRow; i <= bottomRow; i++) {
				const rowCells = [];
				for (let j = 0; j < this.props.columns.length; j++) rowCells.push(`${j},${i}`);
				visibleRows.push(rowCells);
			}
			return {
				rows: visibleRows,
				firstRow: topRow,
				lastRow: bottomRow,
				range: `${visibleColumns[0]},${topRow}-${visibleColumns[visibleColumns.length - 1]},${bottomRow}`
			};
		}
		_isAtBottom() {
			return this._lastY + this.props.bodyHeight >= this.props.rowCount * this.props.rowHeight - this.props.rowHeight / 2;
		}
		_generateAllCells() {
			const cellCache = {};
			for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) this.props.columns.forEach((column, columnIndex) => {
				const cellPositioning = {
					x: column.x,
					y: rowIndex * this.props.rowHeight,
					width: column.width,
					height: this.props.rowHeight
				};
				const cellContent = this.props.bodyCellRender(columnIndex, rowIndex);
				const coord = `${columnIndex},${rowIndex}`;
				const realCell = /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					id: `${this.props.tableId}-cell-${columnIndex}-${rowIndex}`,
					className: "ibt-table-cell",
					role: "gridcell",
					"aria-colindex": columnIndex + 1,
					"aria-rowindex": rowIndex + 1,
					"data-ibt-table-element": "cell",
					"data-ibt-table-owner": this.props.tableId,
					"data-ibt-col-index": columnIndex,
					"data-ibt-row-index": rowIndex,
					tabIndex: 0,
					style: {
						top: cellPositioning.y,
						left: cellPositioning.x,
						height: cellPositioning.height,
						width: cellPositioning.width
					},
					children: cellContent
				}, coord);
				cellCache[coord] = realCell;
			});
			this._cellCache = null;
			this._cellCache = cellCache;
			this._tableScrolled({
				x: this._lastX,
				y: this._lastY
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "ibt-table-body-container",
				role: "presentation",
				style: {
					width: this.props.contentWidth,
					height: this.props.rowCount * this.props.rowHeight
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					className: "ibt-table-body",
					role: "presentation",
					ref: (div) => {
						this._tableDiv = div;
					},
					children: this._visibleCells
				})
			});
		}
	};
	TableBody.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/keyword/IBTable/components/Table.jsx
var import_jsx_runtime$10, propTypes$8, defaultProps, scrollbarHeight, Table;
var init_Table = __esmMin((() => {
	init_HeaderRow();
	init_TableBody();
	init_RenderQueue();
	init_ScrollManager();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$8 = {
		bodyWidth: PropTypes.number,
		bodyHeight: PropTypes.number,
		headerHeight: PropTypes.number,
		contentWidth: PropTypes.number,
		rowCount: PropTypes.number,
		rowHeight: PropTypes.number,
		columns: PropTypes.array,
		onReachedBottom: PropTypes.func,
		headerCellRender: PropTypes.func,
		bodyCellRender: PropTypes.func,
		topScroller: PropTypes.bool
	};
	defaultProps = {
		contentWidth: 0,
		bodyWidth: 0,
		bodyHeight: 0,
		headerHeight: 0,
		rowHeight: 0,
		rowCount: 0,
		columns: [],
		topScroller: false
	};
	scrollbarHeight = 10;
	Table = class extends React.Component {
		constructor(props) {
			super(props);
			this._restorePointerTimer = null;
			this._bodyComponent = null;
			this._tableWrapper = null;
			this._internalDiv = null;
			this._tableId = `${uniqueId()}`;
			this._scrolledTable = this._scrolledTable.bind(this);
			this._scrolledTableTop = this._scrolledTableTop.bind(this);
			this._scrolledTableBottom = this._scrolledTableBottom.bind(this);
		}
		reloadTable() {
			this._tableWrapper.scrollLeft = 0;
			this._tableWrapper.scrollTop = 0;
			window.setTimeout(() => {
				if (this._bodyComponent) this._bodyComponent.reloadTable();
			}, 300);
		}
		_scrolledTableTop() {
			const topBar = document.getElementById("topBar");
			const bottomBar = document.getElementById("bottomBar");
			bottomBar.scrollLeft = topBar.scrollLeft;
			this._scrolledTable();
		}
		_scrolledTableBottom() {
			const topBar = document.getElementById("topBar");
			topBar.scrollLeft = document.getElementById("bottomBar").scrollLeft;
			this._scrolledTable();
		}
		_scrolledTable() {
			const scrollOperation = {
				operation: () => {
					const x = this._tableWrapper.scrollLeft;
					const y = this._tableWrapper.scrollTop;
					instance$1.update({
						x,
						y
					});
				},
				type: "scroll",
				isSingle: true,
				args: []
			};
			const pointerOperation = {
				operation: () => {
					if (this._restorePointerTimer) {
						window.clearTimeout(this.restorePointer);
						this._restorePointerTimer = null;
					}
					this._internalDiv.style.pointerEvents = "none";
					this._restorePointerTimer = window.setTimeout(() => {
						this._internalDiv.style.pointerEvents = "auto";
					}, 150);
				},
				type: "pointer",
				isSingle: true,
				args: []
			};
			instance.addRead(scrollOperation);
			instance.addWrite(pointerOperation);
		}
		render() {
			const needsVerticalScroll = this.props.rowCount * this.props.rowHeight > this.props.bodyHeight;
			const visibleWidth = Math.min(this.props.bodyWidth, this.props.contentWidth);
			const visibleHeight = Math.min(this.props.bodyHeight, this.props.rowCount * this.props.rowHeight);
			const headerStyle = {
				minWidth: visibleWidth,
				maxWidth: visibleWidth,
				maxHeight: this.props.headerHeight,
				minHeight: this.props.headerHeight
			};
			const style = {
				minWidth: visibleWidth,
				maxWidth: visibleWidth,
				minHeight: visibleHeight + this.props.headerHeight
			};
			const topScrollerStyle = {
				minWidth: visibleWidth,
				maxWidth: visibleWidth,
				minHeight: this.props.headerHeight
			};
			const bodyStyle = {
				minWidth: visibleWidth,
				maxWidth: visibleWidth,
				height: needsVerticalScroll ? visibleHeight : visibleHeight + scrollbarHeight
			};
			if (needsVerticalScroll) {
				style.maxHeight = visibleHeight + this.props.headerHeight;
				bodyStyle.maxHeight = visibleHeight;
			}
			const contentStyle = {
				width: this.props.contentWidth,
				height: this.props.rowCount * this.props.rowHeight
			};
			let accessibleDescription = `${this.props.columns.length} column`;
			if (this.props.columns.length !== 1) accessibleDescription += "s";
			accessibleDescription += ` and ${this.props.rowCount} row`;
			if (this.props.rowCount !== 1) accessibleDescription += "s";
			const body = /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "ibt-table-container",
				role: "grid",
				"aria-rowcount": -1,
				"aria-colcount": this.props.columns.length,
				"aria-label": `This is a table with ${accessibleDescription}. Use your arrow keys to navigate through cells.`,
				style,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "ibt-table-header-container",
					role: "presentation",
					style: headerStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(HeaderRow, {
						tableId: this._tableId,
						contentWidth: this.props.contentWidth,
						headerHeight: this.props.headerHeight,
						columns: this.props.columns,
						headerCellRender: this.props.headerCellRender
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "ibt-table-body-section",
					role: "presentation",
					style: bodyStyle,
					id: "bottomBar",
					onScroll: this._scrolledTable,
					ref: (div) => {
						this._tableWrapper = div;
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "ibt-table-content",
						role: "presentation",
						style: contentStyle,
						ref: (div) => {
							this._internalDiv = div;
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(TableBody, {
							tableId: this._tableId,
							columns: this.props.columns,
							contentWidth: this.props.contentWidth,
							bodyWidth: visibleWidth,
							bodyHeight: visibleHeight,
							rowHeight: this.props.rowHeight,
							rowCount: this.props.rowCount,
							bodyCellRender: this.props.bodyCellRender,
							onReachedBottom: this.props.onReachedBottom,
							ref: (component) => {
								this._bodyComponent = component;
							}
						})
					})
				})]
			}) });
			const bodyWithTopScroller = /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "ibt-table-container",
				role: "grid",
				"aria-rowcount": -1,
				"aria-colcount": this.props.columns.length,
				"aria-label": `This is a table with ${accessibleDescription}. Use your arrow keys to navigate through cells.`,
				style: topScrollerStyle,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "ibt-table__top-scroller",
						id: "topBar",
						onScroll: this._scrolledTableTop,
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
							className: "ibt-table__scroller",
							style: contentStyle
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "ibt-table-header-container",
						role: "presentation",
						style: headerStyle,
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(HeaderRow, {
							tableId: this._tableId,
							contentWidth: this.props.contentWidth,
							headerHeight: this.props.headerHeight,
							columns: this.props.columns,
							headerCellRender: this.props.headerCellRender
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "ibt-table-body-section",
						role: "presentation",
						style: bodyStyle,
						id: "bottomBar",
						onScroll: this._scrolledTableBottom,
						ref: (div) => {
							this._tableWrapper = div;
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
							className: "ibt-table-content",
							role: "presentation",
							style: contentStyle,
							ref: (div) => {
								this._internalDiv = div;
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(TableBody, {
								tableId: this._tableId,
								columns: this.props.columns,
								contentWidth: this.props.contentWidth,
								bodyWidth: visibleWidth,
								bodyHeight: visibleHeight,
								rowHeight: this.props.rowHeight,
								rowCount: this.props.rowCount,
								bodyCellRender: this.props.bodyCellRender,
								onReachedBottom: this.props.onReachedBottom,
								ref: (component) => {
									this._bodyComponent = component;
								}
							})
						})
					})
				]
			}) });
			return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", { children: this.props.topScroller ? bodyWithTopScroller : body });
		}
	};
	Table.propTypes = propTypes$8;
	Table.defaultProps = defaultProps;
}));
//#endregion
//#region src/js/components/keyword/IBTable/IBTable.jsx
var IBTable_default;
var init_IBTable = __esmMin((() => {
	init_Table();
	IBTable_default = Table;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableFormattedCell.jsx
/**
* ResultsTableFormattedCell.jsx
* Created by Kevin Li 12/1/16
**/
var import_jsx_runtime$9, dayjs, propTypes$7, ResultsTableFormattedCell;
var init_ResultsTableFormattedCell = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$9 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	propTypes$7 = {
		rowIndex: PropTypes.number,
		column: PropTypes.string,
		isLastColumn: PropTypes.bool,
		value: PropTypes.any,
		dataType: PropTypes.string
	};
	ResultsTableFormattedCell = class extends React.Component {
		formatContent(original, type) {
			if (type === "date") return dayjs(original, "YYYY-MM-DD").format("M/D/YYYY");
			else if (type === "currency" && original !== "--") return formatMoney(original);
			return original;
		}
		render() {
			let content = this.props.value;
			if (!content && content !== 0) content = "\xA0";
			else content = this.formatContent(content, this.props.dataType);
			let rowClass = "row-even";
			if (this.props.rowIndex % 2 === 0) rowClass = "row-odd";
			if (this.props.isLastColumn) rowClass += " last-column";
			return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: `award-result-generic-cell ${rowClass}`,
				title: content,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "cell-content",
					children: content
				})
			});
		}
	};
	ResultsTableFormattedCell.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableLinkCell.jsx
var import_jsx_runtime$8, propTypes$6, ResultsTableLinkCell;
var init_ResultsTableLinkCell = __esmMin((() => {
	init_development();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$6 = {
		rowIndex: PropTypes.number,
		column: PropTypes.string,
		isLastColumn: PropTypes.bool,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		value: PropTypes.string,
		onClick: PropTypes.func
	};
	ResultsTableLinkCell = (props) => {
		let content = props.value;
		if (!content) content = "\xA0";
		let rowClass = "row-even";
		if (props.rowIndex % 2 === 0) rowClass = "row-odd";
		if (props.isLastColumn) rowClass += " last-column";
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: `award-result-generic-cell ${rowClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "cell-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Link, {
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: props.onClick,
					to: `/${props.column}/${props.id}`,
					children: content
				})
			})
		});
	};
	ResultsTableLinkCell.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableHeaderCell.jsx
var import_jsx_runtime$7, propTypes$5, TableHeaderCell;
var init_ResultsTableHeaderCell = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$5 = {
		isLast: PropTypes.bool,
		isActive: PropTypes.bool,
		title: PropTypes.string,
		displayName: PropTypes.string,
		subtitle: PropTypes.string,
		background: PropTypes.string,
		defaultDirection: PropTypes.string,
		currentSort: PropTypes.object,
		updateSort: PropTypes.func,
		headerHeight: PropTypes.number
	};
	TableHeaderCell = ({ isLast, isActive, title, displayName, subtitle, background, defaultDirection, currentSort, updateSort, headerHeight = 50 }) => {
		const clickedSort = (e) => {
			e.preventDefault();
			updateSort(title, e.currentTarget.value);
		};
		const clickedDefault = () => {
			if (isActive) {
				let opposite = "asc";
				if (currentSort.direction === "asc") opposite = "desc";
				updateSort(title, opposite);
			} else updateSort(title, defaultDirection);
		};
		const pressedKey = (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				clickedDefault();
			}
		};
		const sortClass = (direction) => isActive && currentSort.direction === direction ? " active" : "";
		let lastClass = "";
		if (isLast) lastClass = " last-column";
		const customStyle = background ? {
			backgroundColor: background,
			height: headerHeight
		} : { height: headerHeight };
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: `award-result-header-cell ${lastClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "cell-content",
				style: customStyle,
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "header-sort",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						onClick: clickedDefault,
						onKeyDown: pressedKey,
						className: "header-label",
						role: "presentation",
						"aria-label": title,
						tabIndex: 0,
						children: [displayName, subtitle ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", { children: subtitle }) : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "header-icons",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							onClick: clickedSort,
							className: `sort-icon${sortClass("asc")}`,
							value: "asc",
							title: `Sort table by ascending ${title}`,
							"aria-label": `Sort table by ascending ${title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ArrowUp, { alt: `Sort table by ascending ${title}` })
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							onClick: clickedSort,
							className: `sort-icon${sortClass("desc")}`,
							value: "desc",
							title: `Sort table by descending ${title}`,
							"aria-label": `Sort table by descending ${title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ArrowDown, { alt: `Sort table by descending ${title}` })
						})]
					})]
				})
			})
		});
	};
	TableHeaderCell.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTable.jsx
/**
* ResultsTable.jsx
* Created by Lizzie Salita 1/8/18
**/
var import_jsx_runtime$6, propTypes$4, rowHeight, tableHeight, ResultsTable;
var init_ResultsTable = __esmMin((() => {
	init_keywordTableColumnTypes();
	init_IBTable();
	init_ResultsTableFormattedCell();
	init_ResultsTableLinkCell();
	init_ResultsTableHeaderCell();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$4 = {
		results: PropTypes.array,
		columns: PropTypes.object,
		visibleWidth: PropTypes.number,
		loadNextPage: PropTypes.func,
		currentType: PropTypes.string,
		tableInstance: PropTypes.string,
		sort: PropTypes.object,
		updateSort: PropTypes.func
	};
	rowHeight = 40;
	tableHeight = 29.5 * rowHeight;
	ResultsTable = class extends React.Component {
		constructor(props) {
			super(props);
			this.headerCellRender = this.headerCellRender.bind(this);
			this.bodyCellRender = this.bodyCellRender.bind(this);
		}
		componentDidMount() {
			if (this.tableComponent) this.tableComponent.reloadTable();
		}
		componentDidUpdate(prevProps) {
			if (prevProps.tableInstance !== this.props.tableInstance) {
				if (this.tableComponent) this.tableComponent.reloadTable();
			}
		}
		headerCellRender(columnIndex) {
			const { columns } = this.props;
			const columnId = columns.visibleOrder[columnIndex];
			const column = columns.data[columnId];
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(TableHeaderCell, {
				isLast: columnIndex + 1 === columns.visibleOrder.length,
				isActive: this.props.sort.field === column.columnName,
				title: column.columnName,
				displayName: column.displayName,
				defaultDirection: column.defaultDirection,
				currentSort: this.props.sort,
				updateSort: this.props.updateSort
			});
		}
		bodyCellRender(columnIndex, rowIndex) {
			const columnId = this.props.columns.visibleOrder[columnIndex];
			const column = this.props.columns.data[columnId];
			let cellClass = ResultsTableFormattedCell;
			const props = {
				rowIndex,
				columnIndex,
				value: this.props.results[rowIndex][columnId] || "--",
				dataType: keywordTableColumnTypes[columnId]
			};
			if (column.columnName === "Award ID") {
				cellClass = ResultsTableLinkCell;
				props.id = this.props.results[rowIndex].generated_internal_id;
				props.column = "award";
			}
			return React.createElement(cellClass, props);
		}
		prepareTable() {
			let totalWidth = 0;
			return {
				columns: this.props.columns.visibleOrder.map((columnTitle) => {
					const column = this.props.columns.data[columnTitle];
					const columnX = totalWidth;
					totalWidth += column.width;
					return {
						x: columnX,
						width: column.width
					};
				}),
				width: totalWidth
			};
		}
		render() {
			const calculatedValues = this.prepareTable();
			let noResultsClass = "";
			if (this.props.results.length === 0) noResultsClass = " no-results";
			const variableBodyHeight = Math.min(tableHeight, rowHeight * this.props.results.length);
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: `award-results-table${noResultsClass}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(IBTable_default, {
					rowHeight,
					rowCount: this.props.results.length,
					headerHeight: 50,
					contentWidth: calculatedValues.width,
					bodyWidth: this.props.visibleWidth,
					bodyHeight: variableBodyHeight,
					columns: calculatedValues.columns,
					headerCellRender: this.headerCellRender,
					bodyCellRender: this.bodyCellRender,
					onReachedBottom: this.props.loadNextPage,
					topScroller: true,
					ref: (table) => {
						this.tableComponent = table;
					}
				})
			});
		}
	};
	ResultsTable.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/keyword/table/ResultsTableSection.jsx
/**
* ResultsTableSection.jsx
* Created by Lizzie Salita 1/5/18
**/
var import_jsx_runtime$5, propTypes$3, ResultsTableSection;
var init_ResultsTableSection = __esmMin((() => {
	init_index_esm();
	init_ResultsTableLoadingMessage();
	init_ResultsTableNoResults();
	init_ResultsTableErrorMessage();
	init_ResultsTableTabs();
	init_ResultsTableBeginMessage();
	init_ResultsTable();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		keyword: PropTypes.string,
		tableTypes: PropTypes.array,
		currentType: PropTypes.string,
		switchTab: PropTypes.func,
		results: PropTypes.array,
		columns: PropTypes.object,
		counts: PropTypes.object,
		sort: PropTypes.object,
		updateSort: PropTypes.func,
		tableInstance: PropTypes.string,
		loadNextPage: PropTypes.func
	};
	ResultsTableSection = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { tableWidth: 0 };
			this.setTableWidth = this.setTableWidth.bind(this);
		}
		componentDidMount() {
			this.setTableWidth();
			window.addEventListener("resize", this.setTableWidth);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.setTableWidth);
		}
		setTableWidth() {
			const tableWidth = this.tableWidthController.clientWidth - 1;
			this.setState({ tableWidth });
		}
		render() {
			const showTableMessage = this.props.results.length === 0 && !this.props.inFlight && !this.props.error || this.props.inFlight || this.props.error || !this.props.keyword;
			const showDataTable = !this.props.error && !this.props.inFlight && this.props.results.length > 0 || this.props.inFlight;
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: `search-results-table-section ${this.props.keyword ? "" : "hide-counts"}`,
				id: "results-section-table",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "table-section-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h2", {
							className: "visualization-title",
							children: "Spending By Transaction"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("hr", { className: "results-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableTabs, {
						types: this.props.tableTypes,
						active: this.props.currentType,
						counts: this.props.counts,
						switchTab: this.props.switchTab,
						disabled: this.props.inFlight
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "results-table-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Q, { children: showTableMessage && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(le, {
								classNames: "table-message-fade",
								timeout: {
									exit: 225,
									enter: 195
								},
								exit: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
									!this.props.keyword && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "results-table-message-container full",
										children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableBeginMessage, {})
									}),
									this.props.keyword && this.props.results.length === 0 && !this.props.inFlight && !this.props.error && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "results-table-message-container full",
										children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableNoResults, {})
									}),
									this.props.inFlight && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "results-table-message-container",
										children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableLoadingMessage, {})
									}),
									this.props.error && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
										className: "results-table-message-container full",
										children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableErrorMessage, {})
									})
								] })
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
								className: "results-table-width-master",
								ref: (div) => {
									this.tableWidthController = div;
								}
							}),
							showDataTable && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTable, {
								...this.props,
								visibleWidth: this.state.tableWidth
							})
						]
					})
				]
			});
		}
	};
	ResultsTableSection.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/containers/keyword/table/ResultsTableContainer.jsx
/**
* ResultsTableContainer.jsx
* Created by Lizzie Salita 1/19/18
**/
var import_jsx_runtime$4, propTypes$2, tableTypes, ResultsTableContainer;
var init_ResultsTableContainer = __esmMin((() => {
	init_axios();
	init_keywordHelper();
	init_resultsTableColumns();
	init_awardType();
	init_textMeasurement();
	init_TableTabsTooltips();
	init_Analytics();
	init_ResultsTableSection();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = {
		keyword: PropTypes.string,
		fetchSummary: PropTypes.func
	};
	tableTypes = [
		{
			label: "Contracts",
			internal: "contracts"
		},
		{
			label: "Contract IDVs",
			internal: "idvs"
		},
		{
			label: "Grants",
			internal: "grants"
		},
		{
			label: "Direct Payments",
			internal: "direct_payments"
		},
		{
			label: "Loans",
			internal: "loans",
			tooltip: TableTabsTooltips("loans")
		},
		{
			label: "Other",
			internal: "other"
		}
	];
	ResultsTableContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				tableType: "contracts",
				page: 1,
				lastPage: true,
				counts: {},
				sort: {
					field: "Transaction Amount",
					direction: "desc"
				},
				columns: {},
				inFlight: false,
				error: false,
				results: [],
				tableInstance: `${uniqueId()}`
			};
			this.searchRequest = null;
			this.tabCountRequest = null;
			this.switchTab = this.switchTab.bind(this);
			this.loadNextPage = this.loadNextPage.bind(this);
			this.updateSort = this.updateSort.bind(this);
		}
		componentDidMount() {
			if (this.props.keyword) {
				this.loadColumns();
				this.pickDefaultTab();
			}
		}
		componentDidUpdate(prevProps) {
			if (prevProps.keyword !== this.props.keyword) {
				this.loadColumns();
				this.pickDefaultTab();
			}
		}
		pickDefaultTab() {
			if (this.tabCountRequest) this.tabCountRequest.cancel();
			this.setState({
				inFlight: true,
				error: false
			});
			const filters = { keyword: this.props.keyword };
			this.tabCountRequest = performTabCountSearch({ filters });
			this.tabCountRequest.promise.then((res) => {
				this.parseTabCounts(res.data);
			}).catch((err) => {
				if (!isCancel(err)) {
					this.setState({
						inFlight: false,
						error: true
					});
					console.log(err);
				}
			});
		}
		parseTabCounts(data) {
			const transactionCounts = data.results;
			let firstAvailable = "";
			for (const value of tableTypes) {
				const tableType = value.internal;
				if (transactionCounts[tableType] > 0) {
					firstAvailable = tableType;
					break;
				}
			}
			if (!firstAvailable) firstAvailable = tableTypes[0].internal;
			this.setState({ counts: transactionCounts }, () => {
				this.switchTab(firstAvailable);
				this.props.fetchSummary();
			});
		}
		performSearch(newSearch = false) {
			if (this.searchRequest) this.searchRequest.cancel();
			this.setState({
				inFlight: true,
				error: false
			});
			let pageNumber = this.state.page;
			if (newSearch) pageNumber = 1;
			const resultLimit = 35;
			const requestFields = map(availableColumns(this.state.tableType), (data) => data.title);
			const tableType = this.state.tableType;
			const params = {
				filters: {
					keyword: this.props.keyword,
					award_type_codes: awardTypeGroups[tableType]
				},
				fields: requestFields,
				page: pageNumber,
				limit: resultLimit,
				sort: this.state.sort.field,
				order: this.state.sort.direction
			};
			this.searchRequest = performKeywordSearch(params);
			return this.searchRequest.promise.then((res) => {
				const newState = { inFlight: false };
				const parsedResults = res.data.results.map((result) => ({
					...result,
					generated_internal_id: encodeURIComponent(result.generated_internal_id)
				}));
				if (pageNumber <= 1 || newSearch) {
					newState.tableInstance = `${uniqueId()}`;
					newState.results = parsedResults;
				} else newState.results = this.state.results.concat(parsedResults);
				this.searchRequest = null;
				newState.page = res.data.page_metadata.page;
				newState.lastPage = !res.data.page_metadata.hasNext;
				this.setState(newState);
			}).catch((err) => {
				if (!isCancel(err)) {
					this.setState({
						inFlight: false,
						error: true
					});
					console.log(err);
					this.searchRequest = null;
				}
			});
		}
		switchTab(tab) {
			const newState = { tableType: tab };
			const currentSortField = this.state.sort.field;
			if (map(availableColumns(tab), (data) => data.title).indexOf(currentSortField) === -1) newState.sort = {
				field: defaultSort(tab),
				direction: "desc"
			};
			this.setState(newState, () => {
				if (this.props.keyword) {
					this.performSearch(true);
					Analytics.event({
						event: "keyword",
						category: "Keyword Search - Table Tab",
						action: tab
					});
				}
			});
		}
		loadNextPage() {
			if (this.state.inFlight) return;
			if (!this.state.lastPage) this.setState({ page: this.state.page + 1 }, () => {
				this.performSearch();
			});
		}
		updateSort(field, direction) {
			this.setState({ sort: {
				field,
				direction
			} }, () => {
				this.performSearch(true);
			});
		}
		loadColumns() {
			const columns = {};
			tableTypes.forEach((type) => {
				const allColumns = map(availableColumns(type.internal), (data) => data.title);
				const parsedColumns = availableColumns(type.internal).reduce((result, data) => Object.assign({}, result, { [data.title]: {
					columnName: data.title,
					displayName: data.displayName || data.title,
					width: measureTableHeader(data.displayName || data.title),
					defaultDirection: "desc"
				} }), {});
				columns[type.internal] = {
					visibleOrder: allColumns,
					data: parsedColumns
				};
			});
			this.setState({ columns });
		}
		render() {
			const tableType = this.state.tableType;
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ResultsTableSection, {
				error: this.state.error,
				keyword: this.props.keyword,
				inFlight: this.state.inFlight,
				results: this.state.results,
				columns: this.state.columns[tableType],
				counts: this.state.counts,
				sort: this.state.sort,
				tableTypes,
				currentType: tableType,
				tableInstance: this.state.tableInstance,
				switchTab: this.switchTab,
				updateSort: this.updateSort,
				loadNextPage: this.loadNextPage
			});
		}
	};
	ResultsTableContainer.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/keyword/KeywordSearchBar.jsx
/**
* KeywordSearchBar.jsx
* Created by Lizzie Salita 1/5/18
*/
var import_jsx_runtime$3, propTypes$1, KeywordSearchBar;
var init_KeywordSearchBar = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		keyword: PropTypes.string,
		updateKeyword: PropTypes.func
	};
	KeywordSearchBar = ({ keyword, updateKeyword }) => {
		const [searchString, setSearchString] = useState("");
		const updateSearchString = (string) => setSearchString(string);
		useEffect(() => {
			if (keyword) updateSearchString(keyword);
		}, [keyword]);
		const searchKeyword = (e) => {
			e.preventDefault();
			if (searchString.length > 2) updateKeyword(searchString);
		};
		const changedInput = (e) => setSearchString(e.target.value);
		let disabledClass = "keyword-search-bar__button_disabled";
		let submitButtonText = "Enter at least three characters to search";
		if (searchString.length > 2) {
			disabledClass = "";
			submitButtonText = "Search by Keyword";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("form", {
			className: "keyword-search-bar__form",
			onSubmit: searchKeyword,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("input", {
				id: "search",
				type: "text",
				"aria-label": "Search Input",
				className: "keyword-search-bar__input",
				value: searchString,
				onChange: changedInput,
				placeholder: "Type keywords..."
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
				className: `keyword-search-bar__button ${disabledClass}`,
				onClick: searchKeyword,
				title: submitButtonText,
				"aria-label": submitButtonText,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "keyword-search-bar__button-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Search, { alt: "Search by Keyword" })
				})
			})]
		});
	};
	KeywordSearchBar.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/keyword/SearchSummary.jsx
var import_jsx_runtime$2, SearchSummary;
var init_SearchSummary = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$2 = require_jsx_runtime();
	SearchSummary = ({ primeAwardTotal, primeTransactionCount, inFlight }) => {
		let formattedPrimeCount = /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: "\xA0—\xA0" });
		let formattedPrimeAmount = /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: "\xA0—\xA0" });
		if (!inFlight) {
			const primeCount = primeTransactionCount;
			const primeAmount = primeAwardTotal;
			const primeCountUnits = calculateUnitForSingleValue(primeCount);
			const primeAmountUnits = calculateUnitForSingleValue(primeAmount);
			if (primeCountUnits.unit >= unitValues.MILLION) formattedPrimeCount = `${formatNumberWithPrecision(primeCount / primeCountUnits.unit, 1)}${primeCountUnits.unitLabel}`;
			else formattedPrimeCount = `${formatNumberWithPrecision(primeCount, 0)}`;
			if (primeAmountUnits.unit >= unitValues.MILLION) formattedPrimeAmount = `${formatMoneyWithPrecision(primeAmount / primeAmountUnits.unit, 1)}${primeAmountUnits.unitLabel}`;
			else formattedPrimeAmount = `${formatMoneyWithPrecision(primeAmount, 0)}`;
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "keyword-header__summary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "keyword-header__summary-title",
					children: "Search Summary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "keyword-header__summary-amount",
					children: ["Total Prime Award Amount: ", /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "keyword-header__summary-amount keyword-header__summary-amount_bold",
						children: formattedPrimeAmount
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "keyword-header__summary-amount",
					children: ["Prime Award Transaction Count: ", /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "keyword-header__summary-amount keyword-header__summary-amount_bold",
						children: formattedPrimeCount
					})]
				})
			]
		});
	};
	SearchSummary.propTypes = {
		primeAwardTotal: PropTypes.number,
		primeTransactionCount: PropTypes.number,
		inFlight: PropTypes.bool
	};
}));
//#endregion
//#region src/js/components/keyword/KeywordPage.jsx
/**
* KeywordPage.jsx
* Created by Lizzie Salita 1/4/18
*/
var import_jsx_runtime$1, propTypes, KeywordPage;
var init_KeywordPage = __esmMin((() => {
	init_development();
	init_Analytics();
	init_metaTagHelper();
	init_ResultsTableContainer();
	init_BulkDownloadModalContainer();
	init_PageWrapper();
	init_DownloadButton508();
	init_KeywordSearchBar();
	init_SearchSummary();
	init_NoDownloadHover();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = {
		updateKeyword: PropTypes.func,
		keyword: PropTypes.string,
		summary: PropTypes.object,
		summaryInFlight: PropTypes.bool,
		fetchSummary: PropTypes.func,
		download: PropTypes.object,
		startDownload: PropTypes.func,
		downloadAvailable: PropTypes.bool
	};
	KeywordPage = ({ updateKeyword, keyword, summary, summaryInFlight, fetchSummary, download, startDownload, downloadAvailable }) => {
		const [showModal, setShowModal] = useState(false);
		const hideModal = () => setShowModal(false);
		useEffect(() => {
			if (showModal && download.expectedUrl === "" && !download.showCollapsedProgress) hideModal();
		}, [
			download.expectedUrl,
			download.showCollapsedProgress,
			showModal
		]);
		const clickedDownload = () => {
			startDownload();
			setShowModal(true);
			Analytics.event({
				event: "keyword-download",
				category: "Keyword Search - Download",
				action: keyword
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "Keyword Search",
			classNames: "usa-da-keyword-page",
			title: "Keyword Search",
			metaTagProps: keywordPageMetaTags,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SearchSummary, {
				primeAwardTotal: summary?.primeAmount,
				primeTransactionCount: summary?.primeCount,
				inFlight: summaryInFlight
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DownloadIconButton508, {
				tooltipComponent: !downloadAvailable && keyword ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(NoDownloadHover, {}) : null,
				isEnabled: downloadAvailable,
				onClick: clickedDownload
			})].filter((c, i) => i === 1 && !keyword || keyword),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("main", {
				id: "main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "keyword-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "keyword-search-bar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(KeywordSearchBar, {
							keyword,
							updateKeyword
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "keyword-search-bar__info",
							children: [
								"Use the Keyword Search to get a broad picture of award data on a given theme. To learn more about the fields the Keyword search matches to, read our",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
									href: "https://onevoicecrm.my.site.com/usaspending/s/recordlist/Knowledge__kav/00B3d000000V4WDEA0",
									target: "_blank",
									rel: "noopener noreferrer",
									children: "FAQ entry"
								}),
								" on the topic. For a more targeted search, try our",
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Link, {
									to: "/search",
									children: " Advanced Search tool"
								}),
								", whose extensive filters let you find more precise data sets."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ResultsTableContainer, {
						keyword,
						fetchSummary
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BulkDownloadModalContainer_default, {
					mounted: showModal,
					hideModal
				})]
			})
		});
	};
	KeywordPage.propTypes = propTypes;
}));
//#endregion
//#region src/_scss/pages/keyword/keywordPage.scss
var require_keywordPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/containers/keyword/KeywordContainer.jsx
/**
* KeywordContainer.jsx
* Created by Lizzie Salita 1/4/18
*/
var import_jsx_runtime, KeywordContainer;
//#endregion
__esmMin((() => {
	init_development();
	init_es();
	init_axios();
	init_Analytics();
	init_bulkDownloadActions();
	init_bulkDownloadHelper();
	init_keywordHelper();
	init_KeywordPage();
	import_jsx_runtime = require_jsx_runtime();
	require_keywordPage();
	KeywordContainer = () => {
		const [keyword, setKeyword] = useState("");
		const [summary, setSummary] = useState(null);
		const [summaryInFlight, setSummaryInFlight] = useState(false);
		const [downloadAvailable, setDownloadAvailable] = useState(false);
		const history = useNavigate();
		const dispatch = useDispatch();
		const keywordUrl = useMatch(`/keyword_search/:keyword`)?.params.keyword;
		let summaryRequest = null;
		let downloadRequest = null;
		const downloadObject = useSelector((state) => state.bulkDownload.download);
		const handleUrl = (urlKeyword) => {
			if (urlKeyword) {
				setKeyword(decodeURIComponent(urlKeyword));
				if (keyword.length > 2) setKeyword(keyword);
			} else if (keyword) setKeyword("");
		};
		const updateKeyword = (keywordParam) => {
			const slug = encodeURIComponent(keywordParam);
			setKeyword(keywordParam);
			history(`/keyword_search/${slug}`, { replace: true });
			Analytics.event({
				event: "keyword",
				category: "Keyword Search - Keyword",
				action: keywordParam
			});
		};
		const requestDownload = (params) => {
			if (downloadRequest) downloadRequest.cancel();
			downloadRequest = requestAwardsDownload(params);
			downloadRequest.promise.then((res) => {
				dispatch(setDownloadExpectedUrl(res.data.file_url));
				dispatch(setDownloadExpectedFile(res.data.file_name));
				dispatch(setDownloadPending(true));
			}).catch((err) => {
				if (!isCancel(err)) {
					console.log(err);
					if (err.response) console.log(err.response.data.message);
					else console.log(err.message);
				}
			});
		};
		const startDownload = () => {
			requestDownload({
				award_levels: ["prime_awards"],
				filters: { keyword }
			});
		};
		const fetchSummary$1 = () => {
			if (summaryRequest) summaryRequest.cancel();
			setSummaryInFlight(true);
			summaryRequest = fetchSummary({ filters: { keyword } });
			summaryRequest.promise.then((res) => {
				const results = res.data.results;
				setDownloadAvailable(results.prime_awards_count < 5e5);
				setSummaryInFlight(false);
				setSummary({
					primeCount: results.prime_awards_count,
					primeAmount: results.prime_awards_obligation_amount
				});
			}).catch((err) => {
				if (!isCancel(err)) {
					setSummaryInFlight(false);
					console.log(err);
					summaryRequest.cancel();
				}
			});
		};
		useEffect(() => {
			handleUrl(keywordUrl);
		}, [keywordUrl]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeywordPage, {
			updateKeyword,
			keyword,
			summary,
			summaryInFlight,
			fetchSummary: fetchSummary$1,
			download: downloadObject,
			downloadAvailable,
			startDownload
		});
	};
}))();
export { KeywordContainer as default };
