import { Grid } from "@mui/material"
import { Children } from "../../../types/Children"
import { HeaderLayout } from "../components/Mui/Header"
import { SidebarLayout } from "../components/Mui/Sidebar"

const MuiLayout = ({ children }: Children) => {
  return (


    <Grid container spacing={0} bgcolor={'background.default'} color={'text.primary'}>
      <Grid item xs={12}> <HeaderLayout /> </Grid>
      <Grid bgcolor={'default.secondary'} sx={{
        overflowX: 'unset',
        overflowY: 'auto',
      }} height={'calc(100vh - 64px)'} item xs={2}> <SidebarLayout /> </Grid>
      <Grid item xs={8}> {children} </Grid>
    </Grid>

  )
}

export default MuiLayout