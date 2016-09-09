/*
 * This file is made to be edited
 * It will be available for formulaire and petition layouts
 */

 $(document).ready(function() {
  //DESIGN
  var   slide_count;

  slide_count = count_slides();
  $('.field-row > .columns').removeClass("large-12 medium-12 small-12 large-centered");
  $('.field-row > .columns').addClass("small-12 medium-offset-1 medium-10 large-offset-3 large-6 columns");
  $('.field-row > .columns > .text-scoring').parent().addClass("text-center");
  apply_margin();
  apply_last_slide();
  if(document.title == "On se dit tout" || document.title == "Ce qui vous tient au coeur")
  {
    var   temp;

    if(document.title == "On se dit tout")
      temp = '<p class="text_small" style="text-align: center">(1 pas du tout confiance, 10 entièrement confiance)</p>';
    else
      temp = '<p class="text_small" style="text-align: center">(1 pas du tout qualitatifs, 10 très qualitatifs)</p>';
    $(temp).insertAfter($("#slide-4 > .field-row > .columns > .text-scoring"));
  }
  if(document.title == "Vos attentes")
    place_question(3);
  apply_textarea();
  apply_text_option();
  set_insecable();
  vertical_center();

  function replaceAt(word, index, character) {
    return word.substr(0, index) + character + word.substr(index+character.length);
  }

  function  set_insecable()
  {
    var     a;
    var     word;

    $(".text_scoring, .texte-choix_multiple, .texte-choix_unique").each(function()
    {
      word = $(this).html();
      if (word != null)
      {
        word = word.toString();
        a = word.length - 1;
        while (a > word.length - 5)
        {
          if (word.charAt(a) == ' ')
            word = replaceAt(word, a, '\xa0');
          a--;
        }
        $(this).html(word);

      }
    });
  }

window.addEventListener("resize", vertical_center, true);

  function  vertical_center()
  {
    var     total;
    var     space;

    console.log("resizing");
    total = $("#first_text").height();
    total += $("#second_text").height();
    space = ($("#accueil").height() - ($("#first_text").offset().top + $("#second_text").offset().top)) / 2;
    if (document.title == "On se dit tout")
      {
        total += $("#third_text").height();
        space = ($("#accueil").height() - ($("#first_text").offset().top + $("#third_text").offset().top)) / 2;
      }
    console.log(space);
    $("#first_text").css({"padding-top" : space + "px"});
  }

  function  count_slides()
  {
    var     count;

    count = 0;
    while ($("#slide-" + count).length != 0)
      count++;
    return (count);
  }

  function    apply_text_option()
  {
    var       count;
    var       a;
    var       temp;

    count = 0;
    while (count < slide_count)
    {
      if ($("#slide-" + count + " > .field-row > .columns > .texte-choix_multiple").length != 0 && $(".input-container-choix_unique").is("#slide-" + count) == false)
      {
        temp = '<p class="text_small" style="text-align: center">(plusieurs réponses possibles)</p>'
        $(temp).insertAfter($("#slide-" + count + " > .field-row > .columns > .texte-choix_multiple"));
      }
      count++;
    }
  }

  function    apply_textarea()
  {
    var       count;
    var       slide;

    count = 0;
    while (count < slide_count && $(".input-container-champ_libre_long").is("#slide-" + count) == false)
      count++;
    slide = count - 1;
    $("#slide-" + count + " > .field-row > .columns").removeClass("small-12 medium-10 large-6 medium-offset-1 large-offset-3");
    $("#slide-" + count + " > .field-row > .columns").addClass("small-12 medium-offset-1 medium-10 end ");
    $("#slide-" + count + " > .field-row > .columns").css({"margin-top" : "4em"});
    $("#slide-" + count + " > .field-row > .columns > .input-champ_libre-long").css({"height" : "14em", "font-size" : "1.5em"});
    $("#slide-" + slide + " > .field-row > .columns").append($("#slide-" + count + " > .field-row > .columns"));
    $("#slide-" + count).remove();
  }

  function    apply_margin()
  {
    var       count;

    count = 0;
    while (count < slide_count)
    {
      $("#slide-" + count).css({"padding-bottom":"5em"});
      $("#slide-" + count + " > .field-row > .columns > .label-choix_unique").first().addClass("texte-choix_unique");
      $("#slide-" + count + " > .field-row > .columns > .label-choix_multiple").first().addClass("texte-choix_multiple");
      $("#slide-" + count + " > .field-row > .columns > .label-choix_unique").first().removeClass("label-choix_unique");
      $("#slide-" + count + " > .field-row > .columns > .label-choix_multiple").first().removeClass("label-choix_multiple");
      count++;
    }
  }

  function    apply_last_slide()
  {
    var     count;
    var     set_count;
    var     selector;
    var     place;
    var     set =
    ["small-12",
    "small-12",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-6",
    "small-12 medium-6"];

    set_count = 1;
    count = slide_count - 7;
    place = slide_count - 8;
    /*VOUS ETES*/
    $("#slide-" + count - 1 + " > .field-row > .columns").removeClass("small-12 medium-10 large-6 medium-offset-1 large-offset-3");
    $("#slide-" + count - 1 + " > .field-row > .columns").addClass(set[0]);
    /*REMOVE UNWANTED CLASSES AND REPLACE THE FORMATTING CLASSES*/
    while (count < slide_count)
    {
      $("#slide-" + count + " > .field-row > .columns").removeClass("small-12 medium-10 large-6 medium-offset-1 large-offset-3");
      $("#slide-" + count + " > .field-row > .columns").addClass(set[set_count]);
      $("#slide-" + place + " > .field-row > .columns").append($("#slide-" + count + " > .field-row > .columns"));
      $("#slide-" + count).remove();
      set_count++;
      count++;
    }
    /*SUBMIT BUTTON*/
    $('input[type="submit"]').parent().removeClass(" medium-offset-1 medium-10 large-offset-3 large-6");
    $('input[type="submit"]').parent().addClass("text-center");
    $('input[type="submit"]').addClass("text_main");
    $("#slide-" + place + " > .field-row > .columns").append($('input[type="submit"]').parent());

    /*VOUS ETES*/
    selector = $("#slide-" + place  + " > .field-row > .columns > .texte-choix_unique");
    $(selector).removeClass(".texte-choix_unique text-center");
    $(selector).addClass("small-12 columns label-choix_multiple text-left");
    $(selector).css({"margin-bottom" : "0px", "padding-top" : "0em", "margin-top" : "0px", "line-height" : "1em", "text-align" : "left"});
    $('input[type="email"]').parent().append(selector);

    /*EMAIL*/
    selector = $(".container-panneau_informations_personnelles > .input-container > .field-row > .columns > input[type='email']").parent().parent().parent();
    $(".container-panneau_informations_personnelles > .input-container > .field-row > .columns > input[type='email']").parent().removeClass("small-12 medium-10 large-6 medium-offset-1 large-offset-3");
    $(".container-panneau_informations_personnelles > .input-container > .field-row > .columns > input[type='email']").parent().addClass("small-12")
    $("#slide-" + place + " > .field-row > .columns").prepend($(".container-panneau_informations_personnelles > .input-container > .field-row > .columns"));
    $(selector).remove();
    $("#slide-" + place + " > .field-row > .columns").prepend('<p class="texte-choix_multiple text-center" style="margin-bottom: 2rem">MERCI DE RENSEIGNER LES INFORMATIONS SUIVANTES POUR ENREGISTRER VOS RÉPONSES</p>');

    /*REST*/
    $("#slide-" + place + " > .field-row > .columns > .reponse-container-choix_multiple").addClass("small-6 columns");
    $("#slide-" + place + " > .field-row > .columns > .reponse-container-choix_multiple").css({"margin-bottom" : "0px", "padding-top" : "0em", "margin-top" : "0px", "line-height" : "1em"});
    $("#slide-" + place + " > .field-row > .columns > .champ_libre_court > .label-champ_libre").addClass("small-12 columns");
    $("#slide-" + place + " > .field-row > .columns > .champ_libre_court > .input-champ_libre").addClass("small-12 columns");
    $("#slide-" + place + " > .field-row > .columns").css({"padding-bottom" : "4em"});
    $("#slide-" + place + " > .field-row > .columns > .columns > .reponse-container-choix_multiple > .label-choix_multiple").css({"font-size" : "1.1em"});
    $("#slide-" + place).css({"padding-bottom":"0em"});

    slide_count = count_slides();
  }

  //DELAY SHOW
  $('#first_text').hide().fadeIn(700);
  $('#second_text').delay(700).hide().fadeIn(700);
  $('#third_text').delay(1200).hide().fadeIn(700);
  $('#fourth_text').delay(1700).hide().fadeIn(700);

  //SCROLLING
  var   next_scroll;

  next_scroll = "#slide-0";

  function    on_last()
  {
    var   divPosition;
    var   scrollPosition;
    var   last;

    scrollPosition = window.scrollY;
    last = slide_count - 1;
    divPosition = $('#slide-' + last).offset().top;
    divPosition -= $('#slide-' + last).height() / 2;
    if (scrollPosition > divPosition)
      return (true);
    return (false);
  }

  $(window).on('scroll', function()
  {
    var   divPosition;
    var   scrollPosition;
    var   next_question;

    if ($('#slide-0').length != 0)
    {
      next_question = document.getElementById("next_container");
      scrollPosition = window.scrollY;
      divPosition = $('#slide-0').offset().top;
      divPosition -= $('#slide-0').height() / 2;
      next_question.href = refresh_next();
      if(divPosition < scrollPosition && on_last() == false){
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

  function  place_question(slide)
  {
    var     remove;
    var     new_id;

    remove = slide + 1;
    $("#slide-" + slide + " > .field-row > .columns").append($('#slide-' + remove + " > .field-row > .columns > "));
    $("#slide-" + remove).css({"display":"none"});
  }

  function  refresh_next()
  {
    var   count;
    var   check;
    var   current;
    var   scrollPosition;
    var   divPosition;

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
  $(".label-choix_unique, .label-choix_multiple, .label-other, .label-scoring").prepend("<span></span>");
});
