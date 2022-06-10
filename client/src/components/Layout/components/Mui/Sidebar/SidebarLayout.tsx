import { AccountBox } from "@mui/icons-material"
import { AppBar, Icon, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

const SidebarLayout = () => {
  return (
    <AppBar sx={{ height: '100%' }} position="static" >
      <List disablePadding>
        <ListItemButton component="a">
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText>Trang chu</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Icon>newspaper</Icon>
          </ListItemIcon>
          <ListItemText>Tin Tuc</ListItemText>
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <Icon>laptop</Icon>
          </ListItemIcon>
          <ListItemText>San Pham</ListItemText>
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItemButton>
      </List>
    </AppBar>
  )
}

export default SidebarLayout