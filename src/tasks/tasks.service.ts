import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model'
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }

    createTask(title: string, description: string) {
        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }
    
        this.tasks.push(task)
        return task;
      }
}
