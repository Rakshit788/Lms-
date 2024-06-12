import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosinstance';
import { toast } from 'react-hot-toast';

const initialState = {
  courselist: [],
  iscreated: false,
  loading: false,
  error: null,
};

export const fetchcourses = createAsyncThunk('/courses', async () => {
  const response = await axiosInstance.get('/course');
  console.log(response);
  return response.data;
});

export const createCourse = createAsyncThunk('/checkauth/course/create', async (data) => {
  try {
    const resp = await axiosInstance.post('/course', data);
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.error('Error creating course:', error);
    // Handle error here
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchcourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchcourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courselist = action.payload.data;
    });
    builder.addCase(fetchcourses.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.error('Error fetching courses:', action.error.message);
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      toast.success('Course created successfully');
      state.courselist.push(action.payload);
      state.iscreated = true;
    });
  },
});

export default courseSlice.reducer;
