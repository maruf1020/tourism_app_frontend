
import moment from 'moment';

function isInt(data) {
    if (data === '') return true
    var regex = /^[0-9]+$/;
    if (data.match(regex))
        return true;
    return false
}

function isFloat(data) {
    if (data === '') return true
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (rx_live.test(data))
        return true
    return false

}

function isValidDate(data) {
    if (isNaN(data.getTime()))
        return false

    return true
}

function convertToDate(data) {
    const newDate = moment(data, ["h:mm A"]).toDate();
    return newDate
}

function get12HourFormateTime(date) {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}


function compareTwoDate(date1, date2) {
    return date2 > date1
}

function dateAsString(date) {
    return moment(date).format("MM/DD/yy"); // 10/22/2021
}

function getTomorrowDate(){
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow    
}

function getYesterdayDate(){
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday    
}

function removeDuplication(objectList) {
    const objectMap = {}

    const newList = objectList.filter((singleObject) => {
        if (objectMap[JSON.stringify(singleObject)] === true) return false

        objectMap[JSON.stringify(singleObject)] = true
        return true
    })

    return newList
}

function removeSpace(str) {
    if (!str) return;
    return str.replace(/\s+/g, '')
};


async function awaitSomeTime(awaitTimeInMilli) {
    await new Promise(resolve => setTimeout(resolve, awaitTimeInMilli));
};

export default {
    isInt,
    isFloat,
    compareTwoDate,
    isValidDate,
    convertToDate,
    removeDuplication,
    get12HourFormateTime,
    removeSpace,
    dateAsString,
    awaitSomeTime,
    getTomorrowDate,
    getYesterdayDate
}