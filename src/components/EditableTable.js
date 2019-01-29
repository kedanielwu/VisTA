
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './EditableTable.css';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../UIStore'
import {
  Table, Input, Button, Popconfirm, Form,
} from 'antd';

@observer
export default class EditableTable extends React.Component {
  column = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description'
    }
  ]
  render() {
    const dataSource = store.userInput.map((record) => {
      const result = {title: record.title, description: record.description, key: record.key}
      return result
    })
    console.log('change')
    return <Table columns={this.column} scroll={{y:220}} pagination={{ pageSize: 5000 }} dataSource={dataSource}></Table>
  }
}