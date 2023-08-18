import Card from "@mui/material/Card";
import "./char.css"
import { CardContent, Typography, Grid, Avatar, TextField } from "@mui/material";
import { AppState } from "../../main";
import { useContext } from "react";

const EssentialInfo = (props: Character) => {
    const {fullState, setState} = useContext(AppState)

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
                    <Avatar alt={props.name} src={props.avatar} sx={{
                        width: "80%",
                        height: "100%"
                    }}></Avatar>
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
                        Just a cheeky ol rabbit
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
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