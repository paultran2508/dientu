import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ProductDetailStyle = styled(Card)(() => ({
  padding: '2px',
  '&:hover': {
    '& first-child': {
      margin: '-1px 1px 1px -1px',
      'box-shadow': ' 1px 1px 5px',
    }
  },


}))