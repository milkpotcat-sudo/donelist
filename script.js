/* ========================= */
/* JS */
/* ========================= */

const tasks = [];

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


const spends = [];

const sheepSignals = [

  "dreamy",
  "sleepy",
  "unstable",
  "wandering",
  "offline",
  "buffering",
  "cozy",
  "drowsy",
  "moonlit",
  "zzz...",
  "lost in clouds",
  "counting..."

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

const menuBtn =
document.getElementById("menuBtn");

const menuPanel =
document.getElementById("menuPanel");

const doneToggle =
document.getElementById("doneToggle");

const spendToggle =
document.getElementById("spendToggle");

const statusToggle =
document.getElementById("statusToggle");

const donePanel =
document.getElementById("donePanel");

const spendPanel =
document.getElementById("spendPanel");

const statusPanel =
document.getElementById("statusPanel");

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

function makeBar(value){

const filled =
Math.round(value / 20);

return "▓".repeat(filled)
+
"░".repeat(5-filled);

}

const batteryRange =
document.getElementById(
"batteryRange"
);

const brainRange =
document.getElementById(
"brainRange"
);

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

}

batteryRange.oninput =
updateStatus;

brainRange.oninput =
updateStatus;

updateStatus();

function renderTasks(){

const taskList =
document.getElementById(
"taskList"
);

taskList.innerHTML = "";

tasks.sort((a,b)=>{

return (
a.time.localeCompare(
b.time
)
);

});

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

}

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

return sum +
Number(s.price);

},0);

document
.getElementById(
"totalAmount"
).innerText =
`¥${total.toLocaleString()}`;

}

function updateSummary(){

if(tasks.length===0){

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
tasks.length-1
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

const firstMinutes =
toMinutes(first);

const lastMinutes =
toMinutes(last);

const diff =
lastMinutes -
firstMinutes;

const h =
Math.floor(diff/60);

const m =
diff%60;

document
.getElementById(
"activeTimeText"
).innerText =
`${h}H ${
String(m)
.padStart(2,"0")
}M`;

}

function toMinutes(time){

const split =
time.split(":");

return (
Number(split[0])*60
+
Number(split[1])
);

}

document
.getElementById(
"saveDone"
).onclick = ()=>{

const input =
document
.getElementById(
"doneInput"
);

const time =
document
.getElementById(
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

document
.getElementById(
"saveSpend"
).onclick = ()=>{

const input =
document
.getElementById(
"spendInput"
);

const price =
document
.getElementById(
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

if(h<6){

h += 24;

}

document
.getElementById(
"doneTime"
).value =
`${h}:${m}`;

};


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

tasks.length = 0;
spends.length = 0;

renderTasks();
renderSpends();

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



document
.getElementById(
"saveImageBtn"
).onclick = ()=>{

html2canvas(
document.getElementById(
"receipt"
)
,{
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
