import { n as __esmMin, o as __toESM, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import "react";
import { uniqueId } from "lodash-es";
//#region node_modules/react-string-replace/index.js
var require_react_string_replace = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isRegExp = function(re) {
		return re instanceof RegExp;
	};
	var escapeRegExp = function escapeRegExp(string) {
		var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
		return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
	};
	var isString = function(value) {
		return typeof value === "string";
	};
	var flatten = function(array) {
		var newArray = [];
		array.forEach(function(item) {
			if (Array.isArray(item)) newArray = newArray.concat(item);
			else newArray.push(item);
		});
		return newArray;
	};
	/**
	* Given a string, replace every substring that is matched by the `match` regex
	* with the result of calling `fn` on matched substring. The result will be an
	* array with all odd indexed elements containing the replacements. The primary
	* use case is similar to using String.prototype.replace except for React.
	*
	* React will happily render an array as children of a react element, which
	* makes this approach very useful for tasks like surrounding certain text
	* within a string with react elements.
	*
	* Example:
	* matchReplace(
	*   'Emphasize all phone numbers like 884-555-4443.',
	*   /([\d|-]+)/g,
	*   (number, i) => <strong key={i}>{number}</strong>
	* );
	* // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
	*
	* @param {string} str
	* @param {RegExp|str} match Must contain a matching group
	* @param {function} fn
	* @return {array}
	*/
	function replaceString(str, match, fn) {
		var curCharStart = 0;
		var curCharLen = 0;
		if (str === "") return str;
		else if (!str || !isString(str)) throw new TypeError("First argument to react-string-replace#replaceString must be a string");
		var re = match;
		if (!isRegExp(re)) re = new RegExp("(" + escapeRegExp(re) + ")", "gi");
		var result = str.split(re);
		for (var i = 1, length = result.length; i < length; i += 2) {
			/** @see {@link https://github.com/iansinnott/react-string-replace/issues/74} */
			if (result[i] === void 0 || result[i - 1] === void 0) {
				console.warn("reactStringReplace: Encountered undefined value during string replacement. Your RegExp may not be working the way you expect.");
				continue;
			}
			curCharLen = result[i].length;
			curCharStart += result[i - 1].length;
			result[i] = fn(result[i], i, curCharStart);
			curCharStart += curCharLen;
		}
		return result;
	}
	module.exports = function reactStringReplace(source, match, fn) {
		if (!Array.isArray(source)) source = [source];
		return flatten(source.map(function(x) {
			return isString(x) ? replaceString(x, match, fn) : x;
		}));
	};
}));
//#endregion
//#region src/js/helpers/replaceString.jsx
var import_react_string_replace, import_jsx_runtime, replaceString;
var init_replaceString = __esmMin((() => {
	import_react_string_replace = /* @__PURE__ */ __toESM(require_react_string_replace(), 1);
	import_jsx_runtime = require_jsx_runtime();
	replaceString = (data, query, className) => (0, import_react_string_replace.default)(data, query, (match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: match
	}, uniqueId()));
}));
//#endregion
export { replaceString as n, init_replaceString as t };
