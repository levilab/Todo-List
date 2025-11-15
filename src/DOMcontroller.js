
export const DOMcontroller = (() => {
    const projectContent = document.querySelector(".total-projects");
    const taskContent = document.querySelector(".task-detail")
    let currentProject = null
    let currentProjectElement = null
    function renderTotalProjects(totalProjects) {
        
        projectContent.innerHTML = ''
        totalProjects.getProjects().forEach(project => renderProject(project, totalProjects))
    }

    function renderProject(project, totalProjects) {

        const block = document.createElement("div") // each project & delete button kept in a block
        block.classList.add("blockProject")
        projectContent.append(block)
        
        const singleProject = document.createElement("div")
        singleProject.classList.add("project")
        singleProject.textContent = project.name

        block.append(singleProject)

        singleProject.addEventListener("click", () => {
            currentProject = project
            renderTasks(project)
            
        })

        // remove button
        const removeProjectBtn = document.createElement("button")
        removeProjectBtn.id = "removeProject"
        removeProjectBtn.textContent = "delete"
        
        removeProjectBtn.onclick = () => {
            totalProjects.removeProject(project.name)
            renderTotalProjects(totalProjects)
        }
        block.append(removeProjectBtn)  

        // maintain the active project
        document.addEventListener("click", (e) => {

            if (e.target.classList.contains("project")) {
                if (currentProjectElement) {currentProjectElement.classList.remove('active')}   // remove the previous active project
                currentProjectElement = e.target
                currentProjectElement.classList.add("active")
            } else {
                if (currentProjectElement){
                currentProjectElement.classList.remove("active")
                currentProjectElement = null
                }
            }
        })
    }

    function renderTasks(project) {
        taskContent.innerHTML = ''
        project.getTask().forEach(task => renderTask(task))
    }

    function renderTask(task) {

        const singleTask =  document.createElement("li")
        singleTask.classList.add("task")

        const taskLabelEdit = document.createElement("div")
        taskLabelEdit.classList.add("taskLabelEdit")

        const btnAndLabel = document.createElement("div")
        btnAndLabel.classList.add("btnAndLabel")
        
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = task.title
        const label = document.createElement("label")
        label.for = task.title
        label.textContent = task.title
        
        const editBtn = document.createElement("button")
        editBtn.classList.add("editProject")
        editBtn.id = task.id
        editBtn.textContent = "✏️"

        const timeAndPriority = document.createElement("div")
        timeAndPriority.classList.add("timeAndPriority")
        const deadline = document.createElement("div")
        deadline.textContent = task.dueDate

        const priority = document.createElement("div")
        priority.textContent = task.priority
        
        btnAndLabel.append(checkbox,label)
        taskLabelEdit.append(btnAndLabel, editBtn)
        timeAndPriority.append(deadline, priority)
        singleTask.append(taskLabelEdit, timeAndPriority)
        checkbox.addEventListener("click", ()=> {
            singleTask.classList.toggle("completed")
            task.isCompleted = !task.isCompleted
        })
        taskContent.append(singleTask)
    }

    
    return { renderTotalProjects, renderProject, renderTasks, renderTask , getCurrentProject: () => currentProject}
})()