import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model'
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto) {
        const task: Task = {
            id: uuid.v4(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: TaskStatus.OPEN
        }
        console.log("check",task)
    
        this.tasks.push(task)
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = status
        return task;
    }
}
