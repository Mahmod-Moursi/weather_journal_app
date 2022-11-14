// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear(); // Added a one to the month so that they are sorted correctly

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=743dfdd39fde958688d73ca5f35a4301&units=metric'; // Note that adding '&units=metric' after the api code makes the returned temperature in celsius 

// Event listener to add function to an existing HTML DOM element
document.getElementById('generate').addEventListener('click',performAction);

/* Function called by the event listener above */
function performAction(e){
    // Getting the entered zip code by the user and storing it in a constant
    const newZip = document.getElementById('zip').value;
    // Getting the entered feeling text by the user and storing it in a constant
    const feelings = document.getElementById('feelings').value;
    // Execute the getWeather function
    getWeather(baseURL,newZip,apiKey)

        .then(function(data) {
            // show the returned data in the console (for debugging purposes)
            console.log(data);
            // Add data to POST request using the function below (the date, temperature and feelings)
            postData('/add', {date : newDate, temp : data.main.temp , content : feelings}) // Note to self, remember that the temperature is within the main
            // Update the UI with the recent information using the updateUI function
            .then(() => updateUI());
        } )

};

/* Function to GET web API data */
// The getWeather function is executed when the generate button is clicked
const getWeather = async (baseURL,zip,key)=>{

    const res = await fetch(baseURL+zip+key)
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error",error);
    }

}

/* Function to POST data */
// Sends to the server via the url and the data has the data, temperature and feelings
const postData = async ( url = '' , data = {})=>{
    console.log(data); // show the data in the console (for debugging purposes)
    const response = await fetch (url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type is supposed to match the 'Content-Type' header
        body: JSON.stringify(data) //Create JSON string from a JS object
    });
    try {
        const newDate = await response.json();
        console.log(newDate);
        return newDate;
    }catch(error){
        console.log("error",error);
    }
}

/* Function to GET project Data */
// Sends the get request to get data from the server thru the 'all' route
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        // Update the HTML DOM elements with the values that came from the server
        document.getElementById('date').innerHTML = `The Date: ${allData.date}`; 
        document.getElementById('temp').innerHTML = `The Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `My feelings: ${allData.content}`;
    }catch(error){
        console.log("error",error);
    }
}
