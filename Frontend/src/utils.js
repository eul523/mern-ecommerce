import api from "./api.js";

export const handleCheckout = async (cartItems) => {
    let url;
    try{
        const items = cartItems.map(i => ({name: i.name, _id: i.productId, price: i.price, quantity: i.quantity}));
        const res = await api.post('/checkout/create-session', {items});
        url = res.data.url;
        window.location.href = url;
    }catch(err){
        throw new Error(err.response?.data?.message || err.message);
    }
}