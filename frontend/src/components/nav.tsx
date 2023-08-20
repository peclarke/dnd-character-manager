import { Box, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { logout } from "../fb/firebase";

import "./nav.css";

// const Nav = () => {
//     const [campaign, setCampaign] = useState(1);
//     const [session, setSession] = useState(1);

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static"  style={{minHeight: "10vh", display: "flex", justifyContent: "center", backgroundColor: "gray"}}>
//           <Toolbar style={{height: "5vh"}}>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             >
//                 DND Characters
//             </IconButton>
//             <FormControl style={{
//                 display: "flex",
//                 justifyContent: "left",
//                 flexDirection: "row",
//                 gap: 10
//             }}>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={campaign}
//                     label="Age"
//                     onChange={(e) => setCampaign(e.target.value as number)}
//                     sx = {{
//                         backgroundColor: "white",
//                         width: "20vw",
//                         color: "black"
//                     }}
//                 >
//                     <MenuItem value={1}>Strahd w/ Alex</MenuItem>
//                     <MenuItem value={2}>Sam's campaign</MenuItem>
//                 </Select>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={session}
//                     label="Age"
//                     onChange={(e) => setSession(e.target.value as number)}
//                     sx = {{
//                         backgroundColor: "white",
//                         width: "20vw"
//                     }}
//                 >
//                     <MenuItem value={1}>Session One</MenuItem>
//                     <MenuItem value={2}>Session Two</MenuItem>
//                     <MenuItem value={3}>Session Three</MenuItem>
//                 </Select>
//                 <Button color="primary" variant="contained">Get Notes</Button>
//                 <Button color="warning" variant="contained" onClick={() => {logout(); window.location.reload();}}>Sign Out</Button>
//             </FormControl>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     )    
// }

const event = new Event("newSessionNumber");

const NewNav = () => {
    const [active,   setActive]   = useState(1);
    const [sessions, _setSessions] = useState(6);

    const getMeOut = () => {
        logout();
        window.location.reload();
    }

    const setNewActive = (session: number) => {
        localStorage.setItem('activeSession', session.toString())
        setActive(session)
        // black magic sorcery
        document.dispatchEvent(event);
    }

    useEffect(() => {
        const activeNum = localStorage.getItem('activeSession');
        if (activeNum) {
            setActive(parseInt(activeNum))
        }
    }, [])

    return (
        <Box className="nav">
            <div>
                <h3><a href="/">Character Manager</a></h3>
                <Link href="/">Dashboard</Link>
                <Link href="/help">Help</Link>
                <div className="sessions">
                    {
                        [...Array(sessions)].map((_, num) => <NumberCard key={"el-"+num} number={num + 1} active={(num + 1) === active} onClick={() => setNewActive(num + 1)}/>)
                    }
                </div>
            </div>
            <div>
                <Button color="warning" variant="contained" onClick={getMeOut}>Log Out</Button>
            </div>
        </Box>
    )
}

export type NumberCardType = {
    number: number;
    onClick: () => void;
    active?: boolean;
}

export const NumberCard = (props: NumberCardType) => {
    return (
        <div className={props.active ? "numberCard active" : "numberCard"} onClick={props.onClick}>
            {props.number}
        </div>
    )
}

export default NewNav;