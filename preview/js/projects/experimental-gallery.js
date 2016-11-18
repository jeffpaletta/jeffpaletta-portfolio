var numImgs = $('.experimental-photo-image').length;
var prevImages = $('.experimental-photo-image').prevAll().length;
var imageClicked;

$('.experimental-photo-image').click(function(){
    var prevImages = $(this.parentNode).prevAll().find('.experimental-photo-image').length;
    if(prevImages > 0){
        $('.prev').show();
    }else{
        $('.prev').hide();
    }
    if(prevImages == (numImgs - 1)){
        $('.next').hide();
    }else{
        $('.next').show();
    }
});


$(document).keydown(function(e) {

	// Arrow Keys
	if(projectOpen === true) {
		if (e.keyCode == 37) {
			e.preventDefault();
			imageClicked.closest('.experimental-gallery-image').prev().find('img').trigger('click');
		}
		else if (e.keycode == 39) {
			e.preventDefault();
			imageClicked.closest('.experimental-gallery-image').next().find('img').trigger('click');
		}
	}
});