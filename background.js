chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("background triggered");
  if(request.type === "shownotification"){
    var notification = chrome.notifications.create('mcatnotify', 
    	request.opt, 
    	function(id){ 
    		console.log("Track: " + request.opt.message); 
    	}
    );

    setTimeout(function(){chrome.notifications.clear("mcatnotify",function(){});},10000);
  }
});