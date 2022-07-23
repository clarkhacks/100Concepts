function getTodaysDate() {
    const d = new Date();
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const daySuffix =
        d.getDate() +
        (d.getDate() % 10 == 1 && d.getDate() != 11 ?
            "st" :
            d.getDate() % 10 == 2 && d.getDate() != 12 ?
            "nd" :
            d.getDate() % 10 == 3 && d.getDate() != 13 ?
            "rd" :
            "th");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let day = weekday[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    document.getElementById("todaysDate").innerHTML = day + " " + month + " " + daySuffix + ", " + year;
}

//   get current time
function getCurrentTime() {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    document.getElementById("currentTime").innerHTML = hours + ":" + minutes;
}
//get today's date
getTodaysDate();
//update time every second
setInterval(getCurrentTime, 1000);