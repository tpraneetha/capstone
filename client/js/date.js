var moment=require('moment')
function current(depDate){
    const now=moment()   
 console.log(now);
 let then = document.querySelector('#departure').value
 console.log(then);
 const ms = 
 moment(then,"DD/MM/YYYY").diff(moment(now,"DD/MM/YYYY"));
 const duration = duration(ms, 'milliseconds');
 const dif = duration.asDays();
 console.log(dif);
 return diff
 }
 

  
          export {current}