console.log('client side js');



  const weatherForm=  document.querySelector('form')
  const search=document.querySelector('input')
  const message1=document.querySelector('#message1')
  const message2=document.querySelector('#message2')
 
  weatherForm.addEventListener('submit',(e)=>{
      e.preventDefault()
      const location=search.value
      message1.textContent='loading...'
          message2.textContent=''
      fetch('/weather?address='+location ).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
            message1.textContent=data.error
           }else{
            console.log(data);
            message1.textContent=data.location
            const stringifiedData=JSON.stringify(data.forecast)
            message2.textContent=stringifiedData
        // console.log(data.forecast);
        
           
        }})
    })
  })
