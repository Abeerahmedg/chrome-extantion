
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromStorage) {
    myLeads = leadsFromStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
})


function render(leads){
    let listItems = ""
 
 for (let i = 0; i < leads.length; i++)
{ 
     //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
     listItems +=
      `
     <li>
         <a target='_blank' href='${leads[i]}'>
             ${leads[i]}
         </a>
     </li>
     `
}
 ulEl.innerHTML = listItems 
 }
 
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads= []
    render(myLeads)
    console.log("double clicked")
})

inputBtn.addEventListener("click", function()
{
    myLeads.push(inputEl.value)
   //to clear the input field
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    //console.log( localStorage.getItem("myLeads"))
})

