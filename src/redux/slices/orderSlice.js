import { createSlice } from "@reduxjs/toolkit";

const loadOrdersFromStorage = () => {
  try {
    const savedOrders = localStorage.getItem("foodieHubOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch {
    return [];
  }
};

const initialState = {
  orders: loadOrdersFromStorage(),
  currentOrder: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: `ORD${Date.now()}`,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };
      state.orders.unshift(newOrder);
      state.currentOrder = newOrder;
      localStorage.setItem("foodieHubOrders", JSON.stringify(state.orders));
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        localStorage.setItem("foodieHubOrders", JSON.stringify(state.orders));
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { placeOrder, updateOrderStatus, clearCurrentOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
