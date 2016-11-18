/* Photography by Hilary Spencer Creative Photography */
/* ************************************************** */

/* https://www.facebook.com/pages/Hilary-Spencer-Creative-Photography/107123415116 */

// Hovering an image gives a smooth enlarge effect
// Clicking an image will enlarge it even more, and add an overlay
// Clicking the overlay will exit the overlay
// You can also hit "esc" to exit the full view

// Added an on click event to make it more like a production environment, though the primary function is the hover effect
// When the page has loaded
$(function() {
  // View the selected photo at full size
  $(".photo-image").click(function(){
    $(this).addClass("photo-selected");
    $(this).parent().addClass("photo-x");
    $("#gallery-overlay").show();
  });
  
  // Close the full size view when #overlay is clicked
  $("#gallery-overlay").click(function(){
    $(".photo-image").removeClass("photo-selected");
    $(".photo-x").removeClass("photo-x");
    $("#gallery-overlay").hide();
  });
});

// Close full size view if "esc"
$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    $(".photo-image").removeClass("photo-selected");
    $("#gallery-overlay").hide();
  }
});





// Gallery
$('body').on('click', '.gallery-image', function(e){
	var that = $(this);
	clicked = true;
	$('.slide').html('<img src="' + that.data('large') + '" width="' + that.data('largewidth') + '" height="' + that.data('largeheight') + '">');
	$('.gallery').addClass('visible');
	// that.css({
	// 	width:that.width(),
	// 	height:that.height()
	// });
	// scrollTopAmount = $(document).scrollTop();
	// scrollLeftAmount = $(document).scrollLeft();
	// $('.gallery').html('<div class="slide" style="top:' + (that.offset().top - scrollTopAmount) + 'px; left:' + (that.offset().left - scrollLeftAmount) + 'px; width:' + $('img', that).width() + 'px; height:' + $('img', that).height() + 'px""><img src="' + $('img', that).attr('src') + '" width="' + $('img', that).attr('width') + '" height="' + $('img', that).attr('height') + '"/></div>').addClass('visible');
	// that.css({opacity:0});
	// $('.slide').animate({
	// 	width:$('img', that).attr('width'),
	// 	height:$('img', that).attr('height'),
	// 	left:0,
	// 	top:0
	// }, 300);
	// $('.section-inner').css({marginTop:-scrollTopAmount, marginLeft:-scrollLeftAmount});
	// $('section').addClass('fixed');
	e.preventDefault();
});

$('body').on('click', '.slide img', function(e){
	$('.gallery').removeClass('visible');
	clicked = false;
});

$(document).keydown(function(e) {
	// Escape
	if(e.keyCode === 27){
		if(projectOpen === true){
			if($('.gallery').hasClass('visible')){
				$('.gallery').removeClass('visible');
				clicked = false;
			} else {
				if(navOpen === true){
					$('.cover').trigger('click');
				} else {
					showNav();
				}
			}
		}
	}
});

$(window).resize(function(){
	winHeight = $(window).height();
	winWidth = $(window).width();
	$('.gallery-image').removeAttr('style');
	if(winWidth > 800){
		$('.line').css({width:0});
		setTimeout(function(){
			$('.line').remove();
		}, 200);
	}
});

