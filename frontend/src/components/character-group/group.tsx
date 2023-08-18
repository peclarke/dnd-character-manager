import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useContext } from 'react';
import { AppState } from '../../main';
import { basicCharacter } from '../character/utils';

const CharacterGroup = () => {
    const {fullState, setState} = useContext(AppState);

    const addNewCharacter = () => {
        setState({
            ...fullState,
            characters: [...fullState.characters, basicCharacter],
            selectedCharacter: fullState.characters.length
        })
    }

    const selectCharacter = (pos: number) => {
        setState({
            ...fullState,
            selectedCharacter: pos
        })
        console.log(pos)
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
                        <Grid item key={"character-"+i} onClick={() => selectCharacter(i)}>
                            <Card
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