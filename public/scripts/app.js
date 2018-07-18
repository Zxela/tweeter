$(document).ready(function() {
const tweetData = {
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
  }
  


function createTweetElement(obj) {
    let tweetText = tweetData.content.text; 
    let user_id = tweetData.user.handle;
    let userName = tweetData.user.name;
    let avatar = tweetData.user.avatars['small']; 
    let postTime = Date(tweetData.created_at * 1000);
    
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
createTweetElement(tweetData);
});