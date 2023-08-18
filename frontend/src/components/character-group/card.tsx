import { Avatar, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Card = (props: Character) => {
    return (
        <Grid container spacing={0} className="character-card">
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar alt={props.name} src={props.avatar}></Avatar>
            </Grid>
            <Grid item xs={9} sx={{display: 'flex', flexDirection: 'column'}}>
                <span className="charname">{props.name}</span>
                <span className="charclass">{props.class}</span>
            </Grid>
            <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center"}}>
                <div className="levelback">
                    {props.level}
                </div>
            </Grid>
        </Grid>
    )
}

export const AddCard = () => {
    return (
        <div className="add-character"
            style={{
                minHeight: "1vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <AddIcon />
        </div>
    )
}

export default Card;