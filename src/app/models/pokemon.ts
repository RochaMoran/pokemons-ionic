export class Pokemon {
    id: number;
    name: string;
    type1: string;
    type2: string;
    sprite: string;
    height: number;
    weight: number;
    abilities: any[];
    stats: any[];
    // is_hidden: boolean;

    constructor(pokemon: any) {
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.type1 = pokemon.types[0].type.name;
        this.type2 = pokemon.types[1] ? pokemon.types[1].type.name : null;
        this.sprite = pokemon.sprites.front_default;
        this.height = pokemon.height;
        this.weight = pokemon.weight;
        this.abilities = pokemon.abilities;
        this.stats = pokemon.stats;
        // this.is_hidden = pokemon.is_hidden;
    }

    hasHiddenAbility(): any {
        return this.abilities.find(ability => ability.is_hidden);
    }

    getHiddenAbility(): any {
        return this.abilities.find(ability => ability.is_hidden).ability.name;
    }

    getAbilities(): any[] {
        return this.abilities.filter(ability => !ability.is_hidden);
    }

    getStat(nameStat: string) {
        return this.stats.find(stat => stat.stat.name === nameStat).base_stat;
    }

    getHeigthToMeters(): string {
        return (this.height / 10) + "M";
    }
    
    getWeightToMeters(): string {
        return (this.weight / 10) + "Kg";
    }
}