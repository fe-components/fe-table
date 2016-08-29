# Editable table

demo链接：http://git.lianjia.com/react/Table

***

### 概览

- **data**    [`Object<Object>`] 表格的数据结构，作为表格的渲染依据，主要逻辑
- **onChange** [`Function`](event, map, 'head'/'body',x, y)表格在编辑状态发生改变时触发的函数（表头没有x，head和body的坐标是独立的）
- **onClick** [`Function`](event, map, 'head'/'body',x, y)|表格在被点击时触发的函数
- **map** [`String`] 作为onChange/onClick的参数，可不设置，通过bind传

***

### data


- **editing**  [`Bool`] |false| 表格是否处于编辑状态
- **loading**    [`Bool`]  |false|表格是否处于加载中状态（可作为浮层显示在已有数据上）
- **error** [`Bool`]false|表格是否显示错误信息
- **errorMsg**[`String`]|undefined|错误信息，可用于动态请求数据后error处理
- **title** [`String`]|undefined|表格标题
- **head** [`Array<Object>`]  |[]| 表头，一维数组，是一组对象的集合，每个对象作为表头的一个cell（具体对象格式在cell中给出）
- **body**  [`Array<Obejct>`]|[]|表格主体，一维数组，父数组决定表格有几行，每个对象的data为子数组，决定每个cell的具体内容(具体对象格式在cell中给出)，对象的isShow决定子数组是否显示

***

### cell

`object`

表格每个单元的数据结构

- **editable** [`Bool`]|false|此单元是否是可编辑的，若为可编辑的，将在表格处于编辑状态时渲染为可编辑组件
- **fastEdit** [`Bool`]|false|当为true，无论表格处于什么状态，此单元格将被置为可编辑状态|
- **value/text** [`String/Array/Object`]  |''|表格单元显示的内容，优先取value，同时若是在editable为true时，value作为值传给`input`或`select`
- **key** [`String`]|''|可以作为单元的标识
- **props** [`Object`]|undefined|传给editable为true的cell的props，可以灵活运用，可以传任何属性给可editable为true的组件，样式等，甚至是onClick，onChange，onBlur这类的函数
- **renderCell** [`Function`]|undefined|返回值必须是组件，可替代原有的渲染方式，有两个默认的参数，`arg1`为此cell，`arg2(bool)`为表格是否处于编辑状态，可用此方法灵活更改单元格的渲染方式

`注：cell中可以自定义key用来保存后端数据，此对象将作为data传给底层的单元`

***

### event

表格暴露给外部两个事件：`onClick` 和`onChange`
两个事件的参数一样onChange函数主要可以用于表格处于可编辑状态时，进行状态更新（使用renderCell渲染的组件没有这两个事件）。
参数如下：

1.`event`：默认的event事件，可以从event.target中取得input和select改变的值；

2.`map`： 传给组件的map属性的值，可用来标识表格；

3.`type`：'caption'或'head'或'body'区分事件源为标题或表头和表格主体；

4.`arg4`：若type为表头，表示点击的是第几列，若type为表格body，表示事件源处于是第几行（0表示head中的第一列或body中的第一行）

5.`arg5`：只有当type是'body'时，才有值，为事件源处于第几列

`注：click事件是在整个table上捕获的，change事件是在具体单元上捕获的`

#### 附1

数据结构实例：

    let data = {
      editing: false,
    loading: false,
    error: false,
    errorMsg: '异常',
    title: '表格1',
    head: [
      {
        value: '头1',
        key: 'head1',
        props: {
          style: {
            color: 'lightblue'
          }
        }
      },{
        value: 'tou2',
        key: 'head2',
        renderCell: (data, editing) => <span>{data.value}</span>
      }
    ],
    body: [
      {
        isShow: true,
        data: [
          {value: '0行0列', key: 'head1'},
          {value: '0行1列', key: 'head2'}
        ]
      },
      {
        isShow: false,
        data: [
          {value: '1行0列', key: 'head1'},
          {value: '1行1列', key: 'head2'}
        ]
      },
    ]
  }


