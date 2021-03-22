import { call as _call, put as _put, select as _select } from "typed-redux-saga";
import type { SagaGenerator } from "typed-redux-saga";
import type { Tail, SelectEffect } from "redux-saga/effects";
import type { TRootApplicationState } from "@/client-state/types";

export const call = _call;
export const put = _put;

type Select<RootState> = (
  selector: (state: RootState, ...args: any[]) => any,
  ...args: Tail<Parameters<typeof selector>>
) => SagaGenerator<ReturnType<typeof selector>, SelectEffect>;

export const select: Select<TRootApplicationState> = _select;
