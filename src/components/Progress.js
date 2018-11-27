import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {Popover, List} from 'antd'
import store from '../UIStore'
import './Progress.css'
import FeaturePanel from './FeaturePanel'

const Content = observer(({index}) => {
    const model = [
        {title: "category", value: String(index.category)},
        {title: "negation", value: String(index.negation)},
        {title: "repetition", value: String(index.repetition)},
    ]
    return (
    <div className="popover-content">
        <div className="popover-category">
            <span>Category: </span>
            <div style={{background: 'red', width: 70, height: 10, position: 'absolute'}}></div>
        </div>
        <div className="popover-negation">
            <span>Negation: </span>
            <div style={{background: 'red', width: 70, height: 10, position: 'absolute'}}></div>
        </div>
        <div className="popover-repetition">
            <span>Repetition: </span>
            <div style={{background: 'red', width: 70, height: 10, position: 'absolute'}}></div>
        </div>
    </div>
    )
})

const Progress = observer(({width, index}) => (
    <div className="meter" style={{width: store.GRAPH_WIDTH - 40}}>
        <Popover
         autoAdjustOverflow={false} 
         overlayClassName="progress-popover" 
         content={<FeaturePanel />} 
         visible={true} 
         placement="rightTop"
         title="Feature Panel"
        >
            <span className="fill" style={{width: width}}></span>
        </Popover>
    </div>
))

export default Progress



