import { PrismaService } from "@/database/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CardService } from "../card.service";
import { CreateCardDto } from "../dto/create-card.dto";
import { UpdateCardDto } from "../dto/update-card.dto";

describe('CardService', () => {
  let service: CardService;
  let prisma: PrismaService;

  const mockPrisma = {
    card: {
      findFirst: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CardService>(CardService);
    prisma = module.get<PrismaService>(PrismaService);

    // limpa mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a card', async () => {
    const dto: CreateCardDto = { title: 'Card 1', columnId: 1 };
    mockPrisma.card.findFirst.mockResolvedValue({ position: 0 });
    mockPrisma.card.create.mockResolvedValue({ id: 1, ...dto, position: 1 });

    const result = await service.create(dto);
    expect(prisma.card.findFirst).toHaveBeenCalled();
    expect(prisma.card.create).toHaveBeenCalledWith({
      data: { ...dto, position: 1 },
    });
    expect(result).toEqual({ id: 1, ...dto, position: 1 });
  });

  it('should create many cards', async () => {
    const cards: CreateCardDto[] = [
      { title: 'Card A', columnId: 1 },
      { title: 'Card B', columnId: 1 },
    ];
    mockPrisma.card.findFirst.mockResolvedValue({ position: 0 });
    mockPrisma.card.createMany.mockResolvedValue({});

    const result = await service.createMany(cards);
    expect(prisma.card.createMany).toHaveBeenCalledWith({
      data: [
        { ...cards[0], position: 1 },
        { ...cards[1], position: 2 },
      ],
    });
    expect(result).toEqual([
      { ...cards[0], position: 1 },
      { ...cards[1], position: 2 },
    ]);
  });

  it('should update a card', async () => {
    const dto: UpdateCardDto = { title: 'Updated' };
    mockPrisma.card.update.mockResolvedValue({ id: 1, ...dto });

    const result = await service.update(1, dto);
    expect(prisma.card.update).toHaveBeenCalledWith({ where: { id: 1 }, data: dto });
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should delete a card', async () => {
    mockPrisma.card.delete.mockResolvedValue({});

    const result = await service.delete(1);
    expect(prisma.card.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual({ message: 'Card with ID [1] has been successfully deleted' });
  });
});
