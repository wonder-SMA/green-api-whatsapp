import { userReducer } from './user/reducer';
import * as userActions from './user/actions';

export const reducers = { userReducer };
export const actions = { ...userActions };
