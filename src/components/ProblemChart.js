import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts'
import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../UIStore'
import Brush from '@antv/g2-brush';
import { notification, Tag, Icon } from 'antd'

notification.config({
    placement: "topLeft",
    top: 450,
})

const handleClick = ((ev) => {
    if (ev.data) {
        store.playerRef.pause()
        store.userInput.map((record) => {
            if (record.start_index == ev.data[0]._origin.index && record.end_index == ev.data[1]._origin.index) {
                // notification.open({message: record.title, description: record.description, icon: <Icon type="info-circle" style={{color: record.color}}/>})
                store.selectedStartTime = record.start_index
                store.selectedEndTime = record.end_index
                store.problemTitle = record.title
                store.problemDescription = record.description
                store.selectedColor = record.color
                store.HIGHTLIGHT_LENGTH = record.end_index - record.start_index
                store.addingDisabled = true
                store.playerRef.seek(ev.data[0]._origin.index)
            } else {
            }
        }            
        )
    }
})

@observer
export default class ProblemChart extends Component {

    raw;
    scale = {
        index: {
            min: 0,
            max: store.rawData.length,
            nice: false
        },
        problem: {
            min:0,
            max:1
        }

    }

    render() {
        const userProblem = store.userInput.map((record) => {
            if (!store.showChecked) {
                const startObj = {index: record.start_index, problem: 0}
                const endObj = {index: record.end_index, problem: 0}
                return (
                    <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                        {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                        <Geom color={record.color} type="line" size={24} position="index*problem"></Geom>
                    </View>
                )
            } else {
                if (record.checked == true) {
                    const startObj = {index: record.start_index, problem: 0}
                    const endObj = {index: record.end_index, problem: 0}
                    return (
                        <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                            {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                            <Geom color={record.color} type="line" size={24} position="index*problem"></Geom>
                        </View>
                    )
                }
            }
        })

        return (
        <div>
            <Chart scale={this.scale} width={store.GRAPH_WIDTH} height={40} padding={{bottom: 0, left: 40}} animate={false} onPlotClick={handleClick}>
               {
                   userProblem.filter(n => n)
               }
            </Chart>
        </div>
        )
    }

}
