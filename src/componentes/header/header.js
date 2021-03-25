import React, { Component } from 'react';
import Logo from '../../assets/logos/mercado-libre-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Redirect, useHistory } from "react-router-dom";
import './header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var search = localStorage.getItem("search");
        if (search != '' || search) {
            this.setState({ value: search });
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        this.props.parentCallback({
            value: this.state.value
        });
        let path = '/items=search=' + this.state.value;
        // const history = useHistory();
        // history.push(path);
        localStorage.setItem("search", this.state.value);
        // var path = '/items=search=' + this.state.value;
        this.setState({ redirect: path });
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="nav">
                <img src={Logo} alt="logo_mercado" className="logo_mercado" />
                <form className="form_search" onSubmit={this.handleSubmit}>
                    <input className="input_search" value={this.state.value} onChange={this.handleChange} placeholder="Nunca dejes de buscar" />
                    <button className="button_search" type="submit">
                        <FontAwesomeIcon icon={faSearch} className="icon_search" />
                    </button>
                </form>
            </div>
        )
    }
}

export default Header;