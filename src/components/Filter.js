import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {Select, Icon, Form, Input, Button, Checkbox, Upload, Switch, Tooltip, Table} from 'antd'  
import {observer} from 'mobx-react';
import store from '../UIStore'
import './Filter.css'
import EditableTable from './EditableTable.js'

const Search = Input.Search
const columns = [{
    title: 'Title/Tag',
    dataIndex: 'name',
    width: 150,
  }, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
@observer
export default class Filter extends Component {

    @action
    onSearch (value) {
        store.showChecked = true
        store.userInput.map((record) => (
            (String(record.description).includes(value)) && (store.searchCheckedLevel.length == 0 || store.searchCheckedLevel.includes(record.color))? record.checked = true : record.checked = false
        ))
    }

    @action
    onTitleSearch (value) {
        store.showChecked = true
        store.userInput.map((record) => (
            (String(record.title).includes(value))? record.checked = true : record.checked = false
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
                    {/* <div className="level-group">
                        <span className="filter-category">
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
                        <span className="filter-category">
                            Search In Tags: 
                        </span>
                        <Search onChange={this.clearHighlight} placeholder="Tags..." onSearch={this.onTitleSearch} style={{width: '100%'}}/>
                    </div>
                    <div className="search-group">
                        <span className="filter-category">
                            Search In Notes: 
                        </span>
                        <Search onChange={this.clearHighlight} placeholder="Keywords..." onSearch={this.onSearch} style={{width: '100%'}}/>
                    </div> */}
                    <EditableTable dataSource = {store.dataSource}></EditableTable>
                    <div className="advance-group">
                        <span className="filter-category">
                            Advance Search:
                        </span>
                        <div>
                            <span className="filter-sub-category">
                                Repetition:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceRep = value}}>
                                <Checkbox value="0">0</Checkbox>
                                <Checkbox value="1">1</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div>
                            <span className="filter-sub-category">
                                Sentiment:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceSent = value}}>
                                <Checkbox value="-1">-1</Checkbox>
                                <Checkbox value="0">0</Checkbox>
                                <Checkbox value="1">1</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div>
                            <span className="filter-sub-category">
                                Negation:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceNeg = value}}>
                                <Checkbox value="0">0</Checkbox>
                                <Checkbox value="1">1</Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div>
                            <span className="filter-sub-category">
                                Category:
                            </span>
                            <Checkbox.Group onChange={(value) => {store.advanceCat = value}}>
                                <Checkbox value="Reading">Reading(R)</Checkbox>
                                <Checkbox value="Procedure">Procedure(P)</Checkbox>
                                <Checkbox value="Observation">Observation(O)</Checkbox>
                                <Checkbox value="Explanation">Explanation(E)</Checkbox>
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
