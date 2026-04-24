import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt';
import { CreateTaskDto, QueryTaskDto, UpdateTaskDto } from 'src/dto/task.dto';

@Controller('api/v1/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto.title);
  }

  @Get()
  findAll(@Query() query: QueryTaskDto) {
    return this.tasksService.getAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Put()
  update(@Body() dto: UpdateTaskDto) {
    return this.tasksService.update(dto.id, dto.title);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: number) {
    return this.tasksService.toggle(id);
  }
}