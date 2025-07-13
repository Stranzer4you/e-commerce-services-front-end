import {
  Box,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCustomerOrdersDetails } from "../../api/myProfileLayoutApiCalls";

type Orders = {
  productName: string;
  amountPaid: number;
  orderId: number;
  productId: number;
  imageUrl: string;
  rating: number;
  orderedAt: string;
  statusName: string;
};

const STATUS_OPTIONS = [
  { label: "All", id: "" },
  { label: "Processing", id: "1" },
  { label: "Processed", id: "2" },
  { label: "Failed", id: "3" },
];


const MyOrders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<string>("");

  const getCustomerOrders = async (customerId: number, status?: number) => {
  const orderResult = await fetchCustomerOrdersDetails(customerId, status);
  setOrders(orderResult?.data || []);
};


  useEffect(() => {
    const statusToSend = selectedStatusId === null || selectedStatusId === '' ? undefined : Number(selectedStatusId);
    getCustomerOrders(1, statusToSend);
  }, [selectedStatusId]);

 const handleStatusChange = (event: SelectChangeEvent) => {
  setSelectedStatusId(event.target.value);
};


  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "processed":
        return { backgroundColor: "#e6f4ea", color: "#2e7d32" };
      case "processing":
        return { backgroundColor: "#fff8e1", color: "#f9a825" };
      case "failed":
        return { backgroundColor: "#ffebee", color: "#c62828" };
      default:
        return { backgroundColor: "#eceff1", color: "#607d8b" };
    }
  };

  return (
    <Box className="wishlist-container">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" className="wishlist-heading">
          My Orders ({orders?.length})
        </Typography>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatusId !== null ? selectedStatusId : ""}
            label="Status"
            onChange={handleStatusChange}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.label} value={option.id ?? ''}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="wishlist-grid">
        {orders?.map((item) => (
          <Card key={`${item.orderId}-${item.productId}-${item.orderedAt}`} className="wishlist-card">
            <CardMedia
              component="img"
              image={item?.imageUrl}
              alt={item?.productName}
              className="wishlist-card-img"
              sx={{ background: "grey !important" }}
            />
            <CardContent className="wishlist-card-content" sx={{ padding: "0px !important" }}>
              <Typography variant="subtitle1" className="product-name">
                {item?.productName}
              </Typography>
              <Typography variant="body2" className="product-price">
                ₹{item?.amountPaid.toLocaleString()}
              </Typography>
              <Rating
                value={item?.rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ marginTop: "4px" }}
              />
              <Typography
                variant="body2"
                className="product-price"
                sx={{ color: "grey", mt: "2px" }}
              >
                {item?.orderedAt}
              </Typography>
              <Box
                component="span"
                sx={{
                  px: 1.5,
                  py: 0.2,
                  borderRadius: "8px",
                  fontSize: "12px",
                  display: "inline-block",
                  mt: "2px",
                  ...getStatusStyles(item?.statusName),
                  padding: "5px",
                }}
              >
                {item?.statusName}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyOrders;
