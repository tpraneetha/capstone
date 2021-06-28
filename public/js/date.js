

          function current(depDate) {


            const now=new Date()
            function formatDate(date,format){
                const map = {
                    yyyy: date.getFullYear(),
                    mm: date.getMonth() + 1,
        dd: date.getDate(),
                }
            
                return format.replace(/yyyy|mm|dd/gi, matched => map[matched])
            }
            let now1=formatDate(now,"yyyy-mm-dd")
            console.log(now1);
            now1 = now1.split("-");
        var newDate = new Date( now1[2], now1[1] - 1, now1[0]);
        // console.log(newDate.getTime());


            let then = depDate
                    // console.log(then);
            
        
        then=then.split('-')
        var newDate2=new Date(then[2],then[1]-1,then[0])
        // console.log(newDate2.getTime());
        const diffTime=newDate2 -newDate
        // console.log(diffTime);
        const diff = (diffTime / (1000 * 60 * 60 * 24)); 
        // // const diffDays=4
        // console.log(diff + " days");
        
        
              return diff
          }
          export {current}