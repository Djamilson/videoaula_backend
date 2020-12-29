import ICreateMovieDTO from '../dtos/ICreateMovieDTO';
import Movie from '../infra/typeorm/entities/Movie';

export default interface IMoviesRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByTitle(title: string): Promise<Movie | undefined>;
  create(data: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
}
