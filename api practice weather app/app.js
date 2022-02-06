const express = require('express');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
app.use(express.urlencoded({ extendet: true}));
const fetch = require('node-fetch');


app.use(express.static(__dirname + '/'));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views'))



app.get('/', (req, res) => {
    res.render('index', {
        city: null,
        des: null,
        icon: null,
        temp: null
    });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3f5c7f4669bdbc486c9ff65870f65aee`;

try {
   await fetch(urlApi)
    .then(res => res.json())
    .then(data => {
        if(data.message === 'city no found') {
           res.render('index', {
               city: data.message,
               des: null,
               icon: null,
               temp: null
           }) 
        } else {
            const city = data.name;
            const des = data.weather[0].description;
            const icon = data.weather[0].icon;
            const temp = data.main.temp;

            res.render('index', {
                city, des, icon, temp
            });
        }

    });
    
    
} 
catch(err) {
res.render('index', {
    city: 'something wrong',
               des: null,
               icon: null,
               temp: null
})
}
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})