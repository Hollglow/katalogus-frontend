import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

export const UpdateStudentInformation = async (key, value, id) => {
  const ref = doc(firestore, "Tanulok", id, "Informaciok", "Informacio");
  await updateDoc(ref, {
    [`${key}`]: value,
  });
};

export const GetAllClasses = async () => {
  const ref = collection(firestore, "Osztalyok");
  const classesSnapshot = await getDocs(ref);
  return classesSnapshot;
};

export const AddGrade = async (
  subject,
  grade,
  studentId,
  studentName,
  date
) => {
  const result = await addDoc(collection(firestore, "Jegyek"), {
    Datum: Timestamp.fromDate(date),
    Diak: studentName,
    Jegy: grade,
    Targy: subject,
    Torzsszam: studentId,
  });
  return result;
};

export const AddAbsence = async (subject, studentId, studentName, date) => {
  const result = await addDoc(collection(firestore, "Hianyzasok"), {
    Datum: Timestamp.fromDate(date),
    Diak: studentName,
    Igazolt: false,
    Targy: subject,
    Torzsszam: studentId,
  });
  return result;
};

export const UpdateAbsence = async (id, value) => {
  await updateDoc(doc(firestore, "Hianyzasok", id), {
    Igazolt: value,
  });
};
export const DeleteGrade = async (id) => {
  await deleteDoc(doc(firestore, "Jegyek", id));
};

export const DeleteAbsence = async (id) => {
  await deleteDoc(doc(firestore, "Hianyzasok", id));
};

export const UpdateClassStatistic = async (classId, gender, key, value) => {
  await updateDoc(
    doc(
      firestore,
      "Osztalyok",
      classId,
      "Statisztikak",
      "Statisztika",
      gender,
      "Statisztika"
    ),
    {
      [key]: value,
    }
  );
};

export const GetAllTeachers = async () => {
  const ref = doc(firestore, "Config", "Config");
  const teachersSnapshot = await getDoc(ref);
  return teachersSnapshot;
};

export const GetAllSubjectsAndTeachers = async () => {
  const ref = doc(firestore, "Config", "Config");
  const snapshot = await getDoc(ref);
  return snapshot;
};

export const IncrementStudentStatistic = async (clas, gender, key) => {
  const ref = doc(
    firestore,
    "Osztalyok",
    clas,
    "Statisztikak",
    "Statisztika",
    gender,
    "Statisztika"
  );
  await updateDoc(ref, {
    [`${key}`]: increment(1),
  });
};

export const DecrementStudentStatistic = async (clas, gender, key) => {
  const ref = doc(
    firestore,
    "Osztalyok",
    clas,
    "Statisztikak",
    "Statisztika",
    gender,
    "Statisztika"
  );
  await updateDoc(ref, {
    [`${key}`]: increment(-1),
  });
};
