import { collection, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Papa from 'papaparse';

export const tanulokFillExcel = async (e) => {
  const csvFile = e.target.files[0];
  const tanulok = await parseCsv(csvFile, true);
  
  for (const tanulo of tanulok.data) {
    await tanulokFill(tanulo);
  };
  
}


export const tanarokFillExcel = async (e) => {
  const csvFile = e.target.files[0];
  const tanarok = await parseCsv(csvFile, true);
  
  for (const tanar of tanarok.data) {
    await tanarokFill(tanar);
  };
  
}


export const tanarbeosztasFillExcel = async (e) => {
  const csvFile = e.target.files[0];
  const beosztasok = await parseCsv(csvFile, false);
  
  for (const beosztas of beosztasok.data) {
    await beosztasFill(beosztas);
  };
  
}

const parseCsv = (csvFile, header) => new Promise((resolve, reject) => {
  Papa.parse(csvFile, {
    header: header,
    encoding: "UTF-8",
    skipEmptyLines: true,
    complete: function (results, file) {
      resolve(results);
      },
      error: function(error) {
        reject(error);
      }
    });
})


const tanulokFill = async (tanulo) => {
  const ref = doc(firestore, "Tanulok", tanulo.Törzsszám);

  await setDoc(ref, {
    Nev: tanulo.Név,
    Osztaly: tanulo.Osztály
    });

  await setDoc(doc(ref, "Informaciok", "Informacio"),{
    Apa: tanulo.Apa,
    Anya: tanulo.Anya,
    Helyiseg: tanulo.Helyiség,
    Utca: tanulo.Utca,
    Telefon: tanulo.Telefon,
    Anyanyelv: tanulo.Anyanyelv,
    Vallas: tanulo.Vallás,
    Allapot: tanulo.Állapot,
    TornaFelmentes: tanulo.TornaFelmentés,
  });

  const osztalyRef = doc(firestore, "Osztalyok", tanulo.Osztály);

  const osztalySnapshot = await getDoc(osztalyRef);
  if (osztalySnapshot.data()) {
    console.log("exists", osztalySnapshot, osztalySnapshot.data());
    await updateDoc(osztalyRef, {
      [`Diakok.${tanulo.Törzsszám}`]: tanulo.Név
    })
  }
  else {
    await setDoc(osztalyRef, {
      Diakok: {[`${tanulo.Törzsszám}`]: tanulo.Név} 
    });
    await setDoc(doc(osztalyRef, "Statisztikak", "Statisztika"), {

    });

    await setDoc(doc(osztalyRef, "Statisztikak", "Statisztika", "Fiu", "Statisztika"), {
      Varosi: 0,
      Falusi: 0,
      Elment: 0,
      Erkezett: 0,
      Halasztott: 0,
      OsztalyIsmetlo: 0,
      IskolaOtthagyas: 0,
      HianyzasbolIsmetlo: 0
    });
    
    await setDoc(doc(osztalyRef, "Statisztikak", "Statisztika", "Lany", "Statisztika"), {
      Varosi: 0,
      Falusi: 0,
      Elment: 0,
      Erkezett: 0,
      Halasztott: 0,
      OsztalyIsmetlo: 0,
      IskolaOtthagyas: 0,
      HianyzasbolIsmetlo: 0
    });
  }
}

const beosztasFill = async(beosztas) => {
  beosztas = beosztas.filter(item => item !== "");
  const ref = doc(firestore, "Tantargyak", `${beosztas[2]}`);
  await setDoc(ref, {
    Tanarok: arrayUnion(`${beosztas[1]}`)
  }, {merge: true});

  const tanarokRef = doc(firestore, "Tanarok", `${beosztas[0]}`);
  const tanarSnapshot = await getDoc(tanarokRef);

  let iter = 3;
  if (tanarSnapshot.data()){
    for (iter = 3; iter < beosztas.length; iter++) {
      await updateDoc(tanarokRef, {
        [`Tantargy.${beosztas[iter]}`]: `${beosztas[2]}`
      })
    }
  }

  const osztalyokRef = collection(firestore, "Osztalyok");

  let osztalyRef;
  for (iter = 3; iter < beosztas.length; iter++){
    osztalyRef = doc(osztalyokRef, `${beosztas[iter]}`);
    await updateDoc(osztalyRef, {
      [`Tanarok.${beosztas[2]}`]: `${beosztas[1]}`
    })
  }

}

const tanarokFill = async(tanar) => {
  const ref = doc(firestore, "Tanarok", tanar.Törzsszám);

  await setDoc(ref, {
    Nev: tanar.Név,
    Osztalyfonoke: tanar.Osztályfőnöke,
    Tantargy: {}
  });

  const osztalyRef = doc(firestore, "Osztalyok", tanar.Osztályfőnöke);
  await updateDoc(osztalyRef, {
    Osztalyfonok: tanar.Név
  });

  await setDoc(doc(ref, "Informaciok", "Informacio"),{
    Helyiseg: tanar.Helyiség,
    Utca: tanar.Utca,
    Telefon: tanar.Telefon,
  });
}
