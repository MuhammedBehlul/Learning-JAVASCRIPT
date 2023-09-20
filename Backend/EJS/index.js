import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {

    var currentDate = new Date();
    var dayOfWeek = currentDate.getDay();
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var dayName = daysOfWeek[dayOfWeek];
    let dayTypem = 'Weekday';
    let advice = 'It is time to work hard!';

    if (dayOfWeek == 0 || dayOfWeek == 6) {
        dayType = 'Weekend';
        advice = 'It is time to relax!';
    }

    console.log("Today is " + dayName);

    res.render('index.ejs', {
        title: 'Home Page',
        dayType: dayTypem,
        advice: advice
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

