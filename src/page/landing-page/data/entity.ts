export interface IPokemonData {
    count: number
    next: string
    previous: any
    results: IPokemonResult[]
  }
  
  export interface IPokemonResult {
    name: string
    url: string
  }