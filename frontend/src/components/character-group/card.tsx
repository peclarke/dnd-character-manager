import { Avatar, Grid, Tooltip } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import './group.css'
import { useState } from "react";
import { RootCharacter } from "../../types/characters";

type CardProps = {deleteCard: (uid: number) => void, pinCard: (uid: number) => void, select: () => void, search: boolean} & RootCharacter

const Card = (props: CardProps) => {
    const [mouseIn, setMouseIn] = useState(false);
    const enter = () => setMouseIn(true);
    const leave = () => setMouseIn(false);

    const pinFilled    = <PushPinIcon className="pin-btn-set" onMouseEnter={!props.pinned ? enter : () => null} onMouseLeave={leave}  onClick={(_e) => {props.pinCard(props.uid); leave()}}/>
    const pinNotFilled = <PushPinOutlinedIcon className="pin-btn" onMouseEnter={enter} onMouseLeave={leave}  onClick={(_e) => props.pinCard(props.uid)}/>

    const matches = useMediaQuery('(min-width: 0px) and (max-width: 800px)');

    const confirmDelete = () => {
        window.confirm(`Are you sure you want to delete ${props.name}?`) && props.deleteCard(props.uid);
    }

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
                    <CloseOutlinedIcon className="delete-btn" onClick={confirmDelete}/>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export const AddCard = (props: {searching: boolean, cid: string}) => {
    const errMsg = props.cid === "none" ? "No campaign has been selected" : "You cannot add a character whilst searching";
    return (
        <Tooltip title={props.searching || props.cid === "none" ? errMsg : "Add a new character"}>
            <div className={!props.searching && props.cid !== "none" ? "add-character" : "add-search"}
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