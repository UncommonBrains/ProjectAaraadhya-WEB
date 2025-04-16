import { LOGIN, LOGOUT, SET_USER } from "./authActionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
