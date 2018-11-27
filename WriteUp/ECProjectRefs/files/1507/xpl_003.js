"use strict";!function(){angular.module("templates.xpl.product",[]),angular.module("xpl.product",["xpl","templates.xpl.product"]),angular.module("xpl.product").config(["$httpProvider","$locationProvider",function($httpProvider,$locationProvider){$locationProvider.html5Mode(!0).hashPrefix("!"),$httpProvider.defaults.cache=!1,$httpProvider.defaults.headers.get||($httpProvider.defaults.headers.get={}),$httpProvider.defaults.headers.get["If-Modified-Since"]="0"}])}(),function(){function productService($http,$log,$q,api){function getProductDetail(id,detail,params){var requestConfig={cache:!0};if(params&&(requestConfig.params=params),"authors"===detail||"keywords"===detail||"algorithms"===detail){var deferred=$q.defer(),metadata=global.document.metadata?global.document.metadata:{},data=JSON.parse(JSON.stringify(metadata));return deferred.resolve(data),deferred.promise}return $http.get(api.document[detail].replace("{0}",id),requestConfig).then(getProductDetailSuccess)["catch"](promiseFailure)}function getProductDetailSuccess(response){return response.data}function promiseFailure(error){$log.error("Error",error)}var productService={getProductDetail:getProductDetail};return productService}angular.module("xpl.product").factory("productService",productService),productService.$inject=["$http","$log","$q","api"]}(),function(){function ProductTabController($filter,$log,$rootScope,$state,documentConstants,productService,utilService,utilsService,documentService){function initialize(){if("figures"===vm.detail)documentService.getDocument(vm.id).then(documentFiguresAccessCheckSuccess)["catch"](catchPromiseFailure);else if("definitions"===vm.detail)vm.deniedDefinitionsAccess=!0,documentService.getDocument(vm.id).then(documentDefinitionsAccessCheckSuccess)["catch"](catchPromiseFailure);else if("references"===vm.detail)documentService.getDocument(vm.id).then(documentReferencesAccessCheckSuccess)["catch"](catchPromiseFailure);else{var reqParams;"citations"===vm.detail&&(reqParams={count:30}),productService.getProductDetail(vm.id,vm.detail,reqParams).then(getProductDetailSuccess)["catch"](catchPromiseFailure)}}function getProductDetailSuccess(data){if(vm.details=data,vm.loading=!1,$state.params.ctx||$state.params.q||$state.params.part||utilsService.scrollTo("document-tabs",50,function(){$rootScope&&($rootScope.$broadcast(documentConstants.events.resetFullTextHeaderScroll),$rootScope.$broadcast(documentConstants.events.resetFullTextRightRailScroll))}),vm.details.keywords&&trimKeywords(),vm.details.references&&vm.details.references.length>30&&(vm.details.references=$filter("limitTo")(vm.details.references,30)),(vm.details.paperCitations||vm.details.patentCitations)&&(vm.activeItems=[],vm.activeTypeFilter="",vm.activePublisherFilter="",vm.viewAllState=void 0,vm.applyTypeFilter=applyTypeFilter,vm.applyPublisherFilter=applyPublisherFilter,$state.params.tabFilter&&("papers"===$state.params.tabFilter&&(vm.details.paperCitations.ieee||vm.details.paperCitations.nonIeee)||"patents"===$state.params.tabFilter&&vm.details.patentCitations)?vm.applyTypeFilter($state.params.tabFilter):vm.details.paperCitations.ieee||vm.details.paperCitations.nonIeee?vm.applyTypeFilter("papers"):vm.details.patentCitations?vm.applyTypeFilter("patents"):vm.activeItems=[]),vm.details.authors&&vm.details.authors.length>0){vm.details.authors.length>30&&(vm.details.authors=$filter("limitTo")(vm.details.authors,30));for(var i=0,l=vm.details.authors.length;i<l;i++){var authorName=vm.details.authors[i].name;vm.details.authors[i].hashedName=authorName?utilService.string2Hash(vm.details.authors[i].name):null}}vm.details.multimedia&&(vm.loading=!0,documentService.getDocument(vm.id).then(getDocumentSuccess)["catch"](catchPromiseFailure)),vm.details.supplementGroup&&(vm.details.algorithms=getAlgorithmDetails(vm.details.supplementGroup))}function getDocumentSuccess(data){vm.document=data,vm.loading=!1}function documentFiguresAccessCheckSuccess(data){vm.document=data,vm.document.fullTextAccess?productService.getProductDetail(vm.id,vm.detail).then(getProductDetailSuccess)["catch"](catchPromiseFailure):vm.loading=!1}function documentDefinitionsAccessCheckSuccess(data){vm.document=data,vm.document.fullTextAccess||vm.document.userInfo.institute||vm.document.userInfo.member||vm.document.userInfo.individual||vm.document.userInfo.guest?(vm.deniedDefinitionsAccess=!1,productService.getProductDetail(vm.id,vm.detail).then(getProductDetailSuccess)["catch"](catchPromiseFailure)):(vm.deniedDefinitionsAccess=!0,vm.loading=!1)}function documentReferencesAccessCheckSuccess(data){vm.document=data,vm.document.fullTextAccess&&vm.document.isStandard&&vm.document.isDynamicHtml&&"IEEE"===vm.document.publisher&&(vm.showNormativeRefLink=!0),productService.getProductDetail(vm.id,vm.detail).then(getProductDetailSuccess)["catch"](catchPromiseFailure)}function catchPromiseFailure(error){$log.error(error),vm.loading=!1}function applyTypeFilter(type){vm.activeTypeFilter=type,"papers"===type?vm.details.paperCitations.ieee?vm.applyPublisherFilter("ieee"):vm.details.paperCitations.nonIeee&&vm.applyPublisherFilter("nonIeee"):(vm.activeItems=vm.details.patentCitations,vm.viewAllState={name:"document.full",params:{q:null,part:null,section:null,tab:"citations",ctx:"citations",anchor:"anchor-patent-citations",tabFilter:null}})}function applyPublisherFilter(pub){vm.activePublisherFilter=pub,vm.activeItems=vm.details.paperCitations[pub],vm.viewAllState={name:"document.full",params:{q:null,part:null,section:null,tab:"citations",ctx:"citations",anchor:"anchor-paper-citations-"+pub.toLowerCase(),tabFilter:null}}}function getAlgorithmDetails(group){return filterAlgorithms(group).map(function(algorithm){return angular.extend(algorithm,{name:algorithm["supplement-name"],link:algorithm.doi?"https://doi-org.proxy.library.cornell.edu/"+algorithm.doi:algorithm.uri,icon:algorithm.language?algorithm.language.toLowerCase().replace(/\+/g,"plus"):""})})}function filterAlgorithms(group){return group.filter(function(item){return"algorithm"===item.type}).reduce(function(set,item){return set.concat([],item["supplement-alg-dataset"])},[])}function scrollToAnchor(anchor,offset){anchor="string"==typeof anchor?anchor:"",offset="number"==typeof offset?offset:0,utilsService.scrollTo(anchor,offset)}function trimKeywords(){for(var keywords=vm.details.keywords,i=0;i<keywords.length;i++)for(var count=0,kwd=keywords[i].kwd,j=0;j<kwd.length;j++)count+=kwd[j].length,count>245&&(vm.keywordTypesExceedingLimit.push(vm.details.keywords[i].type),vm.details.keywords[i].kwd.splice(j,kwd.length-j))}var vm=this;vm.details={},vm.document={},vm.loading=!0,vm.keywordTypesExceedingLimit=[],vm.showNormativeRefLink=!1,vm.scrollToAnchor=scrollToAnchor,initialize()}angular.module("xpl.product").controller("ProductTabController",ProductTabController),ProductTabController.$inject=["$filter","$log","$rootScope","$state","documentConstants","productService","utilService","utilsService","documentService"]}(),function(){function xplCmptProductAlgorithms(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/algorithms/algorithms-component.html"}}angular.module("xpl.product").directive("xplCmptProductAlgorithms",xplCmptProductAlgorithms)}(),function(){function xplCmptProductAuthors(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/authors/authors-component.html"}}angular.module("xpl.product").directive("xplCmptProductAuthors",xplCmptProductAuthors)}(),function(){function xplCmptProductCitations(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/citations/citations-component.html"}}angular.module("xpl.product").directive("xplCmptProductCitations",xplCmptProductCitations)}(),function(){function xplCmptProductDefinitions(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/definitions/definitions-component.html"}}angular.module("xpl.product").directive("xplCmptProductDefinitions",xplCmptProductDefinitions)}(),function(){function xplCmptProductFigures(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/figures/figures-component.html"}}angular.module("xpl.product").directive("xplCmptProductFigures",xplCmptProductFigures)}(),function(){function xplCmptProductKeywords(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/keywords/keywords-component.html"}}angular.module("xpl.product").directive("xplCmptProductKeywords",xplCmptProductKeywords)}(),function(){function xplCmptProductMedia(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/media/media-component.html"}}angular.module("xpl.product").directive("xplCmptProductMedia",xplCmptProductMedia)}(),function(){function xplCmptProductMetrics(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/metrics/metrics-component.html"}}angular.module("xpl.product").directive("xplCmptProductMetrics",xplCmptProductMetrics)}(),function(){function xplCmptProductReferences(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/references/references-component.html"}}angular.module("xpl.product").directive("xplCmptProductReferences",xplCmptProductReferences)}(),function(){function xplCmptProductVersions(){return{bindToController:{detail:"@",id:"@"},controller:"ProductTabController",controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/versions/versions-component.html"}}angular.module("xpl.product").directive("xplCmptProductVersions",xplCmptProductVersions)}(),function(){function xplCmptProductMetricsUsage(){return{bindToController:{years:"="},controller:xplCmptProductMetricsUsageComponent,controllerAs:"vm",replace:!0,restrict:"E",scope:{},templateUrl:"product/tabs/metrics/usage/usage-component.html"}}function xplCmptProductMetricsUsageComponent($scope){function initialize(){vm.years.length>0&&vm.viewYear(vm.years[0])}function viewYear(year){vm.activeYear=year}var vm=this;vm.years=vm.years||[],vm.activeYear={},vm.viewYear=viewYear,initialize()}angular.module("xpl.product").directive("xplCmptProductMetricsUsage",xplCmptProductMetricsUsage),xplCmptProductMetricsUsageComponent.$inject=["$scope"]}();