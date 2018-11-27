import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts'
import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../UIStore'
import Brush from '@antv/g2-brush';
import { Tag, Slider } from 'antd'
import './FeaturePanel.css'

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
        return "#a0d911"
    } else if (value == 1) {
        return "#fa541c"
    } else {
        return "#faad14"
    }
}

const LegendPanel = () => (
    <div className="legend-container">
        <div className="sentiment-container">
            <span>
                <Tag color={sentimentColor(-1)}>-1</Tag>
                <Tag color={sentimentColor(0)}>0</Tag>
                <Tag color={sentimentColor(1)}>1</Tag>
            </span>
        </div>
        <div className="repetition-container">
            <span>
                <Tag color={repetitionColor(0)}>0</Tag>
                <Tag color={repetitionColor(1)}>1</Tag>
            </span>
        </div>
        <div className="negation-container">
            <span>
                <Tag color={negationColor(0)}>0</Tag>
                <Tag color={negationColor(1)}>1</Tag>
            </span>
        </div>
        <div className="category-container">
            <span>
                <Tag color={categoryColor.Reading}>Reading</Tag>
                <Tag color={categoryColor.Procedure}>Procedure</Tag>
                <Tag color={categoryColor.Observation}>Observation</Tag>
                <Tag color={categoryColor.Explanation}>Explanation</Tag>
            </span>
        </div>
    </div>
)


@observer
export default class FeaturePanel extends Component {

    g2Chart = null

    userProblem;
    raw;

    componentDidMount() {
          
    }


    render() {
        const scale = {
            index: {
                min: 0,
                max: this.props.size,
                nice: false,
                tickInterval: 1
            },
            problem: {
                type : "cat",
                values: ["category", "negation", "repetition", "sentiment"]
            },
            h: {
                min: 0,
                max: 1,
                ticks: [0, 0.3, 0.6, 0.9]
            }
        }
        const category = store.hightlightData.map((record, index) => {
            const startObj = {index: index, problem: "category"}
            const endObj = {index: index + 1, problem: "category"}

            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Axis name="problem" visible tickLine={null} label={{textStyle: {fontSize: "14", fill: "grey", fontWeight: "normal"}}}/>
                    <Axis name="index" visible={false}></Axis>
                    <Geom color={categoryColor[record.category]} type="line" size={14} position="index*problem"></Geom>
                </View>
            )
        })

        const negation = store.hightlightData.map((record, index) => {
            const startObj = {index: index, problem: "negation"}
            const endObj = {index: index + 1, problem: "negation"}
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={negationColor(record.negation)} type="line" size={14} position="index*problem"></Geom>
                </View>
            )
        })

        const repetition = store.hightlightData.map((record, index) => {
            const startObj = {index: index, problem: "repetition"}
            const endObj = {index: index + 1, problem: "repetition"}
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={repetitionColor(record.repetition)} type="line" size={14} position="index*problem"></Geom>
                </View>
            )
        })

        const sentiment = store.hightlightData.map((record, index) => {
            
            const startObj = {index: index, problem: "sentiment"}
            const endObj = {index: index + 1, problem: "sentiment"}
            return (
                <View key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={sentimentColor(record.sentiment_gt)} type="line" size={14} position="index*problem"></Geom>
                </View>
            ) 
        })
 
        return (
        <div className="feature-container" style={{width: "100%", display:"flex"}}>
            <Chart scale={scale} width={store.GRAPH_WIDTH - 150} height={150} padding={{left: 80}} animate={false} className="feature-chart">
                {
                    store.selectedTime
                    ?
                    <View scale={scale} animate={false} data={[{index: store.cursorLocation, problem:"sentiment"}]}>
                        <Geom color="red" size={1} type="interval" position="index*problem"></Geom>
                    </View>
                    :
                    <View scale={scale} animate={false} data={[{index: store.HIGHTLIGHT_LENGTH / 2, problem:"sentiment"}]}>
                        <Geom color="red" size={1} type="interval" position="index*problem"></Geom>
                    </View>
                }
                {
                    category
                }
                {
                    negation
                }
                {
                    repetition
                }
                {
                    sentiment
                }
                {/* {
                    <View animate={false} data={[{index: parseInt(store.HIGHTLIGHT_LENGTH / 2), problem:"sentiment"}]}>
                        <Geom color="red" size={4} opacity={0.2} type="interval" position="index*problem"></Geom>
                    </View>
                } */}
            </Chart>
            <LegendPanel></LegendPanel>
            <div className="slider-control">
                <span>Highlight Window Size: (In Second)</span>
                <Slider defaultValue={10} dots min={10} max={30} step={2} onChange={
                    (value) => {
                        store.HIGHLIGHT_BACKUP = store.HIGHTLIGHT_LENGTH
                        store.HIGHTLIGHT_LENGTH = value
                        store.playerRef.seek(store.playerState.currentTime)
                    }
                }></Slider>
            </div>
        </div>
        )
    }

}
