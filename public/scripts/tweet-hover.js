// Hovcer logic

$(document).ready(function() {
  
  // adds and replaces classes for hovering effect
  $(this).find('.tweet-article').on('mouseover', function() {

    $('.tweet-article').addClass('hoverArticle');
    $('.hoverArticle').removeClass('tweet-article');

  });
    
  $(this).find('.tweet-article').on('mouseleave', function() {

    $('.hoverArticle').addClass('tweet-article');
    $('.tweet-article').removeClass('hoverArticle');
  
  });

});
