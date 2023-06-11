import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import Papa from "papaparse";
import { faker } from "@faker-js/faker";
import { GenerateHash, GeneratePassword, GenerateSalt } from "./Cryptography";

export const generateAdmin = async () => {
  const uid = GenerateAdminUid();

  const salt = GenerateSalt();

  const pass = GeneratePassword();

  const hash = GenerateHash(pass, salt);

  await setDoc(doc(firestore, "Felhasznalok", uid), {
    Roles: {
      admin: true,
      tanar: false,
      diak: false,
    },
    Salt: salt,
    Hash: hash,
  });

  const file = new Blob([JSON.stringify({ pass: pass, uid: uid })], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "admin.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const tanulokFillExcel = async (e) => {
  const csvFile = e.target.files[0];
  const tanulok = await parseCsv(csvFile, true);

  let tanuloList = [];
  for (const tanulo of tanulok.data) {
    tanuloList.push(await tanulokFill(tanulo));
  }
  const file = new Blob([JSON.stringify(tanuloList)], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "download.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const tanarokFillExcel = async (e) => {
  const csvFile = e.target.files[0];
  const tanarok = await parseCsv(csvFile, true);

  let tanarList = [];
  for (const tanar of tanarok.data) {
    tanarList.push(await tanarokFill(tanar));
  }
  const file = new Blob([JSON.stringify(tanarList)], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "download.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const tanarbeosztasFillExcel = async (e) => {
  const csvFile = e.target.files[0];
  const beosztasok = await parseCsv(csvFile, false);

  for (const beosztas of beosztasok.data) {
    await beosztasFill(beosztas);
  }
};

const parseCsv = (csvFile, header) =>
  new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: header,
      encoding: "UTF-8",
      skipEmptyLines: true,
      complete: function (results, file) {
        resolve(results);
      },
      error: function (error) {
        reject(error);
      },
    });
  });

const tanulokFill = async (tanulo) => {
  const ref = doc(firestore, "Tanulok", tanulo.Törzsszám);

  await setDoc(ref, {
    Nev: tanulo.Név,
    Osztaly: tanulo.Osztály,
  });

  await setDoc(doc(ref, "Informaciok", "Informacio"), {
    Apa: tanulo.Apa,
    Anya: tanulo.Anya,
    Helyiseg: tanulo.Helyiség,
    Utca: tanulo.Utca,
    Telefon: tanulo.Telefon,
    Anyanyelv: tanulo.Anyanyelv,
    Vallas: tanulo.Vallás,
    Nem:
      tanulo.Nem === "Male" || tanulo.Nem === "Fiu" || tanulo.Nem === "Fiú"
        ? "Fiu"
        : "Lany",
    Allapot: tanulo.Állapot,
    TornaFelmentes: tanulo["Torna Felmentés"] ? true : false,
    Varosi: tanulo.Városi ? true : false,
    Elment: tanulo.Elment ? true : false,
    Erkezett: tanulo.Érkezett ? true : false,
    EvetHalasztott: tanulo["Évet Halasztott"] ? true : false,
    OsztalyIsmetlo: tanulo["Osztály Ismétlő"] ? true : false,
    IskolaOtthagyas: tanulo["Iskola Otthagyás"] ? true : false,
    HianyzasbolIsmetlo: tanulo["Hiányzás Miatt Ismétlő"] ? true : false,
  });

  const osztalyRef = doc(firestore, "Osztalyok", tanulo.Osztály);

  const osztalySnapshot = await getDoc(osztalyRef);
  if (osztalySnapshot.data()) {
    await updateDoc(osztalyRef, {
      [`Diakok.${tanulo.Törzsszám}`]: tanulo.Név,
    });
    await setDoc(
      doc(firestore, "Extra", "Osztalyok"),
      {
        Osztalyok: arrayUnion(tanulo.Osztály),
      },
      { merge: true }
    );
  } else {
    await setDoc(osztalyRef, {
      Diakok: { [`${tanulo.Törzsszám}`]: tanulo.Név },
    });
  }

  const docSnap = await getDoc(
    doc(osztalyRef, "Statisztikak", "Statisztika", "Fiu", "Statisztika")
  );

  if (!docSnap.data()) {
    console.log("Doc doesnt exists");
    await setDoc(
      doc(osztalyRef, "Statisztikak", "Statisztika", "Fiu", "Statisztika"),
      {
        Varosi: 0,
        Falusi: 0,
        Elment: 0,
        Erkezett: 0,
        Halasztott: 0,
        OsztalyIsmetlo: 0,
        IskolaOtthagyas: 0,
        HianyzasbolIsmetlo: 0,
      }
    );

    await setDoc(
      doc(osztalyRef, "Statisztikak", "Statisztika", "Lany", "Statisztika"),
      {
        Varosi: 0,
        Falusi: 0,
        Elment: 0,
        Erkezett: 0,
        Halasztott: 0,
        OsztalyIsmetlo: 0,
        IskolaOtthagyas: 0,
        HianyzasbolIsmetlo: 0,
      }
    );
  }

  await updateDoc(
    doc(
      osztalyRef,
      "Statisztikak",
      "Statisztika",
      tanulo.Nem === "Fiu" || tanulo.Nem === "Fiú" || tanulo.Nem === "Male"
        ? "Fiu"
        : "Lany",
      "Statisztika"
    ),
    {
      Varosi: tanulo.Városi ? increment(1) : increment(0),
      Falusi: tanulo.Városi ? increment(0) : increment(1),
      Elment: tanulo.Elment ? increment(1) : increment(0),
      Erkezett: tanulo.Érkezett ? increment(1) : increment(0),
      EvetHalasztott: tanulo["Évet Halasztott"] ? increment(1) : increment(0),
      OsztalyIsmetlo: tanulo["Osztály Ismétlő"] ? increment(1) : increment(0),
      IskolaOtthagyas: tanulo["Iskola Otthagyás"] ? increment(1) : increment(0),
      HianyzasbolIsmetlo: tanulo["Hiányzás Miatt Ismétlő"]
        ? increment(1)
        : increment(0),
    }
  );

  const uid = GenerateStudentUid(tanulo.Név, tanulo.Törzsszám);

  const salt = GenerateSalt();

  const pass = GeneratePassword();

  const hash = GenerateHash(pass, salt);

  await setDoc(doc(firestore, "Felhasznalok", uid), {
    Roles: {
      admin: false,
      tanar: false,
      diak: true,
      osztaly: tanulo.Osztály,
      torzsszam: tanulo.Törzsszám,
    },
    Salt: salt,
    Hash: hash,
  });
  return { nev: tanulo.Név, uid: uid, pass: pass };
};

export const test = async () => {};

const beosztasFill = async (beosztas) => {
  beosztas = beosztas.filter((item) => item !== "");
  const ref = doc(firestore, "Tantargyak", `${beosztas[2]}`);
  await setDoc(
    ref,
    {
      Tanarok: arrayUnion(`${beosztas[1]}`),
    },
    { merge: true }
  );

  await setDoc(
    doc(firestore, "Extra", "Config"),
    {
      Tantargyak: arrayUnion(beosztas[2]),
    },
    { merge: true }
  );

  const tanarokRef = doc(firestore, "Tanarok", beosztas[0]);
  const tanarSnapshot = await getDoc(tanarokRef);

  let iter = 3;
  if (tanarSnapshot.data()) {
    for (iter = 3; iter < beosztas.length; iter++) {
      await updateDoc(tanarokRef, {
        [`Tantargy.${beosztas[iter]}`]: arrayUnion(beosztas[2]),
      });
      await updateDoc(
        doc(firestore, "Felhasznalok", tanarSnapshot.data().Uid),
        {
          [`Roles.${beosztas[iter]}`]: true,
        },
        { merge: true }
      );
    }
  }

  const osztalyokRef = collection(firestore, "Osztalyok");

  let osztalyRef;
  for (iter = 3; iter < beosztas.length; iter++) {
    osztalyRef = doc(osztalyokRef, `${beosztas[iter]}`);
    await updateDoc(osztalyRef, {
      [`Tanarok.${beosztas[2]}`]: `${beosztas[1]}`,
    });
  }
};

const tanarokFill = async (tanar) => {
  const ref = doc(firestore, "Tanarok", tanar.Törzsszám);

  const uid = GenerateTeacherUid(tanar.Név);

  await setDoc(ref, {
    Nev: tanar.Név,
    Osztalyfonoke: tanar.Osztályfőnöke,
    Tantargy: {},
    Uid: uid,
  });

  const osztalyRef = doc(firestore, "Osztalyok", tanar.Osztályfőnöke);
  await updateDoc(osztalyRef, {
    Osztalyfonok: tanar.Név,
  });

  await setDoc(doc(ref, "Informaciok", "Informacio"), {
    Helyiseg: tanar.Helyiség,
    Utca: tanar.Utca,
    Telefon: tanar.Telefon,
  });

  await setDoc(
    doc(firestore, "Extra", "Config"),
    {
      Tanarok: arrayUnion(tanar.Név),
    },
    { merge: true }
  );

  const salt = GenerateSalt();

  const pass = GeneratePassword();

  const hash = GenerateHash(pass, salt);

  //console.log(uid, salt, pass, hash);
  await setDoc(doc(firestore, "Felhasznalok", uid), {
    Roles: {
      admin: false,
      tanar: true,
      diak: false,
      osztalyfonoke: tanar.Osztályfőnöke,
      torzsszam: tanar.Törzsszám,
    },
    Salt: salt,
    Hash: hash,
  });
  return { nev: tanar.Név, uid: uid, pass: pass };
};

const GenerateTeacherUid = (name) => {
  return (
    "edu_" +
    name
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "") +
    "_" +
    faker.random.alpha(4)
  );
};

const GenerateStudentUid = (name, id) => {
  return (
    name
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "") + id
  );
};

const GenerateAdminUid = () => {
  return "admin_" + faker.random.alpha(6);
};
