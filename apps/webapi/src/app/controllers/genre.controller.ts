import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { Genre } from '@entities/genre.entity';

class GenreController {
  public async createGenre(request: Request, response: Response, next: Function): Response {
    const genre: Genre = new Genre();

    genre.name = request.body.name;

    if (request.body.parentGenre) {
      genre.parentGenre = request.body.parentGenre;
    }

    await connection.manager.save(genre);
    return response.status(ResponseStatuses.STATUS_CREATED).json(genre);
  }

  public async getGenres(request: Request, response: Response, next: Function): Response {
    const genres = await connection.getRepository(Genre).find({
      select: ['id', 'name'],
      order: {
        name: SortDirections.ASC
      },
      take: 50
    });

    return response.status(ResponseStatuses.STATUS_OK).json(genres);
  }
}

export const genreController = new GenreController();
