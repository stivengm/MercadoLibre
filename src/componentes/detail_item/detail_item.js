import axios from 'axios';
import React, { Component } from 'react';
import './detail_item.scss';
import Header from '../header/header';

class DetailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueStringSearch: '',
            dataItem: [],
            dataDescriptionItem: ''
        }
        this.searchCallbackFunction = this.searchCallbackFunction.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        var id = localStorage.getItem('idArticle');
        axios.get('https://api.mercadolibre.com/items/' + id)
            .then(response => {
                this.setState({ dataItem: response.data });
            }).catch(error => {
                console.log(error);
            });
        axios.get('https://api.mercadolibre.com/items/' + id + '/description')
            .then(response => {
                this.setState({ dataDescriptionItem: response.data.plain_text})
            }).catch(error => {
                console.log(error);
            });
    }

    searchCallbackFunction(dataFromChild) {
        this.setState({ valueStringSearch: dataFromChild.value });
        this.getData();
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        console.log(this.props.searchString);
    }
    render() {
        return (
            <div>
                <Header parentCallback={this.searchCallbackFunction} />
                <div className="content">
                    <div className="detail">
                        <div className="item">
                            <img src={this.state.dataItem.thumbnail} className="img_item" />
                            <div className="info_item">
                                {this.state.dataItem.condition === 'new' ? <p className="condition">Nuevo</p> : <p>Usado</p>}
                                <p className="title_item">{this.state.dataItem.title}</p>
                                <p className="price_item">$ {this.state.dataItem.price}<span className="digits">00</span></p>
                                <button className="btn btn_comprar">Comprar</button>
                            </div>
                        </div>
                        <div className="description">
                            <h2 className="title_description">Descripción del producto</h2>
                            <p className="text_description">{this.state.dataDescriptionItem}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailItem;