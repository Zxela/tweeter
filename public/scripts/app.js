$(document).ready(function() {
	/*run on document ready */
	const loadTweets = function() {
		$(".tweetContainer").empty(); //empty tweets on site
		$.getJSON("/tweets", function(data) {
			renderTweets(data);
		}).fail(function() {
			$("#errorMsg")
				.text("failed to load tweets")
				.fadeIn();
			$(".new-tweet textarea").on("focus", function() {
				$("#errorMsg").fadeOut();
			});
		});
	};
	/* render tweets start */
	function renderTweets(arrOfTweets) {
		for (let i = 0; i < arrOfTweets.length; i++) {
			createTweetElement(arrOfTweets[i]);
		}
		//LIKE EVENT LISTENER
		const $like = $(".likes");
		$like.on("click", function() {
			console.log("clicked", $(this).children("i"));
			$heart = $(this).children("i");
			if ($heart.hasClass("liked")) {
				$heart.removeClass("liked");
				console.log(
					$(this)
						.closest("article")
						.get()
				);
				$.post(
					`/tweets/${$(this)
						.closest("article")
						.get()}/removeLike`,
					function() {
						console.log("remove CB successful"); //placeholder for remove class
					}
				);
			} else {
				$heart.addClass("liked");
				console.log(
					$(this)
						.closest("article")
						.get()
				);

				$.post(
					`/tweets/${$(this)
						.closest("article")
						.get()}/addLike`,
					function() {
						console.log("add CB successful"); //placeholder for addclass
					}
				);
			}
		});
		//END OF LIKE LISTENER
	}
	function createTweetElement(tweets) {
		let d = new Date();
		let tDay = d.getTime();
		let postTime = Math.floor((tDay - tweets.created_at) / 86400000); //num of ms in a day
		/* escape function to prevent user from injecting js, html */
		function escape(str) {
			var div = document.createElement("div");
			div.appendChild(document.createTextNode(str));
			return div.innerHTML;
		}
		/* prepending to get newest post first */
		$(".tweetContainer").prepend(`<article id="${tweets._id}"> 
        <header>
          <img src="${tweets.user.avatars["small"]}" class="userPic">
          <div class="userName">${tweets.user.name}</div>
          <div class="userID">${tweets.user.handle}</div>
        </header>
        <p>${escape(tweets.content.text)}</p>
        <footer>
          <span class='time'>
          ${postTime} days ago
          </span>
          <span class='icons'>
          	<i class="fas fa-flag"></i>
						<i class="fas fa-retweet"></i>
						<span class="likes">
							<i class="fas fa-heart"><span class"likecount"></span></i>
						</span>
					</span>
        </footer>
      </article>`);

		//event listener for likes - nested to ensure attached to each tweet
	}
	/* <i class="fas fa-heart"></i>  icon for heart when liked...*/

	//jquery submit button "posttweet"
	$("#postTweets").on("submit", function(ev) {
		ev.preventDefault(); //prevent default event from occuring
		let str = $("#postTweets")
			.find("textarea")
			.val();
		let noSpaceStr = str.trim(); //catch line breaks
		let $urlData = $(this).serialize();
		if (noSpaceStr === null || noSpaceStr === "") {
			$("#errorMsg")
				.text("Please write something first!")
				.fadeIn();
			$(".new-tweet textarea").on("focus", function() {
				$("#errorMsg").fadeOut();
			});
		} else if (str.length > 0 && str.length < 141) {
			//If text meets reqs
			$.post("/tweets", $urlData, function() {
				$(".new-tweet textarea").val(""); //reset text area on submit
				$(".new-tweet .counter").text("140"); //reset counter on submit
				loadTweets(); //load tweets from updated json
			});
		} else {
			$("#errorMsg")
				.text("Too many characters!")
				.fadeIn();
			$(".new-tweet textarea").on("focus", function() {
				$("#errorMsg").fadeOut();
			});
		}
	});
	// event listener for "Compose" button
	const $compose = $("#composeTweet");
	$compose.on("click", function() {
		$(".new-tweet").slideToggle();
		$(".new-tweet textarea").focus();
	});

	//First load of tweets
	loadTweets();

	// end of onDocumentReady
});
