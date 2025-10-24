import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) { }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @Get('with-cards')
  listWithCards() {
    return this.columnService.listWithCards();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.columnService.delete(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(id, updateColumnDto)
  }
}
