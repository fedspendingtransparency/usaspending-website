import { i as __require, n as __esmMin, o as __toESM, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $ as init_Header, Ga as useLocation, Q as Header, Va as init_development, dr as Analytics, eo as global, fn as init_modalActions, fr as init_Analytics, go as require_jsx_runtime, io as useSelector, no as init_es, oo as useDispatch, pn as showModal, so as connect_default, to as init_dist } from "./index.js-Dk2VDaPz.js";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
//#region src/js/redux/actions/googleAnalytics/googleAnalytics.js
var setInitialAppLoadForDAP;
var init_googleAnalytics = __esmMin((() => {
	setInitialAppLoadForDAP = () => ({ type: "SET_IS_INITIAL_APPLICATION_LOAD_FOR_DAP_GOOGLE_ANALYTICS_TO_FALSE" });
}));
//#endregion
//#region node_modules/react-side-effect/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _interopDefault(ex) {
		return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
	}
	var React$1 = __require("react");
	var React__default = _interopDefault(React$1);
	function _defineProperty(obj, key, value) {
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		subClass.__proto__ = superClass;
	}
	var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
	function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
		if (typeof reducePropsToState !== "function") throw new Error("Expected reducePropsToState to be a function.");
		if (typeof handleStateChangeOnClient !== "function") throw new Error("Expected handleStateChangeOnClient to be a function.");
		if (typeof mapStateOnServer !== "undefined" && typeof mapStateOnServer !== "function") throw new Error("Expected mapStateOnServer to either be undefined or a function.");
		function getDisplayName(WrappedComponent) {
			return WrappedComponent.displayName || WrappedComponent.name || "Component";
		}
		return function wrap(WrappedComponent) {
			if (typeof WrappedComponent !== "function") throw new Error("Expected WrappedComponent to be a React component.");
			var mountedInstances = [];
			var state;
			function emitChange() {
				state = reducePropsToState(mountedInstances.map(function(instance) {
					return instance.props;
				}));
				if (SideEffect.canUseDOM) handleStateChangeOnClient(state);
				else if (mapStateOnServer) state = mapStateOnServer(state);
			}
			var SideEffect = /*#__PURE__*/ function(_PureComponent) {
				_inheritsLoose(SideEffect, _PureComponent);
				function SideEffect() {
					return _PureComponent.apply(this, arguments) || this;
				}
				SideEffect.peek = function peek() {
					return state;
				};
				SideEffect.rewind = function rewind() {
					if (SideEffect.canUseDOM) throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
					var recordedState = state;
					state = void 0;
					mountedInstances = [];
					return recordedState;
				};
				var _proto = SideEffect.prototype;
				_proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
					mountedInstances.push(this);
					emitChange();
				};
				_proto.componentDidUpdate = function componentDidUpdate() {
					emitChange();
				};
				_proto.componentWillUnmount = function componentWillUnmount() {
					var index = mountedInstances.indexOf(this);
					mountedInstances.splice(index, 1);
					emitChange();
				};
				_proto.render = function render() {
					return React__default.createElement(WrappedComponent, this.props);
				};
				return SideEffect;
			}(React$1.PureComponent);
			_defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
			_defineProperty(SideEffect, "canUseDOM", canUseDOM);
			return SideEffect;
		};
	}
	module.exports = withSideEffect;
}));
//#endregion
//#region node_modules/react-fast-compare/index.js
var require_react_fast_compare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasElementType = typeof Element !== "undefined";
	var hasMap = typeof Map === "function";
	var hasSet = typeof Set === "function";
	var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
	function equal(a, b) {
		if (a === b) return true;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return false;
			var length, i, keys;
			if (Array.isArray(a)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
				return true;
			}
			var it;
			if (hasMap && a instanceof Map && b instanceof Map) {
				if (a.size !== b.size) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false;
				return true;
			}
			if (hasSet && a instanceof Set && b instanceof Set) {
				if (a.size !== b.size) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
				return true;
			}
			if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
				return true;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function") return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function") return a.toString() === b.toString();
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
			if (hasElementType && a instanceof Element) return false;
			for (i = length; i-- !== 0;) {
				if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) continue;
				if (!equal(a[keys[i]], b[keys[i]])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	}
	module.exports = function isEqual(a, b) {
		try {
			return equal(a, b);
		} catch (error) {
			if ((error.message || "").match(/stack|recursion/i)) {
				console.warn("react-fast-compare cannot handle circular refs");
				return false;
			}
			throw error;
		}
	};
}));
//#endregion
//#region node_modules/object-assign/index.js
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var require_object_assign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	function toObject(val) {
		if (val === null || val === void 0) throw new TypeError("Object.assign cannot be called with null or undefined");
		return Object(val);
	}
	function shouldUseNative() {
		try {
			if (!Object.assign) return false;
			var test1 = /* @__PURE__ */ new String("abc");
			test1[5] = "de";
			if (Object.getOwnPropertyNames(test1)[0] === "5") return false;
			var test2 = {};
			for (var i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
			if (Object.getOwnPropertyNames(test2).map(function(n) {
				return test2[n];
			}).join("") !== "0123456789") return false;
			var test3 = {};
			"abcdefghijklmnopqrst".split("").forEach(function(letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") return false;
			return true;
		} catch (err) {
			return false;
		}
	}
	module.exports = shouldUseNative() ? Object.assign : function(target, source) {
		var from;
		var to = toObject(target);
		var symbols;
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
			for (var key in from) if (hasOwnProperty.call(from, key)) to[key] = from[key];
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
			}
		}
		return to;
	};
}));
//#endregion
//#region node_modules/react-helmet/es/Helmet.js
var import_lib, import_react_fast_compare, import_object_assign, ATTRIBUTE_NAMES, TAG_NAMES, TAG_PROPERTIES, REACT_TAG_MAP, HELMET_PROPS, HTML_TAG_MAP, SELF_CLOSING_TAGS, HELMET_ATTRIBUTE, _typeof, classCallCheck, createClass, _extends, inherits, objectWithoutProperties, possibleConstructorReturn, encodeSpecialCharacters, getTitleFromPropsList, getOnChangeClientState, getAttributesFromPropsList, getBaseTagFromPropsList, getTagsFromPropsList, getInnermostProperty, reducePropsToState, rafPolyfill, cafPolyfill, requestAnimationFrame, cancelAnimationFrame, warn, _helmetCallback, handleClientStateChange, commitTagChanges, flattenArray, updateTitle, updateAttributes, updateTags, generateElementAttributesAsString, generateTitleAsString, generateTagsAsString, convertElementAttributestoReactProps, convertReactPropstoHtmlAttributes, generateTitleAsReactComponent, generateTagsAsReactComponent, getMethodsForTag, mapStateOnServer, HelmetExport;
var init_Helmet = __esmMin((() => {
	init_dist();
	import_lib = /* @__PURE__ */ __toESM(require_lib());
	import_react_fast_compare = /* @__PURE__ */ __toESM(require_react_fast_compare());
	import_object_assign = /* @__PURE__ */ __toESM(require_object_assign());
	ATTRIBUTE_NAMES = {
		BODY: "bodyAttributes",
		HTML: "htmlAttributes",
		TITLE: "titleAttributes"
	};
	TAG_NAMES = {
		BASE: "base",
		BODY: "body",
		HEAD: "head",
		HTML: "html",
		LINK: "link",
		META: "meta",
		NOSCRIPT: "noscript",
		SCRIPT: "script",
		STYLE: "style",
		TITLE: "title"
	};
	Object.keys(TAG_NAMES).map(function(name) {
		return TAG_NAMES[name];
	});
	TAG_PROPERTIES = {
		CHARSET: "charset",
		CSS_TEXT: "cssText",
		HREF: "href",
		HTTPEQUIV: "http-equiv",
		INNER_HTML: "innerHTML",
		ITEM_PROP: "itemprop",
		NAME: "name",
		PROPERTY: "property",
		REL: "rel",
		SRC: "src",
		TARGET: "target"
	};
	REACT_TAG_MAP = {
		accesskey: "accessKey",
		charset: "charSet",
		class: "className",
		contenteditable: "contentEditable",
		contextmenu: "contextMenu",
		"http-equiv": "httpEquiv",
		itemprop: "itemProp",
		tabindex: "tabIndex"
	};
	HELMET_PROPS = {
		DEFAULT_TITLE: "defaultTitle",
		DEFER: "defer",
		ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
		ON_CHANGE_CLIENT_STATE: "onChangeClientState",
		TITLE_TEMPLATE: "titleTemplate"
	};
	HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function(obj, key) {
		obj[REACT_TAG_MAP[key]] = key;
		return obj;
	}, {});
	SELF_CLOSING_TAGS = [
		TAG_NAMES.NOSCRIPT,
		TAG_NAMES.SCRIPT,
		TAG_NAMES.STYLE
	];
	HELMET_ATTRIBUTE = "data-react-helmet";
	_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
		return typeof obj;
	} : function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	classCallCheck = function(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	};
	createClass = function() {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}
		return function(Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();
	_extends = Object.assign || function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	inherits = function(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		} });
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	objectWithoutProperties = function(obj, keys) {
		var target = {};
		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}
		return target;
	};
	possibleConstructorReturn = function(self, call) {
		if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};
	encodeSpecialCharacters = function encodeSpecialCharacters(str) {
		if ((arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true) === false) return String(str);
		return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	};
	getTitleFromPropsList = function getTitleFromPropsList(propsList) {
		var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
		var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
		if (innermostTemplate && innermostTitle) return innermostTemplate.replace(/%s/g, function() {
			return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
		});
		var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
		return innermostTitle || innermostDefaultTitle || void 0;
	};
	getOnChangeClientState = function getOnChangeClientState(propsList) {
		return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {};
	};
	getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
		return propsList.filter(function(props) {
			return typeof props[tagType] !== "undefined";
		}).map(function(props) {
			return props[tagType];
		}).reduce(function(tagAttrs, current) {
			return _extends({}, tagAttrs, current);
		}, {});
	};
	getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
		return propsList.filter(function(props) {
			return typeof props[TAG_NAMES.BASE] !== "undefined";
		}).map(function(props) {
			return props[TAG_NAMES.BASE];
		}).reverse().reduce(function(innermostBaseTag, tag) {
			if (!innermostBaseTag.length) {
				var keys = Object.keys(tag);
				for (var i = 0; i < keys.length; i++) {
					var lowerCaseAttributeKey = keys[i].toLowerCase();
					if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) return innermostBaseTag.concat(tag);
				}
			}
			return innermostBaseTag;
		}, []);
	};
	getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
		var approvedSeenTags = {};
		return propsList.filter(function(props) {
			if (Array.isArray(props[tagName])) return true;
			if (typeof props[tagName] !== "undefined") warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
			return false;
		}).map(function(props) {
			return props[tagName];
		}).reverse().reduce(function(approvedTags, instanceTags) {
			var instanceSeenTags = {};
			instanceTags.filter(function(tag) {
				var primaryAttributeKey = void 0;
				var keys = Object.keys(tag);
				for (var i = 0; i < keys.length; i++) {
					var attributeKey = keys[i];
					var lowerCaseAttributeKey = attributeKey.toLowerCase();
					if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) primaryAttributeKey = lowerCaseAttributeKey;
					if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) primaryAttributeKey = attributeKey;
				}
				if (!primaryAttributeKey || !tag[primaryAttributeKey]) return false;
				var value = tag[primaryAttributeKey].toLowerCase();
				if (!approvedSeenTags[primaryAttributeKey]) approvedSeenTags[primaryAttributeKey] = {};
				if (!instanceSeenTags[primaryAttributeKey]) instanceSeenTags[primaryAttributeKey] = {};
				if (!approvedSeenTags[primaryAttributeKey][value]) {
					instanceSeenTags[primaryAttributeKey][value] = true;
					return true;
				}
				return false;
			}).reverse().forEach(function(tag) {
				return approvedTags.push(tag);
			});
			var keys = Object.keys(instanceSeenTags);
			for (var i = 0; i < keys.length; i++) {
				var attributeKey = keys[i];
				approvedSeenTags[attributeKey] = (0, import_object_assign.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
			}
			return approvedTags;
		}, []).reverse();
	};
	getInnermostProperty = function getInnermostProperty(propsList, property) {
		for (var i = propsList.length - 1; i >= 0; i--) {
			var props = propsList[i];
			if (props.hasOwnProperty(property)) return props[property];
		}
		return null;
	};
	reducePropsToState = function reducePropsToState(propsList) {
		return {
			baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
			bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
			defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
			encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
			htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
			linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
			metaTags: getTagsFromPropsList(TAG_NAMES.META, [
				TAG_PROPERTIES.NAME,
				TAG_PROPERTIES.CHARSET,
				TAG_PROPERTIES.HTTPEQUIV,
				TAG_PROPERTIES.PROPERTY,
				TAG_PROPERTIES.ITEM_PROP
			], propsList),
			noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
			onChangeClientState: getOnChangeClientState(propsList),
			scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
			styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
			title: getTitleFromPropsList(propsList),
			titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
		};
	};
	rafPolyfill = function() {
		var clock = Date.now();
		return function(callback) {
			var currentTime = Date.now();
			if (currentTime - clock > 16) {
				clock = currentTime;
				callback(currentTime);
			} else setTimeout(function() {
				rafPolyfill(callback);
			}, 0);
		};
	}();
	cafPolyfill = function cafPolyfill(id) {
		return clearTimeout(id);
	};
	requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
	cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;
	warn = function warn(msg) {
		return console && typeof console.warn === "function" && console.warn(msg);
	};
	_helmetCallback = null;
	handleClientStateChange = function handleClientStateChange(newState) {
		if (_helmetCallback) cancelAnimationFrame(_helmetCallback);
		if (newState.defer) _helmetCallback = requestAnimationFrame(function() {
			commitTagChanges(newState, function() {
				_helmetCallback = null;
			});
		});
		else {
			commitTagChanges(newState);
			_helmetCallback = null;
		}
	};
	commitTagChanges = function commitTagChanges(newState, cb) {
		var baseTag = newState.baseTag, bodyAttributes = newState.bodyAttributes, htmlAttributes = newState.htmlAttributes, linkTags = newState.linkTags, metaTags = newState.metaTags, noscriptTags = newState.noscriptTags, onChangeClientState = newState.onChangeClientState, scriptTags = newState.scriptTags, styleTags = newState.styleTags, title = newState.title, titleAttributes = newState.titleAttributes;
		updateAttributes(TAG_NAMES.BODY, bodyAttributes);
		updateAttributes(TAG_NAMES.HTML, htmlAttributes);
		updateTitle(title, titleAttributes);
		var tagUpdates = {
			baseTag: updateTags(TAG_NAMES.BASE, baseTag),
			linkTags: updateTags(TAG_NAMES.LINK, linkTags),
			metaTags: updateTags(TAG_NAMES.META, metaTags),
			noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
			scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
			styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
		};
		var addedTags = {};
		var removedTags = {};
		Object.keys(tagUpdates).forEach(function(tagType) {
			var _tagUpdates$tagType = tagUpdates[tagType], newTags = _tagUpdates$tagType.newTags, oldTags = _tagUpdates$tagType.oldTags;
			if (newTags.length) addedTags[tagType] = newTags;
			if (oldTags.length) removedTags[tagType] = tagUpdates[tagType].oldTags;
		});
		cb && cb();
		onChangeClientState(newState, addedTags, removedTags);
	};
	flattenArray = function flattenArray(possibleArray) {
		return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
	};
	updateTitle = function updateTitle(title, attributes) {
		if (typeof title !== "undefined" && document.title !== title) document.title = flattenArray(title);
		updateAttributes(TAG_NAMES.TITLE, attributes);
	};
	updateAttributes = function updateAttributes(tagName, attributes) {
		var elementTag = document.getElementsByTagName(tagName)[0];
		if (!elementTag) return;
		var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
		var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
		var attributesToRemove = [].concat(helmetAttributes);
		var attributeKeys = Object.keys(attributes);
		for (var i = 0; i < attributeKeys.length; i++) {
			var attribute = attributeKeys[i];
			var value = attributes[attribute] || "";
			if (elementTag.getAttribute(attribute) !== value) elementTag.setAttribute(attribute, value);
			if (helmetAttributes.indexOf(attribute) === -1) helmetAttributes.push(attribute);
			var indexToSave = attributesToRemove.indexOf(attribute);
			if (indexToSave !== -1) attributesToRemove.splice(indexToSave, 1);
		}
		for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) elementTag.removeAttribute(attributesToRemove[_i]);
		if (helmetAttributes.length === attributesToRemove.length) elementTag.removeAttribute(HELMET_ATTRIBUTE);
		else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
	};
	updateTags = function updateTags(type, tags) {
		var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
		var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
		var oldTags = Array.prototype.slice.call(tagNodes);
		var newTags = [];
		var indexToDelete = void 0;
		if (tags && tags.length) tags.forEach(function(tag) {
			var newElement = document.createElement(type);
			for (var attribute in tag) if (tag.hasOwnProperty(attribute)) if (attribute === TAG_PROPERTIES.INNER_HTML) newElement.innerHTML = tag.innerHTML;
			else if (attribute === TAG_PROPERTIES.CSS_TEXT) if (newElement.styleSheet) newElement.styleSheet.cssText = tag.cssText;
			else newElement.appendChild(document.createTextNode(tag.cssText));
			else {
				var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
				newElement.setAttribute(attribute, value);
			}
			newElement.setAttribute(HELMET_ATTRIBUTE, "true");
			if (oldTags.some(function(existingTag, index) {
				indexToDelete = index;
				return newElement.isEqualNode(existingTag);
			})) oldTags.splice(indexToDelete, 1);
			else newTags.push(newElement);
		});
		oldTags.forEach(function(tag) {
			return tag.parentNode.removeChild(tag);
		});
		newTags.forEach(function(tag) {
			return headElement.appendChild(tag);
		});
		return {
			oldTags,
			newTags
		};
	};
	generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
		return Object.keys(attributes).reduce(function(str, key) {
			var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
			return str ? str + " " + attr : attr;
		}, "");
	};
	generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
		var attributeString = generateElementAttributesAsString(attributes);
		var flattenedTitle = flattenArray(title);
		return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
	};
	generateTagsAsString = function generateTagsAsString(type, tags, encode) {
		return tags.reduce(function(str, tag) {
			var attributeHtml = Object.keys(tag).filter(function(attribute) {
				return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
			}).reduce(function(string, attribute) {
				var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
				return string ? string + " " + attr : attr;
			}, "");
			var tagContent = tag.innerHTML || tag.cssText || "";
			var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
			return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
		}, "");
	};
	convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
		var initProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		return Object.keys(attributes).reduce(function(obj, key) {
			obj[REACT_TAG_MAP[key] || key] = attributes[key];
			return obj;
		}, initProps);
	};
	convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
		var initAttributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		return Object.keys(props).reduce(function(obj, key) {
			obj[HTML_TAG_MAP[key] || key] = props[key];
			return obj;
		}, initAttributes);
	};
	generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
		var _initProps;
		var props = convertElementAttributestoReactProps(attributes, (_initProps = { key: title }, _initProps[HELMET_ATTRIBUTE] = true, _initProps));
		return [React.createElement(TAG_NAMES.TITLE, props, title)];
	};
	generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
		return tags.map(function(tag, i) {
			var _mappedTag;
			var mappedTag = (_mappedTag = { key: i }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
			Object.keys(tag).forEach(function(attribute) {
				var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;
				if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) mappedTag.dangerouslySetInnerHTML = { __html: tag.innerHTML || tag.cssText };
				else mappedTag[mappedAttribute] = tag[attribute];
			});
			return React.createElement(type, mappedTag);
		});
	};
	getMethodsForTag = function getMethodsForTag(type, tags, encode) {
		switch (type) {
			case TAG_NAMES.TITLE: return {
				toComponent: function toComponent() {
					return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
				},
				toString: function toString() {
					return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
				}
			};
			case ATTRIBUTE_NAMES.BODY:
			case ATTRIBUTE_NAMES.HTML: return {
				toComponent: function toComponent() {
					return convertElementAttributestoReactProps(tags);
				},
				toString: function toString() {
					return generateElementAttributesAsString(tags);
				}
			};
			default: return {
				toComponent: function toComponent() {
					return generateTagsAsReactComponent(type, tags);
				},
				toString: function toString() {
					return generateTagsAsString(type, tags, encode);
				}
			};
		}
	};
	mapStateOnServer = function mapStateOnServer(_ref) {
		var baseTag = _ref.baseTag, bodyAttributes = _ref.bodyAttributes, encode = _ref.encode, htmlAttributes = _ref.htmlAttributes, linkTags = _ref.linkTags, metaTags = _ref.metaTags, noscriptTags = _ref.noscriptTags, scriptTags = _ref.scriptTags, styleTags = _ref.styleTags, _ref$title = _ref.title, title = _ref$title === void 0 ? "" : _ref$title, titleAttributes = _ref.titleAttributes;
		return {
			base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
			bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
			htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
			link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
			meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
			noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
			script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
			style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
			title: getMethodsForTag(TAG_NAMES.TITLE, {
				title,
				titleAttributes
			}, encode)
		};
	};
	HelmetExport = function Helmet(Component) {
		var _class, _temp;
		return _temp = _class = function(_React$Component) {
			inherits(HelmetWrapper, _React$Component);
			function HelmetWrapper() {
				classCallCheck(this, HelmetWrapper);
				return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
			}
			HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
				return !(0, import_react_fast_compare.default)(this.props, nextProps);
			};
			HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
				if (!nestedChildren) return null;
				switch (child.type) {
					case TAG_NAMES.SCRIPT:
					case TAG_NAMES.NOSCRIPT: return { innerHTML: nestedChildren };
					case TAG_NAMES.STYLE: return { cssText: nestedChildren };
				}
				throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
			};
			HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
				var _babelHelpers$extends;
				var child = _ref.child, arrayTypeChildren = _ref.arrayTypeChildren, newChildProps = _ref.newChildProps, nestedChildren = _ref.nestedChildren;
				return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
			};
			HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
				var _babelHelpers$extends2, _babelHelpers$extends3;
				var child = _ref2.child, newProps = _ref2.newProps, newChildProps = _ref2.newChildProps, nestedChildren = _ref2.nestedChildren;
				switch (child.type) {
					case TAG_NAMES.TITLE: return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));
					case TAG_NAMES.BODY: return _extends({}, newProps, { bodyAttributes: _extends({}, newChildProps) });
					case TAG_NAMES.HTML: return _extends({}, newProps, { htmlAttributes: _extends({}, newChildProps) });
				}
				return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
			};
			HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
				var newFlattenedProps = _extends({}, newProps);
				Object.keys(arrayTypeChildren).forEach(function(arrayChildName) {
					var _babelHelpers$extends4;
					newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
				});
				return newFlattenedProps;
			};
			HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
				return true;
			};
			HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
				var _this2 = this;
				var arrayTypeChildren = {};
				React.Children.forEach(children, function(child) {
					if (!child || !child.props) return;
					var _child$props = child.props, nestedChildren = _child$props.children;
					var newChildProps = convertReactPropstoHtmlAttributes(objectWithoutProperties(_child$props, ["children"]));
					_this2.warnOnInvalidChildren(child, nestedChildren);
					switch (child.type) {
						case TAG_NAMES.LINK:
						case TAG_NAMES.META:
						case TAG_NAMES.NOSCRIPT:
						case TAG_NAMES.SCRIPT:
						case TAG_NAMES.STYLE:
							arrayTypeChildren = _this2.flattenArrayTypeChildren({
								child,
								arrayTypeChildren,
								newChildProps,
								nestedChildren
							});
							break;
						default:
							newProps = _this2.mapObjectTypeChildren({
								child,
								newProps,
								newChildProps,
								nestedChildren
							});
							break;
					}
				});
				newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
				return newProps;
			};
			HelmetWrapper.prototype.render = function render() {
				var _props = this.props, children = _props.children;
				var newProps = _extends({}, objectWithoutProperties(_props, ["children"]));
				if (children) newProps = this.mapChildrenToProps(children, newProps);
				return React.createElement(Component, newProps);
			};
			createClass(HelmetWrapper, null, [{
				key: "canUseDOM",
				/**
				* @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
				* @param {Object} bodyAttributes: {"className": "root"}
				* @param {String} defaultTitle: "Default Title"
				* @param {Boolean} defer: true
				* @param {Boolean} encodeSpecialCharacters: true
				* @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
				* @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
				* @param {Array} meta: [{"name": "description", "content": "Test description"}]
				* @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
				* @param {Function} onChangeClientState: "(newState) => console.log(newState)"
				* @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
				* @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
				* @param {String} title: "Title"
				* @param {Object} titleAttributes: {"itemprop": "name"}
				* @param {String} titleTemplate: "MySite.com - %s"
				*/
				set: function set$$1(canUseDOM) {
					Component.canUseDOM = canUseDOM;
				}
			}]);
			return HelmetWrapper;
		}(React.Component), _class.propTypes = {
			base: PropTypes.object,
			bodyAttributes: PropTypes.object,
			children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
			defaultTitle: PropTypes.string,
			defer: PropTypes.bool,
			encodeSpecialCharacters: PropTypes.bool,
			htmlAttributes: PropTypes.object,
			link: PropTypes.arrayOf(PropTypes.object),
			meta: PropTypes.arrayOf(PropTypes.object),
			noscript: PropTypes.arrayOf(PropTypes.object),
			onChangeClientState: PropTypes.func,
			script: PropTypes.arrayOf(PropTypes.object),
			style: PropTypes.arrayOf(PropTypes.object),
			title: PropTypes.string,
			titleAttributes: PropTypes.object,
			titleTemplate: PropTypes.string
		}, _class.defaultProps = {
			defer: true,
			encodeSpecialCharacters: true
		}, _class.peek = Component.peek, _class.rewind = function() {
			var mappedState = Component.rewind();
			if (!mappedState) mappedState = mapStateOnServer({
				baseTag: [],
				bodyAttributes: {},
				encodeSpecialCharacters: true,
				htmlAttributes: {},
				linkTags: [],
				metaTags: [],
				noscriptTags: [],
				scriptTags: [],
				styleTags: [],
				title: "",
				titleAttributes: {}
			});
			return mappedState;
		}, _temp;
	}((0, import_lib.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(function NullComponent() {
		return null;
	}));
	HelmetExport.renderStatic = HelmetExport.rewind;
})), productionURL, imgDirectory, siteName, facebookImage, equityPageMetaTags, homePageMetaTags, getSearchPageMetaTags, explorerPageMetaTags, aboutPageMetaTags, accessibilityPageMetaTags, privacyPageMetaTags, foiaPageMetaTags, dbInfoPageMetaTags, awardPageMetaTags, federalAccountPageMetaTags, agencyPageMetaTags, agencyLandingPageMetaTags, covidPageMetaTags, topPageMetaTags, downloadArchivePageMetaTags, downloadAwardPageMetaTags, downloadAccountPageMetaTags, dataDictionaryPageMetaTags, interactiveDataSourcesPageMetaTags, metadataDownloadPageMetaTags, keywordPageMetaTags, statePageMetaTags, errorPageMetaTags, recipientLandingPageMetaTags, accountLandingPageMetaTags, recipientPageMetaTags, stateLandingPageMetaTags, agencySubmissionDataSourcesMetaTags, covidDataSourcesMetaTags, analystGuideMetaTags, isCustomPageTitleDefined, canonicalUrl, trailingSlashRegExp, getCanonicalUrl;
var init_metaTagHelper = __esmMin((() => {
	productionURL = "https://usaspending.gov/";
	imgDirectory = "img/";
	siteName = "USAspending.gov";
	facebookImage = "FacebookOG.png";
	equityPageMetaTags = {
		og_url: `${productionURL}data-dives/equity-COVID-19-spending`,
		og_title: "Equity in COVID-19 Spending | USAspending",
		og_description: "The Department of the Treasury worked with the U.S. Census Bureau and external tech teams from across the country to develop interactive tools for understanding how the federal government distributed COVID-19 relief funds across some of the communities most vulnerable to the impacts of the pandemic.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	homePageMetaTags = {
		og_url: productionURL,
		og_title: "Government Spending Open Data | USAspending",
		og_description: "USAspending is the official open data source of federal spending information. We track how federal money is spent in communities across America and beyond. Learn more about government spending through interactive tools that explore elements of the federal budget, such as federal loan, grant, and contract data.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	getSearchPageMetaTags = (searchPageHash) => ({
		og_url: `${productionURL}search`,
		og_title: "Federal Awards | Advanced Search | USAspending",
		og_description: `View search results for federal awards on USAspending.gov: ${productionURL}search${searchPageHash ? `?hash=${searchPageHash}` : ""}`,
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	});
	explorerPageMetaTags = {
		og_url: `${productionURL}explorer`,
		og_title: "Government Spending Explorer | USAspending",
		og_description: "Spending Explorer lets you explore the federal spending landscape through the lens of three accounting categories: Budget Function (spending purpose), Agency (spending source), and Object Class (purchased item or service).",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	aboutPageMetaTags = {
		og_url: `${productionURL}about`,
		og_title: "About | USAspending",
		og_description: "Learn about our mission, background, and data sources by visiting this page. ",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	accessibilityPageMetaTags = {
		og_url: `${productionURL}about/accessibility`,
		og_title: "Accessibility | USAspending",
		og_description: "Learn about our commitment to accessibility on this page.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	privacyPageMetaTags = {
		og_url: `${productionURL}about/privacy`,
		og_title: "Privacy | USAspending",
		og_description: "Learn about our privacy policy on this page. ",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	foiaPageMetaTags = {
		og_url: `${productionURL}about/foia`,
		og_title: "Freedom of Information Act | USAspending",
		og_description: "Learn where to make a Freedom of Information Act (FOIA) request by visiting this page.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	dbInfoPageMetaTags = {
		og_url: `${productionURL}db_info`,
		og_title: "Dun & Bradstreet, Inc. Data | USAspending",
		og_description: "Learn about our licensing agreement with Dun & Bradstreet, Inc. by visiting this page.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	awardPageMetaTags = ({ _category: awardType, recipient: { _name: recipientName }, _dateSigned: dateSigned, generatedId: id, fundingAgency: { toptierName: agencyName }, awardingAgency: { toptierName: asstAggAgencyName } }) => ({
		og_url: `${productionURL}award/${id}`,
		og_title: `${awardType.toUpperCase()} to ${recipientName} | USAspending`,
		og_description: `View a summary page of this ${dateSigned.format("YYYY")} ${awardType.toUpperCase()} to ${recipientName} from the ${agencyName || asstAggAgencyName}.`,
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}social-share-preview_award.png`
	});
	federalAccountPageMetaTags = ({ title, agency_identifier: agencyId, main_account_code: accountCode }) => ({
		og_url: `${productionURL}federal_account/${agencyId}-${accountCode}`,
		og_title: `${title} | Spending Profile | USAspending`,
		og_description: `View the spending activity of the federal account for ${title}. `,
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}social-share-preview_account.png`
	});
	agencyPageMetaTags = ({ name: agencyName, id }) => ({
		og_url: `${productionURL}agency/${id}`,
		og_title: `${agencyName} | Spending Profile | USAspending`,
		og_description: `View the spending activity of the ${agencyName} in this profile page. `,
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}social-share-preview_agency.png`
	});
	agencyLandingPageMetaTags = {
		og_url: `${productionURL}agency`,
		og_title: "Federal Agency Spending Profiles | USAspending",
		og_description: "View the spending activity of federal agencies by selecting from this list.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	covidPageMetaTags = {
		og_url: `${productionURL}disaster/covid-19`,
		og_title: "COVID Relief Spending | USAspending",
		og_description: "Federal agencies that have received COVID-19 supplemental appropriations are required by the Office of Management and Budget (OMB) to report obligations and expenditures on a monthly basis to USAspending.gov. Visit the COVID-19 Spending profile page for an overview of this data.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}social-share-preview_covid.png`
	};
	topPageMetaTags = {
		og_url: `${productionURL}disaster/covid-19/the-opportunity-project`,
		og_title: "The Opportunity Project: Analyzing Equity in Federal COVID-19 Spending | USAspending",
		og_description: "The Department of the Treasury and the U.S. Census Bureau brought together external tech teams, product advisors, community leaders, and federal data stewards from across the country to collaborate on analyzing equity in COVID-19 federal funding for The Opportunity Project 2021 innovation mission.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	`${productionURL}`, `${productionURL}${imgDirectory}${facebookImage}`;
	downloadArchivePageMetaTags = {
		og_url: `${productionURL}download_center/award_data_archive`,
		og_title: "Award Data Archive | USAspending",
		og_description: "Instantly download an archive of award spending data from federal agencies. ",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	downloadAwardPageMetaTags = {
		og_url: `${productionURL}download_center/custom_award_data`,
		og_title: "Custom Award Data | USAspending",
		og_description: "Customize your download of federal awards (prime awards and sub-awards) using the filters on this page. ",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	downloadAccountPageMetaTags = {
		og_url: `${productionURL}download_center/custom_account_data`,
		og_title: "Custom Account Data | USAspending",
		og_description: "Customize your download of federal spending data (both award and non-award spending) using the filters on this page. ",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	dataDictionaryPageMetaTags = {
		og_url: `${productionURL}data-dictionary`,
		og_title: "Data Dictionary | USAspending",
		og_description: "Learn about the data elements in our download packages by visiting this page.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	interactiveDataSourcesPageMetaTags = {
		og_url: `${productionURL}data-sources`,
		og_title: "Data Sources | USAspending",
		og_description: "A journey through government spending data.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	metadataDownloadPageMetaTags = {
		og_url: `${productionURL}download_center/dataset_metadata`,
		og_title: "Dataset Metadata | USAspending",
		og_description: "This JSON file contains metadata for all datasets that are published on USAspending.gov, including information such as dataset description, file format, publishing agency, and keywords.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	keywordPageMetaTags = {
		og_url: `${productionURL}keyword_search`,
		og_title: "Federal Awards | Keyword Search | USAspending",
		og_description: "Keyword Search lets you find federal awards such as loans, grants, and contracts through submitted keywords.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	statePageMetaTags = ({ name, id }) => ({
		og_url: `${productionURL}state/${id}/latest`,
		og_title: `${name} | Spending Profile | USAspending`,
		og_description: `View the federal spending activity for the state of ${name} in this profile page. `,
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	});
	errorPageMetaTags = {
		og_url: productionURL,
		og_title: "404 | USAspending",
		og_description: "The requested page cannot be found. Please visit our homepage to re-start your search or send us an inquiry.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	recipientLandingPageMetaTags = {
		og_url: `${productionURL}recipient`,
		og_title: "Federal Award Recipient Profiles | USAspending",
		og_description: "View the federal spending activity for various recipient entities by selecting from this list.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	accountLandingPageMetaTags = {
		og_url: `${productionURL}federal_account`,
		og_title: "Federal Account Spending Profiles | USAspending",
		og_description: "View the spending activity of accounts that fund federal spending.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	recipientPageMetaTags = ({ id, name }) => ({
		og_url: `${productionURL}recipient/${id}/latest`,
		og_title: `${name} | Federal Award Recipient Profile | USAspending`,
		og_description: `View the federal spending activity for ${name} in this profile page.`,
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	});
	stateLandingPageMetaTags = {
		og_url: `${productionURL}state`,
		og_title: "U.S. State Spending Profiles | USAspending",
		og_description: "View the federal spending activity for U.S. States by selecting from this list. ",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	`${productionURL}`, `${productionURL}${imgDirectory}${facebookImage}`;
	agencySubmissionDataSourcesMetaTags = {
		og_url: `${productionURL}submission-statistics/data-sources`,
		og_title: "Data Sources & Methodology for Agency Submission Statistics | USAspending",
		og_description: "Get information on how to use the Agency Submission Statistics data and view calculation methodologies and data sources.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	covidDataSourcesMetaTags = {
		og_url: `${productionURL}disaster/covid-19/data-sources`,
		og_title: "Data Sources & Methodology for COVID Relief Funding | USAspending",
		og_description: "View data sources and calculation methods for the COVID-19 Spending profile, including information on what COVID-19 spending USAspending tracks.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	analystGuideMetaTags = {
		og_url: `${productionURL}analyst-guide`,
		og_title: "Analyst’s Guide to Federal Spending Data | USAspending",
		og_description: "Find guidance on how to use USAspending.gov data. Get answers to questions to help you conduct your own analyses and develop tools using federal spending data.",
		og_site_name: siteName,
		og_image: `${productionURL}${imgDirectory}${facebookImage}`
	};
	`${productionURL}`, `${productionURL}${imgDirectory}${facebookImage}`;
	isCustomPageTitleDefined = (title = "USAspending.gov") => {
		if (title === "USAspending.gov") return false;
		if (title.split("|")[0] === " ") return false;
		if (!title) return false;
		return true;
	};
	canonicalUrl = "https://www.usaspending.gov";
	trailingSlashRegExp = /* @__PURE__ */ new RegExp(/\/$/);
	getCanonicalUrl = (path) => `${canonicalUrl}${path?.replace(trailingSlashRegExp, "")}`;
}));
//#endregion
//#region src/js/components/sharedComponents/metaTags/MetaTags.jsx
/**
* MetaTags.jsx
* Created by michaelbray on 5/25/17.
*/
var import_jsx_runtime, propTypes, MetaTags;
var init_MetaTags = __esmMin((() => {
	init_development();
	init_es();
	init_googleAnalytics();
	init_Analytics();
	init_Helmet();
	init_metaTagHelper();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		og_url: PropTypes.string,
		og_title: PropTypes.string,
		og_description: PropTypes.string,
		og_site_name: PropTypes.string,
		og_image: PropTypes.string
	};
	MetaTags = ({ og_url: url = "https://usaspending.gov", og_title: title = "USAspending.gov", og_description: description = "USAspending.gov is the new official source of accessible, searchable and reliable spending data for the U.S. Government.", og_site_name: siteName = "USAspending.gov", og_image: image = "https://usaspending.gov/img/FacebookOG.png" }) => {
		const dispatch = useDispatch();
		const { pathname } = useLocation();
		const { isInitialApplicationLoadForDAPGoogleAnalytics } = useSelector((state) => state.googleAnalytics);
		const [tags, setTags] = useState([]);
		const generateTags = useCallback(() => {
			const newTags = [];
			if (url !== "") newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:url",
				content: url
			}, "og_url"));
			if (title !== "") {
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:title",
					content: title
				}, "og_title"));
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					content: title,
					name: "twitter:title"
				}, "twitter-title"));
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title }, "title"));
			}
			if (description !== "") {
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "description",
					property: "og:description",
					content: description
				}, "og_description"));
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					content: description,
					name: "twitter:description"
				}, "twitter-description"));
			}
			if (image !== "") {
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:image",
					content: image
				}, "og_image"));
				newTags.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "twitter:image",
					content: image
				}, "twitter:image"));
			}
			setTags(newTags.concat([/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "canonical",
				href: getCanonicalUrl(pathname)
			}, "canonical-url")]));
		});
		useEffect(() => {
			generateTags();
			if (isCustomPageTitleDefined(title)) {
				if (isInitialApplicationLoadForDAPGoogleAnalytics) dispatch(setInitialAppLoadForDAP());
				const sendDAPPageviewEvent = isInitialApplicationLoadForDAPGoogleAnalytics ? "isInitialApplicationLoadForDAPGoogleAnalytics" : void 0;
				Analytics.pageview(pathname, title, sendDAPPageviewEvent);
			}
		}, [title]);
		useEffect(() => {
			generateTags();
		}, [
			url,
			title,
			description,
			siteName,
			image
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelmetExport, { children: tags });
	};
	MetaTags.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/shared/HeaderContainer.jsx
var HeaderContainer_default;
var init_HeaderContainer = __esmMin((() => {
	init_es();
	init_modalActions();
	init_Header();
	HeaderContainer_default = connect_default(null, (dispatch) => ({ showModal: (url, modalType) => dispatch(showModal(url, modalType)) }))(Header);
}));
//#endregion
export { metadataDownloadPageMetaTags as A, federalAccountPageMetaTags as C, init_metaTagHelper as D, homePageMetaTags as E, statePageMetaTags as F, topPageMetaTags as I, HelmetExport as L, recipientLandingPageMetaTags as M, recipientPageMetaTags as N, interactiveDataSourcesPageMetaTags as O, stateLandingPageMetaTags as P, init_Helmet as R, explorerPageMetaTags as S, getSearchPageMetaTags as T, downloadAccountPageMetaTags as _, aboutPageMetaTags as a, equityPageMetaTags as b, agencyLandingPageMetaTags as c, analystGuideMetaTags as d, awardPageMetaTags as f, dbInfoPageMetaTags as g, dataDictionaryPageMetaTags as h, init_MetaTags as i, privacyPageMetaTags as j, keywordPageMetaTags as k, agencyPageMetaTags as l, covidPageMetaTags as m, init_HeaderContainer as n, accessibilityPageMetaTags as o, covidDataSourcesMetaTags as p, MetaTags as r, accountLandingPageMetaTags as s, HeaderContainer_default as t, agencySubmissionDataSourcesMetaTags as u, downloadArchivePageMetaTags as v, foiaPageMetaTags as w, errorPageMetaTags as x, downloadAwardPageMetaTags as y };
