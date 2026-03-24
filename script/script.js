const container =
document.getElementById("issues-container");

const issueCount =
document.getElementById("issue-count");

let allIssues=[];



async function loadIssues(){

showLoading();

try{

const res =
await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
);

if(!res.ok){

throw new Error("Failed to load data");

}

const data =
await res.json();

allIssues = data.data || [];

displayIssues(allIssues);

}

catch(error){

console.log(error);

container.innerHTML=

`<div class="col-span-4 text-center py-10 text-red-500">

Failed to load issues

</div>`;

}

}



function displayIssues(issues){

container.innerHTML="";

issueCount.innerText =
issues.length+" Issues";


issues.forEach(issue=>{

const card =
document.createElement("div");


card.className =
`bg-white rounded-lg shadow-sm
border-t-4 p-4 hover:shadow-md
transition cursor-pointer
${statusBorder(issue.status)}`;



card.innerHTML = `

<div class="flex justify-between items-center mb-2">

<div class="w-8 h-8 rounded-full
${statusBackground(issue.status)}
flex items-center justify-center">

<img src="${statusIcon(issue.status)}"
class="w-4 h-4">

</div>


<span class="
text-xs px-2 py-1 rounded
${priorityBadge(issue.priority)}
">

${issue.priority}

</span>

</div>



<h3 class="font-semibold text-sm">
${issue.title}
</h3>



<p class="text-xs text-gray-500 mt-1">
${issue.description?.slice(0,70)}
</p>



<div class="border-t border-gray-200
mt-4 pt-3 text-xs text-gray-500">

<div class="flex justify-between">

<div>
#${issue.id}
by ${issue.author || "Unknown"}
</div>


<div>
${
issue.createdAt
? new Date(issue.createdAt).toLocaleDateString()
: "N/A"
}
</div>

</div>



<div class="flex justify-between mt-2">

<div>
Assignee:
<span class="text-gray-700">
${issue.assignee || "Unassigned"}
</span>
</div>


<div>
${
issue.updatedAt
? new Date(issue.updatedAt).toLocaleDateString()
: "N/A"
}
</div>

</div>

</div>

`;


card.addEventListener("click",()=>{

openModal(issue);

});


container.appendChild(card);

});

}



function statusBorder(status){

if(status?.toLowerCase()==="open")
return "border-green-500";

return "border-purple-500";

}



function statusIcon(status){

if(status?.toLowerCase()==="open")
return "./assets/Open-Status.png";

return "./assets/Closed-Status.png";

}



function statusBackground(status){

if(status?.toLowerCase()==="open")
return "bg-green-100";

return "bg-purple-100";

}



function priorityBadge(priority){

if(priority?.toLowerCase()==="high")
return "bg-red-100 text-red-600";

if(priority?.toLowerCase()==="medium")
return "bg-yellow-100 text-yellow-600";

return "bg-gray-100 text-gray-600";

}



function setActiveButton(activeBtn){

const buttons =
document.querySelectorAll(".filter-btn");


buttons.forEach(btn=>{

btn.classList.remove("btn-primary");

btn.classList.add(
"btn-ghost",
"border",
"text-gray-500"
);

});


activeBtn.classList.remove(
"btn-ghost",
"border",
"text-gray-500"
);

activeBtn.classList.add("btn-primary");

}



document
.getElementById("all-btn")
.addEventListener("click",(e)=>{

setActiveButton(e.target);

displayIssues(allIssues);

});



document
.getElementById("open-btn")
.addEventListener("click",(e)=>{

setActiveButton(e.target);

displayIssues(
allIssues.filter(
issue=>issue.status?.toLowerCase()==="open"
)
);

});



document
.getElementById("closed-btn")
.addEventListener("click",(e)=>{

setActiveButton(e.target);

displayIssues(
allIssues.filter(
issue=>issue.status?.toLowerCase()==="closed"
)
);

});



document
.getElementById("search-btn")
.addEventListener("click", searchIssues);



async function searchIssues(){

const text =
document.getElementById("search-box").value;

if(text.trim()===""){

displayIssues(allIssues);
return;

}

showLoading();

try{

const res =
await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

if(!res.ok){

throw new Error("Search failed");

}

const data =
await res.json();

displayIssues(data.data || []);

}

catch(error){

console.log(error);

container.innerHTML=

`<div class="col-span-4 text-center py-10 text-red-500">

Search failed

</div>`;

}

}



document
.getElementById("search-box")
.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

searchIssues();

}

});



function openModal(issue){

document.getElementById("issue_modal")
.showModal();


document.getElementById("modal-title")
.innerText = issue.title;


document.getElementById("modal-desc")
.innerText = issue.description;


document.getElementById("modal-author")
.innerText =
"Opened by "+(issue.author || "Unknown");


document.getElementById("modal-date")
.innerText =
issue.createdAt
? new Date(issue.createdAt).toLocaleDateString()
: "";


const status =
document.getElementById("modal-status");

status.innerText = issue.status;

if(issue.status?.toLowerCase()==="open")

status.className =
"px-3 py-1 rounded-full text-xs bg-green-500 text-white";

else

status.className =
"px-3 py-1 rounded-full text-xs bg-purple-500 text-white";



const priority =
document.getElementById("modal-priority");

priority.innerText = issue.priority;


if(issue.priority?.toLowerCase()==="high")

priority.className =
"px-3 py-1 rounded-full text-xs bg-red-100 text-red-600";

else if(issue.priority?.toLowerCase()==="medium")

priority.className =
"px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600";

else

priority.className =
"px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600";



document.getElementById("modal-assignee")
.innerText =
issue.assignee || "Unassigned";

}



function showLoading(){

container.innerHTML=

`<div class="col-span-4 text-center py-10">

<span class="loading loading-spinner loading-lg">

</span>

</div>`;

}



loadIssues();