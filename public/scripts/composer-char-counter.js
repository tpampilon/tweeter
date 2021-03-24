// Counter for the tweet form

$(document).ready(function() {
  
  $(this).on('input', function() {
    let input = $(this).find('textarea').val().length;
    const maxCount = $(this).find('#maxCount').val();
    
    let total = maxCount - input;

    $(this).find('output').html(total);
    
  });

  // checks if counter is < 0 then changes it to red
  $(this).on('keyup keypress', function() {

    const currentCount = $(this).find('output').val();

    console.log('triggers change')

    if (currentCount < 0) {
      $('.counter').addClass('redCounter');
      $('.redCounter').removeClass('counter');
    }
    if (currentCount >= 0) {
      $('.counter').removeClass('redCounter');
      $('.redCounter').addClass('counter');
    }

  });



});

