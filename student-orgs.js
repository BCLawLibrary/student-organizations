$( document ).ready(function() {init() });


var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1rcA7clSXgizJEkfM9kAG2hs6HlP3uW45SKZ3wT5Oou8&output=html';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
    console.log(data);
    var display = $('div#tabletop-display')
    
    var openButton =$('<span>')
				.addClass ("btn btn-default btn-maroon openAll")
				.text("Show All Descriptions")
				.appendTo(display);
				
		var closeButton =$('<span>')
				.addClass ("btn btn-default btn-maroon closeAll")
				.text("Hide All Descriptions")
				.appendTo(display);		
    
    
	var items = [];
	$.each( data, function( key, value ) {
		
				
	
		var div = $('<div>')
			.addClass('org');
			
		if (value.description) {
		
		var title = $('<span>')
			.addClass('ui-menu-item')
			.addClass('org-title')
			.addClass('details-control')
			.attr('role', 'menuitem')
			.text(value.name)
			.appendTo(div);	
			
		var orgDesc = $('<div>')
			.addClass('org-desc');
			
		var orgText =$('<p>')
			.text(value.description)
			.appendTo(orgDesc);
			
		orgDesc.appendTo(div);
		
		}
		else
			var title = $('<span>')
			.addClass('details-control')
			.addClass('empty')
			.text(value.name)
			.appendTo(div);	
		
			
		if (value.url) {
			var button =$('<span>')
				.addClass ("btn btn-default btn-maroon");
		
			var orgLink = $('<a>')
				.addClass ("org-link-law")
				.attr ("href", value.url)
				.text (value.name)
				.appendTo(button);
				
			button.appendTo(orgDesc);	
			
		}
			
		
		div.appendTo(display);
    	
    });
    
    $(".org-title")
		.click(function(){
			$(this)
				.toggleClass("open")
				.next(".org-desc")
				.slideToggle(200);
            return false;
		});	
		
	$(".openAll")
		.click(function(){
			$(".org-title")
				.addClass("open")
				.next(".org-desc")
				.slideDown(200);
            return false;
		});	
		
	$(".closeAll")
		.click(function(){
			$(".org-title")
				.removeClass("open")
				.next(".org-desc")
				.slideUp(200);
            return false;
		});	
    
  }



	