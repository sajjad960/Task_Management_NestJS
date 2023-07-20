import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model'
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }
    getTasksWithFilters(filterDto: GetTaskFilterDto) {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return tasks
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        

        return found
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
        const found = this.getTaskById(id)
        console.log("check",found)
        
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = status
        return task;
    }
}
