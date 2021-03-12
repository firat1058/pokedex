import React, { Component } from "react";
// import axios from "axios";
import PokemonCard from "./PokemonCard";

export default class PokemonList extends Component {
  render() {
    return (
      <div>
        {this.props.pokeList ? (
          <div className="row">
            {this.props.pokeList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
              />
            ))}
          </div>
        ) : (
          <h1>Loading Pokemon</h1>
        )}
      </div>
    );
  }
}
