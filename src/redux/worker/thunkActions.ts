import { useAxios } from "@/hooks/useAxios";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWorkerProfile = createAsyncThunk(
  "get-worker-profile",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}worker/profile`,
      method: "GET",
      data,
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const getWorkerProfilePicture = createAsyncThunk(
  "get-worker-profile-picture",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}worker/profile/picture-url`,
      method: "GET",
      data,
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data.url;
  }
);

export const getWorkerById = createAsyncThunk(
  "get-worker",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}worker/${data}/public`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const patchWorkerProfile = createAsyncThunk(
  "patch-worker-profile",
  async (data: any, thunkAPI) => {
    const toastId = toast.loading("Updating profile...");
    const response = await useAxios({
      url: `${BASE_URL}worker/profile`,
      method: "PATCH",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        { status_code: response.status_code, message: response.error },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Successfully updated profile",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response.data;
  }
);

export const patchWorkerProfilePic = createAsyncThunk(
  "patch-worker-profile-pic",
  async (data: FormData, thunkAPI) => {
    const UPDATE_WORKER_PROFILE = toast.loading("Updating profile picture...");
    const response = await useAxios({
      url: `${BASE_URL}worker/profile/picture`,
      method: "PATCH",
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        UPDATE_WORKER_PROFILE
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(UPDATE_WORKER_PROFILE, {
      render: "Successfully updated",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const getWorkerKYC = createAsyncThunk(
  "get-worker-kyc",
  async (_: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}worker/kyc`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const submitKYC = createAsyncThunk(
  "submitKYC",
  async (data: FormData, thunkAPI) => {
    const toastId = toast.loading("Uploading KYC Information...");

    const response = await useAxios({
      url: `${BASE_URL}worker/kyc`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });

    if (response.error) {
      useApiErrorHandler(
        {
          status_code: response.status_code,
          message: response.error,
        },
        toastId
      );
      return thunkAPI.rejectWithValue(response.error);
    }

    toast.update(toastId, {
      render: "Successfully uploaded KYC information",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    return response.data;
  }
);

export const getWorkerJobs = createAsyncThunk(
  "get-worker-jobs",
  async (_: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}worker/jobs`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data.items;
  }
);

export const getWorkerJobDetail = createAsyncThunk(
  "get-worker-job-detail",
  async (data: string, thunkAPI) => {
    const response = await useAxios({
      url: `${BASE_URL}worker/jobs/${data}`,
      method: "GET",
    });

    if (response.error) {
      useApiErrorHandler({
        status_code: response.status_code,
        message: response.error,
      });
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);
