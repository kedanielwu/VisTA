import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {Select, Icon, Button, Radio} from 'antd';
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
const RadioGroup = Radio.Group
const selectionUpdate = action((value) => {
  store.selectedFile = value.label
  store.selectedVideoPath = "http://127.0.0.1:8080/video?id=" + value.key
  store.selectedJsonPath = String(value.label) + '.json'
})

@observer
export default class App extends Component {
  @observable test = true;
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
  startFunction() {
    store.start_time = Date.now()
    store.sessionId = window.setInterval(() => {
      store.playBackInteraction.push({sessionTime: (Date.now() - store.start_time) / 1000, videoTime: store.playerState.currentTime, search: {cat: store.advanceCat, neg: store.advanceNeg, rep: store.advanceRep, sent: store.advanceSent}})

    }, 1000)
  }

  endFunction() {
    window.clearInterval(store.sessionId)
    function download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    }
    download(JSON.stringify(store.playBackInteraction), 'playback.txt', 'text/plain')
    download(JSON.stringify(store.userInput), 'problem.txt', 'text/plain')
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
          <Button onClick={this.startFunction}>
            Start
          </Button>
          <Button onClick={this.endFunction}>
            Finish
          </Button>
          <RadioGroup onChange={(e) => {store.testCondition = e.target.value}} value={store.testCondition}>
            <Radio value={1}>Default</Radio>
            <Radio value={2}>Prediction Visualization</Radio>
            <Radio value={3}>Full</Radio>
          </RadioGroup>

        </div>
        <div className="left-container">
          <div className="top-container">
            <MyPlayer />
          </div>
            <div className="chart-container">
              {store.testCondition == 3 && store.playerState && store.selectedJsonPath ? <ProblemChart /> : null}
              {store.testCondition != 1 && store.playerState && store.selectedJsonPath ? <MainChart x="index" y="problem" showProblem={true}/> : null}
              {store.testCondition == 3 && store.playerState && store.selectedJsonPath ? <FeaturePanel size={store.HIGHTLIGHT_LENGTH} cursor={store.cursorLocation}></FeaturePanel> : null}
            </div> 
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