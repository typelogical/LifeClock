
function calcTimeRemaining(fromDate, toDate) {
	console.log("Calculating time remaining between: " + fromDate + " to " + toDate)
	var toTime = toDate.getTime(), fromTime = fromDate.getTime()
	if(toTime < fromTime) return 0
	var milliSeconds = toTime - fromTime;
	console.log("milliSeconds: " + milliSeconds)
	var hrToMilliSecs = 60 * 60 * 1000 
	var hours = milliSeconds / hrToMilliSecs

	return Math.round(hours)
}

function toDateString(date) {
	return date.getMonth() + "-" + date.getDate() + "-" + 
	(1900 +  date.getYear())
}

function calcTimeLeftInLife(birthDate) {
	var currDate = new Date(Date.now())
	var yearsInLife = 100
	if(birthDate < currDate) {
		var yearsLived = currDate.getYear() - birthDate.getYear()
		console.log("yearsLived: " + yearsLived)
		var expectedDeathDate = 
		new Date(
			"" + (currDate.getFullYear() + (yearsInLife - yearsLived))
		)
		return calcTimeRemaining(new Date(Date.now()), expectedDeathDate) 
	}
	return 0
}

function calcTimeLeftInYear(fromDate) {
	var year = fromDate.getFullYear()
	var toDate = new Date((year + 1) + "")	
	return calcTimeRemaining(fromDate, toDate)
}

function calcTimeLeftInQuarter(fromDate) {
	var month = fromDate.getMonth();
	var monthsRemainingInQtr = (month + 1) % 3
	var toDate

	if(month < 8) {
		nextQtr = month + monthsRemainingInQtr + 2 
		toDate = new Date(fromDate.getFullYear(), nextQtr, 1)
		console.group("calcTimeLeftInQuarter")
		console.log(toDate)
		console.groupEnd()
	} else {
		toDate = new Date((fromDate.getFullYear() + 1) + "")
	}
	return calcTimeRemaining(fromDate, toDate)
}

function calcTimeLeftInMonth(fromDate) {
	var toDate
	var month = fromDate.getMonth()
	if(month < 11) {
		toDate = new Date(fromDate.getFullYear(), (fromDate.getMonth() + 1) + "")
	} else {
		toDate = new Date((fromDate.getFullYear() + 1) + "")
	}

	return calcTimeRemaining(fromDate, toDate)
}

function calcTimeLeftInWeek(fromDate) {
	var week = fromDate.getDay()
	console.log("week: " + week)
	var daysRemainingInWeek = 6 - week
	var minutesToHr = Math.round(.30 + fromDate.getMinutes() / 100)
	console.log(minutesToHr)
	var hoursRemainingToday = 24 - 
		(fromDate.getHours() + minutesToHr) 
	return daysRemainingInWeek * 24 + hoursRemainingToday

}

function addDateToCustomPeriods() {

}


