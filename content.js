// $(document).ready(function(){
	console.log("mCat Tracklist LOADED");

	var target = $("ul.chat-lines")[0];
	var lastSong = "";
	console.log(target);

	// function addobserver(){
	// 	if(!target.Length){
	// 		window.setTimeout(addobserver, 500);
	// 		return
	// 	}
	// 	obsthing(target);
	// }

	// function obsthing(target){
		var observer = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){
				var newNodes = mutation.addedNodes;
				if(newNodes !== null){
					newNodes.forEach(function(node){
						var sender = $(node).find(".from")[0].innerText;
						if(sender == "Monstercat"){
							var message = $(node).find(".message")[0].innerText.replace(/\s-.+$/, "");

							if(message.search("Now Playing: ") >= 0 && message.replace("Now Playing: ", "") != lastSong){
								message = message.replace("Now Playing: ", "");

								var title = message.substring(0, message.search(/by(?!.*by)/)-1);
								var author = message.substring(message.search(/by(?!.*by)/)+3, message.length);

								var options = {
									type: "basic",
									title: "Now Playing",
									message: message,
									contextMessage: "contextmessage",
									// items: [{title: title, message: "by " + author}],
									iconUrl: "Monstercat_Logo.png"
								};

								console.log(message);
								chrome.runtime.sendMessage({type: "shownotification", opt: options}, function(){} );
								lastSong = message;
								//chrome.notifications.create(options);
							}
						}
					});
				}
			});
		});

		var config = {
			attributes: true,
			childList: true,
			characterData: true
		};

		observer.observe(target, config);
	// }

	// addobserver();
// });
// $(document).ready(function(){
// 	$.get("https://www.twitch.tv/monstercat/chat", function(data){
// 		console.log($("ul.chat-lines"));
// 	})
// })