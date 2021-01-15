import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Movie from '../infra/typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  title: string;
  movie: string;
  image: string;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('StorageProviderVimeo')
    private storageProviderVimeo: IStorageProvider,
  ) {}

  public async execute({ title, movie, image }: IRequest): Promise<Movie> {
    const serealizableMovie = movie.replace('https://vimeo.com/', '');

    const checkMovieExists = await this.moviesRepository.findByTitle(title);

    if (checkMovieExists) {
      throw new AppError('Movie already used.');
    }

    // await this.storageProvider.saveFile(filename);
    // await this.storageProviderVimeo.saveFile(filename);
    // console.log('Vou inicia a criação do video vimeo', filename);

    const newMovie = await this.moviesRepository.create({
      title,
      movie: serealizableMovie,
      image,
    });

    return newMovie;
  }
}

export default CreateMovieService;
