import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { faker } from '@faker-js/faker';

export const tanulokFill = async () => {
  const ref = doc(collection(firestore, "Tanulok"));

  await setDoc(ref, {
    Nev: faker.name.fullName()
    });

  await addDoc(collection(ref, "Informaciok"),{
    Osztaly: "11J",
    Apa: faker.name.fullName({gender:'male'}),
    Anya: faker.name.fullName({gender:'female'}),
    Cim: {
      Varos: faker.address.cityName(),
      Utca: faker.address.streetAddress(true)
    },
    Telefon: faker.phone.number('+40 ### ### ###'),
    Anyanyelv: "Magyar",
    Vallas: "Romai-Katolikus",
    Allapot: "Diak",
    TornaFelmentes: "Nem",
  });
  
}

export const osztalyokFill = async() =>{
  const ref = doc(firestore, "Osztalyok", "11J");
  await setDoc(ref, {
    Osztalyfonok: faker.name.fullName(),
    Diakok: [faker.name.fullName(),faker.name.fullName(),faker.name.fullName(),faker.name.fullName(),faker.name.fullName(),faker.name.fullName()]
  });
  await addDoc(collection(ref, "Tanarok"), {
    [faker.word.noun()]: faker.name.fullName(),
    [faker.word.noun()]: faker.name.fullName(),
    [faker.word.noun()]: faker.name.fullName(),
    [faker.word.noun()]: faker.name.fullName(),
  });
  const stat = await addDoc(collection(ref, "Statisztikak"), {
    
  });

  await addDoc(collection(stat, "Fiu"), {
    
  });
  
  await addDoc(collection(stat, "Lany"), {
    
  });
}

export const tantargyakFill = async() => {
  const ref = doc(firestore, "Tantargyak", `${faker.word.noun()}`);
  await setDoc(ref, {
    Tanarok: [faker.name.fullName(),faker.name.fullName(),faker.name.fullName(),faker.name.fullName(),faker.name.fullName(),faker.name.fullName()]
  });
}

export const tanarokFill = async() => {
  const ref = doc(collection(firestore, "Tanarok"));

  await setDoc(ref, {
    Nev: faker.name.fullName(),
    Osztalyfelelose: "11J",
    Tantargy: [faker.word.noun(),faker.word.noun()]
    });

  await addDoc(collection(ref, "Informaciok"),{
    Cim: {
      Varos: faker.address.cityName(),
      Utca: faker.address.streetAddress(true)
    },
    Telefon: faker.phone.number('+40 ### ### ###'),
  });
}

export const jegyekFill = async () => {
  const ref = doc(collection(firestore, "Jegyek"));

  await setDoc(ref, {
    Datum: faker.date.recent(),
    Diak: faker.name.fullName(),
    Jegy: faker.random.numeric(),
    Targy: faker.word.noun()
    });
}
