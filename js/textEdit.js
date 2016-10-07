(function($){
	var fontTxt = $("#fontTxt"); // font
	var fontTxtField = $("#fontTxtField");
	var fontsSelectBox = $("#fontsSelectBox");
	var fontSizeSelectBox  = $("#fontSizeSelectBox");
  
	$(fontSizeSelectBox).selectmenu({
		change : function (event, data) {
		 fontTxtField.removeClass("font-size-16").removeClass("font-size-20")
			.removeClass("font-size-40").removeClass("font-size-72")
			.removeClass("font-size-92")
			.addClass(data.item.value);	
		}  
	});

	$(fontsSelectBox).selectmenu({
		change : function(event, data) {
			fontTxtField.removeClass("clearanceCaption").removeClass("clearanceDisplay")
			.addClass(data.item.value);
		},
		icons: { button: "ui-icon-circle-triangle-s" }
	});
  
	$("#uppercase, #lowercase, #capitalize, #normal").change(function () {
		var value = this.value;
		switch(value) {
			case "uppercase":
				fontTxtField.addClass("uppercase-text").removeClass("lowercase-text").removeClass("capitalize-text");
			break;
			case "lowercase":
				fontTxtField.addClass("lowercase-text").removeClass("uppercase-text").removeClass("capitalize-text");
			break;
			case "capitalize":
				fontTxtField.addClass("capitalize-text").removeClass("uppercase-text").removeClass("lowercase-text");
			break;			
			case "normal":
			default:
				fontTxtField.removeClass("uppercase-text").removeClass("lowercase-text").removeClass("capitalize-text");;
			break;
		};
	});
  
})(jQuery);