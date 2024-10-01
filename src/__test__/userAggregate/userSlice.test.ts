import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  userActions,
  userReducer,
} from "../../app/service/useAggregate/userSlice";
import {
  UserCreateDto,
  UserReadDto,
  UserUpdateDto,
} from "../../app/data/dto/userAggregate/userDtos";
import { baseUrl } from "../../app/service/shared/baseUrl";

// Mock axios
const mock = new MockAdapter(axios);

const initialState = {
  data: {
    items: [],
    pageNumber: 1,
    pageSize: 1,
    totalCount: 1,
    totalPages: 1,
  },
  loading: false,
  error: undefined,
};

describe("userSlice async actions", () => {
  const store = configureStore({
    reducer: {
      users: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAllUser: should fetch users and update state", async () => {
    const mockUsers: UserReadDto[] = [
      {
        firstName: "Iman",
        lastName: "Soltani",
        email: "iman@gmail.com",
        is_Admin: false,
        phoneNumber: "0417215031",
        id: 1,
        is_Deleted: false,
      },
    ];
    const paginatedResult = {
      items: mockUsers,
      pageNumber: 1,
      pageSize: 10,
      totalCount: 2,
      totalPages: 1,
    };

    mock.onGet(`${baseUrl}/users`).reply(200, paginatedResult);

    await store.dispatch(
      userActions.getAllUser({
        pageNumber: 1,
        pageSize: 10,
        sortBy: "id",
        isAscending: true,
        searchTerm: "",
        searchBy: "",
      })
    );

    const state = store.getState().users;

    expect(state.loading).toBe(false);
    expect(state.data.items).toEqual(mockUsers);
    expect(state.data.totalCount).toBe(2);
    expect(state.error).toBeUndefined();
  });

  test("createUser: should create a new user and update state", async () => {
    const newUser: UserCreateDto = {
      firstName: "Iman",
      lastName: "Soltani",
      email: "iman@gmail.com",
      isAdmin: false,
      password: "rkxmsd123",
      phoneNumber: "0417215031",
    };
    const createdUser: UserReadDto = {
      id: 1,
      firstName: "Iman",
      lastName: "Soltani",
      email: "iman@gmail.com",
      is_Deleted: false,
      phoneNumber: "0417215031",
      is_Admin: false,
    };

    mock.onPost(`${baseUrl}/users`).reply(200, createdUser);

    await store.dispatch(userActions.createUser(newUser));

    const state = store.getState().users;

    expect(state.loading).toBe(false);
    expect(state.data.items).toContainEqual(createdUser);
    expect(state.error).toBeUndefined();
  });

  test("updateUser: should update an existing user and update state", async () => {
    const updatedUser: UserUpdateDto = {
      id: 1,
      firstName: "John Smith",
      lastName: "Soltani",
      phoneNumber: "0417215031",
      password: "rkxmsd123",
    };
    const returnedUser: UserReadDto = {
      id: 1,
      firstName: "John Smith",
      lastName: "Soltani",
      email: "iman@gmail.com",
      is_Deleted: false,
      phoneNumber: "0417215031",
      is_Admin: false,
    };

    mock.onPut(`${baseUrl}/users`).reply(200, returnedUser);

    await store.dispatch(userActions.updateUser(updatedUser));

    const state = store.getState().users;

    expect(state.loading).toBe(false);
    expect(state.data.items).toContainEqual(returnedUser);
    expect(state.error).toBeUndefined();
  });

  test("deleteUser: should delete a user and update state", async () => {
    const userId = 1;

    mock.onDelete(`${baseUrl}/users/${userId}`).reply(200);

    await store.dispatch(userActions.deleteUser(userId));

    const state = store.getState().users;

    expect(state.loading).toBe(false);
    expect(state.data.items.find((user) => user.id === userId)).toBeUndefined();
    expect(state.error).toBeUndefined();
  });

  test("getUser: should fetch a user by id and update state", async () => {
    const userId = 1;
    const fetchedUser: UserReadDto = {
      firstName: "Iman",
      lastName: "Soltani",
      email: "iman@gmail.com",
      is_Admin: false,
      phoneNumber: "0417215031",
      id: 1,
      is_Deleted: false,
    };

    mock.onGet(`${baseUrl}/users/${userId}`).reply(200, fetchedUser);

    await store.dispatch(userActions.getUser(userId));

    const state = store.getState().users;

    expect(state.loading).toBe(false);
    expect(state.item).toEqual(fetchedUser);
    expect(state.error).toBeUndefined();
  });
});
