const currentChildren = document.getElementById('current-container').children;
const detailDivs = document.getElementById('detail-values-container').children;
const errorPopup = document.getElementById('err-popup');
const errMessageEl = document.getElementById('err-message');
const dayEl = document.getElementById('current-day');
const hourEl = document.getElementById('current-hour');
const closeErr = document.getElementById('close-err');
function loadMain(data,day,hour,units){
    [...currentChildren].forEach(el=>{
        if(el.id === 'description' || el.id==='feelslikemin' || el.id==='feelslikemax'){
            el.textContent = `${data.days[day][el.id]}`;
        }
        else if(el.id==='range'){
            [...el.children].forEach(child=>child.textContent = data.days[day][child.id]);
        }
        else if(el.id==='temp'){
            el.textContent = `Temp is ${data.days[day].hours[hour][el.id]}${units[el.id]?units[el.id]:''}`;
        }
        else if(el.id==='feelslike'){
            el.textContent = `Feels like ${data.days[day].hours[hour][el.id]}${units[el.id]?units[el.id]:''}`;
        }
        else{el.textContent = `${data.days[day].hours[hour][el.id]}${units[el.id]?units[el.id]:''}`};
    })
}
function loadDetails(data,day,hour,units){
    [...detailDivs].forEach(div=>{
        const p = [...div.children].find(p=>p.classList.contains('detail-value'));
        if(p.id === 'resolvedAddress')p.textContent = data.resolvedAddress;
        else if(p.id === 'sunrise' || p.id === 'sunset' || p.id==='datetime')p.textContent = day[p.id];
        else{
        p.textContent = `${day.hours[hour][p.id]}${units[p.id]? units[p.id]:''}`;
        }
    })
}
export function loadUi(days,data,dayNum,hour,units){
    loadMain(data,dayNum,hour,units);
    loadDetails(data,days[dayNum],hour,units);
    dayEl.textContent = `Day ${dayNum+1}`;
    hourEl.textContent = `Hour ${hour}`
}
export function showError(err){
    errorPopup.classList.remove('hidden');
    errMessageEl.textContent = err;
}
closeErr.addEventListener('click',()=>errorPopup.classList.add('hidden'));