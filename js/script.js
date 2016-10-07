$(document).ready(function() {
	var modifier = 20;
	var prevLink = 'link-1';
	var prevX = $('.link-1').offset().left - $(window).scrollLeft() + modifier;
	var prevY = $('.link-1').offset().top - $(window).scrollTop() + modifier;
	var timeout, shuffle;
	var layout = 1;
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var clicked = false;
	var position = [
		[0, 0],
		[0, 0],
		[0, 90],
		[0, 60],
		[20, 100],
		[90, 0],
		[60, 0],
		[100, 10],
		[50, 0],
		[30, 0],
		[0, 20],
		[0, 5],
		[50, 100],
		[80, 0],
		[50, 100],
		[0, 30],
		[0, 50],
		[30, 90],
		[10, 100]
	];
	characters = [
		'&#9786;', 
		'&#9785;', 
		'&#9788;', 
		'&#9730;', 
		'&#9756;', 
		'&#9992;', 
		'&#9988;', 
		'&#9996;', 
		'&#9998;', 
		'&#9680;', 
		'&#9096;', 
		'&#9999;', 
		'&#9814;', 
		'&#9816;', 
		'&#9775;', 
		'&#9638;', 
		'&#9682;', 
		'&#9786;'
	];
	var navOpen = false;
	var totalProjects = $('nav li').length - 1;
	// var totalProjects = 20;
	var loadShuffle = [];
	var projectOpen = false;
	var scrollTopAmount = 0;
	var scrollLeftAmount = 0;
	if ($('body').hasClass('colour-1')) {
		colour = '#f00';
	} else if ($('body').hasClass('colour-2')) {
		colour = '#33f';
	} else if ($('body').hasClass('colour-3')) {
		colour = '#31D321';
	}
	// Hover state on project page
	$('body').on('mouseenter', 'nav li.active', function() {
		if (navOpen === false && clicked === false) {
			// prevX = $('.active').offset().left - $(window).scrollLeft() + modifier;;
			// prevY = $('.active').offset().top - $(window).scrollTop() + modifier;
			showNav();
		}
	});
	// Hovering and clicking nav
	$('nav a').mouseenter(function(e) {
		var that = $(this);
		if (clicked === false) {
			if (navOpen === true) {
				var newX = that.offset().left - $(window).scrollLeft() + modifier;
				var newY = that.offset().top - $(window).scrollTop() + modifier;
				// Make sure it only happens once
				if (!that.hasClass('prev-' + prevLink)) {
					$('.' + prevLink).find('a').addClass('prev-' + that.data('link'));
					that.addClass('prev-' + prevLink);
					var color = that.parents('li').hasClass('history') ? '#ccc' : '#3233ff';
					$('.lines').line(prevX, prevY, newX, newY, {
						css: {
							height: '0',
							zIndex: '1',
							position: 'fixed',
							color: color
						},
						width: 0,
						style: 'solid',
						color: 'transparent'
					});
				}
				prevLink = that.data('link');
				prevY = newY;
				prevX = newX;
			}
			var i = 0;
			$('.symbol', that).html(characters[i++]);
			shuffle = setInterval(function() {
				if (i === characters.length) {
					i = 0;
				}
				var character = characters[i++];
				$('.symbol', that).html(character);
			}, 100);
		}
	}).mouseleave(function() {
		if (clicked === false) {
			clearInterval(shuffle);
			$('.symbol', $(this)).html($(this).data('symbol'));
		}
	}).click(function(e) {
		var that = $(this);
		if (clicked === false) {
			if (that.parents('li').hasClass('active') && navOpen === true) {
				// Clicking active item from navigation
				clicked = true;
				clearInterval(shuffle);
				$('.symbol', that).html($(this).data('symbol'));
				hideNav();
			} else if (that.parents('li').hasClass('active') && navOpen === false) {
				// Clicking active item from project
				showNav();
			} else {
				var index = that.parents('li').index();
				prevX = position[index][0] === 0 ? -modifier : (winWidth / 100) * position[index][0] + modifier;
				prevY = position[index][1] === 0 ? -modifier : (winHeight / 100) * position[index][1] + modifier;
				newX = that.offset().left - $(window).scrollLeft() + modifier;
				newY = that.offset().top - $(window).scrollTop() + modifier;
				var link = that.attr('href');
				var title = that.next('.title').text();
				clicked = true;
				$('.active').addClass('history-temp');
				$('nav li').removeClass('active');
				that.parents('li').addClass('active').removeClass('history');
				clearInterval(shuffle);
				$('.symbol', that).html($(this).data('symbol'));
				$('.line').addClass('remove').css({
					width: 0
				});
				setTimeout(function() {
					$('.remove').remove();
					// Remove all prev-link joins
					$('nav a').removeClass();
				}, 250);
				var count = 0;
				$('nav li:not(.active, .link-1) a').each(function() {
					var i = count++;
					var that = $(this);
					$('.symbol', that).html(characters[i++]);
					loadShuffle[i] = setInterval(function() {
						if (i === characters.length) {
							i = 0;
						}
						var character = characters[i++];
						$('.symbol', that).html(character);
					}, 100);
				});
				loadLink(link, title);
			}
		}
		e.preventDefault();
	});
	// First hover area larger
	$('.hover-area').mouseenter(function() {
		showNav();
		$(this).remove();
	});
	// Cover click to hide menu again
	$('.cover').click(function() {
		if (navOpen === true && projectOpen === true && clicked === false) {
			clicked = true;
			hideNav();
		}
	});

	function loadLink(link, title) {
		$('body').addClass('loading');
		// Remove existing
		$('.block').addClass('hidden');
		$('.process').load(link + ' section', function() {
			setTimeout(function() {
				projectOpen = true;
				hideNav();
				prevX = $('.active').hasClass('link-1') ? winWidth / 2 : prevX;
				prevY = $('.active').hasClass('link-1') ? winHeight : prevY;
				$('.lines').line(prevX, prevY, newX, newY, {
					css: {
						height: '0',
						zIndex: '1',
						position: 'fixed',
						color: colour
					},
					width: 0,
					style: 'solid',
					color: 'transparent'
				});
				$('section:not(.process section)').empty();
				$('body,html').scrollTop(0);
				$('.process .block').addClass('hidden');
				$('section:not(.process section)').append($('.process section').html());
				$('.process').empty();
				var pause = 0;
				$('.block').each(function() {
					var that = $(this);
					setTimeout(function() {
						that.removeClass('hidden');
					}, pause += 150);
				});
				if (window.history && window.history.replaceState) {
					history.replaceState({
						path: link
					}, null, link);
					if (title === 'Jeff Paletta') {
						title = 'About';
					}
					document.title = 'Jeff Paletta \u2014 ' + title;
				}
			}, 1000);
		});
	}

	function showNav() {
		$('.cover').show();
		// scrollTopAmount = $(document).scrollTop();
		// scrollLeftAmount = $(document).scrollLeft();
		// $('.section-inner').css({marginTop:-scrollTopAmount, marginLeft:-scrollLeftAmount});
		// $('section').addClass('fixed');
		$('body').addClass('nav-open');
		$('nav li').each(function() {
			var that = $(this);
			setTimeout(function() {
				that.removeClass('fade-out');
			}, rdm(1, 500));
		});
		if (!$('.hover-area').length) {
			prevX = $('.active a').offset().left - $(window).scrollLeft() + modifier;
			prevY = $('.active a').offset().top - $(window).scrollTop() + modifier;
		}
		navOpen = true;
	}

	function hideNav() {
		$('.line:not(:first)').addClass('remove').css({
			width: 0
		});
		$('body').removeClass('loading nav-open');
		// $('section').removeClass('fixed');
		// $('.section-inner').css({marginTop:0});
		// $('body,html').scrollTop(scrollTopAmount).scrollLeft(scrollLeftAmount);
		setTimeout(function() {
			$('.remove').remove();
			// Remove all prev-link joins
			$('nav a').removeClass();
		}, 250);
		$('nav li:not(.active)').each(function() {
			var that = $(this);
			setTimeout(function() {
				that.addClass('fade-out');
			}, rdm(1, 500));
		});
		setTimeout(function() {
			$('.cover').hide();
			navOpen = false;
			$('nav a').each(function(i) {
				$('.symbol', $(this)).html($(this).data('symbol'));
				clearInterval(loadShuffle[i]);
			});
			$('.history-temp').addClass('history').removeClass('history-temp');
			clicked = false;
		}, 500);
	}
	// Startup

	function startup() {
		if ($('body').data('page') === 'home') {
			$('.cover').show();
			$('.lines').line(0, rdm(0, winHeight), $('.link-1').offset().left - $(window).scrollLeft() + modifier, $('.link-1').offset().top - $(window).scrollTop() + modifier, {
				css: {
					height: '0',
					zIndex: '1',
					position: 'fixed',
					color: colour
				},
				width: 0,
				style: 'solid',
				color: 'transparent'
			});
			$('.line').addClass('first');
		} else if ($('body').data('page') === 'about') {
			projectOpen = true;
			$('.lines').line(winWidth / 2, winHeight + modifier, $('.link-1').offset().left - $(window).scrollLeft() + modifier, $('.link-1').offset().top - $(window).scrollTop() + modifier, {
				css: {
					height: '0',
					zIndex: '1',
					position: 'fixed',
					color: colour
				},
				width: 0,
				style: 'solid',
				color: 'transparent'
			});
		} else {
			projectOpen = true;
			var index = $('.active').index();
			prevLink = $('.active a').data('link');
			prevX = position[index][0] === 0 ? -modifier : (winWidth / 100) * position[index][0] + modifier;
			prevY = position[index][1] === 0 ? -modifier : (winHeight / 100) * position[index][1] + modifier;
			newX = $('.active').offset().left - $(window).scrollLeft() + modifier;
			newY = $('.active').offset().top - $(window).scrollTop() + modifier;
			$('.lines').line(prevX, prevY, newX, newY, {
				css: {
					height: '0',
					zIndex: '1',
					position: 'fixed',
					color: colour
				},
				width: 0,
				style: 'solid',
				color: 'transparent'
			});
			prevX = newX;
			prevY = newY;
		}
	}
	startup();
	$('body').on('click', '.play', function(e) {
		var block = $(this).parents('.video');
		var vimeo = $(this).data('vimeo');
		$('img, .play', block).css({
			zIndex: '-1'
		}).animate({
			opacity: 0
		}, 200);
		block.append('<iframe src="https://player.vimeo.com/video/' + vimeo + '?autoplay=1&title=0&byline=0&portrait=0" width="' + block.width() + '" height="' + block.height() + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		e.preventDefault();
	});
	// Gallery
	$('body').on('click', '.image', function(e) {
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
	$('body').on('click', '.slide img', function(e) {
		$('.gallery').removeClass('visible');
		clicked = false;
	});
	$(document).keydown(function(e) {
		// Escape
		if (e.keyCode === 27) {
			if (projectOpen === true) {
				if ($('.gallery').hasClass('visible')) {
					$('.gallery').removeClass('visible');
					clicked = false;
				} else {
					if (navOpen === true) {
						$('.cover').trigger('click');
					} else {
						showNav();
					}
				}
			}
		}
	});
	$(window).resize(function() {
		winHeight = $(window).height();
		winWidth = $(window).width();
		$('.image').removeAttr('style');
		if (winWidth > 800) {
			$('.line').css({
				width: 0
			});
			setTimeout(function() {
				$('.line').remove();
			}, 200);
		}
	});

	function rdm(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	$('.ok').click(function(e) {
		$('.browser').remove();
		e.preventDefault();
	});
});