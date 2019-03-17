
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
      width: 150
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 150
    },
    {
      title: "Time",
      dataIndex: 'time',
      width: 150
    }
  ]
  render() {
    const dataSource = store.userInput.reverse().map((record) => {
      if (!record.fakeInput) {
        const result = {title: record.title, description: record.description, key: record.key, feature: record.feature, start_index: record.start_index, time: new Date(record.current * 1000).toISOString().substr(14, 5)}
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
          store.playerRef.seek(record.start_index)
        }
      }
    }} columns={this.column} scroll={{y:100}} pagination={{ pageSize: 5000 }} dataSource={dataSource.filter(n=>n)}></Table>
  }
}
