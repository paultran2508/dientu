import { AddShoppingCart } from "@mui/icons-material"
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Icon, IconButton, Typography } from "@mui/material"
import classNames from "classnames/bind"
import style from './productDetail.module.scss'

const cx = classNames.bind(style)

const ProductDetail = () => {




  return (

    <div className={cx('product-detail')}>
      <Card  >
        <CardActionArea>
          <CardMedia
            component="img"
            src={require('../../assets/product/iphone_12.jpg')}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Iphone 12</Typography>
            <Typography variant="body2" color="text.secondary">
              officiis nam doloremque nisi voluptates consequuntur accusantium, facere velit repellendus asperiores dicta id natus? </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions >
          <IconButton aria-label="add to favorites">
            <Icon >favoriteborder</Icon>
          </IconButton>
          <IconButton aria-label="share">
            <Icon>grade</Icon>
          </IconButton>
          <Button sx={{ flexGrow: 1 }} variant="contained" startIcon={<AddShoppingCart />}>
            12000000
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ProductDetail