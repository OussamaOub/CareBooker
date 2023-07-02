import { firebase } from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from "@env";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  limit,
  query,
  orderBy,
  where,
  getDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const userslist = async () => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, limit(25));
  const querySnapshot = await getDocs(q);
  const usersList = querySnapshot.docs.map((doc) => doc.data());
  return usersList;
};

export const userss = async () => {
  const users = await userslist();
  return users;
};

export const uploadImage = async (uri, imagename) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, "images/" + imagename);
  const uploadTask = uploadBytes(storageRef, blob);
  return await getImage((await uploadTask).metadata.ref._location.path_);
};

export const getImage = async (imagename) => {
  const starsRef = ref(storage, imagename);
  return await getDownloadURL(starsRef);
};

export async function adduser(user) {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);
  const numDocuments = querySnapshot.size;
  const customId = numDocuments + 1;

  const docRef = doc(usersRef, customId.toString());
  await setDoc(docRef, { id: customId, ...user });

  console.log("Document written with ID: ", docRef.id);
}

export async function getDoctors() {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("properties.approved", "==", false.toString())
  );
  const querySnapshot = await getDocs(q);
  const doctorsList = querySnapshot.docs.map((doc) => doc.data());
  if (doctorsList.length == 0) {
    return null;
  } else return doctorsList;
}

export async function changedoctorapproval(id, state) {
  const usersRef = collection(db, "users");
  const docRef = doc(usersRef, id.toString());
  await setDoc(docRef, { properties: { approved: state } }, { merge: true });
}

export async function createmessagechannel(doctor, patient) {
  const channel = {
    doctor: doctor,
    patient: patient,
    messages: [],
  };

  const channelsRef = collection(db, "channels");
  const querySnapshot = await getDocs(channelsRef);
  const numDocuments = querySnapshot.size;
  const customId = numDocuments + 1;

  const docRef = doc(channelsRef, customId.toString());
  await setDoc(docRef, { id: customId, ...channel });

  console.log("Document written with ID: ", docRef.id);
}

export async function getchannel(doctor, patient) {
  const channelsRef = collection(db, "channels");
  const q = query(
    channelsRef,
    where("doctor", "==", doctor),
    where("patient", "==", patient)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    const channel = querySnapshot.docs.map((doc) => doc.data());
    return channel;
  } else {
    console.log("no channel found, making one");
    await createmessagechannel(doctor, patient);
    return await getchannel(doctor, patient);
  }
}

export async function getperson(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const person = querySnapshot.docs.map((doc) => doc.data());
  return person;
}

export async function addMessageToChannel(channel, message) {
  const channelsRef = collection(db, "channels");
  const docRef = doc(channelsRef, channel.toString());
  await updateDoc(docRef, {
    messages: arrayUnion(message),
  });
}

export async function getchannelbyuser(user) {
  const channelsRef = collection(db, "channels");
  if (user.properties.accountType == "doctor") {
    const q = query(channelsRef, where("doctor", "==", user.email));
    const querySnapshot = await getDocs(q);
    const channel = querySnapshot.docs.map((doc) => doc.data());
    return channel;
  } else {
    const q = query(channelsRef, where("patient", "==", user.email));
    const querySnapshot = await getDocs(q);
    const channel = querySnapshot.docs.map((doc) => doc.data());
    return channel;
  }
}

export async function addprescriptiontouser(prescription, patient, doctor) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", patient));
  const querySnapshot = await getDocs(q);
  const person = querySnapshot.docs.map((doc) => doc.data());
  const docRef = doc(usersRef, person[0].id.toString());
  await updateDoc(docRef, {
    prescriptions: arrayUnion(prescription),
  });
  const q2 = query(usersRef, where("email", "==", doctor));
  const querySnapshot2 = await getDocs(q2);
  const person2 = querySnapshot2.docs.map((doc) => doc.data());
  const docRef2 = doc(usersRef, person2[0].id.toString());
  await updateDoc(docRef2, {
    prescriptions: arrayUnion(prescription),
  });
}

export async function edituser(user) {
  const usersRef = collection(db, "users");
  const docRef = doc(usersRef, user.id.toString());
  await updateDoc(docRef, {
    ...user,
  });
  console.log("Updated user");
}

export async function addtounavailabledates(patient, doctor, date) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", patient));
  const querySnapshot = await getDocs(q);
  const person = querySnapshot.docs.map((doc) => doc.data());
  const docRef = doc(usersRef, person[0].id.toString());
  await updateDoc(docRef, {
    unavailableDates: arrayUnion(date),
  });
  const q2 = query(usersRef, where("email", "==", doctor));
  const querySnapshot2 = await getDocs(q2);
  const person2 = querySnapshot2.docs.map((doc) => doc.data());
  const docRef2 = doc(usersRef, person2[0].id.toString());
  await updateDoc(docRef2, {
    unavailableDates: arrayUnion(date),
  });
}

export async function fetchdoctors() {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("properties.accountType", "==", "doctor"));
  const querySnapshot = await getDocs(q);
  const doctors = querySnapshot.docs.map((doc) => doc.data());
  return doctors;
}

export async function fetchdates(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const person = querySnapshot.docs.map((doc) => doc.data());
  return person[0].unavailableDates;
}

export async function fetchprescriptions(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const person = querySnapshot.docs.map((doc) => doc.data());
  return person[0].prescriptions;
}

export async function getuserbyemail(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const person = querySnapshot.docs.map((doc) => doc.data());
  console.log(person[0]);
  return person[0];
}

export async function addusertocollection(user) {
  const usersRef = collection(db, "users");

  const docRef = doc(usersRef, user.id.toString());
  await setDoc(docRef, { ...user });
  console.log("Document written with ID: ", docRef.id);
}

export async function checkifuserexists(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    return true;
  } else {
    return false;
  }
}
