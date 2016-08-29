import React, { Component } from 'react'

import EditableArea from './EditableArea.js'

export default class extends Component {
  renderValue (value) {
    return typeof value === 'object' ? JSON.stringify(value) : value
  }

  render () {
    let value = this.props.data.value

    let props = this.props

    if (this.props.data.renderCell) {
      return <span>{this.props.data.renderCell(this.props.data, this.props.editing)}</span>
    }

    return (this.props.data.fastEdit || this.props.editing)
      ? <EditableArea {...props} />
      : <span data-map={props['data-map']}>{this.renderValue(value)}</span>
  }
}
