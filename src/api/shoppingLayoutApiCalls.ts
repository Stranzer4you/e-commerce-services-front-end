import axios from "axios";

export const ApiCall = axios.create({
  baseURL: process.env.REACT_APP_E_COMMERCE_BACKEND_BASE_URL
});

export const fetchAllCategories = async () =>{

 try{
    const res = await ApiCall.get(`inventory/categories`)
    if (res.status === 200 || res.status ===201) {
      return res.data
    }
    return {}
  } catch (e) {
    console.error(e)
    return null
  }
}


export const fetchProducts = async (categoryId?: number | null, searchText?: string | null) => {
  const params = new URLSearchParams();
  try {
    if (categoryId) params.append("categoryId", categoryId.toString());
    if (searchText && searchText.trim()) params.append("searchText", searchText.trim());
    const response = await ApiCall.get(`inventory?${params.toString()}`);
    if (response.status === 200 || response.status === 201) {
      return response.data
    }
    return {}

  }
  catch (e) {
    console.error(e)
    return null;
  }
};

export const fetchWishlistCartCount = async (customerId: number) => {
  try {
    const response = await ApiCall.get(`/customers/wishlist/cart/count/${customerId}`)
    if (response.status === 200 || response.status === 201) {
      return response.data
    }
    return {}
  }
  catch (e) {
    console.error(e)
    return null;
  }

}


export const addToCart = async (customerId: any, productId: any, quantity: any) => {
  try {
    const response = await ApiCall.post(`cart`, { customerId: customerId, productId: productId, quantity: quantity })
      return response
  }
  catch (e) {
    console.error(e);
    return null;
  }
}


export const addToWishlist = async (customerId: any, productId: any) => {
  try {
    const response = await ApiCall.post(`wishlist`, { customerId: customerId, productId: productId})
      return response
  }
  catch (e) {
    console.error(e);
    return null;
  }
}


export const removeFromWishlist = async (customerId: any, productId: any) => {
  try {
    const response = await ApiCall.delete(`wishlist`, { data: {
        customerId: customerId,
        productId: productId
      }})
      return response
  }
  catch (e) {
    console.error(e);
    return null;
  }
}

