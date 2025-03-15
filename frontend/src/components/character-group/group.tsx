import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useEffect, useState } from 'react';
import SearchBar from './search';
import { getDatabase, ref, update, remove } from "firebase/database";
import { RootCharacter } from '../../types/characters';
import { addCharacter, getCharacter } from '../../fb/data';
import { useStoreActions, useStoreState } from '../../store/hooks';
import { Button, Typography } from '@mui/material';

const CharacterGroup = () => {
    const characters = useStoreState((state) => state.characters);
    const campaignId = useStoreState((state) => state.campaign.campaignId);
    const activeSession = useStoreState((state) => state.campaign.activeSession);

    const [order, setOrder] = useState<RootCharacter[]>([]);

    useEffect(() => {
        updateList(characters);
    }, [characters, activeSession])

    const [searching, setSearching] = useState(false);
    const [searchCharacters, setSearchCharacters] = useState<RootCharacter[]>([]);

    const delCard = useStoreActions(actions => actions.delCharacter);
    const selCard = useStoreActions(actions => actions.setSelectedIndex);
    const setCurrentCharacter = useStoreActions(actions => actions.setSelected);

    const handleSelect = (uid: number) => {
        selCard(uid);
    }

    const deleteCard = (uid: number) => {
        const db = getDatabase();
        const charactersRef = ref(db, `campaigns/${campaignId}/characters/${uid}`);
        remove(charactersRef);
        delCard(uid);
    }

    const pinCard = (uid: number) => {
        const db = getDatabase();
        const updates: Record<string, RootCharacter> = {};
        getCharacter(uid, campaignId)
        .then(char => {
            if (char === undefined) return;
            updates[`campaigns/${campaignId}/characters/${char.character.uid}`] = {
                ...char.character,
                pinned: !char.character["pinned"]
            }
            update(ref(db), updates)
        })
    }

    const addNewCharacter = () => {
        addCharacter(campaignId);
    }

    const updateList = (chars: RootCharacter[]) => {
        const characters = getOrderedCharacterList(chars);
        setOrder(characters);
    }

    const getOrderedCharacterList = (chars: RootCharacter[]) => {
        // const session = getSession();
        const pinned = chars.filter(c => c.pinned);
        const notPinned = chars.filter(c => !c.pinned && c.session === activeSession);
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

    const SessionInfo = () => {
        
        const numberOfCharacters = characters.filter(char => char.session === activeSession).length;

        return (
            <div className="session-info">
                <Typography variant="body1" component="h3">Session: <strong>{activeSession}</strong></Typography>
                <Typography variant="body1" component="h3">Num/Characters: <strong>{numberOfCharacters}</strong></Typography>
            </div>
        )
    }

    return (
        <Grid container className="charGroup"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            spacing={0}
        >
            <Grid item>
                <HomeButton onClick={() => setCurrentCharacter(undefined)}/>
            </Grid>

            <Grid item>
                <SessionInfo />
            </Grid>
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
                                select={() => handleSelect(ch.uid)}
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
                                select={() => handleSelect(ch.uid)}
                                search={true}
                                {...ch}
                            />
                        </Grid>
                    )
                })
            }
            <Grid item onClick={addNewCharacter}>
                <AddCard searching={searching} cid={campaignId}/>
            </Grid>

        </Grid>
    )
}

const HomeButton = (props: { onClick: () => void}) => {
    return (
        <div id="homeButtonContainer">
            <Button 
                variant="contained" 
                // placeholder={"Search All Sessions..."} 
                fullWidth={true}
                id="homeButton"
                // value={val}
                onClick={props.onClick}
                // onChange={(e) => onChange(e.target.value)}
            >
                Campaign Dashboard
            </Button>
        </div>
    )
}

export default CharacterGroup;