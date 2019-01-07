import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {Select, Icon, Button, Switch} from 'antd';
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
  @observable test = false;
  escFunction(event){
    if(event.keyCode === 27) {
      if (store.playerRef && store.playerState) {
        if (store.playerState.paused) {
          store.playerRef.play()
        } else {
          store.playerRef.pause()
        }
      }
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  render() {
    return(
      <div className="main-container" onKeyDown={(event) => {
        // console.log(event.keyCode)
        // if (store.playerRef && event.keyCode == 27) {
        //   store.playerRef.pause()
        // }
      }}>
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
          <Switch checkedChildren="Test Condition" unCheckedChildren="Default Condition" onClick={() => this.test = !this.test}>

          </Switch>
        </div>
        <div className="left-container">
          <div className="top-container">
            <MyPlayer />
          </div>
          {store.playerState && store.selectedJsonPath && this.test
            ? 
            <div className="chart-container">
              <ProblemChart />
              <MainChart x="index" y="problem" showProblem={true}/>
              <FeaturePanel size={store.HIGHTLIGHT_LENGTH} cursor={store.cursorLocation}></FeaturePanel>
            </div> 
            : 
            null}
        </div>
        {this.test ? <div className="right-container">
          <ProblemPanel />

          <div className="filter-container">
            <Filter></Filter>
          </div>
        </div> : null}
      </div>
    )
  }
}