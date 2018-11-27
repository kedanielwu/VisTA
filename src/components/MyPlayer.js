import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {Player, ControlBar} from "video-react"
import store from '../UIStore'
import "../../node_modules/video-react/dist/video-react.css";
import "./MyPlayer.css"
import movie from '../static/p1-remote.mp4'

@observer
export default class MyPlayer extends Component {

    @action
    handleStateChange(state, prevState) {
        //REDUX -> MOBX store update
        store.playerState = state
        if (parseInt(state.currentTime, 10) > parseInt(store.selectedEndTime, 10) && parseInt(store.selectedEndTime, 10) != 0) {
            store.selectedTime = false
            store.HIGHTLIGHT_LENGTH = store.HIGHLIGHT_BACKUP
        }
    }

    componentDidMount() {
        // subscribe state change
        this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
        store.playerRef = this.refs.player
      }
    
    render() {
        if (this.refs.player) {
            this.refs.player.load()
        }
        return (
        <div className="my-player-wrapper">
            <Player ref="player" src={movie} fluid={false} width={600}>
                <ControlBar autoHide={false}/>
            </Player>
        </div>
        )
    }
}




