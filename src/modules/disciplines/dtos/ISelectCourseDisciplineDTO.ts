interface IDiscipline {
  id: string;
  name: string;
}

export default interface ISelectCourseDisciplineDTO {
  id: string;
  discipline: IDiscipline;
}
