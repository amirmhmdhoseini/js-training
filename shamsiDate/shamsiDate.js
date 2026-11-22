const JalaliDate = require('jalali-date')

function todayDate(){
    const today = new JalaliDate;
    console.log(today.date)
}

todayDate()