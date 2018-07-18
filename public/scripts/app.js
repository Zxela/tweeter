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
    console.log("new tweet submitted");
    let $urlData = $(this).serialize();
    console.log($urlData)
    $.post("/tweets", $urlData);
  });
  function loadTweets () {
    $.getJSON("/tweets", function(data){
      renderTweets(data);
    })
  }
  loadTweets();
  
});
