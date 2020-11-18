/*
 * Updated October 2020
 * Tabletop (Google Sheets API V3) is going away Jan 2021
 * Replaced Tabletop with Sheets API V4 
 */

$( document ).ready(function() {

	//fetch list from Sheets API V4
	$.ajax({
		url:'https://sheets.googleapis.com/v4/spreadsheets/1rcA7clSXgizJEkfM9kAG2hs6HlP3uW45SKZ3wT5Oou8/values/A:B?key=AIzaSyD8Y28YJpVhE4XlVlOoA74Ws47YdPz5nGA',
	}).done(function(json) {
		var data = json['values'];//spreadsheet data lives in an array with the name values
		//rewrite data to an object with key-value pairs. This is also a chance to rename or ignore columns
		data = data.map(function(n,i) {
			var myObject = {
				name:n[0],
				description:n[1]
			}
			return myObject;
		});
		data.splice(0,1); //remove the first row, which contains the orginal column headers
		showInfo(data); //send data to callback
	});

	//callback: display and format list
  function showInfo(data) {
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
		else {
			var title = $('<span>')
			.addClass('details-control')
			.addClass('empty')
			.text(value.name)
			.appendTo(div);	
		}
			
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

});

	