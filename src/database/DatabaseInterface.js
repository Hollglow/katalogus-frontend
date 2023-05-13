import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
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