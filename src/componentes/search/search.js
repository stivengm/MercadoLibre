import axios from 'axios';
import React, { Component } from 'react';
import Header from '../header/header';
import { Redirect, useHistory } from "react-router-dom";
import './search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueStringSearch: '',
            dataResponse: [],
            redirect: null
        }

        this.searchCallbackFunction = this.searchCallbackFunction.bind(this);
        this.getData = this.getData.bind(this);

    }

    componentDidMount() {
        this.getData();
    }

    selectItem(id) {
        localStorage.setItem('idArticle', id);
        let path = '/items/' + id;
        this.setState({ redirect: path });
    }

    getData() {
        var searchString = localStorage.getItem("search");
        console.log(searchString);
        axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + searchString)
            .then(response => {
                this.setState({ dataResponse: response.data.results});
            }).catch(error => {
                console.log(error);
            });
    }

    searchCallbackFunction(dataFromChild) {
        this.setState({ valueStringSearch: dataFromChild.value });
        this.getData();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <Header parentCallback={this.searchCallbackFunction} />
                <div className="content">
                    <div className="items_search">
                        {this.state.dataResponse.map(data => (
                            <div className="object_item">
                                <div className="item" onClick={() => this.selectItem(data.id)}>
                                    <img className="img_item" src={data.thumbnail} />
                                    <div className="information_item">
                                        <p className="price_item">$ {data.price}</p>
                                        {/* <p className="info">Hola mundo</p> */}
                                        <p className="description_item">{data.title}</p>
                                    </div>
                                </div>
                                <div className="hr"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;