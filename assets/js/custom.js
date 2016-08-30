$(document).ready(function() {
  //DESIGN
  var   slide_count;

  slide_count = count_slides();
  apply_layout();

  $('.field-row > .columns').removeClass("large-12 large-6 large-centered");
  $('.field-row > .columns').addClass("small-12 medium-offset-1 medium-10 large-offset-3 large-6 columns");


  function  count_slides()
  {
    var     count;

    count = 0;
    while ($("#slide-" + count).length != 0)
      count++;
    console.log(count);
    return (count);
  }

  function  apply_layout()
  {
    var   count;

    count = slide_count - 9;
    while (count < slide_count)
    {
      $("#slide-" + count).css({"min-height" : "0vh", "height" : "auto", "font-size" : "1em"});
      count++;
    }
  }

  resize_last_slide();
  function  resize_last_slide()
  {
    var     count;
    var     height;

    count = slide_count - 9;
    height = 0;
    while (count < slide_count - 1)
    {
      height += $("#slide-" + count).height();
      count++;
    }
    height = 100 - ((100 / $(window).height()) * height);
    $("#slide-" + (count)).css({"min-height" : height + "vh", "padding-bottom" : "50px"});
  }

  $("#slide-6 > .columns").addClass("large-offset-0 large-3");
  document.addEventListener("resize", resize_last_slide());

  //DELAY SHOW
  $('#first_text').hide().fadeIn(700);
  $('#second_text').delay(700).hide().fadeIn(700);
  $('#third_text').delay(1200).hide().fadeIn(700);
  $('#fourth_text').delay(1700).hide().fadeIn(700);

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

    if ($('#slide-0').length != 0)
    {
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
