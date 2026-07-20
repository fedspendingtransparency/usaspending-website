import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Fr as init_dist, Pr as FontAwesomeIcon, bi as formatMoneyWithUnitsShortLabel, ro as require_jsx_runtime, vi as formatMoneyWithPrecision, wi as init_moneyFormatter } from "./index.js-CgeUxZJy.js";
import { c as init_mapHelper, m as visualizationColors } from "./WithDefCodes-rdyZ-NLw.js";
import { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { find, uniqueId } from "lodash-es";
//#region src/js/components/sharedComponents/map/MapLegendItem.jsx
var import_jsx_runtime$6, propTypes$5, MapLegendItem;
var init_MapLegendItem = __esmMin((() => {
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$5 = {
		color: PropTypes.string,
		label: PropTypes.string
	};
	MapLegendItem = ({ color, label }) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("li", {
		className: "map-legend-item-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "map-legend-item",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "color-swatch",
				style: { backgroundColor: color }
			}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "label",
				children: label
			})]
		})
	});
	MapLegendItem.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/sharedComponents/map/MapLegend.jsx
/**
* MapLegend.jsx
* Created by Kevin Li 2/17/17
*/
var import_jsx_runtime$5, propTypes$4, MapLegend;
var init_MapLegend = __esmMin((() => {
	init_moneyFormatter();
	init_mapHelper();
	init_MapLegendItem();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$4 = {
		units: PropTypes.shape({
			unit: PropTypes.number,
			precision: PropTypes.number,
			unitLabel: PropTypes.string
		}),
		segments: PropTypes.arrayOf(PropTypes.number)
	};
	MapLegend = memo(function MapLegend({ units = {
		unit: 1,
		precision: 0,
		unitLabel: ""
	}, segments }) {
		const prepareItems = (s, { unit, precision, unitLabel }) => s.map((segment, i, array) => {
			let label;
			const color = visualizationColors[i];
			const currencyValue = formatMoneyWithPrecision(segment / unit, precision) + unitLabel;
			let previousValue = "";
			if (i > 0) {
				const previous = array[i - 1];
				previousValue = formatMoneyWithPrecision(previous / unit, precision) + unitLabel;
			}
			if (i === 0) label = `Less than ${currencyValue}`;
			else if (i + 1 === array.length) label = `More than ${previousValue}`;
			else label = `${previousValue} to ${currencyValue}`;
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(MapLegendItem, {
				label,
				color
			}, `item-${uniqueId()}`);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "map-legend",
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("ul", {
				className: "map-legend-body",
				children: prepareItems(segments, units)
			})
		});
	});
	MapLegend.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/sharedComponents/map/MapFiltersTitle.jsx
var import_jsx_runtime$4, MapFiltersTitle;
var init_MapFiltersTitle = __esmMin((() => {
	import_jsx_runtime$4 = require_jsx_runtime();
	MapFiltersTitle = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		className: "map__filters-header__title",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "map-filters-header__title-text",
			children: "Show on Map"
		})
	});
}));
//#endregion
//#region src/js/components/search/visualizations/geo/GeoVisualizationTooltip.jsx
/**
* GeoVisualizationTooltip.jsx
* Created by Kevin Li 2/23/17
*/
var import_jsx_runtime$3, propTypes$3, GeoVisualizationTooltip;
var init_GeoVisualizationTooltip = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		label: PropTypes.string,
		value: PropTypes.number,
		y: PropTypes.number,
		x: PropTypes.number,
		visualization: PropTypes.object,
		total: PropTypes.number,
		description: PropTypes.string
	};
	GeoVisualizationTooltip = (props) => {
		let containerDiv;
		let tooltipDiv;
		let pointerDiv;
		const positionTooltip = () => {
			const tooltipWidth = tooltipDiv.offsetWidth;
			const containerX = containerDiv.getBoundingClientRect().left;
			const windowWidth = window.innerWidth;
			let direction = "left";
			if (tooltipWidth + containerX + props.x >= windowWidth - 20) direction = "right";
			let offset = -9;
			if (direction === "right") offset = 9 + tooltipWidth;
			tooltipDiv.style.top = `${props.y - 15}px`;
			tooltipDiv.style.left = `${props.x - offset}px`;
			tooltipDiv.className = `tooltip ${direction}`;
			pointerDiv.className = `tooltip-pointer ${direction}`;
		};
		useEffect(() => {
			positionTooltip();
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "visualization-tooltip",
			ref: (div) => {
				containerDiv = div;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "tooltip",
				ref: (div) => {
					tooltipDiv = div;
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "tooltip-pointer",
						ref: (div) => {
							pointerDiv = div;
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "tooltip-title",
						children: props.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "tooltip-body",
						children: [props.description && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "tooltip-label",
							children: props.description
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "tooltip-value",
							children: formatMoneyWithUnitsShortLabel(props.value)
						})]
					})
				]
			})
		});
	};
	GeoVisualizationTooltip.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/dataMapping/search/location.js
var locationDropdown;
var init_location = __esmMin((() => {
	locationDropdown = {
		zip_code: "Zip Code",
		current_cd: "Current Congressional Districts (based on 2023 redistricting)",
		original_cd: "Original Congressional Districts (as reported by federal agencies)",
		county: "County",
		city: "City",
		state: "State or Territory",
		country: "Country/Entity"
	};
}));
//#endregion
//#region src/js/components/sharedComponents/autocomplete/Suggestion.jsx
/**
* Created by michaelbray on 1/27/17.
*/
var import_jsx_runtime$2, propTypes$2, Suggestion;
var init_Suggestion = __esmMin((() => {
	init_location();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = {
		id: PropTypes.string,
		title: PropTypes.string,
		subtitle: PropTypes.string,
		data: PropTypes.object,
		selected: PropTypes.bool,
		select: PropTypes.func,
		matchingString: PropTypes.string
	};
	Suggestion = ({ id, title = "", subtitle = "", data = [], selected = false, select, matchingString = null, category, values }) => {
		const suggestion = useRef();
		useEffect(() => {
			if (suggestion.current) suggestion.current.addEventListener("mousedown", () => {
				select(data);
			});
			return () => {
				if (suggestion.current) suggestion.current.removeEventListener("mousedown", () => {
					select(data);
				});
			};
		}, [
			data,
			select,
			suggestion
		]);
		const isNewHeading = () => {
			let notFound = true;
			if (category) {
				const key = parseInt(id[id.length - 1], 10);
				values.slice(0, key).forEach((value) => {
					if (value.category === category) notFound = false;
				});
			}
			return notFound;
		};
		const boldedText = (text, shouldBeBold) => {
			const textArray = text?.split(RegExp(shouldBeBold, "ig"));
			const match = text?.match(RegExp(shouldBeBold, "ig"));
			return textArray?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", { children: [item, index !== textArray.length - 1 && match && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "semibold",
				children: match[index]
			})] }, `item: ${item}-${index}`));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [isNewHeading() && category && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
			className: "autocomplete-heading",
			children: locationDropdown[category]
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("li", {
			id,
			tabIndex: -1,
			"aria-selected": selected,
			role: "option",
			ref: suggestion,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: boldedText(title, matchingString) }, id),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("br", {}),
				boldedText(subtitle, matchingString)
			]
		})] });
	};
	Suggestion.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/sharedComponents/autocomplete/SuggestionHolder.jsx
var import_jsx_runtime$1, propTypes$1, SuggestionHolder;
var init_SuggestionHolder = __esmMin((() => {
	init_Suggestion();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		select: PropTypes.func,
		suggestions: PropTypes.array,
		selectedIndex: PropTypes.number,
		maxSuggestions: PropTypes.number,
		shown: PropTypes.bool,
		autocompleteId: PropTypes.string,
		matchingString: PropTypes.string
	};
	SuggestionHolder = ({ select, suggestions = [], selectedIndex = 0, maxSuggestions = 10, shown = false, autocompleteId, matchingString }) => {
		const suggestionsArray = [];
		for (let i = 0; i < Math.min(suggestions.length, maxSuggestions); i++) suggestionsArray.push(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Suggestion, {
			values: suggestions,
			category: suggestions[i].category,
			title: suggestions[i].title,
			subtitle: suggestions[i].subtitle,
			data: suggestions[i],
			selected: i === selectedIndex,
			select,
			id: `${autocompleteId}__option_${i}`,
			matchingString
		}, i));
		let hiddenClass = "hide";
		if (shown && suggestions.length > 0) hiddenClass = "";
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", {
			id: autocompleteId,
			className: `autocomplete ${hiddenClass}`,
			role: "listbox",
			children: suggestionsArray
		});
	};
	SuggestionHolder.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/sharedComponents/autocomplete/Autocomplete.jsx
/**
* Created by michaelbray on 1/27/17.
*/
var import_jsx_runtime, propTypes, Autocomplete;
var init_Autocomplete = __esmMin((() => {
	init_dist();
	init_SuggestionHolder();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		handleTextInput: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		clearAutocompleteSuggestions: PropTypes.func.isRequired,
		values: PropTypes.array,
		placeholder: PropTypes.string,
		errorHeader: PropTypes.string,
		errorMessage: PropTypes.string,
		maxSuggestions: PropTypes.number,
		label: PropTypes.string,
		noResults: PropTypes.bool,
		characterLimit: PropTypes.number,
		retainValue: PropTypes.bool,
		minCharsToSearch: PropTypes.number,
		icon: PropTypes.bool,
		size: PropTypes.oneOf(["small", "medium"]),
		id: PropTypes.string,
		minChar: PropTypes.bool,
		isLoading: PropTypes.bool,
		disabled: PropTypes.bool,
		selectedItemsDisplayNames: PropTypes.object,
		type: PropTypes.string
	};
	Autocomplete = ({ handleTextInput, onSelect, clearAutocompleteSuggestions, values = [], placeholder = "", errorHeader = "No results found", errorMessage = "", maxSuggestions = 1e3, label = "", noResults = false, characterLimit = 524288, retainValue = false, minCharsToSearch = 3, icon = false, size = "medium", id = "", minChar = false, isLoading = false, disabled = false, selectedItemsDisplayNames, type }) => {
		const [value, setValue] = useState("");
		const [shown, setShown] = useState(false);
		const [selectedIndex, setSelectedIndex] = useState(-1);
		const [showWarning, setShowWarning] = useState(false);
		const [staged, setStaged] = useState(false);
		const autocompleteIdRef = useRef(`autocomplete-${uniqueId()}`);
		const autocompleteInputRef = useRef();
		const checkValidity = (input) => {
			setShowWarning(false);
			if (input.length < minCharsToSearch) {
				setValue(input);
				setShowWarning(true);
			}
		};
		const clearInternalState = () => {
			setValue("");
			if (autocompleteInputRef.current) autocompleteInputRef.current.value = "";
		};
		const isValidSelection = (selection) => find(values, selection);
		const bubbleUpChange = (selection) => {
			let selectedItem = null;
			let selectedItemTitle = null;
			const isValid = isValidSelection(selection);
			if (isValid) {
				selectedItem = selection.data;
				selectedItemTitle = selection.title;
				setStaged(true);
			}
			onSelect(selectedItem, isValid, selection);
			if (retainValue && isValid) {
				autocompleteInputRef.current.value = selectedItemTitle;
				autocompleteInputRef.current.style.fontWeight = "400";
			} else setValue("");
		};
		const scrollToSelectedId = (selectedId) => {
			document.getElementById(`${autocompleteIdRef.current}__option_${selectedId}`).scrollIntoView({
				behavior: "auto",
				block: "nearest",
				inline: "nearest"
			});
		};
		const open = () => {
			setShown(true);
		};
		const close = () => {
			if (!retainValue && !staged) clearInternalState();
			setShown(false);
			setShowWarning(false);
		};
		const previous = () => {
			if (selectedIndex > 0) {
				setSelectedIndex(selectedIndex - 1);
				scrollToSelectedId(selectedIndex - 1);
			} else {
				setSelectedIndex(values.length - 1);
				scrollToSelectedId(values.length - 1);
			}
		};
		const next = () => {
			if (selectedIndex < values.length - 1) {
				setSelectedIndex(selectedIndex + 1);
				scrollToSelectedId(selectedIndex + 1);
			} else {
				setSelectedIndex(0);
				scrollToSelectedId(0);
			}
		};
		const select = (element) => {
			close();
			bubbleUpChange(element);
		};
		const onChange = (e) => {
			e.persist();
			checkValidity(e.target.value);
			let selectIndex = 0;
			handleTextInput(e);
			if (!e.target.value) {
				selectIndex = -1;
				close();
			}
			setValue(e.target.value);
			setSelectedIndex(selectIndex);
			setStaged(false);
		};
		const onKeyDown = (e) => {
			if (e.key === "Enter") {
				e.stopPropagation();
				e.preventDefault();
				select(values[selectedIndex]);
				if (!retainValue) setValue("");
			} else if (e.key === "Tab" || e.key === "Escape") {
				setValue("");
				close();
			} else if (e.key === "ArrowUp") previous();
			else if (e.key === "ArrowDown") next();
		};
		const onBlur = () => {
			close();
			if (!retainValue) setValue("");
		};
		const toggleWarning = () => {
			setShowWarning(noResults);
		};
		const generateWarning = () => {
			if (showWarning) {
				let error;
				const warning = (header, description) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "autocomplete",
					role: "listbox",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "unselectable",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: header }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							description
						]
					})
				});
				if (value && value.length < minCharsToSearch && minChar) error = warning("Error", `Please enter more than ${minCharsToSearch - 1} character${minCharsToSearch > 2 ? "s" : ""}.`);
				else if (value && value.length < minCharsToSearch && !minChar) error = null;
				else error = warning(errorHeader, errorMessage);
				return error;
			}
			return null;
		};
		let activeDescendant = "";
		let status = "";
		if (shown && selectedIndex > -1) {
			activeDescendant = `${autocompleteIdRef.current}__option-${selectedIndex}`;
			if (values.length > selectedIndex) {
				const selectedString = values[selectedIndex].title;
				const valueCount = Math.min(maxSuggestions, values.length);
				status = `${selectedString} (${selectedIndex + 1} of ${valueCount})`;
			}
		}
		const loadingIndicator = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autocomplete-filter-message-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
				icon: "spinner",
				spin: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "autocomplete-filter-message-container__text",
				children: "Loading your data..."
			})]
		});
		let variation = "";
		if (size === "small") variation = "-sm";
		else if (size === "medium") variation = "-md";
		useEffect(() => () => {
			clearAutocompleteSuggestions();
		}, []);
		useEffect(() => {
			open();
		}, [values]);
		useEffect(() => {
			toggleWarning();
		}, [noResults]);
		useEffect(() => {
			if (type && selectedItemsDisplayNames && Object.keys(selectedItemsDisplayNames).length > 0) {
				if (selectedItemsDisplayNames[type] && autocompleteInputRef?.current) {
					autocompleteInputRef.current.value = selectedItemsDisplayNames[type];
					autocompleteInputRef.current.style.fontWeight = "600";
				}
			}
		}, [selectedItemsDisplayNames, type]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "usa-da-typeahead-wrapper",
			role: "combobox",
			"aria-controls": autocompleteIdRef.current,
			"aria-expanded": shown,
			"aria-haspopup": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "usa-da-typeahead",
				children: [
					label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "usa-da-typeahead__input",
						children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: id !== "" ? id : null,
							className: `autocomplete${variation}${icon ? " icon" : ""}`,
							ref: autocompleteInputRef,
							type: "text",
							placeholder,
							onChange: onChange.bind(void 0),
							tabIndex: 0,
							"aria-controls": autocompleteIdRef.current,
							"aria-activedescendant": activeDescendant,
							"aria-autocomplete": "list",
							onBlur: () => onBlur,
							onKeyDown: (e) => onKeyDown(e),
							maxLength: characterLimit,
							disabled
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "screen-reader-description",
						role: "alert",
						children: status
					}),
					isLoading ? loadingIndicator : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionHolder, {
						suggestions: values,
						shown,
						selectedIndex,
						select: select.bind(void 0),
						maxSuggestions,
						autocompleteId: autocompleteIdRef.current,
						matchingString: value
					}),
					generateWarning()
				]
			})
		});
	};
	Autocomplete.propTypes = propTypes;
}));
//#endregion
export { MapFiltersTitle as a, init_MapLegend as c, init_GeoVisualizationTooltip as i, init_Autocomplete as n, init_MapFiltersTitle as o, GeoVisualizationTooltip as r, MapLegend as s, Autocomplete as t };
