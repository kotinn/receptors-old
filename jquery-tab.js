$(window).load(function(){

	// check the url for parameters
	var currentTab = window.location.hash;
	
	if (currentTab != '') {
	
		if (document.getElementById(currentTab.replace(/#/, '') + '-tab' )) {
		
			var curTabID = currentTab + '-tab';
			var curAccID = currentTab + '-acc';
			var curConID = currentTab + '-content';
			
			// change active tab
			$('.tab').removeClass('tab-active');
			$(currentTab + '-tab').addClass('tab-active');
			
			// change content
			$('.infotab').hide();
			$(curConID).show();
			
			// change active acc
			$('.acc a').removeClass('extended');
			$(curAccID + ' a').addClass('extended');

		} else {
			$('#overview').addClass('tab-active');
			$('#overview-content').addClass('infotab-active');
		}
	
	}
	
	// link to another tab from hyperlink	
   	$('.linkTab').click( function() {
		var tabID = $(this).attr('href') + '-tab';
		var accID = tabID.replace(/tab/, 'acc');
		var contentID = tabID.replace(/tab/, 'content');
		// change active tab
		$('.tab').removeClass('tab-active');
		$(tabID).addClass('tab-active');
		// change active acc
		$('.acc a').removeClass('extended');
		$(accID + ' a').addClass('extended');
		// change content
		$('.infotab').hide();
		$(contentID).show();
		
		//if(map_enabled)
		//	initialize_map();
   	}); 
	
	// link to another accordion from hyperlink	
   	$('.linkAcc').click( function() {
		var accID = $(this).attr('href');
		var tabID = accID.replace(/acc/, 'tab');
		var contentID = accID.replace(/acc/, 'content');
		// change active acc
		$('.acc a').removeClass('extended');
		// change tab
		$('.tab').removeClass('tab-active');
		$(tabID).addClass('tab-active');
		// change content
		$(contentID).toggle();
		$('.infotab').each(function(){
			if ($(this).attr('id') != contentID.replace(/#/, '')){
				$(this).hide();
			}
		});
		if ( $(contentID).is(":visible") ){	
			$(accID + ' a').addClass('extended');
		}
		else{
			$(accID + ' a').removeClass('extended');
		}
		
		//if(map_enabled)
		//	initialize_map();
   	}); 
});

$(window).resize(function(){

	if ($('.tab-active').is(':visible')){
		contentID = $('.tab-active').attr('id').replace(/tab/, 'content');
		$('#'+ contentID).show();
	}
	
});


$(document).ready(function(){
	//load tabs data
	$('#tabs-content .infotab:not(#overview-content) .tab-content').each(function( ) {
		var filename = $(this).parent().attr('id').replace('-content', '');
		filename = 'tabs/'+ filename + '.inc.html';
	//	$(this).load(filename);
	});
	
	// hide infotab if acc is present
	if ($('#tabs-content .acc ').is(':visible')){
		$('.infotab').hide();
	}
	
	
	// tab click
	$('.tab a').click(function() {
	
		var tabID = '#' + $(this).parent().attr('id');
		var accID = tabID.replace(/tab/, 'acc');
		var contentID = tabID.replace(/tab/, 'content');
		
		// change active tab
		$('.tab').removeClass('tab-active');
		$(this).parent().addClass('tab-active');
		
		// change active acc
		$('.acc a').removeClass('extended');
		$(accID + ' a').addClass('extended');
		
		// change content
		$('.infotab').hide();
		$(contentID).show();
		
		//if(map_enabled)
		//	initialize_map();
	});
	
	// acc click
	$('.acc a').click(function() {
		
		var accID = '#' + $(this).parent().attr('id');
		var tabID = accID.replace(/acc/, 'tab');
		var contentID = accID.replace(/acc/, 'content');
		
		// change active acc
		$('.acc a').removeClass('extended');
		
		
		// change tab
		$('.tab').removeClass('tab-active');
		$(tabID).addClass('tab-active');
		
		// change content
		$(contentID).toggle();
		
		$('.infotab').each(function(){
		
			if ($(this).attr('id') != contentID.replace(/#/, '')){
				$(this).hide();
			}
		
		});
		 
		if ( $(contentID).is(":visible") ){
			$(this).addClass('extended');
		}
		else{
			$(this).removeClass('extended');
		}
		
		//if(map_enabled)
		//	initialize_map();
	});	

});

$(window).resize(function() {

	if ($('#tabs-row > ul').css('display') == 'block') {
		
		if ($(".infotab-active")[0]){
			// Do something here if an element with this class exists
		}
		else
		{
			$('#overview').addClass('tab-active');
			$('#overview-content').addClass('infotab-active');
			$('#overview-acc').addClass('tab-open');
			$('#overview-acc').children().addClass('extended');
		
		}
		
	}
});