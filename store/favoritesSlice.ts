
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    ids: [] as string[],
  },

  reducers: {
    // Nếu đã yêu thích thì bỏ ra, chưa có thì thêm vào
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.ids.indexOf(action.payload);

      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

// Lấy danh sách id yêu thích
export const selectFavoriteIds = (s: RootState) => s.favorites.ids;

// Kiểm tra một sách đã được yêu thích hay chưa
export const selectIsFavorite =
  (id: string) => (s: RootState) =>
    s.favorites.ids.includes(id);
