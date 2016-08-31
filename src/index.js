import React, { Component, PropTypes } from 'react'
import Tcell from './Tcell.js'
import Spinner from './spinner.js'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import 'fe-reset'

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })

export class Etable extends Component {

  changeCell (map, value, e) {
    let name = this.props.map
    let m = map
    m.unshift(name)
    this.props.onChange(m, value, e)
  }

  handleClick (e) {
    if (this.props.onClick) {
      if (e.target.dataset.map) {
        let arg = e.target.dataset.map.split('-')
        arg.unshift(this.props.map)
        this.props.onClick(e, ...arg)
      } else {
        this.props.onClick(e)
      }
    }
  }

  renderTitle (title) {
    return title ? <caption data-map={'caption'}>{title}</caption> : null
  }

  renderHead (head) {
    return (
      head.map(
        (h, i) =>
          <th
            style={Object.assign({}, {width: h.width, minWidth: h.width}, h.style)}
            data-map={'head-' + i}
            key={i}>
            <Tcell
              data-map={'head-' + i}
              onChange={this.changeCell.bind(this)}
              editing={this.props.data.editing}
              data={h}
              action={this.props.action}
              loading={this.props.data.loading} />
          </th>
      )
    )
  }

  renderBody () {
    let data = this.props.data

    if (data.error) {
      return <tr><td colSpan={data.head.length} styleName='noDataMsg'>{this.props.data.errorMsg}</td></tr>
    }
    if (data.body.length === 0) {
      return <tr><td colSpan={data.head.length} styleName='noDataMsg'>该条件下暂无数据</td></tr>
    }

    return data.body.map((row, i) => row.isShow !== false ? <tr style={Object.assign({}, row.style, (data.activeRow ? data.activeRow : '').indexOf(i) > -1 ? data.activeStyle : null)} key={i}>{this.renderRow(row.data, i)}</tr> : null)
  }

  renderRow (row, i) {
    if (this.props.data.error) {
      return <td colSpan={this.props.data.length} styleName='noDataMsg'>{this.props.data.errorMsg}</td>
    }
    if (row.length === 0) {
      return <td colSpan={this.props.data.length} styleName='noDataMsg'>该条件下暂无数据</td>
    }
    return (
      row.map(
        (r, j) =>
          <td
            key={j}
            data-map={'body-' + i + '-' + j}
            colSpan={r.colSpan}
            rowSpan={r.rowSpan} >
            <Tcell
              data-map={'body-' + i + '-' + j}
              onChange={this.changeCell.bind(this)}
              editing={this.props.data.editing}
              action={this.props.action}
              data={r} />
          </td>
      )
    )
  }

  render () {
    let data = this.props.data
    return (
      <div styleName='warp'>
        {data.loading ? <div styleName='tableLoading'><Spinner /></div> : null}
        <table onClickCapture={this.handleClick.bind(this)} onDoubleClickCapture={this.handleClick.bind(this)}>
          {this.renderTitle(data.title)}
          <thead>
            <tr>
            {this.renderHead(data.head)}
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    )
  }
}

Etable.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  action: PropTypes.object,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    editing: PropTypes.bool,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    head: PropTypes.arrayOf(PropTypes.object),
    body: PropTypes.arrayOf(
      PropTypes.shape({
        isShow: PropTypes.bool,
        data: PropTypes.arrayOf(PropTypes.object)
      }))
  })
}
export default Etable
