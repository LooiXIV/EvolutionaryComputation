
var mdpi_com_adserver_banners = {};
var default_threshold = 8;
        
function mdpiComAdserverRotateBanner(div, max_rotation)
{    
    max_rotation = typeof max_rotation !== 'undefined' ? max_rotation : 50;
    var id   = div.attr("id");
    var zone = div.data("zone");
    var keywords = div.data("keywords");
    
    if (typeof keywords != 'undefined') {
    	var url = banners_url+"/www/my_files/singlepaaagecaaall.php?zones=" + zone + "&loc=" + window.location + "&keywords=" + keywords + "?random="+Math.random(8);
    }
    else {
    	var url = banners_url+"/www/my_files/singlepaaagecaaall.php?zones=" + zone + "&loc=" + window.location + "?random="+Math.random(8);
    }
   
    // banner rotation calculation (and ajax request) only if the page is active
    
    if (ifvisible.now())
    {
        // ajax query for new ad banner
        $.ajax({
            url: url,
            type: 'GET',
            crossDomain: true,
            contentType: 'text/plain',
            success: function(data)
            {
                // couldn't connect to adserver OR we have looped initially the threshold amount and couldn't find a new image
                if (data.data == false || mdpi_com_adserver_banners[id]["same-threshold"] == 0)
                {
                    // clear the interval if it is set for the banner
                    if (mdpi_com_adserver_banners[id].hasOwnProperty("interval"))
                    {
                        clearInterval(mdpi_com_adserver_banners[id]["interval"]);
                    }
                }
                // received information from adserver
                else
                {
                    eval(data);
                    var content = OA_output[zone];
                    
                    var regExp = /(bannerid=(\d+)zoneid)/;
                    var matches = regExp.exec(content);
                    
                    if (matches)
                    {                
                        // connection to expanding-content
                        div.closest(".expanding-div").removeClass("empty");

                        // add google analytics tracker to banner links that have alt value defined
                        var contentElement = $(content).clone().wrap("<p>").parent();
                        var imgAlt         = contentElement.find("img").attr("alt");

                        if ("" !== imgAlt)
                        {
                            contentElement.find("a").attr("onclick", "ga('send', 'pageview', '" + imgAlt + "');");
                            content = contentElement.html();
                        }
                        
                        // the loaded banner matches the current one
                        if (mdpi_com_adserver_banners[id]["current"] == matches[2])
                        {
                            mdpi_com_adserver_banners[id]["counter"] += 1;
                            mdpi_com_adserver_banners[id]["same-threshold"] -= 1;
                            if (mdpi_com_adserver_banners[id]["counter"] < 5)
                            {
                                mdpiComAdserverRotateBanner(div, max_rotation);
                            }
                            else
                            {
                                mdpi_com_adserver_banners[id]["counter"] = 0;
                            }
                        }
                        else
                        {
                            if(mdpi_com_adserver_banners[id]["rotate_counter"]==undefined || mdpi_com_adserver_banners[id]["rotate_counter"] < max_rotation)
                            {
                                var div_animation = div.find(".animation-content");
                                 
                                div_animation.append('<div style="position:relative; display: block; float: left; padding:0; margin:0">' + content + '</div>');
                                var slideWidth = div_animation.closest('.adserver-banner').width();

                                // update the banner image size to match the available space
                                div_animation.find('img').css('width', slideWidth + 'px');
                                    
                                if (div_animation.children("div").length > 1)
                                {
                                    mdpi_com_adserver_banners[id]["same-threshold"] = -1;
                                    div_animation.stop().animate({left: -slideWidth}, function()
                                    {
                                        div_animation.children("div:first-child").remove();
                                        $(this).css('left', '');
                                    });
                                }
                                
                                mdpi_com_adserver_banners[id]["counter"] = 0;
                                mdpi_com_adserver_banners[id]["current"] = matches[2];
                                mdpi_com_adserver_banners[id]["rotate_counter"] += 1;
                            }
                            else
                            {
                                clearInterval(mdpi_com_adserver_banners[id]["interval"]);
                            }                        
                        }
                    }
                }
            }
        });
    }
}


$(document).ready(function()
{
    // need to set the dynamic banner width images correctly - cannot be done
    // before the container is visible and thus needs to be done here (event
    // is triggered when column calculations is setting the container element
    // visible)
    $(".extending-content").on(SHOW_EXPANDING_EVENT, function()
    {
        $(this).find(".expanding-div").each(function() {
            var width = $(this).width();

            $(this).find(".adserver-banner").each(function() {

                $(this).find("img").css('width', width + 'px');
                //mdpi_column_height_module.calculateColumnHeights(false);
            });
        });
    });

  $(".adserver-banner").each(function()
    {        
        var div = $(this);
        var id  = div.attr("id");
        div.html('<div class="animation-content" style="position: relative; width: 10000px; padding: 0px"></div>')
        div.css('overflow', 'hidden');
        div.css('padding', '0')
        
        var max_rotation = div.attr("max-rotation")== undefined ? 50 : div.attr("max-rotation");        
        
        if (id == undefined)
        {
            console.log("Banner initialization error: unique banner div id *must* be defined");
        }
        else
        {
            mdpi_com_adserver_banners[id] = {};
            mdpi_com_adserver_banners[id]["current"] = "-1";
            mdpi_com_adserver_banners[id]["counter"] = 0;
            mdpi_com_adserver_banners[id]["rotate_counter"] = 0;
            mdpi_com_adserver_banners[id]["same-threshold"] = default_threshold; 
            
            if (div.attr("value")== undefined)
            {
                if(mdpi_com_adserver_banners[id]==undefined || mdpi_com_adserver_banners[id]["rotate_counter"]==undefined || mdpi_com_adserver_banners[id]["rotate_counter"] < max_rotation)
                {                    
                    if (div.data("repeat-interval") != undefined)
                    {
                        mdpi_com_adserver_banners[id]["interval"] = setInterval(function()
                        {
                            mdpiComAdserverRotateBanner(div, max_rotation);
                        }, div.data("repeat-interval") * 1000);
                    }
                }
                 
                div.attr("value", "yes");
                mdpiComAdserverRotateBanner(div);
            }
        }
    });    
});

