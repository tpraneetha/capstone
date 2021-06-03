const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const app=express()
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
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather app',
        name:'praneetha'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'help help',
        title:'Help page',name:'praneetha'
    })
})
app.get('/weather',(req,res)=>
{
    if(!req.query.address){return res.send({
             error:'you must provide an address'
         })
     }
     geocode(req.query.address,(error,{lat,lon,placeName}={})=>{
        if(error){
           return  res.send({
               error
           })
        }
            forecast(lat,lon, (error, forecastdata) => {
                if (error){
                    return  res.send({error})
                }
                res.send({
                    forecast:forecastdata,
                    location:placeName,
                    address:req.query.address

                })
                
              })
    }    
    )
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        msg:'Help article not found',title:'Help page',name:'praneetha'
    })
})
app.get('*',(req,res)=>{
    res.render('404page',{
        msg:'page not found',title:'Help page',name:'praneetha'
    })
})
const port=8080
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})