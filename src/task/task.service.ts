import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { v4 as uuidV4 } from 'uuid';
import { ITask } from './task.interface';
@Injectable()
export class TaskService {
  tasks: ITask[] = [];
  create(taskDTO: TaskDTO): ITask {
    const task = {
      id: uuidV4(),
      ...taskDTO,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): ITask[] {
    return this.tasks;
  }

  findById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  updateTaskById(id: string, body: ITask): ITask {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return { id, ...body };
  }

  deleteTaskById(id: string): ITask {
    const task = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return task;
  }
}
