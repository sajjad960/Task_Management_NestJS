import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const {search, status} = filterDto;
    const query = this.createQueryBuilder('task');

    if(status){
      query.andWhere('task.status = :status', {status})
    }
    if(search){
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
    
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save()
    return task;
}
}
