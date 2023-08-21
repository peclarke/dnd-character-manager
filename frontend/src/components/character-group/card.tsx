import { Avatar, Grid, Tooltip } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import './group.css'
import { useState } from "react";

type CardProps = {deleteCard: (uid: string) => void, pinCard: (uid: string) => void, select: () => void, search: boolean} & Character

const Card = (props: CardProps) => {
    const [mouseIn, setMouseIn] = useState(false);
    const enter = () => setMouseIn(true);
    const leave = () => setMouseIn(false);

    const pinFilled    = <PushPinIcon className="pin-btn-set" onMouseEnter={!props.pinned ? enter : () => null} onMouseLeave={leave}  onClick={(_e) => {props.pinCard(props.uid); leave()}}/>
    const pinNotFilled = <PushPinOutlinedIcon className="pin-btn" onMouseEnter={enter} onMouseLeave={leave}  onClick={(_e) => props.pinCard(props.uid)}/>

    const matches = useMediaQuery('(min-width: 0px) and (max-width: 800px)');

    return (
        <Grid container spacing={0} className={props.pinned ? "pinned-card pin-card" : "character-card"}>
            <Grid item xs={2} className="card-avatar" onClick={props.select}>
                <Avatar alt={props.name} src={props.avatar}></Avatar>
            </Grid>
            <Grid item xs={matches ? 10 : 8} sx={{display: 'flex', flexDirection: 'column'}} onClick={props.select}>
                <span className="charname">{props.name}</span>
                <span className="charclass">{props.class}</span>
            </Grid>
            <Grid item xs={2} className="characterActions">
                <Tooltip title={props.pinned ? "Unpin" : "Pin across sessions"}>
                    {props.pinned ? pinFilled
                                : mouseIn ? pinFilled : pinNotFilled}
                </Tooltip>
                <Tooltip title="Delete character">
                    <CloseOutlinedIcon className="delete-btn" onClick={(_e) => props.deleteCard(props.uid)}/>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export const AddCard = (props: {searching: boolean}) => {
    return (
        <Tooltip title={props.searching ? "You cannot add a character whilst searching" : "Add a new character"}>
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
        </Tooltip>
    )
}

export default Card;