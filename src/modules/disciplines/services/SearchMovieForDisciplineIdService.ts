import { inject, injectable } from 'tsyringe';
import CourseDiscipline from '../infra/typeorm/entities/CourseDiscipline';

import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  discipline_id: string;
}

interface IMovie {
  id: string;
  title: string;
  movie: string;
  theme: {
    id: string;
    theme: string;
  };
  movie_url(): void;
}

@injectable()
class SearchMovieForDisciplineIdService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    discipline_id,
  }: IRequest): Promise<IMovie[] | undefined> {
    const newList = await this.moviesRepository.findAllMoviesForDisciplineId(
      discipline_id,
    );
    /*
    const movies = newList?.map(vd => {
      return {
        id: vd.movie.id,
        title: vd.movie.title,
        movie: vd.movie.movie,

        theme: {
          id: vd.movie.theme.id,
          theme: vd.movie.theme.theme,
        },
        movie_url: vd.movie.getAvatarUrl,
      };
    });
*/

    return undefined;
  }
}

export default SearchMovieForDisciplineIdService;
