const  initialState = { 
    DataLoading: {
        isLeftDataLoaded: 0, 
        isRightDataLoaded: 0, 
    },
    SetUser: {
        user: 'none'
    },
    ShowOnRight: {
        rightShowWelcome: 1, 
        rightShowSearchAndResults: 0, 
        rightShowVideo: 0
    }
};

export default initialState;