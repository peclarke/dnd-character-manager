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
            race: "Harengon"
        },
        {
            name:"Jean Pierre",
            class:"Paladin",
            avatar:"",
            level:"5",
            race: "Human"
        }
    ],
    selectedCharacter: 0
}

// go do something