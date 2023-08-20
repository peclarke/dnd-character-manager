import Card from "@mui/material/Card";
import "./char.css"
import { CardContent, Typography, Grid, Avatar, TextField, Modal, Box, Button } from "@mui/material";
import { AppState } from "../../main";
import { useContext, useState } from "react";

const EssentialInfo = (props: Character) => {
    const {fullState, setState} = useContext(AppState)

    const [modalOpen, setModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const openAvatarModal = () => setModalOpen(true);
    const closeAvatarModal = () => {setModalOpen(false); setAvatarUrl("")};
    
    const updateCharacter = (value: string, field: string) => {
        const newCharacters = fullState.characters.map((character, i) => {
            if (fullState.selectedCharacter === i) {
                return {
                    ...character,
                    [field]: value
                }
            } else {
                return character
            }
        })

        setState({
            ...fullState,
            characters: newCharacters
        })
    }

    return (
    <>
    <Modal
        open={modalOpen}
        onClose={closeAvatarModal}
    >
        <Box className="avatarModal">
            <h2 id="parent-modal-title">Change Avatar</h2>
            <p id="parent-modal-description">
            Insert an image link below and hit submit to change the avatar for <strong>{fullState.characters[fullState.selectedCharacter].name}</strong>
            </p>
            <div style={{display: "flex", flexDirection: "column", gap: "1vh"}}>
                <TextField value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder={"URL for character avatar"}/>
                <Button variant="contained" onClick={() => { updateCharacter(avatarUrl, "avatar"); closeAvatarModal(); }}>Update</Button>
            </div>
        </Box>
    </Modal>
    <Card variant="outlined" sx={{
        marginLeft: "3vw",
        marginRight: "3vw"
    }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Essential Info
            </Typography>
            <Grid container marginTop={3}>
                <Grid item xs={2} style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"
                }}>
                    <Avatar alt={props.name} src={props.avatar} onClick={openAvatarModal}
                        sx={{
                            width: "80%",
                            height: "100%",
                            cursor: "pointer"
                        }}>
                    </Avatar>
                </Grid>
                <Grid item xs={9} sx={{
                    display: "flex",
                    justifyContent: "left",
                    flexDirection: "column"
                }}>
                    <Typography variant="h5" component="div">
                        <input 
                            value={props.name} 
                            type="string" 
                            disabled={false} 
                            className="essential-input" 
                            onChange={(e) => updateCharacter(e.target.value, "name")}
                        />
                    </Typography>
                    <Typography sx={{ mb: 1.5, display: "flex", flexDirection: "column" }} color="text.secondary">
                        <input 
                            value={props.race} 
                            type="string" 
                            disabled={false} 
                            className="essential-input" 
                            onChange={(e) => updateCharacter(e.target.value, "race")}
                        />
                        <input 
                            value={props.class} 
                            type="string" 
                            disabled={false} 
                            className="essential-input" 
                            onChange={(e) => updateCharacter(e.target.value, "class")}
                        />
                    </Typography>
                    <Typography variant="body2">
                        <input 
                            value={props.desc} 
                            type="string" 
                            disabled={false} 
                            className="essential-input" 
                            onChange={(e) => updateCharacter(e.target.value, "desc")}
                            style={{
                                width: "100%"
                            }}
                        />
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    </>
    )
}

const Notes = (props: Character) => {
    const {fullState, setState} = useContext(AppState)

    const updateNotes = (newNote: string) => {
        const newCharacters = fullState.characters.map((character, i) => {
            if (fullState.selectedCharacter === i) {
                return {
                    ...character,
                    notes: newNote
                }
            } else {
                return character
            }
        })

        setState({
            ...fullState,
            characters: newCharacters
        })
    }

    return (
        <Card variant="outlined" sx={{
            marginLeft: "3vw",
            marginRight: "3vw"
        }}>
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

const CharacterData = () => {
    const {fullState, setState} = useContext(AppState)
    const characterData = fullState.characters[fullState.selectedCharacter];

    return (
        <div className="characterData">
            <EssentialInfo {...characterData}/>
            <Notes {...characterData}/>
        </div>
    )
}

export default CharacterData;