/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
  // hides the compose bar until needed
  $('.container').hide();

  // listens for click to reveal the compose bar
  $('.dropdown-nav').on('click', function() {
    $('.container').toggle('slide');
  });
  
  // loops through tweets and takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    let $tweetUser = '';
    
    for (const tweet in tweets) {
      $tweetUser = createTweetElement(tweets[tweet]);
      $('#tweets-container').append($tweetUser);
    }
  };

  // Function to check how much has elapsed since the post was created
  const timeAgo = function(date) {
    // creates a new date and subtracts the submitted date to it to calculate the seconds
    let seconds = Math.floor((new Date() - date) / 1000);
    // devides by how much seconds are in a year
    let timeBetween = seconds / 31536000;
  
    if (timeBetween > 1) {
      return Math.floor(timeBetween) + " year(s) ago";
    }
    // devides by how much seconds are in a month
    timeBetween = seconds / 2592000;
    if (timeBetween > 1) {
      return Math.floor(timeBetween) + " month(s) ago";
    }
    // devides by how much seconds are in a day
    timeBetween = seconds / 86400;
    if (timeBetween > 1) {
      return Math.floor(timeBetween) + " day(s) ago";
    }
    // devides by how much seconds are in a hour
    timeBetween = seconds / 3600;
    if (timeBetween > 1) {
      return Math.floor(timeBetween) + " hour(s) ago";
    }
    // devides by how much seconds are in a minute
    timeBetween = seconds / 60;
    if (timeBetween > 1) {
      return Math.floor(timeBetween) + " minute(s) ago";
    }
    // returns the seconds if none of timeBetween is greater than 1
    return Math.floor(seconds) + " second(s) ago";
  };

  // creates an HTML markup to be appended to #tweets-container ID
  const createTweetElement = function(data) {
    const convertedDate = new Date(data.created_at);
    const newDate = timeAgo(convertedDate);

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
          <div>${newDate}</div>
          <div class="buttons">
            <div>►</div>
            <div>⇆</div>
            <div>♥</div>
          </div>
        </footer>
    </article>
    `;

    return newTweet;
  };

  // Hides error messages until needed
  $('.error-empty').hide();
  $('.error-exceed').hide();

  // Event handler that listens to tweet submissions
  $('form').on('submit', function() {
    event.preventDefault();

    if ($('textarea').val() === '') {
      return $('.error-empty').show('slide');
    }
    if ($('textarea').val().length > 140) {
      return $('.error-exceed').show('slide');
    }

    $.ajax({
      url: '/tweets',
      dataType: 'text',
      method: "POST",
      data: $('textarea').serialize()
    }).then((result) => {
      loadLatestTweets();
      $('textarea').val('');
      $('.counter').val(140);
      $('.error-empty').hide('slide');
      $('.error-exceed').hide('slide');
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
  };

  // Uses Ajax to fetch and load the last entry
  const loadLatestTweets = function() {
    const latestResult = [];

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
  };

  loadTweets();

});