import { Task } from "./task"

export class Project {
    constructor(projectName) {
        this.name = projectName
        this.taskList =[]
    }

    addTask(task) {
        this.taskList.push(task)
        // this.save()
    }

    removeTask(title) {
        this.taskList = this.taskList.filter(task => task.title != title)
        // this.save()
    }

    // save() {
    //     localStorage.setItem(this.name, JSON.stringify(this.taskList))
    // }

    getTask() {
        return [...this.taskList]
    }
    
}