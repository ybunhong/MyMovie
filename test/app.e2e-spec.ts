import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Movies API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /movies (Public)', () => {
    it('should return 200 OK without requiring authentication', async () => {
      const response = await request(app.getHttpServer()).get('/movies');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /movies (Protected)', () => {
    it('should return 401 Unauthorized when no token is supplied', async () => {
      const response = await request(app.getHttpServer()).post('/movies').send({
        title: 'Unauthorized Test',
        genre: 'Drama',
        releaseYear: 2020,
        director: 'Test Director',
      });

      expect(response.status).toBe(401);
    });
  });
});
