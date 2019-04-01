
var setBDayButton = document.getElementById("setBDayButton")


function createUI() {
	var birthDate = localStorage.getItem('LC_BirthDate')
	$('#add-date-view').hide()
	if(birthDate == null) {
		$("#time-view").hide()
		$("#setup-view").show()
	} else {
		$("#setup-view").hide()
		addContent()
	}
	$("#setBirthDateButton").on("click", function() {
		var birthDate = new Date($("#bDayTextInput").val())
		localStorage.setItem('LC_BirthDate', birthDate)
		console.log("Setting LC_BirthDate to " + birthDate)
		$("#time-view").show()
		$("#setup-view").hide()
		addContent()
	})
	
	$("#header #add-date-button").on("click", function() {
		$("#time-view").hide()
		$("#add-date-view").show()
		$('#date-added-msg').hide()
	})
	$("#add-date-view #add-date-button").on("click", function() {
		var entryNames = localStorage.getItem('LC_EntryNames')
	
		console.log("EntryNames: " + entryNames)

		var name = $('#nameTextInput').val()
		var date = new Date($('#addDateTextInput').val())
		var errMsgs = []

		if(!isValidName(name)) {
			errMsgs.push("Invalid name.")
		}

		if(!isValidDate(date)) {
			errMsgs.push("Invalid date.")
		}

		if(errMsgs.length == 0) {
			var nameKey = "LC_" + name
			var storedKey = localStorage.getItem(nameKey)
			if(storedKey == null) {
				if(entryNames == null) {
					localStorage.setItem('LC_EntryNames', nameKey)
				} else {
					entryNames += ',' + nameKey
					localStorage.setItem('LC_EntryNames', entryNames)
				}
			}
			localStorage.setItem(nameKey, date)
			console.log("Stored " + nameKey + " with  value of " + date)
			$('#date-added-msg').show().fadeOut(8000)
		} else {
			console.log("Errors: " + errMsgs)
		}
	})
	$("#add-date-view #back-button").on("click", function() {
		$("#add-date-view").hide()
		$("#time-view").show()
		addContent()
	})

	$('#settings-button').on('click', function() {
	  if (chrome.runtime.openOptionsPage) {
	    chrome.runtime.openOptionsPage();
	  } else {
	    window.open(chrome.runtime.getURL('options.html'));
	  }
	});
}

function isValidName(name) {
	return name != ''
}

function isValidDate(date) {
	return date != "Invalid Date"
}
/*
function getLifeTimes() {

	return "Time left in life: " + calcTimeLeftInLife()
}*/
function htmlWrapper(title, value, unit) {
	return "<div><h3>"+ title + "</h3>" + "<p>Time left: " + 
			value +  " " + unit + 
			"</p></div>\n"
}

function htmlWrapperCustom(id, title, date, value, unit) {
	return "<div><h3>"+ title + "</h3>" + "<p>Date: " + date + "</p><br/><p> Time left: " + 
			value +  " " + unit + 
			"</p><button id=\"" + id + "\"class=\"ui-button remove-btn\">Remove</button></div>\n"
}
function addContent() {
	var html = 
	getLifeTimes() +   
	getYearTimes() +
	getQuarterTimes() +
	getMonthTimes() +
	getWeekTimes()

	var entryNames = localStorage.getItem('LC_EntryNames')
	if(entryNames != null) {
		entryNames = entryNames.split(',')
		console.log("len: " + entryNames)
		for(i = 0; i < entryNames.length; ++i) {
			var key = entryNames[i]

			console.log("Key: " + key + " value: " + localStorage.getItem(key))
			var date = new Date(localStorage.getItem(key))
			console.log("date: " + date)
			var name = key.slice(3, key.length)
			html += getCustomTimes(name, date)
		}
	}
	console.log("html: \n" + html)
	$("#time-container span").html(html)
	$("#time-container .remove-btn").on("click", function() {
		var entryNames = localStorage.getItem("LC_EntryNames")
		entryNames = entryNames.split(",")
		var name = $(this).attr("id")
		var newEntryNames = entryNames.filter(function(e) {return e != name})
		console.log("newEntryNames: " + newEntryNames)
		localStorage.setItem("LC_EntryNames", newEntryNames)
		localStorage.removeItem(name)
		$(this).parent().remove()
	})

}
var unit = "hrs"
function getLifeTimes() {
	var birthDate = new Date(localStorage.getItem("LC_BirthDate"))
	console.log("birthDate: " + birthDate)
	if(birthDate != null)
		return htmlWrapper("Life", calcTimeLeftInLife(birthDate), unit)
	else
		return null 
}

var hr = "hours "
function getYearTimes() {
	var fromDate = new Date(Date.now())

	return htmlWrapper("Year",calcTimeLeftInYear(fromDate), unit)
}

function getQuarterTimes() {
	var fromDate = new Date(Date.now())

	return htmlWrapper("Quarter", calcTimeLeftInQuarter(fromDate), unit)
}

function getMonthTimes() {
	var fromDate = new Date(Date.now())

	return htmlWrapper("Month", calcTimeLeftInMonth(fromDate), unit)
}

function getWeekTimes() {
	var fromDate = new Date(Date.now())

	return htmlWrapper("Week", calcTimeLeftInWeek(fromDate), unit)
}
function getCustomTimes(name, date) {
	return htmlWrapperCustom("LC_" + name, name, date, calcTimeRemaining(new Date(Date.now()), date), unit)
}

$(
	function() {
		$("#bDayTextInput").datepicker({
			changeYear: true,
			yearRange: "1900:2025"
		})
		$("#addDateTextInput").datepicker({
			changeYear: true,
			yearRange: "1990:2100"
		})
		createUI()
	}
)
