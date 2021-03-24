/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    let $tweetUser = '';
    
    // loops through tweets
    for (const tweet in tweets) {
      $tweetUser = createTweetElement(tweets[tweet]);
      $('#tweets-container').append($tweetUser);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  // creates an HTML markup to be appended to #tweets-container ID
  const createTweetElement = function(data) {
    const newTweet = `
    <article class="tweet-article">
        <header class="tweet-header">
          <div class="img-container">
            <img class="img-avatar" src=${data.user.avatars}>
            <h5>${data.user.name}</h5>        
          </div>  
          <h5 id="tweet-handle">${data.user.handle}</h5>
        </header>
        <p>${data.content.text}</p>
        <footer class="tweet-footer">
          <div>${data.created_at}</div>
          <div class="buttons">
            <div>button1</div>
            <div>button2</div>
            <div>button3</div>
          </div>
        </footer>
    </article>
    `;

    return newTweet;
  };

  renderTweets(data);

});