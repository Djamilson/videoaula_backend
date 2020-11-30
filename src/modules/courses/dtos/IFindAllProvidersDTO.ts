interface IFindCourseIdDTO {
  id: string;
}

export default interface IFindAllProvidersDTO {
  listIDCourse: IFindCourseIdDTO[];
}
