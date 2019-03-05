
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
      if (!record.fakeInput) {
        const result = {title: record.title, description: record.description, key: record.key, feature: record.feature}
        return result
      }
      return null
    })
    console.log('change')
    return <Table onRow={(record) => {
      return {
        onClick: (event) => {
          store.advanceCat = [record.feature.category]
          store.advanceLowPitch = [String(record.feature.low_pitch)]
          store.advanceRep = [String(record.feature.low_speechrate)]
          store.advanceSent = [String(record.feature.sentiment)]
          store.advanceHighPitch = [String(record.feature.high_pitch)]
        }
      }
    }} columns={this.column} scroll={{y:220}} pagination={{ pageSize: 5000 }} dataSource={dataSource.filter(n=>n)}></Table>
  }
}
