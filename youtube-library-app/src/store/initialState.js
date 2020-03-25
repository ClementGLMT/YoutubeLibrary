const  initialState = { 
    DataLoading: {
        leftPanel: {
            videos: 
                [{
                    thumbnails: {
                        medium: {
                            url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640362-loading-medium.gif', 
                            width: 320, 
                            height: 180
                        },
                        high: {
                            url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640514-loading-high.gif',
                            width: 480,
                            height: 360,
                        }
                    },
                    title: 'Mimie <3',
                    id: '151561'
                }]
        },
        rightPanel: {
            videos: [
                {
                    thumbnails: {
                        medium: {
                            url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640362-loading-medium.gif', 
                            width: 320, 
                            height: 180
                        },
                        high: {
                            url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640514-loading-high.gif',
                            width: 480,
                            height: 360,
                        }
                    },
                  title: 'Mimie <3',
                  id: '151561'
                }
            ],
            hasErrored: false,
            isLoading: false,
            isSearching: {
                search: false,
                maxRes: 0
            }
        },

    },
    SetUser: {
        user: 'none'
    },
    ShowOnRight: {
        rightShowWelcome: true, 
        rightShowSearchAndResults: false, 
        rightShowVideo:  false,
        videoToPlay: {
            thumbnails: {
                medium: {
                    url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640362-loading-medium.gif', 
                    width: 320, 
                    height: 180
                    },
                high: {
                    url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640514-loading-high.gif',
                    width: 480,
                    height: 360,
                }
            },
            title: 'Mimie <3',
            id: '151561'
        } 
        
    },
    ModalReducer: {
        dimmer: 'blurring',
        isModalOpen: false,
        video: {
            thumbnails: {
                medium: {
                    url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640362-loading-medium.gif', 
                    width: 320, 
                    height: 180
                },
                high: {
                    url: 'https://image.noelshack.com/fichiers/2020/12/4/1584640514-loading-high.gif',
                    width: 480,
                    height: 360,
                }
            },
          title: 'Mimie <3',
          id: '151561'
        }
    } 
};

export default initialState;