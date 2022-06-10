import { FormControl, Icon, IconButton, Input, InputAdornment } from "@mui/material"

const SearchProduct = () => {

  const handleClickShowPassword = () => {

  }

  return (

    <FormControl sx={{ m: 1, width: '300px' }} variant="filled">
      {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel> */}
      <Input
        id="standard-adornment-password"
        placeholder="search"

        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
            ><Icon>search</Icon></IconButton>
          </InputAdornment>
        }
      />
    </FormControl>

  )
}

export default SearchProduct