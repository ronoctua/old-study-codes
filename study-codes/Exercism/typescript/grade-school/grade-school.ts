export default class GradeSchool {
  constructor(private gradesDB: Map<string, string[]> = new Map()) {}

  public studentsInGrade(grade: number): string[] {
    return (this.gradesDB.get(grade.toString()) || []).slice();
  }

  public studentRoster(): Map<string, string[]> {
    return new Map(
      [...this.gradesDB.entries()].map((gradeAndStudents) => [
        gradeAndStudents[0],
        gradeAndStudents[1].slice(),
      ])
    );
  }

  public addStudent(student: string, grade: number): void {
    this.gradesDB.forEach(
      (students) =>
        students.includes(student) && students.splice(students.indexOf(student))
    );

    this.gradesDB.set(
      grade.toString(),
      [...this.studentsInGrade(grade), student].sort()
    );
  }
}
