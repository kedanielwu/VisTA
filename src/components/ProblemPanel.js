
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
        description: store.problemDescription,
        key: store.count,
        feature: {
            sentiment: store.rawData[store.selectedStartTime + store.HIGHTLIGHT_LENGTH / 2].sentiment_gt,
            negation: store.rawData[store.selectedStartTime + store.HIGHTLIGHT_LENGTH / 2].negation,
            repetition: store.rawData[store.selectedStartTime + store.HIGHTLIGHT_LENGTH / 2].repetition,
            category: store.rawData[store.selectedStartTime + store.HIGHTLIGHT_LENGTH / 2].category,
        },
        sessionTime: (Date.now() - store.start_time) / 1000
    })
    store.count = store.count + 1
    store.selectedColor, store.problemDescription = undefined
    if (store.problemTitle) { 
        store.problemTitle.map((record) => {
            if (!store.problemTitleSet.includes(record)){
                store.problemTitleSet.push(record)
            }
        })
    }
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
        const problemTitleSet = store.problemTitleSet.map((v) => (
            <Option key={v} value={v}>{v}</Option>
        ))
        return (
            <div className="form-container">
                    <div className="form-field">
                        <Input readOnly addonBefore="Current Time:" value={new Date((store.selectedStartTime + store.HIGHTLIGHT_LENGTH / 2) * 1000).toISOString().substr(14, 5)}/>
                    </div>
                    <div className="form-field">
                        <Select value={store.problemTitle} onChange={action((value) => {store.problemTitle = value})} mode="tags" style={{width: '100%'}} placeholder="Please Select or Input Problem Title.">
                            {
                                problemTitleSet
                            }
                        </Select>
                    </div>
                    <div className="form-field">
                        <TextArea autosize={{minRows: 7}} value={store.problemDescription} onChange={action((e) => {store.problemDescription = e.target.value})} placeholder="Please Enter A Problem Description."/>
                    </div>
                    {/* <div className="form-field">
                        <Select value={store.selectedColor} defaultValue={store.levelSet[0].hex} style={{width: '100%'}} onSelect={handleColorSelection}>
                            {
                                store.levelSet.map((color) => (
                                    <Option key={color.hex} value={color.hex}><Icon type="tag" style={{color: color.hex}}></Icon>{color.name}</Option>
                                ))
                            }
                        </Select>
                    </div> */}
                    <div className="form-field submit-button">
                        <Button type="primary" style={{width: '100%'}} onClick={handleSubmit} disabled={store.addingDisabled} >
                           Add
                        </Button>
                    </div>
            </div>
        )
    }

}
