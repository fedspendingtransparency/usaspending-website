import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
//#region node_modules/d3-array/src/ascending.js
function ascending(a, b) {
	return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
var init_ascending = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-array/src/descending.js
function descending(a, b) {
	return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
var init_descending = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-array/src/bisector.js
function bisector(f) {
	let compare1, compare2, delta;
	if (f.length !== 2) {
		compare1 = ascending;
		compare2 = (d, x) => ascending(f(d), x);
		delta = (d, x) => f(d) - x;
	} else {
		compare1 = f === ascending || f === descending ? f : zero$1;
		compare2 = f;
		delta = f;
	}
	function left(a, x, lo = 0, hi = a.length) {
		if (lo < hi) {
			if (compare1(x, x) !== 0) return hi;
			do {
				const mid = lo + hi >>> 1;
				if (compare2(a[mid], x) < 0) lo = mid + 1;
				else hi = mid;
			} while (lo < hi);
		}
		return lo;
	}
	function right(a, x, lo = 0, hi = a.length) {
		if (lo < hi) {
			if (compare1(x, x) !== 0) return hi;
			do {
				const mid = lo + hi >>> 1;
				if (compare2(a[mid], x) <= 0) lo = mid + 1;
				else hi = mid;
			} while (lo < hi);
		}
		return lo;
	}
	function center(a, x, lo = 0, hi = a.length) {
		const i = left(a, x, lo, hi - 1);
		return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
	}
	return {
		left,
		center,
		right
	};
}
function zero$1() {
	return 0;
}
var init_bisector = __esmMin((() => {
	init_ascending();
	init_descending();
}));
//#endregion
//#region node_modules/d3-array/src/number.js
function number$2(x) {
	return x === null ? NaN : +x;
}
function* numbers(values, valueof) {
	if (valueof === void 0) {
		for (let value of values) if (value != null && (value = +value) >= value) yield value;
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) yield value;
	}
}
var init_number$2 = __esmMin((() => {})), ascendingBisect, bisectRight;
var init_bisect = __esmMin((() => {
	init_ascending();
	init_bisector();
	init_number$2();
	ascendingBisect = bisector(ascending);
	bisectRight = ascendingBisect.right;
	ascendingBisect.left;
	bisector(number$2).center;
}));
//#endregion
//#region node_modules/internmap/src/index.js
function intern_get({ _intern, _key }, value) {
	const key = _key(value);
	return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
	const key = _key(value);
	if (_intern.has(key)) return _intern.get(key);
	_intern.set(key, value);
	return value;
}
function intern_delete({ _intern, _key }, value) {
	const key = _key(value);
	if (_intern.has(key)) {
		value = _intern.get(key);
		_intern.delete(key);
	}
	return value;
}
function keyof(value) {
	return value !== null && typeof value === "object" ? value.valueOf() : value;
}
var InternMap;
var init_src$7 = __esmMin((() => {
	InternMap = class extends Map {
		constructor(entries, key = keyof) {
			super();
			Object.defineProperties(this, {
				_intern: { value: /* @__PURE__ */ new Map() },
				_key: { value: key }
			});
			if (entries != null) for (const [key, value] of entries) this.set(key, value);
		}
		get(key) {
			return super.get(intern_get(this, key));
		}
		has(key) {
			return super.has(intern_get(this, key));
		}
		set(key, value) {
			return super.set(intern_set(this, key), value);
		}
		delete(key) {
			return super.delete(intern_delete(this, key));
		}
	};
}));
//#endregion
//#region node_modules/d3-array/src/sort.js
function compareDefined(compare = ascending) {
	if (compare === ascending) return ascendingDefined;
	if (typeof compare !== "function") throw new TypeError("compare is not a function");
	return (a, b) => {
		const x = compare(a, b);
		if (x || x === 0) return x;
		return (compare(b, b) === 0) - (compare(a, a) === 0);
	};
}
function ascendingDefined(a, b) {
	return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}
var init_sort = __esmMin((() => {
	init_ascending();
}));
//#endregion
//#region node_modules/d3-array/src/ticks.js
function tickSpec(start, stop, count) {
	const step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
	let i1, i2, inc;
	if (power < 0) {
		inc = Math.pow(10, -power) / factor;
		i1 = Math.round(start * inc);
		i2 = Math.round(stop * inc);
		if (i1 / inc < start) ++i1;
		if (i2 / inc > stop) --i2;
		inc = -inc;
	} else {
		inc = Math.pow(10, power) * factor;
		i1 = Math.round(start / inc);
		i2 = Math.round(stop / inc);
		if (i1 * inc < start) ++i1;
		if (i2 * inc > stop) --i2;
	}
	if (i2 < i1 && .5 <= count && count < 2) return tickSpec(start, stop, count * 2);
	return [
		i1,
		i2,
		inc
	];
}
function ticks(start, stop, count) {
	stop = +stop, start = +start, count = +count;
	if (!(count > 0)) return [];
	if (start === stop) return [start];
	const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
	if (!(i2 >= i1)) return [];
	const n = i2 - i1 + 1, ticks = new Array(n);
	if (reverse) if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
	else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
	else if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
	else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
	return ticks;
}
function tickIncrement(start, stop, count) {
	stop = +stop, start = +start, count = +count;
	return tickSpec(start, stop, count)[2];
}
function tickStep(start, stop, count) {
	stop = +stop, start = +start, count = +count;
	const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
	return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
var e10, e5, e2;
var init_ticks$1 = __esmMin((() => {
	e10 = Math.sqrt(50);
	e5 = Math.sqrt(10);
	e2 = Math.sqrt(2);
}));
//#endregion
//#region node_modules/d3-array/src/max.js
function max(values, valueof) {
	let max;
	if (valueof === void 0) {
		for (const value of values) if (value != null && (max < value || max === void 0 && value >= value)) max = value;
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (max < value || max === void 0 && value >= value)) max = value;
	}
	return max;
}
var init_max = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-array/src/min.js
function min(values, valueof) {
	let min;
	if (valueof === void 0) {
		for (const value of values) if (value != null && (min > value || min === void 0 && value >= value)) min = value;
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (min > value || min === void 0 && value >= value)) min = value;
	}
	return min;
}
var init_min = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-array/src/quickselect.js
function quickselect(array, k, left = 0, right = Infinity, compare) {
	k = Math.floor(k);
	left = Math.floor(Math.max(0, left));
	right = Math.floor(Math.min(array.length - 1, right));
	if (!(left <= k && k <= right)) return array;
	compare = compare === void 0 ? ascendingDefined : compareDefined(compare);
	while (right > left) {
		if (right - left > 600) {
			const n = right - left + 1;
			const m = k - left + 1;
			const z = Math.log(n);
			const s = .5 * Math.exp(2 * z / 3);
			const sd = .5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
			const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
			const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
			quickselect(array, k, newLeft, newRight, compare);
		}
		const t = array[k];
		let i = left;
		let j = right;
		swap(array, left, k);
		if (compare(array[right], t) > 0) swap(array, left, right);
		while (i < j) {
			swap(array, i, j), ++i, --j;
			while (compare(array[i], t) < 0) ++i;
			while (compare(array[j], t) > 0) --j;
		}
		if (compare(array[left], t) === 0) swap(array, left, j);
		else ++j, swap(array, j, right);
		if (j <= k) left = j + 1;
		if (k <= j) right = j - 1;
	}
	return array;
}
function swap(array, i, j) {
	const t = array[i];
	array[i] = array[j];
	array[j] = t;
}
var init_quickselect = __esmMin((() => {
	init_sort();
}));
//#endregion
//#region node_modules/d3-array/src/quantile.js
function quantile$1(values, p, valueof) {
	values = Float64Array.from(numbers(values, valueof));
	if (!(n = values.length) || isNaN(p = +p)) return;
	if (p <= 0 || n < 2) return min(values);
	if (p >= 1) return max(values);
	var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max(quickselect(values, i0).subarray(0, i0 + 1));
	return value0 + (min(values.subarray(i0 + 1)) - value0) * (i - i0);
}
function quantileSorted(values, p, valueof = number$2) {
	if (!(n = values.length) || isNaN(p = +p)) return;
	if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
	if (p >= 1) return +valueof(values[n - 1], n - 1, values);
	var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values);
	return value0 + (+valueof(values[i0 + 1], i0 + 1, values) - value0) * (i - i0);
}
var init_quantile$1 = __esmMin((() => {
	init_max();
	init_min();
	init_quickselect();
	init_number$2();
}));
//#endregion
//#region node_modules/d3-array/src/range.js
function range(start, stop, step) {
	start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
	var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range = new Array(n);
	while (++i < n) range[i] = start + i * step;
	return range;
}
var init_range = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-array/src/index.js
var init_src$6 = __esmMin((() => {
	init_bisect();
	init_ascending();
	init_bisector();
	init_descending();
	init_src$7();
	init_sort();
	init_ticks$1();
	init_quantile$1();
	init_max();
	init_min();
	init_quickselect();
	init_range();
}));
//#endregion
//#region node_modules/d3-scale/src/init.js
function initRange(domain, range) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(domain);
			break;
		default:
			this.range(range).domain(domain);
			break;
	}
	return this;
}
function initInterpolator(domain, interpolator) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			if (typeof domain === "function") this.interpolator(domain);
			else this.range(domain);
			break;
		default:
			this.domain(domain);
			if (typeof interpolator === "function") this.interpolator(interpolator);
			else this.range(interpolator);
			break;
	}
	return this;
}
var init_init = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-scale/src/ordinal.js
function ordinal() {
	var index = new InternMap(), domain = [], range = [], unknown = implicit;
	function scale(d) {
		let i = index.get(d);
		if (i === void 0) {
			if (unknown !== implicit) return unknown;
			index.set(d, i = domain.push(d) - 1);
		}
		return range[i % range.length];
	}
	scale.domain = function(_) {
		if (!arguments.length) return domain.slice();
		domain = [], index = new InternMap();
		for (const value of _) {
			if (index.has(value)) continue;
			index.set(value, domain.push(value) - 1);
		}
		return scale;
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), scale) : range.slice();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return ordinal(domain, range).unknown(unknown);
	};
	initRange.apply(scale, arguments);
	return scale;
}
var implicit;
var init_ordinal = __esmMin((() => {
	init_src$6();
	init_init();
	implicit = Symbol("implicit");
}));
//#endregion
//#region node_modules/d3-scale/src/band.js
function band() {
	var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = .5;
	delete scale.unknown;
	function rescale() {
		var n = domain().length, reverse = r1 < r0, start = reverse ? r1 : r0, stop = reverse ? r0 : r1;
		step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
		if (round) step = Math.floor(step);
		start += (stop - start - step * (n - paddingInner)) * align;
		bandwidth = step * (1 - paddingInner);
		if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
		var values = range(n).map(function(i) {
			return start + step * i;
		});
		return ordinalRange(reverse ? values.reverse() : values);
	}
	scale.domain = function(_) {
		return arguments.length ? (domain(_), rescale()) : domain();
	};
	scale.range = function(_) {
		return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
	};
	scale.rangeRound = function(_) {
		return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
	};
	scale.bandwidth = function() {
		return bandwidth;
	};
	scale.step = function() {
		return step;
	};
	scale.round = function(_) {
		return arguments.length ? (round = !!_, rescale()) : round;
	};
	scale.padding = function(_) {
		return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
	};
	scale.paddingInner = function(_) {
		return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
	};
	scale.paddingOuter = function(_) {
		return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
	};
	scale.align = function(_) {
		return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	};
	scale.copy = function() {
		return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
	};
	return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
	var copy = scale.copy;
	scale.padding = scale.paddingOuter;
	delete scale.paddingInner;
	delete scale.paddingOuter;
	scale.copy = function() {
		return pointish(copy());
	};
	return scale;
}
function point() {
	return pointish(band.apply(null, arguments).paddingInner(1));
}
var init_band = __esmMin((() => {
	init_src$6();
	init_init();
	init_ordinal();
}));
//#endregion
//#region node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
	constructor.prototype = factory.prototype = prototype;
	prototype.constructor = constructor;
}
function extend(parent, definition) {
	var prototype = Object.create(parent.prototype);
	for (var key in definition) prototype[key] = definition[key];
	return prototype;
}
var init_define = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-color/src/color.js
function Color() {}
function color_formatHex() {
	return this.rgb().formatHex();
}
function color_formatHex8() {
	return this.rgb().formatHex8();
}
function color_formatHsl() {
	return hslConvert(this).formatHsl();
}
function color_formatRgb() {
	return this.rgb().formatRgb();
}
function color(format) {
	var m, l;
	format = (format + "").trim().toLowerCase();
	return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
	return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
	if (a <= 0) r = g = b = NaN;
	return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
	if (!(o instanceof Color)) o = color(o);
	if (!o) return new Rgb();
	o = o.rgb();
	return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
	return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
	this.r = +r;
	this.g = +g;
	this.b = +b;
	this.opacity = +opacity;
}
function rgb_formatHex() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
	const a = clampa(this.opacity);
	return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
	return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
	return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
	value = clampi(value);
	return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
	if (a <= 0) h = s = l = NaN;
	else if (l <= 0 || l >= 1) h = s = NaN;
	else if (s <= 0) h = NaN;
	return new Hsl(h, s, l, a);
}
function hslConvert(o) {
	if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	if (!(o instanceof Color)) o = color(o);
	if (!o) return new Hsl();
	if (o instanceof Hsl) return o;
	o = o.rgb();
	var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
	if (s) {
		if (r === max) h = (g - b) / s + (g < b) * 6;
		else if (g === max) h = (b - r) / s + 2;
		else h = (r - g) / s + 4;
		s /= l < .5 ? max + min : 2 - max - min;
		h *= 60;
	} else s = l > 0 && l < 1 ? 0 : h;
	return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
	return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
	this.h = +h;
	this.s = +s;
	this.l = +l;
	this.opacity = +opacity;
}
function clamph(value) {
	value = (value || 0) % 360;
	return value < 0 ? value + 360 : value;
}
function clampt(value) {
	return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
	return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
var darker, brighter, reI, reN, reP, reHex, reRgbInteger, reRgbPercent, reRgbaInteger, reRgbaPercent, reHslPercent, reHslaPercent, named;
var init_color$1 = __esmMin((() => {
	init_define();
	darker = .7;
	brighter = 1 / darker;
	reI = "\\s*([+-]?\\d+)\\s*";
	reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	reHex = /^#([0-9a-f]{3,8})$/;
	reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
	reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
	reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
	reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
	reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
	reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
	named = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	};
	define_default(Color, color, {
		copy(channels) {
			return Object.assign(new this.constructor(), this, channels);
		},
		displayable() {
			return this.rgb().displayable();
		},
		hex: color_formatHex,
		formatHex: color_formatHex,
		formatHex8: color_formatHex8,
		formatHsl: color_formatHsl,
		formatRgb: color_formatRgb,
		toString: color_formatRgb
	});
	define_default(Rgb, rgb, extend(Color, {
		brighter(k) {
			k = k == null ? brighter : Math.pow(brighter, k);
			return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
		},
		darker(k) {
			k = k == null ? darker : Math.pow(darker, k);
			return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
		},
		rgb() {
			return this;
		},
		clamp() {
			return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
		},
		displayable() {
			return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
		},
		hex: rgb_formatHex,
		formatHex: rgb_formatHex,
		formatHex8: rgb_formatHex8,
		formatRgb: rgb_formatRgb,
		toString: rgb_formatRgb
	}));
	define_default(Hsl, hsl, extend(Color, {
		brighter(k) {
			k = k == null ? brighter : Math.pow(brighter, k);
			return new Hsl(this.h, this.s, this.l * k, this.opacity);
		},
		darker(k) {
			k = k == null ? darker : Math.pow(darker, k);
			return new Hsl(this.h, this.s, this.l * k, this.opacity);
		},
		rgb() {
			var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < .5 ? l : 1 - l) * s, m1 = 2 * l - m2;
			return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
		},
		clamp() {
			return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
		},
		displayable() {
			return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
		},
		formatHsl() {
			const a = clampa(this.opacity);
			return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
		}
	}));
}));
//#endregion
//#region node_modules/d3-color/src/index.js
var init_src$5 = __esmMin((() => {
	init_color$1();
	init_define();
}));
var init_basis = __esmMin((() => {}));
var init_basisClosed = __esmMin((() => {
	init_basis();
}));
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var constant_default;
var init_constant$1 = __esmMin((() => {
	constant_default = (x) => () => x;
}));
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function linear$1(a, d) {
	return function(t) {
		return a + t * d;
	};
}
function exponential(a, b, y) {
	return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
		return Math.pow(a + t * b, y);
	};
}
function gamma(y) {
	return (y = +y) === 1 ? nogamma : function(a, b) {
		return b - a ? exponential(a, b, y) : constant_default(isNaN(a) ? b : a);
	};
}
function nogamma(a, b) {
	var d = b - a;
	return d ? linear$1(a, d) : constant_default(isNaN(a) ? b : a);
}
var init_color = __esmMin((() => {
	init_constant$1();
})), rgb_default;
var init_rgb = __esmMin((() => {
	init_src$5();
	init_basis();
	init_basisClosed();
	init_color();
	rgb_default = (function rgbGamma(y) {
		var color = gamma(y);
		function rgb$1(start, end) {
			var r = color((start = rgb(start)).r, (end = rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
			return function(t) {
				start.r = r(t);
				start.g = g(t);
				start.b = b(t);
				start.opacity = opacity(t);
				return start + "";
			};
		}
		rgb$1.gamma = rgbGamma;
		return rgb$1;
	})(1);
}));
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
	if (!b) b = [];
	var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
	return function(t) {
		for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
		return c;
	};
}
function isNumberArray(x) {
	return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
var init_numberArray = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
	var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
	for (i = 0; i < na; ++i) x[i] = value_default(a[i], b[i]);
	for (; i < nb; ++i) c[i] = b[i];
	return function(t) {
		for (i = 0; i < na; ++i) c[i] = x[i](t);
		return c;
	};
}
var init_array = __esmMin((() => {
	init_value();
}));
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
	var d = /* @__PURE__ */ new Date();
	return a = +a, b = +b, function(t) {
		return d.setTime(a * (1 - t) + b * t), d;
	};
}
var init_date = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
	return a = +a, b = +b, function(t) {
		return a * (1 - t) + b * t;
	};
}
var init_number$1 = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
	var i = {}, c = {}, k;
	if (a === null || typeof a !== "object") a = {};
	if (b === null || typeof b !== "object") b = {};
	for (k in b) if (k in a) i[k] = value_default(a[k], b[k]);
	else c[k] = b[k];
	return function(t) {
		for (k in i) c[k] = i[k](t);
		return c;
	};
}
var init_object = __esmMin((() => {
	init_value();
}));
//#endregion
//#region node_modules/d3-interpolate/src/string.js
function zero(b) {
	return function() {
		return b;
	};
}
function one(b) {
	return function(t) {
		return b(t) + "";
	};
}
function string_default(a, b) {
	var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
	a = a + "", b = b + "";
	while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
		if ((bs = bm.index) > bi) {
			bs = b.slice(bi, bs);
			if (s[i]) s[i] += bs;
			else s[++i] = bs;
		}
		if ((am = am[0]) === (bm = bm[0])) if (s[i]) s[i] += bm;
		else s[++i] = bm;
		else {
			s[++i] = null;
			q.push({
				i,
				x: number_default(am, bm)
			});
		}
		bi = reB.lastIndex;
	}
	if (bi < b.length) {
		bs = b.slice(bi);
		if (s[i]) s[i] += bs;
		else s[++i] = bs;
	}
	return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
		for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
		return s.join("");
	});
}
var reA, reB;
var init_string = __esmMin((() => {
	init_number$1();
	reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	reB = new RegExp(reA.source, "g");
}));
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
	var t = typeof b, c;
	return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}
var init_value = __esmMin((() => {
	init_src$5();
	init_rgb();
	init_array();
	init_date();
	init_number$1();
	init_object();
	init_string();
	init_constant$1();
	init_numberArray();
}));
//#endregion
//#region node_modules/d3-interpolate/src/round.js
function round_default(a, b) {
	return a = +a, b = +b, function(t) {
		return Math.round(a * (1 - t) + b * t);
	};
}
var init_round = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-interpolate/src/transform/decompose.js
function decompose_default(a, b, c, d, e, f) {
	var scaleX, scaleY, skewX;
	if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	return {
		translateX: e,
		translateY: f,
		rotate: Math.atan2(b, a) * degrees,
		skewX: Math.atan(skewX) * degrees,
		scaleX,
		scaleY
	};
}
var degrees, identity$2;
var init_decompose = __esmMin((() => {
	degrees = 180 / Math.PI;
	identity$2 = {
		translateX: 0,
		translateY: 0,
		rotate: 0,
		skewX: 0,
		scaleX: 1,
		scaleY: 1
	};
}));
//#endregion
//#region node_modules/d3-interpolate/src/transform/parse.js
function parseCss(value) {
	const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
	return m.isIdentity ? identity$2 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
	if (value == null) return identity$2;
	if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgNode.setAttribute("transform", value);
	if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
	value = value.matrix;
	return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
var svgNode;
var init_parse = __esmMin((() => {
	init_decompose();
}));
//#endregion
//#region node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
	function pop(s) {
		return s.length ? s.pop() + " " : "";
	}
	function translate(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push("translate(", null, pxComma, null, pxParen);
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
	}
	function rotate(a, b, s, q) {
		if (a !== b) {
			if (a - b > 180) b += 360;
			else if (b - a > 180) a += 360;
			q.push({
				i: s.push(pop(s) + "rotate(", null, degParen) - 2,
				x: number_default(a, b)
			});
		} else if (b) s.push(pop(s) + "rotate(" + b + degParen);
	}
	function skewX(a, b, s, q) {
		if (a !== b) q.push({
			i: s.push(pop(s) + "skewX(", null, degParen) - 2,
			x: number_default(a, b)
		});
		else if (b) s.push(pop(s) + "skewX(" + b + degParen);
	}
	function scale(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push(pop(s) + "scale(", null, ",", null, ")");
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	}
	return function(a, b) {
		var s = [], q = [];
		a = parse(a), b = parse(b);
		translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
		rotate(a.rotate, b.rotate, s, q);
		skewX(a.skewX, b.skewX, s, q);
		scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
		a = b = null;
		return function(t) {
			var i = -1, n = q.length, o;
			while (++i < n) s[(o = q[i]).i] = o.x(t);
			return s.join("");
		};
	};
}
var interpolateTransformCss, interpolateTransformSvg;
var init_transform = __esmMin((() => {
	init_number$1();
	init_parse();
	interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
}));
//#endregion
//#region node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate, values) {
	if (values === void 0) values = interpolate, interpolate = value_default;
	var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
	while (i < n) I[i] = interpolate(v, v = values[++i]);
	return function(t) {
		var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
		return I[i](t - i);
	};
}
var init_piecewise = __esmMin((() => {
	init_value();
}));
//#endregion
//#region node_modules/d3-interpolate/src/index.js
var init_src$4 = __esmMin((() => {
	init_value();
	init_array();
	init_basis();
	init_basisClosed();
	init_date();
	init_color();
	init_number$1();
	init_numberArray();
	init_object();
	init_round();
	init_string();
	init_transform();
	init_rgb();
	init_src$5();
	init_piecewise();
}));
//#endregion
//#region node_modules/d3-scale/src/constant.js
function constants(x) {
	return function() {
		return x;
	};
}
var init_constant = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-scale/src/number.js
function number$1(x) {
	return +x;
}
var init_number = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-scale/src/continuous.js
function identity$1(x) {
	return x;
}
function normalize(a, b) {
	return (b -= a = +a) ? function(x) {
		return (x - a) / b;
	} : constants(isNaN(b) ? NaN : .5);
}
function clamper(a, b) {
	var t;
	if (a > b) t = a, a = b, b = t;
	return function(x) {
		return Math.max(a, Math.min(b, x));
	};
}
function bimap(domain, range, interpolate) {
	var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
	if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
	else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
	return function(x) {
		return r0(d0(x));
	};
}
function polymap(domain, range, interpolate) {
	var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
	if (domain[j] < domain[0]) {
		domain = domain.slice().reverse();
		range = range.slice().reverse();
	}
	while (++i < j) {
		d[i] = normalize(domain[i], domain[i + 1]);
		r[i] = interpolate(range[i], range[i + 1]);
	}
	return function(x) {
		var i = bisectRight(domain, x, 1, j) - 1;
		return r[i](d[i](x));
	};
}
function copy$1(source, target) {
	return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer$2() {
	var domain = unit, range = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity$1, piecewise, output, input;
	function rescale() {
		var n = Math.min(domain.length, range.length);
		if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
		piecewise = n > 2 ? polymap : bimap;
		output = input = null;
		return scale;
	}
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
	}
	scale.invert = function(y) {
		return clamp(untransform((input || (input = piecewise(range, domain.map(transform), number_default)))(y)));
	};
	scale.domain = function(_) {
		return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
	};
	scale.rangeRound = function(_) {
		return range = Array.from(_), interpolate = round_default, rescale();
	};
	scale.clamp = function(_) {
		return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
	};
	scale.interpolate = function(_) {
		return arguments.length ? (interpolate = _, rescale()) : interpolate;
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	return function(t, u) {
		transform = t, untransform = u;
		return rescale();
	};
}
function continuous() {
	return transformer$2()(identity$1, identity$1);
}
var unit;
var init_continuous = __esmMin((() => {
	init_src$6();
	init_src$4();
	init_constant();
	init_number();
	unit = [0, 1];
}));
//#endregion
//#region node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x) {
	return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
	if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
	var i, coefficient = x.slice(0, i);
	return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
var init_formatDecimal = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-format/src/exponent.js
function exponent_default(x) {
	return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}
var init_exponent = __esmMin((() => {
	init_formatDecimal();
}));
//#endregion
//#region node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
	return function(value, width) {
		var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
		while (i > 0 && g > 0) {
			if (length + g + 1 > width) g = Math.max(1, width - length);
			t.push(value.substring(i -= g, i + g));
			if ((length += g + 1) > width) break;
			g = grouping[j = (j + 1) % grouping.length];
		}
		return t.reverse().join(thousands);
	};
}
var init_formatGroup = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
	return function(value) {
		return value.replace(/[0-9]/g, function(i) {
			return numerals[+i];
		});
	};
}
var init_formatNumerals = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-format/src/formatSpecifier.js
function formatSpecifier(specifier) {
	if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	var match;
	return new FormatSpecifier({
		fill: match[1],
		align: match[2],
		sign: match[3],
		symbol: match[4],
		zero: match[5],
		width: match[6],
		comma: match[7],
		precision: match[8] && match[8].slice(1),
		trim: match[9],
		type: match[10]
	});
}
function FormatSpecifier(specifier) {
	this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
	this.align = specifier.align === void 0 ? ">" : specifier.align + "";
	this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
	this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
	this.zero = !!specifier.zero;
	this.width = specifier.width === void 0 ? void 0 : +specifier.width;
	this.comma = !!specifier.comma;
	this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
	this.trim = !!specifier.trim;
	this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
var re;
var init_formatSpecifier = __esmMin((() => {
	re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
	formatSpecifier.prototype = FormatSpecifier.prototype;
	FormatSpecifier.prototype.toString = function() {
		return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
	};
}));
//#endregion
//#region node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
	out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) switch (s[i]) {
		case ".":
			i0 = i1 = i;
			break;
		case "0":
			if (i0 === 0) i0 = i;
			i1 = i;
			break;
		default:
			if (!+s[i]) break out;
			if (i0 > 0) i0 = 0;
			break;
	}
	return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
var init_formatTrim = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-format/src/formatPrefixAuto.js
function formatPrefixAuto_default(x, p) {
	var d = formatDecimalParts(x, p);
	if (!d) return x + "";
	var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
	return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}
var prefixExponent;
var init_formatPrefixAuto = __esmMin((() => {
	init_formatDecimal();
}));
//#endregion
//#region node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x, p) {
	var d = formatDecimalParts(x, p);
	if (!d) return x + "";
	var coefficient = d[0], exponent = d[1];
	return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
var init_formatRounded = __esmMin((() => {
	init_formatDecimal();
}));
//#endregion
//#region node_modules/d3-format/src/formatTypes.js
var formatTypes_default;
var init_formatTypes = __esmMin((() => {
	init_formatDecimal();
	init_formatPrefixAuto();
	init_formatRounded();
	formatTypes_default = {
		"%": (x, p) => (x * 100).toFixed(p),
		"b": (x) => Math.round(x).toString(2),
		"c": (x) => x + "",
		"d": formatDecimal_default,
		"e": (x, p) => x.toExponential(p),
		"f": (x, p) => x.toFixed(p),
		"g": (x, p) => x.toPrecision(p),
		"o": (x) => Math.round(x).toString(8),
		"p": (x, p) => formatRounded_default(x * 100, p),
		"r": formatRounded_default,
		"s": formatPrefixAuto_default,
		"X": (x) => Math.round(x).toString(16).toUpperCase(),
		"x": (x) => Math.round(x).toString(16)
	};
}));
//#endregion
//#region node_modules/d3-format/src/identity.js
function identity_default(x) {
	return x;
}
var init_identity$1 = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-format/src/locale.js
function locale_default(locale) {
	var group = locale.grouping === void 0 || locale.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === void 0 ? "" : locale.currency[0] + "", currencySuffix = locale.currency === void 0 ? "" : locale.currency[1] + "", decimal = locale.decimal === void 0 ? "." : locale.decimal + "", numerals = locale.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale.numerals, String)), percent = locale.percent === void 0 ? "%" : locale.percent + "", minus = locale.minus === void 0 ? "−" : locale.minus + "", nan = locale.nan === void 0 ? "NaN" : locale.nan + "";
	function newFormat(specifier) {
		specifier = formatSpecifier(specifier);
		var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
		if (type === "n") comma = true, type = "g";
		else if (!formatTypes_default[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
		if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
		var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
		var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
		precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
		function format(value) {
			var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
			if (type === "c") {
				valueSuffix = formatType(value) + valueSuffix;
				value = "";
			} else {
				value = +value;
				var valueNegative = value < 0 || 1 / value < 0;
				value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
				if (trim) value = formatTrim_default(value);
				if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
				valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
				valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
				if (maybeSuffix) {
					i = -1, n = value.length;
					while (++i < n) if (c = value.charCodeAt(i), 48 > c || c > 57) {
						valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
						value = value.slice(0, i);
						break;
					}
				}
			}
			if (comma && !zero) value = group(value, Infinity);
			var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
			if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
			switch (align) {
				case "<":
					value = valuePrefix + value + valueSuffix + padding;
					break;
				case "=":
					value = valuePrefix + padding + value + valueSuffix;
					break;
				case "^":
					value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
					break;
				default:
					value = padding + valuePrefix + value + valueSuffix;
					break;
			}
			return numerals(value);
		}
		format.toString = function() {
			return specifier + "";
		};
		return format;
	}
	function formatPrefix(specifier, value) {
		var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
		return function(value) {
			return f(k * value) + prefix;
		};
	}
	return {
		format: newFormat,
		formatPrefix
	};
}
var map, prefixes;
var init_locale$1 = __esmMin((() => {
	init_exponent();
	init_formatGroup();
	init_formatNumerals();
	init_formatSpecifier();
	init_formatTrim();
	init_formatTypes();
	init_formatPrefixAuto();
	init_identity$1();
	map = Array.prototype.map;
	prefixes = [
		"y",
		"z",
		"a",
		"f",
		"p",
		"n",
		"µ",
		"m",
		"",
		"k",
		"M",
		"G",
		"T",
		"P",
		"E",
		"Z",
		"Y"
	];
}));
//#endregion
//#region node_modules/d3-format/src/defaultLocale.js
function defaultLocale$1(definition) {
	locale$1 = locale_default(definition);
	format = locale$1.format;
	formatPrefix = locale$1.formatPrefix;
	return locale$1;
}
var locale$1, format, formatPrefix;
var init_defaultLocale$1 = __esmMin((() => {
	init_locale$1();
	defaultLocale$1({
		thousands: ",",
		grouping: [3],
		currency: ["$", ""]
	});
}));
//#endregion
//#region node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
	return Math.max(0, -exponent_default(Math.abs(step)));
}
var init_precisionFixed = __esmMin((() => {
	init_exponent();
}));
//#endregion
//#region node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}
var init_precisionPrefix = __esmMin((() => {
	init_exponent();
}));
//#endregion
//#region node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max) {
	step = Math.abs(step), max = Math.abs(max) - step;
	return Math.max(0, exponent_default(max) - exponent_default(step)) + 1;
}
var init_precisionRound = __esmMin((() => {
	init_exponent();
}));
//#endregion
//#region node_modules/d3-format/src/index.js
var init_src$3 = __esmMin((() => {
	init_defaultLocale$1();
	init_locale$1();
	init_formatSpecifier();
	init_precisionFixed();
	init_precisionPrefix();
	init_precisionRound();
}));
//#endregion
//#region node_modules/d3-scale/src/tickFormat.js
function tickFormat(start, stop, count, specifier) {
	var step = tickStep(start, stop, count), precision;
	specifier = formatSpecifier(specifier == null ? ",f" : specifier);
	switch (specifier.type) {
		case "s":
			var value = Math.max(Math.abs(start), Math.abs(stop));
			if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
			return formatPrefix(specifier, value);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
			break;
		case "f":
		case "%":
			if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
			break;
	}
	return format(specifier);
}
var init_tickFormat = __esmMin((() => {
	init_src$6();
	init_src$3();
}));
//#endregion
//#region node_modules/d3-scale/src/linear.js
function linearish(scale) {
	var domain = scale.domain;
	scale.ticks = function(count) {
		var d = domain();
		return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	};
	scale.tickFormat = function(count, specifier) {
		var d = domain();
		return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
	};
	scale.nice = function(count) {
		if (count == null) count = 10;
		var d = domain();
		var i0 = 0;
		var i1 = d.length - 1;
		var start = d[i0];
		var stop = d[i1];
		var prestep;
		var step;
		var maxIter = 10;
		if (stop < start) {
			step = start, start = stop, stop = step;
			step = i0, i0 = i1, i1 = step;
		}
		while (maxIter-- > 0) {
			step = tickIncrement(start, stop, count);
			if (step === prestep) {
				d[i0] = start;
				d[i1] = stop;
				return domain(d);
			} else if (step > 0) {
				start = Math.floor(start / step) * step;
				stop = Math.ceil(stop / step) * step;
			} else if (step < 0) {
				start = Math.ceil(start * step) / step;
				stop = Math.floor(stop * step) / step;
			} else break;
			prestep = step;
		}
		return scale;
	};
	return scale;
}
function linear() {
	var scale = continuous();
	scale.copy = function() {
		return copy$1(scale, linear());
	};
	initRange.apply(scale, arguments);
	return linearish(scale);
}
var init_linear = __esmMin((() => {
	init_src$6();
	init_continuous();
	init_init();
	init_tickFormat();
}));
//#endregion
//#region node_modules/d3-scale/src/identity.js
function identity(domain) {
	var unknown;
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : x;
	}
	scale.invert = scale;
	scale.domain = scale.range = function(_) {
		return arguments.length ? (domain = Array.from(_, number$1), scale) : domain.slice();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return identity(domain).unknown(unknown);
	};
	domain = arguments.length ? Array.from(domain, number$1) : [0, 1];
	return linearish(scale);
}
var init_identity = __esmMin((() => {
	init_linear();
	init_number();
}));
//#endregion
//#region node_modules/d3-scale/src/nice.js
function nice(domain, interval) {
	domain = domain.slice();
	var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
	if (x1 < x0) {
		t = i0, i0 = i1, i1 = t;
		t = x0, x0 = x1, x1 = t;
	}
	domain[i0] = interval.floor(x0);
	domain[i1] = interval.ceil(x1);
	return domain;
}
var init_nice = __esmMin((() => {}));
//#endregion
//#region node_modules/d3-scale/src/log.js
function transformLog(x) {
	return Math.log(x);
}
function transformExp(x) {
	return Math.exp(x);
}
function transformLogn(x) {
	return -Math.log(-x);
}
function transformExpn(x) {
	return -Math.exp(-x);
}
function pow10(x) {
	return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}
function powp(base) {
	return base === 10 ? pow10 : base === Math.E ? Math.exp : (x) => Math.pow(base, x);
}
function logp(base) {
	return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x) => Math.log(x) / base);
}
function reflect(f) {
	return (x, k) => -f(-x, k);
}
function loggish(transform) {
	const scale = transform(transformLog, transformExp);
	const domain = scale.domain;
	let base = 10;
	let logs;
	let pows;
	function rescale() {
		logs = logp(base), pows = powp(base);
		if (domain()[0] < 0) {
			logs = reflect(logs), pows = reflect(pows);
			transform(transformLogn, transformExpn);
		} else transform(transformLog, transformExp);
		return scale;
	}
	scale.base = function(_) {
		return arguments.length ? (base = +_, rescale()) : base;
	};
	scale.domain = function(_) {
		return arguments.length ? (domain(_), rescale()) : domain();
	};
	scale.ticks = (count) => {
		const d = domain();
		let u = d[0];
		let v = d[d.length - 1];
		const r = v < u;
		if (r) [u, v] = [v, u];
		let i = logs(u);
		let j = logs(v);
		let k;
		let t;
		const n = count == null ? 10 : +count;
		let z = [];
		if (!(base % 1) && j - i < n) {
			i = Math.floor(i), j = Math.ceil(j);
			if (u > 0) for (; i <= j; ++i) for (k = 1; k < base; ++k) {
				t = i < 0 ? k / pows(-i) : k * pows(i);
				if (t < u) continue;
				if (t > v) break;
				z.push(t);
			}
			else for (; i <= j; ++i) for (k = base - 1; k >= 1; --k) {
				t = i > 0 ? k / pows(-i) : k * pows(i);
				if (t < u) continue;
				if (t > v) break;
				z.push(t);
			}
			if (z.length * 2 < n) z = ticks(u, v, n);
		} else z = ticks(i, j, Math.min(j - i, n)).map(pows);
		return r ? z.reverse() : z;
	};
	scale.tickFormat = (count, specifier) => {
		if (count == null) count = 10;
		if (specifier == null) specifier = base === 10 ? "s" : ",";
		if (typeof specifier !== "function") {
			if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
			specifier = format(specifier);
		}
		if (count === Infinity) return specifier;
		const k = Math.max(1, base * count / scale.ticks().length);
		return (d) => {
			let i = d / pows(Math.round(logs(d)));
			if (i * base < base - .5) i *= base;
			return i <= k ? specifier(d) : "";
		};
	};
	scale.nice = () => {
		return domain(nice(domain(), {
			floor: (x) => pows(Math.floor(logs(x))),
			ceil: (x) => pows(Math.ceil(logs(x)))
		}));
	};
	return scale;
}
function log() {
	const scale = loggish(transformer$2()).domain([1, 10]);
	scale.copy = () => copy$1(scale, log()).base(scale.base());
	initRange.apply(scale, arguments);
	return scale;
}
var init_log = __esmMin((() => {
	init_src$6();
	init_src$3();
	init_nice();
	init_continuous();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/symlog.js
function transformSymlog(c) {
	return function(x) {
		return Math.sign(x) * Math.log1p(Math.abs(x / c));
	};
}
function transformSymexp(c) {
	return function(x) {
		return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
	};
}
function symlogish(transform) {
	var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
	scale.constant = function(_) {
		return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
	};
	return linearish(scale);
}
function symlog() {
	var scale = symlogish(transformer$2());
	scale.copy = function() {
		return copy$1(scale, symlog()).constant(scale.constant());
	};
	return initRange.apply(scale, arguments);
}
var init_symlog = __esmMin((() => {
	init_linear();
	init_continuous();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/pow.js
function transformPow(exponent) {
	return function(x) {
		return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	};
}
function transformSqrt(x) {
	return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}
function transformSquare(x) {
	return x < 0 ? -x * x : x * x;
}
function powish(transform) {
	var scale = transform(identity$1, identity$1), exponent = 1;
	function rescale() {
		return exponent === 1 ? transform(identity$1, identity$1) : exponent === .5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
	}
	scale.exponent = function(_) {
		return arguments.length ? (exponent = +_, rescale()) : exponent;
	};
	return linearish(scale);
}
function pow() {
	var scale = powish(transformer$2());
	scale.copy = function() {
		return copy$1(scale, pow()).exponent(scale.exponent());
	};
	initRange.apply(scale, arguments);
	return scale;
}
function sqrt() {
	return pow.apply(null, arguments).exponent(.5);
}
var init_pow = __esmMin((() => {
	init_linear();
	init_continuous();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/radial.js
function square(x) {
	return Math.sign(x) * x * x;
}
function unsquare(x) {
	return Math.sign(x) * Math.sqrt(Math.abs(x));
}
function radial() {
	var squared = continuous(), range = [0, 1], round = false, unknown;
	function scale(x) {
		var y = unsquare(squared(x));
		return isNaN(y) ? unknown : round ? Math.round(y) : y;
	}
	scale.invert = function(y) {
		return squared.invert(square(y));
	};
	scale.domain = function(_) {
		return arguments.length ? (squared.domain(_), scale) : squared.domain();
	};
	scale.range = function(_) {
		return arguments.length ? (squared.range((range = Array.from(_, number$1)).map(square)), scale) : range.slice();
	};
	scale.rangeRound = function(_) {
		return scale.range(_).round(true);
	};
	scale.round = function(_) {
		return arguments.length ? (round = !!_, scale) : round;
	};
	scale.clamp = function(_) {
		return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return radial(squared.domain(), range).round(round).clamp(squared.clamp()).unknown(unknown);
	};
	initRange.apply(scale, arguments);
	return linearish(scale);
}
var init_radial = __esmMin((() => {
	init_continuous();
	init_init();
	init_linear();
	init_number();
}));
//#endregion
//#region node_modules/d3-scale/src/quantile.js
function quantile() {
	var domain = [], range = [], thresholds = [], unknown;
	function rescale() {
		var i = 0, n = Math.max(1, range.length);
		thresholds = new Array(n - 1);
		while (++i < n) thresholds[i - 1] = quantileSorted(domain, i / n);
		return scale;
	}
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
	}
	scale.invertExtent = function(y) {
		var i = range.indexOf(y);
		return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
	};
	scale.domain = function(_) {
		if (!arguments.length) return domain.slice();
		domain = [];
		for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
		domain.sort(ascending);
		return rescale();
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.quantiles = function() {
		return thresholds.slice();
	};
	scale.copy = function() {
		return quantile().domain(domain).range(range).unknown(unknown);
	};
	return initRange.apply(scale, arguments);
}
var init_quantile = __esmMin((() => {
	init_src$6();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/quantize.js
function quantize() {
	var x0 = 0, x1 = 1, n = 1, domain = [.5], range = [0, 1], unknown;
	function scale(x) {
		return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
	}
	function rescale() {
		var i = -1;
		domain = new Array(n);
		while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
		return scale;
	}
	scale.domain = function(_) {
		return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
	};
	scale.range = function(_) {
		return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
	};
	scale.invertExtent = function(y) {
		var i = range.indexOf(y);
		return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : scale;
	};
	scale.thresholds = function() {
		return domain.slice();
	};
	scale.copy = function() {
		return quantize().domain([x0, x1]).range(range).unknown(unknown);
	};
	return initRange.apply(linearish(scale), arguments);
}
var init_quantize = __esmMin((() => {
	init_src$6();
	init_linear();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/threshold.js
function threshold() {
	var domain = [.5], range = [0, 1], unknown, n = 1;
	function scale(x) {
		return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
	}
	scale.domain = function(_) {
		return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
	};
	scale.invertExtent = function(y) {
		var i = range.indexOf(y);
		return [domain[i - 1], domain[i]];
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return threshold().domain(domain).range(range).unknown(unknown);
	};
	return initRange.apply(scale, arguments);
}
var init_threshold = __esmMin((() => {
	init_src$6();
	init_init();
}));
//#endregion
//#region node_modules/d3-time/src/interval.js
function timeInterval(floori, offseti, count, field) {
	function interval(date) {
		return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
	}
	interval.floor = (date) => {
		return floori(date = /* @__PURE__ */ new Date(+date)), date;
	};
	interval.ceil = (date) => {
		return floori(date = /* @__PURE__ */ new Date(date - 1)), offseti(date, 1), floori(date), date;
	};
	interval.round = (date) => {
		const d0 = interval(date), d1 = interval.ceil(date);
		return date - d0 < d1 - date ? d0 : d1;
	};
	interval.offset = (date, step) => {
		return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
	};
	interval.range = (start, stop, step) => {
		const range = [];
		start = interval.ceil(start);
		step = step == null ? 1 : Math.floor(step);
		if (!(start < stop) || !(step > 0)) return range;
		let previous;
		do
			range.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
		while (previous < start && start < stop);
		return range;
	};
	interval.filter = (test) => {
		return timeInterval((date) => {
			if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
		}, (date, step) => {
			if (date >= date) if (step < 0) while (++step <= 0) while (offseti(date, -1), !test(date));
			else while (--step >= 0) while (offseti(date, 1), !test(date));
		});
	};
	if (count) {
		interval.count = (start, end) => {
			t0.setTime(+start), t1.setTime(+end);
			floori(t0), floori(t1);
			return Math.floor(count(t0, t1));
		};
		interval.every = (step) => {
			step = Math.floor(step);
			return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d) => field(d) % step === 0 : (d) => interval.count(0, d) % step === 0);
		};
	}
	return interval;
}
var t0, t1;
var init_interval = __esmMin((() => {
	t0 = /* @__PURE__ */ new Date();
	t1 = /* @__PURE__ */ new Date();
})), millisecond;
var init_millisecond = __esmMin((() => {
	init_interval();
	millisecond = timeInterval(() => {}, (date, step) => {
		date.setTime(+date + step);
	}, (start, end) => {
		return end - start;
	});
	millisecond.every = (k) => {
		k = Math.floor(k);
		if (!isFinite(k) || !(k > 0)) return null;
		if (!(k > 1)) return millisecond;
		return timeInterval((date) => {
			date.setTime(Math.floor(date / k) * k);
		}, (date, step) => {
			date.setTime(+date + step * k);
		}, (start, end) => {
			return (end - start) / k;
		});
	};
	millisecond.range;
}));
//#endregion
//#region node_modules/d3-time/src/duration.js
var durationSecond, durationMinute, durationHour, durationDay, durationWeek, durationMonth, durationYear;
var init_duration = __esmMin((() => {
	durationSecond = 1e3;
	durationMinute = durationSecond * 60;
	durationHour = durationMinute * 60;
	durationDay = durationHour * 24;
	durationWeek = durationDay * 7;
	durationMonth = durationDay * 30;
	durationYear = durationDay * 365;
})), second;
var init_second = __esmMin((() => {
	init_interval();
	init_duration();
	second = timeInterval((date) => {
		date.setTime(date - date.getMilliseconds());
	}, (date, step) => {
		date.setTime(+date + step * durationSecond);
	}, (start, end) => {
		return (end - start) / durationSecond;
	}, (date) => {
		return date.getUTCSeconds();
	});
	second.range;
})), timeMinute, utcMinute;
var init_minute = __esmMin((() => {
	init_interval();
	init_duration();
	timeMinute = timeInterval((date) => {
		date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
	}, (date, step) => {
		date.setTime(+date + step * durationMinute);
	}, (start, end) => {
		return (end - start) / durationMinute;
	}, (date) => {
		return date.getMinutes();
	});
	timeMinute.range;
	utcMinute = timeInterval((date) => {
		date.setUTCSeconds(0, 0);
	}, (date, step) => {
		date.setTime(+date + step * durationMinute);
	}, (start, end) => {
		return (end - start) / durationMinute;
	}, (date) => {
		return date.getUTCMinutes();
	});
	utcMinute.range;
})), timeHour, utcHour;
var init_hour = __esmMin((() => {
	init_interval();
	init_duration();
	timeHour = timeInterval((date) => {
		date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
	}, (date, step) => {
		date.setTime(+date + step * durationHour);
	}, (start, end) => {
		return (end - start) / durationHour;
	}, (date) => {
		return date.getHours();
	});
	timeHour.range;
	utcHour = timeInterval((date) => {
		date.setUTCMinutes(0, 0, 0);
	}, (date, step) => {
		date.setTime(+date + step * durationHour);
	}, (start, end) => {
		return (end - start) / durationHour;
	}, (date) => {
		return date.getUTCHours();
	});
	utcHour.range;
})), timeDay, utcDay, unixDay;
var init_day = __esmMin((() => {
	init_interval();
	init_duration();
	timeDay = timeInterval((date) => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay, (date) => date.getDate() - 1);
	timeDay.range;
	utcDay = timeInterval((date) => {
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCDate(date.getUTCDate() + step);
	}, (start, end) => {
		return (end - start) / durationDay;
	}, (date) => {
		return date.getUTCDate() - 1;
	});
	utcDay.range;
	unixDay = timeInterval((date) => {
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCDate(date.getUTCDate() + step);
	}, (start, end) => {
		return (end - start) / durationDay;
	}, (date) => {
		return Math.floor(date / durationDay);
	});
	unixDay.range;
}));
//#endregion
//#region node_modules/d3-time/src/week.js
function timeWeekday(i) {
	return timeInterval((date) => {
		date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
		date.setHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setDate(date.getDate() + step * 7);
	}, (start, end) => {
		return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
	});
}
function utcWeekday(i) {
	return timeInterval((date) => {
		date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCDate(date.getUTCDate() + step * 7);
	}, (start, end) => {
		return (end - start) / durationWeek;
	});
}
var timeSunday, timeMonday, timeTuesday, timeWednesday, timeThursday, timeFriday, timeSaturday, utcSunday, utcMonday, utcTuesday, utcWednesday, utcThursday, utcFriday, utcSaturday;
var init_week = __esmMin((() => {
	init_interval();
	init_duration();
	timeSunday = timeWeekday(0);
	timeMonday = timeWeekday(1);
	timeTuesday = timeWeekday(2);
	timeWednesday = timeWeekday(3);
	timeThursday = timeWeekday(4);
	timeFriday = timeWeekday(5);
	timeSaturday = timeWeekday(6);
	timeSunday.range;
	timeMonday.range;
	timeTuesday.range;
	timeWednesday.range;
	timeThursday.range;
	timeFriday.range;
	timeSaturday.range;
	utcSunday = utcWeekday(0);
	utcMonday = utcWeekday(1);
	utcTuesday = utcWeekday(2);
	utcWednesday = utcWeekday(3);
	utcThursday = utcWeekday(4);
	utcFriday = utcWeekday(5);
	utcSaturday = utcWeekday(6);
	utcSunday.range;
	utcMonday.range;
	utcTuesday.range;
	utcWednesday.range;
	utcThursday.range;
	utcFriday.range;
	utcSaturday.range;
})), timeMonth, utcMonth;
var init_month = __esmMin((() => {
	init_interval();
	timeMonth = timeInterval((date) => {
		date.setDate(1);
		date.setHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setMonth(date.getMonth() + step);
	}, (start, end) => {
		return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	}, (date) => {
		return date.getMonth();
	});
	timeMonth.range;
	utcMonth = timeInterval((date) => {
		date.setUTCDate(1);
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCMonth(date.getUTCMonth() + step);
	}, (start, end) => {
		return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	}, (date) => {
		return date.getUTCMonth();
	});
	utcMonth.range;
})), timeYear, utcYear;
var init_year = __esmMin((() => {
	init_interval();
	timeYear = timeInterval((date) => {
		date.setMonth(0, 1);
		date.setHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setFullYear(date.getFullYear() + step);
	}, (start, end) => {
		return end.getFullYear() - start.getFullYear();
	}, (date) => {
		return date.getFullYear();
	});
	timeYear.every = (k) => {
		return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
			date.setFullYear(Math.floor(date.getFullYear() / k) * k);
			date.setMonth(0, 1);
			date.setHours(0, 0, 0, 0);
		}, (date, step) => {
			date.setFullYear(date.getFullYear() + step * k);
		});
	};
	timeYear.range;
	utcYear = timeInterval((date) => {
		date.setUTCMonth(0, 1);
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCFullYear(date.getUTCFullYear() + step);
	}, (start, end) => {
		return end.getUTCFullYear() - start.getUTCFullYear();
	}, (date) => {
		return date.getUTCFullYear();
	});
	utcYear.every = (k) => {
		return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
			date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
			date.setUTCMonth(0, 1);
			date.setUTCHours(0, 0, 0, 0);
		}, (date, step) => {
			date.setUTCFullYear(date.getUTCFullYear() + step * k);
		});
	};
	utcYear.range;
}));
//#endregion
//#region node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
	const tickIntervals = [
		[
			second,
			1,
			durationSecond
		],
		[
			second,
			5,
			5 * durationSecond
		],
		[
			second,
			15,
			15 * durationSecond
		],
		[
			second,
			30,
			30 * durationSecond
		],
		[
			minute,
			1,
			durationMinute
		],
		[
			minute,
			5,
			5 * durationMinute
		],
		[
			minute,
			15,
			15 * durationMinute
		],
		[
			minute,
			30,
			30 * durationMinute
		],
		[
			hour,
			1,
			durationHour
		],
		[
			hour,
			3,
			3 * durationHour
		],
		[
			hour,
			6,
			6 * durationHour
		],
		[
			hour,
			12,
			12 * durationHour
		],
		[
			day,
			1,
			durationDay
		],
		[
			day,
			2,
			2 * durationDay
		],
		[
			week,
			1,
			durationWeek
		],
		[
			month,
			1,
			durationMonth
		],
		[
			month,
			3,
			3 * durationMonth
		],
		[
			year,
			1,
			durationYear
		]
	];
	function ticks(start, stop, count) {
		const reverse = stop < start;
		if (reverse) [start, stop] = [stop, start];
		const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
		const ticks = interval ? interval.range(start, +stop + 1) : [];
		return reverse ? ticks.reverse() : ticks;
	}
	function tickInterval(start, stop, count) {
		const target = Math.abs(stop - start) / count;
		const i = bisector(([, , step]) => step).right(tickIntervals, target);
		if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
		if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
		const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
		return t.every(step);
	}
	return [ticks, tickInterval];
}
var utcTicks, utcTickInterval, timeTicks, timeTickInterval;
var init_ticks = __esmMin((() => {
	init_src$6();
	init_duration();
	init_millisecond();
	init_second();
	init_minute();
	init_hour();
	init_day();
	init_week();
	init_month();
	init_year();
	[utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
	[timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);
}));
//#endregion
//#region node_modules/d3-time/src/index.js
var init_src$2 = __esmMin((() => {
	init_interval();
	init_millisecond();
	init_second();
	init_minute();
	init_hour();
	init_day();
	init_week();
	init_month();
	init_year();
	init_ticks();
}));
//#endregion
//#region node_modules/d3-time-format/src/locale.js
function localDate(d) {
	if (0 <= d.y && d.y < 100) {
		var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
		date.setFullYear(d.y);
		return date;
	}
	return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
	if (0 <= d.y && d.y < 100) {
		var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
		date.setUTCFullYear(d.y);
		return date;
	}
	return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m, d) {
	return {
		y,
		m,
		d,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function formatLocale(locale) {
	var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_weekdays = locale.days, locale_shortWeekdays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
	var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
	var formats = {
		"a": formatShortWeekday,
		"A": formatWeekday,
		"b": formatShortMonth,
		"B": formatMonth,
		"c": null,
		"d": formatDayOfMonth,
		"e": formatDayOfMonth,
		"f": formatMicroseconds,
		"g": formatYearISO,
		"G": formatFullYearISO,
		"H": formatHour24,
		"I": formatHour12,
		"j": formatDayOfYear,
		"L": formatMilliseconds,
		"m": formatMonthNumber,
		"M": formatMinutes,
		"p": formatPeriod,
		"q": formatQuarter,
		"Q": formatUnixTimestamp,
		"s": formatUnixTimestampSeconds,
		"S": formatSeconds,
		"u": formatWeekdayNumberMonday,
		"U": formatWeekNumberSunday,
		"V": formatWeekNumberISO,
		"w": formatWeekdayNumberSunday,
		"W": formatWeekNumberMonday,
		"x": null,
		"X": null,
		"y": formatYear,
		"Y": formatFullYear,
		"Z": formatZone,
		"%": formatLiteralPercent
	};
	var utcFormats = {
		"a": formatUTCShortWeekday,
		"A": formatUTCWeekday,
		"b": formatUTCShortMonth,
		"B": formatUTCMonth,
		"c": null,
		"d": formatUTCDayOfMonth,
		"e": formatUTCDayOfMonth,
		"f": formatUTCMicroseconds,
		"g": formatUTCYearISO,
		"G": formatUTCFullYearISO,
		"H": formatUTCHour24,
		"I": formatUTCHour12,
		"j": formatUTCDayOfYear,
		"L": formatUTCMilliseconds,
		"m": formatUTCMonthNumber,
		"M": formatUTCMinutes,
		"p": formatUTCPeriod,
		"q": formatUTCQuarter,
		"Q": formatUnixTimestamp,
		"s": formatUnixTimestampSeconds,
		"S": formatUTCSeconds,
		"u": formatUTCWeekdayNumberMonday,
		"U": formatUTCWeekNumberSunday,
		"V": formatUTCWeekNumberISO,
		"w": formatUTCWeekdayNumberSunday,
		"W": formatUTCWeekNumberMonday,
		"x": null,
		"X": null,
		"y": formatUTCYear,
		"Y": formatUTCFullYear,
		"Z": formatUTCZone,
		"%": formatLiteralPercent
	};
	var parses = {
		"a": parseShortWeekday,
		"A": parseWeekday,
		"b": parseShortMonth,
		"B": parseMonth,
		"c": parseLocaleDateTime,
		"d": parseDayOfMonth,
		"e": parseDayOfMonth,
		"f": parseMicroseconds,
		"g": parseYear,
		"G": parseFullYear,
		"H": parseHour24,
		"I": parseHour24,
		"j": parseDayOfYear,
		"L": parseMilliseconds,
		"m": parseMonthNumber,
		"M": parseMinutes,
		"p": parsePeriod,
		"q": parseQuarter,
		"Q": parseUnixTimestamp,
		"s": parseUnixTimestampSeconds,
		"S": parseSeconds,
		"u": parseWeekdayNumberMonday,
		"U": parseWeekNumberSunday,
		"V": parseWeekNumberISO,
		"w": parseWeekdayNumberSunday,
		"W": parseWeekNumberMonday,
		"x": parseLocaleDate,
		"X": parseLocaleTime,
		"y": parseYear,
		"Y": parseFullYear,
		"Z": parseZone,
		"%": parseLiteralPercent
	};
	formats.x = newFormat(locale_date, formats);
	formats.X = newFormat(locale_time, formats);
	formats.c = newFormat(locale_dateTime, formats);
	utcFormats.x = newFormat(locale_date, utcFormats);
	utcFormats.X = newFormat(locale_time, utcFormats);
	utcFormats.c = newFormat(locale_dateTime, utcFormats);
	function newFormat(specifier, formats) {
		return function(date) {
			var string = [], i = -1, j = 0, n = specifier.length, c, pad, format;
			if (!(date instanceof Date)) date = /* @__PURE__ */ new Date(+date);
			while (++i < n) if (specifier.charCodeAt(i) === 37) {
				string.push(specifier.slice(j, i));
				if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
				else pad = c === "e" ? " " : "0";
				if (format = formats[c]) c = format(date, pad);
				string.push(c);
				j = i + 1;
			}
			string.push(specifier.slice(j, i));
			return string.join("");
		};
	}
	function newParse(specifier, Z) {
		return function(string) {
			var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
			if (i != string.length) return null;
			if ("Q" in d) return new Date(d.Q);
			if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
			if (Z && !("Z" in d)) d.Z = 0;
			if ("p" in d) d.H = d.H % 12 + d.p * 12;
			if (d.m === void 0) d.m = "q" in d ? d.q : 0;
			if ("V" in d) {
				if (d.V < 1 || d.V > 53) return null;
				if (!("w" in d)) d.w = 1;
				if ("Z" in d) {
					week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
					week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
					week = utcDay.offset(week, (d.V - 1) * 7);
					d.y = week.getUTCFullYear();
					d.m = week.getUTCMonth();
					d.d = week.getUTCDate() + (d.w + 6) % 7;
				} else {
					week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
					week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
					week = timeDay.offset(week, (d.V - 1) * 7);
					d.y = week.getFullYear();
					d.m = week.getMonth();
					d.d = week.getDate() + (d.w + 6) % 7;
				}
			} else if ("W" in d || "U" in d) {
				if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
				day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
				d.m = 0;
				d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
			}
			if ("Z" in d) {
				d.H += d.Z / 100 | 0;
				d.M += d.Z % 100;
				return utcDate(d);
			}
			return localDate(d);
		};
	}
	function parseSpecifier(d, specifier, string, j) {
		var i = 0, n = specifier.length, m = string.length, c, parse;
		while (i < n) {
			if (j >= m) return -1;
			c = specifier.charCodeAt(i++);
			if (c === 37) {
				c = specifier.charAt(i++);
				parse = parses[c in pads ? specifier.charAt(i++) : c];
				if (!parse || (j = parse(d, string, j)) < 0) return -1;
			} else if (c != string.charCodeAt(j++)) return -1;
		}
		return j;
	}
	function parsePeriod(d, string, i) {
		var n = periodRe.exec(string.slice(i));
		return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseShortWeekday(d, string, i) {
		var n = shortWeekdayRe.exec(string.slice(i));
		return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseWeekday(d, string, i) {
		var n = weekdayRe.exec(string.slice(i));
		return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseShortMonth(d, string, i) {
		var n = shortMonthRe.exec(string.slice(i));
		return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseMonth(d, string, i) {
		var n = monthRe.exec(string.slice(i));
		return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseLocaleDateTime(d, string, i) {
		return parseSpecifier(d, locale_dateTime, string, i);
	}
	function parseLocaleDate(d, string, i) {
		return parseSpecifier(d, locale_date, string, i);
	}
	function parseLocaleTime(d, string, i) {
		return parseSpecifier(d, locale_time, string, i);
	}
	function formatShortWeekday(d) {
		return locale_shortWeekdays[d.getDay()];
	}
	function formatWeekday(d) {
		return locale_weekdays[d.getDay()];
	}
	function formatShortMonth(d) {
		return locale_shortMonths[d.getMonth()];
	}
	function formatMonth(d) {
		return locale_months[d.getMonth()];
	}
	function formatPeriod(d) {
		return locale_periods[+(d.getHours() >= 12)];
	}
	function formatQuarter(d) {
		return 1 + ~~(d.getMonth() / 3);
	}
	function formatUTCShortWeekday(d) {
		return locale_shortWeekdays[d.getUTCDay()];
	}
	function formatUTCWeekday(d) {
		return locale_weekdays[d.getUTCDay()];
	}
	function formatUTCShortMonth(d) {
		return locale_shortMonths[d.getUTCMonth()];
	}
	function formatUTCMonth(d) {
		return locale_months[d.getUTCMonth()];
	}
	function formatUTCPeriod(d) {
		return locale_periods[+(d.getUTCHours() >= 12)];
	}
	function formatUTCQuarter(d) {
		return 1 + ~~(d.getUTCMonth() / 3);
	}
	return {
		format: function(specifier) {
			var f = newFormat(specifier += "", formats);
			f.toString = function() {
				return specifier;
			};
			return f;
		},
		parse: function(specifier) {
			var p = newParse(specifier += "", false);
			p.toString = function() {
				return specifier;
			};
			return p;
		},
		utcFormat: function(specifier) {
			var f = newFormat(specifier += "", utcFormats);
			f.toString = function() {
				return specifier;
			};
			return f;
		},
		utcParse: function(specifier) {
			var p = newParse(specifier += "", true);
			p.toString = function() {
				return specifier;
			};
			return p;
		}
	};
}
function pad(value, fill, width) {
	var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
	return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
	return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
	return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
	return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 1));
	return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 1));
	return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 4));
	return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
	var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
	return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 1));
	return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 3));
	return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 3));
	return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 6));
	return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
	var n = percentRe.exec(string.slice(i, i + 1));
	return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
	var n = numberRe.exec(string.slice(i));
	return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
	var n = numberRe.exec(string.slice(i));
	return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
	return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
	return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
	return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
	return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
	return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
	return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
	return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
	return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
	return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
	var day = d.getDay();
	return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
	return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
	var day = d.getDay();
	return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
	d = dISO(d);
	return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
	return d.getDay();
}
function formatWeekNumberMonday(d, p) {
	return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
	return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
	d = dISO(d);
	return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
	return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
	var day = d.getDay();
	d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
	return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
	var z = d.getTimezoneOffset();
	return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
	return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
	return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
	return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
	return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
	return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
	return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
	return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
	return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
	return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
	var dow = d.getUTCDay();
	return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
	return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
	var day = d.getUTCDay();
	return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
	d = UTCdISO(d);
	return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
	return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
	return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
	return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
	d = UTCdISO(d);
	return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
	return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
	var day = d.getUTCDay();
	d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
	return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
	return "+0000";
}
function formatLiteralPercent() {
	return "%";
}
function formatUnixTimestamp(d) {
	return +d;
}
function formatUnixTimestampSeconds(d) {
	return Math.floor(+d / 1e3);
}
var pads, numberRe, percentRe, requoteRe;
var init_locale = __esmMin((() => {
	init_src$2();
	pads = {
		"-": "",
		"_": " ",
		"0": "0"
	};
	numberRe = /^\s*\d+/;
	percentRe = /^%/;
	requoteRe = /[\\^$*+?|[\]().{}]/g;
}));
//#endregion
//#region node_modules/d3-time-format/src/defaultLocale.js
function defaultLocale(definition) {
	locale = formatLocale(definition);
	timeFormat = locale.format;
	timeParse = locale.parse;
	utcFormat = locale.utcFormat;
	utcParse = locale.utcParse;
	return locale;
}
var locale, timeFormat, timeParse, utcFormat, utcParse;
var init_defaultLocale = __esmMin((() => {
	init_locale();
	defaultLocale({
		dateTime: "%x, %X",
		date: "%-m/%-d/%Y",
		time: "%-I:%M:%S %p",
		periods: ["AM", "PM"],
		days: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		],
		shortDays: [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		],
		months: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		shortMonths: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		]
	});
}));
//#endregion
//#region node_modules/d3-time-format/src/index.js
var init_src$1 = __esmMin((() => {
	init_defaultLocale();
	init_locale();
}));
//#endregion
//#region node_modules/d3-scale/src/time.js
function date(t) {
	return new Date(t);
}
function number(t) {
	return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
	var scale = continuous(), invert = scale.invert, domain = scale.domain;
	var formatMillisecond = format(".%L"), formatSecond = format(":%S"), formatMinute = format("%I:%M"), formatHour = format("%I %p"), formatDay = format("%a %d"), formatWeek = format("%b %d"), formatMonth = format("%B"), formatYear = format("%Y");
	function tickFormat(date) {
		return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
	}
	scale.invert = function(y) {
		return new Date(invert(y));
	};
	scale.domain = function(_) {
		return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
	};
	scale.ticks = function(interval) {
		var d = domain();
		return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
	};
	scale.tickFormat = function(count, specifier) {
		return specifier == null ? tickFormat : format(specifier);
	};
	scale.nice = function(interval) {
		var d = domain();
		if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
		return interval ? domain(nice(d, interval)) : scale;
	};
	scale.copy = function() {
		return copy$1(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
	};
	return scale;
}
function time() {
	return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var init_time = __esmMin((() => {
	init_src$2();
	init_src$1();
	init_continuous();
	init_init();
	init_nice();
}));
//#endregion
//#region node_modules/d3-scale/src/utcTime.js
function utcTime() {
	return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
var init_utcTime = __esmMin((() => {
	init_src$2();
	init_src$1();
	init_time();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/sequential.js
function transformer$1() {
	var x0 = 0, x1 = 1, t0, t1, k10, transform, interpolator = identity$1, clamp = false, unknown;
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? .5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
	}
	scale.domain = function(_) {
		return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
	};
	scale.clamp = function(_) {
		return arguments.length ? (clamp = !!_, scale) : clamp;
	};
	scale.interpolator = function(_) {
		return arguments.length ? (interpolator = _, scale) : interpolator;
	};
	function range(interpolate) {
		return function(_) {
			var r0, r1;
			return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
		};
	}
	scale.range = range(value_default);
	scale.rangeRound = range(round_default);
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	return function(t) {
		transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
		return scale;
	};
}
function copy(source, target) {
	return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
	var scale = linearish(transformer$1()(identity$1));
	scale.copy = function() {
		return copy(scale, sequential());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialLog() {
	var scale = loggish(transformer$1()).domain([1, 10]);
	scale.copy = function() {
		return copy(scale, sequentialLog()).base(scale.base());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialSymlog() {
	var scale = symlogish(transformer$1());
	scale.copy = function() {
		return copy(scale, sequentialSymlog()).constant(scale.constant());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialPow() {
	var scale = powish(transformer$1());
	scale.copy = function() {
		return copy(scale, sequentialPow()).exponent(scale.exponent());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialSqrt() {
	return sequentialPow.apply(null, arguments).exponent(.5);
}
var init_sequential = __esmMin((() => {
	init_src$4();
	init_continuous();
	init_init();
	init_linear();
	init_log();
	init_symlog();
	init_pow();
}));
//#endregion
//#region node_modules/d3-scale/src/sequentialQuantile.js
function sequentialQuantile() {
	var domain = [], interpolator = identity$1;
	function scale(x) {
		if (x != null && !isNaN(x = +x)) return interpolator((bisectRight(domain, x, 1) - 1) / (domain.length - 1));
	}
	scale.domain = function(_) {
		if (!arguments.length) return domain.slice();
		domain = [];
		for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
		domain.sort(ascending);
		return scale;
	};
	scale.interpolator = function(_) {
		return arguments.length ? (interpolator = _, scale) : interpolator;
	};
	scale.range = function() {
		return domain.map((d, i) => interpolator(i / (domain.length - 1)));
	};
	scale.quantiles = function(n) {
		return Array.from({ length: n + 1 }, (_, i) => quantile$1(domain, i / n));
	};
	scale.copy = function() {
		return sequentialQuantile(interpolator).domain(domain);
	};
	return initInterpolator.apply(scale, arguments);
}
var init_sequentialQuantile = __esmMin((() => {
	init_src$6();
	init_continuous();
	init_init();
}));
//#endregion
//#region node_modules/d3-scale/src/diverging.js
function transformer() {
	var x0 = 0, x1 = .5, x2 = 1, s = 1, t0, t1, t2, k10, k21, interpolator = identity$1, transform, clamp = false, unknown;
	function scale(x) {
		return isNaN(x = +x) ? unknown : (x = .5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
	}
	scale.domain = function(_) {
		return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : .5 / (t1 - t0), k21 = t1 === t2 ? 0 : .5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [
			x0,
			x1,
			x2
		];
	};
	scale.clamp = function(_) {
		return arguments.length ? (clamp = !!_, scale) : clamp;
	};
	scale.interpolator = function(_) {
		return arguments.length ? (interpolator = _, scale) : interpolator;
	};
	function range(interpolate) {
		return function(_) {
			var r0, r1, r2;
			return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [
				r0,
				r1,
				r2
			]), scale) : [
				interpolator(0),
				interpolator(.5),
				interpolator(1)
			];
		};
	}
	scale.range = range(value_default);
	scale.rangeRound = range(round_default);
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	return function(t) {
		transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : .5 / (t1 - t0), k21 = t1 === t2 ? 0 : .5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
		return scale;
	};
}
function diverging() {
	var scale = linearish(transformer()(identity$1));
	scale.copy = function() {
		return copy(scale, diverging());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingLog() {
	var scale = loggish(transformer()).domain([
		.1,
		1,
		10
	]);
	scale.copy = function() {
		return copy(scale, divergingLog()).base(scale.base());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingSymlog() {
	var scale = symlogish(transformer());
	scale.copy = function() {
		return copy(scale, divergingSymlog()).constant(scale.constant());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingPow() {
	var scale = powish(transformer());
	scale.copy = function() {
		return copy(scale, divergingPow()).exponent(scale.exponent());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingSqrt() {
	return divergingPow.apply(null, arguments).exponent(.5);
}
var init_diverging = __esmMin((() => {
	init_src$4();
	init_continuous();
	init_init();
	init_linear();
	init_log();
	init_sequential();
	init_symlog();
	init_pow();
}));
//#endregion
//#region node_modules/d3-scale/src/index.js
var init_src = __esmMin((() => {
	init_band();
	init_identity();
	init_linear();
	init_log();
	init_symlog();
	init_ordinal();
	init_pow();
	init_radial();
	init_quantile();
	init_quantize();
	init_threshold();
	init_time();
	init_utcTime();
	init_sequential();
	init_sequentialQuantile();
	init_diverging();
	init_tickFormat();
}));
//#endregion
export { number_default as $, init_pow as A, linear as B, threshold as C, quantile as D, init_quantile as E, init_log as F, init_defaultLocale$1 as G, tickFormat as H, log as I, interpolateTransformCss as J, init_src$4 as K, identity as L, sqrt as M, init_symlog as N, init_radial as O, symlog as P, init_number$1 as Q, init_identity as R, init_threshold as S, quantize as T, init_src$3 as U, init_tickFormat as V, format as W, init_string as X, interpolateTransformSvg as Y, string_default as Z, utcTime as _, divergingSqrt as a, band as at, init_src$1 as b, init_sequentialQuantile as c, implicit as ct, sequential as d, init_src$6 as dt, init_rgb as et, sequentialLog as f, init_utcTime as g, sequentialSymlog as h, divergingPow as i, init_color$1 as it, pow as j, radial as k, sequentialQuantile as l, init_ordinal as lt, sequentialSqrt as m, diverging as n, init_src$5 as nt, divergingSymlog as o, init_band as ot, sequentialPow as p, init_transform as q, divergingLog as r, color as rt, init_diverging as s, point as st, init_src as t, rgb_default as tt, init_sequential as u, ordinal as ut, init_time as v, init_quantize as w, init_src$2 as x, time as y, init_linear as z };
