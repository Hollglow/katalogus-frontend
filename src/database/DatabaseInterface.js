import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase"

export const UpdateStudentInformation = async (key, value, id) => {
  const ref = doc(firestore, "Tanulok", id, "Informaciok", "Informacio");
  await updateDoc(ref, {
    [`${key}`]: value
  })
}