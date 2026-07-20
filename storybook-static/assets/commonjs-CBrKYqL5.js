import { t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
//#region node_modules/js-search/dist/commonjs/IndexStrategy/AllSubstringsIndexStrategy.js
var require_AllSubstringsIndexStrategy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.AllSubstringsIndexStrategy = function() {
		function AllSubstringsIndexStrategy() {
			_classCallCheck(this, AllSubstringsIndexStrategy);
		}
		_createClass(AllSubstringsIndexStrategy, [{
			key: "expandToken",
			/**
			* @inheritDocs
			*/
			value: function expandToken(token) {
				var expandedTokens = [];
				var string;
				for (var i = 0, length = token.length; i < length; ++i) {
					string = "";
					for (var j = i; j < length; ++j) {
						string += token.charAt(j);
						expandedTokens.push(string);
					}
				}
				return expandedTokens;
			}
		}]);
		return AllSubstringsIndexStrategy;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/IndexStrategy/ExactWordIndexStrategy.js
var require_ExactWordIndexStrategy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.ExactWordIndexStrategy = function() {
		function ExactWordIndexStrategy() {
			_classCallCheck(this, ExactWordIndexStrategy);
		}
		_createClass(ExactWordIndexStrategy, [{
			key: "expandToken",
			/**
			* @inheritDocs
			*/
			value: function expandToken(token) {
				return token ? [token] : [];
			}
		}]);
		return ExactWordIndexStrategy;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/IndexStrategy/PrefixIndexStrategy.js
var require_PrefixIndexStrategy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.PrefixIndexStrategy = function() {
		function PrefixIndexStrategy() {
			_classCallCheck(this, PrefixIndexStrategy);
		}
		_createClass(PrefixIndexStrategy, [{
			key: "expandToken",
			/**
			* @inheritDocs
			*/
			value: function expandToken(token) {
				var expandedTokens = [];
				var string = "";
				for (var i = 0, length = token.length; i < length; ++i) {
					string += token.charAt(i);
					expandedTokens.push(string);
				}
				return expandedTokens;
			}
		}]);
		return PrefixIndexStrategy;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/IndexStrategy/index.js
var require_IndexStrategy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _AllSubstringsIndexStrategy = require_AllSubstringsIndexStrategy();
	Object.defineProperty(exports, "AllSubstringsIndexStrategy", {
		enumerable: true,
		get: function get() {
			return _AllSubstringsIndexStrategy.AllSubstringsIndexStrategy;
		}
	});
	var _ExactWordIndexStrategy = require_ExactWordIndexStrategy();
	Object.defineProperty(exports, "ExactWordIndexStrategy", {
		enumerable: true,
		get: function get() {
			return _ExactWordIndexStrategy.ExactWordIndexStrategy;
		}
	});
	var _PrefixIndexStrategy = require_PrefixIndexStrategy();
	Object.defineProperty(exports, "PrefixIndexStrategy", {
		enumerable: true,
		get: function get() {
			return _PrefixIndexStrategy.PrefixIndexStrategy;
		}
	});
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Sanitizer/CaseSensitiveSanitizer.js
var require_CaseSensitiveSanitizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.CaseSensitiveSanitizer = function() {
		function CaseSensitiveSanitizer() {
			_classCallCheck(this, CaseSensitiveSanitizer);
		}
		_createClass(CaseSensitiveSanitizer, [{
			key: "sanitize",
			/**
			* @inheritDocs
			*/
			value: function sanitize(text) {
				return text ? text.trim() : "";
			}
		}]);
		return CaseSensitiveSanitizer;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Sanitizer/LowerCaseSanitizer.js
var require_LowerCaseSanitizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.LowerCaseSanitizer = function() {
		function LowerCaseSanitizer() {
			_classCallCheck(this, LowerCaseSanitizer);
		}
		_createClass(LowerCaseSanitizer, [{
			key: "sanitize",
			/**
			* @inheritDocs
			*/
			value: function sanitize(text) {
				return text ? text.toLocaleLowerCase().trim() : "";
			}
		}]);
		return LowerCaseSanitizer;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Sanitizer/index.js
var require_Sanitizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _CaseSensitiveSanitizer = require_CaseSensitiveSanitizer();
	Object.defineProperty(exports, "CaseSensitiveSanitizer", {
		enumerable: true,
		get: function get() {
			return _CaseSensitiveSanitizer.CaseSensitiveSanitizer;
		}
	});
	var _LowerCaseSanitizer = require_LowerCaseSanitizer();
	Object.defineProperty(exports, "LowerCaseSanitizer", {
		enumerable: true,
		get: function get() {
			return _LowerCaseSanitizer.LowerCaseSanitizer;
		}
	});
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/getNestedFieldValue.js
var require_getNestedFieldValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = getNestedFieldValue;
	/**
	* Find and return a nested object value.
	*
	* @param object to crawl
	* @param path Property path
	* @returns {any}
	*/
	function getNestedFieldValue(object, path) {
		path = path || [];
		object = object || {};
		var value = object;
		for (var i = 0; i < path.length; i++) {
			value = value[path[i]];
			if (value == null) return null;
		}
		return value;
	}
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/SearchIndex/TfIdfSearchIndex.js
var require_TfIdfSearchIndex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TfIdfSearchIndex = void 0;
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
		return typeof obj;
	} : function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	var _createClass = function() {
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
	var _getNestedFieldValue2 = _interopRequireDefault(require_getNestedFieldValue());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.TfIdfSearchIndex = function() {
		function TfIdfSearchIndex(uidFieldName) {
			_classCallCheck(this, TfIdfSearchIndex);
			this._uidFieldName = uidFieldName;
			this._tokenToIdfCache = {};
			this._tokenMap = {};
		}
		/**
		* @inheritDocs
		*/
		_createClass(TfIdfSearchIndex, [
			{
				key: "indexDocument",
				value: function indexDocument(token, uid, doc) {
					this._tokenToIdfCache = {};
					var tokenMap = this._tokenMap;
					var tokenDatum;
					if (_typeof(tokenMap[token]) !== "object") tokenMap[token] = tokenDatum = {
						$numDocumentOccurrences: 0,
						$totalNumOccurrences: 1,
						$uidMap: {}
					};
					else {
						tokenDatum = tokenMap[token];
						tokenDatum.$totalNumOccurrences++;
					}
					var uidMap = tokenDatum.$uidMap;
					if (_typeof(uidMap[uid]) !== "object") {
						tokenDatum.$numDocumentOccurrences++;
						uidMap[uid] = {
							$document: doc,
							$numTokenOccurrences: 1
						};
					} else uidMap[uid].$numTokenOccurrences++;
				}
			},
			{
				key: "search",
				value: function search(tokens, corpus) {
					var uidToDocumentMap = {};
					for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
						var token = tokens[i];
						var tokenMetadata = this._tokenMap[token];
						if (!tokenMetadata) return [];
						if (i === 0) {
							var keys = Object.keys(tokenMetadata.$uidMap);
							for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
								var uid = keys[j];
								uidToDocumentMap[uid] = tokenMetadata.$uidMap[uid].$document;
							}
						} else {
							var keys = Object.keys(uidToDocumentMap);
							for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
								var uid = keys[j];
								if (_typeof(tokenMetadata.$uidMap[uid]) !== "object") delete uidToDocumentMap[uid];
							}
						}
					}
					var documents = [];
					for (var uid in uidToDocumentMap) documents.push(uidToDocumentMap[uid]);
					var calculateTfIdf = this._createCalculateTfIdf();
					return documents.sort(function(documentA, documentB) {
						return calculateTfIdf(tokens, documentB, corpus) - calculateTfIdf(tokens, documentA, corpus);
					});
				}
			},
			{
				key: "_createCalculateIdf",
				value: function _createCalculateIdf() {
					var tokenMap = this._tokenMap;
					var tokenToIdfCache = this._tokenToIdfCache;
					return function calculateIdf(token, documents) {
						if (!tokenToIdfCache[token]) {
							var numDocumentsWithToken = typeof tokenMap[token] !== "undefined" ? tokenMap[token].$numDocumentOccurrences : 0;
							tokenToIdfCache[token] = 1 + Math.log(documents.length / (1 + numDocumentsWithToken));
						}
						return tokenToIdfCache[token];
					};
				}
			},
			{
				key: "_createCalculateTfIdf",
				value: function _createCalculateTfIdf() {
					var tokenMap = this._tokenMap;
					var uidFieldName = this._uidFieldName;
					var calculateIdf = this._createCalculateIdf();
					return function calculateTfIdf(tokens, document, documents) {
						var score = 0;
						for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
							var token = tokens[i];
							var inverseDocumentFrequency = calculateIdf(token, documents);
							if (inverseDocumentFrequency === Infinity) inverseDocumentFrequency = 0;
							var uid;
							if (uidFieldName instanceof Array) uid = document && (0, _getNestedFieldValue2.default)(document, uidFieldName);
							else uid = document && document[uidFieldName];
							var termFrequency = typeof tokenMap[token] !== "undefined" && typeof tokenMap[token].$uidMap[uid] !== "undefined" ? tokenMap[token].$uidMap[uid].$numTokenOccurrences : 0;
							score += termFrequency * inverseDocumentFrequency;
						}
						return score;
					};
				}
			}
		]);
		return TfIdfSearchIndex;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/SearchIndex/UnorderedSearchIndex.js
var require_UnorderedSearchIndex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
		return typeof obj;
	} : function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.UnorderedSearchIndex = function() {
		function UnorderedSearchIndex() {
			_classCallCheck(this, UnorderedSearchIndex);
			this._tokenToUidToDocumentMap = {};
		}
		/**
		* @inheritDocs
		*/
		_createClass(UnorderedSearchIndex, [{
			key: "indexDocument",
			value: function indexDocument(token, uid, doc) {
				if (_typeof(this._tokenToUidToDocumentMap[token]) !== "object") this._tokenToUidToDocumentMap[token] = {};
				this._tokenToUidToDocumentMap[token][uid] = doc;
			}
		}, {
			key: "search",
			value: function search(tokens, corpus) {
				var intersectingDocumentMap = {};
				var tokenToUidToDocumentMap = this._tokenToUidToDocumentMap;
				for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
					var documentMap = tokenToUidToDocumentMap[tokens[i]];
					if (!documentMap) return [];
					if (i === 0) {
						var keys = Object.keys(documentMap);
						for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
							var uid = keys[j];
							intersectingDocumentMap[uid] = documentMap[uid];
						}
					} else {
						var keys = Object.keys(intersectingDocumentMap);
						for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
							var uid = keys[j];
							if (_typeof(documentMap[uid]) !== "object") delete intersectingDocumentMap[uid];
						}
					}
				}
				var keys = Object.keys(intersectingDocumentMap);
				var documents = [];
				for (var i = 0, numKeys = keys.length; i < numKeys; i++) {
					var uid = keys[i];
					documents.push(intersectingDocumentMap[uid]);
				}
				return documents;
			}
		}]);
		return UnorderedSearchIndex;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/SearchIndex/index.js
var require_SearchIndex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _TfIdfSearchIndex = require_TfIdfSearchIndex();
	Object.defineProperty(exports, "TfIdfSearchIndex", {
		enumerable: true,
		get: function get() {
			return _TfIdfSearchIndex.TfIdfSearchIndex;
		}
	});
	var _UnorderedSearchIndex = require_UnorderedSearchIndex();
	Object.defineProperty(exports, "UnorderedSearchIndex", {
		enumerable: true,
		get: function get() {
			return _UnorderedSearchIndex.UnorderedSearchIndex;
		}
	});
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Tokenizer/SimpleTokenizer.js
var require_SimpleTokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	var REGEX = /[^a-zа-яё0-9\-']+/i;
	exports.SimpleTokenizer = function() {
		function SimpleTokenizer() {
			_classCallCheck(this, SimpleTokenizer);
		}
		_createClass(SimpleTokenizer, [{
			key: "tokenize",
			/**
			* @inheritDocs
			*/
			value: function tokenize(text) {
				return text.split(REGEX).filter(function(text) {
					return text;
				});
			}
		}]);
		return SimpleTokenizer;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Tokenizer/StemmingTokenizer.js
var require_StemmingTokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createClass = function() {
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
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.StemmingTokenizer = function() {
		/**
		* Constructor.
		*
		* @param stemmingFunction Function capable of accepting a word and returning its stem.
		* @param decoratedIndexStrategy Index strategy to be run after all stop words have been removed.
		*/
		function StemmingTokenizer(stemmingFunction, decoratedTokenizer) {
			_classCallCheck(this, StemmingTokenizer);
			this._stemmingFunction = stemmingFunction;
			this._tokenizer = decoratedTokenizer;
		}
		/**
		* @inheritDocs
		*/
		_createClass(StemmingTokenizer, [{
			key: "tokenize",
			value: function tokenize(text) {
				return this._tokenizer.tokenize(text).map(this._stemmingFunction);
			}
		}]);
		return StemmingTokenizer;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/StopWordsMap.js
var require_StopWordsMap = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var StopWordsMap = exports.StopWordsMap = {
		a: true,
		able: true,
		about: true,
		across: true,
		after: true,
		all: true,
		almost: true,
		also: true,
		am: true,
		among: true,
		an: true,
		and: true,
		any: true,
		are: true,
		as: true,
		at: true,
		be: true,
		because: true,
		been: true,
		but: true,
		by: true,
		can: true,
		cannot: true,
		could: true,
		dear: true,
		did: true,
		"do": true,
		does: true,
		either: true,
		"else": true,
		ever: true,
		every: true,
		"for": true,
		from: true,
		"get": true,
		got: true,
		had: true,
		has: true,
		have: true,
		he: true,
		her: true,
		hers: true,
		him: true,
		his: true,
		how: true,
		however: true,
		i: true,
		"if": true,
		"in": true,
		into: true,
		is: true,
		it: true,
		its: true,
		just: true,
		least: true,
		let: true,
		like: true,
		likely: true,
		may: true,
		me: true,
		might: true,
		most: true,
		must: true,
		my: true,
		neither: true,
		no: true,
		nor: true,
		not: true,
		of: true,
		off: true,
		often: true,
		on: true,
		only: true,
		or: true,
		other: true,
		our: true,
		own: true,
		rather: true,
		said: true,
		say: true,
		says: true,
		she: true,
		should: true,
		since: true,
		so: true,
		some: true,
		than: true,
		that: true,
		the: true,
		their: true,
		them: true,
		then: true,
		there: true,
		these: true,
		they: true,
		"this": true,
		tis: true,
		to: true,
		too: true,
		twas: true,
		us: true,
		wants: true,
		was: true,
		we: true,
		were: true,
		what: true,
		when: true,
		where: true,
		which: true,
		"while": true,
		who: true,
		whom: true,
		why: true,
		will: true,
		"with": true,
		would: true,
		yet: true,
		you: true,
		your: true
	};
	StopWordsMap.constructor = false;
	StopWordsMap.hasOwnProperty = false;
	StopWordsMap.isPrototypeOf = false;
	StopWordsMap.propertyIsEnumerable = false;
	StopWordsMap.toLocaleString = false;
	StopWordsMap.toString = false;
	StopWordsMap.valueOf = false;
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Tokenizer/StopWordsTokenizer.js
var require_StopWordsTokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StopWordsTokenizer = void 0;
	var _createClass = function() {
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
	var _StopWordsMap = require_StopWordsMap();
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.StopWordsTokenizer = function() {
		/**
		* Constructor.
		*
		* @param decoratedIndexStrategy Index strategy to be run after all stop words have been removed.
		*/
		function StopWordsTokenizer(decoratedTokenizer) {
			_classCallCheck(this, StopWordsTokenizer);
			this._tokenizer = decoratedTokenizer;
		}
		/**
		* @inheritDocs
		*/
		_createClass(StopWordsTokenizer, [{
			key: "tokenize",
			value: function tokenize(text) {
				return this._tokenizer.tokenize(text).filter(function(token) {
					return !_StopWordsMap.StopWordsMap[token];
				});
			}
		}]);
		return StopWordsTokenizer;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Tokenizer/index.js
var require_Tokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _SimpleTokenizer = require_SimpleTokenizer();
	Object.defineProperty(exports, "SimpleTokenizer", {
		enumerable: true,
		get: function get() {
			return _SimpleTokenizer.SimpleTokenizer;
		}
	});
	var _StemmingTokenizer = require_StemmingTokenizer();
	Object.defineProperty(exports, "StemmingTokenizer", {
		enumerable: true,
		get: function get() {
			return _StemmingTokenizer.StemmingTokenizer;
		}
	});
	var _StopWordsTokenizer = require_StopWordsTokenizer();
	Object.defineProperty(exports, "StopWordsTokenizer", {
		enumerable: true,
		get: function get() {
			return _StopWordsTokenizer.StopWordsTokenizer;
		}
	});
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/Search.js
var require_Search = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Search = void 0;
	var _createClass = function() {
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
	var _getNestedFieldValue2 = _interopRequireDefault(require_getNestedFieldValue());
	var _index = require_IndexStrategy();
	var _index2 = require_Sanitizer();
	var _index3 = require_SearchIndex();
	var _index4 = require_Tokenizer();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.Search = function() {
		/**
		* Constructor.
		* @param uidFieldName Field containing values that uniquely identify search documents; this field's values are used
		*                     to ensure that a search result set does not contain duplicate objects.
		*/
		/**
		* Array containing either a property name or a path (list of property names) to a nested value
		*/
		function Search(uidFieldName) {
			_classCallCheck(this, Search);
			if (!uidFieldName) throw Error("js-search requires a uid field name constructor parameter");
			this._uidFieldName = uidFieldName;
			this._indexStrategy = new _index.PrefixIndexStrategy();
			this._searchIndex = new _index3.TfIdfSearchIndex(uidFieldName);
			this._sanitizer = new _index2.LowerCaseSanitizer();
			this._tokenizer = new _index4.SimpleTokenizer();
			this._documents = [];
			this._searchableFields = [];
		}
		/**
		* Override the default index strategy.
		* @param value Custom index strategy
		* @throws Error if documents have already been indexed by this search instance
		*/
		_createClass(Search, [
			{
				key: "addDocument",
				/**
				* Add a searchable document to the index. Document will automatically be indexed for search.
				* @param document
				*/
				value: function addDocument(document) {
					this.addDocuments([document]);
				}
			},
			{
				key: "addDocuments",
				value: function addDocuments(documents) {
					this._documents = this._documents.concat(documents);
					this.indexDocuments_(documents, this._searchableFields);
				}
			},
			{
				key: "addIndex",
				value: function addIndex(field) {
					this._searchableFields.push(field);
					this.indexDocuments_(this._documents, [field]);
				}
			},
			{
				key: "search",
				value: function search(query) {
					var tokens = this._tokenizer.tokenize(this._sanitizer.sanitize(query));
					return this._searchIndex.search(tokens, this._documents);
				}
			},
			{
				key: "indexDocuments_",
				value: function indexDocuments_(documents, _searchableFields) {
					this._initialized = true;
					var indexStrategy = this._indexStrategy;
					var sanitizer = this._sanitizer;
					var searchIndex = this._searchIndex;
					var tokenizer = this._tokenizer;
					var uidFieldName = this._uidFieldName;
					for (var di = 0, numDocuments = documents.length; di < numDocuments; di++) {
						var doc = documents[di];
						var uid;
						if (uidFieldName instanceof Array) uid = (0, _getNestedFieldValue2.default)(doc, uidFieldName);
						else uid = doc[uidFieldName];
						for (var sfi = 0, numSearchableFields = _searchableFields.length; sfi < numSearchableFields; sfi++) {
							var fieldValue;
							var searchableField = _searchableFields[sfi];
							if (searchableField instanceof Array) fieldValue = (0, _getNestedFieldValue2.default)(doc, searchableField);
							else fieldValue = doc[searchableField];
							if (fieldValue != null && typeof fieldValue !== "string" && fieldValue.toString) fieldValue = fieldValue.toString();
							if (typeof fieldValue === "string") {
								var fieldTokens = tokenizer.tokenize(sanitizer.sanitize(fieldValue));
								for (var fti = 0, numFieldValues = fieldTokens.length; fti < numFieldValues; fti++) {
									var fieldToken = fieldTokens[fti];
									var expandedTokens = indexStrategy.expandToken(fieldToken);
									for (var eti = 0, nummExpandedTokens = expandedTokens.length; eti < nummExpandedTokens; eti++) {
										var expandedToken = expandedTokens[eti];
										searchIndex.indexDocument(expandedToken, uid, doc);
									}
								}
							}
						}
					}
				}
			},
			{
				key: "indexStrategy",
				set: function set(value) {
					if (this._initialized) throw Error("IIndexStrategy cannot be set after initialization");
					this._indexStrategy = value;
				},
				get: function get() {
					return this._indexStrategy;
				}
			},
			{
				key: "sanitizer",
				set: function set(value) {
					if (this._initialized) throw Error("ISanitizer cannot be set after initialization");
					this._sanitizer = value;
				},
				get: function get() {
					return this._sanitizer;
				}
			},
			{
				key: "searchIndex",
				set: function set(value) {
					if (this._initialized) throw Error("ISearchIndex cannot be set after initialization");
					this._searchIndex = value;
				},
				get: function get() {
					return this._searchIndex;
				}
			},
			{
				key: "tokenizer",
				set: function set(value) {
					if (this._initialized) throw Error("ITokenizer cannot be set after initialization");
					this._tokenizer = value;
				},
				get: function get() {
					return this._tokenizer;
				}
			}
		]);
		return Search;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/TokenHighlighter.js
var require_TokenHighlighter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TokenHighlighter = void 0;
	var _createClass = function() {
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
	var _index = require_IndexStrategy();
	var _index2 = require_Sanitizer();
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
	}
	exports.TokenHighlighter = function() {
		/**
		* Constructor.
		*
		* @param opt_indexStrategy Index strategy used by Search
		* @param opt_sanitizer Sanitizer used by Search
		* @param opt_wrapperTagName Optional wrapper tag name; defaults to 'mark' (e.g. <mark>)
		*/
		function TokenHighlighter(opt_indexStrategy, opt_sanitizer, opt_wrapperTagName) {
			_classCallCheck(this, TokenHighlighter);
			this._indexStrategy = opt_indexStrategy || new _index.PrefixIndexStrategy();
			this._sanitizer = opt_sanitizer || new _index2.LowerCaseSanitizer();
			this._wrapperTagName = opt_wrapperTagName || "mark";
		}
		/**
		* Highlights token occurrences within a string by wrapping them with a DOM element.
		*
		* @param text e.g. "john wayne"
		* @param tokens e.g. ["wa"]
		* @returns {string} e.g. "john <mark>wa</mark>yne"
		*/
		_createClass(TokenHighlighter, [{
			key: "highlight",
			value: function highlight(text, tokens) {
				var tagsLength = this._wrapText("").length;
				var tokenDictionary = Object.create(null);
				for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
					var token = this._sanitizer.sanitize(tokens[i]);
					var expandedTokens = this._indexStrategy.expandToken(token);
					for (var j = 0, numExpandedTokens = expandedTokens.length; j < numExpandedTokens; j++) {
						var expandedToken = expandedTokens[j];
						if (!tokenDictionary[expandedToken]) tokenDictionary[expandedToken] = [token];
						else tokenDictionary[expandedToken].push(token);
					}
				}
				var actualCurrentWord = "";
				var sanitizedCurrentWord = "";
				var currentWordStartIndex = 0;
				for (var i = 0, textLength = text.length; i < textLength; i++) {
					var character = text.charAt(i);
					if (character === " ") {
						actualCurrentWord = "";
						sanitizedCurrentWord = "";
						currentWordStartIndex = i + 1;
					} else {
						actualCurrentWord += character;
						sanitizedCurrentWord += this._sanitizer.sanitize(character);
					}
					if (tokenDictionary[sanitizedCurrentWord] && tokenDictionary[sanitizedCurrentWord].indexOf(sanitizedCurrentWord) >= 0) {
						actualCurrentWord = this._wrapText(actualCurrentWord);
						text = text.substring(0, currentWordStartIndex) + actualCurrentWord + text.substring(i + 1);
						i += tagsLength;
						textLength += tagsLength;
					}
				}
				return text;
			}
		}, {
			key: "_wrapText",
			value: function _wrapText(text) {
				var tagName = this._wrapperTagName;
				return "<" + tagName + ">" + text + "</" + tagName + ">";
			}
		}]);
		return TokenHighlighter;
	}();
}));
//#endregion
//#region node_modules/js-search/dist/commonjs/index.js
var require_commonjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _index = require_IndexStrategy();
	Object.defineProperty(exports, "AllSubstringsIndexStrategy", {
		enumerable: true,
		get: function get() {
			return _index.AllSubstringsIndexStrategy;
		}
	});
	Object.defineProperty(exports, "ExactWordIndexStrategy", {
		enumerable: true,
		get: function get() {
			return _index.ExactWordIndexStrategy;
		}
	});
	Object.defineProperty(exports, "PrefixIndexStrategy", {
		enumerable: true,
		get: function get() {
			return _index.PrefixIndexStrategy;
		}
	});
	var _index2 = require_Sanitizer();
	Object.defineProperty(exports, "CaseSensitiveSanitizer", {
		enumerable: true,
		get: function get() {
			return _index2.CaseSensitiveSanitizer;
		}
	});
	Object.defineProperty(exports, "LowerCaseSanitizer", {
		enumerable: true,
		get: function get() {
			return _index2.LowerCaseSanitizer;
		}
	});
	var _index3 = require_SearchIndex();
	Object.defineProperty(exports, "TfIdfSearchIndex", {
		enumerable: true,
		get: function get() {
			return _index3.TfIdfSearchIndex;
		}
	});
	Object.defineProperty(exports, "UnorderedSearchIndex", {
		enumerable: true,
		get: function get() {
			return _index3.UnorderedSearchIndex;
		}
	});
	var _index4 = require_Tokenizer();
	Object.defineProperty(exports, "SimpleTokenizer", {
		enumerable: true,
		get: function get() {
			return _index4.SimpleTokenizer;
		}
	});
	Object.defineProperty(exports, "StemmingTokenizer", {
		enumerable: true,
		get: function get() {
			return _index4.StemmingTokenizer;
		}
	});
	Object.defineProperty(exports, "StopWordsTokenizer", {
		enumerable: true,
		get: function get() {
			return _index4.StopWordsTokenizer;
		}
	});
	var _Search = require_Search();
	Object.defineProperty(exports, "Search", {
		enumerable: true,
		get: function get() {
			return _Search.Search;
		}
	});
	var _StopWordsMap = require_StopWordsMap();
	Object.defineProperty(exports, "StopWordsMap", {
		enumerable: true,
		get: function get() {
			return _StopWordsMap.StopWordsMap;
		}
	});
	var _TokenHighlighter = require_TokenHighlighter();
	Object.defineProperty(exports, "TokenHighlighter", {
		enumerable: true,
		get: function get() {
			return _TokenHighlighter.TokenHighlighter;
		}
	});
}));
//#endregion
export { require_commonjs as t };
