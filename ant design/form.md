#### 使用Form的基本步骤

##### 1.导入Form

##### 2.使用`Form.create()`创建

```javascript
	const Individual = Form.create({ name: 'register' })(Test);  //test为你class创建的类
```

##### 3.写submit函数：

```javascript 
handleSubmit = e => {
  e.preventDefault();
  console.log(this.refs.ctime);
  this.props.form.validateFieldsAndScroll((err, values) => {  //与 validateFields 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
    if (!err) {
      console.log('Received values of form: ', values);
    }
  });
};
```

​	1.可自行绑定在button

​	2.绑定在Form上：

```javascript
<Form {...formItemLayout} onSubmit={this.handleSubmit}>
<Button type="primary" htmlType="submit">Register</Button>
</Form> 
```

##### 4.创建表单中的元素` Form.Item`

**注意：一个 Form.Item 建议只放一个被 getFieldDecorator 装饰过的 child，当有多个被装饰过的 child 时，`help` `required` `validateStatus`无法自动生成**

```javascript
      
render(){
  	 const { getFieldDecorator } = this.props.form;
  return(
    <Form.Item label="E-mail">
    {getFieldDecorator('email', {  //getFieldDecorator用于数据的双向绑定
    rules: [  //rules是验证规则
    {
    type: 'email',
    message: 'The input is not valid E-mail!',
    },
    {
      required: true,
        message: 'Please input your E-mail!',
    },
      ],
    })(<Input />)}
      </Form.Item>
  )
}

```

5.自定义验证

```javascript
{
  validator: this.compareToFirstPassword,   
}
```

```javascript
    compareToFirstPassword = (rule, value, callback) => {  //次函数必须调用callback
      const { form } = this.props; //先获取form
      if (value && value !== form.getFieldValue('password')) { //form.getFieldValue 获取表单中属性的API
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
```





#### 小例子

![form](/Users/ccc/Desktop/form.png)

```javascript
import React from 'react';
import { Form, Select, Button, Icon, InputNumber, Card, Switch, TimePicker } from 'antd'
import moment from 'moment';
import Time from './Time'
const { Option } = Select;
const format = 'HH:mm';



class Test extends React.Component {

    state = {
        confirmDirty: false,
        switchOn:false,
        timecount: 1
    }
    handleSwitch(){
        this.setState(s=>{
            return {
                switchOn:!s.switchOn
            }
        })
    }
    //记录报警时段的个数
    addCount() {      
        this.setState(t => {
            return {
                timecount: t.timecount + 1
            }
        })
    }
    minusCount(){
        this.setState(t => {
            return {
                timecount: t.timecount - 1
            }
        })
    }
    //根据timecount的个数渲时间选择框
    addTimeBar() {
        const { getFieldDecorator } = this.props.form;
        let res = [];
        for (let i = 1; i < this.state.timecount; i++) {
            let name1 = 'beginTime' + i;
            let name2 = 'endTime' + i;
            res.push((
                <Form key={i} layout="inline">
                    <Form.Item label="报警时段" >

                        {
                            getFieldDecorator(name1, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择开始时间!',
                                    },
                                    {
                                        validator: this.validateToNext,
                                    }
                                ]
                            })(<TimePicker format={format} />
                            )
                        }
                        至
        </Form.Item>
                    <Form.Item >
                        {
                            getFieldDecorator(name2, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择结束时间!',
                                    },
                                    {
                                        validator: this.compareToBegin,
                                    }
                                ]
                            })(<TimePicker onChange={this.handleConfirmBlur} format={format} />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Icon type="plus-circle" onClick={this.addCount.bind(this)} />
                    </Form.Item>
                    <Form.Item>
                        <Icon type="minus-circle" onClick={this.minusCount.bind(this)} />
                    </Form.Item>
                </Form>
            ))
        }
        console.log(res)
        return res;
    }

    //提交表单固定格式
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.refs.ctime);
        this.props.form.validateFieldsAndScroll((err, values) => {  //与 validateFields 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
            if (!err) {
                for (let i in values) {
                    if (values[i] instanceof moment) {
                        values[i] = values[i].format(format)
                    }
                }
                console.log('Received values of form: ', values, JSON.stringify(values));
            }
        });
    };
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();  //自带的函数
      };

    //自定义验证
    validateToNext = (rule, value, callback, ...arg) => {
        const { form } = this.props;
        let target = ''
        for (let i in arg[0]) {   
            target = 'endTime' + [...i].slice(-1) //根据名字改变验证的目标
            console.log(target)
            break
        }
        if (value && form.getFieldValue(target) && form.getFieldValue(target).isBefore(value)) {
            callback('开始时间必须早于结束时间');
        } else {
            callback();
        }
    }
    compareToBegin = (rule, value, callback, ...arg) => {
        const { form } = this.props;
        let target = ''
        for (let i in arg[0]) {
            target = 'beginTime' + [...i].slice(-1)
            console.log(target)
            break
        }

        form.validateFields([target]);
        callback()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 22 },
                sm: { span: 22 },
            },
        };
        return (
            <div style={{ width: '100%' }}>
                <Form style={{ width: '100%' }} {...formItemLayout}>
                    <Form.Item label="名单库">
                        {
                            getFieldDecorator('name', {
                                rules: [{
                                    required: true,
                                    message: '请选择名单库!',
                                }]
                            })(
                                <Select mode="multiple" placeholder='请选择名单库' style={{ width: 300 }} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="报警时段">
                        全天候
                    {
                            getFieldDecorator('timeArea')(<Switch  onChange={this.handleSwitch.bind(this)}/>)
                        }
                    </Form.Item>
                </Form>
                {!this.state.switchOn &&<Form layout="inline">
                    <Form.Item label="报警时段" >

                        {
                            getFieldDecorator('beginTime0', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择开始时间!',
                                    },
                                    {
                                        validator: this.validateToNext,
                                    }
                                ]
                            })(<TimePicker format={format} />
                            )
                        }
                        至
                </Form.Item>
                    <Form.Item >
                        {
                            getFieldDecorator('endTime0', {
                                rules: [
                                    {
                                        validator: this.compareToBegin,
                                    },
                                    {
                                        required: true,
                                        message: '请选择结束时间!',
                                    }
                                ]
                            })(<TimePicker  format={format} />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Icon type="plus-circle" onClick={this.addCount.bind(this)} />
                    </Form.Item>
                </Form>}
                {
                   !this.state.switchOn && this.addTimeBar()
                }



                <div style={{ marginTop: '20px' }}>
                    <Button style={{ position: 'relative', left: '60%', margin: '20px' }} type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>
                        Register
                            </Button>
                    <Button style={{ position: 'relative', left: '60%' }} onClick={this.handleReset}>
                        Register
                    </Button>
                </div>
            </div>
        )
    }
}

const Individual = Form.create({ name: 'register' })(Test);
export default Individual;
```





