let request=require('request')

const pixaby=(address,callback)=>{
const url='https://pixabay.com/api/?key='+process.env.PIXABAY_API_KEY+'&q='+address+'&image_type=photo&pretty=true'
request({url:url,json:true},(error,response)=>{
    if(error){
        callback('unable to connect to location services',undefined);
    }
    else if(!response.body.hits[0]){
        callback('not found',undefined);
    }
    else{
        
        callback(undefined,{
            placeName:response.body.hits[0].pageURL
        })
    }
})
}

module.exports=pixaby