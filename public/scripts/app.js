$(document).ready(function() {
  const loadTweets = function () {
    $.getJSON("/tweets", function(data){
      renderTweets(data);
    })
    .fail(function(){
      alert("failed to load tweets from JSON");
    })
  }
//render tweets start
  function renderTweets(arrOfTweets) {
      $('.tweetContainer').empty();
      for (let i = 0; i < arrOfTweets.length; i++) {
      createTweetElement(arrOfTweets[i]);
    }
  }
  function createTweetElement(tweets) {
    let d = new Date();
    let tDay = d.getTime();
    let postTime = Math.floor((tDay - tweets.created_at) / 86400000); //num of ms in a day
    //prepending to get newest post first
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    $(".tweetContainer").prepend(`<article> 
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
          <i class="fas fa-heart"></i>
        </footer>
      </article>`);
  }
  const $tweetSub = $("#postTweets"); //jquery submit button "posttweet"
  $tweetSub.on("submit", function(ev) {
    ev.preventDefault();
    let str = $('#postTweets').find('textarea').val()
    let $urlData = $(this).serialize();
    if (str === null || str === ""){
      alert("Please write something first!")
    }else if (str.length > 0 && str.length < 141) { //if text is greater than 0 or less than 141
      console.log("new tweet", '"' + str + '"', "submitted"); //logs tweet submitted with text
      $.post("/tweets", $urlData);
      loadTweets();
    } else {
      alert("Please keep character count below 140!");
    }
    
  });
// event listener for button
  const $compose = $("#composeTweet");
  $compose.on('click', function() {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  })
  loadTweets();

  


// end of onDocumentReady
});
