var today = new Date();
var month = today.getMonth();
var day = today.getDate();
var year = today.getFullYear();
var m = month;
var y = year;
console.log(day + '/' + month + '/' + year)
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December'];

/* 
Function to check if any year is a leap year. 
If yyyy is divisible by 4 check if it is a century year.
Century years need to be divisble by 400 as well to be leap years.
*/
function isLeapYear(yyyy) {
    let isLeap = false;
    if(yyyy % 4 == 0){
        if( yyyy % 100 == 0){
            if ( yyyy % 400 == 0)
                isLeap = true;
        } else {
            isLeap = true;
        }
    } 
    return isLeap;
}

// Check if current year is a leap year
var isLeap = isLeapYear(y)
if (isLeap) 
    days[1] = 29
else 
    days[1] = 28


/* 
Function for 'previous'-month button 
Decrement the month and adjust the current year if needed
*/
function prevBtnClick() {
    if (y>1970 || m>0) {
        m -= 1;
        if (m == -1) {
            m = 11;
            y -= 1;
        }
        isLeap = isLeapYear(y)
        if (isLeap) days[1] = 29
        else days[1] = 28
        loadMonth();
    }
}

/* 
Function for 'next'-month button
Increment month and adjust current year if needed 
*/
function nextBtnClick() {
    m += 1;
    if (m == 12) {
        m = 1;
        y += 1;
    }
    isLeap = isLeapYear(y)
    if (isLeap) days[1] = 29
    else days[1] = 28
    loadMonth();
    
    console.log(days[m]);
}

/* 
Function for 'today' button
Go back to current date
*/
function todayBtnClick() {
    today = new Date();
    month = today.getMonth();
    day = today.getDate();
    year = today.getFullYear();
    m = month;
    y = year;
    isLeap = isLeapYear(y)
    if (isLeap) 
        days[1] = 29
    else 
        days[1] = 28
    loadMonth();
}


var selectedDay = null;
function selectDay(evt){
    if (selectedDay == null) {
        selectedDay = evt.currentTarget.innerHTML;
        var btn = document.getElementById("btn" + selectedDay);
        if (btn.getAttribute("class") != "selected") {
            if (btn.getAttribute("class") == "active") {
                btn.setAttribute("class", "selectedActive");
            } else {
                btn.setAttribute("class", "selected");
            }
        } else {
            btn.setAttribute("class", "daysBtn");
        }
    } else {
        var btn = document.getElementById("btn" + selectedDay);
        if (selectedDay == day && m == month && y == year) { 
            console.log("hey")
            btn.setAttribute("class", "active");
        } else { 
            btn.setAttribute("class", "daysBtn");
        }
        selectedDay = null;
        selectDay(evt);
    }

}

/* 
Function for displaying the selected (or current) month
*/
function loadMonth() { 
    var currentMonth = document.getElementById('currentMonth');
    currentMonth.innerHTML = months[m] + 
                            '<br><span style=\"font-size:18px\">' + 
                            y + '</span>'
    
    var dTable = document.getElementById('mDays');
    var new_tbody = document.createElement('tbody');
    new_tbody.setAttribute('id', 'mDays')
    let nRows = Math.floor(days[m]/7) +1
    let d = 1
    for(i=0; i<nRows; i++) {
        var row = new_tbody.insertRow(-1);
        for(j=0; j<7; j++) {
            var cell = row.insertCell(j);
            if (d <= days[m])
                cell.innerHTML = "<button id='btn" + d + "' class='daysBtn'>" + d + "</button>";
            else 
                cell.innerHTML = "<button class='daysEmpty'></button>";
            
            if (d == day && y == year && m == month) {
                cell.setAttribute('id', 'activeDay');
                cell.innerHTML = "<button id='btn" + d + "' class='active'>" + day + "</button>";
            }
            d++;
        }
    }
    dTable.parentNode.replaceChild(new_tbody, dTable);

    d = 1
    for (d=1; d<=days[m]; d++) {
        id = "btn" + d
        var btn = document.getElementById(id);
        btn.addEventListener('click', selectDay);
    } 
}



/*
Event listener triggered when all DOM content has loaded.
Handles the first time the page is opened and adds event-listeners
for on-click events of the buttons.
Finally, the current time is set.
*/
document.addEventListener("DOMContentLoaded", function() { 
    
    loadMonth()

    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var todayBtn = document.getElementById('todayBtn');

    prevBtn.addEventListener('click', prevBtnClick);
    nextBtn.addEventListener('click', nextBtnClick);
    todayBtn.addEventListener('click', todayBtnClick);
  
});



    
