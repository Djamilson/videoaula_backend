import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Movie from '../infra/typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  title: string;
  filename: string;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ title, filename }: IRequest): Promise<Movie> {
    console.log('Check', title, filename);

    const checkMovieExists = await this.moviesRepository.findByTitle(title);

    if (checkMovieExists) {
      throw new AppError('Movie already used.');
    }

    console.log('Fazendo a busca do theme', filename);

    console.log('Vai criar o video na aws', filename);
    await this.storageProvider.saveFile(filename);
    console.log('Criou o video na aws', filename);
    const movie = await this.moviesRepository.create({
      title,
      movie: filename,
    });

    return movie;
  }
}

export default CreateMovieService;
