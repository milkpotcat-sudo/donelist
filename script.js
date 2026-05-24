/* ========================= */
/* Sleepy Receipt JS */
/* ========================= */

const tasks = [];
const spends = [];

const sheepSignals = [
  "dreamy",
  "moonlit",
  "buffering",
  "zzz...",
  "counting...",
  "offline",
  "sleepy",
  "cozy",
  "drowsy"
];

const messages = [

{
en:"dreams loading...",
jp:"夢を読み込み中…"
},

{
en:"the sheep are waiting",
jp:"羊たちがお待ちです"
},

{
en:"closing today's sleepy receipt",
jp:"本日の眠気レシートを閉じます"
},

{
en:"mental tabs closed successfully",
jp:"脳内タブを正常終了しました"
},

{
en:"daily chaos archived",
jp:"本日のカオスをアーカイブしました"
},

{
en:"connection lost to reality",
jp:"現実との接続が切れました"
},

{
en:"please connect to pillow",
jp:"枕に接続してください"
},

{
en:"too many tabs open in brain",
jp:"脳内タブが開きすぎています"
}

];

/* ========================= */
/* SESSION */
/* ========================= */

const currentSession =
Number(
localStorage.getItem(
"sleepySession"
) || "1"
);

document
.getElementById(
"sessionNumber"
).innerText =
String(currentSession)
.padStart(3,"0");

/* ========================= */
/* RANDOM MESSAGE */
/* ========================= */

const selectedMessage =
messages[
Math.floor(
Math.random()
* messages.length
)
];

document
.getElementById(
"sleepMessage"
).innerText =
selectedMessage.en;

document
.getElementById(
"sleepTranslation"
).innerText =
selectedMessage.jp;

/* ========================= */
/* SHEEP SIGNAL */
/* ========================= */

document
.getElementById(
"sheepSignalText"
).innerText =
`SHEEP SIGNAL ${
sheepSignals[
Math.floor(
Math.random()
* sheepSignals.length
)
]
}`;

/* ========================= */
/* DATE */
/* ========================= */

function updateDate(){

const now =
new Date();

const year =
now.getFullYear();

const month =
String(
now.getMonth()+1
).padStart(2,"0");

const day =
String(
now.getDate()
).padStart(2,"0");

let hour =
now.getHours();

const minute =
String(
now.getMinutes()
).padStart(2,"0");

if(hour < 6){

hour += 24;

}

document
.getElementById(
"dateText"
).innerText =
`${year}/${month}/${day} ${hour}:${minute}`;

}

updateDate();

/* ========================= */
/* MENU */
/* ========================= */

const menuBtn =
document.getElementById(
"menuBtn"
);

const menuPanel =
document.getElementById(
"menuPanel"
);

const doneToggle =
document.getElementById(
"doneToggle"
);

const spendToggle =
document.getElementById(
"spendToggle"
);

const statusToggle =
document.getElementById(
"statusToggle"
);

const donePanel =
document.getElementById(
"donePanel"
);

const spendPanel =
document.getElementById(
"spendPanel"
);

const statusPanel =
document.getElementById(
"statusPanel"
);

menuBtn.onclick = ()=>{

menuPanel.classList.toggle(
"hidden"
);

};

doneToggle.onclick = ()=>{

donePanel.classList.toggle(
"hidden"
);

};

spendToggle.onclick = ()=>{

spendPanel.classList.toggle(
"hidden"
);

};

statusToggle.onclick = ()=>{

statusPanel.classList.toggle(
"hidden"
);

};

/* ========================= */
/* STATUS */
/* ========================= */

const batteryRange =
document.getElementById(
"batteryRange"
);

const brainRange =
document.getElementById(
"brainRange"
);

batteryRange.value =
localStorage.getItem(
"sleepyBattery"
) || 82;

brainRange.value =
localStorage.getItem(
"sleepyBrain"
) || 64;

function makeBar(value){

const filled =
Math.round(value / 20);

return (
"▓".repeat(filled)
+
"░".repeat(5-filled)
);

}

function updateStatus(){

document
.getElementById(
"batteryText"
).innerText =
`BATTERY ${
makeBar(
batteryRange.value
)
} ${
batteryRange.value
}%`;

document
.getElementById(
"brainText"
).innerText =
`BRAIN CACHE ${
makeBar(
brainRange.value
)
} ${
brainRange.value
}%`;

saveData();

}

batteryRange.oninput =
updateStatus;

brainRange.oninput =
updateStatus;

updateStatus();

/* ========================= */
/* STORAGE */
/* ========================= */

function saveData(){

localStorage.setItem(
"sleepyTasks",
JSON.stringify(tasks)
);

localStorage.setItem(
"sleepySpends",
JSON.stringify(spends)
);

localStorage.setItem(
"sleepyBattery",
batteryRange.value
);

localStorage.setItem(
"sleepyBrain",
brainRange.value
);

}

function loadData(){

const savedTasks =
JSON.parse(
localStorage.getItem(
"sleepyTasks"
) || "[]"
);

const savedSpends =
JSON.parse(
localStorage.getItem(
"sleepySpends"
) || "[]"
);

tasks.push(...savedTasks);

spends.push(...savedSpends);

}

loadData();

/* ========================= */
/* TIME */
/* ========================= */

function toMinutes(time){

const split =
time.split(":");

return (
Number(split[0]) * 60
+
Number(split[1])
);

}

/* ========================= */
/* SUMMARY */
/* ========================= */

function updateSummary(){

if(tasks.length === 0){

document
.getElementById(
"firstCheckin"
).innerText =
"--:--";

document
.getElementById(
"lastCheckin"
).innerText =
"--:--";

document
.getElementById(
"activeTimeText"
).innerText =
"0H 00M";

return;

}

const first =
tasks[0].time;

const last =
tasks[
tasks.length - 1
].time;

document
.getElementById(
"firstCheckin"
).innerText =
first;

document
.getElementById(
"lastCheckin"
).innerText =
last;

const diff =
toMinutes(last)
-
toMinutes(first);

const h =
Math.floor(diff / 60);

const m =
diff % 60;

document
.getElementById(
"activeTimeText"
).innerText =
`${h}H ${
String(m)
.padStart(2,"0")
}M`;

}

/* ========================= */
/* RENDER TASKS */
/* ========================= */

function renderTasks(){

tasks.sort((a,b)=>{

return (
toMinutes(a.time)
-
toMinutes(b.time)
);

});

const taskList =
document.getElementById(
"taskList"
);

taskList.innerHTML = "";

tasks.forEach(task=>{

taskList.innerHTML += `

<div class="task">

<span class="task-name">
${task.name}
</span>

<span class="task-time">
${task.time}
</span>

</div>

`;

});

updateSummary();

saveData();

}

/* ========================= */
/* RENDER SPENDS */
/* ========================= */

function renderSpends(){

const spendList =
document.getElementById(
"spendList"
);

spendList.innerHTML = "";

spends.forEach(spend=>{

spendList.innerHTML += `

<div class="spend">

<span class="spend-name">
${spend.name}
</span>

<span class="spend-price">
¥${Number(
spend.price
).toLocaleString()}
</span>

</div>

`;

});

const total =
spends.reduce((sum,s)=>{

return (
sum +
Number(s.price)
);

},0);

document
.getElementById(
"totalAmount"
).innerText =
`¥${total.toLocaleString()}`;

saveData();

}

/* ========================= */
/* SAVE DONE */
/* ========================= */

document
.getElementById(
"saveDone"
).onclick = ()=>{

const input =
document.getElementById(
"doneInput"
);

const time =
document.getElementById(
"doneTime"
);

if(
!input.value ||
!time.value
)return;

tasks.push({

name:input.value,
time:time.value

});

input.value = "";
time.value = "";

renderTasks();

};

/* ========================= */
/* NOW BUTTON */
/* ========================= */

document
.getElementById(
"nowBtn"
).onclick = ()=>{

const now =
new Date();

let h =
now.getHours();

const m =
String(
now.getMinutes()
).padStart(2,"0");

if(h < 6){

h += 24;

}

document
.getElementById(
"doneTime"
).value =
`${h}:${m}`;

};

/* ========================= */
/* SAVE SPEND */
/* ========================= */

document
.getElementById(
"saveSpend"
).onclick = ()=>{

const input =
document.getElementById(
"spendInput"
);

const price =
document.getElementById(
"spendPrice"
);

if(
!input.value ||
!price.value
)return;

spends.push({

name:input.value,
price:price.value

});

input.value = "";
price.value = "";

renderSpends();

};

/* ========================= */
/* NEW BUTTON */
/* ========================= */

let newConfirm = false;

document
.getElementById(
"newBtn"
).onclick = ()=>{

const btn =
document.getElementById(
"newBtn"
);

if(!newConfirm){

newConfirm = true;

btn.innerText =
"CONFIRM?";

setTimeout(()=>{

newConfirm = false;

btn.innerText =
"NEW";

},3000);

return;

}

const session =
Number(
localStorage.getItem(
"sleepySession"
) || "1"
);

localStorage.setItem(
"sleepySession",
session + 1
);

localStorage.removeItem(
"sleepyTasks"
);

localStorage.removeItem(
"sleepySpends"
);

tasks.length = 0;
spends.length = 0;

renderTasks();
renderSpends();

updateDate();

document
.getElementById(
"sessionNumber"
).innerText =
String(session + 1)
.padStart(3,"0");

newConfirm = false;

btn.innerText =
"NEW";

};

/* ========================= */
/* SAVE IMAGE */
/* ========================= */

document
.getElementById(
"saveImageBtn"
).onclick = ()=>{

html2canvas(
document.getElementById(
"receipt"
),
{
backgroundColor:"#faf6f5",
scale:2
}
).then(canvas=>{

const image =
canvas.toDataURL(
"image/png"
);

const newTab =
window.open();

newTab.document.write(`

<style>

body{

margin:0;
padding:20px;
background:#f5f1ef;

display:flex;
justify-content:center;

}

img{

width:360px;

box-shadow:
0 4px 20px rgba(0,0,0,.08);

border-radius:12px;

}

</style>

<img src="${image}">

`);

});

};

/* ========================= */
/* INITIAL RENDER */
/* ========================= */

renderTasks();
renderSpends();
