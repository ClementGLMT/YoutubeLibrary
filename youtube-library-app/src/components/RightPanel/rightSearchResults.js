import React from 'react';
import VideoList from '../Common/videoList';
import 'semantic-ui-css/semantic.min.css';
import {Image} from 'semantic-ui-react';
import SearchForm from './searchForm';
import '../styles/components.css';
import {store} from '../../store';
import tileData from '../Common/loadingTiles';



export default class RightSearchResults extends React.Component {


    render()  {

        var state = store.getState().DataLoading.rightPanel;

        var data = [];

        if(state.isSearching.search && state.isLoading){           //load loading tiles if results are loading and if the user searches for something
            for (let i = 0; i < state.isSearching.maxRes; i++) {
                data[i] = tileData[i];
            }
        }

        if(state.isSearching.search && !state.isLoading) {          //load results if they are loaded
            data = state.videos;
        }

        let results;

        if(!state.hasErrored){                                      //Show the VideoList if no error occured (here hasErrored is toggled is the backend sent us a status: 'No results' in response)
            results = <VideoList side='OnRight' data={data}/>;
        }
        else {                                                       //If an error occured (so if we have no results), Show no results image       
            results = <div className='noResults'>
                <Image className = 'noResultsImage' src='https://image.noelshack.com/fichiers/2020/13/4/1585248583-no-res-det.png'/>
            </div>
        }

        return(
            <div className='searchContainer'>
                <div className = 'searchForm'> 
                    <SearchForm className='searchForm'/>
                </div>
                    {results}
            </div>
        );

    }
}
