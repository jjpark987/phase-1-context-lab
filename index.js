const a = ['Teddy', 'Park', 'Dog', 10]
const b = ['Jay', 'Park', 'Dog', 30]
const c = ['Lucky', 'Park', 'Dog', 20]

const d = '2000-01-01 0800'

// Create the employee object
const createEmployeeRecord = function (initialInfo) {
    return {
        firstName: initialInfo[0],
        familyName: initialInfo[1],
        title: initialInfo[2],
        payPerHour: initialInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (initialInfoArray) {
    return initialInfoArray.map(initialInfo => {
        return createEmployeeRecord(initialInfo)
    })
}

// Add the time-in and time-out events to the employee object
const createTimeInEvent = function (dateStamp) {
    const dateTime = dateStamp.split(' ')
    const event = {
        type: 'TimeIn',
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    this.timeInEvents.push(event)
    return this
}

const createTimeOutEvent = function (dateStamp) {
    const dateTime = dateStamp.split(' ')
    const event = {
        type: 'TimeOut',
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    this.timeOutEvents.push(event)
    return this
}

const hoursWorkedOnDate = function (date) {
    let timeOutHour
    this.timeOutEvents.find(event => {
        if(event.date === date) {
            timeOutHour = event.hour
        }
    })
    let timeInHour
    this.timeInEvents.find(event => {
        if(event.date === date) {
            timeInHour = event.hour
        }
    })
    return (timeOutHour - timeInHour) / 100
}

const wagesEarnedOnDate = function (date) {
    const hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
}

const findEmployeeByFirstName = function (employeeRecords, firstName) {
    return employeeRecords.find(employee => {
        if(employee.firstName === firstName) {
            return employee
        }
    })
}

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

