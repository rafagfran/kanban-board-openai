import { Test, TestingModule } from '@nestjs/testing';
import { ColumnController } from '../column.controller';
import { ColumnService } from '../column.service';
import { CreateColumnDto } from '../dto/create-column.dto';

describe('ColumnController', () => {
  let controller: ColumnController;
  let service: ColumnService;

  const mockColumnService = {
    createColumn: jest.fn(),
    listAllColumns: jest.fn(),
    listColumnsWithCards: jest.fn(),
    deleteColumn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumnController],
      providers: [
        { provide: ColumnService, useValue: mockColumnService },
      ],
    }).compile();

    controller = module.get<ColumnController>(ColumnController);
    service = module.get<ColumnService>(ColumnService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createColumn', () => {
    it('should call service.createColumn with DTO', async () => {
      const dto: CreateColumnDto = { title: 'New Column', position: 1 };
      mockColumnService.createColumn.mockReturnValue('created-column');

      const result = await controller.createColumn(dto);
      expect(service.createColumn).toHaveBeenCalledWith(dto);
      expect(result).toBe('created-column');
    });
  });

  describe('listAllColumns', () => {
    it('should return all columns', async () => {
      const columns = [{ id: 1, name: 'Col1' }];
      mockColumnService.listAllColumns.mockReturnValue(columns);

      const result = await controller.listAllColumns();
      expect(service.listAllColumns).toHaveBeenCalled();
      expect(result).toBe(columns);
    });
  });

  describe('listWithCards', () => {
    it('should return columns with cards', async () => {
      const data = [{ id: 1, name: 'Col1', cards: [] }];
      mockColumnService.listColumnsWithCards.mockReturnValue(data);

      const result = await controller.listWithCards();
      expect(service.listColumnsWithCards).toHaveBeenCalled();
      expect(result).toBe(data);
    });
  });

  describe('deleteColumn', () => {
    it('should delete column by id', async () => {
      mockColumnService.deleteColumn.mockReturnValue('deleted');

      const result = await controller.deleteColumn(1);
      expect(service.deleteColumn).toHaveBeenCalledWith(1);
      expect(result).toBe('deleted');
    });
  });
});
