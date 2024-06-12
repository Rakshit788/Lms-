import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import { toast } from 'react-hot-toast';

// Initial state
const initialState = {
  isLoggedin: JSON.parse(localStorage.getItem('isLoggedin')) || false,
  role: localStorage.getItem('role') || "",
  data: JSON.parse(localStorage.getItem('data')) || {},
  username: localStorage.getItem('username') || "",
  previousState: {}
};

// Thunks
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    await toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (res) => res.data.message,
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; // Ensure the error is thrown to be caught in extraReducers
  }
});

export const loginaccount = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    await toast.promise(res, {
      loading: "Logging In !!",
      success: "Logged In Successfully",
      error: "Something Went wrong"
    });
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
    throw error; // Ensure the error is thrown to be caught in extraReducers
  }
});

export const logoutAccount = createAsyncThunk("/logout", async () => {
  try {
    const res = await axiosInstance.post("/user/logout");
    return res.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error; // Ensure the error is thrown to be caught in extraReducers
  }
});

export const updateProfile = createAsyncThunk("/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post("user/changeprofile ", data);
  
    const result = await toast.promise(res, {
      loading: "Please wait updating profile",
      success: "Updated successfully",
      error: "Something went wrong"
    });
    ; // Log the entire response data
    return result.data;
  } catch (error) {
   
    return rejectWithValue(error?.response?.data);
  }
});

export  const changepassword =  createAsyncThunk("/changepassword" , async(data) =>{
try {
    const resp   =  axiosInstance.post("user/changepassword" ,  data  )
    const result  =  await  toast.promise(resp ,{
      success : "Password changed sucessfully" ,
      error : "Unable to change password"
    })
    return  (await (resp)).data
} catch (error) {
   console.log(error);
   throw error
}
})



// Slice
export const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginaccount.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("role", data.role);
          localStorage.setItem("username", data.username);
          localStorage.setItem("isLoggedin", JSON.stringify(true));
          state.data = data;
          state.role = data.role;
          state.username = data.username;
          state.isLoggedin = true;
        }
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.isLoggedin = false;
        state.data = {};
        state.role = "";
        state.username = "";
        localStorage.setItem("isLoggedin", JSON.stringify(false));
        localStorage.setItem("data", JSON.stringify({}));
        localStorage.setItem("role", "");
        localStorage.setItem("username", "");
      })
      .addCase(updateProfile.pending, (state) => {
        state.previousState = { ...state };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('Update Profile Fulfilled:', action.payload);
        const { data } = action.payload;
        if (data) {
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("role", data.role);
          localStorage.setItem("username", data.username);
          localStorage.setItem("isLoggedin", JSON.stringify(true));
          state.data = data;
          state.role = data.role;
          state.username = data.username;
          state.isLoggedin = true;
      } })
      .addCase(updateProfile.rejected, (state, action) => {
        state = { ...state.previousState };
        toast.error("Profile update failed. Reverting to previous state.");
      });
  }
});

export default authslice.reducer;
