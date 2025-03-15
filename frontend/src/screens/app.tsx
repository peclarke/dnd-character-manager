import Grid from "@mui/material/Grid";
import CharacterGroup from "../components/character-group/group";
import CharacterData from "../components/character/character";
import { useStoreActions, useStoreState } from "../store/hooks";
import { useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { RootCharacter } from "../types/characters";


const App = () => {
    return (
        <AppChildren />
    )
}

const AppChildren = () => {
    // const loadCharacters = useStoreActions(actions => actions.getCharacters);

    const campaignId = useStoreState(state => state.campaign.campaignId);
    const setCharacters = useStoreActions(actions => actions.setCharacters);

    useEffect(() => {
        if (campaignId === "none") return;
        console.log('[ACTION]: Get All Characters')
        const db = getDatabase();
        const charactersRef = ref(db, `campaigns/${campaignId}/characters/`);
        const unsubscribe = onValue(charactersRef, (snapshot) => {
            const data = snapshot.val();
            // check if there are no characters
            if (data) { 
                const characters = Object.values(data) as RootCharacter[];
                setCharacters(characters);
            }
        });

        return () => {
            unsubscribe();
        }
    }, [campaignId]);

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