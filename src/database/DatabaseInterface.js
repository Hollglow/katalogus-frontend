import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase"

export const UpdateStudentInformation = async (key, value, id) => {
  const ref = doc(firestore, "Tanulok", id, "Informaciok", "Informacio");
  await updateDoc(ref, {
    [`${key}`]: value
  })
}

export const GetAllClasses = async () => {
  const ref = collection(firestore, "Osztalyok");
  const classesSnapshot = await getDocs(ref);
  return classesSnapshot;
}

export const AddGrade = async (subject, grade, studentId, studentName) => {
 const result = await addDoc(collection(firestore, "Jegyek"), {
    Datum: Timestamp.fromDate(new Date()),
    Diak: studentName,
    Jegy: grade,
    Targy: subject,
    Torzsszam: studentId
  });
  return result;
}

export const AddAbsence = async (subject, studentId, studentName) => {
  const result = await addDoc(collection(firestore, "Hianyzasok"), {
     Datum: Timestamp.fromDate(new Date()),
     Diak: studentName,
     Igazolt: false,
     Targy: subject,
     Torzsszam: studentId
   });
   return result;
 }

export const UpdateAbsence = async (id, value) => {
  await updateDoc(doc(firestore, "Hianyzasok", id), {
    Igazolt: value
  })
}
export const DeleteGrade = async (id) => {
  await deleteDoc(doc(firestore, "Jegyek", id));
}

export const DeleteAbsence = async (id) => {
  await deleteDoc(doc(firestore, "Hianyzasok", id));
}

export const UpdateClassStatistic = async (classId, gender, key, value) => {
  await updateDoc(doc(firestore, "Osztalyok", classId, "Statisztikak", "Statisztika", gender, "Statisztika"), {
    [key]: value
  })
}