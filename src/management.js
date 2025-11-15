
import { Project } from "./project"
import { Task } from "./task"


export class Management {
    constructor() {
        const totalProjects = localStorage.getItem("totalProjects")
        this.projects = totalProjects ? JSON.parse(totalProjects).map(p => {
            const proj = new Project(p.name)
            proj.taskList = p.taskList.map(
                task => new Task(task.title, task.description, task.dueDate, task.priority,task.notes, task.checklist)
            )
            return proj
        }) 
        : []
        if (this.projects.length === 0) {
            this.seedProjects()
        }
    }

    seedProjects() {
        const defaultProject = new Project("Academic Essay")
        defaultProject.addTask(new Task("Select a topic","find a technological disruption past year","2025-Nov-15","high","keep it short"))
        defaultProject.addTask(new Task("Find two main arguments","research and pick two key points","2025-Nov-19","high",))
        defaultProject.addTask(new Task("Write introduction and few paragraphs","draft some sentences for consultation","2025-Nov-29","high","keep it short"))

        this.projects.push(defaultProject)
        this.save()
    }

    addProject(project) {
        this.projects.push(project)
        this.save()
    }

    removeProject(projectName) {
        this.projects = this.projects.filter(project => project.name != projectName)
        this.save()
    }

    save() {
        localStorage.setItem("totalProjects", JSON.stringify(this.projects))
    }

    getProjects() {
        return [...this.projects]
    }
}