import { Action, action, computed, Computed, createStore, thunk, Thunk } from "easy-peasy";
import { getDatabase, ref, update } from "firebase/database";
import { Campaign, RootCharacter } from "../types/characters";
import { getCampaignInfo, getCharacter, setUpdateCharacter } from "../fb/data";

interface CampaignModel {
    campaignId: string;
    campaignInfo: Campaign | null;
    sessions: Computed<CampaignModel, number>;
    activeSession: number;

    setCampaignId: Action<CampaignModel, string>;
    setCampaignInfo: Action<CampaignModel, Campaign | null>;
    setSessions: Action<CampaignModel, number>;
    setActiveSession: Action<CampaignModel, number>;
}

export interface StoreModel {
    uuid: string;
    setUuid: Action<StoreModel, string>;

    characters: RootCharacter[];
    selectedIndex: number; // index;
    currentCharacter: RootCharacter | undefined;

    setCharacters: Action<StoreModel, RootCharacter[]>;
    getCharacters: Thunk<StoreModel, RootCharacter[] | undefined>;
    addCharacter: Action<StoreModel, RootCharacter>;
    delCharacter: Action<StoreModel, number>;

    updatedSelected: Action<StoreModel, { field: string, value: string | number }>;
    setCurrentEverywhere: Action<StoreModel, RootCharacter>;

    setSelected: Action<StoreModel, RootCharacter | undefined>;
    setSelectedIndex: Action<StoreModel, number>;

    // campaign stuff
    campaign: CampaignModel;
}

export const store = createStore<StoreModel>({
    uuid: "",
    setUuid: action((state, payload) => {
        state.uuid = payload;
    }),

    campaign: {    
        campaignId: "none",
        campaignInfo: {
            cid: "",
            dmUuid: 0,
            name: "",
            sessions: 0,
            playerUuids: [],
            characters: [],
        },
        sessions: computed((state) => {
            if (state.campaignInfo) {
                return state.campaignInfo.sessions
            } else {
                return -1;
            }
        }),
        activeSession: 0,

        setCampaignInfo: action((state, payload) => {
            state.campaignInfo = payload;
        }),
        setCampaignId: action((state, payload) => {
            state.campaignId = payload
        }),
        setSessions: action((state, payload) => {
            const db = getDatabase();
            getCampaignInfo(state.campaignId)
            .then(campaign => {
                const updates: Record<string, any> = {}
                updates["campaigns/" + campaign.cid] = {
                    ...campaign,
                    sessions: payload,
                }
                update(ref(db), updates)
            })
            state.sessions = payload;

        }),
        setActiveSession: action((state, payload) => {state.activeSession = payload}),
    },


    characters: [],
    currentCharacter: {
        avatar: "",
        name: "",
        class: "",
        level: "",
        race: "",
        desc: "",
        notes: "",
        pinned: false,
        uid: -1000,
        session: 0
    },
    addCharacter: action((state, payload) => {
        state.characters.push(payload);
    }),
    delCharacter: action((state, payload) => {
        // TODO: test if this actually works
        if (state.characters.length > payload) {
            state.characters = state.characters.filter((_, i) => {i !== payload})
        }
    }),
    setCharacters: action((state, payload) => {
        state.characters = payload;
    }),
    getCharacters: thunk((_actions, _payload) => {
        // console.log('[ACTION]: Get All Characters')
        // const db = getDatabase();
        // const charactersRef = ref(db, `characters/`);
        // onValue(charactersRef, (snapshot) => {
        //     const data = snapshot.val();
        //     const characters = Object.values(data) as RootCharacter[];
        //     actions.setCharacters(characters);
        //     // if (characters.length > 0) actions.setSelected(characters[0]);
        // });
    }),
    setCurrentEverywhere: action((state, payload) => {
        state.currentCharacter = payload;
        setUpdateCharacter(state.selectedIndex, state.campaign.campaignId, payload);
    }),

    selectedIndex: -100,
    updatedSelected: action((state, {field, value}) => {
        // console.log(state.selectedIndex);
        if (state.currentCharacter === null || state.currentCharacter === undefined) return;
        // check if the field is present in character
        if (field in state.currentCharacter) {
            const db = getDatabase();
            getCharacter(state.selectedIndex, state.campaign.campaignId)
            .then(char => {
                if (char === undefined) return;
                const updates: Record<string, RootCharacter> = {}
                updates[`campaigns/${char.cid}/characters/${char.character.uid}`] = {
                    ...char.character,
                    [field]: value
                }
                update(ref(db), updates)
            })

            state.currentCharacter = {
                ...state.currentCharacter,
                [field]: value,
            }
        } else {
            console.error(`Field "${field}" does not exist in character with index: ${state.selectedIndex}.`);
        }
        // console.log(state.selectedIndex);
        
    }),
    setSelected: action((state, payload) => {
        // state.selectedIndex = payload.uid;
        state.currentCharacter = payload;
        
    }),
    // selectedCharacter: computed((state) => state.characters.filter((_, i) => i === state.selectedIndex)[0] ?? null)

    setSelectedIndex: action((state, payload) => {
        state.selectedIndex = payload;
        const current = state.characters.filter(character => character.uid === payload);
        if (current.length !== 1) {
            console.error(`Character with uid ${payload} not found.`);
            return;
        }

        state.currentCharacter = current[0];
        // const db = getDatabase();
        // const singleCharRef = ref(db, `characters/` + payload);
        // onValue(singleCharRef, (snapshot) => {
        //     const data = snapshot.val() as RootCharacter;
        //     actions.setSelected(data);
        // }, {
        //     onlyOnce: true
        // });
    })
  });


// export type AppStateType = {
//     uid: string;

//     characters: RootCharacter[];
//     selectedCharacter: number; // index
    
//     // firebase things
//     actionQueue: Record<string, number>;
// }

// export const initialState: AppStateType = { // this should be replaced with what is in the database
//     uid: "",

//     characters: [
//         {
//             name:"Seth Beau",
//             class:"Ranger / Rogue",
//             avatar:"https://www.dndbeyond.com/avatars/20479/332/637677702146463037.jpeg",
//             level:"5",
//             race: "Harengon",
//             notes: "My character!!",
//             desc: "Just a cheeky ol rabbit",
//             pinned: true,
//             uid: 1111,
//             session: 1
//         },
//         {
//             name:"Jean Pierre",
//             class:"Paladin",
//             avatar:"",
//             level:"5",
//             race: "Human",
//             notes: "",
//             desc: "he's french damnit",
//             pinned: false,
//             uid: 0,
//             session: 1
//         },
//         {
//             name:"Yvonne",
//             class:"Cleric",
//             avatar:"",
//             level:"5",
//             race: "Aasimar",
//             notes: "",
//             desc: "",
//             pinned: false,
//             uid: 2222,
//             session: 1
//         },
//         {
//             name:"Borgus",
//             class:"Druid",
//             avatar:"",
//             level:"5",
//             race: "Tortle",
//             notes: "",
//             desc: "",
//             pinned: true,
//             uid: 2332,
//             session: 1
//         },
//         {
//             name:"Rictavio",
//             class:"Bard",
//             avatar:"",
//             level:"5",
//             race: "Human??",
//             notes: "",
//             desc: "sketchy fellow",
//             pinned: false,
//             uid: 3223,
//             session: 2
//         }
//     ],
//     selectedCharacter: 0,
//     actionQueue: {}
// }

// go do something