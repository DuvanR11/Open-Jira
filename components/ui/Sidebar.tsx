import { Box, Drawer, List, ListItemButton, ListItemIcon  } from "@mui/material"
import Typography from '@mui/material/Typography';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { useContext } from 'react'
import { UIContext } from "@/context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext( UIContext )

  return (
    <Drawer
        anchor="left"
        open= { sidemenuOpen }
        onClose={ closeSideMenu }
    >
        <Box sx={{ width: 250 }}>
            
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant='h4'>Menu</Typography>
            </Box>
            <List>
                {
                    menuItems.map( (text, index) =>  (
                        <ListItemButton  key={ text }>
                            <ListItemIcon>
                            { index % 2 ? <AccessibleIcon/> : <AccessibleForwardIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItemButton >
                    ))
                }
            </List>
            <Divider/>
            <List>
                {
                    menuItems.map( (text, index) =>  (
                        <ListItemButton  key={ text }>
                            <ListItemIcon>
                            { index % 2 ? <AccessibleIcon/> : <AccessibleForwardIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItemButton >
                    ))
                }
            </List>
        </Box>
    </Drawer>
  )
}
