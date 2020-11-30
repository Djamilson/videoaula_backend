import { inject, injectable } from 'tsyringe';

import PaginatedCoursesResultDTO from '../dtos/IPaginatedCoursesResultDTO';
import IPaginationsDTO from '../dtos/IPaginationsDTO';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(
    paginationDTO: IPaginationsDTO,
  ): Promise<PaginatedCoursesResultDTO> {
    // const skippedItems = (paginationDTO.page - 1) * paginationDTO.limit;

    // const totalCount = await this.coursesRepository.count();
    const courses = await this.coursesRepository.findAll(paginationDTO);
    console.log('courses: ', courses);

    return {
      totalCount: 0,
      page: paginationDTO.page,
      limit: paginationDTO.limit,
      data: courses,
    };
  }
}

export default ListCoursesService;
