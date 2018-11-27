function acmPopup(){var w=600,h=400,doi=j$(this).attr("data-doi"),left=screen.width/2-w/2,top=screen.height/2-h/2,acmUrl="https://doi-org.proxy.library.cornell.edu/"+doi;return window.open(acmUrl,"Rightslink","location=no,toolbar=no,directories=no,status=no, menubar=no,scrollbars=yes,resizable=yes,top="+top+"px,left="+left+"px,width="+w+"px,height="+h+"px"),!1}function loadSSOJs(){if(IBP_WS_ENABLED_FLAG)for(var JS_LOCATION=IBP_WS_ASSETS+"/ieee-mashup/js",scripts=["/common/jquery.json-2.2.min.js","/common/jquery.cookie-min.js","/auth/ieee-auth-constants-min.js","/auth/ieee-auth-include-min.js","/common/postmessage-min.js"],i=0;i<scripts.length;i++)j$.getScript(JS_LOCATION+scripts[i],function(){})}function changeTypeToPassword(prefix,id){j$("#"+prefix+"password-txt-span").hide(),j$("#"+prefix+"password-hidden-span").show(),j$("#"+id).focus()}function changeTypeToText(prefix,id){var pwd_val=j$.trim(j$("#"+id).val());pwd_val.length<=0&&(j$("#"+prefix+"password-txt-span").show(),j$("#"+prefix+"password-hidden-span").hide())}function redirectToWayf(){var url;url=j$.urlParam("url"),"0"==url&&(url=null==window.parent?window.location.href:window.parent.location.href),url.indexOf("guesthome.jsp")>=0&&(url="/Xplore/home.jsp"),url=j$.URLEncode(url),null==window.parent?window.location.href="/servlet/wayf.jsp?url="+url:window.parent.location.href="/servlet/wayf.jsp?url="+url}function attemptMergeCart(){if(!cartCookieRequested&&IS_INDIVIDUAL_USER){var cartCount=0;abortTimer();j$.ajax({url:"/xpl/mwGetIeeeUserInfo.jsp",method:"POST",cache:!1,timeout:28e3,async:!1,data:{}}).responseText;cartCookie=j$.cookie("ieeeUserInfoCookie"),null!=cartCookie&&cartCookie.length>0?(cartCookieObj=j$.parseJSON(cartCookie),cartCookieObj.cartItemQty&&(cartCount=cartCookieObj.cartItemQty),j$("#cartCount").html("Cart&nbsp;("+cartCount+")"),1==isFunction("mc_forceRefreshMiniCart")&&mc_forceRefreshMiniCart()):j$("#cartCount").html("Cart&nbsp;(0)"),cartCookieRequested=!0}else j$("#cartCount").html("Cart&nbsp;(0)")}function abortTimer(){clearInterval(tid)}function cartBoxCheck(){var pcart=j$(".mc-product-cart");pcart&&(pcart.find(".mc-header").length?pcart.hasClass("box")||pcart.addClass("box box-style-4"):pcart.removeClass("box box-style-4"))}function stopCrossSiteScripting(terms){return terms}function setCurrentCartCount(){var cartCount=0;if(cartBoxCheck(),null!=j$&&null!=j$.cookie)if(cartCookie=j$.cookie("ieeeUserInfoCookie"),cartCookie){cartCookie.indexOf("userInfoId")==-1&&attemptMergeCart();var cartCookieObj=j$.parseJSON(cartCookie);cartCookieObj.cartItemQty&&(cartCount=cartCookieObj.cartItemQty),j$("#cartCount").html("Cart("+cartCount+")")}else attemptMergeCart()}function addedToCartText(productType){j$("#addedToCartSpanBundle").show(1e3,function(){"Bundle"===productType?j$("#addedToCartSpanBundle").text("Bundled item is added to cart. To purchase individual item, remove bundle from cart."):j$("#addedToCartSpanBundle").text("Individual item is added to cart. To purchase bundle, remove individual item from cart.")}),j$("#addToCartSpan").find("#add-to-cart-button").attr({src:ASSETS_RELATIVE_PATH+"/img/btn.add-to-cart-g.png?cv="+ASSETS_VERSION,disabled:"disabled"})}function repaintWrapper(){j$("#flt-container").length&&(j$(".mc-header").length?j$("#flt-container").ibpFloatVertical({bottomCollisionId:"FooterWrapper"}):j$("#flt-container").unbind("cartScroll").attr("style",""))}function deletePopularTerms(url,contentId){j$.post(url,{},jasonCallBack,"json")}function jasonCallBack(data){j$("#actionMessage").html('<p class="validation-failed validation-advice" style="padding: 0.5em; margin-top: 1em;">'+data.Message+"</p>"),location.href=location.href}var j$=jQuery.noConflict(),tid,cartCookieRequested=!1,xhr;!function(b,c){var a,$=b.jQuery||b.Cowboy||(b.Cowboy={});$.throttle=a=function(e,f,j,i){function g(){function l(){d=+new Date,j.apply(o,n)}function k(){h=c}var o=this,m=+new Date-d,n=arguments;i&&!h&&l(),h&&clearTimeout(h),i===c&&m>e?l():f!==!0&&(h=setTimeout(i?k:l,i===c?e-m:e))}var h,d=0;return"boolean"!=typeof f&&(i=j,j=f,f=c),$.guid&&(g.guid=j.guid=j.guid||$.guid++),g},$.debounce=function(d,e,f){return f===c?a(d,e,!1):a(d,f,e!==!1)}}(this);var Xplore=Xplore||{};Xplore.config={THROTTLE_DELAY:1e3,DEBOUNCE_THRESHOLD:1e3},j$(document).ready(function(){j$(".acmPopUp").bind("click",acmPopup),jQuery.validator.addMethod("multiemails",function(value,element){if(this.optional(element))return!0;var emails=value.split(/[;,]+/);for(valid=!0,i=0;i<emails.length;i++)value=emails[i],valid=valid&&jQuery.validator.methods.email.call(this,j$.trim(value),element);return valid},jQuery.validator.messages.multiemails),j$.fn.doOnce=function(func){return this.length&&func.apply(this),this},jQuery.fn.placeholder.input||j$("label.overlabel").overlabel(),j$("#LayoutWrapper").delegate("#singleSignOnClose","click",function(event){event.preventDefault(),j$(this).closest("#singleSignOnFlyout").hide()}),j$("#LayoutWrapper").delegate("#singleSignOnClose","keypress",function(event){13==event.keyCode&&(j$(this).closest("#singleSignOnFlyout").hide(),j$("#singleSignOnLink").focus())}),j$("#singleSignOnLink").click(function(){return loadSSOJs(),j$("#modalWindowSignInError281").hide(),j$("#loadingImg").hide(),j$("#singleSignOnFlyout").slideDown(0),j$("#singleSignOnLink2").focus(),!1}),j$("#AuthTools .SubMenu a").width(j$("#SignOutFlyOutLink").width()-20>90?j$("#SignOutFlyOutLink").width()-20:90),j$.support.touchEvents=function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}(),j$("div.select-all-checkboxes").doOnce(function(){this.allCheckboxes()}),j$("#UtilityNav").doOnce(function(){this.dropdown({hclass:"Hover",el:".DHTMLMenu > *"})}),j$("#ToolBar").doOnce(function(){this.dropdown({hclass:"Hover",el:".DHTMLMenu > *"})}),j$("#toolbarSearchbar").doOnce(function(){this.dropdown({hclass:"hover",el:".DHTMLMenu > *"})}),j$("#popup-search-preferences-mysettings").delegate(j$(this),"click",function(){j$("#popup-search-preferences").trigger("click")}),IBP_WS_ENABLED_FLAG&&setCurrentCartCount()}),function(j$){j$.fn.dropdown=function(options){defaults={hclass:"hover",el:"li"};var options=j$.extend(defaults,options);return this.each(function(){var $this=j$(this),$top_level=$this.find(options.el).siblings().andSelf();$top_level.each(function(){j$(this).data("open",!1)});var showMenu=function(){$top_level.each(function(){1==j$(this).data("open")&&j$(this).removeClass(options.hclass).data("open",!1)}),j$(this).addClass(options.hclass).data("open",!0)},hideMenu=function(){1==j$(this).data("open")&&j$(this).removeClass(options.hclass).data("open",!1)};if(j$.fn.hoverIntent){var config={over:showMenu,timeout:500,out:hideMenu};$top_level.hoverIntent(config)}else $top_level.hover(showMenu,hideMenu)})}}(jQuery),function(j$){j$.fn.tabify=function(options){defaults={target_el:"div.section"};var options=j$.extend(defaults,options);return this.each(function(){var $this=j$(this),$tabs_nav=$this.find("div.nav-tabs"),$tabs=$tabs_nav.find("li"),$tab_secs=$this.find(options.target_el);$tabs.eq(0).addClass("active"),$tab_secs.hide(),$tab_secs.eq(0).show(),$tabs_nav.delegate("a","click",function(e){e.preventDefault();var $this_lnk=j$(this),this_href=$this_lnk.attr("href");$tab_secs.hide(),j$(this_href).show(),$tabs.removeClass("active"),$this_lnk.closest("li").addClass("active")})})}}(jQuery),function(j$){j$.fn.carousel=function(options){defaults={speed:500,indicate:!1,autoplay:!1,delay:1e4};var options=j$.extend(defaults,options);return this.each(function(){function gotoPage(page){var dir=page<current_page?-1:1,pages_move=Math.abs(current_page-page),distance=single_width*dir*visible*pages_move;$wrapper.filter(":not(:animated)").animate({scrollLeft:"+="+distance},options.speed,function(){0==page?($wrapper.scrollLeft(single_width*visible*pages),page=pages):page>pages&&($wrapper.scrollLeft(single_width*visible),page=1),current_page=page,options.indicate&&updateIndicators(page)})}function updateIndicators(ref){$indicators.find("span.active").removeClass("active"),$indicators.find("span").eq(ref-1).addClass("active")}var $indicators,$this=j$(this),$wrapper=$this.find("div.wrapper"),$slider=$wrapper.find("div.slider"),$items=$slider.find("div.item"),$single=$items.eq(0),single_width=$single.outerWidth(),visible=Math.ceil($wrapper.innerWidth()/single_width),current_page=1,pages=Math.ceil($items.length/visible);if($items.length<=visible)return!1;if($items.length%visible){for(var empty_items=visible-$items.length%visible,i=0;i<empty_items;i++)$slider.append('<div class="item empty" />');$items=$slider.find("div.item")}$items.filter(":first").before($items.slice(-visible).clone().addClass("clone")),$items.filter(":last").after($items.slice(0,visible).clone().addClass("clone")),$items=$slider.find("div.item"),$wrapper.scrollLeft(single_width*visible);var controls=j$('<div class="controls" />'),btn_next=(j$('<span class="button prev" />').on("click",function(){gotoPage(current_page-1)}).appendTo(controls),j$('<span class="button next" />').on("click",function(){gotoPage(current_page+1)}).appendTo(controls));if(controls.appendTo($this),options.indicate){$indicators=j$('<div class="indicators" />');for(var i=1;i<=pages;i++)j$("<span>"+i+"</span>").on("click",function(){var this_ref=j$(this).data("ref");gotoPage(this_ref)}).data("ref",i).appendTo($indicators);$indicators.find("span").eq(0).addClass("active"),$indicators.appendTo($this)}options.autoplay&&j$(window).load(function(){var play=!0;$this.hover(function(){play=!1},function(){play=!0}),setInterval(function(){play&&btn_next.trigger("click")},options.delay)})})}}(jQuery),function(j$){j$.fn.allCheckboxes=function(options){defaults={parent_el:"#results-blk"};var options=j$.extend(defaults,options);return this.each(function(){var $this=j$(this),$check=j$(this).find(":checkbox.all"),checked=!1;$check.prop("checked",!1),$this.show(),$targets=$check.parents(options.parent_el).find(":checkbox").not($check),$check.on("click",function(){$targets.prop("checked",this.checked),$check.prop("checked")&&(checked=!0)}),$targets.on("click",function(){checked&&($check.prop("checked",!1),checked=!1)})})}}(jQuery),j$.urlParam=function(name){var results=new RegExp("[\\?&]"+name+"=([^&#]*)").exec(window.location.href);return results?decodeURIComponent(results[1].replace(/\+/g," "))||0:0},j$.extend({URLEncode:function(c){var o="",x=0;c=c.toString();for(var r=/(^[a-zA-Z0-9_.]*)/;x<c.length;){var m=r.exec(c.substr(x));if(null!=m&&m.length>1&&""!=m[1])o+=m[1],x+=m[1].length;else{if(" "==c[x])o+="+";else{var d=c.charCodeAt(x),h=d.toString(16);o+="%"+(h.length<2?"0":"")+h.toUpperCase()}x++}}return o},URLDecode:function(s){for(var t,o=s,r=/(%[^%]{2})/;null!=(m=r.exec(o))&&m.length>1&&""!=m[1];)b=parseInt(m[1].substr(1),16),t=String.fromCharCode(b),o=o.replace(m[1],t);return o}}),j$("li.tl-print").on("click",function(){j$(this).hasClass("disabled")||window.print()}),function(j$){j$.fn.overlabel=function(options){var opts=j$.extend({},j$.fn.overlabel.defaults,options),selection=this.filter("label[for]").map(function(){var label=j$(this);label.css("display","inline");var id=label.attr("for"),field=label.siblings("#"+id);if(field){var o=j$.meta?j$.extend({},opts,label.data()):opts;label.addClass(o.label_class);var hide_label=function(){label.css(o.hide_css)},show_label=function(){this.value||label.css(o.show_css)};return j$(field).parent().addClass(o.wrapper_class).end().focus(hide_label).blur(show_label).each(hide_label).each(show_label),this}});return opts.filter?selection:selection.end()},j$.fn.overlabel.defaults={label_class:"overlabel-apply",wrapper_class:"overlabel-wrapper",hide_css:{"text-indent":"-10000px"},show_css:{"text-indent":"0px",cursor:"text"},filter:!1}}(jQuery),function(j$){j$.fn.actionBar=function(options){defaults={layout:"horizontal"};var options=j$.extend(defaults,options);return this.each(function(){var $this=j$(this),$win=j$(window),doc_h=j$(document).height(),$mask=j$('<div id="modal-mask" />');$this.bind("click",function(e){if(e.preventDefault(),$this.parent().hasClass("disabled"))return!1;$this.focus();var $pop_el=j$("#pop-container"),close=function(){j$("#modal-mask").remove(),$pop_el.empty()};if(j$("#modal-mask").length)return close(),!1;if(!$pop_el.length){var $pop_el=j$('<div id="pop-container" />').appendTo($this.parents("div.actionbar"));j$(document).on("click","span.close-popup",function(){close()})}"relative-to-object"==options.layout?$pop_el.css({marginLeft:$this.parent().width(),marginTop:-$this.position().top}):"vertical"==options.layout?$pop_el.css({marginTop:$this.parent().position().top}):$pop_el.css({marginLeft:$this.position().left});var $hrefUrl=$this.attr("href"),$actionId=options.actionId;$pop_el.loadUrl({hrefURL:$hrefUrl,actionId:$actionId}),$mask.on("click",function(){close()}).css({width:$win.width(),height:doc_h}).appendTo(j$("body"))})})}}(jQuery),j$(function(){j$(".mw-contAdmin").qtip({content:{text:j$("#contAdminWindowContent")},show:{event:"click"},hide:{fixed:!0,event:"unfocus"},position:{my:"top left",at:"bottom left",adjust:{x:2,y:2}},style:{width:"auto",classes:"qtip-lightIeee",tip:!1},events:{render:function(event,api){var $this=j$(this);$this.delegate(".mwclose","click",function(){$this.qtip("hide")})}}})});var DesktopReporting=function(){var el={fields:".form-group [id^=drp]",save:".js-save-info",error:".error"},config={getExpiry:function(){var future=new Date;return new Date(future.setDate(future.getDate()+30))},errorClass:"invalid",errorNode:"<span class='error'>This field is required.</span>",cookiePath:"/",cookieDomain:location.hostname},bindEvents=function(){jQuery(el.save).on("click",function(e){if(e.preventDefault(),jQuery(el.fields).prev(el.error).remove(),areFieldsValid()){if(writeCookies(),jQuery.urlParam("pdfRequest")){var articleUrl="/stamp/stamp.jsp?tp=&arnumber="+jQuery.urlParam("arnumber");Modal.closeAndRedirectToUrl(articleUrl)}else if(jQuery.urlParam("getPdfRequest")){var articleUrl="/stampPDF/getPDF.jsp?tp=&arnumber="+jQuery.urlParam("arnumber");Modal.closeAndRedirectToUrl(articleUrl)}else if(jQuery.urlParam("htmlRequest")){var articleUrl="/document/"+jQuery.urlParam("arnumber")+"/";Modal.closeAndRedirectToUrl(articleUrl)}else if(jQuery.urlParam("getIcpRequest")){var articleUrl="/xpls/icp.jsp?arnumber="+jQuery.urlParam("arnumber");Modal.closeAndRedirectToUrl(articleUrl)}Modal.hide()}return!1}),jQuery(el.fields).on("focus",function(){var $this=jQuery(this);$this.removeClass(config.errorClass).prev(el.error).remove()})},areFieldsValid=function(){var response=!0;return jQuery(el.fields).each(function(key,field){var $field=jQuery(field);$field.val()&&0!=$field.val().trim().length&&!new RegExp("^[-]+$").test($field.val().trim())||($field.addClass(config.errorClass),$field.before(config.errorNode),response=!1)}),response},writeCookies=function(){jQuery(el.fields).each(function(key,field){var $this=jQuery(this);jQuery.cookie(this.id,$this.val(),{expires:config.getExpiry(),path:config.cookiePath,domain:config.cookieDomain})})},init=function(){bindEvents()};return{init:init}}();j$(function(){j$(".JumpLink a").click(function(event){event.preventDefault();var mainContentId="#Body",pathname=window.location.pathname;pathname.indexOf("/xpl/articleDetails.jsp")>-1?mainContentId="#article-page-hdr":pathname.indexOf("/document/")>-1?mainContentId="#full-text-section":pathname.indexOf("home.jsp")>-1?mainContentId="#homePageTabs":(pathname.indexOf("/search/searchresult.jsp")>-1||pathname.indexOf("/browse/")>-1||pathname.indexOf("/virtual-journals/")>-1||pathname.indexOf("/courses/")>-1)&&(mainContentId="#xplMainContent");var j$mainContent=j$(mainContentId);j$("html, body").animate({scrollTop:j$mainContent.offset().top},750,function(){j$mainContent.focus().attr("tabindex","-1")})})}),function(){function isAbstractHidden($abstractButton){return"Click to expand"===$abstractButton.find("img").attr("alt")}function toggleAbstract(state,$button){var $state=$button.find("img"),$abstract=$button.closest(".controls").next(".abstract");handler={show:function(){$state.attr("src",ASSETS_RELATIVE_PATH+"/img/btn.quick-abstract.expanded.gif?cv="+ASSETS_VERSION),$state.attr("alt","Click to collapse"),$abstract.slideDown()},hide:function(){$state.attr("src",ASSETS_RELATIVE_PATH+"/img/btn.quick-abstract.collapsed.gif?cv="+ASSETS_VERSION),$state.attr("alt","Click to expand"),$abstract.slideUp()}},handler[state]()}jQuery("#results-blk .quick-ab-button").on("click",function(){var $this=jQuery(this);return isAbstractHidden($this)?toggleAbstract("show",$this):toggleAbstract("hide",$this),!1})}();