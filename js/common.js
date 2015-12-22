/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[ COMMON SCRIPTS ]
AUTHOR :VIJAYAN PP
PROJECT :DEV COMING SOON TEMPLATE
VERSION : 1.1
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

(function($) {
	"use strict";

	$(window).load(function(){
		
		App.loader();
	});

	var App={
            init:function()
            {
                
                App.menuClick("div.menu-icon","footer.footer");
		App.pageLoad("div.widtH","div.page-content");
                			
            },
            
            menuClick:function(mButton,div)
            {
                $(mButton).on("click",function()
                {
                    
                     
				 if($(this).hasClass("notclicked"))
				 {
                                  $(".social a").css("opacity","0");
                                  $(div).removeClass("not-visible").addClass("visible fadeInUp");
				  $(this).removeClass("notclicked").addClass("clicked");
				  $("div.widtH").addClass("fadeInUp");
                                  var h=$(window).innerWidth();
                                  if(h<=1000)
                                  {
                                   
                                   $("footer.footer .page-contents").perfectScrollbar();
                                  
                                  }
                                 
				  }
				  else
				  {
                                  $(".social a").css("opacity","1");
				  $(div,"div.widtH").removeClass("fadeInUp");
                                  $(div).addClass("not-visible");				  
				  $(this).removeClass("clicked").addClass("notclicked");
                                  
                                 
                  }
                }
                        
                  )
            },
			pageLoad:function(div,div2)
			{
			
			$(div).on("click",function()
			{
			$("div.menu-icon").trigger("click");
			

			var pageUrl = $(this).attr("data-page");
                        App.loaderIn()
						$('.dev-countdown').CountTimer('destroy');
			$(div2).animate({opacity:"0"},800,function()
			{
			App.loader();
			$("section.main-gallery").load(pageUrl);
			
			}		
			);
			
			}
			);			
			},
			loader:function()
			{
                         
			 $("div.preloader,div.pre_loader").fadeOut("slow");
                         
                         
			},
			
			loaderIn:function()
			{ 
			 $("div.pre_loader").fadeIn("slow");			
			},
                        prettyphoto:function()
                        {
                        jQuery('#gallery a').attr('rel', 'prettyPhoto');
                        jQuery("a[rel^='prettyPhoto']").prettyPhoto(); 
                        }
			
        }
        App.init()

})(jQuery);

/*Function for ajax loaded pages*/

/*+++++++++++++++++++++++++COUNTER++++++++++++++++++++++++++++*/

var counter=function()
            {
                $('.dev-countdown').CountTimer({
					//Set your target date here!
					day: 30,
					month: 10,
					year: 2016,
					leftHandZeros: false,
					onChange: function() {
						drawCircle($('#ce-days').get(0), this.days, 365);
						drawCircle($('#ce-hours').get(0), this.hours, 24);
						drawCircle($('#ce-minutes').get(0), this.minutes, 60);
						drawCircle($('#ce-seconds').get(0), this.seconds, 60);
					}
				});

            };
            
            var drawCircle=function(canvas, value, max)
            {
                var	primaryColor = '#3e5f06',
						secondaryColor = '#171616',
						circle = canvas.getContext('2d');
					
					circle.clearRect(0, 0, canvas.width, canvas.height);
					circle.lineWidth = 4;

					circle.beginPath();
					circle.arc(
						canvas.width / 2, 
						canvas.height / 2, 
						canvas.width / 2 - circle.lineWidth, 
						deg(0), 
						deg(360 / max * (max - value)), 
						false);
					circle.strokeStyle = secondaryColor;
					circle.stroke();

					circle.beginPath();
					circle.arc(
						canvas.width / 2, 
						canvas.height / 2, 
						canvas.width / 2 - circle.lineWidth, 
						deg(0), 
						deg(360 / max * (max - value)), 
						true);
					circle.strokeStyle = primaryColor;
					circle.stroke();

            };
            
           var deg=function(v)
            {
                return (Math.PI/180) * v - (Math.PI/2);

            }
            
            
           var scrollbar=function()
           {
               if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/)){
		$('#gallery,div.services,div.contactus,div.aboutus,div.animatE,div.teams').perfectScrollbar("destroy");
	       $('#gallery,div.services,div.contactus,div.aboutus,div.animatE,div.teams').addClass('scroll-block');
                  
	    } 
	else {
		$('#gallery,div.services,div.contactus,div.aboutus,div.animatE,.page-content,div.teams').perfectScrollbar();
		$('#gallery,div.services,div.contactus,div.aboutus,div.animatE,div.teams').removeClass('scroll-block');
              
	}
        
           };

/*+++++++++++++++++++++++++PRETTY PHOTO++++++++++++++++++++++++++++*/

var prettyphotos=function()
                        {
                        jQuery('#gallery a').attr('rel', 'prettyPhoto');
                        jQuery("a[rel^='prettyPhoto']").prettyPhoto(); 
                        }


/*++++++++++++++++++++++++++NOTIFY ME+++++++++++++++++++++++++++*/
//Notify Me
	function resetForm(e){
		isSend = true;
		if(e.keyCode !== 13){
	  		resetFormError($('.text-danger'));
	  		$(this).off('keydown');
	  	}else{
	  		$('#notifyMe').trigger('submit');
	  	}
	 }

	function resetFormError(message, interval){
	  	interval = interval || 500;
	  	$('.form-control').css('color',"#fff");
	  	message.fadeOut(interval);
		setTimeout(function(){
			message.removeClass('text-danger');
			newQuery = true;
		}, interval);
	 }

	var isSend = true;
	var newQuery = true;

	$('#notifyMe').submit(function(e){
		var form           = $(this),
			message        = form.find('.form-message'),
			messageSuccess = 'Your email is sended',
			messageInvalid = 'Please enter a valid email address',
			messageSigned  = 'This email is already signed',
			messageErrore  = 'Error request';
		e.preventDefault();
		if(isSend === false){
			isSend = true;
			resetFormError(message);
			return;
		}
		if(newQuery){
			newQuery = false;
	    	$.ajax({
				url     : 'php/notify.php',
				type    : 'POST',
				data    : form.serialize(),
				success : function(data){
					form.find('.btn').prop('disabled', true);
					message.removeClass('text-danger').removeClass('text-success').fadeIn();
					switch(data) {
						case 0:
							message.html(messageSuccess).addClass('text-success').fadeIn();
							setTimeout(function(){
								message.removeClass('text-success').fadeOut(10);
								newQuery = true;
							}, 3000);
							setTimeout(function(){
								form.trigger('reset');
								message.fadeOut().delay(500).queue(function(){
									message.html('').dequeue();
									newQuery = true;
								});
							}, 2000);
							
							break;
						case 1:
							message.html(messageInvalid).addClass('text-danger').fadeIn();
							 $('.form-control').on('keydown',resetForm);
							 $('.form-control').css('color',"#fd6967");
							 isSend = false;
							break;
						case 2:
							message.html(messageSigned).addClass('text-danger').fadeIn();
							setTimeout(function(){
								form.trigger('reset');
								message.queue(function(){
									message.html('').dequeue();
								});
								newQuery = true;
							}, 2000);
							break;
						default:
							message.html(messageErrore).addClass('text-danger').fadeIn();
					}
					form.find('.btn').prop('disabled', false);
				}
			});
		}
	});

  //Contact Form
  var submitcontact=function()
  {
  $('#contact-form').submit(function(e){
		var form = $(this);
		e.preventDefault();		
		$.ajax({
			type: 'POST',
			url : 'php/sendmail.php',
			data: form.serialize(),
			success: function(data){
				form.find('.form-message').html(data).fadeIn();
		
				form.find('.btn').prop('disabled', true);
					
				if ($(data).is('.send-true')){
					setTimeout(function(){
						form.trigger('reset');
						
						form.find('.btn').prop('disabled', false);
						
						form.find('.form-message').fadeOut().delay(500).queue(function(){
							form.find('.form-message').html('').dequeue();
						});
					}, 2000);
				} else {
					form.find('.btn').prop('disabled', false);
				}
			}
		});
  });
  };
  
  /*+++++++++++++++++++++++++TO SHOW HIDE MENU++++++++++++++++++++++++++++*/
  var showMenu_scroll=function(mButton)
  {
      if(!$(mButton).hasClass("notclicked"))
      {
       
     $(".social a").css("opacity","1");
				  $("footer.footer","div.widtH").removeClass("fadeInUp");
                                  $("footer.footer").addClass("not-visible");				  
				  $(mButton).removeClass("clicked").addClass("notclicked"); 
                              }
  };
  
  
   var  carouselteam=function() 
  {
  $('#carousel ul').carouFredSel({
					prev: '#prev',
					next: '#next',
					pagination: "#pager",
					scroll: 1000
				});
  
  };
  var fullscreenslider=function()
  {
      $("body").vegas({
	delay: 3000,
    slides: [
        { src: "images/bak3.jpg" },
        { src: "images/bak2.jpg" },
        { src: "images/bak3.jpg" },
        { src: "images/bak4.jpg" }
    ],animation: 'kenburns'
});
  };

/*+++++++++++++++++++++++++FUNCTIONS TO TRIGGER WHEN DOCUMENT IS READY++++++++++++++++++++++++++++*/
$(document).ready(function()
{
counter();
fullscreenslider();
prettyphotos();
scrollbar();
submitcontact();

}
);
/*+++++++++++++++++++++++++FUNCTIONS TO TRIGGER WHEN WINDOW IS RESIZING++++++++++++++++++++++++++++*/

$(window).on("resize",function(){showMenu_scroll("div.menu-icon");});