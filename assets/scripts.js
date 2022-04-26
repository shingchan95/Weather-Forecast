var searchButton = document.getElementById("searchBut")
var searchInput = document.getElementById("searchIn")
var img =  document.createElement('img')
var img1 =  document.createElement('img')

var img2 =  document.createElement('img')
var img3 =  document.createElement('img')
var img4 =  document.createElement('img')
var img5 =  document.createElement('img')

var src= document.getElementById("imageIcon0")
var src1= document.getElementById("imageIcon1")


var displaySwitch= document.getElementById("displaySwitch")



var src2= document.getElementById("imageIcon2")
var src3= document.getElementById("imageIcon3")
var src4= document.getElementById("imageIcon4")
var src5= document.getElementById("imageIcon5")
var cityName;



var ul = document.getElementById('searchList');
var listItems = ul.getElementsByTagName('li');
var searchList = document.querySelectorAll("#searchList li")

var cityValue = [];

//var sN = localStorage.length;

function cityHistory() {

    var cityStorage=JSON.parse(localStorage.getItem("cityN"))

     if(window.localStorage.length ==0){
         return
     }
     else{
        var cL= cityStorage.length-1
        var check1=document.getElementById("check1") 
        var check2=document.getElementById("check2") 
        var check3=document.getElementById("check3") 
        var check4=document.getElementById("check4") 
        var check5=document.getElementById("check5") 
     

        check1.textContent= cityStorage[cL]  
        check2.textContent= cityStorage[cL-1]  
        check3.textContent= cityStorage[cL-2]  
        check4.textContent= cityStorage[cL-3]  
        check5.textContent= cityStorage[cL-4]  
  

        
        if(check2.textContent!==""){    
            check2.classList.add("list-group-item")   
        }
        if(check3.innerHTML!==""){
            check3.classList.add("list-group-item")   
        }
        if(check4.innerHTML!==""){
            check4.classList.add("list-group-item")   
        }
        if(check5.innerHTML!==""){
            check5.classList.add("list-group-item")   
        }
        if(check1.innerHTML!==""){
            check1.classList.add("list-group-item")   
        }  
    }

}

cityHistory()

for (i=0; i<searchList.length;i++){
     
    searchList[i].onclick= function(){
        document.getElementById("searchIn").value = this.innerHTML;
        searchButton.click();
    }

}

searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

      searchButton.click();
    }
  });


searchButton.addEventListener("click", function(){
    
    

    var api="https://api.openweathermap.org/geo/1.0/direct?q="   
    var city = searchInput.value;
    var key= "&appid=137f617b3a8be25de11fcd61cb376091";        
    var latlonURL= api+city+key;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    
    fetch(latlonURL, requestOptions)
    .then(function(response) {
        if (response.status === 404) {
            return   
        }       
        else{
           
            return response.json()      
        }
    })
    .then(function(coorResult){
        
        var weatherAPI="https://api.openweathermap.org/data/2.5/onecall?"
        var cityLat= coorResult[0].lat
        var cityLon= coorResult[0].lon
        var units = "metric"
        var part= "hourly,minutely,alerts"
        cityName= coorResult[0].name

             
        var weatherURL = weatherAPI+ "lat="+cityLat+"&lon="+cityLon+"&units="+units+"&exclude="+part+key
        curCity= document.getElementById("curCity")
        curCity.textContent=("Today in "+coorResult[0].name)



        fetch(weatherURL,requestOptions)
            .then(function(response) {
                if (response.status === 404) {
                    return   
                }       
                else{
                    
                    return response.json()      
                }
            })
            .then(function(data){

                cityValue.push(cityName)        
                localStorage.setItem("cityN",JSON.stringify(cityValue))       
            
            
                displaySwitch.classList.remove("d-none")

              
                curimgData= "http://openweathermap.org/img/wn/"+data.current.weather[0].icon +"@2x.png"
                d1IData= "http://openweathermap.org/img/wn/"+data.daily[1].weather[0].icon +"@2x.png"
                d2IData= "http://openweathermap.org/img/wn/"+data.daily[2].weather[0].icon +"@2x.png"
                d3IData= "http://openweathermap.org/img/wn/"+data.daily[3].weather[0].icon +"@2x.png"
                d4IData= "http://openweathermap.org/img/wn/"+data.daily[4].weather[0].icon +"@2x.png"
                d5IData= "http://openweathermap.org/img/wn/"+data.daily[5].weather[0].icon +"@2x.png"

            
 
                img.src= curimgData 
                img1.src= d1IData
                img2.src= d2IData
                img3.src= d3IData
                img4.src= d4IData
                img5.src= d5IData

                src.appendChild(img)
                src1.appendChild(img1)
                src2.appendChild(img2)
                src3.appendChild(img3)
                src4.appendChild(img4)
                src5.appendChild(img5)
  
                






                var curUv= document.getElementById("curUv");
                var curTemp=document.getElementById("curTemp");
                var curHumid=document.getElementById("curHumid");
                var curWspd=document.getElementById("curWspd");
                var curDate=document.getElementById("curDate")
                var curuvBar = document.getElementById("curuvBar");
                var todaydate =moment().format("L");
                var T1=moment().add(1,'day').format("L");
                var T2=moment().add(2,'day').format("L");
                var T3=moment().add(3,'day').format("L");
                var T4=moment().add(4,'day').format("L");
                var T5=moment().add(5,'day').format("L");

                $(d1D).text(T1+" in "+ cityName)
                $(d2D).text(T2+" in "+ cityName)
                $(d3D).text(T3+" in "+ cityName)
                $(d4D).text(T4+" in "+ cityName)
                $(d5D).text(T5+" in "+ cityName)



                curUv.textContent=("UV index: "+data.current.uvi)
                curTemp.textContent=("Current Temp: "+ data.current.temp+"°C")
                curHumid.textContent=("Current Humidity: "+data.current.humidity +"%")
                curWspd.textContent=("Current Wind Speed: "+data.current.wind_speed+"mph")
                curDate.textContent=("Today Date: "+ todaydate)
              

                if(data.current.uvi<=2){
                    curuvBar.style.backgroundColor= "green"
                    curuvBar.textContent="favorable"
                }
                else if(data.current.uvi>=8){
                curuvBar.style.backgroundColor= "red"
                curuvBar.textContent="severe"                        
                }

                else{
                    curuvBar.style.backgroundColor="yellow"
                    curuvBar.textContent="moderate"
                }

         
                curimgData = "http://openweathermap.org/img/wn/"+data.current.weather[0].icon +"@2x.png"
                
                var d1T= document.getElementById("d1T");
                var d1W= document.getElementById("d1W");
                var d1H= document.getElementById("d1H");
                var d2T= document.getElementById("d2T");
                var d2W= document.getElementById("d2W");
                var d2H= document.getElementById("d2H");
                var d3T= document.getElementById("d3T");
                var d3W= document.getElementById("d3W");
                var d3H= document.getElementById("d3H");
                var d4T= document.getElementById("d4T");
                var d4W= document.getElementById("d4W");
                var d4H= document.getElementById("d4H");
                var d5T= document.getElementById("d5T");
                var d5W= document.getElementById("d5W");
                var d5H= document.getElementById("d5H");
                
                for (i=1; i<6; i++){
                    // var daysI="dayIcon"
                    var daysT="dayTemp"
                    var daysW="dayWdsp"
                    var daysH="dayHumid"
                    
                    
                    eval('var ' + daysT + i + '= ' + data.daily[i].temp.day + ';')
                    eval('var ' + daysH + i + '= ' + data.daily[i].wind_speed + ';')
                    eval('var ' + daysW + i + '= ' + data.daily[i].humidity + ';')
                    
                }
                
                d1T.textContent="Day Time Temp: "+ dayTemp1 +"°C"
                d2T.textContent="Day Time Temp: "+ dayTemp2 +"°C"
                d3T.textContent="Day Time Temp: "+ dayTemp3 +"°C"
                d4T.textContent="Day Time Temp: "+ dayTemp4 +"°C"
                d5T.textContent="Day Time Temp: "+ dayTemp5 +"°C"
                d1W.textContent="Wind Speed Forecast: "+ dayWdsp1+"mph" 
                d2W.textContent="Wind Speed Forecast: "+ dayWdsp2+"mph" 
                d3W.textContent="Wind Speed Forecast: "+ dayWdsp3+"mph" 
                d4W.textContent="Wind Speed Forecast: "+ dayWdsp4+"mph" 
                d5W.textContent="Wind Speed Forecast: "+ dayWdsp5+"mph" 
                d1H.textContent="Humidity Forecast: "+ dayHumid1+"%"
                d2H.textContent="Humidity Forecast: "+ dayHumid2+"%"
                d3H.textContent="Humidity Forecast: "+ dayHumid3+"%"
                d4H.textContent="Humidity Forecast: "+ dayHumid4+"%"
                d5H.textContent="Humidity Forecast: "+ dayHumid5+"%"
                
               
                cityHistory()
            });
        });
    });

    


    
   
   

  
    

    
  






        
    
    

    
        
        
    
    
      
 
               



