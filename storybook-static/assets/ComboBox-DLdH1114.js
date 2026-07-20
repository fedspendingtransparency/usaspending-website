import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Kr as FontAwesomeIcon, go as require_jsx_runtime, qr as init_dist } from "./index.js-Dk2VDaPz.js";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region src/js/components/sharedComponents/ComboBox.jsx
var import_jsx_runtime, propTypes, ComboBox;
var init_ComboBox = __esmMin((() => {
	init_dist();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		optionsArray: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})).isRequired,
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		placeholder: PropTypes.string,
		defaultValue: PropTypes.string,
		formName: PropTypes.string,
		disabled: PropTypes.bool,
		className: PropTypes.string,
		onSelect: PropTypes.func,
		onClearSelect: PropTypes.func,
		filterInput: PropTypes.bool
	};
	ComboBox = memo(function ComboBox({ onSelect, optionsArray, label, placeholder, defaultValue = "", formName, disabled, onClearSelect = () => {}, className, filterInput = true }) {
		const [inputValue, setInputValue] = useState("");
		const [openOptions, setOpenOptions] = useState(false);
		const comboRef = useRef(null);
		useEffect(() => {
			setInputValue(defaultValue);
		}, [JSON.stringify(optionsArray), defaultValue]);
		let optionsArr = optionsArray;
		if (filterInput) optionsArr = optionsArray.filter(({ text }) => text?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
		const options = optionsArr.map(({ value, text }) => {
			const onClick = (e) => {
				setInputValue(text);
				setOpenOptions(false);
				onSelect(e);
			};
			const disabledOption = typeof value !== "string" ? false : value?.indexOf("disabled") !== -1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				value,
				className: "combo-box__options-item",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "combo-box__option",
					type: "button",
					"aria-label": `${formName}-option-item`,
					onClick,
					name: text,
					value,
					disabled: disabledOption,
					children: text
				})
			}, uniqueId("combobox-option__"));
		});
		const onChange = (e) => {
			setInputValue(e.target.value);
			setOpenOptions(e.target.value !== 0);
		};
		const onClickClear = useCallback(() => {
			setInputValue("");
			setOpenOptions(false);
			onClearSelect();
		}, []);
		useEffect(() => {
			if (disabled) onClickClear();
		}, [disabled, onClickClear]);
		const onClickToggle = () => setOpenOptions((prevState) => !prevState);
		const chevron = openOptions ? "chevron-up" : "chevron-down";
		const isDisabledAndEmpty = disabled || optionsArray.length === 0;
		const inputValueEmpty = inputValue === "";
		const noSearchResults = options.length === 0 && !inputValueEmpty;
		useEffect(() => {
			const handleOutsideClick = (e) => {
				if (comboRef.current && !comboRef.current.contains(e.target)) setOpenOptions(false);
			};
			if (openOptions) document.addEventListener("click", handleOutsideClick);
			return () => {
				document.removeEventListener("click", handleOutsideClick);
			};
		}, [comboRef, openOptions]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `combo-box${className ? ` ${className}` : ""}`,
			ref: comboRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "combo-box__label",
				id: `${formName}-label`,
				htmlFor: `${formName}-combo`,
				children: [
					label,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "combo-box__input-container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: inputValue,
							type: "text",
							className: "combo-box__input",
							name: formName,
							id: `${formName}-combo`,
							onChange,
							placeholder,
							disabled: isDisabledAndEmpty
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `combo-box__buttons-container${inputValueEmpty ? " empty" : ""}`,
							children: [
								!inputValueEmpty && !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "combo-box__button",
									type: "button",
									name: `${formName}-on-clear`,
									"aria-label": `${formName}-on-clear`,
									onClick: onClickClear,
									disabled: isDisabledAndEmpty,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
										icon: "times",
										className: `close-icon${disabled ? " disabled" : ""}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "combo-box__vertical-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "combo-box__button",
									type: "button",
									name: `${formName}-on-toggle`,
									"aria-label": `${formName}-on-toggle`,
									onClick: onClickToggle,
									disabled: isDisabledAndEmpty,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
										icon: chevron,
										className: `chevron-icon${disabled ? " disabled" : ""}`
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `combo-box__options-container${label ? " label" : ""}`,
						children: openOptions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "combo-box__options",
							id: `${formName}-list`,
							children: noSearchResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								value: "no-result",
								className: "combo-box__options-item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "combo-box__option",
									"aria-label": `${formName}-option-item`,
									children: "No results found"
								})
							}, "no-result") : options
						})
					})
				]
			})
		});
	});
	ComboBox.propTypes = propTypes;
}));
//#endregion
export { init_ComboBox as n, ComboBox as t };
