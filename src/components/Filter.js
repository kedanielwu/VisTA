import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {Select, Icon, Form, Input, Button, Checkbox, Upload, Switch, Tooltip} from 'antd'  
import {observer} from 'mobx-react';
import store from '../UIStore'
import './Filter.css'

const Search = Input.Search
@observer
export default class Filter extends Component {

    @action
    onSearch (value) {
        store.showChecked = true
        store.userInput.map((record) => (
            (String(record.title).includes(value) || String(record.description).includes(value)) && (store.searchCheckedLevel.length == 0 || store.searchCheckedLevel.includes(record.color))? record.checked = true : record.checked = false
        ))
    }

    @action
    handleChange (checkedValues) {
        store.searchCheckedLevel = checkedValues
        store.userInput.map((record) => (
            checkedValues.includes(record.color) ? record.checked = true : record.checked = false
        ))
        if (checkedValues.length > 0) {
            store.showChecked = true
        } else {
            store.showChecked = false
        }
    }

    @action
    clearHighlight () {
        store.showChecked = false
        store.userInput.map((record) => (
            record.checked = false
        ))
    }

    @action
    onChangeMasterSwitch (checked) {
        store.showMaster = checked
    }

    @action
    onChangeMasterDiff (checked) {
        store.showMasterDiff = checked
    }

    @action
    onChangeMasterSim (checked) {
        store.showMasterSim = checked
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="filter-container">
                <div className="filter-left">
                    <div className="level-group">
                        <span>
                            Severity Level:
                        </span>
                        <Checkbox.Group onChange={this.handleChange}>
                            {
                                store.levelSet.map((level) => (
                                    <Tooltip key={level.hex} title={level.tooltip} placement="bottom">
                                        <Checkbox value={level.hex}>{level.name}</Checkbox>
                                    </Tooltip>
                                ))
                            }
                        </Checkbox.Group>
                    </div>
                    <div className="search-group">
                        <span>
                            Search In Notes: 
                        </span>
                        <Search onChange={this.clearHighlight} placeholder="Keywords..." onSearch={this.onSearch} style={{width: '100%'}}/>
                    </div>
                    <div className="advance-group">
                        <span>
                            Advance Search:
                        </span>
                        <div>
                            <span>
                                Repetition:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceRep = value}}>
                                <Checkbox value="0">0</Checkbox>
                                <Checkbox value="1">1</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div>
                            <span>
                                Sentiment:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceSent = value}}>
                                <Checkbox value="0">0</Checkbox>
                                <Checkbox value="1">1</Checkbox>
                                <Checkbox value="-1">-1</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div>
                            <span>
                                Negation:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceNeg = value}}>
                                <Checkbox value="0">0</Checkbox>
                                <Checkbox value="1">1</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div>
                            <span>
                                Category:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceCat = value}}>
                                <Checkbox value="Reading">Reading</Checkbox>
                                <Checkbox value="Procedure">Procedure</Checkbox>
                                <Checkbox value="Observation">Observation</Checkbox>
                                <Checkbox value="Explanation">Explanation</Checkbox>
                            </Checkbox.Group>
                        </div>
                        {/* <Button type="primary" onChange={store.enable}>Apply</Button> */}
                    </div>
                </div>
                {/* <div className="master-group">
                    <span>
                        Show Expert Notes: 
                    </span>
                    <Switch onChange={this.onChangeMasterSwitch}></Switch>
                    <span>
                        Different:
                    </span>
                    <Switch onChange={this.onChangeMasterDiff}></Switch>
                    <span>
                        Similar:
                    </span>
                    <Switch onChange={this.onChangeMasterDiff}></Switch>
                </div> */}
            </div>
        )
    }

}
