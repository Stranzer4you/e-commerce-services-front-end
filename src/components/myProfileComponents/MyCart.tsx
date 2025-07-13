import { useEffect, useState } from "react";
import { clearCartApi, fetchCustomerCartDetails, placeOrderApi, updateProductCartDetails } from "../../api/myProfileLayoutApiCalls";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../styles/myWishlistCss.css";
import { fetchCustomerWishlistDetails } from "../../api/myProfileLayoutApiCalls";
import { removeFromCart, removeFromWishlist } from "../../api/shoppingLayoutApiCalls";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  Box, Button, Card, CardContent, CardMedia, IconButton, Rating, Snackbar, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MuiAlert, { AlertColor } from "@mui/material/Alert";




type Cart ={
  productName:string,
  price:number,
  quantity:number,
  rating:number,
  productId:number,
  imageUrl: "/images/laptop2.jpg",
  id:number
}

const MyCart = () =>{

      const [cartDetails,setCartDetails] = useState<Cart[]>([]);

      const [initialPrices, setInitialPrices] = useState<Map<number, number>>(new Map());

        const [snackbar, setSnackbar] = useState<{
          open: boolean;
          message: string;
          severity: AlertColor;
        }>({
          open: false,
          message: "",
          severity: "success"
        });

        const totalPrice = cartDetails.reduce((sum, item) => {
    const unitPrice = initialPrices.get(item.productId) ?? 0;
    return sum + unitPrice * item.quantity;
  }, 0);


      useEffect(() => {
        const getCustomerDetails = async (customerId: any) => {
          const cartResult = await fetchCustomerCartDetails(customerId);
          setCartDetails(cartResult?.data);
          const pricesMap = new Map<number, number>();
          (cartResult?.data ?? []).forEach((item: any) => {
            const unitPrice = item.price / item.quantity;
            pricesMap.set(item.productId, unitPrice);
          });
          setInitialPrices(pricesMap);
        };

        getCustomerDetails(1);
      }, [])

        const handleRemove = async (id: number,productId:number) => {
           const res =await removeFromCart(1,productId,id);
           if(res?.status === 200 || res?.status ==201){
            setCartDetails(prev =>
             prev.filter(x=> x.productId !== productId));
           }
        };

      const handleUpdateQuantity = async (productId: number, newQty: number,newPrice:number) => {
        const res = await updateProductCartDetails(1, productId, newQty,newPrice);
        if (res?.status === 200) {
          setCartDetails(prev =>
            prev.map(item =>
              item.productId === productId ? { ...item, quantity: newQty,price:newPrice } : item
            )
          );
        }
      };

      const handlePlaceOrder = async (customerId:number,totalPrice:number,cartDetails :Cart[])=>{ 
         try {
              const res = await placeOrderApi(customerId,totalPrice,cartDetails);
              console.log("Response -> ",res?.status)
              if(res?.status === 200 || res?.status === 201){
                handleClearCart(customerId);
                setCartDetails([]);
                showSnackbar("Order Created !")
              }
         }
         catch(e){
          console.error(e);
          return null
         }
      }
      
      const handleClearCart = async(customerId:number)=>{
        const res = await clearCartApi(customerId);
      }


       const showSnackbar = (message: string, severity: AlertColor = "success") => {
                  setSnackbar({
                      open: true,
                      message,
                      severity
                  });
      
                  setTimeout(() => {
                      setSnackbar(prev => ({ ...prev, open: false }));
                  }, 3000);
              };

    return(
        <Box className="wishlist-container">
      <Typography variant="h6" className="wishlist-heading">
        My Cart ({cartDetails.length})
      </Typography>

      <Box className="wishlist-grid">
        {cartDetails.map((item) => (
          <Card key={item.productId} className="wishlist-card">
            <CardMedia
              component="img"
              image={item.imageUrl}
              alt={item.productName}
              className="wishlist-card-img"
              sx={{background:"grey !important"}}
            />
            <CardContent className="wishlist-card-content" sx={{ padding: '0px !important' }}>
              <Typography variant="subtitle1" className="product-name">{item.productName}</Typography>
              <Typography variant="body2" className="product-price">₹{item.price.toLocaleString()}</Typography>
                <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{marginTop:'4px'}}
                />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: '6px' }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (item.quantity > 1) {
                      const unitPrice = initialPrices.get(item.productId) ?? 0;
                      const newQty = item.quantity - 1;
                      const newPrice = unitPrice * newQty;
                      handleUpdateQuantity(item.productId, newQty, newPrice);
                    }
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <Typography variant="body2">{item.quantity}</Typography>

                <IconButton
                  size="small"
                  onClick={() => {
                    const unitPrice = initialPrices.get(item.productId) ?? 0;
                    const newQty = item.quantity + 1;
                    const newPrice = unitPrice * newQty;
                    handleUpdateQuantity(item.productId, newQty, newPrice);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            
            </CardContent>
            <IconButton className="delete-icon" onClick={() => handleRemove(item.id,item.productId)}>
              <DeleteIcon />
            </IconButton>
          
          </Card>
        ))}
      </Box>

        {cartDetails.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Typography variant="h6" className="wishlist-heading">
              Price (₹{totalPrice.toLocaleString()})
            </Typography>
            <Button variant="contained" color="primary" onClick={()=>handlePlaceOrder(1,totalPrice,cartDetails)}>
              Place Order
            </Button>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
    </Box>

    )
}

export default MyCart;