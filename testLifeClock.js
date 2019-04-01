
function genTestStartMsg(name) {
	return "Running test: " + name
} 

//Tests
/*************************************************/
function testDate() {
	var d1 = new Date("6 3 2019")
	console.log("d1: " + d1)
	var d2 = new Date("2019")
	console.log("d2: " + d2)	
	var d3 = new Date(2019,3, 1, 0, 0)
	console.log("d3: " + d3)
	console.log("Now: " + new Date(Date.now()))
	console.log((new Date("2500").getTime()))
	console.log((new Date(2500 + "").getTime()))
	//var d4 = new Date(d3)
	//d4.setDate(d4.getDay() + 1)
	//console.log("d4: " + d4)
	var d5 = new Date(Date.now())
	console.log("d5: " + d5)
	console.log("hours of d5: " + d5.getHours() + "day: " + d5.getDay())

}
function testToDateString() {
	console.log(genTestStartMsg("testToDateString"));
	var date = new Date("4 3 2019") // March 4, 2019
	console.log(toDateString(date))
}

function testcalcTimeRemaining() {
	console.log(genTestStartMsg("testcalcTimeRemaining"))
	var msgBase = "Time remaining until ";
	var toDate = new Date("2020")
	console.log(msgBase + toDate + ": " +calcTimeRemaining(toDate) +" hours");
}

function testCalcTimeRemainingInLife() {
	console.log(genTestStartMsg("testCalcTimeRemainingInLife"));
	var msgBase = "Time remaining in life: "
	var birthDate = new Date("12 11 1991")
	var left = calcTimeLeftInLife(birthDate);
	console.log(msgBase + left +" hours");
	var now = calcTimeLeftInLife(new Date(Date.now()))
	console.log("x: " + (now - left))
	console.log(msgBase + left + " hours");

	console.log("diff in years: " + Math.round((now - left) / (365 * 24)))
}

function testCalcTimeRemainingInYear() {
	console.log(genTestStartMsg("testCalcTimeRemainingInYear"));
	var msgBase = "Time remaining in year: "
	var left = calcTimeLeftInYear(new Date(Date.now()))
	console.log(msgBase +left+" hours");
	console.log("expected: " + (24 * 300))

}

function testCalcTimeRemainingInQuarter() {
	console.log(genTestStartMsg("testCalcTimeRemainingInQuarter"));
	var msgBase = "Time remaining in quarter: "
	var d1 = new Date("1 1 2019")
	var d2 = new Date("12 1 2019")
	var d3 = new Date("6 26 2019")
	console.log(d1 + ", " + msgBase  +calcTimeLeftInQuarter(d1) +" hours");
	console.log("expected: " + (24 * 30 * 3))
	console.log(d2 + ", " + msgBase  +calcTimeLeftInQuarter(d2) +" hours");
	console.log("expected: " + (24 * 30 * 1))
	console.log(d3 + ", " + msgBase  +calcTimeLeftInQuarter(d3) +" hours");
	console.log("expected: " + (24 * 5))


}

function testCalcTimeRemainingInMonth() {
	console.log(genTestStartMsg("testCalcTimeRemainingInMonth"));
	var msgBase = "Time remaining in month: "
	var msgBase = "Time remaining in quarter: "
	var d1 = new Date("1 1 2019")
	var d2 = new Date("12 15 2019")
	var d3 = new Date("6 26 2019")
	console.group("testCalcTimeRemainingInMonth")
	console.log(d1 + ", " + msgBase  +calcTimeLeftInMonth(d1) +" hours");
	console.log("expected: " + (24 * 30))
	console.log(d2 + ", " + msgBase  +calcTimeLeftInMonth(d2) +" hours");
	console.log("expected: " + (24 * 15))
	console.log(d3 + ", " + msgBase  +calcTimeLeftInMonth(d3) +" hours");
	console.log("expected: " + (24 * 4))
	console.groupEnd()
}

function testCalcTimeRemainingInWeek() {
	console.log(genTestStartMsg("testCalcTimeRemainingInWeek"));
	var msgBase = "Time remaining in week: "
	var d1 = new Date(2019, 2, 7)
	var d2 = new Date(2019, 2, 7, 12)
	var d3 = new Date(2019, 2, 7, 12, 15)
	var d4 = new Date(2019, 2, 7, 23, 45)
	console.group("testCalcTimeRemainingInWeek")
	console.log(d1 + ", " + msgBase  +calcTimeLeftInWeek(d1) +" hours");
	console.log("expected: " + (24 * 3))
	console.log(d2 + ", " + msgBase  +calcTimeLeftInWeek(d2) +" hours");
	console.log("expected: " + (24 * 2 + 12))
	console.log(d3 + ", " + msgBase  +calcTimeLeftInWeek(d3) +" hours");
	console.log("expected: " + (24 * 2 + 11))
	console.log(d4 + ", " + msgBase +calcTimeLeftInWeek(d4) +" hours");
	console.log("expected: " + (24 * 2))
	console.groupEnd()

}

function testStorage() {
		console.log(genTestStartMsg("testStorage"));
	localStorage.setItem('LCBirthDate','11 12 1991')

	var birthDate = localStorage.getItem('LCBirthDate')

	console.log("LCBirthDate: " + birthDate)

	var nonExistent = localStorage.getItem('x')

	console.log("nonExistent: " + nonExistent)
	// Clean up
	localStorage.removeItem('LCBirthDate')

	var customDates = []
	customDates.push(new Date("11 12 1991"))
	customDates.push(new Date("11 13 1991"))
	customDates.push(new Date("11 14 1991"))

	localStorage.setItem('LCCustomDates', customDates)
	var x = localStorage.getItem('LCCustomDates').split(',')
	console.log(x[2])
	console.log(typeof x)
	console.log(new Date(x[1]).getYear())

	var invalidDate = new Date("")
	console.log("invalidDate: " + invalidDate)
}
function otherTests() {

	
}
function runTests() {
	//testToDateString()
	//testcalcTimeRemaining()
	//testDate()
	testCalcTimeRemainingInLife()
	/*
	testCalcTimeRemainingInYear()
	testCalcTimeRemainingInQuarter()
	testCalcTimeRemainingInMonth()
	*/
	//testCalcTimeRemainingInWeek()
	testStorage()
}

runTests()