import { combineReducers } from 'redux';
import DataLoading from './dataLoading';
import SetUser from './setUser';
import ShowOnRight from './showOnRight';
import ModalReducer from './modalReducer';

export default combineReducers({
  DataLoading,
  SetUser,
  ShowOnRight,
  ModalReducer
})
