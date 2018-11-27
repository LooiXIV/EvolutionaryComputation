
if ((document.cookie || navigator.cookieEnabled) && (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined')) (function () {

var Storage = function (type) {
  function createCookie(name, value, days) {
    var date, expires;

    if (days) {
      date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=",
        ca = document.cookie.split(';'),
        i, c;

    for (i=0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  }

  function setData(data) {
    data = JSON.stringify(data);
    if (type == 'session') {
      window.name = data;
    } else {
      createCookie('localStorage', data, 365);
    }
  }

  function clearData() {
    if (type == 'session') {
      window.name = '';
    } else {
      createCookie('localStorage', '', 365);
    }
  }

  function getData() {
    var data = type == 'session' ? window.name : readCookie('localStorage');
    return data ? JSON.parse(data) : {};
  }


  // initialise if there's already data
  var data = getData();

  return {
    length: 0,
    clear: function () {
      data = {};
      this.length = 0;
      clearData();
    },
    getItem: function (key) {
      return data[key] === undefined ? null : data[key];
    },
    key: function (i) {
      // not perfect, but works
      var ctr = 0;
      for (var k in data) {
        if (ctr == i) return k;
        else ctr++;
      }
      return null;
    },
    removeItem: function (key) {
      delete data[key];
      this.length--;
      setData(data);
    },
    setItem: function (key, value) {
      data[key] = value+''; // forces the value to a string
      this.length++;
      setData(data);
    }
  };
};

if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');

})();
(function() {
  this.mathJaxRender = function() {
    if (typeof MathJax !== 'undefined') {
      return MathJax.Hub.Rerender();
    }
  };

  this.mathJaxQueue = function(callback) {
    if (typeof MathJax === 'undefined') {
      return callback.call();
    } else {
      return MathJax.Hub.Queue(callback);
    }
  };

  this.checkCookie = function() {
    return document.cookie || navigator.cookieEnabled;
  };

  this.setLocalStorage = function(key, value) {
    if (this.checkCookie()) {
      return localStorage[key] = value;
    }
  };

  this.reposition = function(topMenuHeight, callback) {
    var json, res;
    res = this.firstDomCurrScreen(topMenuHeight);
    (callback && typeof callback === "function") && callback();
    json = {
      scrollTop: res.offset().top - topMenuHeight
    };
    return $('html,body').animate(json, 0);
  };

  this.firstDomCurrScreen = function(topMenuHeight) {
    var res;
    res = void 0;
    $('article :visible').not('body, html, ul, ol, .html-front, .html-body, .html-back').each(function() {
      var $this, currOffset, winOffset;
      currOffset = parseInt($(this).offset().top);
      winOffset = $(window).scrollTop() + topMenuHeight;
      $this = $(this);
      if (currOffset >= winOffset || currOffset + $this.height() > winOffset) {
        res = $this;
        if (!(res[0].tagName === 'SECTION' && !(res[0].id === 'html-abstract'))) {
          return false;
        }
      }
      return res = $this;
    });
    return res;
  };

  return this;

}).call(this);
(function() {
  var readerGaTimeout;

  this.ajaxGaEvent = function(category, action) {
    var resolution;
    resolution = window.screen.availHeight + "x" + window.screen.availWidth;
    return $.ajax({
      url: "ga-event",
      type: "post",
      data: {
        category: category,
        action: action,
        resolution: resolution
      }
    });
  };

  readerGaTimeout = 3000;

  this.lazyFontFamilyGa = _.debounce(function(action) {
    return this.ajaxGaEvent('fontFamily', action);
  }, readerGaTimeout);

  this.lazyFontSizeGa = _.debounce(function(action) {
    return this.ajaxGaEvent('fontSize', action);
  }, readerGaTimeout);

  this.lazyBgGa = _.debounce(function(action) {
    return this.ajaxGaEvent('bg', action);
  }, readerGaTimeout);

  this.lazyLineSpaceGa = _.debounce(function(action) {
    return this.ajaxGaEvent('lineSpace', action);
  }, readerGaTimeout);

  this.lazyColumnWidthGa = _.debounce(function(action) {
    return this.ajaxGaEvent('columnWidth', action);
  }, readerGaTimeout);

  this.lazyColumnWidthRecommendedGa = _.debounce(function() {
    return this.ajaxGaEvent('recommended ', 'recommended');
  }, readerGaTimeout);

}).call(this);
(function() {
  var columnWidthHtml, fontBgHtml, fontSzieHtml, lineSpaceHtml, ltIe8;

  ltIe8 = function() {
    var b_version, browser, trim_Version, version;
    browser = navigator.appName;
    if (browser === "Microsoft Internet Explorer") {
      b_version = navigator.appVersion;
      version = b_version.split(";");
      trim_Version = version[1].replace(/[ ]/g, "");
      return trim_Version === "MSIE7.0" || trim_Version === "MSIE6.0";
    } else {
      return false;
    }
  };

  lineSpaceHtml = function() {
    var lineSpaceArry, res;
    lineSpaceArry = ["1.5em", "1.8em", "2.1em", "2.4em", "2.7em"];
    res = "";
    $.each(lineSpaceArry, function(i) {
      return res += "<span class=\'a" + (i + 1) + "\'  data-line-height=\'" + this + "\'><i class=\'fa\'>&#xf034;</i></span>";
    });
    return res;
  };

  columnWidthHtml = function() {
    var columnWidthArray, res;
    columnWidthArray = ["20%", "15%", "10%", "5%", "0%"];
    res = "";
    $.each(columnWidthArray, function(i) {
      return res += "<span class=\'a" + (i + 1) + "\' data-column-width=\'" + this + "\'><i class=\'fa\'>&#xf035;</i></span>";
    });
    return res;
  };

  fontSzieHtml = function() {
    var fontSizeArray, res;
    fontSizeArray = ["100", "130", "160", "190", "220"];
    res = "";
    $.each(fontSizeArray, function(i) {
      return res += "<span class=\'a" + (i + 1) + "\' data-percent=\'" + this + "\'>Aa</span>";
    });
    return res;
  };

  fontBgHtml = function() {
    var fontBgArray, res;
    fontBgArray = ["bright", "dark", "creme"];
    res = "";
    $.each(fontBgArray, function() {
      if (("" + this) === "dark") {
        return res += "<div class='html-nav-bg html-nav-" + this + "' data-bg=\'" + this + "\'> <i class='fa fa-file-text-o'></i></div>";
      } else {
        return res += "<div class='html-nav-bg html-nav-" + this + "' data-bg=\'" + this + "\'> <i class='fa fa-file-text'></i></div>";
      }
    });
    return res;
  };

  $(function() {
    var html;
    html = "<div class='html-profile-nav'> <div class='top-bar'> <div class='nav-sidebar-btn show-for-large-up' data-status='opened' > <span class='nav-sidebar-action' style='display:none;'>Close Sidebar</span> <i class='fa fa-caret-left fa-2x'></i> </div> <div class='nav-close-btn'>Close Menu</div> <div class='nav-loading'>loading...</div> <div class='nav-btn'> <i class='fa fa-cog fa-2x'></i> </div> </div> <div class='html-article-menu'> <div class='html-first-step'> <ul class='html-font-family'> <li style='width:100%' class='html-font-label'>Font Type</li> <li> <span><i style='font-family:Arial, Arial, Helvetica, sans-serif;' data-fontfamily='Arial, Arial, Helvetica, sans-serif'>Arial</i></span> <span><i style='font-family:Georgia1, Georgia, serif;' data-fontfamily='Georgia1, Georgia, serif'>Georgia</i></span> <span><i style='font-family:Palatino Linotype, Book Antiqua, Palatino, serif;'  data-fontfamily='Palatino Linotype, Book Antiqua, Palatino, serif'>Palatino Linotype</i></span> <span><i style='font-family:Verdana, Verdana, Geneva, sans-serif;'  data-fontfamily='Verdana, Verdana, Geneva, sans-serif' >Verdana</i></span> </li> </ul> <ul class='html-recomment-ul'> <li> <div class='html-recomment-button'>Default Settings</div> </li> </ul> <ul class='html-font-resize'> <li style='width:100%' class='html-font-label'>Font Size</li> <li> " + (fontSzieHtml()) + " </li> </ul> </div> <ul class='html-line-space'> <li class='html-font-label' style='width:55%;' >Line Spacing</li> <li> " + (lineSpaceHtml()) + " </li> </ul> <ul class='html-font-bg'> <li style='width:100%' class='html-font-label'>Background</li> <li> " + (fontBgHtml()) + " </li> </ul> <ul class='html-column-width'> <li class='html-font-label' >Column Width</li> <li> " + (columnWidthHtml()) + " </li> </ul> </div> </div>";
    if (!ltIe8()) {
      return $("article").before(html);
    }
  });

}).call(this);
(function() {
  var addHrefToCopyright, appendTabAndFig, buildNav, cal_dt_margin, capitalizeFirstLetter, closeSideBar, configMathJax, defaultOptions, delay, first_dom_curr_screen, fixAbstract, getFigWidth, getRandomInt, handleEditorNote, initDom, initFontConfig, initFontNavWidth, initNavScrollspy, initNavScrollspyIcon, initPopupLink, initPrifileNavScrollspy, listenerHeight, ltIe8, navClickEvent, openSideBar, orderFigAndTableDoms, positionOpenAccess, profileNavHeight, recommendOptions, replacFixedNav, sections, setColumnWidth, setFontFamily, setFontOptions, setFontSize, setLineSpace;

  defaultOptions = {
    bg: 'bright',
    fontSize: 100,
    fontFamily: "Palatino Linotype",
    columnWidth: "0%",
    lineSpace: "1.5em"
  };

  recommendOptions = {
    bg: 'bright',
    fontSize: 100,
    fontFamily: "Georgia",
    columnWidth: "0%",
    lineSpace: "1.5em"
  };

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  first_dom_curr_screen = function() {
    var res;
    res = void 0;
    $('article :visible').not('body, html').each(function() {
      if ($(this).offset().top > $(window).scrollTop()) {
        res = $(this).html();
        return false;
      }
    });
    return res;
  };

  ltIe8 = function() {
    var b_version, browser, trim_Version, version;
    browser = navigator.appName;
    if (browser === "Microsoft Internet Explorer") {
      b_version = navigator.appVersion;
      version = b_version.split(";");
      trim_Version = version[1].replace(/[ ]/g, "");
      return trim_Version === "MSIE7.0" || trim_Version === "MSIE6.0";
    } else {
      return false;
    }
  };

  profileNavHeight = function() {
    return $('.html-profile-nav').height();
  };

  sections = function() {
    var res;
    res = $('.html-front section, .html-body>section, .html-back>section');
    res = res.filter(function() {
      return $(this).find('>h2').length > 0;
    });
    return res;
  };

  setFontOptions = function(options) {
    var columnDom, familyDom, lineSpaceDom, sizeDom;
    columnDom = $(".html-column-width li [data-column-width=\'" + options['columnWidth'] + "\']");
    setColumnWidth(options['columnWidth'], columnDom);
    lineSpaceDom = $(".html-line-space li [data-line-height=\'" + options['lineSpace'] + "\']");
    setLineSpace(options['lineSpace'], lineSpaceDom);
    sizeDom = $(".html-font-resize li [data-percent=" + options['fontSize'] + "]");
    setFontSize(options['fontSize'], sizeDom);
    $('article, .html-profile-nav').removeClass('dark bright creme').addClass(options['bg']);
    if (options.fontFamily) {
      familyDom = $(".html-font-family span i:contains(\'" + options['fontFamily'] + "\')");
      familyDom = familyDom.parent('span');
      setFontFamily(options['fontFamily'], familyDom);
    }
    return mathJaxRender();
  };

  initFontConfig = function() {
    var options, sideBar;
    options = {};
    if (checkCookie()) {
      options.fontSize = localStorage.mdpiHtmlFontSize;
      options.fontFamily = localStorage.mdpiHtmlFontFamily;
      sideBar = localStorage.mdpiHtmlSideBar;
      options.columnWidth = localStorage.mdpiHtmlColumnWidth;
      options.lineSpace = localStorage.mdpiHtmlLineSpace;
      options.bg = localStorage.mdpiHtmlBg;
    }
    options.bg || (options.bg = defaultOptions['bg']);
    options.fontSize || (options.fontSize = defaultOptions['fontSize']);
    options.fontFamily || (options.fontFamily = defaultOptions['fontFamily']);
    sideBar || (sideBar = defaultOptions['sideBar']);
    options.columnWidth || (options.columnWidth = defaultOptions['columnWidth']);
    options.lineSpace || (options.lineSpace = defaultOptions['lineSpace']);
    if (options.fontFamily === 'Times New Roman') {
      options.fontFamily = 'Palatino Linotype';
    }
    setFontOptions(options);
    if ($('#leftcol').length > 0) {
      if (sideBar === "false") {
        return closeSideBar($('.nav-sidebar-btn'));
      } else {
        return openSideBar($('.nav-sidebar-btn'));
      }
    }
  };

  initFontNavWidth = function() {
    var width;
    width = $('article').outerWidth();
    return $('.html-profile-nav').width(width + "px");
  };

  //replacFixedNav = function() {
    //var left, leftBar, nav, position;
    //nav = $(".html-profile-nav");
    //leftBar = $(".html-nav");
    //if (nav.length > 0) {
      //nav.css("left", "auto");
      //if (nav.offset().left > $("article").offset().left) {
        //if (leftBar.hasClass('affix')) {
          //position = "absolute";
        //}
      //} else {
        //position = leftBar.hasClass('affix') ? leftBar.css("position", "fixed") : leftBar.css("position", "absolute");
      //}
      //leftBar.css("position", position);
      //left = $("article").offset().left * 2 - nav.offset().left;
      //return nav.css("left", left + "px");
    //}
  //};

  repositionOpenSideBar = function() {
      $('#leftcol').show();
      $('#maincol').css('margin-left', '14em');
  }

  openSideBar = function(dom) {
    var icon;
    reposition($('.top-bar').outerHeight(), function() {
      repositionOpenSideBar();
      //return positionOpenAccess();
    });
    icon = dom.find('i');
    icon.removeClass('fa-caret-right').addClass('fa-caret-left');
    dom.find('.nav-sidebar-action').text('Close Sidebar');
    dom.data('status', 'opened');
    initFontNavWidth();
    setLocalStorage('mdpiHtmlSideBar', true);
    $('body').trigger('scroll');
    //return replacFixedNav();
  };

  repositionCloseSideBar = function() {
      $('#leftcol').hide();
      $('#maincol').css('margin-left', '1em');
  }

  closeSideBar = function(dom) {
    var icon;
    reposition($('.top-bar').outerHeight(), function() {
      repositionCloseSideBar();
      //return positionOpenAccess();
    });
    icon = dom.find('i');
    icon.removeClass('fa-caret-left').addClass('fa-caret-right');
    dom.find('.nav-sidebar-action').text("");
    dom.data('status', 'closed');
    initFontNavWidth();
    setLocalStorage('mdpiHtmlSideBar', false);
    //return replacFixedNav();
  };

  setFontSize = function(percent, dom) {
    reposition($('.top-bar').outerHeight(), function() {
      $("article").css("font-size", percent + "%");
      //return positionOpenAccess();
    });
    if (dom) {
      $('.html-font-resize span').removeClass('active');
      return dom.addClass('active');
    }
  };

  setFontFamily = function(fontFamily, dom) {
    var family;
    family = dom.find('i').data('fontfamily');
    reposition($('.top-bar').outerHeight(), function() {
      $('article').css('font-family', family);
      $('article').find('h2, h4').css('font-family', family);
      //return positionOpenAccess();
    });
    $('.html-font-family span').removeClass('active');
    return dom.addClass('active');
  };

  setLineSpace = function(height, dom) {
    reposition($('.top-bar').outerHeight(), function() {
      $("article").css("line-height", height);
      //return positionOpenAccess();
    });
    if (dom) {
      $('.html-line-space span').removeClass('active');
      return dom.addClass('active');
    }
  };

  setColumnWidth = function(width, dom) {
    reposition($('.top-bar').outerHeight(), function() {
      $(".html-front, .html-body, .html-back").css({
        "padding-left": width,
        "padding-right": width
      });
      //return positionOpenAccess();
    });
    if (dom) {
      $('.html-column-width span').removeClass('active');
      return dom.addClass('active');
    }
  };

  fixAbstract = function() {
    var abstract;
    abstract = $("#html-abstract");
    if (abstract.find("section").length > 0) {
      $("#html-abstract-title").next("b").remove();
      $("#html-abstract-title").remove();
      return abstract.find("section").each(function() {
        var $this, h2, text;
        $this = $(this);
        text = $this.find("p").html();
        $this.find("p").remove();
        h2 = $this.find("h2");
        $this.append(text);
        h2.css("display", "inline");
        return h2.after("<b>:</b> ");
      });
    }
  };

  configMathJax = function() {
    if (typeof MathJax !== 'undefined') {
      MathJax.Hub.Config({
        "HTML-CSS": {
          availableFonts: ["TeX"],
          preferredFonts: "TeX",
          webFont: "TeX",
          imageFont: "TeX",
          undefinedFamily: "'Times New Roman',serif",
          linebreaks: {
            automatic: true,
            width: "container"
          }
        },
        "SVG": {
          linebreaks: {
            automatic: true
          }
        },
        "TeX": {
          extensions: ["noErrors.js"],
          noErrors: {
            inlineDelimiters: ["", ""],
            multiLine: true,
            style: {
              "font-size": "90%",
              "text-align": "left",
              "color": "black",
              "padding": "1px 3px",
              "border": "1px solid"
            }
          }
        }
      });
      return MathJax.Hub.Register.StartupHook("SVG multiline Ready", function() {
        return MathJax.ElementJax.mml.mbase.prototype.SVGlinebreakPenalty.nestfactor = 350;
      });
    }
  };

  listenerHeight = function(callback) {
    var old_height;
    old_height = $('html').height();
    return delay(10, function() {
      var new_height;
      new_height = $('html').height();
      if (old_height === new_height) {
        return callback();
      } else {
        return listenerHeight(callback);
      }
    });
  };

  cal_dt_margin = function(selector) {
    return $(selector).each(function() {
      var $this, dt_width, margin_width;
      $this = $(this);
      dt_width = $this.width();
      margin_width = dt_width + 12;
      return $this.next("dd").css("margin-left", margin_width + "px");
    });
  };

  getFigWidth = function(callback) {
    var width;
    width = $(".mfp-img").width();
    if (!((width != null) && width > 0)) {
      if ($(".html-mfp-error").length > 0) {
        return;
      }
      return delay(100, function() {
        return getFigWidth(callback);
      });
    } else {
      return callback();
    }
  };

  delay = function(ms, func) {
    return setTimeout(func, ms);
  };

  buildNav = function() {
    var $htmlNav, html;
    html = "";
    sections().find('>h2').each(function() {
      var _h2;
      _h2 = $(this);
      if ($.trim($(this).text()) !== "") {
        return html += '<li><a href="#' + ($(this).parent('section')[0].id) + '">' + ($(this).text().replace(/\d+.\s*/, "")) + '</a></li>';
      }
    });
    $htmlNav = $(".html-nav");
    $htmlNav.html(html);
    if ($($htmlNav.data("prev-node")).length > 0) {
      return $($htmlNav.data("prev-node")).after($htmlNav);
    } else {
      $('article').width("68%");
      return $htmlNav.css({
        "float": "left",
        "padding-left": "80%",
        "height": "0px"
      });
    }
  };

  initNavScrollspyIcon = function() {
    return sections().each(function(i) {
      var $this;
      $this = $(this);
      return $this.scrollspy({
        min: function() {
          var min;
          min = $this.offset().top;
          return min - profileNavHeight() - parseInt($('section').css('margin-top'));
        },
        max: function() {
          var max;
          if (i < sections().length - 1) {
            max = $(sections()[i + 1]).offset().top;
          } else {
            max = $("article").height();
          }
          return max - profileNavHeight() - parseInt($('section').css('margin-top'));
        },
        onEnter: function(element, position) {
          return $($('.html-nav li')[i]).addClass("active");
        },
        onLeave: function(element, position) {
          return $($('.html-nav li')[i]).removeClass("active");
        }
      });
    });
  };

  initNavScrollspy = function() {
    var $sideBar;
    $sideBar = $(".html-nav");
    return $sideBar.affix({
      offset: {
        top: function() {
          var $prevNode, offsetTop, sideBarMargin;
          $prevNode = $($sideBar.data('prev-node'));
          if ($prevNode.length > 0) {
            offsetTop = $prevNode.offset().top;
            this.top = offsetTop + $prevNode.outerHeight(true);
          } else {
            offsetTop = $sideBar.offset().top;
            sideBarMargin = parseInt($sideBar.css('margin-top'), 10) || 0;
            this.top = offsetTop + sideBarMargin;
          }
          return this.top;
        }
      }
    });
  };

  initPrifileNavScrollspy = function() {
    var $nav;
    $nav = $('.html-profile-nav');
    return $nav.affix({
      offset: {
        top: $('article').offset().top
      }
    });
  };

  navClickEvent = function() {
    return $("html").on("click", ".html-nav li", function(e) {
      var dom, index, json;
      e.preventDefault();
      index = $('.html-nav li').index($(this));
      dom = $(sections()[index]);
      json = {
        scrollTop: dom.offset().top - profileNavHeight()
      };
      return $('html,body').animate(json, 500);
    });
  };

  handleEditorNote = function() {
    var h2, patten;
    patten = /Editor\’s Note/;
    if ($("#html-notes h2").text().match(patten)) {
      h2 = $('#html-notes h2').text();
      $('#html-notes h2').remove();
      $('#html-notes').prepend("<p>" + h2 + ":&nbsp;</p>");
      $("#html-notes p ").css({
        "text-indent": "0"
      });
      return $("#html-notes p:first ").css({
        "float": "left"
      });
    }
  };

  initPopupLink = function(type) {
    return $(".html-" + type).each(function() {
      var $this, id, newHref;
      $this = $(this);
      id = $this.attr('href').replace('#', '');
      newHref = "#" + type + "_body_display_" + id;
      if ($(newHref).length < 1) {
        return;
      }
      return $this.addClass("html-" + type + "popup").attr('href', newHref);
    });
  };

  addHrefToCopyright = function() {
    var copyright, htmlPatten, link, match, res;
    copyright = $('#html-copyright').text();
    htmlPatten = /\((http:\/\/\S*)\)/;
    match = copyright.match(htmlPatten);
    if (match) {
      link = match[1];
    } else {
      return;
    }
    if (!($('#html-copyright [href="' + link + '"]').length > 0)) {
      res = '<a href="' + link + '" target="_blank">' + link + '</a>';
      return $('#html-copyright').html($('#html-copyright').html().replace(link, res));
    }
  };

  //positionOpenAccess = function() {
    //var height, left, oaLogaExtended, oaLogo, position, top;
    //oaLogo = $('.html-oa-logo');
    //oaLogaExtended = $('.html-oa-logo-extended');
    //position = oaLogo.position(window);
    //left = position.left;
    //top = position.top;
    //height = oaLogo.outerHeight(true);
    //oaLogaExtended.css('left', left + "px");
    //oaLogaExtended.css('top', (top + height) + "px");
    //oaLogaExtended.css('border', 'none');
    //return oaLogaExtended.css('margin', '0.2em 0px 0px');
  //};

  appendTabAndFig = function(doms, step) {
    var nextdoms;
    nextdoms = $('');
    doms.each(function() {
      var $anker, child_fig_tabs, id;
      id = this.id;
      if (!id) {
        return true;
      }
      if ($(this).parent('.html-table-group').length > 0) {
        return;
      }
      if ($('a[href="#' + id + '"]').length > 0) {
        $anker = $($('a[href="#' + id + '"]')[0]);
      } else {
        child_fig_tabs = $(this).find('.html-fig-wrap, .html-table-wrap');
        if (child_fig_tabs.length > 0) {
          id = child_fig_tabs[0].id;
          $anker = $($('a[href="#' + id + '"]')[0]);
        } else {
          id = $(this).prev('div').attr('id').split('_').pop();
          $anker = $($('a[href="#' + id + '"]')[0]);
        }
      }
      return $(this).data('anker', $anker);
    });
    doms.each(function() {
      var $anker, id, to_append;
      $anker = $(this).data('anker');
      if (!$anker) {
        return;
      }
      if ($anker.parents('.html-fig-wrap, .html-table-wrap').length > 0) {
        if (step === 0) {
          nextdoms.push(this);
        } else {
          to_append = $($anker.parents('.html-fig-wrap, .html-table-wrap').parents('.html-p, p, section')[0]);
        }
      } else if ($anker.parents('.html-table_show').length > 0) {
        if (step === 0) {
          nextdoms.push(this);
        } else {
          id = $anker.parents('.html-table_show')[0].id;
          id = id.replace('table_body_display_', '').replace('fig_body_display', '');
          to_append = $($("#" + id).parents('.html-p, p, section')[0]);
        }
      } else {
        to_append = $anker.parents('.html-p, p, section').filter(function() {
          return $(this).parents('li').length < 1;
        });
        to_append = $(to_append[0]);
      }
      if (to_append && to_append.length > 0) {
        return to_append.append($(this));
      }
    });
    if (nextdoms.length > 0) {
      return appendTabAndFig(nextdoms, 2);
    }
  };

  orderFigAndTableDoms = function(doms) {
    var lastDoms, orderedDoms;
    orderedDoms = [];
    lastDoms = [];
    doms.each(function() {
      var $anker, id;
      id = this.id;
      $anker = $($('a[href="#' + id + '"]')[0]);
      if ($anker.parents('section[type=display-objects]').length > 0) {
        return lastDoms.push(this);
      } else {
        return orderedDoms.push(this);
      }
    });
    $.merge(orderedDoms, lastDoms);
    return $(orderedDoms);
  };

  initDom = function() {
    var displayDoms, orderedDoms;
    displayDoms = $("section[type=display-objects] .html-fig-wrap");
    $.merge(displayDoms, $("section[type=display-objects] .html-table-wrap, section[type=display-objects] .html-table-group"));
    orderedDoms = orderFigAndTableDoms(displayDoms);
    appendTabAndFig(orderedDoms, 0);
    appendTabAndFig(orderedDoms, 0);
    $(".html-fig-wrap").each(function() {
      var id;
      id = this.id;
      return $(this).find(".html-fig_img img").each(function() {
        var $this, img_html, src;
        $this = $(this);
        src = $this.data("large");
        img_html = $("<img alt=" + ($this.attr('alt')) + " src=" + src + "> ");
        img_html.css("max-width", "740px");
        img_html.css("float", "left");
        img_html.css("margin", "0.5em 1em");
        return $("#fig_large_img_display_" + id).append(img_html);
      });
    });
    $("#html-copyright").before($(".html-back .html-fn_group"));
    $(".html-pmid").each(function() {
      var $this, pmid, ref;
      $this = $(this);
      pmid = $this.text();
      ref = $this.parent("li");
      ref.data("pmid", pmid);
      return $this.remove();
    });
    $(".html-notes div sup[data-label='†']").parents(".html-note").css("margin-bottom", "1em");
    $('.html-array_table').css("padding-left", "1em");
    $('.html-notes').each(function() {
      var glossary, text;
      text = $(this).find("h2").text();
      if (text === "Author Contributions") {
        glossary = $("#html-glossary");
        if (glossary.parent('section').attr('class') === 'html-back') {
          return $(this).after(glossary);
        } else {
          return $(this).after(glossary.parent('section'));
        }
      }
    });
    handleEditorNote();
    initPopupLink('fig');
    initPopupLink('table');
    $(".html-bibr, .html-fn").each(function() {
      var $this, content, id;
      $this = $(this);
      id = $this.attr('href').replace('#', '');
      $(this).attr('title', '');
      if ($this.attr('class').match(/html-bibr/)) {
        content = $("#" + id).html();
      } else {
        content = $("#" + id).parents('li').find('.html-fn-content').html();
      }
      return $this.tooltip({
        hide: {
          delay: 1000
        },
        content: content,
        position: {
          at: "right-10 top",
          my: "right-10 bottom",
          collision: "flipfit flipfit",
          using: function(position, feedback) {
            return $(this).css(position);
          }
        }
      });
    });
    addHrefToCopyright();
    $(".html-oa-logo a").attr("title", "");
    $(".html-oa-logo").addClass("label").addClass("openaccess").css("float", "right").removeClass("html-oa-logo").text("Open Access");

    return $('.html-statement').each(function() {
      if ($(this).next().attr('class') === 'html-statement') {
        $(this).css('margin-bottom', '0');
        return $(this).next().css('margin-top', '0');
      }
    });
  };

  $(function() {
    var reLayout;
    $('.nav-loading').show();
    configMathJax();
    initDom();
    fixAbstract();
    buildNav();
    navClickEvent();
    $('.html-tablepopup').magnificPopup({
      type: 'inline',
      midClick: true,
      callbacks: {
        elementParse: function(item) {
          return delay(10, function() {
            var $itemSrc, foot_height, tableWidth, windowWidth;
            tableWidth = 0;
            $itemSrc = $(item.src);
            $itemSrc.find('table').each(function() {
              if ($(this).width() > tableWidth) {
                return tableWidth = $(this).width();
              }
            });
            if (tableWidth > 0) {
              if (tableWidth < 550) {
                $(item.src + " table").css("width", "550px");
              }
              windowWidth = $(window).width() - 200;
              if (windowWidth > tableWidth) {
                $itemSrc.css('max-width', (tableWidth + 20) + "px");
              } else {
                $itemSrc.css('max-width', windowWidth + "px");
              }
            }
            cal_dt_margin(".html-table_show dl dt");
            foot_height = 0;
            $itemSrc.find('.html-table_foot .html-fn-content').each(function() {
              return foot_height += $(this).height();
            });
            if (foot_height > 0) {
              return $(item.src + " .html-table_foot").height(foot_height);
            }
          });
        },
        open: function() {
          return $('.html-front').before($('.mfp-wrap'));
        }
      }
    });
    $('.html-figpopup').magnificPopup({
      type: 'inline',
      midClick: true,
      callbacks: {
        elementParse: function(item) {
          return delay(10, function() {
            var $item_src, popup_height, windowHeight;
            $item_src = $("" + item.src);
            windowHeight = $(window).height() - 100;
            $item_src.css('height', "auto");
            popup_height = $item_src.height();
            if (popup_height && popup_height > windowHeight) {
              return $item_src.css('height', windowHeight + "px");
            }
          });
        },
        open: function() {
          return $('.html-front').before($('.mfp-wrap'));
        }
      }
    });
    $(".html-img img").each(function() {
      var $this, original, res;
      $this = $(this);
      original = $this.data("original");
      res = '<a href="' + original + '" class="html-img-zoom" target="_blank">' + this.outerHTML + '</a>';
      $this.parent(".html-img").append(res);
      return $this.remove();
    });
    $(".html-author-group span").click(function() {
      var is_active, rid;
      rid = $(this).data("rid");
      is_active = $("#" + rid).hasClass("active");
      $(".html-aff-group .html-aff, .html-notes .html-note").removeClass("active");
      if (!is_active) {
        return $("#" + rid).addClass("active");
      }
    });
    $(".html-table_show").on("click", "a", function() {
      var $this, id;
      $this = $(this);
      if ($this.attr('class').match('/popup/')) {
        return;
      }
      id = $this.attr('href');
      if ($this.parents(".html-table_show").find("" + id).length === 0) {
        return $.magnificPopup.close();
      }
    });
    $(".html-bullet").each(function() {
      var $this;
      $this = $(this);
      if (!($this.find("html-list_label").length > 0)) {
        $this.removeClass("html-bullet");
        return $this.addClass("html-disc");
      }
    });
    //$('.html-front').before($('.html-oa-logo'));
    cal_dt_margin("article dl dt");
    $(".html-supplementary_p a").each(function() {
      var extend_name, href, href_name, regex, supp_name;
      href = $(this).attr("href");
      if (href.match(/\/dms\//) && !href.match(/\.png$/)) {
        href_name = href.split(".");
        extend_name = href_name.pop();
        supp_name = href_name[0];
        if (supp_name) {
          supp_name = supp_name.split("-").pop();
          regex = new RegExp(/\d.*/);
          supp_name = regex.exec(supp_name).join();
          return $(this).attr("href", "s" + (parseInt(supp_name)));
        }
      }
    });
    if (!ltIe8()) {
      mathJaxQueue(function() {
        initFontConfig();
        $('.nav-loading').hide();
        $('.html-font-resize li span').on('click', function() {
          var percent;
          percent = $(this).data('percent');
          setFontSize(percent, $(this));
          setLocalStorage("mdpiHtmlFontSize", percent);
          mathJaxRender();
          return lazyFontSizeGa(percent + "%");
        });
        $('.html-font-family span').on('click', function() {
          var fontFamily;
          fontFamily = $(this).find('i').text();
          setFontFamily(fontFamily, $(this));
          setLocalStorage("mdpiHtmlFontFamily", fontFamily);
          return lazyFontFamilyGa(fontFamily);
        });
        $('.html-line-space li span').on('click', function() {
          var height;
          height = $(this).data('line-height');
          setLineSpace(height, $(this));
          setLocalStorage("mdpiHtmlLineSpace", height);
          mathJaxRender();
          return lazyLineSpaceGa(height);
        });
        $('.html-column-width li span').on('click', function() {
          var width;
          width = $(this).data('column-width');
          setColumnWidth(width, $(this));
          setLocalStorage("mdpiHtmlColumnWidth", width);
          mathJaxRender();
          return lazyColumnWidthGa(width);
        });
        $('.html-nav-bright').on('click', function(e) {
          e.stopPropagation();
          $('article, .html-profile-nav').removeClass('dark creme').addClass('bright');
          setLocalStorage("mdpiHtmlBg", 'bright');
          return lazyBgGa('bright');
        });
        $('.html-nav-dark').on('click', function(e) {
          e.stopPropagation();
          $('article, .html-profile-nav').removeClass('bright creme').addClass('dark');
          setLocalStorage("mdpiHtmlBg", 'dark');
          return lazyBgGa('dark');
        });
        $('.html-nav-creme').on('click', function(e) {
          e.stopPropagation();
          $('article, .html-profile-nav').removeClass('bright dark').addClass('creme');
          setLocalStorage("mdpiHtmlBg", 'creme');
          return lazyBgGa('creme');
        });
        $('.html-recomment-button').on('click', function() {
          setFontOptions(recommendOptions);
          $.each(recommendOptions, function(k, v) {
            return setLocalStorage("mdpiHtml" + (capitalizeFirstLetter(k)), v);
          });
          return lazyColumnWidthRecommendedGa();
        });
        $('.html-profile-nav').on('click', '.top-bar', function(e) {
          $('.html-article-menu, .nav-close-btn').toggle();
          return $('.html-profile-nav .nav-sidebar-action').toggle();
        });
        $('.html-profile-nav').on('click', function(e) {
          e.stopPropagation();
          return e.preventDefault();
        });
        $(document).on('click', function(e) {
          $('.html-article-menu, .nav-close-btn').hide();
          return $('.html-profile-nav .nav-sidebar-action').hide();
        });
        return $('.nav-sidebar-btn').on('click', function(e) {
          e.stopPropagation();
          if ($(this).data('status') === "opened") {
            closeSideBar($(this));
          } else if ($(this).data('status') === "closed") {
            openSideBar($(this));
          }
          return mathJaxRender();
        });
      });
      reLayout = function() {
        initFontNavWidth();
        //replacFixedNav();
        //return positionOpenAccess();
      };
      $(window).resize(_.debounce(reLayout, 300));
      initFontNavWidth();
      initNavScrollspy();
      initPrifileNavScrollspy();
      initNavScrollspyIcon();
      //$(window).scroll(_.debounce(replacFixedNav, 300));
      //return positionOpenAccess();
    }
  });

}).call(this);
