import Card from "@mui/material/Card";
import "./char.css"
import { CardContent, Typography, Grid, Avatar } from "@mui/material";
import { AppState } from "../../main";
import { useContext } from "react";

const EssentialInfo = (props: Character) => {
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
                        width: "65%",
                        height: "100%"
                    }}></Avatar>
                </Grid>
                <Grid item xs={9} sx={{
                    display: "flex",
                    justifyContent: "left",
                    flexDirection: "column"
                }}>
                    <Typography variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.race}, {props.class}
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

const CharacterData = () => {
    const {fullState, setState} = useContext(AppState)
    const characterData = fullState.characters[fullState.selectedCharacter];

    return (
        <div className="characterData">
            <EssentialInfo {...characterData}/>
        </div>
    )
}

export default CharacterData;