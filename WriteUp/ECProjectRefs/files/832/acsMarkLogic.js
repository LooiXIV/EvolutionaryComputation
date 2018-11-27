$(document).ready(function() {
	if (document.getElementById('aff')) {
		var jsLoad=document.createElement('p');
		jsLoad.innerHTML = '<strong><a href="javascript: void(0);" class="acsSmallBorder" onclick="showHide(this, \'aff\', \'block\', \'+\', \'-\');">+</a></strong> Author Affiliations';
		document.getElementById('aff').parentNode.insertBefore(jsLoad, document.getElementById('aff'));
		document.getElementById('aff').style.display = 'none';
	}
});

function acsToggleTableView(table) {
	if (table.className.indexOf('table-fixed-show') < 0) {table.className += ' table-fixed-show';}
	else {table.className = table.className.replace(' table-fixed-show', '');}
}

function acsToggleFullScreenImg(imgPath) {
	if (imgPath != null) {imgPath = imgPath.replace('&amp;', '&');}
	if (document.getElementById('acsFullImageWrapper') == null) {
		var jsLoad=document.createElement('div');
		jsLoad.setAttribute("onclick","acsToggleFullScreenImg();");
		jsLoad.onclick = function() {acsToggleFullScreenImg();};// for IE
		jsLoad.id = "acsFullImageWrapper";
		document.getElementById('mlPublicationsWrapper').appendChild(jsLoad);
		var jsLoad2=document.createElement('img');
		jsLoad2.setAttribute("src",imgPath);
		jsLoad2.setAttribute("alt","Full Size Img");
		jsLoad2.id = "acsFullImage";
		jsLoad.appendChild(jsLoad2);
		var jsLoad3=document.createElement('div');
		jsLoad3.setAttribute('id','acsFullImageClose');
		jsLoad3.innerHTML = 'Click to close';
		jsLoad.appendChild(jsLoad3);
	} else {document.getElementById('acsFullImageWrapper').parentNode.removeChild(document.getElementById('acsFullImageWrapper'));}
}

function addSearchRow(set) {
	if (set) {this.counter = set; return;}
	if (!this.counter) {this.counter = 1;}
	
	var base = document.getElementById('searchTemplate').innerHTML
	base = base.replace(/templateID/g, this.counter);
	var jsLoad=document.createElement('div');
	jsLoad.innerHTML = base;
	
	document.getElementById('keywordSearch').appendChild(jsLoad);
	this.counter++;
}

function toggle(source) {	
	checkboxes = document["searchForm"].getElementsByTagName('input');
	for(var i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].type == 'checkbox')   {
			checkboxes[i].checked = source.checked;
		}
	}
}

/* Binder */
function saveToBinder() {
	document.getElementById("saveToBinder").style.display = "block";
}

function cancelBinder() {
	document.getElementById("saveToBinder").style.display = "none";
}

/* Article Tabs */
function acsMLCreateArticleTab(tabId, tabText) {
	var jsLoad=document.createElement('li');
	if (tabId == 'spacer') {
		jsLoad.innerHTML = '<span class=\"indent10\"> </span>';
	} else {
		jsLoad.id = tabId+'Tab';
		jsLoad.innerHTML = "<div class=\"acsTabLeft acsTabLeft20Gray\" id =\""+tabId+"TabLeft\"><div class=\"acsTab20 acsTab20Gray\" id =\""+tabId+"TabRight\"><a href=\"javascript: void(0);\" onclick=\"acsMlSwitchArticleTab('"+tabId+"')\" >"+tabText+"</a></div></div>";
	}
	document.getElementById('articleTabs').appendChild(jsLoad);
}

function acsMlSwitchArticleTab(activeTab) {
	if (typeof acsMlSwitchArticleTab.previousTab == 'undefined') {acsMlSwitchArticleTab.previousTab = '';}
	
	//Change previous Active Tab to gray (done first in case clicking on same tab)
	if (acsMlSwitchArticleTab.previousTab != '') {
		if (document.getElementById(acsMlSwitchArticleTab.previousTab+'TabLeft')) {document.getElementById(acsMlSwitchArticleTab.previousTab+'TabLeft').setAttribute('class', "acsTabLeft acsTabLeft20Gray");}
		if (document.getElementById(acsMlSwitchArticleTab.previousTab+'TabRight')) {document.getElementById(acsMlSwitchArticleTab.previousTab+'TabRight').setAttribute('class', "acsTab20 acsTab20Gray");}
	}
	//Change Active tab to blue
	document.getElementById(activeTab+'TabLeft').setAttribute('class', "acsTabLeft acsTabLeft20Blue");
	document.getElementById(activeTab+'TabRight').setAttribute('class', "acsTab20 acsTab20Blue");
	
	var display = (activeTab == 'articleAll' ? 'block' : 'none');
	
	if (document.getElementById('articleAbstract')) {document.getElementById('articleAbstract').style.display = display;}
	if (document.getElementById('articleContributors')) {document.getElementById('articleContributors').style.display = display;}
	if (document.getElementById('articleAbbreviations')) {document.getElementById('articleAbbreviations').style.display = display;}
	if (document.getElementById('articleBody')) {document.getElementById('articleBody').style.display = display;}
	if (document.getElementById('articleCitations')) {document.getElementById('articleCitations').style.display = display;}
	if (document.getElementById('articleKeywords')) {document.getElementById('articleKeywords').style.display = display;}
	if (document.getElementById('articleFootnotes')) {document.getElementById('articleFootnotes').style.display = display;}
	if (document.getElementById('articleSupplements')) {document.getElementById('articleSupplements').style.display = display;
		document.getElementById('supplementTitle').style.display = 'none';
		document.getElementById('supplementAuthors').style.display = 'none';
		}
	
	if (activeTab != 'articleAll') {
		document.getElementById(activeTab).style.display = 'block';
		if (activeTab == 'articleAbstract' && document.getElementById('articleCitations')) {document.getElementById('articleCitations').style.display = 'block';}
	}
	
	//Hide Supplements From Full Text
	if(activeTab == 'articleAll') {
		if (document.getElementById('articleSupplements')) {document.getElementById('articleSupplements').style.display = 'none';}
	}
	
	acsMlSwitchArticleTab.previousTab = activeTab;
}

function acsMlTabifyArticle(tabView) {
	var firstTab = '';
	if (document.getElementById('articleAbstract')) {acsMLCreateArticleTab('articleAbstract', 'Abstract &amp; References'); if (firstTab == '') {firstTab = 'articleAbstract';}}
	if (document.getElementById('articleContributors')) {acsMLCreateArticleTab('articleContributors', 'Authors'); if (firstTab == '') {firstTab = 'articleContributors';}}
	if (document.getElementById('articleAbbreviations')) {acsMLCreateArticleTab('articleAbbreviations', 'Abbreviations'); if (firstTab == '') {firstTab = 'articleAbbreviations';}}
	//if (document.getElementById('articleBody')) {acsMLCreateArticleTab('articleBody', 'Article'); if (firstTab == '') {firstTab = 'articleBody';}}
	//if (document.getElementById('articleCitations')) {acsMLCreateArticleTab('articleCitations', 'References'); if (firstTab == '') {firstTab = 'articleCitations';}}
	if (document.getElementById('articleKeywords')) {acsMLCreateArticleTab('articleKeywords', 'Keywords'); if (firstTab == '') {firstTab = 'articleKeywords';}}
	if (document.getElementById('articleFootnotes')) {acsMLCreateArticleTab('articleFootnotes', 'Footnotes'); if (firstTab == '') {firstTab = 'articleFootnotes';}}
	if (document.getElementById('articleSupplements')) {acsMLCreateArticleTab('articleSupplements', 'Supplemental Files'); if (firstTab == '') {firstTab = 'articleSupplements';}}
	
	acsMLCreateArticleTab('spacer', '');
	acsMLCreateArticleTab('articleAll', 'Full Article'); if (firstTab == '') {firstTab = 'articleAll';}
	
	acsMlSwitchArticleTab("articleAll");
	//if (firstTab != '' && tabView) {acsMlSwitchArticleTab(firstTab);}
}

function showClick(id) {
	document.getElementById(id).style.display = "inline";
}

function hideClick(id) {
	document.getElementById(id).style.display = "none";
}

function RightsLinkPopUp(publication, issn, issnEpub, issnPpub, isbn) {
	var stdnum = "";
	if (issnEpub) {
		stdnum = issnEpub;
	} else  if (issnPpub) {
		stdnum = issnPpub;
	} else {
		stdnum = issn;
	}
	var location = "https://www.copyright.com/openurl?issn="+encodeURI(stdnum)+"&WT.mc.id=ACSESS";
	if (publication == 'books') {
		location = "https://www.copyright.com/openurl?issn="+encodeURI(isbn.replace(/-/g, ""))+"&WT.mc.id=ACSESS";
	}
	PopUp = window.open(location,'RightsLink','location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=550');
	return location;
}

function RightsLink(publisherName, publisher, pubDate, authors, copyright, volume, issue, fpage, lpage, publication, title, contentID, isbn, bookTitle) {
	var url = "https://s100.copyright.com/AppDispatchServlet"; 
    var location = "";
    var year = pubDate.substring(0, 4);
    var copysign = '©';
    var copyPos = copyright.indexOf(copysign) + 1;
    copyright = copyright.slice(0, copyPos) + year + copyright.slice(copyPos);
    copyright = copyright.replace(year + " " + year, year);
    var publisher = publisher.replace('American Society of Agronomy, Crop Science Society of America, and Soil Science Society of America', 'Alliance of Crop, Soil, and Environmental Science Societies');
    if(volume == 0) {volume = '';}
    if(issue == 0) {issue = '';}
    title = title.replace(/ /g, "+");
    if(publication != 'books') {
    	location = url 
			+ "?publisherName=" + encodeURI (publisherName)
			+ "&publicationDate=" + encodeURI (pubDate)
			+ "&author=" + encodeURI (authors) 
			+ "&copyright=" + encodeURI (copyright)
			+ "&orderBeanReset=true"
			+ "&volumeNum=" + encodeURI (volume)
			+ "&issueNum=" + encodeURI (issue)
			+ "&startPage=" + encodeURI (fpage)
			+ "&endPage=" + encodeURI (lpage)
			+ "&publication=" + encodeURI (publication)
			+ "&title=" + encodeURI (title) 
			+ "&contentID=" + encodeURI (contentID);
		
	} else {
		location = url + "?publisherName=" + encodeURI (publisherName) +
			"&publicationDate=" + encodeURI (pubDate) +
			"&author=" + encodeURI (authors) +
			"&copyright=" + encodeURI (copyright) +
			"&orderBeanReset=true" +
			"&bookTitle=" + encodeURI (bookTitle) +
			"&title=" + encodeURI (title) +
			"&ISBN=" + encodeURI (isbn) +
			"&startPage=" + encodeURI (fpage) +
			"&endPage=" + encodeURI (lpage) +
			"&publication=book" +
			"&contentID=" + encodeURI (contentID);
	}
	location = location.replace(/ /g, "+");
	location = location.replace(/%20/g, "+");
	return location;
}

function updateSelect(pub) {
	document.getElementById("journal").name = "journal[" + pub + "]";
}

function acsShowOpenAccessText() {
	$("#open-access-text").show();
}

function acsShowPromotionalOpenAccessText() {
	var openAccessElement = $("#open-access-text");
	openAccessElement.attr("style", "color: #00a300; width: 110px; margin-top: 5px; padding-left: 0px;");
	openAccessElement.html("<img xmlns style='float:left;' src='/files/images/publications/unlock_green.png' alt='unlock' />FREE PREVIEW<br>");
	openAccessElement.show();
}

function toggleFullVzjSnippet(showId, hideId) {
	document.getElementById(hideId).style.display = "none";
	document.getElementById(showId).style.display = "block";
}

function toggleSidebar() {
	
	if (document.getElementById("side-bar").style.height == "300px") {
		document.getElementById("side-bar").style.height = "100%";
		document.getElementById("side-bar").style.overflow = "show";
		document.getElementById("sideText").innerHTML = "Show Less";
	} else {
		document.getElementById("side-bar").style.height = "300px";
		document.getElementById("side-bar").style.overflow = "hidden";
		document.getElementById("sideText").innerHTML = "Show More";
	}
}

function toggleCoreIdeaDisplay() {
	
	divs = document.getElementsByClassName("core-ideas");
	
	if (document.getElementById("core-idea-button").innerHTML == "Show Details") {
		for(var i = 0; i < divs.length; i++){
		    divs[i].style.display = "block"; 
		}
		document.getElementById("core-idea-button").innerHTML = "Hide Details";
	} else {
		for(var i = 0; i < divs.length; i++){
		    divs[i].style.display = "none"; 
		}
		document.getElementById("core-idea-button").innerHTML = "Show Details";
	}
}

function showAbstract(id) {
	document.getElementById(id).style.display = "block";
}

function hideAbstract(id) {
	document.getElementById(id).style.display = "none";
}
/*
function hideFullVzjSnippet(id, fullId) {
	document.getElementById(id).style.display = "block";
	document.getElementById(fullId).style.display = "none";
}*/
