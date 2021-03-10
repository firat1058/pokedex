import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';


export default class PokemonList extends Component {
    state= {
        url: 'https://intern-pokedex.myriadapps.com/api/v1/pokemon',
        pokemon: null
    }

async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['data']});
    console.log(this.state.pokemon)
}
    render() {
        return (
            <div>
                {this.state.pokemon ? (
                    <div className="row">
                        {this.state.pokemon.map(pokemon =>(
                            <PokemonCard
                            key={pokemon.id}
                            id = {pokemon.id}
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

