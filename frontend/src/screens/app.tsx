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
                    <Grid item xs={4} sm={4} md={3} lg={3}>
                        <CharacterGroup />
                    </Grid>
                    <Grid item xs={8} sm={8} md={9} lg={9} className="ch-data">
                        <CharacterData />
                    </Grid>
                </Grid>
            </div>
        </AppState.Provider>
        </>
    )
}

export default App;