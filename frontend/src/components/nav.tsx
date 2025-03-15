import { Box, Button, FormControl, InputLabel, Link, MenuItem, Select, Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { logout } from "../fb/firebase";
import AddIcon from '@mui/icons-material/Add';

import "./nav.css";
import { addCampaignSession, DevTool, getAllCampaignIds, getCampaignInfo } from "../fb/data";
import { useStoreActions, useStoreState } from "../store/hooks";
import { getDatabase, onValue, ref } from "firebase/database";
import { Campaign } from "../types/characters";

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
    // const maxSessions = useStoreState(state => state.sessions);
    // const activeSession = useStoreState(state => state.activeSession);

    // const setMaxSessions = useStoreActions(actions => actions.setSessions);
    // const setActiveSession = useStoreActions(actions => actions.setActiveSession);

    const campaignId = useStoreState(state => state.campaign.campaignId);
    const setCampaign = useStoreActions(actions => actions.campaign.setCampaignInfo);

    const maxSessions = useStoreState(state => state.campaign.sessions); //useMemo(() => useStoreState(state => state.campaign.sessions), [campaignId]);
    const activeSession = useStoreState(state => state.campaign.activeSession);
    const setActive = useStoreActions(actions => actions.campaign.setActiveSession);
    // const [activeSession, setActiveSession] = useState<number>();

    /**
     * Listen for any campaign id changes. Create and close a listener for each campaign id. 
     * Updates information if anything changes.
     */
    useEffect(() => {
        const db = getDatabase();
        const campaignRef = ref(db, `campaigns/${campaignId}`)
        const campaignListener = onValue(campaignRef, (snapshot) => {
            const data: Campaign = snapshot.val();
            setCampaign(data);
        });

        return () => {
            // unsubscribe from change events to THAT campaign
            campaignListener();
        }
    }, [campaignId])

    const addSession = () => {
        addCampaignSession(campaignId);
        setActive(maxSessions+1);
    }

    const validateSession = (session: number) => {
        if (session <= maxSessions) return session;
        return 1;
    }

    const getMeOut = () => {
        logout();
        window.location.reload();
    }

    const setNewActive = (session: number) => {
        // localStorage.setItem('activeSession', session.toString())
        setActive(session)
        // black magic sorcery
        document.dispatchEvent(event);
    }

    useEffect(() => {
        // const activeNum = localStorage.getItem('activeSession');
        // if (activeNum) {
        const validated = validateSession(activeSession);
        setActive(validated)
        // }
    }, [])

    return (
        <Box className="nav">
            <div>
                <h3><a href="/">Character Manager</a></h3>
                <Link href="/">Manager</Link>
                <Link href="/help">Help</Link>
                {import.meta.env.DEV && <Button onClick={DevTool}>Dev Button</Button>}
                {/* <div className="sessions">
                    {
                        maxSessions >= 0 ? [...Array(maxSessions)].map((_, num) => <NumberCard key={"el-"+num} number={num + 1} active={(num + 1) === activeSession} onClick={() => setNewActive(num + 1)}/>) : null
                    }
                    { maxSessions >= 0 ? <AddSessionCard onClick={addSession}/> : null }
                </div> */}
                <div className="sessions">
                    { campaignId !== "none" ? <SessionSelector activeSession={activeSession} setActive={setActive} sessions={maxSessions}/> : null}
                    { campaignId !== "none" ? <AddSessionCard onClick={addSession}/> : null }
                </div>

            </div>
            <div className="nav-right">
                <CampaignSelector />
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={getMeOut}
                    sx={{
                        minWidth: "30%"
                    }}
                >
                        Log Out
                </Button>
            </div>
        </Box>
    )
}

const SessionSelector = ({activeSession, sessions, setActive}: {activeSession: number, setActive: (foo: number) => void, sessions: number}) => {
    if (sessions === -1) return;
    return (
        <Tooltip title={"Select specific session"}> 
        <FormControl size="small" sx={{minWidth: 20, maxWidth: "5vw"}}>
            <Select
                id="session-selector"
                value={activeSession}
                onChange={(e) => setActive(e.target.value as number)}
            >
                <MenuItem key={"session-0"} value={0}>0</MenuItem>
                {
                    [...Array(sessions)].map((_, num) => <MenuItem key={"session-"+(num + 1)} value={num + 1}>{num + 1}</MenuItem>)
                }
            </Select>
        </FormControl>
        </Tooltip>
    )
}

const CampaignSelector = () => {
    const setCampaignId = useStoreActions(actions => actions.campaign.setCampaignId);
    const setCampaignInfo = useStoreActions(actions => actions.campaign.setCampaignInfo);
    const setActiveSession = useStoreActions(actions => actions.campaign.setActiveSession);
    const campaign = useStoreState(state => state.campaign.campaignId);

    const [cids, setCids] = useState<string[]>();

    useEffect(() => {
        // TODO: fetch campaigns and populate options
        getAllCampaignIds().then(cids => setCids(cids));
    }, [])

    const handleCampaignChange = (campaignId: string) => {
        if (campaignId === "none") {
            setCampaignInfo(null);
            setCampaignId(campaignId);
        }
        // grab campaign information
        getCampaignInfo(campaignId)
        .then(campaign => {
            if (campaign === null) return;
            setCampaignInfo(campaign);
            setCampaignId(campaign.cid);
            setActiveSession(campaign.sessions);
        })
        .catch(err => {
            console.error("Error fetching campaign info:", err);
        })
    }

    return (
        // <Tooltip title="Select a campaign">
        <FormControl size="small" sx={{width: "15vw"}}>
            <Select
                id="campaign-selector"
                value={campaign}
                onChange={(e) => handleCampaignChange(e.target.value)}
            >
                <MenuItem value={"none"}><i style={{color: "silver"}}>Select campaign</i></MenuItem>
                {
                    cids?.map(cid => {
                        return <MenuItem key={cid} value={cid}>{cid}</MenuItem>
                    })
                }
                {/* <MenuItem value={"jaspar_tyranny_of_dragons_20242025"}>Jaspar's Tyranny of Dragon's</MenuItem> */}
            </Select>
        </FormControl>
        // </Tooltip>
    )
}

export type NumberCardType = {
    number: number;
    onClick: () => void;
    active?: boolean;
}

export type AddSessionCardType = {
    onClick: () => void;
}

export const NumberCard = (props: NumberCardType) => {
    return (
        <div className={props.active ? "numberCard active" : "numberCard"} onClick={props.onClick}>
            {props.number}
        </div>
    )
}

export const AddSessionCard = (props: AddSessionCardType) => {
    return (
        <Tooltip title="Add new session">
        <div className="numberCard addSessionCard" onClick={props.onClick}>
            <AddIcon sx={{fontSize: "15px"}}/>
        </div>
        </Tooltip>
    )
}

export default NewNav;