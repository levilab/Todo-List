import { Management } from "./management";
import { DOMcontroller } from "./DOMcontroller";
import { Project } from "./project";
import { Task } from "./task";

export class App {
    constructor() {
        this.totalProjects = new Management()
        DOMcontroller.renderTotalProjects(this.totalProjects)
        this.bindEvents()
    }

    bindEvents() {
        // Collapse buttons
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("collapsible")) {
                const content = document.querySelector(".total-projects")
                console.log(content)
                content.classList.toggle("collapsed")
                e.target.classList.toggle("collapsed")
            }
        })

        // Edit task
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("editProject")) {
                const project = DOMcontroller.getCurrentProject()
                const task = project.getTask().find(t => t.id === e.target.id)
                console.log(task)
                this.editTaskDialog(task, project)
            }

        })

        // Add new project
        const addProjectBtn = document.getElementById("addProject")
        addProjectBtn.addEventListener("click", () => this.addProjectDialog())

        // Add new task
        const addTaskBtn = document.getElementById("addTask")
        addTaskBtn.addEventListener("click", () => {
            const project = DOMcontroller.getCurrentProject()
            if (!project) {
                alert("Please select a project first!")
                return
            }
            this.addTaskDialog(project)
        } )

       
        
    }
    
    addProjectDialog() {
        const dialog = document.getElementById("taskDialog")
        dialog.showModal()

        const addConfirmBtn = document.getElementById("add")
        addConfirmBtn.onclick = (event) => {
            event.preventDefault()
            const name = document.getElementById("name").value  // get the input name
            if (this.totalProjects.getProjects().some(p => p.name === name)) {
                alert("This project already exists")
                return
            }
            this.totalProjects.addProject(new Project(name))
            DOMcontroller.renderTotalProjects(this.totalProjects)
            dialog.close()
        }

        const closeBtn = document.getElementById("close")
        closeBtn.onclick = () => {
            dialog.close()
        }
    }

    addTaskDialog(project){
        const dialog = document.getElementById("taskDialog")
        dialog.showModal()

        const cfmTaskBtn = document.getElementById("cfmTask")
        cfmTaskBtn.onclick = (event) => {
            event.preventDefault()
            const title = document.getElementById("title").value
            const description = document.getElementById("description").value
            const dueDate = document.getElementById("dueDate").value
            const priority = document.getElementById("priority").value
            const notes = document.getElementById("notes").value
            const checklist = document.getElementById("checklist").value

            if (project.getTask().some(t =>t.title === title)) {
                alert("This task already exists!")
                return
            }
            project.addTask(new Task(title, description, dueDate, priority, notes, checklist))
            this.totalProjects.save()
            DOMcontroller.renderTasks(project)
            dialog.close()
        }
        const closeBtn = document.getElementById("closeTask")
        closeBtn.onclick = () => {
            dialog.close()
        }
    }

    editTaskDialog(task, project) {
        const dialog = document.getElementById("taskDialog")
        dialog.showModal()

        // Pre-filled with existing data
        document.getElementById("title").value = task.title
        document.getElementById("description").value =  task.description
        document.getElementById("dueDate").value = task.dueDate
        document.getElementById("priority").value = task.priority
        document.getElementById("notes").value = task.notes
        document.getElementById("checklist").value = task.checklist

        const cfmTaskBtn = document.getElementById("cfmTask")
        cfmTaskBtn.onclick = (event) => {
            event.preventDefault()
            task.title = document.getElementById("title").value
            task.escription = document.getElementById("description").value
            task.ueDate = document.getElementById("dueDate").value
            task.priority = document.getElementById("priority").value
            task.notes = document.getElementById("notes").value
            task.checklist = document.getElementById("checklist").value

            if (project.getTask().some(t =>t.title === task.title)) {
                alert("This task already exists!")
                return
            }
            this.totalProjects.save()
            DOMcontroller.renderTasks(project)
            dialog.close()
        }
        const closeBtn = document.getElementById("closeTask")
        closeBtn.onclick = () => {
            dialog.close()
        }

    }


}