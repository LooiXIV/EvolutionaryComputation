/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
//var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
/* 
 * flowplayer.js 3.1.4. The Flowplayer API
 * 
 * Copyright 2009 Flowplayer Oy
 * 
 * This file is part of Flowplayer.
 * 
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Date: 2009-02-25 21:24:29 +0000 (Wed, 25 Feb 2009)
 * Revision: 166 
 */
(function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return document.getElementById(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.substring(0,q)||"*";var o=s.substring(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).substring(2,10)}var h=function(t,r,s){var q=this;var p={};var u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.substring(0,v.length-1);var w="onBefore"+v.substring(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(y&&"onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(v)!=-1){i(A,y);if(y.metaData){if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var s={};var o=this;var u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var y=q._api().fp_getPlugin(p);if(!y){return}i(o,y);delete o.methods;if(!u){m(y.methods,function(){var A=""+this;o[A]=function(){var B=[].slice.call(arguments);var C=q._api().fp_invoke(p,A,B);return C==="undefined"||C===undefined?o:C}});u=true}}var z=s[w];if(z){z.apply(o,v);if(w.substring(0,1)=="_"){delete s[w]}}}})};function b(o,t,z){var E=this,y=null,x,u,p=[],s={},B={},r,v,w,D,A,q;i(E,{id:function(){return r},isLoaded:function(){return(y!==null)},getParent:function(){return o},hide:function(F){if(F){o.style.height="0px"}if(y){y.style.height="0px"}return E},show:function(){o.style.height=q+"px";if(y){y.style.height=A+"px"}return E},isHidden:function(){return y&&parseInt(y.style.height,10)===0},load:function(F){if(!y&&E._fireEvent("onBeforeLoad")!==false){m(a,function(){this.unload()});x=o.innerHTML;if(x&&!flashembed.isSupported(t.version)){o.innerHTML=""}flashembed(o,t,{config:z});if(F){F.cached=true;j(B,"onLoad",F)}}return E},unload:function(){if(x.replace(/\s/g,"")!==""){if(E._fireEvent("onBeforeUnload")===false){return E}try{if(y){y.fp_close();E._fireEvent("onUnload")}}catch(F){}y=null;o.innerHTML=x}return E},getClip:function(F){if(F===undefined){F=D}return p[F]},getCommonClip:function(){return u},getPlaylist:function(){return p},getPlugin:function(F){var H=s[F];if(!H&&E.isLoaded()){var G=E._api().fp_getPlugin(F);if(G){H=new l(F,G,E);s[F]=H}}return H},getScreen:function(){return E.getPlugin("screen")},getControls:function(){return E.getPlugin("controls")},getConfig:function(F){return F?k(z):z},getFlashParams:function(){return t},loadPlugin:function(I,H,K,J){if(typeof K=="function"){J=K;K={}}var G=J?e():"_";E._api().fp_loadPlugin(I,H,K,G);var F={};F[G]=J;var L=new l(I,null,E,F);s[I]=L;return L},getState:function(){return y?y.fp_getState():-1},play:function(G,F){function H(){if(G!==undefined){E._api().fp_play(G,F)}else{E._api().fp_play()}}if(y){H()}else{E.load(function(){H()})}return E},getVersion:function(){var G="flowplayer.js 3.1.4";if(y){var F=y.fp_getVersion();F.push(G);return F}return G},_api:function(){if(!y){throw"Flowplayer "+E.id()+" not loaded when calling an API method"}return y},setClip:function(F){E.setPlaylist([F]);return E},getIndex:function(){return w}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","),function(){var F="on"+this;if(F.indexOf("*")!=-1){F=F.substring(0,F.length-1);var G="onBefore"+F.substring(2);E[G]=function(H){j(B,G,H);return E}}E[F]=function(H){j(B,F,H);return E}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed").split(","),function(){var F=this;E[F]=function(H,G){if(!y){return E}var I=null;if(H!==undefined&&G!==undefined){I=y["fp_"+F](H,G)}else{I=(H===undefined)?y["fp_"+F]():y["fp_"+F](H)}return I==="undefined"||I===undefined?E:I}});E._fireEvent=function(O){if(typeof O=="string"){O=[O]}var P=O[0],M=O[1],K=O[2],J=O[3],I=0;if(z.debug){g(O)}if(!y&&P=="onLoad"&&M=="player"){y=y||c(v);A=y.clientHeight;m(p,function(){this._fireEvent("onLoad")});m(s,function(Q,R){R._fireEvent("onUpdate")});u._fireEvent("onLoad")}if(P=="onLoad"&&M!="player"){return}if(P=="onError"){if(typeof M=="string"||(typeof M=="number"&&typeof K=="number")){M=K;K=J}}if(P=="onContextMenu"){m(z.contextMenu[M],function(Q,R){R.call(E)});return}if(P=="onPluginEvent"){var F=M.name||M;var G=s[F];if(G){G._fireEvent("onUpdate",M);G._fireEvent(K,O.slice(3))}return}if(P=="onPlaylistReplace"){p=[];var L=0;m(M,function(){p.push(new h(this,L++,E))})}if(P=="onClipAdd"){if(M.isInStream){return}M=new h(M,K,E);p.splice(K,0,M);for(I=K+1;I<p.length;I++){p[I].index++}}var N=true;if(typeof M=="number"&&M<p.length){D=M;var H=p[M];if(H){N=H._fireEvent(P,K,J)}if(!H||N!==false){N=u._fireEvent(P,K,J,H)}}m(B[P],function(){N=this.call(E,M,K);if(this.cached){B[P].splice(I,1)}if(N===false){return false}I++});return N};function C(){if($f(o)){$f(o).getParent().innerHTML="";w=$f(o).getIndex();a[w]=E}else{a.push(E);w=a.length-1}q=parseInt(o.style.height,10)||o.clientHeight;if(typeof t=="string"){t={src:t}}r=o.id||"fp"+e();v=t.id||r+"_api";t.id=v;z.playerId=r;if(typeof z=="string"){z={clip:{url:z}}}if(typeof z.clip=="string"){z.clip={url:z.clip}}z.clip=z.clip||{};if(o.getAttribute("href",2)&&!z.clip.url){z.clip.url=o.getAttribute("href",2)}u=new h(z.clip,-1,E);z.playlist=z.playlist||[z.clip];var F=0;m(z.playlist,function(){var H=this;if(typeof H=="object"&&H.length){H={url:""+H}}m(z.clip,function(I,J){if(J!==undefined&&H[I]===undefined&&typeof J!="function"){H[I]=J}});z.playlist[F]=H;H=new h(H,F,E);p.push(H);F++});m(z,function(H,I){if(typeof I=="function"){if(u[H]){u[H](I)}else{j(B,H,I)}delete z[H]}});m(z.plugins,function(H,I){if(I){s[H]=new l(H,I,E)}});if(!z.plugins||z.plugins.controls===undefined){s.controls=new l("controls",null,E)}s.canvas=new l("canvas",null,E);t.bgcolor=t.bgcolor||"#000000";t.version=t.version||[9,0];t.expressInstall="http://www.flowplayer.org/swf/expressinstall.swf";function G(H){if(!E.isLoaded()&&E._fireEvent("onBeforeClick")!==false){E.load()}return f(H)}x=o.innerHTML;if(x.replace(/\s/g,"")!==""){if(o.addEventListener){o.addEventListener("click",G,false)}else{if(o.attachEvent){o.attachEvent("onclick",G)}}}else{if(o.addEventListener){o.addEventListener("click",f,false)}E.load()}}if(typeof o=="string"){flashembed.domReady(function(){var F=c(o);if(!F){throw"Flowplayer cannot access element: "+o}else{o=F;C()}})}else{C()}}var a=[];function d(o){this.length=o.length;this.each=function(p){m(o,p)};this.size=function(){return o.length}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var r=arguments[1];var q=(arguments.length==3)?arguments[2]:{};if(typeof o=="string"){if(o.indexOf(".")!=-1){var t=[];m(n(o),function(){t.push(new b(this,k(r),k(q)))});return new d(t)}else{var s=c(o);return new b(s!==null?s:o,r,q)}}else{if(o){return new b(o,r,q)}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(typeof jQuery=="function"){jQuery.prototype.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var e=typeof jQuery=="function";var i={width:"100%",height:"100%",allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:null,onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(e){jQuery.tools=jQuery.tools||{};jQuery.tools.flashembed={version:"1.0.4",conf:i}}function j(){if(c.done){return false}var l=document;if(l&&l.getElementsByTagName&&l.getElementById&&l.body){clearInterval(c.timer);c.timer=null;for(var k=0;k<c.ready.length;k++){c.ready[k].call()}c.ready=null;c.done=true}}var c=e?jQuery:function(k){if(c.done){return k()}if(c.timer){c.ready.push(k)}else{c.ready=[k];c.timer=setInterval(j,13)}};function f(l,k){if(k){for(key in k){if(k.hasOwnProperty(key)){l[key]=k[key]}}}return l}function g(k){switch(h(k)){case"string":k=k.replace(new RegExp('(["\\\\])',"g"),"\\$1");k=k.replace(/^\s?(\d+)%/,"$1pct");return'"'+k+'"';case"array":return"["+b(k,function(n){return g(n)}).join(",")+"]";case"function":return'"function()"';case"object":var l=[];for(var m in k){if(k.hasOwnProperty(m)){l.push('"'+m+'":'+g(k[m]))}}return"{"+l.join(",")+"}"}return String(k).replace(/\s/g," ").replace(/\'/g,'"')}function h(l){if(l===null||l===undefined){return false}var k=typeof l;return(k=="object"&&l.push)?"array":k}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function b(k,n){var m=[];for(var l in k){if(k.hasOwnProperty(l)){m[l]=n(k[l])}}return m}function a(r,t){var q=f({},r);var s=document.all;var n='<object width="'+q.width+'" height="'+q.height+'"';if(s&&!q.id){q.id="_"+(""+Math.random()).substring(9)}if(q.id){n+=' id="'+q.id+'"'}if(q.cachebusting){q.src+=((q.src.indexOf("?")!=-1?"&":"?")+Math.random())}if(q.w3c||!s){n+=' data="'+q.src+'" type="application/x-shockwave-flash"'}else{n+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}n+=">";if(q.w3c||s){n+='<param name="movie" value="'+q.src+'" />'}q.width=q.height=q.id=q.w3c=q.src=null;for(var l in q){if(q[l]!==null){n+='<param name="'+l+'" value="'+q[l]+'" />'}}var o="";if(t){for(var m in t){if(t[m]!==null){o+=m+"="+(typeof t[m]=="object"?g(t[m]):t[m])+"&"}}o=o.substring(0,o.length-1);n+='<param name="flashvars" value=\''+o+"' />"}n+="</object>";return n}function d(m,p,l){var k=flashembed.getVersion();f(this,{getContainer:function(){return m},getConf:function(){return p},getVersion:function(){return k},getFlashvars:function(){return l},getApi:function(){return m.firstChild},getHTML:function(){return a(p,l)}});var q=p.version;var r=p.expressInstall;var o=!q||flashembed.isSupported(q);if(o){p.onFail=p.version=p.expressInstall=null;m.innerHTML=a(p,l)}else{if(q&&r&&flashembed.isSupported([6,65])){f(p,{src:r});l={MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title};m.innerHTML=a(p,l)}else{if(m.innerHTML.replace(/\s/g,"")!==""){}else{m.innerHTML="<h2>Flash version "+q+" or greater is required</h2><h3>"+(k[0]>0?"Your version is "+k:"You have no flash plugin installed")+"</h3>"+(m.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");if(m.tagName=="A"){m.onclick=function(){location.href="http://www.adobe.com/go/getflashplayer"}}}}}if(!o&&p.onFail){var n=p.onFail.call(this);if(typeof n=="string"){m.innerHTML=n}}if(document.all){window[p.id]=document.getElementById(p.id)}}window.flashembed=function(l,m,k){if(typeof l=="string"){var n=document.getElementById(l);if(n){l=n}else{c(function(){flashembed(l,m,k)});return}}if(!l){return}if(typeof m=="string"){m={src:m}}var o=f({},i);f(o,m);return new d(l,o,k)};f(window.flashembed,{getVersion:function(){var m=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var l=navigator.plugins["Shockwave Flash"].description;if(typeof l!="undefined"){l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var n=parseInt(l.replace(/^(.*)\..*$/,"$1"),10);var r=/r/.test(l)?parseInt(l.replace(/^.*r(.*)$/,"$1"),10):0;m=[n,r]}}else{if(window.ActiveXObject){try{var p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(q){try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");m=[6,0];p.AllowScriptAccess="always"}catch(k){if(m[0]==6){return m}}try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(o){}}if(typeof p=="object"){l=p.GetVariable("$version");if(typeof l!="undefined"){l=l.replace(/^\S+\s+(.*)$/,"$1").split(",");m=[parseInt(l[0],10),parseInt(l[2],10)]}}}}return m},isSupported:function(k){var m=flashembed.getVersion();var l=(m[0]>k[0])||(m[0]==k[0]&&m[1]>=k[1]);return l},domReady:c,asString:g,getHTML:a});if(e){jQuery.fn.flashembed=function(l,k){var m=null;this.each(function(){m=flashembed(this,l,k)});return l.api===false?this:m}}})();
/* Jmol 11.7 script library Jmol.js  12:17 AM 4/20/2009 Bob Hanson
 checkbox heirarchy -- see http://chemapps.stolaf.edu/jmol/docs/examples-11/check.htm
    based on:
 *
 * Copyright (C) 2004-2005  Miguel, Jmol Development, www.jmol.org
 *
 * Contact: hansonr@stolaf.edu
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307  USA.
 */
// for documentation see www.jmol.org/jslibrary
try{if(typeof(_jmol)!="undefined")exit()
// place "?NOAPPLET" on your command line to check applet control action with a textarea
// place "?JMOLJAR=xxxxx" to use a specific jar file
// bob hanson -- jmolResize(w,h) -- resizes absolutely or by percent (w or h 0.5 means 50%)
//    angel herraez -- update of jmolResize(w,h,targetSuffix) so it is not tied to first applet
// bob hanson -- jmolEvaluate -- evaluates molecular math 8:37 AM 2/23/2007
// bob hanson -- jmolScriptMessage -- returns all "scriptStatus" messages 8:37 AM 2/23/2007
// bob hanson -- jmolScriptEcho -- returns all "scriptEcho" messages 8:37 AM 2/23/2007
// bob hanson -- jmolScriptWait -- 11:31 AM 5/2/2006
// bob hanson -- remove trailing separatorHTML in radio groups -- 12:18 PM 5/6/2006
// bob hanson -- adds support for dynamic DOM script nodes 7:04 AM 5/19/2006
// bob hanson -- adds try/catch for wiki - multiple code passes 7:05 AM 5/19/2006
// bob hanson -- auto-initiates to defaultdir/defaultjar -- change as desired.
// bob hanson -- adding save/restore orientation w/ and w/o delay 11:49 AM 5/25/2006
// bob hanson -- adding AjaxJS service 11:16 AM 6/3/2006
// bob hanson -- fix for iframes not available for finding applet
// bob hanson -- added applet fake ?NOAPPLET URL flag
// bob hanson -- added jmolSetCallback(calbackName, funcName) 3:32 PM 6/13/2006
//			used PRIOR to jmolApplet() or jmolAppletInline()
//               added 4th array element in jmolRadioGroup -- title
//               added <span> and id around link, checkbox, radio, menu
//               fixing AJAX loads for MSIE/Opera-Mozilla incompatibility
//            -- renamed Jmol-11.js from Jmol-new.js; JmolApplet.jar from JmolAppletProto.jar
//	 	 renamed Jmol.js for Jmol 11 distribution
//            -- modified jmolRestoreOrientation() to be immediate, no 1-second delay
// bob hanson -- jmolScriptWait always returns a string -- 11:23 AM 9/16/2006
// bh         -- jmolCommandInput()
// bh         -- jmolSetTranslation(TF) -- forces translation even if there might be message callback issues
// bh         -- minor fixes suggested by Angel
// bh         -- adds jmolSetSyncId() and jmolGetSyncId()
// bh 3/2008  -- adds jmolAppendInlineScript() and jmolAppendInlineArray()
// bh 3/2008  -- fixes IE7 bug in relation to jmolLoadInlineArray()
// bh 6/2008  -- adds jmolSetAppletWindow()
// Angel H. 6/2008  -- added html <label> tags to checkboxes and radio buttons [in jmolCheckbox() and _jmolRadio() functions]
// bh 7/2008  -- code fix "for(i..." not "for(var i..."
// bh 12/2008 -- jmolLoadInline, jmolLoadInlineArray, jmolLoadInlineScript, jmolAppendInlineScript, jmolAppendInlineArray all return error message or null (Jmol 11.7.16)
// bh 12/2008 -- jmolScriptWaitOutput() -- waits for script to complete and delivers output normally sent to console
// bh 5/2009  -- Support for XHTML using jmolSetXHTML(id)
// ah & bh 6/2009 -- New jmolResizeApplet() more flexible, similar to jmolApplet() size syntax
var defaultdir = "."
var defaultjar = "JmolApplet.jar"
// Note added 12:41 PM 9/21/2008 by Bob Hanson, hansonr@stolaf.edu:
// JMOLJAR=xxxxx.jar on the URL for this page will override
// the JAR file specified in the jmolInitialize() call.
// The idea is that it can be very useful to test a web page with different JAR files
// Or for an expert user to substitute a signed applet for an unsigned one
// so as to use a broader range of models or to create JPEG files, for example.
// If the JAR file is not in the current directory (has any sort of "/" in its name)
// then the user is presented with a warning and asked whether it is OK to change Jar files.
// The default action, if the user just presses "OK" is to NOT allow the change. 
// The user must type the word "yes" in the prompt box for the change to be approved.
// If you don't want people to be able to switch in their own JAR file on your page,
// simply set this next line to read "var allowJMOLJAR = false".
var allowJMOLJAR = true  
var undefined; // for IE 5 ... wherein undefined is undefined
////////////////////////////////////////////////////////////////
// Basic Scripting infrastruture
////////////////////////////////////////////////////////////////
function jmolInitialize(codebaseDirectory, fileNameOrUseSignedApplet) {
  if (_jmol.initialized)
    return;
  _jmol.initialized = true;
  if(allowJMOLJAR && document.location.search.indexOf("JMOLJAR=")>=0) {
    var f = document.location.search.split("JMOLJAR=")[1].split("&")[0];
    if (f.indexOf("/") >= 0) {
      alert ("This web page URL is requesting that the applet used be " + f + ". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.")
      var ok = prompt("Do you want to use applet " + f + "? ","yes or no")
      if (ok == "yes") {
        codebaseDirectory = f.substring(0, f.lastIndexOf("/"));
        fileNameOrUseSignedApplet = f.substring(f.lastIndexOf("/") + 1);
      } else {
	_jmolGetJarFilename(fileNameOrUseSignedApplet);
        alert("The web page URL was ignored. Continuing using " + _jmol.archivePath + ' in directory "' + codebaseDirectory + '"');
      }
    } else {
      fileNameOrUseSignedApplet = f;
    }
  }
  _jmolSetCodebase(codebaseDirectory);
  _jmolGetJarFilename(fileNameOrUseSignedApplet);
  _jmolOnloadResetForms();
}
function jmolSetTranslation(TF) {
  _jmol.params.doTranslate = ''+TF;
}
function _jmolGetJarFilename(fileNameOrFlag) {
  _jmol.archivePath =
    (typeof(fileNameOrFlag) == "string"  ? fileNameOrFlag : (fileNameOrFlag ?  "JmolAppletSigned" : "JmolApplet") + "0.jar");
}
function jmolSetDocument(doc) {
  _jmol.currentDocument = doc;
}
function jmolSetAppletColor(boxbgcolor, boxfgcolor, progresscolor) {
  _jmolInitCheck();
  _jmol.params.boxbgcolor = boxbgcolor;
  if (boxfgcolor)
    _jmol.params.boxfgcolor = boxfgcolor
  else if (boxbgcolor == "white" || boxbgcolor == "#FFFFFF")
    _jmol.params.boxfgcolor = "black";
  else
    _jmol.params.boxfgcolor = "white";
  if (progresscolor)
    _jmol.params.progresscolor = progresscolor;
  if (_jmol.debugAlert)
    alert(" boxbgcolor=" + _jmol.params.boxbgcolor +
          " boxfgcolor=" + _jmol.params.boxfgcolor +
          " progresscolor=" + _jmol.params.progresscolor);
}
function jmolSetAppletWindow(w) {
  _jmol.appletWindow = w;
}
function jmolApplet(size, script, nameSuffix) {
  _jmolInitCheck();
  return _jmolApplet(size, null, script, nameSuffix);
}
////////////////////////////////////////////////////////////////
// Basic controls
////////////////////////////////////////////////////////////////
function jmolButton(script, label, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolButton" + _jmol.buttonCount;
  if (label == undefined || label == null)
    label = script.substring(0, 32);
  ++_jmol.buttonCount;
  var scriptIndex = _jmolAddScript(script);
  var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input type='button' name='" + id + "' id='" + id +
          "' value='" + label +
          "' onclick='_jmolClick(" + scriptIndex + _jmol.targetText +
          ")' onmouseover='_jmolMouseOver(" + scriptIndex +
          ");return true' onmouseout='_jmolMouseOut()' " +
          _jmol.buttonCssText + " /></span>";
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}
function jmolCheckbox(scriptWhenChecked, scriptWhenUnchecked,
                      labelHtml, isChecked, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolCheckbox" + _jmol.checkboxCount;
  ++_jmol.checkboxCount;
  if (scriptWhenChecked == undefined || scriptWhenChecked == null ||
      scriptWhenUnchecked == undefined || scriptWhenUnchecked == null) {
    alert("jmolCheckbox requires two scripts");
    return;
  }
  if (labelHtml == undefined || labelHtml == null) {
    alert("jmolCheckbox requires a label");
    return;
  }
  var indexChecked = _jmolAddScript(scriptWhenChecked);
  var indexUnchecked = _jmolAddScript(scriptWhenUnchecked);
  var eospan = "</span>"
  var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input type='checkbox' name='" + id + "' id='" + id +
          "' onclick='_jmolCbClick(this," +
          indexChecked + "," + indexUnchecked + _jmol.targetText +
          ")' onmouseover='_jmolCbOver(this," + indexChecked + "," +
          indexUnchecked +
          ");return true' onmouseout='_jmolMouseOut()' " +
	  (isChecked ? "checked='true' " : "")+ _jmol.checkboxCssText + " />" 
  if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
	t += eospan
	eospan = "";
  }
  t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan;
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}
function jmolStartNewRadioGroup() {
  ++_jmol.radioGroupCount;
}
function jmolRadioGroup(arrayOfRadioButtons, separatorHtml, groupName, id, title) {
  /*
    array: [radio1,radio2,radio3...]
    where radioN = ["script","label",isSelected,"id","title"]
  */
  _jmolInitCheck();
  var type = typeof arrayOfRadioButtons;
  if (type != "object" || type == null || ! arrayOfRadioButtons.length) {
    alert("invalid arrayOfRadioButtons");
    return;
  }
  if (separatorHtml == undefined || separatorHtml == null)
    separatorHtml = "&nbsp; ";
  var len = arrayOfRadioButtons.length;
  jmolStartNewRadioGroup();
  if (!groupName)
    groupName = "jmolRadioGroup" + (_jmol.radioGroupCount - 1);
  var t = "<span id='"+(id ? id : groupName)+"'>";
  for (var i = 0; i < len; ++i) {
    if (i == len - 1)
      separatorHtml = "";
    var radio = arrayOfRadioButtons[i];
    type = typeof radio;
    if (type == "object") {
      t += _jmolRadio(radio[0], radio[1], radio[2], separatorHtml, groupName, (radio.length > 3 ? radio[3]: (id ? id : groupName)+"_"+i), (radio.length > 4 ? radio[4] : 0), title);
    } else {
      t += _jmolRadio(radio, null, null, separatorHtml, groupName, (id ? id : groupName)+"_"+i, title);
    }
  }
  t+="</span>"
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}
function jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
  _jmolInitCheck();
  if (_jmol.radioGroupCount == 0)
    ++_jmol.radioGroupCount;
  var t = _jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, (id ? id : groupName + "_" + _jmol.radioCount), title ? title : 0);
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}
function jmolLink(script, label, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolLink" + _jmol.linkCount;
  if (label == undefined || label == null)
    label = script.substring(0, 32);
  ++_jmol.linkCount;
  var scriptIndex = _jmolAddScript(script);
  var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><a name='" + id + "' id='" + id + 
          "' href='javascript:_jmolClick(" + scriptIndex + _jmol.targetText + ");' onmouseover='_jmolMouseOver(" + scriptIndex +
          ");return true;' onmouseout='_jmolMouseOut()' " +
          _jmol.linkCssText + ">" + label + "</a></span>";
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}
function jmolCommandInput(label, size, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolCmd" + _jmol.cmdCount;
  if (label == undefined || label == null)
    label = "Execute";
  if (size == undefined || isNaN(size))
    size = 60;
  ++_jmol.cmdCount;
  var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input name='" + id + "' id='" + id + 
          "' size='"+size+"' onkeypress='_jmolCommandKeyPress(event,\""+id+"\"" + _jmol.targetText + ")'><input type=button value = '"+label+"' onclick='jmolScript(document.getElementById(\""+id+"\").value" + _jmol.targetText + ")' /></span>";
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}
function _jmolCommandKeyPress(e, id, target) {
	var keycode = (window.event ? window.event.keyCode : e ? e.which : 0);
	if (keycode == 13) {
		jmolScript(document.getElementById(id).value, target)
	}
}
function jmolMenu(arrayOfMenuItems, size, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolMenu" + _jmol.menuCount;
  ++_jmol.menuCount;
  var type = typeof arrayOfMenuItems;
  if (type != null && type == "object" && arrayOfMenuItems.length) {
    var len = arrayOfMenuItems.length;
    if (typeof size != "number" || size == 1)
      size = null;
    else if (size < 0)
      size = len;
    var sizeText = size ? " size='" + size + "' " : "";
    var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><select name='" + id + "' id='" + id +
            "' onChange='_jmolMenuSelected(this" + _jmol.targetText + ")'" +
            sizeText + _jmol.menuCssText + ">";
    for (var i = 0; i < len; ++i) {
      var menuItem = arrayOfMenuItems[i];
      type = typeof menuItem;
      var script, text;
      var isSelected = undefined;
      if (type == "object" && menuItem != null) {
        script = menuItem[0];
        text = menuItem[1];
        isSelected = menuItem[2];
      } else {
        script = text = menuItem;
      }
      if (text == undefined || text == null)
        text = script;		
	  if (script=="#optgroup") {
        t += "<optgroup label='" + text + "'>";	  
	  } else if (script=="#optgroupEnd") {
        t += "</optgroup>";	  
	  } else {		
        var scriptIndex = _jmolAddScript(script);
        var selectedText = isSelected ? "' selected='true'>" : "'>";
        t += "<option value='" + scriptIndex + selectedText + text + "</option>";
	  }
    }
    t += "</select></span>";
    if (_jmol.debugAlert)
      alert(t);
    return _jmolDocumentWrite(t);
  }
}
function jmolHtml(html) {
  return _jmolDocumentWrite(html);
}
function jmolBr() {
  return _jmolDocumentWrite("<br />");
}
////////////////////////////////////////////////////////////////
// advanced scripting functions
////////////////////////////////////////////////////////////////
function jmolDebugAlert(enableAlerts) {
  _jmol.debugAlert = (enableAlerts == undefined || enableAlerts)
}
function jmolAppletInline(size, inlineModel, script, nameSuffix) {
  _jmolInitCheck();
  return _jmolApplet(size, _jmolSterilizeInline(inlineModel),
                     script, nameSuffix);
}
function jmolSetTarget(targetSuffix) {
  _jmol.targetSuffix = targetSuffix;
  _jmol.targetText = targetSuffix ? ",\"" + targetSuffix + "\"" : "";
}
function jmolScript(script, targetSuffix) {
  if (script) {
    _jmolCheckBrowser();
    if (targetSuffix == "all") {
      with (_jmol) {
	for (var i = 0; i < appletSuffixes.length; ++i) {
	  var applet = _jmolGetApplet(appletSuffixes[i]);
          if (applet) applet.script(script);
        }
      }
    } else {
      var applet=_jmolGetApplet(targetSuffix);
      if (applet) applet.script(script);
    }
  }
}
function jmolLoadInline(model, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  if (typeof(model) == "string")
    return applet.loadInlineString(model, "", false);
  else
    return applet.loadInlineArray(model, "", false);
}
function jmolLoadInlineScript(model, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  return applet.loadInlineString(model, script, false);
}
function jmolLoadInlineArray(ModelArray, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  if (!script)script=""
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  try {
    return applet.loadInlineArray(ModelArray, script, false);
  } catch (err) {
    //IE 7 bug
    return applet.loadInlineString(ModelArray.join("\n"), script, false);
  }
}
function jmolAppendInlineArray(ModelArray, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  if (!script)script=""
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  try {
    return applet.loadInlineArray(ModelArray, script, true);
  } catch (err) {
    //IE 7 bug
    return applet.loadInlineString(ModelArray.join("\n"), script, true);
  }
}
function jmolAppendInlineScript(model, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  return applet.loadInlineString(model, script, true);
}
function jmolCheckBrowser(action, urlOrMessage, nowOrLater) {
  if (typeof action == "string") {
    action = action.toLowerCase();
    if (action != "alert" && action != "redirect" && action != "popup")
      action = null;
  }
  if (typeof action != "string")
    alert("jmolCheckBrowser(action, urlOrMessage, nowOrLater)\n\n" +
          "action must be 'alert', 'redirect', or 'popup'");
  else {
    if (typeof urlOrMessage != "string")
      alert("jmolCheckBrowser(action, urlOrMessage, nowOrLater)\n\n" +
            "urlOrMessage must be a string");
    else {
      _jmol.checkBrowserAction = action;
      _jmol.checkBrowserUrlOrMessage = urlOrMessage;
    }
  }
  if (typeof nowOrLater == "string" && nowOrLater.toLowerCase() == "now")
    _jmolCheckBrowser();
}
////////////////////////////////////////////////////////////////
// Cascading Style Sheet Class support
////////////////////////////////////////////////////////////////
function jmolSetAppletCssClass(appletCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.appletCssClass = appletCssClass;
    _jmol.appletCssText = appletCssClass ? "class='" + appletCssClass + "' " : "";
  }
}
function jmolSetButtonCssClass(buttonCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.buttonCssClass = buttonCssClass;
    _jmol.buttonCssText = buttonCssClass ? "class='" + buttonCssClass + "' " : "";
  }
}
function jmolSetCheckboxCssClass(checkboxCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.checkboxCssClass = checkboxCssClass;
    _jmol.checkboxCssText = checkboxCssClass ? "class='" + checkboxCssClass + "' " : "";
  }
}
function jmolSetRadioCssClass(radioCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.radioCssClass = radioCssClass;
    _jmol.radioCssText = radioCssClass ? "class='" + radioCssClass + "' " : "";
  }
}
function jmolSetLinkCssClass(linkCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.linkCssClass = linkCssClass;
    _jmol.linkCssText = linkCssClass ? "class='" + linkCssClass + "' " : "";
  }
}
function jmolSetMenuCssClass(menuCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.menuCssClass = menuCssClass;
    _jmol.menuCssText = menuCssClass ? "class='" + menuCssClass + "' " : "";
  }
}
////////////////////////////////////////////////////////////////
// functions for INTERNAL USE ONLY which are subject to change
// use at your own risk ... you have been WARNED!
////////////////////////////////////////////////////////////////
var _jmol = {
  currentDocument: document,
  debugAlert: false,
  codebase: "",
  modelbase: ".",
  appletCount: 0,
  appletSuffixes: [],
  appletWindow: null,
  allowedJmolSize: [25, 2048, 300],   // min, max, default (pixels)
	  /*  By setting the _jmol.allowedJmolSize[] variable in the webpage 
	      before calling jmolApplet(), limits for applet size can be overriden.
		    2048 standard for GeoWall (http://geowall.geo.lsa.umich.edu/home.html)
	  */  
  buttonCount: 0,
  checkboxCount: 0,
  linkCount: 0,
  cmdCount: 0,
  menuCount: 0,
  radioCount: 0,
  radioGroupCount: 0,
  appletCssClass: null,
  appletCssText: "",
  buttonCssClass: null,
  buttonCssText: "",
  checkboxCssClass: null,
  checkboxCssText: "",
  radioCssClass: null,
  radioCssText: "",
  linkCssClass: null,
  linkCssText: "",
  menuCssClass: null,
  menuCssText: "",
  targetSuffix: 0,
  targetText: "",
  scripts: [""],
  params: {
	syncId: ("" + Math.random()).substring(3),
	progressbar: "true",
	progresscolor: "blue",
	boxbgcolor: "black",
	boxfgcolor: "white",
	boxmessage: "Downloading JmolApplet ..."
  },
  ua: navigator.userAgent.toLowerCase(),
  uaVersion: parseFloat(navigator.appVersion),
  os: "unknown",
  browser: "unknown",
  browserVersion: 0,
  hasGetElementById: !!document.getElementById,
  isJavaEnabled: navigator.javaEnabled(),
  isNetscape47Win: false,
  isIEWin: false,
  useIEObject: false,
  useHtml4Object: false,
  windowsClassId: "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",
  windowsCabUrl:
   "http://java.sun.com/update/1.5.0/jinstall-1_5_0_05-windows-i586.cab",
  isBrowserCompliant: false,
  isJavaCompliant: false,
  isFullyCompliant: false,
  initialized: false,
  initChecked: false,
  browserChecked: false,
  checkBrowserAction: "alert",
  checkBrowserUrlOrMessage: null,
  archivePath: null, // JmolApplet0.jar OR JmolAppletSigned0.jar
  previousOnloadHandler: null,
  ready: {}
}
with (_jmol) {
  function _jmolTestUA(candidate) {
    var ua = _jmol.ua;
    var index = ua.indexOf(candidate);
    if (index < 0)
      return false;
    _jmol.browser = candidate;
    _jmol.browserVersion = parseFloat(ua.substring(index+candidate.length+1));
    return true;
  }
  function _jmolTestOS(candidate) {
    if (_jmol.ua.indexOf(candidate) < 0)
      return false;
    _jmol.os = candidate;
    return true;
  }
  _jmolTestUA("konqueror") ||
  _jmolTestUA("safari") ||
  _jmolTestUA("omniweb") ||
  _jmolTestUA("opera") ||
  _jmolTestUA("webtv") ||
  _jmolTestUA("icab") ||
  _jmolTestUA("msie") ||
  (_jmol.ua.indexOf("compatible") < 0 && _jmolTestUA("mozilla"));
  _jmolTestOS("linux") ||
  _jmolTestOS("unix") ||
  _jmolTestOS("mac") ||
  _jmolTestOS("win");
  isNetscape47Win = (os == "win" && browser == "mozilla" &&
                     browserVersion >= 4.78 && browserVersion <= 4.8);
  if (os == "win") {
    isBrowserCompliant = hasGetElementById;
  } else if (os == "mac") { // mac is the problem child :-(
    if (browser == "mozilla" && browserVersion >= 5) {
      // miguel 2004 11 17
      // checking the plugins array does not work because
      // Netscape 7.2 OS X still has Java 1.3.1 listed even though
      // javaplugin.sf.net is installed to upgrade to 1.4.2
      eval("try {var v = java.lang.System.getProperty('java.version');" +
           " _jmol.isBrowserCompliant = v >= '1.4.2';" +
           " } catch (e) { }");
    } else if (browser == "opera" && browserVersion <= 7.54) {
      isBrowserCompliant = false;
    } else {
      isBrowserCompliant = hasGetElementById &&
        !((browser == "msie") ||
          (browser == "safari" && browserVersion < 125.12));
    }
  } else if (os == "linux" || os == "unix") {
    if (browser == "konqueror" && browserVersion <= 3.3)
      isBrowserCompliant = false;
    else
      isBrowserCompliant = hasGetElementById;
  } else { // other OS
    isBrowserCompliant = hasGetElementById;
  }
  // possibly more checks in the future for this
  isJavaCompliant = isJavaEnabled;
  isFullyCompliant = isBrowserCompliant && isJavaCompliant;
  // IE5.5 works just fine ... but let's push them to Sun Java
  isIEWin = (os == "win" && browser == "msie" && browserVersion >= 5.5);
  useIEObject = isIEWin;
  useHtml4Object =
   (os != "mac" && browser == "mozilla" && browserVersion >= 5) ||
   (os == "win" && browser == "opera" && browserVersion >= 8) ||
   (os == "mac" && browser == "safari" && browserVersion >= 412.2);
 doTranslate = true;
 haveSetTranslate = false;
}
function jmolSetCallback(callbackName,funcName) {
  _jmol.params[callbackName] = funcName
}
function jmolSetSyncId(n) {
  return _jmol.params["syncId"] = n
}
function jmolGetSyncId() {
  return _jmol.params["syncId"]
}
function jmolSetLogLevel(n) {
  _jmol.params.logLevel = ''+n;
}
	/*  AngelH, mar2007:
		By (re)setting these variables in the webpage before calling jmolApplet(), 
		a custom message can be provided (e.g. localized for user's language) when no Java is installed.
	*/
if (noJavaMsg==undefined) var noJavaMsg = 
        "You do not have Java applets enabled in your web browser, or your browser is blocking this applet.<br />\n" +
        "Check the warning message from your browser and/or enable Java applets in<br />\n" +
        "your web browser preferences, or install the Java Runtime Environment from <a href='http://www.java.com'>www.java.com</a><br />";
if (noJavaMsg2==undefined) var noJavaMsg2 = 
        "You do not have the<br />\n" +
        "Java Runtime Environment<br />\n" +
        "installed for applet support.<br />\n" +
        "Visit <a href='http://www.java.com'>www.java.com</a>";
function _jmolApplet(size, inlineModel, script, nameSuffix) {
	/*  AngelH, mar2007
		Fixed percent / pixel business, to avoid browser errors:
		put "px" where needed, avoid where not.		
	*/
  with (_jmol) {
    if (! nameSuffix)
      nameSuffix = appletCount;
    appletSuffixes.push(nameSuffix);
    ++appletCount;
    if (! script)
      script = "select *";
    var sz = _jmolGetAppletSize(size);
    var widthAndHeight = " width='" + sz[0] + "' height='" + sz[1] + "' ";
    var tHeader, tFooter;
    if (!codebase)
	jmolInitialize(".");
    if (useIEObject || useHtml4Object) {
      params.name = 'jmolApplet' + nameSuffix;
      params.archive = archivePath;
      params.mayscript = 'true';
      params.codebase = codebase;
    }
    if (useIEObject) { // use MSFT IE6 object tag with .cab file reference
      winCodebase = (windowsCabUrl ? " codebase='" + windowsCabUrl + "'\n" : "");
      params.code = 'JmolApplet';
      tHeader = 
        "<object name='jmolApplet" + nameSuffix +
        "' id='jmolApplet" + nameSuffix + "' " + appletCssText + "\n" +
	" classid='" + windowsClassId + "'\n" + winCodebase + widthAndHeight + ">\n";
      tFooter = "</object>";
    } else if (useHtml4Object) { // use HTML4 object tag
      tHeader = 
        "<object name='jmolApplet" + nameSuffix +
        "' id='jmolApplet" + nameSuffix + "' " + appletCssText + "\n" +
	" classid='java:JmolApplet'\n" +
        " type='application/x-java-applet'\n" +
        widthAndHeight + ">\n";
      tFooter = "</object>";
    } else { // use applet tag
      tHeader = 
        "<applet name='jmolApplet" + nameSuffix +
        "' id='jmolApplet" + nameSuffix +
        "' " + appletCssText +
        " code='JmolApplet'" +
        " archive='" + archivePath + "' codebase='" + codebase + "'\n" +
		widthAndHeight +
        " mayscript='true'>\n";
      tFooter = "</applet>";
    }
    var visitJava;
    if (isIEWin || useHtml4Object) {
		var szX = "width:" + sz[0]
		if ( szX.indexOf("%")==-1 ) szX+="px" 
		var szY = "height:" + sz[1]
		if ( szY.indexOf("%")==-1 ) szY+="px" 
      visitJava =
        "<p style='background-color:yellow; color:black; " +
		szX + ";" + szY + ";" +
        // why doesn't this vertical-align work?
	"text-align:center;vertical-align:middle;'>\n" +
		noJavaMsg +
        "</p>";
    } else {
      visitJava =
        "<table bgcolor='yellow'><tr>" +
        "<td align='center' valign='middle' " + widthAndHeight + "><font color='black'>\n" +
		noJavaMsg2 +
        "</font></td></tr></table>";
    }
    params.loadInline = (inlineModel ? inlineModel : "");
    params.script = (script ? _jmolSterilizeScript(script) : "");
    var t = tHeader + _jmolParams() + visitJava + tFooter;
    jmolSetTarget(nameSuffix);
    ready["jmolApplet" + nameSuffix] = false;
    if (_jmol.debugAlert)
      alert(t);
//    return _jmolDocumentWrite(t);
	return t;
  }
}
function _jmolParams() {
 var t = "";
 for (var i in _jmol.params)
	if(_jmol.params[i]!="")
		 t+="  <param name='"+i+"' value='"+_jmol.params[i]+"' />\n";
 return t
}
function _jmolInitCheck() {
  if (_jmol.initChecked)
    return;
  _jmol.initChecked = true;
  jmolInitialize(defaultdir, defaultjar)
}
function _jmolCheckBrowser() {
  with (_jmol) {
    if (browserChecked)
      return;
    browserChecked = true;
    if (isFullyCompliant)
      return true;
    if (checkBrowserAction == "redirect")
      location.href = checkBrowserUrlOrMessage;
    else if (checkBrowserAction == "popup")
      _jmolPopup(checkBrowserUrlOrMessage);
    else {
      var msg = checkBrowserUrlOrMessage;
      if (msg == null)
        msg = "Your web browser is not fully compatible with Jmol\n\n" +
              "browser: " + browser +
              "   version: " + browserVersion +
              "   os: " + os +
              "   isBrowserCompliant: " + isBrowserCompliant +
              "   isJavaCompliant: " + isJavaCompliant +
              "\n\n" + ua;
      alert(msg);
    }
  }
  return false;
}
function jmolSetXHTML(id) {
	_jmol.isXHTML = true
	_jmol.XhtmlElement = null
	_jmol.XhtmlAppendChild = false
	if (id){
		_jmol.XhtmlElement = document.getElementById(id)
		_jmol.XhtmlAppendChild = true
	}
}
function _jmolDocumentWrite(text) {
	if (_jmol.currentDocument) {
		if (_jmol.isXHTML && !_jmol.XhtmlElement) {
			var s = document.getElementsByTagName("script")
			_jmol.XhtmlElement = s.item(s.length - 1)
			_jmol.XhtmlAppendChild = false
		}
		if (_jmol.XhtmlElement) {
			_jmolDomDocumentWrite(text)
		} else {
			_jmol.currentDocument.write(text);
		}
	}
	return text;
}
function _jmolDomDocumentWrite(data) {
	var pt = 0
	var Ptr = []
	Ptr[0] = 0
	while (Ptr[0] < data.length) {
		var child = _jmolGetDomElement(data, Ptr)
		if (!child)break
		if (_jmol.XhtmlAppendChild)
			_jmol.XhtmlElement.appendChild(child)
		else
			_jmol.XhtmlElement.parentNode.insertBefore(child, _jmol.XhtmlElement); 
	}
}
function _jmolGetDomElement(data, Ptr, closetag, lvel) {
	var e = document.createElement("span")
	e.innerHTML = data
	Ptr[0] = data.length
	return e
//unnecessary?
	if (!closetag)closetag = ""
	if (!lvel) lvel = 0
	var pt0 = Ptr[0]
	var pt = pt0
	while (pt < data.length && data.charAt(pt) != "<") pt++
	if (pt != pt0) {
		var text = data.substring(pt0, pt)
		Ptr[0] = pt
		return document.createTextNode(text)
	}	
	pt0 = ++pt
	var ch
	while (pt < data.length && "\n\r\t >".indexOf(ch = data.charAt(pt)) < 0) pt++
	var tagname = data.substring(pt0, pt)
	var e = (tagname == closetag  || tagname == "/" ? "" 
		: document.createElementNS ? document.createElementNS('http://www.w3.org/1999/xhtml', tagname)
		: document.createElement(tagname));
	if (ch == ">") {
		Ptr[0] = ++pt
		return e
	}
	while (pt < data.length && (ch = data.charAt(pt)) != ">") {
		while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) pt++
		pt0 = pt
		while (pt < data.length && "\n\r\t =/>".indexOf(ch = data.charAt(pt)) < 0) pt++
		var attrname = data.substring(pt0, pt).toLowerCase()
		if (attrname && ch != "=") 
			e.setAttribute(attrname, "true")
		while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) pt++
		if (ch == "/") {
			Ptr[0] = pt + 2
			return e
		} else if (ch == "=") {
			var quote = data.charAt(++pt)
			pt0 = ++pt
			while (pt < data.length && (ch = data.charAt(pt)) != quote) pt++
			var attrvalue = data.substring(pt0, pt)
			e.setAttribute(attrname, attrvalue)
			pt++
		}
	}
	Ptr[0] = ++pt
	while (Ptr[0] < data.length) {
		var child = _jmolGetDomElement(data, Ptr, "/" + tagname, lvel+1)
		if (!child)break
		e.appendChild(child)
	}
	return e
}
function _jmolPopup(url) {
  var popup = window.open(url, "JmolPopup",
                          "left=150,top=150,height=400,width=600," +
                          "directories=yes,location=yes,menubar=yes," +
                          "toolbar=yes," +
                          "resizable=yes,scrollbars=yes,status=yes");
  if (popup.focus)
    poup.focus();
}
function _jmolReadyCallback(name) {
  if (_jmol.debugAlert)
    alert(name + " is ready");
  _jmol.ready["" + name] = true;
}
function _jmolSterilizeScript(script) {
  var inlineScript = script.replace(/'/g, "&#39;");
  if (_jmol.debugAlert)
    alert("script:\n" + inlineScript);
  return inlineScript;
}
function _jmolSterilizeInline(model) {
  var inlineModel =
    model.replace(/\r|\n|\r\n/g, "|").replace(/'/g, "&#39;");
  if (_jmol.debugAlert)
    alert("inline model:\n" + inlineModel);
  return inlineModel;
}
function _jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
  ++_jmol.radioCount;
  if (groupName == undefined || groupName == null)
    groupName = "jmolRadioGroup" + (_jmol.radioGroupCount - 1);
  if (!script)
    return "";
  if (labelHtml == undefined || labelHtml == null)
    labelHtml = script.substring(0, 32);
  if (! separatorHtml)
    separatorHtml = "";
  var scriptIndex = _jmolAddScript(script);
  var eospan = "</span>"
  var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input name='" 
	+ groupName + "' id='"+id+"' type='radio' onclick='_jmolClick(" +
         scriptIndex + _jmol.targetText + ");return true;' onmouseover='_jmolMouseOver(" +
         scriptIndex + ");return true;' onmouseout='_jmolMouseOut()' " +
	 (isChecked ? "checked='true' " : "") + _jmol.radioCssText + " />"
  if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
	t += eospan
	eospan = "";
  }
  t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan + separatorHtml;
  return t;
}
function _jmolFindApplet(target) {
  // first look for the target in the current window
  var applet = _jmolFindAppletInWindow(_jmol.appletWindow != null ? _jmol.appletWindow : window, target);
  // THEN look for the target in child frames
  if (applet == undefined)
    applet = _jmolSearchFrames(window, target);
  // FINALLY look for the target in sibling frames
  if (applet == undefined)
    applet = _jmolSearchFrames(top, target); // look starting in top frame
  return applet;
}
function _jmolGetApplet(targetSuffix){
 var target = "jmolApplet" + (targetSuffix ? targetSuffix : "0");
 var applet = _jmolFindApplet(target);
 if (applet) return applet
 if(!_jmol.alerted)alert("could not find applet " + target);
 _jmol.alerted = true;
 return null
}
function _jmolSearchFrames(win, target) {
  var applet;
  var frames = win.frames;
  if (frames && frames.length) { // look in all the frames below this window
   try{
    for (var i = 0; i < frames.length; ++i) {
      applet = _jmolSearchFrames(frames[i], target);
      if (applet)
        return applet;
    }
   }catch(e) {
	if (_jmol.debugAlert)
		alert("Jmol.js _jmolSearchFrames cannot access " + win.name + ".frame[" + i + "] consider using jmolSetAppletWindow()") 
   }
  }
  return applet = _jmolFindAppletInWindow(win, target)
}
function _jmolFindAppletInWindow(win, target) {
    var doc = win.document;
    // getElementById fails on MacOSX Safari & Mozilla	
    if (_jmol.useHtml4Object || _jmol.useIEObject)
      return doc.getElementById(target);
    else if (doc.applets)
      return doc.applets[target];
    else
      return doc[target]; 
}
function _jmolAddScript(script) {
  if (! script)
    return 0;
  var index = _jmol.scripts.length;
  _jmol.scripts[index] = script;
  return index;
}
function _jmolClick(scriptIndex, targetSuffix, elementClicked) {
  _jmol.element = elementClicked;
  jmolScript(_jmol.scripts[scriptIndex], targetSuffix);
}
function _jmolMenuSelected(menuObject, targetSuffix) {
  var scriptIndex = menuObject.value;
  if (scriptIndex != undefined) {
    jmolScript(_jmol.scripts[scriptIndex], targetSuffix);
    return;
  }
  var len = menuObject.length;
  if (typeof len == "number") {
    for (var i = 0; i < len; ++i) {
      if (menuObject[i].selected) {
        _jmolClick(menuObject[i].value, targetSuffix);
	return;
      }
    }
  }
  alert("?Que? menu selected bug #8734");
}
_jmol.checkboxMasters = {};
_jmol.checkboxItems = {};
function jmolSetCheckboxGroup(chkMaster,chkBox) {
	var id = chkMaster;
	if(typeof(id)=="number")id = "jmolCheckbox" + id;
	chkMaster = document.getElementById(id);
	if (!chkMaster)alert("jmolSetCheckboxGroup: master checkbox not found: " + id);
	var m = _jmol.checkboxMasters[id] = {};
	m.chkMaster = chkMaster;
	m.chkGroup = {};
	for (var i = 1; i < arguments.length; i++){
		var id = arguments[i];
		if(typeof(id)=="number")id = "jmolCheckbox" + id;
		checkboxItem = document.getElementById(id);
		if (!checkboxItem)alert("jmolSetCheckboxGroup: group checkbox not found: " + id);
		m.chkGroup[id] = checkboxItem;
		_jmol.checkboxItems[id] = m;
	}
}
function _jmolNotifyMaster(m){
	//called when a group item is checked
	var allOn = true;
	var allOff = true;
	for (var chkBox in m.chkGroup){
		if(m.chkGroup[chkBox].checked)
			allOff = false;
		else
			allOn = false;
	}
	if (allOn)m.chkMaster.checked = true;	
	if (allOff)m.chkMaster.checked = false;
	if ((allOn || allOff) && _jmol.checkboxItems[m.chkMaster.id])
		_jmolNotifyMaster(_jmol.checkboxItems[m.chkMaster.id])
}
function _jmolNotifyGroup(m, isOn){
	//called when a master item is checked
	for (var chkBox in m.chkGroup){
		var item = m.chkGroup[chkBox]
		item.checked = isOn;
		if (_jmol.checkboxMasters[item.id])
			_jmolNotifyGroup(_jmol.checkboxMasters[item.id], isOn)
	}
}
function _jmolCbClick(ckbox, whenChecked, whenUnchecked, targetSuffix) {
  _jmol.control = ckbox
  _jmolClick(ckbox.checked ? whenChecked : whenUnchecked, targetSuffix);
  if(_jmol.checkboxMasters[ckbox.id])
	_jmolNotifyGroup(_jmol.checkboxMasters[ckbox.id], ckbox.checked)
  if(_jmol.checkboxItems[ckbox.id])
	_jmolNotifyMaster(_jmol.checkboxItems[ckbox.id])
}
function _jmolCbOver(ckbox, whenChecked, whenUnchecked) {
  window.status = _jmol.scripts[ckbox.checked ? whenUnchecked : whenChecked];
}
function _jmolMouseOver(scriptIndex) {
  window.status = _jmol.scripts[scriptIndex];
}
function _jmolMouseOut() {
  window.status = " ";
  return true;
}
function _jmolSetCodebase(codebase) {
  _jmol.codebase = codebase ? codebase : ".";
  if (_jmol.debugAlert)
    alert("jmolCodebase=" + _jmol.codebase);
}
function _jmolOnloadResetForms() {
  // must be evaluated ONLY once
  _jmol.previousOnloadHandler = window.onload;
  window.onload =
  function() {
    with (_jmol) {
      if (buttonCount+checkboxCount+menuCount+radioCount+radioGroupCount > 0) {
        var forms = document.forms;
        for (var i = forms.length; --i >= 0; )
          forms[i].reset();
      }
      if (previousOnloadHandler)
        previousOnloadHandler();
    }
  }
}
////////////////////////////////////
/////extensions for getProperty/////
////////////////////////////////////
function _jmolEvalJSON(s,key){
 s=s+""
 if(!s)return []
 if(s.charAt(0)!="{"){
	if(s.indexOf(" | ")>=0)s=s.replace(/\ \|\ /g, "\n")
	return s
 }
 var A = eval("("+s+")")
 if(!A)return
 if(key && A[key])A=A[key]
 return A
}
function _jmolEnumerateObject(A,key){
 var sout=""
 if(typeof(A) == "string" && A!="null"){
	sout+="\n"+key+"=\""+A+"\""
 }else if(!isNaN(A)||A==null){
	sout+="\n"+key+"="+(A+""==""?"null":A)
 }else if(A.length){
    sout+=key+"=[]"
    for(var i=0;i<A.length;i++){
	sout+="\n"
	if(typeof(A[i]) == "object"||typeof(A[i]) == "array"){
		sout+=_jmolEnumerateObject(A[i],key+"["+i+"]")
	}else{
		sout+=key+"["+i+"]="+(typeof(A[i]) == "string" && A[i]!="null"?"\""+A[i].replace(/\"/g,"\\\"")+"\"":A[i])
	}
    }
 }else{
    if(key != ""){
	sout+=key+"={}"
	key+="."
    }
    for(var i in A){
	sout+="\n"
	if(typeof(A[i]) == "object"||typeof(A[i]) == "array"){
		sout+=_jmolEnumerateObject(A[i],key+i)
	}else{
		sout+=key+i+"="+(typeof(A[i]) == "string" && A[i]!="null"?"\""+A[i].replace(/\"/g,"\\\"")+"\"":A[i])
	}
    }
 } 
 return sout
}
function _jmolSortKey0(a,b){
 return (a[0]<b[0]?1:a[0]>b[0]?-1:0)
}
function _jmolSortMessages(A){
 if(!A || typeof(A)!="object")return []
 var B = []
 for(var i=A.length-1;i>=0;i--)for(var j=0;j<A[i].length;j++)B[B.length]=A[i][j]
 if(B.length == 0) return
 B=B.sort(_jmolSortKey0)
 return B
}
/////////additional extensions //////////
function _jmolDomScriptLoad(URL){
 //open(URL) //to debug
 _jmol.servercall=URL
 var node = document.getElementById("_jmolScriptNode")
 if (node && _jmol.browser!="msie"){
    document.getElementsByTagName("HEAD")[0].removeChild(node)
    node=null
 }
 if (node) {
   node.setAttribute("src",URL)
 } else {
   node=document.createElement("script")
   node.setAttribute("id","_jmolScriptNode")
   node.setAttribute("type","text/javascript")
   node.setAttribute("src",URL)
   document.getElementsByTagName("HEAD")[0].appendChild(node)
 }
}
function _jmolExtractPostData(url){
 S=url.split("&POST:")
 var s=""
 for(var i=1;i<S.length;i++){
	KV=S[i].split("=")
	s+="&POSTKEY"+i+"="+KV[0]
	s+="&POSTVALUE"+i+"="+KV[1]
 }
 return "&url="+escape(S[0])+s
}
function _jmolLoadModel(targetSuffix,remoteURL,array,isError,errorMessage){
 //called by server, but in client
 //overload this function to customize return
 _jmol.remoteURL=remoteURL
 if(isError)alert(errorMessage)
 jmolLoadInlineScript(array.join("\n"),_jmol.optionalscript,targetSuffix)
}
//////////user property/status functions/////////
function jmolGetStatus(strStatus,targetSuffix){
 return _jmolSortMessages(jmolGetPropertyAsArray("jmolStatus",strStatus,targetSuffix))
}
function jmolGetPropertyAsArray(sKey,sValue,targetSuffix) {
 return _jmolEvalJSON(jmolGetPropertyAsJSON(sKey,sValue,targetSuffix),sKey)
}
function jmolGetPropertyAsString(sKey,sValue,targetSuffix) {
 var applet = _jmolGetApplet(targetSuffix);
 if(!sValue)sValue=""
 return (applet ? applet.getPropertyAsString(sKey,sValue) + "" : "")
}
function jmolGetPropertyAsJSON(sKey,sValue,targetSuffix) {
 if(!sValue)sValue = ""
 var applet = _jmolGetApplet(targetSuffix);
 try {
  return (applet ? applet.getPropertyAsJSON(sKey,sValue) + "" : "")
 } catch(e) {
  return ""
 }
}
function jmolGetPropertyAsJavaObject(sKey,sValue,targetSuffix) {
 if(!sValue)sValue = ""
 var applet = _jmolGetApplet(targetSuffix);
 return (applet ? applet.getProperty(sKey,sValue) : null)
}
function jmolDecodeJSON(s) {
 return _jmolEnumerateObject(_jmolEvalJSON(s),"")
}
///////// synchronous scripting ////////
function jmolScriptWait(script, targetSuffix) {
  if(!targetSuffix)targetSuffix="0"
  var Ret=jmolScriptWaitAsArray(script, targetSuffix)
  var s = ""
  for(var i=Ret.length;--i>=0;)
  for(var j=0;j< Ret[i].length;j++)
	s+=Ret[i][j]+"\n"
  return s
}
function jmolScriptWaitOutput(script, targetSuffix) {
  if(!targetSuffix)targetSuffix="0"
  var ret = ""
  try{
   if (script) {
    _jmolCheckBrowser();
    var applet=_jmolGetApplet(targetSuffix);
    if (applet) ret += applet.scriptWaitOutput(script);
   }
  }catch(e){
  }
 return ret;
}
function jmolEvaluate(molecularMath, targetSuffix) {
  //carries out molecular math on a model
  if(!targetSuffix)targetSuffix="0"
  var result = "" + jmolGetPropertyAsJavaObject("evaluate", molecularMath, targetSuffix);
  var s = result.replace(/\-*\d+/,"")
  if (s == "" && !isNaN(parseInt(result)))return parseInt(result);
  var s = result.replace(/\-*\d*\.\d*/,"")
  if (s == "" && !isNaN(parseFloat(result)))return parseFloat(result);
  return result;
}
function jmolScriptEcho(script, targetSuffix) {
  // returns a newline-separated list of all echos from a script
  if(!targetSuffix)targetSuffix="0"
  var Ret=jmolScriptWaitAsArray(script, targetSuffix)
  var s = ""
  for(var i=Ret.length;--i>=0;)
  for(var j=Ret[i].length;--j>=0;)
        if (Ret[i][j][1] == "scriptEcho")s+=Ret[i][j][3]+"\n"
  return s.replace(/ \| /g, "\n")
}
function jmolScriptMessage(script, targetSuffix) {
  // returns a newline-separated list of all messages from a script, ending with "script completed\n"
  if(!targetSuffix)targetSuffix="0"
  var Ret=jmolScriptWaitAsArray(script, targetSuffix)
  var s = ""
  for(var i=Ret.length;--i>=0;)
  for(var j=Ret[i].length;--j>=0;)
        if (Ret[i][j][1] == "scriptStatus")s+=Ret[i][j][3]+"\n"
  return s.replace(/ \| /g, "\n")
}
function jmolScriptWaitAsArray(script, targetSuffix) {
 var ret = ""
 try{
  jmolGetStatus("scriptEcho,scriptMessage,scriptStatus,scriptError",targetSuffix)
  if (script) {
    _jmolCheckBrowser();
    var applet=_jmolGetApplet(targetSuffix);
    if (applet) ret += applet.scriptWait(script);
    ret = _jmolEvalJSON(ret,"jmolStatus")
    if(typeof ret == "object")
	return ret
  }
 }catch(e){
 }
  return [[ret]]
}
////////////   save/restore orientation   /////////////
function jmolSaveOrientation(id, targetSuffix) {  
 if(!targetSuffix)targetSuffix="0"
  return _jmol["savedOrientation"+id] = jmolGetPropertyAsArray("orientationInfo","info",targetSuffix).moveTo
}
function jmolRestoreOrientation(id, targetSuffix) {
 if(!targetSuffix)targetSuffix="0"
 var s=_jmol["savedOrientation"+id]
 if (!s || s == "")return
 s=s.replace(/1\.0/,"0")
 return jmolScriptWait(s,targetSuffix)
}
function jmolRestoreOrientationDelayed(id, delay, targetSuffix) {
 if(arguments.length < 2)delay=1;
 if(!targetSuffix)targetSuffix="0"
 var s=_jmol["savedOrientation"+id]
 if (!s || s == "")return
 s=s.replace(/1\.0/,delay)
 return jmolScriptWait(s,targetSuffix)
}
////////////  add parameter /////////////
/*
 * for adding callbacks or other parameters. Use:
   jmolSetDocument(0)
   var s= jmolApplet(....)
   s = jmolAppletAddParam(s,"messageCallback", "myFunctionName")
   document.write(s)
   jmolSetDocument(document) // if you want to then write buttons and such normally
 */
function jmolAppletAddParam(appletCode,name,value){
  if(value == "")return appletCode
  return appletCode.replace(/\<param/,"\n<param name='"+name+"' value='"+value+"' />\n<param")
}
///////////////auto load Research Consortium for Structural Biology (RCSB) data ///////////
function jmolLoadAjax_STOLAF_RCSB(fileformat,pdbid,optionalscript,targetSuffix){
 if(!_jmol.thismodel)_jmol.thismodel = "1crn"
 if(!_jmol.serverURL)_jmol.serverURL="http://fusion.stolaf.edu/chemistry/jmol/getajaxjs.cfm"
 if(!_jmol.RCSBserver)_jmol.RCSBserver="http://www.rcsb.org"
 if(!_jmol.defaultURL_RCSB)_jmol.defaultURL_RCSB=_jmol.RCSBserver+"/pdb/files/1CRN.CIF"
 if(!fileformat)fileformat="PDB"
 if(!pdbid)pdbid=prompt("Enter a 4-digit PDB ID:",_jmol.thismodel)
 if(!pdbid || pdbid.length != 4)return ""
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 var url=_jmol.defaultURL_RCSB.replace(/1CRN/g,pdbid.toUpperCase())
 if(fileformat!="CIF")url=url.replace(/CIF/,fileformat)
 _jmol.optionalscript=optionalscript
 _jmol.thismodel=pdbid
 _jmol.thistargetsuffix=targetSuffix
 _jmol.thisurl=url
 _jmol.modelArray = []
 url=_jmol.serverURL+"?returnfunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix+_jmolExtractPostData(url)
 _jmolDomScriptLoad(url)
 return url
}
/////////////// St. Olaf College AJAX server -- ANY URL ///////////
function jmolLoadAjax_STOLAF_ANY(url, userid, optionalscript,targetSuffix){
 _jmol.serverURL="http://fusion.stolaf.edu/chemistry/jmol/getajaxjs.cfm"
 if(!_jmol.thisurlANY)_jmol.thisurlANY = "http://www.stolaf.edu/depts/chemistry/mo/struc/data/ycp3-1.mol"
 if(!url)url=prompt("Enter any (uncompressed file) URL:", _jmol.thisurlANY)
 if(!userid)userid="0"
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 _jmol.optionalscript=optionalscript
 _jmol.thistargetsuffix=targetSuffix
 _jmol.modelArray = []
 _jmol.thisurl = url
 url=_jmol.serverURL+"?returnfunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix+_jmolExtractPostData(url)
 _jmolDomScriptLoad(url)
}
/////////////// Mineralogical Society of America (MSA) data /////////
function jmolLoadAjax_MSA(key,value,optionalscript,targetSuffix){
 if(!_jmol.thiskeyMSA)_jmol.thiskeyMSA = "mineral"
 if(!_jmol.thismodelMSA)_jmol.thismodelMSA = "quartz"
 if(!_jmol.ajaxURL_MSA)_jmol.ajaxURL_MSA="http://rruff.geo.arizona.edu/AMS/result.php?mineral=quartz&viewing=ajaxjs"
 if(!key)key=prompt("Enter a field:", _jmol.thiskeyMSA)
 if(!key)return ""
 if(!value)value=prompt("Enter a "+key+":", _jmol.thismodelMSA)
 if(!value)return ""
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 if(optionalscript == 1)optionalscript='load "" {1 1 1}'
 var url=_jmol.ajaxURL_MSA.replace(/mineral/g,key).replace(/quartz/g,value)
 _jmol.optionalscript=optionalscript
 _jmol.thiskeyMSA=key
 _jmol.thismodelMSA=value
 _jmol.thistargetsuffix=targetSuffix
 _jmol.thisurl=url
 _jmol.modelArray = []
 loadModel=_jmolLoadModel
 _jmolDomScriptLoad(url)
 return url
}
function jmolLoadAjaxJS(url, userid, optionalscript,targetSuffix){
 if(!userid)userid="0"
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 _jmol.optionalscript=optionalscript
 _jmol.thismodel=userid
 _jmol.thistargetsuffix=targetSuffix
 _jmol.modelArray = []
 _jmol.thisurl = url
 url+="&returnFunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix
 _jmolDomScriptLoad(url)
}
//// in case Jmol library has already been loaded:
}catch(e){}
///////////////moving atoms //////////////
// HIGHLY experimental!!
function jmolSetAtomCoord(i,x,y,z,targetSuffix){
    _jmolCheckBrowser();
      var applet=_jmolGetApplet(targetSuffix);
      if (applet) applet.getProperty('jmolViewer').setAtomCoord(i,x,y,z)
}
function jmolSetAtomCoordRelative(i,x,y,z,targetSuffix){
    _jmolCheckBrowser();
      var applet=_jmolGetApplet(targetSuffix);
      if (applet) applet.getProperty('jmolViewer').setAtomCoordRelative(i,x,y,z)
}
///////////////applet fake for testing buttons/////////////
if(document.location.search.indexOf("NOAPPLET")>=0){
	jmolApplet = function(w){
		var s="<table style='background-color:black' width="+w+"><tr height="+w+">"
		+"<td align=center valign=center style='background-color:white'>"
		+"Applet would be here"
		+"<p><textarea id=fakeApplet rows=5 cols=50></textarea>"
		+"</td></tr></table>"
		return _jmolDocumentWrite(s)
	}
	_jmolFindApplet = function(){return jmolApplet0}
	jmolApplet0 = {
	 script: function(script){document.getElementById("fakeApplet").value="\njmolScript:\n"+script}
	,scriptWait: function(script){document.getElementById("fakeApplet").value="\njmolScriptWait:\n"+script}	
	,loadInline: function(data,script){document.getElementById("fakeApplet").value="\njmolLoadInline data:\n"+data+"\n\nscript:\n"+script}
	}
}
///////////////////////////////////////////
  //  This should no longer be needed, jmolResizeApplet() is better; kept for backwards compatibility
  /*
	Resizes absolutely (pixels) or by percent of window (w or h 0.5 means 50%).
	targetSuffix is optional and defaults to zero (first applet in page).
	Both w and h are optional, but needed if you want to use targetSuffix.
		h defaults to w
		w defaults to 100% of window
	If either w or h is between 0 and 1, then it is taken as percent/100.
	If either w or h is greater than 1, then it is taken as a size (pixels). 
	*/
function jmolResize(w,h,targetSuffix) {
 _jmol.alerted = true;
 var percentW = (!w ? 100 : w <= 1  && w > 0 ? w * 100 : 0);
 var percentH = (!h ? percentW : h <= 1 && h > 0 ? h * 100 : 0);
 if (_jmol.browser=="msie") {
   var width=document.body.clientWidth;
   var height=document.body.clientHeight;
 } else {
   var netscapeScrollWidth=15;
   var width=window.innerWidth - netscapeScrollWidth;
   var height=window.innerHeight-netscapeScrollWidth;
 }
 var applet = _jmolGetApplet(targetSuffix);
 if(!applet)return;
 applet.style.width = (percentW ? width * percentW/100 : w)+"px";
 applet.style.height = (percentH ? height * percentH/100 : (h ? h : w))+"px";
 //title=width +  " " + height + " " + (new Date());
}
// 13 Jun 09 -- makes jmolResize() obsolete  (kept for backwards compatibility)
function jmolResizeApplet(size,targetSuffix) {
 // See _jmolGetAppletSize() for the formats accepted as size [same used by jmolApplet()]
 //  Special case: an empty value for width or height is accepted, meaning no change in that dimension.
 _jmol.alerted = true;
 var applet = _jmolGetApplet(targetSuffix);
 if(!applet)return;
 var sz = _jmolGetAppletSize(size, "px");
 sz[0] && (applet.style.width = sz[0]);
 sz[1] && (applet.style.height = sz[1]);
}
function _jmolGetAppletSize(size, units) {
	/* Accepts single number or 2-value array, each one can be one of:
	   percent (text string ending %), decimal 0 to 1 (percent/100), number, or text string (interpreted as nr.)
	   [width, height] array of strings is returned, with units added if specified.
	   Percent is relative to container div or element (which should have explicitly set size).
	*/
  var width, height;
  if ( (typeof size) == "object" && size != null ) {
    width = size[0]; height = size[1];
  } else {
    width = height = size;
  }
  return [_jmolFixDim(width, units), _jmolFixDim(height, units)];
}
function _jmolFixDim(x, units) {
  var sx = "" + x;
  return (sx.length == 0 ? (units ? "" : _jmol.allowedJmolSize[2])
	: sx.indexOf("%") == sx.length-1 ? sx 
  	: (x = parseFloat(x)) <= 1 && x > 0 ? x * 100 + "%"
  	: (isNaN(x = Math.floor(x)) ? _jmol.allowedJmolSize[2]
  		: x < _jmol.allowedJmolSize[0] ? _jmol.allowedJmolSize[0]
  	    : x > _jmol.allowedJmolSize[1] ? _jmol.allowedJmolSize[1] 
        : x) + (units ? units : ""));
}

function ScrollToNode(aNode) {
	var x = 0, y = 0;
	while(aNode != null) {
		x += aNode.offsetLeft;
		y += aNode.offsetTop;
		aNode = aNode.offsetParent;
	}
	window.scrollTo(x,y);
}
// Used for the SubMenu 
$(document).ready(function() {
	$('.subMenu > li').bind('mouseover', openSubMenu);	
	$('.subMenu > li').bind('mouseout', closeSubMenu);
//	$('.subMenu > li').bind('click', toggleSubMenu); // for mobile
	function toggleSubMenu() {
		$(this).find('ul').toggle();	
	};
	function openSubMenu() {
		$(this).find('ul').css('visibility', 'visible');	
	};
	function closeSubMenu() {
		$(this).find('ul').css('visibility', 'hidden');	
	};
});
// ------------------------ for browsing content (by Bastien - 07/10/2014) ------------------------
function show_hide_directions() 
{
	if($( window ).width() > 1240) /* on the sides */
	{	$('.direction').show();	}
	else
	{	
		$('.direction').hide();
		$('.big_direction').hide();	
	}
}
function toggle_big_directions() 
{
	$('.big_direction').toggle();
	return false;
}
$(document).ready
(
	function() 
	{	show_hide_directions();	}
);    
$( window ).resize(function() {
	show_hide_directions();
});
//----------------- clickOff -----------------
 // A way to detect when user clicked outside
 $.fn.clickOff = function(callback, selfDestroy) {
     var clicked = false;
     var parent = this;
     var destroy = selfDestroy || true;
     parent.click(function() {
         clicked = true;
     });
     $(document).click(function(event) { 
         if (!clicked) {
             callback(parent, event);
         }
         clicked = false;
     });
 };
//------------- END clickOff ----------------- 
 $(".big_direction").clickOff(function() {
	 $('.big_direction').hide();
 });
$('.direction').bind('mouseover',    toggle_big_directions);	
//$('.big_direction').bind('mouseout', toggle_big_directions); // this one is providing strange behavior... 
$(".big_direction").mouseleave(function(){
	$('.big_direction').hide();
  });
$('.direction').click( function() {  toggle_big_directions();return false;});
// Old method to open only the clicked item... (initial requirement) --> replaced by the one before.
	// ==> if not uncommented after 15/01/2015, can be removed! 
/*
$('.direction').click
(
   function()
   {   	   
	   $('.big_direction').hide(); // hide all the big data if you click on the other small icon
	   if($(this).attr('id')=="small_left")
	   {	$('#big_left').show();	}
	   else
	   {	$('#big_right').show();	}
	   return false;
    }   
 );
 */
$('.big_direction').click
(
   function()
   { 
	   $('.big_direction').hide(); // hide all the big data if you click on the other small icon
   }
);
//------------------------ for browsing content (by Bastien - 07/10/2014) ------------------------
function div_toggle(id) {
	$("#div_"+id).toggle();
    $(document).foundation('equalizer', 'reflow');
}
$(".cover_img_desc_link").click(function(){
	$("#cover_img_desc_trunc").toggle();
	var txt = $(".cover_img_desc_link").text();
	if (txt == "+")
	{	$(".cover_img_desc_link").html("-");	}
	else
	{	$(".cover_img_desc_link").html("+");	}	
});
$.each($('.load_img'), function(i,item) {
	check_img($(item));
});
/*
 * Load image
 * 	-> options:
 * 		- max width and height (with data-max-XX)
 * 		- hide if no image found (if parent_div)
 *
 E.g.:
  	<div id="if_img_div">
		<p class="load_img" parent_div="if_img_div" value="http://www.the/url/of/myphoto.png"
				data-max-width="700px" data-max-height="200px">
		</p>  
	</div>
 */
function check_img(item) {
	var URL = $(item).attr('value');
	var parent_div = $(item).attr('parent_div');
	var style = "";
	if (URL!='undefined') {	
		var img = new Image();
		img.src = URL;
		img.onload = function() {
			if (img.width>1 && img.height>1) {
			  var html = '<img src="'+URL+'" border="0" alt=""';
			  if ($(item).attr('data-max-height')) {
				  style = style + "max-height:"+ $(item).data('max-height') + ";";
			  }
			  if ($(item).attr('data-max-width')) {
				  style = style + "max-width:"+ $(item).data('max-width') + ";";
			  }
			  var html = '<img src="'+URL+'" border="0" alt=""';
			  if (style != '') {
				  html = html + ' style="'+style+'"';
			  }
			  html = html + '>';
			  $(item).html(html);		
		}
		else {
			if (parent_div!='undefined') {
				$('#'+parent_div).hide();
			}
		}
		};
		if (parent_div!='undefined') {	
			img.onerror = function() {
				console.log(parent_div);
			  $('#'+parent_div).hide();		  
			};
		}
	}
}
(function() {
  $(function() {
    var altmetric, timer;
    $('.toggleArticleStats').click(function() {
      $(this).next('div').toggle();
      return false;
    });
    $('#articleBrowserView').click(function(e) {
      var params, url;
      e.preventDefault();
      url = $(this).attr('data-url').split('?')[0];
      params = {};
      $('#selectView input, #selectView select').each(function() {
        var name, node;
        node = $(this);
        name = node.attr('name');
        if (typeof name !== 'undefined') {
          return params[name] = node.val();
        }
      });
      return location.href = url + '?' + $.param(params);
    });
    $('input[type="submit"][id^="articleBrowserExport"]').click(function(e) {
      e.preventDefault();
      if ($('#exportArticles input[type="checkbox"][name^="articles_ids"]:checked').size() === 0) {
        return alert('No article(s) selected');
      }
      $('#exportPosition').val($(this).attr('id').replace('articleBrowserExport_', ''));
      return $('#exportArticles').submit();
    });
    $('.selectUnselectAll').change(function() {
      var checked;
      checked = $(this).is(':checked');
      return $('#articles input[type="checkbox"][name^="articles_ids"]').attr('checked', checked);
    });
    $('a.tablepopup').click(function(e) {
      return e.preventDefault();
    });
    altmetric = $('div.altmetric-embed');
    if (altmetric.size() === 1) {
      timer = setInterval(function() {
        if ($('a', altmetric).attr('style')) {
          return altmetric.prev('div.menu-caption').show();
        }
      }, 100);
      return setTimeout(function() {
        return clearInterval(timer);
      }, 5000);
    }
  });

}).call(this);
(function() {
  $(function() {
    $('#cmd_instructions, #cmd_about').click(function() {
      var journal;
      journal = $('#opt_journal').val();
      if (!journal) {
        return;
      }
      return location.href = "/journal/" + journal + "/" + ($(this).attr('id').replace('cmd_', ''));
    });
    return $('#cmd_submit_manuscript').click(function() {
      var journal;
      journal = $('#opt_journal').val();
      return location.href = "/user/manuscripts/upload/?journal=" + journal;
    });
  });

}).call(this);
(function() {
  $(function() {
    return $('form div.element ul li').parent().parent().addClass('error');
  });

}).call(this);
(function() {
  $(function() {
    $('#leftcol a.expand').click(function() {
      return $(this).parent().next('div').toggle();
    });
    $('#maincol').on('click', 'span.link', function() {
      var id;
      id = $(this).attr('id').replace('handle', '');
      return $('#abstract' + id).toggle();
    });
    $('.tabbing').children('ul').addClass('ui-tabs-nav');
    $('.tabbing').children('ul').after('<div class="ui-tabs-panel"></div>');
    $('.tabbing').find('a').wrapInner('<span></span>');
    $('#unsubscribeJournal').click(function(e) {
      var email, f;
      e.preventDefault();
      email = $('input[name="email"]');
      if (email.val() === '' || email.val().indexOf('@') === -1) {
        if ($('div.error').length === 0) {
          email.after('<div class="error">Please input your email address.</div>').focus();
        }
        return false;
      }
      f = $('#subscribeForm');
      f.attr('action', $(this).attr('href'));
      return f.submit();
    });
    $('.tabbing').map(function(index) {
      var ajaxUrl, tab1, tab1div;
      tab1 = $(this);
      tab1div = tab1.children('div');
      tab1.children('ul').children('li').map(function(index) {
        var tmp_link, tmp_url;
        if (index > 3) {
          tmp_url = $(this).children('a').attr('href');
          tmp_link = $(this).children('a').children('span');
          return $.ajax({
            url: tmp_url + "?ajax_preview=count",
            success: function(data) {
              return tmp_link.append(" [" + data + "]");
            }
          });
        }
      });
      ajaxUrl = tab1.children('ul').children('li:first').children('a').attr('href');
      tab1.children('ul').children('li:first').addClass('ui-tabs-selected');
      return $.ajax({
        url: ajaxUrl,
        success: function(data) {
          return tab1div.html(data);
        }
      });
    });
    $('.tabbing > ul > *').bind("click", function() {
      var selected;
      selected = $(this);
      selected.siblings().removeClass('ui-tabs-selected');
      selected.addClass('ui-tabs-selected');
      $.ajax({
        url: selected.children('a').attr('href'),
        success: function(data) {
          return selected.parent().next('div').html(data);
        }
      });
      return false;
    });
    return $("select.si_order").on('change', function() {
      return window.location.href = $(this).data('url');
    });
  });

}).call(this);
(function() {
  $(function() {
    var counter, counter_amount, doUpdate, hasInvoice, label, originalAmountCHF, originalCurrency, showAlert, updatePayment;
    counter = 0;
    counter_amount = 0;
    if ($('#payment').size() === 0) {
      return;
    }
    label = $('#currency_chf').next('label');
    originalAmountCHF = label.data('amount');
    originalCurrency = label.data('currency');
    hasInvoice = label.data('has-invoice');
    updatePayment = function(radio) {
      var amount, exchange, total, unit;
      label = radio.next('label');
      if (hasInvoice) {
        unit = label.html();
        exchange = label.data('apc-exchange-rate');
        amount = originalAmountCHF;
      } else {
        unit = label.html();
        exchange = 1;
        amount = parseFloat($('#payAmount').val());
      }
      if (amount.toString() === 'NaN') {
        amount = 0;
      }
      total = parseFloat((amount * +exchange).toFixed(2));
      if (hasInvoice) {
        total = Math.round(total);
      }
      total = parseFloat((amount * +exchange).toFixed(2));
      if (total > parseFloat((2000 * +exchange).toFixed(2)) && counter_amount === 0) {
        alert('Please check the "Invoiced Amount" which is bigger than 2000 CHF.');
        counter_amount++;
      }
      $('#paymentSurcharge').html("+ " + amount + " " + unit);
      $('#paymentTotal').html(total + " " + unit);
      $('#payAmount').val(total);
      return $('#amount').val(parseFloat((total * 100).toFixed(2)));
    };
    doUpdate = function() {
      return updatePayment($('#payment input:checked'));
    };
    showAlert = function() {
      if (counter === 0) {
        alert("Please respect the invoice currency. If your payment currency differs from the invoice currency, please ask billing@mdpi.com for an updated invoice.");
      }
      return counter++;
    };
    $('#payment input[type="radio"]').on('click', function() {
      return doUpdate();
    });
    $('#payment input[type="radio"]').on('click', function() {
      return showAlert();
    });
    $('#payAmount').on('keydown', function() {
      setTimeout(function() {
        return $('#payAmount').val($('#payAmount').val().replace(/[^(\d|\.)]/, ''));
      });
      return 100;
    }).on('blur', function() {
      setTimeout(function() {
        return doUpdate();
      });
      return 100;
    });
    $('#clickPaymentTerms').on('click', function() {
      return $('#paymentTerms').prop("checked", !$('#paymentTerms').prop("checked"));
    });
    $('#refno').on('change', function() {
      if (!$(this).val()) {
        $('#payAmount').prop('readonly', false);
        return $("input[type=radio]").prop('readonly', false);
      }
    });
    doUpdate();
    return $('#payment').on('submit', function(e) {
      var radioboxes = $("input[type='radio']");
      var validated;
      validated = true;
      $(this).find('div.error').remove();
      if (!$('#refno').val()) {
        $('<div class="error">Please type your Invoice ID.</div>').insertAfter($('#refno'));
        validated = false;
      }
      if (!($('#payAmount').val() > 0)) {
        $('<div class="error">Please fill out the "Invoiced Amount" field.</div>').insertAfter($('#payAmount'));
        validated = false;
      }
      if (!$('#paymentTerms').is(':checked')) {
        $('<div class="error">Please read and agree to the Standard Terms and Conditions of Business of MDPI AG</div>').insertAfter($('#paymentTerms ~ a'));
        validated = false;
      }
      if (!radioboxes.is(':checked')) {
        $('<div class="error">Please select the payment currency</div>').insertAfter($('#currency_usd_label'));
        validated = false;
      }
      if (validated) {
        e.preventDefault();
        var invoiceID = $("#refno").val();
        var data = $("#refno").val();
        var url = $("#refno").data('ajax-url-paid')+'?term='+data;
        var form=this;

        $.ajax({url: url, dataType: 'json', success: function(results) {
          if(results.length == 0) {
            form.submit();
            return false;
          }
          var curr=results[0].currency.toLowerCase();
          $("#currency_"+curr).prop('checked', true);
          //$("#paymentDialog").show();
          var opt = {autoOpen: false,width: '500px', resizable: false,
            modal: true,
            buttons : {
              "Yes": function () {
                form.submit();
              },
              "No": function () {
                $('#payment')[0].reset();

                $(this).dialog("close");
              }
            }};
          $("#paymentDialog").dialog(opt).dialog("open");
          $("#paymentDialog").html('<p>The invoice with the ID '+ invoiceID +' has already been paid. Are you willing to proceed with an additional payment?</p>');
        }});
      }
      return validated;
    });
  });

}).call(this);
(function() {
  $(function() {
    var all_option, current_url, div_my_query_history, div_save_my_query, empty_option, fill_options, journal_changed, select_option, showHistoryQuery, showSaveQuery, update_sections, update_special_issues;
    empty_option = '<option value="">--</option>';
    all_option = '<option value="">all</option>';
    fill_options = function(node, items) {
      var data;
      data = $.map(items, function(val, key) {
        return "<option value=\"" + key + "\">" + val + "</option>";
      }).join('');
      return $(node).html(data !== '' ? all_option + data : empty_option);
    };
    select_option = function(options, value) {
      return options.each(function() {
        if ($(this).attr('value') === value) {
          $(this).attr('selected', 'selected');
        }
      });
    };
    update_sections = function(journal_name) {
      if (journal_name === '') {
        $('#section').html(empty_option);
        $('#special_issue').html(empty_option);
        return;
      }
      return $.getJSON("/journal/" + journal_name + "/get/sections", function(data) {
        var sectionId;
        fill_options('#section', data);
        sectionId = $('span[data-section-id]').attr('data-section-id');
        if (sectionId) {
          select_option($('#section > option'), sectionId);
          $('span[data-section-id]').remove();
        }
        return update_special_issues(journal_name, sectionId);
      });
    };
    update_special_issues = function(journal_name, section_id) {
      if (section_id == null) {
        section_id = '';
      }
      if (section_id === '') {
        section_id = 0;
      }
      return $.getJSON("/journal/" + journal_name + "/sections/" + section_id + "/get/special_issues", function(data) {
        var specialIssueId;
        fill_options('#special_issue', data);
        specialIssueId = $('span[data-special-issue-id]').attr('data-special-issue-id');
        if (specialIssueId) {
          select_option($('#special_issue > option'), specialIssueId);
          return $('span[data-special-issue-id]').remove();
        }
      });
    };
    journal_changed = function() {
      var journal_name;
      journal_name = $('#journal').val();
      if (journal_name) {
        return update_sections(journal_name);
      }
    };
    $('#journal').change(function() {
      return journal_changed();
    });
    $('#section').change(function() {
      return update_special_issues($('#journal').val(), $(this).val());
    });
    journal_changed();
    div_my_query_history = $('#div-my-query-history');
    div_save_my_query = $('#div-save-my-query');
    $('#save-my-query').click(function(e) {
      return showSaveQuery();
    });
    $('#my-query-history').click(function(e) {
      return showHistoryQuery();
    });
    current_url = $('#currentUrl').val();
    $('#saveurl_description').on('keydown', (function(_this) {
      return function(e) {
        if ((e.keyCode || e.which) === 13) {
          return $('#add-search-url').click();
        }
      };
    })(this));
    $('#add-search-url').click(function(e) {
      var deleteurl, description;
      $('#repeat-warning').hide('slow');
      deleteurl = $(this).data('deleteurl-url');
      description = $('#saveurl_description').val();
      if (description === '') {

      } else {
        $(this).val('saving');
        return $.get($(this).data('saveurl-url'), {
          url_desc: description,
          url: current_url
        }, function(res) {
          var delete_img;
          delete_img = div_my_query_history.data('delete-img-url');
          if (res === '0') {
            $('#saveurl_description').after('<span id="repeat-warning" style="display:block"><span style="color:red">The name has been used</span><span id="delete-warning"><img style="vertical-align:top" id="delete-warning" title="delete" src="' + delete_img + '"></span></span>');
            $('#delete-warning').click(function(e) {
              return $('#repeat-warning').hide('slow');
            });
            setTimeout(function() {
              return $('#repeat-warning').hide('slow');
            }, 6000);
            return $('#add-search-url').val('save');
          } else {
            showHistoryQuery();
            $('#add-search-url').val('save');
            div_my_query_history.append('<div class="searchurl"><label class="search_refine_label"><a href="' + current_url + '" title="' + description + '">' + description.substring(0, 25) + '</a></label><a style="vertical-align:top" href="javascript:void(0);" data-query-del="' + deleteurl + '?id=' + parseInt(res) + '" class="savedurl-delete"><img title="delete" alt="delete" src="' + delete_img + '"></a></div>');
            $('.savedurl-delete:last').bind("click", function(e) {
              var needHide;
              needHide = $(this).parent();
              return $.get($(this).data('query-del'), function(res) {
                if (res === '1') {
                  needHide.hide('slow');
                  if ($('.searchurl:visible').length === 1) {
                    return $('#my-query-history').hide('slow');
                  }
                }
              });
            });
            return $(".searchurl:last").fadeOut(1000).fadeIn(100);
          }
        });
      }
    });
    showSaveQuery = function() {
      $('#saveurl_description').val('');
      $('#repeat-warning').hide('slow');
      div_my_query_history.hide('slow');
      return div_save_my_query.toggle('slow');
    };
    showHistoryQuery = function() {
      $('#my-query-history').css({
        "display": "inline-block"
      });
      div_save_my_query.hide('slow');
      return div_my_query_history.toggle('slow');
    };
    $('.savedurl-delete').bind("click", function(e) {
      var needHide;
      needHide = $(this).parent();
      return $.get($(this).data('query-del'), function(res) {
        if (res === '1') {
          needHide.hide('slow');
          if ($('.searchurl:visible').length === 1) {
            return $('#my-query-history').hide('slow');
          }
        }
      });
    });
    return $('#cancel-saveurl').click(function(e) {
      div_save_my_query.hide('slow');
      return $('#save-my-query').css('font-weight', 'normal');
    });
  });

//MainPaymentBundle
}).call(this);
$(function() {
    function quickSearch(fieldName) {
      var input = $(fieldName);
      if (input.length == 0) {
        return;
      }
      var url = input.data('ajax-url');
      input.autocomplete({
        source: url,
        minLength: 5,
        select: function(event, ui){
          input.val(ui.item.value);
          $('#payAmount').val(ui.item.amount);
          $('#payAmount').prop('readonly', true);
          $("input[type=radio]").prop('disabled', true);
          $('#currency_'+ui.item.currency.toLowerCase()).prop('checked', true);
          $('#currency_'+ui.item.currency.toLowerCase()).prop('disabled', false);
          label = $('#currency_'+ui.item.currency.toLowerCase()).next('label')
          unit = label.html()
          amount = ui.item.amount
          total = (amount).toFixed(0)
          $('#paymentSurcharge').html("+ #{amount} #{unit}")
          $('#paymentTotal').html("#{total} #{unit}")
          $('#payAmount').val(total)
          $('#amount').val((total * 100).toFixed(0))
        }
      });
    }
    quickSearch('.open-invoices-quick-search');

    $("#refno").on('paste', function (e) {
      $(this).autocomplete("disable").one('keydown', function () {
        $(this).autocomplete("enable");
      });

      var input = $('.open-invoices-quick-search');
      var element = this;
      setTimeout(function () {
        var data = $(element).val().trim();
        var url = input.data('ajax-url')+'?term='+data;
        $.ajax({url: url, dataType: 'json', success: function(results){
          if(results.length == 0) {
            return false;
          }
          $html = "<div><h6>Invoice(s) found, would you like to process?<br>";

          $.each(results, function( index, result ) {
            $html += '<input type="radio" name="invoice" ';

            if(index == 0) {
              $html += 'checked="checked" ';
            }

            $html += 'value='+index+"> "+result.invoice_id+"; Amount: "+result.amount+" "+result.currency+"<br>";
          });

          $html += "</ul></h6></div>";
          $('<div></div>').appendTo('body')
              .html($html)
              .dialog({
                modal: true, title: 'Invoice for "'+data+'"', zIndex: 10000, autoOpen: true,
                width: '500px', resizable: false,
                buttons: {
                  Yes: function () {
                    var value = $("input:radio[name=invoice]").val();
                    $('#refno').val(results[value].invoice_id);
                    $('#payAmount').val(results[value].amount);
                    $('#payAmount').prop('readonly', true);
                    $("input[type=radio]").prop('disabled', true);
                    $('#currency_'+results[value].currency.toLowerCase()).prop('checked', true);
                    $('#currency_'+results[value].currency.toLowerCase()).prop('disabled', false);
                    label = $('#currency_'+results[value].currency.toLowerCase()).next('label')
                    unit = label.html()
                    amount = results[value].amount
                    total = (amount).toFixed(0)
                    $('#paymentSurcharge').html("+ #{amount} #{unit}")
                    $('#paymentTotal').html("#{total} #{unit}")
                    $('#payAmount').val(total)
                    $('#amount').val((total * 100).toFixed(0))
                    $(this).dialog("close");
                  },
                  No: function () {

                    $(this).dialog("close");
                  }
                },
                close: function (event, ui) {
                  $(this).remove();
                }
              });

        }});
      }, 0);
    })
  });

(function() {
  $(function() {
    var get_price;
    $('#quotation_link').click(function(e) {
      e.preventDefault();
      $("#quotation_wrapper").toggleClass('hide');
      $(document).foundation('equalizer', 'reflow');
    });
    get_price = function(word_num, has_manuscript) {
      var price;
      if (word_num <= 5000) {
        if (has_manuscript) {
          price = (word_num * 0.05).toFixed(2);
        } else {
          price = (word_num * 0.06).toFixed(2);
        }
      } else {
        if (has_manuscript) {
          price = (5000 * 0.05 + (word_num - 5000) * 0.03).toFixed(2);
        } else {
          price = (5000 * 0.06 + (word_num - 5000) * 0.04).toFixed(2);
        }
      }
      return price;
    };
    $("#quotation_form").submit(function(e) {
      var id, manuscript_id, params, price, susy_host, word_num;
      word_num = parseInt($('#word_num').val(), 10);
      id = $('#manuscript_id').val().match(/\d+/);
      if (id) {
        id = id[0];
      }
      manuscript_id = parseInt(id, 10);
      susy_host = $('#susy_host').val();
      if (word_num > 0) {
        if (manuscript_id > 0) {
          $.get('/is_under_review/' + manuscript_id, function(data) {
            var has_manuscript, params, price;
            has_manuscript = data.exist;
            price = get_price(word_num, has_manuscript);
            $("#price").html(price);
            params = encodeURIComponent(base64_encode('num=' + word_num + "&price=" + price));
            if (!has_manuscript) {
              $('#msg').html('No manuscript found!').show();
              return $('#proceed_btn').data('href', susy_host + 'user/pre_english/upload' + "?params=" + params);
            } else {
              $('#msg').html('').hide();
              return $('#proceed_btn').data('href', susy_host + 'user/manuscripts/pre_english_editing/' + data.hash_key + "?params=" + params);
            }
          });
        } else {
          price = get_price(word_num, false);
          $("#price").html(price);
          params = encodeURIComponent(base64_encode('num=' + word_num + "&price=" + price));
          $('#proceed_btn').data('href', susy_host + 'user/pre_english/upload' + "?params=" + params);
        }
      }
      return false;
    });
    return $('#proceed_btn').click(function(e) {
      if ($(this).data('href') === '#') { 
        e.preventDefault();
      } else { 
        window.location.href = $(this).data('href');
      }
    });
  });

}).call(this);
