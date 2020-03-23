import { combineReducers } from 'redux';
import DataLoading from './dataLoading';
import SetUser from './setUser';
import ShowOnRight from './showOnRight';

var dataloading = {
    isLeftDataLoaded: 0, 
    isRightDataLoaded: 0,  
}
var setuser = {
    user: 'none'
}
var showonright = { 
    rightShowWelcome: 1, 
    rightShowSearchAndResults: 0, 
    rightShowVideo: 0
}

export default combineReducers({
  DataLoading,
  SetUser,
  ShowOnRight
})
