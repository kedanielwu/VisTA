
import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {Select, Icon, Form, Input, Button, Drawer} from 'antd'  
import {observer} from 'mobx-react';
import store from '../UIStore'
import colors from './Crayola.json'
import './ProblemPanel.css'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea

const handleSubmit = action(() => {
    store.userInput.push({
        start_index: store.selectedStartTime, 
        end_index: store.selectedEndTime, 
        color: store.selectedColor, 
        checked: false, 
        master: false,
        title: store.problemTitle,
        description: store.problemDescription
    })
    store.selectedColor, store.problemDescription = undefined
    store.problemTitle = []
})

const handleColorSelection = action((value) => {
    store.selectedColor = value
})

@observer
export default class ProblemPanel extends Component {

    
    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="form-container">
                    <div className="form-field">
                        <Input readOnly addonBefore="Start Time:" placeholder="Please Enter Start Time For Problem Found." value={store.selectedStartTime}/>
                    </div>
                    <div className="form-field">
                        <Input readOnly addonBefore="End Time:" placeholder="Please Enter End Time For Problem Found." value={store.selectedEndTime}/>
                    </div>
                    <div className="form-field">
                        <Select value={store.problemTitle} onChange={action((value) => {store.problemTitle = value})} mode="tags" style={{width: '100%'}} placeholder="Please Select or Input Problem Title.">
                            {
                                store.problemTitleSet.map((v) => (
                                    <Option key={v} value={v}>{v}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="form-field">
                        <TextArea value={store.problemDescription} onChange={action((e) => {store.problemDescription = e.target.value})} autosize placeholder="Please Enter A Problem Description."/>
                    </div>
                    <div className="form-field">
                        <Select value={store.selectedColor} defaultValue={store.levelSet[0].hex} style={{width: '100%'}} onSelect={handleColorSelection}>
                            {
                                store.levelSet.map((color) => (
                                    <Option key={color.hex} value={color.hex}><Icon type="tag" style={{color: color.hex}}></Icon>{color.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="form-field submit-button">
                        <Button type="primary" style={{width: '100%'}} onClick={handleSubmit} disabled={store.addingDisabled} >
                           Add
                        </Button>
                    </div>
            </div>
        )
    }

}
