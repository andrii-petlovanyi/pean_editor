import { Action } from "@reduxjs/toolkit";

export interface ChangeSwitchAction extends Action {
  type: string;
  payload: boolean;
}
