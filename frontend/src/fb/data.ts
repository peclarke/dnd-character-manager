import { child, get, getDatabase, push, ref, set } from "firebase/database"
import { app } from "./firebase";
import { UserMetadata } from "firebase/auth";
import { RootCharacter } from "../types/characters";
import { basicCharacter } from "../components/character/utils";

type UserInfoProps = {
    uid: string;
    email: string;
    metadata: UserMetadata;
}

export const setUserInfo = (userInfo: UserInfoProps) => {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userInfo.uid), userInfo);
}

export const addSession = (num: number) => {
    const db = getDatabase(app);
    const sessionRef = ref(db, 'sessions');
    const newSessionRef = push(sessionRef);
    set(newSessionRef, num);
};

type AddCharacterProps = RootCharacter

export const addCharacter = (ch: AddCharacterProps = basicCharacter) => {
    const db = getDatabase(app);
    getCharacterNumbers()
    .then(charId => {
        set(ref(db, 'characters/' + charId), ch)
    });
};


export const DevTool = () => {
    console.log("dev tool active")
}

/**
 * Gets the unique ID of the newly added character by looking at the database
 * and counting the number of characters. 
 * @returns 
 */
const getCharacterNumbers = (): Promise<number> => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `characters/`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();
            const number = Object.keys(data).length;

            // generate a unique ID
            let uniqueId = (number * Math.round((Math.random() * 1000000))).toString();
            while (Object.keys(data).includes(uniqueId)) {
                uniqueId = (number * Math.round((Math.random() * 1000000))).toString();
            }
            return parseInt(uniqueId);
        } else {
            return 0;
        }
        }).catch((error) => {
            console.error(error);
            return -1;
        });
    }

/**
 * Cleans the name and turns it into an ID
 * @param name 
 * @returns 
 */
const cleanName = (name: string) => {
    return name.replace(/\s/g, "").toLowerCase()
}