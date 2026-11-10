import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from './dto/update-movie.dto.js';
import { QueryMovieDto } from './dto/query-movie.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // PUBLIC
  @Get()
  findAll(@Query() query: QueryMovieDto) {
    return this.moviesService.findAll(query);
  }

  // PUBLIC
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  // PROTECTED (Requires Bearer token)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  // PROTECTED (Requires Bearer token)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  // PROTECTED (Requires Bearer token)
  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-watched')
  toggleWatched(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.toggleWatched(id);
  }

  // PROTECTED (Requires Bearer token)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
