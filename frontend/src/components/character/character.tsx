import Card from "@mui/material/Card";
import "./char.css"
import { CardContent, Typography, Grid, Avatar, TextField, Modal, Box, Button, Tooltip, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Campaign, RootCharacter } from "../../types/characters";
import { useStoreActions, useStoreState } from "../../store/hooks";

const CharacterData = () => {
    const curChar = useStoreState(state => state.currentCharacter);
    const campaign = useStoreState(state => state.campaign.campaignInfo);
    const cid = useStoreState(state => state.campaign.campaignId);

    const [data, setData] = useState<RootCharacter>();

    useEffect(() => {
        setData(curChar)
    }, [curChar])

    const [modalOpen, setModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const openAvatarModal = () => setModalOpen(true);
    const closeAvatarModal = () => {setModalOpen(false); setAvatarUrl("")};

    const updateCharacter = useStoreActions(actions => actions.updatedSelected)
    
    const handleChange = (value: string, field: string) => { 
        if (curChar) {
            updateCharacter({ field: field, value: value});
        } 
    };

    return (
    data ? <div className="characterData">
        <Modal
            open={modalOpen}
            onClose={closeAvatarModal}
        >
            <Box className="avatarModal">
                <h2 id="parent-modal-title">Change Avatar</h2>
                <p id="parent-modal-description">
                Insert an image link below and hit submit to change the avatar for <strong>{data.name}</strong>
                </p>
                <div style={{display: "flex", flexDirection: "column", gap: "1vh"}}>
                    <TextField value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder={"URL for character avatar"}/>
                    <Button variant="contained" onClick={() => { handleChange(avatarUrl, "avatar"); closeAvatarModal(); }}>Update</Button>
                </div>
            </Box>
        </Modal>
        <Card variant="outlined" className="char-card-content">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Essential Info
                </Typography>
                <Grid container marginTop={3}>
                    <Grid item 
                        xs={2}
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                            // marginRight: 15,
                        }}
                    >
                        <Tooltip title="Change avatar photo">
                            <Avatar alt={data.name} src={data.avatar} onClick={openAvatarModal}
                                sx={{
                                    width: "80%",
                                    // width: 150,
                                    maxHeight: "15vh",
                                    // height: 150,
                                    height: "100%",
                                    cursor: "pointer"
                                }}>
                            </Avatar>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={9} sx={{
                        display: "flex",
                        justifyContent: "left",
                        flexDirection: "column"
                    }}>
                        <Typography variant="h5" component="div">
                            <input 
                                value={data.name} 
                                type="string" 
                                disabled={false} 
                                className="essential-input" 
                                onChange={(e) => handleChange(e.target.value, "name")}
                            />
                        </Typography>
                        <Typography sx={{ mb: 1.5, display: "flex", flexDirection: "column" }} color="text.secondary">
                            <input 
                                value={data.race} 
                                type="string" 
                                disabled={false} 
                                className="essential-input" 
                                onChange={(e) => handleChange(e.target.value, "race")}
                            />
                            <input 
                                value={data.class} 
                                type="string" 
                                disabled={false} 
                                className="essential-input" 
                                onChange={(e) => handleChange(e.target.value, "class")}
                            />
                        </Typography>
                        <Typography variant="body2">
                            <input 
                                value={data.desc} 
                                type="string" 
                                disabled={false} 
                                className="essential-input" 
                                onChange={(e) => handleChange(e.target.value, "desc")}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Notes {...data}/>      
    </div> : <div className="characterData"><NoSelection cid={cid} campaignInfo={campaign}/></div>       
    )
}

const NoSelection = (props: {cid: string, campaignInfo: Campaign | null}) => {

    const noCampaign = <>
        <Alert id="nocampaignalert" severity="info">No campaign has been selected. Select a campaign in the navigation dropdown.</Alert>
    </>

    const Home = <>
        <Typography variant="body1" component="p">Here's our campaign information</Typography>
        {props.campaignInfo && <CampaignData campaign={props.campaignInfo}/>}
    </>

    return (
        <div className="noselection">
            <Typography variant="h4" component="h1">Campaign Information Screen</Typography>
            {props.cid === "none" ? noCampaign : Home}
        </div>
    )
}

const CampaignData = (props: {campaign: Campaign}) => {
    return (
        <table id="campaignInfo">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Campaign Name</td>
                    <td>{props.campaign.name}</td>
                </tr>
                <tr>
                    <td>DM Player ID</td>
                    <td>{props.campaign.dmUuid}</td>
                </tr>
                <tr>
                    <td>Number of Sessions</td>
                    <td>{props.campaign.sessions}</td>
                </tr>
                <tr>
                    <td>Number of Players</td>
                    <td>{props.campaign.playerUuids.length}</td>
                </tr>
                <tr>
                    <td>Number of Characters</td>
                    <td>{Object.keys(props.campaign.characters).length}</td>
                </tr>
            </tbody>
        </table>
    )
}

const Notes = (props: RootCharacter) => {
    // const selectedCharacterIndex = useStoreState(state => state.selectedIndex);
    const updateChar = useStoreActions(actions => actions.updatedSelected);

    const updateNotes = (newNote: string) => {
        // const updates: Record<string, RootCharacter> = {}
        // getCharacter(selectedCharacterIndex)
        // .then(char => {
        //     if (char === undefined) return;
        //     console.log('update time')
        //     updates["characters/" + selectedCharacterIndex] = {
        //         ...char,
        //         notes: newNote
        //     }
        // })

        // TODO: test this works
        updateChar({ field: "notes", value: newNote })

    }

    return (
        <Card variant="outlined" className="char-card-content">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Player Notes
                </Typography>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={20}
                    placeholder="Write some notes about this character here"
                    variant="standard"
                    fullWidth={true}
                    value={props.notes}
                    onChange={(e) => updateNotes(e.target.value)}
                    />
            </CardContent>
        </Card>
        )
}

const _CharacterData = () => {
    // const [characterData, setChar] = useState<RootCharacter | undefined>();

    // const currentCharacter = useMemo(() => onValue(singleCharRef, (snapshot) => {
    //     const data = snapshot.val() as RootCharacter;
    //     console.log("snapshot change:",data);
    //     setChar(data);
    // }), [fullState.selectedCharacter, fullState.characters]);

    // need to figure out updating

    // useEffect(() => {

    // }, [fullState.selectedCharacter])


    // useEffect(() => { 
    //     // console.log(fullState.selectedCharacter);
    //     const singleCharRef = ref(db, 'characters/' + fullState.selectedCharacter);
    //     onValue(singleCharRef, (snapshot) => {
    //         const data = snapshot.val() as RootCharacter;
    //         // console.log(data);
    //         setChar(data);
    //     });
    // }, [fullState.selectedCharacter, fullState.characters])

    // const curIndex = useStoreState(state => state.selectedIndex);
    // const curChar = useStoreState(state => state.currentCharacter);

    // const [data, setData] = useState<RootCharacter>();

    // useEffect(() => {
    //     console.log(curChar.uid)
    //     setData(curChar)
    //     console.log(curChar.uid)
    // }, [curChar])

    

    // const db = getDatabase();
    // const singleCharRef = ref(db, 'characters/' + curIndex);
    // onValue(singleCharRef, (snapshot) => {
    //     const data = snapshot.val() as RootCharacter;
        
    // });

    return (
        <></>
        // <div className="characterData">
        //     {
        //         data === undefined
        //             ? <p>No character selected</p>
        //             : <>
        //                 <EssentialInfo
        //                     data={data}
        //                 />
        //                 <Notes {...data}/>
        //             </>
        //     }
        // </div>
    )
}

export default CharacterData;