export class Task {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.id = crypto.randomUUID()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.checklist = checklist
        this.isCompleted =  false
    }

}