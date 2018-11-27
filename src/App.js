import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {Select, Icon, Button} from 'antd';
import logo from './logo.svg';
import store from './UIStore'
import './App.css';
import {files} from './static/data'
import MyPlayer from './components/MyPlayer'
import MainChart from './components/MainChart'
import ProblemChart from './components/ProblemChart'
import ProblemPanel from './components/ProblemPanel'
import Filter from './components/Filter'
import FeaturePanel from './components/FeaturePanel'
import axios from 'axios'
import {Player, ControlBar} from "video-react"
import { MiniArea } from 'ant-design-pro/lib/Charts';

const Option = Select.Option
const selectionUpdate = action((value) => {
  store.selectedFile = value.label
  store.selectedVideoPath = "http://127.0.0.1:8080/video?id=" + value.key
  store.selectedJsonPath = String(value.label) + '.json'
})

@observer
export default class App extends Component {
  componentDidMount() {
    
  }
  render() {
    return(
      <div className="main-container">
        <div className="header-container">
          <Select placeholder="Please Select" onSelect={selectionUpdate} labelInValue style={{width: 240}}>
            {store.files.map((item) => {
              return(
                  <Option key={item.label} value={item.key}>{item.label}</Option>
              )
            }
            )}
          </Select>
          <Button onClick={() => console.info(store)}>
            Store
          </Button>
        </div>
        <div className="left-container">
          <div className="top-container">
            <MyPlayer />
          </div>
          {store.playerState && store.selectedJsonPath 
            ? 
            <div className="chart-container">
              <ProblemChart />
              <MainChart x="index" y="problem" showProblem={true}/>
              <FeaturePanel size={store.HIGHTLIGHT_LENGTH} cursor={store.cursorLocation}></FeaturePanel>
            </div> 
            : 
            null}
        </div>
        <div className="right-container">
          <ProblemPanel />

          <div className="filter-container">
            <Filter></Filter>
          </div>
        </div>
      </div>
    )
  }
}