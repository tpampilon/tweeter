// Hovcer logic

$(document).ready(function() {
  
  $(this).find('.tweet-article').on('mouseover', function() {


    $('.tweet-article').addClass('hoverArticle');
    $('.hoverArticle').removeClass('tweet-article');
    
    // if ($(this).find('.tweet-article').mouseover()) {
    //   $('.tweet-article').addClass('hoverArticle');
    //   $('.hoverArticle').removeClass('tweet-article');
    // }
   
    // $('.hoverArticle').removeClass('redCounter');
    // $('.redCounter').addClass('counter');
  

  });
    
  $(this).find('.tweet-article').on('mouseleave', function() {

    $('.hoverArticle').addClass('tweet-article');
    $('.tweet-article').removeClass('hoverArticle');
  
  });



});
