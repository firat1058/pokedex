
import React, { Component } from 'react';

import PokemonList from '../pokemon/PokemonList';


export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <PokemonList pokeList={this.props.fSearch}/>
        </div>
      </div>
    );
  }
}
