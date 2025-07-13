import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Rating,
    CardActions,
    Button,
    IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

type ProductProps = {
  id: number;
  productName: string;
  imageUrl: string;
  rating: number;
  price: number;
  quantity: number;
  isAvailable: boolean;
  productCategoryId: number;
  addToCart:any;
  addToWishlist:any;
  customerId:any;
  isWishListed:boolean;
  isInCart:boolean;
  removeFromWishlist: any;
  handleGotoCart:any
};
const ProductCard: React.FC<ProductProps> = ({ id, productName, imageUrl, rating, price,addToCart,addToWishlist,customerId,isWishListed,isInCart,removeFromWishlist,handleGotoCart}) => {
       return (
        <Card
            sx={{
                width: 220,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                },
                cursor: 'pointer',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={productName}
                sx={{
                    objectFit: 'cover',
                    //   transition: 'transform 0.3s ease',
                    //   '&:hover': {
                    //     transform: 'scale(1.05)',
                    //   },
                }}
            />

            <CardContent sx={{ pb: 1.5 }}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                >
                    {productName}
                </Typography>

                <Rating
                    value={rating}
                    precision={0.5}
                    readOnly
                    size="small"
                />

                <Typography
                    variant="h6"
                    color="primary"
                >
                    ₹{price}
                </Typography>
            </CardContent>


            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2,pt:0 }}>
                <IconButton color="error" onClick={()=>{isWishListed ? removeFromWishlist(customerId,id) : addToWishlist(customerId,id)}}>
                     {isWishListed ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
                <Button
                    variant="contained"
                    size="small"
                    color={ isInCart ? "success":"primary"}
                    endIcon={<ShoppingCartIcon />}
                    onClick={()=>{isInCart ?   handleGotoCart() : addToCart(customerId,id,1,price)}}
                >
                    {isInCart ? 'Go To' : 'Add'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
