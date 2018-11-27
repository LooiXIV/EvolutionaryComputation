$(document).ready(function() {
	$(".storyPageType img").each(function() {imgTitleToCaption($(this), 0);});
});

function imgTitleToCaption(img, ctr) {
	var width = img.width();
	if (width == 0) {
		if (ctr < 3) {window.setTimeout(function() {imgTitleToCaption(img, ctr+1);}, 500);}
		return;
	}
	var caption = img.attr("title");
	var align = img.attr("align");
	var capclass = img.attr("class");
	
	if (typeof caption != "undefined" && !img.hasClass("acsNoCaption")) {
		if (align == "center" || img.hasClass("acsCenter")) {
			img.after("<p class=\"caption acsCenter\" style=\"width:" + width + "px;\">" + caption + "</p>");
		} else if (align == "left" || img.hasClass("acsLeft")) {
			img.after("<p class=\"caption acsLeft\" style=\"width:" + width + "px;\">" + caption + "</p>");
		} else if (align == "right" || img.hasClass("acsRight")) {
			img.after("<p class=\"caption acsRight\" style=\"width:" + width + "px;\">" + caption + "</p>");
		} else {
			img.after("<p class=\"caption\" style=\"width:" + width + "px;\">" + caption + "</p>");
		}
	}
}