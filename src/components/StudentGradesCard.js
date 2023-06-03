import { GradeTable } from "./GradeTable";

export const StudentGradesCard = (props) => {
  return (
    <GradeTable
      data={props.data}
      subjects={props.subjects}
      absences={props.absences}
      studentName={props.studentName}
      studentId={props.studentId}
    />
  );
};
