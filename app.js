const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/GBWeather",function(req,res){
    console.log(req.body);
    var cityName=req.body.city;
    if(req.body.unit=="celcius"){
    var unit="metric"
    }
    if(req.body.unit=="farenheit"){
        
    }
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+ "&units="+unit+"&appid=fbb79bc59a506380c7b73fdd0a42738d";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            var heading="<h1>The current temperature of "+ cityName+ " is= " + temp+" </h1> "
            res.send(heading);
        })
    })
    // res.sendFile(__dirname+"/post.html");
})


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

//     https.get(url,function(response){
//         console.log(response.statusCode);
//         response.on("data",function(data){
//             // console.log(data);
//           const weatherData= JSON.parse(data);
//           const temp=weatherData.main.temp;
//         //   console.log(weatherData);
//         console.log(temp);
//         const weatherDescription=weatherData.weather[0].description;
//         console.log(weatherDescription);
//         res.send("The Temperature in ")
//         })
//     });



//     res.send("Hi Gopal!");
// })

























app.listen(3000,function(){
    console.log("Server Started on port 3000....");
})
