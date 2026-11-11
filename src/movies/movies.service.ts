import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from './dto/update-movie.dto.js';
import { Prisma } from '@prisma/client';
import { QueryMovieDto } from './dto/query-movie.dto.js';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  findAll(query?: QueryMovieDto) {
    const where: Prisma.MovieWhereInput = {};

    if (query?.watched !== undefined) {
      where.watched = query.watched;
    }

    if (query?.genre) {
      where.genre = {
        equals: query.genre,
        mode: 'insensitive',
      };
    }

    if (query?.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { director: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.movie.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.findOne(id);

    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.movie.delete({
      where: { id },
    });

    return { message: `Movie with ID ${id} deleted successfully` };
  }

  async toggleWatched(id: number) {
    const movie = await this.findOne(id);

    return this.prisma.movie.update({
      where: { id },
      data: {
        watched: !movie.watched,
      },
    });
  }
}
