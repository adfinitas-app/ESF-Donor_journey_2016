$(document).ready(function() {
  //DESIGN
  $('.field-row > .columns').removeClass("large-12 large-6");
  $('.field-row > .columns').addClass("small-12 medium-offset-1 medium-10 large-offset-3 large-7 columns");
  
  //SCROLLING 
  var 	next_scroll;
  var 	q_number;
  
  next_scroll = "#slide-0";
  current_q = 0;
  q_number = 4;
  $(window).on('scroll', function()
  {
    var 	divPosition;
    var 	scrollPosition;
    var 	next_question

    next_question = document.getElementById("next_container");
    scrollPosition = window.scrollY;
    divPosition = $('#slide-0').offset().top;
    divPosition -= $('#slide-0').height() / 2;
    next_question.href = refresh_next();
    if(divPosition < scrollPosition){
      $('#next_container').css({"animation" : "slide_in 0.4s ease-out", "animation-direction": "normal"});
      $('#next_container').on('animationend webkitAnimationEnd oAnimationEnd oanimationend MSAnimationEnd', function() {
        $('#next_container').css({"bottom" : "0px"});
      });
    }
    else
    {
      $('#next_container').css({"animation" : "slide_out 0.4s ease-out", "animation-direction": "normal"});
      $('#next_container').on('animationend webkitAnimationEnd oAnimationEnd oanimationend MSAnimationEnd', function() {
        $('#next_container').css({"bottom" : "-100px"});
      });
    }
  });
  
  function 	refresh_next()
  {
    var 	count;
    var 	check;
    var 	current;
    var 	scrollPosition;
    var 	divPosition;

    check = true;
    count = 0;
    current = "#slide-0";
    while (check == true && $(current).length != 0)
    {
      scrollPosition = window.scrollY;
      divPosition = $(current).offset().top;
      if (divPosition > scrollPosition)
        check = false;
      else
      {
        count++;
        current = "#slide-" + count;
      }
    }
    current_q = count - 1;
    next_scroll = current;
    return current;
  }
  
  $('a').click(function(){
    if ($($(this).attr('href')).length != 0)
    {
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
      }, 500, 'swing');
      return false;
    }
  });
  $(".label-choix_unique, .label-choix_multiple, .label-other").prepend("<span></span>");
});
