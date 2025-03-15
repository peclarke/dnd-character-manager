import { child, get, getDatabase, push, ref, set } from "firebase/database"
import { app } from "./firebase";
import { UserMetadata } from "firebase/auth";
import { Campaign, RootCharacter } from "../types/characters";
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
    getFolderNumber()
    .then(charId => {
        set(ref(db, 'characters/' + charId), {...ch, uid: charId })
    });
};

export const setUpdateCharacter = (uid: number, newChar: RootCharacter) => {
    const db = getDatabase(app);
    set(ref(db, 'characters/' + uid), newChar);
}

export const getCharacter = (uid: number): Promise<RootCharacter | undefined> => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `characters/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val();
    }
    }).catch((error) => {
        console.error(error);
    });
}

export const addCampaign = (
        name: string = "New Campaign", 
        sessions: number = 1, 
        dmUuid: number = -1,
        playerUuids: number[] = [-1, -2],
    ) => {
    const db = getDatabase(app);
    const uniqiueCampaignIdentifier = 'jaspar_tyranny_of_dragons_20242025';
    const campaignOpts = {cid: uniqiueCampaignIdentifier, name: name, sessions: sessions, dmUuid: dmUuid, playerUuids: playerUuids};
    set(ref(db, 'campaigns/' + uniqiueCampaignIdentifier), campaignOpts)
}

export const getCampaignInfo = async (cid: string): Promise<Campaign> => {
    const db = getDatabase(app);
    const sessions = await get(ref(db, `campaigns/${cid}`));
    return sessions.val();
}

export const getAllCampaignIds = () => {
    const db = getDatabase(app);
    return get(ref(db, 'campaigns')).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.keys(data);
        } else {
            return [];
        }
    }).catch((error) => {
        console.error(error);
        return [];
    });
}

export const addCampaignSession = (cid: string) => {
    if (cid === "none") {
        console.log("no campaigns selected");
        return;
    }
    
    const db = getDatabase(app);
    const sessionRef = ref(db, `campaigns/${cid}/sessions`);
    get(sessionRef).then(snapshot => {
        if (snapshot.exists()) {
            const num = snapshot.val();
            set(sessionRef, num + 1);
        } else {
            set(sessionRef, 1);
        }
    });
}


export const DevTool = async () => {
    console.log("DEV TOOL PRESSED");
    // addCampaign();
    // getCampaignInfo('jaspar_tyranny_of_dragons_20242025');
    // console.log(await getAllCampaignIds());
}

/**
 * Gets the unique ID of the newly added character by looking at the database
 * and counting the number of characters. 
 * @returns 
 */
const getFolderNumber = (folder: string = 'characters'): Promise<number> => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `${folder}/`))
        .then((snapshot) => {
        if (snapshot.exists()) {
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