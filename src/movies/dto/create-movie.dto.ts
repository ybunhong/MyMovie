import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsInt()
  @Min(1888) // First movie ever made
  @Max(2100)
  releaseYear: number;

  @IsString()
  @IsNotEmpty()
  director: string;
}
