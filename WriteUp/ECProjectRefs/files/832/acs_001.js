if (!acsJsIncluded) {
	var acsJsIncluded = true;
	
	
	function acsIsLoaded() {
		return document.readyState == 'loaded' || document.readyState == 'interactive' || document.readyState == 'complete';
	}

	function showHide(linkId, elementId, newStyle, showText, hideText) {
		if (showText == null) {showText = "(Show)";}
		if (hideText == null) {hideText = "(Hide)";}
		if (linkId.innerHTML) {link = linkId;}
		else {link = document.getElementById(linkId);}
		if (newStyle === true) {newStyle = 'inline-block';}
		else if (!newStyle) {newStyle = 'block';}

		if (link.innerHTML == showText) {
			link.innerHTML = hideText;
			try {document.getElementById(elementId).style.display = newStyle;}
			catch (e) {document.getElementById(elementId).style.display = 'inline-block';}//IE if given table-cell or similar
		}
		else {
			link.innerHTML = showText;
			document.getElementById(elementId).style.display = 'none';
		}
	}

	function simpleShowHide(elementId, newStyle) {
		if (!newStyle) {newStyle = 'block';}
		if (document.getElementById(elementId).style.display == 'none') {
			try {document.getElementById(elementId).style.display = newStyle;}
			catch (e) {document.getElementById(elementId).style.display = 'inline-block';}//IE if given table-cell or similar
		}
		else {document.getElementById(elementId).style.display = 'none';}
	}

	//Intended for toggling FCK when showing/hiding or similar needs
	function extendedShowHide(elementId, newStyle, showCommand, hideCommand) {
		if (newStyle == '') {newStyle = 'block';}
		if (document.getElementById(elementId).style.display == 'none') {
			try {document.getElementById(elementId).style.display = newStyle;}
			catch (e) {document.getElementById(elementId).style.display = 'inline-block';}//IE if given table-cell or similar
			if (showCommand) {eval(showCommand);}
		} else {
			if (hideCommand) {eval(hideCommand);}
			document.getElementById(elementId).style.display = 'none';
		}
	}

	//case insensetive on class names
	function changeClassStyle(className, properties, changes) {//(string, new Array(), new Array())
		if (!document.styleSheets) {return;}
		var rule = null;
		for (sheetCtr=0; sheetCtr<document.styleSheets.length; sheetCtr++){
			var sheet = document.styleSheets[sheetCtr];
			var rules = (sheet.cssRules? sheet.cssRules : sheet.rules);
			for (rulesCtr = 0; rulesCtr < rules.length; rulesCtr++){
				if(rules[rulesCtr] && rules[rulesCtr].selectorText && rules[rulesCtr].selectorText.toLowerCase() == className.toLowerCase()){
					rule = rules[rulesCtr];
					break;
				}//end if
			}//end foreach rule
			if (rule != null) {break;}
		}//end foreach sheet
		if (rule == null) {return false;}
		for (var index in properties) {eval("rule."+properties[index]+" = '"+changes[index]+"';");}
		return true;
	}//end function

	function includeOnce(src) {
		var scripts = document.getElementsByTagName('script');
		if (scripts) {
		  for (var ctr = 0; ctr < scripts.length; ctr++) {
			if (scripts[ctr].src == src) {return;}
		  }
		}
		var script = document.createElement('script');
		script.src = src;
		script.type = 'text/javascript';
		(document.getElementsByTagName('HEAD')[0] || document.body).appendChild(script);
	  }
/************************************************************************************************************************************************************************

Positioning/dragging functions

************************************************************************************************************************************************************************/

	function acsGetMousePosition(e) {
		var x,y;
		if(e.pageX || e.pageY) {
			x = e.pageX;
			if (window.pageXOffset) {x = x - window.pageXOffset;}
			y = e.pageY;
			if (window.pageYOffset) {y = y - window.pageYOffset;}
		} else {
			x = e.clientX;
			y = e.clientY;

			var browser = navigator.appName;
			if (browser == 'Microsoft Internet Explorer') {
				var b_version = navigator.appVersion;
				var version = parseFloat(b_version);
				if (version < 8) {
		 	x += (document.body.scrollLeft - document.body.clientLeft);
		 	y += (document.body.scrollTop - document.body.clientTop);
				}//end if version < 8
			}//end if MSIE
		}
		return {x:x,y:y};
	}//end function

	function acsGetElementPosition(e){
		var left = 0;
		var top = 0;
		while (e.offsetParent){
			if (e.offsetLeft) {left += e.offsetLeft;}
			if (e.offsetTop) {top += e.offsetTop;}
			e = e.offsetParent;
		}
		if (e.offsetLeft) {left += e.offsetLeft;}
		if (e.offsetTop) {top += e.offsetTop;}
		return {x:left, y:top};
	}//end function

//Begin Move Functions
	var acsMoveElementEle = null;
	var offsetX, offsetY, startX, startY = null;

	function acsMoveElement (e) {
		var x,y;
		e = e ? e : window.event;

		var pos = acsGetMousePosition(e);

		if (offsetX == null) {offsetX = pos.x;}
		if (offsetY == null) {offsetY = pos.y;}

		x = startX - (offsetX - pos.x);
		y = startY - (offsetY - pos.y);
		x = x < 0 ? 0 : x;
		y = y < 10 ? 10 : y;//using 10 to account for admin menu

		acsMoveElementEle.style.left = parseInt(x)+'px';
		acsMoveElementEle.style.top = parseInt(y)+'px';
	}//end function

	function acsMoveElementDown (ele) {
		acsMoveElementEle = ele;

		var pos = acsGetElementPosition(acsMoveElementEle);
		startX = pos.x;
		startY = pos.y;

		document.onmousemove = acsMoveElement;
		document.onmouseup = acsMoveElementUp;
	}//end function

	function acsMoveElementUp () {
		document.onmousemove = null;
		document.onmouseup = null;

		acsMoveElementEle.style.display = 'none';
		setTimeout(function() {acsMoveElementFinish();}, 10);
		offsetX = offsetY = startX = startY = null;
	}//end function

	//FF had issue with succesive attempts to move if item was not 'reset' by hiding and then reshowing
	function acsMoveElementFinish() {
		acsMoveElementEle.style.display = 'block';
		acsMoveElementEle = null;
	}
//Get Size Functions
	function getViewportSize () {
		var viewportWidth;
		var viewportHeight;
		if (typeof window.innerWidth != 'undefined') {
			viewportWidth = window.innerWidth;
			viewportHeight = window.innerHeight;
		} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
			viewportWidth = document.documentElement.clientWidth;
			viewportHeight = document.documentElement.clientHeight;
		} else {
			viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
			viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
		}
		return {width:viewportWidth, height:viewportHeight};
	}//end function


	/************************************************************************************************************************************************************************

	Functions for adding RTF editor

	************************************************************************************************************************************************************************/
//CKEditor
	function addCk(fieldId, toolbar, cssPath, height, configOptions) {
		if (typeof(CKEDITOR) == 'undefined') {return;}
		if (CKEDITOR.instances[fieldId]) {CKEDITOR.instances[fieldId].setData(document.getElementById(fieldId).value);}
		else {CreateEditorCk(fieldId, toolbar, cssPath, height, configOptions);}
	}//end function

	function CreateEditorCk(fieldId, toolbar, cssPath, height, configOptions) {
		var defaultPath = '/sites/all/themes/asa/style.css';
		var sBasePath = '/sites/all/modules/ckeditor/ckeditor/';

		if (typeof(toolbar) == 'undefined') {toolbar = 'ACS_Default';}
		else if (toolbar.indexOf(' ') > 0) {toolbar = toolbar.replace(' ', '_');}
		if (typeof(height) == 'undefined') {height = 350;}

		config = {};
		config.baseHref = sBasePath;
		config.width = '100%' ;
		config.height = height ;
		config.toolbar = toolbar;
		config.resize_enabled = true;
		if (typeof(cssPath) == 'string') {config.contentsCss = new Array(defaultPath, cssPath);}
		else if (cssPath && typeof(cssPath) == 'object') {
			cssPath[cssPath.length] = defaultPath;
			config.contentsCss = cssPath;
		} else {config.contentsCss = defaultPath;}

		if (configOptions && typeof(configOptions) == 'object') {
			for (var i in configOptions) {eval("config."+i+" = '"+configOptions[i]+"';");}
		}//end if sent config options
		CKEDITOR.replace(fieldId, config);
	}//end function

//formId deprecated. removeFck(formId, fieldId)
	function removeCk(fieldId) {
		if (typeof(CKEDITOR) == 'undefined') {return;}
		if (CKEDITOR.instances[fieldId]) {
			try{CKEDITOR.instances[fieldId].destroy();}
			catch (e) {/*Not working, need to fix removal*/}
		}
	}//end function

	function saveCk(fieldId) {
		if (typeof(CKEDITOR) == 'undefined') {return;}
		if (CKEDITOR.instances[fieldId]) {CKEDITOR.instances[fieldId].updateElement();}
	}//end function


//FCK
	function addFck(fieldId, toolbar, cssPath, height) {
		// Try to get the FCKeditor instance, if available.
		var oEditor ;
		if ( typeof( FCKeditorAPI ) != 'undefined' ) {oEditor = FCKeditorAPI.GetInstance(fieldId) ;}

		// Get the _Textarea and _FCKeditor DIVs.
		var eTextareaDiv = document.getElementById(fieldId);

		// If it is the first time, create the editor.
		if ( !oEditor ) {oEditor = CreateEditor(fieldId, toolbar, cssPath, height);}
		else {oEditor.SetData( document.getElementById(fieldId).value );}

		// Switch the DIVs display.
		eTextareaDiv.style.display = 'none' ;
	}//end function

	//formId deprecated. left for backward compat
	function removeFck(formId, fieldId) {
		var oEditor ;
		if (typeof( FCKeditorAPI ) != 'undefined') {oEditor = FCKeditorAPI.GetInstance(fieldId) ;}
		if (oEditor) {
			document.getElementById(fieldId).value = oEditor.GetXHTML();
			DestroyEditor(formId, fieldId);
		}
	}//end function

	function saveFck(fieldId) {
		var oEditor;
		if (typeof( FCKeditorAPI ) != 'undefined') {oEditor = FCKeditorAPI.GetInstance(fieldId);}
		if (oEditor) {document.getElementById(fieldId).value = oEditor.GetXHTML();}
	}//end function

	function CreateEditor(fieldId, toolbar, cssPath, height) {
		var defaultPath = '/sites/all/themes/asa/style.css';
		var sBasePath = '/sites/all/modules/fckeditor/fckeditor/';

		if (typeof(toolbar) == 'undefined') {toolbar = 'Basic';}
		if (typeof(height) == 'undefined') {height = 350;}

		// Create an instance of FCKeditor (using the target textarea as the name).
		var oFCKeditor = new FCKeditor(fieldId) ;
		oFCKeditor.BasePath = sBasePath ;
		oFCKeditor.Width = '100%' ;
		oFCKeditor.Height = height ;
		oFCKeditor.ToolbarSet = toolbar;

		if (typeof(cssPath) == 'string') {oFCKeditor.Config['EditorAreaCSS'] = new Array(defaultPath, cssPath);}
		else if (typeof(cssPath) == 'object') {
			cssPath[cssPath.length] = defaultPath;
			oFCKeditor.Config['EditorAreaCSS'] = cssPath;
		} else {oFCKeditor.Config['EditorAreaCSS'] = defaultPath;}

		oFCKeditor.ReplaceTextarea() ;
		return oFCKeditor;
	}//end function

	//formId deprecated. left for backward compat
	function DestroyEditor(formId, fieldId) {
		var configElement = document.getElementById(fieldId+'___Config');
		var frameElement = document.getElementById(fieldId+'___Frame');
		var textarea = document.getElementById(fieldId);//document.forms[formId].elements[fieldId];
		var editor = FCKeditorAPI.GetInstance(fieldId);

	 	if (editor!=null && configElement && frameElement && configElement.parentNode==textarea.parentNode && frameElement.parentNode==textarea.parentNode && document.removeChild)
	 	{
	 		editor.UpdateLinkedField();
	 		configElement.parentNode.removeChild(configElement);
	 		frameElement.parentNode.removeChild(frameElement);
	 		textarea.style.display = '';
	 		delete FCKeditorAPI.__Instances[fieldId];
	 		delete editor;
	 	}
	}
	
	/************************************************************************************************************************************************************************
	
	
	
	************************************************************************************************************************************************************************/
	//list attributes of an object
	function listObjectAttributes(obj) {
		var out = '';
		for (var i in obj) {
			out = out + "\n" + i;
		}
		alert(':'+out+':');
	}//end function
	
	function acsAddJs(url, type) {
		if(!this.added) {this.added = Array();}
		for (var i in this.added) {if (this.added[i] == url) {return true;}}
		this.added[this.added.length] = url;
	
		if (type == 'css') {
			var jsLoad = document.createElement("link")
			jsLoad.setAttribute("rel", "stylesheet");
			jsLoad.setAttribute("type", "text/css");
			jsLoad.setAttribute("href", url);
		} else {
			if (typeof($) != 'undefined') {
				var jsLoaded = false;
				$("script").each(function() {
					if ($(this).attr("src") == url) {jsLoaded = true;}
				});
				if (jsLoaded === true) {return true;}
			}
			
			var jsLoad = document.createElement('script');
			jsLoad.type = 'text/javascript';
			jsLoad.async = true;
			jsLoad.src = url;
			
		}
		(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(jsLoad);
	
		return true;
	}//end function
	
	function acsAddJsString(content, type) {
		if(!this.added) {this.added = Array();}
		//for (var i in this.added) {if (this.added[i] == file) {return true;}}
		//this.added[this.added.length] = file;
	
		if (type == 'css') {
/*Not tested
			var jsLoad = document.createElement("link")
			jsLoad.setAttribute("rel", "stylesheet");
			jsLoad.setAttribute("type", "text/css");
			jsLoad.textContent(content);
*/
		} else {
			var jsLoad = document.createElement('script');
			jsLoad.setAttribute("type", "text/javascript");
			jsLoad.innerHTML = content;
		}
		document.getElementsByTagName("head")[0].appendChild(jsLoad);
	
		return true;
	}//end function
	
	//get a parent node of specific type from an element
	function getAncestor(el, ancestorType) {
		if (!el.parentNode) {return false;}
		do {el = el.parentNode;}
		while (el && el.type != ancestorType && el.parentNode)
		if (el.type != ancestorType) {return false;}
		return el;
	}//end function
	
	function getSellectedText() {
	 var txt = '';
		if (window.getSelection)
			{txt = window.getSelection();}
		else if (document.getSelection)
			{txt = document.getSelection();}
		else if (document.selection)
			{txt = document.selection.createRange().text;}
		else return;
		return txt;
	}
	
	function getTopLeft(ele) {
		var x, y = 0;
		x = ele.offsetLeft;
		y = ele.offsetTop;
		ele = ele.offsetParent;
		while(ele != null) {
			x = parseInt(x) + parseInt(ele.offsetLeft);
			y = parseInt(y) + parseInt(ele.offsetTop);
			ele = ele.offsetParent;
		}
		return {top:y, left: x};
	}//end function
	
	
	/************************************************************************************************************************************************************************
	Selects
	************************************************************************************************************************************************************************/
	
	function selectAddOption(selectEl, val, txt, index) {
		var opt = null;
		var newEl = document.createElement('option');
		newEl.text = txt;
		newEl.value = val;
		var selectElId = (selectEl.id ? selectEl.id : 'selectId');
		newEl.id = selectElId + 'Option' + [index];
		if (index && index < selectEl.length && selectEl.options[index]) {var opt = selectEl.options[index];}
		else {index = selectEl.length;}
	
		try {selectEl.add(newEl, opt);}
		catch(ex) {selectEl.add(newEl, index);}
	}//end function
	
	function getSelectedOption(selectEl) {
		var options = selectEl.getElementsByTagName('option');
		for (var ctr = 0; ctr < options.length; ctr++) {
			var opt = options[ctr];
			if (opt.selected) {return options[ctr];}
		}//end for
		return null;
	}//end function
	
	
	function selectMoveOptionUp(selectEl) {
		var options = selectEl.getElementsByTagName('option');
		for (var ctr = 1; ctr < options.length; ctr++) {
			var opt = options[ctr];
			if (opt.selected) {
				selectEl.removeChild(opt);
				selectEl.insertBefore(opt, options[ctr - 1]);
			}//end if
		}//end for
	}//end function
	
	function selectMoveOptionDown(selectEl) {
		var options = selectEl.getElementsByTagName('option');
		for (var ctr = options.length - 2; ctr >= 0; ctr--) {
			var opt = options[ctr];
			if (opt.selected) {
				var nextOpt = options[ctr + 1];
				opt = selectEl.removeChild(opt);
				nextOpt = selectEl.replaceChild(opt, nextOpt);
				selectEl.insertBefore(nextOpt, opt);
			}//end if
		}//end for
	}//end function
	
	//For IE
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
			"use strict";
			if (this == null) {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			var n = 0;
			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) { // shortcut for verifying if it's NaN
					n = 0;
				} else if (n != 0 && n != Infinity && n != -Infinity) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			if (n >= len) {
				return -1;
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		}
	}
	
	//copied from http://phpjs.org/functions/strip_tags/
	//Reneamed to prevent dup function name if included in any other files
	//See also code in CKE char count plugin
	function acsStripTags (input, allowed) {
		allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
			commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});
	}
/************************************************************************************************************************************************************************

Browser support

************************************************************************************************************************************************************************/
	//from http://stackoverflow.com/questions/7451635/how-to-detect-supported-video-formats-for-the-html5-video-tag
	function getHtml5VideoSupport() {
		var testEl = document.createElement( "video" );
		var formats = {mpeg4:false, h264:false, ogg:false, webm:false};
		if ( testEl.canPlayType ) {
			// Check for MPEG-4 support
			formats.mpeg4 = "" !== testEl.canPlayType( 'video/mp4; codecs="mp4v.20.8"' );
		
			// Check for h264 support
			formats.h264 = "" !== ( testEl.canPlayType( 'video/mp4; codecs="avc1.42E01E"' )
				|| testEl.canPlayType( 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' ) );
		
			// Check for Ogg support
			formats.ogg = "" !== testEl.canPlayType( 'video/ogg; codecs="theora"' );
		
			// Check for Webm support
			formats.webm = "" !== testEl.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
		}
		return formats;
	}
	

/************************************************************************************************************************************************************************
	
	
	
************************************************************************************************************************************************************************/
	
	/**
	 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
	 *
	 * This function was born in http://stackoverflow.com/a/6832721.
	 *
	 * @param {string} v1 The first version to be compared.
	 * @param {string} v2 The second version to be compared.
	 * @param {object} [options] Optional flags that affect comparison behavior:
	 * <ul>
	 *     <li>
	 *         <tt>lexicographical: true</tt> compares each part of the version strings lexicographically instead of
	 *         naturally; this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than
	 *         "1.2".
	 *     </li>
	 *     <li>
	 *         <tt>zeroExtend: true</tt> changes the result if one version string has less parts than the other. In
	 *         this case the shorter string will be padded with "zero" parts instead of being considered smaller.
	 *     </li>
	 * </ul>
	 * @returns {number|NaN}
	 * <ul>
	 *    <li>0 if the versions are equal</li>
	 *    <li>a negative integer iff v1 < v2</li>
	 *    <li>a positive integer iff v1 > v2</li>
	 *    <li>NaN if either version string is in the wrong format</li>
	 * </ul>
	 *
	 * @copyright by Jon Papaioannou (["john", "papaioannou"].join(".") + "@gmail.com")
	 * @license This function is in the public domain. Do what you want with it, no strings attached.
	 */
	function versionCompare(v1, v2, options) {
		var lexicographical = options && options.lexicographical,
			zeroExtend = options && options.zeroExtend,
			v1parts = v1.split('.'),
			v2parts = v2.split('.');
	
		function isValidPart(x) {
			return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
		}
	
		if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
			return NaN;
		}
	
		if (zeroExtend) {
			while (v1parts.length < v2parts.length) v1parts.push("0");
			while (v2parts.length < v1parts.length) v2parts.push("0");
		}
	
		if (!lexicographical) {
			v1parts = v1parts.map(Number);
			v2parts = v2parts.map(Number);
		}
	
		for (var i = 0; i < v1parts.length; ++i) {
			if (v2parts.length == i) {
				return 1;
			}
	
			if (v1parts[i] == v2parts[i]) {
				continue;
			}
			else if (v1parts[i] > v2parts[i]) {
				return 1;
			}
			else {
				return -1;
			}
		}
	
		if (v1parts.length != v2parts.length) {
			return -1;
		}
	
		return 0;
	}
	
/************************************************************************************************************************************************************************
	
	Nivo Slider
	
************************************************************************************************************************************************************************/
	
	function acsAddNivoSliderDelayedExecute(id, options) {
		if (typeof($jq(id)).nivoSlider == 'undefined') {
			setTimeout(function() {acsAddNivoSliderDelayedExecute(id, options);}, 100);
		} else {$jq(id).nivoSlider(options);}
	}
	
	function acsAddNivoSlider(id, options) {
		if (typeof($jq) == 'undefined') {
			setTimeout(function() {acsAddNivoSlider(id, options);}, 10);
			return;
		}
		acsAddJs('/webscripts/nivo-slider/css/nivo-slider.css', 'css');
		acsAddJs('/webscripts/nivo-slider/themes/default/default.css', 'css');
		acsAddJs('/webscripts/nivo-slider/css/acs-nivo-slider.css', 'css');
		acsAddJs('/webscripts/nivo-slider/jquery.nivo.slider.pack.js');
		
		if (acsIsLoaded) {
			if (typeof($jq(id)).nivoSlider == 'undefined') {
				setTimeout(acsAddNivoSliderDelayedExecute(id, options), 100);
			} else {$jq(id).nivoSlider(options);}
		} else {
			$jq(window).load(function() {
				$jq(ele).nivoSlider(options);
			});
		}
	}

}//end if included once