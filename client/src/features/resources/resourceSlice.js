import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resourceService from "./resourceService";

const initialState = {
  resources: [],
  isLoadingResource: false,
  isError: false,
  isSuccess: false,
  message: "",
  actionDone: false,
};

// Get user resources
export const getResources = createAsyncThunk(
  "resources/getResources",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resourceService.getResources(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get selected user resources
export const getSelectedUserResource = createAsyncThunk(
  "resources/getSelectedUserResource",
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resourceService.getSelectedUserResource(memberId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a new resource
export const createUserResource = createAsyncThunk(
  "resources/create",
  async (resourceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resourceService.createUserResource(resourceData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a new team resource
export const createToTeam = createAsyncThunk(
  "resources/create-team",
  async (resourceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resourceService.createToTeam(resourceData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user resource check-in status
export const updateResourceCheckInStatus = createAsyncThunk(
  "resources/updateResourceCheckInStatus",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resourceService.updateResourceCheckInStatus(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user resources
export const deleteResource = createAsyncThunk(
  "resources/deleteResource",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resourceService.deleteResource(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get resources for logged in user
      .addCase(getResources.pending, (state) => {
        state.isLoadingResource = true;
      })
      .addCase(getResources.fulfilled, (state, action) => {
        state.isLoadingResource = false;
        state.isSuccess = true;
        state.resources = action.payload;
      })
      .addCase(getResources.rejected, (state, action) => {
        state.isLoadingResource = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get resources for logged in user
      .addCase(getSelectedUserResource.pending, (state) => {
        state.isLoadingResource = true;
      })
      .addCase(getSelectedUserResource.fulfilled, (state, action) => {
        state.isLoadingResource = false;
        state.isSuccess = true;
        state.resources = action.payload;
      })
      .addCase(getSelectedUserResource.rejected, (state, action) => {
        state.isLoadingResource = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Create resource
      .addCase(createUserResource.pending, (state) => {
        state.isLoadingResource = true;
      })
      .addCase(createUserResource.fulfilled, (state, action) => {
        state.isLoadingResource = false;
        state.isSuccess = true;
        state.resources.push(action.payload);
      })
      .addCase(createUserResource.rejected, (state, action) => {
        state.isLoadingResource = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create resource to team
      .addCase(createToTeam.pending, (state) => {
        state.isLoadingResource = true;
      })
      .addCase(createToTeam.fulfilled, (state, action) => {
        state.isLoadingResource = false;
        state.isSuccess = true;
        state.resources.push(action.payload);
      })
      .addCase(createToTeam.rejected, (state, action) => {
        state.isLoadingResource = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Update resource check-in status
      .addCase(updateResourceCheckInStatus.pending, (state) => {
        state.isLoadingResource = true;
        state.actionDone = false;
      })
      .addCase(updateResourceCheckInStatus.fulfilled, (state, action) => {
        state.isLoadingResource = false;
        state.isSuccess = true;
        state.actionDone = true;
        state.resources = state.resources.filter(
          (resource) => resource._id !== action.payload._id
        );
      })
      .addCase(updateResourceCheckInStatus.rejected, (state, action) => {
        state.isLoadingResource = false;
        state.isError = true;
        state.message = action.payload;
        state.actionDone = true;
      })
      //Delete resource
      .addCase(deleteResource.pending, (state) => {
        state.isLoadingResource = true;
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.isLoadingResource = false;
        state.isSuccess = true;
        state.actionDone = true;
        state.resources = state.resources.filter(
          (resource) => resource._id !== action.payload._id
        );
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.isLoadingResource = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = resourceSlice.actions;
export default resourceSlice.reducer;
