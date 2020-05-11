(function($) {
    'use strict';

    var coraTheme = {

        // Main init function
        init : function() {
            this.config();
            this.events();
        },

        // Define vars for caching
        config : function() {
            this.config = {
                $window : $( window ),
                $document : $( document ),
            };
        },

        // Events
        events : function() {
            var self = this;

            // Run on document ready
            self.config.$document.on( 'ready', function() {

                // Fix Nav
                self.fixNav();

                // One Page
                self.onePage();

                // Header Fixed
                self.headerFixed();

                // Mobile Menu
                self.mobileMenu();

                // Scroll to Top
                self.scrollToTop();

                // Set min content height
                self.minContentHeight();

            });

            // Run on Window Load
            self.config.$window.on( 'load', function() {

            });
        },
        
        // Fix nav
        fixNav: function() {
            var
            nav = $('#main-nav'),
            wNav = $('.widget_nav_menu'),
            docW = $(window).width(),
            c = $('#site-header-inner'),
            cl = c.offset().left,
            cw = c.width();

            if ( nav )
                nav.find('.sub-menu').each(function() {
                var
                off = $(this).offset(),
                l = off.left,
                w = $(this).width(),
                il = l - cl,
                over = ( il + w >= cw );

                if ( over )
                    $(this).addClass('left');

                })

            if ( wNav.size() != 0 )
                wNav.find('a:empty')
                    .closest('li').remove();
        },

        // One Page
        onePage: function() {
            $('#menu-one-page li').filter(':first').addClass('current-menu-item');

	        $('#menu-one-page li a').on('click',function() {
	            var anchor = $(this).attr('href').split('#')[1];

	            if ( anchor ) {
	                if ( $('#'+anchor).length > 0 ) {
	                    var headerHeight = 0;

	                    if ( $('body').hasClass('header-fixed') )
	                        headerHeight = $('#site-header').height();

	                    var target = $('#' + anchor).offset().top - headerHeight;

	                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
	               }
	            }
	            return false;
	        });

            $(window).on("scroll", function() {
                var scrollPos = $(window).scrollTop();

                $('#menu-one-page li a').each(function () {
                    var link = $(this);
                    var block = $( link.attr("href") );
                    if ( block.offset().top <= scrollPos 
                        && block.offset().top + block.height() > scrollPos ) {
                        $('#menu-one-page li').removeClass("current-menu-item");
                        link.parent().addClass("current-menu-item");
                    } else {
                        link.parent().removeClass("current-menu-item");
                    }
                });
            });
        },

        // Header Fixed
        headerFixed: function() {
            var nav = $('#site-header');

            if ( nav.length ) {
                var
                offsetTop = nav.offset().top,
                headerHeight = nav.height(),
                injectSpace = $('<div />', {
                    height: headerHeight
                }).insertAfter(nav);

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop ) {
                        nav.addClass('fixed-hide');
                        injectSpace.show();
                    } else {
                        nav.removeClass('fixed-hide');
                        injectSpace.hide();
                    }

                    if ( $(window).scrollTop() > 500 ) {
                        nav.addClass('fixed-show');
                    } else {
                        nav.removeClass('fixed-show');
                    }
                })
            }     
        },

        // Mobile Menu
        mobileMenu: function() {
            $('.mobile-toggle').on('click', function(e){
                e.preventDefault();
                $('#main-nav').fadeToggle(250);
            });

            $(window).on('load scroll', function(){
                if ( jQuery(window).width() < 800 ) {
                    $('#main-nav .menu-item-has-children > a').on('click', function(e){
                        e.preventDefault();
                        $(this).closest('li').find('.sub-menu').first().toggle();
                    });
                }
            });
        },

        // Scroll to Top
        scrollToTop: function() {
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 800 ) {
                    $('#scroll-top').addClass('show');
                } else {
                    $('#scroll-top').removeClass('show');
                }
            });

            $('#scroll-top').on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
            });
        },

        // Set min content height
        minContentHeight: function() {
            var height = $(window).height() - 161;
            jQuery("#site-content").css("min-height" , height)
        },
    };

    // Start things up
    coraTheme.init();

})(jQuery);