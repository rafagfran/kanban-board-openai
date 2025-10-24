import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from '../card.controller';
import { CardService } from '../card.service';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';

describe('CardController', () => {
  let controller: CardController;
  // let service: CardService;

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        { provide: CardService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<CardController>(CardController);
    // service = module.get<CardService>(CardService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    const dto: CreateCardDto = { title: 'Card 1', columnId: 1 };
    const result = { id: 1, ...dto, position: 1 };
    mockService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a card', async () => {
    const dto: UpdateCardDto = { title: 'Updated' };
    const result = { id: 1, ...dto };
    mockService.update.mockResolvedValue(result);

    expect(await controller.update(1, dto)).toEqual(result);
    expect(mockService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a card', async () => {
    const result = { message: 'Card with ID [1] has been successfully deleted' };
    mockService.delete.mockResolvedValue(result);

    expect(await controller.delete(1)).toEqual(result);
    expect(mockService.delete).toHaveBeenCalledWith(1);
  });
});
