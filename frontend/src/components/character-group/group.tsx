import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useContext, useEffect, useState } from 'react';
import { AppState } from '../../main';
import { getSession } from '../character/utils';
import SearchBar from './search';
import { validateHashTime } from '../../fb/utils';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { AppCharacter, RootCharacter } from '../../types/characters';
import { addCharacter, getCharacter } from '../../fb/data';

const CharacterGroup = () => {
    const {fullState, setState} = useContext(AppState);
    const [order, setOrder] = useState<RootCharacter[]>([]);

    const [searching, setSearching] = useState(false);
    const [searchCharacters, setSearchCharacters] = useState<RootCharacter[]>([]);

    useEffect(() => { 
        const db = getDatabase();
        const charactersRef = ref(db, 'characters/');
        onValue(charactersRef, (snapshot) => {
            const data = snapshot.val();
            const characters = Object.values(data) as AppCharacter[];
            console.log(characters);
            updateList(characters) 
        });
    }, [])

    const deleteCard = (uid: string) => {
        // const newCharacters = fullState.characters.filter(character => character.uid !== uid);
        // setState({
        //     ...fullState,
        //     characters: [...newCharacters],
        //     selectedCharacter: 0
        // })
    }

    const pinCard = (uid: string) => {
        // const newCharacters = fullState.characters.map(character => {
        //     if (character.uid === uid) {
        //         return {
        //             ...character,
        //             pinned: !character.pinned
        //         }
        //     } else {
        //         return character
        //     }
        // })

        const db = getDatabase();
        const updates: Record<string, AppCharacter> = {};
        getCharacter(parseInt(uid))
        .then(char => {
            if (char === undefined) return;
            updates["characters/" + uid] = {
                ...char,
                pinned: !char["pinned"]
            }
            update(ref(db), updates)
        })
    }

    const addNewCharacter = () => {
        addCharacter();
    }

    useEffect(() => {
        // initiate callback
        setTimeout(() => validateHashTime(addNewCharacter.toString(), fullState.actionQueue), 3 * 1000); // 30s * 1000 = 30,000ms
    }, [fullState.actionQueue])

    const selectCharacter = (uuid: string) => {
        setState({
            ...fullState,
            selectedCharacter: uuid
        })
    }

    const updateList = (chars: AppCharacter[]) => {
        const characters = getOrderedCharacterList(chars);
        setOrder(characters);
    }

    const getOrderedCharacterList = (chars: AppCharacter[]) => {
        const session = getSession();
        const pinned = chars.filter(c => c.pinned);
        const notPinned = chars.filter(c => !c.pinned && c.session === session);
        return pinned.concat(notPinned);
    }

    // event listener for new session change
    // document.addEventListener('newSessionNumber', updateList)
    document.addEventListener('startSearch', ({detail}: any) => {
        const { characters } = detail;
        setSearchCharacters(characters);
        setSearching(true)
    });
    document.addEventListener('stopSearch',  () => setSearching(false));

    return (
        <Grid container className="charGroup"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            spacing={0}
        >
            <Grid item>
                <SearchBar />
            </Grid>
            {
                !searching ? order.map((ch, i) => {
                    return (
                        <Grid item key={"character-"+i}>
                            <Card
                                deleteCard={deleteCard}
                                pinCard={pinCard}
                                select={() => selectCharacter(ch.uid)}
                                search={false}
                                {...ch}
                            />
                        </Grid>
                    )
                })
                : searchCharacters.map((ch, i) => {
                    return (
                        <Grid item key={"character-"+i}>
                            <Card
                                deleteCard={deleteCard}
                                pinCard={pinCard}
                                select={() => selectCharacter(ch.uid)}
                                search={true}
                                {...ch}
                            />
                        </Grid>
                    )
                })
            }
            <Grid item onClick={addNewCharacter}>
                <AddCard searching={searching}/>
            </Grid>

        </Grid>
    )
}

export default CharacterGroup;