import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useContext, useEffect, useState } from 'react';
import { AppState } from '../../main';
import { basicCharacter, getSession } from '../character/utils';
import { v4 as uuidv4 } from 'uuid';

const CharacterGroup = () => {
    const {fullState, setState} = useContext(AppState);
    const [order, setOrder] = useState<Character[]>([]);

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
        const newCard = {
            ...basicCharacter,
            uid: uuidv4(),
            session: getSession(),
        }

        setState({
            ...fullState,
            characters: [...fullState.characters, newCard],
            selectedCharacter: fullState.characters.length
        })
    }

    const selectCharacter = (pos: number) => {
        setState({
            ...fullState,
            selectedCharacter: pos
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

    return (
        <Grid container className="charGroup"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            spacing={0}
        >
            {
                order.map((ch, i) => {
                    return (
                        <Grid item key={"character-"+i}>
                            <Card
                                deleteCard={deleteCard}
                                pinCard={pinCard}
                                select={() => selectCharacter(i)}
                                {...ch}
                            />
                        </Grid>
                    )
                })
            }
            <Grid item onClick={addNewCharacter}>
                <AddCard />
            </Grid>

        </Grid>
    )
}

export default CharacterGroup;