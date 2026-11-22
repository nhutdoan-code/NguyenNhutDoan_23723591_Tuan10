
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Book } from "../types";
import type { RootState } from "./index";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Thêm sách vào giỏ hàng
    addToCart: (
      state,
      action: PayloadAction<Pick<Book, "id" | "title" | "price">>
    ) => {
      const book = action.payload;

      // Kiểm tra sách đã có trong giỏ chưa
      const existingItem = state.items.find(
        (item) => item.bookId === book.id
      );

      if (existingItem) {
        // Đã có thì tăng số lượng
        existingItem.quantity += 1;
      } else {
        // Chưa có thì thêm sách mới
        state.items.push({
          bookId: book.id,
          title: book.title,
          price: book.price,
          quantity: 1,
        });
      }
    },

    // Giảm số lượng sách
    decrease: (state, action: PayloadAction<string>) => {
      const found = state.items.find(
        (item) => item.bookId === action.payload
      );

      if (!found) return;

      if (found.quantity > 1) {
        found.quantity -= 1;
      } else {
        // Số lượng bằng 1 thì xóa sách khỏi giỏ
        state.items = state.items.filter(
          (item) => item.bookId !== action.payload
        );
      }
    },

    // Xóa một sách khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.bookId !== action.payload
      );
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Xuất các action
export const {
  addToCart,
  decrease,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Lấy danh sách sách trong giỏ hàng
export const selectCartItems = (state: RootState) =>
  state.cart.items;

// Tính tổng số lượng sách
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

// Tính tổng tiền
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Xuất reducer
export default cartSlice.reducer;
