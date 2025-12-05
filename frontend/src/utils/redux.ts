
export const setPending = <T extends { isLoading: boolean; error: null | string }>(state: T) => {
  state.isLoading = true;
  state.error = null;
};

export const setRejected = <T extends { isLoading: boolean; error: null | string }>(state: T, action: any) => {
  state.isLoading = false;
  state.error = action.payload ?? "Ошибка";
};

export const setFulfilled = <T extends { isLoading: boolean; error: null | string }>(state: T) => {
  state.isLoading = false;
  state.error = null;
};

export const isPendingAction = (action: any) =>
  action.type.endsWith("/pending");

export const isRejectedAction = (action: any) =>
  action.type.endsWith("/pending");

export const isFulfilledAction = (action: any) =>
  action.type.endsWith("/fulfilled");
