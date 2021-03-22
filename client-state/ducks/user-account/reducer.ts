import { createReducer } from "typesafe-actions";
import type User from "@/repositories/entities/user";
import type Enterprise from "@/repositories/entities/enterprise";
import actionCreators from "./action-creators";

type TUserAccountState = {
  user: User | null;
  enterprise: Enterprise | null;
  impersonatingUser: User | null;
};

const initialState: TUserAccountState = {
  user: null,
  enterprise: null,
  impersonatingUser: null,
};

export default createReducer(initialState)
  .handleAction(actionCreators.loadEnterprise, (state, action) => {
    return {
      ...state,
      enterprise: action.payload,
    };
  })
  .handleAction(actionCreators.resetUserState, () => {
    return {
      user: null,
      enterprise: null,
      impersonatingUser: null,
    };
  });
