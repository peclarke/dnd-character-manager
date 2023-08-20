import { Avatar, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import './group.css'

type CardProps = {deleteCard: (uid: string) => void, pinCard: (uid: string) => void, select: () => void} & Character

const Card = (props: CardProps) => {
    return (
        <Grid container spacing={0} className={props.pinned ? "pinned-card" : "character-card"} sx={props.pinned ? {backgroundColor: "#feffd6"} : {}}>
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}} onClick={props.select}>
                <Avatar alt={props.name} src={props.avatar}></Avatar>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}} onClick={props.select}>
                <span className="charname">{props.name}</span>
                <span className="charclass">{props.class}</span>
            </Grid>
            <Grid item xs={2} className="characterActions">
                {props.pinned ? <PushPinIcon className="pin-btn-set" onClick={(_e) => props.pinCard(props.uid)}/> : <PushPinOutlinedIcon className="pin-btn" onClick={(_e) => props.pinCard(props.uid)}/>}
                <CloseOutlinedIcon className="delete-btn" onClick={(_e) => props.deleteCard(props.uid)}/>
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