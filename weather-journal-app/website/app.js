/* Global Variables */
const apiKey = '&appid=af564acf69487dd8e820a8880c923a2a';  //my own API key
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



document.getElementById('generate').addEventListener('click', performAction);

//The action of button when clicked
function performAction(e){
const newWeather =  document.getElementById('zip').value;    //to get zip code
const content = document.getElementById('feelings').value;    //to get content of text area
getWeather(baseURL,newWeather, apiKey)
.then(data => {
    console.log(data); 
    postData('/addWeather',{temperature:data.main.temp,date:newDate,dataEntry:content});
    updateUI();
    
  });
};

//To get Data from the openweathemap
const getWeather = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {

    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error); 
  }
}

// Async POST 
const postData = async ( url = '',data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
//To Update DOM elements
const updateUI = async()=>{
    const request = await fetch('/route');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = "Date is : " + allData[0].date;
        document.getElementById('temp').innerHTML = "<br>Temprature is :" +allData[0].temperature+"<br>";
        document.getElementById('content').innerHTML = "Data Entry is : " +allData[0].entry;
        
    }
    catch(error) {
    console.log("error", error);
    }
}
