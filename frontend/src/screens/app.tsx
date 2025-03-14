import Grid from "@mui/material/Grid";
import CharacterGroup from "../components/character-group/group";
import CharacterData from "../components/character/character";
import { StoreProvider } from "easy-peasy";
import { store } from "../store/model";
import { useStoreActions } from "../store/hooks";
import { useEffect } from "react";


const App = () => {
    return (
        <>
        <StoreProvider store={store}>
            <AppChildren />
        </StoreProvider>
        </>
    )
}

const AppChildren = () => {
    const loadCharacters = useStoreActions(actions => actions.getCharacters);

    useEffect(() => {
        loadCharacters();
    }, []);

    return (
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
    )
}

export default App;