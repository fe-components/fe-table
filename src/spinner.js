import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })

export default class extends Component {
  render () {
    return (<div styleName='spinner'>
      <div styleName='rect1'></div>
      <div styleName='rect2'></div>
      <div styleName='rect3'></div>
      <div styleName='rect4'></div>
      <div styleName='rect5'></div>
    </div>)
  }
}
