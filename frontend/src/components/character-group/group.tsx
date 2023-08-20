import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useContext } from 'react';
import { AppState } from '../../main';
import { basicCharacter } from '../character/utils';
import { v4 as uuidv4 } from 'uuid';

const CharacterGroup = () => {
    const {fullState, setState} = useContext(AppState);

    const deleteCard = (uid: string) => {
        console.log(uid)
        const newCharacters = fullState.characters.filter(character => character.uid !== uid);

        console.log(newCharacters)
        setState({
            characters: [...newCharacters],
            selectedCharacter: 0
        })
        console.log(fullState.characters)
    }

    const pinCard = (uid: string) => {
        console.log(uid)

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
            uid: uuidv4()
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

    return (
        <Grid container className="charGroup"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            spacing={0}
        >
            {
                fullState.characters.map((ch, i) => {
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