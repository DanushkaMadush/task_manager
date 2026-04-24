import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt';
import { TasksService } from './tasks.service';

@Controller('api/v1/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  create(@Body() body: any) {
    return this.taskService.create(body.title);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.taskService.getAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(Number(id));
  }

  @Put()
  update(@Body() body: any) {
    return this.taskService.update(body.id, body.title);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.taskService.toggle(Number(id));
  }
}