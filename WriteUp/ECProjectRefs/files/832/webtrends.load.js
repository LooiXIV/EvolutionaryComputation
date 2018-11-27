// WebTrends SmartSource Data Collector Tag v10.4.1
// Copyright (c) 2014 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.3.2
// Created: 2014.03.27
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:"dcs222annmpybp2logngieiv5_8e3z",
        domain:"statse.webtrendslive.com",
        timezone:-6,
        i18n:true,
        adimpressions:true,
        adsparam:"WT.ac",
        offsite:true,
        download:true,
        downloadtypes:"xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip",
        anchor:true,
        javascript: true,
        onsitedoms:"",
        fpcdom:"",
        plugins:{
            facebook:{src:"//s.webtrends.com/js/webtrends.fb.js"},
            yt:{src:"//s.webtrends.com/js/webtrends.yt.js"},
            flowPlayer:{src:"/webscripts/webtrends/webtrends.fp.js",beacon:false,playerID:'#acsFlowPlayer'},
            advancedLinkTracking:{
                src:"/webscripts/webtrends/advancedLinkTracking.js",
                trackers:[
                {name:"All Links", type:"all_links"}
                ]
            }
        }
        }).track();
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="/webscripts/webtrends/webtrends.js";    
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());