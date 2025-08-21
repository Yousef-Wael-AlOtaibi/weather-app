import { showError  } from "./ui.js";
const key = '78VXK83JGHH3HA9V4EBR7AQ2V';
const getData = async (details) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${details}?key=${key}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data
    }
    catch(err){
        showError(`Error: "${document.getElementById('city-input').value}" is NOT a real city, country, or state! Enter a real city, country, or state!`);
    }
}
export default getData