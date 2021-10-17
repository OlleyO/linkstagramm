import { useDispatch } from "react-redux";
import { createStore, applyMiddleware, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";

import { IStoreState, Profile } from "../../types";
import authReducer from "../features/authSlice";

type DispatchFunctionType = ThunkDispatch<IStoreState, Profile, AnyAction>;

export const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware<DispatchFunctionType, IStoreState>(thunk))
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
