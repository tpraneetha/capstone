const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJhbmVldGhhdGlydXBhdGhpIiwiYSI6ImNrcGQwN3JkZjA4ZTEybnQ2dWNjbmowYjkifQ.uO3wiCKrtEIp3h3iY6vsiw'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services',undefined);
        }else if(!response.body.features){
            callback('not found',undefined);
        }
        else{
            
            callback(undefined,{
                placeName:response.body.features[0].place_name,
            lat:response.body.features[0].center[1],
            lon: response.body.features[0].center[0]})
        }
    })
}
module.exports=geocode