import Grid from "@mui/material/Grid";
import CharacterGroup from "../components/character-group/group";
import CharacterData from "../components/character/character";
import { useMemo, useState } from "react";
import { initialState } from "../types/state";
import { AppState } from "../main";


const App = () => {
    const [fullState, setState] = useState(initialState)
    const stateValue = useMemo(
        () => ({fullState, setState}), [fullState]
    )

    return (
        <>
        <AppState.Provider value={stateValue}>
        <div style={{flexGrow: 1}}>
            <Grid container>
                <Grid item xs={4} sx={{backgroundColor: 'red'}}>
                    <CharacterGroup />
                </Grid>
                <Grid item xs={8}>
                    <CharacterData />
                </Grid>
            </Grid>
        </div>
        </AppState.Provider>
        </>
    )
}

export default App;