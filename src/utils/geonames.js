
let request=require('request')
const geonames=(address,callback)=>{
    console.log(process.env.GEONAMES_USERNAME);
    const url='http://api.geonames.org/postalCodeLookupJSON?placename='+address+'&username='+process.env.GEONAMES_USERNAME
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services',undefined);
        }
        else if(!response.body.postalcodes){
            callback('not found',undefined);
        }
        else{
            
            callback(undefined,{
              pl: response.body.postalcodes[0].placeName,
            lat:response.body.postalcodes[0].lat,
            lon: response.body.postalcodes[0].lng
        })
        }
        
})
    }
    module.exports=geonames