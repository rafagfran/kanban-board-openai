import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';

@Module({
  imports: [DatabaseModule],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService]
})
export class ColumnsModule { }
