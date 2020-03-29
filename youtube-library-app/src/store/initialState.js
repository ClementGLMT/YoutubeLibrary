const  initialState = { 
    DataLoading: {
        leftPanel: {
            videos: 
                [{
                    thumbnails: {
                        medium: {
                            url: 'https://i.postimg.cc/N0RmDBjZ/new-loading-medium.gif', 
                            width: 320, 
                            height: 180
                        },
                        high: {
                            url: 'https://i.postimg.cc/jSpyyLtz/new-loading-high.gif',
                            width: 480,
                            height: 360,
                        }
                    },
                    title: '',
                    id: '151561'
                }]
        },
        rightPanel: {
            videos: [
                {
                    thumbnails: {
                        medium: {
                            url: 'https://i.postimg.cc/N0RmDBjZ/new-loading-medium.gif', 
                            width: 320, 
                            height: 180
                        },
                        high: {
                            url: 'https://i.postimg.cc/jSpyyLtz/new-loading-high.gif',
                            width: 480,
                            height: 360,
                        }
                    },
                  title: '',
                  id: '151561'
                }
            ],
            hasErrored: false,
            isLoading: false,
            isSearching: {
                search: false,
                maxRes: 0
            },
        },

    },
    User: {
        user: 'none'
    },
    RightDisplay: {
        showWelcome: true, 
        showSearchAndResults: false, 
        showVideo:  false,
        videoToPlay: {
            thumbnails: {
                medium: {
                    url: 'https://i.postimg.cc/N0RmDBjZ/new-loading-medium.gif', 
                    width: 320, 
                    height: 180
                    },
                high: {
                    url: 'https://i.postimg.cc/jSpyyLtz/new-loading-high.gif',
                    width: 480,
                    height: 360,
                }
            },
            title: '',
            id: '151561'
        },
        visible: false, 
        
    },
    Modal: {
        dimmer: 'blurring',
        isOpen: false,
        video: {
            thumbnails: {
                medium: {
                    url: 'https://i.postimg.cc/N0RmDBjZ/new-loading-medium.gif', 
                    width: 320, 
                    height: 180
                },
                high: {
                    url: 'https://i.postimg.cc/jSpyyLtz/new-loading-high.gif',
                    width: 480,
                    height: 360,
                }
            },
          title: '',
          id: '151561'
        }
    } 
};

export default initialState;