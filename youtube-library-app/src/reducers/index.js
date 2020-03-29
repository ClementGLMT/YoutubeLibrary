import { combineReducers } from 'redux';
import DataLoading from './dataLoading';
import User from './user';
import RightDisplay from './rightDisplay';
import Modal from './modal';

export default combineReducers({
  DataLoading,
  User,
  RightDisplay,
  Modal
})
