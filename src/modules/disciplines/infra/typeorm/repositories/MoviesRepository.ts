import { getRepository, Repository } from 'typeorm';

import ICreateMovieDTO from '@modules/disciplines/dtos/ICreateMovieDTO';
import IMoviesRepository from '@modules/disciplines/repositories/IMoviesRepository';

import CourseDiscipline from '../entities/CourseDiscipline';
import Movie from '../entities/Movie';

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  private ormCourseDisciplineRepository: Repository<CourseDiscipline>;

  constructor() {
    this.ormCourseDisciplineRepository = getRepository(CourseDiscipline);
    this.ormRepository = getRepository(Movie);
  }

  public async findById(id: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne(id);

    return movie;
  }

  public async findByTitle(title: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne({ where: { title } });

    return movie;
  }

  public async findAllMoviesForDisciplineId(
    discipline_id: string,
  ): Promise<CourseDiscipline[] | undefined> {
    const courseDisciplines = await this.ormCourseDisciplineRepository.find({
      where: { discipline_id },
      order: { created_at: 'DESC' },
      relations: ['discipline', 'theme', 'theme.movie'],
    });

    return courseDisciplines;
  }

  public async create(movie: ICreateMovieDTO): Promise<Movie> {
    const newMovie = this.ormRepository.create(movie);

    await this.ormRepository.save(newMovie);

    return newMovie;
  }

  public async save(movie: Movie): Promise<Movie> {
    return this.ormRepository.save(movie);
  }
}

export default MoviesRepository;
