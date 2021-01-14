import ICreateMovieDTO from '../dtos/ICreateMovieDTO';
import CourseDiscipline from '../infra/typeorm/entities/CourseDiscipline';
import Movie from '../infra/typeorm/entities/Movie';

export default interface IMoviesRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByTitle(title: string): Promise<Movie | undefined>;
  findAllMoviesForDisciplineId(
    discipline_id: string,
  ): Promise<CourseDiscipline[] | undefined>;

  create(data: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
}
