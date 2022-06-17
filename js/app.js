$(function() {

    const worksSlider = $('[data-slider="slick"]');

    /**
     * Filter
     */
    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault();

        let cat = $(this).data('filter');

        if(cat == 'all') {
            $("[data-cat]").removeClass("hide");
        } else {
            $("[data-cat]").each(function() {
                let workCat = $(this).data('cat');

                if(workCat != cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }
    });


        var header = $("#header"),
            introH = $("#intro").innerHeight(),
            scrollOffset = $(window).scrollTop();
    
    
        /**
         * Fixed header
         */     
        checkScroll(scrollOffset);
    
        $(window).on("scroll", function() {
            scrollOffset = $(this).scrollTop();
    
            checkScroll(scrollOffset);
        });
    
        function checkScroll(scrollOffset) {
            if( scrollOffset >= introH + 150 ) {
                header.addClass("fixed");
            } else {
                header.removeClass("fixed");
            }
        }
    
    
    
        /**
         * Smooth scroll
         */

        $("[data-scroll]").on("click", function(event) {
            event.preventDefault();
    
            var $this = $(this),
                blockId = $this.data('scroll'),
                blockOffset = $(blockId).offset().top - 50;
    
            $("#nav a").removeClass("active");
            $this.addClass("active");
    
            $("html, body").animate({
                scrollTop:  blockOffset
            }, 500);
        });




    /**
     * Modal
     */

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

    modalCall.on("click", function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');
        console.log(modalId);

        $(modalId).addClass('show');
        $("body").addClass('no-scroll');

        setTimeout(function() {
            $(modalId).find(".modal__dialog").css({
                transform: "scale(1)"
            });
        }, 200);

        worksSlider.slick('setPosition');
    });


    modalClose.on("click", function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.find(".modal__dialog").css({
            transform: "scale(0)"
        });

        setTimeout(function() {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });


    $(".modal").on("click", function(event) {
        let $this = $(this);

        $this.find(".modal__dialog").css({
            transform: "scale(0)"
        });

        setTimeout(function() {
            $this.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });

    $(".modal__dialog").on("click", function(event) {
        event.stopPropagation();
    });



    /**
     * Slider: https://kenwheeler.github.io/slick/
     */
    
     worksSlider.slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         fade: true,
         arrows: false,
         dots: true
     });

     $(".slickPrev").on("click", function(event) {
         event.preventDefault();

         let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

         currentSlider.slick("slickPrev");
     });

     $(".slickNext").on("click", function(event) {
         event.preventDefault();

         let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

         currentSlider.slick("slickNext");
     });
    



    /**
     * Mobile nav
     */

    const navToggle = $("#navToggle");
    const nav = $("#nav");

    navToggle.on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
    });

    /**
     * Form validation
     */

    $("#submit_btn").on("click", function(){
        let email = $("#input-email").val().trim();
        let message = $("#input-text").val().trim();

        console.log(email);
        if(email == "") {
            alert("Don't forget to input email!");
            return false;
        }else if(message.length < 3) {
            alert("Please input a bit longer message!");
            return false;
        }
    });
    

    $.ajax({
        url: 'ajax/mail.php',
        type: 'POST',
        cache: false,
        data: {
            'email': email,
            'message': message
        },
        dataType: 'html',
        beforeSend: function(){
            $("#submit_btn").prop("disabled", true);
        },
        success: function(data){
            if (!data) {
                alert("Oops, something went wrong!");
            } else {
                $("#contact_form").trigger("reset");
            }
            $("#submit_btn").prop("disabled", false);
        }
    });
});
