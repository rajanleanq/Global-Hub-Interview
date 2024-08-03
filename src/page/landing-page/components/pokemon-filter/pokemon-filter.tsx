import React from 'react'
import SearchInput from '../../../../components/atom/input/search-input/search-input'

export default function PokemonFilter() {
  return (
    <div className='w-1/5 border-r p-4'>
      <SearchInput placeHolder='Search pokemon' />
    </div>
  )
}
