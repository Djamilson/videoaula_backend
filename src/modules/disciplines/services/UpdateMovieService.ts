import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Movie from '../infra/typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  course_id: string;
  discipline_id: string;
  filename: string;
  title: string;
}

@injectable()
class UpdateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    course_id,
    discipline_id,
    filename,
    title,
  }: IRequest): Promise<Movie> {
    const movie = await this.moviesRepository.findByTitle(filename);

    if (!movie) {
      throw new AppError('Already movie', 401);
    }

    if (movie.movie) {
      await this.storageProvider.deleteFile(movie.movie);
    }

    await this.storageProvider.saveFile(filename);

    movie.movie = filename;
    movie.title = title;

    await this.moviesRepository.save(movie);

    return movie;
  }
}

export default UpdateMovieService;
