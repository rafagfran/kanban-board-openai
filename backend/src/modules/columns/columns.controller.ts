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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) { }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get('with-cards')
  listWithCards() {
    return this.columnsService.listWithCards();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.columnsService.delete(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto)
  }
}
