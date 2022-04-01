import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar } from 'antd-mobile'
import style from './searchBar.module.scss'

function Search(props) {


  const { value, onFocus, onChange, onSubmit, placeholder, maxLength, searchRef } = props
  return (
    <section className={style.searchBarCom}>
      <SearchBar
        value={value}
        cancelText=" "
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        onSearch={onSubmit}
        onFocus={onFocus}
        ref={searchRef && searchRef}
        className={style.search}
        clearable
      />
    </section>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string,
  maxLength: PropTypes.number
}

Search.defaultProps = {
  placeholder: '',
  maxLength: 100
}

export default Search
