import { inject, injectable } from 'tsyringe';

import Movie from '../infra/typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  movie_id: string;
}

@injectable()
class SearchMovieForDisciplineIdService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({ movie_id }: IRequest): Promise<Movie | undefined> {
    const movie = await this.moviesRepository.findById(movie_id);

    return movie;
  }
}

export default SearchMovieForDisciplineIdService;
