$(document).foundation()
// Function used in :
// - assets/js/woopra.js
// - assets/js/form.js
function extractUrlParams() {
  var match,
  urlParams,
  pl     = /\+/g,  // Regex for replacing addition symbol with a space
  search = /([^&=]+)=?([^&]*)/g,
  decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
  query  = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
}

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
    console.log("w")
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
  console.log(current);
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
