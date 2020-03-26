import React from 'react';
import VideoList from './videolist';
import 'semantic-ui-css/semantic.min.css';
import SearchForm from './searchForm';
import './components.css';
import {store} from '../store';
import tileData from './tileData';



export default class RightSearchResults extends React.Component {




    render()  {

        var state = store.getState().DataLoading.rightPanel;

        var data = [];

        console.log("State before bordel: "+JSON.stringify(state))

        if(state.isSearching.search && state.isLoading){
            for (let i = 0; i < state.isSearching.maxRes; i++) {
                data[i] = tileData[i];
            }
        }

        if(state.isSearching.search && !state.isLoading) {
            data = state.videos;
        }

        let ret;

        if(!state.hasErrored)
            ret = <VideoList side='OnRight' data={data}/>;
        else {
            ret = <div/>
        }

        //var data = {videos:[{id:"YQHsXMglC9A",title:"Adele - Hello",thumbnails:{default:{url:"https://i.ytimg.com/vi/YQHsXMglC9A/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",width:480,height:360}},subtitle:"",isParsed:false},{id:"QkeehQ8D_VM",title:"Hello?",thumbnails:{default:{url:"https://i.ytimg.com/vi/QkeehQ8D_VM/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/QkeehQ8D_VM/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/QkeehQ8D_VM/hqdefault.jpg",width:480,height:360}},subtitle:"",isParsed:false},{id:"UBYnT8JY7sE",title:"Lionel Richie - Hello [LYRICS]",thumbnails:{default:{url:"https://i.ytimg.com/vi/UBYnT8JY7sE/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/UBYnT8JY7sE/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/UBYnT8JY7sE/hqdefault.jpg",width:480,height:360}},subtitle:"",isParsed:false},{id:"kK42LZqO0wA",title:"Martin Solveig &amp; Dragonette - Hello ",thumbnails:{default:{url:"https://i.ytimg.com/vi/kK42LZqO0wA/default.jpg",width:120,height:90},medium:{url:"https://i.ytimg.com/vi/kK42LZqO0wA/mqdefault.jpg",width:320,height:180},high:{url:"https://i.ytimg.com/vi/kK42LZqO0wA/hqdefault.jpg",width:480,height:360}},subtitle:"(Official Short Video Version HD) ",isParsed:true}]}

        //console.log("Data in RightSearchResults: "+JSON.stringify(store.getState().DataLoading.rightPanel));


        return(
            <div className='rightPanel'>
                <SearchForm className='searchForm'/>
  
                <VideoList side='OnRight' data = {data} />
            </div>
        );

    }
}

/*{(store.getState().DataLoading.rightPanel.isSearching.search) &&
    <VideoList side='OnRight' data={data}/>
    }*/