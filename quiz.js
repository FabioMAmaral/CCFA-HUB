const REF={
SUP:"Sensor Deployment > 1.1 Sensor Update Policies",CUP:"Sensor Deployment > 1.2 Content Update Policies",SHM:"Sensor Deployment > 1.3 Sensor Health Monitoring",
MAC:"Sensor Deployment > 1.4 Mac (Falcon Sensor for Mac Deployment)",MACRFM:"Sensor Deployment > 1.4.1 Mac: Reduced functionality mode",WIN:"Sensor Deployment > 1.5.1 Falcon Sensor for Windows Deployment",
VM:"Sensor Deployment > 1.5.1.7.7 VDI, VM template e linked/instant clones",WINRFM:"Sensor Deployment > 1.5.1.15 Reduced functionality mode: Windows hosts",
WINTS:"Sensor Deployment > 1.5.1.9-1.5.1.10 Troubleshooting an installation / general sensor issues",UNINST:"Sensor Deployment > 1.5.1.8 Uninstalling the Falcon sensor for Windows",
LNX:"Sensor Deployment > 1.7.3 Falcon Sensor for Linux",LNXRFM:"Sensor Deployment > 1.7.3 Reduced functionality mode: Linux hosts",
USR:"Falcon Management > 1.10.1 User Management",ROLE:"Falcon Management > 1.10.2 Role Management e 1.10.3 Default Roles Reference",SSO:"Falcon Management > 1.13.3 Single Sign-On (SSO) for Falcon",
HOST:"Falcon Management > 1.6.2 Managing Hosts",RET:"Falcon Management > 1.6.2.5.2 Host retention policies",GRP:"Falcon Management > 1.6.3 Managing host groups",TOK:"Falcon Management > 1.6.4 Protecting your CID with installation tokens",
POL:"Falcon Management > 1.7 Policies in Falcon",NOT:"Falcon Management > 1.8 Falcon Notifications",DASH:"Falcon Management > 1.11.1 Customizable Dashboards",SCH:"Falcon Management > 1.11.2 Scheduled Reports",
BILL:"Falcon Management > Dashboards and reports > Billing dashboards",TECH:"Falcon Management > 1.5 Manage CrowdStrike Tech Alerts",WF:"Falcon Management > Fusion SOAR (workflows)",
Q:"Endpoint Security > 1.3.4 Quarantined Files",NC:"Endpoint Security > 1.4.2 Network Containment",RTR:"Endpoint Security > 1.4.1 Real Time Response",RTRA:"Endpoint Security > 1.4.1 Real Time Response: audit logs",
PP:"Endpoint Security > 1.5.1 Detection and Prevention Policies",PS:"Endpoint Security > 1.5.2 Prevention Policy Settings",EXC:"Endpoint Security > 1.5.1.2.1 Exclusions",
IOA:"Endpoint Security > Configuration: Custom IOA rule groups",IOC:"Endpoint Security > Configuration: IOC Management",MON:"Endpoint Security > 1.3 Endpoint Monitoring",
ST:"CrowdStrike Store > 1.1 CrowdStrike Store",STU:"CrowdStrike Store > 1.2 Software Update Policies",STI:"CrowdStrike Store > 1.3 App Integrations",API:"CrowdStrike APIs > General Info",
D1:"Falcon Management > 1.10 Users and Roles",D2:"Sensor Deployment and Maintenance (capítulo do SO)",D3:"Falcon Management > 1.6.2 Managing Hosts",D4:"Falcon Management > 1.6.3 Managing host groups",
D5:"Endpoint Security > 1.5 Configuration (policies)",D6:"Endpoint Security > 1.5 Configuration (rules/exclusions)",D7:"Falcon Management > 1.11 Dashboards and Reports",D8:"CrowdStrike Store > 1.3 App Integrations"};
const AUTO=[[/NO_START|template|VDI/i,"VM"],[/RFM|reduced functionality/i,"WINRFM"],[/retention|inactive|hidden|45 days|90 days/i,"RET"],[/static|dynamic|host group/i,"GRP"],
[/sensor update|N-1|N-2|maintenance token|uninstall protection/i,"SUP"],[/quarant/i,"Q"],[/contain/i,"NC"],[/RTR|Real Time|put\b/i,"RTR"],[/IOA/i,"IOA"],[/IOC/i,"IOC"],[/exclusion|glob/i,"EXC"],
[/prevention|XUMD|precedence|default polic/i,"PP"],[/Store|trial|partner|API client|webhook|Slack|Teams|ServiceNow|PagerDuty|Okta|Entra|HMAC|Jira/i,"STI"],[/workflow|Fusion/i,"WF"],[/audit|report|dashboard/i,"DASH"],[/role|user|permission/i,"ROLE"]];
function norm(r,id){let a=r[3];const multi=Array.isArray(a);let k=r[5];if(!k){const m=AUTO.find(x=>x[0].test(r[1]+" "+r[4]));k=m?m[1]:"D"+r[0]}
 return{id,d:r[0],q:r[1],o:r[2],a:multi?a:[a],multi,e:r[4],r:REF[k]||k}}
const EXAMS=[1,2,3,4,5].map(n=>{const raw=n==1?Q:(window["E"+n]||[]);return{n,name:"Practice Exam "+n,qs:raw.map((r,i)=>norm(r,`e${n}q${i+1}`))}});
const ALLQ={};EXAMS.forEach(e=>e.qs.forEach(q=>ALLQ[q.id]=q));
const DOM=TEN;const ABC="ABCDEF";
{const s=document.createElement("style");s.textContent=`.qn{display:inline-block;width:34px;height:34px;margin:2px;border:1px solid var(--b);border-radius:6px;background:var(--c);color:var(--t);cursor:pointer;font:inherit}
.qn.an{background:var(--r);color:#fff;border-color:var(--r)}.qn.fl{outline:2px solid #e0a800}.qn.cur{box-shadow:0 0 0 2px var(--t)}.row{display:flex;gap:16px;flex-wrap:wrap}.row>.q{flex:1;min-width:300px}.row>.p{width:260px}
.opt.ok{border-color:#1a9c4b}.ref{background:rgba(228,0,43,.08);border-left:3px solid var(--r);padding:6px 10px;margin-top:8px;border-radius:4px}.pill{padding:2px 8px;border-radius:10px;font-size:12px}.pw{background:rgba(192,57,43,.2)}.pr{background:rgba(26,156,75,.2)}table{width:100%;border-collapse:collapse}td,th{padding:8px;border-bottom:1px solid var(--b);text-align:left}`;document.head.appendChild(s)}
async function loadH(){try{const r=await fetch("/api/history");if(r.ok)return await r.json()}catch(e){}return JSON.parse(localStorage.getItem("hist")||"[]")}
async function saveA(a){try{const r=await fetch("/api/history",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(r.ok)return}catch(e){}
 const h=JSON.parse(localStorage.getItem("hist")||"[]");h.push(a);localStorage.setItem("hist",JSON.stringify(h))}
function examList(){const pending=EXAMS.filter(e=>!e.qs.length).length;
 m.innerHTML=`<div class="card"><h2>Practice Exams</h2><p>Official format: 60 questions, 90 minutes, no feedback during the exam, flag for review, review screen before finishing. Results and your answers are saved in <b>history.json</b>.</p>
 <div class="grid">${EXAMS.map(e=>`<div class="card"><b>${e.name}</b><p class="tag">${e.qs.length} questions</p><button class="btn" ${e.qs.length?"":"disabled"} onclick="startExam(${e.n})">Start</button></div>`).join("")}</div></div>`}
let S={};
function startExam(n){const e=EXAMS.find(x=>x.n==n);beginSet(e.name,e.qs,90)}
function startCustom(ids,name){beginSet(name,ids.map(i=>ALLQ[i]),Math.max(10,Math.round(ids.length*1.5)))}
function startDomain(d){const l=Object.values(ALLQ).filter(q=>q.d==d).sort(()=>Math.random()-.5).slice(0,20).map(q=>q.id);startCustom(l,"Domain "+d+": "+DOM[d])}
function beginSet(name,qs,min){clearInterval(S.tm);S={name,qs,ans:qs.map(()=>[]),fl:qs.map(()=>false),i:0,t0:Date.now(),end:Date.now()+min*60000};S.tm=setInterval(tick,1000);showQ()}
function tick(){const l=S.end-Date.now();if(l<=0){clearInterval(S.tm);finish(true)}else{const el=document.getElementById("tm");if(el)el.textContent=Math.floor(l/60000)+":"+String(Math.floor(l/1000)%60).padStart(2,"0")}}
function grid(){return S.qs.map((_,i)=>`<button class="qn ${S.ans[i].length?"an":""} ${S.fl[i]?"fl":""} ${i==S.i?"cur":""}" onclick="S.i=${i};showQ()">${i+1}</button>`).join("")}
function showQ(){const q=S.qs[S.i],n=S.qs.length,a=S.ans[S.i];
 m.innerHTML=`<div class="card"><div style="display:flex;justify-content:space-between"><b>${S.name}</b><span>⏱ <span id="tm"></span></span></div><div class="bar"><i style="width:${(S.i+1)/n*100}%"></i></div></div>
 <div class="row"><div class="card q"><p class="tag">Question ${S.i+1} of ${n}${S.fl[S.i]?" 🚩":""}</p><p style="font-size:16px"><b>${q.q}</b></p>${q.multi?`<p class="tag">Select ${q.a.length}.</p>`:""}
 ${q.o.map((o,i)=>`<button class="opt ${a.includes(i)?"s":""}" onclick="pick(${i})">${ABC[i]}. ${o}</button>`).join("")}
 <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn g" ${S.i?"":"disabled"} onclick="S.i--;showQ()">Previous</button><button class="btn g" onclick="S.fl[S.i]=!S.fl[S.i];showQ()">${S.fl[S.i]?"Unflag":"Flag for review"}</button>
 ${S.i<n-1?`<button class="btn" onclick="S.i++;showQ()">Next</button>`:""}<button class="btn" onclick="review()">Review &amp; Finish</button></div></div>
 <div class="card p"><b>Navigator</b><p>${grid()}</p><p class="tag">Filled = answered · Yellow outline = flagged</p></div></div>`}
function pick(i){const q=S.qs[S.i];let a=S.ans[S.i];if(q.multi){a=a.includes(i)?a.filter(x=>x!=i):[...a,i];if(a.length>q.a.length)a.shift()}else a=[i];S.ans[S.i]=a;showQ()}
function review(){const un=S.ans.filter(a=>!a.length).length,fl=S.fl.filter(x=>x).length;
 m.innerHTML=`<div class="card"><h2>Review</h2><p>Answered: ${S.qs.length-un} · Unanswered: <b>${un}</b> · Flagged: <b>${fl}</b></p><p>${grid()}</p>
 <button class="btn g" onclick="showQ()">Return to exam</button> <button class="btn" onclick="if(confirm('End the exam? You cannot change answers afterwards.'))finish(false)">End exam</button></div>`}
const same=(a,b)=>a.length==b.length&&a.every(x=>b.includes(x));
async function finish(timeout){clearInterval(S.tm);const items=S.qs.map((q,i)=>({id:q.id,ch:S.ans[i],ok:same(S.ans[i],q.a),fl:S.fl[i]}));
 const A={id:Date.now(),name:S.name,date:new Date().toISOString(),secs:Math.round((Date.now()-S.t0)/1000),timeout,items};
 m.innerHTML='<div class="card">Saving...</div>';await saveA(A);reviewAttempt(A)}
function byDomain(items){const by={};items.forEach(it=>{const d=ALLQ[it.id].d;(by[d]=by[d]||[0,0])[1]++;by[d][0]+=it.ok});return by}
function reviewAttempt(A,f){f=f||"all";const ok=A.items.filter(i=>i.ok).length,n=A.items.length,by=byDomain(A.items);window._A=A;
 const list=A.items.map((it,i)=>[it,i]).filter(([it])=>f=="all"||(f=="wrong"&&!it.ok)||(f=="flag"&&it.fl));
 m.innerHTML=`<div class="card"><h2>${A.name}: ${ok}/${n} (${Math.round(ok/n*100)}%)</h2><p class="tag">${new Date(A.date).toLocaleString()} · ${Math.floor(A.secs/60)} min${A.timeout?" · time expired":""} · Passing score is not published in the exam guide; aim above 80%.</p>
 ${Object.keys(by).map(k=>`<p>${DOM[k]}: ${by[k][0]}/${by[k][1]}<span class="bar" style="display:block"><i style="width:${by[k][0]/by[k][1]*100}%"></i></span></p>`).join("")}
 <button class="btn ${f=="all"?"":"g"}" onclick="reviewAttempt(_A,'all')">All</button> <button class="btn ${f=="wrong"?"":"g"}" onclick="reviewAttempt(_A,'wrong')">Wrong (${n-ok})</button> <button class="btn ${f=="flag"?"":"g"}" onclick="reviewAttempt(_A,'flag')">Flagged</button>
 <button class="btn g" onclick="go('hist')">Study list</button></div>
 ${list.map(([it,i])=>{const q=ALLQ[it.id];return`<div class="card"><span class="pill ${it.ok?"pr":"pw"}">${it.ok?"Correct":it.ch.length?"Wrong":"Unanswered"}</span> <span class="tag">Q${i+1} · ${DOM[q.d]}</span><p><b>${q.q}</b></p>
 ${q.o.map((o,k)=>`<div class="opt ${q.a.includes(k)?"ok":it.ch.includes(k)?"no":""}">${ABC[k]}. ${o}${it.ch.includes(k)?" ← your answer":""}</div>`).join("")}
 <p class="tag">💡 ${q.e}</p><div class="ref">📖 Study here: <b>${q.r}</b></div></div>`}).join("")||"<div class='card'>Nothing to show.</div>"}`}
async function historyView(){const H=await loadH();window._H=H;
 const last={};H.forEach(a=>a.items.forEach(it=>last[it.id]=it));const wrong=Object.keys(last).filter(id=>!last[id].ok&&ALLQ[id]);
 const g={};wrong.forEach(id=>(g[ALLQ[id].r]=g[ALLQ[id].r]||[]).push(id));const gs=Object.entries(g).sort((a,b)=>b[1].length-a[1].length);
 m.innerHTML=`<div class="card"><h2>Study list: what to read</h2><p class="tag">Questions still wrong in your most recent attempt, grouped by documentation section.</p>
 ${gs.length?gs.map(([r,ids])=>`<div class="ref"><b>📖 ${r}</b> (${ids.length})<ul>${ids.map(id=>`<li>${ALLQ[id].q}</li>`).join("")}</ul></div>`).join(""):"<p>No pending wrong questions. Take an exam!</p>"}
 ${wrong.length?`<button class="btn" onclick="startCustom(${JSON.stringify(wrong).replace(/"/g,"'")},'Retake: wrong questions')">Retake wrong questions (${wrong.length})</button>`:""}</div>
 <div class="card"><h2>Attempts</h2>${H.length?`<table><tr><th>Date</th><th>Exam</th><th>Score</th><th></th></tr>${[...H].reverse().map(a=>{const ok=a.items.filter(i=>i.ok).length;return`<tr><td>${new Date(a.date).toLocaleString()}</td><td>${a.name}</td><td>${ok}/${a.items.length} (${Math.round(ok/a.items.length*100)}%)</td><td><button class="btn g" onclick="reviewAttempt(_H.find(x=>x.id==${a.id}))">Review</button></td></tr>`}).join("")}</table>`:"<p>No attempts yet.</p>"}</div>`}
