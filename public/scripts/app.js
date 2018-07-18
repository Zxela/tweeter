$(document).ready(function() {
const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
  
function renderTweets(arrOfTweets, cb) {
    for (let i = 0; i < arrOfTweets.length; i++) {
        cb(arrOfTweets[i]);
    }
}

function createTweetElement(tweets) {
    let tweetText = tweets.content.text; 
    let user_id = tweets.user.handle;
    let userName = tweets.user.name;
    let avatar = tweets.user.avatars['small']; 
    let postTime = Date(tweets.created_at * 1000);
    
    $(".tweetContainer").append(`<article>
        <header>
          <img src="${avatar}" class="userPic">
          <div class="userName">${userName}</div>
          <div class="userID">${user_id}</div>
        </header>
        <p>${tweetText}</p>
        <footer>
          ${postTime}
        </footer>
      </article>`)
}
renderTweets(tweetData, createTweetElement);
});
