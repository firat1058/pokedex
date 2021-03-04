import React, { Component } from 'react'
import axios from 'axios';

export default class Pokemon extends Component {


    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: ''

    };

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;


        //Url for pokemon information
    }



    render() {
        return (
            <div>
                
            </div>
        )
    }
}
