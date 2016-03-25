!function(window,angular,undefined){"use strict";angular.module("angulartics.google.analytics",["angulartics"]).config(["$analyticsProvider",function($analyticsProvider){function setDimensionsAndMetrics(properties){if(window.ga)for(var idx=1;200>=idx;idx++)properties["dimension"+idx.toString()]&&ga("set","dimension"+idx.toString(),properties["dimension"+idx.toString()]),properties["metric"+idx.toString()]&&ga("set","metric"+idx.toString(),properties["metric"+idx.toString()])}$analyticsProvider.settings.pageTracking.trackRelativePath=!0,$analyticsProvider.settings.ga={additionalAccountNames:undefined,userId:null},$analyticsProvider.registerPageTrack(function(path){window._gaq&&(_gaq.push(["_trackPageview",path]),angular.forEach($analyticsProvider.settings.ga.additionalAccountNames,function(accountName){_gaq.push([accountName+"._trackPageview",path])})),window.ga&&($analyticsProvider.settings.ga.userId&&ga("set","&uid",$analyticsProvider.settings.ga.userId),ga("send","pageview",path),angular.forEach($analyticsProvider.settings.ga.additionalAccountNames,function(accountName){ga(accountName+".send","pageview",path)}))}),$analyticsProvider.registerEventTrack(function(action,properties){if(properties&&properties.category||(properties=properties||{},properties.category="Event"),properties.value){var parsed=parseInt(properties.value,10);properties.value=isNaN(parsed)?0:parsed}if(window.ga){var eventOptions={eventCategory:properties.category,eventAction:action,eventLabel:properties.label,eventValue:properties.value,nonInteraction:properties.noninteraction,page:properties.page||window.location.hash.substring(1)||window.location.pathname,userId:$analyticsProvider.settings.ga.userId};setDimensionsAndMetrics(properties),$analyticsProvider.settings.ga.transport?ga("send","event",eventOptions,{transport:$analyticsProvider.settings.ga.transport}):ga("send","event",eventOptions),angular.forEach($analyticsProvider.settings.ga.additionalAccountNames,function(accountName){ga(accountName+".send","event",eventOptions)})}else window._gaq&&_gaq.push(["_trackEvent",properties.category,action,properties.label,properties.value,properties.noninteraction])}),$analyticsProvider.registerExceptionTrack(function(properties){return properties&&properties.appId&&properties.appName&&properties.appVersion?(properties.fatal===undefined&&(console.log('No "fatal" provided, sending with fatal=true'),properties.exFatal=!0),properties.exDescription=properties.description,void ga("send","exception",properties)):void console.error("Must be setted appId, appName and appVersion.")}),$analyticsProvider.registerSetUsername(function(userId){$analyticsProvider.settings.ga.userId=userId}),$analyticsProvider.registerSetUserProperties(function(properties){setDimensionsAndMetrics(properties)}),$analyticsProvider.registerUserTimings(function(properties){return properties&&properties.timingCategory&&properties.timingVar&&properties.timingValue?void(window.ga&&ga("send","timing",properties)):void console.error("Properties timingCategory, timingVar, and timingValue are required to be set.")})}])}(window,window.angular);
