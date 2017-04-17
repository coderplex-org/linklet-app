import React from 'react'
import Router from 'next/router'
import Autosuggest from 'react-autosuggest'
import isMobile from 'ismobilejs'
import tags from '../lib/tags.json'

// calculate suggestions for any given input value.
function getSuggestions (value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  return inputLength === 0
    ? []
    : tags.filter(tag => tag.toLowerCase().slice(0, inputLength) === inputValue)
}

// When suggestion is clicked, Autosuggest needs to populate the input field
// based on the clicked suggestion.
function getSuggestionValue (suggestion) {
  return suggestion
}

// render suggestions.
function renderSuggestion (suggestion) {
  return <span>{suggestion}</span>
}

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: [],
      value: this.props.query
        ? this.props.query.search ? this.props.query.search : ''
        : ''
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.query
        ? nextProps.query.search ? nextProps.query.search : ''
        : ''
    })
  }
  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    })
  }
  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time users clears input.
  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }
  onKeyDown (e) {
    if (e.keyCode === 13) {
      this.onSuggestionSelected(e, { suggestionValue: this.state.value })
    }
  }
  // On user selects a suggestion fetch repos
  onSuggestionSelected (event, { suggestionValue }) {
    if (this.props.query) {
      let { start, end } = this.props.query
      if (start && end) {
        Router.push(
          `${this.props.url.pathname}?start=${start}&end=${end}&search=${suggestionValue}`
        )
          .then(() => window.scrollTo(0, 0))
          .catch(e => console.log(e))
        return
      }
    }
    Router.push(`${this.props.url.pathname}?search=${suggestionValue}`)
      .then(() => window.scrollTo(0, 0))
      .catch(e => console.log(e))
  }
  render () {
    console.log(isMobile.any)
    const { suggestions, value } = this.state
    // Autosuggest will pass through all these props to the input field.
    const inputProps = {
      placeholder: 'Type something here and press enter',
      value,
      onChange: this.onChange.bind(this),
      onKeyDown: this.onKeyDown.bind(this)
    }
    return (
      <Autosuggest
        focusInputOnSuggestionClick={!isMobile.any}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(
          this
        )}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(
          this
        )}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}
