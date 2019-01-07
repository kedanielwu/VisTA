import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts'
import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../UIStore'
import Brush from '@antv/g2-brush';


let g2Chart;

const getG2Instance = (chart) => {
    g2Chart = chart
}

const handlePlotHover = action((ev) => {
    store.currentHover = ev.items[0]

})

const handlePlotClick = action((ev) => {
    store.showChecked = false
    if (!store.selectedTime) {
        store.playerRef.seek(Math.round((ev.x - 40) * store.unitLength))
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
            nice: false
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
        }
    }
    componentWillMount() {
        // console.log(store.rawData)
    }

    componentDidMount() {
        window.g2chart = g2Chart
        console.log(g2Chart)
        new Brush({
            canvas: g2Chart.get('canvas'),
            g2Chart,
            type: 'X',
            onBrushstart(ev) {
                action(() => {
                    store.selectedTime = false
                    store.addingDisabled = false
                    store.HIGHTLIGHT_LENGTH = store.HIGHLIGHT_BACKUP
                })()
                handleTimeUpdate('start', Math.round((ev.x - 40) * store.unitLength))
            },
            onBrushmove(ev) {
            },
            onBrushend(ev) {
                action(() => {store.selectedTime = true})()
                handleTimeUpdate('end', Math.round((ev.x - 40) * store.unitLength))
                store.showProblemPannel = true
                store.playerRef.seek(store.selectedStartTime)
                store.playerRef.pause()
                store.HIGHLIGHT_BACKUP = store.HIGHTLIGHT_LENGTH
                store.HIGHTLIGHT_LENGTH = Math.abs(parseInt(store.selectedEndTime, 10) - parseInt(store.selectedStartTime, 10))
            }
          });
          g2Chart.on('plotdblclick', () => {
            g2Chart.get('options').filters = {};
            g2Chart.repaint();
          });
    }

    render() {
        const {x, y} = this.props
        return (
            <div style={{width: "100%", display:"flex", justifyContent:"center"}}>
            <Chart
             scale={this.scale} 
             width={store.GRAPH_WIDTH} 
             height={80} padding={{left: 40, bottom: 40, top: 5}} data={store.rawData} onPlotClick={handlePlotClick} animate={false} onGetG2Instance={getG2Instance}>
                {/* <Tooltip crosshairs={'y'} showTitle={false} position="botton"/> */}
                <Axis name={x}></Axis>
                <Axis name={y}></Axis>
                <Geom color="grey" type="line" position={x + '*' + y}></Geom>
                <View scale={this.scale} data={store.hightlightData} animate={false}>
                    <Geom color="red" type="area" position={x + '*h'} opacity={0.2}></Geom>
                </View>
                <View scale={this.scale} data={store.advanceData} animate={false}>
                    <Geom color="blue" type="interval" position={x + '*' + y} opacity={0.2}></Geom>
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
