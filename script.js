window.addEventListener("load", () => {
    document.documentElement.classList.add("loaded")
    })

const dueDate = new Date("2026-04-18T18:00:00Z")

const remainingEl =
document.querySelector('[data-testid="test-todo-time-remaining"]')

function updateTimeRemaining(){

const now = new Date()
const diff = dueDate - now

if(diff <= 0){
remainingEl.textContent = "Due now!"
return
}

const minutes = Math.floor(diff / (1000*60))
const hours = Math.floor(minutes/60)
const days = Math.floor(hours/24)

if(days > 0){
remainingEl.textContent = `Due in ${days} day${days>1?'s':''}`
}
else if(hours > 0){
remainingEl.textContent = `Due in ${hours} hour${hours>1?'s':''}`
}
else{
remainingEl.textContent = `Due in ${minutes} minutes`
}

}

updateTimeRemaining()

setInterval(updateTimeRemaining,60000)


const checkbox =
document.querySelector('[data-testid="test-todo-complete-toggle"]')

const title =
document.querySelector('[data-testid="test-todo-title"]')

const status =
document.querySelector('[data-testid="test-todo-status"]')

checkbox.addEventListener("change",()=>{

if(checkbox.checked){
title.style.textDecoration="line-through"
status.textContent="Done"
}
else{
title.style.textDecoration="none"
status.textContent="Pending"
}

})


document
.querySelector('[data-testid="test-todo-edit-button"]')
.addEventListener("click",()=>{
console.log("Edit clicked")
})

document
.querySelector('[data-testid="test-todo-delete-button"]')
.addEventListener("click",()=>{
alert("Delete clicked")
})


const card = document.querySelector('[data-testid="test-todo-card"]');
const progress = document.querySelector(".progress")

checkbox.addEventListener("change",()=>{

if(checkbox.checked){
title.style.textDecoration="line-through"
status.textContent="Done"
card.classList.add("completed")

progress.className="progress completed"
}
else{
title.style.textDecoration="none"
status.textContent="Pending"
card.classList.remove("completed")

progress.className="progress pending"
}

})
