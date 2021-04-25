import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

export const userActions = {
  IsLoading: 'USER_IS_LOADING',
  IsAnonymous: 'USER_IS_ANONYMOUS',
  IsLoggedHasNoData: 'USER_IS_LOGGED_HAS_NO_DATA',
  IsLoggedHasData: 'USER_IS_LOGGED_HAS_DATA',
};

const initialState = {
  isLogged: false,
  hasData: false,
  user: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.IsAnonymous:
      return {
        ...state,
        isLogged: initialState.isLogged,
        hasData: initialState.hasData,
        user: initialState.user,
        isLoading: false,
      };

    case userActions.IsLoggedHasNoData:
      return {
        ...state,
        isLogged: true,
        hasData: false,
        user: action.user,
        isLoading: false,
      };

    case userActions.IsLoggedHasData:
      return {
        ...state,
        isLogged: true,
        hasData: true,
        user: action.user,
        isLoading: false,
      };

    default:
      return state;
  }
};

const makeStore = (context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware()));

export const wrapper = createWrapper(makeStore);
