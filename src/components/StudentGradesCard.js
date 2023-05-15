import { PaginatedGradeTable } from "./PaginatedGradeTable";

export const StudentGradesCard = (props) => {
  return (
    <PaginatedGradeTable data = {props.data} subjects = {props.subjects} absences = {props.absences} studentName={props.studentName} studentId={props.studentId}/>
  );
}