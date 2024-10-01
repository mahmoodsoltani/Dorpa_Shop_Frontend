import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
  Slice,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// Project Imports
import {
  BaseReadDto,
  BaseCreateDto,
  BaseUpdateDto,
} from "../../data/dto/shared/baseDtos";
import { baseUrl } from "./baseUrl";
import { PaginatedResult } from "../../data/dto/shared/paginatedResult";
import { QueryOptions } from "../../data/type/queryOptions";
import authHeader from "../shared/authService";

export interface BaseState<TReadDto extends BaseReadDto> {
  data: PaginatedResult<TReadDto>;
  item?: TReadDto;
  loading: boolean;
  error?: string;
}

class BaseSlice<
  TReadDto extends BaseReadDto,
  TCreateDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto
> {
  public genericSlice: Slice<BaseState<TReadDto>>;

  initialState: BaseState<TReadDto>;
  apiEndpoint: string;
  sliceName: string = "";
  headers?: Record<string, string>;
  customAsyncReducer?: (
    builder: ActionReducerMapBuilder<BaseState<TReadDto>>
  ) => void;
  customReducers?: {
    [key: string]: (
      state: Draft<BaseState<TReadDto>>,
      action: PayloadAction<any>
    ) => void;
  };

  constructor(
    name: string,
    apiEndpoint: string,
    headers?: Record<string, string>,
    customAsyncReducer?: (
      builder: ActionReducerMapBuilder<BaseState<TReadDto>>
    ) => void,
    customReducers?: {
      [key: string]: (
        state: Draft<BaseState<TReadDto>>,
        action: PayloadAction<any>
      ) => void;
    }
  ) {
    this.sliceName = name;
    this.apiEndpoint = apiEndpoint;
    this.initialState = {
      data: {
        items: [],
        pageNumber: 1,
        pageSize: 1,
        totalCount: 1,
        totalPages: 1,
      },
      loading: false,
    };
    this.customAsyncReducer = customAsyncReducer;
    this.customReducers = customReducers;
    this.genericSlice = this.createBaseAsyncSlice();
    this.headers = {
      ...headers,
    };

    this.getAll = createAsyncThunk<PaginatedResult<TReadDto>, QueryOptions>(
      `${this.sliceName}/getAll`,
      async (queryOption, { rejectWithValue }) => {
        try {
          const response = await axios.get<PaginatedResult<TReadDto>>(
            `${baseUrl}/${this.apiEndpoint}`,
            {
              headers: {
                ...this.headers,
                ...authHeader(),
              },
              params: {
                pageNumber: queryOption.pageNumber,
                pageSize: queryOption.pageSize,
                sortBy: queryOption.sortBy,
                isAscending: queryOption.isAscending,
                searchTerm: queryOption.searchTerm,
                searchBy: queryOption.searchBy,
              },
            }
          );
          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.response.data);
        }
      }
    );
    this.create = createAsyncThunk<TReadDto, TCreateDto>(
      `${this.sliceName}/create`,
      async (newItem, { rejectWithValue }) => {
        console.log(`${baseUrl}/${this.apiEndpoint}`);
        try {
          const response = await axios.post<TReadDto>(
            `${baseUrl}/${this.apiEndpoint}`,
            newItem,
            {
              headers: {
                ...this.headers,
                ...authHeader(),
              },
            }
          );

          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.response.data);
        }
      }
    );
    this.update = createAsyncThunk<TReadDto, TUpdateDto>(
      `${this.sliceName}/update`,
      async (updatedItem, { rejectWithValue }) => {
        try {
          const response = await axios.put<TReadDto>(
            `${baseUrl}/${this.apiEndpoint}`,
            updatedItem,
            {
              headers: {
                ...this.headers,
                ...authHeader(),
              },
            }
          );
          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.response.data);
        }
      }
    );
    this.get = createAsyncThunk<TReadDto, number>(
      `${this.sliceName}/get`,
      async (id, { rejectWithValue }) => {
        try {
          const response = await axios.get<TReadDto>(
            `${baseUrl}/${this.apiEndpoint}/${id}`,
            {
              headers: {
                ...this.headers,
                ...authHeader(),
              },
            }
          );

          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.response.data);
        }
      }
    );
    this.delete = createAsyncThunk<number, number>(
      `${this.sliceName}/delete`,
      async (id, { rejectWithValue }) => {
        try {
          await axios.delete(`${baseUrl}/${this.apiEndpoint}/${id}`, {
            headers: {
              ...this.headers,
              ...authHeader(),
            },
          });
          return id;
        } catch (error: any) {
          return rejectWithValue(error.response.data);
        }
      }
    );
  }
  getAll: ReturnType<
    typeof createAsyncThunk<PaginatedResult<TReadDto>, QueryOptions>
  >;
  create: ReturnType<typeof createAsyncThunk<TReadDto, TCreateDto>>;
  update: ReturnType<typeof createAsyncThunk<TReadDto, TUpdateDto>>;
  get: ReturnType<typeof createAsyncThunk<TReadDto, number>>;
  delete: ReturnType<typeof createAsyncThunk<number, number>>;

  // Create the slice with async thunks and custom reducers
  createBaseAsyncSlice = () => {
    return createSlice({
      name: this.sliceName,
      initialState: this.initialState,
      reducers: {
        ...this.customReducers,
      },
      extraReducers: (builder) => {
        // Handle getAll cases
        builder
          .addCase(this.getAll.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          })
          .addCase(
            this.getAll.fulfilled,
            (state, action: PayloadAction<PaginatedResult<TReadDto>>) => {
              state.loading = false;
              state.data = action.payload as Draft<PaginatedResult<TReadDto>>;
            }
          )
          .addCase(
            this.getAll.rejected,
            (state, action: PayloadAction<any>) => {
              state.loading = false;
              state.error = action.payload.error as string;
            }
          );

        // Handle get case
        builder
          .addCase(this.get.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          })
          .addCase(
            this.get.fulfilled,
            (state, action: PayloadAction<TReadDto>) => {
              const item = action.payload as TReadDto;

              state.item = item as Draft<TReadDto>;
              state.loading = false;
            }
          )
          .addCase(this.get.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error as string;
          });

        // Handle create case
        builder
          .addCase(this.create.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          })
          .addCase(
            this.create.fulfilled,
            (state, action: PayloadAction<TReadDto>) => {
              state.loading = false;
              state.data.items.push(action.payload as Draft<TReadDto>);
            }
          )
          .addCase(
            this.create.rejected,
            (state, action: PayloadAction<any>) => {
              state.loading = false;
              state.error = action.payload.error as string;
            }
          );

        // Handle update case
        builder
          .addCase(this.update.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          })
          .addCase(
            this.update.fulfilled,
            (state, action: PayloadAction<TReadDto>) => {
              const updatedItem = action.payload;
              const index = state.data.items.findIndex(
                (item) => item.id === updatedItem.id
              );
              if (index !== -1) {
                state.data.items[index] = updatedItem as Draft<TReadDto>;
              }
              state.loading = false;
            }
          )
          .addCase(
            this.update.rejected,
            (state, action: PayloadAction<any>) => {
              state.loading = false;
              state.error = action.payload.error as string;
            }
          );

        // Handle delete case
        builder
          .addCase(this.delete.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          })
          .addCase(
            this.delete.fulfilled,
            (state, action: PayloadAction<number>) => {
              state.loading = false;
              state.data.items = state.data.items.filter(
                (item) => item.id !== action.payload
              );
            }
          )
          .addCase(
            this.delete.rejected,
            (state, action: PayloadAction<any>) => {
              state.loading = false;
              state.error = action.payload.error as string;
            }
          );

        // Custom async reducers
        if (this.customAsyncReducer) {
          this.customAsyncReducer(builder);
        }
      },
    });
  };
}

export default BaseSlice;
