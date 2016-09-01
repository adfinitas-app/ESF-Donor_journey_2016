$(document).ready(function() {
  //DESIGN
  var   slide_count;

  slide_count = count_slides();

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

  apply_last_slide();
  function    apply_last_slide()
  {
    var     count;
    var     set_count;
    var     selector;
    var     html_code;
    var     set =
    ["small-offset-1 small-10 large-offset-3 large-6",
    "small-12",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-12",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-6"];

    set_count = 1;
    count = slide_count - 8;
    $("#slide-" + count - 1 + " > .field-row > .columns").removeClass("small-12 medium-10 large-6 medium-offset-1 large-offset-3");
    $("#slide-" + count - 1 + " > .field-row > .columns").addClass(set[0]);
    while (count < slide_count)
    {
      console.log("#slide-" + count);
      $("#slide-" + count + " > .field-row > .columns").removeClass("small-12 medium-10 large-6 medium-offset-1 large-offset-3");
      $("#slide-" + count + " > .field-row > .columns").addClass(set[set_count]);
      $("#slide-4 > .field-row > .columns").append($("#slide-" + count + " > .field-row > .columns"));
      $("#slide-" + count).remove();
      set_count++;
      count++;
    }
    html_code = '<p class="texte-choix_multiple text-center" style="margin-bottom: 2rem">MERCI DE RENSEIGNER LES INFORMATIONS SUIVANTES POUR ENREGISTRER VOS RÉPONSES</p>';
    selector = $("#slide-" + 4  + " > .field-row > .columns > .texte-choix_unique")
    $(selector).removeClass(".texte-choix_unique");
    $(selector).addClass("small-12 medium-4 columns label-choix_multiple");
    $(selector).css({"margin-bottom" : "0px", "padding-top" : "0.8em", "margin-top" : "0px", "line-height" : "1em"});
    $("#slide-" + 4 + " > .field-row > .columns").prepend(html_code);
    $("#slide-" + 4 + " > .field-row > .columns > .reponse-container-choix_multiple").addClass("small-6 medium-4 columns");
    $("#slide-" + 4 + " > .field-row > .columns > .reponse-container-choix_multiple").css({"margin-bottom" : "0px", "padding-top" : "0.4em", "margin-top" : "0px", "line-height" : "1em"});
    $("#slide-" + 4 + " > .field-row > .columns > .champ_libre_court > .label-champ_libre").addClass("small-12 medium-6 columns");
    $("#slide-" + 4 + " > .field-row > .columns > .champ_libre_court > .input-champ_libre").addClass("small-12 medium-6 columns");
  }

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
