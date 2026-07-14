import{i as e,l as t,o as n,r}from"./preload-helper-Bh_zBiAp.js";import{C as i,T as a,w as o}from"./iframe-6OxXSOP2.js";import{t as s}from"./jsx-runtime-BsCa7uLg.js";var c,l=n((()=>{a(),c=typeof o==`object`&&o&&o.Object===Object&&o})),u,d,f=n((()=>{l(),u=typeof self==`object`&&self&&self.Object===Object&&self,d=c||u||Function(`return this`)()})),p,m=n((()=>{f(),p=d.Symbol}));function h(e){var t=_.call(e,y),n=e[y];try{e[y]=void 0;var r=!0}catch{}var i=v.call(e);return r&&(t?e[y]=n:delete e[y]),i}var g,_,v,y,ee=n((()=>{m(),g=Object.prototype,_=g.hasOwnProperty,v=g.toString,y=p?p.toStringTag:void 0}));function b(e){return te.call(e)}var te,ne=n((()=>{te=Object.prototype.toString}));function re(e){return e==null?e===void 0?ae:ie:oe&&oe in Object(e)?h(e):b(e)}var ie,ae,oe,se=n((()=>{m(),ee(),ne(),ie=`[object Null]`,ae=`[object Undefined]`,oe=p?p.toStringTag:void 0}));function ce(e){return typeof e==`object`&&!!e}var le=n((()=>{}));function ue(e){return typeof e==`symbol`||ce(e)&&re(e)==de}var de,fe=n((()=>{se(),le(),de=`[object Symbol]`}));function pe(e,t){for(var n=-1,r=e==null?0:e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}var me=n((()=>{})),x,S=n((()=>{x=Array.isArray}));function he(e){if(typeof e==`string`)return e;if(x(e))return pe(e,he)+``;if(ue(e))return ve?ve.call(e):``;var t=e+``;return t==`0`&&1/e==-ge?`-0`:t}var ge,_e,ve,ye=n((()=>{m(),me(),S(),fe(),ge=1/0,_e=p?p.prototype:void 0,ve=_e?_e.toString:void 0}));function be(e){for(var t=e.length;t--&&xe.test(e.charAt(t)););return t}var xe,Se=n((()=>{xe=/\s/}));function Ce(e){return e&&e.slice(0,be(e)+1).replace(we,``)}var we,Te=n((()=>{Se(),we=/^\s+/}));function Ee(e){var t=typeof e;return e!=null&&(t==`object`||t==`function`)}var De=n((()=>{}));function Oe(e){if(typeof e==`number`)return e;if(ue(e))return ke;if(Ee(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=Ee(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ce(e);var n=je.test(e);return n||Me.test(e)?Ne(e.slice(2),n?2:8):Ae.test(e)?ke:+e}var ke,Ae,je,Me,Ne,Pe=n((()=>{Te(),De(),fe(),ke=NaN,Ae=/^[-+]0x[0-9a-f]+$/i,je=/^0b[01]+$/i,Me=/^0o[0-7]+$/i,Ne=parseInt}));function Fe(e){return e?(e=Oe(e),e===Ie||e===-Ie?(e<0?-1:1)*Le:e===e?e:0):e===0?e:0}var Ie,Le,Re=n((()=>{Pe(),Ie=1/0,Le=17976931348623157e292}));function ze(e){var t=Fe(e),n=t%1;return t===t?n?t-n:t:0}var Be=n((()=>{Re()}));function Ve(e){return e}var He=n((()=>{}));function Ue(e){if(!Ee(e))return!1;var t=re(e);return t==Ge||t==Ke||t==We||t==qe}var We,Ge,Ke,qe,Je=n((()=>{se(),De(),We=`[object AsyncFunction]`,Ge=`[object Function]`,Ke=`[object GeneratorFunction]`,qe=`[object Proxy]`})),Ye,Xe=n((()=>{f(),Ye=d[`__core-js_shared__`]}));function Ze(e){return!!Qe&&Qe in e}var Qe,$e=n((()=>{Xe(),Qe=function(){var e=/[^.]+$/.exec(Ye&&Ye.keys&&Ye.keys.IE_PROTO||``);return e?`Symbol(src)_1.`+e:``}()}));function C(e){if(e!=null){try{return et.call(e)}catch{}try{return e+``}catch{}}return``}var et,tt=n((()=>{et=Function.prototype.toString}));function nt(e){return!Ee(e)||Ze(e)?!1:(Ue(e)?lt:it).test(C(e))}var rt,it,at,ot,st,ct,lt,ut=n((()=>{Je(),$e(),De(),tt(),rt=/[\\^$.*+?()[\]{}|]/g,it=/^\[object .+?Constructor\]$/,at=Function.prototype,ot=Object.prototype,st=at.toString,ct=ot.hasOwnProperty,lt=RegExp(`^`+st.call(ct).replace(rt,`\\$&`).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,`$1.*?`)+`$`)}));function dt(e,t){return e?.[t]}var ft=n((()=>{}));function pt(e,t){var n=dt(e,t);return nt(n)?n:void 0}var w=n((()=>{ut(),ft()})),mt,ht=n((()=>{w(),f(),mt=pt(d,`WeakMap`)}));function gt(e,t,n,r){for(var i=e.length,a=n+(r?1:-1);r?a--:++a<i;)if(t(e[a],a,e))return a;return-1}var _t=n((()=>{}));function vt(e,t){var n=typeof e;return t??=yt,!!t&&(n==`number`||n!=`symbol`&&bt.test(e))&&e>-1&&e%1==0&&e<t}var yt,bt,xt=n((()=>{yt=9007199254740991,bt=/^(?:0|[1-9]\d*)$/}));function St(e,t){return e===t||e!==e&&t!==t}var Ct=n((()=>{}));function wt(e){return typeof e==`number`&&e>-1&&e%1==0&&e<=Tt}var Tt,Et=n((()=>{Tt=9007199254740991}));function Dt(e){return e!=null&&wt(e.length)&&!Ue(e)}var Ot=n((()=>{Je(),Et()}));function kt(e){var t=e&&e.constructor;return e===(typeof t==`function`&&t.prototype||At)}var At,jt=n((()=>{At=Object.prototype}));function Mt(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}var Nt=n((()=>{}));function Pt(e){return ce(e)&&re(e)==Ft}var Ft,It=n((()=>{se(),le(),Ft=`[object Arguments]`})),Lt,Rt,zt,Bt,Vt=n((()=>{It(),le(),Lt=Object.prototype,Rt=Lt.hasOwnProperty,zt=Lt.propertyIsEnumerable,Bt=Pt(function(){return arguments}())?Pt:function(e){return ce(e)&&Rt.call(e,`callee`)&&!zt.call(e,`callee`)}}));function Ht(){return!1}var Ut=n((()=>{})),Wt,Gt,Kt,qt,Jt=n((()=>{f(),Ut(),Wt=typeof exports==`object`&&exports&&!exports.nodeType&&exports,Gt=Wt&&typeof module==`object`&&module&&!module.nodeType&&module,Kt=Gt&&Gt.exports===Wt?d.Buffer:void 0,qt=(Kt?Kt.isBuffer:void 0)||Ht}));function Yt(e){return ce(e)&&wt(e.length)&&!!T[re(e)]}var Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,T,xn=n((()=>{se(),Et(),le(),Xt=`[object Arguments]`,Zt=`[object Array]`,Qt=`[object Boolean]`,$t=`[object Date]`,en=`[object Error]`,tn=`[object Function]`,nn=`[object Map]`,rn=`[object Number]`,an=`[object Object]`,on=`[object RegExp]`,sn=`[object Set]`,cn=`[object String]`,ln=`[object WeakMap]`,un=`[object ArrayBuffer]`,dn=`[object DataView]`,fn=`[object Float32Array]`,pn=`[object Float64Array]`,mn=`[object Int8Array]`,hn=`[object Int16Array]`,gn=`[object Int32Array]`,_n=`[object Uint8Array]`,vn=`[object Uint8ClampedArray]`,yn=`[object Uint16Array]`,bn=`[object Uint32Array]`,T={},T[fn]=T[pn]=T[mn]=T[hn]=T[gn]=T[_n]=T[vn]=T[yn]=T[bn]=!0,T[Xt]=T[Zt]=T[un]=T[Qt]=T[dn]=T[$t]=T[en]=T[tn]=T[nn]=T[rn]=T[an]=T[on]=T[sn]=T[cn]=T[ln]=!1}));function Sn(e){return function(t){return e(t)}}var Cn=n((()=>{})),wn,Tn,En,Dn,On=n((()=>{l(),wn=typeof exports==`object`&&exports&&!exports.nodeType&&exports,Tn=wn&&typeof module==`object`&&module&&!module.nodeType&&module,En=Tn&&Tn.exports===wn&&c.process,Dn=function(){try{return Tn&&Tn.require&&Tn.require(`util`).types||En&&En.binding&&En.binding(`util`)}catch{}}()})),kn,An,jn=n((()=>{xn(),Cn(),On(),kn=Dn&&Dn.isTypedArray,An=kn?Sn(kn):Yt}));function Mn(e,t){var n=x(e),r=!n&&Bt(e),i=!n&&!r&&qt(e),a=!n&&!r&&!i&&An(e),o=n||r||i||a,s=o?Mt(e.length,String):[],c=s.length;for(var l in e)(t||Nn.call(e,l))&&!(o&&(l==`length`||i&&(l==`offset`||l==`parent`)||a&&(l==`buffer`||l==`byteLength`||l==`byteOffset`)||vt(l,c)))&&s.push(l);return s}var Nn,Pn=n((()=>{Nt(),Vt(),S(),Jt(),xt(),jn(),Nn=Object.prototype.hasOwnProperty}));function Fn(e,t){return function(n){return e(t(n))}}var In=n((()=>{})),Ln,Rn=n((()=>{In(),Ln=Fn(Object.keys,Object)}));function zn(e){if(!kt(e))return Ln(e);var t=[];for(var n in Object(e))Bn.call(e,n)&&n!=`constructor`&&t.push(n);return t}var Bn,Vn=n((()=>{jt(),Rn(),Bn=Object.prototype.hasOwnProperty}));function Hn(e){return Dt(e)?Mn(e):zn(e)}var Un=n((()=>{Pn(),Vn(),Ot()}));function Wn(e,t){if(x(e))return!1;var n=typeof e;return n==`number`||n==`symbol`||n==`boolean`||e==null||ue(e)?!0:Kn.test(e)||!Gn.test(e)||t!=null&&e in Object(t)}var Gn,Kn,qn=n((()=>{S(),fe(),Gn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Kn=/^\w*$/})),Jn,Yn=n((()=>{w(),Jn=pt(Object,`create`)}));function Xn(){this.__data__=Jn?Jn(null):{},this.size=0}var Zn=n((()=>{Yn()}));function Qn(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=+!!t,t}var $n=n((()=>{}));function er(e){var t=this.__data__;if(Jn){var n=t[e];return n===tr?void 0:n}return nr.call(t,e)?t[e]:void 0}var tr,nr,rr=n((()=>{Yn(),tr=`__lodash_hash_undefined__`,nr=Object.prototype.hasOwnProperty}));function ir(e){var t=this.__data__;return Jn?t[e]!==void 0:ar.call(t,e)}var ar,or=n((()=>{Yn(),ar=Object.prototype.hasOwnProperty}));function sr(e,t){var n=this.__data__;return this.size+=+!this.has(e),n[e]=Jn&&t===void 0?cr:t,this}var cr,lr=n((()=>{Yn(),cr=`__lodash_hash_undefined__`}));function E(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}var ur=n((()=>{Zn(),$n(),rr(),or(),lr(),E.prototype.clear=Xn,E.prototype.delete=Qn,E.prototype.get=er,E.prototype.has=ir,E.prototype.set=sr}));function dr(){this.__data__=[],this.size=0}var fr=n((()=>{}));function pr(e,t){for(var n=e.length;n--;)if(St(e[n][0],t))return n;return-1}var mr=n((()=>{Ct()}));function hr(e){var t=this.__data__,n=pr(t,e);return n<0?!1:(n==t.length-1?t.pop():gr.call(t,n,1),--this.size,!0)}var gr,_r=n((()=>{mr(),gr=Array.prototype.splice}));function vr(e){var t=this.__data__,n=pr(t,e);return n<0?void 0:t[n][1]}var yr=n((()=>{mr()}));function br(e){return pr(this.__data__,e)>-1}var xr=n((()=>{mr()}));function Sr(e,t){var n=this.__data__,r=pr(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}var Cr=n((()=>{mr()}));function D(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}var wr=n((()=>{fr(),_r(),yr(),xr(),Cr(),D.prototype.clear=dr,D.prototype.delete=hr,D.prototype.get=vr,D.prototype.has=br,D.prototype.set=Sr})),Tr,Er=n((()=>{w(),f(),Tr=pt(d,`Map`)}));function Dr(){this.size=0,this.__data__={hash:new E,map:new(Tr||D),string:new E}}var Or=n((()=>{ur(),wr(),Er()}));function kr(e){var t=typeof e;return t==`string`||t==`number`||t==`symbol`||t==`boolean`?e!==`__proto__`:e===null}var Ar=n((()=>{}));function jr(e,t){var n=e.__data__;return kr(t)?n[typeof t==`string`?`string`:`hash`]:n.map}var Mr=n((()=>{Ar()}));function Nr(e){var t=jr(this,e).delete(e);return this.size-=+!!t,t}var Pr=n((()=>{Mr()}));function Fr(e){return jr(this,e).get(e)}var Ir=n((()=>{Mr()}));function Lr(e){return jr(this,e).has(e)}var Rr=n((()=>{Mr()}));function zr(e,t){var n=jr(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}var Br=n((()=>{Mr()}));function O(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}var Vr=n((()=>{Or(),Pr(),Ir(),Rr(),Br(),O.prototype.clear=Dr,O.prototype.delete=Nr,O.prototype.get=Fr,O.prototype.has=Lr,O.prototype.set=zr}));function Hr(e,t){if(typeof e!=`function`||t!=null&&typeof t!=`function`)throw TypeError(Ur);var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],a=n.cache;if(a.has(i))return a.get(i);var o=e.apply(this,r);return n.cache=a.set(i,o)||a,o};return n.cache=new(Hr.Cache||O),n}var Ur,Wr=n((()=>{Vr(),Ur=`Expected a function`,Hr.Cache=O}));function Gr(e){var t=Hr(e,function(e){return n.size===Kr&&n.clear(),e}),n=t.cache;return t}var Kr,qr=n((()=>{Wr(),Kr=500})),Jr,Yr,Xr,Zr=n((()=>{qr(),Jr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Yr=/\\(\\)?/g,Xr=Gr(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(``),e.replace(Jr,function(e,n,r,i){t.push(r?i.replace(Yr,`$1`):n||e)}),t})}));function Qr(e){return e==null?``:he(e)}var $r=n((()=>{ye()}));function ei(e,t){return x(e)?e:Wn(e,t)?[e]:Xr(Qr(e))}var ti=n((()=>{S(),qn(),Zr(),$r()}));function ni(e){if(typeof e==`string`||ue(e))return e;var t=e+``;return t==`0`&&1/e==-ri?`-0`:t}var ri,ii=n((()=>{fe(),ri=1/0}));function ai(e,t){t=ei(t,e);for(var n=0,r=t.length;e!=null&&n<r;)e=e[ni(t[n++])];return n&&n==r?e:void 0}var oi=n((()=>{ti(),ii()}));function si(e,t,n){var r=e==null?void 0:ai(e,t);return r===void 0?n:r}var ci=n((()=>{oi()}));function li(e,t){for(var n=-1,r=t.length,i=e.length;++n<r;)e[i+n]=t[n];return e}var ui=n((()=>{}));function di(){this.__data__=new D,this.size=0}var fi=n((()=>{wr()}));function pi(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}var mi=n((()=>{}));function hi(e){return this.__data__.get(e)}var gi=n((()=>{}));function _i(e){return this.__data__.has(e)}var vi=n((()=>{}));function yi(e,t){var n=this.__data__;if(n instanceof D){var r=n.__data__;if(!Tr||r.length<bi-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new O(r)}return n.set(e,t),this.size=n.size,this}var bi,xi=n((()=>{wr(),Er(),Vr(),bi=200}));function k(e){var t=this.__data__=new D(e);this.size=t.size}var Si=n((()=>{wr(),fi(),mi(),gi(),vi(),xi(),k.prototype.clear=di,k.prototype.delete=pi,k.prototype.get=hi,k.prototype.has=_i,k.prototype.set=yi}));function Ci(e,t){for(var n=-1,r=e==null?0:e.length,i=0,a=[];++n<r;){var o=e[n];t(o,n,e)&&(a[i++]=o)}return a}var wi=n((()=>{}));function Ti(){return[]}var Ei=n((()=>{})),Di,Oi,ki,Ai=n((()=>{wi(),Ei(),Di=Object.prototype.propertyIsEnumerable,Oi=Object.getOwnPropertySymbols,ki=Oi?function(e){return e==null?[]:(e=Object(e),Ci(Oi(e),function(t){return Di.call(e,t)}))}:Ti}));function ji(e,t,n){var r=t(e);return x(e)?r:li(r,n(e))}var Mi=n((()=>{ui(),S()}));function Ni(e){return ji(e,Hn,ki)}var Pi=n((()=>{Mi(),Ai(),Un()})),Fi,Ii=n((()=>{w(),f(),Fi=pt(d,`DataView`)})),Li,Ri=n((()=>{w(),f(),Li=pt(d,`Promise`)})),zi,Bi=n((()=>{w(),f(),zi=pt(d,`Set`)})),Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,A,Qi,$i=n((()=>{Ii(),Er(),Ri(),Bi(),ht(),se(),tt(),Vi=`[object Map]`,Hi=`[object Object]`,Ui=`[object Promise]`,Wi=`[object Set]`,Gi=`[object WeakMap]`,Ki=`[object DataView]`,qi=C(Fi),Ji=C(Tr),Yi=C(Li),Xi=C(zi),Zi=C(mt),A=re,(Fi&&A(new Fi(new ArrayBuffer(1)))!=Ki||Tr&&A(new Tr)!=Vi||Li&&A(Li.resolve())!=Ui||zi&&A(new zi)!=Wi||mt&&A(new mt)!=Gi)&&(A=function(e){var t=re(e),n=t==Hi?e.constructor:void 0,r=n?C(n):``;if(r)switch(r){case qi:return Ki;case Ji:return Vi;case Yi:return Ui;case Xi:return Wi;case Zi:return Gi}return t}),Qi=A})),ea,ta=n((()=>{f(),ea=d.Uint8Array}));function na(e){return this.__data__.set(e,ra),this}var ra,ia=n((()=>{ra=`__lodash_hash_undefined__`}));function aa(e){return this.__data__.has(e)}var oa=n((()=>{}));function sa(e){var t=-1,n=e==null?0:e.length;for(this.__data__=new O;++t<n;)this.add(e[t])}var ca=n((()=>{Vr(),ia(),oa(),sa.prototype.add=sa.prototype.push=na,sa.prototype.has=aa}));function la(e,t){for(var n=-1,r=e==null?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}var ua=n((()=>{}));function da(e,t){return e.has(t)}var fa=n((()=>{}));function pa(e,t,n,r,i,a){var o=n&ma,s=e.length,c=t.length;if(s!=c&&!(o&&c>s))return!1;var l=a.get(e),u=a.get(t);if(l&&u)return l==t&&u==e;var d=-1,f=!0,p=n&ha?new sa:void 0;for(a.set(e,t),a.set(t,e);++d<s;){var m=e[d],h=t[d];if(r)var g=o?r(h,m,d,t,e,a):r(m,h,d,e,t,a);if(g!==void 0){if(g)continue;f=!1;break}if(p){if(!la(t,function(e,t){if(!da(p,t)&&(m===e||i(m,e,n,r,a)))return p.push(t)})){f=!1;break}}else if(!(m===h||i(m,h,n,r,a))){f=!1;break}}return a.delete(e),a.delete(t),f}var ma,ha,ga=n((()=>{ca(),ua(),fa(),ma=1,ha=2}));function _a(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}var va=n((()=>{}));function ya(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}var ba=n((()=>{}));function xa(e,t,n,r,i,a,o){switch(n){case Pa:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case Na:return!(e.byteLength!=t.byteLength||!a(new ea(e),new ea(t)));case wa:case Ta:case Oa:return St(+e,+t);case Ea:return e.name==t.name&&e.message==t.message;case ka:case ja:return e==t+``;case Da:var s=_a;case Aa:var c=r&Sa;if(s||=ya,e.size!=t.size&&!c)return!1;var l=o.get(e);if(l)return l==t;r|=Ca,o.set(e,t);var u=pa(s(e),s(t),r,i,a,o);return o.delete(e),u;case Ma:if(Ia)return Ia.call(e)==Ia.call(t)}return!1}var Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma,Na,Pa,Fa,Ia,La=n((()=>{m(),ta(),Ct(),ga(),va(),ba(),Sa=1,Ca=2,wa=`[object Boolean]`,Ta=`[object Date]`,Ea=`[object Error]`,Da=`[object Map]`,Oa=`[object Number]`,ka=`[object RegExp]`,Aa=`[object Set]`,ja=`[object String]`,Ma=`[object Symbol]`,Na=`[object ArrayBuffer]`,Pa=`[object DataView]`,Fa=p?p.prototype:void 0,Ia=Fa?Fa.valueOf:void 0}));function Ra(e,t,n,r,i,a){var o=n&za,s=Ni(e),c=s.length;if(c!=Ni(t).length&&!o)return!1;for(var l=c;l--;){var u=s[l];if(!(o?u in t:Ba.call(t,u)))return!1}var d=a.get(e),f=a.get(t);if(d&&f)return d==t&&f==e;var p=!0;a.set(e,t),a.set(t,e);for(var m=o;++l<c;){u=s[l];var h=e[u],g=t[u];if(r)var _=o?r(g,h,u,t,e,a):r(h,g,u,e,t,a);if(!(_===void 0?h===g||i(h,g,n,r,a):_)){p=!1;break}m||=u==`constructor`}if(p&&!m){var v=e.constructor,y=t.constructor;v!=y&&`constructor`in e&&`constructor`in t&&!(typeof v==`function`&&v instanceof v&&typeof y==`function`&&y instanceof y)&&(p=!1)}return a.delete(e),a.delete(t),p}var za,Ba,Va=n((()=>{Pi(),za=1,Ba=Object.prototype.hasOwnProperty}));function Ha(e,t,n,r,i,a){var o=x(e),s=x(t),c=o?Ga:Qi(e),l=s?Ga:Qi(t);c=c==Wa?Ka:c,l=l==Wa?Ka:l;var u=c==Ka,d=l==Ka,f=c==l;if(f&&qt(e)){if(!qt(t))return!1;o=!0,u=!1}if(f&&!u)return a||=new k,o||An(e)?pa(e,t,n,r,i,a):xa(e,t,c,n,r,i,a);if(!(n&Ua)){var p=u&&qa.call(e,`__wrapped__`),m=d&&qa.call(t,`__wrapped__`);if(p||m){var h=p?e.value():e,g=m?t.value():t;return a||=new k,i(h,g,n,r,a)}}return f?(a||=new k,Ra(e,t,n,r,i,a)):!1}var Ua,Wa,Ga,Ka,qa,Ja=n((()=>{Si(),ga(),La(),Va(),$i(),S(),Jt(),jn(),Ua=1,Wa=`[object Arguments]`,Ga=`[object Array]`,Ka=`[object Object]`,qa=Object.prototype.hasOwnProperty}));function Ya(e,t,n,r,i){return e===t?!0:e==null||t==null||!ce(e)&&!ce(t)?e!==e&&t!==t:Ha(e,t,n,r,Ya,i)}var Xa=n((()=>{Ja(),le()}));function Za(e,t,n,r){var i=n.length,a=i,o=!r;if(e==null)return!a;for(e=Object(e);i--;){var s=n[i];if(o&&s[2]?s[1]!==e[s[0]]:!(s[0]in e))return!1}for(;++i<a;){s=n[i];var c=s[0],l=e[c],u=s[1];if(o&&s[2]){if(l===void 0&&!(c in e))return!1}else{var d=new k;if(r)var f=r(l,u,c,e,t,d);if(!(f===void 0?Ya(u,l,Qa|$a,r,d):f))return!1}}return!0}var Qa,$a,eo=n((()=>{Si(),Xa(),Qa=1,$a=2}));function to(e){return e===e&&!Ee(e)}var no=n((()=>{De()}));function ro(e){for(var t=Hn(e),n=t.length;n--;){var r=t[n],i=e[r];t[n]=[r,i,to(i)]}return t}var io=n((()=>{no(),Un()}));function ao(e,t){return function(n){return n==null?!1:n[e]===t&&(t!==void 0||e in Object(n))}}var oo=n((()=>{}));function so(e){var t=ro(e);return t.length==1&&t[0][2]?ao(t[0][0],t[0][1]):function(n){return n===e||Za(n,e,t)}}var co=n((()=>{eo(),io(),oo()}));function lo(e,t){return e!=null&&t in Object(e)}var uo=n((()=>{}));function fo(e,t,n){t=ei(t,e);for(var r=-1,i=t.length,a=!1;++r<i;){var o=ni(t[r]);if(!(a=e!=null&&n(e,o)))break;e=e[o]}return a||++r!=i?a:(i=e==null?0:e.length,!!i&&wt(i)&&vt(o,i)&&(x(e)||Bt(e)))}var po=n((()=>{ti(),Vt(),S(),xt(),Et(),ii()}));function mo(e,t){return e!=null&&fo(e,t,lo)}var ho=n((()=>{uo(),po()}));function go(e,t){return Wn(e)&&to(t)?ao(ni(e),t):function(n){var r=si(n,e);return r===void 0&&r===t?mo(n,e):Ya(t,r,_o|vo)}}var _o,vo,yo=n((()=>{Xa(),ci(),ho(),qn(),no(),oo(),ii(),_o=1,vo=2}));function bo(e){return function(t){return t?.[e]}}var xo=n((()=>{}));function So(e){return function(t){return ai(t,e)}}var Co=n((()=>{oi()}));function wo(e){return Wn(e)?bo(ni(e)):So(e)}var To=n((()=>{xo(),Co(),qn(),ii()}));function Eo(e){return typeof e==`function`?e:e==null?Ve:typeof e==`object`?x(e)?go(e[0],e[1]):so(e):wo(e)}var Do=n((()=>{co(),yo(),He(),S(),To()}));function Oo(e){return function(t,n,r){var i=Object(t);if(!Dt(t)){var a=Eo(n,3);t=Hn(t),n=function(e){return a(i[e],e,i)}}var o=e(t,n,r);return o>-1?i[a?t[o]:o]:void 0}}var ko=n((()=>{Do(),Ot(),Un()}));function Ao(e,t,n){var r=e==null?0:e.length;if(!r)return-1;var i=n==null?0:ze(n);return i<0&&(i=jo(r+i,0)),gt(e,Eo(t,3),i)}var jo,Mo=n((()=>{_t(),Do(),Be(),jo=Math.max})),No,Po=n((()=>{ko(),Mo(),No=Oo(Ao)}));function Fo(e){var t=++Io;return Qr(e)+t}var Io,Lo=n((()=>{$r(),Io=0})),Ro=n((()=>{fe(),ye(),Be(),He(),ht(),De(),f(),S(),le(),w(),_t(),xt(),Ct(),Ot(),jt(),Un(),Pn(),ci(),ui(),m(),Vt(),se(),In(),ii(),$r(),Pe(),Si(),Ai(),Ei(),Pi(),Mi(),$i(),ta(),Jt(),Cn(),On(),me(),Do(),Je(),jn(),ca(),fa(),va(),wi(),Po(),Mo(),ko(),po(),ho(),Re(),ti(),oi(),Vn(),Xa(),Et(),eo(),io(),ut(),Xe(),Ut(),co(),yo(),Wr(),ba(),ua(),xo(),To(),Nt(),Zr(),Te(),Se(),Bi(),Lo()}));function zo(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Bo(e){if(Array.isArray(e))return e}function Vo(e){if(Array.isArray(e))return zo(e)}function Ho(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function Uo(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,$o(r.key),r)}}function Wo(e,t,n){return t&&Uo(e.prototype,t),n&&Uo(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function Go(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=ts(e))||t&&e&&typeof e.length==`number`){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function j(e,t,n){return(t=$o(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ko(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function qo(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function Jo(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Yo(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Xo(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Xo(Object(n),!0).forEach(function(t){j(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Xo(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Zo(e,t){return Bo(e)||qo(e,t)||ts(e,t)||Jo()}function N(e){return Vo(e)||Ko(e)||ts(e)||Yo()}function Qo(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function $o(e){var t=Qo(e,`string`);return typeof t==`symbol`?t:t+``}function es(e){"@babel/helpers - typeof";return es=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},es(e)}function ts(e,t){if(e){if(typeof e==`string`)return zo(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?zo(e,t):void 0}}function ns(e){return new Proxy(e,{get:function(e,t){return t in e?e[t]:e[V]}})}function rs(e){var t=z.querySelector(`script[`+e+`]`);if(t)return t.getAttribute(e)}function is(e){return e===``?!0:e===`false`?!1:e===`true`?!0:e}function as(e){return Tu.push(e),function(){Tu.splice(Tu.indexOf(e),1)}}function os(e){if(!(!e||!B)){var t=z.createElement(`style`);t.setAttribute(`type`,`text/css`),t.innerHTML=e;for(var n=z.head.childNodes,r=null,i=n.length-1;i>-1;i--){var a=n[i],o=(a.tagName||``).toUpperCase();[`STYLE`,`LINK`].indexOf(o)>-1&&(r=a)}return z.head.insertBefore(t,r),e}}function ss(){for(var e=12,t=``;e-- >0;)t+=Eu[Math.random()*62|0];return t}function cs(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function ls(e){return e.classList?cs(e.classList):(e.getAttribute(`class`)||``).split(` `).filter(function(e){return e})}function us(e){return`${e}`.replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function ds(e){return Object.keys(e||{}).reduce(function(t,n){return t+`${n}="${us(e[n])}" `},``).trim()}function fs(e){return Object.keys(e||{}).reduce(function(t,n){return t+`${n}: ${e[n].trim()};`},``)}function ps(e){return e.size!==q.size||e.x!==q.x||e.y!==q.y||e.rotate!==q.rotate||e.flipX||e.flipY}function ms(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth;return{outer:{transform:`translate(${n/2} 256)`},inner:{transform:`${`translate(${t.x*32}, ${t.y*32}) `} ${`scale(${t.size/16*(t.flipX?-1:1)}, ${t.size/16*(t.flipY?-1:1)}) `} ${`rotate(${t.rotate} 0 0)`}`},path:{transform:`translate(${r/2*-1} -256)`}}}function hs(e){var t=e.transform,n=e.width,r=n===void 0?Ql:n,i=e.height,a=i===void 0?Ql:i,o=e.startCentered,s=o===void 0?!1:o,c=``;return s&&Rc?c+=`translate(${t.x/K-r/2}em, ${t.y/K-a/2}em) `:s?c+=`translate(calc(-50% + ${t.x/K}em), calc(-50% + ${t.y/K}em)) `:c+=`translate(${t.x/K}em, ${t.y/K}em) `,c+=`scale(${t.size/K*(t.flipX?-1:1)}, ${t.size/K*(t.flipY?-1:1)}) `,c+=`rotate(${t.rotate}deg) `,c}function gs(){var e=$l,t=eu,n=G.cssPrefix,r=G.replacementClass,i=Du;if(n!==e||r!==t){var a=RegExp(`\\.${e}\\-`,`g`),o=RegExp(`\\--${e}\\-`,`g`),s=RegExp(`\\.${t}`,`g`);i=i.replace(a,`.${n}-`).replace(o,`--${n}-`).replace(s,`.${r}`)}return i}function _s(){G.autoAddCss&&!Ou&&(os(gs()),Ou=!0)}function vs(e){B&&(Mu?setTimeout(e,0):Au.push(e))}function ys(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,i=e.children,a=i===void 0?[]:i;return typeof e==`string`?us(e):`<${t} ${ds(r)}>${a.map(ys).join(``)}</${t}>`}function bs(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}function xs(e){return N(e).length===1?e.codePointAt(0).toString(16):null}function Ss(e){return Object.keys(e).reduce(function(t,n){var r=e[n];return r.icon?t[r.iconName]=r.icon:t[n]=r,t},{})}function Cs(e,t){var n=(arguments.length>2&&arguments[2]!==void 0?arguments[2]:{}).skipHooks,r=n===void 0?!1:n,i=Ss(t);typeof Y.hooks.addPack==`function`&&!r?Y.hooks.addPack(e,Ss(t)):Y.styles[e]=M(M({},Y.styles[e]||{}),i),e===`fas`&&Cs(`fa`,t)}function ws(e){return~Su.indexOf(e)}function Ts(e,t){var n=t.split(`-`),r=n[0],i=n.slice(1).join(`-`);return r===e&&i!==``&&!ws(i)?i:null}function Es(e,t){return(Bu[e]||{})[t]}function Ds(e,t){return(Vu[e]||{})[t]}function P(e,t){return(Wu[e]||{})[t]}function Os(e){return Hu[e]||{prefix:null,iconName:null}}function ks(e){var t=Uu[e],n=Es(`fas`,e);return t||(n?{prefix:`fas`,iconName:n}:null)||{prefix:null,iconName:null}}function F(){return zu}function As(e){var t=V,n=Lu.reduce(function(e,t){return e[t]=`${G.cssPrefix}-${t}`,e},{});return Ol.forEach(function(r){(e.includes(n[r])||e.some(function(e){return Ru[r].includes(e)}))&&(t=r)}),t}function js(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).family,n=t===void 0?V:t,r=du[n][e];if(n===Gc&&!e)return`fad`;var i=pu[n][e]||pu[n][r],a=e in Y.styles?e:null;return i||a||null}function Ms(e){var t=[],n=null;return e.forEach(function(e){var r=Ts(G.cssPrefix,e);r?n=r:e&&t.push(e)}),{iconName:n,rest:t}}function Ns(e){return e.sort().filter(function(e,t,n){return n.indexOf(e)===t})}function Ps(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).skipLookups,n=t===void 0?!1:t,r=null,i=Ns(e.filter(function(e){return qu.includes(e)})),a=Ns(e.filter(function(e){return!qu.includes(e)})),o=Zo(i.filter(function(e){return r=e,!Wc.includes(e)}),1)[0],s=o===void 0?null:o,c=As(i),l=M(M({},Ms(a)),{},{prefix:js(s,{family:c})});return M(M(M({},l),Is({values:e,family:c,styles:Fu,config:G,canonical:l,givenPrefix:r})),Fs(n,r,l))}function Fs(e,t,n){var r=n.prefix,i=n.iconName;if(e||!r||!i)return{prefix:r,iconName:i};var a=t===`fa`?Os(i):{},o=P(r,i);return i=a.iconName||o||i,r=a.prefix||r,r===`far`&&!Fu.far&&Fu.fas&&!G.autoFetchSvg&&(r=`fas`),{prefix:r,iconName:i}}function Is(e){var t=e.values,n=e.family,r=e.canonical,i=e.givenPrefix,a=i===void 0?``:i,o=e.styles,s=o===void 0?{}:o,c=e.config,l=c===void 0?{}:c,u=n===Gc,d=t.includes(`fa-duotone`)||t.includes(`fad`),f=l.familyDefault===`duotone`,p=r.prefix===`fad`||r.prefix===`fa-duotone`;return!u&&(d||f||p)&&(r.prefix=`fad`),(t.includes(`fa-brands`)||t.includes(`fab`))&&(r.prefix=`fab`),!r.prefix&&Ju.includes(n)&&(Object.keys(s).find(function(e){return Yu.includes(e)})||l.autoFetchSvg)&&(r.prefix=jl.get(n).defaultShortPrefixId,r.iconName=P(r.prefix,r.iconName)||r.iconName),(r.prefix===`fa`||a===`fa`)&&(r.prefix=F()||`fas`),r}function Ls(e,t){var n=t.mixoutsTo;return Zu=e,Qu={},Object.keys($u).forEach(function(e){ed.indexOf(e)===-1&&delete $u[e]}),Zu.forEach(function(e){var t=e.mixout?e.mixout():{};if(Object.keys(t).forEach(function(e){typeof t[e]==`function`&&(n[e]=t[e]),es(t[e])===`object`&&Object.keys(t[e]).forEach(function(r){n[e]||(n[e]={}),n[e][r]=t[e][r]})}),e.hooks){var r=e.hooks();Object.keys(r).forEach(function(e){Qu[e]||(Qu[e]=[]),Qu[e].push(r[e])})}e.provides&&e.provides($u)}),n}function Rs(e,t){var n=[...arguments].slice(2);return(Qu[e]||[]).forEach(function(e){t=e.apply(null,[t].concat(n))}),t}function I(e){var t=[...arguments].slice(1);(Qu[e]||[]).forEach(function(e){e.apply(null,t)})}function L(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return $u[e]?$u[e].apply(null,t):void 0}function zs(e){e.prefix===`fa`&&(e.prefix=`fas`);var t=e.iconName,n=e.prefix||F();if(t)return t=P(n,t)||t,bs(td.definitions,n,t)||bs(Y.styles,n,t)}function Bs(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(e){return ys(e)})}}),Object.defineProperty(e,"node",{get:function(){if(B){var t=z.createElement(`div`);return t.innerHTML=e.html,t.children}}}),e}function Vs(e){var t=e.children,n=e.main,r=e.mask,i=e.attributes,a=e.styles,o=e.transform;if(ps(o)&&n.found&&!r.found){var s={x:n.width/n.height/2,y:.5};i.style=fs(M(M({},a),{},{"transform-origin":`${s.x+o.x/16}em ${s.y+o.y/16}em`}))}return[{tag:`svg`,attributes:i,children:t}]}function Hs(e){var t=e.prefix,n=e.iconName,r=e.children,i=e.attributes,a=e.symbol,o=a===!0?`${t}-${G.cssPrefix}-${n}`:a;return[{tag:`svg`,attributes:{style:`display: none;`},children:[{tag:`symbol`,attributes:M(M({},i),{},{id:o}),children:r}]}]}function Us(e){return[`aria-label`,`aria-labelledby`,`title`,`role`].some(function(t){return t in e})}function Ws(e){var t=e.icons,n=t.main,r=t.mask,i=e.prefix,a=e.iconName,o=e.transform,s=e.symbol,c=e.maskId,l=e.extra,u=e.watchable,d=u===void 0?!1:u,f=r.found?r:n,p=f.width,m=f.height,h=[G.replacementClass,a?`${G.cssPrefix}-${a}`:``].filter(function(e){return l.classes.indexOf(e)===-1}).filter(function(e){return e!==``||!!e}).concat(l.classes).join(` `),g={children:[],attributes:M(M({},l.attributes),{},{"data-prefix":i,"data-icon":a,class:h,role:l.attributes.role||`img`,viewBox:`0 0 ${p} ${m}`})};!Us(l.attributes)&&!l.attributes[`aria-hidden`]&&(g.attributes[`aria-hidden`]=`true`),d&&(g.attributes[U]=``);var _=M(M({},g),{},{prefix:i,iconName:a,main:n,mask:r,maskId:c,transform:o,symbol:s,styles:M({},l.styles)}),v=r.found&&n.found?L(`generateAbstractMask`,_)||{children:[],attributes:{}}:L(`generateAbstractIcon`,_)||{children:[],attributes:{}},y=v.children,ee=v.attributes;return _.children=y,_.attributes=ee,s?Hs(_):Vs(_)}function Gs(e){var t=e.content,n=e.width,r=e.height,i=e.transform,a=e.extra,o=e.watchable,s=o===void 0?!1:o,c=M(M({},a.attributes),{},{class:a.classes.join(` `)});s&&(c[U]=``);var l=M({},a.styles);ps(i)&&(l.transform=hs({transform:i,startCentered:!0,width:n,height:r}),l[`-webkit-transform`]=l.transform);var u=fs(l);u.length>0&&(c.style=u);var d=[];return d.push({tag:`span`,attributes:c,children:[t]}),d}function Ks(e){var t=e.content,n=e.extra,r=M(M({},n.attributes),{},{class:n.classes.join(` `)}),i=fs(n.styles);i.length>0&&(r.style=i);var a=[];return a.push({tag:`span`,attributes:r,children:[t]}),a}function qs(e){var t=e[0],n=e[1],r=Zo(e.slice(4),1)[0],i=null;return i=Array.isArray(r)?{tag:`g`,attributes:{class:`${G.cssPrefix}-${xu.GROUP}`},children:[{tag:`path`,attributes:{class:`${G.cssPrefix}-${xu.SECONDARY}`,fill:`currentColor`,d:r[0]}},{tag:`path`,attributes:{class:`${G.cssPrefix}-${xu.PRIMARY}`,fill:`currentColor`,d:r[1]}}]}:{tag:`path`,attributes:{fill:`currentColor`,d:r}},{found:!0,width:t,height:n,icon:i}}function Js(e,t){!lu&&!G.showMissingIcons&&e&&console.error(`Icon with name "${e}" and prefix "${t}" is missing.`)}function Ys(e,t){var n=t;return t===`fa`&&G.styleDefault!==null&&(t=F()),new Promise(function(r,i){if(n===`fa`){var a=Os(e)||{};e=a.iconName||e,t=a.prefix||t}if(e&&t&&rd[t]&&rd[t][e]){var o=rd[t][e];return r(qs(o))}Js(e,t),r(M(M({},id),{},{icon:G.showMissingIcons&&e&&L(`missingIconAbstract`)||{}}))})}function Xs(e){return typeof(e.getAttribute?e.getAttribute(U):null)==`string`}function Zs(e){var t=e.getAttribute?e.getAttribute(ru):null,n=e.getAttribute?e.getAttribute(iu):null;return t&&n}function Qs(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(G.replacementClass)}function $s(){return G.autoReplaceSvg===!0?fd.replace:fd[G.autoReplaceSvg]||fd.replace}function ec(e){return z.createElementNS(`http://www.w3.org/2000/svg`,e)}function tc(e){return z.createElement(e)}function nc(e){var t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).ceFn,n=t===void 0?e.tag===`svg`?ec:tc:t;if(typeof e==`string`)return z.createTextNode(e);var r=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(t){r.setAttribute(t,e.attributes[t])}),(e.children||[]).forEach(function(e){r.appendChild(nc(e,{ceFn:n}))}),r}function rc(e){var t=` ${e.outerHTML} `;return t=`${t}Font Awesome fontawesome.com `,t}function ic(e){e()}function ac(e,t){var n=typeof t==`function`?t:dd;if(e.length===0)n();else{var r=ic;G.mutateApproach===ou&&(r=R.requestAnimationFrame||ic),r(function(){var t=$s(),r=ud.begin(`mutate`);e.map(t),r(),n()})}}function oc(){pd=!0}function sc(){pd=!1}function cc(e){if(Ic&&G.observeMutations){var t=e.treeCallback,n=t===void 0?dd:t,r=e.nodeCallback,i=r===void 0?dd:r,a=e.pseudoElementsCallback,o=a===void 0?dd:a,s=e.observeMutationsRoot,c=s===void 0?z:s;md=new Ic(function(e){if(!pd){var t=F();cs(e).forEach(function(e){if(e.type===`childList`&&e.addedNodes.length>0&&!Xs(e.addedNodes[0])&&(G.searchPseudoElements&&o(e.target),n(e.target)),e.type===`attributes`&&e.target.parentNode&&G.searchPseudoElements&&o([e.target],!0),e.type===`attributes`&&Xs(e.target)&&~bu.indexOf(e.attributeName))if(e.attributeName===`class`&&Zs(e.target)){var r=Ps(ls(e.target)),a=r.prefix,s=r.iconName;e.target.setAttribute(ru,a||t),s&&e.target.setAttribute(iu,s)}else Qs(e.target)&&i(e.target)})}}),B&&md.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function lc(){md&&md.disconnect()}function uc(e){var t=e.getAttribute(`style`),n=[];return t&&(n=t.split(`;`).reduce(function(e,t){var n=t.split(`:`),r=n[0],i=n.slice(1);return r&&i.length>0&&(e[r]=i.join(`:`).trim()),e},{})),n}function dc(e){var t=e.getAttribute(`data-prefix`),n=e.getAttribute(`data-icon`),r=e.innerText===void 0?``:e.innerText.trim(),i=Ps(ls(e));return i.prefix||=F(),t&&n&&(i.prefix=t,i.iconName=n),i.iconName&&i.prefix?i:(i.prefix&&r.length>0&&(i.iconName=Ds(i.prefix,e.innerText)||Es(i.prefix,xs(e.innerText))),!i.iconName&&G.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=e.firstChild.data),i)}function fc(e){return cs(e.attributes).reduce(function(e,t){return e.name!==`class`&&e.name!==`style`&&(e[t.name]=t.value),e},{})}function pc(){return{iconName:null,prefix:null,transform:q,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function mc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=dc(e),r=n.iconName,i=n.prefix,a=n.rest,o=fc(e),s=Rs(`parseNodeAttributes`,{},e);return M({iconName:r,prefix:i,transform:q,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:a,styles:t.styleParser?uc(e):[],attributes:o}},s)}function hc(e){var t=G.autoReplaceSvg===`nest`?mc(e,{styleParser:!1}):mc(e);return~t.extra.classes.indexOf(vu)?L(`generateLayersText`,e,t):L(`generateSvgReplacementMutation`,e,t)}function gc(){return[].concat(N(Nl),N(Kl))}function _c(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!B)return Promise.resolve();var n=z.documentElement.classList,r=function(e){return n.add(`${au}-${e}`)},i=function(e){return n.remove(`${au}-${e}`)},a=G.autoFetchSvg?gc():Wc.concat(Object.keys(hd));a.includes(`fa`)||a.push(`fa`);var o=[`.${vu}:not([${U}])`].concat(a.map(function(e){return`.${e}:not([${U}])`})).join(`, `);if(o.length===0)return Promise.resolve();var s=[];try{s=cs(e.querySelectorAll(o))}catch{}if(s.length>0)r(`pending`),i(`complete`);else return Promise.resolve();var c=ud.begin(`onTree`),l=s.reduce(function(e,t){try{var n=hc(t);n&&e.push(n)}catch(e){lu||e.name===`MissingIcon`&&console.error(e)}return e},[]);return new Promise(function(e,n){Promise.all(l).then(function(n){ac(n,function(){r(`active`),r(`complete`),i(`pending`),typeof t==`function`&&t(),c(),e()})}).catch(function(e){c(),n(e)})})}function vc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;hc(e).then(function(e){e&&ac([e],t)})}function yc(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:zs(t||{}),i=n.mask;return i&&=(i||{}).icon?i:zs(i||{}),e(r,M(M({},n),{},{mask:i}))}}function bc(e){return xs(N(e.replace(xd,``))[0]||``)}function xc(e){var t=e.getPropertyValue(`font-feature-settings`).includes(`ss01`),n=e.getPropertyValue(`content`).replace(xd,``),r=n.codePointAt(0),i=r>=Sd[0]&&r<=Sd[1],a=n.length===2?n[0]===n[1]:!1;return i||a||t}function Sc(e,t){var n=e.replace(/^['"]|['"]$/g,``).toLowerCase(),r=parseInt(t),i=isNaN(r)?`normal`:r;return(wd[n]||{})[i]||Td[n]}function Cc(e,t){var n=`${nu}${t.replace(`:`,`-`)}`;return new Promise(function(r,i){if(e.getAttribute(n)!==null)return r();var a=cs(e.children).filter(function(e){return e.getAttribute(tu)===t})[0],o=R.getComputedStyle(e,t),s=o.getPropertyValue(`font-family`),c=s.match(yu),l=o.getPropertyValue(`font-weight`),u=o.getPropertyValue(`content`);if(a&&!c)return e.removeChild(a),r();if(c&&u!==`none`&&u!==``){var d=o.getPropertyValue(`content`),f=Sc(s,l),p=bc(d),m=c[0].startsWith(`FontAwesome`),h=xc(o),g=Es(f,p),_=g;if(m){var v=ks(p);v.iconName&&v.prefix&&(g=v.iconName,f=v.prefix)}if(g&&!h&&(!a||a.getAttribute(ru)!==f||a.getAttribute(iu)!==_)){e.setAttribute(n,_),a&&e.removeChild(a);var y=pc(),ee=y.extra;ee.attributes[tu]=t,Ys(g,f).then(function(i){var a=Ws(M(M({},y),{},{icons:{main:i,mask:Ku()},prefix:f,iconName:_,extra:ee,watchable:!0})),o=z.createElementNS(`http://www.w3.org/2000/svg`,`svg`);t===`::before`?e.insertBefore(o,e.firstChild):e.appendChild(o),o.outerHTML=a.map(function(e){return ys(e)}).join(`
`),e.removeAttribute(n),r()}).catch(i)}else r()}else r()})}function wc(e){return Promise.all([Cc(e,`::before`),Cc(e,`::after`)])}function Tc(e){return e.parentNode!==document.head&&!~su.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(tu)&&(!e.parentNode||e.parentNode.tagName!==`svg`)}function Ec(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(B){var n;if(t)n=e;else if(G.searchPseudoElementsFullScan)n=e.querySelectorAll(`*`);else{var r=new Set,i=Go(document.styleSheets),a;try{for(i.s();!(a=i.n()).done;){var o=a.value;try{var s=Go(o.cssRules),c;try{for(s.s();!(c=s.n()).done;){var l=c.value,u=Go(Dd(l.selectorText)),d;try{for(u.s();!(d=u.n()).done;){var f=d.value;r.add(f)}}catch(e){u.e(e)}finally{u.f()}}}catch(e){s.e(e)}finally{s.f()}}catch(e){G.searchPseudoElementsWarnings&&console.warn(`Font Awesome: cannot parse stylesheet: ${o.href} (${e.message})
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`)}}}catch(e){i.e(e)}finally{i.f()}if(!r.size)return;var p=Array.from(r).join(`, `);try{n=e.querySelectorAll(p)}catch{}}return new Promise(function(e,t){var r=cs(n).filter(Tc).map(wc),i=ud.begin(`searchPseudoElements`);oc(),Promise.all(r).then(function(){i(),sc(),e()}).catch(function(){i(),sc(),t()})})}}function Dc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill=`black`),e}function Oc(e){return e.tag===`g`?e.children:[e]}var kc,Ac,jc,Mc,Nc,Pc,Fc,R,z,Ic,Lc,B,Rc,zc,Bc,Vc,Hc,Uc,Wc,V,Gc,Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol,sl,cl,ll,ul,dl,fl,pl,ml,hl,gl,_l,vl,yl,bl,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl,Xl,Zl,H,Ql,$l,eu,U,tu,nu,ru,iu,au,ou,su,cu,lu,uu,du,fu,pu,mu,hu,gu,_u,vu,yu,bu,xu,Su,Cu,wu,W,G,Tu,K,q,Eu,Du,Ou,ku,J,Y,Au,ju,Mu,Nu,Pu,Fu,Iu,Lu,Ru,zu,Bu,Vu,Hu,Uu,Wu,Gu,Ku,qu,Ju,Yu,Xu,Zu,Qu,$u,ed,td,X,nd,rd,id,ad,od,sd,cd,ld,ud,dd,fd,pd,md,hd,gd,_d,vd,yd,bd,xd,Sd,Cd,wd,Td,Ed,Dd,Od,kd,Ad,jd,Md,Nd,Pd,Fd,Id,Ld,Rd=n((()=>{kc=function(){},Ac={},jc={},Mc=null,Nc={mark:kc,measure:kc};try{typeof window<`u`&&(Ac=window),typeof document<`u`&&(jc=document),typeof MutationObserver<`u`&&(Mc=MutationObserver),typeof performance<`u`&&(Nc=performance)}catch{}Pc=(Ac.navigator||{}).userAgent,Fc=Pc===void 0?``:Pc,R=Ac,z=jc,Ic=Mc,Lc=Nc,R.document,B=!!z.documentElement&&!!z.head&&typeof z.addEventListener==`function`&&typeof z.createElement==`function`,Rc=~Fc.indexOf(`MSIE`)||~Fc.indexOf(`Trident/`),Bc=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Vc=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,Hc={classic:{fa:`solid`,fas:`solid`,"fa-solid":`solid`,far:`regular`,"fa-regular":`regular`,fal:`light`,"fa-light":`light`,fat:`thin`,"fa-thin":`thin`,fab:`brands`,"fa-brands":`brands`},duotone:{fa:`solid`,fad:`solid`,"fa-solid":`solid`,"fa-duotone":`solid`,fadr:`regular`,"fa-regular":`regular`,fadl:`light`,"fa-light":`light`,fadt:`thin`,"fa-thin":`thin`},sharp:{fa:`solid`,fass:`solid`,"fa-solid":`solid`,fasr:`regular`,"fa-regular":`regular`,fasl:`light`,"fa-light":`light`,fast:`thin`,"fa-thin":`thin`},"sharp-duotone":{fa:`solid`,fasds:`solid`,"fa-solid":`solid`,fasdr:`regular`,"fa-regular":`regular`,fasdl:`light`,"fa-light":`light`,fasdt:`thin`,"fa-thin":`thin`},slab:{"fa-regular":`regular`,faslr:`regular`},"slab-press":{"fa-regular":`regular`,faslpr:`regular`},thumbprint:{"fa-light":`light`,fatl:`light`},whiteboard:{"fa-semibold":`semibold`,fawsb:`semibold`},notdog:{"fa-solid":`solid`,fans:`solid`},"notdog-duo":{"fa-solid":`solid`,fands:`solid`},etch:{"fa-solid":`solid`,faes:`solid`},graphite:{"fa-thin":`thin`,fagt:`thin`},jelly:{"fa-regular":`regular`,fajr:`regular`},"jelly-fill":{"fa-regular":`regular`,fajfr:`regular`},"jelly-duo":{"fa-regular":`regular`,fajdr:`regular`},chisel:{"fa-regular":`regular`,facr:`regular`},utility:{"fa-semibold":`semibold`,fausb:`semibold`},"utility-duo":{"fa-semibold":`semibold`,faudsb:`semibold`},"utility-fill":{"fa-semibold":`semibold`,faufsb:`semibold`}},Uc={GROUP:`duotone-group`,SWAP_OPACITY:`swap-opacity`,PRIMARY:`primary`,SECONDARY:`secondary`},Wc=[`fa-classic`,`fa-duotone`,`fa-sharp`,`fa-sharp-duotone`,`fa-thumbprint`,`fa-whiteboard`,`fa-notdog`,`fa-notdog-duo`,`fa-chisel`,`fa-etch`,`fa-graphite`,`fa-jelly`,`fa-jelly-fill`,`fa-jelly-duo`,`fa-slab`,`fa-slab-press`,`fa-utility`,`fa-utility-duo`,`fa-utility-fill`],V=`classic`,Gc=`duotone`,Kc=`sharp`,qc=`sharp-duotone`,Jc=`chisel`,Yc=`etch`,Xc=`graphite`,Zc=`jelly`,Qc=`jelly-duo`,$c=`jelly-fill`,el=`notdog`,tl=`notdog-duo`,nl=`slab`,rl=`slab-press`,il=`thumbprint`,al=`utility`,ol=`utility-duo`,sl=`utility-fill`,cl=`whiteboard`,ll=`Classic`,ul=`Duotone`,dl=`Sharp`,fl=`Sharp Duotone`,pl=`Chisel`,ml=`Etch`,hl=`Graphite`,gl=`Jelly`,_l=`Jelly Duo`,vl=`Jelly Fill`,yl=`Notdog`,bl=`Notdog Duo`,xl=`Slab`,Sl=`Slab Press`,Cl=`Thumbprint`,wl=`Utility`,Tl=`Utility Duo`,El=`Utility Fill`,Dl=`Whiteboard`,Ol=[V,Gc,Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol,sl,cl],zc={},j(j(j(j(j(j(j(j(j(j(zc,V,ll),Gc,ul),Kc,dl),qc,fl),Jc,pl),Yc,ml),Xc,hl),Zc,gl),Qc,_l),$c,vl),j(j(j(j(j(j(j(j(j(zc,el,yl),tl,bl),nl,xl),rl,Sl),il,Cl),al,wl),ol,Tl),sl,El),cl,Dl),kl={classic:{900:`fas`,400:`far`,normal:`far`,300:`fal`,100:`fat`},duotone:{900:`fad`,400:`fadr`,300:`fadl`,100:`fadt`},sharp:{900:`fass`,400:`fasr`,300:`fasl`,100:`fast`},"sharp-duotone":{900:`fasds`,400:`fasdr`,300:`fasdl`,100:`fasdt`},slab:{400:`faslr`},"slab-press":{400:`faslpr`},whiteboard:{600:`fawsb`},thumbprint:{300:`fatl`},notdog:{900:`fans`},"notdog-duo":{900:`fands`},etch:{900:`faes`},graphite:{100:`fagt`},chisel:{400:`facr`},jelly:{400:`fajr`},"jelly-fill":{400:`fajfr`},"jelly-duo":{400:`fajdr`},utility:{600:`fausb`},"utility-duo":{600:`faudsb`},"utility-fill":{600:`faufsb`}},Al={"Font Awesome 7 Free":{900:`fas`,400:`far`},"Font Awesome 7 Pro":{900:`fas`,400:`far`,normal:`far`,300:`fal`,100:`fat`},"Font Awesome 7 Brands":{400:`fab`,normal:`fab`},"Font Awesome 7 Duotone":{900:`fad`,400:`fadr`,normal:`fadr`,300:`fadl`,100:`fadt`},"Font Awesome 7 Sharp":{900:`fass`,400:`fasr`,normal:`fasr`,300:`fasl`,100:`fast`},"Font Awesome 7 Sharp Duotone":{900:`fasds`,400:`fasdr`,normal:`fasdr`,300:`fasdl`,100:`fasdt`},"Font Awesome 7 Jelly":{400:`fajr`,normal:`fajr`},"Font Awesome 7 Jelly Fill":{400:`fajfr`,normal:`fajfr`},"Font Awesome 7 Jelly Duo":{400:`fajdr`,normal:`fajdr`},"Font Awesome 7 Slab":{400:`faslr`,normal:`faslr`},"Font Awesome 7 Slab Press":{400:`faslpr`,normal:`faslpr`},"Font Awesome 7 Thumbprint":{300:`fatl`,normal:`fatl`},"Font Awesome 7 Notdog":{900:`fans`,normal:`fans`},"Font Awesome 7 Notdog Duo":{900:`fands`,normal:`fands`},"Font Awesome 7 Etch":{900:`faes`,normal:`faes`},"Font Awesome 7 Graphite":{100:`fagt`,normal:`fagt`},"Font Awesome 7 Chisel":{400:`facr`,normal:`facr`},"Font Awesome 7 Whiteboard":{600:`fawsb`,normal:`fawsb`},"Font Awesome 7 Utility":{600:`fausb`,normal:`fausb`},"Font Awesome 7 Utility Duo":{600:`faudsb`,normal:`faudsb`},"Font Awesome 7 Utility Fill":{600:`faufsb`,normal:`faufsb`}},jl=new Map([[`classic`,{defaultShortPrefixId:`fas`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`,`brands`],futureStyleIds:[],defaultFontWeight:900}],[`duotone`,{defaultShortPrefixId:`fad`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`sharp`,{defaultShortPrefixId:`fass`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`sharp-duotone`,{defaultShortPrefixId:`fasds`,defaultStyleId:`solid`,styleIds:[`solid`,`regular`,`light`,`thin`],futureStyleIds:[],defaultFontWeight:900}],[`chisel`,{defaultShortPrefixId:`facr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`etch`,{defaultShortPrefixId:`faes`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`graphite`,{defaultShortPrefixId:`fagt`,defaultStyleId:`thin`,styleIds:[`thin`],futureStyleIds:[],defaultFontWeight:100}],[`jelly`,{defaultShortPrefixId:`fajr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`jelly-duo`,{defaultShortPrefixId:`fajdr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`jelly-fill`,{defaultShortPrefixId:`fajfr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`notdog`,{defaultShortPrefixId:`fans`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`notdog-duo`,{defaultShortPrefixId:`fands`,defaultStyleId:`solid`,styleIds:[`solid`],futureStyleIds:[],defaultFontWeight:900}],[`slab`,{defaultShortPrefixId:`faslr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`slab-press`,{defaultShortPrefixId:`faslpr`,defaultStyleId:`regular`,styleIds:[`regular`],futureStyleIds:[],defaultFontWeight:400}],[`thumbprint`,{defaultShortPrefixId:`fatl`,defaultStyleId:`light`,styleIds:[`light`],futureStyleIds:[],defaultFontWeight:300}],[`utility`,{defaultShortPrefixId:`fausb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`utility-duo`,{defaultShortPrefixId:`faudsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`utility-fill`,{defaultShortPrefixId:`faufsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}],[`whiteboard`,{defaultShortPrefixId:`fawsb`,defaultStyleId:`semibold`,styleIds:[`semibold`],futureStyleIds:[],defaultFontWeight:600}]]),Ml={chisel:{regular:`facr`},classic:{brands:`fab`,light:`fal`,regular:`far`,solid:`fas`,thin:`fat`},duotone:{light:`fadl`,regular:`fadr`,solid:`fad`,thin:`fadt`},etch:{solid:`faes`},graphite:{thin:`fagt`},jelly:{regular:`fajr`},"jelly-duo":{regular:`fajdr`},"jelly-fill":{regular:`fajfr`},notdog:{solid:`fans`},"notdog-duo":{solid:`fands`},sharp:{light:`fasl`,regular:`fasr`,solid:`fass`,thin:`fast`},"sharp-duotone":{light:`fasdl`,regular:`fasdr`,solid:`fasds`,thin:`fasdt`},slab:{regular:`faslr`},"slab-press":{regular:`faslpr`},thumbprint:{light:`fatl`},utility:{semibold:`fausb`},"utility-duo":{semibold:`faudsb`},"utility-fill":{semibold:`faufsb`},whiteboard:{semibold:`fawsb`}},Nl=[`fak`,`fa-kit`,`fakd`,`fa-kit-duotone`],Pl={kit:{fak:`kit`,"fa-kit":`kit`},"kit-duotone":{fakd:`kit-duotone`,"fa-kit-duotone":`kit-duotone`}},Fl=[`kit`],j(j({},`kit`,`Kit`),`kit-duotone`,`Kit Duotone`),Il={kit:{"fa-kit":`fak`},"kit-duotone":{"fa-kit-duotone":`fakd`}},Ll={"Font Awesome Kit":{400:`fak`,normal:`fak`},"Font Awesome Kit Duotone":{400:`fakd`,normal:`fakd`}},Rl={kit:{fak:`fa-kit`},"kit-duotone":{fakd:`fa-kit-duotone`}},zl={kit:{kit:`fak`},"kit-duotone":{"kit-duotone":`fakd`}},Vl={GROUP:`duotone-group`,SWAP_OPACITY:`swap-opacity`,PRIMARY:`primary`,SECONDARY:`secondary`},Hl=[`fa-classic`,`fa-duotone`,`fa-sharp`,`fa-sharp-duotone`,`fa-thumbprint`,`fa-whiteboard`,`fa-notdog`,`fa-notdog-duo`,`fa-chisel`,`fa-etch`,`fa-graphite`,`fa-jelly`,`fa-jelly-fill`,`fa-jelly-duo`,`fa-slab`,`fa-slab-press`,`fa-utility`,`fa-utility-duo`,`fa-utility-fill`],Bl={},j(j(j(j(j(j(j(j(j(j(Bl,`classic`,`Classic`),`duotone`,`Duotone`),`sharp`,`Sharp`),`sharp-duotone`,`Sharp Duotone`),`chisel`,`Chisel`),`etch`,`Etch`),`graphite`,`Graphite`),`jelly`,`Jelly`),`jelly-duo`,`Jelly Duo`),`jelly-fill`,`Jelly Fill`),j(j(j(j(j(j(j(j(j(Bl,`notdog`,`Notdog`),`notdog-duo`,`Notdog Duo`),`slab`,`Slab`),`slab-press`,`Slab Press`),`thumbprint`,`Thumbprint`),`utility`,`Utility`),`utility-duo`,`Utility Duo`),`utility-fill`,`Utility Fill`),`whiteboard`,`Whiteboard`),j(j({},`kit`,`Kit`),`kit-duotone`,`Kit Duotone`),Ul={classic:{"fa-brands":`fab`,"fa-duotone":`fad`,"fa-light":`fal`,"fa-regular":`far`,"fa-solid":`fas`,"fa-thin":`fat`},duotone:{"fa-regular":`fadr`,"fa-light":`fadl`,"fa-thin":`fadt`},sharp:{"fa-solid":`fass`,"fa-regular":`fasr`,"fa-light":`fasl`,"fa-thin":`fast`},"sharp-duotone":{"fa-solid":`fasds`,"fa-regular":`fasdr`,"fa-light":`fasdl`,"fa-thin":`fasdt`},slab:{"fa-regular":`faslr`},"slab-press":{"fa-regular":`faslpr`},whiteboard:{"fa-semibold":`fawsb`},thumbprint:{"fa-light":`fatl`},notdog:{"fa-solid":`fans`},"notdog-duo":{"fa-solid":`fands`},etch:{"fa-solid":`faes`},graphite:{"fa-thin":`fagt`},jelly:{"fa-regular":`fajr`},"jelly-fill":{"fa-regular":`fajfr`},"jelly-duo":{"fa-regular":`fajdr`},chisel:{"fa-regular":`facr`},utility:{"fa-semibold":`fausb`},"utility-duo":{"fa-semibold":`faudsb`},"utility-fill":{"fa-semibold":`faufsb`}},Wl={classic:[`fas`,`far`,`fal`,`fat`,`fad`],duotone:[`fadr`,`fadl`,`fadt`],sharp:[`fass`,`fasr`,`fasl`,`fast`],"sharp-duotone":[`fasds`,`fasdr`,`fasdl`,`fasdt`],slab:[`faslr`],"slab-press":[`faslpr`],whiteboard:[`fawsb`],thumbprint:[`fatl`],notdog:[`fans`],"notdog-duo":[`fands`],etch:[`faes`],graphite:[`fagt`],jelly:[`fajr`],"jelly-fill":[`fajfr`],"jelly-duo":[`fajdr`],chisel:[`facr`],utility:[`fausb`],"utility-duo":[`faudsb`],"utility-fill":[`faufsb`]},Gl={classic:{fab:`fa-brands`,fad:`fa-duotone`,fal:`fa-light`,far:`fa-regular`,fas:`fa-solid`,fat:`fa-thin`},duotone:{fadr:`fa-regular`,fadl:`fa-light`,fadt:`fa-thin`},sharp:{fass:`fa-solid`,fasr:`fa-regular`,fasl:`fa-light`,fast:`fa-thin`},"sharp-duotone":{fasds:`fa-solid`,fasdr:`fa-regular`,fasdl:`fa-light`,fasdt:`fa-thin`},slab:{faslr:`fa-regular`},"slab-press":{faslpr:`fa-regular`},whiteboard:{fawsb:`fa-semibold`},thumbprint:{fatl:`fa-light`},notdog:{fans:`fa-solid`},"notdog-duo":{fands:`fa-solid`},etch:{faes:`fa-solid`},graphite:{fagt:`fa-thin`},jelly:{fajr:`fa-regular`},"jelly-fill":{fajfr:`fa-regular`},"jelly-duo":{fajdr:`fa-regular`},chisel:{facr:`fa-regular`},utility:{fausb:`fa-semibold`},"utility-duo":{faudsb:`fa-semibold`},"utility-fill":{faufsb:`fa-semibold`}},Kl=`fa.fas.far.fal.fat.fad.fadr.fadl.fadt.fab.fass.fasr.fasl.fast.fasds.fasdr.fasdl.fasdt.faslr.faslpr.fawsb.fatl.fans.fands.faes.fagt.fajr.fajfr.fajdr.facr.fausb.faudsb.faufsb`.split(`.`).concat(Hl,[`fa-solid`,`fa-regular`,`fa-light`,`fa-thin`,`fa-duotone`,`fa-brands`,`fa-semibold`]),ql=[`solid`,`regular`,`light`,`thin`,`duotone`,`brands`,`semibold`],Jl=[1,2,3,4,5,6,7,8,9,10],Yl=Jl.concat([11,12,13,14,15,16,17,18,19,20]),Xl=[].concat(N(Object.keys(Wl)),ql,[`aw`,`fw`,`pull-left`,`pull-right`],[`2xs`,`xs`,`sm`,`lg`,`xl`,`2xl`,`beat`,`border`,`fade`,`beat-fade`,`bounce`,`flip-both`,`flip-horizontal`,`flip-vertical`,`flip`,`inverse`,`layers`,`layers-bottom-left`,`layers-bottom-right`,`layers-counter`,`layers-text`,`layers-top-left`,`layers-top-right`,`li`,`pull-end`,`pull-start`,`pulse`,`rotate-180`,`rotate-270`,`rotate-90`,`rotate-by`,`shake`,`spin-pulse`,`spin-reverse`,`spin`,`stack-1x`,`stack-2x`,`stack`,`ul`,`width-auto`,`width-fixed`,Vl.GROUP,Vl.SWAP_OPACITY,Vl.PRIMARY,Vl.SECONDARY],Jl.map(function(e){return`${e}x`}),Yl.map(function(e){return`w-${e}`})),Zl={"Font Awesome 5 Free":{900:`fas`,400:`far`},"Font Awesome 5 Pro":{900:`fas`,400:`far`,normal:`far`,300:`fal`},"Font Awesome 5 Brands":{400:`fab`,normal:`fab`},"Font Awesome 5 Duotone":{900:`fad`}},H=`___FONT_AWESOME___`,Ql=16,$l=`fa`,eu=`svg-inline--fa`,U=`data-fa-i2svg`,tu=`data-fa-pseudo-element`,nu=`data-fa-pseudo-element-pending`,ru=`data-prefix`,iu=`data-icon`,au=`fontawesome-i2svg`,ou=`async`,su=[`HTML`,`HEAD`,`STYLE`,`SCRIPT`],cu=[`::before`,`::after`,`:before`,`:after`],lu=function(){try{return!0}catch{return!1}}(),uu=M({},Hc),uu[V]=M(M(M(M({},{"fa-duotone":`duotone`}),Hc[V]),Pl.kit),Pl[`kit-duotone`]),du=ns(uu),fu=M({},Ml),fu[V]=M(M(M(M({},{duotone:`fad`}),fu[V]),zl.kit),zl[`kit-duotone`]),pu=ns(fu),mu=M({},Gl),mu[V]=M(M({},mu[V]),Rl.kit),hu=ns(mu),gu=M({},Ul),gu[V]=M(M({},gu[V]),Il.kit),ns(gu),_u=Bc,vu=`fa-layers-text`,yu=Vc,ns(M({},kl)),bu=[`class`,`data-prefix`,`data-icon`,`data-fa-transform`,`data-fa-mask`],xu=Uc,Su=[].concat(N(Fl),N(Xl)),Cu=R.FontAwesomeConfig||{},z&&typeof z.querySelector==`function`&&[[`data-family-prefix`,`familyPrefix`],[`data-css-prefix`,`cssPrefix`],[`data-family-default`,`familyDefault`],[`data-style-default`,`styleDefault`],[`data-replacement-class`,`replacementClass`],[`data-auto-replace-svg`,`autoReplaceSvg`],[`data-auto-add-css`,`autoAddCss`],[`data-search-pseudo-elements`,`searchPseudoElements`],[`data-search-pseudo-elements-warnings`,`searchPseudoElementsWarnings`],[`data-search-pseudo-elements-full-scan`,`searchPseudoElementsFullScan`],[`data-observe-mutations`,`observeMutations`],[`data-mutate-approach`,`mutateApproach`],[`data-keep-original-source`,`keepOriginalSource`],[`data-measure-performance`,`measurePerformance`],[`data-show-missing-icons`,`showMissingIcons`]].forEach(function(e){var t=Zo(e,2),n=t[0],r=t[1],i=is(rs(n));i!=null&&(Cu[r]=i)}),wu={styleDefault:`solid`,familyDefault:V,cssPrefix:$l,replacementClass:eu,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:`async`,keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},Cu.familyPrefix&&(Cu.cssPrefix=Cu.familyPrefix),W=M(M({},wu),Cu),W.autoReplaceSvg||(W.observeMutations=!1),G={},Object.keys(wu).forEach(function(e){Object.defineProperty(G,e,{enumerable:!0,set:function(t){W[e]=t,Tu.forEach(function(e){return e(G)})},get:function(){return W[e]}})}),Object.defineProperty(G,"familyPrefix",{enumerable:!0,set:function(e){W.cssPrefix=e,Tu.forEach(function(e){return e(G)})},get:function(){return W.cssPrefix}}),R.FontAwesomeConfig=G,Tu=[],K=Ql,q={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1},Eu=`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`,Du=`:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`,Ou=!1,ku={mixout:function(){return{dom:{css:gs,insertCss:_s}}},hooks:function(){return{beforeDOMElementCreation:function(){_s()},beforeI2svg:function(){_s()}}}},J=R||{},J[H]||(J[H]={}),J[H].styles||(J[H].styles={}),J[H].hooks||(J[H].hooks={}),J[H].shims||(J[H].shims=[]),Y=J[H],Au=[],ju=function(){z.removeEventListener(`DOMContentLoaded`,ju),Mu=1,Au.map(function(e){return e()})},Mu=!1,B&&(Mu=(z.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(z.readyState),Mu||z.addEventListener(`DOMContentLoaded`,ju)),Nu=function(e,t){return function(n,r,i,a){return e.call(t,n,r,i,a)}},Pu=function(e,t,n,r){var i=Object.keys(e),a=i.length,o=r===void 0?t:Nu(t,r),s,c,l;for(n===void 0?(s=1,l=e[i[0]]):(s=0,l=n);s<a;s++)c=i[s],l=o(l,e[c],c,e);return l},Fu=Y.styles,Iu=Y.shims,Lu=Object.keys(hu),Ru=Lu.reduce(function(e,t){return e[t]=Object.keys(hu[t]),e},{}),zu=null,Bu={},Vu={},Hu={},Uu={},Wu={},Gu=function(){var e=function(e){return Pu(Fu,function(t,n,r){return t[r]=Pu(n,e,{}),t},{})};Bu=e(function(e,t,n){return t[3]&&(e[t[3]]=n),t[2]&&t[2].filter(function(e){return typeof e==`number`}).forEach(function(t){e[t.toString(16)]=n}),e}),Vu=e(function(e,t,n){return e[n]=n,t[2]&&t[2].filter(function(e){return typeof e==`string`}).forEach(function(t){e[t]=n}),e}),Wu=e(function(e,t,n){var r=t[2];return e[n]=n,r.forEach(function(t){e[t]=n}),e});var t=`far`in Fu||G.autoFetchSvg,n=Pu(Iu,function(e,n){var r=n[0],i=n[1],a=n[2];return i===`far`&&!t&&(i=`fas`),typeof r==`string`&&(e.names[r]={prefix:i,iconName:a}),typeof r==`number`&&(e.unicodes[r.toString(16)]={prefix:i,iconName:a}),e},{names:{},unicodes:{}});Hu=n.names,Uu=n.unicodes,zu=js(G.styleDefault,{family:G.familyDefault})},as(function(e){zu=js(e.styleDefault,{family:G.familyDefault})}),Gu(),Ku=function(){return{prefix:null,iconName:null,rest:[]}},qu=Kl.concat(Nl),Ju=Ol.filter(function(e){return e!==V||e!==Gc}),Yu=Object.keys(Gl).filter(function(e){return e!==V}).map(function(e){return Object.keys(Gl[e])}).flat(),Xu=function(){function e(){Ho(this,e),this.definitions={}}return Wo(e,[{key:`add`,value:function(){var e=this,t=[...arguments].reduce(this._pullDefinitions,{});Object.keys(t).forEach(function(n){e.definitions[n]=M(M({},e.definitions[n]||{}),t[n]),Cs(n,t[n]);var r=hu[V][n];r&&Cs(r,t[n]),Gu()})}},{key:`reset`,value:function(){this.definitions={}}},{key:`_pullDefinitions`,value:function(e,t){var n=t.prefix&&t.iconName&&t.icon?{0:t}:t;return Object.keys(n).map(function(t){var r=n[t],i=r.prefix,a=r.iconName,o=r.icon,s=o[2];e[i]||(e[i]={}),s.length>0&&s.forEach(function(t){typeof t==`string`&&(e[i][t]=o)}),e[i][a]=o}),e}}])}(),Zu=[],Qu={},$u={},ed=Object.keys($u),td=new Xu,X={noAuto:function(){G.autoReplaceSvg=!1,G.observeMutations=!1,I(`noAuto`)},config:G,dom:{i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return B?(I(`beforeI2svg`,e),L(`pseudoElements2svg`,e),L(`i2svg`,e)):Promise.reject(Error(`Operation requires a DOM of some kind.`))},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=e.autoReplaceSvgRoot;G.autoReplaceSvg===!1&&(G.autoReplaceSvg=!0),G.observeMutations=!0,vs(function(){nd({autoReplaceSvgRoot:t}),I(`watch`,e)})}},parse:{icon:function(e){if(e===null)return null;if(es(e)===`object`&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:P(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var t=e[1].indexOf(`fa-`)===0?e[1].slice(3):e[1],n=js(e[0]);return{prefix:n,iconName:P(n,t)||t}}if(typeof e==`string`&&(e.indexOf(`${G.cssPrefix}-`)>-1||e.match(_u))){var r=Ps(e.split(` `),{skipLookups:!0});return{prefix:r.prefix||F(),iconName:P(r.prefix,r.iconName)||r.iconName}}if(typeof e==`string`){var i=F();return{prefix:i,iconName:P(i,e)||e}}}},library:td,findIconDefinition:zs,toHtml:ys},nd=function(){var e=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}).autoReplaceSvgRoot,t=e===void 0?z:e;(Object.keys(Y.styles).length>0||G.autoFetchSvg)&&B&&G.autoReplaceSvg&&X.dom.i2svg({node:t})},rd=Y.styles,id={found:!1,width:512,height:512},ad=function(){},od=G.measurePerformance&&Lc&&Lc.mark&&Lc.measure?Lc:{mark:ad,measure:ad},sd=`FA "7.2.0"`,cd=function(e){return od.mark(`${sd} ${e} begins`),function(){return ld(e)}},ld=function(e){od.mark(`${sd} ${e} ends`),od.measure(`${sd} ${e}`,`${sd} ${e} begins`,`${sd} ${e} ends`)},ud={begin:cd,end:ld},dd=function(){},fd={replace:function(e){var t=e[0];if(t.parentNode)if(e[1].forEach(function(e){t.parentNode.insertBefore(nc(e),t)}),t.getAttribute(U)===null&&G.keepOriginalSource){var n=z.createComment(rc(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){var t=e[0],n=e[1];if(~ls(t).indexOf(G.replacementClass))return fd.replace(e);var r=RegExp(`${G.cssPrefix}-.*`);if(delete n[0].attributes.id,n[0].attributes.class){var i=n[0].attributes.class.split(` `).reduce(function(e,t){return t===G.replacementClass||t.match(r)?e.toSvg.push(t):e.toNode.push(t),e},{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(` `),i.toNode.length===0?t.removeAttribute(`class`):t.setAttribute(`class`,i.toNode.join(` `))}var a=n.map(function(e){return ys(e)}).join(`
`);t.setAttribute(U,``),t.innerHTML=a}},pd=!1,md=null,hd=Y.styles,gd=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.transform,r=n===void 0?q:n,i=t.symbol,a=i===void 0?!1:i,o=t.mask,s=o===void 0?null:o,c=t.maskId,l=c===void 0?null:c,u=t.classes,d=u===void 0?[]:u,f=t.attributes,p=f===void 0?{}:f,m=t.styles,h=m===void 0?{}:m;if(e){var g=e.prefix,_=e.iconName,v=e.icon;return Bs(M({type:`icon`},e),function(){return I(`beforeDOMElementCreation`,{iconDefinition:e,params:t}),Ws({icons:{main:qs(v),mask:s?qs(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:_,transform:M(M({},q),r),symbol:a,maskId:l,extra:{attributes:p,styles:h,classes:d}})})}},_d={mixout:function(){return{icon:yc(gd)}},hooks:function(){return{mutationObserverCallbacks:function(e){return e.treeCallback=_c,e.nodeCallback=vc,e}}},provides:function(e){e.i2svg=function(e){var t=e.node,n=t===void 0?z:t,r=e.callback;return _c(n,r===void 0?function(){}:r)},e.generateSvgReplacementMutation=function(e,t){var n=t.iconName,r=t.prefix,i=t.transform,a=t.symbol,o=t.mask,s=t.maskId,c=t.extra;return new Promise(function(t,l){Promise.all([Ys(n,r),o.iconName?Ys(o.iconName,o.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(o){var l=Zo(o,2),u=l[0],d=l[1];t([e,Ws({icons:{main:u,mask:d},prefix:r,iconName:n,transform:i,symbol:a,maskId:s,extra:c,watchable:!0})])}).catch(l)})},e.generateAbstractIcon=function(e){var t=e.children,n=e.attributes,r=e.main,i=e.transform,a=e.styles,o=fs(a);o.length>0&&(n.style=o);var s;return ps(i)&&(s=L(`generateAbstractTransformGrouping`,{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),t.push(s||r.icon),{children:t,attributes:n}}}},vd={mixout:function(){return{layer:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.classes,r=n===void 0?[]:n;return Bs({type:`layer`},function(){I(`beforeDOMElementCreation`,{assembler:e,params:t});var n=[];return e(function(e){Array.isArray(e)?e.map(function(e){n=n.concat(e.abstract)}):n=n.concat(e.abstract)}),[{tag:`span`,attributes:{class:[`${G.cssPrefix}-layers`].concat(N(r)).join(` `)},children:n}]})}}}},yd={mixout:function(){return{counter:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.title,r=n===void 0?null:n,i=t.classes,a=i===void 0?[]:i,o=t.attributes,s=o===void 0?{}:o,c=t.styles,l=c===void 0?{}:c;return Bs({type:`counter`,content:e},function(){return I(`beforeDOMElementCreation`,{content:e,params:t}),Ks({content:e.toString(),title:r,extra:{attributes:s,styles:l,classes:[`${G.cssPrefix}-layers-counter`].concat(N(a))}})})}}}},bd={mixout:function(){return{text:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.transform,r=n===void 0?q:n,i=t.classes,a=i===void 0?[]:i,o=t.attributes,s=o===void 0?{}:o,c=t.styles,l=c===void 0?{}:c;return Bs({type:`text`,content:e},function(){return I(`beforeDOMElementCreation`,{content:e,params:t}),Gs({content:e,transform:M(M({},q),r),extra:{attributes:s,styles:l,classes:[`${G.cssPrefix}-layers-text`].concat(N(a))}})})}}},provides:function(e){e.generateLayersText=function(e,t){var n=t.transform,r=t.extra,i=null,a=null;if(Rc){var o=parseInt(getComputedStyle(e).fontSize,10),s=e.getBoundingClientRect();i=s.width/o,a=s.height/o}return Promise.resolve([e,Gs({content:e.innerHTML,width:i,height:a,transform:n,extra:r,watchable:!0})])}}},xd=RegExp(`"`,`ug`),Sd=[1105920,1112319],Cd=M(M(M(M({},{FontAwesome:{normal:`fas`,400:`fas`}}),Al),Zl),Ll),wd=Object.keys(Cd).reduce(function(e,t){return e[t.toLowerCase()]=Cd[t],e},{}),Td=Object.keys(wd).reduce(function(e,t){var n=wd[t];return e[t]=n[900]||N(Object.entries(n))[0][1],e},{}),Ed=function(e){return!!e&&cu.some(function(t){return e.includes(t)})},Dd=function(e){if(!e)return[];var t=new Set,n=e.split(/,(?![^()]*\))/).map(function(e){return e.trim()});n=n.flatMap(function(e){return e.includes(`(`)?e:e.split(`,`).map(function(e){return e.trim()})});var r=Go(n),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(Ed(a)){var o=cu.reduce(function(e,t){return e.replace(t,``)},a);o!==``&&o!==`*`&&t.add(o)}}}catch(e){r.e(e)}finally{r.f()}return t},Od={hooks:function(){return{mutationObserverCallbacks:function(e){return e.pseudoElementsCallback=Ec,e}}},provides:function(e){e.pseudoElements2svg=function(e){var t=e.node,n=t===void 0?z:t;G.searchPseudoElements&&Ec(n)}}},kd=!1,Ad={mixout:function(){return{dom:{unwatch:function(){oc(),kd=!0}}}},hooks:function(){return{bootstrap:function(){cc(Rs(`mutationObserverCallbacks`,{}))},noAuto:function(){lc()},watch:function(e){var t=e.observeMutationsRoot;kd?sc():cc(Rs(`mutationObserverCallbacks`,{observeMutationsRoot:t}))}}}},jd=function(e){return e.toLowerCase().split(` `).reduce(function(e,t){var n=t.toLowerCase().split(`-`),r=n[0],i=n.slice(1).join(`-`);if(r&&i===`h`)return e.flipX=!0,e;if(r&&i===`v`)return e.flipY=!0,e;if(i=parseFloat(i),isNaN(i))return e;switch(r){case`grow`:e.size+=i;break;case`shrink`:e.size-=i;break;case`left`:e.x-=i;break;case`right`:e.x+=i;break;case`up`:e.y-=i;break;case`down`:e.y+=i;break;case`rotate`:e.rotate+=i;break}return e},{size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0})},Md={mixout:function(){return{parse:{transform:function(e){return jd(e)}}}},hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-transform`);return n&&(e.transform=jd(n)),e}}},provides:function(e){e.generateAbstractTransformGrouping=function(e){var t=e.main,n=e.transform,r=e.containerWidth,i=e.iconWidth,a={outer:{transform:`translate(${r/2} 256)`},inner:{transform:`${`translate(${n.x*32}, ${n.y*32}) `} ${`scale(${n.size/16*(n.flipX?-1:1)}, ${n.size/16*(n.flipY?-1:1)}) `} ${`rotate(${n.rotate} 0 0)`}`},path:{transform:`translate(${i/2*-1} -256)`}};return{tag:`g`,attributes:M({},a.outer),children:[{tag:`g`,attributes:M({},a.inner),children:[{tag:t.icon.tag,children:t.icon.children,attributes:M(M({},t.icon.attributes),a.path)}]}]}}}},Nd={x:0,y:0,width:`100%`,height:`100%`},Ls([ku,_d,vd,yd,bd,Od,Ad,Md,{hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-mask`),r=n?Ps(n.split(` `).map(function(e){return e.trim()})):Ku();return r.prefix||=F(),e.mask=r,e.maskId=t.getAttribute(`data-fa-mask-id`),e}}},provides:function(e){e.generateAbstractMask=function(e){var t=e.children,n=e.attributes,r=e.main,i=e.mask,a=e.maskId,o=e.transform,s=r.width,c=r.icon,l=i.width,u=i.icon,d=ms({transform:o,containerWidth:l,iconWidth:s}),f={tag:`rect`,attributes:M(M({},Nd),{},{fill:`white`})},p=c.children?{children:c.children.map(Dc)}:{},m={tag:`g`,attributes:M({},d.inner),children:[Dc(M({tag:c.tag,attributes:M(M({},c.attributes),d.path)},p))]},h={tag:`g`,attributes:M({},d.outer),children:[m]},g=`mask-${a||ss()}`,_=`clip-${a||ss()}`,v={tag:`mask`,attributes:M(M({},Nd),{},{id:g,maskUnits:`userSpaceOnUse`,maskContentUnits:`userSpaceOnUse`}),children:[f,h]},y={tag:`defs`,children:[{tag:`clipPath`,attributes:{id:_},children:Oc(u)},v]};return t.push(y,{tag:`rect`,attributes:M({fill:`currentColor`,"clip-path":`url(#${_})`,mask:`url(#${g})`},Nd)}),{children:t,attributes:n}}}},{provides:function(e){var t=!1;R.matchMedia&&(t=R.matchMedia(`(prefers-reduced-motion: reduce)`).matches),e.missingIconAbstract=function(){var e=[],n={fill:`currentColor`},r={attributeType:`XML`,repeatCount:`indefinite`,dur:`2s`};e.push({tag:`path`,attributes:M(M({},n),{},{d:`M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z`})});var i=M(M({},r),{},{attributeName:`opacity`}),a={tag:`circle`,attributes:M(M({},n),{},{cx:`256`,cy:`364`,r:`28`}),children:[]};return t||a.children.push({tag:`animate`,attributes:M(M({},r),{},{attributeName:`r`,values:`28;14;28;28;14;28;`})},{tag:`animate`,attributes:M(M({},i),{},{values:`1;0;1;1;0;1;`})}),e.push(a),e.push({tag:`path`,attributes:M(M({},n),{},{opacity:`1`,d:`M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z`}),children:t?[]:[{tag:`animate`,attributes:M(M({},i),{},{values:`1;0;0;0;0;1;`})}]}),t||e.push({tag:`path`,attributes:M(M({},n),{},{opacity:`0`,d:`M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z`}),children:[{tag:`animate`,attributes:M(M({},i),{},{values:`0;0;1;1;0;0;`})}]}),{tag:`g`,attributes:{class:`missing`},children:e}}}},{hooks:function(){return{parseNodeAttributes:function(e,t){var n=t.getAttribute(`data-fa-symbol`);return e.symbol=n===null?!1:n===``?!0:n,e}}}}],{mixoutsTo:X}),X.noAuto,Pd=X.config,Fd=X.library,X.dom,Id=X.parse,X.findIconDefinition,X.toHtml,Ld=X.icon,X.layer,X.text,X.counter}));function zd(e){return e-=0,e===e}function Bd(e){return zd(e)?e:(e=e.replace(/[_-]+(.)?/g,(e,t)=>t?t.toUpperCase():``),e.charAt(0).toLowerCase()+e.slice(1))}function Vd(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Hd(e){if(Z.has(e))return Z.get(e);let t={},n=0,r=e.length;for(;n<r;){let i=e.indexOf(`;`,n),a=i===-1?r:i,o=e.slice(n,a).trim();if(o){let e=o.indexOf(`:`);if(e>0){let n=o.slice(0,e).trim(),r=o.slice(e+1).trim();if(n&&r){let e=Bd(n);t[e.startsWith(`webkit`)?Vd(e):e]=r}}}n=a+1}if(Z.size===Yd){let e=Z.keys().next().value;e&&Z.delete(e)}return Z.set(e,t),t}function Ud(e,t,n={}){if(typeof t==`string`)return t;let r=(t.children||[]).map(t=>Ud(e,t)),i=t.attributes||{},a={};for(let[e,t]of Object.entries(i))switch(!0){case e===`class`:a.className=t;break;case e===`style`:a.style=Hd(String(t));break;case e.startsWith(`aria-`):case e.startsWith(`data-`):a[e.toLowerCase()]=t;break;default:a[Bd(e)]=t}let{style:o,role:s,"aria-label":c,...l}=n;return o&&(a.style=a.style?{...a.style,...o}:o),s&&(a.role=s),c&&(a[`aria-label`]=c,a[`aria-hidden`]=`false`),e(t.tag,{...a,...l},...r)}function Wd(e){let t=Pd.cssPrefix||Pd.familyPrefix||tf;return t===tf?e:e.replace(new RegExp(String.raw`(?<=^|\s)${tf}-`,`g`),`${t}-`)}function Gd(e){let{beat:t,fade:n,beatFade:r,bounce:i,shake:a,spin:o,spinPulse:s,spinReverse:c,pulse:l,fixedWidth:u,inverse:d,border:f,flip:p,size:m,rotation:h,pull:g,swapOpacity:_,rotateBy:v,widthAuto:y,className:ee}=e,b=[];return ee&&b.push(...ee.split(` `)),t&&b.push(Q.beat),n&&b.push(Q.fade),r&&b.push(Q.beatFade),i&&b.push(Q.bounce),a&&b.push(Q.shake),o&&b.push(Q.spin),c&&b.push(Q.spinReverse),s&&b.push(Q.spinPulse),l&&b.push(Q.pulse),u&&b.push($.fixedWidth),d&&b.push($.inverse),f&&b.push($.border),p===!0&&b.push($.flip),(p===`horizontal`||p===`both`)&&b.push($.flipHorizontal),(p===`vertical`||p===`both`)&&b.push($.flipVertical),m!=null&&b.push(af[m]),h!=null&&h!==0&&b.push(rf[h]),g!=null&&b.push(nf[g]),_&&b.push($.swapOpacity),ef?(v&&b.push($.rotateBy),y&&b.push($.widthAuto),(Pd.cssPrefix||Pd.familyPrefix||tf)===tf?b:b.map(Wd)):b}function Kd(e){if(e)return sf(e)?e:Id.icon(e)}function qd(e){return Object.keys(e)}var Jd,Z,Yd,Xd,Zd,Qd,$d,ef,tf,Q,nf,rf,af,$,of,sf,cf,lf,uf,df,ff=n((()=>{r(),Jd=t(i(),1),Rd(),s(),Z=new Map,Yd=1e3,Xd=Ud.bind(null,Jd.createElement),Zd=(e,t)=>{let n=(0,Jd.useId)();return e||(t?n:void 0)},Qd=class{constructor(t=`react-fontawesome`){this.enabled=!1;let n=!1;try{n=e!==void 0&&!1}catch{}this.scope=t,this.enabled=n}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},e!==void 0&&{}.FA_VERSION,$d=`searchPseudoElementsFullScan`in Pd?`7.0.0`:`6.0.0`,ef=Number.parseInt($d)>=7,tf=`fa`,Q={beat:`fa-beat`,fade:`fa-fade`,beatFade:`fa-beat-fade`,bounce:`fa-bounce`,shake:`fa-shake`,spin:`fa-spin`,spinPulse:`fa-spin-pulse`,spinReverse:`fa-spin-reverse`,pulse:`fa-pulse`},nf={left:`fa-pull-left`,right:`fa-pull-right`},rf={90:`fa-rotate-90`,180:`fa-rotate-180`,270:`fa-rotate-270`},af={"2xs":`fa-2xs`,xs:`fa-xs`,sm:`fa-sm`,lg:`fa-lg`,xl:`fa-xl`,"2xl":`fa-2xl`,"1x":`fa-1x`,"2x":`fa-2x`,"3x":`fa-3x`,"4x":`fa-4x`,"5x":`fa-5x`,"6x":`fa-6x`,"7x":`fa-7x`,"8x":`fa-8x`,"9x":`fa-9x`,"10x":`fa-10x`},$={border:`fa-border`,fixedWidth:`fa-fw`,flip:`fa-flip`,flipHorizontal:`fa-flip-horizontal`,flipVertical:`fa-flip-vertical`,inverse:`fa-inverse`,rotateBy:`fa-rotate-by`,swapOpacity:`fa-swap-opacity`,widthAuto:`fa-width-auto`},of={default:`fa-layers`},sf=e=>typeof e==`object`&&`icon`in e&&!!e.icon,cf=new Qd(`FontAwesomeIcon`),lf={border:!1,className:``,mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:``,titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},uf=new Set(Object.keys(lf)),df=Jd.forwardRef((e,t)=>{let n={...lf,...e},{icon:r,mask:i,symbol:a,title:o,titleId:s,maskId:c,transform:l}=n,u=Zd(c,!!i),d=Zd(s,!!o),f=Kd(r);if(!f)return cf.error(`Icon lookup is undefined`,r),null;let p=Gd(n),m=typeof l==`string`?Id.transform(l):l,h=Kd(i),g=Ld(f,{...p.length>0&&{classes:p},...m&&{transform:m},...h&&{mask:h},symbol:a,title:o,titleId:d,maskId:u});if(!g)return cf.error(`Could not find icon`,f),null;let{abstract:_}=g,v={ref:t};for(let e of qd(n))uf.has(e)||(v[e]=n[e]);return Xd(_[0],v)}),df.displayName=`FontAwesomeIcon`,`${of.default}${$.fixedWidth}`}));export{Ro as a,No as c,Fd as i,Po as l,ff as n,Lo as o,Rd as r,Fo as s,df as t};