import { AppCharacter } from "./characters";

export type AppStateType = {
    uid: string;

    characters: AppCharacter[];
    selectedCharacter: string; // index
    
    // firebase things
    actionQueue: Record<string, number>;
}

export const initialState: AppStateType = { // this should be replaced with what is in the database
    uid: "",

    characters: [
        {
            name:"Seth Beau",
            class:"Ranger / Rogue",
            avatar:"https://www.dndbeyond.com/avatars/20479/332/637677702146463037.jpeg",
            level:"5",
            race: "Harengon",
            notes: "My character!!",
            desc: "Just a cheeky ol rabbit",
            pinned: true,
            uid: "1111",
            session: 1
        },
        {
            name:"Jean Pierre",
            class:"Paladin",
            avatar:"",
            level:"5",
            race: "Human",
            notes: "",
            desc: "he's french damnit",
            pinned: false,
            uid: "0000",
            session: 1
        },
        {
            name:"Yvonne",
            class:"Cleric",
            avatar:"",
            level:"5",
            race: "Aasimar",
            notes: "",
            desc: "",
            pinned: false,
            uid: "2222",
            session: 1
        },
        {
            name:"Borgus",
            class:"Druid",
            avatar:"",
            level:"5",
            race: "Tortle",
            notes: "",
            desc: "",
            pinned: true,
            uid: "2332",
            session: 1
        },
        {
            name:"Rictavio",
            class:"Bard",
            avatar:"",
            level:"5",
            race: "Human??",
            notes: "",
            desc: "sketchy fellow",
            pinned: false,
            uid: "3223",
            session: 2
        }
    ],
    selectedCharacter: "0",
    actionQueue: {}
}

// go do something