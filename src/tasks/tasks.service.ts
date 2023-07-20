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
}
