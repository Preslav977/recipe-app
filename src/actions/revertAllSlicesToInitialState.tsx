import { createAction } from "@reduxjs/toolkit";

export const revertAllSlicesToInitialState = createAction(
  "Revert_InitialState",
);
