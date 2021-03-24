/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
  // loops through tweets and takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    let $tweetUser = '';
    
    for (const tweet in tweets) {
      $tweetUser = createTweetElement(tweets[tweet]);
      $('#tweets-container').append($tweetUser);
    }
  };

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

  // Event handler that listens to tweet submissions
  $('form').on('submit', function() {
    event.preventDefault();

    if ($('textarea').val() === '') {
      return alert("Tweets cannot be empty");
    }
    if ($('textarea').val().length > 140 ) {
      return alert("Tweets cannot be longer than 140 characters");
    }

    $.ajax({
      url: '/tweets',
      dataType: 'text',
      method: "POST",
      data: $('textarea').serialize()
    }).then((result) => {
      loadLatestTweets();
    }).catch(err => {
      console.log('ajax error occured');
      console.log(err);
    });
  
  });

  // Function that fetches data from the /tweets url
  const loadTweets = function() {

    $.ajax({
      url: '/tweets',
      method: "GET"
    }).then((result) => {
      renderTweets(result);
    }).catch(err => {
      console.log('ajax error occured');
      console.log(err);
    });
  }

  // Uses Ajax fetches and loads the last entry
  const loadLatestTweets = function() {
    let latestResult = []

    $.ajax({
      url: '/tweets',
      method: "GET"
    }).then((result) => {
      latestResult.push(result[result.length - 1]);
      renderTweets(latestResult);
    }).catch(err => {
      console.log('ajax error occured');
      console.log(err);
    });
  }

  loadTweets();

});