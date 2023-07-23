import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'sajjad',
    password: 'sajjad960',
    database: 'taskmanagement',
    entities: [Task, User],
    synchronize: true,
  }),
  TasksModule,
  AuthModule,
  ],
})
export class AppModule {}
