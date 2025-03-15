import Grid from '@mui/material/Grid';
import Card, { AddCard } from './card';
import './group.css'
import { useEffect, useState } from 'react';
import { getSession } from '../character/utils';
import SearchBar from './search';
import { getDatabase, ref, update, remove } from "firebase/database";
import { RootCharacter } from '../../types/characters';
import { addCharacter, getCharacter } from '../../fb/data';
import { useStoreActions, useStoreState } from '../../store/hooks';

const CharacterGroup = () => {
    const characters = useStoreState((state) => state.characters);
    const campaignId = useStoreState((state) => state.campaign.campaignId);

    const [order, setOrder] = useState<RootCharacter[]>([]);

    useEffect(() => {
        updateList(characters);
    }, [characters])

    const [searching, setSearching] = useState(false);
    const [searchCharacters, setSearchCharacters] = useState<RootCharacter[]>([]);

    const delCard = useStoreActions(actions => actions.delCharacter);
    const selCard = useStoreActions(actions => actions.setSelectedIndex);

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
            updates[`campaigns/${campaignId}/characters/${uid}`] = {
                ...char,
                pinned: !char["pinned"]
            }
            update(ref(db), updates)
        })
    }

    const addNewCharacter = () => {
        addCharacter(campaignId);
    }

    // useEffect(() => {
    //     // initiate callback
    //     setTimeout(() => validateHashTime(addNewCharacter.toString(), fullState.actionQueue), 3 * 1000); // 30s * 1000 = 30,000ms
    // }, [fullState.actionQueue])

    const updateList = (chars: RootCharacter[]) => {
        const characters = getOrderedCharacterList(chars);
        setOrder(characters);
        console.log(characters);
    }

    const getOrderedCharacterList = (chars: RootCharacter[]) => {
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
                <AddCard searching={searching}/>
            </Grid>

        </Grid>
    )
}

export default CharacterGroup;