
const request=require('request')
const forecast=(n1,n2,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5384e9ed32b2a6cb3da7cf70e05d62f0&query='+n1+','+n2 +'&units=f'
    request({ url:url, json:true}, (error,response) =>{

        if(error){
    
        
           callback('Unable to connect to weather service!',undefined)
        }else if(response.body.error){
    
           callback('Unable to find location', undefined)
        }else{
    
    
           callback(undefined,{temp:response.body.current.temperature,
            rain:response.body.current.precip
    })

    
}})
}




module.exports=forecast