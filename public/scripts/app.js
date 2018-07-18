$(document).ready(function() {
  //render tweets
  function renderTweets(arrOfTweets) {
    for (let i = 0; i < arrOfTweets.length; i++) {
      createTweetElement(arrOfTweets[i]);
    }
  }
  function createTweetElement(tweets) {
    let d = new Date();
    let tDay = d.getTime();
    let postTime = Math.floor((tDay - tweets.created_at) / 86400000); //num of ms in a day
    $(".tweetContainer").append(`<article>
        <header>
          <img src="${tweets.user.avatars["small"]}" class="userPic">
          <div class="userName">${tweets.user.name}</div>
          <div class="userID">${tweets.user.handle}</div>
        </header>
        <p>${tweets.content.text}</p>
        <footer>
          ${postTime} days ago
        </footer>
      </article>`);
  }
  let $tweetSub = $("#postTweets");
  $tweetSub.on("submit", function(ev) {
    ev.preventDefault();
    let str = $('#postTweets').find('textarea').val()
    console.log("new tweet", '"' + str + '"', "submitted"); //logs tweet submitted with text
    let $urlData = $(this).serialize();
    if (str === null || str === ""){
      alert("Null or empty string")
    }else if (str.length > 0 && str.length < 141) { //if text is greater than 0 or less than 141
      $.post("/tweets", $urlData);
      return;
    } else {
      alert("Too few or too many characters!")
    }
    
  });
  let loadTweets = function () {
    $.getJSON("/tweets", function(data){
      renderTweets(data)
    })
    .fail(function(){
      alert("failed to load tweets from JSON")
    })
  }
  loadTweets();
  
});
