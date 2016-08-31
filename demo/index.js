import React from 'react'

import {
  storiesOf
  // action
} from '@kadira/storybook'
import Etable from '../src/'

let data = {
  head: [{value: '日期', props: {onBlur: () => { console.log('bind obBlur in data tree') }, onClick: () => { console.log('bind onClick in data tree') }}, editable: true, type: 'input'}, {value: '王聪1', editable: true, type: 'select', 'options': [{label: '王聪1', value: '王聪1'}, {label: '王聪2', value: '王聪2'}]}],
  body: [
    {isShow: true, data: [{value: '2016-01-01', rowSpan: 2}, {value: '王聪1'}]},
    {isShow: true, data: [{value: '王聪2', editable: true, type: 'input'}]},
    {isShow: true, data: [{value: '2016-01-02'}, {value: '百度', editable: true, type: 'link', url: 'www.baidu.com'}]},
    {isShow: true, data: [{value: '2016-01-02'}, {value: [{value: '百度1', url: 'www.baidu.com', props: {style: {color: 'red'}}}, {value: '百度2', url: 'www.baidu.com'}], editable: true, type: 'links'}]}
  ]
}

storiesOf('Table', module)
  .add('常规表格', () => (
    <div>
      <Etable data={data} />
    </div>
  ))
  .add('空表格', () => (
    <Etable data={{head: [], body: []}} />
  ))
  .add('过滤表格', () => {
    let newData = Object.assign({}, data)
    newData.body = [
      {isShow: false, data: [{value: '2016-01-01'}, {value: '王聪1'}]},
      {isShow: true, data: [{value: '2016-01-02'}, {value: '王聪2', editable: true, type: 'input'}]}
    ]
    return <Etable data={newData} />
  })
  .add('编辑中表格', () => {
    let newData = Object.assign({}, data)
    newData.editing = true
    return <Etable data={newData} />
  })
  .add('加载中表格', () => {
    let newData = Object.assign({}, data)
    newData.loading = true
    return <div className='tableOuter'><Etable data={newData} /></div>
  })
  .add('数据错误表格', () => {
    let newData = Object.assign({}, data)
    newData.error = true
    newData.errorMsg = '未加载到正确数据'
    return <Etable data={newData} />
  })

storiesOf('Event', module)
  .add('click', () => (
    <Etable data={data} map='name1' onClick={(...arg) => { console.log(...arg) }} />
  ))
  .add('change', () => (
    <Etable data={Object.assign({editing: true}, data)} map='name2' onChange={(...arg) => { console.log(...arg) }} />
  ))

storiesOf('More', module)
  .add('自定义组件', () => {
    let customRender = (data) => <span style={{color: 'lightblue'}}>{'$' + data.value}</span>
    let newData = Object.assign({}, data)
    newData.head = [{value: '日期', renderCell: customRender}, {value: '姓名', editable: true, type: 'select', 'options': [{name: '王聪1', value: '王聪1'}, {name: '王聪2', value: '王聪2'}]}]
    return <Etable data={newData} />
  })
