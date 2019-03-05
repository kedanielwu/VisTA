import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts'
import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../UIStore'
import Brush from '@antv/g2-brush';


let g2Chart;

const getG2Instance = (chart) => {
    window.g2Chart = chart
}

const handlePlotHover = action((ev) => {
    store.currentHover = ev.items[0]

})

const handlePlotClick = action((ev) => {
    store.showChecked = false
    store.addingDisabled = false
    console.log(ev.x)
    if (!store.selectedTime) {
        store.playerRef.seek(Math.round((ev.x-10) * store.unitLength))
    }
})

const handleTimeUpdate = action((field, time) => {
    field == 'start' ? store.selectedStartTime = time : store.selectedEndTime = time
})

@observer
export default class MainChart extends Component {

    userProblem;
    raw;
    scale = {
        index: {
            min: 0,
            max: store.rawData.length,
            nice: false,
            formatter: (value) => (new Date(value * 1000).toISOString().substr(14, 5)),
            tickCount: 12
        },
        problem: {
            min: 0,
            max: 1,
            tickCount: 2
        },
        h: {
            min: 0,
            max: 1,
            tickCount: 2
        },
        u: {
            min: 0,
            max: 1,
            tickCount: 2
        },
    }
    componentWillMount() {
        // console.log(store.rawData)
    }

    componentDidMount() {
        // window.g2chart = g2Chart
        // console.log(g2Chart)
        // new Brush({
        //     canvas: g2Chart.get('canvas'),
        //     g2Chart,
        //     type: 'X',
        //     onBrushstart(ev) {
        //         action(() => {
        //             store.selectedTime = false
        //             store.addingDisabled = false
        //             store.HIGHTLIGHT_LENGTH = store.HIGHLIGHT_BACKUP
        //         })()
        //         handleTimeUpdate('start', Math.round((ev.x - 40) * store.unitLength))
        //     },
        //     onBrushmove(ev) {
        //     },
        //     onBrushend(ev) {
        //         action(() => {store.selectedTime = true})()
        //         handleTimeUpdate('end', Math.round((ev.x - 40) * store.unitLength))
        //         store.showProblemPannel = true
        //         store.playerRef.seek(store.selectedStartTime)
        //         store.playerRef.pause()
        //         store.HIGHLIGHT_BACKUP = store.HIGHTLIGHT_LENGTH
        //         store.HIGHTLIGHT_LENGTH = Math.abs(parseInt(store.selectedEndTime, 10) - parseInt(store.selectedStartTime, 10))
        //     }
        //   });
        //   g2Chart.on('plotdblclick', () => {
        //     g2Chart.get('options').filters = {};
        //     g2Chart.repaint();
        //   });
    }

    render() {
        const userProblem = store.userInput.map((record) => {
            const startObj = {index: record.start_index, problem: 1}
            const endObj = {index: record.end_index, problem: 1}
            return (
                <View scale={this.scale} key={Math.random()} data={[startObj, endObj]} animate={false}>
                    {/* <Geom color={record.color} type="point" shape="hexagon" size={4} position="index*problem"></Geom> */}
                    <Geom color={record.color} type="interval" size={1} opacity={0.2} position={x + '*problem'}></Geom>
                </View>
            )
        })
        const {x, y} = this.props
        return (
            <div style={{width: "100%", display:"flex", justifyContent:"center"}}>
            <Chart
             scale={this.scale} 
             width={store.GRAPH_WIDTH} 
             height={150}
             padding={{left: 10, bottom: 40, top: 5}} 
             data={store.rawData} 
             onPlotClick={handlePlotClick} 
             animate={false} 
             onGetG2Instance={getG2Instance}>
                {/* <Tooltip crosshairs={'y'} showTitle={false} position="botton"/> */}
                <Axis name={x} label={{textStyle: {fontSize: 9}}}></Axis>
                <Axis name={y}></Axis>
                <Geom color="grey" type="line" position={x + '*' + y} size={1}></Geom>
                {/* <View scale={this.scale} data={store.hightlightData} animate={false}>
                    <Geom color="red" type="area" position={x + '*h'} opacity={0.2} size={0}></Geom>
                </View> */}
                <View scale={this.scale} animate={false} data={[{index: store.playerState.currentTime, problem:1}]}>
                    <Geom color="red" size={1} type="interval" position="index*problem"></Geom>
                </View>
                <View scale={this.scale} animate={false} data={[{index: store.selectedStartTime, problem:0.1}]}>
                    <Geom color="red" size={1} type="interval" position="index*problem"></Geom>
                </View>
                <View scale={this.scale} animate={false} data={[{index: store.selectedEndTime, problem:0.1}]}>
                    <Geom color="red" size={1} type="interval" position="index*problem"></Geom>
                </View>
                {/* {
                    store.userProblem.map(record => {
                        return (
                        <View key={Math.random()} scale={this.scale} data={record} animate={false}>
                            <Geom color={record[0].color} type="area" position={x + '*h'} opacity={0.4} size={0}></Geom>
                        </View>
                        )
                    })
                } */}
                <View scale={this.scale} data={store.advanceData} animate={false}>
                    <Geom color={[y, ['#d7191c', '#2c7bb6']]} type="interval" position={x + '*h'} opacity={0.2} size={1}></Geom>
                </View>
                {/* <Tooltip
                    containerTpl="<div class=&quot;g2-tooltip&quot;><p class=&quot;g2-tooltip-title&quot;></p><table class=&quot;g2-tooltip-list&quot;></table></div>"
                    itemTpl="<tr class=&quot;g2-tooltip-list-item&quot;></tr>"
                    offset={50}
                    g2-tooltip={{
                        position: "absolute",
                        visibility: "hidden",
                        border: "1px solid #efefef",
                        backgroundColor: "white",
                        color: "#000",
                        opacity: "0.8",
                        padding: "5px 15px",
                        transition: "top 200ms,left 200ms"
                    }}
                    g2-tooltip-list={{
                        margin: "10px"
                    }}
                /> */}
            </Chart>
        </div>
        )
    }

}
