(function($) {
    "use strict";

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    function backgroundImage() {
        var databackground = $('[data-background]');
        databackground.each(function() {
            if ($(this).attr('data-background')) {
                var image_path = $(this).attr('data-background');
                $(this).css({
                    'background': 'url(' + image_path + ')'
                });
            }
        });
    }

    function parallax() {
        $('.bg--parallax').each(function() {
            if (isMobile.any()) {
                $(this).css('background-attachment', 'scroll');
            } else {
                $(this).parallax("50%", 0.2);
            }
        });
    }

    function menuBtnToggle() {
        var toggleBtn = $('.menu-toggle'),
            sidebar = $('.header--left'),
            header2 = $('.header--2'),
            header3 = $('.header--3'),
            menu = $('.menu');
        if (header2.length > 0) {
            toggleBtn.on('click', function() {
                var self = $(this);
                self.toggleClass('active');
                self.closest('.navigation--mobile').find('.menu--2').slideToggle();
            });
        }
        else if (sidebar.length > 0) {
            toggleBtn.on('click', function() {
                var self = $(this);
                self.toggleClass('active');
                self.closest('.header--left').toggleClass('active');
            });
        }
        else if (header3.length > 0) {
            toggleBtn.on('click', function() {
                var self = $(this);
                self.toggleClass('active');
                self.siblings('.menu').slideToggle();
            });
        }
        else {
            toggleBtn.on('click', function() {
                var self = $(this);
                self.toggleClass('active');
                $('.ps-main, .header').toggleClass('menu--active');
                $('.header--sidebar').toggleClass('active');
            });
        }
    }

    function subMenuToggle() {
        $('body').on('click', '.header--sidebar .menu .menu-item-has-children > a', function(event) {
            event.preventDefault();
            var current = $(this).parent('.menu-item-has-children')
            current.children('.sub-menu').slideToggle(350);
            current.children('.mega-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
            current.siblings().find('.mega-menu').slideUp(350);
        });
        $('body').on('click', '.header--left .menu--sidebar .menu-item-has-children > a', function(event) {
            event.preventDefault();
            var current = $(this).parent('.menu-item-has-children')
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
        });
        $('body').on('click', '.header--2 .menu--2 .menu-item-has-children > a, .header--3 .menu .menu-item-has-children > a', function(event) {
            event.preventDefault();
            var current = $(this).parent('.menu-item-has-children')
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
        });
    }

    function resizeHeader() {
        var header = $('.header'),
            headerSidebar = $('.header--left'),
            menu = $('.menu'),
            checkPoint = 1200,
            windowWidth = $(window).innerWidth();
        // mobile
        if (checkPoint > windowWidth) {
            menu.find('.sub-menu').hide();
            menu.find('.menu').addClass('menu--mobile');
            menu.prependTo('.header--sidebar');
            $('.ps-sticky').addClass('desktop');
        }
        else {
            menu.find('.sub-menu').show();
            header.removeClass('shared--mobile');
            menu.prependTo('.header .center');
            menu.removeClass('menu--mobile');
            $('.header--sidebar').removeClass('active');
            $('.ps-main, .shared').removeClass('menu--active');
            $('.menu-toggle').removeClass('active');
            $('.ps-sticky').removeClass('desktop');
            if (headerSidebar.length > 0) {
                $('.menu.menu--sidebar').find('.sub-menu').hide();
            }
        }
        /*logo*/
        if (windowWidth < 480) {
            $('.ps-form--search').prependTo('.header--sidebar');
        }
        else {
            $('.ps-form--search').insertAfter('.ps-cart');
        }
    }

    function stickyHeader() {
        var header = $('.header'),
            scrollPosition = 0,
            headerTopHeight = $('.header .header__top').outerHeight(),
            checkpoint = 300;
        if (header.data('sticky') == true) {
            $(window).scroll(function() {
                var currentPosition = $(this).scrollTop();
                if (currentPosition < scrollPosition) {
                    // On top
                    if (currentPosition == 0) {
                        header.removeClass('navigation--sticky unpin pin');
                        header.css("margin-top", 0);
                    }
                    // on scrollUp
                    else if (currentPosition > checkpoint) {
                        header.removeClass('unpin').addClass('navigation--sticky pin');
                    }
                }
                // On scollDown
                else {
                    if (currentPosition > checkpoint) {
                        header.addClass('navigation--sticky unpin').removeClass('pin');
                        header.css("margin-top", -headerTopHeight);
                    }
                }
                scrollPosition = currentPosition;
            });
        }

    }

    function owlCarousel() {
        var target = $('.owl-slider');
        if (target.length > 0) {
            target.each(function() {
                var el = $(this),
                    dataAuto = el.data('owl-auto'),
                    dataLoop = el.data('owl-loop'),
                    dataSpeed = el.data('owl-speed'),
                    dataGap = el.data('owl-gap'),
                    dataNav = el.data('owl-nav'),
                    dataDots = el.data('owl-dots'),
                    dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
                    dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
                    dataDefaultItem = el.data('owl-item'),
                    dataItemXS = el.data('owl-item-xs'),
                    dataItemSM = el.data('owl-item-sm'),
                    dataItemMD = el.data('owl-item-md'),
                    dataItemLG = el.data('owl-item-lg'),
                    dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='fa fa-angle-left'></i>",
                    dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='fa fa-angle-right'></i>",
                    duration = el.data('owl-duration'),
                    datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
                el.owlCarousel({
                    animateIn: dataAnimateIn,
                    animateOut: dataAnimateOut,
                    margin: dataGap,
                    autoplay: dataAuto,
                    autoplayTimeout: dataSpeed,
                    autoplayHoverPause: true,
                    loop: dataLoop,
                    nav: dataNav,
                    mouseDrag: datamouseDrag,
                    touchDrag: true,
                    autoplaySpeed: duration,
                    navSpeed: duration,
                    dotsSpeed: duration,
                    dragEndSpeed: duration,
                    navText: [dataNavLeft, dataNavRight],
                    dots: dataDots,
                    items: dataDefaultItem,
                    responsive: {
                        0: {
                            items: dataItemXS
                        },
                        480: {
                            items: dataItemSM
                        },
                        768: {
                            items: dataItemMD
                        },
                        992: {
                            items: dataItemLG
                        },
                        1200: {
                            items: dataDefaultItem
                        }
                    }
                });
            });
        }
    }

    function masonry() {
        var masonryTrigger = $('.ps-masonry');
        if (masonryTrigger.length > 0) {
            masonryTrigger.imagesLoaded(function() {
                masonryTrigger.masonry({
                    columnWidth: '.grid-sizer',
                    itemSelector: '.grid-item'
                });
            });
            var filters = masonryTrigger.closest('.masonry-root').find('.ps-masonry__filter > li > a');
            filters.on('click', function() {
                var selector = $(this).attr('data-filter');
                filters.find('a').removeClass('current');
                $(this).parent('li').addClass('current');
                $(this).parent('li').siblings('li').removeClass('current');
                $(this).closest('.masonry-root').find('.ps-masonry').isotope({
                    itemSelector: '.grid-item',
                    isotope: {
                        columnWidth: '.grid-sizer'
                    },
                    filter: selector
                });
                return false;
            });
        }
    }

    function countDown() {
        var time = $(".ps-countdown");
        time.each(function() {
            var el = $(this),
                value = $(this).data('time');
            var countDownDate = new Date(value).getTime();
            var timeout = setInterval(function() {
                var now = new Date().getTime(),
                    distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (el.find('.days').length > 0) {
                    el.find('.days').html(days);
                    if (hours < 10) {
                        el.find('.hours').html("0" + hours);
                    }
                    else {
                        el.find('.hours').html(hours);
                    }
                }
                else {
                    if (days > 0) {
                        el.find('.hours').html(24);
                    }
                    else {
                        el.find('.hours').html(hours);
                    }
                }
                if (minutes < 10) {
                    el.find('.minutes').html("0" + minutes);
                }
                else {
                    el.find('.minutes').html(minutes);
                }
                if (seconds < 10) {
                    el.find('.seconds').html("0" + seconds);
                }
                else {
                    el.find('.seconds').html(seconds);
                }

                if (distance < 0) {
                    clearInterval(timeout);
                }
            }, 1000);
        });
    }

    function rating() {
        $('select.ps-rating').barrating({
            theme: 'fontawesome-stars'
        });
    }

    function mapConfig() {
        $.gmap3({
            key: 'AIzaSyAx39JFH5nhxze1ZydH-Kl8xXM3OK4fvcg'
        });
        var map = $('#contact-map');
        if (map.length > 0) {
            map.gmap3({
                address: map.data('address'),
                zoom: map.data('zoom'),
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 65
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": "50"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "30"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "40"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ffff00"
                            },
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -97
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -100
                            }
                        ]
                    }
                ]
            }).marker(function(map) {
                return {
                    position: map.getCenter(),
                    icon: 'images/marker.png',
                    animation: google.maps.Animation.BOUNCE
                };
            }).infowindow({
                content: map.data('address')
            }).then(function(infowindow) {
                var map = this.get(0);
                var marker = this.get(1);
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        }
        else {
            console.log("Notice: Don't have map on this page!!!");
        }
    }

    function zoomAction() {
        $('.zoom').each(function() {
            if ($(this).parent().hasClass('slick-active')) {
                $(this).elevateZoom({
                    responsive: true,
                    zoomType: "inner",
                    zoomWindowWidth: 600,
                    zoomWindowHeight: 600
                });
            }
        });
    }

    function zoomInit() {
        var zoom = $('.ps-product__image .item').first().find('.zoom');
        var primary = $('.ps-product__image .item.slick-active').first().children('.zoom');
        primary.elevateZoom({
            responsive: true,
            zoomType: "inner",
            zoomWindowWidth: 600,
            zoomWindowHeight: 600
        });
    }

    function slickConfig() {
        var primary = $('.ps-product__image'),
            second = $('.ps-product__variants');
        primary.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.ps-product__variants',
            dots: false,
            arrows: false,

        });
        second.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            arrow: false,
            focusOnSelect: true,
            asNavFor: '.ps-product__image',
            vertical: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        slidesToShow: 4,
                        vertical: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        vertical: false
                    }
                },
            ]
        });
        primary.on('afterChange', function(event, slick, currentSlide) {
            zoomAction();
        });
        primary.on('beforeChange', function(event, slick, currentSlide) {
            $('.zoomContainer').remove();
        });

    }

    function bootstrapSelect() {
        $('select.ps-select').selectpicker();
    }

    function inputNumberChange() {
        var number = $('.ps-number');
        number.each(function() {
            var el = $(this),
                numberValue = el.find('input').val();
            el.find('.up').on('click', function(e) {
                e.preventDefault();
                numberValue++;
                el.find('input').val(numberValue);
                el.find('input').attr('value', numberValue);
            });
            el.find('.down').on('click', function(e) {
                e.preventDefault();
                if (numberValue > 1) {
                    numberValue--;
                    el.find('input').val(numberValue);
                    el.find('input').attr('value', numberValue);
                }

            })
        });
        $('.form-group--number').each(function() {
            var el = $(this),
                numberValue = el.find('input').val();
            el.find('.plus').on('click', function(e) {
                e.preventDefault();
                numberValue++;
                el.find('input').val(numberValue);
                el.find('input').attr('value', numberValue);
            });
            el.find('.minus').on('click', function(e) {
                e.preventDefault();
                if (numberValue > 1) {
                    numberValue--;
                    el.find('input').val(numberValue);
                    el.find('input').attr('value', numberValue);
                }

            })
        });
    }

    function productFilterToggle() {
        $('.ps-filter__trigger').on('click', function(e) {
            e.preventDefault();
            var el = $(this);
            el.find('.ps-filter__icon').toggleClass('active');
            el.closest('.ps-filter').find('.ps-filter__content').slideToggle();
        });
    }

    function bannerSync() {
        var banner = $('.ps-fashion3--banner'),
            windowWidth = $(window).innerWidth();
        if (banner.length > 0) {
            var list = banner.find('.right .ps-list--banner'),
                bannerHeight = banner.find('.left').innerHeight(),
                listItem = list.find('li a'),
                owl = $('.ps-slider--fashion3');
            if (windowWidth > 1200) {
                listItem.css('height', bannerHeight / 5);
            }
            else {
                listItem.css('height', 'auto');
            }

            list.find('li').each(function(index, el) {
                var link = $(this).find('a');
                link.on('click', function(event) {
                    event.preventDefault();
                    link.closest('li').addClass('active');
                    link.closest('li').siblings('li').removeClass('active');
                    owl.trigger('to.owl.carousel', [index, 500, true]);
                });
            });
        }
    }

    function handleModal() {
        var modal_link = $('.ps-modal-open');
        modal_link.on('click', function(e) {
            e.preventDefault();
            var $this= $(this),
                target = $this.attr('href');
            if($(''+target).length > 0) {
                $(''+target).addClass('active');
            }
            else {
                console.log("Modal not found!");
            }
        })
        $('.ps-modal__remove').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-modal').removeClass('active');
        })
    }

    $(document).ready(function() {
        backgroundImage();
        parallax();
        bootstrapSelect();
        menuBtnToggle();
        subMenuToggle();
        masonry();
        stickyHeader();
        mapConfig();
        rating();
        countDown();
        slickConfig();
        inputNumberChange();
        productFilterToggle();
        zoomInit();
        handleModal();

    });

    $(window).on('load', function() {
        owlCarousel();
        $('.ps-loading').addClass('loaded');
    });

    $(window).on('load resize', function() {
        resizeHeader();
        bannerSync();
    });
})(jQuery);
