import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMovieService from '@modules/disciplines/services/CreateMovieService';
import SearchMovieForDisciplineIdService from '@modules/disciplines/services/SearchMovieForDisciplineIdService';
import UpdateMovieService from '@modules/disciplines/services/UpdateMovieService';

export default class MoviesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { zip_code } = request.params;

    const user_id = request.user.id;

    return response.json({ fee: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { discipline_id } = request.params;

    const searchMovieForDisciplineIdService = container.resolve(
      SearchMovieForDisciplineIdService,
    );

    const movies = await searchMovieForDisciplineIdService.execute({
      discipline_id,
    });

    return response.json(classToClass(movies));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createMovieService = container.resolve(CreateMovieService);

      const { title } = req.body;
      const { filename } = req.file;

      const movie = await createMovieService.execute({
        title,
        filename,
      });

      return res.json(movie);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    console.log('Controller', req.body);
    console.log('Dados da Image:', req.user.id, req.file.filename);

    const { title, course_id, discipline_id } = req.body;
    const { filename } = req.file;

    const updateFile = container.resolve(UpdateMovieService);

    const movie = await updateFile.execute({
      title,
      course_id,
      discipline_id,
      filename,
    });

    return res.json(classToClass(movie));
  }
}
