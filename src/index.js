import './styles.css';
import { loadUi } from './ui.js';
import getData from './fetch.js';
export const units = {
    windspeed:'Km/h',
    windgust:'Km/h',
    humidity:'%',
    precip:'%',
    sunrise:'AM',
    sunset:'PM',
    pressure:'mb',
    temp:'°F',
    feelslike:'°F'
}
let day = 0;
let hour = 8;
let data;
let loadDate;
const prevDayBtn = document.getElementById('prev-day-btn');
const nextDayBtn = document.getElementById('next-day-btn');
const prevHourBtn = document.getElementById('prev-hour-btn');
const nextHourBtn = document.getElementById('next-hour-btn');
const locationForm = document.getElementById('location-form');
const cityInput = document.getElementById('city-input');
locationForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const res = await getData(cityInput.value);
    if(!res)return;
    data = res;
    if(data){
        loadDate = new Date().getDay();
        if(loadDate)localStorage.setItem('old-date',JSON.stringify(loadDate));
        localStorage.setItem('data',JSON.stringify(data));
        loadUi(data.days,data,day,hour,units)
    };
})
window.addEventListener('load',()=>{
    if(!localStorage.getItem('data') || !localStorage.getItem('old-date'))return;
    data = JSON.parse(localStorage.getItem('data'));
    loadDate = new Date().getDay();
    const oldDate = new Date(JSON.parse(localStorage.getItem('old-date'))).getDay();
    if(loadDate !==  oldDate){
        console.log('get dif date!')
        console.log(`Load Date: ${loadDate}, old Date: ${oldDate}`)
    };
    if(data){
        if(loadDate)localStorage.setItem('old-date',JSON.stringify(loadDate));
        loadUi(data.days,data,day,hour,units)
    };
})
function updateDay(e){
    if(!data)return;
    day += Number(e.target.value);
    if(day<0)day=data.days.length-1;
    if(day>data.days.length-1)day=0;
    console.log(day);
    console.log(data);
    if(data){
        if(loadDate)localStorage.setItem('old-date',JSON.stringify(loadDate));
        loadUi(data.days,data,day,hour,units)
    };
}
function updateHour(e){
    if(!data)return;
    hour += Number(e.target.value);
    if(hour<0)hour=data.days[day].hours.length-1;
    if(hour>data.days[day].hours.length-1)hour=0;
    if(data){
        if(loadDate)localStorage.setItem('old-date',JSON.stringify(loadDate));
        loadUi(data.days,data,day,hour,units)
    };
}
prevDayBtn.onclick = updateDay;
nextDayBtn.onclick = updateDay;
prevHourBtn.onclick = updateHour;
nextHourBtn.onclick = updateHour;