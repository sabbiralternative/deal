import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  memberId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { token, user, memberId } = payload;
      state.token = token;
      state.user = user;
      state.memberId = memberId;
    },
    logout: (state) => {
      const nonRemovalKey = ["closePopupForForever", "build_version"];
      Object.keys(localStorage).forEach((key) => {
        if (!nonRemovalKey.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      state.token = null;
      state.user = null;
      state.memberId = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
export const userToken = (state) => state.auth.token;
export const currentUser = (state) => state.auth.user;
