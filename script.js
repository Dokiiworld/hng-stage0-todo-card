window.addEventListener("load", () => {
    document.documentElement.classList.add("loaded")
    loadTaskState()
    updateTimeRemaining()
})
    
    /* ----------------------------- */
    /* SELECT ELEMENTS */
    /* ----------------------------- */
    
  
    const card = document.querySelector('[data-testid="test-todo-card"]')
    
    const titleEl = document.querySelector('[data-testid="test-todo-title"]')
    const descriptionEl = document.querySelector('[data-testid="test-todo-description"]')
    
    const priorityEl = document.querySelector('[data-testid="test-todo-priority"]')
    const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]')
    
    const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]')
    const remainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]')
    
    const statusEl = document.querySelector('[data-testid="test-todo-status"]')
    const statusControl = document.querySelector('[data-testid="test-todo-status-control"]')
    
    const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]')
    
    const progress = document.querySelector(".progress")
    
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]')
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]')
    
    const editForm = document.querySelector('[data-testid="test-todo-edit-form"]')
    
    const editTitle = document.querySelector('[data-testid="test-todo-edit-title-input"]')
    const editDescription = document.querySelector('[data-testid="test-todo-edit-description-input"]')
    const editPriority = document.querySelector('[data-testid="test-todo-edit-priority-select"]')
    const editDueDate = document.querySelector('[data-testid="test-todo-edit-due-date-input"]')
    
    const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]')
    const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]')
    
    const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]')
    const collapsible = document.querySelector('[data-testid="test-todo-collapsible-section"]')
    
    const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]')

    const TASK_ID = "todo_card_1"

    function saveTaskState(){

        const taskData = {
            title: titleEl.textContent,
            description: descriptionEl.textContent,
            priority: priorityEl.textContent,
            priorityClass: priorityEl.className,
            // status: statusEl.textContent,
            status: statusControl.value,
            dueDate: dueDateEl.getAttribute("datetime"),
            completed: checkbox.checked
        }
        
        localStorage.setItem(TASK_ID, JSON.stringify(taskData))
        
    }

    function loadTaskState(){

        const saved = localStorage.getItem(TASK_ID)
        
        if(!saved) return
        
        const data = JSON.parse(saved)
        
        // restore text
        titleEl.textContent = data.title
        descriptionEl.textContent = data.description
        
        priorityEl.textContent = data.priority
        priorityEl.className = data.priorityClass
        
        statusEl.textContent = data.status
        statusControl.value = data.status
        // checkbox
        checkbox.checked = data.completed
        
        // due date
        if(data.dueDate){
            dueDate = new Date(data.dueDate)
            
            dueDateEl.setAttribute("datetime", dueDate.toISOString())
            dueDateEl.innerHTML = "<b>" + dueDate.toDateString() + "</b>"
        }

        // updateStatusUI(statusEl.textContent)
        updateStatusUI(statusControl.value)
        
    }
    
    /* ----------------------------- */
    /* DUE DATE */
    /* ----------------------------- */
    
    let dueDate = new Date(dueDateEl.getAttribute("datetime"))
    let lastFocusedElement = null
    
    // function updateTimeRemaining()
    // {    
    //     const now = new Date()
    //     const diff = dueDate - now
        
    //     if(diff <= 0){
        
    //     remainingEl.textContent = "Overdue"
    //     overdueIndicator.hidden = false
    //     card.classList.add("overdue")
        
    //     return
    //     }
        
    //     const minutes = Math.floor(diff / (1000*60))
    //     const hours = Math.floor(minutes/60)
    //     const days = Math.floor(hours/24)
        
    //     if(days > 0){
    //     remainingEl.textContent = `Due in ${days} day${days>1?'s':''}`
    //     }
    //     else if(hours > 0){
    //     remainingEl.textContent = `Due in ${hours} hour${hours>1?'s':''}`
    //     }
    //     else{
    //     remainingEl.textContent = `Due in ${minutes} minutes`
    //     }    
    // }
    
    let isCompleted = false

    function formatTime(diff)
    {

        const minutes = Math.floor(Math.abs(diff) / (1000 * 60))
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        let text = ""

        if(days > 0){
        text = `${days} day${days > 1 ? "s" : ""}`
        }
        else if(hours > 0){
        text = `${hours} hour${hours > 1 ? "s" : ""}`
        }
        else{
        text = `${minutes} minute${minutes > 1 ? "s" : ""}`
        }

        return text
    }

    function updateTimeRemaining()
    {

        if(isCompleted){
        remainingEl.textContent = "Completed"
        overdueIndicator.hidden = true
        card.classList.remove("overdue")
        return
        }

        const now = new Date()
        const diff = dueDate - now

        if(diff < 0){

        // OVERDUE STATE
        const text = formatTime(diff)

        remainingEl.textContent = `Overdue by ${text}`
        overdueIndicator.hidden = false
        card.classList.add("overdue")

        return
        }

        // FUTURE STATE
        const text = formatTime(diff)

        if(diff < 1000 * 60){
        remainingEl.textContent = "Due now!"
        }
        else if(diff < 1000 * 60 * 60){
        remainingEl.textContent = `Due in ${text}`
        }
        else if(diff < 1000 * 60 * 60 * 24){
        remainingEl.textContent = `Due in ${text}`
        }
        else{
        remainingEl.textContent = `Due in ${text}`
        }

        overdueIndicator.hidden = true
        card.classList.remove("overdue")

    }


    updateTimeRemaining()
    setInterval(updateTimeRemaining,60000)
    
    /* ----------------------------- */
    /* STATUS + CHECKBOX SYNC */
    /* ----------------------------- */
    
    function updateStatusUI(value)
    {
        statusControl.value = value

        statusEl.textContent = value
        statusEl.setAttribute("aria-label", `Task status: ${value}`)
        
        if(value === "Done")
        {        
            checkbox.checked = true
            titleEl.style.textDecoration = "line-through"
            
            card.classList.add("completed")
            
            progress.className = "progress completed"  
            
            isCompleted = true
            remainingEl.textContent = "Completed"      
        }
    
        else if(value === "In Progress")
        {
        
            checkbox.checked = false
            titleEl.style.textDecoration = "none"
            
            progress.className = "progress in-progress"
            
            card.classList.remove("completed")

            isCompleted = false   
            updateTimeRemaining()      
        }
        
        else
        {        
            checkbox.checked = false
            titleEl.style.textDecoration = "none"
            
            progress.className = "progress pending"
            
            card.classList.remove("completed")

            isCompleted = false
            updateTimeRemaining() 
        
        }

        saveTaskState()
    
    }
    
    statusControl.addEventListener("change",()=>{
        updateStatusUI(statusControl.value)
    })
    
    checkbox.addEventListener("change",()=>{
    
        if(checkbox.checked)
        {
            statusControl.value = "Done"
            updateStatusUI("Done")
        }
        else
        {
            statusControl.value = "Pending"
            updateStatusUI("Pending")
        }

        saveTaskState()
        
    })
    
    /* ----------------------------- */
    /* EDIT MODE */
    /* ----------------------------- */
    
    editBtn.addEventListener("click",()=>{
    
        lastFocusedElement = document.activeElement
        editForm.hidden = false
        
        editTitle.value = titleEl.textContent.trim()
        editDescription.value = descriptionEl.textContent.trim()

        /* move focus into form */
        setTimeout(() => {
            editTitle.focus()
        }, 0)
         
            // priority
        const priorityText = priorityEl.textContent
        .replace("🔴","")
        .replace("🟡","")
        .replace("🟢","")
        .trim()

        editPriority.value = priorityText

        // due date
        const isoDate = dueDateEl.getAttribute("datetime")

        editDueDate.value =
        new Date(isoDate).toISOString().slice(0,16)

    
    })

    editForm.addEventListener("keydown", (e) => {

        if(editForm.hidden) return
        
        if(e.key === "Tab")
        {
        
            const focusable = editForm.querySelectorAll(
            "input, textarea, select, button"
            )
            
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            
            if(e.shiftKey && document.activeElement === first){
            e.preventDefault()
            last.focus()
            }
            
            else if(!e.shiftKey && document.activeElement === last){
            e.preventDefault()
            first.focus()
            }
        
        }
        
    })
    
    cancelBtn.addEventListener("click",()=>{
    
        editForm.hidden = true
        if(lastFocusedElement){
            lastFocusedElement.focus()
        }
    
    })
    
    saveBtn.addEventListener("click",()=>{
    
        titleEl.textContent = editTitle.value
        descriptionEl.textContent = editDescription.value
        
        // priorityEl.textContent = editPriority.value
        /* PRIORITY + EMOJI */

        let priorityValue = editPriority.value
        let emoji = ""

        if(priorityValue === "High"){
        emoji = "🔴"
        }
        else if(priorityValue === "Medium"){
        emoji = "🟡"
        }
        else{
        emoji = "🟢"
        }

        priorityEl.textContent = `${emoji} ${priorityValue}`
    
        priorityEl.className = "priority " + priorityValue.toLowerCase()

        priorityIndicator.className = "priority-indicator " + editPriority.value.toLowerCase()
        
        dueDate = new Date(editDueDate.value)
        
        dueDateEl.setAttribute("datetime", dueDate.toISOString())
        
        dueDateEl.innerHTML = "<b>" + dueDate.toDateString() + "</b>"
        
        editForm.hidden = true
        if(lastFocusedElement)
        {
            lastFocusedElement.focus()
        }
        
        updateTimeRemaining()
        saveTaskState()
    
    })
    
    /* ----------------------------- */
    /* EXPAND / COLLAPSE */
    /* ----------------------------- */
    
    expandToggle.addEventListener("click",()=>{
    
        const expanded = collapsible.classList.toggle("expanded")
        
        expandToggle.setAttribute("aria-expanded", expanded)
        
        expandToggle.textContent = expanded ? "△ Collapse" : "▽ Expand"
    
    })
    
    /* ----------------------------- */
    /* DELETE */
    /* ----------------------------- */
    
    deleteBtn.addEventListener("click",()=>{
    
    if(confirm("Delete this task?")){
    card.remove()
    }
    
    })
