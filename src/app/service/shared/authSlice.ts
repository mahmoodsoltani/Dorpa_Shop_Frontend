import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Draft,
} from "@reduxjs/toolkit";
import axios from "axios";
//Project Imports
import { LoginResponseDtos } from "../../data/dto/shared/loginResponseDtos";
import { baseUrl } from "./baseUrl";
import { UserCreateDto } from "../../data/dto/userAggregate/userDtos";
import { LoginDto } from "../../data/dto/shared/loginDtos";


interface AuthState {
  loginResponse: LoginResponseDtos | null; // Store the JWT token or any authentication token
  loading: boolean; // To track the loading state during login, registration, etc.
  error: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  token: string;
  userName: string;
  userId: number;
}

const initialState: AuthState = {
  loginResponse: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  isAdmin: false,
  token: "",
  userName: "",
  userId: 0,
};

const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginDto, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Login failed");
    }
  }
);

const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (newItem : UserCreateDto, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/google-login`,
        newItem
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Google login failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponseDtos>) => {
          state.loading = false;
          state.loginResponse = action.payload as Draft<LoginResponseDtos>;
          state.token = state.loginResponse.token;
          state.userName = `${state.loginResponse.firstName}  ${state.loginResponse.lastName}`;
          state.isLoggedIn = true;
          state.isAdmin = state.loginResponse.is_Admin;
          state.userId = state.loginResponse.id;
          localStorage.setItem("token", state.token);
        }
      )
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        googleLogin.fulfilled,
        (state, action: PayloadAction<LoginResponseDtos>) => {
          state.loading = false;
          state.loginResponse = action.payload as Draft<LoginResponseDtos>;
          state.token = state.loginResponse.token;
          state.userName = `${state.loginResponse.firstName} ${state.loginResponse.lastName}`;
          state.isLoggedIn = true;
          state.isAdmin = state.loginResponse.is_Admin;
          state.userId = state.loginResponse.id;
          localStorage.setItem("token", state.token);
        }
      )
      .addCase(googleLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    // Handle logout actions
    // builder
    //   .addCase(logout.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(logout.fulfilled, (state) => {
    //     state.loading = false;
    //     state.loginResponse = null;
    //     state.token = "";
    //     state.userName = "";
    //     state.isLoggedIn = false;
    //     state.isAdmin = false;
    //   })
    //   .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload.error;
    //   });
  },
});
export const authActions = {
  ...authSlice.actions,
  login: login,
  googleLogin: googleLogin,
};
export const { reducer: authReducer } = authSlice;
