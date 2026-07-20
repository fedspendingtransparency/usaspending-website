import { n as __esmMin, o as __toESM, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { eo as global, to as init_dist } from "./index.js-Dk2VDaPz.js";
import { B as linear, C as threshold, D as quantile, H as tickFormat, I as log, L as identity$3, M as sqrt, P as symlog, T as quantize, _ as utcTime, a as divergingSqrt, at as band, ct as implicit, d as sequential, f as sequentialLog, h as sequentialSymlog, i as divergingPow, j as pow, k as radial, l as sequentialQuantile, m as sequentialSqrt, n as diverging, o as divergingSymlog, p as sequentialPow, r as divergingLog, st as point, t as init_src, ut as ordinal, y as time } from "./src-BVb2vAbu.js";
import { B as square_default, D as basisClosed_default, G as circle_default, I as triangle_default, J as bumpY, P as wye_default, Q as area_default, R as star_default, S as monotoneY, T as basisOpen_default, U as cross_default, V as diamond_default, _ as step_default, a as silhouette_default, d as none_default$1, g as stepBefore, h as stepAfter, j as Symbol$2, k as basis_default, l as stack_default, o as expand_default, p as none_default, q as bumpX, r as wiggle_default, rt as linear_default, t as init_src$1, tt as line_default, w as linearClosed_default, x as monotoneX, y as natural_default } from "./src-BPBsVH6H.js";
import React, { Children, Component, PureComponent, cloneElement, createContext, createElement, forwardRef, isValidElement, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
//#region node_modules/recharts/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
var init_clsx = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/isArray.js
var isArray$1;
var init_isArray = __esmMin((() => {
	isArray$1 = Array.isArray;
}));
//#endregion
//#region node_modules/lodash-es/_freeGlobal.js
var freeGlobal;
var init__freeGlobal = __esmMin((() => {
	init_dist();
	freeGlobal = typeof global == "object" && global && global.Object === Object && global;
}));
//#endregion
//#region node_modules/lodash-es/_root.js
var freeSelf, root;
var init__root = __esmMin((() => {
	init__freeGlobal();
	freeSelf = typeof self == "object" && self && self.Object === Object && self;
	root = freeGlobal || freeSelf || Function("return this")();
}));
//#endregion
//#region node_modules/lodash-es/_Symbol.js
var Symbol$1;
var init__Symbol = __esmMin((() => {
	init__root();
	Symbol$1 = root.Symbol;
}));
//#endregion
//#region node_modules/lodash-es/_getRawTag.js
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty$10.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) if (isOwn) value[symToStringTag$1] = tag;
	else delete value[symToStringTag$1];
	return result;
}
var objectProto$4, hasOwnProperty$10, nativeObjectToString$1, symToStringTag$1;
var init__getRawTag = __esmMin((() => {
	init__Symbol();
	objectProto$4 = Object.prototype;
	hasOwnProperty$10 = objectProto$4.hasOwnProperty;
	nativeObjectToString$1 = objectProto$4.toString;
	symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
}));
//#endregion
//#region node_modules/lodash-es/_objectToString.js
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
var nativeObjectToString;
var init__objectToString = __esmMin((() => {
	nativeObjectToString = Object.prototype.toString;
}));
//#endregion
//#region node_modules/lodash-es/_baseGetTag.js
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var nullTag, undefinedTag, symToStringTag;
var init__baseGetTag = __esmMin((() => {
	init__Symbol();
	init__getRawTag();
	init__objectToString();
	nullTag = "[object Null]";
	undefinedTag = "[object Undefined]";
	symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
}));
//#endregion
//#region node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
var init_isObjectLike = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/isSymbol.js
/**
* Checks if `value` is classified as a `Symbol` primitive or object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
* @example
*
* _.isSymbol(Symbol.iterator);
* // => true
*
* _.isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
}
var symbolTag$1;
var init_isSymbol = __esmMin((() => {
	init__baseGetTag();
	init_isObjectLike();
	symbolTag$1 = "[object Symbol]";
}));
//#endregion
//#region node_modules/lodash-es/_isKey.js
/**
* Checks if `value` is a property name and not a property path.
*
* @private
* @param {*} value The value to check.
* @param {Object} [object] The object to query keys on.
* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
*/
function isKey(value, object) {
	if (isArray$1(value)) return false;
	var type = typeof value;
	if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
	return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var reIsDeepProp, reIsPlainProp;
var init__isKey = __esmMin((() => {
	init_isArray();
	init_isSymbol();
	reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
	reIsPlainProp = /^\w*$/;
}));
//#endregion
//#region node_modules/lodash-es/isObject.js
/**
* Checks if `value` is the
* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an object, else `false`.
* @example
*
* _.isObject({});
* // => true
*
* _.isObject([1, 2, 3]);
* // => true
*
* _.isObject(_.noop);
* // => true
*
* _.isObject(null);
* // => false
*/
function isObject(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
var init_isObject = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/isFunction.js
/**
* Checks if `value` is classified as a `Function` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a function, else `false`.
* @example
*
* _.isFunction(_);
* // => true
*
* _.isFunction(/abc/);
* // => false
*/
function isFunction(value) {
	if (!isObject(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var asyncTag, funcTag$1, genTag, proxyTag;
var init_isFunction = __esmMin((() => {
	init__baseGetTag();
	init_isObject();
	asyncTag = "[object AsyncFunction]";
	funcTag$1 = "[object Function]";
	genTag = "[object GeneratorFunction]";
	proxyTag = "[object Proxy]";
}));
//#endregion
//#region node_modules/lodash-es/_coreJsData.js
var coreJsData;
var init__coreJsData = __esmMin((() => {
	init__root();
	coreJsData = root["__core-js_shared__"];
}));
//#endregion
//#region node_modules/lodash-es/_isMasked.js
/**
* Checks if `func` has its source masked.
*
* @private
* @param {Function} func The function to check.
* @returns {boolean} Returns `true` if `func` is masked, else `false`.
*/
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
var maskSrcKey;
var init__isMasked = __esmMin((() => {
	init__coreJsData();
	maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
}));
//#endregion
//#region node_modules/lodash-es/_toSource.js
/**
* Converts `func` to its source code.
*
* @private
* @param {Function} func The function to convert.
* @returns {string} Returns the source code.
*/
function toSource(func) {
	if (func != null) {
		try {
			return funcToString$2.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}
var funcToString$2;
var init__toSource = __esmMin((() => {
	funcToString$2 = Function.prototype.toString;
}));
//#endregion
//#region node_modules/lodash-es/_baseIsNative.js
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject(value) || isMasked(value)) return false;
	return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
}
var reRegExpChar, reIsHostCtor, funcProto$1, objectProto$3, funcToString$1, hasOwnProperty$9, reIsNative;
var init__baseIsNative = __esmMin((() => {
	init_isFunction();
	init__isMasked();
	init_isObject();
	init__toSource();
	reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	reIsHostCtor = /^\[object .+?Constructor\]$/;
	funcProto$1 = Function.prototype;
	objectProto$3 = Object.prototype;
	funcToString$1 = funcProto$1.toString;
	hasOwnProperty$9 = objectProto$3.hasOwnProperty;
	reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
}));
//#endregion
//#region node_modules/lodash-es/_getValue.js
/**
* Gets the value at `key` of `object`.
*
* @private
* @param {Object} [object] The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function getValue(object, key) {
	return object == null ? void 0 : object[key];
}
var init__getValue = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_getNative.js
/**
* Gets the native function at `key` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the method to get.
* @returns {*} Returns the function if it's native, else `undefined`.
*/
function getNative(object, key) {
	var value = getValue(object, key);
	return baseIsNative(value) ? value : void 0;
}
var init__getNative = __esmMin((() => {
	init__baseIsNative();
	init__getValue();
}));
//#endregion
//#region node_modules/lodash-es/_nativeCreate.js
var nativeCreate;
var init__nativeCreate = __esmMin((() => {
	init__getNative();
	nativeCreate = getNative(Object, "create");
}));
//#endregion
//#region node_modules/lodash-es/_hashClear.js
/**
* Removes all key-value entries from the hash.
*
* @private
* @name clear
* @memberOf Hash
*/
function hashClear() {
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;
}
var init__hashClear = __esmMin((() => {
	init__nativeCreate();
}));
//#endregion
//#region node_modules/lodash-es/_hashDelete.js
/**
* Removes `key` and its value from the hash.
*
* @private
* @name delete
* @memberOf Hash
* @param {Object} hash The hash to modify.
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}
var init__hashDelete = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_hashGet.js
/**
* Gets the hash value for `key`.
*
* @private
* @name get
* @memberOf Hash
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED$2 ? void 0 : result;
	}
	return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
}
var HASH_UNDEFINED$2, hasOwnProperty$8;
var init__hashGet = __esmMin((() => {
	init__nativeCreate();
	HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
	hasOwnProperty$8 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region node_modules/lodash-es/_hashHas.js
/**
* Checks if a hash value for `key` exists.
*
* @private
* @name has
* @memberOf Hash
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
}
var hasOwnProperty$7;
var init__hashHas = __esmMin((() => {
	init__nativeCreate();
	hasOwnProperty$7 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region node_modules/lodash-es/_hashSet.js
/**
* Sets the hash `key` to `value`.
*
* @private
* @name set
* @memberOf Hash
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the hash instance.
*/
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
	return this;
}
var HASH_UNDEFINED$1;
var init__hashSet = __esmMin((() => {
	init__nativeCreate();
	HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
}));
//#endregion
//#region node_modules/lodash-es/_Hash.js
/**
* Creates a hash object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
var init__Hash = __esmMin((() => {
	init__hashClear();
	init__hashDelete();
	init__hashGet();
	init__hashHas();
	init__hashSet();
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
}));
//#endregion
//#region node_modules/lodash-es/_listCacheClear.js
/**
* Removes all key-value entries from the list cache.
*
* @private
* @name clear
* @memberOf ListCache
*/
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}
var init__listCacheClear = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/eq.js
/**
* Performs a
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* comparison between two values to determine if they are equivalent.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.eq(object, object);
* // => true
*
* _.eq(object, other);
* // => false
*
* _.eq('a', 'a');
* // => true
*
* _.eq('a', Object('a'));
* // => false
*
* _.eq(NaN, NaN);
* // => true
*/
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
var init_eq = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_assocIndexOf.js
/**
* Gets the index at which the `key` is found in `array` of key-value pairs.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} key The key to search for.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) if (eq(array[length][0], key)) return length;
	return -1;
}
var init__assocIndexOf = __esmMin((() => {
	init_eq();
}));
//#endregion
//#region node_modules/lodash-es/_listCacheDelete.js
/**
* Removes `key` and its value from the list cache.
*
* @private
* @name delete
* @memberOf ListCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) return false;
	if (index == data.length - 1) data.pop();
	else splice.call(data, index, 1);
	--this.size;
	return true;
}
var splice;
var init__listCacheDelete = __esmMin((() => {
	init__assocIndexOf();
	splice = Array.prototype.splice;
}));
//#endregion
//#region node_modules/lodash-es/_listCacheGet.js
/**
* Gets the list cache value for `key`.
*
* @private
* @name get
* @memberOf ListCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	return index < 0 ? void 0 : data[index][1];
}
var init__listCacheGet = __esmMin((() => {
	init__assocIndexOf();
}));
//#endregion
//#region node_modules/lodash-es/_listCacheHas.js
/**
* Checks if a list cache value for `key` exists.
*
* @private
* @name has
* @memberOf ListCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function listCacheHas(key) {
	return assocIndexOf(this.__data__, key) > -1;
}
var init__listCacheHas = __esmMin((() => {
	init__assocIndexOf();
}));
//#endregion
//#region node_modules/lodash-es/_listCacheSet.js
/**
* Sets the list cache `key` to `value`.
*
* @private
* @name set
* @memberOf ListCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the list cache instance.
*/
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else data[index][1] = value;
	return this;
}
var init__listCacheSet = __esmMin((() => {
	init__assocIndexOf();
}));
//#endregion
//#region node_modules/lodash-es/_ListCache.js
/**
* Creates an list cache object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
var init__ListCache = __esmMin((() => {
	init__listCacheClear();
	init__listCacheDelete();
	init__listCacheGet();
	init__listCacheHas();
	init__listCacheSet();
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
}));
//#endregion
//#region node_modules/lodash-es/_Map.js
var Map$1;
var init__Map = __esmMin((() => {
	init__getNative();
	init__root();
	Map$1 = getNative(root, "Map");
}));
//#endregion
//#region node_modules/lodash-es/_mapCacheClear.js
/**
* Removes all key-value entries from the map.
*
* @private
* @name clear
* @memberOf MapCache
*/
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		"hash": new Hash(),
		"map": new (Map$1 || ListCache)(),
		"string": new Hash()
	};
}
var init__mapCacheClear = __esmMin((() => {
	init__Hash();
	init__ListCache();
	init__Map();
}));
//#endregion
//#region node_modules/lodash-es/_isKeyable.js
/**
* Checks if `value` is suitable for use as unique object key.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
*/
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var init__isKeyable = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_getMapData.js
/**
* Gets the data for `map`.
*
* @private
* @param {Object} map The map to query.
* @param {string} key The reference key.
* @returns {*} Returns the map data.
*/
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var init__getMapData = __esmMin((() => {
	init__isKeyable();
}));
//#endregion
//#region node_modules/lodash-es/_mapCacheDelete.js
/**
* Removes `key` and its value from the map.
*
* @private
* @name delete
* @memberOf MapCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function mapCacheDelete(key) {
	var result = getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}
var init__mapCacheDelete = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region node_modules/lodash-es/_mapCacheGet.js
/**
* Gets the map value for `key`.
*
* @private
* @name get
* @memberOf MapCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function mapCacheGet(key) {
	return getMapData(this, key).get(key);
}
var init__mapCacheGet = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region node_modules/lodash-es/_mapCacheHas.js
/**
* Checks if a map value for `key` exists.
*
* @private
* @name has
* @memberOf MapCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function mapCacheHas(key) {
	return getMapData(this, key).has(key);
}
var init__mapCacheHas = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region node_modules/lodash-es/_mapCacheSet.js
/**
* Sets the map `key` to `value`.
*
* @private
* @name set
* @memberOf MapCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the map cache instance.
*/
function mapCacheSet(key, value) {
	var data = getMapData(this, key), size = data.size;
	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}
var init__mapCacheSet = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region node_modules/lodash-es/_MapCache.js
/**
* Creates a map cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
var init__MapCache = __esmMin((() => {
	init__mapCacheClear();
	init__mapCacheDelete();
	init__mapCacheGet();
	init__mapCacheHas();
	init__mapCacheSet();
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
}));
//#endregion
//#region node_modules/lodash-es/memoize.js
/**
* Creates a function that memoizes the result of `func`. If `resolver` is
* provided, it determines the cache key for storing the result based on the
* arguments provided to the memoized function. By default, the first argument
* provided to the memoized function is used as the map cache key. The `func`
* is invoked with the `this` binding of the memoized function.
*
* **Note:** The cache is exposed as the `cache` property on the memoized
* function. Its creation may be customized by replacing the `_.memoize.Cache`
* constructor with one whose instances implement the
* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
* method interface of `clear`, `delete`, `get`, `has`, and `set`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to have its output memoized.
* @param {Function} [resolver] The function to resolve the cache key.
* @returns {Function} Returns the new memoized function.
* @example
*
* var object = { 'a': 1, 'b': 2 };
* var other = { 'c': 3, 'd': 4 };
*
* var values = _.memoize(_.values);
* values(object);
* // => [1, 2]
*
* values(other);
* // => [3, 4]
*
* object.a = 2;
* values(object);
* // => [1, 2]
*
* // Modify the result cache.
* values.cache.set(object, ['a', 'b']);
* values(object);
* // => ['a', 'b']
*
* // Replace `_.memoize.Cache`.
* _.memoize.Cache = WeakMap;
*/
function memoize$1(func, resolver) {
	if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT$2);
	var memoized = function() {
		var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
		if (cache.has(key)) return cache.get(key);
		var result = func.apply(this, args);
		memoized.cache = cache.set(key, result) || cache;
		return result;
	};
	memoized.cache = new (memoize$1.Cache || MapCache)();
	return memoized;
}
var FUNC_ERROR_TEXT$2;
var init_memoize = __esmMin((() => {
	init__MapCache();
	FUNC_ERROR_TEXT$2 = "Expected a function";
	memoize$1.Cache = MapCache;
}));
//#endregion
//#region node_modules/lodash-es/_memoizeCapped.js
/**
* A specialized version of `_.memoize` which clears the memoized function's
* cache when it exceeds `MAX_MEMOIZE_SIZE`.
*
* @private
* @param {Function} func The function to have its output memoized.
* @returns {Function} Returns the new memoized function.
*/
function memoizeCapped(func) {
	var result = memoize$1(func, function(key) {
		if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
		return key;
	});
	var cache = result.cache;
	return result;
}
var MAX_MEMOIZE_SIZE;
var init__memoizeCapped = __esmMin((() => {
	init_memoize();
	MAX_MEMOIZE_SIZE = 500;
}));
//#endregion
//#region node_modules/lodash-es/_stringToPath.js
var rePropName, reEscapeChar, stringToPath;
var init__stringToPath = __esmMin((() => {
	init__memoizeCapped();
	rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	reEscapeChar = /\\(\\)?/g;
	stringToPath = memoizeCapped(function(string) {
		var result = [];
		if (string.charCodeAt(0) === 46) result.push("");
		string.replace(rePropName, function(match, number, quote, subString) {
			result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
		});
		return result;
	});
}));
//#endregion
//#region node_modules/lodash-es/_arrayMap.js
/**
* A specialized version of `_.map` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
var init__arrayMap = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseToString.js
/**
* The base implementation of `_.toString` which doesn't convert nullish
* values to empty strings.
*
* @private
* @param {*} value The value to process.
* @returns {string} Returns the string.
*/
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray$1(value)) return arrayMap(value, baseToString) + "";
	if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
}
var INFINITY$2, symbolProto$1, symbolToString;
var init__baseToString = __esmMin((() => {
	init__Symbol();
	init__arrayMap();
	init_isArray();
	init_isSymbol();
	INFINITY$2 = Infinity;
	symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0;
	symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
}));
//#endregion
//#region node_modules/lodash-es/toString.js
/**
* Converts `value` to a string. An empty string is returned for `null`
* and `undefined` values. The sign of `-0` is preserved.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.toString(null);
* // => ''
*
* _.toString(-0);
* // => '-0'
*
* _.toString([1, 2, 3]);
* // => '1,2,3'
*/
function toString(value) {
	return value == null ? "" : baseToString(value);
}
var init_toString = __esmMin((() => {
	init__baseToString();
}));
//#endregion
//#region node_modules/lodash-es/_castPath.js
/**
* Casts `value` to a path array if it's not one.
*
* @private
* @param {*} value The value to inspect.
* @param {Object} [object] The object to query keys on.
* @returns {Array} Returns the cast property path array.
*/
function castPath(value, object) {
	if (isArray$1(value)) return value;
	return isKey(value, object) ? [value] : stringToPath(toString(value));
}
var init__castPath = __esmMin((() => {
	init_isArray();
	init__isKey();
	init__stringToPath();
	init_toString();
}));
//#endregion
//#region node_modules/lodash-es/_toKey.js
/**
* Converts `value` to a string key if it's not a string or symbol.
*
* @private
* @param {*} value The value to inspect.
* @returns {string|symbol} Returns the key.
*/
function toKey(value) {
	if (typeof value == "string" || isSymbol(value)) return value;
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var INFINITY$1;
var init__toKey = __esmMin((() => {
	init_isSymbol();
	INFINITY$1 = Infinity;
}));
//#endregion
//#region node_modules/lodash-es/_baseGet.js
/**
* The base implementation of `_.get` without support for default values.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @returns {*} Returns the resolved value.
*/
function baseGet(object, path) {
	path = castPath(path, object);
	var index = 0, length = path.length;
	while (object != null && index < length) object = object[toKey(path[index++])];
	return index && index == length ? object : void 0;
}
var init__baseGet = __esmMin((() => {
	init__castPath();
	init__toKey();
}));
//#endregion
//#region node_modules/lodash-es/get.js
/**
* Gets the value at `path` of `object`. If the resolved value is
* `undefined`, the `defaultValue` is returned in its place.
*
* @static
* @memberOf _
* @since 3.7.0
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @param {*} [defaultValue] The value returned for `undefined` resolved values.
* @returns {*} Returns the resolved value.
* @example
*
* var object = { 'a': [{ 'b': { 'c': 3 } }] };
*
* _.get(object, 'a[0].b.c');
* // => 3
*
* _.get(object, ['a', '0', 'b', 'c']);
* // => 3
*
* _.get(object, 'a.b.c', 'default');
* // => 'default'
*/
function get(object, path, defaultValue) {
	var result = object == null ? void 0 : baseGet(object, path);
	return result === void 0 ? defaultValue : result;
}
var init_get = __esmMin((() => {
	init__baseGet();
}));
//#endregion
//#region node_modules/lodash-es/isNil.js
/**
* Checks if `value` is `null` or `undefined`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is nullish, else `false`.
* @example
*
* _.isNil(null);
* // => true
*
* _.isNil(void 0);
* // => true
*
* _.isNil(NaN);
* // => false
*/
function isNil(value) {
	return value == null;
}
var init_isNil = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/isString.js
/**
* Checks if `value` is classified as a `String` primitive or object.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a string, else `false`.
* @example
*
* _.isString('abc');
* // => true
*
* _.isString(1);
* // => false
*/
function isString(value) {
	return typeof value == "string" || !isArray$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag$2;
}
var stringTag$2;
var init_isString = __esmMin((() => {
	init__baseGetTag();
	init_isArray();
	init_isObjectLike();
	stringTag$2 = "[object String]";
}));
//#endregion
//#region node_modules/recharts/node_modules/react-is/cjs/react-is.production.min.js
/**
* @license React
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var b = Symbol.for("react.element");
	var c = Symbol.for("react.portal");
	var d = Symbol.for("react.fragment");
	var e = Symbol.for("react.strict_mode");
	var f = Symbol.for("react.profiler");
	var g = Symbol.for("react.provider");
	var h = Symbol.for("react.context");
	var k = Symbol.for("react.server_context");
	var l = Symbol.for("react.forward_ref");
	var m = Symbol.for("react.suspense");
	var n = Symbol.for("react.suspense_list");
	var p = Symbol.for("react.memo");
	var q = Symbol.for("react.lazy");
	function v(a) {
		if ("object" === typeof a && null !== a) {
			var r = a.$$typeof;
			switch (r) {
				case b: switch (a = a.type, a) {
					case d:
					case f:
					case e:
					case m:
					case n: return a;
					default: switch (a = a && a.$$typeof, a) {
						case k:
						case h:
						case l:
						case q:
						case p:
						case g: return a;
						default: return r;
					}
				}
				case c: return r;
			}
		}
	}
	exports.isFragment = function(a) {
		return v(a) === d;
	};
}));
//#endregion
//#region node_modules/recharts/node_modules/react-is/index.js
var require_react_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_is_production_min();
}));
//#endregion
//#region node_modules/lodash-es/isNumber.js
/**
* Checks if `value` is classified as a `Number` primitive or object.
*
* **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
* classified as numbers, use the `_.isFinite` method.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a number, else `false`.
* @example
*
* _.isNumber(3);
* // => true
*
* _.isNumber(Number.MIN_VALUE);
* // => true
*
* _.isNumber(Infinity);
* // => true
*
* _.isNumber('3');
* // => false
*/
function isNumber$1(value) {
	return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag$2;
}
var numberTag$2;
var init_isNumber = __esmMin((() => {
	init__baseGetTag();
	init_isObjectLike();
	numberTag$2 = "[object Number]";
}));
//#endregion
//#region node_modules/lodash-es/isNaN.js
/**
* Checks if `value` is `NaN`.
*
* **Note:** This method is based on
* [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
* global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
* `undefined` and other non-number values.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
* @example
*
* _.isNaN(NaN);
* // => true
*
* _.isNaN(new Number(NaN));
* // => true
*
* isNaN(undefined);
* // => true
*
* _.isNaN(undefined);
* // => false
*/
function isNaN(value) {
	return isNumber$1(value) && value != +value;
}
var init_isNaN = __esmMin((() => {
	init_isNumber();
}));
//#endregion
//#region node_modules/recharts/es6/util/DataUtils.js
function findEntryInArray(ary, specifiedKey, specifiedValue) {
	if (!ary || !ary.length) return null;
	return ary.find(function(entry) {
		return entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : get(entry, specifiedKey)) === specifiedValue;
	});
}
var mathSign, isPercent, isNumber, isNumOrStr, idCounter, uniqueId, getPercentValue, getAnyElementOfObject, hasDuplicate, interpolateNumber$1, compareValues;
var init_DataUtils = __esmMin((() => {
	init_isString();
	init_isNaN();
	init_get();
	init_isNumber();
	mathSign = function mathSign(value) {
		if (value === 0) return 0;
		if (value > 0) return 1;
		return -1;
	};
	isPercent = function isPercent(value) {
		return isString(value) && value.indexOf("%") === value.length - 1;
	};
	isNumber = function isNumber(value) {
		return isNumber$1(value) && !isNaN(value);
	};
	isNumOrStr = function isNumOrStr(value) {
		return isNumber(value) || isString(value);
	};
	idCounter = 0;
	uniqueId = function uniqueId(prefix) {
		var id = ++idCounter;
		return "".concat(prefix || "").concat(id);
	};
	getPercentValue = function getPercentValue(percent, totalValue) {
		var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
		var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
		if (!isNumber(percent) && !isString(percent)) return defaultValue;
		var value;
		if (isPercent(percent)) {
			var index = percent.indexOf("%");
			value = totalValue * parseFloat(percent.slice(0, index)) / 100;
		} else value = +percent;
		if (isNaN(value)) value = defaultValue;
		if (validate && value > totalValue) value = totalValue;
		return value;
	};
	getAnyElementOfObject = function getAnyElementOfObject(obj) {
		if (!obj) return null;
		var keys = Object.keys(obj);
		if (keys && keys.length) return obj[keys[0]];
		return null;
	};
	hasDuplicate = function hasDuplicate(ary) {
		if (!Array.isArray(ary)) return false;
		var len = ary.length;
		var cache = {};
		for (var i = 0; i < len; i++) if (!cache[ary[i]]) cache[ary[i]] = true;
		else return true;
		return false;
	};
	interpolateNumber$1 = function interpolateNumber(numberA, numberB) {
		if (isNumber(numberA) && isNumber(numberB)) return function(t) {
			return numberA + t * (numberB - numberA);
		};
		return function() {
			return numberB;
		};
	};
	compareValues = function compareValues(a, b) {
		if (isNumber(a) && isNumber(b)) return a - b;
		if (isString(a) && isString(b)) return a.localeCompare(b);
		if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
		return String(a).localeCompare(String(b));
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/ShallowEqual.js
function shallowEqual$1(a, b) {
	for (var key in a) if ({}.hasOwnProperty.call(a, key) && (!{}.hasOwnProperty.call(b, key) || a[key] !== b[key])) return false;
	for (var _key in b) if ({}.hasOwnProperty.call(b, _key) && !{}.hasOwnProperty.call(a, _key)) return false;
	return true;
}
var init_ShallowEqual = __esmMin((() => {}));
//#endregion
//#region node_modules/recharts/es6/util/types.js
function _typeof$41(o) {
	"@babel/helpers - typeof";
	return _typeof$41 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$41(o);
}
var SVGContainerPropKeys, SVGElementPropKeys, PolyElementKeys, FilteredElementKeyMap, EventKeys, adaptEventHandlers, getEventHandlerOfChild, adaptEventsOfChild;
var init_types = __esmMin((() => {
	init_isObject();
	SVGContainerPropKeys = ["viewBox", "children"];
	SVGElementPropKeys = [
		"aria-activedescendant",
		"aria-atomic",
		"aria-autocomplete",
		"aria-busy",
		"aria-checked",
		"aria-colcount",
		"aria-colindex",
		"aria-colspan",
		"aria-controls",
		"aria-current",
		"aria-describedby",
		"aria-details",
		"aria-disabled",
		"aria-errormessage",
		"aria-expanded",
		"aria-flowto",
		"aria-haspopup",
		"aria-hidden",
		"aria-invalid",
		"aria-keyshortcuts",
		"aria-label",
		"aria-labelledby",
		"aria-level",
		"aria-live",
		"aria-modal",
		"aria-multiline",
		"aria-multiselectable",
		"aria-orientation",
		"aria-owns",
		"aria-placeholder",
		"aria-posinset",
		"aria-pressed",
		"aria-readonly",
		"aria-relevant",
		"aria-required",
		"aria-roledescription",
		"aria-rowcount",
		"aria-rowindex",
		"aria-rowspan",
		"aria-selected",
		"aria-setsize",
		"aria-sort",
		"aria-valuemax",
		"aria-valuemin",
		"aria-valuenow",
		"aria-valuetext",
		"className",
		"color",
		"height",
		"id",
		"lang",
		"max",
		"media",
		"method",
		"min",
		"name",
		"style",
		"target",
		"width",
		"role",
		"tabIndex",
		"accentHeight",
		"accumulate",
		"additive",
		"alignmentBaseline",
		"allowReorder",
		"alphabetic",
		"amplitude",
		"arabicForm",
		"ascent",
		"attributeName",
		"attributeType",
		"autoReverse",
		"azimuth",
		"baseFrequency",
		"baselineShift",
		"baseProfile",
		"bbox",
		"begin",
		"bias",
		"by",
		"calcMode",
		"capHeight",
		"clip",
		"clipPath",
		"clipPathUnits",
		"clipRule",
		"colorInterpolation",
		"colorInterpolationFilters",
		"colorProfile",
		"colorRendering",
		"contentScriptType",
		"contentStyleType",
		"cursor",
		"cx",
		"cy",
		"d",
		"decelerate",
		"descent",
		"diffuseConstant",
		"direction",
		"display",
		"divisor",
		"dominantBaseline",
		"dur",
		"dx",
		"dy",
		"edgeMode",
		"elevation",
		"enableBackground",
		"end",
		"exponent",
		"externalResourcesRequired",
		"fill",
		"fillOpacity",
		"fillRule",
		"filter",
		"filterRes",
		"filterUnits",
		"floodColor",
		"floodOpacity",
		"focusable",
		"fontFamily",
		"fontSize",
		"fontSizeAdjust",
		"fontStretch",
		"fontStyle",
		"fontVariant",
		"fontWeight",
		"format",
		"from",
		"fx",
		"fy",
		"g1",
		"g2",
		"glyphName",
		"glyphOrientationHorizontal",
		"glyphOrientationVertical",
		"glyphRef",
		"gradientTransform",
		"gradientUnits",
		"hanging",
		"horizAdvX",
		"horizOriginX",
		"href",
		"ideographic",
		"imageRendering",
		"in2",
		"in",
		"intercept",
		"k1",
		"k2",
		"k3",
		"k4",
		"k",
		"kernelMatrix",
		"kernelUnitLength",
		"kerning",
		"keyPoints",
		"keySplines",
		"keyTimes",
		"lengthAdjust",
		"letterSpacing",
		"lightingColor",
		"limitingConeAngle",
		"local",
		"markerEnd",
		"markerHeight",
		"markerMid",
		"markerStart",
		"markerUnits",
		"markerWidth",
		"mask",
		"maskContentUnits",
		"maskUnits",
		"mathematical",
		"mode",
		"numOctaves",
		"offset",
		"opacity",
		"operator",
		"order",
		"orient",
		"orientation",
		"origin",
		"overflow",
		"overlinePosition",
		"overlineThickness",
		"paintOrder",
		"panose1",
		"pathLength",
		"patternContentUnits",
		"patternTransform",
		"patternUnits",
		"pointerEvents",
		"pointsAtX",
		"pointsAtY",
		"pointsAtZ",
		"preserveAlpha",
		"preserveAspectRatio",
		"primitiveUnits",
		"r",
		"radius",
		"refX",
		"refY",
		"renderingIntent",
		"repeatCount",
		"repeatDur",
		"requiredExtensions",
		"requiredFeatures",
		"restart",
		"result",
		"rotate",
		"rx",
		"ry",
		"seed",
		"shapeRendering",
		"slope",
		"spacing",
		"specularConstant",
		"specularExponent",
		"speed",
		"spreadMethod",
		"startOffset",
		"stdDeviation",
		"stemh",
		"stemv",
		"stitchTiles",
		"stopColor",
		"stopOpacity",
		"strikethroughPosition",
		"strikethroughThickness",
		"string",
		"stroke",
		"strokeDasharray",
		"strokeDashoffset",
		"strokeLinecap",
		"strokeLinejoin",
		"strokeMiterlimit",
		"strokeOpacity",
		"strokeWidth",
		"surfaceScale",
		"systemLanguage",
		"tableValues",
		"targetX",
		"targetY",
		"textAnchor",
		"textDecoration",
		"textLength",
		"textRendering",
		"to",
		"transform",
		"u1",
		"u2",
		"underlinePosition",
		"underlineThickness",
		"unicode",
		"unicodeBidi",
		"unicodeRange",
		"unitsPerEm",
		"vAlphabetic",
		"values",
		"vectorEffect",
		"version",
		"vertAdvY",
		"vertOriginX",
		"vertOriginY",
		"vHanging",
		"vIdeographic",
		"viewTarget",
		"visibility",
		"vMathematical",
		"widths",
		"wordSpacing",
		"writingMode",
		"x1",
		"x2",
		"x",
		"xChannelSelector",
		"xHeight",
		"xlinkActuate",
		"xlinkArcrole",
		"xlinkHref",
		"xlinkRole",
		"xlinkShow",
		"xlinkTitle",
		"xlinkType",
		"xmlBase",
		"xmlLang",
		"xmlns",
		"xmlnsXlink",
		"xmlSpace",
		"y1",
		"y2",
		"y",
		"yChannelSelector",
		"z",
		"zoomAndPan",
		"ref",
		"key",
		"angle"
	];
	PolyElementKeys = ["points", "pathLength"];
	FilteredElementKeyMap = {
		svg: SVGContainerPropKeys,
		polygon: PolyElementKeys,
		polyline: PolyElementKeys
	};
	EventKeys = [
		"dangerouslySetInnerHTML",
		"onCopy",
		"onCopyCapture",
		"onCut",
		"onCutCapture",
		"onPaste",
		"onPasteCapture",
		"onCompositionEnd",
		"onCompositionEndCapture",
		"onCompositionStart",
		"onCompositionStartCapture",
		"onCompositionUpdate",
		"onCompositionUpdateCapture",
		"onFocus",
		"onFocusCapture",
		"onBlur",
		"onBlurCapture",
		"onChange",
		"onChangeCapture",
		"onBeforeInput",
		"onBeforeInputCapture",
		"onInput",
		"onInputCapture",
		"onReset",
		"onResetCapture",
		"onSubmit",
		"onSubmitCapture",
		"onInvalid",
		"onInvalidCapture",
		"onLoad",
		"onLoadCapture",
		"onError",
		"onErrorCapture",
		"onKeyDown",
		"onKeyDownCapture",
		"onKeyPress",
		"onKeyPressCapture",
		"onKeyUp",
		"onKeyUpCapture",
		"onAbort",
		"onAbortCapture",
		"onCanPlay",
		"onCanPlayCapture",
		"onCanPlayThrough",
		"onCanPlayThroughCapture",
		"onDurationChange",
		"onDurationChangeCapture",
		"onEmptied",
		"onEmptiedCapture",
		"onEncrypted",
		"onEncryptedCapture",
		"onEnded",
		"onEndedCapture",
		"onLoadedData",
		"onLoadedDataCapture",
		"onLoadedMetadata",
		"onLoadedMetadataCapture",
		"onLoadStart",
		"onLoadStartCapture",
		"onPause",
		"onPauseCapture",
		"onPlay",
		"onPlayCapture",
		"onPlaying",
		"onPlayingCapture",
		"onProgress",
		"onProgressCapture",
		"onRateChange",
		"onRateChangeCapture",
		"onSeeked",
		"onSeekedCapture",
		"onSeeking",
		"onSeekingCapture",
		"onStalled",
		"onStalledCapture",
		"onSuspend",
		"onSuspendCapture",
		"onTimeUpdate",
		"onTimeUpdateCapture",
		"onVolumeChange",
		"onVolumeChangeCapture",
		"onWaiting",
		"onWaitingCapture",
		"onAuxClick",
		"onAuxClickCapture",
		"onClick",
		"onClickCapture",
		"onContextMenu",
		"onContextMenuCapture",
		"onDoubleClick",
		"onDoubleClickCapture",
		"onDrag",
		"onDragCapture",
		"onDragEnd",
		"onDragEndCapture",
		"onDragEnter",
		"onDragEnterCapture",
		"onDragExit",
		"onDragExitCapture",
		"onDragLeave",
		"onDragLeaveCapture",
		"onDragOver",
		"onDragOverCapture",
		"onDragStart",
		"onDragStartCapture",
		"onDrop",
		"onDropCapture",
		"onMouseDown",
		"onMouseDownCapture",
		"onMouseEnter",
		"onMouseLeave",
		"onMouseMove",
		"onMouseMoveCapture",
		"onMouseOut",
		"onMouseOutCapture",
		"onMouseOver",
		"onMouseOverCapture",
		"onMouseUp",
		"onMouseUpCapture",
		"onSelect",
		"onSelectCapture",
		"onTouchCancel",
		"onTouchCancelCapture",
		"onTouchEnd",
		"onTouchEndCapture",
		"onTouchMove",
		"onTouchMoveCapture",
		"onTouchStart",
		"onTouchStartCapture",
		"onPointerDown",
		"onPointerDownCapture",
		"onPointerMove",
		"onPointerMoveCapture",
		"onPointerUp",
		"onPointerUpCapture",
		"onPointerCancel",
		"onPointerCancelCapture",
		"onPointerEnter",
		"onPointerEnterCapture",
		"onPointerLeave",
		"onPointerLeaveCapture",
		"onPointerOver",
		"onPointerOverCapture",
		"onPointerOut",
		"onPointerOutCapture",
		"onGotPointerCapture",
		"onGotPointerCaptureCapture",
		"onLostPointerCapture",
		"onLostPointerCaptureCapture",
		"onScroll",
		"onScrollCapture",
		"onWheel",
		"onWheelCapture",
		"onAnimationStart",
		"onAnimationStartCapture",
		"onAnimationEnd",
		"onAnimationEndCapture",
		"onAnimationIteration",
		"onAnimationIterationCapture",
		"onTransitionEnd",
		"onTransitionEndCapture"
	];
	adaptEventHandlers = function adaptEventHandlers(props, newHandler) {
		if (!props || typeof props === "function" || typeof props === "boolean") return null;
		var inputProps = props;
		if (/*#__PURE__*/ isValidElement(props)) inputProps = props.props;
		if (!isObject(inputProps)) return null;
		var out = {};
		Object.keys(inputProps).forEach(function(key) {
			if (EventKeys.includes(key)) out[key] = newHandler || function(e) {
				return inputProps[key](inputProps, e);
			};
		});
		return out;
	};
	getEventHandlerOfChild = function getEventHandlerOfChild(originalHandler, data, index) {
		return function(e) {
			originalHandler(data, index, e);
			return null;
		};
	};
	adaptEventsOfChild = function adaptEventsOfChild(props, data, index) {
		if (!isObject(props) || _typeof$41(props) !== "object") return null;
		var out = null;
		Object.keys(props).forEach(function(key) {
			var item = props[key];
			if (EventKeys.includes(key) && typeof item === "function") {
				if (!out) out = {};
				out[key] = getEventHandlerOfChild(item, data, index);
			}
		});
		return out;
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/ReactUtils.js
function _objectWithoutProperties$15(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$15(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$15(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function findAllByType(children, type) {
	var result = [];
	var types = [];
	if (Array.isArray(type)) types = type.map(function(t) {
		return getDisplayName(t);
	});
	else types = [getDisplayName(type)];
	toArray(children).forEach(function(child) {
		var childType = get(child, "type.displayName") || get(child, "type.name");
		if (types.indexOf(childType) !== -1) result.push(child);
	});
	return result;
}
function findChildByType(children, type) {
	var result = findAllByType(children, type);
	return result && result[0];
}
var import_react_is, _excluded$15, _excluded2$4, REACT_BROWSER_EVENT_MAP, getDisplayName, lastChildren, lastResult, toArray, validateWidthHeight, SVG_TAGS, isSvgElement, isValidSpreadableProp, filterProps, isChildrenEqual, isSingleChildEqual, renderByOrder, getReactEventByType, parseChildIndex;
var init_ReactUtils = __esmMin((() => {
	init_get();
	init_isNil();
	init_isString();
	init_isFunction();
	init_isObject();
	import_react_is = require_react_is();
	init_DataUtils();
	init_ShallowEqual();
	init_types();
	_excluded$15 = ["children"];
	_excluded2$4 = ["children"];
	REACT_BROWSER_EVENT_MAP = {
		click: "onClick",
		mousedown: "onMouseDown",
		mouseup: "onMouseUp",
		mouseover: "onMouseOver",
		mousemove: "onMouseMove",
		mouseout: "onMouseOut",
		mouseenter: "onMouseEnter",
		mouseleave: "onMouseLeave",
		touchcancel: "onTouchCancel",
		touchend: "onTouchEnd",
		touchmove: "onTouchMove",
		touchstart: "onTouchStart",
		contextmenu: "onContextMenu",
		dblclick: "onDoubleClick"
	};
	getDisplayName = function getDisplayName(Comp) {
		if (typeof Comp === "string") return Comp;
		if (!Comp) return "";
		return Comp.displayName || Comp.name || "Component";
	};
	lastChildren = null;
	lastResult = null;
	toArray = function toArray(children) {
		if (children === lastChildren && Array.isArray(lastResult)) return lastResult;
		var result = [];
		Children.forEach(children, function(child) {
			if (isNil(child)) return;
			if ((0, import_react_is.isFragment)(child)) result = result.concat(toArray(child.props.children));
			else result.push(child);
		});
		lastResult = result;
		lastChildren = children;
		return result;
	};
	validateWidthHeight = function validateWidthHeight(el) {
		if (!el || !el.props) return false;
		var _el$props = el.props, width = _el$props.width, height = _el$props.height;
		if (!isNumber(width) || width <= 0 || !isNumber(height) || height <= 0) return false;
		return true;
	};
	SVG_TAGS = [
		"a",
		"altGlyph",
		"altGlyphDef",
		"altGlyphItem",
		"animate",
		"animateColor",
		"animateMotion",
		"animateTransform",
		"circle",
		"clipPath",
		"color-profile",
		"cursor",
		"defs",
		"desc",
		"ellipse",
		"feBlend",
		"feColormatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence",
		"filter",
		"font",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-url",
		"foreignObject",
		"g",
		"glyph",
		"glyphRef",
		"hkern",
		"image",
		"line",
		"lineGradient",
		"marker",
		"mask",
		"metadata",
		"missing-glyph",
		"mpath",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"radialGradient",
		"rect",
		"script",
		"set",
		"stop",
		"style",
		"svg",
		"switch",
		"symbol",
		"text",
		"textPath",
		"title",
		"tref",
		"tspan",
		"use",
		"view",
		"vkern"
	];
	isSvgElement = function isSvgElement(child) {
		return child && child.type && isString(child.type) && SVG_TAGS.indexOf(child.type) >= 0;
	};
	isValidSpreadableProp = function isValidSpreadableProp(property, key, includeEvents, svgElementType) {
		var _FilteredElementKeyMa;
		/**
		* If the svg element type is explicitly included, check against the filtered element key map
		* to determine if there are attributes that should only exist on that element type.
		* @todo Add an internal cjs version of https://github.com/wooorm/svg-element-attributes for full coverage.
		*/
		var matchingElementTypeKeys = (_FilteredElementKeyMa = FilteredElementKeyMap === null || FilteredElementKeyMap === void 0 ? void 0 : FilteredElementKeyMap[svgElementType]) !== null && _FilteredElementKeyMa !== void 0 ? _FilteredElementKeyMa : [];
		return key.startsWith("data-") || !isFunction(property) && (svgElementType && matchingElementTypeKeys.includes(key) || SVGElementPropKeys.includes(key)) || includeEvents && EventKeys.includes(key);
	};
	filterProps = function filterProps(props, includeEvents, svgElementType) {
		if (!props || typeof props === "function" || typeof props === "boolean") return null;
		var inputProps = props;
		if (/*#__PURE__*/ isValidElement(props)) inputProps = props.props;
		if (!isObject(inputProps)) return null;
		var out = {};
		/**
		* Props are blindly spread onto SVG elements. This loop filters out properties that we don't want to spread.
		* Items filtered out are as follows:
		*   - functions in properties that are SVG attributes (functions are included when includeEvents is true)
		*   - props that are SVG attributes but don't matched the passed svgElementType
		*   - any prop that is not in SVGElementPropKeys (or in EventKeys if includeEvents is true)
		*/
		Object.keys(inputProps).forEach(function(key) {
			var _inputProps;
			if (isValidSpreadableProp((_inputProps = inputProps) === null || _inputProps === void 0 ? void 0 : _inputProps[key], key, includeEvents, svgElementType)) out[key] = inputProps[key];
		});
		return out;
	};
	isChildrenEqual = function isChildrenEqual(nextChildren, prevChildren) {
		if (nextChildren === prevChildren) return true;
		var count = Children.count(nextChildren);
		if (count !== Children.count(prevChildren)) return false;
		if (count === 0) return true;
		if (count === 1) return isSingleChildEqual(Array.isArray(nextChildren) ? nextChildren[0] : nextChildren, Array.isArray(prevChildren) ? prevChildren[0] : prevChildren);
		for (var i = 0; i < count; i++) {
			var nextChild = nextChildren[i];
			var prevChild = prevChildren[i];
			if (Array.isArray(nextChild) || Array.isArray(prevChild)) {
				if (!isChildrenEqual(nextChild, prevChild)) return false;
			} else if (!isSingleChildEqual(nextChild, prevChild)) return false;
		}
		return true;
	};
	isSingleChildEqual = function isSingleChildEqual(nextChild, prevChild) {
		if (isNil(nextChild) && isNil(prevChild)) return true;
		if (!isNil(nextChild) && !isNil(prevChild)) {
			var _ref = nextChild.props || {}, nextChildren = _ref.children, nextProps = _objectWithoutProperties$15(_ref, _excluded$15);
			var _ref2 = prevChild.props || {}, prevChildren = _ref2.children, prevProps = _objectWithoutProperties$15(_ref2, _excluded2$4);
			if (nextChildren && prevChildren) return shallowEqual$1(nextProps, prevProps) && isChildrenEqual(nextChildren, prevChildren);
			if (!nextChildren && !prevChildren) return shallowEqual$1(nextProps, prevProps);
			return false;
		}
		return false;
	};
	renderByOrder = function renderByOrder(children, renderMap) {
		var elements = [];
		var record = {};
		toArray(children).forEach(function(child, index) {
			if (isSvgElement(child)) elements.push(child);
			else if (child) {
				var displayName = getDisplayName(child.type);
				var _ref3 = renderMap[displayName] || {}, handler = _ref3.handler, once = _ref3.once;
				if (handler && (!once || !record[displayName])) {
					var results = handler(child, displayName, index);
					elements.push(results);
					record[displayName] = true;
				}
			}
		});
		return elements;
	};
	getReactEventByType = function getReactEventByType(e) {
		var type = e && e.type;
		if (type && REACT_BROWSER_EVENT_MAP[type]) return REACT_BROWSER_EVENT_MAP[type];
		return null;
	};
	parseChildIndex = function parseChildIndex(child, children) {
		return toArray(children).indexOf(child);
	};
}));
//#endregion
//#region node_modules/recharts/es6/container/Surface.js
/**
* @fileOverview Surface
*/
function _extends$24() {
	_extends$24 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$24.apply(this, arguments);
}
function _objectWithoutProperties$14(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$14(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$14(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function Surface(props) {
	var children = props.children, width = props.width, height = props.height, viewBox = props.viewBox, className = props.className, style = props.style, title = props.title, desc = props.desc, others = _objectWithoutProperties$14(props, _excluded$14);
	var svgView = viewBox || {
		width,
		height,
		x: 0,
		y: 0
	};
	var layerClass = clsx("recharts-surface", className);
	return /*#__PURE__*/ React.createElement("svg", _extends$24({}, filterProps(others, true, "svg"), {
		className: layerClass,
		width,
		height,
		style,
		viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height)
	}), /*#__PURE__*/ React.createElement("title", null, title), /*#__PURE__*/ React.createElement("desc", null, desc), children);
}
var _excluded$14;
var init_Surface = __esmMin((() => {
	init_clsx();
	init_ReactUtils();
	_excluded$14 = [
		"children",
		"width",
		"height",
		"viewBox",
		"className",
		"style",
		"title",
		"desc"
	];
}));
//#endregion
//#region node_modules/recharts/es6/container/Layer.js
function _extends$23() {
	_extends$23 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$23.apply(this, arguments);
}
function _objectWithoutProperties$13(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$13(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$13(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var _excluded$13, Layer;
var init_Layer = __esmMin((() => {
	init_clsx();
	init_ReactUtils();
	_excluded$13 = ["children", "className"];
	Layer = /*#__PURE__*/ React.forwardRef(function(props, ref) {
		var children = props.children, className = props.className, others = _objectWithoutProperties$13(props, _excluded$13);
		var layerClass = clsx("recharts-layer", className);
		return /*#__PURE__*/ React.createElement("g", _extends$23({ className: layerClass }, filterProps(others, true), { ref }), children);
	});
}));
//#endregion
//#region node_modules/recharts/es6/util/LogUtils.js
var warn$1;
var init_LogUtils = __esmMin((() => {
	warn$1 = function warn(condition, format) {
		for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	};
}));
//#endregion
//#region node_modules/lodash-es/_baseSlice.js
/**
* The base implementation of `_.slice` without an iteratee call guard.
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
function baseSlice(array, start, end) {
	var index = -1, length = array.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array[index + start];
	return result;
}
var init__baseSlice = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_castSlice.js
/**
* Casts `array` to a slice if it's needed.
*
* @private
* @param {Array} array The array to inspect.
* @param {number} start The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the cast slice.
*/
function castSlice(array, start, end) {
	var length = array.length;
	end = end === void 0 ? length : end;
	return !start && end >= length ? array : baseSlice(array, start, end);
}
var init__castSlice = __esmMin((() => {
	init__baseSlice();
}));
//#endregion
//#region node_modules/lodash-es/_hasUnicode.js
/**
* Checks if `string` contains Unicode symbols.
*
* @private
* @param {string} string The string to inspect.
* @returns {boolean} Returns `true` if a symbol is found, else `false`.
*/
function hasUnicode(string) {
	return reHasUnicode.test(string);
}
var reHasUnicode;
var init__hasUnicode = __esmMin((() => {
	reHasUnicode = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
}));
//#endregion
//#region node_modules/lodash-es/_asciiToArray.js
/**
* Converts an ASCII `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function asciiToArray(string) {
	return string.split("");
}
var init__asciiToArray = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_unicodeToArray.js
/**
* Converts a Unicode `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function unicodeToArray(string) {
	return string.match(reUnicode) || [];
}
var rsAstralRange, rsComboRange, rsVarRange, rsAstral, rsCombo, rsFitz, rsModifier, rsNonAstral, rsRegional, rsSurrPair, rsZWJ, reOptMod, rsOptVar, rsOptJoin, rsSeq, rsSymbol, reUnicode;
var init__unicodeToArray = __esmMin((() => {
	rsAstralRange = "\\ud800-\\udfff";
	rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff";
	rsVarRange = "\\ufe0e\\ufe0f";
	rsAstral = "[" + rsAstralRange + "]";
	rsCombo = "[" + rsComboRange + "]";
	rsFitz = "\\ud83c[\\udffb-\\udfff]";
	rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
	rsNonAstral = "[^" + rsAstralRange + "]";
	rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
	rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
	rsZWJ = "\\u200d";
	reOptMod = rsModifier + "?";
	rsOptVar = "[" + rsVarRange + "]?";
	rsOptJoin = "(?:" + rsZWJ + "(?:" + [
		rsNonAstral,
		rsRegional,
		rsSurrPair
	].join("|") + ")" + rsOptVar + reOptMod + ")*";
	rsSeq = rsOptVar + reOptMod + rsOptJoin;
	rsSymbol = "(?:" + [
		rsNonAstral + rsCombo + "?",
		rsCombo,
		rsRegional,
		rsSurrPair,
		rsAstral
	].join("|") + ")";
	reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
}));
//#endregion
//#region node_modules/lodash-es/_stringToArray.js
/**
* Converts `string` to an array.
*
* @private
* @param {string} string The string to convert.
* @returns {Array} Returns the converted array.
*/
function stringToArray(string) {
	return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
var init__stringToArray = __esmMin((() => {
	init__asciiToArray();
	init__hasUnicode();
	init__unicodeToArray();
}));
//#endregion
//#region node_modules/lodash-es/_createCaseFirst.js
/**
* Creates a function like `_.lowerFirst`.
*
* @private
* @param {string} methodName The name of the `String` case method to use.
* @returns {Function} Returns the new case function.
*/
function createCaseFirst(methodName) {
	return function(string) {
		string = toString(string);
		var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
		var chr = strSymbols ? strSymbols[0] : string.charAt(0);
		var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
		return chr[methodName]() + trailing;
	};
}
var init__createCaseFirst = __esmMin((() => {
	init__castSlice();
	init__hasUnicode();
	init__stringToArray();
	init_toString();
}));
//#endregion
//#region node_modules/lodash-es/upperFirst.js
var upperFirst;
var init_upperFirst = __esmMin((() => {
	init__createCaseFirst();
	upperFirst = createCaseFirst("toUpperCase");
}));
//#endregion
//#region node_modules/victory-vendor/es/d3-shape.js
var init_d3_shape = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region node_modules/recharts/es6/shape/Symbols.js
/**
* @fileOverview Curve
*/
function _typeof$40(o) {
	"@babel/helpers - typeof";
	return _typeof$40 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$40(o);
}
function _extends$22() {
	_extends$22 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$22.apply(this, arguments);
}
function ownKeys$33(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$33(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$33(Object(t), !0).forEach(function(r) {
			_defineProperty$38(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$33(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$38(obj, key, value) {
	key = _toPropertyKey$39(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$39(t) {
	var i = _toPrimitive$39(t, "string");
	return "symbol" == _typeof$40(i) ? i : i + "";
}
function _toPrimitive$39(t, r) {
	if ("object" != _typeof$40(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$40(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$12(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$12(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$12(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var _excluded$12, symbolFactories, RADIAN$1, getSymbolFactory, calculateAreaSize, registerSymbol, Symbols;
var init_Symbols = __esmMin((() => {
	init_upperFirst();
	init_d3_shape();
	init_clsx();
	init_ReactUtils();
	_excluded$12 = [
		"type",
		"size",
		"sizeType"
	];
	symbolFactories = {
		symbolCircle: circle_default,
		symbolCross: cross_default,
		symbolDiamond: diamond_default,
		symbolSquare: square_default,
		symbolStar: star_default,
		symbolTriangle: triangle_default,
		symbolWye: wye_default
	};
	RADIAN$1 = Math.PI / 180;
	getSymbolFactory = function getSymbolFactory(type) {
		return symbolFactories["symbol".concat(upperFirst(type))] || circle_default;
	};
	calculateAreaSize = function calculateAreaSize(size, sizeType, type) {
		if (sizeType === "area") return size;
		switch (type) {
			case "cross": return 5 * size * size / 9;
			case "diamond": return .5 * size * size / Math.sqrt(3);
			case "square": return size * size;
			case "star":
				var angle = 18 * RADIAN$1;
				return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.pow(Math.tan(angle), 2));
			case "triangle": return Math.sqrt(3) * size * size / 4;
			case "wye": return (21 - 10 * Math.sqrt(3)) * size * size / 8;
			default: return Math.PI * size * size / 4;
		}
	};
	registerSymbol = function registerSymbol(key, factory) {
		symbolFactories["symbol".concat(upperFirst(key))] = factory;
	};
	Symbols = function Symbols(_ref) {
		var _ref$type = _ref.type, type = _ref$type === void 0 ? "circle" : _ref$type, _ref$size = _ref.size, size = _ref$size === void 0 ? 64 : _ref$size, _ref$sizeType = _ref.sizeType, sizeType = _ref$sizeType === void 0 ? "area" : _ref$sizeType;
		var props = _objectSpread$33(_objectSpread$33({}, _objectWithoutProperties$12(_ref, _excluded$12)), {}, {
			type,
			size,
			sizeType
		});
		/**
		* Calculate the path of curve
		* @return {String} path
		*/
		var getPath = function getPath() {
			var symbolFactory = getSymbolFactory(type);
			return Symbol$2().type(symbolFactory).size(calculateAreaSize(size, sizeType, type))();
		};
		var className = props.className, cx = props.cx, cy = props.cy;
		var filteredProps = filterProps(props, true);
		if (cx === +cx && cy === +cy && size === +size) return /*#__PURE__*/ React.createElement("path", _extends$22({}, filteredProps, {
			className: clsx("recharts-symbols", className),
			transform: "translate(".concat(cx, ", ").concat(cy, ")"),
			d: getPath()
		}));
		return null;
	};
	Symbols.registerSymbol = registerSymbol;
}));
//#endregion
//#region node_modules/recharts/es6/component/DefaultLegendContent.js
/**
* @fileOverview Default Legend Content
*/
function _typeof$39(o) {
	"@babel/helpers - typeof";
	return _typeof$39 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$39(o);
}
function _extends$21() {
	_extends$21 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$21.apply(this, arguments);
}
function ownKeys$32(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$32(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$32(Object(t), !0).forEach(function(r) {
			_defineProperty$37(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$32(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$17(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$17(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$38(descriptor.key), descriptor);
	}
}
function _createClass$17(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$17(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$17(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$13(t, o, e) {
	return o = _getPrototypeOf$14(o), _possibleConstructorReturn$14(t, _isNativeReflectConstruct$14() ? Reflect.construct(o, e || [], _getPrototypeOf$14(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$14(self, call) {
	if (call && (_typeof$39(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$14(self);
}
function _assertThisInitialized$14(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$14() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$14 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$14(o) {
	_getPrototypeOf$14 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$14(o);
}
function _inherits$14(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$14(subClass, superClass);
}
function _setPrototypeOf$14(o, p) {
	_setPrototypeOf$14 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$14(o, p);
}
function _defineProperty$37(obj, key, value) {
	key = _toPropertyKey$38(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$38(t) {
	var i = _toPrimitive$38(t, "string");
	return "symbol" == _typeof$39(i) ? i : i + "";
}
function _toPrimitive$38(t, r) {
	if ("object" != _typeof$39(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$39(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var SIZE, DefaultLegendContent;
var init_DefaultLegendContent = __esmMin((() => {
	init_isFunction();
	init_clsx();
	init_LogUtils();
	init_Surface();
	init_Symbols();
	init_types();
	SIZE = 32;
	DefaultLegendContent = /*#__PURE__*/ function(_PureComponent) {
		function DefaultLegendContent() {
			_classCallCheck$17(this, DefaultLegendContent);
			return _callSuper$13(this, DefaultLegendContent, arguments);
		}
		_inherits$14(DefaultLegendContent, _PureComponent);
		return _createClass$17(DefaultLegendContent, [
			{
				key: "renderIcon",
				value: function renderIcon(data) {
					var inactiveColor = this.props.inactiveColor;
					var halfSize = SIZE / 2;
					var sixthSize = SIZE / 6;
					var thirdSize = SIZE / 3;
					var color = data.inactive ? inactiveColor : data.color;
					if (data.type === "plainline") return /*#__PURE__*/ React.createElement("line", {
						strokeWidth: 4,
						fill: "none",
						stroke: color,
						strokeDasharray: data.payload.strokeDasharray,
						x1: 0,
						y1: halfSize,
						x2: SIZE,
						y2: halfSize,
						className: "recharts-legend-icon"
					});
					if (data.type === "line") return /*#__PURE__*/ React.createElement("path", {
						strokeWidth: 4,
						fill: "none",
						stroke: color,
						d: "M0,".concat(halfSize, "h").concat(thirdSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(2 * thirdSize, ",").concat(halfSize, "\n            H").concat(SIZE, "M").concat(2 * thirdSize, ",").concat(halfSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(thirdSize, ",").concat(halfSize),
						className: "recharts-legend-icon"
					});
					if (data.type === "rect") return /*#__PURE__*/ React.createElement("path", {
						stroke: "none",
						fill: color,
						d: "M0,".concat(SIZE / 8, "h").concat(SIZE, "v").concat(SIZE * 3 / 4, "h").concat(-SIZE, "z"),
						className: "recharts-legend-icon"
					});
					if (/*#__PURE__*/ React.isValidElement(data.legendIcon)) {
						var iconProps = _objectSpread$32({}, data);
						delete iconProps.legendIcon;
						return /*#__PURE__*/ React.cloneElement(data.legendIcon, iconProps);
					}
					return /*#__PURE__*/ React.createElement(Symbols, {
						fill: color,
						cx: halfSize,
						cy: halfSize,
						size: SIZE,
						sizeType: "diameter",
						type: data.type
					});
				}
			},
			{
				key: "renderItems",
				value: function renderItems() {
					var _this = this;
					var _this$props = this.props, payload = _this$props.payload, iconSize = _this$props.iconSize, layout = _this$props.layout, formatter = _this$props.formatter, inactiveColor = _this$props.inactiveColor;
					var viewBox = {
						x: 0,
						y: 0,
						width: SIZE,
						height: SIZE
					};
					var itemStyle = {
						display: layout === "horizontal" ? "inline-block" : "block",
						marginRight: 10
					};
					var svgStyle = {
						display: "inline-block",
						verticalAlign: "middle",
						marginRight: 4
					};
					return payload.map(function(entry, i) {
						var finalFormatter = entry.formatter || formatter;
						var className = clsx(_defineProperty$37(_defineProperty$37({ "recharts-legend-item": true }, "legend-item-".concat(i), true), "inactive", entry.inactive));
						if (entry.type === "none") return null;
						var entryValue = !isFunction(entry.value) ? entry.value : null;
						warn$1(!isFunction(entry.value), "The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name=\"Name of my Data\"/>");
						var color = entry.inactive ? inactiveColor : entry.color;
						return /*#__PURE__*/ React.createElement("li", _extends$21({
							className,
							style: itemStyle,
							key: "legend-item-".concat(i)
						}, adaptEventsOfChild(_this.props, entry, i)), /*#__PURE__*/ React.createElement(Surface, {
							width: iconSize,
							height: iconSize,
							viewBox,
							style: svgStyle
						}, _this.renderIcon(entry)), /*#__PURE__*/ React.createElement("span", {
							className: "recharts-legend-item-text",
							style: { color }
						}, finalFormatter ? finalFormatter(entryValue, entry, i) : entryValue));
					});
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$props2 = this.props, payload = _this$props2.payload, layout = _this$props2.layout, align = _this$props2.align;
					if (!payload || !payload.length) return null;
					var finalStyle = {
						padding: 0,
						margin: 0,
						textAlign: layout === "horizontal" ? align : "left"
					};
					return /*#__PURE__*/ React.createElement("ul", {
						className: "recharts-default-legend",
						style: finalStyle
					}, this.renderItems());
				}
			}
		]);
	}(PureComponent);
	_defineProperty$37(DefaultLegendContent, "displayName", "Legend");
	_defineProperty$37(DefaultLegendContent, "defaultProps", {
		iconSize: 14,
		layout: "horizontal",
		align: "center",
		verticalAlign: "middle",
		inactiveColor: "#ccc"
	});
}));
//#endregion
//#region node_modules/lodash-es/_stackClear.js
/**
* Removes all key-value entries from the stack.
*
* @private
* @name clear
* @memberOf Stack
*/
function stackClear() {
	this.__data__ = new ListCache();
	this.size = 0;
}
var init__stackClear = __esmMin((() => {
	init__ListCache();
}));
//#endregion
//#region node_modules/lodash-es/_stackDelete.js
/**
* Removes `key` and its value from the stack.
*
* @private
* @name delete
* @memberOf Stack
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function stackDelete(key) {
	var data = this.__data__, result = data["delete"](key);
	this.size = data.size;
	return result;
}
var init__stackDelete = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_stackGet.js
/**
* Gets the stack value for `key`.
*
* @private
* @name get
* @memberOf Stack
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function stackGet(key) {
	return this.__data__.get(key);
}
var init__stackGet = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_stackHas.js
/**
* Checks if a stack value for `key` exists.
*
* @private
* @name has
* @memberOf Stack
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function stackHas(key) {
	return this.__data__.has(key);
}
var init__stackHas = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_stackSet.js
/**
* Sets the stack `key` to `value`.
*
* @private
* @name set
* @memberOf Stack
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the stack cache instance.
*/
function stackSet(key, value) {
	var data = this.__data__;
	if (data instanceof ListCache) {
		var pairs = data.__data__;
		if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
			pairs.push([key, value]);
			this.size = ++data.size;
			return this;
		}
		data = this.__data__ = new MapCache(pairs);
	}
	data.set(key, value);
	this.size = data.size;
	return this;
}
var LARGE_ARRAY_SIZE$1;
var init__stackSet = __esmMin((() => {
	init__ListCache();
	init__Map();
	init__MapCache();
	LARGE_ARRAY_SIZE$1 = 200;
}));
//#endregion
//#region node_modules/lodash-es/_Stack.js
/**
* Creates a stack cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Stack(entries) {
	var data = this.__data__ = new ListCache(entries);
	this.size = data.size;
}
var init__Stack = __esmMin((() => {
	init__ListCache();
	init__stackClear();
	init__stackDelete();
	init__stackGet();
	init__stackHas();
	init__stackSet();
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
}));
//#endregion
//#region node_modules/lodash-es/_setCacheAdd.js
/**
* Adds `value` to the array cache.
*
* @private
* @name add
* @memberOf SetCache
* @alias push
* @param {*} value The value to cache.
* @returns {Object} Returns the cache instance.
*/
function setCacheAdd(value) {
	this.__data__.set(value, HASH_UNDEFINED);
	return this;
}
var HASH_UNDEFINED;
var init__setCacheAdd = __esmMin((() => {
	HASH_UNDEFINED = "__lodash_hash_undefined__";
}));
//#endregion
//#region node_modules/lodash-es/_setCacheHas.js
/**
* Checks if `value` is in the array cache.
*
* @private
* @name has
* @memberOf SetCache
* @param {*} value The value to search for.
* @returns {boolean} Returns `true` if `value` is found, else `false`.
*/
function setCacheHas(value) {
	return this.__data__.has(value);
}
var init__setCacheHas = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_SetCache.js
/**
*
* Creates an array cache object to store unique values.
*
* @private
* @constructor
* @param {Array} [values] The values to cache.
*/
function SetCache(values) {
	var index = -1, length = values == null ? 0 : values.length;
	this.__data__ = new MapCache();
	while (++index < length) this.add(values[index]);
}
var init__SetCache = __esmMin((() => {
	init__MapCache();
	init__setCacheAdd();
	init__setCacheHas();
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
}));
//#endregion
//#region node_modules/lodash-es/_arraySome.js
/**
* A specialized version of `_.some` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if any element passes the predicate check,
*  else `false`.
*/
function arraySome(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (predicate(array[index], index, array)) return true;
	return false;
}
var init__arraySome = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_cacheHas.js
/**
* Checks if a `cache` value for `key` exists.
*
* @private
* @param {Object} cache The cache to query.
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function cacheHas(cache, key) {
	return cache.has(key);
}
var init__cacheHas = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_equalArrays.js
/**
* A specialized version of `baseIsEqualDeep` for arrays with support for
* partial deep comparisons.
*
* @private
* @param {Array} array The array to compare.
* @param {Array} other The other array to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `array` and `other` objects.
* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
*/
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
	if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
	var arrStacked = stack.get(array);
	var othStacked = stack.get(other);
	if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
	var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
	stack.set(array, other);
	stack.set(other, array);
	while (++index < arrLength) {
		var arrValue = array[index], othValue = other[index];
		if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
		if (compared !== void 0) {
			if (compared) continue;
			result = false;
			break;
		}
		if (seen) {
			if (!arraySome(other, function(othValue, othIndex) {
				if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
			})) {
				result = false;
				break;
			}
		} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
			result = false;
			break;
		}
	}
	stack["delete"](array);
	stack["delete"](other);
	return result;
}
var COMPARE_PARTIAL_FLAG$5, COMPARE_UNORDERED_FLAG$3;
var init__equalArrays = __esmMin((() => {
	init__SetCache();
	init__arraySome();
	init__cacheHas();
	COMPARE_PARTIAL_FLAG$5 = 1;
	COMPARE_UNORDERED_FLAG$3 = 2;
}));
//#endregion
//#region node_modules/lodash-es/_Uint8Array.js
var Uint8Array;
var init__Uint8Array = __esmMin((() => {
	init__root();
	Uint8Array = root.Uint8Array;
}));
//#endregion
//#region node_modules/lodash-es/_mapToArray.js
/**
* Converts `map` to its key-value pairs.
*
* @private
* @param {Object} map The map to convert.
* @returns {Array} Returns the key-value pairs.
*/
function mapToArray(map) {
	var index = -1, result = Array(map.size);
	map.forEach(function(value, key) {
		result[++index] = [key, value];
	});
	return result;
}
var init__mapToArray = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_setToArray.js
/**
* Converts `set` to an array of its values.
*
* @private
* @param {Object} set The set to convert.
* @returns {Array} Returns the values.
*/
function setToArray(set) {
	var index = -1, result = Array(set.size);
	set.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
var init__setToArray = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_equalByTag.js
/**
* A specialized version of `baseIsEqualDeep` for comparing objects of
* the same `toStringTag`.
*
* **Note:** This function only supports comparing values with tags of
* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {string} tag The `toStringTag` of the objects to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	switch (tag) {
		case dataViewTag$2:
			if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
			object = object.buffer;
			other = other.buffer;
		case arrayBufferTag$1:
			if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
			return true;
		case boolTag$2:
		case dateTag$1:
		case numberTag$1: return eq(+object, +other);
		case errorTag$1: return object.name == other.name && object.message == other.message;
		case regexpTag$1:
		case stringTag$1: return object == other + "";
		case mapTag$2: var convert = mapToArray;
		case setTag$2:
			var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
			convert || (convert = setToArray);
			if (object.size != other.size && !isPartial) return false;
			var stacked = stack.get(object);
			if (stacked) return stacked == other;
			bitmask |= COMPARE_UNORDERED_FLAG$2;
			stack.set(object, other);
			var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
			stack["delete"](object);
			return result;
		case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
	}
	return false;
}
var COMPARE_PARTIAL_FLAG$4, COMPARE_UNORDERED_FLAG$2, boolTag$2, dateTag$1, errorTag$1, mapTag$2, numberTag$1, regexpTag$1, setTag$2, stringTag$1, symbolTag, arrayBufferTag$1, dataViewTag$2, symbolProto, symbolValueOf;
var init__equalByTag = __esmMin((() => {
	init__Symbol();
	init__Uint8Array();
	init_eq();
	init__equalArrays();
	init__mapToArray();
	init__setToArray();
	COMPARE_PARTIAL_FLAG$4 = 1;
	COMPARE_UNORDERED_FLAG$2 = 2;
	boolTag$2 = "[object Boolean]";
	dateTag$1 = "[object Date]";
	errorTag$1 = "[object Error]";
	mapTag$2 = "[object Map]";
	numberTag$1 = "[object Number]";
	regexpTag$1 = "[object RegExp]";
	setTag$2 = "[object Set]";
	stringTag$1 = "[object String]";
	symbolTag = "[object Symbol]";
	arrayBufferTag$1 = "[object ArrayBuffer]";
	dataViewTag$2 = "[object DataView]";
	symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
	symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
}));
//#endregion
//#region node_modules/lodash-es/_arrayPush.js
/**
* Appends the elements of `values` to `array`.
*
* @private
* @param {Array} array The array to modify.
* @param {Array} values The values to append.
* @returns {Array} Returns `array`.
*/
function arrayPush(array, values) {
	var index = -1, length = values.length, offset = array.length;
	while (++index < length) array[offset + index] = values[index];
	return array;
}
var init__arrayPush = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseGetAllKeys.js
/**
* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
* `keysFunc` and `symbolsFunc` to get the enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Function} keysFunc The function to get the keys of `object`.
* @param {Function} symbolsFunc The function to get the symbols of `object`.
* @returns {Array} Returns the array of property names and symbols.
*/
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	var result = keysFunc(object);
	return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
var init__baseGetAllKeys = __esmMin((() => {
	init__arrayPush();
	init_isArray();
}));
//#endregion
//#region node_modules/lodash-es/_arrayFilter.js
/**
* A specialized version of `_.filter` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
*/
function arrayFilter(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (predicate(value, index, array)) result[resIndex++] = value;
	}
	return result;
}
var init__arrayFilter = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/stubArray.js
/**
* This method returns a new empty array.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {Array} Returns the new empty array.
* @example
*
* var arrays = _.times(2, _.stubArray);
*
* console.log(arrays);
* // => [[], []]
*
* console.log(arrays[0] === arrays[1]);
* // => false
*/
function stubArray() {
	return [];
}
var init_stubArray = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_getSymbols.js
var propertyIsEnumerable$1, nativeGetSymbols, getSymbols;
var init__getSymbols = __esmMin((() => {
	init__arrayFilter();
	init_stubArray();
	propertyIsEnumerable$1 = Object.prototype.propertyIsEnumerable;
	nativeGetSymbols = Object.getOwnPropertySymbols;
	getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		if (object == null) return [];
		object = Object(object);
		return arrayFilter(nativeGetSymbols(object), function(symbol) {
			return propertyIsEnumerable$1.call(object, symbol);
		});
	};
}));
//#endregion
//#region node_modules/lodash-es/_baseTimes.js
/**
* The base implementation of `_.times` without support for iteratee shorthands
* or max array length checks.
*
* @private
* @param {number} n The number of times to invoke `iteratee`.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the array of results.
*/
function baseTimes(n, iteratee) {
	var index = -1, result = Array(n);
	while (++index < n) result[index] = iteratee(index);
	return result;
}
var init__baseTimes = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseIsArguments.js
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var argsTag$2;
var init__baseIsArguments = __esmMin((() => {
	init__baseGetTag();
	init_isObjectLike();
	argsTag$2 = "[object Arguments]";
}));
//#endregion
//#region node_modules/lodash-es/isArguments.js
var objectProto$2, hasOwnProperty$6, propertyIsEnumerable, isArguments;
var init_isArguments = __esmMin((() => {
	init__baseIsArguments();
	init_isObjectLike();
	objectProto$2 = Object.prototype;
	hasOwnProperty$6 = objectProto$2.hasOwnProperty;
	propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
	isArguments = baseIsArguments(function() {
		return arguments;
	}()) ? baseIsArguments : function(value) {
		return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
	};
}));
//#endregion
//#region node_modules/lodash-es/stubFalse.js
/**
* This method returns `false`.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {boolean} Returns `false`.
* @example
*
* _.times(2, _.stubFalse);
* // => [false, false]
*/
function stubFalse() {
	return false;
}
var init_stubFalse = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/isBuffer.js
var freeExports$1, freeModule$1, Buffer, isBuffer;
var init_isBuffer = __esmMin((() => {
	init__root();
	init_stubFalse();
	freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
	freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
	Buffer = freeModule$1 && freeModule$1.exports === freeExports$1 ? root.Buffer : void 0;
	isBuffer = (Buffer ? Buffer.isBuffer : void 0) || stubFalse;
}));
//#endregion
//#region node_modules/lodash-es/_isIndex.js
/**
* Checks if `value` is a valid array-like index.
*
* @private
* @param {*} value The value to check.
* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
*/
function isIndex(value, length) {
	var type = typeof value;
	length = length == null ? MAX_SAFE_INTEGER$1 : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
var MAX_SAFE_INTEGER$1, reIsUint;
var init__isIndex = __esmMin((() => {
	MAX_SAFE_INTEGER$1 = 9007199254740991;
	reIsUint = /^(?:0|[1-9]\d*)$/;
}));
//#endregion
//#region node_modules/lodash-es/isLength.js
/**
* Checks if `value` is a valid array-like length.
*
* **Note:** This method is loosely based on
* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
* @example
*
* _.isLength(3);
* // => true
*
* _.isLength(Number.MIN_VALUE);
* // => false
*
* _.isLength(Infinity);
* // => false
*
* _.isLength('3');
* // => false
*/
function isLength(value) {
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var MAX_SAFE_INTEGER;
var init_isLength = __esmMin((() => {
	MAX_SAFE_INTEGER = 9007199254740991;
}));
//#endregion
//#region node_modules/lodash-es/_baseIsTypedArray.js
/**
* The base implementation of `_.isTypedArray` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
*/
function baseIsTypedArray(value) {
	return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
var argsTag$1, arrayTag$1, boolTag$1, dateTag, errorTag, funcTag, mapTag$1, numberTag, objectTag$3, regexpTag, setTag$1, stringTag, weakMapTag$1, arrayBufferTag, dataViewTag$1, float32Tag, float64Tag, int8Tag, int16Tag, int32Tag, uint8Tag, uint8ClampedTag, uint16Tag, uint32Tag, typedArrayTags;
var init__baseIsTypedArray = __esmMin((() => {
	init__baseGetTag();
	init_isLength();
	init_isObjectLike();
	argsTag$1 = "[object Arguments]";
	arrayTag$1 = "[object Array]";
	boolTag$1 = "[object Boolean]";
	dateTag = "[object Date]";
	errorTag = "[object Error]";
	funcTag = "[object Function]";
	mapTag$1 = "[object Map]";
	numberTag = "[object Number]";
	objectTag$3 = "[object Object]";
	regexpTag = "[object RegExp]";
	setTag$1 = "[object Set]";
	stringTag = "[object String]";
	weakMapTag$1 = "[object WeakMap]";
	arrayBufferTag = "[object ArrayBuffer]";
	dataViewTag$1 = "[object DataView]";
	float32Tag = "[object Float32Array]";
	float64Tag = "[object Float64Array]";
	int8Tag = "[object Int8Array]";
	int16Tag = "[object Int16Array]";
	int32Tag = "[object Int32Array]";
	uint8Tag = "[object Uint8Array]";
	uint8ClampedTag = "[object Uint8ClampedArray]";
	uint16Tag = "[object Uint16Array]";
	uint32Tag = "[object Uint32Array]";
	typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag] = typedArrayTags[setTag$1] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
}));
//#endregion
//#region node_modules/lodash-es/_baseUnary.js
/**
* The base implementation of `_.unary` without support for storing metadata.
*
* @private
* @param {Function} func The function to cap arguments for.
* @returns {Function} Returns the new capped function.
*/
function baseUnary(func) {
	return function(value) {
		return func(value);
	};
}
var init__baseUnary = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_nodeUtil.js
var freeExports, freeModule, freeProcess, nodeUtil;
var init__nodeUtil = __esmMin((() => {
	init__freeGlobal();
	freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process;
	nodeUtil = function() {
		try {
			var types = freeModule && freeModule.require && freeModule.require("util").types;
			if (types) return types;
			return freeProcess && freeProcess.binding && freeProcess.binding("util");
		} catch (e) {}
	}();
}));
//#endregion
//#region node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray, isTypedArray$1;
var init_isTypedArray = __esmMin((() => {
	init__baseIsTypedArray();
	init__baseUnary();
	init__nodeUtil();
	nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
}));
//#endregion
//#region node_modules/lodash-es/_arrayLikeKeys.js
/**
* Creates an array of the enumerable property names of the array-like `value`.
*
* @private
* @param {*} value The value to query.
* @param {boolean} inherited Specify returning inherited property names.
* @returns {Array} Returns the array of property names.
*/
function arrayLikeKeys(value, inherited) {
	var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
	for (var key in value) if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
var hasOwnProperty$5;
var init__arrayLikeKeys = __esmMin((() => {
	init__baseTimes();
	init_isArguments();
	init_isArray();
	init_isBuffer();
	init__isIndex();
	init_isTypedArray();
	hasOwnProperty$5 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto$1);
}
var objectProto$1;
var init__isPrototype = __esmMin((() => {
	objectProto$1 = Object.prototype;
}));
//#endregion
//#region node_modules/lodash-es/_overArg.js
/**
* Creates a unary function that invokes `func` with its argument transformed.
*
* @private
* @param {Function} func The function to wrap.
* @param {Function} transform The argument transform.
* @returns {Function} Returns the new function.
*/
function overArg(func, transform) {
	return function(arg) {
		return func(transform(arg));
	};
}
var init__overArg = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_nativeKeys.js
var nativeKeys;
var init__nativeKeys = __esmMin((() => {
	init__overArg();
	nativeKeys = overArg(Object.keys, Object);
}));
//#endregion
//#region node_modules/lodash-es/_baseKeys.js
/**
* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeys(object) {
	if (!isPrototype(object)) return nativeKeys(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$4.call(object, key) && key != "constructor") result.push(key);
	return result;
}
var hasOwnProperty$4;
var init__baseKeys = __esmMin((() => {
	init__isPrototype();
	init__nativeKeys();
	hasOwnProperty$4 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region node_modules/lodash-es/isArrayLike.js
/**
* Checks if `value` is array-like. A value is considered array-like if it's
* not a function and has a `value.length` that's an integer greater than or
* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
* @example
*
* _.isArrayLike([1, 2, 3]);
* // => true
*
* _.isArrayLike(document.body.children);
* // => true
*
* _.isArrayLike('abc');
* // => true
*
* _.isArrayLike(_.noop);
* // => false
*/
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction(value);
}
var init_isArrayLike = __esmMin((() => {
	init_isFunction();
	init_isLength();
}));
//#endregion
//#region node_modules/lodash-es/keys.js
/**
* Creates an array of the own enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects. See the
* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* for more details.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keys(new Foo);
* // => ['a', 'b'] (iteration order is not guaranteed)
*
* _.keys('hi');
* // => ['0', '1']
*/
function keys$1(object) {
	return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var init_keys = __esmMin((() => {
	init__arrayLikeKeys();
	init__baseKeys();
	init_isArrayLike();
}));
//#endregion
//#region node_modules/lodash-es/_getAllKeys.js
/**
* Creates an array of own enumerable property names and symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeys(object) {
	return baseGetAllKeys(object, keys$1, getSymbols);
}
var init__getAllKeys = __esmMin((() => {
	init__baseGetAllKeys();
	init__getSymbols();
	init_keys();
}));
//#endregion
//#region node_modules/lodash-es/_equalObjects.js
/**
* A specialized version of `baseIsEqualDeep` for objects with support for
* partial deep comparisons.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length;
	if (objLength != getAllKeys(other).length && !isPartial) return false;
	var index = objLength;
	while (index--) {
		var key = objProps[index];
		if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) return false;
	}
	var objStacked = stack.get(object);
	var othStacked = stack.get(other);
	if (objStacked && othStacked) return objStacked == other && othStacked == object;
	var result = true;
	stack.set(object, other);
	stack.set(other, object);
	var skipCtor = isPartial;
	while (++index < objLength) {
		key = objProps[index];
		var objValue = object[key], othValue = other[key];
		if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
		if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
			result = false;
			break;
		}
		skipCtor || (skipCtor = key == "constructor");
	}
	if (result && !skipCtor) {
		var objCtor = object.constructor, othCtor = other.constructor;
		if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
	}
	stack["delete"](object);
	stack["delete"](other);
	return result;
}
var COMPARE_PARTIAL_FLAG$3, hasOwnProperty$3;
var init__equalObjects = __esmMin((() => {
	init__getAllKeys();
	COMPARE_PARTIAL_FLAG$3 = 1;
	hasOwnProperty$3 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region node_modules/lodash-es/_DataView.js
var DataView;
var init__DataView = __esmMin((() => {
	init__getNative();
	init__root();
	DataView = getNative(root, "DataView");
}));
//#endregion
//#region node_modules/lodash-es/_Promise.js
var Promise$1;
var init__Promise = __esmMin((() => {
	init__getNative();
	init__root();
	Promise$1 = getNative(root, "Promise");
}));
//#endregion
//#region node_modules/lodash-es/_Set.js
var Set$1;
var init__Set = __esmMin((() => {
	init__getNative();
	init__root();
	Set$1 = getNative(root, "Set");
}));
//#endregion
//#region node_modules/lodash-es/_WeakMap.js
var WeakMap$1;
var init__WeakMap = __esmMin((() => {
	init__getNative();
	init__root();
	WeakMap$1 = getNative(root, "WeakMap");
}));
//#endregion
//#region node_modules/lodash-es/_getTag.js
var mapTag, objectTag$2, promiseTag, setTag, weakMapTag, dataViewTag, dataViewCtorString, mapCtorString, promiseCtorString, setCtorString, weakMapCtorString, getTag$1, _getTag_default;
var init__getTag = __esmMin((() => {
	init__DataView();
	init__Map();
	init__Promise();
	init__Set();
	init__WeakMap();
	init__baseGetTag();
	init__toSource();
	mapTag = "[object Map]";
	objectTag$2 = "[object Object]";
	promiseTag = "[object Promise]";
	setTag = "[object Set]";
	weakMapTag = "[object WeakMap]";
	dataViewTag = "[object DataView]";
	dataViewCtorString = toSource(DataView);
	mapCtorString = toSource(Map$1);
	promiseCtorString = toSource(Promise$1);
	setCtorString = toSource(Set$1);
	weakMapCtorString = toSource(WeakMap$1);
	getTag$1 = baseGetTag;
	if (DataView && getTag$1(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag$1(new Map$1()) != mapTag || Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag || Set$1 && getTag$1(new Set$1()) != setTag || WeakMap$1 && getTag$1(new WeakMap$1()) != weakMapTag) getTag$1 = function(value) {
		var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag;
			case mapCtorString: return mapTag;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag;
			case weakMapCtorString: return weakMapTag;
		}
		return result;
	};
	_getTag_default = getTag$1;
}));
//#endregion
//#region node_modules/lodash-es/_baseIsEqualDeep.js
/**
* A specialized version of `baseIsEqual` for arrays and objects which performs
* deep comparisons and tracks traversed objects enabling objects with circular
* references to be compared.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} [stack] Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : _getTag_default(object), othTag = othIsArr ? arrayTag : _getTag_default(other);
	objTag = objTag == argsTag ? objectTag$1 : objTag;
	othTag = othTag == argsTag ? objectTag$1 : othTag;
	var objIsObj = objTag == objectTag$1, othIsObj = othTag == objectTag$1, isSameTag = objTag == othTag;
	if (isSameTag && isBuffer(object)) {
		if (!isBuffer(other)) return false;
		objIsArr = true;
		objIsObj = false;
	}
	if (isSameTag && !objIsObj) {
		stack || (stack = new Stack());
		return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	}
	if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
		var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
		if (objIsWrapped || othIsWrapped) {
			var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
			stack || (stack = new Stack());
			return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		}
	}
	if (!isSameTag) return false;
	stack || (stack = new Stack());
	return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
var COMPARE_PARTIAL_FLAG$2, argsTag, arrayTag, objectTag$1, hasOwnProperty$2;
var init__baseIsEqualDeep = __esmMin((() => {
	init__Stack();
	init__equalArrays();
	init__equalByTag();
	init__equalObjects();
	init__getTag();
	init_isArray();
	init_isBuffer();
	init_isTypedArray();
	COMPARE_PARTIAL_FLAG$2 = 1;
	argsTag = "[object Arguments]";
	arrayTag = "[object Array]";
	objectTag$1 = "[object Object]";
	hasOwnProperty$2 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region node_modules/lodash-es/_baseIsEqual.js
/**
* The base implementation of `_.isEqual` which supports partial comparisons
* and tracks traversed objects.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @param {boolean} bitmask The bitmask flags.
*  1 - Unordered comparison
*  2 - Partial comparison
* @param {Function} [customizer] The function to customize comparisons.
* @param {Object} [stack] Tracks traversed `value` and `other` objects.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
*/
function baseIsEqual(value, other, bitmask, customizer, stack) {
	if (value === other) return true;
	if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
	return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
var init__baseIsEqual = __esmMin((() => {
	init__baseIsEqualDeep();
	init_isObjectLike();
}));
//#endregion
//#region node_modules/lodash-es/_baseIsMatch.js
/**
* The base implementation of `_.isMatch` without support for iteratee shorthands.
*
* @private
* @param {Object} object The object to inspect.
* @param {Object} source The object of property values to match.
* @param {Array} matchData The property names, values, and compare flags to match.
* @param {Function} [customizer] The function to customize comparisons.
* @returns {boolean} Returns `true` if `object` is a match, else `false`.
*/
function baseIsMatch(object, source, matchData, customizer) {
	var index = matchData.length, length = index, noCustomizer = !customizer;
	if (object == null) return !length;
	object = Object(object);
	while (index--) {
		var data = matchData[index];
		if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
	}
	while (++index < length) {
		data = matchData[index];
		var key = data[0], objValue = object[key], srcValue = data[1];
		if (noCustomizer && data[2]) {
			if (objValue === void 0 && !(key in object)) return false;
		} else {
			var stack = new Stack();
			if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
			if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) return false;
		}
	}
	return true;
}
var COMPARE_PARTIAL_FLAG$1, COMPARE_UNORDERED_FLAG$1;
var init__baseIsMatch = __esmMin((() => {
	init__Stack();
	init__baseIsEqual();
	COMPARE_PARTIAL_FLAG$1 = 1;
	COMPARE_UNORDERED_FLAG$1 = 2;
}));
//#endregion
//#region node_modules/lodash-es/_isStrictComparable.js
/**
* Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` if suitable for strict
*  equality comparisons, else `false`.
*/
function isStrictComparable(value) {
	return value === value && !isObject(value);
}
var init__isStrictComparable = __esmMin((() => {
	init_isObject();
}));
//#endregion
//#region node_modules/lodash-es/_getMatchData.js
/**
* Gets the property names, values, and compare flags of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the match data of `object`.
*/
function getMatchData(object) {
	var result = keys$1(object), length = result.length;
	while (length--) {
		var key = result[length], value = object[key];
		result[length] = [
			key,
			value,
			isStrictComparable(value)
		];
	}
	return result;
}
var init__getMatchData = __esmMin((() => {
	init__isStrictComparable();
	init_keys();
}));
//#endregion
//#region node_modules/lodash-es/_matchesStrictComparable.js
/**
* A specialized version of `matchesProperty` for source values suitable
* for strict equality comparisons, i.e. `===`.
*
* @private
* @param {string} key The key of the property to get.
* @param {*} srcValue The value to match.
* @returns {Function} Returns the new spec function.
*/
function matchesStrictComparable(key, srcValue) {
	return function(object) {
		if (object == null) return false;
		return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
	};
}
var init__matchesStrictComparable = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseMatches.js
/**
* The base implementation of `_.matches` which doesn't clone `source`.
*
* @private
* @param {Object} source The object of property values to match.
* @returns {Function} Returns the new spec function.
*/
function baseMatches(source) {
	var matchData = getMatchData(source);
	if (matchData.length == 1 && matchData[0][2]) return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	return function(object) {
		return object === source || baseIsMatch(object, source, matchData);
	};
}
var init__baseMatches = __esmMin((() => {
	init__baseIsMatch();
	init__getMatchData();
	init__matchesStrictComparable();
}));
//#endregion
//#region node_modules/lodash-es/_baseHasIn.js
/**
* The base implementation of `_.hasIn` without support for deep paths.
*
* @private
* @param {Object} [object] The object to query.
* @param {Array|string} key The key to check.
* @returns {boolean} Returns `true` if `key` exists, else `false`.
*/
function baseHasIn(object, key) {
	return object != null && key in Object(object);
}
var init__baseHasIn = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_hasPath.js
/**
* Checks if `path` exists on `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @param {Function} hasFunc The function to check properties.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
*/
function hasPath(object, path, hasFunc) {
	path = castPath(path, object);
	var index = -1, length = path.length, result = false;
	while (++index < length) {
		var key = toKey(path[index]);
		if (!(result = object != null && hasFunc(object, key))) break;
		object = object[key];
	}
	if (result || ++index != length) return result;
	length = object == null ? 0 : object.length;
	return !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments(object));
}
var init__hasPath = __esmMin((() => {
	init__castPath();
	init_isArguments();
	init_isArray();
	init__isIndex();
	init_isLength();
	init__toKey();
}));
//#endregion
//#region node_modules/lodash-es/hasIn.js
/**
* Checks if `path` is a direct or inherited property of `object`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
* @example
*
* var object = _.create({ 'a': _.create({ 'b': 2 }) });
*
* _.hasIn(object, 'a');
* // => true
*
* _.hasIn(object, 'a.b');
* // => true
*
* _.hasIn(object, ['a', 'b']);
* // => true
*
* _.hasIn(object, 'b');
* // => false
*/
function hasIn(object, path) {
	return object != null && hasPath(object, path, baseHasIn);
}
var init_hasIn = __esmMin((() => {
	init__baseHasIn();
	init__hasPath();
}));
//#endregion
//#region node_modules/lodash-es/_baseMatchesProperty.js
/**
* The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
*
* @private
* @param {string} path The path of the property to get.
* @param {*} srcValue The value to match.
* @returns {Function} Returns the new spec function.
*/
function baseMatchesProperty(path, srcValue) {
	if (isKey(path) && isStrictComparable(srcValue)) return matchesStrictComparable(toKey(path), srcValue);
	return function(object) {
		var objValue = get(object, path);
		return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	};
}
var COMPARE_PARTIAL_FLAG, COMPARE_UNORDERED_FLAG;
var init__baseMatchesProperty = __esmMin((() => {
	init__baseIsEqual();
	init_get();
	init_hasIn();
	init__isKey();
	init__isStrictComparable();
	init__matchesStrictComparable();
	init__toKey();
	COMPARE_PARTIAL_FLAG = 1;
	COMPARE_UNORDERED_FLAG = 2;
}));
//#endregion
//#region node_modules/lodash-es/identity.js
/**
* This method returns the first argument it receives.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Util
* @param {*} value Any value.
* @returns {*} Returns `value`.
* @example
*
* var object = { 'a': 1 };
*
* console.log(_.identity(object) === object);
* // => true
*/
function identity$2(value) {
	return value;
}
var init_identity = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseProperty.js
/**
* The base implementation of `_.property` without support for deep paths.
*
* @private
* @param {string} key The key of the property to get.
* @returns {Function} Returns the new accessor function.
*/
function baseProperty(key) {
	return function(object) {
		return object == null ? void 0 : object[key];
	};
}
var init__baseProperty = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_basePropertyDeep.js
/**
* A specialized version of `baseProperty` which supports deep paths.
*
* @private
* @param {Array|string} path The path of the property to get.
* @returns {Function} Returns the new accessor function.
*/
function basePropertyDeep(path) {
	return function(object) {
		return baseGet(object, path);
	};
}
var init__basePropertyDeep = __esmMin((() => {
	init__baseGet();
}));
//#endregion
//#region node_modules/lodash-es/property.js
/**
* Creates a function that returns the value at `path` of a given object.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {Array|string} path The path of the property to get.
* @returns {Function} Returns the new accessor function.
* @example
*
* var objects = [
*   { 'a': { 'b': 2 } },
*   { 'a': { 'b': 1 } }
* ];
*
* _.map(objects, _.property('a.b'));
* // => [2, 1]
*
* _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
* // => [1, 2]
*/
function property(path) {
	return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
var init_property = __esmMin((() => {
	init__baseProperty();
	init__basePropertyDeep();
	init__isKey();
	init__toKey();
}));
//#endregion
//#region node_modules/lodash-es/_baseIteratee.js
/**
* The base implementation of `_.iteratee`.
*
* @private
* @param {*} [value=_.identity] The value to convert to an iteratee.
* @returns {Function} Returns the iteratee.
*/
function baseIteratee(value) {
	if (typeof value == "function") return value;
	if (value == null) return identity$2;
	if (typeof value == "object") return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	return property(value);
}
var init__baseIteratee = __esmMin((() => {
	init__baseMatches();
	init__baseMatchesProperty();
	init_identity();
	init_isArray();
	init_property();
}));
//#endregion
//#region node_modules/lodash-es/_baseFindIndex.js
/**
* The base implementation of `_.findIndex` and `_.findLastIndex` without
* support for iteratee shorthands.
*
* @private
* @param {Array} array The array to inspect.
* @param {Function} predicate The function invoked per iteration.
* @param {number} fromIndex The index to search from.
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function baseFindIndex(array, predicate, fromIndex, fromRight) {
	var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
	while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
	return -1;
}
var init__baseFindIndex = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseIsNaN.js
/**
* The base implementation of `_.isNaN` without support for number objects.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
*/
function baseIsNaN(value) {
	return value !== value;
}
var init__baseIsNaN = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_strictIndexOf.js
/**
* A specialized version of `_.indexOf` which performs strict equality
* comparisons of values, i.e. `===`.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} value The value to search for.
* @param {number} fromIndex The index to search from.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function strictIndexOf(array, value, fromIndex) {
	var index = fromIndex - 1, length = array.length;
	while (++index < length) if (array[index] === value) return index;
	return -1;
}
var init__strictIndexOf = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseIndexOf.js
/**
* The base implementation of `_.indexOf` without `fromIndex` bounds checks.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} value The value to search for.
* @param {number} fromIndex The index to search from.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function baseIndexOf(array, value, fromIndex) {
	return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}
var init__baseIndexOf = __esmMin((() => {
	init__baseFindIndex();
	init__baseIsNaN();
	init__strictIndexOf();
}));
//#endregion
//#region node_modules/lodash-es/_arrayIncludes.js
/**
* A specialized version of `_.includes` for arrays without support for
* specifying an index to search from.
*
* @private
* @param {Array} [array] The array to inspect.
* @param {*} target The value to search for.
* @returns {boolean} Returns `true` if `target` is found, else `false`.
*/
function arrayIncludes(array, value) {
	return !!(array == null ? 0 : array.length) && baseIndexOf(array, value, 0) > -1;
}
var init__arrayIncludes = __esmMin((() => {
	init__baseIndexOf();
}));
//#endregion
//#region node_modules/lodash-es/_arrayIncludesWith.js
/**
* This function is like `arrayIncludes` except that it accepts a comparator.
*
* @private
* @param {Array} [array] The array to inspect.
* @param {*} target The value to search for.
* @param {Function} comparator The comparator invoked per element.
* @returns {boolean} Returns `true` if `target` is found, else `false`.
*/
function arrayIncludesWith(array, value, comparator) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (comparator(value, array[index])) return true;
	return false;
}
var init__arrayIncludesWith = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/noop.js
/**
* This method returns `undefined`.
*
* @static
* @memberOf _
* @since 2.3.0
* @category Util
* @example
*
* _.times(2, _.noop);
* // => [undefined, undefined]
*/
function noop() {}
var init_noop = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_createSet.js
var createSet;
var init__createSet = __esmMin((() => {
	init__Set();
	init_noop();
	init__setToArray();
	createSet = !(Set$1 && 1 / setToArray(new Set$1([, -0]))[1] == Infinity) ? noop : function(values) {
		return new Set$1(values);
	};
}));
//#endregion
//#region node_modules/lodash-es/_baseUniq.js
/**
* The base implementation of `_.uniqBy` without support for iteratee shorthands.
*
* @private
* @param {Array} array The array to inspect.
* @param {Function} [iteratee] The iteratee invoked per element.
* @param {Function} [comparator] The comparator invoked per element.
* @returns {Array} Returns the new duplicate free array.
*/
function baseUniq(array, iteratee, comparator) {
	var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
	if (comparator) {
		isCommon = false;
		includes = arrayIncludesWith;
	} else if (length >= LARGE_ARRAY_SIZE) {
		var set = iteratee ? null : createSet(array);
		if (set) return setToArray(set);
		isCommon = false;
		includes = cacheHas;
		seen = new SetCache();
	} else seen = iteratee ? [] : result;
	outer: while (++index < length) {
		var value = array[index], computed = iteratee ? iteratee(value) : value;
		value = comparator || value !== 0 ? value : 0;
		if (isCommon && computed === computed) {
			var seenIndex = seen.length;
			while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
			if (iteratee) seen.push(computed);
			result.push(value);
		} else if (!includes(seen, computed, comparator)) {
			if (seen !== result) seen.push(computed);
			result.push(value);
		}
	}
	return result;
}
var LARGE_ARRAY_SIZE;
var init__baseUniq = __esmMin((() => {
	init__SetCache();
	init__arrayIncludes();
	init__arrayIncludesWith();
	init__cacheHas();
	init__createSet();
	init__setToArray();
	LARGE_ARRAY_SIZE = 200;
}));
//#endregion
//#region node_modules/lodash-es/uniqBy.js
/**
* This method is like `_.uniq` except that it accepts `iteratee` which is
* invoked for each element in `array` to generate the criterion by which
* uniqueness is computed. The order of result values is determined by the
* order they occur in the array. The iteratee is invoked with one argument:
* (value).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Array
* @param {Array} array The array to inspect.
* @param {Function} [iteratee=_.identity] The iteratee invoked per element.
* @returns {Array} Returns the new duplicate free array.
* @example
*
* _.uniqBy([2.1, 1.2, 2.3], Math.floor);
* // => [2.1, 1.2]
*
* // The `_.property` iteratee shorthand.
* _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
* // => [{ 'x': 1 }, { 'x': 2 }]
*/
function uniqBy(array, iteratee) {
	return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}
var init_uniqBy = __esmMin((() => {
	init__baseIteratee();
	init__baseUniq();
}));
//#endregion
//#region node_modules/recharts/es6/util/payload/getUniqPayload.js
/**
* This is configuration option that decides how to filter for unique values only:
*
* - `false` means "no filter"
* - `true` means "use recharts default filter"
* - function means "use return of this function as the default key"
*/
function getUniqPayload(payload, option, defaultUniqBy) {
	if (option === true) return uniqBy(payload, defaultUniqBy);
	if (isFunction(option)) return uniqBy(payload, option);
	return payload;
}
var init_getUniqPayload = __esmMin((() => {
	init_uniqBy();
	init_isFunction();
}));
//#endregion
//#region node_modules/recharts/es6/component/Legend.js
/**
* @fileOverview Legend
*/
function _typeof$38(o) {
	"@babel/helpers - typeof";
	return _typeof$38 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$38(o);
}
function ownKeys$31(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$31(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$31(Object(t), !0).forEach(function(r) {
			_defineProperty$36(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$31(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$16(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$16(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$37(descriptor.key), descriptor);
	}
}
function _createClass$16(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$16(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$16(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$12(t, o, e) {
	return o = _getPrototypeOf$13(o), _possibleConstructorReturn$13(t, _isNativeReflectConstruct$13() ? Reflect.construct(o, e || [], _getPrototypeOf$13(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$13(self, call) {
	if (call && (_typeof$38(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$13(self);
}
function _assertThisInitialized$13(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$13() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$13 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$13(o) {
	_getPrototypeOf$13 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$13(o);
}
function _inherits$13(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$13(subClass, superClass);
}
function _setPrototypeOf$13(o, p) {
	_setPrototypeOf$13 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$13(o, p);
}
function _defineProperty$36(obj, key, value) {
	key = _toPropertyKey$37(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$37(t) {
	var i = _toPrimitive$37(t, "string");
	return "symbol" == _typeof$38(i) ? i : i + "";
}
function _toPrimitive$37(t, r) {
	if ("object" != _typeof$38(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$38(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$11(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$11(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$11(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function defaultUniqBy$1(entry) {
	return entry.value;
}
function renderContent$1(content, props) {
	if (/*#__PURE__*/ React.isValidElement(content)) return /*#__PURE__*/ React.cloneElement(content, props);
	if (typeof content === "function") return /*#__PURE__*/ React.createElement(content, props);
	props.ref;
	var otherProps = _objectWithoutProperties$11(props, _excluded$11);
	return /*#__PURE__*/ React.createElement(DefaultLegendContent, otherProps);
}
var _excluded$11, EPS$1, Legend;
var init_Legend = __esmMin((() => {
	init_DefaultLegendContent();
	init_DataUtils();
	init_getUniqPayload();
	_excluded$11 = ["ref"];
	EPS$1 = 1;
	Legend = /*#__PURE__*/ function(_PureComponent) {
		function Legend() {
			var _this;
			_classCallCheck$16(this, Legend);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _callSuper$12(this, Legend, [].concat(args));
			_defineProperty$36(_this, "lastBoundingBox", {
				width: -1,
				height: -1
			});
			return _this;
		}
		_inherits$13(Legend, _PureComponent);
		return _createClass$16(Legend, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					this.updateBBox();
				}
			},
			{
				key: "componentDidUpdate",
				value: function componentDidUpdate() {
					this.updateBBox();
				}
			},
			{
				key: "getBBox",
				value: function getBBox() {
					if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
						var box = this.wrapperNode.getBoundingClientRect();
						box.height = this.wrapperNode.offsetHeight;
						box.width = this.wrapperNode.offsetWidth;
						return box;
					}
					return null;
				}
			},
			{
				key: "updateBBox",
				value: function updateBBox() {
					var onBBoxUpdate = this.props.onBBoxUpdate;
					var box = this.getBBox();
					if (box) {
						if (Math.abs(box.width - this.lastBoundingBox.width) > EPS$1 || Math.abs(box.height - this.lastBoundingBox.height) > EPS$1) {
							this.lastBoundingBox.width = box.width;
							this.lastBoundingBox.height = box.height;
							if (onBBoxUpdate) onBBoxUpdate(box);
						}
					} else if (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) {
						this.lastBoundingBox.width = -1;
						this.lastBoundingBox.height = -1;
						if (onBBoxUpdate) onBBoxUpdate(null);
					}
				}
			},
			{
				key: "getBBoxSnapshot",
				value: function getBBoxSnapshot() {
					if (this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0) return _objectSpread$31({}, this.lastBoundingBox);
					return {
						width: 0,
						height: 0
					};
				}
			},
			{
				key: "getDefaultPosition",
				value: function getDefaultPosition(style) {
					var _this$props = this.props, layout = _this$props.layout, align = _this$props.align, verticalAlign = _this$props.verticalAlign, margin = _this$props.margin, chartWidth = _this$props.chartWidth, chartHeight = _this$props.chartHeight;
					var hPos, vPos;
					if (!style || (style.left === void 0 || style.left === null) && (style.right === void 0 || style.right === null)) if (align === "center" && layout === "vertical") {
						var box = this.getBBoxSnapshot();
						hPos = { left: ((chartWidth || 0) - box.width) / 2 };
					} else hPos = align === "right" ? { right: margin && margin.right || 0 } : { left: margin && margin.left || 0 };
					if (!style || (style.top === void 0 || style.top === null) && (style.bottom === void 0 || style.bottom === null)) if (verticalAlign === "middle") {
						var _box = this.getBBoxSnapshot();
						vPos = { top: ((chartHeight || 0) - _box.height) / 2 };
					} else vPos = verticalAlign === "bottom" ? { bottom: margin && margin.bottom || 0 } : { top: margin && margin.top || 0 };
					return _objectSpread$31(_objectSpread$31({}, hPos), vPos);
				}
			},
			{
				key: "render",
				value: function render() {
					var _this2 = this;
					var _this$props2 = this.props, content = _this$props2.content, width = _this$props2.width, height = _this$props2.height, wrapperStyle = _this$props2.wrapperStyle, payloadUniqBy = _this$props2.payloadUniqBy, payload = _this$props2.payload;
					var outerStyle = _objectSpread$31(_objectSpread$31({
						position: "absolute",
						width: width || "auto",
						height: height || "auto"
					}, this.getDefaultPosition(wrapperStyle)), wrapperStyle);
					return /*#__PURE__*/ React.createElement("div", {
						className: "recharts-legend-wrapper",
						style: outerStyle,
						ref: function ref(node) {
							_this2.wrapperNode = node;
						}
					}, renderContent$1(content, _objectSpread$31(_objectSpread$31({}, this.props), {}, { payload: getUniqPayload(payload, payloadUniqBy, defaultUniqBy$1) })));
				}
			}
		], [{
			key: "getWithHeight",
			value: function getWithHeight(item, chartWidth) {
				var layout = _objectSpread$31(_objectSpread$31({}, this.defaultProps), item.props).layout;
				if (layout === "vertical" && isNumber(item.props.height)) return { height: item.props.height };
				if (layout === "horizontal") return { width: item.props.width || chartWidth };
				return null;
			}
		}]);
	}(PureComponent);
	_defineProperty$36(Legend, "displayName", "Legend");
	_defineProperty$36(Legend, "defaultProps", {
		iconSize: 14,
		layout: "horizontal",
		align: "center",
		verticalAlign: "bottom"
	});
}));
//#endregion
//#region node_modules/lodash-es/_isFlattenable.js
/**
* Checks if `value` is a flattenable `arguments` object or array.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
*/
function isFlattenable(value) {
	return isArray$1(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var spreadableSymbol;
var init__isFlattenable = __esmMin((() => {
	init__Symbol();
	init_isArguments();
	init_isArray();
	spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
}));
//#endregion
//#region node_modules/lodash-es/_baseFlatten.js
/**
* The base implementation of `_.flatten` with support for restricting flattening.
*
* @private
* @param {Array} array The array to flatten.
* @param {number} depth The maximum recursion depth.
* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
* @param {Array} [result=[]] The initial result value.
* @returns {Array} Returns the new flattened array.
*/
function baseFlatten(array, depth, predicate, isStrict, result) {
	var index = -1, length = array.length;
	predicate || (predicate = isFlattenable);
	result || (result = []);
	while (++index < length) {
		var value = array[index];
		if (depth > 0 && predicate(value)) if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
		else arrayPush(result, value);
		else if (!isStrict) result[result.length] = value;
	}
	return result;
}
var init__baseFlatten = __esmMin((() => {
	init__arrayPush();
	init__isFlattenable();
}));
//#endregion
//#region node_modules/lodash-es/_createBaseFor.js
/**
* Creates a base function for methods like `_.forIn` and `_.forOwn`.
*
* @private
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new base function.
*/
function createBaseFor(fromRight) {
	return function(object, iteratee, keysFunc) {
		var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
		while (length--) {
			var key = props[fromRight ? length : ++index];
			if (iteratee(iterable[key], key, iterable) === false) break;
		}
		return object;
	};
}
var init__createBaseFor = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseFor.js
var baseFor;
var init__baseFor = __esmMin((() => {
	init__createBaseFor();
	baseFor = createBaseFor();
}));
//#endregion
//#region node_modules/lodash-es/_baseForOwn.js
/**
* The base implementation of `_.forOwn` without support for iteratee shorthands.
*
* @private
* @param {Object} object The object to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Object} Returns `object`.
*/
function baseForOwn(object, iteratee) {
	return object && baseFor(object, iteratee, keys$1);
}
var init__baseForOwn = __esmMin((() => {
	init__baseFor();
	init_keys();
}));
//#endregion
//#region node_modules/lodash-es/_createBaseEach.js
/**
* Creates a `baseEach` or `baseEachRight` function.
*
* @private
* @param {Function} eachFunc The function to iterate over a collection.
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new base function.
*/
function createBaseEach(eachFunc, fromRight) {
	return function(collection, iteratee) {
		if (collection == null) return collection;
		if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
		var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
		while (fromRight ? index-- : ++index < length) if (iteratee(iterable[index], index, iterable) === false) break;
		return collection;
	};
}
var init__createBaseEach = __esmMin((() => {
	init_isArrayLike();
}));
//#endregion
//#region node_modules/lodash-es/_baseEach.js
var baseEach;
var init__baseEach = __esmMin((() => {
	init__baseForOwn();
	init__createBaseEach();
	baseEach = createBaseEach(baseForOwn);
}));
//#endregion
//#region node_modules/lodash-es/_baseMap.js
/**
* The base implementation of `_.map` without support for iteratee shorthands.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function baseMap(collection, iteratee) {
	var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
	baseEach(collection, function(value, key, collection) {
		result[++index] = iteratee(value, key, collection);
	});
	return result;
}
var init__baseMap = __esmMin((() => {
	init__baseEach();
	init_isArrayLike();
}));
//#endregion
//#region node_modules/lodash-es/_baseSortBy.js
/**
* The base implementation of `_.sortBy` which uses `comparer` to define the
* sort order of `array` and replaces criteria objects with their corresponding
* values.
*
* @private
* @param {Array} array The array to sort.
* @param {Function} comparer The function to define sort order.
* @returns {Array} Returns `array`.
*/
function baseSortBy(array, comparer) {
	var length = array.length;
	array.sort(comparer);
	while (length--) array[length] = array[length].value;
	return array;
}
var init__baseSortBy = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_compareAscending.js
/**
* Compares values to sort them in ascending order.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {number} Returns the sort order indicator for `value`.
*/
function compareAscending(value, other) {
	if (value !== other) {
		var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
		var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
		if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1;
		if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1;
	}
	return 0;
}
var init__compareAscending = __esmMin((() => {
	init_isSymbol();
}));
//#endregion
//#region node_modules/lodash-es/_compareMultiple.js
/**
* Used by `_.orderBy` to compare multiple properties of a value to another
* and stable sort them.
*
* If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
* specify an order of "desc" for descending or "asc" for ascending sort order
* of corresponding values.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {boolean[]|string[]} orders The order to sort by for each property.
* @returns {number} Returns the sort order indicator for `object`.
*/
function compareMultiple(object, other, orders) {
	var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
	while (++index < length) {
		var result = compareAscending(objCriteria[index], othCriteria[index]);
		if (result) {
			if (index >= ordersLength) return result;
			return result * (orders[index] == "desc" ? -1 : 1);
		}
	}
	return object.index - other.index;
}
var init__compareMultiple = __esmMin((() => {
	init__compareAscending();
}));
//#endregion
//#region node_modules/lodash-es/_baseOrderBy.js
/**
* The base implementation of `_.orderBy` without param guards.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
* @param {string[]} orders The sort orders of `iteratees`.
* @returns {Array} Returns the new sorted array.
*/
function baseOrderBy(collection, iteratees, orders) {
	if (iteratees.length) iteratees = arrayMap(iteratees, function(iteratee) {
		if (isArray$1(iteratee)) return function(value) {
			return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
		};
		return iteratee;
	});
	else iteratees = [identity$2];
	var index = -1;
	iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
	return baseSortBy(baseMap(collection, function(value, key, collection) {
		return {
			"criteria": arrayMap(iteratees, function(iteratee) {
				return iteratee(value);
			}),
			"index": ++index,
			"value": value
		};
	}), function(object, other) {
		return compareMultiple(object, other, orders);
	});
}
var init__baseOrderBy = __esmMin((() => {
	init__arrayMap();
	init__baseGet();
	init__baseIteratee();
	init__baseMap();
	init__baseSortBy();
	init__baseUnary();
	init__compareMultiple();
	init_identity();
	init_isArray();
}));
//#endregion
//#region node_modules/lodash-es/_apply.js
/**
* A faster alternative to `Function#apply`, this function invokes `func`
* with the `this` binding of `thisArg` and the arguments of `args`.
*
* @private
* @param {Function} func The function to invoke.
* @param {*} thisArg The `this` binding of `func`.
* @param {Array} args The arguments to invoke `func` with.
* @returns {*} Returns the result of `func`.
*/
function apply(func, thisArg, args) {
	switch (args.length) {
		case 0: return func.call(thisArg);
		case 1: return func.call(thisArg, args[0]);
		case 2: return func.call(thisArg, args[0], args[1]);
		case 3: return func.call(thisArg, args[0], args[1], args[2]);
	}
	return func.apply(thisArg, args);
}
var init__apply = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_overRest.js
/**
* A specialized version of `baseRest` which transforms the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @param {Function} transform The rest array transform.
* @returns {Function} Returns the new function.
*/
function overRest(func, start, transform) {
	start = nativeMax$2(start === void 0 ? func.length - 1 : start, 0);
	return function() {
		var args = arguments, index = -1, length = nativeMax$2(args.length - start, 0), array = Array(length);
		while (++index < length) array[index] = args[start + index];
		index = -1;
		var otherArgs = Array(start + 1);
		while (++index < start) otherArgs[index] = args[index];
		otherArgs[start] = transform(array);
		return apply(func, this, otherArgs);
	};
}
var nativeMax$2;
var init__overRest = __esmMin((() => {
	init__apply();
	nativeMax$2 = Math.max;
}));
//#endregion
//#region node_modules/lodash-es/constant.js
/**
* Creates a function that returns `value`.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {*} value The value to return from the new function.
* @returns {Function} Returns the new constant function.
* @example
*
* var objects = _.times(2, _.constant({ 'a': 1 }));
*
* console.log(objects);
* // => [{ 'a': 1 }, { 'a': 1 }]
*
* console.log(objects[0] === objects[1]);
* // => true
*/
function constant(value) {
	return function() {
		return value;
	};
}
var init_constant = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_defineProperty.js
var defineProperty;
var init__defineProperty = __esmMin((() => {
	init__getNative();
	defineProperty = function() {
		try {
			var func = getNative(Object, "defineProperty");
			func({}, "", {});
			return func;
		} catch (e) {}
	}();
}));
//#endregion
//#region node_modules/lodash-es/_baseSetToString.js
var baseSetToString;
var init__baseSetToString = __esmMin((() => {
	init_constant();
	init__defineProperty();
	init_identity();
	baseSetToString = !defineProperty ? identity$2 : function(func, string) {
		return defineProperty(func, "toString", {
			"configurable": true,
			"enumerable": false,
			"value": constant(string),
			"writable": true
		});
	};
}));
//#endregion
//#region node_modules/lodash-es/_shortOut.js
/**
* Creates a function that'll short out and invoke `identity` instead
* of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
* milliseconds.
*
* @private
* @param {Function} func The function to restrict.
* @returns {Function} Returns the new shortable function.
*/
function shortOut(func) {
	var count = 0, lastCalled = 0;
	return function() {
		var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if (remaining > 0) {
			if (++count >= HOT_COUNT) return arguments[0];
		} else count = 0;
		return func.apply(void 0, arguments);
	};
}
var HOT_COUNT, HOT_SPAN, nativeNow;
var init__shortOut = __esmMin((() => {
	HOT_COUNT = 800;
	HOT_SPAN = 16;
	nativeNow = Date.now;
}));
//#endregion
//#region node_modules/lodash-es/_setToString.js
var setToString;
var init__setToString = __esmMin((() => {
	init__baseSetToString();
	init__shortOut();
	setToString = shortOut(baseSetToString);
}));
//#endregion
//#region node_modules/lodash-es/_baseRest.js
/**
* The base implementation of `_.rest` which doesn't validate or coerce arguments.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @returns {Function} Returns the new function.
*/
function baseRest(func, start) {
	return setToString(overRest(func, start, identity$2), func + "");
}
var init__baseRest = __esmMin((() => {
	init_identity();
	init__overRest();
	init__setToString();
}));
//#endregion
//#region node_modules/lodash-es/_isIterateeCall.js
/**
* Checks if the given arguments are from an iteratee call.
*
* @private
* @param {*} value The potential iteratee value argument.
* @param {*} index The potential iteratee index or key argument.
* @param {*} object The potential iteratee object argument.
* @returns {boolean} Returns `true` if the arguments are from an iteratee call,
*  else `false`.
*/
function isIterateeCall(value, index, object) {
	if (!isObject(object)) return false;
	var type = typeof index;
	if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
	return false;
}
var init__isIterateeCall = __esmMin((() => {
	init_eq();
	init_isArrayLike();
	init__isIndex();
	init_isObject();
}));
//#endregion
//#region node_modules/lodash-es/sortBy.js
var sortBy;
var init_sortBy = __esmMin((() => {
	init__baseFlatten();
	init__baseOrderBy();
	init__baseRest();
	init__isIterateeCall();
	sortBy = baseRest(function(collection, iteratees) {
		if (collection == null) return [];
		var length = iteratees.length;
		if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) iteratees = [];
		else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) iteratees = [iteratees[0]];
		return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
	});
}));
//#endregion
//#region node_modules/recharts/es6/component/DefaultTooltipContent.js
/**
* @fileOverview Default Tooltip Content
*/
function _typeof$37(o) {
	"@babel/helpers - typeof";
	return _typeof$37 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$37(o);
}
function _extends$20() {
	_extends$20 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$20.apply(this, arguments);
}
function _slicedToArray$11(arr, i) {
	return _arrayWithHoles$12(arr) || _iterableToArrayLimit$11(arr, i) || _unsupportedIterableToArray$18(arr, i) || _nonIterableRest$12();
}
function _nonIterableRest$12() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$18(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$18(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$18(o, minLen);
}
function _arrayLikeToArray$18(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$11(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$12(arr) {
	if (Array.isArray(arr)) return arr;
}
function ownKeys$30(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$30(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$30(Object(t), !0).forEach(function(r) {
			_defineProperty$35(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$30(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$35(obj, key, value) {
	key = _toPropertyKey$36(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$36(t) {
	var i = _toPrimitive$36(t, "string");
	return "symbol" == _typeof$37(i) ? i : i + "";
}
function _toPrimitive$36(t, r) {
	if ("object" != _typeof$37(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$37(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function defaultFormatter(value) {
	return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
var DefaultTooltipContent;
var init_DefaultTooltipContent = __esmMin((() => {
	init_sortBy();
	init_isNil();
	init_clsx();
	init_DataUtils();
	DefaultTooltipContent = function DefaultTooltipContent(props) {
		var _props$separator = props.separator, separator = _props$separator === void 0 ? " : " : _props$separator, _props$contentStyle = props.contentStyle, contentStyle = _props$contentStyle === void 0 ? {} : _props$contentStyle, _props$itemStyle = props.itemStyle, itemStyle = _props$itemStyle === void 0 ? {} : _props$itemStyle, _props$labelStyle = props.labelStyle, labelStyle = _props$labelStyle === void 0 ? {} : _props$labelStyle, payload = props.payload, formatter = props.formatter, itemSorter = props.itemSorter, wrapperClassName = props.wrapperClassName, labelClassName = props.labelClassName, label = props.label, labelFormatter = props.labelFormatter, _props$accessibilityL = props.accessibilityLayer, accessibilityLayer = _props$accessibilityL === void 0 ? false : _props$accessibilityL;
		var renderContent = function renderContent() {
			if (payload && payload.length) {
				var listStyle = {
					padding: 0,
					margin: 0
				};
				var items = (itemSorter ? sortBy(payload, itemSorter) : payload).map(function(entry, i) {
					if (entry.type === "none") return null;
					var finalItemStyle = _objectSpread$30({
						display: "block",
						paddingTop: 4,
						paddingBottom: 4,
						color: entry.color || "#000"
					}, itemStyle);
					var finalFormatter = entry.formatter || formatter || defaultFormatter;
					var value = entry.value, name = entry.name;
					var finalValue = value;
					var finalName = name;
					if (finalFormatter && finalValue != null && finalName != null) {
						var formatted = finalFormatter(value, name, entry, i, payload);
						if (Array.isArray(formatted)) {
							var _formatted = _slicedToArray$11(formatted, 2);
							finalValue = _formatted[0];
							finalName = _formatted[1];
						} else finalValue = formatted;
					}
					return /*#__PURE__*/ React.createElement("li", {
						className: "recharts-tooltip-item",
						key: "tooltip-item-".concat(i),
						style: finalItemStyle
					}, isNumOrStr(finalName) ? /*#__PURE__*/ React.createElement("span", { className: "recharts-tooltip-item-name" }, finalName) : null, isNumOrStr(finalName) ? /*#__PURE__*/ React.createElement("span", { className: "recharts-tooltip-item-separator" }, separator) : null, /*#__PURE__*/ React.createElement("span", { className: "recharts-tooltip-item-value" }, finalValue), /*#__PURE__*/ React.createElement("span", { className: "recharts-tooltip-item-unit" }, entry.unit || ""));
				});
				return /*#__PURE__*/ React.createElement("ul", {
					className: "recharts-tooltip-item-list",
					style: listStyle
				}, items);
			}
			return null;
		};
		var finalStyle = _objectSpread$30({
			margin: 0,
			padding: 10,
			backgroundColor: "#fff",
			border: "1px solid #ccc",
			whiteSpace: "nowrap"
		}, contentStyle);
		var finalLabelStyle = _objectSpread$30({ margin: 0 }, labelStyle);
		var hasLabel = !isNil(label);
		var finalLabel = hasLabel ? label : "";
		var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
		var labelCN = clsx("recharts-tooltip-label", labelClassName);
		if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) finalLabel = labelFormatter(label, payload);
		var accessibilityAttributes = accessibilityLayer ? {
			role: "status",
			"aria-live": "assertive"
		} : {};
		return /*#__PURE__*/ React.createElement("div", _extends$20({
			className: wrapperCN,
			style: finalStyle
		}, accessibilityAttributes), /*#__PURE__*/ React.createElement("p", {
			className: labelCN,
			style: finalLabelStyle
		}, /*#__PURE__*/ React.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent());
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/tooltip/translate.js
function _typeof$36(o) {
	"@babel/helpers - typeof";
	return _typeof$36 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$36(o);
}
function _defineProperty$34(obj, key, value) {
	key = _toPropertyKey$35(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$35(t) {
	var i = _toPrimitive$35(t, "string");
	return "symbol" == _typeof$36(i) ? i : i + "";
}
function _toPrimitive$35(t, r) {
	if ("object" != _typeof$36(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$36(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getTooltipCSSClassName(_ref) {
	var coordinate = _ref.coordinate, translateX = _ref.translateX, translateY = _ref.translateY;
	return clsx(CSS_CLASS_PREFIX, _defineProperty$34(_defineProperty$34(_defineProperty$34(_defineProperty$34({}, "".concat(CSS_CLASS_PREFIX, "-right"), isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x), "".concat(CSS_CLASS_PREFIX, "-left"), isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x), "".concat(CSS_CLASS_PREFIX, "-bottom"), isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y), "".concat(CSS_CLASS_PREFIX, "-top"), isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y));
}
function getTooltipTranslateXY(_ref2) {
	var allowEscapeViewBox = _ref2.allowEscapeViewBox, coordinate = _ref2.coordinate, key = _ref2.key, offsetTopLeft = _ref2.offsetTopLeft, position = _ref2.position, reverseDirection = _ref2.reverseDirection, tooltipDimension = _ref2.tooltipDimension, viewBox = _ref2.viewBox, viewBoxDimension = _ref2.viewBoxDimension;
	if (position && isNumber(position[key])) return position[key];
	var negative = coordinate[key] - tooltipDimension - offsetTopLeft;
	var positive = coordinate[key] + offsetTopLeft;
	if (allowEscapeViewBox[key]) return reverseDirection[key] ? negative : positive;
	if (reverseDirection[key]) {
		if (negative < viewBox[key]) return Math.max(positive, viewBox[key]);
		return Math.max(negative, viewBox[key]);
	}
	if (positive + tooltipDimension > viewBox[key] + viewBoxDimension) return Math.max(negative, viewBox[key]);
	return Math.max(positive, viewBox[key]);
}
function getTransformStyle(_ref3) {
	var translateX = _ref3.translateX, translateY = _ref3.translateY;
	return { transform: _ref3.useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)") };
}
function getTooltipTranslate(_ref4) {
	var allowEscapeViewBox = _ref4.allowEscapeViewBox, coordinate = _ref4.coordinate, offsetTopLeft = _ref4.offsetTopLeft, position = _ref4.position, reverseDirection = _ref4.reverseDirection, tooltipBox = _ref4.tooltipBox, useTranslate3d = _ref4.useTranslate3d, viewBox = _ref4.viewBox;
	var cssProperties, translateX, translateY;
	if (tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
		translateX = getTooltipTranslateXY({
			allowEscapeViewBox,
			coordinate,
			key: "x",
			offsetTopLeft,
			position,
			reverseDirection,
			tooltipDimension: tooltipBox.width,
			viewBox,
			viewBoxDimension: viewBox.width
		});
		translateY = getTooltipTranslateXY({
			allowEscapeViewBox,
			coordinate,
			key: "y",
			offsetTopLeft,
			position,
			reverseDirection,
			tooltipDimension: tooltipBox.height,
			viewBox,
			viewBoxDimension: viewBox.height
		});
		cssProperties = getTransformStyle({
			translateX,
			translateY,
			useTranslate3d
		});
	} else cssProperties = TOOLTIP_HIDDEN;
	return {
		cssProperties,
		cssClasses: getTooltipCSSClassName({
			translateX,
			translateY,
			coordinate
		})
	};
}
var CSS_CLASS_PREFIX, TOOLTIP_HIDDEN;
var init_translate = __esmMin((() => {
	init_clsx();
	init_DataUtils();
	CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
	TOOLTIP_HIDDEN = { visibility: "hidden" };
}));
//#endregion
//#region node_modules/recharts/es6/component/TooltipBoundingBox.js
function _typeof$35(o) {
	"@babel/helpers - typeof";
	return _typeof$35 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$35(o);
}
function ownKeys$29(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$29(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$29(Object(t), !0).forEach(function(r) {
			_defineProperty$33(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$29(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$15(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$15(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$34(descriptor.key), descriptor);
	}
}
function _createClass$15(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$15(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$15(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$11(t, o, e) {
	return o = _getPrototypeOf$12(o), _possibleConstructorReturn$12(t, _isNativeReflectConstruct$12() ? Reflect.construct(o, e || [], _getPrototypeOf$12(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$12(self, call) {
	if (call && (_typeof$35(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$12(self);
}
function _assertThisInitialized$12(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$12() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$12 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$12(o) {
	_getPrototypeOf$12 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$12(o);
}
function _inherits$12(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$12(subClass, superClass);
}
function _setPrototypeOf$12(o, p) {
	_setPrototypeOf$12 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$12(o, p);
}
function _defineProperty$33(obj, key, value) {
	key = _toPropertyKey$34(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$34(t) {
	var i = _toPrimitive$34(t, "string");
	return "symbol" == _typeof$35(i) ? i : i + "";
}
function _toPrimitive$34(t, r) {
	if ("object" != _typeof$35(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$35(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var EPSILON, TooltipBoundingBox;
var init_TooltipBoundingBox = __esmMin((() => {
	init_translate();
	EPSILON = 1;
	TooltipBoundingBox = /*#__PURE__*/ function(_PureComponent) {
		function TooltipBoundingBox() {
			var _this;
			_classCallCheck$15(this, TooltipBoundingBox);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _callSuper$11(this, TooltipBoundingBox, [].concat(args));
			_defineProperty$33(_this, "state", {
				dismissed: false,
				dismissedAtCoordinate: {
					x: 0,
					y: 0
				},
				lastBoundingBox: {
					width: -1,
					height: -1
				}
			});
			_defineProperty$33(_this, "handleKeyDown", function(event) {
				if (event.key === "Escape") {
					var _this$props$coordinat, _this$props$coordinat2, _this$props$coordinat3, _this$props$coordinat4;
					_this.setState({
						dismissed: true,
						dismissedAtCoordinate: {
							x: (_this$props$coordinat = (_this$props$coordinat2 = _this.props.coordinate) === null || _this$props$coordinat2 === void 0 ? void 0 : _this$props$coordinat2.x) !== null && _this$props$coordinat !== void 0 ? _this$props$coordinat : 0,
							y: (_this$props$coordinat3 = (_this$props$coordinat4 = _this.props.coordinate) === null || _this$props$coordinat4 === void 0 ? void 0 : _this$props$coordinat4.y) !== null && _this$props$coordinat3 !== void 0 ? _this$props$coordinat3 : 0
						}
					});
				}
			});
			return _this;
		}
		_inherits$12(TooltipBoundingBox, _PureComponent);
		return _createClass$15(TooltipBoundingBox, [
			{
				key: "updateBBox",
				value: function updateBBox() {
					if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
						var box = this.wrapperNode.getBoundingClientRect();
						if (Math.abs(box.width - this.state.lastBoundingBox.width) > EPSILON || Math.abs(box.height - this.state.lastBoundingBox.height) > EPSILON) this.setState({ lastBoundingBox: {
							width: box.width,
							height: box.height
						} });
					} else if (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) this.setState({ lastBoundingBox: {
						width: -1,
						height: -1
					} });
				}
			},
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					document.addEventListener("keydown", this.handleKeyDown);
					this.updateBBox();
				}
			},
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					document.removeEventListener("keydown", this.handleKeyDown);
				}
			},
			{
				key: "componentDidUpdate",
				value: function componentDidUpdate() {
					var _this$props$coordinat5, _this$props$coordinat6;
					if (this.props.active) this.updateBBox();
					if (!this.state.dismissed) return;
					if (((_this$props$coordinat5 = this.props.coordinate) === null || _this$props$coordinat5 === void 0 ? void 0 : _this$props$coordinat5.x) !== this.state.dismissedAtCoordinate.x || ((_this$props$coordinat6 = this.props.coordinate) === null || _this$props$coordinat6 === void 0 ? void 0 : _this$props$coordinat6.y) !== this.state.dismissedAtCoordinate.y) this.state.dismissed = false;
				}
			},
			{
				key: "render",
				value: function render() {
					var _this2 = this;
					var _this$props = this.props, active = _this$props.active, allowEscapeViewBox = _this$props.allowEscapeViewBox, animationDuration = _this$props.animationDuration, animationEasing = _this$props.animationEasing, children = _this$props.children, coordinate = _this$props.coordinate, hasPayload = _this$props.hasPayload, isAnimationActive = _this$props.isAnimationActive, offset = _this$props.offset, position = _this$props.position, reverseDirection = _this$props.reverseDirection, useTranslate3d = _this$props.useTranslate3d, viewBox = _this$props.viewBox, wrapperStyle = _this$props.wrapperStyle;
					var _getTooltipTranslate = getTooltipTranslate({
						allowEscapeViewBox,
						coordinate,
						offsetTopLeft: offset,
						position,
						reverseDirection,
						tooltipBox: this.state.lastBoundingBox,
						useTranslate3d,
						viewBox
					}), cssClasses = _getTooltipTranslate.cssClasses, cssProperties = _getTooltipTranslate.cssProperties;
					var outerStyle = _objectSpread$29(_objectSpread$29({ transition: isAnimationActive && active ? "transform ".concat(animationDuration, "ms ").concat(animationEasing) : void 0 }, cssProperties), {}, {
						pointerEvents: "none",
						visibility: !this.state.dismissed && active && hasPayload ? "visible" : "hidden",
						position: "absolute",
						top: 0,
						left: 0
					}, wrapperStyle);
					return /*#__PURE__*/ React.createElement("div", {
						tabIndex: -1,
						className: cssClasses,
						style: outerStyle,
						ref: function ref(node) {
							_this2.wrapperNode = node;
						}
					}, children);
				}
			}
		]);
	}(PureComponent);
}));
//#endregion
//#region node_modules/recharts/es6/util/Global.js
var parseIsSsrByDefault, Global;
var init_Global = __esmMin((() => {
	parseIsSsrByDefault = function parseIsSsrByDefault() {
		return !(typeof window !== "undefined" && window.document && window.document.createElement && window.setTimeout);
	};
	Global = {
		isSsr: parseIsSsrByDefault(),
		get: function get(key) {
			return Global[key];
		},
		set: function set(key, value) {
			if (typeof key === "string") Global[key] = value;
			else {
				var keys = Object.keys(key);
				if (keys && keys.length) keys.forEach(function(k) {
					Global[k] = key[k];
				});
			}
		}
	};
}));
//#endregion
//#region node_modules/recharts/es6/component/Tooltip.js
/**
* @fileOverview Tooltip
*/
function _typeof$34(o) {
	"@babel/helpers - typeof";
	return _typeof$34 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$34(o);
}
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r) {
			_defineProperty$32(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$14(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$14(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$33(descriptor.key), descriptor);
	}
}
function _createClass$14(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$14(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$14(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$10(t, o, e) {
	return o = _getPrototypeOf$11(o), _possibleConstructorReturn$11(t, _isNativeReflectConstruct$11() ? Reflect.construct(o, e || [], _getPrototypeOf$11(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$11(self, call) {
	if (call && (_typeof$34(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$11(self);
}
function _assertThisInitialized$11(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$11() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$11 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$11(o) {
	_getPrototypeOf$11 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$11(o);
}
function _inherits$11(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$11(subClass, superClass);
}
function _setPrototypeOf$11(o, p) {
	_setPrototypeOf$11 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$11(o, p);
}
function _defineProperty$32(obj, key, value) {
	key = _toPropertyKey$33(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$33(t) {
	var i = _toPrimitive$33(t, "string");
	return "symbol" == _typeof$34(i) ? i : i + "";
}
function _toPrimitive$33(t, r) {
	if ("object" != _typeof$34(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$34(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function defaultUniqBy(entry) {
	return entry.dataKey;
}
function renderContent(content, props) {
	if (/*#__PURE__*/ React.isValidElement(content)) return /*#__PURE__*/ React.cloneElement(content, props);
	if (typeof content === "function") return /*#__PURE__*/ React.createElement(content, props);
	return /*#__PURE__*/ React.createElement(DefaultTooltipContent, props);
}
var Tooltip;
var init_Tooltip = __esmMin((() => {
	init_DefaultTooltipContent();
	init_TooltipBoundingBox();
	init_Global();
	init_getUniqPayload();
	Tooltip = /*#__PURE__*/ function(_PureComponent) {
		function Tooltip() {
			_classCallCheck$14(this, Tooltip);
			return _callSuper$10(this, Tooltip, arguments);
		}
		_inherits$11(Tooltip, _PureComponent);
		return _createClass$14(Tooltip, [{
			key: "render",
			value: function render() {
				var _this = this;
				var _this$props = this.props, active = _this$props.active, allowEscapeViewBox = _this$props.allowEscapeViewBox, animationDuration = _this$props.animationDuration, animationEasing = _this$props.animationEasing, content = _this$props.content, coordinate = _this$props.coordinate, filterNull = _this$props.filterNull, isAnimationActive = _this$props.isAnimationActive, offset = _this$props.offset, payload = _this$props.payload, payloadUniqBy = _this$props.payloadUniqBy, position = _this$props.position, reverseDirection = _this$props.reverseDirection, useTranslate3d = _this$props.useTranslate3d, viewBox = _this$props.viewBox, wrapperStyle = _this$props.wrapperStyle;
				var finalPayload = payload !== null && payload !== void 0 ? payload : [];
				if (filterNull && finalPayload.length) finalPayload = getUniqPayload(payload.filter(function(entry) {
					return entry.value != null && (entry.hide !== true || _this.props.includeHidden);
				}), payloadUniqBy, defaultUniqBy);
				var hasPayload = finalPayload.length > 0;
				return /*#__PURE__*/ React.createElement(TooltipBoundingBox, {
					allowEscapeViewBox,
					animationDuration,
					animationEasing,
					isAnimationActive,
					active,
					coordinate,
					hasPayload,
					offset,
					position,
					reverseDirection,
					useTranslate3d,
					viewBox,
					wrapperStyle
				}, renderContent(content, _objectSpread$28(_objectSpread$28({}, this.props), {}, { payload: finalPayload })));
			}
		}]);
	}(PureComponent);
	_defineProperty$32(Tooltip, "displayName", "Tooltip");
	_defineProperty$32(Tooltip, "defaultProps", {
		accessibilityLayer: false,
		allowEscapeViewBox: {
			x: false,
			y: false
		},
		animationDuration: 400,
		animationEasing: "ease",
		contentStyle: {},
		coordinate: {
			x: 0,
			y: 0
		},
		cursor: true,
		cursorStyle: {},
		filterNull: true,
		isAnimationActive: !Global.isSsr,
		itemStyle: {},
		labelStyle: {},
		offset: 10,
		reverseDirection: {
			x: false,
			y: false
		},
		separator: " : ",
		trigger: "hover",
		useTranslate3d: false,
		viewBox: {
			x: 0,
			y: 0,
			height: 0,
			width: 0
		},
		wrapperStyle: {}
	});
}));
//#endregion
//#region node_modules/lodash-es/now.js
var now;
var init_now = __esmMin((() => {
	init__root();
	now = function() {
		return root.Date.now();
	};
}));
//#endregion
//#region node_modules/lodash-es/_trimmedEndIndex.js
/**
* Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
* character of `string`.
*
* @private
* @param {string} string The string to inspect.
* @returns {number} Returns the index of the last non-whitespace character.
*/
function trimmedEndIndex(string) {
	var index = string.length;
	while (index-- && reWhitespace.test(string.charAt(index)));
	return index;
}
var reWhitespace;
var init__trimmedEndIndex = __esmMin((() => {
	reWhitespace = /\s/;
}));
//#endregion
//#region node_modules/lodash-es/_baseTrim.js
/**
* The base implementation of `_.trim`.
*
* @private
* @param {string} string The string to trim.
* @returns {string} Returns the trimmed string.
*/
function baseTrim(string) {
	return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var reTrimStart;
var init__baseTrim = __esmMin((() => {
	init__trimmedEndIndex();
	reTrimStart = /^\s+/;
}));
//#endregion
//#region node_modules/lodash-es/toNumber.js
/**
* Converts `value` to a number.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to process.
* @returns {number} Returns the number.
* @example
*
* _.toNumber(3.2);
* // => 3.2
*
* _.toNumber(Number.MIN_VALUE);
* // => 5e-324
*
* _.toNumber(Infinity);
* // => Infinity
*
* _.toNumber('3.2');
* // => 3.2
*/
function toNumber(value) {
	if (typeof value == "number") return value;
	if (isSymbol(value)) return NAN;
	if (isObject(value)) {
		var other = typeof value.valueOf == "function" ? value.valueOf() : value;
		value = isObject(other) ? other + "" : other;
	}
	if (typeof value != "string") return value === 0 ? value : +value;
	value = baseTrim(value);
	var isBinary = reIsBinary.test(value);
	return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var NAN, reIsBadHex, reIsBinary, reIsOctal, freeParseInt;
var init_toNumber = __esmMin((() => {
	init__baseTrim();
	init_isObject();
	init_isSymbol();
	NAN = NaN;
	reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	reIsBinary = /^0b[01]+$/i;
	reIsOctal = /^0o[0-7]+$/i;
	freeParseInt = parseInt;
}));
//#endregion
//#region node_modules/lodash-es/debounce.js
/**
* Creates a debounced function that delays invoking `func` until after `wait`
* milliseconds have elapsed since the last time the debounced function was
* invoked. The debounced function comes with a `cancel` method to cancel
* delayed `func` invocations and a `flush` method to immediately invoke them.
* Provide `options` to indicate whether `func` should be invoked on the
* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
* with the last arguments provided to the debounced function. Subsequent
* calls to the debounced function return the result of the last `func`
* invocation.
*
* **Note:** If `leading` and `trailing` options are `true`, `func` is
* invoked on the trailing edge of the timeout only if the debounced function
* is invoked more than once during the `wait` timeout.
*
* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
* until to the next tick, similar to `setTimeout` with a timeout of `0`.
*
* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
* for details over the differences between `_.debounce` and `_.throttle`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to debounce.
* @param {number} [wait=0] The number of milliseconds to delay.
* @param {Object} [options={}] The options object.
* @param {boolean} [options.leading=false]
*  Specify invoking on the leading edge of the timeout.
* @param {number} [options.maxWait]
*  The maximum time `func` is allowed to be delayed before it's invoked.
* @param {boolean} [options.trailing=true]
*  Specify invoking on the trailing edge of the timeout.
* @returns {Function} Returns the new debounced function.
* @example
*
* // Avoid costly calculations while the window size is in flux.
* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
*
* // Invoke `sendMail` when clicked, debouncing subsequent calls.
* jQuery(element).on('click', _.debounce(sendMail, 300, {
*   'leading': true,
*   'trailing': false
* }));
*
* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
* var source = new EventSource('/stream');
* jQuery(source).on('message', debounced);
*
* // Cancel the trailing debounced invocation.
* jQuery(window).on('popstate', debounced.cancel);
*/
function debounce(func, wait, options) {
	var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT$1);
	wait = toNumber(wait) || 0;
	if (isObject(options)) {
		leading = !!options.leading;
		maxing = "maxWait" in options;
		maxWait = maxing ? nativeMax$1(toNumber(options.maxWait) || 0, wait) : maxWait;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	function invokeFunc(time) {
		var args = lastArgs, thisArg = lastThis;
		lastArgs = lastThis = void 0;
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		return result;
	}
	function leadingEdge(time) {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invokeFunc(time) : result;
	}
	function remainingWait(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
		return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	}
	function shouldInvoke(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
		return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	}
	function timerExpired() {
		var time = now();
		if (shouldInvoke(time)) return trailingEdge(time);
		timerId = setTimeout(timerExpired, remainingWait(time));
	}
	function trailingEdge(time) {
		timerId = void 0;
		if (trailing && lastArgs) return invokeFunc(time);
		lastArgs = lastThis = void 0;
		return result;
	}
	function cancel() {
		if (timerId !== void 0) clearTimeout(timerId);
		lastInvokeTime = 0;
		lastArgs = lastCallTime = lastThis = timerId = void 0;
	}
	function flush() {
		return timerId === void 0 ? result : trailingEdge(now());
	}
	function debounced() {
		var time = now(), isInvoking = shouldInvoke(time);
		lastArgs = arguments;
		lastThis = this;
		lastCallTime = time;
		if (isInvoking) {
			if (timerId === void 0) return leadingEdge(lastCallTime);
			if (maxing) {
				clearTimeout(timerId);
				timerId = setTimeout(timerExpired, wait);
				return invokeFunc(lastCallTime);
			}
		}
		if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
		return result;
	}
	debounced.cancel = cancel;
	debounced.flush = flush;
	return debounced;
}
var FUNC_ERROR_TEXT$1, nativeMax$1, nativeMin;
var init_debounce = __esmMin((() => {
	init_isObject();
	init_now();
	init_toNumber();
	FUNC_ERROR_TEXT$1 = "Expected a function";
	nativeMax$1 = Math.max;
	nativeMin = Math.min;
}));
//#endregion
//#region node_modules/lodash-es/throttle.js
/**
* Creates a throttled function that only invokes `func` at most once per
* every `wait` milliseconds. The throttled function comes with a `cancel`
* method to cancel delayed `func` invocations and a `flush` method to
* immediately invoke them. Provide `options` to indicate whether `func`
* should be invoked on the leading and/or trailing edge of the `wait`
* timeout. The `func` is invoked with the last arguments provided to the
* throttled function. Subsequent calls to the throttled function return the
* result of the last `func` invocation.
*
* **Note:** If `leading` and `trailing` options are `true`, `func` is
* invoked on the trailing edge of the timeout only if the throttled function
* is invoked more than once during the `wait` timeout.
*
* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
* until to the next tick, similar to `setTimeout` with a timeout of `0`.
*
* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
* for details over the differences between `_.throttle` and `_.debounce`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to throttle.
* @param {number} [wait=0] The number of milliseconds to throttle invocations to.
* @param {Object} [options={}] The options object.
* @param {boolean} [options.leading=true]
*  Specify invoking on the leading edge of the timeout.
* @param {boolean} [options.trailing=true]
*  Specify invoking on the trailing edge of the timeout.
* @returns {Function} Returns the new throttled function.
* @example
*
* // Avoid excessively updating the position while scrolling.
* jQuery(window).on('scroll', _.throttle(updatePosition, 100));
*
* // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
* var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
* jQuery(element).on('click', throttled);
*
* // Cancel the trailing throttled invocation.
* jQuery(window).on('popstate', throttled.cancel);
*/
function throttle(func, wait, options) {
	var leading = true, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
	if (isObject(options)) {
		leading = "leading" in options ? !!options.leading : leading;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	return debounce(func, wait, {
		"leading": leading,
		"maxWait": wait,
		"trailing": trailing
	});
}
var FUNC_ERROR_TEXT;
var init_throttle = __esmMin((() => {
	init_debounce();
	init_isObject();
	FUNC_ERROR_TEXT = "Expected a function";
}));
//#endregion
//#region node_modules/recharts/es6/component/ResponsiveContainer.js
function _typeof$33(o) {
	"@babel/helpers - typeof";
	return _typeof$33 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$33(o);
}
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r) {
			_defineProperty$31(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$31(obj, key, value) {
	key = _toPropertyKey$32(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$32(t) {
	var i = _toPrimitive$32(t, "string");
	return "symbol" == _typeof$33(i) ? i : i + "";
}
function _toPrimitive$32(t, r) {
	if ("object" != _typeof$33(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$33(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray$10(arr, i) {
	return _arrayWithHoles$11(arr) || _iterableToArrayLimit$10(arr, i) || _unsupportedIterableToArray$17(arr, i) || _nonIterableRest$11();
}
function _nonIterableRest$11() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$17(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$17(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$17(o, minLen);
}
function _arrayLikeToArray$17(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$10(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$11(arr) {
	if (Array.isArray(arr)) return arr;
}
var ResponsiveContainer;
var init_ResponsiveContainer = __esmMin((() => {
	init_clsx();
	init_throttle();
	init_DataUtils();
	init_LogUtils();
	init_ReactUtils();
	ResponsiveContainer = /*#__PURE__*/ forwardRef(function(_ref, ref) {
		var aspect = _ref.aspect, _ref$initialDimension = _ref.initialDimension, initialDimension = _ref$initialDimension === void 0 ? {
			width: -1,
			height: -1
		} : _ref$initialDimension, _ref$width = _ref.width, width = _ref$width === void 0 ? "100%" : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? "100%" : _ref$height, _ref$minWidth = _ref.minWidth, minWidth = _ref$minWidth === void 0 ? 0 : _ref$minWidth, minHeight = _ref.minHeight, maxHeight = _ref.maxHeight, children = _ref.children, _ref$debounce = _ref.debounce, debounce = _ref$debounce === void 0 ? 0 : _ref$debounce, id = _ref.id, className = _ref.className, onResize = _ref.onResize, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style;
		var containerRef = useRef(null);
		var onResizeRef = useRef();
		onResizeRef.current = onResize;
		useImperativeHandle(ref, function() {
			return Object.defineProperty(containerRef.current, "current", {
				get: function get() {
					console.warn("The usage of ref.current.current is deprecated and will no longer be supported.");
					return containerRef.current;
				},
				configurable: true
			});
		});
		var _useState2 = _slicedToArray$10(useState({
			containerWidth: initialDimension.width,
			containerHeight: initialDimension.height
		}), 2), sizes = _useState2[0], setSizes = _useState2[1];
		var setContainerSize = useCallback(function(newWidth, newHeight) {
			setSizes(function(prevState) {
				var roundedWidth = Math.round(newWidth);
				var roundedHeight = Math.round(newHeight);
				if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
				return {
					containerWidth: roundedWidth,
					containerHeight: roundedHeight
				};
			});
		}, []);
		useEffect(function() {
			var callback = function callback(entries) {
				var _onResizeRef$current;
				var _entries$0$contentRec = entries[0].contentRect, containerWidth = _entries$0$contentRec.width, containerHeight = _entries$0$contentRec.height;
				setContainerSize(containerWidth, containerHeight);
				(_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth, containerHeight);
			};
			if (debounce > 0) callback = throttle(callback, debounce, {
				trailing: true,
				leading: false
			});
			var observer = new ResizeObserver(callback);
			var _containerRef$current = containerRef.current.getBoundingClientRect(), containerWidth = _containerRef$current.width, containerHeight = _containerRef$current.height;
			setContainerSize(containerWidth, containerHeight);
			observer.observe(containerRef.current);
			return function() {
				observer.disconnect();
			};
		}, [setContainerSize, debounce]);
		var chartContent = useMemo(function() {
			var containerWidth = sizes.containerWidth, containerHeight = sizes.containerHeight;
			if (containerWidth < 0 || containerHeight < 0) return null;
			warn$1(isPercent(width) || isPercent(height), "The width(%s) and height(%s) are both fixed numbers,\n       maybe you don't need to use a ResponsiveContainer.", width, height);
			warn$1(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
			var calculatedWidth = isPercent(width) ? containerWidth : width;
			var calculatedHeight = isPercent(height) ? containerHeight : height;
			if (aspect && aspect > 0) {
				if (calculatedWidth) calculatedHeight = calculatedWidth / aspect;
				else if (calculatedHeight) calculatedWidth = calculatedHeight * aspect;
				if (maxHeight && calculatedHeight > maxHeight) calculatedHeight = maxHeight;
			}
			warn$1(calculatedWidth > 0 || calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
			var isCharts = !Array.isArray(children) && getDisplayName(children.type).endsWith("Chart");
			return React.Children.map(children, function(child) {
				if (/*#__PURE__*/ React.isValidElement(child)) return /*#__PURE__*/ cloneElement(child, _objectSpread$27({
					width: calculatedWidth,
					height: calculatedHeight
				}, isCharts ? { style: _objectSpread$27({
					height: "100%",
					width: "100%",
					maxHeight: calculatedHeight,
					maxWidth: calculatedWidth
				}, child.props.style) } : {}));
				return child;
			});
		}, [
			aspect,
			children,
			height,
			maxHeight,
			minHeight,
			minWidth,
			sizes,
			width
		]);
		return /*#__PURE__*/ React.createElement("div", {
			id: id ? "".concat(id) : void 0,
			className: clsx("recharts-responsive-container", className),
			style: _objectSpread$27(_objectSpread$27({}, style), {}, {
				width,
				height,
				minWidth,
				minHeight,
				maxHeight
			}),
			ref: containerRef
		}, chartContent);
	});
}));
//#endregion
//#region node_modules/recharts/es6/component/Cell.js
var Cell;
var init_Cell = __esmMin((() => {
	Cell = function Cell(_props) {
		return null;
	};
	Cell.displayName = "Cell";
}));
//#endregion
//#region node_modules/recharts/es6/util/DOMUtils.js
function _typeof$32(o) {
	"@babel/helpers - typeof";
	return _typeof$32 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$32(o);
}
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r) {
			_defineProperty$30(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$30(obj, key, value) {
	key = _toPropertyKey$31(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$31(t) {
	var i = _toPrimitive$31(t, "string");
	return "symbol" == _typeof$32(i) ? i : i + "";
}
function _toPrimitive$31(t, r) {
	if ("object" != _typeof$32(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$32(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function removeInvalidKeys(obj) {
	var copyObj = _objectSpread$26({}, obj);
	Object.keys(copyObj).forEach(function(key) {
		if (!copyObj[key]) delete copyObj[key];
	});
	return copyObj;
}
var stringCache, MAX_CACHE_NUM, SPAN_STYLE, MEASUREMENT_SPAN_ID, getStringSize, getOffset;
var init_DOMUtils = __esmMin((() => {
	init_Global();
	stringCache = {
		widthCache: {},
		cacheCount: 0
	};
	MAX_CACHE_NUM = 2e3;
	SPAN_STYLE = {
		position: "absolute",
		top: "-20000px",
		left: 0,
		padding: 0,
		margin: 0,
		border: "none",
		whiteSpace: "pre"
	};
	MEASUREMENT_SPAN_ID = "recharts_measurement_span";
	getStringSize = function getStringSize(text) {
		var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (text === void 0 || text === null || Global.isSsr) return {
			width: 0,
			height: 0
		};
		var copyStyle = removeInvalidKeys(style);
		var cacheKey = JSON.stringify({
			text,
			copyStyle
		});
		if (stringCache.widthCache[cacheKey]) return stringCache.widthCache[cacheKey];
		try {
			var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
			if (!measurementSpan) {
				measurementSpan = document.createElement("span");
				measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
				measurementSpan.setAttribute("aria-hidden", "true");
				document.body.appendChild(measurementSpan);
			}
			var measurementSpanStyle = _objectSpread$26(_objectSpread$26({}, SPAN_STYLE), copyStyle);
			Object.assign(measurementSpan.style, measurementSpanStyle);
			measurementSpan.textContent = "".concat(text);
			var rect = measurementSpan.getBoundingClientRect();
			var result = {
				width: rect.width,
				height: rect.height
			};
			stringCache.widthCache[cacheKey] = result;
			if (++stringCache.cacheCount > MAX_CACHE_NUM) {
				stringCache.cacheCount = 0;
				stringCache.widthCache = {};
			}
			return result;
		} catch (e) {
			return {
				width: 0,
				height: 0
			};
		}
	};
	getOffset = function getOffset(rect) {
		return {
			top: rect.top + window.scrollY - document.documentElement.clientTop,
			left: rect.left + window.scrollX - document.documentElement.clientLeft
		};
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/ReduceCSSCalc.js
function _typeof$31(o) {
	"@babel/helpers - typeof";
	return _typeof$31 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$31(o);
}
function _slicedToArray$9(arr, i) {
	return _arrayWithHoles$10(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$16(arr, i) || _nonIterableRest$10();
}
function _nonIterableRest$10() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$16(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$16(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$16(o, minLen);
}
function _arrayLikeToArray$16(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$9(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$10(arr) {
	if (Array.isArray(arr)) return arr;
}
function _classCallCheck$13(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$13(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$30(descriptor.key), descriptor);
	}
}
function _createClass$13(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$13(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$13(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _toPropertyKey$30(t) {
	var i = _toPrimitive$30(t, "string");
	return "symbol" == _typeof$31(i) ? i : i + "";
}
function _toPrimitive$30(t, r) {
	if ("object" != _typeof$31(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$31(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function convertToPx(value, unit) {
	return value * CONVERSION_RATES[unit];
}
function calculateArithmetic(expr) {
	if (expr.includes(STR_NAN)) return STR_NAN;
	var newExpr = expr;
	while (newExpr.includes("*") || newExpr.includes("/")) {
		var _MULTIPLY_OR_DIVIDE_R;
		var _ref4 = _slicedToArray$9((_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [], 4), leftOperand = _ref4[1], operator = _ref4[2], rightOperand = _ref4[3];
		var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
		var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
		var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
		if (result.isNaN()) return STR_NAN;
		newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
	}
	while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
		var _ADD_OR_SUBTRACT_REGE;
		var _ref6 = _slicedToArray$9((_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [], 4), _leftOperand = _ref6[1], _operator = _ref6[2], _rightOperand = _ref6[3];
		var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
		var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
		var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
		if (_result.isNaN()) return STR_NAN;
		newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
	}
	return newExpr;
}
function calculateParentheses(expr) {
	var newExpr = expr;
	while (newExpr.includes("(")) {
		var parentheticalExpression = _slicedToArray$9(PARENTHESES_REGEX.exec(newExpr), 2)[1];
		newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
	}
	return newExpr;
}
function evaluateExpression(expression) {
	var newExpr = expression.replace(/\s+/g, "");
	newExpr = calculateParentheses(newExpr);
	newExpr = calculateArithmetic(newExpr);
	return newExpr;
}
function safeEvaluateExpression(expression) {
	try {
		return evaluateExpression(expression);
	} catch (e) {
		/* istanbul ignore next */
		return STR_NAN;
	}
}
function reduceCSSCalc(expression) {
	var result = safeEvaluateExpression(expression.slice(5, -1));
	if (result === STR_NAN) return "";
	return result;
}
var MULTIPLY_OR_DIVIDE_REGEX, ADD_OR_SUBTRACT_REGEX, CSS_LENGTH_UNIT_REGEX, NUM_SPLIT_REGEX, CONVERSION_RATES, FIXED_CSS_LENGTH_UNITS, STR_NAN, DecimalCSS, PARENTHESES_REGEX;
var init_ReduceCSSCalc = __esmMin((() => {
	MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
	ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
	CSS_LENGTH_UNIT_REGEX = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/;
	NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
	CONVERSION_RATES = {
		cm: 96 / 2.54,
		mm: 96 / 25.4,
		pt: 96 / 72,
		pc: 96 / 6,
		"in": 96,
		Q: 96 / (2.54 * 40),
		px: 1
	};
	FIXED_CSS_LENGTH_UNITS = Object.keys(CONVERSION_RATES);
	STR_NAN = "NaN";
	DecimalCSS = /*#__PURE__*/ function() {
		function DecimalCSS(num, unit) {
			_classCallCheck$13(this, DecimalCSS);
			this.num = num;
			this.unit = unit;
			this.num = num;
			this.unit = unit;
			if (Number.isNaN(num)) this.unit = "";
			if (unit !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
				this.num = NaN;
				this.unit = "";
			}
			if (FIXED_CSS_LENGTH_UNITS.includes(unit)) {
				this.num = convertToPx(num, unit);
				this.unit = "px";
			}
		}
		return _createClass$13(DecimalCSS, [
			{
				key: "add",
				value: function add(other) {
					if (this.unit !== other.unit) return new DecimalCSS(NaN, "");
					return new DecimalCSS(this.num + other.num, this.unit);
				}
			},
			{
				key: "subtract",
				value: function subtract(other) {
					if (this.unit !== other.unit) return new DecimalCSS(NaN, "");
					return new DecimalCSS(this.num - other.num, this.unit);
				}
			},
			{
				key: "multiply",
				value: function multiply(other) {
					if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) return new DecimalCSS(NaN, "");
					return new DecimalCSS(this.num * other.num, this.unit || other.unit);
				}
			},
			{
				key: "divide",
				value: function divide(other) {
					if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) return new DecimalCSS(NaN, "");
					return new DecimalCSS(this.num / other.num, this.unit || other.unit);
				}
			},
			{
				key: "toString",
				value: function toString() {
					return "".concat(this.num).concat(this.unit);
				}
			},
			{
				key: "isNaN",
				value: function isNaN() {
					return Number.isNaN(this.num);
				}
			}
		], [{
			key: "parse",
			value: function parse(str) {
				var _NUM_SPLIT_REGEX$exec;
				var _ref2 = _slicedToArray$9((_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [], 3), numStr = _ref2[1], unit = _ref2[2];
				return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : "");
			}
		}]);
	}();
	PARENTHESES_REGEX = /\(([^()]*)\)/;
}));
//#endregion
//#region node_modules/recharts/es6/component/Text.js
function _extends$19() {
	_extends$19 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$19.apply(this, arguments);
}
function _objectWithoutProperties$10(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$10(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$10(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _slicedToArray$8(arr, i) {
	return _arrayWithHoles$9(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$15(arr, i) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$15(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$15(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$15(o, minLen);
}
function _arrayLikeToArray$15(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$8(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$9(arr) {
	if (Array.isArray(arr)) return arr;
}
var _excluded$10, _excluded2$3, BREAKING_SPACES, calculateWordWidths, calculateWordsByLines, getWordsWithoutCalculate, getWordsByLines, DEFAULT_FILL, Text;
var init_Text = __esmMin((() => {
	init_isNil();
	init_clsx();
	init_DataUtils();
	init_Global();
	init_ReactUtils();
	init_DOMUtils();
	init_ReduceCSSCalc();
	_excluded$10 = [
		"x",
		"y",
		"lineHeight",
		"capHeight",
		"scaleToFit",
		"textAnchor",
		"verticalAnchor",
		"fill"
	];
	_excluded2$3 = [
		"dx",
		"dy",
		"angle",
		"className",
		"breakAll"
	];
	BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
	calculateWordWidths = function calculateWordWidths(_ref) {
		var children = _ref.children, breakAll = _ref.breakAll, style = _ref.style;
		try {
			var words = [];
			if (!isNil(children)) if (breakAll) words = children.toString().split("");
			else words = children.toString().split(BREAKING_SPACES);
			return {
				wordsWithComputedWidth: words.map(function(word) {
					return {
						word,
						width: getStringSize(word, style).width
					};
				}),
				spaceWidth: breakAll ? 0 : getStringSize("\xA0", style).width
			};
		} catch (e) {
			return null;
		}
	};
	calculateWordsByLines = function calculateWordsByLines(_ref2, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) {
		var maxLines = _ref2.maxLines, children = _ref2.children, style = _ref2.style, breakAll = _ref2.breakAll;
		var shouldLimitLines = isNumber(maxLines);
		var text = children;
		var calculate = function calculate() {
			return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).reduce(function(result, _ref3) {
				var word = _ref3.word, width = _ref3.width;
				var currentLine = result[result.length - 1];
				if (currentLine && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
					currentLine.words.push(word);
					currentLine.width += width + spaceWidth;
				} else {
					var newLine = {
						words: [word],
						width
					};
					result.push(newLine);
				}
				return result;
			}, []);
		};
		var originalResult = calculate(initialWordsWithComputedWith);
		var findLongestLine = function findLongestLine(words) {
			return words.reduce(function(a, b) {
				return a.width > b.width ? a : b;
			});
		};
		if (!shouldLimitLines) return originalResult;
		var suffix = "…";
		var checkOverflow = function checkOverflow(index) {
			var words = calculateWordWidths({
				breakAll,
				style,
				children: text.slice(0, index) + suffix
			}).wordsWithComputedWidth;
			var result = calculate(words);
			return [result.length > maxLines || findLongestLine(result).width > Number(lineWidth), result];
		};
		var start = 0;
		var end = text.length - 1;
		var iterations = 0;
		var trimmedResult;
		while (start <= end && iterations <= text.length - 1) {
			var middle = Math.floor((start + end) / 2);
			var _checkOverflow2 = _slicedToArray$8(checkOverflow(middle - 1), 2), doesPrevOverflow = _checkOverflow2[0], result = _checkOverflow2[1];
			var doesMiddleOverflow = _slicedToArray$8(checkOverflow(middle), 1)[0];
			if (!doesPrevOverflow && !doesMiddleOverflow) start = middle + 1;
			if (doesPrevOverflow && doesMiddleOverflow) end = middle - 1;
			if (!doesPrevOverflow && doesMiddleOverflow) {
				trimmedResult = result;
				break;
			}
			iterations++;
		}
		return trimmedResult || originalResult;
	};
	getWordsWithoutCalculate = function getWordsWithoutCalculate(children) {
		return [{ words: !isNil(children) ? children.toString().split(BREAKING_SPACES) : [] }];
	};
	getWordsByLines = function getWordsByLines(_ref4) {
		var width = _ref4.width, scaleToFit = _ref4.scaleToFit, children = _ref4.children, style = _ref4.style, breakAll = _ref4.breakAll, maxLines = _ref4.maxLines;
		if ((width || scaleToFit) && !Global.isSsr) {
			var wordsWithComputedWidth, spaceWidth;
			var wordWidths = calculateWordWidths({
				breakAll,
				children,
				style
			});
			if (wordWidths) {
				var wcw = wordWidths.wordsWithComputedWidth, sw = wordWidths.spaceWidth;
				wordsWithComputedWidth = wcw;
				spaceWidth = sw;
			} else return getWordsWithoutCalculate(children);
			return calculateWordsByLines({
				breakAll,
				children,
				maxLines,
				style
			}, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
		}
		return getWordsWithoutCalculate(children);
	};
	DEFAULT_FILL = "#808080";
	Text = function Text(_ref5) {
		var _ref5$x = _ref5.x, propsX = _ref5$x === void 0 ? 0 : _ref5$x, _ref5$y = _ref5.y, propsY = _ref5$y === void 0 ? 0 : _ref5$y, _ref5$lineHeight = _ref5.lineHeight, lineHeight = _ref5$lineHeight === void 0 ? "1em" : _ref5$lineHeight, _ref5$capHeight = _ref5.capHeight, capHeight = _ref5$capHeight === void 0 ? "0.71em" : _ref5$capHeight, _ref5$scaleToFit = _ref5.scaleToFit, scaleToFit = _ref5$scaleToFit === void 0 ? false : _ref5$scaleToFit, _ref5$textAnchor = _ref5.textAnchor, textAnchor = _ref5$textAnchor === void 0 ? "start" : _ref5$textAnchor, _ref5$verticalAnchor = _ref5.verticalAnchor, verticalAnchor = _ref5$verticalAnchor === void 0 ? "end" : _ref5$verticalAnchor, _ref5$fill = _ref5.fill, fill = _ref5$fill === void 0 ? DEFAULT_FILL : _ref5$fill, props = _objectWithoutProperties$10(_ref5, _excluded$10);
		var wordsByLines = useMemo(function() {
			return getWordsByLines({
				breakAll: props.breakAll,
				children: props.children,
				maxLines: props.maxLines,
				scaleToFit,
				style: props.style,
				width: props.width
			});
		}, [
			props.breakAll,
			props.children,
			props.maxLines,
			scaleToFit,
			props.style,
			props.width
		]);
		var dx = props.dx, dy = props.dy, angle = props.angle, className = props.className, breakAll = props.breakAll, textProps = _objectWithoutProperties$10(props, _excluded2$3);
		if (!isNumOrStr(propsX) || !isNumOrStr(propsY)) return null;
		var x = propsX + (isNumber(dx) ? dx : 0);
		var y = propsY + (isNumber(dy) ? dy : 0);
		var startDy;
		switch (verticalAnchor) {
			case "start":
				startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
				break;
			case "middle":
				startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
				break;
			default:
				startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
				break;
		}
		var transforms = [];
		if (scaleToFit) {
			var lineWidth = wordsByLines[0].width;
			var width = props.width;
			transforms.push("scale(".concat((isNumber(width) ? width / lineWidth : 1) / lineWidth, ")"));
		}
		if (angle) transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
		if (transforms.length) textProps.transform = transforms.join(" ");
		return /*#__PURE__*/ React.createElement("text", _extends$19({}, filterProps(textProps, true), {
			x,
			y,
			className: clsx("recharts-text", className),
			textAnchor,
			fill: fill.includes("url") ? DEFAULT_FILL : fill
		}), wordsByLines.map(function(line, index) {
			var words = line.words.join(breakAll ? "" : " ");
			return /*#__PURE__*/ React.createElement("tspan", {
				x,
				dy: index === 0 ? startDy : lineHeight,
				key: "".concat(words, "-").concat(index)
			}, words);
		}));
	};
}));
//#endregion
//#region node_modules/victory-vendor/es/d3-scale.js
var d3_scale_exports = /* @__PURE__ */ __exportAll({
	scaleBand: () => band,
	scaleDiverging: () => diverging,
	scaleDivergingLog: () => divergingLog,
	scaleDivergingPow: () => divergingPow,
	scaleDivergingSqrt: () => divergingSqrt,
	scaleDivergingSymlog: () => divergingSymlog,
	scaleIdentity: () => identity$3,
	scaleImplicit: () => implicit,
	scaleLinear: () => linear,
	scaleLog: () => log,
	scaleOrdinal: () => ordinal,
	scalePoint: () => point,
	scalePow: () => pow,
	scaleQuantile: () => quantile,
	scaleQuantize: () => quantize,
	scaleRadial: () => radial,
	scaleSequential: () => sequential,
	scaleSequentialLog: () => sequentialLog,
	scaleSequentialPow: () => sequentialPow,
	scaleSequentialQuantile: () => sequentialQuantile,
	scaleSequentialSqrt: () => sequentialSqrt,
	scaleSequentialSymlog: () => sequentialSymlog,
	scaleSqrt: () => sqrt,
	scaleSymlog: () => symlog,
	scaleThreshold: () => threshold,
	scaleTime: () => time,
	scaleUtc: () => utcTime,
	tickFormat: () => tickFormat
});
var init_d3_scale = __esmMin((() => {
	init_src();
}));
//#endregion
//#region node_modules/lodash-es/_baseExtremum.js
/**
* The base implementation of methods like `_.max` and `_.min` which accepts a
* `comparator` to determine the extremum value.
*
* @private
* @param {Array} array The array to iterate over.
* @param {Function} iteratee The iteratee invoked per iteration.
* @param {Function} comparator The comparator used to compare values.
* @returns {*} Returns the extremum value.
*/
function baseExtremum(array, iteratee, comparator) {
	var index = -1, length = array.length;
	while (++index < length) {
		var value = array[index], current = iteratee(value);
		if (current != null && (computed === void 0 ? current === current && !isSymbol(current) : comparator(current, computed))) var computed = current, result = value;
	}
	return result;
}
var init__baseExtremum = __esmMin((() => {
	init_isSymbol();
}));
//#endregion
//#region node_modules/lodash-es/_baseGt.js
/**
* The base implementation of `_.gt` which doesn't coerce arguments.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if `value` is greater than `other`,
*  else `false`.
*/
function baseGt(value, other) {
	return value > other;
}
var init__baseGt = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/max.js
/**
* Computes the maximum value of `array`. If `array` is empty or falsey,
* `undefined` is returned.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Math
* @param {Array} array The array to iterate over.
* @returns {*} Returns the maximum value.
* @example
*
* _.max([4, 2, 8, 6]);
* // => 8
*
* _.max([]);
* // => undefined
*/
function max(array) {
	return array && array.length ? baseExtremum(array, identity$2, baseGt) : void 0;
}
var init_max = __esmMin((() => {
	init__baseExtremum();
	init__baseGt();
	init_identity();
}));
//#endregion
//#region node_modules/lodash-es/_baseLt.js
/**
* The base implementation of `_.lt` which doesn't coerce arguments.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if `value` is less than `other`,
*  else `false`.
*/
function baseLt(value, other) {
	return value < other;
}
var init__baseLt = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/min.js
/**
* Computes the minimum value of `array`. If `array` is empty or falsey,
* `undefined` is returned.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Math
* @param {Array} array The array to iterate over.
* @returns {*} Returns the minimum value.
* @example
*
* _.min([4, 2, 8, 6]);
* // => 2
*
* _.min([]);
* // => undefined
*/
function min(array) {
	return array && array.length ? baseExtremum(array, identity$2, baseLt) : void 0;
}
var init_min = __esmMin((() => {
	init__baseExtremum();
	init__baseLt();
	init_identity();
}));
//#endregion
//#region node_modules/lodash-es/map.js
/**
* Creates an array of values by running each element in `collection` thru
* `iteratee`. The iteratee is invoked with three arguments:
* (value, index|key, collection).
*
* Many lodash methods are guarded to work as iteratees for methods like
* `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
*
* The guarded methods are:
* `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
* `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
* `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
* `template`, `trim`, `trimEnd`, `trimStart`, and `words`
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [iteratee=_.identity] The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
* @example
*
* function square(n) {
*   return n * n;
* }
*
* _.map([4, 8], square);
* // => [16, 64]
*
* _.map({ 'a': 4, 'b': 8 }, square);
* // => [16, 64] (iteration order is not guaranteed)
*
* var users = [
*   { 'user': 'barney' },
*   { 'user': 'fred' }
* ];
*
* // The `_.property` iteratee shorthand.
* _.map(users, 'user');
* // => ['barney', 'fred']
*/
function map$1(collection, iteratee) {
	return (isArray$1(collection) ? arrayMap : baseMap)(collection, baseIteratee(iteratee, 3));
}
var init_map = __esmMin((() => {
	init__arrayMap();
	init__baseIteratee();
	init__baseMap();
	init_isArray();
}));
//#endregion
//#region node_modules/lodash-es/flatMap.js
/**
* Creates a flattened array of values by running each element in `collection`
* thru `iteratee` and flattening the mapped results. The iteratee is invoked
* with three arguments: (value, index|key, collection).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [iteratee=_.identity] The function invoked per iteration.
* @returns {Array} Returns the new flattened array.
* @example
*
* function duplicate(n) {
*   return [n, n];
* }
*
* _.flatMap([1, 2], duplicate);
* // => [1, 1, 2, 2]
*/
function flatMap(collection, iteratee) {
	return baseFlatten(map$1(collection, iteratee), 1);
}
var init_flatMap = __esmMin((() => {
	init__baseFlatten();
	init_map();
}));
//#endregion
//#region node_modules/lodash-es/isEqual.js
/**
* Performs a deep comparison between two values to determine if they are
* equivalent.
*
* **Note:** This method supports comparing arrays, array buffers, booleans,
* date objects, error objects, maps, numbers, `Object` objects, regexes,
* sets, strings, symbols, and typed arrays. `Object` objects are compared
* by their own, not inherited, enumerable properties. Functions and DOM
* nodes are compared by strict equality, i.e. `===`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.isEqual(object, other);
* // => true
*
* object === other;
* // => false
*/
function isEqual(value, other) {
	return baseIsEqual(value, other);
}
var init_isEqual = __esmMin((() => {
	init__baseIsEqual();
}));
//#endregion
//#region node_modules/decimal.js-light/decimal.js
var require_decimal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! decimal.js-light v2.5.1 https://github.com/MikeMcl/decimal.js-light/LICENCE */
	(function(globalScope) {
		"use strict";
		var MAX_DIGITS = 1e9, Decimal = {
			precision: 20,
			rounding: 4,
			toExpNeg: -7,
			toExpPos: 21,
			LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
		}, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", exponentOutOfRange = decimalError + "Exponent out of range: ", mathfloor = Math.floor, mathpow = Math.pow, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ONE, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE), P = {};
		P.absoluteValue = P.abs = function() {
			var x = new this.constructor(this);
			if (x.s) x.s = 1;
			return x;
		};
		P.comparedTo = P.cmp = function(y) {
			var i, j, xdL, ydL, x = this;
			y = new x.constructor(y);
			if (x.s !== y.s) return x.s || -y.s;
			if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;
			xdL = x.d.length;
			ydL = y.d.length;
			for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
			return xdL === ydL ? 0 : xdL > ydL ^ x.s < 0 ? 1 : -1;
		};
		P.decimalPlaces = P.dp = function() {
			var x = this, w = x.d.length - 1, dp = (w - x.e) * LOG_BASE;
			w = x.d[w];
			if (w) for (; w % 10 == 0; w /= 10) dp--;
			return dp < 0 ? 0 : dp;
		};
		P.dividedBy = P.div = function(y) {
			return divide(this, new this.constructor(y));
		};
		P.dividedToIntegerBy = P.idiv = function(y) {
			var x = this, Ctor = x.constructor;
			return round(divide(x, new Ctor(y), 0, 1), Ctor.precision);
		};
		P.equals = P.eq = function(y) {
			return !this.cmp(y);
		};
		P.exponent = function() {
			return getBase10Exponent(this);
		};
		P.greaterThan = P.gt = function(y) {
			return this.cmp(y) > 0;
		};
		P.greaterThanOrEqualTo = P.gte = function(y) {
			return this.cmp(y) >= 0;
		};
		P.isInteger = P.isint = function() {
			return this.e > this.d.length - 2;
		};
		P.isNegative = P.isneg = function() {
			return this.s < 0;
		};
		P.isPositive = P.ispos = function() {
			return this.s > 0;
		};
		P.isZero = function() {
			return this.s === 0;
		};
		P.lessThan = P.lt = function(y) {
			return this.cmp(y) < 0;
		};
		P.lessThanOrEqualTo = P.lte = function(y) {
			return this.cmp(y) < 1;
		};
		P.logarithm = P.log = function(base) {
			var r, x = this, Ctor = x.constructor, pr = Ctor.precision, wpr = pr + 5;
			if (base === void 0) base = new Ctor(10);
			else {
				base = new Ctor(base);
				if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + "NaN");
			}
			if (x.s < 1) throw Error(decimalError + (x.s ? "NaN" : "-Infinity"));
			if (x.eq(ONE)) return new Ctor(0);
			external = false;
			r = divide(ln(x, wpr), ln(base, wpr), wpr);
			external = true;
			return round(r, pr);
		};
		P.minus = P.sub = function(y) {
			var x = this;
			y = new x.constructor(y);
			return x.s == y.s ? subtract(x, y) : add(x, (y.s = -y.s, y));
		};
		P.modulo = P.mod = function(y) {
			var q, x = this, Ctor = x.constructor, pr = Ctor.precision;
			y = new Ctor(y);
			if (!y.s) throw Error(decimalError + "NaN");
			if (!x.s) return round(new Ctor(x), pr);
			external = false;
			q = divide(x, y, 0, 1).times(y);
			external = true;
			return x.minus(q);
		};
		P.naturalExponential = P.exp = function() {
			return exp(this);
		};
		P.naturalLogarithm = P.ln = function() {
			return ln(this);
		};
		P.negated = P.neg = function() {
			var x = new this.constructor(this);
			x.s = -x.s || 0;
			return x;
		};
		P.plus = P.add = function(y) {
			var x = this;
			y = new x.constructor(y);
			return x.s == y.s ? add(x, y) : subtract(x, (y.s = -y.s, y));
		};
		P.precision = P.sd = function(z) {
			var e, sd, w, x = this;
			if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
			e = getBase10Exponent(x) + 1;
			w = x.d.length - 1;
			sd = w * LOG_BASE + 1;
			w = x.d[w];
			if (w) {
				for (; w % 10 == 0; w /= 10) sd--;
				for (w = x.d[0]; w >= 10; w /= 10) sd++;
			}
			return z && e > sd ? e : sd;
		};
		P.squareRoot = P.sqrt = function() {
			var e, n, pr, r, s, t, wpr, x = this, Ctor = x.constructor;
			if (x.s < 1) {
				if (!x.s) return new Ctor(0);
				throw Error(decimalError + "NaN");
			}
			e = getBase10Exponent(x);
			external = false;
			s = Math.sqrt(+x);
			if (s == 0 || s == Infinity) {
				n = digitsToString(x.d);
				if ((n.length + e) % 2 == 0) n += "0";
				s = Math.sqrt(n);
				e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
				if (s == Infinity) n = "5e" + e;
				else {
					n = s.toExponential();
					n = n.slice(0, n.indexOf("e") + 1) + e;
				}
				r = new Ctor(n);
			} else r = new Ctor(s.toString());
			pr = Ctor.precision;
			s = wpr = pr + 3;
			for (;;) {
				t = r;
				r = t.plus(divide(x, t, wpr + 2)).times(.5);
				if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
					n = n.slice(wpr - 3, wpr + 1);
					if (s == wpr && n == "4999") {
						round(t, pr + 1, 0);
						if (t.times(t).eq(x)) {
							r = t;
							break;
						}
					} else if (n != "9999") break;
					wpr += 4;
				}
			}
			external = true;
			return round(r, pr);
		};
		P.times = P.mul = function(y) {
			var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
			if (!x.s || !y.s) return new Ctor(0);
			y.s *= x.s;
			e = x.e + y.e;
			xdL = xd.length;
			ydL = yd.length;
			if (xdL < ydL) {
				r = xd;
				xd = yd;
				yd = r;
				rL = xdL;
				xdL = ydL;
				ydL = rL;
			}
			r = [];
			rL = xdL + ydL;
			for (i = rL; i--;) r.push(0);
			for (i = ydL; --i >= 0;) {
				carry = 0;
				for (k = xdL + i; k > i;) {
					t = r[k] + yd[i] * xd[k - i - 1] + carry;
					r[k--] = t % BASE | 0;
					carry = t / BASE | 0;
				}
				r[k] = (r[k] + carry) % BASE | 0;
			}
			for (; !r[--rL];) r.pop();
			if (carry) ++e;
			else r.shift();
			y.d = r;
			y.e = e;
			return external ? round(y, Ctor.precision) : y;
		};
		P.toDecimalPlaces = P.todp = function(dp, rm) {
			var x = this, Ctor = x.constructor;
			x = new Ctor(x);
			if (dp === void 0) return x;
			checkInt32(dp, 0, MAX_DIGITS);
			if (rm === void 0) rm = Ctor.rounding;
			else checkInt32(rm, 0, 8);
			return round(x, dp + getBase10Exponent(x) + 1, rm);
		};
		P.toExponential = function(dp, rm) {
			var str, x = this, Ctor = x.constructor;
			if (dp === void 0) str = toString(x, true);
			else {
				checkInt32(dp, 0, MAX_DIGITS);
				if (rm === void 0) rm = Ctor.rounding;
				else checkInt32(rm, 0, 8);
				x = round(new Ctor(x), dp + 1, rm);
				str = toString(x, true, dp + 1);
			}
			return str;
		};
		P.toFixed = function(dp, rm) {
			var str, y, x = this, Ctor = x.constructor;
			if (dp === void 0) return toString(x);
			checkInt32(dp, 0, MAX_DIGITS);
			if (rm === void 0) rm = Ctor.rounding;
			else checkInt32(rm, 0, 8);
			y = round(new Ctor(x), dp + getBase10Exponent(x) + 1, rm);
			str = toString(y.abs(), false, dp + getBase10Exponent(y) + 1);
			return x.isneg() && !x.isZero() ? "-" + str : str;
		};
		P.toInteger = P.toint = function() {
			var x = this, Ctor = x.constructor;
			return round(new Ctor(x), getBase10Exponent(x) + 1, Ctor.rounding);
		};
		P.toNumber = function() {
			return +this;
		};
		P.toPower = P.pow = function(y) {
			var e, k, pr, r, sign, yIsInt, x = this, Ctor = x.constructor, guard = 12, yn = +(y = new Ctor(y));
			if (!y.s) return new Ctor(ONE);
			x = new Ctor(x);
			if (!x.s) {
				if (y.s < 1) throw Error(decimalError + "Infinity");
				return x;
			}
			if (x.eq(ONE)) return x;
			pr = Ctor.precision;
			if (y.eq(ONE)) return round(x, pr);
			e = y.e;
			k = y.d.length - 1;
			yIsInt = e >= k;
			sign = x.s;
			if (!yIsInt) {
				if (sign < 0) throw Error(decimalError + "NaN");
			} else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
				r = new Ctor(ONE);
				e = Math.ceil(pr / LOG_BASE + 4);
				external = false;
				for (;;) {
					if (k % 2) {
						r = r.times(x);
						truncate(r.d, e);
					}
					k = mathfloor(k / 2);
					if (k === 0) break;
					x = x.times(x);
					truncate(x.d, e);
				}
				external = true;
				return y.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
			}
			sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;
			x.s = 1;
			external = false;
			r = y.times(ln(x, pr + guard));
			external = true;
			r = exp(r);
			r.s = sign;
			return r;
		};
		P.toPrecision = function(sd, rm) {
			var e, str, x = this, Ctor = x.constructor;
			if (sd === void 0) {
				e = getBase10Exponent(x);
				str = toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
			} else {
				checkInt32(sd, 1, MAX_DIGITS);
				if (rm === void 0) rm = Ctor.rounding;
				else checkInt32(rm, 0, 8);
				x = round(new Ctor(x), sd, rm);
				e = getBase10Exponent(x);
				str = toString(x, sd <= e || e <= Ctor.toExpNeg, sd);
			}
			return str;
		};
		P.toSignificantDigits = P.tosd = function(sd, rm) {
			var x = this, Ctor = x.constructor;
			if (sd === void 0) {
				sd = Ctor.precision;
				rm = Ctor.rounding;
			} else {
				checkInt32(sd, 1, MAX_DIGITS);
				if (rm === void 0) rm = Ctor.rounding;
				else checkInt32(rm, 0, 8);
			}
			return round(new Ctor(x), sd, rm);
		};
		P.toString = P.valueOf = P.val = P.toJSON = function() {
			var x = this, e = getBase10Exponent(x), Ctor = x.constructor;
			return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
		};
		function add(x, y) {
			var carry, d, e, i, k, len, xd, yd, Ctor = x.constructor, pr = Ctor.precision;
			if (!x.s || !y.s) {
				if (!y.s) y = new Ctor(x);
				return external ? round(y, pr) : y;
			}
			xd = x.d;
			yd = y.d;
			k = x.e;
			e = y.e;
			xd = xd.slice();
			i = k - e;
			if (i) {
				if (i < 0) {
					d = xd;
					i = -i;
					len = yd.length;
				} else {
					d = yd;
					e = k;
					len = xd.length;
				}
				k = Math.ceil(pr / LOG_BASE);
				len = k > len ? k + 1 : len + 1;
				if (i > len) {
					i = len;
					d.length = 1;
				}
				d.reverse();
				for (; i--;) d.push(0);
				d.reverse();
			}
			len = xd.length;
			i = yd.length;
			if (len - i < 0) {
				i = len;
				d = yd;
				yd = xd;
				xd = d;
			}
			for (carry = 0; i;) {
				carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
				xd[i] %= BASE;
			}
			if (carry) {
				xd.unshift(carry);
				++e;
			}
			for (len = xd.length; xd[--len] == 0;) xd.pop();
			y.d = xd;
			y.e = e;
			return external ? round(y, pr) : y;
		}
		function checkInt32(i, min, max) {
			if (i !== ~~i || i < min || i > max) throw Error(invalidArgument + i);
		}
		function digitsToString(d) {
			var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
			if (indexOfLastWord > 0) {
				str += w;
				for (i = 1; i < indexOfLastWord; i++) {
					ws = d[i] + "";
					k = LOG_BASE - ws.length;
					if (k) str += getZeroString(k);
					str += ws;
				}
				w = d[i];
				ws = w + "";
				k = LOG_BASE - ws.length;
				if (k) str += getZeroString(k);
			} else if (w === 0) return "0";
			for (; w % 10 === 0;) w /= 10;
			return str + w;
		}
		var divide = (function() {
			function multiplyInteger(x, k) {
				var temp, carry = 0, i = x.length;
				for (x = x.slice(); i--;) {
					temp = x[i] * k + carry;
					x[i] = temp % BASE | 0;
					carry = temp / BASE | 0;
				}
				if (carry) x.unshift(carry);
				return x;
			}
			function compare(a, b, aL, bL) {
				var i, r;
				if (aL != bL) r = aL > bL ? 1 : -1;
				else for (i = r = 0; i < aL; i++) if (a[i] != b[i]) {
					r = a[i] > b[i] ? 1 : -1;
					break;
				}
				return r;
			}
			function subtract(a, b, aL) {
				var i = 0;
				for (; aL--;) {
					a[aL] -= i;
					i = a[aL] < b[aL] ? 1 : 0;
					a[aL] = i * BASE + a[aL] - b[aL];
				}
				for (; !a[0] && a.length > 1;) a.shift();
			}
			return function(x, y, pr, dp) {
				var cmp, e, i, k, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
				if (!x.s) return new Ctor(x);
				if (!y.s) throw Error(decimalError + "Division by zero");
				e = x.e - y.e;
				yL = yd.length;
				xL = xd.length;
				q = new Ctor(sign);
				qd = q.d = [];
				for (i = 0; yd[i] == (xd[i] || 0);) ++i;
				if (yd[i] > (xd[i] || 0)) --e;
				if (pr == null) sd = pr = Ctor.precision;
				else if (dp) sd = pr + (getBase10Exponent(x) - getBase10Exponent(y)) + 1;
				else sd = pr;
				if (sd < 0) return new Ctor(0);
				sd = sd / LOG_BASE + 2 | 0;
				i = 0;
				if (yL == 1) {
					k = 0;
					yd = yd[0];
					sd++;
					for (; (i < xL || k) && sd--; i++) {
						t = k * BASE + (xd[i] || 0);
						qd[i] = t / yd | 0;
						k = t % yd | 0;
					}
				} else {
					k = BASE / (yd[0] + 1) | 0;
					if (k > 1) {
						yd = multiplyInteger(yd, k);
						xd = multiplyInteger(xd, k);
						yL = yd.length;
						xL = xd.length;
					}
					xi = yL;
					rem = xd.slice(0, yL);
					remL = rem.length;
					for (; remL < yL;) rem[remL++] = 0;
					yz = yd.slice();
					yz.unshift(0);
					yd0 = yd[0];
					if (yd[1] >= BASE / 2) ++yd0;
					do {
						k = 0;
						cmp = compare(yd, rem, yL, remL);
						if (cmp < 0) {
							rem0 = rem[0];
							if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);
							k = rem0 / yd0 | 0;
							if (k > 1) {
								if (k >= BASE) k = BASE - 1;
								prod = multiplyInteger(yd, k);
								prodL = prod.length;
								remL = rem.length;
								cmp = compare(prod, rem, prodL, remL);
								if (cmp == 1) {
									k--;
									subtract(prod, yL < prodL ? yz : yd, prodL);
								}
							} else {
								if (k == 0) cmp = k = 1;
								prod = yd.slice();
							}
							prodL = prod.length;
							if (prodL < remL) prod.unshift(0);
							subtract(rem, prod, remL);
							if (cmp == -1) {
								remL = rem.length;
								cmp = compare(yd, rem, yL, remL);
								if (cmp < 1) {
									k++;
									subtract(rem, yL < remL ? yz : yd, remL);
								}
							}
							remL = rem.length;
						} else if (cmp === 0) {
							k++;
							rem = [0];
						}
						qd[i++] = k;
						if (cmp && rem[0]) rem[remL++] = xd[xi] || 0;
						else {
							rem = [xd[xi]];
							remL = 1;
						}
					} while ((xi++ < xL || rem[0] !== void 0) && sd--);
				}
				if (!qd[0]) qd.shift();
				q.e = e;
				return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
			};
		})();
		function exp(x, sd) {
			var denominator, guard, pow, sum, t, wpr, i = 0, k = 0, Ctor = x.constructor, pr = Ctor.precision;
			if (getBase10Exponent(x) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x));
			if (!x.s) return new Ctor(ONE);
			if (sd == null) {
				external = false;
				wpr = pr;
			} else wpr = sd;
			t = new Ctor(.03125);
			while (x.abs().gte(.1)) {
				x = x.times(t);
				k += 5;
			}
			guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
			wpr += guard;
			denominator = pow = sum = new Ctor(ONE);
			Ctor.precision = wpr;
			for (;;) {
				pow = round(pow.times(x), wpr);
				denominator = denominator.times(++i);
				t = sum.plus(divide(pow, denominator, wpr));
				if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
					while (k--) sum = round(sum.times(sum), wpr);
					Ctor.precision = pr;
					return sd == null ? (external = true, round(sum, pr)) : sum;
				}
				sum = t;
			}
		}
		function getBase10Exponent(x) {
			var e = x.e * LOG_BASE, w = x.d[0];
			for (; w >= 10; w /= 10) e++;
			return e;
		}
		function getLn10(Ctor, sd, pr) {
			if (sd > Ctor.LN10.sd()) {
				external = true;
				if (pr) Ctor.precision = pr;
				throw Error(decimalError + "LN10 precision limit exceeded");
			}
			return round(new Ctor(Ctor.LN10), sd);
		}
		function getZeroString(k) {
			var zs = "";
			for (; k--;) zs += "0";
			return zs;
		}
		function ln(y, sd) {
			var c, c0, denominator, e, numerator, sum, t, wpr, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, pr = Ctor.precision;
			if (x.s < 1) throw Error(decimalError + (x.s ? "NaN" : "-Infinity"));
			if (x.eq(ONE)) return new Ctor(0);
			if (sd == null) {
				external = false;
				wpr = pr;
			} else wpr = sd;
			if (x.eq(10)) {
				if (sd == null) external = true;
				return getLn10(Ctor, wpr);
			}
			wpr += guard;
			Ctor.precision = wpr;
			c = digitsToString(xd);
			c0 = c.charAt(0);
			e = getBase10Exponent(x);
			if (Math.abs(e) < 0x5543df729c000) {
				while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
					x = x.times(y);
					c = digitsToString(x.d);
					c0 = c.charAt(0);
					n++;
				}
				e = getBase10Exponent(x);
				if (c0 > 1) {
					x = new Ctor("0." + c);
					e++;
				} else x = new Ctor(c0 + "." + c.slice(1));
			} else {
				t = getLn10(Ctor, wpr + 2, pr).times(e + "");
				x = ln(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
				Ctor.precision = pr;
				return sd == null ? (external = true, round(x, pr)) : x;
			}
			sum = numerator = x = divide(x.minus(ONE), x.plus(ONE), wpr);
			x2 = round(x.times(x), wpr);
			denominator = 3;
			for (;;) {
				numerator = round(numerator.times(x2), wpr);
				t = sum.plus(divide(numerator, new Ctor(denominator), wpr));
				if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
					sum = sum.times(2);
					if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
					sum = divide(sum, new Ctor(n), wpr);
					Ctor.precision = pr;
					return sd == null ? (external = true, round(sum, pr)) : sum;
				}
				sum = t;
				denominator += 2;
			}
		}
		function parseDecimal(x, str) {
			var e, i, len;
			if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
			if ((i = str.search(/e/i)) > 0) {
				if (e < 0) e = i;
				e += +str.slice(i + 1);
				str = str.substring(0, i);
			} else if (e < 0) e = str.length;
			for (i = 0; str.charCodeAt(i) === 48;) ++i;
			for (len = str.length; str.charCodeAt(len - 1) === 48;) --len;
			str = str.slice(i, len);
			if (str) {
				len -= i;
				e = e - i - 1;
				x.e = mathfloor(e / LOG_BASE);
				x.d = [];
				i = (e + 1) % LOG_BASE;
				if (e < 0) i += LOG_BASE;
				if (i < len) {
					if (i) x.d.push(+str.slice(0, i));
					for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
					str = str.slice(i);
					i = LOG_BASE - str.length;
				} else i -= len;
				for (; i--;) str += "0";
				x.d.push(+str);
				if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
			} else {
				x.s = 0;
				x.e = 0;
				x.d = [0];
			}
			return x;
		}
		function round(x, sd, rm) {
			var i, j, k, n, rd, doRound, w, xdi, xd = x.d;
			for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
			i = sd - n;
			if (i < 0) {
				i += LOG_BASE;
				j = sd;
				w = xd[xdi = 0];
			} else {
				xdi = Math.ceil((i + 1) / LOG_BASE);
				k = xd.length;
				if (xdi >= k) return x;
				w = k = xd[xdi];
				for (n = 1; k >= 10; k /= 10) n++;
				i %= LOG_BASE;
				j = i - LOG_BASE + n;
			}
			if (rm !== void 0) {
				k = mathpow(10, n - j - 1);
				rd = w / k % 10 | 0;
				doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;
				doRound = rm < 4 ? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 && (i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
			}
			if (sd < 1 || !xd[0]) {
				if (doRound) {
					k = getBase10Exponent(x);
					xd.length = 1;
					sd = sd - k - 1;
					xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
					x.e = mathfloor(-sd / LOG_BASE) || 0;
				} else {
					xd.length = 1;
					xd[0] = x.e = x.s = 0;
				}
				return x;
			}
			if (i == 0) {
				xd.length = xdi;
				k = 1;
				xdi--;
			} else {
				xd.length = xdi + 1;
				k = mathpow(10, LOG_BASE - i);
				xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k : 0;
			}
			if (doRound) for (;;) if (xdi == 0) {
				if ((xd[0] += k) == BASE) {
					xd[0] = 1;
					++x.e;
				}
				break;
			} else {
				xd[xdi] += k;
				if (xd[xdi] != BASE) break;
				xd[xdi--] = 0;
				k = 1;
			}
			for (i = xd.length; xd[--i] === 0;) xd.pop();
			if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + getBase10Exponent(x));
			return x;
		}
		function subtract(x, y) {
			var d, e, i, j, k, len, xd, xe, xLTy, yd, Ctor = x.constructor, pr = Ctor.precision;
			if (!x.s || !y.s) {
				if (y.s) y.s = -y.s;
				else y = new Ctor(x);
				return external ? round(y, pr) : y;
			}
			xd = x.d;
			yd = y.d;
			e = y.e;
			xe = x.e;
			xd = xd.slice();
			k = xe - e;
			if (k) {
				xLTy = k < 0;
				if (xLTy) {
					d = xd;
					k = -k;
					len = yd.length;
				} else {
					d = yd;
					e = xe;
					len = xd.length;
				}
				i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
				if (k > i) {
					k = i;
					d.length = 1;
				}
				d.reverse();
				for (i = k; i--;) d.push(0);
				d.reverse();
			} else {
				i = xd.length;
				len = yd.length;
				xLTy = i < len;
				if (xLTy) len = i;
				for (i = 0; i < len; i++) if (xd[i] != yd[i]) {
					xLTy = xd[i] < yd[i];
					break;
				}
				k = 0;
			}
			if (xLTy) {
				d = xd;
				xd = yd;
				yd = d;
				y.s = -y.s;
			}
			len = xd.length;
			for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
			for (i = yd.length; i > k;) {
				if (xd[--i] < yd[i]) {
					for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
					--xd[j];
					xd[i] += BASE;
				}
				xd[i] -= yd[i];
			}
			for (; xd[--len] === 0;) xd.pop();
			for (; xd[0] === 0; xd.shift()) --e;
			if (!xd[0]) return new Ctor(0);
			y.d = xd;
			y.e = e;
			return external ? round(y, pr) : y;
		}
		function toString(x, isExp, sd) {
			var k, e = getBase10Exponent(x), str = digitsToString(x.d), len = str.length;
			if (isExp) {
				if (sd && (k = sd - len) > 0) str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
				else if (len > 1) str = str.charAt(0) + "." + str.slice(1);
				str = str + (e < 0 ? "e" : "e+") + e;
			} else if (e < 0) {
				str = "0." + getZeroString(-e - 1) + str;
				if (sd && (k = sd - len) > 0) str += getZeroString(k);
			} else if (e >= len) {
				str += getZeroString(e + 1 - len);
				if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
			} else {
				if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
				if (sd && (k = sd - len) > 0) {
					if (e + 1 === len) str += ".";
					str += getZeroString(k);
				}
			}
			return x.s < 0 ? "-" + str : str;
		}
		function truncate(arr, len) {
			if (arr.length > len) {
				arr.length = len;
				return true;
			}
		}
		function clone(obj) {
			var i, p, ps;
			function Decimal(value) {
				var x = this;
				if (!(x instanceof Decimal)) return new Decimal(value);
				x.constructor = Decimal;
				if (value instanceof Decimal) {
					x.s = value.s;
					x.e = value.e;
					x.d = (value = value.d) ? value.slice() : value;
					return;
				}
				if (typeof value === "number") {
					if (value * 0 !== 0) throw Error(invalidArgument + value);
					if (value > 0) x.s = 1;
					else if (value < 0) {
						value = -value;
						x.s = -1;
					} else {
						x.s = 0;
						x.e = 0;
						x.d = [0];
						return;
					}
					if (value === ~~value && value < 1e7) {
						x.e = 0;
						x.d = [value];
						return;
					}
					return parseDecimal(x, value.toString());
				} else if (typeof value !== "string") throw Error(invalidArgument + value);
				if (value.charCodeAt(0) === 45) {
					value = value.slice(1);
					x.s = -1;
				} else x.s = 1;
				if (isDecimal.test(value)) parseDecimal(x, value);
				else throw Error(invalidArgument + value);
			}
			Decimal.prototype = P;
			Decimal.ROUND_UP = 0;
			Decimal.ROUND_DOWN = 1;
			Decimal.ROUND_CEIL = 2;
			Decimal.ROUND_FLOOR = 3;
			Decimal.ROUND_HALF_UP = 4;
			Decimal.ROUND_HALF_DOWN = 5;
			Decimal.ROUND_HALF_EVEN = 6;
			Decimal.ROUND_HALF_CEIL = 7;
			Decimal.ROUND_HALF_FLOOR = 8;
			Decimal.clone = clone;
			Decimal.config = Decimal.set = config;
			if (obj === void 0) obj = {};
			if (obj) {
				ps = [
					"precision",
					"rounding",
					"toExpNeg",
					"toExpPos",
					"LN10"
				];
				for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
			}
			Decimal.config(obj);
			return Decimal;
		}
		function config(obj) {
			if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
			var i, p, v, ps = [
				"precision",
				1,
				MAX_DIGITS,
				"rounding",
				0,
				8,
				"toExpNeg",
				-Infinity,
				0,
				"toExpPos",
				0,
				Infinity
			];
			for (i = 0; i < ps.length; i += 3) if ((v = obj[p = ps[i]]) !== void 0) if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
			else throw Error(invalidArgument + p + ": " + v);
			if ((v = obj[p = "LN10"]) !== void 0) if (v == Math.LN10) this[p] = new this(v);
			else throw Error(invalidArgument + p + ": " + v);
			return this;
		}
		Decimal = clone(Decimal);
		Decimal["default"] = Decimal.Decimal = Decimal;
		ONE = new Decimal(1);
		if (typeof define == "function" && define.amd) define(function() {
			return Decimal;
		});
		else if (typeof module != "undefined" && module.exports) module.exports = Decimal;
		else {
			if (!globalScope) globalScope = typeof self != "undefined" && self && self.self == self ? self : Function("return this")();
			globalScope.Decimal = Decimal;
		}
	})(exports);
}));
//#endregion
//#region node_modules/recharts-scale/es6/util/utils.js
function _toConsumableArray$9(arr) {
	return _arrayWithoutHoles$9(arr) || _iterableToArray$10(arr) || _unsupportedIterableToArray$14(arr) || _nonIterableSpread$9();
}
function _nonIterableSpread$9() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$14(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$14(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$14(o, minLen);
}
function _iterableToArray$10(iter) {
	if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles$9(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$14(arr);
}
function _arrayLikeToArray$14(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
var identity$1, PLACE_HOLDER, isPlaceHolder, curry0, curryN, curry, range$1, map, compose, reverse, memoize;
var init_utils = __esmMin((() => {
	identity$1 = function identity(i) {
		return i;
	};
	PLACE_HOLDER = { "@@functional/placeholder": true };
	isPlaceHolder = function isPlaceHolder(val) {
		return val === PLACE_HOLDER;
	};
	curry0 = function curry0(fn) {
		return function _curried() {
			if (arguments.length === 0 || arguments.length === 1 && isPlaceHolder(arguments.length <= 0 ? void 0 : arguments[0])) return _curried;
			return fn.apply(void 0, arguments);
		};
	};
	curryN = function curryN(n, fn) {
		if (n === 1) return fn;
		return curry0(function() {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			var argsLength = args.filter(function(arg) {
				return arg !== PLACE_HOLDER;
			}).length;
			if (argsLength >= n) return fn.apply(void 0, args);
			return curryN(n - argsLength, curry0(function() {
				for (var _len2 = arguments.length, restArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) restArgs[_key2] = arguments[_key2];
				var newArgs = args.map(function(arg) {
					return isPlaceHolder(arg) ? restArgs.shift() : arg;
				});
				return fn.apply(void 0, _toConsumableArray$9(newArgs).concat(restArgs));
			}));
		});
	};
	curry = function curry(fn) {
		return curryN(fn.length, fn);
	};
	range$1 = function range(begin, end) {
		var arr = [];
		for (var i = begin; i < end; ++i) arr[i - begin] = i;
		return arr;
	};
	map = curry(function(fn, arr) {
		if (Array.isArray(arr)) return arr.map(fn);
		return Object.keys(arr).map(function(key) {
			return arr[key];
		}).map(fn);
	});
	compose = function compose() {
		for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
		if (!args.length) return identity$1;
		var fns = args.reverse();
		var firstFn = fns[0];
		var tailsFn = fns.slice(1);
		return function() {
			return tailsFn.reduce(function(res, fn) {
				return fn(res);
			}, firstFn.apply(void 0, arguments));
		};
	};
	reverse = function reverse(arr) {
		if (Array.isArray(arr)) return arr.reverse();
		return arr.split("").reverse.join("");
	};
	memoize = function memoize(fn) {
		var lastArgs = null;
		var lastResult = null;
		return function() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			if (lastArgs && args.every(function(val, i) {
				return val === lastArgs[i];
			})) return lastResult;
			lastArgs = args;
			lastResult = fn.apply(void 0, args);
			return lastResult;
		};
	};
}));
//#endregion
//#region node_modules/recharts-scale/es6/util/arithmetic.js
/**
* 获取数值的位数
* 其中绝对值属于区间[0.1, 1)， 得到的值为0
* 绝对值属于区间[0.01, 0.1)，得到的位数为 -1
* 绝对值属于区间[0.001, 0.01)，得到的位数为 -2
*
* @param  {Number} value 数值
* @return {Integer} 位数
*/
function getDigitCount(value) {
	var result;
	if (value === 0) result = 1;
	else result = Math.floor(new import_decimal$1.default(value).abs().log(10).toNumber()) + 1;
	return result;
}
/**
* 按照固定的步长获取[start, end)这个区间的数据
* 并且需要处理js计算精度的问题
*
* @param  {Decimal} start 起点
* @param  {Decimal} end   终点，不包含该值
* @param  {Decimal} step  步长
* @return {Array}         若干数值
*/
function rangeStep(start, end, step) {
	var num = new import_decimal$1.default(start);
	var i = 0;
	var result = [];
	while (num.lt(end) && i < 1e5) {
		result.push(num.toNumber());
		num = num.add(step);
		i++;
	}
	return result;
}
var import_decimal$1, interpolateNumber, uninterpolateNumber, uninterpolateTruncation, arithmetic_default;
var init_arithmetic = __esmMin((() => {
	import_decimal$1 = /* @__PURE__ */ __toESM(require_decimal());
	init_utils();
	interpolateNumber = curry(function(a, b, t) {
		var newA = +a;
		return newA + t * (+b - newA);
	});
	uninterpolateNumber = curry(function(a, b, x) {
		var diff = b - +a;
		diff = diff || Infinity;
		return (x - a) / diff;
	});
	uninterpolateTruncation = curry(function(a, b, x) {
		var diff = b - +a;
		diff = diff || Infinity;
		return Math.max(0, Math.min(1, (x - a) / diff));
	});
	arithmetic_default = {
		rangeStep,
		getDigitCount,
		interpolateNumber,
		uninterpolateNumber,
		uninterpolateTruncation
	};
}));
//#endregion
//#region node_modules/recharts-scale/es6/getNiceTickValues.js
function _toConsumableArray$8(arr) {
	return _arrayWithoutHoles$8(arr) || _iterableToArray$9(arr) || _unsupportedIterableToArray$13(arr) || _nonIterableSpread$8();
}
function _nonIterableSpread$8() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$9(iter) {
	if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles$8(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$13(arr);
}
function _slicedToArray$7(arr, i) {
	return _arrayWithHoles$8(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$13(arr, i) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$13(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$13(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$13(o, minLen);
}
function _arrayLikeToArray$13(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$7(arr, i) {
	if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	var _arr = [];
	var _n = true;
	var _d = false;
	var _e = void 0;
	try {
		for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i["return"] != null) _i["return"]();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _arrayWithHoles$8(arr) {
	if (Array.isArray(arr)) return arr;
}
/**
* Calculate a interval of a minimum value and a maximum value
*
* @param  {Number} min       The minimum value
* @param  {Number} max       The maximum value
* @return {Array} An interval
*/
function getValidInterval(_ref) {
	var _ref2 = _slicedToArray$7(_ref, 2), min = _ref2[0], max = _ref2[1];
	var validMin = min, validMax = max;
	if (min > max) {
		validMin = max;
		validMax = min;
	}
	return [validMin, validMax];
}
/**
* Calculate the step which is easy to understand between ticks, like 10, 20, 25
*
* @param  {Decimal} roughStep        The rough step calculated by deviding the
* difference by the tickCount
* @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
* @param  {Integer} correctionFactor A correction factor
* @return {Decimal} The step which is easy to understand between two ticks
*/
function getFormatStep(roughStep, allowDecimals, correctionFactor) {
	if (roughStep.lte(0)) return new import_decimal.default(0);
	var digitCount = arithmetic_default.getDigitCount(roughStep.toNumber());
	var digitCountValue = new import_decimal.default(10).pow(digitCount);
	var stepRatio = roughStep.div(digitCountValue);
	var stepRatioScale = digitCount !== 1 ? .05 : .1;
	var formatStep = new import_decimal.default(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale).mul(digitCountValue);
	return allowDecimals ? formatStep : new import_decimal.default(Math.ceil(formatStep));
}
/**
* calculate the ticks when the minimum value equals to the maximum value
*
* @param  {Number}  value         The minimum valuue which is also the maximum value
* @param  {Integer} tickCount     The count of ticks
* @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
* @return {Array}                 ticks
*/
function getTickOfSingleValue(value, tickCount, allowDecimals) {
	var step = 1;
	var middle = new import_decimal.default(value);
	if (!middle.isint() && allowDecimals) {
		var absVal = Math.abs(value);
		if (absVal < 1) {
			step = new import_decimal.default(10).pow(arithmetic_default.getDigitCount(value) - 1);
			middle = new import_decimal.default(Math.floor(middle.div(step).toNumber())).mul(step);
		} else if (absVal > 1) middle = new import_decimal.default(Math.floor(value));
	} else if (value === 0) middle = new import_decimal.default(Math.floor((tickCount - 1) / 2));
	else if (!allowDecimals) middle = new import_decimal.default(Math.floor(value));
	var middleIndex = Math.floor((tickCount - 1) / 2);
	return compose(map(function(n) {
		return middle.add(new import_decimal.default(n - middleIndex).mul(step)).toNumber();
	}), range$1)(0, tickCount);
}
/**
* Calculate the step
*
* @param  {Number}  min              The minimum value of an interval
* @param  {Number}  max              The maximum value of an interval
* @param  {Integer} tickCount        The count of ticks
* @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
* @param  {Number}  correctionFactor A correction factor
* @return {Object}  The step, minimum value of ticks, maximum value of ticks
*/
function calculateStep(min, max, tickCount, allowDecimals) {
	var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
	if (!Number.isFinite((max - min) / (tickCount - 1))) return {
		step: new import_decimal.default(0),
		tickMin: new import_decimal.default(0),
		tickMax: new import_decimal.default(0)
	};
	var step = getFormatStep(new import_decimal.default(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);
	var middle;
	if (min <= 0 && max >= 0) middle = new import_decimal.default(0);
	else {
		middle = new import_decimal.default(min).add(max).div(2);
		middle = middle.sub(new import_decimal.default(middle).mod(step));
	}
	var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
	var upCount = Math.ceil(new import_decimal.default(max).sub(middle).div(step).toNumber());
	var scaleCount = belowCount + upCount + 1;
	if (scaleCount > tickCount) return calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1);
	if (scaleCount < tickCount) {
		upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
		belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
	}
	return {
		step,
		tickMin: middle.sub(new import_decimal.default(belowCount).mul(step)),
		tickMax: middle.add(new import_decimal.default(upCount).mul(step))
	};
}
/**
* Calculate the ticks of an interval, the count of ticks will be guraranteed
*
* @param  {Number}  min, max      min: The minimum value, max: The maximum value
* @param  {Integer} tickCount     The count of ticks
* @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
* @return {Array}   ticks
*/
function getNiceTickValuesFn(_ref3) {
	var _ref4 = _slicedToArray$7(_ref3, 2), min = _ref4[0], max = _ref4[1];
	var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var count = Math.max(tickCount, 2);
	var _getValidInterval2 = _slicedToArray$7(getValidInterval([min, max]), 2), cormin = _getValidInterval2[0], cormax = _getValidInterval2[1];
	if (cormin === -Infinity || cormax === Infinity) {
		var _values = cormax === Infinity ? [cormin].concat(_toConsumableArray$8(range$1(0, tickCount - 1).map(function() {
			return Infinity;
		}))) : [].concat(_toConsumableArray$8(range$1(0, tickCount - 1).map(function() {
			return -Infinity;
		})), [cormax]);
		return min > max ? reverse(_values) : _values;
	}
	if (cormin === cormax) return getTickOfSingleValue(cormin, tickCount, allowDecimals);
	var _calculateStep = calculateStep(cormin, cormax, count, allowDecimals), step = _calculateStep.step, tickMin = _calculateStep.tickMin, tickMax = _calculateStep.tickMax;
	var values = arithmetic_default.rangeStep(tickMin, tickMax.add(new import_decimal.default(.1).mul(step)), step);
	return min > max ? reverse(values) : values;
}
/**
* Calculate the ticks of an interval, the count of ticks won't be guraranteed
*
* @param  {Number}  min, max      min: The minimum value, max: The maximum value
* @param  {Integer} tickCount     The count of ticks
* @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
* @return {Array}   ticks
*/
function getTickValuesFn(_ref5) {
	var _ref6 = _slicedToArray$7(_ref5, 2), min = _ref6[0], max = _ref6[1];
	var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var count = Math.max(tickCount, 2);
	var _getValidInterval4 = _slicedToArray$7(getValidInterval([min, max]), 2), cormin = _getValidInterval4[0], cormax = _getValidInterval4[1];
	if (cormin === -Infinity || cormax === Infinity) return [min, max];
	if (cormin === cormax) return getTickOfSingleValue(cormin, tickCount, allowDecimals);
	var step = getFormatStep(new import_decimal.default(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
	var values = compose(map(function(n) {
		return new import_decimal.default(cormin).add(new import_decimal.default(n).mul(step)).toNumber();
	}), range$1)(0, count).filter(function(entry) {
		return entry >= cormin && entry <= cormax;
	});
	return min > max ? reverse(values) : values;
}
/**
* Calculate the ticks of an interval, the count of ticks won't be guraranteed,
* but the domain will be guaranteed
*
* @param  {Number}  min, max      min: The minimum value, max: The maximum value
* @param  {Integer} tickCount     The count of ticks
* @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
* @return {Array}   ticks
*/
function getTickValuesFixedDomainFn(_ref7, tickCount) {
	var _ref8 = _slicedToArray$7(_ref7, 2), min = _ref8[0], max = _ref8[1];
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var _getValidInterval6 = _slicedToArray$7(getValidInterval([min, max]), 2), cormin = _getValidInterval6[0], cormax = _getValidInterval6[1];
	if (cormin === -Infinity || cormax === Infinity) return [min, max];
	if (cormin === cormax) return [cormin];
	var count = Math.max(tickCount, 2);
	var step = getFormatStep(new import_decimal.default(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
	var values = [].concat(_toConsumableArray$8(arithmetic_default.rangeStep(new import_decimal.default(cormin), new import_decimal.default(cormax).sub(new import_decimal.default(.99).mul(step)), step)), [cormax]);
	return min > max ? reverse(values) : values;
}
var import_decimal, getNiceTickValues, getTickValuesFixedDomain;
var init_getNiceTickValues = __esmMin((() => {
	import_decimal = /* @__PURE__ */ __toESM(require_decimal());
	init_utils();
	init_arithmetic();
	getNiceTickValues = memoize(getNiceTickValuesFn);
	memoize(getTickValuesFn);
	getTickValuesFixedDomain = memoize(getTickValuesFixedDomainFn);
}));
//#endregion
//#region node_modules/recharts-scale/es6/index.js
var init_es6$2 = __esmMin((() => {
	init_getNiceTickValues();
}));
//#endregion
//#region node_modules/tiny-invariant/dist/esm/tiny-invariant.js
function invariant(condition, message) {
	if (condition) return;
	throw new Error(prefix);
}
var prefix;
var init_tiny_invariant = __esmMin((() => {
	prefix = "Invariant failed";
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/ErrorBar.js
/**
* @fileOverview Render a group of error bar
*/
function _typeof$30(o) {
	"@babel/helpers - typeof";
	return _typeof$30 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$30(o);
}
function _extends$18() {
	_extends$18 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$18.apply(this, arguments);
}
function _slicedToArray$6(arr, i) {
	return _arrayWithHoles$7(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$12(arr, i) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$12(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$12(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$12(o, minLen);
}
function _arrayLikeToArray$12(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$6(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$7(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$9(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$9(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$9(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _classCallCheck$12(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$12(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$29(descriptor.key), descriptor);
	}
}
function _createClass$12(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$12(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$12(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$9(t, o, e) {
	return o = _getPrototypeOf$10(o), _possibleConstructorReturn$10(t, _isNativeReflectConstruct$10() ? Reflect.construct(o, e || [], _getPrototypeOf$10(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$10(self, call) {
	if (call && (_typeof$30(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$10(self);
}
function _assertThisInitialized$10(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$10() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$10 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$10(o) {
	_getPrototypeOf$10 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$10(o);
}
function _inherits$10(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$10(subClass, superClass);
}
function _setPrototypeOf$10(o, p) {
	_setPrototypeOf$10 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$10(o, p);
}
function _defineProperty$29(obj, key, value) {
	key = _toPropertyKey$29(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$29(t) {
	var i = _toPrimitive$29(t, "string");
	return "symbol" == _typeof$30(i) ? i : i + "";
}
function _toPrimitive$29(t, r) {
	if ("object" != _typeof$30(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$30(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var _excluded$9, ErrorBar;
var init_ErrorBar = __esmMin((() => {
	init_tiny_invariant();
	init_Layer();
	init_ReactUtils();
	_excluded$9 = [
		"offset",
		"layout",
		"width",
		"dataKey",
		"data",
		"dataPointFormatter",
		"xAxis",
		"yAxis"
	];
	ErrorBar = /*#__PURE__*/ function(_React$Component) {
		function ErrorBar() {
			_classCallCheck$12(this, ErrorBar);
			return _callSuper$9(this, ErrorBar, arguments);
		}
		_inherits$10(ErrorBar, _React$Component);
		return _createClass$12(ErrorBar, [{
			key: "render",
			value: function render() {
				var _this$props = this.props, offset = _this$props.offset, layout = _this$props.layout, width = _this$props.width, dataKey = _this$props.dataKey, data = _this$props.data, dataPointFormatter = _this$props.dataPointFormatter, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis;
				var svgProps = filterProps(_objectWithoutProperties$9(_this$props, _excluded$9), false);
				this.props.direction === "x" && xAxis.type !== "number" && invariant(false);
				var errorBars = data.map(function(entry) {
					var _dataPointFormatter = dataPointFormatter(entry, dataKey), x = _dataPointFormatter.x, y = _dataPointFormatter.y, value = _dataPointFormatter.value, errorVal = _dataPointFormatter.errorVal;
					if (!errorVal) return null;
					var lineCoordinates = [];
					var lowBound, highBound;
					if (Array.isArray(errorVal)) {
						var _errorVal = _slicedToArray$6(errorVal, 2);
						lowBound = _errorVal[0];
						highBound = _errorVal[1];
					} else lowBound = highBound = errorVal;
					if (layout === "vertical") {
						var scale = xAxis.scale;
						var yMid = y + offset;
						var yMin = yMid + width;
						var yMax = yMid - width;
						var xMin = scale(value - lowBound);
						var xMax = scale(value + highBound);
						lineCoordinates.push({
							x1: xMax,
							y1: yMin,
							x2: xMax,
							y2: yMax
						});
						lineCoordinates.push({
							x1: xMin,
							y1: yMid,
							x2: xMax,
							y2: yMid
						});
						lineCoordinates.push({
							x1: xMin,
							y1: yMin,
							x2: xMin,
							y2: yMax
						});
					} else if (layout === "horizontal") {
						var _scale = yAxis.scale;
						var xMid = x + offset;
						var _xMin = xMid - width;
						var _xMax = xMid + width;
						var _yMin = _scale(value - lowBound);
						var _yMax = _scale(value + highBound);
						lineCoordinates.push({
							x1: _xMin,
							y1: _yMax,
							x2: _xMax,
							y2: _yMax
						});
						lineCoordinates.push({
							x1: xMid,
							y1: _yMin,
							x2: xMid,
							y2: _yMax
						});
						lineCoordinates.push({
							x1: _xMin,
							y1: _yMin,
							x2: _xMax,
							y2: _yMin
						});
					}
					return /*#__PURE__*/ React.createElement(Layer, _extends$18({
						className: "recharts-errorBar",
						key: "bar-".concat(lineCoordinates.map(function(c) {
							return "".concat(c.x1, "-").concat(c.x2, "-").concat(c.y1, "-").concat(c.y2);
						}))
					}, svgProps), lineCoordinates.map(function(coordinates) {
						return /*#__PURE__*/ React.createElement("line", _extends$18({}, coordinates, { key: "line-".concat(coordinates.x1, "-").concat(coordinates.x2, "-").concat(coordinates.y1, "-").concat(coordinates.y2) }));
					}));
				});
				return /*#__PURE__*/ React.createElement(Layer, { className: "recharts-errorBars" }, errorBars);
			}
		}]);
	}(React.Component);
	_defineProperty$29(ErrorBar, "defaultProps", {
		stroke: "black",
		strokeWidth: 1.5,
		width: 5,
		offset: 0,
		layout: "horizontal"
	});
	_defineProperty$29(ErrorBar, "displayName", "ErrorBar");
}));
//#endregion
//#region node_modules/recharts/es6/util/getLegendProps.js
function _typeof$29(o) {
	"@babel/helpers - typeof";
	return _typeof$29 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$29(o);
}
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r) {
			_defineProperty$28(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$28(obj, key, value) {
	key = _toPropertyKey$28(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$28(t) {
	var i = _toPrimitive$28(t, "string");
	return "symbol" == _typeof$29(i) ? i : i + "";
}
function _toPrimitive$28(t, r) {
	if ("object" != _typeof$29(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$29(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getLegendProps;
var init_getLegendProps = __esmMin((() => {
	init_Legend();
	init_ChartUtils();
	init_ReactUtils();
	getLegendProps = function getLegendProps(_ref) {
		var children = _ref.children, formattedGraphicalItems = _ref.formattedGraphicalItems, legendWidth = _ref.legendWidth, legendContent = _ref.legendContent;
		var legendItem = findChildByType(children, Legend);
		if (!legendItem) return null;
		var legendDefaultProps = Legend.defaultProps;
		var legendProps = legendDefaultProps !== void 0 ? _objectSpread$25(_objectSpread$25({}, legendDefaultProps), legendItem.props) : {};
		var legendData;
		if (legendItem.props && legendItem.props.payload) legendData = legendItem.props && legendItem.props.payload;
		else if (legendContent === "children") legendData = (formattedGraphicalItems || []).reduce(function(result, _ref2) {
			var item = _ref2.item, props = _ref2.props;
			var data = props.sectors || props.data || [];
			return result.concat(data.map(function(entry) {
				return {
					type: legendItem.props.iconType || item.props.legendType,
					value: entry.name,
					color: entry.fill,
					payload: entry
				};
			}));
		}, []);
		else legendData = (formattedGraphicalItems || []).map(function(_ref3) {
			var item = _ref3.item;
			var itemDefaultProps = item.type.defaultProps;
			var itemProps = itemDefaultProps !== void 0 ? _objectSpread$25(_objectSpread$25({}, itemDefaultProps), item.props) : {};
			var dataKey = itemProps.dataKey, name = itemProps.name, legendType = itemProps.legendType;
			return {
				inactive: itemProps.hide,
				dataKey,
				type: legendProps.iconType || legendType || "square",
				color: getMainColorOfGraphicItem(item),
				value: name || dataKey,
				payload: itemProps
			};
		});
		return _objectSpread$25(_objectSpread$25(_objectSpread$25({}, legendProps), Legend.getWithHeight(legendItem, legendWidth)), {}, {
			payload: legendData,
			item: legendItem
		});
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/ChartUtils.js
function _typeof$28(o) {
	"@babel/helpers - typeof";
	return _typeof$28 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$28(o);
}
function _toConsumableArray$7(arr) {
	return _arrayWithoutHoles$7(arr) || _iterableToArray$8(arr) || _unsupportedIterableToArray$11(arr) || _nonIterableSpread$7();
}
function _nonIterableSpread$7() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$11(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$11(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$11(o, minLen);
}
function _iterableToArray$8(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$7(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$11(arr);
}
function _arrayLikeToArray$11(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r) {
			_defineProperty$27(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$27(obj, key, value) {
	key = _toPropertyKey$27(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$27(t) {
	var i = _toPrimitive$27(t, "string");
	return "symbol" == _typeof$28(i) ? i : i + "";
}
function _toPrimitive$27(t, r) {
	if ("object" != _typeof$28(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$28(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
	if (isNil(obj) || isNil(dataKey)) return defaultValue;
	if (isNumOrStr(dataKey)) return get(obj, dataKey, defaultValue);
	if (isFunction(dataKey)) return dataKey(obj);
	return defaultValue;
}
/**
* Get domain of data by key.
* @param  {Array}   data      The data displayed in the chart
* @param  {String}  key       The unique key of a group of data
* @param  {String}  type      The type of axis
* @param  {Boolean} filterNil Whether or not filter nil values
* @return {Array} Domain of data
*/
function getDomainOfDataByKey(data, key, type, filterNil) {
	var flattenData = flatMap(data, function(entry) {
		return getValueByDataKey(entry, key);
	});
	if (type === "number") {
		var domain = flattenData.filter(function(entry) {
			return isNumber(entry) || parseFloat(entry);
		});
		return domain.length ? [min(domain), max(domain)] : [Infinity, -Infinity];
	}
	return (filterNil ? flattenData.filter(function(entry) {
		return !isNil(entry);
	}) : flattenData).map(function(entry) {
		return isNumOrStr(entry) || entry instanceof Date ? entry : "";
	});
}
var calculateActiveTickIndex, getMainColorOfGraphicItem, getBarSizeList, getBarPosition, appendOffsetOfLegend, isErrorBarRelevantForAxis, getDomainOfErrorBars, parseErrorBarsOfAxis, getDomainOfItemsWithSameAxis, isCategoricalAxis, getTicksOfAxis, handlerWeakMap, combineEventHandlers, parseScale, EPS, checkDomainOfScale, findPositionOfBar, truncateByDomain, offsetSign, offsetPositive, STACK_OFFSET_MAP, getStackedData, getStackGroupsByAxisId, getTicksOfScale, getCateCoordinateOfBar, getBaseValueOfBar, getStackedDataOfItem, getDomainOfSingle, getDomainOfStackGroups, MIN_VALUE_REG, MAX_VALUE_REG, parseSpecifiedDomain, getBandSizeOfAxis, parseDomainOfCategoryAxis, getTooltipItem;
var init_ChartUtils = __esmMin((() => {
	init_d3_scale();
	init_d3_shape();
	init_max();
	init_min();
	init_isNil();
	init_isFunction();
	init_isString();
	init_get();
	init_flatMap();
	init_isNaN();
	init_upperFirst();
	init_isEqual();
	init_sortBy();
	init_es6$2();
	init_ErrorBar();
	init_DataUtils();
	init_ReactUtils();
	init_getLegendProps();
	calculateActiveTickIndex = function calculateActiveTickIndex(coordinate) {
		var _ticks$length;
		var ticks = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
		var unsortedTicks = arguments.length > 2 ? arguments[2] : void 0;
		var axis = arguments.length > 3 ? arguments[3] : void 0;
		var index = -1;
		var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
		if (len <= 1) return 0;
		if (axis && axis.axisType === "angleAxis" && Math.abs(Math.abs(axis.range[1] - axis.range[0]) - 360) <= 1e-6) {
			var range = axis.range;
			for (var i = 0; i < len; i++) {
				var before = i > 0 ? unsortedTicks[i - 1].coordinate : unsortedTicks[len - 1].coordinate;
				var cur = unsortedTicks[i].coordinate;
				var after = i >= len - 1 ? unsortedTicks[0].coordinate : unsortedTicks[i + 1].coordinate;
				var sameDirectionCoord = void 0;
				if (mathSign(cur - before) !== mathSign(after - cur)) {
					var diffInterval = [];
					if (mathSign(after - cur) === mathSign(range[1] - range[0])) {
						sameDirectionCoord = after;
						var curInRange = cur + range[1] - range[0];
						diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
						diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
					} else {
						sameDirectionCoord = before;
						var afterInRange = after + range[1] - range[0];
						diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
						diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
					}
					var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
					if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
						index = unsortedTicks[i].index;
						break;
					}
				} else {
					var minValue = Math.min(before, after);
					var maxValue = Math.max(before, after);
					if (coordinate > (minValue + cur) / 2 && coordinate <= (maxValue + cur) / 2) {
						index = unsortedTicks[i].index;
						break;
					}
				}
			}
		} else for (var _i = 0; _i < len; _i++) if (_i === 0 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i > 0 && _i < len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i === len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2) {
			index = ticks[_i].index;
			break;
		}
		return index;
	};
	getMainColorOfGraphicItem = function getMainColorOfGraphicItem(item) {
		var _item$type;
		var displayName = item.type.displayName;
		var defaultedProps = (_item$type = item.type) !== null && _item$type !== void 0 && _item$type.defaultProps ? _objectSpread$24(_objectSpread$24({}, item.type.defaultProps), item.props) : item.props;
		var stroke = defaultedProps.stroke, fill = defaultedProps.fill;
		var result;
		switch (displayName) {
			case "Line":
				result = stroke;
				break;
			case "Area":
			case "Radar":
				result = stroke && stroke !== "none" ? stroke : fill;
				break;
			default:
				result = fill;
				break;
		}
		return result;
	};
	getBarSizeList = function getBarSizeList(_ref2) {
		var globalSize = _ref2.barSize, totalSize = _ref2.totalSize, _ref2$stackGroups = _ref2.stackGroups, stackGroups = _ref2$stackGroups === void 0 ? {} : _ref2$stackGroups;
		if (!stackGroups) return {};
		var result = {};
		var numericAxisIds = Object.keys(stackGroups);
		for (var i = 0, len = numericAxisIds.length; i < len; i++) {
			var sgs = stackGroups[numericAxisIds[i]].stackGroups;
			var stackIds = Object.keys(sgs);
			for (var j = 0, sLen = stackIds.length; j < sLen; j++) {
				var _sgs$stackIds$j = sgs[stackIds[j]], items = _sgs$stackIds$j.items, cateAxisId = _sgs$stackIds$j.cateAxisId;
				var barItems = items.filter(function(item) {
					return getDisplayName(item.type).indexOf("Bar") >= 0;
				});
				if (barItems && barItems.length) {
					var barItemDefaultProps = barItems[0].type.defaultProps;
					var barItemProps = barItemDefaultProps !== void 0 ? _objectSpread$24(_objectSpread$24({}, barItemDefaultProps), barItems[0].props) : barItems[0].props;
					var selfSize = barItemProps.barSize;
					var cateId = barItemProps[cateAxisId];
					if (!result[cateId]) result[cateId] = [];
					var barSize = isNil(selfSize) ? globalSize : selfSize;
					result[cateId].push({
						item: barItems[0],
						stackList: barItems.slice(1),
						barSize: isNil(barSize) ? void 0 : getPercentValue(barSize, totalSize, 0)
					});
				}
			}
		}
		return result;
	};
	getBarPosition = function getBarPosition(_ref3) {
		var barGap = _ref3.barGap, barCategoryGap = _ref3.barCategoryGap, bandSize = _ref3.bandSize, _ref3$sizeList = _ref3.sizeList, sizeList = _ref3$sizeList === void 0 ? [] : _ref3$sizeList, maxBarSize = _ref3.maxBarSize;
		var len = sizeList.length;
		if (len < 1) return null;
		var realBarGap = getPercentValue(barGap, bandSize, 0, true);
		var result;
		var initialValue = [];
		if (sizeList[0].barSize === +sizeList[0].barSize) {
			var useFull = false;
			var fullBarSize = bandSize / len;
			var sum = sizeList.reduce(function(res, entry) {
				return res + entry.barSize || 0;
			}, 0);
			sum += (len - 1) * realBarGap;
			if (sum >= bandSize) {
				sum -= (len - 1) * realBarGap;
				realBarGap = 0;
			}
			if (sum >= bandSize && fullBarSize > 0) {
				useFull = true;
				fullBarSize *= .9;
				sum = len * fullBarSize;
			}
			var prev = {
				offset: ((bandSize - sum) / 2 >> 0) - realBarGap,
				size: 0
			};
			result = sizeList.reduce(function(res, entry) {
				var newPosition = {
					item: entry.item,
					position: {
						offset: prev.offset + prev.size + realBarGap,
						size: useFull ? fullBarSize : entry.barSize
					}
				};
				var newRes = [].concat(_toConsumableArray$7(res), [newPosition]);
				prev = newRes[newRes.length - 1].position;
				if (entry.stackList && entry.stackList.length) entry.stackList.forEach(function(item) {
					newRes.push({
						item,
						position: prev
					});
				});
				return newRes;
			}, initialValue);
		} else {
			var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
			if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) realBarGap = 0;
			var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
			if (originalSize > 1) originalSize >>= 0;
			var size = maxBarSize === +maxBarSize ? Math.min(originalSize, maxBarSize) : originalSize;
			result = sizeList.reduce(function(res, entry, i) {
				var newRes = [].concat(_toConsumableArray$7(res), [{
					item: entry.item,
					position: {
						offset: _offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
						size
					}
				}]);
				if (entry.stackList && entry.stackList.length) entry.stackList.forEach(function(item) {
					newRes.push({
						item,
						position: newRes[newRes.length - 1].position
					});
				});
				return newRes;
			}, initialValue);
		}
		return result;
	};
	appendOffsetOfLegend = function appendOffsetOfLegend(offset, _unused, props, legendBox) {
		var children = props.children, width = props.width, margin = props.margin;
		var legendProps = getLegendProps({
			children,
			legendWidth: width - (margin.left || 0) - (margin.right || 0)
		});
		if (legendProps) {
			var _ref4 = legendBox || {}, boxWidth = _ref4.width, boxHeight = _ref4.height;
			var align = legendProps.align, verticalAlign = legendProps.verticalAlign, layout = legendProps.layout;
			if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) return _objectSpread$24(_objectSpread$24({}, offset), {}, _defineProperty$27({}, align, offset[align] + (boxWidth || 0)));
			if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) return _objectSpread$24(_objectSpread$24({}, offset), {}, _defineProperty$27({}, verticalAlign, offset[verticalAlign] + (boxHeight || 0)));
		}
		return offset;
	};
	isErrorBarRelevantForAxis = function isErrorBarRelevantForAxis(layout, axisType, direction) {
		if (isNil(axisType)) return true;
		if (layout === "horizontal") return axisType === "yAxis";
		if (layout === "vertical") return axisType === "xAxis";
		if (direction === "x") return axisType === "xAxis";
		if (direction === "y") return axisType === "yAxis";
		return true;
	};
	getDomainOfErrorBars = function getDomainOfErrorBars(data, item, dataKey, layout, axisType) {
		var children = item.props.children;
		var errorBars = findAllByType(children, ErrorBar).filter(function(errorBarChild) {
			return isErrorBarRelevantForAxis(layout, axisType, errorBarChild.props.direction);
		});
		if (errorBars && errorBars.length) {
			var keys = errorBars.map(function(errorBarChild) {
				return errorBarChild.props.dataKey;
			});
			return data.reduce(function(result, entry) {
				var entryValue = getValueByDataKey(entry, dataKey);
				if (isNil(entryValue)) return result;
				var mainValue = Array.isArray(entryValue) ? [min(entryValue), max(entryValue)] : [entryValue, entryValue];
				var errorDomain = keys.reduce(function(prevErrorArr, k) {
					var errorValue = getValueByDataKey(entry, k, 0);
					var lowerValue = mainValue[0] - Math.abs(Array.isArray(errorValue) ? errorValue[0] : errorValue);
					var upperValue = mainValue[1] + Math.abs(Array.isArray(errorValue) ? errorValue[1] : errorValue);
					return [Math.min(lowerValue, prevErrorArr[0]), Math.max(upperValue, prevErrorArr[1])];
				}, [Infinity, -Infinity]);
				return [Math.min(errorDomain[0], result[0]), Math.max(errorDomain[1], result[1])];
			}, [Infinity, -Infinity]);
		}
		return null;
	};
	parseErrorBarsOfAxis = function parseErrorBarsOfAxis(data, items, dataKey, axisType, layout) {
		var domains = items.map(function(item) {
			return getDomainOfErrorBars(data, item, dataKey, layout, axisType);
		}).filter(function(entry) {
			return !isNil(entry);
		});
		if (domains && domains.length) return domains.reduce(function(result, entry) {
			return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
		}, [Infinity, -Infinity]);
		return null;
	};
	getDomainOfItemsWithSameAxis = function getDomainOfItemsWithSameAxis(data, items, type, layout, filterNil) {
		var domains = items.map(function(item) {
			var dataKey = item.props.dataKey;
			if (type === "number" && dataKey) return getDomainOfErrorBars(data, item, dataKey, layout) || getDomainOfDataByKey(data, dataKey, type, filterNil);
			return getDomainOfDataByKey(data, dataKey, type, filterNil);
		});
		if (type === "number") return domains.reduce(function(result, entry) {
			return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
		}, [Infinity, -Infinity]);
		var tag = {};
		return domains.reduce(function(result, entry) {
			for (var i = 0, len = entry.length; i < len; i++) if (!tag[entry[i]]) {
				tag[entry[i]] = true;
				result.push(entry[i]);
			}
			return result;
		}, []);
	};
	isCategoricalAxis = function isCategoricalAxis(layout, axisType) {
		return layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
	};
	getTicksOfAxis = function getTicksOfAxis(axis, isGrid, isAll) {
		if (!axis) return null;
		var scale = axis.scale;
		var duplicateDomain = axis.duplicateDomain, type = axis.type, range = axis.range;
		var offsetForBand = axis.realScaleType === "scaleBand" ? scale.bandwidth() / 2 : 2;
		var offset = (isGrid || isAll) && type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
		offset = axis.axisType === "angleAxis" && (range === null || range === void 0 ? void 0 : range.length) >= 2 ? mathSign(range[0] - range[1]) * 2 * offset : offset;
		if (isGrid && (axis.ticks || axis.niceTicks)) return (axis.ticks || axis.niceTicks).map(function(entry) {
			return {
				coordinate: scale(duplicateDomain ? duplicateDomain.indexOf(entry) : entry) + offset,
				value: entry,
				offset
			};
		}).filter(function(row) {
			return !isNaN(row.coordinate);
		});
		if (axis.isCategorical && axis.categoricalDomain) return axis.categoricalDomain.map(function(entry, index) {
			return {
				coordinate: scale(entry) + offset,
				value: entry,
				index,
				offset
			};
		});
		if (scale.ticks && !isAll) return scale.ticks(axis.tickCount).map(function(entry) {
			return {
				coordinate: scale(entry) + offset,
				value: entry,
				offset
			};
		});
		return scale.domain().map(function(entry, index) {
			return {
				coordinate: scale(entry) + offset,
				value: duplicateDomain ? duplicateDomain[entry] : entry,
				index,
				offset
			};
		});
	};
	handlerWeakMap = /* @__PURE__ */ new WeakMap();
	combineEventHandlers = function combineEventHandlers(defaultHandler, childHandler) {
		if (typeof childHandler !== "function") return defaultHandler;
		if (!handlerWeakMap.has(defaultHandler)) handlerWeakMap.set(defaultHandler, /* @__PURE__ */ new WeakMap());
		var childWeakMap = handlerWeakMap.get(defaultHandler);
		if (childWeakMap.has(childHandler)) return childWeakMap.get(childHandler);
		var combineHandler = function combineHandler() {
			defaultHandler.apply(void 0, arguments);
			childHandler.apply(void 0, arguments);
		};
		childWeakMap.set(childHandler, combineHandler);
		return combineHandler;
	};
	parseScale = function parseScale(axis, chartType, hasBar) {
		var scale = axis.scale, type = axis.type, layout = axis.layout, axisType = axis.axisType;
		if (scale === "auto") {
			if (layout === "radial" && axisType === "radiusAxis") return {
				scale: band(),
				realScaleType: "band"
			};
			if (layout === "radial" && axisType === "angleAxis") return {
				scale: linear(),
				realScaleType: "linear"
			};
			if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) return {
				scale: point(),
				realScaleType: "point"
			};
			if (type === "category") return {
				scale: band(),
				realScaleType: "band"
			};
			return {
				scale: linear(),
				realScaleType: "linear"
			};
		}
		if (isString(scale)) {
			var name = "scale".concat(upperFirst(scale));
			return {
				scale: (d3_scale_exports[name] || point)(),
				realScaleType: d3_scale_exports[name] ? name : "point"
			};
		}
		return isFunction(scale) ? { scale } : {
			scale: point(),
			realScaleType: "point"
		};
	};
	EPS = 1e-4;
	checkDomainOfScale = function checkDomainOfScale(scale) {
		var domain = scale.domain();
		if (!domain || domain.length <= 2) return;
		var len = domain.length;
		var range = scale.range();
		var minValue = Math.min(range[0], range[1]) - EPS;
		var maxValue = Math.max(range[0], range[1]) + EPS;
		var first = scale(domain[0]);
		var last = scale(domain[len - 1]);
		if (first < minValue || first > maxValue || last < minValue || last > maxValue) scale.domain([domain[0], domain[len - 1]]);
	};
	findPositionOfBar = function findPositionOfBar(barPosition, child) {
		if (!barPosition) return null;
		for (var i = 0, len = barPosition.length; i < len; i++) if (barPosition[i].item === child) return barPosition[i].position;
		return null;
	};
	truncateByDomain = function truncateByDomain(value, domain) {
		if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) return value;
		var minValue = Math.min(domain[0], domain[1]);
		var maxValue = Math.max(domain[0], domain[1]);
		var result = [value[0], value[1]];
		if (!isNumber(value[0]) || value[0] < minValue) result[0] = minValue;
		if (!isNumber(value[1]) || value[1] > maxValue) result[1] = maxValue;
		if (result[0] > maxValue) result[0] = maxValue;
		if (result[1] < minValue) result[1] = minValue;
		return result;
	};
	offsetSign = function offsetSign(series) {
		var n = series.length;
		if (n <= 0) return;
		for (var j = 0, m = series[0].length; j < m; ++j) {
			var positive = 0;
			var negative = 0;
			for (var i = 0; i < n; ++i) {
				var value = isNaN(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
				if (value >= 0) {
					series[i][j][0] = positive;
					series[i][j][1] = positive + value;
					positive = series[i][j][1];
				} else {
					series[i][j][0] = negative;
					series[i][j][1] = negative + value;
					negative = series[i][j][1];
				}
			}
		}
	};
	offsetPositive = function offsetPositive(series) {
		var n = series.length;
		if (n <= 0) return;
		for (var j = 0, m = series[0].length; j < m; ++j) {
			var positive = 0;
			for (var i = 0; i < n; ++i) {
				var value = isNaN(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
				if (value >= 0) {
					series[i][j][0] = positive;
					series[i][j][1] = positive + value;
					positive = series[i][j][1];
				} else {
					series[i][j][0] = 0;
					series[i][j][1] = 0;
				}
			}
		}
	};
	STACK_OFFSET_MAP = {
		sign: offsetSign,
		expand: expand_default,
		none: none_default,
		silhouette: silhouette_default,
		wiggle: wiggle_default,
		positive: offsetPositive
	};
	getStackedData = function getStackedData(data, stackItems, offsetType) {
		var dataKeys = stackItems.map(function(item) {
			return item.props.dataKey;
		});
		var offsetAccessor = STACK_OFFSET_MAP[offsetType];
		return stack_default().keys(dataKeys).value(function(d, key) {
			return +getValueByDataKey(d, key, 0);
		}).order(none_default$1).offset(offsetAccessor)(data);
	};
	getStackGroupsByAxisId = function getStackGroupsByAxisId(data, _items, numericAxisId, cateAxisId, offsetType, reverseStackOrder) {
		if (!data) return null;
		var stackGroups = (reverseStackOrder ? _items.reverse() : _items).reduce(function(result, item) {
			var _item$type2;
			var defaultedProps = (_item$type2 = item.type) !== null && _item$type2 !== void 0 && _item$type2.defaultProps ? _objectSpread$24(_objectSpread$24({}, item.type.defaultProps), item.props) : item.props;
			var stackId = defaultedProps.stackId;
			if (defaultedProps.hide) return result;
			var axisId = defaultedProps[numericAxisId];
			var parentGroup = result[axisId] || {
				hasStack: false,
				stackGroups: {}
			};
			if (isNumOrStr(stackId)) {
				var childGroup = parentGroup.stackGroups[stackId] || {
					numericAxisId,
					cateAxisId,
					items: []
				};
				childGroup.items.push(item);
				parentGroup.hasStack = true;
				parentGroup.stackGroups[stackId] = childGroup;
			} else parentGroup.stackGroups[uniqueId("_stackId_")] = {
				numericAxisId,
				cateAxisId,
				items: [item]
			};
			return _objectSpread$24(_objectSpread$24({}, result), {}, _defineProperty$27({}, axisId, parentGroup));
		}, {});
		return Object.keys(stackGroups).reduce(function(result, axisId) {
			var group = stackGroups[axisId];
			if (group.hasStack) group.stackGroups = Object.keys(group.stackGroups).reduce(function(res, stackId) {
				var g = group.stackGroups[stackId];
				return _objectSpread$24(_objectSpread$24({}, res), {}, _defineProperty$27({}, stackId, {
					numericAxisId,
					cateAxisId,
					items: g.items,
					stackedData: getStackedData(data, g.items, offsetType)
				}));
			}, {});
			return _objectSpread$24(_objectSpread$24({}, result), {}, _defineProperty$27({}, axisId, group));
		}, {});
	};
	getTicksOfScale = function getTicksOfScale(scale, opts) {
		var realScaleType = opts.realScaleType, type = opts.type, tickCount = opts.tickCount, originalDomain = opts.originalDomain, allowDecimals = opts.allowDecimals;
		var scaleType = realScaleType || opts.scale;
		if (scaleType !== "auto" && scaleType !== "linear") return null;
		if (tickCount && type === "number" && originalDomain && (originalDomain[0] === "auto" || originalDomain[1] === "auto")) {
			var domain = scale.domain();
			if (!domain.length) return null;
			var tickValues = getNiceTickValues(domain, tickCount, allowDecimals);
			scale.domain([min(tickValues), max(tickValues)]);
			return { niceTicks: tickValues };
		}
		if (tickCount && type === "number") return { niceTicks: getTickValuesFixedDomain(scale.domain(), tickCount, allowDecimals) };
		return null;
	};
	getCateCoordinateOfBar = function getCateCoordinateOfBar(_ref6) {
		var axis = _ref6.axis, ticks = _ref6.ticks, offset = _ref6.offset, bandSize = _ref6.bandSize, entry = _ref6.entry, index = _ref6.index;
		if (axis.type === "category") return ticks[index] ? ticks[index].coordinate + offset : null;
		var value = getValueByDataKey(entry, axis.dataKey, axis.domain[index]);
		return !isNil(value) ? axis.scale(value) - bandSize / 2 + offset : null;
	};
	getBaseValueOfBar = function getBaseValueOfBar(_ref7) {
		var numericAxis = _ref7.numericAxis;
		var domain = numericAxis.scale.domain();
		if (numericAxis.type === "number") {
			var minValue = Math.min(domain[0], domain[1]);
			var maxValue = Math.max(domain[0], domain[1]);
			if (minValue <= 0 && maxValue >= 0) return 0;
			if (maxValue < 0) return maxValue;
			return minValue;
		}
		return domain[0];
	};
	getStackedDataOfItem = function getStackedDataOfItem(item, stackGroups) {
		var _item$type3;
		var stackId = ((_item$type3 = item.type) !== null && _item$type3 !== void 0 && _item$type3.defaultProps ? _objectSpread$24(_objectSpread$24({}, item.type.defaultProps), item.props) : item.props).stackId;
		if (isNumOrStr(stackId)) {
			var group = stackGroups[stackId];
			if (group) {
				var itemIndex = group.items.indexOf(item);
				return itemIndex >= 0 ? group.stackedData[itemIndex] : null;
			}
		}
		return null;
	};
	getDomainOfSingle = function getDomainOfSingle(data) {
		return data.reduce(function(result, entry) {
			return [min(entry.concat([result[0]]).filter(isNumber)), max(entry.concat([result[1]]).filter(isNumber))];
		}, [Infinity, -Infinity]);
	};
	getDomainOfStackGroups = function getDomainOfStackGroups(stackGroups, startIndex, endIndex) {
		return Object.keys(stackGroups).reduce(function(result, stackId) {
			var domain = stackGroups[stackId].stackedData.reduce(function(res, entry) {
				var s = getDomainOfSingle(entry.slice(startIndex, endIndex + 1));
				return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
			}, [Infinity, -Infinity]);
			return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
		}, [Infinity, -Infinity]).map(function(result) {
			return result === Infinity || result === -Infinity ? 0 : result;
		});
	};
	MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
	MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
	parseSpecifiedDomain = function parseSpecifiedDomain(specifiedDomain, dataDomain, allowDataOverflow) {
		if (isFunction(specifiedDomain)) return specifiedDomain(dataDomain, allowDataOverflow);
		if (!Array.isArray(specifiedDomain)) return dataDomain;
		var domain = [];
		if (isNumber(specifiedDomain[0])) domain[0] = allowDataOverflow ? specifiedDomain[0] : Math.min(specifiedDomain[0], dataDomain[0]);
		else if (MIN_VALUE_REG.test(specifiedDomain[0])) {
			var value = +MIN_VALUE_REG.exec(specifiedDomain[0])[1];
			domain[0] = dataDomain[0] - value;
		} else if (isFunction(specifiedDomain[0])) domain[0] = specifiedDomain[0](dataDomain[0]);
		else domain[0] = dataDomain[0];
		if (isNumber(specifiedDomain[1])) domain[1] = allowDataOverflow ? specifiedDomain[1] : Math.max(specifiedDomain[1], dataDomain[1]);
		else if (MAX_VALUE_REG.test(specifiedDomain[1])) {
			var _value = +MAX_VALUE_REG.exec(specifiedDomain[1])[1];
			domain[1] = dataDomain[1] + _value;
		} else if (isFunction(specifiedDomain[1])) domain[1] = specifiedDomain[1](dataDomain[1]);
		else domain[1] = dataDomain[1];
		return domain;
	};
	getBandSizeOfAxis = function getBandSizeOfAxis(axis, ticks, isBar) {
		if (axis && axis.scale && axis.scale.bandwidth) {
			var bandWidth = axis.scale.bandwidth();
			if (!isBar || bandWidth > 0) return bandWidth;
		}
		if (axis && ticks && ticks.length >= 2) {
			var orderedTicks = sortBy(ticks, function(o) {
				return o.coordinate;
			});
			var bandSize = Infinity;
			for (var i = 1, len = orderedTicks.length; i < len; i++) {
				var cur = orderedTicks[i];
				var prev = orderedTicks[i - 1];
				bandSize = Math.min((cur.coordinate || 0) - (prev.coordinate || 0), bandSize);
			}
			return bandSize === Infinity ? 0 : bandSize;
		}
		return isBar ? void 0 : 0;
	};
	parseDomainOfCategoryAxis = function parseDomainOfCategoryAxis(specifiedDomain, calculatedDomain, axisChild) {
		if (!specifiedDomain || !specifiedDomain.length) return calculatedDomain;
		if (isEqual(specifiedDomain, get(axisChild, "type.defaultProps.domain"))) return calculatedDomain;
		return specifiedDomain;
	};
	getTooltipItem = function getTooltipItem(graphicalItem, payload) {
		var defaultedProps = graphicalItem.type.defaultProps ? _objectSpread$24(_objectSpread$24({}, graphicalItem.type.defaultProps), graphicalItem.props) : graphicalItem.props;
		var dataKey = defaultedProps.dataKey, name = defaultedProps.name, unit = defaultedProps.unit, formatter = defaultedProps.formatter, tooltipType = defaultedProps.tooltipType, chartType = defaultedProps.chartType, hide = defaultedProps.hide;
		return _objectSpread$24(_objectSpread$24({}, filterProps(graphicalItem, false)), {}, {
			dataKey,
			unit,
			formatter,
			name: name || dataKey,
			color: getMainColorOfGraphicItem(graphicalItem),
			value: getValueByDataKey(payload, dataKey),
			type: tooltipType,
			payload,
			chartType,
			hide
		});
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/PolarUtils.js
function _typeof$27(o) {
	"@babel/helpers - typeof";
	return _typeof$27 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$27(o);
}
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r) {
			_defineProperty$26(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$26(obj, key, value) {
	key = _toPropertyKey$26(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$26(t) {
	var i = _toPrimitive$26(t, "string");
	return "symbol" == _typeof$27(i) ? i : i + "";
}
function _toPrimitive$26(t, r) {
	if ("object" != _typeof$27(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$27(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var RADIAN, radianToDegree, polarToCartesian, distanceBetweenPoints, getAngleOfPoint, formatAngleOfSector, reverseFormatAngleOfSetor, inRangeOfSector;
var init_PolarUtils = __esmMin((() => {
	RADIAN = Math.PI / 180;
	radianToDegree = function radianToDegree(angleInRadian) {
		return angleInRadian * 180 / Math.PI;
	};
	polarToCartesian = function polarToCartesian(cx, cy, radius, angle) {
		return {
			x: cx + Math.cos(-RADIAN * angle) * radius,
			y: cy + Math.sin(-RADIAN * angle) * radius
		};
	};
	distanceBetweenPoints = function distanceBetweenPoints(point, anotherPoint) {
		var x1 = point.x, y1 = point.y;
		var x2 = anotherPoint.x, y2 = anotherPoint.y;
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	};
	getAngleOfPoint = function getAngleOfPoint(_ref, _ref2) {
		var x = _ref.x, y = _ref.y;
		var cx = _ref2.cx, cy = _ref2.cy;
		var radius = distanceBetweenPoints({
			x,
			y
		}, {
			x: cx,
			y: cy
		});
		if (radius <= 0) return { radius };
		var cos = (x - cx) / radius;
		var angleInRadian = Math.acos(cos);
		if (y > cy) angleInRadian = 2 * Math.PI - angleInRadian;
		return {
			radius,
			angle: radianToDegree(angleInRadian),
			angleInRadian
		};
	};
	formatAngleOfSector = function formatAngleOfSector(_ref3) {
		var startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
		var startCnt = Math.floor(startAngle / 360);
		var endCnt = Math.floor(endAngle / 360);
		var min = Math.min(startCnt, endCnt);
		return {
			startAngle: startAngle - min * 360,
			endAngle: endAngle - min * 360
		};
	};
	reverseFormatAngleOfSetor = function reverseFormatAngleOfSetor(angle, _ref4) {
		var startAngle = _ref4.startAngle, endAngle = _ref4.endAngle;
		var startCnt = Math.floor(startAngle / 360);
		var endCnt = Math.floor(endAngle / 360);
		return angle + Math.min(startCnt, endCnt) * 360;
	};
	inRangeOfSector = function inRangeOfSector(_ref5, sector) {
		var x = _ref5.x, y = _ref5.y;
		var _getAngleOfPoint = getAngleOfPoint({
			x,
			y
		}, sector), radius = _getAngleOfPoint.radius, angle = _getAngleOfPoint.angle;
		var innerRadius = sector.innerRadius, outerRadius = sector.outerRadius;
		if (radius < innerRadius || radius > outerRadius) return false;
		if (radius === 0) return true;
		var _formatAngleOfSector = formatAngleOfSector(sector), startAngle = _formatAngleOfSector.startAngle, endAngle = _formatAngleOfSector.endAngle;
		var formatAngle = angle;
		var inRange;
		if (startAngle <= endAngle) {
			while (formatAngle > endAngle) formatAngle -= 360;
			while (formatAngle < startAngle) formatAngle += 360;
			inRange = formatAngle >= startAngle && formatAngle <= endAngle;
		} else {
			while (formatAngle > startAngle) formatAngle -= 360;
			while (formatAngle < endAngle) formatAngle += 360;
			inRange = formatAngle >= endAngle && formatAngle <= startAngle;
		}
		if (inRange) return _objectSpread$23(_objectSpread$23({}, sector), {}, {
			radius,
			angle: reverseFormatAngleOfSetor(formatAngle, sector)
		});
		return null;
	};
}));
//#endregion
//#region node_modules/recharts/es6/component/Label.js
function _typeof$26(o) {
	"@babel/helpers - typeof";
	return _typeof$26 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$26(o);
}
function _toConsumableArray$6(arr) {
	return _arrayWithoutHoles$6(arr) || _iterableToArray$7(arr) || _unsupportedIterableToArray$10(arr) || _nonIterableSpread$6();
}
function _nonIterableSpread$6() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$10(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$10(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$10(o, minLen);
}
function _iterableToArray$7(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$6(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$10(arr);
}
function _arrayLikeToArray$10(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _objectWithoutProperties$8(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$8(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$8(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r) {
			_defineProperty$25(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$25(obj, key, value) {
	key = _toPropertyKey$25(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$25(t) {
	var i = _toPrimitive$25(t, "string");
	return "symbol" == _typeof$26(i) ? i : i + "";
}
function _toPrimitive$25(t, r) {
	if ("object" != _typeof$26(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$26(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$17() {
	_extends$17 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$17.apply(this, arguments);
}
function Label(_ref4) {
	var _ref4$offset = _ref4.offset, offset = _ref4$offset === void 0 ? 5 : _ref4$offset, restProps = _objectWithoutProperties$8(_ref4, _excluded$8);
	var props = _objectSpread$22({ offset }, restProps);
	var viewBox = props.viewBox, position = props.position, value = props.value, children = props.children, content = props.content, _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, textBreakAll = props.textBreakAll;
	if (!viewBox || isNil(value) && isNil(children) && !/*#__PURE__*/ isValidElement(content) && !isFunction(content)) return null;
	if (/*#__PURE__*/ isValidElement(content)) return /*#__PURE__*/ cloneElement(content, props);
	var label;
	if (isFunction(content)) {
		label = /*#__PURE__*/ createElement(content, props);
		if (/*#__PURE__*/ isValidElement(label)) return label;
	} else label = getLabel(props);
	var isPolarLabel = isPolar(viewBox);
	var attrs = filterProps(props, true);
	if (isPolarLabel && (position === "insideStart" || position === "insideEnd" || position === "end")) return renderRadialLabel(props, label, attrs);
	var positionAttrs = isPolarLabel ? getAttrsOfPolarLabel(props) : getAttrsOfCartesianLabel(props);
	return /*#__PURE__*/ React.createElement(Text, _extends$17({ className: clsx("recharts-label", className) }, attrs, positionAttrs, { breakAll: textBreakAll }), label);
}
var _excluded$8, getLabel, getDeltaAngle$1, renderRadialLabel, getAttrsOfPolarLabel, getAttrsOfCartesianLabel, isPolar, parseViewBox, parseLabel, renderCallByParent$1;
var init_Label = __esmMin((() => {
	init_isNil();
	init_isFunction();
	init_isObject();
	init_clsx();
	init_Text();
	init_ReactUtils();
	init_DataUtils();
	init_PolarUtils();
	_excluded$8 = ["offset"];
	getLabel = function getLabel(props) {
		var value = props.value, formatter = props.formatter;
		var label = isNil(props.children) ? value : props.children;
		if (isFunction(formatter)) return formatter(label);
		return label;
	};
	getDeltaAngle$1 = function getDeltaAngle(startAngle, endAngle) {
		return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 360);
	};
	renderRadialLabel = function renderRadialLabel(labelProps, label, attrs) {
		var position = labelProps.position, viewBox = labelProps.viewBox, offset = labelProps.offset, className = labelProps.className;
		var _ref = viewBox, cx = _ref.cx, cy = _ref.cy, innerRadius = _ref.innerRadius, outerRadius = _ref.outerRadius, startAngle = _ref.startAngle, endAngle = _ref.endAngle, clockWise = _ref.clockWise;
		var radius = (innerRadius + outerRadius) / 2;
		var deltaAngle = getDeltaAngle$1(startAngle, endAngle);
		var sign = deltaAngle >= 0 ? 1 : -1;
		var labelAngle, direction;
		if (position === "insideStart") {
			labelAngle = startAngle + sign * offset;
			direction = clockWise;
		} else if (position === "insideEnd") {
			labelAngle = endAngle - sign * offset;
			direction = !clockWise;
		} else if (position === "end") {
			labelAngle = endAngle + sign * offset;
			direction = clockWise;
		}
		direction = deltaAngle <= 0 ? direction : !direction;
		var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
		var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
		var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
		var id = isNil(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
		return /*#__PURE__*/ React.createElement("text", _extends$17({}, attrs, {
			dominantBaseline: "central",
			className: clsx("recharts-radial-bar-label", className)
		}), /*#__PURE__*/ React.createElement("defs", null, /*#__PURE__*/ React.createElement("path", {
			id,
			d: path
		})), /*#__PURE__*/ React.createElement("textPath", { xlinkHref: "#".concat(id) }, label));
	};
	getAttrsOfPolarLabel = function getAttrsOfPolarLabel(props) {
		var viewBox = props.viewBox, offset = props.offset, position = props.position;
		var _ref2 = viewBox, cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius;
		var midAngle = (_ref2.startAngle + _ref2.endAngle) / 2;
		if (position === "outside") {
			var _polarToCartesian = polarToCartesian(cx, cy, outerRadius + offset, midAngle), _x = _polarToCartesian.x;
			return {
				x: _x,
				y: _polarToCartesian.y,
				textAnchor: _x >= cx ? "start" : "end",
				verticalAnchor: "middle"
			};
		}
		if (position === "center") return {
			x: cx,
			y: cy,
			textAnchor: "middle",
			verticalAnchor: "middle"
		};
		if (position === "centerTop") return {
			x: cx,
			y: cy,
			textAnchor: "middle",
			verticalAnchor: "start"
		};
		if (position === "centerBottom") return {
			x: cx,
			y: cy,
			textAnchor: "middle",
			verticalAnchor: "end"
		};
		var _polarToCartesian2 = polarToCartesian(cx, cy, (innerRadius + outerRadius) / 2, midAngle);
		return {
			x: _polarToCartesian2.x,
			y: _polarToCartesian2.y,
			textAnchor: "middle",
			verticalAnchor: "middle"
		};
	};
	getAttrsOfCartesianLabel = function getAttrsOfCartesianLabel(props) {
		var viewBox = props.viewBox, parentViewBox = props.parentViewBox, offset = props.offset, position = props.position;
		var _ref3 = viewBox, x = _ref3.x, y = _ref3.y, width = _ref3.width, height = _ref3.height;
		var verticalSign = height >= 0 ? 1 : -1;
		var verticalOffset = verticalSign * offset;
		var verticalEnd = verticalSign > 0 ? "end" : "start";
		var verticalStart = verticalSign > 0 ? "start" : "end";
		var horizontalSign = width >= 0 ? 1 : -1;
		var horizontalOffset = horizontalSign * offset;
		var horizontalEnd = horizontalSign > 0 ? "end" : "start";
		var horizontalStart = horizontalSign > 0 ? "start" : "end";
		if (position === "top") return _objectSpread$22(_objectSpread$22({}, {
			x: x + width / 2,
			y: y - verticalSign * offset,
			textAnchor: "middle",
			verticalAnchor: verticalEnd
		}), parentViewBox ? {
			height: Math.max(y - parentViewBox.y, 0),
			width
		} : {});
		if (position === "bottom") return _objectSpread$22(_objectSpread$22({}, {
			x: x + width / 2,
			y: y + height + verticalOffset,
			textAnchor: "middle",
			verticalAnchor: verticalStart
		}), parentViewBox ? {
			height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
			width
		} : {});
		if (position === "left") {
			var _attrs2 = {
				x: x - horizontalOffset,
				y: y + height / 2,
				textAnchor: horizontalEnd,
				verticalAnchor: "middle"
			};
			return _objectSpread$22(_objectSpread$22({}, _attrs2), parentViewBox ? {
				width: Math.max(_attrs2.x - parentViewBox.x, 0),
				height
			} : {});
		}
		if (position === "right") {
			var _attrs3 = {
				x: x + width + horizontalOffset,
				y: y + height / 2,
				textAnchor: horizontalStart,
				verticalAnchor: "middle"
			};
			return _objectSpread$22(_objectSpread$22({}, _attrs3), parentViewBox ? {
				width: Math.max(parentViewBox.x + parentViewBox.width - _attrs3.x, 0),
				height
			} : {});
		}
		var sizeAttrs = parentViewBox ? {
			width,
			height
		} : {};
		if (position === "insideLeft") return _objectSpread$22({
			x: x + horizontalOffset,
			y: y + height / 2,
			textAnchor: horizontalStart,
			verticalAnchor: "middle"
		}, sizeAttrs);
		if (position === "insideRight") return _objectSpread$22({
			x: x + width - horizontalOffset,
			y: y + height / 2,
			textAnchor: horizontalEnd,
			verticalAnchor: "middle"
		}, sizeAttrs);
		if (position === "insideTop") return _objectSpread$22({
			x: x + width / 2,
			y: y + verticalOffset,
			textAnchor: "middle",
			verticalAnchor: verticalStart
		}, sizeAttrs);
		if (position === "insideBottom") return _objectSpread$22({
			x: x + width / 2,
			y: y + height - verticalOffset,
			textAnchor: "middle",
			verticalAnchor: verticalEnd
		}, sizeAttrs);
		if (position === "insideTopLeft") return _objectSpread$22({
			x: x + horizontalOffset,
			y: y + verticalOffset,
			textAnchor: horizontalStart,
			verticalAnchor: verticalStart
		}, sizeAttrs);
		if (position === "insideTopRight") return _objectSpread$22({
			x: x + width - horizontalOffset,
			y: y + verticalOffset,
			textAnchor: horizontalEnd,
			verticalAnchor: verticalStart
		}, sizeAttrs);
		if (position === "insideBottomLeft") return _objectSpread$22({
			x: x + horizontalOffset,
			y: y + height - verticalOffset,
			textAnchor: horizontalStart,
			verticalAnchor: verticalEnd
		}, sizeAttrs);
		if (position === "insideBottomRight") return _objectSpread$22({
			x: x + width - horizontalOffset,
			y: y + height - verticalOffset,
			textAnchor: horizontalEnd,
			verticalAnchor: verticalEnd
		}, sizeAttrs);
		if (isObject(position) && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) return _objectSpread$22({
			x: x + getPercentValue(position.x, width),
			y: y + getPercentValue(position.y, height),
			textAnchor: "end",
			verticalAnchor: "end"
		}, sizeAttrs);
		return _objectSpread$22({
			x: x + width / 2,
			y: y + height / 2,
			textAnchor: "middle",
			verticalAnchor: "middle"
		}, sizeAttrs);
	};
	isPolar = function isPolar(viewBox) {
		return "cx" in viewBox && isNumber(viewBox.cx);
	};
	Label.displayName = "Label";
	parseViewBox = function parseViewBox(props) {
		var cx = props.cx, cy = props.cy, angle = props.angle, startAngle = props.startAngle, endAngle = props.endAngle, r = props.r, radius = props.radius, innerRadius = props.innerRadius, outerRadius = props.outerRadius, x = props.x, y = props.y, top = props.top, left = props.left, width = props.width, height = props.height, clockWise = props.clockWise, labelViewBox = props.labelViewBox;
		if (labelViewBox) return labelViewBox;
		if (isNumber(width) && isNumber(height)) {
			if (isNumber(x) && isNumber(y)) return {
				x,
				y,
				width,
				height
			};
			if (isNumber(top) && isNumber(left)) return {
				x: top,
				y: left,
				width,
				height
			};
		}
		if (isNumber(x) && isNumber(y)) return {
			x,
			y,
			width: 0,
			height: 0
		};
		if (isNumber(cx) && isNumber(cy)) return {
			cx,
			cy,
			startAngle: startAngle || angle || 0,
			endAngle: endAngle || angle || 0,
			innerRadius: innerRadius || 0,
			outerRadius: outerRadius || radius || r || 0,
			clockWise
		};
		if (props.viewBox) return props.viewBox;
		return {};
	};
	parseLabel = function parseLabel(label, viewBox) {
		if (!label) return null;
		if (label === true) return /*#__PURE__*/ React.createElement(Label, {
			key: "label-implicit",
			viewBox
		});
		if (isNumOrStr(label)) return /*#__PURE__*/ React.createElement(Label, {
			key: "label-implicit",
			viewBox,
			value: label
		});
		if (/*#__PURE__*/ isValidElement(label)) {
			if (label.type === Label) return /*#__PURE__*/ cloneElement(label, {
				key: "label-implicit",
				viewBox
			});
			return /*#__PURE__*/ React.createElement(Label, {
				key: "label-implicit",
				content: label,
				viewBox
			});
		}
		if (isFunction(label)) return /*#__PURE__*/ React.createElement(Label, {
			key: "label-implicit",
			content: label,
			viewBox
		});
		if (isObject(label)) return /*#__PURE__*/ React.createElement(Label, _extends$17({ viewBox }, label, { key: "label-implicit" }));
		return null;
	};
	renderCallByParent$1 = function renderCallByParent(parentProps, viewBox) {
		var checkPropsLabel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
		if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) return null;
		var children = parentProps.children;
		var parentViewBox = parseViewBox(parentProps);
		var explicitChildren = findAllByType(children, Label).map(function(child, index) {
			return /*#__PURE__*/ cloneElement(child, {
				viewBox: viewBox || parentViewBox,
				key: "label-".concat(index)
			});
		});
		if (!checkPropsLabel) return explicitChildren;
		return [parseLabel(parentProps.label, viewBox || parentViewBox)].concat(_toConsumableArray$6(explicitChildren));
	};
	Label.parseViewBox = parseViewBox;
	Label.renderCallByParent = renderCallByParent$1;
}));
//#endregion
//#region node_modules/lodash-es/last.js
/**
* Gets the last element of `array`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to query.
* @returns {*} Returns the last element of `array`.
* @example
*
* _.last([1, 2, 3]);
* // => 3
*/
function last(array) {
	var length = array == null ? 0 : array.length;
	return length ? array[length - 1] : void 0;
}
var init_last = __esmMin((() => {}));
//#endregion
//#region node_modules/recharts/es6/component/LabelList.js
function _typeof$25(o) {
	"@babel/helpers - typeof";
	return _typeof$25 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$25(o);
}
function _toConsumableArray$5(arr) {
	return _arrayWithoutHoles$5(arr) || _iterableToArray$6(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableSpread$5();
}
function _nonIterableSpread$5() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$9(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen);
}
function _iterableToArray$6(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$5(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$9(arr);
}
function _arrayLikeToArray$9(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _extends$16() {
	_extends$16 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$16.apply(this, arguments);
}
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r) {
			_defineProperty$24(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$24(obj, key, value) {
	key = _toPropertyKey$24(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$24(t) {
	var i = _toPrimitive$24(t, "string");
	return "symbol" == _typeof$25(i) ? i : i + "";
}
function _toPrimitive$24(t, r) {
	if ("object" != _typeof$25(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$25(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$7(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$7(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$7(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function LabelList(_ref) {
	var _ref$valueAccessor = _ref.valueAccessor, valueAccessor = _ref$valueAccessor === void 0 ? defaultAccessor : _ref$valueAccessor, restProps = _objectWithoutProperties$7(_ref, _excluded$7);
	var data = restProps.data, dataKey = restProps.dataKey, clockWise = restProps.clockWise, id = restProps.id, textBreakAll = restProps.textBreakAll, others = _objectWithoutProperties$7(restProps, _excluded2$2);
	if (!data || !data.length) return null;
	return /*#__PURE__*/ React.createElement(Layer, { className: "recharts-label-list" }, data.map(function(entry, index) {
		var value = isNil(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry && entry.payload, dataKey);
		var idProps = isNil(id) ? {} : { id: "".concat(id, "-").concat(index) };
		return /*#__PURE__*/ React.createElement(Label, _extends$16({}, filterProps(entry, true), others, idProps, {
			parentViewBox: entry.parentViewBox,
			value,
			textBreakAll,
			viewBox: Label.parseViewBox(isNil(clockWise) ? entry : _objectSpread$21(_objectSpread$21({}, entry), {}, { clockWise })),
			key: "label-".concat(index),
			index
		}));
	}));
}
function parseLabelList(label, data) {
	if (!label) return null;
	if (label === true) return /*#__PURE__*/ React.createElement(LabelList, {
		key: "labelList-implicit",
		data
	});
	if (/*#__PURE__*/ React.isValidElement(label) || isFunction(label)) return /*#__PURE__*/ React.createElement(LabelList, {
		key: "labelList-implicit",
		data,
		content: label
	});
	if (isObject(label)) return /*#__PURE__*/ React.createElement(LabelList, _extends$16({ data }, label, { key: "labelList-implicit" }));
	return null;
}
function renderCallByParent(parentProps, data) {
	var checkPropsLabel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) return null;
	var children = parentProps.children;
	var explicitChildren = findAllByType(children, LabelList).map(function(child, index) {
		return /*#__PURE__*/ cloneElement(child, {
			data,
			key: "labelList-".concat(index)
		});
	});
	if (!checkPropsLabel) return explicitChildren;
	return [parseLabelList(parentProps.label, data)].concat(_toConsumableArray$5(explicitChildren));
}
var _excluded$7, _excluded2$2, defaultAccessor;
var init_LabelList = __esmMin((() => {
	init_isNil();
	init_isObject();
	init_isFunction();
	init_last();
	init_Label();
	init_Layer();
	init_ReactUtils();
	init_ChartUtils();
	_excluded$7 = ["valueAccessor"];
	_excluded2$2 = [
		"data",
		"dataKey",
		"clockWise",
		"id",
		"textBreakAll"
	];
	defaultAccessor = function defaultAccessor(entry) {
		return Array.isArray(entry.value) ? last(entry.value) : entry.value;
	};
	LabelList.displayName = "LabelList";
	LabelList.renderCallByParent = renderCallByParent;
}));
//#endregion
//#region node_modules/recharts/es6/shape/Sector.js
/**
* @fileOverview Sector
*/
function _typeof$24(o) {
	"@babel/helpers - typeof";
	return _typeof$24 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$24(o);
}
function _extends$15() {
	_extends$15 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$15.apply(this, arguments);
}
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r) {
			_defineProperty$23(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$23(obj, key, value) {
	key = _toPropertyKey$23(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$23(t) {
	var i = _toPrimitive$23(t, "string");
	return "symbol" == _typeof$24(i) ? i : i + "";
}
function _toPrimitive$23(t, r) {
	if ("object" != _typeof$24(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$24(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getDeltaAngle, getTangentCircle, getSectorPath, getSectorWithCorner, defaultProps$2, Sector;
var init_Sector = __esmMin((() => {
	init_clsx();
	init_ReactUtils();
	init_PolarUtils();
	init_DataUtils();
	getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
		return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 359.999);
	};
	getTangentCircle = function getTangentCircle(_ref) {
		var cx = _ref.cx, cy = _ref.cy, radius = _ref.radius, angle = _ref.angle, sign = _ref.sign, isExternal = _ref.isExternal, cornerRadius = _ref.cornerRadius, cornerIsExternal = _ref.cornerIsExternal;
		var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
		var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
		var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
		var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
		var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
		var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
		return {
			center,
			circleTangency,
			lineTangency: polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle),
			theta
		};
	};
	getSectorPath = function getSectorPath(_ref2) {
		var cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius, startAngle = _ref2.startAngle, endAngle = _ref2.endAngle;
		var angle = getDeltaAngle(startAngle, endAngle);
		var tempEndAngle = startAngle + angle;
		var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
		var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
		var path = "M ".concat(outerStartPoint.x, ",").concat(outerStartPoint.y, "\n    A ").concat(outerRadius, ",").concat(outerRadius, ",0,\n    ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle > tempEndAngle), ",\n    ").concat(outerEndPoint.x, ",").concat(outerEndPoint.y, "\n  ");
		if (innerRadius > 0) {
			var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
			var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
			path += "L ".concat(innerEndPoint.x, ",").concat(innerEndPoint.y, "\n            A ").concat(innerRadius, ",").concat(innerRadius, ",0,\n            ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle <= tempEndAngle), ",\n            ").concat(innerStartPoint.x, ",").concat(innerStartPoint.y, " Z");
		} else path += "L ".concat(cx, ",").concat(cy, " Z");
		return path;
	};
	getSectorWithCorner = function getSectorWithCorner(_ref3) {
		var cx = _ref3.cx, cy = _ref3.cy, innerRadius = _ref3.innerRadius, outerRadius = _ref3.outerRadius, cornerRadius = _ref3.cornerRadius, forceCornerRadius = _ref3.forceCornerRadius, cornerIsExternal = _ref3.cornerIsExternal, startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
		var sign = mathSign(endAngle - startAngle);
		var _getTangentCircle = getTangentCircle({
			cx,
			cy,
			radius: outerRadius,
			angle: startAngle,
			sign,
			cornerRadius,
			cornerIsExternal
		}), soct = _getTangentCircle.circleTangency, solt = _getTangentCircle.lineTangency, sot = _getTangentCircle.theta;
		var _getTangentCircle2 = getTangentCircle({
			cx,
			cy,
			radius: outerRadius,
			angle: endAngle,
			sign: -sign,
			cornerRadius,
			cornerIsExternal
		}), eoct = _getTangentCircle2.circleTangency, eolt = _getTangentCircle2.lineTangency, eot = _getTangentCircle2.theta;
		var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
		if (outerArcAngle < 0) {
			if (forceCornerRadius) return "M ".concat(solt.x, ",").concat(solt.y, "\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(cornerRadius * 2, ",0\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(-cornerRadius * 2, ",0\n      ");
			return getSectorPath({
				cx,
				cy,
				innerRadius,
				outerRadius,
				startAngle,
				endAngle
			});
		}
		var path = "M ".concat(solt.x, ",").concat(solt.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(soct.x, ",").concat(soct.y, "\n    A").concat(outerRadius, ",").concat(outerRadius, ",0,").concat(+(outerArcAngle > 180), ",").concat(+(sign < 0), ",").concat(eoct.x, ",").concat(eoct.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(eolt.x, ",").concat(eolt.y, "\n  ");
		if (innerRadius > 0) {
			var _getTangentCircle3 = getTangentCircle({
				cx,
				cy,
				radius: innerRadius,
				angle: startAngle,
				sign,
				isExternal: true,
				cornerRadius,
				cornerIsExternal
			}), sict = _getTangentCircle3.circleTangency, silt = _getTangentCircle3.lineTangency, sit = _getTangentCircle3.theta;
			var _getTangentCircle4 = getTangentCircle({
				cx,
				cy,
				radius: innerRadius,
				angle: endAngle,
				sign: -sign,
				isExternal: true,
				cornerRadius,
				cornerIsExternal
			}), eict = _getTangentCircle4.circleTangency, eilt = _getTangentCircle4.lineTangency, eit = _getTangentCircle4.theta;
			var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
			if (innerArcAngle < 0 && cornerRadius === 0) return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
			path += "L".concat(eilt.x, ",").concat(eilt.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(eict.x, ",").concat(eict.y, "\n      A").concat(innerRadius, ",").concat(innerRadius, ",0,").concat(+(innerArcAngle > 180), ",").concat(+(sign > 0), ",").concat(sict.x, ",").concat(sict.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(silt.x, ",").concat(silt.y, "Z");
		} else path += "L".concat(cx, ",").concat(cy, "Z");
		return path;
	};
	defaultProps$2 = {
		cx: 0,
		cy: 0,
		innerRadius: 0,
		outerRadius: 0,
		startAngle: 0,
		endAngle: 0,
		cornerRadius: 0,
		forceCornerRadius: false,
		cornerIsExternal: false
	};
	Sector = function Sector(sectorProps) {
		var props = _objectSpread$20(_objectSpread$20({}, defaultProps$2), sectorProps);
		var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, cornerRadius = props.cornerRadius, forceCornerRadius = props.forceCornerRadius, cornerIsExternal = props.cornerIsExternal, startAngle = props.startAngle, endAngle = props.endAngle, className = props.className;
		if (outerRadius < innerRadius || startAngle === endAngle) return null;
		var layerClass = clsx("recharts-sector", className);
		var deltaRadius = outerRadius - innerRadius;
		var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
		var path;
		if (cr > 0 && Math.abs(startAngle - endAngle) < 360) path = getSectorWithCorner({
			cx,
			cy,
			innerRadius,
			outerRadius,
			cornerRadius: Math.min(cr, deltaRadius / 2),
			forceCornerRadius,
			cornerIsExternal,
			startAngle,
			endAngle
		});
		else path = getSectorPath({
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle
		});
		return /*#__PURE__*/ React.createElement("path", _extends$15({}, filterProps(props, true), {
			className: layerClass,
			d: path,
			role: "img"
		}));
	};
}));
//#endregion
//#region node_modules/recharts/es6/shape/Curve.js
/**
* @fileOverview Curve
*/
function _typeof$23(o) {
	"@babel/helpers - typeof";
	return _typeof$23 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$23(o);
}
function _extends$14() {
	_extends$14 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$14.apply(this, arguments);
}
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r) {
			_defineProperty$22(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$22(obj, key, value) {
	key = _toPropertyKey$22(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$22(t) {
	var i = _toPrimitive$22(t, "string");
	return "symbol" == _typeof$23(i) ? i : i + "";
}
function _toPrimitive$22(t, r) {
	if ("object" != _typeof$23(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$23(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var CURVE_FACTORIES, defined, getX, getY, getCurveFactory, getPath$1, Curve;
var init_Curve = __esmMin((() => {
	init_d3_shape();
	init_upperFirst();
	init_isFunction();
	init_clsx();
	init_types();
	init_ReactUtils();
	init_DataUtils();
	CURVE_FACTORIES = {
		curveBasisClosed: basisClosed_default,
		curveBasisOpen: basisOpen_default,
		curveBasis: basis_default,
		curveBumpX: bumpX,
		curveBumpY: bumpY,
		curveLinearClosed: linearClosed_default,
		curveLinear: linear_default,
		curveMonotoneX: monotoneX,
		curveMonotoneY: monotoneY,
		curveNatural: natural_default,
		curveStep: step_default,
		curveStepAfter: stepAfter,
		curveStepBefore: stepBefore
	};
	defined = function defined(p) {
		return p.x === +p.x && p.y === +p.y;
	};
	getX = function getX(p) {
		return p.x;
	};
	getY = function getY(p) {
		return p.y;
	};
	getCurveFactory = function getCurveFactory(type, layout) {
		if (isFunction(type)) return type;
		var name = "curve".concat(upperFirst(type));
		if ((name === "curveMonotone" || name === "curveBump") && layout) return CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
		return CURVE_FACTORIES[name] || linear_default;
	};
	getPath$1 = function getPath(_ref) {
		var _ref$type = _ref.type, type = _ref$type === void 0 ? "linear" : _ref$type, _ref$points = _ref.points, points = _ref$points === void 0 ? [] : _ref$points, baseLine = _ref.baseLine, layout = _ref.layout, _ref$connectNulls = _ref.connectNulls, connectNulls = _ref$connectNulls === void 0 ? false : _ref$connectNulls;
		var curveFactory = getCurveFactory(type, layout);
		var formatPoints = connectNulls ? points.filter(function(entry) {
			return defined(entry);
		}) : points;
		var lineFunction;
		if (Array.isArray(baseLine)) {
			var formatBaseLine = connectNulls ? baseLine.filter(function(base) {
				return defined(base);
			}) : baseLine;
			var areaPoints = formatPoints.map(function(entry, index) {
				return _objectSpread$19(_objectSpread$19({}, entry), {}, { base: formatBaseLine[index] });
			});
			if (layout === "vertical") lineFunction = area_default().y(getY).x1(getX).x0(function(d) {
				return d.base.x;
			});
			else lineFunction = area_default().x(getX).y1(getY).y0(function(d) {
				return d.base.y;
			});
			lineFunction.defined(defined).curve(curveFactory);
			return lineFunction(areaPoints);
		}
		if (layout === "vertical" && isNumber(baseLine)) lineFunction = area_default().y(getY).x1(getX).x0(baseLine);
		else if (isNumber(baseLine)) lineFunction = area_default().x(getX).y1(getY).y0(baseLine);
		else lineFunction = line_default().x(getX).y(getY);
		lineFunction.defined(defined).curve(curveFactory);
		return lineFunction(formatPoints);
	};
	Curve = function Curve(props) {
		var className = props.className, points = props.points, path = props.path, pathRef = props.pathRef;
		if ((!points || !points.length) && !path) return null;
		var realPath = points && points.length ? getPath$1(props) : path;
		return /*#__PURE__*/ React.createElement("path", _extends$14({}, filterProps(props, false), adaptEventHandlers(props), {
			className: clsx("recharts-curve", className),
			d: realPath,
			ref: pathRef
		}));
	};
}));
//#endregion
//#region node_modules/fast-equals/dist/esm/index.mjs
/**
* Combine two comparators into a single comparators.
*/
function combineComparators(comparatorA, comparatorB) {
	return function isEqual(a, b, state) {
		return comparatorA(a, b, state) && comparatorB(a, b, state);
	};
}
/**
* Wrap the provided `areItemsEqual` method to manage the circular state, allowing
* for circular references to be safely included in the comparison without creating
* stack overflows.
*/
function createIsCircular(areItemsEqual) {
	return function isCircular(a, b, state) {
		if (!a || !b || typeof a !== "object" || typeof b !== "object") return areItemsEqual(a, b, state);
		var cache = state.cache;
		var cachedA = cache.get(a);
		var cachedB = cache.get(b);
		if (cachedA && cachedB) return cachedA === b && cachedB === a;
		cache.set(a, b);
		cache.set(b, a);
		var result = areItemsEqual(a, b, state);
		cache.delete(a);
		cache.delete(b);
		return result;
	};
}
/**
* Get the properties to strictly examine, which include both own properties that are
* not enumerable and symbol properties.
*/
function getStrictProperties(object) {
	return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
/**
* Whether the values passed are strictly equal or both NaN.
*/
function sameValueZeroEqual(a, b) {
	return a === b || !a && !b && a !== a && b !== b;
}
/**
* Whether the arrays are equal in value.
*/
function areArraysEqual(a, b, state) {
	var index = a.length;
	if (b.length !== index) return false;
	while (index-- > 0) if (!state.equals(a[index], b[index], index, index, a, b, state)) return false;
	return true;
}
/**
* Whether the dates passed are equal in value.
*/
function areDatesEqual(a, b) {
	return sameValueZeroEqual(a.getTime(), b.getTime());
}
/**
* Whether the errors passed are equal in value.
*/
function areErrorsEqual(a, b) {
	return a.name === b.name && a.message === b.message && a.cause === b.cause && a.stack === b.stack;
}
/**
* Whether the functions passed are equal in value.
*/
function areFunctionsEqual(a, b) {
	return a === b;
}
/**
* Whether the `Map`s are equal in value.
*/
function areMapsEqual(a, b, state) {
	var size = a.size;
	if (size !== b.size) return false;
	if (!size) return true;
	var matchedIndices = new Array(size);
	var aIterable = a.entries();
	var aResult;
	var bResult;
	var index = 0;
	while (aResult = aIterable.next()) {
		if (aResult.done) break;
		var bIterable = b.entries();
		var hasMatch = false;
		var matchIndex = 0;
		while (bResult = bIterable.next()) {
			if (bResult.done) break;
			if (matchedIndices[matchIndex]) {
				matchIndex++;
				continue;
			}
			var aEntry = aResult.value;
			var bEntry = bResult.value;
			if (state.equals(aEntry[0], bEntry[0], index, matchIndex, a, b, state) && state.equals(aEntry[1], bEntry[1], aEntry[0], bEntry[0], a, b, state)) {
				hasMatch = matchedIndices[matchIndex] = true;
				break;
			}
			matchIndex++;
		}
		if (!hasMatch) return false;
		index++;
	}
	return true;
}
/**
* Whether the objects are equal in value.
*/
function areObjectsEqual(a, b, state) {
	var properties = keys(a);
	var index = properties.length;
	if (keys(b).length !== index) return false;
	while (index-- > 0) if (!isPropertyEqual(a, b, state, properties[index])) return false;
	return true;
}
/**
* Whether the objects are equal in value with strict property checking.
*/
function areObjectsEqualStrict(a, b, state) {
	var properties = getStrictProperties(a);
	var index = properties.length;
	if (getStrictProperties(b).length !== index) return false;
	var property;
	var descriptorA;
	var descriptorB;
	while (index-- > 0) {
		property = properties[index];
		if (!isPropertyEqual(a, b, state, property)) return false;
		descriptorA = getOwnPropertyDescriptor(a, property);
		descriptorB = getOwnPropertyDescriptor(b, property);
		if ((descriptorA || descriptorB) && (!descriptorA || !descriptorB || descriptorA.configurable !== descriptorB.configurable || descriptorA.enumerable !== descriptorB.enumerable || descriptorA.writable !== descriptorB.writable)) return false;
	}
	return true;
}
/**
* Whether the primitive wrappers passed are equal in value.
*/
function arePrimitiveWrappersEqual(a, b) {
	return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
/**
* Whether the regexps passed are equal in value.
*/
function areRegExpsEqual(a, b) {
	return a.source === b.source && a.flags === b.flags;
}
/**
* Whether the `Set`s are equal in value.
*/
function areSetsEqual(a, b, state) {
	var size = a.size;
	if (size !== b.size) return false;
	if (!size) return true;
	var matchedIndices = new Array(size);
	var aIterable = a.values();
	var aResult;
	var bResult;
	while (aResult = aIterable.next()) {
		if (aResult.done) break;
		var bIterable = b.values();
		var hasMatch = false;
		var matchIndex = 0;
		while (bResult = bIterable.next()) {
			if (bResult.done) break;
			if (!matchedIndices[matchIndex] && state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state)) {
				hasMatch = matchedIndices[matchIndex] = true;
				break;
			}
			matchIndex++;
		}
		if (!hasMatch) return false;
	}
	return true;
}
/**
* Whether the TypedArray instances are equal in value.
*/
function areTypedArraysEqual(a, b) {
	var index = a.length;
	if (b.length !== index) return false;
	while (index-- > 0) if (a[index] !== b[index]) return false;
	return true;
}
/**
* Whether the URL instances are equal in value.
*/
function areUrlsEqual(a, b) {
	return a.hostname === b.hostname && a.pathname === b.pathname && a.protocol === b.protocol && a.port === b.port && a.hash === b.hash && a.username === b.username && a.password === b.password;
}
function isPropertyEqual(a, b, state, property) {
	if ((property === REACT_OWNER || property === PREACT_OWNER || property === PREACT_VNODE) && (a.$$typeof || b.$$typeof)) return true;
	return hasOwn(b, property) && state.equals(a[property], b[property], property, property, a, b, state);
}
/**
* Create a comparator method based on the type-specific equality comparators passed.
*/
function createEqualityComparator(_a) {
	var areArraysEqual = _a.areArraysEqual, areDatesEqual = _a.areDatesEqual, areErrorsEqual = _a.areErrorsEqual, areFunctionsEqual = _a.areFunctionsEqual, areMapsEqual = _a.areMapsEqual, areNumbersEqual = _a.areNumbersEqual, areObjectsEqual = _a.areObjectsEqual, arePrimitiveWrappersEqual = _a.arePrimitiveWrappersEqual, areRegExpsEqual = _a.areRegExpsEqual, areSetsEqual = _a.areSetsEqual, areTypedArraysEqual = _a.areTypedArraysEqual, areUrlsEqual = _a.areUrlsEqual;
	/**
	* compare the value of the two objects and return true if they are equivalent in values
	*/
	return function comparator(a, b, state) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		var type = typeof a;
		if (type !== typeof b) return false;
		if (type !== "object") {
			if (type === "number") return areNumbersEqual(a, b, state);
			if (type === "function") return areFunctionsEqual(a, b, state);
			return false;
		}
		var constructor = a.constructor;
		if (constructor !== b.constructor) return false;
		if (constructor === Object) return areObjectsEqual(a, b, state);
		if (isArray(a)) return areArraysEqual(a, b, state);
		if (isTypedArray != null && isTypedArray(a)) return areTypedArraysEqual(a, b, state);
		if (constructor === Date) return areDatesEqual(a, b, state);
		if (constructor === RegExp) return areRegExpsEqual(a, b, state);
		if (constructor === Map) return areMapsEqual(a, b, state);
		if (constructor === Set) return areSetsEqual(a, b, state);
		var tag = getTag(a);
		if (tag === DATE_TAG) return areDatesEqual(a, b, state);
		if (tag === REG_EXP_TAG) return areRegExpsEqual(a, b, state);
		if (tag === MAP_TAG) return areMapsEqual(a, b, state);
		if (tag === SET_TAG) return areSetsEqual(a, b, state);
		if (tag === OBJECT_TAG) return typeof a.then !== "function" && typeof b.then !== "function" && areObjectsEqual(a, b, state);
		if (tag === URL_TAG) return areUrlsEqual(a, b, state);
		if (tag === ERROR_TAG) return areErrorsEqual(a, b, state);
		if (tag === ARGUMENTS_TAG) return areObjectsEqual(a, b, state);
		if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) return arePrimitiveWrappersEqual(a, b, state);
		return false;
	};
}
/**
* Create the configuration object used for building comparators.
*/
function createEqualityComparatorConfig(_a) {
	var circular = _a.circular, createCustomConfig = _a.createCustomConfig, strict = _a.strict;
	var config = {
		areArraysEqual: strict ? areObjectsEqualStrict : areArraysEqual,
		areDatesEqual,
		areErrorsEqual,
		areFunctionsEqual,
		areMapsEqual: strict ? combineComparators(areMapsEqual, areObjectsEqualStrict) : areMapsEqual,
		areNumbersEqual,
		areObjectsEqual: strict ? areObjectsEqualStrict : areObjectsEqual,
		arePrimitiveWrappersEqual,
		areRegExpsEqual,
		areSetsEqual: strict ? combineComparators(areSetsEqual, areObjectsEqualStrict) : areSetsEqual,
		areTypedArraysEqual: strict ? areObjectsEqualStrict : areTypedArraysEqual,
		areUrlsEqual
	};
	if (createCustomConfig) config = assign({}, config, createCustomConfig(config));
	if (circular) {
		var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
		var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
		var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
		var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
		config = assign({}, config, {
			areArraysEqual: areArraysEqual$1,
			areMapsEqual: areMapsEqual$1,
			areObjectsEqual: areObjectsEqual$1,
			areSetsEqual: areSetsEqual$1
		});
	}
	return config;
}
/**
* Default equality comparator pass-through, used as the standard `isEqual` creator for
* use inside the built comparator.
*/
function createInternalEqualityComparator(compare) {
	return function(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
		return compare(a, b, state);
	};
}
/**
* Create the `isEqual` function used by the consuming application.
*/
function createIsEqual(_a) {
	var circular = _a.circular, comparator = _a.comparator, createState = _a.createState, equals = _a.equals, strict = _a.strict;
	if (createState) return function isEqual(a, b) {
		var _a = createState(), _b = _a.cache, cache = _b === void 0 ? circular ? /* @__PURE__ */ new WeakMap() : void 0 : _b, meta = _a.meta;
		return comparator(a, b, {
			cache,
			equals,
			meta,
			strict
		});
	};
	if (circular) return function isEqual(a, b) {
		return comparator(a, b, {
			cache: /* @__PURE__ */ new WeakMap(),
			equals,
			meta: void 0,
			strict
		});
	};
	var state = {
		cache: void 0,
		equals,
		meta: void 0,
		strict
	};
	return function isEqual(a, b) {
		return comparator(a, b, state);
	};
}
/**
* Create a custom equality comparison method.
*
* This can be done to create very targeted comparisons in extreme hot-path scenarios
* where the standard methods are not performant enough, but can also be used to provide
* support for legacy environments that do not support expected features like
* `RegExp.prototype.flags` out of the box.
*/
function createCustomEqual(options) {
	if (options === void 0) options = {};
	var _a = options.circular, circular = _a === void 0 ? false : _a, createCustomInternalComparator = options.createInternalComparator, createState = options.createState, _b = options.strict, strict = _b === void 0 ? false : _b;
	var comparator = createEqualityComparator(createEqualityComparatorConfig(options));
	return createIsEqual({
		circular,
		comparator,
		createState,
		equals: createCustomInternalComparator ? createCustomInternalComparator(comparator) : createInternalEqualityComparator(comparator),
		strict
	});
}
var getOwnPropertyNames, getOwnPropertySymbols, hasOwnProperty$1, hasOwn, PREACT_VNODE, PREACT_OWNER, REACT_OWNER, getOwnPropertyDescriptor, keys, areNumbersEqual, ARGUMENTS_TAG, BOOLEAN_TAG, DATE_TAG, ERROR_TAG, MAP_TAG, NUMBER_TAG, OBJECT_TAG, REG_EXP_TAG, SET_TAG, STRING_TAG, URL_TAG, isArray, isTypedArray, assign, getTag, deepEqual;
var init_esm = __esmMin((() => {
	getOwnPropertyNames = Object.getOwnPropertyNames;
	getOwnPropertySymbols = Object.getOwnPropertySymbols;
	hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	hasOwn = Object.hasOwn || (function(object, property) {
		return hasOwnProperty$1.call(object, property);
	});
	PREACT_VNODE = "__v";
	PREACT_OWNER = "__o";
	REACT_OWNER = "_owner";
	getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	keys = Object.keys;
	areNumbersEqual = sameValueZeroEqual;
	ARGUMENTS_TAG = "[object Arguments]";
	BOOLEAN_TAG = "[object Boolean]";
	DATE_TAG = "[object Date]";
	ERROR_TAG = "[object Error]";
	MAP_TAG = "[object Map]";
	NUMBER_TAG = "[object Number]";
	OBJECT_TAG = "[object Object]";
	REG_EXP_TAG = "[object RegExp]";
	SET_TAG = "[object Set]";
	STRING_TAG = "[object String]";
	URL_TAG = "[object URL]";
	isArray = Array.isArray;
	isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null;
	assign = Object.assign;
	getTag = Object.prototype.toString.call.bind(Object.prototype.toString);
	deepEqual = createCustomEqual();
	createCustomEqual({ strict: true });
	createCustomEqual({ circular: true });
	createCustomEqual({
		circular: true,
		strict: true
	});
	createCustomEqual({ createInternalComparator: function() {
		return sameValueZeroEqual;
	} });
	createCustomEqual({
		strict: true,
		createInternalComparator: function() {
			return sameValueZeroEqual;
		}
	});
	createCustomEqual({
		circular: true,
		createInternalComparator: function() {
			return sameValueZeroEqual;
		}
	});
	createCustomEqual({
		circular: true,
		createInternalComparator: function() {
			return sameValueZeroEqual;
		},
		strict: true
	});
}));
//#endregion
//#region node_modules/react-smooth/es6/setRafTimeout.js
function safeRequestAnimationFrame(callback) {
	if (typeof requestAnimationFrame !== "undefined") requestAnimationFrame(callback);
}
function setRafTimeout(callback) {
	var timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	var currTime = -1;
	requestAnimationFrame(function shouldUpdate(now) {
		if (currTime < 0) currTime = now;
		if (now - currTime > timeout) {
			callback(now);
			currTime = -1;
		} else safeRequestAnimationFrame(shouldUpdate);
	});
}
var init_setRafTimeout = __esmMin((() => {}));
//#endregion
//#region node_modules/react-smooth/es6/AnimateManager.js
function _typeof$22(o) {
	"@babel/helpers - typeof";
	return _typeof$22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$22(o);
}
function _toArray(arr) {
	return _arrayWithHoles$6(arr) || _iterableToArray$5(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}
function _arrayLikeToArray$8(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArray$5(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithHoles$6(arr) {
	if (Array.isArray(arr)) return arr;
}
function createAnimateManager() {
	var currStyle = {};
	var handleChange = function handleChange() {
		return null;
	};
	var shouldStop = false;
	var setStyle = function setStyle(_style) {
		if (shouldStop) return;
		if (Array.isArray(_style)) {
			if (!_style.length) return;
			var _styles = _toArray(_style), curr = _styles[0], restStyles = _styles.slice(1);
			if (typeof curr === "number") {
				setRafTimeout(setStyle.bind(null, restStyles), curr);
				return;
			}
			setStyle(curr);
			setRafTimeout(setStyle.bind(null, restStyles));
			return;
		}
		if (_typeof$22(_style) === "object") {
			currStyle = _style;
			handleChange(currStyle);
		}
		if (typeof _style === "function") _style();
	};
	return {
		stop: function stop() {
			shouldStop = true;
		},
		start: function start(style) {
			shouldStop = false;
			setStyle(style);
		},
		subscribe: function subscribe(_handleChange) {
			handleChange = _handleChange;
			return function() {
				handleChange = function handleChange() {
					return null;
				};
			};
		}
	};
}
var init_AnimateManager = __esmMin((() => {
	init_setRafTimeout();
}));
//#endregion
//#region node_modules/react-smooth/es6/util.js
function _typeof$21(o) {
	"@babel/helpers - typeof";
	return _typeof$21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$21(o);
}
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r) {
			_defineProperty$21(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$21(obj, key, value) {
	key = _toPropertyKey$21(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$21(arg) {
	var key = _toPrimitive$21(arg, "string");
	return _typeof$21(key) === "symbol" ? key : String(key);
}
function _toPrimitive$21(input, hint) {
	if (_typeof$21(input) !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== void 0) {
		var res = prim.call(input, hint || "default");
		if (_typeof$21(res) !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
var getIntersectionKeys, identity, getDashCase, mapObject, getTransitionVal, isDev, warn;
var init_util = __esmMin((() => {
	getIntersectionKeys = function getIntersectionKeys(preObj, nextObj) {
		return [Object.keys(preObj), Object.keys(nextObj)].reduce(function(a, b) {
			return a.filter(function(c) {
				return b.includes(c);
			});
		});
	};
	identity = function identity(param) {
		return param;
	};
	getDashCase = function getDashCase(name) {
		return name.replace(/([A-Z])/g, function(v) {
			return "-".concat(v.toLowerCase());
		});
	};
	mapObject = function mapObject(fn, obj) {
		return Object.keys(obj).reduce(function(res, key) {
			return _objectSpread$18(_objectSpread$18({}, res), {}, _defineProperty$21({}, key, fn(key, obj[key])));
		}, {});
	};
	getTransitionVal = function getTransitionVal(props, duration, easing) {
		return props.map(function(prop) {
			return "".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing);
		}).join(",");
	};
	isDev = false;
	warn = function warn(condition, format, a, b, c, d, e, f) {
		if (isDev && typeof console !== "undefined" && console.warn) {
			if (format === void 0) console.warn("LogUtils requires an error message argument");
			if (!condition) if (format === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
			else {
				var args = [
					a,
					b,
					c,
					d,
					e,
					f
				];
				var argIndex = 0;
				console.warn(format.replace(/%s/g, function() {
					return args[argIndex++];
				}));
			}
		}
	};
}));
//#endregion
//#region node_modules/react-smooth/es6/easing.js
function _slicedToArray$5(arr, i) {
	return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$5(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$5(arr) {
	if (Array.isArray(arr)) return arr;
}
function _toConsumableArray$4(arr) {
	return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$7(arr) || _nonIterableSpread$4();
}
function _nonIterableSpread$4() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
function _iterableToArray$4(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$4(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$7(arr);
}
function _arrayLikeToArray$7(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
var ACCURACY, cubicBezierFactor, multyTime, cubicBezier, derivativeCubicBezier, configBezier, configSpring, configEasing;
var init_easing = __esmMin((() => {
	init_util();
	ACCURACY = 1e-4;
	cubicBezierFactor = function cubicBezierFactor(c1, c2) {
		return [
			0,
			3 * c1,
			3 * c2 - 6 * c1,
			3 * c1 - 3 * c2 + 1
		];
	};
	multyTime = function multyTime(params, t) {
		return params.map(function(param, i) {
			return param * Math.pow(t, i);
		}).reduce(function(pre, curr) {
			return pre + curr;
		});
	};
	cubicBezier = function cubicBezier(c1, c2) {
		return function(t) {
			return multyTime(cubicBezierFactor(c1, c2), t);
		};
	};
	derivativeCubicBezier = function derivativeCubicBezier(c1, c2) {
		return function(t) {
			var params = cubicBezierFactor(c1, c2);
			return multyTime([].concat(_toConsumableArray$4(params.map(function(param, i) {
				return param * i;
			}).slice(1)), [0]), t);
		};
	};
	configBezier = function configBezier() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var x1 = args[0], y1 = args[1], x2 = args[2], y2 = args[3];
		if (args.length === 1) switch (args[0]) {
			case "linear":
				x1 = 0;
				y1 = 0;
				x2 = 1;
				y2 = 1;
				break;
			case "ease":
				x1 = .25;
				y1 = .1;
				x2 = .25;
				y2 = 1;
				break;
			case "ease-in":
				x1 = .42;
				y1 = 0;
				x2 = 1;
				y2 = 1;
				break;
			case "ease-out":
				x1 = .42;
				y1 = 0;
				x2 = .58;
				y2 = 1;
				break;
			case "ease-in-out":
				x1 = 0;
				y1 = 0;
				x2 = .58;
				y2 = 1;
				break;
			default:
				var easing = args[0].split("(");
				if (easing[0] === "cubic-bezier" && easing[1].split(")")[0].split(",").length === 4) {
					var _easing$1$split$0$spl2 = _slicedToArray$5(easing[1].split(")")[0].split(",").map(function(x) {
						return parseFloat(x);
					}), 4);
					x1 = _easing$1$split$0$spl2[0];
					y1 = _easing$1$split$0$spl2[1];
					x2 = _easing$1$split$0$spl2[2];
					y2 = _easing$1$split$0$spl2[3];
				} else warn(false, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", args);
		}
		warn([
			x1,
			x2,
			y1,
			y2
		].every(function(num) {
			return typeof num === "number" && num >= 0 && num <= 1;
		}), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", args);
		var curveX = cubicBezier(x1, x2);
		var curveY = cubicBezier(y1, y2);
		var derCurveX = derivativeCubicBezier(x1, x2);
		var rangeValue = function rangeValue(value) {
			if (value > 1) return 1;
			if (value < 0) return 0;
			return value;
		};
		var bezier = function bezier(_t) {
			var t = _t > 1 ? 1 : _t;
			var x = t;
			for (var i = 0; i < 8; ++i) {
				var evalT = curveX(x) - t;
				var derVal = derCurveX(x);
				if (Math.abs(evalT - t) < ACCURACY || derVal < ACCURACY) return curveY(x);
				x = rangeValue(x - evalT / derVal);
			}
			return curveY(x);
		};
		bezier.isStepper = false;
		return bezier;
	};
	configSpring = function configSpring() {
		var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var _config$stiff = config.stiff, stiff = _config$stiff === void 0 ? 100 : _config$stiff, _config$damping = config.damping, damping = _config$damping === void 0 ? 8 : _config$damping, _config$dt = config.dt, dt = _config$dt === void 0 ? 17 : _config$dt;
		var stepper = function stepper(currX, destX, currV) {
			var newV = currV + (-(currX - destX) * stiff - currV * damping) * dt / 1e3;
			var newX = currV * dt / 1e3 + currX;
			if (Math.abs(newX - destX) < ACCURACY && Math.abs(newV) < ACCURACY) return [destX, 0];
			return [newX, newV];
		};
		stepper.isStepper = true;
		stepper.dt = dt;
		return stepper;
	};
	configEasing = function configEasing() {
		for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
		var easing = args[0];
		if (typeof easing === "string") switch (easing) {
			case "ease":
			case "ease-in-out":
			case "ease-out":
			case "ease-in":
			case "linear": return configBezier(easing);
			case "spring": return configSpring();
			default:
				if (easing.split("(")[0] === "cubic-bezier") return configBezier(easing);
				warn(false, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", args);
		}
		if (typeof easing === "function") return easing;
		warn(false, "[configEasing]: first argument type should be function or string, instead received %s", args);
		return null;
	};
}));
//#endregion
//#region node_modules/react-smooth/es6/configUpdate.js
function _typeof$20(o) {
	"@babel/helpers - typeof";
	return _typeof$20 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$20(o);
}
function _toConsumableArray$3(arr) {
	return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$6(arr);
}
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r) {
			_defineProperty$20(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$20(obj, key, value) {
	key = _toPropertyKey$20(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$20(arg) {
	var key = _toPrimitive$20(arg, "string");
	return _typeof$20(key) === "symbol" ? key : String(key);
}
function _toPrimitive$20(input, hint) {
	if (_typeof$20(input) !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== void 0) {
		var res = prim.call(input, hint || "default");
		if (_typeof$20(res) !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$4(arr, i) {
	return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _arrayLikeToArray$6(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$4(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$4(arr) {
	if (Array.isArray(arr)) return arr;
}
var alpha, needContinue, calStepperVals, configUpdate_default;
var init_configUpdate = __esmMin((() => {
	init_util();
	alpha = function alpha(begin, end, k) {
		return begin + (end - begin) * k;
	};
	needContinue = function needContinue(_ref) {
		return _ref.from !== _ref.to;
	};
	calStepperVals = function calStepperVals(easing, preVals, steps) {
		var nextStepVals = mapObject(function(key, val) {
			if (needContinue(val)) {
				var _easing2 = _slicedToArray$4(easing(val.from, val.to, val.velocity), 2), newX = _easing2[0], newV = _easing2[1];
				return _objectSpread$17(_objectSpread$17({}, val), {}, {
					from: newX,
					velocity: newV
				});
			}
			return val;
		}, preVals);
		if (steps < 1) return mapObject(function(key, val) {
			if (needContinue(val)) return _objectSpread$17(_objectSpread$17({}, val), {}, {
				velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
				from: alpha(val.from, nextStepVals[key].from, steps)
			});
			return val;
		}, preVals);
		return calStepperVals(easing, nextStepVals, steps - 1);
	};
	configUpdate_default = (function(from, to, easing, duration, render) {
		var interKeys = getIntersectionKeys(from, to);
		var timingStyle = interKeys.reduce(function(res, key) {
			return _objectSpread$17(_objectSpread$17({}, res), {}, _defineProperty$20({}, key, [from[key], to[key]]));
		}, {});
		var stepperStyle = interKeys.reduce(function(res, key) {
			return _objectSpread$17(_objectSpread$17({}, res), {}, _defineProperty$20({}, key, {
				from: from[key],
				velocity: 0,
				to: to[key]
			}));
		}, {});
		var cafId = -1;
		var preTime;
		var beginTime;
		var update = function update() {
			return null;
		};
		var getCurrStyle = function getCurrStyle() {
			return mapObject(function(key, val) {
				return val.from;
			}, stepperStyle);
		};
		var shouldStopAnimation = function shouldStopAnimation() {
			return !Object.values(stepperStyle).filter(needContinue).length;
		};
		update = easing.isStepper ? function stepperUpdate(now) {
			if (!preTime) preTime = now;
			var steps = (now - preTime) / easing.dt;
			stepperStyle = calStepperVals(easing, stepperStyle, steps);
			render(_objectSpread$17(_objectSpread$17(_objectSpread$17({}, from), to), getCurrStyle(stepperStyle)));
			preTime = now;
			if (!shouldStopAnimation()) cafId = requestAnimationFrame(update);
		} : function timingUpdate(now) {
			if (!beginTime) beginTime = now;
			var t = (now - beginTime) / duration;
			var currStyle = mapObject(function(key, val) {
				return alpha.apply(void 0, _toConsumableArray$3(val).concat([easing(t)]));
			}, timingStyle);
			render(_objectSpread$17(_objectSpread$17(_objectSpread$17({}, from), to), currStyle));
			if (t < 1) cafId = requestAnimationFrame(update);
			else {
				var finalStyle = mapObject(function(key, val) {
					return alpha.apply(void 0, _toConsumableArray$3(val).concat([easing(1)]));
				}, timingStyle);
				render(_objectSpread$17(_objectSpread$17(_objectSpread$17({}, from), to), finalStyle));
			}
		};
		return function() {
			requestAnimationFrame(update);
			return function() {
				cancelAnimationFrame(cafId);
			};
		};
	});
}));
//#endregion
//#region node_modules/react-smooth/es6/Animate.js
function _typeof$19(o) {
	"@babel/helpers - typeof";
	return _typeof$19 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$19(o);
}
function _objectWithoutProperties$6(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$6(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$6(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _toConsumableArray$2(arr) {
	return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$5(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}
function _iterableToArray$2(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$5(arr);
}
function _arrayLikeToArray$5(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r) {
			_defineProperty$19(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$19(obj, key, value) {
	key = _toPropertyKey$19(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _classCallCheck$11(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$11(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$19(descriptor.key), descriptor);
	}
}
function _createClass$11(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$11(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$11(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _toPropertyKey$19(arg) {
	var key = _toPrimitive$19(arg, "string");
	return _typeof$19(key) === "symbol" ? key : String(key);
}
function _toPrimitive$19(input, hint) {
	if (_typeof$19(input) !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== void 0) {
		var res = prim.call(input, hint || "default");
		if (_typeof$19(res) !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
function _inherits$9(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$9(subClass, superClass);
}
function _setPrototypeOf$9(o, p) {
	_setPrototypeOf$9 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$9(o, p);
}
function _createSuper(Derived) {
	var hasNativeReflectConstruct = _isNativeReflectConstruct$9();
	return function _createSuperInternal() {
		var Super = _getPrototypeOf$9(Derived), result;
		if (hasNativeReflectConstruct) {
			var NewTarget = _getPrototypeOf$9(this).constructor;
			result = Reflect.construct(Super, arguments, NewTarget);
		} else result = Super.apply(this, arguments);
		return _possibleConstructorReturn$9(this, result);
	};
}
function _possibleConstructorReturn$9(self, call) {
	if (call && (_typeof$19(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$9(self);
}
function _assertThisInitialized$9(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$9() {
	if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	if (Reflect.construct.sham) return false;
	if (typeof Proxy === "function") return true;
	try {
		Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		return true;
	} catch (e) {
		return false;
	}
}
function _getPrototypeOf$9(o) {
	_getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$9(o);
}
var _excluded$6, Animate;
var init_Animate = __esmMin((() => {
	init_esm();
	init_AnimateManager();
	init_easing();
	init_configUpdate();
	init_util();
	_excluded$6 = [
		"children",
		"begin",
		"duration",
		"attributeName",
		"easing",
		"isActive",
		"steps",
		"from",
		"to",
		"canBegin",
		"onAnimationEnd",
		"shouldReAnimate",
		"onAnimationReStart"
	];
	Animate = /*#__PURE__*/ function(_PureComponent) {
		_inherits$9(Animate, _PureComponent);
		var _super = _createSuper(Animate);
		function Animate(props, context) {
			var _this;
			_classCallCheck$11(this, Animate);
			_this = _super.call(this, props, context);
			var _this$props = _this.props, isActive = _this$props.isActive, attributeName = _this$props.attributeName, from = _this$props.from, to = _this$props.to, steps = _this$props.steps, children = _this$props.children, duration = _this$props.duration;
			_this.handleStyleChange = _this.handleStyleChange.bind(_assertThisInitialized$9(_this));
			_this.changeStyle = _this.changeStyle.bind(_assertThisInitialized$9(_this));
			if (!isActive || duration <= 0) {
				_this.state = { style: {} };
				if (typeof children === "function") _this.state = { style: to };
				return _possibleConstructorReturn$9(_this);
			}
			if (steps && steps.length) _this.state = { style: steps[0].style };
			else if (from) {
				if (typeof children === "function") {
					_this.state = { style: from };
					return _possibleConstructorReturn$9(_this);
				}
				_this.state = { style: attributeName ? _defineProperty$19({}, attributeName, from) : from };
			} else _this.state = { style: {} };
			return _this;
		}
		_createClass$11(Animate, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					var _this$props2 = this.props, isActive = _this$props2.isActive, canBegin = _this$props2.canBegin;
					this.mounted = true;
					if (!isActive || !canBegin) return;
					this.runAnimation(this.props);
				}
			},
			{
				key: "componentDidUpdate",
				value: function componentDidUpdate(prevProps) {
					var _this$props3 = this.props, isActive = _this$props3.isActive, canBegin = _this$props3.canBegin, attributeName = _this$props3.attributeName, shouldReAnimate = _this$props3.shouldReAnimate, to = _this$props3.to, currentFrom = _this$props3.from;
					var style = this.state.style;
					if (!canBegin) return;
					if (!isActive) {
						var newState = { style: attributeName ? _defineProperty$19({}, attributeName, to) : to };
						if (this.state && style) {
							if (attributeName && style[attributeName] !== to || !attributeName && style !== to) this.setState(newState);
						}
						return;
					}
					if (deepEqual(prevProps.to, to) && prevProps.canBegin && prevProps.isActive) return;
					var isTriggered = !prevProps.canBegin || !prevProps.isActive;
					if (this.manager) this.manager.stop();
					if (this.stopJSAnimation) this.stopJSAnimation();
					var from = isTriggered || shouldReAnimate ? currentFrom : prevProps.to;
					if (this.state && style) {
						var _newState = { style: attributeName ? _defineProperty$19({}, attributeName, from) : from };
						if (attributeName && style[attributeName] !== from || !attributeName && style !== from) this.setState(_newState);
					}
					this.runAnimation(_objectSpread$16(_objectSpread$16({}, this.props), {}, {
						from,
						begin: 0
					}));
				}
			},
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					this.mounted = false;
					var onAnimationEnd = this.props.onAnimationEnd;
					if (this.unSubscribe) this.unSubscribe();
					if (this.manager) {
						this.manager.stop();
						this.manager = null;
					}
					if (this.stopJSAnimation) this.stopJSAnimation();
					if (onAnimationEnd) onAnimationEnd();
				}
			},
			{
				key: "handleStyleChange",
				value: function handleStyleChange(style) {
					this.changeStyle(style);
				}
			},
			{
				key: "changeStyle",
				value: function changeStyle(style) {
					if (this.mounted) this.setState({ style });
				}
			},
			{
				key: "runJSAnimation",
				value: function runJSAnimation(props) {
					var _this2 = this;
					var from = props.from, to = props.to, duration = props.duration, easing = props.easing, begin = props.begin, onAnimationEnd = props.onAnimationEnd, onAnimationStart = props.onAnimationStart;
					var startAnimation = configUpdate_default(from, to, configEasing(easing), duration, this.changeStyle);
					this.manager.start([
						onAnimationStart,
						begin,
						function finalStartAnimation() {
							_this2.stopJSAnimation = startAnimation();
						},
						duration,
						onAnimationEnd
					]);
				}
			},
			{
				key: "runStepAnimation",
				value: function runStepAnimation(props) {
					var _this3 = this;
					var steps = props.steps, begin = props.begin, onAnimationStart = props.onAnimationStart;
					var _steps$ = steps[0], initialStyle = _steps$.style, _steps$$duration = _steps$.duration, initialTime = _steps$$duration === void 0 ? 0 : _steps$$duration;
					return this.manager.start([onAnimationStart].concat(_toConsumableArray$2(steps.reduce(function addStyle(sequence, nextItem, index) {
						if (index === 0) return sequence;
						var duration = nextItem.duration, _nextItem$easing = nextItem.easing, easing = _nextItem$easing === void 0 ? "ease" : _nextItem$easing, style = nextItem.style, nextProperties = nextItem.properties, onAnimationEnd = nextItem.onAnimationEnd;
						var preItem = index > 0 ? steps[index - 1] : nextItem;
						var properties = nextProperties || Object.keys(style);
						if (typeof easing === "function" || easing === "spring") return [].concat(_toConsumableArray$2(sequence), [_this3.runJSAnimation.bind(_this3, {
							from: preItem.style,
							to: style,
							duration,
							easing
						}), duration]);
						var transition = getTransitionVal(properties, duration, easing);
						var newStyle = _objectSpread$16(_objectSpread$16(_objectSpread$16({}, preItem.style), style), {}, { transition });
						return [].concat(_toConsumableArray$2(sequence), [
							newStyle,
							duration,
							onAnimationEnd
						]).filter(identity);
					}, [initialStyle, Math.max(initialTime, begin)])), [props.onAnimationEnd]));
				}
			},
			{
				key: "runAnimation",
				value: function runAnimation(props) {
					if (!this.manager) this.manager = createAnimateManager();
					var begin = props.begin, duration = props.duration, attributeName = props.attributeName, propsTo = props.to, easing = props.easing, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd, steps = props.steps, children = props.children;
					var manager = this.manager;
					this.unSubscribe = manager.subscribe(this.handleStyleChange);
					if (typeof easing === "function" || typeof children === "function" || easing === "spring") {
						this.runJSAnimation(props);
						return;
					}
					if (steps.length > 1) {
						this.runStepAnimation(props);
						return;
					}
					var to = attributeName ? _defineProperty$19({}, attributeName, propsTo) : propsTo;
					var transition = getTransitionVal(Object.keys(to), duration, easing);
					manager.start([
						onAnimationStart,
						begin,
						_objectSpread$16(_objectSpread$16({}, to), {}, { transition }),
						duration,
						onAnimationEnd
					]);
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$props4 = this.props, children = _this$props4.children;
					_this$props4.begin;
					var duration = _this$props4.duration;
					_this$props4.attributeName;
					_this$props4.easing;
					var isActive = _this$props4.isActive;
					_this$props4.steps;
					_this$props4.from;
					_this$props4.to;
					_this$props4.canBegin;
					_this$props4.onAnimationEnd;
					_this$props4.shouldReAnimate;
					_this$props4.onAnimationReStart;
					var others = _objectWithoutProperties$6(_this$props4, _excluded$6);
					var count = Children.count(children);
					var stateStyle = this.state.style;
					if (typeof children === "function") return children(stateStyle);
					if (!isActive || count === 0 || duration <= 0) return children;
					var cloneContainer = function cloneContainer(container) {
						var _container$props = container.props, _container$props$styl = _container$props.style, style = _container$props$styl === void 0 ? {} : _container$props$styl, className = _container$props.className;
						return /* @__PURE__ */ cloneElement(container, _objectSpread$16(_objectSpread$16({}, others), {}, {
							style: _objectSpread$16(_objectSpread$16({}, style), stateStyle),
							className
						}));
					};
					if (count === 1) return cloneContainer(Children.only(children));
					return /*#__PURE__*/ React.createElement("div", null, Children.map(children, function(child) {
						return cloneContainer(child);
					}));
				}
			}
		]);
		return Animate;
	}(PureComponent);
	Animate.displayName = "Animate";
	Animate.defaultProps = {
		begin: 0,
		duration: 1e3,
		from: "",
		to: "",
		attributeName: "",
		easing: "ease",
		isActive: true,
		canBegin: true,
		steps: [],
		onAnimationEnd: function onAnimationEnd() {},
		onAnimationStart: function onAnimationStart() {}
	};
	Animate.propTypes = {
		from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		attributeName: PropTypes.string,
		duration: PropTypes.number,
		begin: PropTypes.number,
		easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		steps: PropTypes.arrayOf(PropTypes.shape({
			duration: PropTypes.number.isRequired,
			style: PropTypes.object.isRequired,
			easing: PropTypes.oneOfType([PropTypes.oneOf([
				"ease",
				"ease-in",
				"ease-out",
				"ease-in-out",
				"linear"
			]), PropTypes.func]),
			properties: PropTypes.arrayOf("string"),
			onAnimationEnd: PropTypes.func
		})),
		children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
		isActive: PropTypes.bool,
		canBegin: PropTypes.bool,
		onAnimationEnd: PropTypes.func,
		shouldReAnimate: PropTypes.bool,
		onAnimationStart: PropTypes.func,
		onAnimationReStart: PropTypes.func
	};
}));
//#endregion
//#region node_modules/react-smooth/es6/index.js
var es6_default;
var init_es6$1 = __esmMin((() => {
	init_Animate();
	es6_default = Animate;
}));
//#endregion
//#region node_modules/recharts/es6/shape/Rectangle.js
/**
* @fileOverview Rectangle
*/
function _typeof$18(o) {
	"@babel/helpers - typeof";
	return _typeof$18 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$18(o);
}
function _extends$13() {
	_extends$13 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$13.apply(this, arguments);
}
function _slicedToArray$3(arr, i) {
	return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$3(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$3(arr) {
	if (Array.isArray(arr)) return arr;
}
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r) {
			_defineProperty$18(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$18(obj, key, value) {
	key = _toPropertyKey$18(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$18(t) {
	var i = _toPrimitive$18(t, "string");
	return "symbol" == _typeof$18(i) ? i : i + "";
}
function _toPrimitive$18(t, r) {
	if ("object" != _typeof$18(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$18(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getRectanglePath, isInRectangle, defaultProps$1, Rectangle;
var init_Rectangle = __esmMin((() => {
	init_clsx();
	init_es6$1();
	init_ReactUtils();
	getRectanglePath = function getRectanglePath(x, y, width, height, radius) {
		var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
		var ySign = height >= 0 ? 1 : -1;
		var xSign = width >= 0 ? 1 : -1;
		var clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0;
		var path;
		if (maxRadius > 0 && radius instanceof Array) {
			var newRadius = [
				0,
				0,
				0,
				0
			];
			for (var i = 0, len = 4; i < len; i++) newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
			path = "M".concat(x, ",").concat(y + ySign * newRadius[0]);
			if (newRadius[0] > 0) path += "A ".concat(newRadius[0], ",").concat(newRadius[0], ",0,0,").concat(clockWise, ",").concat(x + xSign * newRadius[0], ",").concat(y);
			path += "L ".concat(x + width - xSign * newRadius[1], ",").concat(y);
			if (newRadius[1] > 0) path += "A ".concat(newRadius[1], ",").concat(newRadius[1], ",0,0,").concat(clockWise, ",\n        ").concat(x + width, ",").concat(y + ySign * newRadius[1]);
			path += "L ".concat(x + width, ",").concat(y + height - ySign * newRadius[2]);
			if (newRadius[2] > 0) path += "A ".concat(newRadius[2], ",").concat(newRadius[2], ",0,0,").concat(clockWise, ",\n        ").concat(x + width - xSign * newRadius[2], ",").concat(y + height);
			path += "L ".concat(x + xSign * newRadius[3], ",").concat(y + height);
			if (newRadius[3] > 0) path += "A ".concat(newRadius[3], ",").concat(newRadius[3], ",0,0,").concat(clockWise, ",\n        ").concat(x, ",").concat(y + height - ySign * newRadius[3]);
			path += "Z";
		} else if (maxRadius > 0 && radius === +radius && radius > 0) {
			var _newRadius = Math.min(maxRadius, radius);
			path = "M ".concat(x, ",").concat(y + ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + xSign * _newRadius, ",").concat(y, "\n            L ").concat(x + width - xSign * _newRadius, ",").concat(y, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + width, ",").concat(y + ySign * _newRadius, "\n            L ").concat(x + width, ",").concat(y + height - ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + width - xSign * _newRadius, ",").concat(y + height, "\n            L ").concat(x + xSign * _newRadius, ",").concat(y + height, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x, ",").concat(y + height - ySign * _newRadius, " Z");
		} else path = "M ".concat(x, ",").concat(y, " h ").concat(width, " v ").concat(height, " h ").concat(-width, " Z");
		return path;
	};
	isInRectangle = function isInRectangle(point, rect) {
		if (!point || !rect) return false;
		var px = point.x, py = point.y;
		var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
		if (Math.abs(width) > 0 && Math.abs(height) > 0) {
			var minX = Math.min(x, x + width);
			var maxX = Math.max(x, x + width);
			var minY = Math.min(y, y + height);
			var maxY = Math.max(y, y + height);
			return px >= minX && px <= maxX && py >= minY && py <= maxY;
		}
		return false;
	};
	defaultProps$1 = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radius: 0,
		isAnimationActive: false,
		isUpdateAnimationActive: false,
		animationBegin: 0,
		animationDuration: 1500,
		animationEasing: "ease"
	};
	Rectangle = function Rectangle(rectangleProps) {
		var props = _objectSpread$15(_objectSpread$15({}, defaultProps$1), rectangleProps);
		var pathRef = useRef();
		var _useState2 = _slicedToArray$3(useState(-1), 2), totalLength = _useState2[0], setTotalLength = _useState2[1];
		useEffect(function() {
			if (pathRef.current && pathRef.current.getTotalLength) try {
				var pathTotalLength = pathRef.current.getTotalLength();
				if (pathTotalLength) setTotalLength(pathTotalLength);
			} catch (err) {}
		}, []);
		var x = props.x, y = props.y, width = props.width, height = props.height, radius = props.radius, className = props.className;
		var animationEasing = props.animationEasing, animationDuration = props.animationDuration, animationBegin = props.animationBegin, isAnimationActive = props.isAnimationActive, isUpdateAnimationActive = props.isUpdateAnimationActive;
		if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) return null;
		var layerClass = clsx("recharts-rectangle", className);
		if (!isUpdateAnimationActive) return /*#__PURE__*/ React.createElement("path", _extends$13({}, filterProps(props, true), {
			className: layerClass,
			d: getRectanglePath(x, y, width, height, radius)
		}));
		return /*#__PURE__*/ React.createElement(es6_default, {
			canBegin: totalLength > 0,
			from: {
				width,
				height,
				x,
				y
			},
			to: {
				width,
				height,
				x,
				y
			},
			duration: animationDuration,
			animationEasing,
			isActive: isUpdateAnimationActive
		}, function(_ref) {
			var currWidth = _ref.width, currHeight = _ref.height, currX = _ref.x, currY = _ref.y;
			return /*#__PURE__*/ React.createElement(es6_default, {
				canBegin: totalLength > 0,
				from: "0px ".concat(totalLength === -1 ? 1 : totalLength, "px"),
				to: "".concat(totalLength, "px 0px"),
				attributeName: "strokeDasharray",
				begin: animationBegin,
				duration: animationDuration,
				isActive: isAnimationActive,
				easing: animationEasing
			}, /*#__PURE__*/ React.createElement("path", _extends$13({}, filterProps(props, true), {
				className: layerClass,
				d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
				ref: pathRef
			})));
		});
	};
}));
//#endregion
//#region node_modules/recharts/es6/shape/Dot.js
/**
* @fileOverview Dot
*/
function _extends$12() {
	_extends$12 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$12.apply(this, arguments);
}
var Dot;
var init_Dot = __esmMin((() => {
	init_clsx();
	init_types();
	init_ReactUtils();
	Dot = function Dot(props) {
		var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
		var layerClass = clsx("recharts-dot", className);
		if (cx === +cx && cy === +cy && r === +r) return /*#__PURE__*/ React.createElement("circle", _extends$12({}, filterProps(props, false), adaptEventHandlers(props), {
			className: layerClass,
			cx,
			cy,
			r
		}));
		return null;
	};
}));
//#endregion
//#region node_modules/recharts/es6/shape/Cross.js
/**
* @fileOverview Cross
*/
function _typeof$17(o) {
	"@babel/helpers - typeof";
	return _typeof$17 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$17(o);
}
function _extends$11() {
	_extends$11 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$11.apply(this, arguments);
}
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r) {
			_defineProperty$17(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$17(obj, key, value) {
	key = _toPropertyKey$17(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$17(t) {
	var i = _toPrimitive$17(t, "string");
	return "symbol" == _typeof$17(i) ? i : i + "";
}
function _toPrimitive$17(t, r) {
	if ("object" != _typeof$17(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$17(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$5(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$5(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$5(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var _excluded$5, getPath, Cross;
var init_Cross = __esmMin((() => {
	init_clsx();
	init_DataUtils();
	init_ReactUtils();
	_excluded$5 = [
		"x",
		"y",
		"top",
		"left",
		"width",
		"height",
		"className"
	];
	getPath = function getPath(x, y, width, height, top, left) {
		return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
	};
	Cross = function Cross(_ref) {
		var _ref$x = _ref.x, x = _ref$x === void 0 ? 0 : _ref$x, _ref$y = _ref.y, y = _ref$y === void 0 ? 0 : _ref$y, _ref$top = _ref.top, top = _ref$top === void 0 ? 0 : _ref$top, _ref$left = _ref.left, left = _ref$left === void 0 ? 0 : _ref$left, _ref$width = _ref.width, width = _ref$width === void 0 ? 0 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 0 : _ref$height, className = _ref.className, rest = _objectWithoutProperties$5(_ref, _excluded$5);
		var props = _objectSpread$14({
			x,
			y,
			top,
			left,
			width,
			height
		}, rest);
		if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) return null;
		return /*#__PURE__*/ React.createElement("path", _extends$11({}, filterProps(props, true), {
			className: clsx("recharts-cross", className),
			d: getPath(x, y, width, height, top, left)
		}));
	};
}));
//#endregion
//#region node_modules/lodash-es/_getPrototype.js
var getPrototype;
var init__getPrototype = __esmMin((() => {
	init__overArg();
	getPrototype = overArg(Object.getPrototypeOf, Object);
}));
//#endregion
//#region node_modules/lodash-es/isPlainObject.js
/**
* Checks if `value` is a plain object, that is, an object created by the
* `Object` constructor or one with a `[[Prototype]]` of `null`.
*
* @static
* @memberOf _
* @since 0.8.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
* @example
*
* function Foo() {
*   this.a = 1;
* }
*
* _.isPlainObject(new Foo);
* // => false
*
* _.isPlainObject([1, 2, 3]);
* // => false
*
* _.isPlainObject({ 'x': 0, 'y': 0 });
* // => true
*
* _.isPlainObject(Object.create(null));
* // => true
*/
function isPlainObject(value) {
	if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
	var proto = getPrototype(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var objectTag, funcProto, objectProto, funcToString, hasOwnProperty, objectCtorString;
var init_isPlainObject = __esmMin((() => {
	init__baseGetTag();
	init__getPrototype();
	init_isObjectLike();
	objectTag = "[object Object]";
	funcProto = Function.prototype;
	objectProto = Object.prototype;
	funcToString = funcProto.toString;
	hasOwnProperty = objectProto.hasOwnProperty;
	objectCtorString = funcToString.call(Object);
}));
//#endregion
//#region node_modules/lodash-es/isBoolean.js
/**
* Checks if `value` is classified as a boolean primitive or object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
* @example
*
* _.isBoolean(false);
* // => true
*
* _.isBoolean(null);
* // => false
*/
function isBoolean(value) {
	return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
}
var boolTag;
var init_isBoolean = __esmMin((() => {
	init__baseGetTag();
	init_isObjectLike();
	boolTag = "[object Boolean]";
}));
//#endregion
//#region node_modules/recharts/es6/shape/Trapezoid.js
/**
* @fileOverview Rectangle
*/
function _typeof$16(o) {
	"@babel/helpers - typeof";
	return _typeof$16 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$16(o);
}
function _extends$10() {
	_extends$10 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$10.apply(this, arguments);
}
function _slicedToArray$2(arr, i) {
	return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$2(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$2(arr) {
	if (Array.isArray(arr)) return arr;
}
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r) {
			_defineProperty$16(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$16(obj, key, value) {
	key = _toPropertyKey$16(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$16(t) {
	var i = _toPrimitive$16(t, "string");
	return "symbol" == _typeof$16(i) ? i : i + "";
}
function _toPrimitive$16(t, r) {
	if ("object" != _typeof$16(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$16(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getTrapezoidPath, defaultProps, Trapezoid;
var init_Trapezoid = __esmMin((() => {
	init_clsx();
	init_es6$1();
	init_ReactUtils();
	getTrapezoidPath = function getTrapezoidPath(x, y, upperWidth, lowerWidth, height) {
		var widthGap = upperWidth - lowerWidth;
		var path = "M ".concat(x, ",").concat(y);
		path += "L ".concat(x + upperWidth, ",").concat(y);
		path += "L ".concat(x + upperWidth - widthGap / 2, ",").concat(y + height);
		path += "L ".concat(x + upperWidth - widthGap / 2 - lowerWidth, ",").concat(y + height);
		path += "L ".concat(x, ",").concat(y, " Z");
		return path;
	};
	defaultProps = {
		x: 0,
		y: 0,
		upperWidth: 0,
		lowerWidth: 0,
		height: 0,
		isUpdateAnimationActive: false,
		animationBegin: 0,
		animationDuration: 1500,
		animationEasing: "ease"
	};
	Trapezoid = function Trapezoid(props) {
		var trapezoidProps = _objectSpread$13(_objectSpread$13({}, defaultProps), props);
		var pathRef = useRef();
		var _useState2 = _slicedToArray$2(useState(-1), 2), totalLength = _useState2[0], setTotalLength = _useState2[1];
		useEffect(function() {
			if (pathRef.current && pathRef.current.getTotalLength) try {
				var pathTotalLength = pathRef.current.getTotalLength();
				if (pathTotalLength) setTotalLength(pathTotalLength);
			} catch (err) {}
		}, []);
		var x = trapezoidProps.x, y = trapezoidProps.y, upperWidth = trapezoidProps.upperWidth, lowerWidth = trapezoidProps.lowerWidth, height = trapezoidProps.height, className = trapezoidProps.className;
		var animationEasing = trapezoidProps.animationEasing, animationDuration = trapezoidProps.animationDuration, animationBegin = trapezoidProps.animationBegin, isUpdateAnimationActive = trapezoidProps.isUpdateAnimationActive;
		if (x !== +x || y !== +y || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) return null;
		var layerClass = clsx("recharts-trapezoid", className);
		if (!isUpdateAnimationActive) return /*#__PURE__*/ React.createElement("g", null, /*#__PURE__*/ React.createElement("path", _extends$10({}, filterProps(trapezoidProps, true), {
			className: layerClass,
			d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height)
		})));
		return /*#__PURE__*/ React.createElement(es6_default, {
			canBegin: totalLength > 0,
			from: {
				upperWidth: 0,
				lowerWidth: 0,
				height,
				x,
				y
			},
			to: {
				upperWidth,
				lowerWidth,
				height,
				x,
				y
			},
			duration: animationDuration,
			animationEasing,
			isActive: isUpdateAnimationActive
		}, function(_ref) {
			var currUpperWidth = _ref.upperWidth, currLowerWidth = _ref.lowerWidth, currHeight = _ref.height, currX = _ref.x, currY = _ref.y;
			return /*#__PURE__*/ React.createElement(es6_default, {
				canBegin: totalLength > 0,
				from: "0px ".concat(totalLength === -1 ? 1 : totalLength, "px"),
				to: "".concat(totalLength, "px 0px"),
				attributeName: "strokeDasharray",
				begin: animationBegin,
				duration: animationDuration,
				easing: animationEasing
			}, /*#__PURE__*/ React.createElement("path", _extends$10({}, filterProps(trapezoidProps, true), {
				className: layerClass,
				d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
				ref: pathRef
			})));
		});
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/ActiveShapeUtils.js
function _typeof$15(o) {
	"@babel/helpers - typeof";
	return _typeof$15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$15(o);
}
function _objectWithoutProperties$4(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$4(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$4(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r) {
			_defineProperty$15(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$15(obj, key, value) {
	key = _toPropertyKey$15(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$15(t) {
	var i = _toPrimitive$15(t, "string");
	return "symbol" == _typeof$15(i) ? i : i + "";
}
function _toPrimitive$15(t, r) {
	if ("object" != _typeof$15(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$15(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* This is an abstraction for rendering a user defined prop for a customized shape in several forms.
*
* <Shape /> is the root and will handle taking in:
*  - an object of svg properties
*  - a boolean
*  - a render prop(inline function that returns jsx)
*  - a react element
*
* <ShapeSelector /> is a subcomponent of <Shape /> and used to match a component
* to the value of props.shapeType that is passed to the root.
*
*/
function defaultPropTransformer(option, props) {
	return _objectSpread$12(_objectSpread$12({}, props), option);
}
function isSymbolsProps(shapeType, _elementProps) {
	return shapeType === "symbols";
}
function ShapeSelector(_ref) {
	var shapeType = _ref.shapeType, elementProps = _ref.elementProps;
	switch (shapeType) {
		case "rectangle": return /*#__PURE__*/ React.createElement(Rectangle, elementProps);
		case "trapezoid": return /*#__PURE__*/ React.createElement(Trapezoid, elementProps);
		case "sector": return /*#__PURE__*/ React.createElement(Sector, elementProps);
		case "symbols":
			if (isSymbolsProps(shapeType, elementProps)) return /*#__PURE__*/ React.createElement(Symbols, elementProps);
			break;
		default: return null;
	}
}
function getPropsFromShapeOption(option) {
	if (/*#__PURE__*/ isValidElement(option)) return option.props;
	return option;
}
function Shape(_ref2) {
	var option = _ref2.option, shapeType = _ref2.shapeType, _ref2$propTransformer = _ref2.propTransformer, propTransformer = _ref2$propTransformer === void 0 ? defaultPropTransformer : _ref2$propTransformer, _ref2$activeClassName = _ref2.activeClassName, activeClassName = _ref2$activeClassName === void 0 ? "recharts-active-shape" : _ref2$activeClassName, isActive = _ref2.isActive, props = _objectWithoutProperties$4(_ref2, _excluded$4);
	var shape;
	if (/*#__PURE__*/ isValidElement(option)) shape = /*#__PURE__*/ cloneElement(option, _objectSpread$12(_objectSpread$12({}, props), getPropsFromShapeOption(option)));
	else if (isFunction(option)) shape = option(props);
	else if (isPlainObject(option) && !isBoolean(option)) {
		var nextProps = propTransformer(option, props);
		shape = /*#__PURE__*/ React.createElement(ShapeSelector, {
			shapeType,
			elementProps: nextProps
		});
	} else {
		var elementProps = props;
		shape = /*#__PURE__*/ React.createElement(ShapeSelector, {
			shapeType,
			elementProps
		});
	}
	if (isActive) return /*#__PURE__*/ React.createElement(Layer, { className: activeClassName }, shape);
	return shape;
}
/**
* This is an abstraction to handle identifying the active index from a tooltip mouse interaction
*/
function isFunnel(graphicalItem, _item) {
	return _item != null && "trapezoids" in graphicalItem.props;
}
function isPie(graphicalItem, _item) {
	return _item != null && "sectors" in graphicalItem.props;
}
function isScatter(graphicalItem, _item) {
	return _item != null && "points" in graphicalItem.props;
}
function compareFunnel(shapeData, activeTooltipItem) {
	var _activeTooltipItem$la, _activeTooltipItem$la2;
	var xMatches = shapeData.x === (activeTooltipItem === null || activeTooltipItem === void 0 || (_activeTooltipItem$la = activeTooltipItem.labelViewBox) === null || _activeTooltipItem$la === void 0 ? void 0 : _activeTooltipItem$la.x) || shapeData.x === activeTooltipItem.x;
	var yMatches = shapeData.y === (activeTooltipItem === null || activeTooltipItem === void 0 || (_activeTooltipItem$la2 = activeTooltipItem.labelViewBox) === null || _activeTooltipItem$la2 === void 0 ? void 0 : _activeTooltipItem$la2.y) || shapeData.y === activeTooltipItem.y;
	return xMatches && yMatches;
}
function comparePie(shapeData, activeTooltipItem) {
	var startAngleMatches = shapeData.endAngle === activeTooltipItem.endAngle;
	var endAngleMatches = shapeData.startAngle === activeTooltipItem.startAngle;
	return startAngleMatches && endAngleMatches;
}
function compareScatter(shapeData, activeTooltipItem) {
	var xMatches = shapeData.x === activeTooltipItem.x;
	var yMatches = shapeData.y === activeTooltipItem.y;
	var zMatches = shapeData.z === activeTooltipItem.z;
	return xMatches && yMatches && zMatches;
}
function getComparisonFn(graphicalItem, activeItem) {
	var comparison;
	if (isFunnel(graphicalItem, activeItem)) comparison = compareFunnel;
	else if (isPie(graphicalItem, activeItem)) comparison = comparePie;
	else if (isScatter(graphicalItem, activeItem)) comparison = compareScatter;
	return comparison;
}
function getShapeDataKey(graphicalItem, activeItem) {
	var shapeKey;
	if (isFunnel(graphicalItem, activeItem)) shapeKey = "trapezoids";
	else if (isPie(graphicalItem, activeItem)) shapeKey = "sectors";
	else if (isScatter(graphicalItem, activeItem)) shapeKey = "points";
	return shapeKey;
}
function getActiveShapeTooltipPayload(graphicalItem, activeItem) {
	if (isFunnel(graphicalItem, activeItem)) {
		var _activeItem$tooltipPa;
		return (_activeItem$tooltipPa = activeItem.tooltipPayload) === null || _activeItem$tooltipPa === void 0 || (_activeItem$tooltipPa = _activeItem$tooltipPa[0]) === null || _activeItem$tooltipPa === void 0 || (_activeItem$tooltipPa = _activeItem$tooltipPa.payload) === null || _activeItem$tooltipPa === void 0 ? void 0 : _activeItem$tooltipPa.payload;
	}
	if (isPie(graphicalItem, activeItem)) {
		var _activeItem$tooltipPa2;
		return (_activeItem$tooltipPa2 = activeItem.tooltipPayload) === null || _activeItem$tooltipPa2 === void 0 || (_activeItem$tooltipPa2 = _activeItem$tooltipPa2[0]) === null || _activeItem$tooltipPa2 === void 0 || (_activeItem$tooltipPa2 = _activeItem$tooltipPa2.payload) === null || _activeItem$tooltipPa2 === void 0 ? void 0 : _activeItem$tooltipPa2.payload;
	}
	if (isScatter(graphicalItem, activeItem)) return activeItem.payload;
	return {};
}
/**
*
* @param {GetActiveShapeIndexForTooltip} arg an object of incoming attributes from Tooltip
* @returns {number}
*
* To handle possible duplicates in the data set,
* match both the data value of the active item to a data value on a graph item,
* and match the mouse coordinates of the active item to the coordinates of in a particular components shape data.
* This assumes equal lengths of shape objects to data items.
*/
function getActiveShapeIndexForTooltip(_ref3) {
	var activeTooltipItem = _ref3.activeTooltipItem, graphicalItem = _ref3.graphicalItem, itemData = _ref3.itemData;
	var shapeKey = getShapeDataKey(graphicalItem, activeTooltipItem);
	var tooltipPayload = getActiveShapeTooltipPayload(graphicalItem, activeTooltipItem);
	var activeItemMatches = itemData.filter(function(datum, dataIndex) {
		var valuesMatch = isEqual(tooltipPayload, datum);
		var mouseCoordinateMatches = graphicalItem.props[shapeKey].filter(function(shapeData) {
			return getComparisonFn(graphicalItem, activeTooltipItem)(shapeData, activeTooltipItem);
		});
		var coordinatesMatch = dataIndex === graphicalItem.props[shapeKey].indexOf(mouseCoordinateMatches[mouseCoordinateMatches.length - 1]);
		return valuesMatch && coordinatesMatch;
	});
	return itemData.indexOf(activeItemMatches[activeItemMatches.length - 1]);
}
var _excluded$4;
var init_ActiveShapeUtils = __esmMin((() => {
	init_isFunction();
	init_isPlainObject();
	init_isBoolean();
	init_isEqual();
	init_Rectangle();
	init_Trapezoid();
	init_Sector();
	init_Layer();
	init_Symbols();
	_excluded$4 = [
		"option",
		"shapeType",
		"propTransformer",
		"activeClassName",
		"isActive"
	];
}));
//#endregion
//#region node_modules/lodash-es/_baseRange.js
/**
* The base implementation of `_.range` and `_.rangeRight` which doesn't
* coerce arguments.
*
* @private
* @param {number} start The start of the range.
* @param {number} end The end of the range.
* @param {number} step The value to increment or decrement by.
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Array} Returns the range of numbers.
*/
function baseRange(start, end, step, fromRight) {
	var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
	while (length--) {
		result[fromRight ? length : ++index] = start;
		start += step;
	}
	return result;
}
var nativeCeil, nativeMax;
var init__baseRange = __esmMin((() => {
	nativeCeil = Math.ceil;
	nativeMax = Math.max;
}));
//#endregion
//#region node_modules/lodash-es/toFinite.js
/**
* Converts `value` to a finite number.
*
* @static
* @memberOf _
* @since 4.12.0
* @category Lang
* @param {*} value The value to convert.
* @returns {number} Returns the converted number.
* @example
*
* _.toFinite(3.2);
* // => 3.2
*
* _.toFinite(Number.MIN_VALUE);
* // => 5e-324
*
* _.toFinite(Infinity);
* // => 1.7976931348623157e+308
*
* _.toFinite('3.2');
* // => 3.2
*/
function toFinite(value) {
	if (!value) return value === 0 ? value : 0;
	value = toNumber(value);
	if (value === INFINITY || value === -INFINITY) return (value < 0 ? -1 : 1) * MAX_INTEGER;
	return value === value ? value : 0;
}
var INFINITY, MAX_INTEGER;
var init_toFinite = __esmMin((() => {
	init_toNumber();
	INFINITY = Infinity;
	MAX_INTEGER = 17976931348623157e292;
}));
//#endregion
//#region node_modules/lodash-es/_createRange.js
/**
* Creates a `_.range` or `_.rangeRight` function.
*
* @private
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new range function.
*/
function createRange(fromRight) {
	return function(start, end, step) {
		if (step && typeof step != "number" && isIterateeCall(start, end, step)) end = step = void 0;
		start = toFinite(start);
		if (end === void 0) {
			end = start;
			start = 0;
		} else end = toFinite(end);
		step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
		return baseRange(start, end, step, fromRight);
	};
}
var init__createRange = __esmMin((() => {
	init__baseRange();
	init__isIterateeCall();
	init_toFinite();
}));
//#endregion
//#region node_modules/lodash-es/range.js
var range;
var init_range = __esmMin((() => {
	init__createRange();
	range = createRange();
}));
//#endregion
//#region node_modules/recharts/es6/util/CssPrefixUtils.js
function _typeof$14(o) {
	"@babel/helpers - typeof";
	return _typeof$14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$14(o);
}
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r) {
			_defineProperty$14(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$14(obj, key, value) {
	key = _toPropertyKey$14(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$14(t) {
	var i = _toPrimitive$14(t, "string");
	return "symbol" == _typeof$14(i) ? i : i + "";
}
function _toPrimitive$14(t, r) {
	if ("object" != _typeof$14(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$14(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var PREFIX_LIST, generatePrefixStyle;
var init_CssPrefixUtils = __esmMin((() => {
	PREFIX_LIST = [
		"Webkit",
		"Moz",
		"O",
		"ms"
	];
	generatePrefixStyle = function generatePrefixStyle(name, value) {
		if (!name) return null;
		var camelName = name.replace(/(\w)/, function(v) {
			return v.toUpperCase();
		});
		var result = PREFIX_LIST.reduce(function(res, entry) {
			return _objectSpread$11(_objectSpread$11({}, res), {}, _defineProperty$14({}, entry + camelName, value));
		}, {});
		result[name] = value;
		return result;
	};
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/Brush.js
/**
* @fileOverview Brush
*/
function _typeof$13(o) {
	"@babel/helpers - typeof";
	return _typeof$13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$13(o);
}
function _extends$9() {
	_extends$9 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$9.apply(this, arguments);
}
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r) {
			_defineProperty$13(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$10(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$10(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$13(descriptor.key), descriptor);
	}
}
function _createClass$10(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$10(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$10(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$8(t, o, e) {
	return o = _getPrototypeOf$8(o), _possibleConstructorReturn$8(t, _isNativeReflectConstruct$8() ? Reflect.construct(o, e || [], _getPrototypeOf$8(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$8(self, call) {
	if (call && (_typeof$13(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$8(self);
}
function _assertThisInitialized$8(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$8() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$8 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$8(o) {
	_getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$8(o);
}
function _inherits$8(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$8(subClass, superClass);
}
function _setPrototypeOf$8(o, p) {
	_setPrototypeOf$8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$8(o, p);
}
function _defineProperty$13(obj, key, value) {
	key = _toPropertyKey$13(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$13(t) {
	var i = _toPrimitive$13(t, "string");
	return "symbol" == _typeof$13(i) ? i : i + "";
}
function _toPrimitive$13(t, r) {
	if ("object" != _typeof$13(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$13(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var createScale, isTouch, Brush;
var init_Brush = __esmMin((() => {
	init_clsx();
	init_d3_scale();
	init_isFunction();
	init_range();
	init_Layer();
	init_Text();
	init_ChartUtils();
	init_DataUtils();
	init_CssPrefixUtils();
	init_ReactUtils();
	createScale = function createScale(_ref) {
		var data = _ref.data, startIndex = _ref.startIndex, endIndex = _ref.endIndex, x = _ref.x, width = _ref.width, travellerWidth = _ref.travellerWidth;
		if (!data || !data.length) return {};
		var len = data.length;
		var scale = point().domain(range(0, len)).range([x, x + width - travellerWidth]);
		var scaleValues = scale.domain().map(function(entry) {
			return scale(entry);
		});
		return {
			isTextActive: false,
			isSlideMoving: false,
			isTravellerMoving: false,
			isTravellerFocused: false,
			startX: scale(startIndex),
			endX: scale(endIndex),
			scale,
			scaleValues
		};
	};
	isTouch = function isTouch(e) {
		return e.changedTouches && !!e.changedTouches.length;
	};
	Brush = /*#__PURE__*/ function(_PureComponent) {
		function Brush(props) {
			var _this;
			_classCallCheck$10(this, Brush);
			_this = _callSuper$8(this, Brush, [props]);
			_defineProperty$13(_this, "handleDrag", function(e) {
				if (_this.leaveTimer) {
					clearTimeout(_this.leaveTimer);
					_this.leaveTimer = null;
				}
				if (_this.state.isTravellerMoving) _this.handleTravellerMove(e);
				else if (_this.state.isSlideMoving) _this.handleSlideDrag(e);
			});
			_defineProperty$13(_this, "handleTouchMove", function(e) {
				if (e.changedTouches != null && e.changedTouches.length > 0) _this.handleDrag(e.changedTouches[0]);
			});
			_defineProperty$13(_this, "handleDragEnd", function() {
				_this.setState({
					isTravellerMoving: false,
					isSlideMoving: false
				}, function() {
					var _this$props = _this.props, endIndex = _this$props.endIndex, onDragEnd = _this$props.onDragEnd, startIndex = _this$props.startIndex;
					onDragEnd === null || onDragEnd === void 0 || onDragEnd({
						endIndex,
						startIndex
					});
				});
				_this.detachDragEndListener();
			});
			_defineProperty$13(_this, "handleLeaveWrapper", function() {
				if (_this.state.isTravellerMoving || _this.state.isSlideMoving) _this.leaveTimer = window.setTimeout(_this.handleDragEnd, _this.props.leaveTimeOut);
			});
			_defineProperty$13(_this, "handleEnterSlideOrTraveller", function() {
				_this.setState({ isTextActive: true });
			});
			_defineProperty$13(_this, "handleLeaveSlideOrTraveller", function() {
				_this.setState({ isTextActive: false });
			});
			_defineProperty$13(_this, "handleSlideDragStart", function(e) {
				var event = isTouch(e) ? e.changedTouches[0] : e;
				_this.setState({
					isTravellerMoving: false,
					isSlideMoving: true,
					slideMoveStartX: event.pageX
				});
				_this.attachDragEndListener();
			});
			_this.travellerDragStartHandlers = {
				startX: _this.handleTravellerDragStart.bind(_this, "startX"),
				endX: _this.handleTravellerDragStart.bind(_this, "endX")
			};
			_this.state = {};
			return _this;
		}
		_inherits$8(Brush, _PureComponent);
		return _createClass$10(Brush, [
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					if (this.leaveTimer) {
						clearTimeout(this.leaveTimer);
						this.leaveTimer = null;
					}
					this.detachDragEndListener();
				}
			},
			{
				key: "getIndex",
				value: function getIndex(_ref2) {
					var startX = _ref2.startX, endX = _ref2.endX;
					var scaleValues = this.state.scaleValues;
					var _this$props2 = this.props, gap = _this$props2.gap;
					var lastIndex = _this$props2.data.length - 1;
					var min = Math.min(startX, endX);
					var max = Math.max(startX, endX);
					var minIndex = Brush.getIndexInRange(scaleValues, min);
					var maxIndex = Brush.getIndexInRange(scaleValues, max);
					return {
						startIndex: minIndex - minIndex % gap,
						endIndex: maxIndex === lastIndex ? lastIndex : maxIndex - maxIndex % gap
					};
				}
			},
			{
				key: "getTextOfTick",
				value: function getTextOfTick(index) {
					var _this$props3 = this.props, data = _this$props3.data, tickFormatter = _this$props3.tickFormatter, dataKey = _this$props3.dataKey;
					var text = getValueByDataKey(data[index], dataKey, index);
					return isFunction(tickFormatter) ? tickFormatter(text, index) : text;
				}
			},
			{
				key: "attachDragEndListener",
				value: function attachDragEndListener() {
					window.addEventListener("mouseup", this.handleDragEnd, true);
					window.addEventListener("touchend", this.handleDragEnd, true);
					window.addEventListener("mousemove", this.handleDrag, true);
				}
			},
			{
				key: "detachDragEndListener",
				value: function detachDragEndListener() {
					window.removeEventListener("mouseup", this.handleDragEnd, true);
					window.removeEventListener("touchend", this.handleDragEnd, true);
					window.removeEventListener("mousemove", this.handleDrag, true);
				}
			},
			{
				key: "handleSlideDrag",
				value: function handleSlideDrag(e) {
					var _this$state = this.state, slideMoveStartX = _this$state.slideMoveStartX, startX = _this$state.startX, endX = _this$state.endX;
					var _this$props4 = this.props, x = _this$props4.x, width = _this$props4.width, travellerWidth = _this$props4.travellerWidth, startIndex = _this$props4.startIndex, endIndex = _this$props4.endIndex, onChange = _this$props4.onChange;
					var delta = e.pageX - slideMoveStartX;
					if (delta > 0) delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
					else if (delta < 0) delta = Math.max(delta, x - startX, x - endX);
					var newIndex = this.getIndex({
						startX: startX + delta,
						endX: endX + delta
					});
					if ((newIndex.startIndex !== startIndex || newIndex.endIndex !== endIndex) && onChange) onChange(newIndex);
					this.setState({
						startX: startX + delta,
						endX: endX + delta,
						slideMoveStartX: e.pageX
					});
				}
			},
			{
				key: "handleTravellerDragStart",
				value: function handleTravellerDragStart(id, e) {
					var event = isTouch(e) ? e.changedTouches[0] : e;
					this.setState({
						isSlideMoving: false,
						isTravellerMoving: true,
						movingTravellerId: id,
						brushMoveStartX: event.pageX
					});
					this.attachDragEndListener();
				}
			},
			{
				key: "handleTravellerMove",
				value: function handleTravellerMove(e) {
					var _this$state2 = this.state, brushMoveStartX = _this$state2.brushMoveStartX, movingTravellerId = _this$state2.movingTravellerId, endX = _this$state2.endX, startX = _this$state2.startX;
					var prevValue = this.state[movingTravellerId];
					var _this$props5 = this.props, x = _this$props5.x, width = _this$props5.width, travellerWidth = _this$props5.travellerWidth, onChange = _this$props5.onChange, gap = _this$props5.gap, data = _this$props5.data;
					var params = {
						startX: this.state.startX,
						endX: this.state.endX
					};
					var delta = e.pageX - brushMoveStartX;
					if (delta > 0) delta = Math.min(delta, x + width - travellerWidth - prevValue);
					else if (delta < 0) delta = Math.max(delta, x - prevValue);
					params[movingTravellerId] = prevValue + delta;
					var newIndex = this.getIndex(params);
					var startIndex = newIndex.startIndex, endIndex = newIndex.endIndex;
					var isFullGap = function isFullGap() {
						var lastIndex = data.length - 1;
						if (movingTravellerId === "startX" && (endX > startX ? startIndex % gap === 0 : endIndex % gap === 0) || endX < startX && endIndex === lastIndex || movingTravellerId === "endX" && (endX > startX ? endIndex % gap === 0 : startIndex % gap === 0) || endX > startX && endIndex === lastIndex) return true;
						return false;
					};
					this.setState(_defineProperty$13(_defineProperty$13({}, movingTravellerId, prevValue + delta), "brushMoveStartX", e.pageX), function() {
						if (onChange) {
							if (isFullGap()) onChange(newIndex);
						}
					});
				}
			},
			{
				key: "handleTravellerMoveKeyboard",
				value: function handleTravellerMoveKeyboard(direction, id) {
					var _this2 = this;
					var _this$state3 = this.state, scaleValues = _this$state3.scaleValues, startX = _this$state3.startX, endX = _this$state3.endX;
					var currentScaleValue = this.state[id];
					var currentIndex = scaleValues.indexOf(currentScaleValue);
					if (currentIndex === -1) return;
					var newIndex = currentIndex + direction;
					if (newIndex === -1 || newIndex >= scaleValues.length) return;
					var newScaleValue = scaleValues[newIndex];
					if (id === "startX" && newScaleValue >= endX || id === "endX" && newScaleValue <= startX) return;
					this.setState(_defineProperty$13({}, id, newScaleValue), function() {
						_this2.props.onChange(_this2.getIndex({
							startX: _this2.state.startX,
							endX: _this2.state.endX
						}));
					});
				}
			},
			{
				key: "renderBackground",
				value: function renderBackground() {
					var _this$props6 = this.props, x = _this$props6.x, y = _this$props6.y, width = _this$props6.width, height = _this$props6.height, fill = _this$props6.fill, stroke = _this$props6.stroke;
					return /*#__PURE__*/ React.createElement("rect", {
						stroke,
						fill,
						x,
						y,
						width,
						height
					});
				}
			},
			{
				key: "renderPanorama",
				value: function renderPanorama() {
					var _this$props7 = this.props, x = _this$props7.x, y = _this$props7.y, width = _this$props7.width, height = _this$props7.height, data = _this$props7.data, children = _this$props7.children, padding = _this$props7.padding;
					var chartElement = Children.only(children);
					if (!chartElement) return null;
					return /*#__PURE__*/ React.cloneElement(chartElement, {
						x,
						y,
						width,
						height,
						margin: padding,
						compact: true,
						data
					});
				}
			},
			{
				key: "renderTravellerLayer",
				value: function renderTravellerLayer(travellerX, id) {
					var _data$startIndex, _data$endIndex, _this3 = this;
					var _this$props8 = this.props, y = _this$props8.y, travellerWidth = _this$props8.travellerWidth, height = _this$props8.height, traveller = _this$props8.traveller, ariaLabel = _this$props8.ariaLabel, data = _this$props8.data, startIndex = _this$props8.startIndex, endIndex = _this$props8.endIndex;
					var x = Math.max(travellerX, this.props.x);
					var travellerProps = _objectSpread$10(_objectSpread$10({}, filterProps(this.props, false)), {}, {
						x,
						y,
						width: travellerWidth,
						height
					});
					var ariaLabelBrush = ariaLabel || "Min value: ".concat((_data$startIndex = data[startIndex]) === null || _data$startIndex === void 0 ? void 0 : _data$startIndex.name, ", Max value: ").concat((_data$endIndex = data[endIndex]) === null || _data$endIndex === void 0 ? void 0 : _data$endIndex.name);
					return /*#__PURE__*/ React.createElement(Layer, {
						tabIndex: 0,
						role: "slider",
						"aria-label": ariaLabelBrush,
						"aria-valuenow": travellerX,
						className: "recharts-brush-traveller",
						onMouseEnter: this.handleEnterSlideOrTraveller,
						onMouseLeave: this.handleLeaveSlideOrTraveller,
						onMouseDown: this.travellerDragStartHandlers[id],
						onTouchStart: this.travellerDragStartHandlers[id],
						onKeyDown: function onKeyDown(e) {
							if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
							e.preventDefault();
							e.stopPropagation();
							_this3.handleTravellerMoveKeyboard(e.key === "ArrowRight" ? 1 : -1, id);
						},
						onFocus: function onFocus() {
							_this3.setState({ isTravellerFocused: true });
						},
						onBlur: function onBlur() {
							_this3.setState({ isTravellerFocused: false });
						},
						style: { cursor: "col-resize" }
					}, Brush.renderTraveller(traveller, travellerProps));
				}
			},
			{
				key: "renderSlide",
				value: function renderSlide(startX, endX) {
					var _this$props9 = this.props, y = _this$props9.y, height = _this$props9.height, stroke = _this$props9.stroke, travellerWidth = _this$props9.travellerWidth;
					var x = Math.min(startX, endX) + travellerWidth;
					var width = Math.max(Math.abs(endX - startX) - travellerWidth, 0);
					return /*#__PURE__*/ React.createElement("rect", {
						className: "recharts-brush-slide",
						onMouseEnter: this.handleEnterSlideOrTraveller,
						onMouseLeave: this.handleLeaveSlideOrTraveller,
						onMouseDown: this.handleSlideDragStart,
						onTouchStart: this.handleSlideDragStart,
						style: { cursor: "move" },
						stroke: "none",
						fill: stroke,
						fillOpacity: .2,
						x,
						y,
						width,
						height
					});
				}
			},
			{
				key: "renderText",
				value: function renderText() {
					var _this$props10 = this.props, startIndex = _this$props10.startIndex, endIndex = _this$props10.endIndex, y = _this$props10.y, height = _this$props10.height, travellerWidth = _this$props10.travellerWidth, stroke = _this$props10.stroke;
					var _this$state4 = this.state, startX = _this$state4.startX, endX = _this$state4.endX;
					var offset = 5;
					var attrs = {
						pointerEvents: "none",
						fill: stroke
					};
					return /*#__PURE__*/ React.createElement(Layer, { className: "recharts-brush-texts" }, /*#__PURE__*/ React.createElement(Text, _extends$9({
						textAnchor: "end",
						verticalAnchor: "middle",
						x: Math.min(startX, endX) - offset,
						y: y + height / 2
					}, attrs), this.getTextOfTick(startIndex)), /*#__PURE__*/ React.createElement(Text, _extends$9({
						textAnchor: "start",
						verticalAnchor: "middle",
						x: Math.max(startX, endX) + travellerWidth + offset,
						y: y + height / 2
					}, attrs), this.getTextOfTick(endIndex)));
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$props11 = this.props, data = _this$props11.data, className = _this$props11.className, children = _this$props11.children, x = _this$props11.x, y = _this$props11.y, width = _this$props11.width, height = _this$props11.height, alwaysShowText = _this$props11.alwaysShowText;
					var _this$state5 = this.state, startX = _this$state5.startX, endX = _this$state5.endX, isTextActive = _this$state5.isTextActive, isSlideMoving = _this$state5.isSlideMoving, isTravellerMoving = _this$state5.isTravellerMoving, isTravellerFocused = _this$state5.isTravellerFocused;
					if (!data || !data.length || !isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || width <= 0 || height <= 0) return null;
					var layerClass = clsx("recharts-brush", className);
					var isPanoramic = React.Children.count(children) === 1;
					var style = generatePrefixStyle("userSelect", "none");
					return /*#__PURE__*/ React.createElement(Layer, {
						className: layerClass,
						onMouseLeave: this.handleLeaveWrapper,
						onTouchMove: this.handleTouchMove,
						style
					}, this.renderBackground(), isPanoramic && this.renderPanorama(), this.renderSlide(startX, endX), this.renderTravellerLayer(startX, "startX"), this.renderTravellerLayer(endX, "endX"), (isTextActive || isSlideMoving || isTravellerMoving || isTravellerFocused || alwaysShowText) && this.renderText());
				}
			}
		], [
			{
				key: "renderDefaultTraveller",
				value: function renderDefaultTraveller(props) {
					var x = props.x, y = props.y, width = props.width, height = props.height, stroke = props.stroke;
					var lineY = Math.floor(y + height / 2) - 1;
					return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("rect", {
						x,
						y,
						width,
						height,
						fill: stroke,
						stroke: "none"
					}), /*#__PURE__*/ React.createElement("line", {
						x1: x + 1,
						y1: lineY,
						x2: x + width - 1,
						y2: lineY,
						fill: "none",
						stroke: "#fff"
					}), /*#__PURE__*/ React.createElement("line", {
						x1: x + 1,
						y1: lineY + 2,
						x2: x + width - 1,
						y2: lineY + 2,
						fill: "none",
						stroke: "#fff"
					}));
				}
			},
			{
				key: "renderTraveller",
				value: function renderTraveller(option, props) {
					var rectangle;
					if (/*#__PURE__*/ React.isValidElement(option)) rectangle = /*#__PURE__*/ React.cloneElement(option, props);
					else if (isFunction(option)) rectangle = option(props);
					else rectangle = Brush.renderDefaultTraveller(props);
					return rectangle;
				}
			},
			{
				key: "getDerivedStateFromProps",
				value: function getDerivedStateFromProps(nextProps, prevState) {
					var data = nextProps.data, width = nextProps.width, x = nextProps.x, travellerWidth = nextProps.travellerWidth, updateId = nextProps.updateId, startIndex = nextProps.startIndex, endIndex = nextProps.endIndex;
					if (data !== prevState.prevData || updateId !== prevState.prevUpdateId) return _objectSpread$10({
						prevData: data,
						prevTravellerWidth: travellerWidth,
						prevUpdateId: updateId,
						prevX: x,
						prevWidth: width
					}, data && data.length ? createScale({
						data,
						width,
						x,
						travellerWidth,
						startIndex,
						endIndex
					}) : {
						scale: null,
						scaleValues: null
					});
					if (prevState.scale && (width !== prevState.prevWidth || x !== prevState.prevX || travellerWidth !== prevState.prevTravellerWidth)) {
						prevState.scale.range([x, x + width - travellerWidth]);
						var scaleValues = prevState.scale.domain().map(function(entry) {
							return prevState.scale(entry);
						});
						return {
							prevData: data,
							prevTravellerWidth: travellerWidth,
							prevUpdateId: updateId,
							prevX: x,
							prevWidth: width,
							startX: prevState.scale(nextProps.startIndex),
							endX: prevState.scale(nextProps.endIndex),
							scaleValues
						};
					}
					return null;
				}
			},
			{
				key: "getIndexInRange",
				value: function getIndexInRange(valueRange, x) {
					var len = valueRange.length;
					var start = 0;
					var end = len - 1;
					while (end - start > 1) {
						var middle = Math.floor((start + end) / 2);
						if (valueRange[middle] > x) end = middle;
						else start = middle;
					}
					return x >= valueRange[end] ? end : start;
				}
			}
		]);
	}(PureComponent);
	_defineProperty$13(Brush, "displayName", "Brush");
	_defineProperty$13(Brush, "defaultProps", {
		height: 40,
		travellerWidth: 5,
		gap: 1,
		fill: "#fff",
		stroke: "#666",
		padding: {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1
		},
		leaveTimeOut: 1e3,
		alwaysShowText: false
	});
}));
//#endregion
//#region node_modules/lodash-es/_baseSome.js
/**
* The base implementation of `_.some` without support for iteratee shorthands.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if any element passes the predicate check,
*  else `false`.
*/
function baseSome(collection, predicate) {
	var result;
	baseEach(collection, function(value, index, collection) {
		result = predicate(value, index, collection);
		return !result;
	});
	return !!result;
}
var init__baseSome = __esmMin((() => {
	init__baseEach();
}));
//#endregion
//#region node_modules/lodash-es/some.js
/**
* Checks if `predicate` returns truthy for **any** element of `collection`.
* Iteration is stopped once `predicate` returns truthy. The predicate is
* invoked with three arguments: (value, index|key, collection).
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [predicate=_.identity] The function invoked per iteration.
* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
* @returns {boolean} Returns `true` if any element passes the predicate check,
*  else `false`.
* @example
*
* _.some([null, 0, 'yes', false], Boolean);
* // => true
*
* var users = [
*   { 'user': 'barney', 'active': true },
*   { 'user': 'fred',   'active': false }
* ];
*
* // The `_.matches` iteratee shorthand.
* _.some(users, { 'user': 'barney', 'active': false });
* // => false
*
* // The `_.matchesProperty` iteratee shorthand.
* _.some(users, ['active', false]);
* // => true
*
* // The `_.property` iteratee shorthand.
* _.some(users, 'active');
* // => true
*/
function some(collection, predicate, guard) {
	var func = isArray$1(collection) ? arraySome : baseSome;
	if (guard && isIterateeCall(collection, predicate, guard)) predicate = void 0;
	return func(collection, baseIteratee(predicate, 3));
}
var init_some = __esmMin((() => {
	init__arraySome();
	init__baseIteratee();
	init__baseSome();
	init_isArray();
	init__isIterateeCall();
}));
//#endregion
//#region node_modules/recharts/es6/util/IfOverflowMatches.js
var ifOverflowMatches;
var init_IfOverflowMatches = __esmMin((() => {
	ifOverflowMatches = function ifOverflowMatches(props, value) {
		var alwaysShow = props.alwaysShow;
		var ifOverflow = props.ifOverflow;
		if (alwaysShow) ifOverflow = "extendDomain";
		return ifOverflow === value;
	};
}));
//#endregion
//#region node_modules/lodash-es/_baseAssignValue.js
/**
* The base implementation of `assignValue` and `assignMergeValue` without
* value checks.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && defineProperty) defineProperty(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
var init__baseAssignValue = __esmMin((() => {
	init__defineProperty();
}));
//#endregion
//#region node_modules/lodash-es/mapValues.js
/**
* Creates an object with the same keys as `object` and values generated
* by running each own enumerable string keyed property of `object` thru
* `iteratee`. The iteratee is invoked with three arguments:
* (value, key, object).
*
* @static
* @memberOf _
* @since 2.4.0
* @category Object
* @param {Object} object The object to iterate over.
* @param {Function} [iteratee=_.identity] The function invoked per iteration.
* @returns {Object} Returns the new mapped object.
* @see _.mapKeys
* @example
*
* var users = {
*   'fred':    { 'user': 'fred',    'age': 40 },
*   'pebbles': { 'user': 'pebbles', 'age': 1 }
* };
*
* _.mapValues(users, function(o) { return o.age; });
* // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
*
* // The `_.property` iteratee shorthand.
* _.mapValues(users, 'age');
* // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
*/
function mapValues(object, iteratee) {
	var result = {};
	iteratee = baseIteratee(iteratee, 3);
	baseForOwn(object, function(value, key, object) {
		baseAssignValue(result, key, iteratee(value, key, object));
	});
	return result;
}
var init_mapValues = __esmMin((() => {
	init__baseAssignValue();
	init__baseForOwn();
	init__baseIteratee();
}));
//#endregion
//#region node_modules/lodash-es/_arrayEvery.js
/**
* A specialized version of `_.every` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if all elements pass the predicate check,
*  else `false`.
*/
function arrayEvery(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (!predicate(array[index], index, array)) return false;
	return true;
}
var init__arrayEvery = __esmMin((() => {}));
//#endregion
//#region node_modules/lodash-es/_baseEvery.js
/**
* The base implementation of `_.every` without support for iteratee shorthands.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if all elements pass the predicate check,
*  else `false`
*/
function baseEvery(collection, predicate) {
	var result = true;
	baseEach(collection, function(value, index, collection) {
		result = !!predicate(value, index, collection);
		return result;
	});
	return result;
}
var init__baseEvery = __esmMin((() => {
	init__baseEach();
}));
//#endregion
//#region node_modules/lodash-es/every.js
/**
* Checks if `predicate` returns truthy for **all** elements of `collection`.
* Iteration is stopped once `predicate` returns falsey. The predicate is
* invoked with three arguments: (value, index|key, collection).
*
* **Note:** This method returns `true` for
* [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
* [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
* elements of empty collections.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [predicate=_.identity] The function invoked per iteration.
* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
* @returns {boolean} Returns `true` if all elements pass the predicate check,
*  else `false`.
* @example
*
* _.every([true, 1, null, 'yes'], Boolean);
* // => false
*
* var users = [
*   { 'user': 'barney', 'age': 36, 'active': false },
*   { 'user': 'fred',   'age': 40, 'active': false }
* ];
*
* // The `_.matches` iteratee shorthand.
* _.every(users, { 'user': 'barney', 'active': false });
* // => false
*
* // The `_.matchesProperty` iteratee shorthand.
* _.every(users, ['active', false]);
* // => true
*
* // The `_.property` iteratee shorthand.
* _.every(users, 'active');
* // => false
*/
function every(collection, predicate, guard) {
	var func = isArray$1(collection) ? arrayEvery : baseEvery;
	if (guard && isIterateeCall(collection, predicate, guard)) predicate = void 0;
	return func(collection, baseIteratee(predicate, 3));
}
var init_every = __esmMin((() => {
	init__arrayEvery();
	init__baseEvery();
	init__baseIteratee();
	init_isArray();
	init__isIterateeCall();
}));
//#endregion
//#region node_modules/recharts/es6/util/BarUtils.js
function _typeof$12(o) {
	"@babel/helpers - typeof";
	return _typeof$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$12(o);
}
function _extends$8() {
	_extends$8 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$8.apply(this, arguments);
}
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r) {
			_defineProperty$12(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$12(obj, key, value) {
	key = _toPropertyKey$12(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$12(t) {
	var i = _toPrimitive$12(t, "string");
	return "symbol" == _typeof$12(i) ? i : i + "";
}
function _toPrimitive$12(t, r) {
	if ("object" != _typeof$12(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$12(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$3(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$3(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function typeguardBarRectangleProps(_ref, props) {
	var xProp = _ref.x, yProp = _ref.y, option = _objectWithoutProperties$3(_ref, _excluded$3);
	var xValue = "".concat(xProp);
	var x = parseInt(xValue, 10);
	var yValue = "".concat(yProp);
	var y = parseInt(yValue, 10);
	var heightValue = "".concat(props.height || option.height);
	var height = parseInt(heightValue, 10);
	var widthValue = "".concat(props.width || option.width);
	var width = parseInt(widthValue, 10);
	return _objectSpread$9(_objectSpread$9(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, props), option), x ? { x } : {}), y ? { y } : {}), {}, {
		height,
		width,
		name: props.name,
		radius: props.radius
	});
}
function BarRectangle(props) {
	return /*#__PURE__*/ React.createElement(Shape, _extends$8({
		shapeType: "rectangle",
		propTransformer: typeguardBarRectangleProps,
		activeClassName: "recharts-active-bar"
	}, props));
}
var _excluded$3, minPointSizeCallback;
var init_BarUtils = __esmMin((() => {
	init_tiny_invariant();
	init_ActiveShapeUtils();
	_excluded$3 = ["x", "y"];
	minPointSizeCallback = function minPointSizeCallback(minPointSize) {
		var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		return function(value, index) {
			if (typeof minPointSize === "number") return minPointSize;
			var isValueNumber = typeof value === "number";
			if (isValueNumber) return minPointSize(value, index);
			!isValueNumber && invariant(false);
			return defaultValue;
		};
	};
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/Bar.js
/**
* @fileOverview Render a group of bar
*/
function _typeof$11(o) {
	"@babel/helpers - typeof";
	return _typeof$11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$11(o);
}
function _objectWithoutProperties$2(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$2(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _extends$7() {
	_extends$7 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$7.apply(this, arguments);
}
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r) {
			_defineProperty$11(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$9(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$9(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$11(descriptor.key), descriptor);
	}
}
function _createClass$9(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$9(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$9(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$7(t, o, e) {
	return o = _getPrototypeOf$7(o), _possibleConstructorReturn$7(t, _isNativeReflectConstruct$7() ? Reflect.construct(o, e || [], _getPrototypeOf$7(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$7(self, call) {
	if (call && (_typeof$11(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$7(self);
}
function _assertThisInitialized$7(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$7() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$7 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$7(o) {
	_getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$7(o);
}
function _inherits$7(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$7(subClass, superClass);
}
function _setPrototypeOf$7(o, p) {
	_setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$7(o, p);
}
function _defineProperty$11(obj, key, value) {
	key = _toPropertyKey$11(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$11(t) {
	var i = _toPrimitive$11(t, "string");
	return "symbol" == _typeof$11(i) ? i : i + "";
}
function _toPrimitive$11(t, r) {
	if ("object" != _typeof$11(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$11(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var _excluded$2, _Bar, Bar;
var init_Bar = __esmMin((() => {
	init_clsx();
	init_es6$1();
	init_isEqual();
	init_isNil();
	init_Layer();
	init_ErrorBar();
	init_Cell();
	init_LabelList();
	init_DataUtils();
	init_ReactUtils();
	init_Global();
	init_ChartUtils();
	init_types();
	init_BarUtils();
	_excluded$2 = ["value", "background"];
	Bar = /*#__PURE__*/ function(_PureComponent) {
		function Bar() {
			var _this;
			_classCallCheck$9(this, Bar);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _callSuper$7(this, Bar, [].concat(args));
			_defineProperty$11(_this, "state", { isAnimationFinished: false });
			_defineProperty$11(_this, "id", uniqueId("recharts-bar-"));
			_defineProperty$11(_this, "handleAnimationEnd", function() {
				var onAnimationEnd = _this.props.onAnimationEnd;
				_this.setState({ isAnimationFinished: true });
				if (onAnimationEnd) onAnimationEnd();
			});
			_defineProperty$11(_this, "handleAnimationStart", function() {
				var onAnimationStart = _this.props.onAnimationStart;
				_this.setState({ isAnimationFinished: false });
				if (onAnimationStart) onAnimationStart();
			});
			return _this;
		}
		_inherits$7(Bar, _PureComponent);
		return _createClass$9(Bar, [
			{
				key: "renderRectanglesStatically",
				value: function renderRectanglesStatically(data) {
					var _this2 = this;
					var _this$props = this.props, shape = _this$props.shape, dataKey = _this$props.dataKey, activeIndex = _this$props.activeIndex, activeBar = _this$props.activeBar;
					var baseProps = filterProps(this.props, false);
					return data && data.map(function(entry, i) {
						var isActive = i === activeIndex;
						var option = isActive ? activeBar : shape;
						var props = _objectSpread$8(_objectSpread$8(_objectSpread$8({}, baseProps), entry), {}, {
							isActive,
							option,
							index: i,
							dataKey,
							onAnimationStart: _this2.handleAnimationStart,
							onAnimationEnd: _this2.handleAnimationEnd
						});
						return /*#__PURE__*/ React.createElement(Layer, _extends$7({ className: "recharts-bar-rectangle" }, adaptEventsOfChild(_this2.props, entry, i), { key: "rectangle-".concat(entry === null || entry === void 0 ? void 0 : entry.x, "-").concat(entry === null || entry === void 0 ? void 0 : entry.y, "-").concat(entry === null || entry === void 0 ? void 0 : entry.value, "-").concat(i) }), /*#__PURE__*/ React.createElement(BarRectangle, props));
					});
				}
			},
			{
				key: "renderRectanglesWithAnimation",
				value: function renderRectanglesWithAnimation() {
					var _this3 = this;
					var _this$props2 = this.props, data = _this$props2.data, layout = _this$props2.layout, isAnimationActive = _this$props2.isAnimationActive, animationBegin = _this$props2.animationBegin, animationDuration = _this$props2.animationDuration, animationEasing = _this$props2.animationEasing, animationId = _this$props2.animationId;
					var prevData = this.state.prevData;
					return /*#__PURE__*/ React.createElement(es6_default, {
						begin: animationBegin,
						duration: animationDuration,
						isActive: isAnimationActive,
						easing: animationEasing,
						from: { t: 0 },
						to: { t: 1 },
						key: "bar-".concat(animationId),
						onAnimationEnd: this.handleAnimationEnd,
						onAnimationStart: this.handleAnimationStart
					}, function(_ref) {
						var t = _ref.t;
						var stepData = data.map(function(entry, index) {
							var prev = prevData && prevData[index];
							if (prev) {
								var interpolatorX = interpolateNumber$1(prev.x, entry.x);
								var interpolatorY = interpolateNumber$1(prev.y, entry.y);
								var interpolatorWidth = interpolateNumber$1(prev.width, entry.width);
								var interpolatorHeight = interpolateNumber$1(prev.height, entry.height);
								return _objectSpread$8(_objectSpread$8({}, entry), {}, {
									x: interpolatorX(t),
									y: interpolatorY(t),
									width: interpolatorWidth(t),
									height: interpolatorHeight(t)
								});
							}
							if (layout === "horizontal") {
								var h = interpolateNumber$1(0, entry.height)(t);
								return _objectSpread$8(_objectSpread$8({}, entry), {}, {
									y: entry.y + entry.height - h,
									height: h
								});
							}
							var w = interpolateNumber$1(0, entry.width)(t);
							return _objectSpread$8(_objectSpread$8({}, entry), {}, { width: w });
						});
						return /*#__PURE__*/ React.createElement(Layer, null, _this3.renderRectanglesStatically(stepData));
					});
				}
			},
			{
				key: "renderRectangles",
				value: function renderRectangles() {
					var _this$props3 = this.props, data = _this$props3.data, isAnimationActive = _this$props3.isAnimationActive;
					var prevData = this.state.prevData;
					if (isAnimationActive && data && data.length && (!prevData || !isEqual(prevData, data))) return this.renderRectanglesWithAnimation();
					return this.renderRectanglesStatically(data);
				}
			},
			{
				key: "renderBackground",
				value: function renderBackground() {
					var _this4 = this;
					var _this$props4 = this.props, data = _this$props4.data, dataKey = _this$props4.dataKey, activeIndex = _this$props4.activeIndex;
					var backgroundProps = filterProps(this.props.background, false);
					return data.map(function(entry, i) {
						entry.value;
						var background = entry.background, rest = _objectWithoutProperties$2(entry, _excluded$2);
						if (!background) return null;
						var props = _objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8({}, rest), {}, { fill: "#eee" }, background), backgroundProps), adaptEventsOfChild(_this4.props, entry, i)), {}, {
							onAnimationStart: _this4.handleAnimationStart,
							onAnimationEnd: _this4.handleAnimationEnd,
							dataKey,
							index: i,
							className: "recharts-bar-background-rectangle"
						});
						return /*#__PURE__*/ React.createElement(BarRectangle, _extends$7({
							key: "background-bar-".concat(i),
							option: _this4.props.background,
							isActive: i === activeIndex
						}, props));
					});
				}
			},
			{
				key: "renderErrorBar",
				value: function renderErrorBar(needClip, clipPathId) {
					if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
					var _this$props5 = this.props, data = _this$props5.data, xAxis = _this$props5.xAxis, yAxis = _this$props5.yAxis, layout = _this$props5.layout, children = _this$props5.children;
					var errorBarItems = findAllByType(children, ErrorBar);
					if (!errorBarItems) return null;
					var offset = layout === "vertical" ? data[0].height / 2 : data[0].width / 2;
					var dataPointFormatter = function dataPointFormatter(dataPoint, dataKey) {
						/**
						* if the value coming from `getComposedData` is an array then this is a stacked bar chart.
						* arr[1] represents end value of the bar since the data is in the form of [startValue, endValue].
						* */
						var value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value;
						return {
							x: dataPoint.x,
							y: dataPoint.y,
							value,
							errorVal: getValueByDataKey(dataPoint, dataKey)
						};
					};
					var errorBarProps = { clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null };
					return /*#__PURE__*/ React.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
						return /*#__PURE__*/ React.cloneElement(item, {
							key: "error-bar-".concat(clipPathId, "-").concat(item.props.dataKey),
							data,
							xAxis,
							yAxis,
							layout,
							offset,
							dataPointFormatter
						});
					}));
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$props6 = this.props, hide = _this$props6.hide, data = _this$props6.data, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, left = _this$props6.left, top = _this$props6.top, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, background = _this$props6.background, id = _this$props6.id;
					if (hide || !data || !data.length) return null;
					var isAnimationFinished = this.state.isAnimationFinished;
					var layerClass = clsx("recharts-bar", className);
					var needClipX = xAxis && xAxis.allowDataOverflow;
					var needClipY = yAxis && yAxis.allowDataOverflow;
					var needClip = needClipX || needClipY;
					var clipPathId = isNil(id) ? this.id : id;
					return /*#__PURE__*/ React.createElement(Layer, { className: layerClass }, needClipX || needClipY ? /*#__PURE__*/ React.createElement("defs", null, /*#__PURE__*/ React.createElement("clipPath", { id: "clipPath-".concat(clipPathId) }, /*#__PURE__*/ React.createElement("rect", {
						x: needClipX ? left : left - width / 2,
						y: needClipY ? top : top - height / 2,
						width: needClipX ? width : width * 2,
						height: needClipY ? height : height * 2
					}))) : null, /*#__PURE__*/ React.createElement(Layer, {
						className: "recharts-bar-rectangles",
						clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
					}, background ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(needClip, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, data));
				}
			}
		], [{
			key: "getDerivedStateFromProps",
			value: function getDerivedStateFromProps(nextProps, prevState) {
				if (nextProps.animationId !== prevState.prevAnimationId) return {
					prevAnimationId: nextProps.animationId,
					curData: nextProps.data,
					prevData: prevState.curData
				};
				if (nextProps.data !== prevState.curData) return { curData: nextProps.data };
				return null;
			}
		}]);
	}(PureComponent);
	_Bar = Bar;
	_defineProperty$11(Bar, "displayName", "Bar");
	_defineProperty$11(Bar, "defaultProps", {
		xAxisId: 0,
		yAxisId: 0,
		legendType: "rect",
		minPointSize: 0,
		hide: false,
		data: [],
		layout: "vertical",
		activeBar: false,
		isAnimationActive: !Global.isSsr,
		animationBegin: 0,
		animationDuration: 400,
		animationEasing: "ease"
	});
	/**
	* Compose the data of each group
	* @param {Object} props Props for the component
	* @param {Object} item        An instance of Bar
	* @param {Array} barPosition  The offset and size of each bar
	* @param {Object} xAxis       The configuration of x-axis
	* @param {Object} yAxis       The configuration of y-axis
	* @param {Array} stackedData  The stacked data of a bar item
	* @return{Array} Composed data
	*/
	_defineProperty$11(Bar, "getComposedData", function(_ref2) {
		var props = _ref2.props, item = _ref2.item, barPosition = _ref2.barPosition, bandSize = _ref2.bandSize, xAxis = _ref2.xAxis, yAxis = _ref2.yAxis, xAxisTicks = _ref2.xAxisTicks, yAxisTicks = _ref2.yAxisTicks, stackedData = _ref2.stackedData, dataStartIndex = _ref2.dataStartIndex, displayedData = _ref2.displayedData, offset = _ref2.offset;
		var pos = findPositionOfBar(barPosition, item);
		if (!pos) return null;
		var layout = props.layout;
		var itemDefaultProps = item.type.defaultProps;
		var itemProps = itemDefaultProps !== void 0 ? _objectSpread$8(_objectSpread$8({}, itemDefaultProps), item.props) : item.props;
		var dataKey = itemProps.dataKey, children = itemProps.children, minPointSizeProp = itemProps.minPointSize;
		var numericAxis = layout === "horizontal" ? yAxis : xAxis;
		var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
		var baseValue = getBaseValueOfBar({ numericAxis });
		var cells = findAllByType(children, Cell);
		return _objectSpread$8({
			data: displayedData.map(function(entry, index) {
				var value, x, y, width, height, background;
				if (stackedData) value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
				else {
					value = getValueByDataKey(entry, dataKey);
					if (!Array.isArray(value)) value = [baseValue, value];
				}
				var minPointSize = minPointSizeCallback(minPointSizeProp, _Bar.defaultProps.minPointSize)(value[1], index);
				if (layout === "horizontal") {
					var _ref4;
					var _ref3 = [yAxis.scale(value[0]), yAxis.scale(value[1])], baseValueScale = _ref3[0], currentValueScale = _ref3[1];
					x = getCateCoordinateOfBar({
						axis: xAxis,
						ticks: xAxisTicks,
						bandSize,
						offset: pos.offset,
						entry,
						index
					});
					y = (_ref4 = currentValueScale !== null && currentValueScale !== void 0 ? currentValueScale : baseValueScale) !== null && _ref4 !== void 0 ? _ref4 : void 0;
					width = pos.size;
					var computedHeight = baseValueScale - currentValueScale;
					height = Number.isNaN(computedHeight) ? 0 : computedHeight;
					background = {
						x,
						y: yAxis.y,
						width,
						height: yAxis.height
					};
					if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
						var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
						y -= delta;
						height += delta;
					}
				} else {
					var _ref5 = [xAxis.scale(value[0]), xAxis.scale(value[1])], _baseValueScale = _ref5[0], _currentValueScale = _ref5[1];
					x = _baseValueScale;
					y = getCateCoordinateOfBar({
						axis: yAxis,
						ticks: yAxisTicks,
						bandSize,
						offset: pos.offset,
						entry,
						index
					});
					width = _currentValueScale - _baseValueScale;
					height = pos.size;
					background = {
						x: xAxis.x,
						y,
						width: xAxis.width,
						height
					};
					if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
						var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
						width += _delta;
					}
				}
				return _objectSpread$8(_objectSpread$8(_objectSpread$8({}, entry), {}, {
					x,
					y,
					width,
					height,
					value: stackedData ? value : value[1],
					payload: entry,
					background
				}, cells && cells[index] && cells[index].props), {}, {
					tooltipPayload: [getTooltipItem(item, entry)],
					tooltipPosition: {
						x: x + width / 2,
						y: y + height / 2
					}
				});
			}),
			layout
		}, offset);
	});
}));
//#endregion
//#region node_modules/recharts/es6/util/CartesianUtils.js
function _typeof$10(o) {
	"@babel/helpers - typeof";
	return _typeof$10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$10(o);
}
function _classCallCheck$8(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$8(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$10(descriptor.key), descriptor);
	}
}
function _createClass$8(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$8(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$8(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r) {
			_defineProperty$10(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$10(obj, key, value) {
	key = _toPropertyKey$10(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$10(t) {
	var i = _toPrimitive$10(t, "string");
	return "symbol" == _typeof$10(i) ? i : i + "";
}
function _toPrimitive$10(t, r) {
	if ("object" != _typeof$10(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$10(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/** Normalizes the angle so that 0 <= angle < 180.
* @param {number} angle Angle in degrees.
* @return {number} the normalized angle with a value of at least 0 and never greater or equal to 180. */
function normalizeAngle(angle) {
	return (angle % 180 + 180) % 180;
}
var formatAxisMap, rectWithPoints, rectWithCoords, ScaleHelper, createLabeledScales, getAngledRectangleWidth;
var init_CartesianUtils = __esmMin((() => {
	init_mapValues();
	init_every();
	init_ChartUtils();
	init_ReactUtils();
	init_DataUtils();
	init_Bar();
	formatAxisMap = function formatAxisMap(props, axisMap, offset, axisType, chartName) {
		var width = props.width, height = props.height, layout = props.layout, children = props.children;
		var ids = Object.keys(axisMap);
		var steps = {
			left: offset.left,
			leftMirror: offset.left,
			right: width - offset.right,
			rightMirror: width - offset.right,
			top: offset.top,
			topMirror: offset.top,
			bottom: height - offset.bottom,
			bottomMirror: height - offset.bottom
		};
		var hasBar = !!findChildByType(children, Bar);
		return ids.reduce(function(result, id) {
			var axis = axisMap[id];
			var orientation = axis.orientation, domain = axis.domain, _axis$padding = axis.padding, padding = _axis$padding === void 0 ? {} : _axis$padding, mirror = axis.mirror, reversed = axis.reversed;
			var offsetKey = "".concat(orientation).concat(mirror ? "Mirror" : "");
			var calculatedPadding, range, x, y, needSpace;
			if (axis.type === "number" && (axis.padding === "gap" || axis.padding === "no-gap")) {
				var diff = domain[1] - domain[0];
				var smallestDistanceBetweenValues = Infinity;
				var sortedValues = axis.categoricalDomain.sort(compareValues);
				sortedValues.forEach(function(value, index) {
					if (index > 0) smallestDistanceBetweenValues = Math.min((value || 0) - (sortedValues[index - 1] || 0), smallestDistanceBetweenValues);
				});
				if (Number.isFinite(smallestDistanceBetweenValues)) {
					var smallestDistanceInPercent = smallestDistanceBetweenValues / diff;
					var rangeWidth = axis.layout === "vertical" ? offset.height : offset.width;
					if (axis.padding === "gap") calculatedPadding = smallestDistanceInPercent * rangeWidth / 2;
					if (axis.padding === "no-gap") {
						var gap = getPercentValue(props.barCategoryGap, smallestDistanceInPercent * rangeWidth);
						var halfBand = smallestDistanceInPercent * rangeWidth / 2;
						calculatedPadding = halfBand - gap - (halfBand - gap) / rangeWidth * gap;
					}
				}
			}
			if (axisType === "xAxis") range = [offset.left + (padding.left || 0) + (calculatedPadding || 0), offset.left + offset.width - (padding.right || 0) - (calculatedPadding || 0)];
			else if (axisType === "yAxis") range = layout === "horizontal" ? [offset.top + offset.height - (padding.bottom || 0), offset.top + (padding.top || 0)] : [offset.top + (padding.top || 0) + (calculatedPadding || 0), offset.top + offset.height - (padding.bottom || 0) - (calculatedPadding || 0)];
			else range = axis.range;
			if (reversed) range = [range[1], range[0]];
			var _parseScale = parseScale(axis, chartName, hasBar), scale = _parseScale.scale, realScaleType = _parseScale.realScaleType;
			scale.domain(domain).range(range);
			checkDomainOfScale(scale);
			var ticks = getTicksOfScale(scale, _objectSpread$7(_objectSpread$7({}, axis), {}, { realScaleType }));
			if (axisType === "xAxis") {
				needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
				x = offset.left;
				y = steps[offsetKey] - needSpace * axis.height;
			} else if (axisType === "yAxis") {
				needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
				x = steps[offsetKey] - needSpace * axis.width;
				y = offset.top;
			}
			var finalAxis = _objectSpread$7(_objectSpread$7(_objectSpread$7({}, axis), ticks), {}, {
				realScaleType,
				x,
				y,
				scale,
				width: axisType === "xAxis" ? offset.width : axis.width,
				height: axisType === "yAxis" ? offset.height : axis.height
			});
			finalAxis.bandSize = getBandSizeOfAxis(finalAxis, ticks);
			if (!axis.hide && axisType === "xAxis") steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.height;
			else if (!axis.hide) steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.width;
			return _objectSpread$7(_objectSpread$7({}, result), {}, _defineProperty$10({}, id, finalAxis));
		}, {});
	};
	rectWithPoints = function rectWithPoints(_ref, _ref2) {
		var x1 = _ref.x, y1 = _ref.y;
		var x2 = _ref2.x, y2 = _ref2.y;
		return {
			x: Math.min(x1, x2),
			y: Math.min(y1, y2),
			width: Math.abs(x2 - x1),
			height: Math.abs(y2 - y1)
		};
	};
	rectWithCoords = function rectWithCoords(_ref3) {
		var x1 = _ref3.x1, y1 = _ref3.y1, x2 = _ref3.x2, y2 = _ref3.y2;
		return rectWithPoints({
			x: x1,
			y: y1
		}, {
			x: x2,
			y: y2
		});
	};
	ScaleHelper = /*#__PURE__*/ function() {
		function ScaleHelper(scale) {
			_classCallCheck$8(this, ScaleHelper);
			this.scale = scale;
		}
		return _createClass$8(ScaleHelper, [
			{
				key: "domain",
				get: function get() {
					return this.scale.domain;
				}
			},
			{
				key: "range",
				get: function get() {
					return this.scale.range;
				}
			},
			{
				key: "rangeMin",
				get: function get() {
					return this.range()[0];
				}
			},
			{
				key: "rangeMax",
				get: function get() {
					return this.range()[1];
				}
			},
			{
				key: "bandwidth",
				get: function get() {
					return this.scale.bandwidth;
				}
			},
			{
				key: "apply",
				value: function apply(value) {
					var _ref4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, bandAware = _ref4.bandAware, position = _ref4.position;
					if (value === void 0) return;
					if (position) switch (position) {
						case "start": return this.scale(value);
						case "middle":
							var offset = this.bandwidth ? this.bandwidth() / 2 : 0;
							return this.scale(value) + offset;
						case "end":
							var _offset = this.bandwidth ? this.bandwidth() : 0;
							return this.scale(value) + _offset;
						default: return this.scale(value);
					}
					if (bandAware) {
						var _offset2 = this.bandwidth ? this.bandwidth() / 2 : 0;
						return this.scale(value) + _offset2;
					}
					return this.scale(value);
				}
			},
			{
				key: "isInRange",
				value: function isInRange(value) {
					var range = this.range();
					var first = range[0];
					var last = range[range.length - 1];
					return first <= last ? value >= first && value <= last : value >= last && value <= first;
				}
			}
		], [{
			key: "create",
			value: function create(obj) {
				return new ScaleHelper(obj);
			}
		}]);
	}();
	_defineProperty$10(ScaleHelper, "EPS", 1e-4);
	createLabeledScales = function createLabeledScales(options) {
		var scales = Object.keys(options).reduce(function(res, key) {
			return _objectSpread$7(_objectSpread$7({}, res), {}, _defineProperty$10({}, key, ScaleHelper.create(options[key])));
		}, {});
		return _objectSpread$7(_objectSpread$7({}, scales), {}, {
			apply: function apply(coord) {
				var _ref5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, bandAware = _ref5.bandAware, position = _ref5.position;
				return mapValues(coord, function(value, label) {
					return scales[label].apply(value, {
						bandAware,
						position
					});
				});
			},
			isInRange: function isInRange(coord) {
				return every(coord, function(value, label) {
					return scales[label].isInRange(value);
				});
			}
		});
	};
	getAngledRectangleWidth = function getAngledRectangleWidth(_ref6) {
		var width = _ref6.width, height = _ref6.height;
		var angleRadians = normalizeAngle(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180;
		var angleThreshold = Math.atan(height / width);
		var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
		return Math.abs(angledWidth);
	};
}));
//#endregion
//#region node_modules/recharts/es6/util/calculateViewBox.js
var calculateViewBox;
var init_calculateViewBox = __esmMin((() => {
	init_memoize();
	calculateViewBox = memoize$1(function(offset) {
		return {
			x: offset.left,
			y: offset.top,
			width: offset.width,
			height: offset.height
		};
	}, function(offset) {
		return [
			"l",
			offset.left,
			"t",
			offset.top,
			"w",
			offset.width,
			"h",
			offset.height
		].join("");
	});
}));
//#endregion
//#region node_modules/recharts/es6/context/chartLayoutContext.js
var XAxisContext, YAxisContext, ViewBoxContext, OffsetContext, ClipPathIdContext, ChartHeightContext, ChartWidthContext, ChartLayoutContextProvider, useClipPathId, useXAxisOrThrow, useYAxisOrThrow, useViewBox, useChartWidth, useChartHeight;
var init_chartLayoutContext = __esmMin((() => {
	init_tiny_invariant();
	init_calculateViewBox();
	XAxisContext = /*#__PURE__*/ createContext(void 0);
	YAxisContext = /*#__PURE__*/ createContext(void 0);
	ViewBoxContext = /*#__PURE__*/ createContext(void 0);
	OffsetContext = /*#__PURE__*/ createContext({});
	ClipPathIdContext = /*#__PURE__*/ createContext(void 0);
	ChartHeightContext = /*#__PURE__*/ createContext(0);
	ChartWidthContext = /*#__PURE__*/ createContext(0);
	ChartLayoutContextProvider = function ChartLayoutContextProvider(props) {
		var _props$state = props.state, xAxisMap = _props$state.xAxisMap, yAxisMap = _props$state.yAxisMap, offset = _props$state.offset, clipPathId = props.clipPathId, children = props.children, width = props.width, height = props.height;
		/**
		* Perhaps we should compute this property when reading? Let's see what is more often used
		*/
		var viewBox = calculateViewBox(offset);
		return /*#__PURE__*/ React.createElement(XAxisContext.Provider, { value: xAxisMap }, /*#__PURE__*/ React.createElement(YAxisContext.Provider, { value: yAxisMap }, /*#__PURE__*/ React.createElement(OffsetContext.Provider, { value: offset }, /*#__PURE__*/ React.createElement(ViewBoxContext.Provider, { value: viewBox }, /*#__PURE__*/ React.createElement(ClipPathIdContext.Provider, { value: clipPathId }, /*#__PURE__*/ React.createElement(ChartHeightContext.Provider, { value: height }, /*#__PURE__*/ React.createElement(ChartWidthContext.Provider, { value: width }, children)))))));
	};
	useClipPathId = function useClipPathId() {
		return useContext(ClipPathIdContext);
	};
	useXAxisOrThrow = function useXAxisOrThrow(xAxisId) {
		var xAxisMap = useContext(XAxisContext);
		!(xAxisMap != null) && invariant(false);
		var xAxis = xAxisMap[xAxisId];
		!(xAxis != null) && invariant(false);
		return xAxis;
	};
	useYAxisOrThrow = function useYAxisOrThrow(yAxisId) {
		var yAxisMap = useContext(YAxisContext);
		!(yAxisMap != null) && invariant(false);
		var yAxis = yAxisMap[yAxisId];
		!(yAxis != null) && invariant(false);
		return yAxis;
	};
	useViewBox = function useViewBox() {
		return useContext(ViewBoxContext);
	};
	useChartWidth = function useChartWidth() {
		return useContext(ChartWidthContext);
	};
	useChartHeight = function useChartHeight() {
		return useContext(ChartHeightContext);
	};
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/ReferenceLine.js
/**
* @fileOverview Reference Line
*/
function _typeof$9(o) {
	"@babel/helpers - typeof";
	return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$9(o);
}
function _classCallCheck$7(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$7(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$9(descriptor.key), descriptor);
	}
}
function _createClass$7(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$7(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$6(t, o, e) {
	return o = _getPrototypeOf$6(o), _possibleConstructorReturn$6(t, _isNativeReflectConstruct$6() ? Reflect.construct(o, e || [], _getPrototypeOf$6(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$6(self, call) {
	if (call && (_typeof$9(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$6(self);
}
function _assertThisInitialized$6(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$6() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$6 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$6(o) {
	_getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$6(o);
}
function _inherits$6(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$6(subClass, superClass);
}
function _setPrototypeOf$6(o, p) {
	_setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$6(o, p);
}
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
			_defineProperty$9(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$9(obj, key, value) {
	key = _toPropertyKey$9(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$9(t) {
	var i = _toPrimitive$9(t, "string");
	return "symbol" == _typeof$9(i) ? i : i + "";
}
function _toPrimitive$9(t, r) {
	if ("object" != _typeof$9(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$9(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray$1(arr, i) {
	return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$1(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$1(arr) {
	if (Array.isArray(arr)) return arr;
}
function _extends$6() {
	_extends$6 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$6.apply(this, arguments);
}
function ReferenceLineImpl(props) {
	var fixedX = props.x, fixedY = props.y, segment = props.segment, xAxisId = props.xAxisId, yAxisId = props.yAxisId, shape = props.shape, className = props.className, alwaysShow = props.alwaysShow;
	var clipPathId = useClipPathId();
	var xAxis = useXAxisOrThrow(xAxisId);
	var yAxis = useYAxisOrThrow(yAxisId);
	var viewBox = useViewBox();
	if (!clipPathId || !viewBox) return null;
	warn$1(alwaysShow === void 0, "The alwaysShow prop is deprecated. Please use ifOverflow=\"extendDomain\" instead.");
	var endPoints = getEndPoints(createLabeledScales({
		x: xAxis.scale,
		y: yAxis.scale
	}), isNumOrStr(fixedX), isNumOrStr(fixedY), segment && segment.length === 2, viewBox, props.position, xAxis.orientation, yAxis.orientation, props);
	if (!endPoints) return null;
	var _endPoints = _slicedToArray$1(endPoints, 2), _endPoints$ = _endPoints[0], x1 = _endPoints$.x, y1 = _endPoints$.y, _endPoints$2 = _endPoints[1], x2 = _endPoints$2.x, y2 = _endPoints$2.y;
	var lineProps = _objectSpread$6(_objectSpread$6({ clipPath: ifOverflowMatches(props, "hidden") ? "url(#".concat(clipPathId, ")") : void 0 }, filterProps(props, true)), {}, {
		x1,
		y1,
		x2,
		y2
	});
	return /*#__PURE__*/ React.createElement(Layer, { className: clsx("recharts-reference-line", className) }, renderLine(shape, lineProps), Label.renderCallByParent(props, rectWithCoords({
		x1,
		y1,
		x2,
		y2
	})));
}
var renderLine, getEndPoints, ReferenceLine;
var init_ReferenceLine = __esmMin((() => {
	init_isFunction();
	init_some();
	init_clsx();
	init_Layer();
	init_Label();
	init_IfOverflowMatches();
	init_DataUtils();
	init_CartesianUtils();
	init_LogUtils();
	init_ReactUtils();
	init_chartLayoutContext();
	renderLine = function renderLine(option, props) {
		var line;
		if (/*#__PURE__*/ React.isValidElement(option)) line = /*#__PURE__*/ React.cloneElement(option, props);
		else if (isFunction(option)) line = option(props);
		else line = /*#__PURE__*/ React.createElement("line", _extends$6({}, props, { className: "recharts-reference-line-line" }));
		return line;
	};
	getEndPoints = function getEndPoints(scales, isFixedX, isFixedY, isSegment, viewBox, position, xAxisOrientation, yAxisOrientation, props) {
		var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
		if (isFixedY) {
			var yCoord = props.y;
			var coord = scales.y.apply(yCoord, { position });
			if (ifOverflowMatches(props, "discard") && !scales.y.isInRange(coord)) return null;
			var points = [{
				x: x + width,
				y: coord
			}, {
				x,
				y: coord
			}];
			return yAxisOrientation === "left" ? points.reverse() : points;
		}
		if (isFixedX) {
			var xCoord = props.x;
			var _coord = scales.x.apply(xCoord, { position });
			if (ifOverflowMatches(props, "discard") && !scales.x.isInRange(_coord)) return null;
			var _points = [{
				x: _coord,
				y: y + height
			}, {
				x: _coord,
				y
			}];
			return xAxisOrientation === "top" ? _points.reverse() : _points;
		}
		if (isSegment) {
			var _points2 = props.segment.map(function(p) {
				return scales.apply(p, { position });
			});
			if (ifOverflowMatches(props, "discard") && some(_points2, function(p) {
				return !scales.isInRange(p);
			})) return null;
			return _points2;
		}
		return null;
	};
	ReferenceLine = /*#__PURE__*/ function(_React$Component) {
		function ReferenceLine() {
			_classCallCheck$7(this, ReferenceLine);
			return _callSuper$6(this, ReferenceLine, arguments);
		}
		_inherits$6(ReferenceLine, _React$Component);
		return _createClass$7(ReferenceLine, [{
			key: "render",
			value: function render() {
				return /*#__PURE__*/ React.createElement(ReferenceLineImpl, this.props);
			}
		}]);
	}(React.Component);
	_defineProperty$9(ReferenceLine, "displayName", "ReferenceLine");
	_defineProperty$9(ReferenceLine, "defaultProps", {
		isFront: false,
		ifOverflow: "discard",
		xAxisId: 0,
		yAxisId: 0,
		fill: "none",
		stroke: "#ccc",
		fillOpacity: 1,
		strokeWidth: 1,
		position: "middle"
	});
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/ReferenceDot.js
/**
* @fileOverview Reference Dot
*/
function _extends$5() {
	_extends$5 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$5.apply(this, arguments);
}
function _typeof$8(o) {
	"@babel/helpers - typeof";
	return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$8(o);
}
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
			_defineProperty$8(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$6(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$6(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$8(descriptor.key), descriptor);
	}
}
function _createClass$6(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$6(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$5(t, o, e) {
	return o = _getPrototypeOf$5(o), _possibleConstructorReturn$5(t, _isNativeReflectConstruct$5() ? Reflect.construct(o, e || [], _getPrototypeOf$5(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$5(self, call) {
	if (call && (_typeof$8(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$5(self);
}
function _assertThisInitialized$5(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$5() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$5 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$5(o) {
	_getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$5(o);
}
function _inherits$5(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$5(subClass, superClass);
}
function _setPrototypeOf$5(o, p) {
	_setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$5(o, p);
}
function _defineProperty$8(obj, key, value) {
	key = _toPropertyKey$8(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$8(t) {
	var i = _toPrimitive$8(t, "string");
	return "symbol" == _typeof$8(i) ? i : i + "";
}
function _toPrimitive$8(t, r) {
	if ("object" != _typeof$8(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$8(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getCoordinate, ReferenceDot;
var init_ReferenceDot = __esmMin((() => {
	init_isFunction();
	init_clsx();
	init_Layer();
	init_Dot();
	init_Label();
	init_DataUtils();
	init_IfOverflowMatches();
	init_CartesianUtils();
	init_LogUtils();
	init_ReactUtils();
	getCoordinate = function getCoordinate(props) {
		var x = props.x, y = props.y, xAxis = props.xAxis, yAxis = props.yAxis;
		var scales = createLabeledScales({
			x: xAxis.scale,
			y: yAxis.scale
		});
		var result = scales.apply({
			x,
			y
		}, { bandAware: true });
		if (ifOverflowMatches(props, "discard") && !scales.isInRange(result)) return null;
		return result;
	};
	ReferenceDot = /*#__PURE__*/ function(_React$Component) {
		function ReferenceDot() {
			_classCallCheck$6(this, ReferenceDot);
			return _callSuper$5(this, ReferenceDot, arguments);
		}
		_inherits$5(ReferenceDot, _React$Component);
		return _createClass$6(ReferenceDot, [{
			key: "render",
			value: function render() {
				var _this$props = this.props, x = _this$props.x, y = _this$props.y, r = _this$props.r, alwaysShow = _this$props.alwaysShow, clipPathId = _this$props.clipPathId;
				var isX = isNumOrStr(x);
				var isY = isNumOrStr(y);
				warn$1(alwaysShow === void 0, "The alwaysShow prop is deprecated. Please use ifOverflow=\"extendDomain\" instead.");
				if (!isX || !isY) return null;
				var coordinate = getCoordinate(this.props);
				if (!coordinate) return null;
				var cx = coordinate.x, cy = coordinate.y;
				var _this$props2 = this.props, shape = _this$props2.shape, className = _this$props2.className;
				var dotProps = _objectSpread$5(_objectSpread$5({ clipPath: ifOverflowMatches(this.props, "hidden") ? "url(#".concat(clipPathId, ")") : void 0 }, filterProps(this.props, true)), {}, {
					cx,
					cy
				});
				return /*#__PURE__*/ React.createElement(Layer, { className: clsx("recharts-reference-dot", className) }, ReferenceDot.renderDot(shape, dotProps), Label.renderCallByParent(this.props, {
					x: cx - r,
					y: cy - r,
					width: 2 * r,
					height: 2 * r
				}));
			}
		}]);
	}(React.Component);
	_defineProperty$8(ReferenceDot, "displayName", "ReferenceDot");
	_defineProperty$8(ReferenceDot, "defaultProps", {
		isFront: false,
		ifOverflow: "discard",
		xAxisId: 0,
		yAxisId: 0,
		r: 10,
		fill: "#fff",
		stroke: "#ccc",
		fillOpacity: 1,
		strokeWidth: 1
	});
	_defineProperty$8(ReferenceDot, "renderDot", function(option, props) {
		var dot;
		if (/*#__PURE__*/ React.isValidElement(option)) dot = /*#__PURE__*/ React.cloneElement(option, props);
		else if (isFunction(option)) dot = option(props);
		else dot = /*#__PURE__*/ React.createElement(Dot, _extends$5({}, props, {
			cx: props.cx,
			cy: props.cy,
			className: "recharts-reference-dot-dot"
		}));
		return dot;
	});
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/ReferenceArea.js
/**
* @fileOverview Reference Line
*/
function _extends$4() {
	_extends$4 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$4.apply(this, arguments);
}
function _typeof$7(o) {
	"@babel/helpers - typeof";
	return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$7(o);
}
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty$7(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$5(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$5(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$7(descriptor.key), descriptor);
	}
}
function _createClass$5(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$5(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$4(t, o, e) {
	return o = _getPrototypeOf$4(o), _possibleConstructorReturn$4(t, _isNativeReflectConstruct$4() ? Reflect.construct(o, e || [], _getPrototypeOf$4(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$4(self, call) {
	if (call && (_typeof$7(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$4(self);
}
function _assertThisInitialized$4(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$4() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$4(o) {
	_getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$4(o);
}
function _inherits$4(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$4(subClass, superClass);
}
function _setPrototypeOf$4(o, p) {
	_setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$4(o, p);
}
function _defineProperty$7(obj, key, value) {
	key = _toPropertyKey$7(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$7(t) {
	var i = _toPrimitive$7(t, "string");
	return "symbol" == _typeof$7(i) ? i : i + "";
}
function _toPrimitive$7(t, r) {
	if ("object" != _typeof$7(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$7(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getRect, ReferenceArea;
var init_ReferenceArea = __esmMin((() => {
	init_isFunction();
	init_clsx();
	init_Layer();
	init_Label();
	init_CartesianUtils();
	init_IfOverflowMatches();
	init_DataUtils();
	init_LogUtils();
	init_Rectangle();
	init_ReactUtils();
	getRect = function getRect(hasX1, hasX2, hasY1, hasY2, props) {
		var xValue1 = props.x1, xValue2 = props.x2, yValue1 = props.y1, yValue2 = props.y2, xAxis = props.xAxis, yAxis = props.yAxis;
		if (!xAxis || !yAxis) return null;
		var scales = createLabeledScales({
			x: xAxis.scale,
			y: yAxis.scale
		});
		var p1 = {
			x: hasX1 ? scales.x.apply(xValue1, { position: "start" }) : scales.x.rangeMin,
			y: hasY1 ? scales.y.apply(yValue1, { position: "start" }) : scales.y.rangeMin
		};
		var p2 = {
			x: hasX2 ? scales.x.apply(xValue2, { position: "end" }) : scales.x.rangeMax,
			y: hasY2 ? scales.y.apply(yValue2, { position: "end" }) : scales.y.rangeMax
		};
		if (ifOverflowMatches(props, "discard") && (!scales.isInRange(p1) || !scales.isInRange(p2))) return null;
		return rectWithPoints(p1, p2);
	};
	ReferenceArea = /*#__PURE__*/ function(_React$Component) {
		function ReferenceArea() {
			_classCallCheck$5(this, ReferenceArea);
			return _callSuper$4(this, ReferenceArea, arguments);
		}
		_inherits$4(ReferenceArea, _React$Component);
		return _createClass$5(ReferenceArea, [{
			key: "render",
			value: function render() {
				var _this$props = this.props, x1 = _this$props.x1, x2 = _this$props.x2, y1 = _this$props.y1, y2 = _this$props.y2, className = _this$props.className, alwaysShow = _this$props.alwaysShow, clipPathId = _this$props.clipPathId;
				warn$1(alwaysShow === void 0, "The alwaysShow prop is deprecated. Please use ifOverflow=\"extendDomain\" instead.");
				var hasX1 = isNumOrStr(x1);
				var hasX2 = isNumOrStr(x2);
				var hasY1 = isNumOrStr(y1);
				var hasY2 = isNumOrStr(y2);
				var shape = this.props.shape;
				if (!hasX1 && !hasX2 && !hasY1 && !hasY2 && !shape) return null;
				var rect = getRect(hasX1, hasX2, hasY1, hasY2, this.props);
				if (!rect && !shape) return null;
				var clipPath = ifOverflowMatches(this.props, "hidden") ? "url(#".concat(clipPathId, ")") : void 0;
				return /*#__PURE__*/ React.createElement(Layer, { className: clsx("recharts-reference-area", className) }, ReferenceArea.renderRect(shape, _objectSpread$4(_objectSpread$4({ clipPath }, filterProps(this.props, true)), rect)), Label.renderCallByParent(this.props, rect));
			}
		}]);
	}(React.Component);
	_defineProperty$7(ReferenceArea, "displayName", "ReferenceArea");
	_defineProperty$7(ReferenceArea, "defaultProps", {
		isFront: false,
		ifOverflow: "discard",
		xAxisId: 0,
		yAxisId: 0,
		r: 10,
		fill: "#ccc",
		fillOpacity: .5,
		stroke: "none",
		strokeWidth: 1
	});
	_defineProperty$7(ReferenceArea, "renderRect", function(option, props) {
		var rect;
		if (/*#__PURE__*/ React.isValidElement(option)) rect = /*#__PURE__*/ React.cloneElement(option, props);
		else if (isFunction(option)) rect = option(props);
		else rect = /*#__PURE__*/ React.createElement(Rectangle, _extends$4({}, props, { className: "recharts-reference-area-rect" }));
		return rect;
	});
}));
//#endregion
//#region node_modules/recharts/es6/util/getEveryNthWithCondition.js
/**
* Given an array and a number N, return a new array which contains every nTh
* element of the input array. For n below 1, an empty array is returned.
* If isValid is provided, all candidates must suffice the condition, else undefined is returned.
* @param {T[]} array An input array.
* @param {integer} n A number
* @param {Function} isValid A function to evaluate a candidate form the array
* @returns {T[]} The result array of the same type as the input array.
*/
function getEveryNthWithCondition(array, n, isValid) {
	if (n < 1) return [];
	if (n === 1 && isValid === void 0) return array;
	var result = [];
	for (var i = 0; i < array.length; i += n) if (isValid === void 0 || isValid(array[i]) === true) result.push(array[i]);
	else return;
	return result;
}
var init_getEveryNthWithCondition = __esmMin((() => {}));
//#endregion
//#region node_modules/recharts/es6/util/TickUtils.js
function getAngledTickWidth(contentSize, unitSize, angle) {
	return getAngledRectangleWidth({
		width: contentSize.width + unitSize.width,
		height: contentSize.height + unitSize.height
	}, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
	var isWidth = sizeKey === "width";
	var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
	if (sign === 1) return {
		start: isWidth ? x : y,
		end: isWidth ? x + width : y + height
	};
	return {
		start: isWidth ? x + width : y + height,
		end: isWidth ? x : y
	};
}
function isVisible(sign, tickPosition, getSize, start, end) {
	if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) return false;
	var size = getSize();
	return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
	return getEveryNthWithCondition(ticks, interval + 1);
}
var init_TickUtils = __esmMin((() => {
	init_CartesianUtils();
	init_getEveryNthWithCondition();
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var initialStart = boundaries.start, end = boundaries.end;
	var index = 0;
	var stepsize = 1;
	var start = initialStart;
	var _loop = function _loop() {
		var entry = ticks === null || ticks === void 0 ? void 0 : ticks[index];
		if (entry === void 0) return { v: getEveryNthWithCondition(ticks, stepsize) };
		var i = index;
		var size;
		var getSize = function getSize() {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		var tickCoord = entry.coordinate;
		var isShow = index === 0 || isVisible(sign, tickCoord, getSize, start, end);
		if (!isShow) {
			index = 0;
			start = initialStart;
			stepsize += 1;
		}
		if (isShow) {
			start = tickCoord + sign * (getSize() / 2 + minTickGap);
			index += stepsize;
		}
	}, _ret;
	while (stepsize <= result.length) {
		_ret = _loop();
		if (_ret) return _ret.v;
	}
	return [];
}
var init_getEquidistantTicks = __esmMin((() => {
	init_TickUtils();
	init_getEveryNthWithCondition();
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/getTicks.js
function _typeof$6(o) {
	"@babel/helpers - typeof";
	return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$6(o);
}
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty$6(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$6(obj, key, value) {
	key = _toPropertyKey$6(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == _typeof$6(i) ? i : i + "";
}
function _toPrimitive$6(t, r) {
	if ("object" != _typeof$6(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$6(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var len = result.length;
	var start = boundaries.start;
	var end = boundaries.end;
	var _loop = function _loop(i) {
		var entry = result[i];
		var size;
		var getSize = function getSize() {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		if (i === len - 1) {
			var gap = sign * (entry.coordinate + sign * getSize() / 2 - end);
			result[i] = entry = _objectSpread$3(_objectSpread$3({}, entry), {}, { tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i] = entry = _objectSpread$3(_objectSpread$3({}, entry), {}, { tickCoord: entry.coordinate });
		if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
			end = entry.tickCoord - sign * (getSize() / 2 + minTickGap);
			result[i] = _objectSpread$3(_objectSpread$3({}, entry), {}, { isShow: true });
		}
	};
	for (var i = len - 1; i >= 0; i--) _loop(i);
	return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
	var result = (ticks || []).slice();
	var len = result.length;
	var start = boundaries.start, end = boundaries.end;
	if (preserveEnd) {
		var tail = ticks[len - 1];
		var tailSize = getTickSize(tail, len - 1);
		var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
		result[len - 1] = tail = _objectSpread$3(_objectSpread$3({}, tail), {}, { tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate });
		if (isVisible(sign, tail.tickCoord, function() {
			return tailSize;
		}, start, end)) {
			end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
			result[len - 1] = _objectSpread$3(_objectSpread$3({}, tail), {}, { isShow: true });
		}
	}
	var count = preserveEnd ? len - 1 : len;
	var _loop2 = function _loop2(i) {
		var entry = result[i];
		var size;
		var getSize = function getSize() {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		if (i === 0) {
			var gap = sign * (entry.coordinate - sign * getSize() / 2 - start);
			result[i] = entry = _objectSpread$3(_objectSpread$3({}, entry), {}, { tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i] = entry = _objectSpread$3(_objectSpread$3({}, entry), {}, { tickCoord: entry.coordinate });
		if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
			start = entry.tickCoord + sign * (getSize() / 2 + minTickGap);
			result[i] = _objectSpread$3(_objectSpread$3({}, entry), {}, { isShow: true });
		}
	};
	for (var i = 0; i < count; i++) _loop2(i);
	return result;
}
function getTicks(props, fontSize, letterSpacing) {
	var tick = props.tick, ticks = props.ticks, viewBox = props.viewBox, minTickGap = props.minTickGap, orientation = props.orientation, interval = props.interval, tickFormatter = props.tickFormatter, unit = props.unit, angle = props.angle;
	if (!ticks || !ticks.length || !tick) return [];
	if (isNumber(interval) || Global.isSsr) return getNumberIntervalTicks(ticks, typeof interval === "number" && isNumber(interval) ? interval : 0);
	var candidates = [];
	var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
	var unitSize = unit && sizeKey === "width" ? getStringSize(unit, {
		fontSize,
		letterSpacing
	}) : {
		width: 0,
		height: 0
	};
	var getTickSize = function getTickSize(content, index) {
		var value = isFunction(tickFormatter) ? tickFormatter(content.value, index) : content.value;
		return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
			fontSize,
			letterSpacing
		}), unitSize, angle) : getStringSize(value, {
			fontSize,
			letterSpacing
		})[sizeKey];
	};
	var sign = ticks.length >= 2 ? mathSign(ticks[1].coordinate - ticks[0].coordinate) : 1;
	var boundaries = getTickBoundaries(viewBox, sign, sizeKey);
	if (interval === "equidistantPreserveStart") return getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap);
	if (interval === "preserveStart" || interval === "preserveStartEnd") candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === "preserveStartEnd");
	else candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
	return candidates.filter(function(entry) {
		return entry.isShow;
	});
}
var init_getTicks = __esmMin((() => {
	init_isFunction();
	init_DataUtils();
	init_DOMUtils();
	init_Global();
	init_TickUtils();
	init_getEquidistantTicks();
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/CartesianAxis.js
/**
* @fileOverview Cartesian Axis
*/
function _typeof$5(o) {
	"@babel/helpers - typeof";
	return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$5(o);
}
function _extends$3() {
	_extends$3 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$3.apply(this, arguments);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$5(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _classCallCheck$4(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$4(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$5(descriptor.key), descriptor);
	}
}
function _createClass$4(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$4(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$3(t, o, e) {
	return o = _getPrototypeOf$3(o), _possibleConstructorReturn$3(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf$3(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$3(self, call) {
	if (call && (_typeof$5(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$3(self);
}
function _assertThisInitialized$3(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$3() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$3(o) {
	_getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$3(o);
}
function _inherits$3(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$3(subClass, superClass);
}
function _setPrototypeOf$3(o, p) {
	_setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$3(o, p);
}
function _defineProperty$5(obj, key, value) {
	key = _toPropertyKey$5(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == _typeof$5(i) ? i : i + "";
}
function _toPrimitive$5(t, r) {
	if ("object" != _typeof$5(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$5(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var _excluded$1, _excluded2$1, _excluded3, CartesianAxis;
var init_CartesianAxis = __esmMin((() => {
	init_isFunction();
	init_get();
	init_clsx();
	init_ShallowEqual();
	init_Layer();
	init_Text();
	init_Label();
	init_DataUtils();
	init_types();
	init_ReactUtils();
	init_getTicks();
	_excluded$1 = ["viewBox"];
	_excluded2$1 = ["viewBox"];
	_excluded3 = ["ticks"];
	CartesianAxis = /*#__PURE__*/ function(_Component) {
		function CartesianAxis(props) {
			var _this;
			_classCallCheck$4(this, CartesianAxis);
			_this = _callSuper$3(this, CartesianAxis, [props]);
			_this.state = {
				fontSize: "",
				letterSpacing: ""
			};
			return _this;
		}
		_inherits$3(CartesianAxis, _Component);
		return _createClass$4(CartesianAxis, [
			{
				key: "shouldComponentUpdate",
				value: function shouldComponentUpdate(_ref, nextState) {
					var viewBox = _ref.viewBox, restProps = _objectWithoutProperties$1(_ref, _excluded$1);
					var _this$props = this.props, viewBoxOld = _this$props.viewBox, restPropsOld = _objectWithoutProperties$1(_this$props, _excluded2$1);
					return !shallowEqual$1(viewBox, viewBoxOld) || !shallowEqual$1(restProps, restPropsOld) || !shallowEqual$1(nextState, this.state);
				}
			},
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					var htmlLayer = this.layerReference;
					if (!htmlLayer) return;
					var tick = htmlLayer.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
					if (tick) this.setState({
						fontSize: window.getComputedStyle(tick).fontSize,
						letterSpacing: window.getComputedStyle(tick).letterSpacing
					});
				}
			},
			{
				key: "getTickLineCoord",
				value: function getTickLineCoord(data) {
					var _this$props2 = this.props, x = _this$props2.x, y = _this$props2.y, width = _this$props2.width, height = _this$props2.height, orientation = _this$props2.orientation, tickSize = _this$props2.tickSize, mirror = _this$props2.mirror, tickMargin = _this$props2.tickMargin;
					var x1, x2, y1, y2, tx, ty;
					var sign = mirror ? -1 : 1;
					var finalTickSize = data.tickSize || tickSize;
					var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
					switch (orientation) {
						case "top":
							x1 = x2 = data.coordinate;
							y2 = y + +!mirror * height;
							y1 = y2 - sign * finalTickSize;
							ty = y1 - sign * tickMargin;
							tx = tickCoord;
							break;
						case "left":
							y1 = y2 = data.coordinate;
							x2 = x + +!mirror * width;
							x1 = x2 - sign * finalTickSize;
							tx = x1 - sign * tickMargin;
							ty = tickCoord;
							break;
						case "right":
							y1 = y2 = data.coordinate;
							x2 = x + +mirror * width;
							x1 = x2 + sign * finalTickSize;
							tx = x1 + sign * tickMargin;
							ty = tickCoord;
							break;
						default:
							x1 = x2 = data.coordinate;
							y2 = y + +mirror * height;
							y1 = y2 + sign * finalTickSize;
							ty = y1 + sign * tickMargin;
							tx = tickCoord;
							break;
					}
					return {
						line: {
							x1,
							y1,
							x2,
							y2
						},
						tick: {
							x: tx,
							y: ty
						}
					};
				}
			},
			{
				key: "getTickTextAnchor",
				value: function getTickTextAnchor() {
					var _this$props3 = this.props, orientation = _this$props3.orientation, mirror = _this$props3.mirror;
					var textAnchor;
					switch (orientation) {
						case "left":
							textAnchor = mirror ? "start" : "end";
							break;
						case "right":
							textAnchor = mirror ? "end" : "start";
							break;
						default:
							textAnchor = "middle";
							break;
					}
					return textAnchor;
				}
			},
			{
				key: "getTickVerticalAnchor",
				value: function getTickVerticalAnchor() {
					var _this$props4 = this.props, orientation = _this$props4.orientation, mirror = _this$props4.mirror;
					var verticalAnchor = "end";
					switch (orientation) {
						case "left":
						case "right":
							verticalAnchor = "middle";
							break;
						case "top":
							verticalAnchor = mirror ? "start" : "end";
							break;
						default:
							verticalAnchor = mirror ? "end" : "start";
							break;
					}
					return verticalAnchor;
				}
			},
			{
				key: "renderAxisLine",
				value: function renderAxisLine() {
					var _this$props5 = this.props, x = _this$props5.x, y = _this$props5.y, width = _this$props5.width, height = _this$props5.height, orientation = _this$props5.orientation, mirror = _this$props5.mirror, axisLine = _this$props5.axisLine;
					var props = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, filterProps(this.props, false)), filterProps(axisLine, false)), {}, { fill: "none" });
					if (orientation === "top" || orientation === "bottom") {
						var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
						props = _objectSpread$2(_objectSpread$2({}, props), {}, {
							x1: x,
							y1: y + needHeight * height,
							x2: x + width,
							y2: y + needHeight * height
						});
					} else {
						var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
						props = _objectSpread$2(_objectSpread$2({}, props), {}, {
							x1: x + needWidth * width,
							y1: y,
							x2: x + needWidth * width,
							y2: y + height
						});
					}
					return /*#__PURE__*/ React.createElement("line", _extends$3({}, props, { className: clsx("recharts-cartesian-axis-line", get(axisLine, "className")) }));
				}
			},
			{
				key: "renderTicks",
				value: function renderTicks(ticks, fontSize, letterSpacing) {
					var _this2 = this;
					var _this$props6 = this.props, tickLine = _this$props6.tickLine, stroke = _this$props6.stroke, tick = _this$props6.tick, tickFormatter = _this$props6.tickFormatter, unit = _this$props6.unit;
					var finalTicks = getTicks(_objectSpread$2(_objectSpread$2({}, this.props), {}, { ticks }), fontSize, letterSpacing);
					var textAnchor = this.getTickTextAnchor();
					var verticalAnchor = this.getTickVerticalAnchor();
					var axisProps = filterProps(this.props, false);
					var customTickProps = filterProps(tick, false);
					var tickLineProps = _objectSpread$2(_objectSpread$2({}, axisProps), {}, { fill: "none" }, filterProps(tickLine, false));
					var items = finalTicks.map(function(entry, i) {
						var _this2$getTickLineCoo = _this2.getTickLineCoord(entry), lineCoord = _this2$getTickLineCoo.line, tickCoord = _this2$getTickLineCoo.tick;
						var tickProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({
							textAnchor,
							verticalAnchor
						}, axisProps), {}, {
							stroke: "none",
							fill: stroke
						}, customTickProps), tickCoord), {}, {
							index: i,
							payload: entry,
							visibleTicksCount: finalTicks.length,
							tickFormatter
						});
						return /*#__PURE__*/ React.createElement(Layer, _extends$3({
							className: "recharts-cartesian-axis-tick",
							key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
						}, adaptEventsOfChild(_this2.props, entry, i)), tickLine && /*#__PURE__*/ React.createElement("line", _extends$3({}, tickLineProps, lineCoord, { className: clsx("recharts-cartesian-axis-tick-line", get(tickLine, "className")) })), tick && CartesianAxis.renderTickItem(tick, tickProps, "".concat(isFunction(tickFormatter) ? tickFormatter(entry.value, i) : entry.value).concat(unit || "")));
					});
					return /*#__PURE__*/ React.createElement("g", { className: "recharts-cartesian-axis-ticks" }, items);
				}
			},
			{
				key: "render",
				value: function render() {
					var _this3 = this;
					var _this$props7 = this.props, axisLine = _this$props7.axisLine, width = _this$props7.width, height = _this$props7.height, ticksGenerator = _this$props7.ticksGenerator, className = _this$props7.className;
					if (_this$props7.hide) return null;
					var _this$props8 = this.props, ticks = _this$props8.ticks, noTicksProps = _objectWithoutProperties$1(_this$props8, _excluded3);
					var finalTicks = ticks;
					if (isFunction(ticksGenerator)) finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
					if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) return null;
					return /*#__PURE__*/ React.createElement(Layer, {
						className: clsx("recharts-cartesian-axis", className),
						ref: function ref(_ref2) {
							_this3.layerReference = _ref2;
						}
					}, axisLine && this.renderAxisLine(), this.renderTicks(finalTicks, this.state.fontSize, this.state.letterSpacing), Label.renderCallByParent(this.props));
				}
			}
		], [{
			key: "renderTickItem",
			value: function renderTickItem(option, props, value) {
				var tickItem;
				if (/*#__PURE__*/ React.isValidElement(option)) tickItem = /*#__PURE__*/ React.cloneElement(option, props);
				else if (isFunction(option)) tickItem = option(props);
				else tickItem = /*#__PURE__*/ React.createElement(Text, _extends$3({}, props, { className: "recharts-cartesian-axis-tick-value" }), value);
				return tickItem;
			}
		}]);
	}(Component);
	_defineProperty$5(CartesianAxis, "displayName", "CartesianAxis");
	_defineProperty$5(CartesianAxis, "defaultProps", {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		viewBox: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		orientation: "bottom",
		ticks: [],
		stroke: "#666",
		tickLine: true,
		axisLine: true,
		tick: true,
		mirror: false,
		minTickGap: 5,
		tickSize: 6,
		tickMargin: 2,
		interval: "preserveEnd"
	});
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/XAxis.js
/**
* @fileOverview X Axis
*/
function _typeof$4(o) {
	"@babel/helpers - typeof";
	return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$4(o);
}
function _classCallCheck$3(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$3(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$4(descriptor.key), descriptor);
	}
}
function _createClass$3(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$3(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$2(t, o, e) {
	return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
	if (call && (_typeof$4(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$2() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$2(o) {
	_getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
	_setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$2(o, p);
}
function _defineProperty$4(obj, key, value) {
	key = _toPropertyKey$4(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == _typeof$4(i) ? i : i + "";
}
function _toPrimitive$4(t, r) {
	if ("object" != _typeof$4(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$4(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
/** Define of XAxis props */
function XAxisImpl(_ref) {
	var xAxisId = _ref.xAxisId;
	var width = useChartWidth();
	var height = useChartHeight();
	var axisOptions = useXAxisOrThrow(xAxisId);
	if (axisOptions == null) return null;
	return /*#__PURE__*/ React.createElement(CartesianAxis, _extends$2({}, axisOptions, {
		className: clsx("recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType), axisOptions.className),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		},
		ticksGenerator: function ticksGenerator(axis) {
			return getTicksOfAxis(axis, true);
		}
	}));
}
var XAxis;
var init_XAxis = __esmMin((() => {
	init_clsx();
	init_chartLayoutContext();
	init_CartesianAxis();
	init_ChartUtils();
	XAxis = /*#__PURE__*/ function(_React$Component) {
		function XAxis() {
			_classCallCheck$3(this, XAxis);
			return _callSuper$2(this, XAxis, arguments);
		}
		_inherits$2(XAxis, _React$Component);
		return _createClass$3(XAxis, [{
			key: "render",
			value: function render() {
				return /*#__PURE__*/ React.createElement(XAxisImpl, this.props);
			}
		}]);
	}(React.Component);
	_defineProperty$4(XAxis, "displayName", "XAxis");
	_defineProperty$4(XAxis, "defaultProps", {
		allowDecimals: true,
		hide: false,
		orientation: "bottom",
		width: 0,
		height: 30,
		mirror: false,
		xAxisId: 0,
		tickCount: 5,
		type: "category",
		padding: {
			left: 0,
			right: 0
		},
		allowDataOverflow: false,
		scale: "auto",
		reversed: false,
		allowDuplicatedCategory: true
	});
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/YAxis.js
/**
* @fileOverview Y Axis
*/
function _typeof$3(o) {
	"@babel/helpers - typeof";
	return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$3(o);
}
function _classCallCheck$2(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$2(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor);
	}
}
function _createClass$2(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$2(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$1(t, o, e) {
	return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
	if (call && (_typeof$3(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$1() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$1(o) {
	_getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
	_setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$1(o, p);
}
function _defineProperty$3(obj, key, value) {
	key = _toPropertyKey$3(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
	if ("object" != _typeof$3(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$3(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
var YAxisImpl, YAxis;
var init_YAxis = __esmMin((() => {
	init_clsx();
	init_chartLayoutContext();
	init_CartesianAxis();
	init_ChartUtils();
	YAxisImpl = function YAxisImpl(_ref) {
		var yAxisId = _ref.yAxisId;
		var width = useChartWidth();
		var height = useChartHeight();
		var axisOptions = useYAxisOrThrow(yAxisId);
		if (axisOptions == null) return null;
		return /*#__PURE__*/ React.createElement(CartesianAxis, _extends$1({}, axisOptions, {
			className: clsx("recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType), axisOptions.className),
			viewBox: {
				x: 0,
				y: 0,
				width,
				height
			},
			ticksGenerator: function ticksGenerator(axis) {
				return getTicksOfAxis(axis, true);
			}
		}));
	};
	YAxis = /*#__PURE__*/ function(_React$Component) {
		function YAxis() {
			_classCallCheck$2(this, YAxis);
			return _callSuper$1(this, YAxis, arguments);
		}
		_inherits$1(YAxis, _React$Component);
		return _createClass$2(YAxis, [{
			key: "render",
			value: function render() {
				return /*#__PURE__*/ React.createElement(YAxisImpl, this.props);
			}
		}]);
	}(React.Component);
	_defineProperty$3(YAxis, "displayName", "YAxis");
	_defineProperty$3(YAxis, "defaultProps", {
		allowDuplicatedCategory: true,
		allowDecimals: true,
		hide: false,
		orientation: "left",
		width: 60,
		height: 0,
		mirror: false,
		yAxisId: 0,
		tickCount: 5,
		type: "number",
		padding: {
			top: 0,
			bottom: 0
		},
		allowDataOverflow: false,
		scale: "auto",
		reversed: false
	});
}));
//#endregion
//#region node_modules/recharts/es6/util/DetectReferenceElementsDomain.js
function _toConsumableArray$1(arr) {
	return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _iterableToArray$1(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}
function _arrayLikeToArray$1(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
var detectReferenceElementsDomain;
var init_DetectReferenceElementsDomain = __esmMin((() => {
	init_ReferenceDot();
	init_ReferenceLine();
	init_ReferenceArea();
	init_IfOverflowMatches();
	init_ReactUtils();
	init_DataUtils();
	detectReferenceElementsDomain = function detectReferenceElementsDomain(children, domain, axisId, axisType, specifiedTicks) {
		var lines = findAllByType(children, ReferenceLine);
		var dots = findAllByType(children, ReferenceDot);
		var elements = [].concat(_toConsumableArray$1(lines), _toConsumableArray$1(dots));
		var areas = findAllByType(children, ReferenceArea);
		var idKey = "".concat(axisType, "Id");
		var valueKey = axisType[0];
		var finalDomain = domain;
		if (elements.length) finalDomain = elements.reduce(function(result, el) {
			if (el.props[idKey] === axisId && ifOverflowMatches(el.props, "extendDomain") && isNumber(el.props[valueKey])) {
				var value = el.props[valueKey];
				return [Math.min(result[0], value), Math.max(result[1], value)];
			}
			return result;
		}, finalDomain);
		if (areas.length) {
			var key1 = "".concat(valueKey, "1");
			var key2 = "".concat(valueKey, "2");
			finalDomain = areas.reduce(function(result, el) {
				if (el.props[idKey] === axisId && ifOverflowMatches(el.props, "extendDomain") && isNumber(el.props[key1]) && isNumber(el.props[key2])) {
					var value1 = el.props[key1];
					var value2 = el.props[key2];
					return [Math.min(result[0], value1, value2), Math.max(result[1], value1, value2)];
				}
				return result;
			}, finalDomain);
		}
		if (specifiedTicks && specifiedTicks.length) finalDomain = specifiedTicks.reduce(function(result, tick) {
			if (isNumber(tick)) return [Math.min(result[0], tick), Math.max(result[1], tick)];
			return result;
		}, finalDomain);
		return finalDomain;
	};
}));
//#endregion
//#region node_modules/eventemitter3/index.js
var require_eventemitter3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var has = Object.prototype.hasOwnProperty;
	var prefix = "~";
	/**
	* Constructor to create a storage for our `EE` objects.
	* An `Events` instance is a plain object whose properties are event names.
	*
	* @constructor
	* @private
	*/
	function Events() {}
	if (Object.create) {
		Events.prototype = Object.create(null);
		if (!new Events().__proto__) prefix = false;
	}
	/**
	* Representation of a single event listener.
	*
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	* @constructor
	* @private
	*/
	function EE(fn, context, once) {
		this.fn = fn;
		this.context = context;
		this.once = once || false;
	}
	/**
	* Add a listener for a given event.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} once Specify if the listener is a one-time listener.
	* @returns {EventEmitter}
	* @private
	*/
	function addListener(emitter, event, fn, context, once) {
		if (typeof fn !== "function") throw new TypeError("The listener must be a function");
		var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
		if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		else emitter._events[evt] = [emitter._events[evt], listener];
		return emitter;
	}
	/**
	* Clear event by name.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} evt The Event name.
	* @private
	*/
	function clearEvent(emitter, evt) {
		if (--emitter._eventsCount === 0) emitter._events = new Events();
		else delete emitter._events[evt];
	}
	/**
	* Minimal `EventEmitter` interface that is molded against the Node.js
	* `EventEmitter` interface.
	*
	* @constructor
	* @public
	*/
	function EventEmitter() {
		this._events = new Events();
		this._eventsCount = 0;
	}
	/**
	* Return an array listing the events for which the emitter has registered
	* listeners.
	*
	* @returns {Array}
	* @public
	*/
	EventEmitter.prototype.eventNames = function eventNames() {
		var names = [], events, name;
		if (this._eventsCount === 0) return names;
		for (name in events = this._events) if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
		return names;
	};
	/**
	* Return the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Array} The registered listeners.
	* @public
	*/
	EventEmitter.prototype.listeners = function listeners(event) {
		var evt = prefix ? prefix + event : event, handlers = this._events[evt];
		if (!handlers) return [];
		if (handlers.fn) return [handlers.fn];
		for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
		return ee;
	};
	/**
	* Return the number of listeners listening to a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Number} The number of listeners.
	* @public
	*/
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
		var evt = prefix ? prefix + event : event, listeners = this._events[evt];
		if (!listeners) return 0;
		if (listeners.fn) return 1;
		return listeners.length;
	};
	/**
	* Calls each of the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Boolean} `true` if the event had listeners, else `false`.
	* @public
	*/
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return false;
		var listeners = this._events[evt], len = arguments.length, args, i;
		if (listeners.fn) {
			if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
			switch (len) {
				case 1: return listeners.fn.call(listeners.context), true;
				case 2: return listeners.fn.call(listeners.context, a1), true;
				case 3: return listeners.fn.call(listeners.context, a1, a2), true;
				case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
				case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
				case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
			}
			for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
			listeners.fn.apply(listeners.context, args);
		} else {
			var length = listeners.length, j;
			for (i = 0; i < length; i++) {
				if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
				switch (len) {
					case 1:
						listeners[i].fn.call(listeners[i].context);
						break;
					case 2:
						listeners[i].fn.call(listeners[i].context, a1);
						break;
					case 3:
						listeners[i].fn.call(listeners[i].context, a1, a2);
						break;
					case 4:
						listeners[i].fn.call(listeners[i].context, a1, a2, a3);
						break;
					default:
						if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
						listeners[i].fn.apply(listeners[i].context, args);
				}
			}
		}
		return true;
	};
	/**
	* Add a listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.on = function on(event, fn, context) {
		return addListener(this, event, fn, context, false);
	};
	/**
	* Add a one-time listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.once = function once(event, fn, context) {
		return addListener(this, event, fn, context, true);
	};
	/**
	* Remove the listeners of a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn Only remove the listeners that match this function.
	* @param {*} context Only remove the listeners that have this context.
	* @param {Boolean} once Only remove one-time listeners.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return this;
		if (!fn) {
			clearEvent(this, evt);
			return this;
		}
		var listeners = this._events[evt];
		if (listeners.fn) {
			if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
		} else {
			for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
			if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
			else clearEvent(this, evt);
		}
		return this;
	};
	/**
	* Remove all listeners, or those of the specified event.
	*
	* @param {(String|Symbol)} [event] The event name.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		var evt;
		if (event) {
			evt = prefix ? prefix + event : event;
			if (this._events[evt]) clearEvent(this, evt);
		} else {
			this._events = new Events();
			this._eventsCount = 0;
		}
		return this;
	};
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prefixed = prefix;
	EventEmitter.EventEmitter = EventEmitter;
	if ("undefined" !== typeof module) module.exports = EventEmitter;
}));
//#endregion
//#region node_modules/recharts/es6/util/Events.js
var import_eventemitter3, eventCenter, SYNC_EVENT;
var init_Events = __esmMin((() => {
	import_eventemitter3 = /* @__PURE__ */ __toESM(require_eventemitter3());
	eventCenter = new import_eventemitter3.default();
	SYNC_EVENT = "recharts.syncMouseEvents";
}));
//#endregion
//#region node_modules/recharts/es6/chart/AccessibilityManager.js
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$2(o);
}
function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
	}
}
function _createClass$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var AccessibilityManager;
var init_AccessibilityManager = __esmMin((() => {
	AccessibilityManager = /*#__PURE__*/ function() {
		function AccessibilityManager() {
			_classCallCheck$1(this, AccessibilityManager);
			_defineProperty$2(this, "activeIndex", 0);
			_defineProperty$2(this, "coordinateList", []);
			_defineProperty$2(this, "layout", "horizontal");
		}
		return _createClass$1(AccessibilityManager, [
			{
				key: "setDetails",
				value: function setDetails(_ref) {
					var _ref2;
					var _ref$coordinateList = _ref.coordinateList, coordinateList = _ref$coordinateList === void 0 ? null : _ref$coordinateList, _ref$container = _ref.container, container = _ref$container === void 0 ? null : _ref$container, _ref$layout = _ref.layout, layout = _ref$layout === void 0 ? null : _ref$layout, _ref$offset = _ref.offset, offset = _ref$offset === void 0 ? null : _ref$offset, _ref$mouseHandlerCall = _ref.mouseHandlerCallback, mouseHandlerCallback = _ref$mouseHandlerCall === void 0 ? null : _ref$mouseHandlerCall;
					this.coordinateList = (_ref2 = coordinateList !== null && coordinateList !== void 0 ? coordinateList : this.coordinateList) !== null && _ref2 !== void 0 ? _ref2 : [];
					this.container = container !== null && container !== void 0 ? container : this.container;
					this.layout = layout !== null && layout !== void 0 ? layout : this.layout;
					this.offset = offset !== null && offset !== void 0 ? offset : this.offset;
					this.mouseHandlerCallback = mouseHandlerCallback !== null && mouseHandlerCallback !== void 0 ? mouseHandlerCallback : this.mouseHandlerCallback;
					this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
				}
			},
			{
				key: "focus",
				value: function focus() {
					this.spoofMouse();
				}
			},
			{
				key: "keyboardEvent",
				value: function keyboardEvent(e) {
					if (this.coordinateList.length === 0) return;
					switch (e.key) {
						case "ArrowRight":
							if (this.layout !== "horizontal") return;
							this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1);
							this.spoofMouse();
							break;
						case "ArrowLeft":
							if (this.layout !== "horizontal") return;
							this.activeIndex = Math.max(this.activeIndex - 1, 0);
							this.spoofMouse();
							break;
						default: break;
					}
				}
			},
			{
				key: "setIndex",
				value: function setIndex(newIndex) {
					this.activeIndex = newIndex;
				}
			},
			{
				key: "spoofMouse",
				value: function spoofMouse() {
					var _window, _window2;
					if (this.layout !== "horizontal") return;
					if (this.coordinateList.length === 0) return;
					var _this$container$getBo = this.container.getBoundingClientRect(), x = _this$container$getBo.x, y = _this$container$getBo.y, height = _this$container$getBo.height;
					var coordinate = this.coordinateList[this.activeIndex].coordinate;
					var scrollOffsetX = ((_window = window) === null || _window === void 0 ? void 0 : _window.scrollX) || 0;
					var scrollOffsetY = ((_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.scrollY) || 0;
					var pageX = x + coordinate + scrollOffsetX;
					var pageY = y + this.offset.top + height / 2 + scrollOffsetY;
					this.mouseHandlerCallback({
						pageX,
						pageY
					});
				}
			}
		]);
	}();
}));
//#endregion
//#region node_modules/recharts/es6/util/isDomainSpecifiedByUser.js
/**
* Takes a domain and user props to determine whether he provided the domain via props or if we need to calculate it.
* @param   {AxisDomain}  domain              The potential domain from props
* @param   {Boolean}     allowDataOverflow   from props
* @param   {String}      axisType            from props
* @returns {Boolean}                         `true` if domain is specified by user
*/
function isDomainSpecifiedByUser(domain, allowDataOverflow, axisType) {
	if (axisType === "number" && allowDataOverflow === true && Array.isArray(domain)) {
		var domainStart = domain === null || domain === void 0 ? void 0 : domain[0];
		var domainEnd = domain === null || domain === void 0 ? void 0 : domain[1];
		if (!!domainStart && !!domainEnd && isNumber(domainStart) && isNumber(domainEnd)) return true;
	}
	return false;
}
var init_isDomainSpecifiedByUser = __esmMin((() => {
	init_DataUtils();
}));
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorRectangle.js
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
	var halfSize = tooltipAxisBandSize / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + .5,
		y: layout === "horizontal" ? offset.top + .5 : activeCoordinate.y - halfSize,
		width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
		height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
	};
}
var init_getCursorRectangle = __esmMin((() => {}));
//#endregion
//#region node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js
/**
* Only applicable for radial layouts
* @param {Object} activeCoordinate ChartCoordinate
* @returns {Object} RadialCursorPoints
*/
function getRadialCursorPoints(activeCoordinate) {
	var cx = activeCoordinate.cx, cy = activeCoordinate.cy, radius = activeCoordinate.radius, startAngle = activeCoordinate.startAngle, endAngle = activeCoordinate.endAngle;
	return {
		points: [polarToCartesian(cx, cy, radius, startAngle), polarToCartesian(cx, cy, radius, endAngle)],
		cx,
		cy,
		radius,
		startAngle,
		endAngle
	};
}
var init_getRadialCursorPoints = __esmMin((() => {
	init_PolarUtils();
}));
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorPoints.js
function getCursorPoints(layout, activeCoordinate, offset) {
	var x1, y1, x2, y2;
	if (layout === "horizontal") {
		x1 = activeCoordinate.x;
		x2 = x1;
		y1 = offset.top;
		y2 = offset.top + offset.height;
	} else if (layout === "vertical") {
		y1 = activeCoordinate.y;
		y2 = y1;
		x1 = offset.left;
		x2 = offset.left + offset.width;
	} else if (activeCoordinate.cx != null && activeCoordinate.cy != null) if (layout === "centric") {
		var cx = activeCoordinate.cx, cy = activeCoordinate.cy, innerRadius = activeCoordinate.innerRadius, outerRadius = activeCoordinate.outerRadius, angle = activeCoordinate.angle;
		var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
		var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
		x1 = innerPoint.x;
		y1 = innerPoint.y;
		x2 = outerPoint.x;
		y2 = outerPoint.y;
	} else return getRadialCursorPoints(activeCoordinate);
	return [{
		x: x1,
		y: y1
	}, {
		x: x2,
		y: y2
	}];
}
var init_getCursorPoints = __esmMin((() => {
	init_PolarUtils();
	init_getRadialCursorPoints();
}));
//#endregion
//#region node_modules/recharts/es6/component/Cursor.js
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function Cursor(props) {
	var _element$props$cursor, _defaultProps;
	var element = props.element, tooltipEventType = props.tooltipEventType, isActive = props.isActive, activeCoordinate = props.activeCoordinate, activePayload = props.activePayload, offset = props.offset, activeTooltipIndex = props.activeTooltipIndex, tooltipAxisBandSize = props.tooltipAxisBandSize, layout = props.layout, chartName = props.chartName;
	var elementPropsCursor = (_element$props$cursor = element.props.cursor) !== null && _element$props$cursor !== void 0 ? _element$props$cursor : (_defaultProps = element.type.defaultProps) === null || _defaultProps === void 0 ? void 0 : _defaultProps.cursor;
	if (!element || !elementPropsCursor || !isActive || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") return null;
	var restProps;
	var cursorComp = Curve;
	if (chartName === "ScatterChart") {
		restProps = activeCoordinate;
		cursorComp = Cross;
	} else if (chartName === "BarChart") {
		restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
		cursorComp = Rectangle;
	} else if (layout === "radial") {
		var _getRadialCursorPoint = getRadialCursorPoints(activeCoordinate), cx = _getRadialCursorPoint.cx, cy = _getRadialCursorPoint.cy, radius = _getRadialCursorPoint.radius;
		restProps = {
			cx,
			cy,
			startAngle: _getRadialCursorPoint.startAngle,
			endAngle: _getRadialCursorPoint.endAngle,
			innerRadius: radius,
			outerRadius: radius
		};
		cursorComp = Sector;
	} else {
		restProps = { points: getCursorPoints(layout, activeCoordinate, offset) };
		cursorComp = Curve;
	}
	var cursorProps = _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
		stroke: "#ccc",
		pointerEvents: "none"
	}, offset), restProps), filterProps(elementPropsCursor, false)), {}, {
		payload: activePayload,
		payloadIndex: activeTooltipIndex,
		className: clsx("recharts-tooltip-cursor", elementPropsCursor.className)
	});
	return /*#__PURE__*/ isValidElement(elementPropsCursor) ? /*#__PURE__*/ cloneElement(elementPropsCursor, cursorProps) : /*#__PURE__*/ createElement(cursorComp, cursorProps);
}
var init_Cursor = __esmMin((() => {
	init_clsx();
	init_Curve();
	init_Cross();
	init_getCursorRectangle();
	init_Rectangle();
	init_getRadialCursorPoints();
	init_Sector();
	init_getCursorPoints();
	init_ReactUtils();
}));
//#endregion
//#region node_modules/recharts/es6/chart/generateCategoricalChart.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function _slicedToArray(arr, i) {
	return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* This function exists as a temporary workaround.
*
* Why? generateCategoricalChart does not render `{children}` directly;
* instead it passes them through `renderByOrder` function which reads their handlers.
*
* So, this is a handler that does nothing.
* Once we get rid of `renderByOrder` and switch to JSX only, we can get rid of this handler too.
*
* @param {JSX} element as is in JSX
* @returns {JSX} the same element
*/
function renderAsIs(element) {
	return element;
}
function getDefaultDomainByAxisType(axisType) {
	return axisType === "number" ? [0, "auto"] : void 0;
}
var _excluded, _excluded2, ORIENT_MAP, FULL_WIDTH_AND_HEIGHT, originCoordinate, calculateTooltipPos, getActiveCoordinate, getDisplayedData, getTooltipContent, getTooltipData, getAxisMapByAxes, getAxisMapByItems, getAxisMap, tooltipTicksGenerator, createDefaultState, hasGraphicalBarItem, getAxisNameByLayout, calculateOffset, getCartesianAxisSize, generateCategoricalChart;
var init_generateCategoricalChart = __esmMin((() => {
	init_isNil();
	init_isFunction();
	init_range();
	init_get();
	init_sortBy();
	init_throttle();
	init_clsx();
	init_tiny_invariant();
	init_Surface();
	init_Layer();
	init_Tooltip();
	init_Legend();
	init_Dot();
	init_Rectangle();
	init_ReactUtils();
	init_Brush();
	init_DOMUtils();
	init_DataUtils();
	init_ChartUtils();
	init_DetectReferenceElementsDomain();
	init_PolarUtils();
	init_ShallowEqual();
	init_Events();
	init_types();
	init_AccessibilityManager();
	init_isDomainSpecifiedByUser();
	init_ActiveShapeUtils();
	init_Cursor();
	init_chartLayoutContext();
	_excluded = ["item"];
	_excluded2 = [
		"children",
		"className",
		"width",
		"height",
		"style",
		"compact",
		"title",
		"desc"
	];
	ORIENT_MAP = {
		xAxis: ["bottom", "top"],
		yAxis: ["left", "right"]
	};
	FULL_WIDTH_AND_HEIGHT = {
		width: "100%",
		height: "100%"
	};
	originCoordinate = {
		x: 0,
		y: 0
	};
	calculateTooltipPos = function calculateTooltipPos(rangeObj, layout) {
		if (layout === "horizontal") return rangeObj.x;
		if (layout === "vertical") return rangeObj.y;
		if (layout === "centric") return rangeObj.angle;
		return rangeObj.radius;
	};
	getActiveCoordinate = function getActiveCoordinate(layout, tooltipTicks, activeIndex, rangeObj) {
		var entry = tooltipTicks.find(function(tick) {
			return tick && tick.index === activeIndex;
		});
		if (entry) {
			if (layout === "horizontal") return {
				x: entry.coordinate,
				y: rangeObj.y
			};
			if (layout === "vertical") return {
				x: rangeObj.x,
				y: entry.coordinate
			};
			if (layout === "centric") {
				var _angle = entry.coordinate;
				var _radius = rangeObj.radius;
				return _objectSpread(_objectSpread(_objectSpread({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
					angle: _angle,
					radius: _radius
				});
			}
			var radius = entry.coordinate;
			var angle = rangeObj.angle;
			return _objectSpread(_objectSpread(_objectSpread({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
				angle,
				radius
			});
		}
		return originCoordinate;
	};
	getDisplayedData = function getDisplayedData(data, _ref) {
		var graphicalItems = _ref.graphicalItems, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
		var itemsData = (graphicalItems !== null && graphicalItems !== void 0 ? graphicalItems : []).reduce(function(result, child) {
			var itemData = child.props.data;
			if (itemData && itemData.length) return [].concat(_toConsumableArray(result), _toConsumableArray(itemData));
			return result;
		}, []);
		if (itemsData.length > 0) return itemsData;
		if (data && data.length && isNumber(dataStartIndex) && isNumber(dataEndIndex)) return data.slice(dataStartIndex, dataEndIndex + 1);
		return [];
	};
	getTooltipContent = function getTooltipContent(state, chartData, activeIndex, activeLabel) {
		var graphicalItems = state.graphicalItems, tooltipAxis = state.tooltipAxis;
		var displayedData = getDisplayedData(chartData, state);
		if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) return null;
		return graphicalItems.reduce(function(result, child) {
			var _child$props$data;
			/**
			* Fixes: https://github.com/recharts/recharts/issues/3669
			* Defaulting to chartData below to fix an edge case where the tooltip does not include data from all charts
			* when a separate dataset is passed to chart prop data and specified on Line/Area/etc prop data
			*/
			var data = (_child$props$data = child.props.data) !== null && _child$props$data !== void 0 ? _child$props$data : chartData;
			if (data && state.dataStartIndex + state.dataEndIndex !== 0 && state.dataEndIndex - state.dataStartIndex >= activeIndex) data = data.slice(state.dataStartIndex, state.dataEndIndex + 1);
			var payload;
			if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) payload = findEntryInArray(data === void 0 ? displayedData : data, tooltipAxis.dataKey, activeLabel);
			else payload = data && data[activeIndex] || displayedData[activeIndex];
			if (!payload) return result;
			return [].concat(_toConsumableArray(result), [getTooltipItem(child, payload)]);
		}, []);
	};
	getTooltipData = function getTooltipData(state, chartData, layout, rangeObj) {
		var rangeData = rangeObj || {
			x: state.chartX,
			y: state.chartY
		};
		var pos = calculateTooltipPos(rangeData, layout);
		var ticks = state.orderedTooltipTicks, axis = state.tooltipAxis, tooltipTicks = state.tooltipTicks;
		var activeIndex = calculateActiveTickIndex(pos, ticks, tooltipTicks, axis);
		if (activeIndex >= 0 && tooltipTicks) {
			var activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value;
			return {
				activeTooltipIndex: activeIndex,
				activeLabel,
				activePayload: getTooltipContent(state, chartData, activeIndex, activeLabel),
				activeCoordinate: getActiveCoordinate(layout, ticks, activeIndex, rangeData)
			};
		}
		return null;
	};
	getAxisMapByAxes = function getAxisMapByAxes(props, _ref2) {
		var axes = _ref2.axes, graphicalItems = _ref2.graphicalItems, axisType = _ref2.axisType, axisIdKey = _ref2.axisIdKey, stackGroups = _ref2.stackGroups, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
		var layout = props.layout, children = props.children, stackOffset = props.stackOffset;
		var isCategorical = isCategoricalAxis(layout, axisType);
		return axes.reduce(function(result, child) {
			var _childProps$domain2;
			var childProps = child.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, child.type.defaultProps), child.props) : child.props;
			var type = childProps.type, dataKey = childProps.dataKey, allowDataOverflow = childProps.allowDataOverflow, allowDuplicatedCategory = childProps.allowDuplicatedCategory, scale = childProps.scale, ticks = childProps.ticks, includeHidden = childProps.includeHidden;
			var axisId = childProps[axisIdKey];
			if (result[axisId]) return result;
			var displayedData = getDisplayedData(props.data, {
				graphicalItems: graphicalItems.filter(function(item) {
					var _defaultProps;
					return (axisIdKey in item.props ? item.props[axisIdKey] : (_defaultProps = item.type.defaultProps) === null || _defaultProps === void 0 ? void 0 : _defaultProps[axisIdKey]) === axisId;
				}),
				dataStartIndex,
				dataEndIndex
			});
			var len = displayedData.length;
			var domain, duplicateDomain, categoricalDomain;
			if (isDomainSpecifiedByUser(childProps.domain, allowDataOverflow, type)) {
				domain = parseSpecifiedDomain(childProps.domain, null, allowDataOverflow);
				if (isCategorical && (type === "number" || scale !== "auto")) categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, "category");
			}
			var defaultDomain = getDefaultDomainByAxisType(type);
			if (!domain || domain.length === 0) {
				var _childProps$domain;
				var childDomain = (_childProps$domain = childProps.domain) !== null && _childProps$domain !== void 0 ? _childProps$domain : defaultDomain;
				if (dataKey) {
					domain = getDomainOfDataByKey(displayedData, dataKey, type);
					if (type === "category" && isCategorical) {
						var duplicate = hasDuplicate(domain);
						if (allowDuplicatedCategory && duplicate) {
							duplicateDomain = domain;
							domain = range(0, len);
						} else if (!allowDuplicatedCategory) domain = parseDomainOfCategoryAxis(childDomain, domain, child).reduce(function(finalDomain, entry) {
							return finalDomain.indexOf(entry) >= 0 ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
						}, []);
					} else if (type === "category") if (!allowDuplicatedCategory) domain = parseDomainOfCategoryAxis(childDomain, domain, child).reduce(function(finalDomain, entry) {
						return finalDomain.indexOf(entry) >= 0 || entry === "" || isNil(entry) ? finalDomain : [].concat(_toConsumableArray(finalDomain), [entry]);
					}, []);
					else domain = domain.filter(function(entry) {
						return entry !== "" && !isNil(entry);
					});
					else if (type === "number") {
						var errorBarsDomain = parseErrorBarsOfAxis(displayedData, graphicalItems.filter(function(item) {
							var _defaultProps2, _defaultProps3;
							var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : (_defaultProps2 = item.type.defaultProps) === null || _defaultProps2 === void 0 ? void 0 : _defaultProps2[axisIdKey];
							var itemHide = "hide" in item.props ? item.props.hide : (_defaultProps3 = item.type.defaultProps) === null || _defaultProps3 === void 0 ? void 0 : _defaultProps3.hide;
							return itemAxisId === axisId && (includeHidden || !itemHide);
						}), dataKey, axisType, layout);
						if (errorBarsDomain) domain = errorBarsDomain;
					}
					if (isCategorical && (type === "number" || scale !== "auto")) categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, "category");
				} else if (isCategorical) domain = range(0, len);
				else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && type === "number") domain = stackOffset === "expand" ? [0, 1] : getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
				else domain = getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter(function(item) {
					var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : item.type.defaultProps[axisIdKey];
					var itemHide = "hide" in item.props ? item.props.hide : item.type.defaultProps.hide;
					return itemAxisId === axisId && (includeHidden || !itemHide);
				}), type, layout, true);
				if (type === "number") {
					domain = detectReferenceElementsDomain(children, domain, axisId, axisType, ticks);
					if (childDomain) domain = parseSpecifiedDomain(childDomain, domain, allowDataOverflow);
				} else if (type === "category" && childDomain) {
					var axisDomain = childDomain;
					if (domain.every(function(entry) {
						return axisDomain.indexOf(entry) >= 0;
					})) domain = axisDomain;
				}
			}
			return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, axisId, _objectSpread(_objectSpread({}, childProps), {}, {
				axisType,
				domain,
				categoricalDomain,
				duplicateDomain,
				originalDomain: (_childProps$domain2 = childProps.domain) !== null && _childProps$domain2 !== void 0 ? _childProps$domain2 : defaultDomain,
				isCategorical,
				layout
			})));
		}, {});
	};
	getAxisMapByItems = function getAxisMapByItems(props, _ref3) {
		var graphicalItems = _ref3.graphicalItems, Axis = _ref3.Axis, axisType = _ref3.axisType, axisIdKey = _ref3.axisIdKey, stackGroups = _ref3.stackGroups, dataStartIndex = _ref3.dataStartIndex, dataEndIndex = _ref3.dataEndIndex;
		var layout = props.layout, children = props.children;
		var displayedData = getDisplayedData(props.data, {
			graphicalItems,
			dataStartIndex,
			dataEndIndex
		});
		var len = displayedData.length;
		var isCategorical = isCategoricalAxis(layout, axisType);
		var index = -1;
		return graphicalItems.reduce(function(result, child) {
			var axisId = (child.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, child.type.defaultProps), child.props) : child.props)[axisIdKey];
			var originalDomain = getDefaultDomainByAxisType("number");
			if (!result[axisId]) {
				index++;
				var domain;
				if (isCategorical) domain = range(0, len);
				else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
					domain = getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
					domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
				} else {
					domain = parseSpecifiedDomain(originalDomain, getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter(function(item) {
						var _defaultProps4, _defaultProps5;
						var itemAxisId = axisIdKey in item.props ? item.props[axisIdKey] : (_defaultProps4 = item.type.defaultProps) === null || _defaultProps4 === void 0 ? void 0 : _defaultProps4[axisIdKey];
						var itemHide = "hide" in item.props ? item.props.hide : (_defaultProps5 = item.type.defaultProps) === null || _defaultProps5 === void 0 ? void 0 : _defaultProps5.hide;
						return itemAxisId === axisId && !itemHide;
					}), "number", layout), Axis.defaultProps.allowDataOverflow);
					domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
				}
				return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, axisId, _objectSpread(_objectSpread({ axisType }, Axis.defaultProps), {}, {
					hide: true,
					orientation: get(ORIENT_MAP, "".concat(axisType, ".").concat(index % 2), null),
					domain,
					originalDomain,
					isCategorical,
					layout
				})));
			}
			return result;
		}, {});
	};
	getAxisMap = function getAxisMap(props, _ref4) {
		var _ref4$axisType = _ref4.axisType, axisType = _ref4$axisType === void 0 ? "xAxis" : _ref4$axisType, AxisComp = _ref4.AxisComp, graphicalItems = _ref4.graphicalItems, stackGroups = _ref4.stackGroups, dataStartIndex = _ref4.dataStartIndex, dataEndIndex = _ref4.dataEndIndex;
		var children = props.children;
		var axisIdKey = "".concat(axisType, "Id");
		var axes = findAllByType(children, AxisComp);
		var axisMap = {};
		if (axes && axes.length) axisMap = getAxisMapByAxes(props, {
			axes,
			graphicalItems,
			axisType,
			axisIdKey,
			stackGroups,
			dataStartIndex,
			dataEndIndex
		});
		else if (graphicalItems && graphicalItems.length) axisMap = getAxisMapByItems(props, {
			Axis: AxisComp,
			graphicalItems,
			axisType,
			axisIdKey,
			stackGroups,
			dataStartIndex,
			dataEndIndex
		});
		return axisMap;
	};
	tooltipTicksGenerator = function tooltipTicksGenerator(axisMap) {
		var axis = getAnyElementOfObject(axisMap);
		var tooltipTicks = getTicksOfAxis(axis, false, true);
		return {
			tooltipTicks,
			orderedTooltipTicks: sortBy(tooltipTicks, function(o) {
				return o.coordinate;
			}),
			tooltipAxis: axis,
			tooltipAxisBandSize: getBandSizeOfAxis(axis, tooltipTicks)
		};
	};
	createDefaultState = function createDefaultState(props) {
		var children = props.children, defaultShowTooltip = props.defaultShowTooltip;
		var brushItem = findChildByType(children, Brush);
		var startIndex = 0;
		var endIndex = 0;
		if (props.data && props.data.length !== 0) endIndex = props.data.length - 1;
		if (brushItem && brushItem.props) {
			if (brushItem.props.startIndex >= 0) startIndex = brushItem.props.startIndex;
			if (brushItem.props.endIndex >= 0) endIndex = brushItem.props.endIndex;
		}
		return {
			chartX: 0,
			chartY: 0,
			dataStartIndex: startIndex,
			dataEndIndex: endIndex,
			activeTooltipIndex: -1,
			isTooltipActive: Boolean(defaultShowTooltip)
		};
	};
	hasGraphicalBarItem = function hasGraphicalBarItem(graphicalItems) {
		if (!graphicalItems || !graphicalItems.length) return false;
		return graphicalItems.some(function(item) {
			var name = getDisplayName(item && item.type);
			return name && name.indexOf("Bar") >= 0;
		});
	};
	getAxisNameByLayout = function getAxisNameByLayout(layout) {
		if (layout === "horizontal") return {
			numericAxisName: "yAxis",
			cateAxisName: "xAxis"
		};
		if (layout === "vertical") return {
			numericAxisName: "xAxis",
			cateAxisName: "yAxis"
		};
		if (layout === "centric") return {
			numericAxisName: "radiusAxis",
			cateAxisName: "angleAxis"
		};
		return {
			numericAxisName: "angleAxis",
			cateAxisName: "radiusAxis"
		};
	};
	calculateOffset = function calculateOffset(_ref5, prevLegendBBox) {
		var props = _ref5.props, graphicalItems = _ref5.graphicalItems, _ref5$xAxisMap = _ref5.xAxisMap, xAxisMap = _ref5$xAxisMap === void 0 ? {} : _ref5$xAxisMap, _ref5$yAxisMap = _ref5.yAxisMap, yAxisMap = _ref5$yAxisMap === void 0 ? {} : _ref5$yAxisMap;
		var width = props.width, height = props.height, children = props.children;
		var margin = props.margin || {};
		var brushItem = findChildByType(children, Brush);
		var legendItem = findChildByType(children, Legend);
		var offsetH = Object.keys(yAxisMap).reduce(function(result, id) {
			var entry = yAxisMap[id];
			var orientation = entry.orientation;
			if (!entry.mirror && !entry.hide) return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, orientation, result[orientation] + entry.width));
			return result;
		}, {
			left: margin.left || 0,
			right: margin.right || 0
		});
		var offset = _objectSpread(_objectSpread({}, Object.keys(xAxisMap).reduce(function(result, id) {
			var entry = xAxisMap[id];
			var orientation = entry.orientation;
			if (!entry.mirror && !entry.hide) return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, orientation, get(result, "".concat(orientation)) + entry.height));
			return result;
		}, {
			top: margin.top || 0,
			bottom: margin.bottom || 0
		})), offsetH);
		var brushBottom = offset.bottom;
		if (brushItem) offset.bottom += brushItem.props.height || Brush.defaultProps.height;
		if (legendItem && prevLegendBBox) offset = appendOffsetOfLegend(offset, graphicalItems, props, prevLegendBBox);
		var offsetWidth = width - offset.left - offset.right;
		var offsetHeight = height - offset.top - offset.bottom;
		return _objectSpread(_objectSpread({ brushBottom }, offset), {}, {
			width: Math.max(offsetWidth, 0),
			height: Math.max(offsetHeight, 0)
		});
	};
	getCartesianAxisSize = function getCartesianAxisSize(axisObj, axisName) {
		if (axisName === "xAxis") return axisObj[axisName].width;
		if (axisName === "yAxis") return axisObj[axisName].height;
	};
	generateCategoricalChart = function generateCategoricalChart(_ref6) {
		var chartName = _ref6.chartName, GraphicalChild = _ref6.GraphicalChild, _ref6$defaultTooltipE = _ref6.defaultTooltipEventType, defaultTooltipEventType = _ref6$defaultTooltipE === void 0 ? "axis" : _ref6$defaultTooltipE, _ref6$validateTooltip = _ref6.validateTooltipEventTypes, validateTooltipEventTypes = _ref6$validateTooltip === void 0 ? ["axis"] : _ref6$validateTooltip, axisComponents = _ref6.axisComponents, legendContent = _ref6.legendContent, formatAxisMap = _ref6.formatAxisMap, defaultProps = _ref6.defaultProps;
		var getFormatItems = function getFormatItems(props, currentState) {
			var graphicalItems = currentState.graphicalItems, stackGroups = currentState.stackGroups, offset = currentState.offset, updateId = currentState.updateId, dataStartIndex = currentState.dataStartIndex, dataEndIndex = currentState.dataEndIndex;
			var barSize = props.barSize, layout = props.layout, barGap = props.barGap, barCategoryGap = props.barCategoryGap, globalMaxBarSize = props.maxBarSize;
			var _getAxisNameByLayout = getAxisNameByLayout(layout), numericAxisName = _getAxisNameByLayout.numericAxisName, cateAxisName = _getAxisNameByLayout.cateAxisName;
			var hasBar = hasGraphicalBarItem(graphicalItems);
			var formattedItems = [];
			graphicalItems.forEach(function(item, index) {
				var displayedData = getDisplayedData(props.data, {
					graphicalItems: [item],
					dataStartIndex,
					dataEndIndex
				});
				var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
				var dataKey = itemProps.dataKey, childMaxBarSize = itemProps.maxBarSize;
				var numericAxisId = itemProps["".concat(numericAxisName, "Id")];
				var cateAxisId = itemProps["".concat(cateAxisName, "Id")];
				var axisObj = axisComponents.reduce(function(result, entry) {
					var axisMap = currentState["".concat(entry.axisType, "Map")];
					var id = itemProps["".concat(entry.axisType, "Id")];
					/**
					* tell the user in dev mode that their configuration is incorrect if we cannot find a match between
					* axisId on the chart and axisId on the axis. zAxis does not get passed in the map for ComposedChart,
					* leave it out of the check for now.
					*/
					!(axisMap && axisMap[id] || entry.axisType === "zAxis") && invariant(false);
					var axis = axisMap[id];
					return _objectSpread(_objectSpread({}, result), {}, _defineProperty(_defineProperty({}, entry.axisType, axis), "".concat(entry.axisType, "Ticks"), getTicksOfAxis(axis)));
				}, {});
				var cateAxis = axisObj[cateAxisName];
				var cateTicks = axisObj["".concat(cateAxisName, "Ticks")];
				var stackedData = stackGroups && stackGroups[numericAxisId] && stackGroups[numericAxisId].hasStack && getStackedDataOfItem(item, stackGroups[numericAxisId].stackGroups);
				var itemIsBar = getDisplayName(item.type).indexOf("Bar") >= 0;
				var bandSize = getBandSizeOfAxis(cateAxis, cateTicks);
				var barPosition = [];
				var sizeList = hasBar && getBarSizeList({
					barSize,
					stackGroups,
					totalSize: getCartesianAxisSize(axisObj, cateAxisName)
				});
				if (itemIsBar) {
					var _ref7, _getBandSizeOfAxis;
					var maxBarSize = isNil(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
					var barBandSize = (_ref7 = (_getBandSizeOfAxis = getBandSizeOfAxis(cateAxis, cateTicks, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref7 !== void 0 ? _ref7 : 0;
					barPosition = getBarPosition({
						barGap,
						barCategoryGap,
						bandSize: barBandSize !== bandSize ? barBandSize : bandSize,
						sizeList: sizeList[cateAxisId],
						maxBarSize
					});
					if (barBandSize !== bandSize) barPosition = barPosition.map(function(pos) {
						return _objectSpread(_objectSpread({}, pos), {}, { position: _objectSpread(_objectSpread({}, pos.position), {}, { offset: pos.position.offset - barBandSize / 2 }) });
					});
				}
				var composedFn = item && item.type && item.type.getComposedData;
				if (composedFn) formattedItems.push({
					props: _objectSpread(_objectSpread({}, composedFn(_objectSpread(_objectSpread({}, axisObj), {}, {
						displayedData,
						props,
						dataKey,
						item,
						bandSize,
						barPosition,
						offset,
						stackedData,
						layout,
						dataStartIndex,
						dataEndIndex
					}))), {}, _defineProperty(_defineProperty(_defineProperty({ key: item.key || "item-".concat(index) }, numericAxisName, axisObj[numericAxisName]), cateAxisName, axisObj[cateAxisName]), "animationId", updateId)),
					childIndex: parseChildIndex(item, props.children),
					item
				});
			});
			return formattedItems;
		};
		/**
		* The AxisMaps are expensive to render on large data sets
		* so provide the ability to store them in state and only update them when necessary
		* they are dependent upon the start and end index of
		* the brush so it's important that this method is called _after_
		* the state is updated with any new start/end indices
		*
		* @param {Object} props          The props object to be used for updating the axismaps
		* dataStartIndex: The start index of the data series when a brush is applied
		* dataEndIndex: The end index of the data series when a brush is applied
		* updateId: The update id
		* @param {Object} prevState      Prev state
		* @return {Object} state New state to set
		*/
		var updateStateOfAxisMapsOffsetAndStackGroups = function updateStateOfAxisMapsOffsetAndStackGroups(_ref8, prevState) {
			var props = _ref8.props, dataStartIndex = _ref8.dataStartIndex, dataEndIndex = _ref8.dataEndIndex, updateId = _ref8.updateId;
			if (!validateWidthHeight({ props })) return null;
			var children = props.children, layout = props.layout, stackOffset = props.stackOffset, data = props.data, reverseStackOrder = props.reverseStackOrder;
			var _getAxisNameByLayout2 = getAxisNameByLayout(layout), numericAxisName = _getAxisNameByLayout2.numericAxisName, cateAxisName = _getAxisNameByLayout2.cateAxisName;
			var graphicalItems = findAllByType(children, GraphicalChild);
			var stackGroups = getStackGroupsByAxisId(data, graphicalItems, "".concat(numericAxisName, "Id"), "".concat(cateAxisName, "Id"), stackOffset, reverseStackOrder);
			var axisObj = axisComponents.reduce(function(result, entry) {
				var name = "".concat(entry.axisType, "Map");
				return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, name, getAxisMap(props, _objectSpread(_objectSpread({}, entry), {}, {
					graphicalItems,
					stackGroups: entry.axisType === numericAxisName && stackGroups,
					dataStartIndex,
					dataEndIndex
				}))));
			}, {});
			var offset = calculateOffset(_objectSpread(_objectSpread({}, axisObj), {}, {
				props,
				graphicalItems
			}), prevState === null || prevState === void 0 ? void 0 : prevState.legendBBox);
			Object.keys(axisObj).forEach(function(key) {
				axisObj[key] = formatAxisMap(props, axisObj[key], offset, key.replace("Map", ""), chartName);
			});
			var cateAxisMap = axisObj["".concat(cateAxisName, "Map")];
			var ticksObj = tooltipTicksGenerator(cateAxisMap);
			return _objectSpread(_objectSpread({
				formattedGraphicalItems: getFormatItems(props, _objectSpread(_objectSpread({}, axisObj), {}, {
					dataStartIndex,
					dataEndIndex,
					updateId,
					graphicalItems,
					stackGroups,
					offset
				})),
				graphicalItems,
				offset,
				stackGroups
			}, ticksObj), axisObj);
		};
		var CategoricalChartWrapper = /*#__PURE__*/ function(_Component) {
			function CategoricalChartWrapper(_props) {
				var _props$id, _props$throttleDelay;
				var _this;
				_classCallCheck(this, CategoricalChartWrapper);
				_this = _callSuper(this, CategoricalChartWrapper, [_props]);
				_defineProperty(_this, "eventEmitterSymbol", Symbol("rechartsEventEmitter"));
				_defineProperty(_this, "accessibilityManager", new AccessibilityManager());
				_defineProperty(_this, "handleLegendBBoxUpdate", function(box) {
					if (box) {
						var _this$state = _this.state, dataStartIndex = _this$state.dataStartIndex, dataEndIndex = _this$state.dataEndIndex, updateId = _this$state.updateId;
						_this.setState(_objectSpread({ legendBBox: box }, updateStateOfAxisMapsOffsetAndStackGroups({
							props: _this.props,
							dataStartIndex,
							dataEndIndex,
							updateId
						}, _objectSpread(_objectSpread({}, _this.state), {}, { legendBBox: box }))));
					}
				});
				_defineProperty(_this, "handleReceiveSyncEvent", function(cId, data, emitter) {
					if (_this.props.syncId === cId) {
						if (emitter === _this.eventEmitterSymbol && typeof _this.props.syncMethod !== "function") return;
						_this.applySyncEvent(data);
					}
				});
				_defineProperty(_this, "handleBrushChange", function(_ref9) {
					var startIndex = _ref9.startIndex, endIndex = _ref9.endIndex;
					if (startIndex !== _this.state.dataStartIndex || endIndex !== _this.state.dataEndIndex) {
						var updateId = _this.state.updateId;
						_this.setState(function() {
							return _objectSpread({
								dataStartIndex: startIndex,
								dataEndIndex: endIndex
							}, updateStateOfAxisMapsOffsetAndStackGroups({
								props: _this.props,
								dataStartIndex: startIndex,
								dataEndIndex: endIndex,
								updateId
							}, _this.state));
						});
						_this.triggerSyncEvent({
							dataStartIndex: startIndex,
							dataEndIndex: endIndex
						});
					}
				});
				/**
				* The handler of mouse entering chart
				* @param  {Object} e              Event object
				* @return {Null}                  null
				*/
				_defineProperty(_this, "handleMouseEnter", function(e) {
					var mouse = _this.getMouseInfo(e);
					if (mouse) {
						var _nextState = _objectSpread(_objectSpread({}, mouse), {}, { isTooltipActive: true });
						_this.setState(_nextState);
						_this.triggerSyncEvent(_nextState);
						var onMouseEnter = _this.props.onMouseEnter;
						if (isFunction(onMouseEnter)) onMouseEnter(_nextState, e);
					}
				});
				_defineProperty(_this, "triggeredAfterMouseMove", function(e) {
					var mouse = _this.getMouseInfo(e);
					var nextState = mouse ? _objectSpread(_objectSpread({}, mouse), {}, { isTooltipActive: true }) : { isTooltipActive: false };
					_this.setState(nextState);
					_this.triggerSyncEvent(nextState);
					var onMouseMove = _this.props.onMouseMove;
					if (isFunction(onMouseMove)) onMouseMove(nextState, e);
				});
				/**
				* The handler of mouse entering a scatter
				* @param {Object} el The active scatter
				* @return {Object} no return
				*/
				_defineProperty(_this, "handleItemMouseEnter", function(el) {
					_this.setState(function() {
						return {
							isTooltipActive: true,
							activeItem: el,
							activePayload: el.tooltipPayload,
							activeCoordinate: el.tooltipPosition || {
								x: el.cx,
								y: el.cy
							}
						};
					});
				});
				/**
				* The handler of mouse leaving a scatter
				* @return {Object} no return
				*/
				_defineProperty(_this, "handleItemMouseLeave", function() {
					_this.setState(function() {
						return { isTooltipActive: false };
					});
				});
				/**
				* The handler of mouse moving in chart
				* @param  {React.MouseEvent} e        Event object
				* @return {void} no return
				*/
				_defineProperty(_this, "handleMouseMove", function(e) {
					e.persist();
					_this.throttleTriggeredAfterMouseMove(e);
				});
				/**
				* The handler if mouse leaving chart
				* @param {Object} e Event object
				* @return {Null} no return
				*/
				_defineProperty(_this, "handleMouseLeave", function(e) {
					_this.throttleTriggeredAfterMouseMove.cancel();
					var nextState = { isTooltipActive: false };
					_this.setState(nextState);
					_this.triggerSyncEvent(nextState);
					var onMouseLeave = _this.props.onMouseLeave;
					if (isFunction(onMouseLeave)) onMouseLeave(nextState, e);
				});
				_defineProperty(_this, "handleOuterEvent", function(e) {
					var eventName = getReactEventByType(e);
					var event = get(_this.props, "".concat(eventName));
					if (eventName && isFunction(event)) {
						var _mouse;
						var mouse;
						if (/.*touch.*/i.test(eventName)) mouse = _this.getMouseInfo(e.changedTouches[0]);
						else mouse = _this.getMouseInfo(e);
						event((_mouse = mouse) !== null && _mouse !== void 0 ? _mouse : {}, e);
					}
				});
				_defineProperty(_this, "handleClick", function(e) {
					var mouse = _this.getMouseInfo(e);
					if (mouse) {
						var _nextState2 = _objectSpread(_objectSpread({}, mouse), {}, { isTooltipActive: true });
						_this.setState(_nextState2);
						_this.triggerSyncEvent(_nextState2);
						var onClick = _this.props.onClick;
						if (isFunction(onClick)) onClick(_nextState2, e);
					}
				});
				_defineProperty(_this, "handleMouseDown", function(e) {
					var onMouseDown = _this.props.onMouseDown;
					if (isFunction(onMouseDown)) onMouseDown(_this.getMouseInfo(e), e);
				});
				_defineProperty(_this, "handleMouseUp", function(e) {
					var onMouseUp = _this.props.onMouseUp;
					if (isFunction(onMouseUp)) onMouseUp(_this.getMouseInfo(e), e);
				});
				_defineProperty(_this, "handleTouchMove", function(e) {
					if (e.changedTouches != null && e.changedTouches.length > 0) _this.throttleTriggeredAfterMouseMove(e.changedTouches[0]);
				});
				_defineProperty(_this, "handleTouchStart", function(e) {
					if (e.changedTouches != null && e.changedTouches.length > 0) _this.handleMouseDown(e.changedTouches[0]);
				});
				_defineProperty(_this, "handleTouchEnd", function(e) {
					if (e.changedTouches != null && e.changedTouches.length > 0) _this.handleMouseUp(e.changedTouches[0]);
				});
				_defineProperty(_this, "handleDoubleClick", function(e) {
					var onDoubleClick = _this.props.onDoubleClick;
					if (isFunction(onDoubleClick)) onDoubleClick(_this.getMouseInfo(e), e);
				});
				_defineProperty(_this, "handleContextMenu", function(e) {
					var onContextMenu = _this.props.onContextMenu;
					if (isFunction(onContextMenu)) onContextMenu(_this.getMouseInfo(e), e);
				});
				_defineProperty(_this, "triggerSyncEvent", function(data) {
					if (_this.props.syncId !== void 0) eventCenter.emit(SYNC_EVENT, _this.props.syncId, data, _this.eventEmitterSymbol);
				});
				_defineProperty(_this, "applySyncEvent", function(data) {
					var _this$props = _this.props, layout = _this$props.layout, syncMethod = _this$props.syncMethod;
					var updateId = _this.state.updateId;
					var dataStartIndex = data.dataStartIndex, dataEndIndex = data.dataEndIndex;
					if (data.dataStartIndex !== void 0 || data.dataEndIndex !== void 0) _this.setState(_objectSpread({
						dataStartIndex,
						dataEndIndex
					}, updateStateOfAxisMapsOffsetAndStackGroups({
						props: _this.props,
						dataStartIndex,
						dataEndIndex,
						updateId
					}, _this.state)));
					else if (data.activeTooltipIndex !== void 0) {
						var chartX = data.chartX, chartY = data.chartY;
						var activeTooltipIndex = data.activeTooltipIndex;
						var _this$state2 = _this.state, offset = _this$state2.offset, tooltipTicks = _this$state2.tooltipTicks;
						if (!offset) return;
						if (typeof syncMethod === "function") activeTooltipIndex = syncMethod(tooltipTicks, data);
						else if (syncMethod === "value") {
							activeTooltipIndex = -1;
							for (var i = 0; i < tooltipTicks.length; i++) if (tooltipTicks[i].value === data.activeLabel) {
								activeTooltipIndex = i;
								break;
							}
						}
						var viewBox = _objectSpread(_objectSpread({}, offset), {}, {
							x: offset.left,
							y: offset.top
						});
						var validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
						var validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
						var activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;
						var activePayload = getTooltipContent(_this.state, _this.props.data, activeTooltipIndex);
						var activeCoordinate = tooltipTicks[activeTooltipIndex] ? {
							x: layout === "horizontal" ? tooltipTicks[activeTooltipIndex].coordinate : validateChartX,
							y: layout === "horizontal" ? validateChartY : tooltipTicks[activeTooltipIndex].coordinate
						} : originCoordinate;
						_this.setState(_objectSpread(_objectSpread({}, data), {}, {
							activeLabel,
							activeCoordinate,
							activePayload,
							activeTooltipIndex
						}));
					} else _this.setState(data);
				});
				_defineProperty(_this, "renderCursor", function(element) {
					var _element$props$active;
					var _this$state3 = _this.state, isTooltipActive = _this$state3.isTooltipActive, activeCoordinate = _this$state3.activeCoordinate, activePayload = _this$state3.activePayload, offset = _this$state3.offset, activeTooltipIndex = _this$state3.activeTooltipIndex, tooltipAxisBandSize = _this$state3.tooltipAxisBandSize;
					var tooltipEventType = _this.getTooltipEventType();
					var isActive = (_element$props$active = element.props.active) !== null && _element$props$active !== void 0 ? _element$props$active : isTooltipActive;
					var layout = _this.props.layout;
					var key = element.key || "_recharts-cursor";
					return /*#__PURE__*/ React.createElement(Cursor, {
						key,
						activeCoordinate,
						activePayload,
						activeTooltipIndex,
						chartName,
						element,
						isActive,
						layout,
						offset,
						tooltipAxisBandSize,
						tooltipEventType
					});
				});
				_defineProperty(_this, "renderPolarAxis", function(element, displayName, index) {
					var axisType = get(element, "type.axisType");
					var axisMap = get(_this.state, "".concat(axisType, "Map"));
					var elementDefaultProps = element.type.defaultProps;
					var elementProps = elementDefaultProps !== void 0 ? _objectSpread(_objectSpread({}, elementDefaultProps), element.props) : element.props;
					var axisOption = axisMap && axisMap[elementProps["".concat(axisType, "Id")]];
					return /*#__PURE__*/ cloneElement(element, _objectSpread(_objectSpread({}, axisOption), {}, {
						className: clsx(axisType, axisOption.className),
						key: element.key || "".concat(displayName, "-").concat(index),
						ticks: getTicksOfAxis(axisOption, true)
					}));
				});
				_defineProperty(_this, "renderPolarGrid", function(element) {
					var _element$props = element.props, radialLines = _element$props.radialLines, polarAngles = _element$props.polarAngles, polarRadius = _element$props.polarRadius;
					var _this$state4 = _this.state, radiusAxisMap = _this$state4.radiusAxisMap, angleAxisMap = _this$state4.angleAxisMap;
					var radiusAxis = getAnyElementOfObject(radiusAxisMap);
					var angleAxis = getAnyElementOfObject(angleAxisMap);
					var cx = angleAxis.cx, cy = angleAxis.cy, innerRadius = angleAxis.innerRadius, outerRadius = angleAxis.outerRadius;
					return /*#__PURE__*/ cloneElement(element, {
						polarAngles: Array.isArray(polarAngles) ? polarAngles : getTicksOfAxis(angleAxis, true).map(function(entry) {
							return entry.coordinate;
						}),
						polarRadius: Array.isArray(polarRadius) ? polarRadius : getTicksOfAxis(radiusAxis, true).map(function(entry) {
							return entry.coordinate;
						}),
						cx,
						cy,
						innerRadius,
						outerRadius,
						key: element.key || "polar-grid",
						radialLines
					});
				});
				/**
				* Draw legend
				* @return {ReactElement}            The instance of Legend
				*/
				_defineProperty(_this, "renderLegend", function() {
					var formattedGraphicalItems = _this.state.formattedGraphicalItems;
					var _this$props2 = _this.props, children = _this$props2.children, width = _this$props2.width, height = _this$props2.height;
					var margin = _this.props.margin || {};
					var props = getLegendProps({
						children,
						formattedGraphicalItems,
						legendWidth: width - (margin.left || 0) - (margin.right || 0),
						legendContent
					});
					if (!props) return null;
					var item = props.item;
					return /*#__PURE__*/ cloneElement(item, _objectSpread(_objectSpread({}, _objectWithoutProperties(props, _excluded)), {}, {
						chartWidth: width,
						chartHeight: height,
						margin,
						onBBoxUpdate: _this.handleLegendBBoxUpdate
					}));
				});
				/**
				* Draw Tooltip
				* @return {ReactElement}  The instance of Tooltip
				*/
				_defineProperty(_this, "renderTooltip", function() {
					var _tooltipItem$props$ac;
					var _this$props3 = _this.props, children = _this$props3.children, accessibilityLayer = _this$props3.accessibilityLayer;
					var tooltipItem = findChildByType(children, Tooltip);
					if (!tooltipItem) return null;
					var _this$state5 = _this.state, isTooltipActive = _this$state5.isTooltipActive, activeCoordinate = _this$state5.activeCoordinate, activePayload = _this$state5.activePayload, activeLabel = _this$state5.activeLabel, offset = _this$state5.offset;
					var isActive = (_tooltipItem$props$ac = tooltipItem.props.active) !== null && _tooltipItem$props$ac !== void 0 ? _tooltipItem$props$ac : isTooltipActive;
					return /*#__PURE__*/ cloneElement(tooltipItem, {
						viewBox: _objectSpread(_objectSpread({}, offset), {}, {
							x: offset.left,
							y: offset.top
						}),
						active: isActive,
						label: activeLabel,
						payload: isActive ? activePayload : [],
						coordinate: activeCoordinate,
						accessibilityLayer
					});
				});
				_defineProperty(_this, "renderBrush", function(element) {
					var _this$props4 = _this.props, margin = _this$props4.margin, data = _this$props4.data;
					var _this$state6 = _this.state, offset = _this$state6.offset, dataStartIndex = _this$state6.dataStartIndex, dataEndIndex = _this$state6.dataEndIndex, updateId = _this$state6.updateId;
					return /*#__PURE__*/ cloneElement(element, {
						key: element.key || "_recharts-brush",
						onChange: combineEventHandlers(_this.handleBrushChange, element.props.onChange),
						data,
						x: isNumber(element.props.x) ? element.props.x : offset.left,
						y: isNumber(element.props.y) ? element.props.y : offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
						width: isNumber(element.props.width) ? element.props.width : offset.width,
						startIndex: dataStartIndex,
						endIndex: dataEndIndex,
						updateId: "brush-".concat(updateId)
					});
				});
				_defineProperty(_this, "renderReferenceElement", function(element, displayName, index) {
					if (!element) return null;
					var clipPathId = _this.clipPathId;
					var _this$state7 = _this.state, xAxisMap = _this$state7.xAxisMap, yAxisMap = _this$state7.yAxisMap, offset = _this$state7.offset;
					var elementDefaultProps = element.type.defaultProps || {};
					var _element$props2 = element.props, _element$props2$xAxis = _element$props2.xAxisId, xAxisId = _element$props2$xAxis === void 0 ? elementDefaultProps.xAxisId : _element$props2$xAxis, _element$props2$yAxis = _element$props2.yAxisId, yAxisId = _element$props2$yAxis === void 0 ? elementDefaultProps.yAxisId : _element$props2$yAxis;
					return /*#__PURE__*/ cloneElement(element, {
						key: element.key || "".concat(displayName, "-").concat(index),
						xAxis: xAxisMap[xAxisId],
						yAxis: yAxisMap[yAxisId],
						viewBox: {
							x: offset.left,
							y: offset.top,
							width: offset.width,
							height: offset.height
						},
						clipPathId
					});
				});
				_defineProperty(_this, "renderActivePoints", function(_ref10) {
					var item = _ref10.item, activePoint = _ref10.activePoint, basePoint = _ref10.basePoint, childIndex = _ref10.childIndex, isRange = _ref10.isRange;
					var result = [];
					var key = item.props.key;
					var itemItemProps = item.item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.item.type.defaultProps), item.item.props) : item.item.props;
					var activeDot = itemItemProps.activeDot, dataKey = itemItemProps.dataKey;
					var dotProps = _objectSpread(_objectSpread({
						index: childIndex,
						dataKey,
						cx: activePoint.x,
						cy: activePoint.y,
						r: 4,
						fill: getMainColorOfGraphicItem(item.item),
						strokeWidth: 2,
						stroke: "#fff",
						payload: activePoint.payload,
						value: activePoint.value
					}, filterProps(activeDot, false)), adaptEventHandlers(activeDot));
					result.push(CategoricalChartWrapper.renderActiveDot(activeDot, dotProps, "".concat(key, "-activePoint-").concat(childIndex)));
					if (basePoint) result.push(CategoricalChartWrapper.renderActiveDot(activeDot, _objectSpread(_objectSpread({}, dotProps), {}, {
						cx: basePoint.x,
						cy: basePoint.y
					}), "".concat(key, "-basePoint-").concat(childIndex)));
					else if (isRange) result.push(null);
					return result;
				});
				_defineProperty(_this, "renderGraphicChild", function(element, displayName, index) {
					var item = _this.filterFormatItem(element, displayName, index);
					if (!item) return null;
					var tooltipEventType = _this.getTooltipEventType();
					var _this$state8 = _this.state, isTooltipActive = _this$state8.isTooltipActive, tooltipAxis = _this$state8.tooltipAxis, activeTooltipIndex = _this$state8.activeTooltipIndex, activeLabel = _this$state8.activeLabel;
					var children = _this.props.children;
					var tooltipItem = findChildByType(children, Tooltip);
					var _item$props = item.props, points = _item$props.points, isRange = _item$props.isRange, baseLine = _item$props.baseLine;
					var itemItemProps = item.item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.item.type.defaultProps), item.item.props) : item.item.props;
					var activeDot = itemItemProps.activeDot, hide = itemItemProps.hide, activeBar = itemItemProps.activeBar, activeShape = itemItemProps.activeShape;
					var hasActive = Boolean(!hide && isTooltipActive && tooltipItem && (activeDot || activeBar || activeShape));
					var itemEvents = {};
					if (tooltipEventType !== "axis" && tooltipItem && tooltipItem.props.trigger === "click") itemEvents = { onClick: combineEventHandlers(_this.handleItemMouseEnter, element.props.onClick) };
					else if (tooltipEventType !== "axis") itemEvents = {
						onMouseLeave: combineEventHandlers(_this.handleItemMouseLeave, element.props.onMouseLeave),
						onMouseEnter: combineEventHandlers(_this.handleItemMouseEnter, element.props.onMouseEnter)
					};
					var graphicalItem = /*#__PURE__*/ cloneElement(element, _objectSpread(_objectSpread({}, item.props), itemEvents));
					function findWithPayload(entry) {
						return typeof tooltipAxis.dataKey === "function" ? tooltipAxis.dataKey(entry.payload) : null;
					}
					if (hasActive) if (activeTooltipIndex >= 0) {
						var activePoint, basePoint;
						if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
							var specifiedKey = typeof tooltipAxis.dataKey === "function" ? findWithPayload : "payload.".concat(tooltipAxis.dataKey.toString());
							activePoint = findEntryInArray(points, specifiedKey, activeLabel);
							basePoint = isRange && baseLine && findEntryInArray(baseLine, specifiedKey, activeLabel);
						} else {
							activePoint = points === null || points === void 0 ? void 0 : points[activeTooltipIndex];
							basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
						}
						if (activeShape || activeBar) {
							var activeIndex = element.props.activeIndex !== void 0 ? element.props.activeIndex : activeTooltipIndex;
							return [
								/*#__PURE__*/ cloneElement(element, _objectSpread(_objectSpread(_objectSpread({}, item.props), itemEvents), {}, { activeIndex })),
								null,
								null
							];
						}
						if (!isNil(activePoint)) return [graphicalItem].concat(_toConsumableArray(_this.renderActivePoints({
							item,
							activePoint,
							basePoint,
							childIndex: activeTooltipIndex,
							isRange
						})));
					} else {
						var _this$getItemByXY;
						/**
						* We hit this block if consumer uses a Tooltip without XAxis and/or YAxis.
						* In which case, this.state.activeTooltipIndex never gets set
						* because the mouse events that trigger that value getting set never get trigged without the axis components.
						*
						* An example usage case is a FunnelChart
						*/
						var _ref11$graphicalItem = ((_this$getItemByXY = _this.getItemByXY(_this.state.activeCoordinate)) !== null && _this$getItemByXY !== void 0 ? _this$getItemByXY : { graphicalItem }).graphicalItem, _ref11$graphicalItem$ = _ref11$graphicalItem.item, xyItem = _ref11$graphicalItem$ === void 0 ? element : _ref11$graphicalItem$, childIndex = _ref11$graphicalItem.childIndex;
						return [
							/*#__PURE__*/ cloneElement(xyItem, _objectSpread(_objectSpread(_objectSpread({}, item.props), itemEvents), {}, { activeIndex: childIndex })),
							null,
							null
						];
					}
					if (isRange) return [
						graphicalItem,
						null,
						null
					];
					return [graphicalItem, null];
				});
				_defineProperty(_this, "renderCustomized", function(element, displayName, index) {
					return /*#__PURE__*/ cloneElement(element, _objectSpread(_objectSpread({ key: "recharts-customized-".concat(index) }, _this.props), _this.state));
				});
				_defineProperty(_this, "renderMap", {
					CartesianGrid: {
						handler: renderAsIs,
						once: true
					},
					ReferenceArea: { handler: _this.renderReferenceElement },
					ReferenceLine: { handler: renderAsIs },
					ReferenceDot: { handler: _this.renderReferenceElement },
					XAxis: { handler: renderAsIs },
					YAxis: { handler: renderAsIs },
					Brush: {
						handler: _this.renderBrush,
						once: true
					},
					Bar: { handler: _this.renderGraphicChild },
					Line: { handler: _this.renderGraphicChild },
					Area: { handler: _this.renderGraphicChild },
					Radar: { handler: _this.renderGraphicChild },
					RadialBar: { handler: _this.renderGraphicChild },
					Scatter: { handler: _this.renderGraphicChild },
					Pie: { handler: _this.renderGraphicChild },
					Funnel: { handler: _this.renderGraphicChild },
					Tooltip: {
						handler: _this.renderCursor,
						once: true
					},
					PolarGrid: {
						handler: _this.renderPolarGrid,
						once: true
					},
					PolarAngleAxis: { handler: _this.renderPolarAxis },
					PolarRadiusAxis: { handler: _this.renderPolarAxis },
					Customized: { handler: _this.renderCustomized }
				});
				_this.clipPathId = "".concat((_props$id = _props.id) !== null && _props$id !== void 0 ? _props$id : uniqueId("recharts"), "-clip");
				_this.throttleTriggeredAfterMouseMove = throttle(_this.triggeredAfterMouseMove, (_props$throttleDelay = _props.throttleDelay) !== null && _props$throttleDelay !== void 0 ? _props$throttleDelay : 1e3 / 60);
				_this.state = {};
				return _this;
			}
			_inherits(CategoricalChartWrapper, _Component);
			return _createClass(CategoricalChartWrapper, [
				{
					key: "componentDidMount",
					value: function componentDidMount() {
						var _this$props$margin$le, _this$props$margin$to;
						this.addListener();
						this.accessibilityManager.setDetails({
							container: this.container,
							offset: {
								left: (_this$props$margin$le = this.props.margin.left) !== null && _this$props$margin$le !== void 0 ? _this$props$margin$le : 0,
								top: (_this$props$margin$to = this.props.margin.top) !== null && _this$props$margin$to !== void 0 ? _this$props$margin$to : 0
							},
							coordinateList: this.state.tooltipTicks,
							mouseHandlerCallback: this.triggeredAfterMouseMove,
							layout: this.props.layout
						});
						this.displayDefaultTooltip();
					}
				},
				{
					key: "displayDefaultTooltip",
					value: function displayDefaultTooltip() {
						var _this$props5 = this.props, children = _this$props5.children, data = _this$props5.data, height = _this$props5.height, layout = _this$props5.layout;
						var tooltipElem = findChildByType(children, Tooltip);
						if (!tooltipElem) return;
						var defaultIndex = tooltipElem.props.defaultIndex;
						if (typeof defaultIndex !== "number" || defaultIndex < 0 || defaultIndex > this.state.tooltipTicks.length - 1) return;
						var activeLabel = this.state.tooltipTicks[defaultIndex] && this.state.tooltipTicks[defaultIndex].value;
						var activePayload = getTooltipContent(this.state, data, defaultIndex, activeLabel);
						var independentAxisCoord = this.state.tooltipTicks[defaultIndex].coordinate;
						var dependentAxisCoord = (this.state.offset.top + height) / 2;
						var activeCoordinate = layout === "horizontal" ? {
							x: independentAxisCoord,
							y: dependentAxisCoord
						} : {
							y: independentAxisCoord,
							x: dependentAxisCoord
						};
						var scatterPlotElement = this.state.formattedGraphicalItems.find(function(_ref12) {
							return _ref12.item.type.name === "Scatter";
						});
						if (scatterPlotElement) {
							activeCoordinate = _objectSpread(_objectSpread({}, activeCoordinate), scatterPlotElement.props.points[defaultIndex].tooltipPosition);
							activePayload = scatterPlotElement.props.points[defaultIndex].tooltipPayload;
						}
						var nextState = {
							activeTooltipIndex: defaultIndex,
							isTooltipActive: true,
							activeLabel,
							activePayload,
							activeCoordinate
						};
						this.setState(nextState);
						this.renderCursor(tooltipElem);
						this.accessibilityManager.setIndex(defaultIndex);
					}
				},
				{
					key: "getSnapshotBeforeUpdate",
					value: function getSnapshotBeforeUpdate(prevProps, prevState) {
						if (!this.props.accessibilityLayer) return null;
						if (this.state.tooltipTicks !== prevState.tooltipTicks) this.accessibilityManager.setDetails({ coordinateList: this.state.tooltipTicks });
						if (this.props.layout !== prevProps.layout) this.accessibilityManager.setDetails({ layout: this.props.layout });
						if (this.props.margin !== prevProps.margin) {
							var _this$props$margin$le2, _this$props$margin$to2;
							this.accessibilityManager.setDetails({ offset: {
								left: (_this$props$margin$le2 = this.props.margin.left) !== null && _this$props$margin$le2 !== void 0 ? _this$props$margin$le2 : 0,
								top: (_this$props$margin$to2 = this.props.margin.top) !== null && _this$props$margin$to2 !== void 0 ? _this$props$margin$to2 : 0
							} });
						}
						return null;
					}
				},
				{
					key: "componentDidUpdate",
					value: function componentDidUpdate(prevProps) {
						if (!isChildrenEqual([findChildByType(prevProps.children, Tooltip)], [findChildByType(this.props.children, Tooltip)])) this.displayDefaultTooltip();
					}
				},
				{
					key: "componentWillUnmount",
					value: function componentWillUnmount() {
						this.removeListener();
						this.throttleTriggeredAfterMouseMove.cancel();
					}
				},
				{
					key: "getTooltipEventType",
					value: function getTooltipEventType() {
						var tooltipItem = findChildByType(this.props.children, Tooltip);
						if (tooltipItem && typeof tooltipItem.props.shared === "boolean") {
							var eventType = tooltipItem.props.shared ? "axis" : "item";
							return validateTooltipEventTypes.indexOf(eventType) >= 0 ? eventType : defaultTooltipEventType;
						}
						return defaultTooltipEventType;
					}
				},
				{
					key: "getMouseInfo",
					value: function getMouseInfo(event) {
						if (!this.container) return null;
						var element = this.container;
						var boundingRect = element.getBoundingClientRect();
						var containerOffset = getOffset(boundingRect);
						var e = {
							chartX: Math.round(event.pageX - containerOffset.left),
							chartY: Math.round(event.pageY - containerOffset.top)
						};
						var scale = boundingRect.width / element.offsetWidth || 1;
						var rangeObj = this.inRange(e.chartX, e.chartY, scale);
						if (!rangeObj) return null;
						var _this$state9 = this.state, xAxisMap = _this$state9.xAxisMap, yAxisMap = _this$state9.yAxisMap;
						var tooltipEventType = this.getTooltipEventType();
						var toolTipData = getTooltipData(this.state, this.props.data, this.props.layout, rangeObj);
						if (tooltipEventType !== "axis" && xAxisMap && yAxisMap) {
							var xScale = getAnyElementOfObject(xAxisMap).scale;
							var yScale = getAnyElementOfObject(yAxisMap).scale;
							var xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
							var yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;
							return _objectSpread(_objectSpread({}, e), {}, {
								xValue,
								yValue
							}, toolTipData);
						}
						if (toolTipData) return _objectSpread(_objectSpread({}, e), toolTipData);
						return null;
					}
				},
				{
					key: "inRange",
					value: function inRange(x, y) {
						var scale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
						var layout = this.props.layout;
						var scaledX = x / scale, scaledY = y / scale;
						if (layout === "horizontal" || layout === "vertical") {
							var offset = this.state.offset;
							return scaledX >= offset.left && scaledX <= offset.left + offset.width && scaledY >= offset.top && scaledY <= offset.top + offset.height ? {
								x: scaledX,
								y: scaledY
							} : null;
						}
						var _this$state10 = this.state, angleAxisMap = _this$state10.angleAxisMap, radiusAxisMap = _this$state10.radiusAxisMap;
						if (angleAxisMap && radiusAxisMap) {
							var angleAxis = getAnyElementOfObject(angleAxisMap);
							return inRangeOfSector({
								x: scaledX,
								y: scaledY
							}, angleAxis);
						}
						return null;
					}
				},
				{
					key: "parseEventsOfWrapper",
					value: function parseEventsOfWrapper() {
						var children = this.props.children;
						var tooltipEventType = this.getTooltipEventType();
						var tooltipItem = findChildByType(children, Tooltip);
						var tooltipEvents = {};
						if (tooltipItem && tooltipEventType === "axis") if (tooltipItem.props.trigger === "click") tooltipEvents = { onClick: this.handleClick };
						else tooltipEvents = {
							onMouseEnter: this.handleMouseEnter,
							onDoubleClick: this.handleDoubleClick,
							onMouseMove: this.handleMouseMove,
							onMouseLeave: this.handleMouseLeave,
							onTouchMove: this.handleTouchMove,
							onTouchStart: this.handleTouchStart,
							onTouchEnd: this.handleTouchEnd,
							onContextMenu: this.handleContextMenu
						};
						return _objectSpread(_objectSpread({}, adaptEventHandlers(this.props, this.handleOuterEvent)), tooltipEvents);
					}
				},
				{
					key: "addListener",
					value: function addListener() {
						eventCenter.on(SYNC_EVENT, this.handleReceiveSyncEvent);
					}
				},
				{
					key: "removeListener",
					value: function removeListener() {
						eventCenter.removeListener(SYNC_EVENT, this.handleReceiveSyncEvent);
					}
				},
				{
					key: "filterFormatItem",
					value: function filterFormatItem(item, displayName, childIndex) {
						var formattedGraphicalItems = this.state.formattedGraphicalItems;
						for (var i = 0, len = formattedGraphicalItems.length; i < len; i++) {
							var entry = formattedGraphicalItems[i];
							if (entry.item === item || entry.props.key === item.key || displayName === getDisplayName(entry.item.type) && childIndex === entry.childIndex) return entry;
						}
						return null;
					}
				},
				{
					key: "renderClipPath",
					value: function renderClipPath() {
						var clipPathId = this.clipPathId;
						var _this$state$offset = this.state.offset, left = _this$state$offset.left, top = _this$state$offset.top, height = _this$state$offset.height, width = _this$state$offset.width;
						return /*#__PURE__*/ React.createElement("defs", null, /*#__PURE__*/ React.createElement("clipPath", { id: clipPathId }, /*#__PURE__*/ React.createElement("rect", {
							x: left,
							y: top,
							height,
							width
						})));
					}
				},
				{
					key: "getXScales",
					value: function getXScales() {
						var xAxisMap = this.state.xAxisMap;
						return xAxisMap ? Object.entries(xAxisMap).reduce(function(res, _ref13) {
							var _ref14 = _slicedToArray(_ref13, 2), axisId = _ref14[0], axisProps = _ref14[1];
							return _objectSpread(_objectSpread({}, res), {}, _defineProperty({}, axisId, axisProps.scale));
						}, {}) : null;
					}
				},
				{
					key: "getYScales",
					value: function getYScales() {
						var yAxisMap = this.state.yAxisMap;
						return yAxisMap ? Object.entries(yAxisMap).reduce(function(res, _ref15) {
							var _ref16 = _slicedToArray(_ref15, 2), axisId = _ref16[0], axisProps = _ref16[1];
							return _objectSpread(_objectSpread({}, res), {}, _defineProperty({}, axisId, axisProps.scale));
						}, {}) : null;
					}
				},
				{
					key: "getXScaleByAxisId",
					value: function getXScaleByAxisId(axisId) {
						var _this$state$xAxisMap;
						return (_this$state$xAxisMap = this.state.xAxisMap) === null || _this$state$xAxisMap === void 0 || (_this$state$xAxisMap = _this$state$xAxisMap[axisId]) === null || _this$state$xAxisMap === void 0 ? void 0 : _this$state$xAxisMap.scale;
					}
				},
				{
					key: "getYScaleByAxisId",
					value: function getYScaleByAxisId(axisId) {
						var _this$state$yAxisMap;
						return (_this$state$yAxisMap = this.state.yAxisMap) === null || _this$state$yAxisMap === void 0 || (_this$state$yAxisMap = _this$state$yAxisMap[axisId]) === null || _this$state$yAxisMap === void 0 ? void 0 : _this$state$yAxisMap.scale;
					}
				},
				{
					key: "getItemByXY",
					value: function getItemByXY(chartXY) {
						var _this$state11 = this.state, formattedGraphicalItems = _this$state11.formattedGraphicalItems, activeItem = _this$state11.activeItem;
						if (formattedGraphicalItems && formattedGraphicalItems.length) for (var i = 0, len = formattedGraphicalItems.length; i < len; i++) {
							var graphicalItem = formattedGraphicalItems[i];
							var props = graphicalItem.props, item = graphicalItem.item;
							var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
							var itemDisplayName = getDisplayName(item.type);
							if (itemDisplayName === "Bar") {
								var activeBarItem = (props.data || []).find(function(entry) {
									return isInRectangle(chartXY, entry);
								});
								if (activeBarItem) return {
									graphicalItem,
									payload: activeBarItem
								};
							} else if (itemDisplayName === "RadialBar") {
								var _activeBarItem = (props.data || []).find(function(entry) {
									return inRangeOfSector(chartXY, entry);
								});
								if (_activeBarItem) return {
									graphicalItem,
									payload: _activeBarItem
								};
							} else if (isFunnel(graphicalItem, activeItem) || isPie(graphicalItem, activeItem) || isScatter(graphicalItem, activeItem)) {
								var activeIndex = getActiveShapeIndexForTooltip({
									graphicalItem,
									activeTooltipItem: activeItem,
									itemData: itemProps.data
								});
								var childIndex = itemProps.activeIndex === void 0 ? activeIndex : itemProps.activeIndex;
								return {
									graphicalItem: _objectSpread(_objectSpread({}, graphicalItem), {}, { childIndex }),
									payload: isScatter(graphicalItem, activeItem) ? itemProps.data[activeIndex] : graphicalItem.props.data[activeIndex]
								};
							}
						}
						return null;
					}
				},
				{
					key: "render",
					value: function render() {
						var _this3 = this;
						if (!validateWidthHeight(this)) return null;
						var _this$props6 = this.props, children = _this$props6.children, className = _this$props6.className, width = _this$props6.width, height = _this$props6.height, style = _this$props6.style, compact = _this$props6.compact, title = _this$props6.title, desc = _this$props6.desc;
						var attrs = filterProps(_objectWithoutProperties(_this$props6, _excluded2), false);
						if (compact) return /*#__PURE__*/ React.createElement(ChartLayoutContextProvider, {
							state: this.state,
							width: this.props.width,
							height: this.props.height,
							clipPathId: this.clipPathId
						}, /*#__PURE__*/ React.createElement(Surface, _extends({}, attrs, {
							width,
							height,
							title,
							desc
						}), this.renderClipPath(), renderByOrder(children, this.renderMap)));
						if (this.props.accessibilityLayer) {
							var _this$props$tabIndex, _this$props$role;
							attrs.tabIndex = (_this$props$tabIndex = this.props.tabIndex) !== null && _this$props$tabIndex !== void 0 ? _this$props$tabIndex : 0;
							attrs.role = (_this$props$role = this.props.role) !== null && _this$props$role !== void 0 ? _this$props$role : "application";
							attrs.onKeyDown = function(e) {
								_this3.accessibilityManager.keyboardEvent(e);
							};
							attrs.onFocus = function() {
								_this3.accessibilityManager.focus();
							};
						}
						var events = this.parseEventsOfWrapper();
						return /*#__PURE__*/ React.createElement(ChartLayoutContextProvider, {
							state: this.state,
							width: this.props.width,
							height: this.props.height,
							clipPathId: this.clipPathId
						}, /*#__PURE__*/ React.createElement("div", _extends({
							className: clsx("recharts-wrapper", className),
							style: _objectSpread({
								position: "relative",
								cursor: "default",
								width,
								height
							}, style)
						}, events, { ref: function ref(node) {
							_this3.container = node;
						} }), /*#__PURE__*/ React.createElement(Surface, _extends({}, attrs, {
							width,
							height,
							title,
							desc,
							style: FULL_WIDTH_AND_HEIGHT
						}), this.renderClipPath(), renderByOrder(children, this.renderMap)), this.renderLegend(), this.renderTooltip()));
					}
				}
			]);
		}(Component);
		_defineProperty(CategoricalChartWrapper, "displayName", chartName);
		_defineProperty(CategoricalChartWrapper, "defaultProps", _objectSpread({
			layout: "horizontal",
			stackOffset: "none",
			barCategoryGap: "10%",
			barGap: 4,
			margin: {
				top: 5,
				right: 5,
				bottom: 5,
				left: 5
			},
			reverseStackOrder: false,
			syncMethod: "index"
		}, defaultProps));
		_defineProperty(CategoricalChartWrapper, "getDerivedStateFromProps", function(nextProps, prevState) {
			var dataKey = nextProps.dataKey, data = nextProps.data, children = nextProps.children, width = nextProps.width, height = nextProps.height, layout = nextProps.layout, stackOffset = nextProps.stackOffset, margin = nextProps.margin;
			var dataStartIndex = prevState.dataStartIndex, dataEndIndex = prevState.dataEndIndex;
			if (prevState.updateId === void 0) {
				var defaultState = createDefaultState(nextProps);
				return _objectSpread(_objectSpread(_objectSpread({}, defaultState), {}, { updateId: 0 }, updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread(_objectSpread({ props: nextProps }, defaultState), {}, { updateId: 0 }), prevState)), {}, {
					prevDataKey: dataKey,
					prevData: data,
					prevWidth: width,
					prevHeight: height,
					prevLayout: layout,
					prevStackOffset: stackOffset,
					prevMargin: margin,
					prevChildren: children
				});
			}
			if (dataKey !== prevState.prevDataKey || data !== prevState.prevData || width !== prevState.prevWidth || height !== prevState.prevHeight || layout !== prevState.prevLayout || stackOffset !== prevState.prevStackOffset || !shallowEqual$1(margin, prevState.prevMargin)) {
				var _defaultState = createDefaultState(nextProps);
				var keepFromPrevState = {
					chartX: prevState.chartX,
					chartY: prevState.chartY,
					isTooltipActive: prevState.isTooltipActive
				};
				var updatesToState = _objectSpread(_objectSpread({}, getTooltipData(prevState, data, layout)), {}, { updateId: prevState.updateId + 1 });
				var newState = _objectSpread(_objectSpread(_objectSpread({}, _defaultState), keepFromPrevState), updatesToState);
				return _objectSpread(_objectSpread(_objectSpread({}, newState), updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread({ props: nextProps }, newState), prevState)), {}, {
					prevDataKey: dataKey,
					prevData: data,
					prevWidth: width,
					prevHeight: height,
					prevLayout: layout,
					prevStackOffset: stackOffset,
					prevMargin: margin,
					prevChildren: children
				});
			}
			if (!isChildrenEqual(children, prevState.prevChildren)) {
				var _brush$props$startInd, _brush$props, _brush$props$endIndex, _brush$props2;
				var brush = findChildByType(children, Brush);
				var startIndex = brush ? (_brush$props$startInd = (_brush$props = brush.props) === null || _brush$props === void 0 ? void 0 : _brush$props.startIndex) !== null && _brush$props$startInd !== void 0 ? _brush$props$startInd : dataStartIndex : dataStartIndex;
				var endIndex = brush ? (_brush$props$endIndex = (_brush$props2 = brush.props) === null || _brush$props2 === void 0 ? void 0 : _brush$props2.endIndex) !== null && _brush$props$endIndex !== void 0 ? _brush$props$endIndex : dataEndIndex : dataEndIndex;
				var hasDifferentStartOrEndIndex = startIndex !== dataStartIndex || endIndex !== dataEndIndex;
				var newUpdateId = !isNil(data) && !hasDifferentStartOrEndIndex ? prevState.updateId : prevState.updateId + 1;
				return _objectSpread(_objectSpread({ updateId: newUpdateId }, updateStateOfAxisMapsOffsetAndStackGroups(_objectSpread(_objectSpread({ props: nextProps }, prevState), {}, {
					updateId: newUpdateId,
					dataStartIndex: startIndex,
					dataEndIndex: endIndex
				}), prevState)), {}, {
					prevChildren: children,
					dataStartIndex: startIndex,
					dataEndIndex: endIndex
				});
			}
			return null;
		});
		_defineProperty(CategoricalChartWrapper, "renderActiveDot", function(option, props, key) {
			var dot;
			if (/*#__PURE__*/ isValidElement(option)) dot = /*#__PURE__*/ cloneElement(option, props);
			else if (isFunction(option)) dot = option(props);
			else dot = /*#__PURE__*/ React.createElement(Dot, props);
			return /*#__PURE__*/ React.createElement(Layer, {
				className: "recharts-active-dot",
				key
			}, dot);
		});
		var CategoricalChart = /*#__PURE__*/ forwardRef(function CategoricalChart(props, ref) {
			return /*#__PURE__*/ React.createElement(CategoricalChartWrapper, _extends({}, props, { ref }));
		});
		CategoricalChart.displayName = CategoricalChartWrapper.displayName;
		return CategoricalChart;
	};
}));
//#endregion
//#region node_modules/recharts/es6/chart/BarChart.js
var BarChart;
var init_BarChart = __esmMin((() => {
	init_generateCategoricalChart();
	init_Bar();
	init_XAxis();
	init_YAxis();
	init_CartesianUtils();
	BarChart = generateCategoricalChart({
		chartName: "BarChart",
		GraphicalChild: Bar,
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: ["axis", "item"],
		axisComponents: [{
			axisType: "xAxis",
			AxisComp: XAxis
		}, {
			axisType: "yAxis",
			AxisComp: YAxis
		}],
		formatAxisMap
	});
}));
//#endregion
//#region node_modules/recharts/es6/index.js
var init_es6 = __esmMin((() => {
	init_Surface();
	init_Layer();
	init_Legend();
	init_DefaultLegendContent();
	init_Tooltip();
	init_DefaultTooltipContent();
	init_ResponsiveContainer();
	init_Cell();
	init_Text();
	init_Label();
	init_LabelList();
	init_isFunction();
	init_LogUtils();
	init_Sector();
	init_Curve();
	init_Rectangle();
	init_clsx();
	init_ReactUtils();
	init_Dot();
	init_Cross();
	init_Symbols();
	init_PolarUtils();
	init__baseExtremum();
	init__baseGt();
	init__baseIteratee();
	init__baseLt();
	init_types();
	init_es6$1();
	init_get();
	init_isEqual();
	init_isNil();
	init_Global();
	init_DataUtils();
	init_ChartUtils();
	init_ActiveShapeUtils();
	init_last();
	init_Brush();
	init_ReferenceLine();
	init_ReferenceDot();
	init_ReferenceArea();
	init_CartesianAxis();
	init_getTicks();
	init_chartLayoutContext();
	init_ErrorBar();
	init_max();
	init_isNaN();
	init_Bar();
	init_XAxis();
	init_YAxis();
	init_generateCategoricalChart();
	init_CartesianUtils();
	init_BarChart();
	init__arrayMap();
	init__Stack();
	init__baseAssignValue();
	init_eq();
	init_keys();
	init__arrayLikeKeys();
	init_isObject();
	init__isPrototype();
	init_isArrayLike();
	init__root();
	init__getSymbols();
	init__arrayPush();
	init__getPrototype();
	init_stubArray();
	init__getAllKeys();
	init__baseGetAllKeys();
	init__getTag();
	init__Uint8Array();
	init__Symbol();
	init_isArray();
	init_isBuffer();
	init_isObjectLike();
	init__baseUnary();
	init__nodeUtil();
	init__castPath();
	init__baseGet();
	init__baseSlice();
	init__toKey();
	init_isPlainObject();
	init__baseFlatten();
	init__overRest();
	init__setToString();
	init_DOMUtils();
	init_min();
	init_d3_scale();
	init_isNumber();
	init_isString();
	init_Trapezoid();
}));
//#endregion
export { init_ResponsiveContainer as _, init_YAxis as a, Legend as b, ReferenceLine as c, init_Bar as d, LabelList as f, ResponsiveContainer as g, init_Text as h, YAxis as i, init_ReferenceLine as l, Text as m, BarChart as n, XAxis as o, init_LabelList as p, init_BarChart as r, init_XAxis as s, init_es6 as t, Bar as u, Tooltip as v, init_Legend as x, init_Tooltip as y };
