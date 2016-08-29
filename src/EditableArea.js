import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Select from 'fe-select'

import styles from './index.styl'

@CSSModules(styles)

export default class extends Component {
  renderValue (value) {
    return typeof value === 'object' ? JSON.stringify(value) : value
  }

  handleChange (e) {
    if (e === '') {
      return false
    }
    let map = this.props['data-map'].split('-')
    this.props.onChange(map, e)
  }

  handleClickAction (v, a, e) {
    e.preventDefault()
    this.props.action[a](v)
  }

  render () {
    let props = this.props
    let data = props.data
    let value = data.value
    switch (data.type) {
      case 'input':
        return <input
          data-map={props['data-map']}
          type='text'
          {...data.props}
          disabled={this.props.loading}
          value={value}
          onChange={this.handleChange.bind(this)} />
      case 'select':
        return <Select
          {...data}
          style={Object.assign({}, {width: '100%'}, data.style)}
          inputWidth={data.inputWidth || '100%'}
          onChange={this.handleChange.bind(this)} />
      case 'links':
        return <span>
          {data.value.map((v, i) => <span key={i}><a {...v.props} target={v.target || '_blank'} href={v.url}>{v.value}</a>{i < data.value.length - 1 ? <span>&nbsp;&nbsp;</span> : null}</span>)}
        </span>
      case 'action':
        return <span>
          {data.value.map((v, i) => <span key={i}><a {...v.props} onClick={this.handleClickAction.bind(this, v, v.action)} href='#'>{v.value}</a>{i < data.value.length - 1 ? <span>&nbsp;&nbsp;</span> : null}</span>)}
        </span>

      default:
        return <span data-map={props['data-map']}>{this.renderValue(value)}</span>
    }
  }
}
