// import { createContext, useMemo, useState } from "react";

export type AppStateType = {
    characters: Character[];
    selectedCharacter: number; // index
}

export const initialState: AppStateType = { // this should be replaced with what is in the database
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
            uid: "1111"
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
            uid: "0000"
        }
    ],
    selectedCharacter: 0
}

// go do something