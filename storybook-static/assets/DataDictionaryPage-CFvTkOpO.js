import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, $t as init_apiRequest, Fr as init_dist, On as init_Icons, Or as so, Pr as FontAwesomeIcon, Qt as apiRequest, br as fo, cn as ArrowDown, er as init_Analytics, ln as ArrowUp, mr as Wo, ro as require_jsx_runtime, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, h as dataDictionaryPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_H2PageHeader, t as H2PageHeader } from "./H2PageHeader-5SXK0ZMz.js";
import { n as init_ReadMore, t as ReadMore } from "./ReadMore-ByF767MK.js";
import React from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region src/js/components/dataDictionary/table/DataDictionaryTableSorter.jsx
var import_jsx_runtime$4, propTypes$2, DataDictionaryTableSorter;
var init_DataDictionaryTableSorter = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = {
		field: PropTypes.string,
		label: PropTypes.string,
		changeSort: PropTypes.func,
		active: PropTypes.object
	};
	DataDictionaryTableSorter = (props) => {
		const sortDesc = () => {
			props.changeSort(props.field, "desc");
		};
		const sortAsc = () => {
			props.changeSort(props.field, "asc");
		};
		const activeAsc = props.active.field === props.field && props.active.direction === "asc" ? "header-sorter__button_active" : "";
		const activeDesc = props.active.field === props.field && props.active.direction === "desc" ? "header-sorter__button_active" : "";
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "state-list__head-sorter header-sorter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
				className: `header-sorter__button ${activeAsc}`,
				onClick: sortAsc,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArrowUp, { alt: `Sort table by ascending ${props.label}` })
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
				className: `header-sorter__button ${activeDesc}`,
				onClick: sortDesc,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArrowDown, { alt: `Sort table by descending ${props.label}` })
			})]
		});
	};
	DataDictionaryTableSorter.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/dataDictionary/table/DataDictionaryTable.jsx
/**
* DataDictionaryTable.jsx
* Created by Lizzie Salita 9/14/18
*/
var import_jsx_runtime$3, propTypes$1, DataDictionaryTable;
var init_DataDictionaryTable = __esmMin((() => {
	init_index_es();
	init_ReadMore();
	init_DataDictionaryTableSorter();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		searchTerm: PropTypes.string,
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		sections: PropTypes.array,
		columns: PropTypes.array,
		rows: PropTypes.array,
		sort: PropTypes.object,
		changeSort: PropTypes.func
	};
	DataDictionaryTable = class extends React.Component {
		scrollRightTop(e) {
			const topBar = document.getElementById("topBar");
			const bottomBar = document.getElementById("bottomBar");
			const headerDiv = document.getElementById("headerDiv");
			bottomBar.scrollLeft = topBar.scrollLeft;
			headerDiv.scrollLeft = e.target.scrollLeft;
		}
		scrollRightBottom(e) {
			const topBar = document.getElementById("topBar");
			const bottomBar = document.getElementById("bottomBar");
			const headerDiv = document.getElementById("headerDiv");
			topBar.scrollLeft = bottomBar.scrollLeft;
			headerDiv.scrollLeft = e.target.scrollLeft;
		}
		generateSectionHeadings() {
			return this.props.sections.map((section, i) => {
				let cellClass = "";
				if (i === 0) cellClass = "dictionary-table__head-cell_first";
				else if (i === this.props.sections.length - 1) cellClass = "dictionary-table__head-cell_last";
				return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
					className: `dictionary-table__head-cell section-${i} ${cellClass}`,
					colSpan: section.colspan,
					children: section.section
				}, section.section);
			});
		}
		generateColumnHeadings() {
			const columns = [];
			let start = 0;
			this.props.sections.forEach((section, i) => {
				const sectionColumns = this.props.columns.slice(start, start + section.colspan);
				columns.push(sectionColumns.map((col, j) => {
					let cellClass = "";
					if (i === 0 && j === 0) cellClass = "dictionary-table__head-cell_first";
					else if (i === this.props.sections.length - 1 && j === section.colspan - 1) cellClass = "dictionary-table__head-cell_last";
					return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
						className: `dictionary-table__head-cell section-${i}-col ${cellClass}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "header-cell",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "header-cell__text",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "header-cell__title",
									children: col.display
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DataDictionaryTableSorter, {
								field: col.raw,
								label: col.display,
								active: this.props.sort,
								changeSort: this.props.changeSort
							})]
						})
					}, col.raw);
				}));
				start += section.colspan;
			});
			return columns;
		}
		generateRows() {
			let rows = [];
			this.props.rows.forEach((row, i) => {
				if (this.props.searchTerm) {
					if (row.find((data) => data.toLowerCase().match(this.props.searchTerm.toLowerCase()))) rows.push(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tr", {
						className: "dictionary-table__body-row",
						children: this.generateRow(row)
					}, `row-${i}`));
				} else rows.push(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tr", {
					className: "dictionary-table__body-row",
					children: this.generateRow(row)
				}, `row-${i}`));
			});
			if (rows.length === 0 && this.props.searchTerm) rows = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tr", {
				className: "dictionary-table__body-row",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", {
					className: "dictionary-table__body-cell dictionary-table__body-cell_message",
					colSpan: this.props.columns.length,
					children: "No terms matched your search."
				})
			});
			return rows;
		}
		generateRow(row) {
			const cells = [];
			let start = 0;
			this.props.sections.forEach((section, i) => {
				const sectionCells = row.slice(start, start + section.colspan);
				cells.push(sectionCells.map((data, j) => {
					let highlightClass = "";
					if (this.props.searchTerm && data.toLowerCase().match(this.props.searchTerm.toLowerCase())) highlightClass = "dictionary-table__body-cell_highlight-cell";
					let cellClass = "";
					if (i === 0 && j === 0) cellClass = "dictionary-table__body-cell_first";
					else if (i === this.props.sections.length - 1 && j === section.colspan - 1) cellClass = "dictionary-table__body-cell_last";
					return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", {
						className: `dictionary-table__body-cell section-${i}-cell ${highlightClass} ${cellClass}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ReadMore, {
							text: data,
							limit: 205,
							initiallyExpanded: !!this.props.searchTerm
						})
					}, uniqueId());
				}));
				start += section.colspan;
			});
			return cells;
		}
		render() {
			let message = null;
			let table = null;
			let scrollVisible = false;
			if (this.props.inFlight) message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Wo, {});
			else if (this.props.error) message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(fo, {});
			else {
				scrollVisible = true;
				table = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "dictionary-table__container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "dictionary-table__headers",
						id: "headerDiv",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("table", {
							className: "dictionary-table__headers-table",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("thead", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tr", {
								className: "dictionary-table__headers-row",
								children: this.generateSectionHeadings()
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tr", {
								className: "dictionary-table__headers-row",
								children: this.generateColumnHeadings()
							})] })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "dictionary-table__content",
						id: "bottomBar",
						onScroll: this.scrollRightBottom,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("table", {
							className: "dictionary-table__content-table",
							id: "dictionary-table__content-table",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tbody", {
								className: "dictionary-table__content-body",
								children: this.generateRows()
							})
						})
					})]
				});
			}
			const innerTable = document.getElementById("dictionary-table__content-table");
			let width = 0;
			if (innerTable) width = `${innerTable.offsetWidth}px`;
			const style = { width };
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "dictionary-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: `dictionary-table__above-scroller ${scrollVisible ? "" : "dictionary-table__above-scroller-hidden"}`,
					id: "topBar",
					onScroll: this.scrollRightTop,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "dictionary-table__scroller",
						style
					})
				}), message || table]
			});
		}
	};
	DataDictionaryTable.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/dataDictionary/DataDictionary.jsx
var import_jsx_runtime$2, propTypes, handleDownloadClick, DataDictionary;
var init_DataDictionary = __esmMin((() => {
	init_dist();
	init_index_es();
	init_Analytics();
	init_DataDictionaryTable();
	init_H2PageHeader();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		sections: PropTypes.array,
		columns: PropTypes.array,
		rows: PropTypes.array,
		sort: PropTypes.object,
		changeSort: PropTypes.func,
		setSearchString: PropTypes.func,
		searchTerm: PropTypes.string,
		downloadLocation: PropTypes.string
	};
	handleDownloadClick = () => {
		Analytics.event({
			event: "download_data_dictionary",
			category: "Download Center - Data Dictionary",
			action: "Download",
			gtm: true
		});
	};
	DataDictionary = ({ inFlight, error, sections, columns, rows, sort, changeSort, setSearchString, searchTerm, downloadLocation }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "data-dictionary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(H2PageHeader, {
					title: "Data Dictionary",
					subtitle: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", { children: "The data dictionary below shows detailed information about the data available in our download files, including the definition of each element and its element name on the legacy USAspending.gov website." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "data-dictionary__search-download",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(so, {
						onSearch: setSearchString,
						placeholder: "Search by Term"
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "data-dictionary__download",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("a", {
							className: "data-dictionary__download-link",
							onClick: handleDownloadClick,
							href: downloadLocation,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
								className: "data-dictionary__download-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FontAwesomeIcon, { icon: "file-excel" })
							}), "Download"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "data-dictionary__table-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DataDictionaryTable, {
						searchTerm,
						inFlight,
						error,
						sections,
						columns,
						rows,
						sort,
						changeSort
					})
				})
			]
		});
	};
	DataDictionary.propTypes = propTypes;
}));
//#endregion
//#region src/js/apis/dataDictionary.js
var fetchDataDictionary;
var init_dataDictionary = __esmMin((() => {
	init_apiRequest();
	fetchDataDictionary = () => apiRequest({ url: "v2/references/data_dictionary/" });
}));
//#endregion
//#region src/js/containers/dataDictionary/DataDictionaryContainer.jsx
/**
* DataDictionaryContainer.jsx
* Created by Lizzie Salita 8/31/18
*/
var import_jsx_runtime$1, DataDictionaryContainer;
var init_DataDictionaryContainer = __esmMin((() => {
	init_DataDictionary();
	init_dataDictionary();
	import_jsx_runtime$1 = require_jsx_runtime();
	DataDictionaryContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.request = null;
			this.state = {
				inFlight: true,
				error: false,
				sections: [],
				columns: [],
				rows: [],
				downloadLocation: "",
				sort: {
					field: "",
					direction: ""
				},
				searchTerm: ""
			};
		}
		componentDidMount() {
			this.loadContent();
		}
		setSearchString = (searchTerm) => {
			this.setState({ searchTerm });
		};
		loadContent = () => {
			this.setState({ inFlight: true });
			if (this.request) this.request.cancel();
			this.request = fetchDataDictionary();
			this.request.promise.then((res) => {
				const content = res.data.document;
				this.setState({
					sections: content.sections,
					columns: content.headers,
					downloadLocation: content.metadata.download_location,
					inFlight: false,
					error: false
				}, () => this.parseRows(content.rows));
			}).catch((err) => {
				console.error(err);
				this.setState({
					inFlight: false,
					error: true
				});
				this.request = null;
			});
		};
		parseRows(rows) {
			const parsedRows = rows.map((row) => row.map((data) => data || "N/A"));
			this.setState({ rows: parsedRows }, () => {
				this.defaultSort();
			});
		}
		defaultSort() {
			if (this.state.columns.length > 0) this.changeSort(this.state.columns[0].raw, "asc");
		}
		changeSort = (field, direction) => {
			const index = this.state.columns.findIndex((col) => col.raw === field);
			let rows;
			if (direction === "desc") rows = this.state.rows.sort((a, b) => b[index].localeCompare(a[index]));
			else rows = this.state.rows.sort((a, b) => a[index].localeCompare(b[index]));
			this.setState({
				rows,
				sort: {
					field,
					direction
				}
			});
		};
		render = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DataDictionary, {
			...this.state,
			changeSort: this.changeSort,
			setSearchString: this.setSearchString,
			searchTerm: this.state.searchTerm
		});
	};
}));
//#endregion
//#region src/_scss/pages/dataDictionary/dataDictionaryPage.scss
var require_dataDictionaryPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/dataDictionary/DataDictionaryPage.jsx
/**
* DataDictionaryPage.jsx
* Created by Brett Varney 4/22/2021
*/
var import_jsx_runtime, DataDictionaryPage;
//#endregion
__esmMin((() => {
	init_PageWrapper();
	init_metaTagHelper();
	init_DataDictionaryContainer();
	import_jsx_runtime = require_jsx_runtime();
	require_dataDictionaryPage();
	DataDictionaryPage = class extends React.Component {
		render = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Data Dictionary",
			classNames: "usa-da-data-dictionary-page",
			metaTagProps: dataDictionaryPageMetaTags,
			title: "Data Dictionary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataDictionaryContainer, {})
			})
		});
	};
}))();
export { DataDictionaryPage as default };
