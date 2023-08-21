import { Avatar, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import './group.css'
import { useState } from "react";

type CardProps = {deleteCard: (uid: string) => void, pinCard: (uid: string) => void, select: () => void} & Character

const Card = (props: CardProps) => {
    const [mouseIn, setMouseIn] = useState(false);
    const enter = () => setMouseIn(true);
    const leave = () => setMouseIn(false);

    const pinFilled    = <PushPinIcon className="pin-btn-set" onMouseEnter={!props.pinned ? enter : () => null} onMouseLeave={leave}  onClick={(_e) => {props.pinCard(props.uid); leave()}}/>
    const pinNotFilled = <PushPinOutlinedIcon className="pin-btn" onMouseEnter={enter} onMouseLeave={leave}  onClick={(_e) => props.pinCard(props.uid)}/>

    return (
        <Grid container spacing={0} className={props.pinned ? "pinned-card pin-card" : "character-card"}>
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}} onClick={props.select}>
                <Avatar alt={props.name} src={props.avatar}></Avatar>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}} onClick={props.select}>
                <span className="charname">{props.name}</span>
                <span className="charclass">{props.class}</span>
            </Grid>
            <Grid item xs={2} className="characterActions">
                {props.pinned ? pinFilled
                              : mouseIn ? pinFilled : pinNotFilled}
                <CloseOutlinedIcon className="delete-btn" onClick={(_e) => props.deleteCard(props.uid)}/>
            </Grid>
        </Grid>
    )
}

export const AddCard = (props: {searching: boolean}) => {
    return (
        <div className={!props.searching ? "add-character" : "add-search"}
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