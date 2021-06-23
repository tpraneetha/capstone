const path=require('path')
const express=require('express')
const hbs=require('hbs')
const dotenv = require('dotenv');
const geonames=require('./utils/geonames')
const pixaby=require('./utils/pixaby')
const weatherbit=require('./utils/weatherbit')

dotenv.config();

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const app=express()
const port=process.env.PORT || 2000
//setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather App',
        name:'praneetha'
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address){return res.send({
             error:'you must provide an address'
         })
     }
     geonames(req.query.address,(error,{lat,lon,placeName}={})=>{
        if(error){
           return  res.send({
               error
           })
        }
            weatherbit(lat,lon, (error, forecastdata) => {
                if (error){
                    return  res.send({error})
                }
                res.send({
                    forecast:forecastdata,
                    
                    address:req.query.address

                })
                
              })
    }    
    )
})

app.get('*',(req,res)=>{
    res.render('404page',{
        msg:'page not found',
    })
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})