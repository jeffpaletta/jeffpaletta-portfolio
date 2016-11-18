$(document).ready(function(){
	$(".setImpact").click(function() {
	    $(".font-preview").toggleClass("caption");
	    $("#impactSelected").toggleClass("font-hidden");
	    $("#arialSelected").toggleClass("font-hidden");
	});
	
	$(".setArial").click(function() {
	    $(".font-preview").removeClass("caption");
	    $("#impactSelected").toggleClass("font-hidden");
	    $("#arialSelected").toggleClass("font-hidden");
	});
});
