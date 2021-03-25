import React from 'react';
import Header from './header/header';
import { Redirect, useHistory } from "react-router-dom";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSearch: '',
            redirect: null
        }
        this.searchCallbackFunction = this.searchCallbackFunction.bind(this);
    }

    searchCallbackFunction(dataFromChild) {
        this.setState({ valueSearch: dataFromChild.value });
        console.log(this.state.valueSearch);
        // var path = '/items=search=';
        // this.setState({ redirect: path });
        
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={{ pathname: this.state.redirect, search: this.state.valueSearch }}  />
        // }
        return (
            <div>
                <Header parentCallback={this.searchCallbackFunction} />
                {this.state.valueSearch}
            </div>
        )
    }
}

export default MainPage;