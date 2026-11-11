import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    movie: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a movie when a valid ID is provided', async () => {
      const mockMovie = {
        id: 1,
        title: 'Interstellar',
        genre: 'Sci-Fi',
        releaseYear: 2014,
        director: 'Christopher Nolan',
        watched: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(prisma.movie, 'findUnique').mockResolvedValue(mockMovie as any);

      const result = await service.findOne(1);
      expect(result).toEqual(mockMovie);
      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when movie does not exist', async () => {
      vi.spyOn(prisma.movie, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('create', () => {
    it('should create and return a new movie', async () => {
      const dto = {
        title: 'Inception',
        genre: 'Sci-Fi',
        releaseYear: 2010,
        director: 'Christopher Nolan',
      };

      const createdMovie = {
        id: 2,
        ...dto,
        watched: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(prisma.movie, 'create').mockResolvedValue(createdMovie as any);

      const result = await service.create(dto);
      expect(result).toEqual(createdMovie);
      expect(prisma.movie.create).toHaveBeenCalledWith({ data: dto });
    });
  });
});
