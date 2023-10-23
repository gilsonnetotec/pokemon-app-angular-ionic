import { Form } from '@angular/forms'
import { Abilities } from './abilities.model'

export interface Pokemon {
    abilities: Abilities[],
    base_experience: number,
    forms: Form[],
    height: number,
    location_area_encounters: string,
    species: {
        name: string,
        url: string
    }
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
}

export interface Pokemons {
    name: string,
    url: string
}