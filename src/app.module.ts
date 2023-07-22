import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'sajjad',
    password: 'sajjad960',
    database: 'taskmanagement',
    entities: [Task],
  }),
  TasksModule,
  ],
})
export class AppModule {}
