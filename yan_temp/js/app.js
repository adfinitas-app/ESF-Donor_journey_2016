$(document).ready()
{
	$(document).foundation();

	var 	next_scroll;
	var 	q_number;

	next_scroll = "#slide_1";
	current_q = 0;
	q_number = 2;
	$(window).on('scroll', function()
	{
		var 	divPosition;
		var 	scrollPosition;
		var 	next_question

		next_question = document.getElementById("next_container");
		scrollPosition = window.scrollY;
		divPosition = $('#slide_1').offset().top;
		divPosition -= $('#slide_1').height() / 2;
		next_question.href = refresh_next();
		if(divPosition < scrollPosition && current_q <= q_number){
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
		count = 1;
		current = "#slide_1";
		while (check == true && $(current).length != 0)
		{
			scrollPosition = window.scrollY;
			divPosition = $(current).offset().top;
			if (divPosition > scrollPosition)
				check = false;
			else
			{
				count++;
				current = "#slide_" + count;
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
};
