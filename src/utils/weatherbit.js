
let request=require('request')

const weatherbit=(n1,n2,callback)=>{
    
const url='https://api.weatherbit.io/v2.0/current?lat='+n1+'&lon='+n2+'&key='+process.env.WEATHERBIT_API_KEY+'&include=minutely'
request({url:url,json:true},(error,response)=>{

    if(error){
    
        
        callback('Unable to connect to weather service!',undefined)
     }else if(response.body.error){
 
        callback('Unable to find location', undefined)
     }else{
 
 
        callback(undefined,{highTemp:response.body.data[0].temp
        ,lowTemp:response.body.data[0].app_temp,precip:response.body.data[0].precip,
        weather:response.body.data[0].weather.description
         
 })

 
}
})
}
module.exports=weatherbit