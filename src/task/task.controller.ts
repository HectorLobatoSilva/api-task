import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() taskDTO: TaskDTO) {
    return this.taskService.create(taskDTO);
  }

  @Post('error')
  error() {
    // throw new HttpException('Error en peticion', HttpStatus.BAD_REQUEST);
    // throw new BadRequestException('Error en la peticion');
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        reject('Error en la promesa');
      }, 5000),
    );
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updatedTask: TaskDTO) {
    return this.taskService.updateTaskById(id, updatedTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
