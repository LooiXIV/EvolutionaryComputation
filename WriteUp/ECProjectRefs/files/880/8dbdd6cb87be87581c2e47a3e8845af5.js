Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){try{var a={l1:document.location.host.replace(/^www\./,""),l2:document.title||"Untitled",l3:"__page__",l4:"-",sa:"",sn:""},b=[];for(var c in a)b.push(c+"\x3d"+encodeURIComponent(a[c]));b=b.join("\x26");(new Image).src="//du3xt9iat8rwd.cloudfront.net?a\x3d711a53ef61244b5aa74a9272edaac159";var d=document.createElement("script");d.type="text/javascript";d.async=
!0;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(d,e);d.src="https://z.moatads.com/naturecontent5748920/moatcontent.js#"+b}catch(f){try{var g="//pixel.moatads.com/pixel.gif?e\x3d24\x26d\x3ddata%3Adata%3Adata%3Adata\x26i\x3dMOATCONTENTABSNIPPET1\x26ac\x3d1\x26k\x3d"+encodeURIComponent(f)+"\x26j\x3d"+encodeURIComponent(document.referrer)+"\x26cs\x3d"+(new Date).getTime();(new Image).src=g}catch(h){}}})()},1283613,372108);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.npg=Bootstrapper.npg||{};Bootstrapper.npg.webtrendsRules=Bootstrapper.npg.webtrendsRules||[];Bootstrapper.npg.webtrendsRules.push(function(params,next){var utils=Bootstrapper.npg.utils,req=utils.Request,dcsvid=req.get("WT.i_dcsvid"),ecid=req.get("WT.ec_id");if(dcsvid)req.cookie("WT.i_dcsvid",dcsvid,{path:"/",days:365,domain:".nature.com"});if(ecid)req.cookie("WT.ec_id",
ecid,{path:"/",domain:".nature.com"});params.mc_id=req.get("text")||req.get("WT.mc_id")||"";params.i_dcsvid=dcsvid||req.cookie("WT.i_dcsvid")||"";params.ec_id=ecid||req.cookie("WT.ec_id")||"";utils.onJqueryDefined(function($){var $ss,mob;if($){$ss=$("#smaller-screen, #mob-ss, #mobile-css-test");mob=$ss.length&&($ss.is(":visible")||$ss.css("display").toLowerCase()==="block")}else mob=false;params.z_css=mob?"mobile":"desktop";next(params)})})},484785,259523);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){try{return Bootstrapper.data.extract("citation_journal_title","meta")}catch(e){return""}},transform:function(v){return v},load:"",dataDefName:"journal_title",collection:"article_data",source:"Manage",priv:"false"},{id:"1855"})},1855)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){try{return Bootstrapper.data.extract("WT.site_id","meta")}catch(e){return""}},transform:function(v){return v},load:"",dataDefName:"site_id",collection:"article_data",source:"Manage",priv:"false"},{id:"1905"})},1905)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var ext=Bootstrapper.data.extract;try{return ext("access","meta")||ext("Access","meta")}catch(e){return""}},transform:function(v){return v},load:"",dataDefName:"access",collection:"article_data",source:"Manage",priv:"false"},{id:"1853"})},1853)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){try{return Bootstrapper.data.extract("WT.registrant_id","meta")}catch(e){return"error"}},transform:function(v){return v},load:"",dataDefName:"registrant_id",collection:"article_data",source:"Manage",priv:"false"},{id:"1910"})},1910)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){try{return Bootstrapper.data.extract("WT.site_id_name","meta")}catch(e){return""}},transform:function(v){return v},load:"page",dataDefName:"site_id_name",collection:"article_data",source:"Manage",priv:"false"},{id:"3803"})},3803)},-1,-1);