import { Injectable, NotFoundException } from '@nestjs/common';
import { idCounter, tasks } from './store';
import { Task } from './task.model';

let counter = idCounter;

@Injectable()
export class TasksService {
  // create a new task
  create(title: string): Task {
    const task: Task = { id: counter++, title, completed: false };
    tasks.push(task);
    return task;
  }

  // getall tasks
  getAll(query: any) {
    let result = [...tasks];

    // filtering tasks
    if (query.status === 'completed') {
      result = result.filter((t) => t.completed);
    } else if (query.status === 'pending') {
      result = result.filter((t) => !t.completed);
    }

    // pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;

    const start = (page - 1) * limit;
    const end = start + limit;

    return result.slice(start, end);
  }

  // get task by id
  findOne(id: number): Task {
    const task = tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  // update task details
  update(id: number, title: string): Task {
    const task = this.findOne(id);
    task.title = title;
    return task;
  }

  // update task status
  toggle(id: number): Task {
    const task = this.findOne(id);
    task.completed = !task.completed;
    return task;
  }
}