import { Toolbar, Box, IconButton, MenuItem, FormControl, Select, Button, InputLabel } from "@mui/material";
import AppBar from "@mui/material/AppBar"
import { useState } from "react";

const Nav = () => {
    const [campaign, setCampaign] = useState(1);
    const [session, setSession] = useState(1);

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"  style={{minHeight: "10vh", display: "flex", justifyContent: "center", backgroundColor: "gray"}}>
          <Toolbar style={{height: "5vh"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
                DND Characters
            </IconButton>
            <FormControl style={{
                display: "flex",
                justifyContent: "left",
                flexDirection: "row",
                gap: 10
            }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={campaign}
                    label="Age"
                    onChange={(e) => setCampaign(e.target.value as number)}
                    sx = {{
                        backgroundColor: "white",
                        width: "20vw",
                        color: "black"
                    }}
                >
                    <MenuItem value={1}>Strahd w/ Alex</MenuItem>
                    <MenuItem value={2}>Sam's campaign</MenuItem>
                </Select>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={session}
                    label="Age"
                    onChange={(e) => setSession(e.target.value as number)}
                    sx = {{
                        backgroundColor: "white",
                        width: "20vw"
                    }}
                >
                    <MenuItem value={1}>Session One</MenuItem>
                    <MenuItem value={2}>Session Two</MenuItem>
                    <MenuItem value={3}>Session Three</MenuItem>
                </Select>
                <Button color="primary" variant="contained">Set Details</Button>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Box>
    )    
}

export default Nav;