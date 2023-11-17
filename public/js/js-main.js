jQuery(document).ready(function($){
	
    
    //smoothscroll
    $('.navbar-nav a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('.navbar-nav a').each(function () {
            $(this).parent().removeClass('active');
        })
        $(this).parent().addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
    
    
    $(function () {
    	if ($("[data-toggle='tooltip']").length > 0) {  $("[data-toggle='tooltip']").tooltip(); }
    });
    
    $('a#read[href^="#"], a#top[href^="#"], a.to-price').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
       
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

	
    $('.rowform input, .rowform textarea').blur(function() {
        $(this).parent().removeClass("focus");
      })
      .focus(function() {
    	  $(this).parent().addClass("focus");
    });
    
   
	
	
	 var toggles = document.querySelectorAll(".navbar-toggler ");

		for (var i = toggles.length - 1; i >= 0; i--) {
		  var toggle = toggles[i];
		  toggleHandler(toggle);
		};
		
		function toggleHandler(toggle) {
		  toggle.addEventListener("click", function(e) {
		    e.preventDefault();
		    if (this.classList.contains("is-active") === true) {
		      this.classList.remove("is-active");
		      $('.navbar-collapse').removeClass('oppenned');
		    } else {
		      this.classList.add("is-active");
		      $(".navbar-collapse").addClass('oppenned');
		    }
		  });
		}
		$(".sub-menu li a").click(function(event) {
		  $(".navbar-collapse").removeClass('oppenned');
		  $(".navbar-toggler ").removeClass('is-active');
		});
		
		$(".btn").click(function(event) {
			  $(this).toggleClass('active');
			//  return false;
		});
		
		
		  
		if ($('#form').length > 0) {
		  $("#send").click(function() {
		  	
		  	var name = $("#your-name").val();
		  	
		  	var email = $("#your-email").val();
		  	var message = $("#message").val();
		  	$("#returnmessage").empty();  // To empty previous error/success message.
		  	// Checking for blank fields.
		  	if (name == '' || email == '') {
		  	alert("Please Fill Required Fields");
		  	
		  	} else {
		  		
			  	// Returns successful data submission message when the entered information is stored in database.
			  	$.post("contact2.php", {
			  	name1: name,
			  	email1: email,
			  	message1: message,
			  	
			  	}, function(data) {
				  	$("#returnmessage").append(data); // Append returned message to message paragraph.
				  	$('#top').trigger('click');
				  	//$("#form").trigger("reset");
				});
			}
		  });
		}
		  
		
		
		
		if ($('.info').length > 0) {
			  $( function() {
				    $( ".slider-range-max" ).slider({
				      range: "max",
				      min: 1,
				      max: 100,
				      value: 69,
				      slide: function( event, ui ) {
				        $( "#amount" ).val( ui.value );
				      }
				    });
				    
				    
				    $( ".slider-range-max2" ).slider({
					      range: "max",
					      min: 1,
					      max: 100,
					      value: 24,
					      slide: function( event, ui ) {
					        $( "#amount" ).val( ui.value );
					      }
					    });


			   $( ".slider-range-max3" ).slider({
					      range: "max",
					      min: 1,
					      max: 100,
					      value: 15,
					      slide: function( event, ui ) {
					        $( "#amount" ).val( ui.value );
					      }
					    });
		
				 $( ".slider-range-max4" ).slider({
					      range: "max",
					      min: 1,
					      max: 100,
					      value: 12,
					      slide: function( event, ui ) {
					        $( "#amount" ).val( ui.value );
					      }
					    });
				  } );
			}
			  
		
});



