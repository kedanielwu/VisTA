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

const categoryColor = {
    "Reading": "#722ed1",
    "Procedure": "#a0d911",
    "Observation": "#f5222d",
    "Explanation": "#1890ff"

}

const negationColor = (value) => {
    if (value == 0) {
      return "#a0d911"

    } else if (value == 1) {
        return "#fa541c"
    }
    // else if (value == -1) {
    //     return "#faad14"
    // }
}

const repetitionColor = (value) => (
    value == 1 ?  "#fa541c" : "#a0d911"
)

const sentimentColor = (value) => {
    if (value == 0) {
        return "#faad14" 
    } else if (value == 1) {
        return "#a0d911"
    } else {
        return "#fa541c"
    }
}

const handleClick = action(((ev) => {
    if (ev.data) {
        store.playerRef.pause()
        store.userInput.map((record) => {
            if (record.start_index == ev.data[0]._origin.index && record.end_index == ev.data[1]._origin.index) {
                // notification.open({message: record.title, description: record.description, icon: <Icon type="info-circle" style={{color: record.color}}/>})
                // store.selectedStartTime = record.start_index
                // store.selectedEndTime = record.end_index
                // store.problemTitle = record.title
                // store.problemDescription = record.description
                // store.selectedColor = record.color
                // store.HIGHTLIGHT_LENGTH = record.end_index - record.start_index
                console.log(record.feature)
                store.advanceCat = [record.feature.category]
                store.advanceLowPitch = [String(record.feature.low_pitch)]
                store.advanceRep = [String(record.feature.low_speechrate)]
                store.advanceSent = [String(record.feature.sentiment)]
                store.advanceHighPitch = [String(record.feature.high_pitch)]
                // store.playerRef.seek(ev.data[0]._origin.index)
                store.problemChartInteraction.push({...record, click_time: (Date.now() - store.start_time) / 1000})
            } else {
            }
        }            
        )
    }
}))

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
            max:1.2,
            ticks: [0, 0.3, 0.6, 0.9, 1.2]
        }

    }

    render() {
        const category = store.userInput.map((record) => {
            const startObj = {index: record.start_index, problem: 0.9}
            const endObj = {index: record.end_index, problem: 0.9}
            const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].category
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Axis name="problem" visible tickLine={null} label={{textStyle: {fontSize: "14", fill: "grey", fontWeight: "normal"}}}/>
                    <Axis name="index" visible={false}></Axis>
                    <Geom color={categoryColor[color]} type="line" size={7} position="index*problem"></Geom>
                </View>
            )
        })

        const negation = store.userInput.map((record) => {
            const startObj = {index: record.start_index, problem: 0.3}
            const endObj = {index: record.end_index, problem: 0.3}
            const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].negation
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={negationColor(color)} type="line" size={7} position="index*problem"></Geom>
                </View>
            )
        })

        const repetition = store.userInput.map((record) => {
            const startObj = {index: record.start_index, problem: 0}
            const endObj = {index: record.end_index, problem: 0}
            const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].abnormal_speechrate[1]
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={repetitionColor(color)} type="line" size={7} position="index*problem"></Geom>
                </View>
            )
        })

        const sentiment = store.userInput.map((record) => {
            
            const startObj = {index: record.start_index, problem: 1.2}
            const endObj = {index: record.end_index, problem: 1.2}
            const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].sentiment_gt
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={sentimentColor(color)} type="line" size={7} position="index*problem"></Geom>
                </View>
            ) 
        })

        const low_pitch = store.userInput.map((record) => {
            const startObj = {index: record.start_index, problem: 0.3}
            const endObj = {index: record.end_index, problem: 0.3}
            const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].abnormal_pitch[1]
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={repetitionColor(color)} type="line" size={7} position="index*problem"></Geom>
                </View>
            )
        })

        const high_pitch = store.userInput.map((record) => {
            const startObj = {index: record.start_index, problem: 0.6}
            const endObj = {index: record.end_index, problem: 0.6}
            const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].abnormal_pitch[0]
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={repetitionColor(color)} type="line" size={7} position="index*problem"></Geom>
                </View>
            )
        })
        // const userProblem = store.userInput.map((record) => {
        //     if (!store.showChecked) {
        //         const startObj = {index: record.start_index, problem: 0}
        //         const endObj = {index: record.end_index, problem: 0}
        //         const categoryColor = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].category
        //         return (
        //             <View key={Math.random()} data={[startObj, endObj]} animate={false}>
        //                 {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
        //                 <Geom color={categoryColor[categoryColor]} type="line" size={24} position="index*problem"></Geom>
        //             </View>
        //         )
        //     } else {
        //         if (record.checked == true) {
        //             const startObj = {index: record.start_index, problem: 0}
        //             const endObj = {index: record.end_index, problem: 0}
        //             const color = store.rawData[record.start_index + store.HIGHTLIGHT_LENGTH / 2].category
        //             return (
        //                 <View key={Math.random()} data={[startObj, endObj]} animate={false}>
        //                 {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
        //                     <Geom color={categoryColor[color]} type="line" size={24} position="index*problem"></Geom>
        //                 </View>
        //             )
        //         }
        //     }
        // })

        return (
        <div>
            <Chart scale={this.scale} width={store.GRAPH_WIDTH} height={65} padding={{top: 10, bottom: 10, left: 10, right:10}} animate={false} onPlotClick={handleClick}>
                {
                    sentiment
                }
                {
                    category
                }
                {
                    high_pitch
                }
                {
                    low_pitch
                }
                {
                    repetition
                }
                {/* <View scale={this.scale} animate={false} data={[{index: store.playerState.currentTime, problem:1}]}>
                    <Geom color="red" size={1} type="interval" position="index*problem"></Geom>
                </View> */}
            </Chart>
        </div>
        )
    }

}
