var toastdata;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.type === "shownotification"){
  	toastdata = request.opt;
    var notification = chrome.notifications.create('mcatnotify', 
    	request.opt, 
    	function(id){ 
    		console.log("Track: " + request.opt.message); 
    	}
    );

    setTimeout(function(){chrome.notifications.clear("mcatnotify",function(){});},10000);
  }
});

chrome.browserAction.onClicked.addListener(function(request, sender, sendResponse){
	var notification = chrome.notifications.create('mcatnotify', 
  	toastdata, 
  	function(id){ 
  		console.log("Track: " + toastdata.message); 
  	}
  );

  setTimeout(function(){chrome.notifications.clear("mcatnotify",function(){});},10000);
});

chrome.notifications.onClicked.addListener(function(request, sender, sendResponse){
	//set active tab to the twitch stream
	chrome.tabs.query({'url': 'https://www.twitch.tv/monstercat'}, function(tabs){
		chrome.tabs.update(tabs[0].id, {active: true});
	});
});