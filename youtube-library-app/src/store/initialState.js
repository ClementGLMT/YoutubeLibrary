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
            //{videos:[{id:"YQHsXMglC9A",title:"Adele - Hello",thumbnails:{default:{url:"https://i.ytimg.com/vi/YQHsXMglC9A/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",width:480,height:360}},subtitle:"",isParsed:false},{id:"QkeehQ8D_VM",title:"Hello?",thumbnails:{default:{url:"https://i.ytimg.com/vi/QkeehQ8D_VM/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/QkeehQ8D_VM/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/QkeehQ8D_VM/hqdefault.jpg",width:480,height:360}},subtitle:"",isParsed:false},{id:"UBYnT8JY7sE",title:"Lionel Richie - Hello [LYRICS]",thumbnails:{default:{url:"https://i.ytimg.com/vi/UBYnT8JY7sE/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/UBYnT8JY7sE/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/UBYnT8JY7sE/hqdefault.jpg",width:480,height:360}},subtitle:"",isParsed:false},{id:"kK42LZqO0wA",title:"Martin Solveig &amp; Dragonette - Hello ",thumbnails:{default:{url:"https://i.ytimg.com/vi/kK42LZqO0wA/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/kK42LZqO0wA/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/kK42LZqO0wA/hqdefault.jpg","width":480,"height":360}},"subtitle":"(Official Short Video Version HD) ","isParsed":true},{"id":"9h0Arg_-380","title":"Adele - Hello (Lyrics Video)","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/9h0Arg_-380/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/9h0Arg_-380/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/9h0Arg_-380/hqdefault.jpg","width":480,"height":360}},"subtitle":"","isParsed":false},{"id":"VKIiCOZ2Eo4","title":"Adele Hello lyrics","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/VKIiCOZ2Eo4/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/VKIiCOZ2Eo4/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/VKIiCOZ2Eo4/hqdefault.jpg","width":480,"height":360}},"subtitle":"","isParsed":false},{"id":"uefcQzHmA_Y","title":"Hello Mama - TaitosmitH |Official MV|","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/uefcQzHmA_Y/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/uefcQzHmA_Y/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/uefcQzHmA_Y/hqdefault.jpg","width":480,"height":360}},"subtitle":"","isParsed":false},{"id":"t071Wm45qWM","title":"Conkarah &amp; Rosie Delmah - Hello ","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/t071Wm45qWM/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/t071Wm45qWM/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/t071Wm45qWM/hqdefault.jpg","width":480,"height":360}},"subtitle":"(Reggae Cover) [Official Video] ","isParsed":true},{"id":"bnVUHWCynig","title":"Beyoncé - Halo","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/bnVUHWCynig/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/bnVUHWCynig/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/bnVUHWCynig/hqdefault.jpg","width":480,"height":360}},"subtitle":"","isParsed":false},{"id":"LnET4RKXx5k","title":"Martin Solveig &amp; Dragonette - Hello ","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/LnET4RKXx5k/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/LnET4RKXx5k/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/LnET4RKXx5k/hqdefault.jpg","width":480,"height":360}},"subtitle":"(Official Music Video) [HD] ","isParsed":true}]
            hasErrored: false,
            isLoading: false,
            isSearching: {
                search: false,
                maxRes: 0
            },
            isLoaded: false,
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
        },
        visible: false, 
        
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