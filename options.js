
var hrsLeft = 24
var hrsSpent = 0
function createUi() {
	html = ""
	for(var i = 0; i <= hrsLeft; ++i) {
		html += "<option>" + i + "</option>"
	}
	$('#variable-settings div select').html(html)
	var prevVal = 0

	$('#variable-settings div select').on('focus', function() {
		console.log("focused: " + $(this).val())
		prevVal = Math.floor($(this).val())
		html = ""

		for(var i = 0; i <= prevVal + hrsLeft; ++i) {
			html += "<option>" + i + "</option>"
		}
		$(this).html(html)
	})

	$('#variable-settings div select').on('change', function() {

		var val = $(this).val()
		if(val == 0) return
		hrsLeft += prevVal
		hrsLeft -= val
		hrsSpent -= prevVal
		hrsSpent += val
		console.log("prevVal ->>" + prevVal)
		var allSelect = $('#variable-settings div select')
		/*
		allSelect.filter(function(x, elem) { return $(elem).val() == 0}).each(
			function() {
				html = ""
				for(var i = 0; i <= hrsLeft; ++i) {
					html += "<option>" + (i) + "</option>"
				}
				$(this).html(html)
			}
		)*/
	})

}

$(function() {
	createUi()
})