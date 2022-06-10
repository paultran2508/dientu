import { LoginOutlined } from "@mui/icons-material"
import { AppBar, Button, Icon, Stack, Toolbar, Typography } from "@mui/material"
import SearchProduct from "./SearchProduct"
// import { Box } from "@mui/system"

const MuiHeaderLayout = () => {
  return (
    <AppBar position="static" >
      <Toolbar sx={{ justifyContent: 'space-between' }} >
        <Stack direction="row" alignItems='center' spacing={1} sx={{ cursor: 'pointer', fontSize: '1.5rem' }}>
          <Icon fontSize={'large'}>pinicon</Icon>
          <Typography fontSize={'inherit'}>Trang chủ</Typography>
        </Stack>
        <SearchProduct />
        <Stack direction={'row'}>
          <Button startIcon={<LoginOutlined />} sx={{ marginRight: 4 }} color="inherit" variant="outlined">Login</Button>
          <Button color="inherit" variant="outlined">SignUp</Button>
        </Stack>
      </Toolbar>
    </AppBar >
  )
}

export default MuiHeaderLayout