import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useContext, useEffect, useState } from 'react';
import { AppState } from '../../main';
import { basicCharacter, getSession } from '../character/utils';
import { v4 as uuidv4 } from 'uuid';
import SearchBar from './search';
import { SaveWrapper, validateHashTime } from '../../fb/utils';

const CharacterGroup = () => {
    const {fullState, setState} = useContext(AppState);
    const [order, setOrder] = useState<Character[]>([]);

    const [searching, setSearching] = useState(false);
    const [searchCharacters, setSearchCharacters] = useState<Character[]>([]);

    useEffect(() => updateList(), [fullState.characters])

    const deleteCard = (uid: string) => {
        const newCharacters = fullState.characters.filter(character => character.uid !== uid);
        setState({
            ...fullState,
            characters: [...newCharacters],
            selectedCharacter: 0
        })
    }

    const pinCard = (uid: string) => {
        const newCharacters = fullState.characters.map(character => {
            if (character.uid === uid) {
                return {
                    ...character,
                    pinned: !character.pinned
                }
            } else {
                return character
            }
        })


        setState({
            ...fullState,
            characters: newCharacters,
        })
    }

    const addNewCharacter = () => {
        if (searching) return;

        const newCard = {
            ...basicCharacter,
            uid: uuidv4(),
            session: getSession(),
        }

        SaveWrapper(addNewCharacter, {fullState, setState}).then(updatedQueue => {
            setState({
                ...fullState,
                characters: [...fullState.characters, newCard],
                selectedCharacter: fullState.characters.length,
                actionQueue: updatedQueue
            });
        });
    }

    useEffect(() => {
        // initiate callback
        setTimeout(() => validateHashTime(addNewCharacter.toString(), fullState.actionQueue), 3 * 1000); // 30s * 1000 = 30,000ms
    }, [fullState.actionQueue])

    const selectCharacter = (uuid: string) => {
        const found = fullState.characters.filter(ch => ch.uid === uuid);
        const index = fullState.characters.indexOf(found[0]);

        setState({
            ...fullState,
            selectedCharacter: index
        })
    }

    const updateList = () => {
        const characters = getOrderedCharacterList();
        setOrder(characters);
    }

    const getOrderedCharacterList = () => {
        const session = getSession();
        const pinned = fullState.characters.filter(c => c.pinned);
        const notPinned = fullState.characters.filter(c => !c.pinned && c.session === session);
        return pinned.concat(notPinned);
    }

    // event listener for new session change
    document.addEventListener('newSessionNumber', updateList)
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