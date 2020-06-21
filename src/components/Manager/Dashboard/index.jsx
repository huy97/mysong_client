import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card} from 'antd';
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
// import services from 'services';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "name": "Page A",
                    "uv": 4000,
                    "pv": 2400,
                    "amt": 2400
                }, {
                    "name": "Page B",
                    "uv": 3000,
                    "pv": 1398,
                    "amt": 4210
                }, {
                    "name": "Page C",
                    "uv": 2000,
                    "pv": 9800,
                    "amt": 2290
                }
            ]
        }
    }

    componentDidMount() {
        // services.post('https://httpbin.org/delay/20');
    }
    

    render() {
        return (
            <div>
                <Row>
                    <Col span="12">
                        <Card title="Thống kê lượt truy cập" bordered={false}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={this.state.data}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                                    <Legend/>
                                    <Line label="Hi" type="monotone" dataKey="uv" stroke="#8884d8"/>
                                    <Line type="monotone" name="PV" dataKey="pv" stroke="#82ca9d"/>
                                    <Line type="monotone" name="AMT" dataKey="amt" stroke="#f00"/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card title="Thống kê người dùng" bordered={false}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={this.state.data}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                                    <Legend/>
                                    <Line label="Hi" type="monotone" dataKey="uv" stroke="#8884d8"/>
                                    <Line type="monotone" name="PV" dataKey="pv" stroke="#82ca9d"/>
                                    <Line type="monotone" name="AMT" dataKey="amt" stroke="#f00"/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Card title="Thống kê lượt truy cập" bordered={false}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={this.state.data}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                                    <Legend/>
                                    <Line label="Hi" type="monotone" dataKey="uv" stroke="#8884d8"/>
                                    <Line type="monotone" name="PV" dataKey="pv" stroke="#82ca9d"/>
                                    <Line type="monotone" name="AMT" dataKey="amt" stroke="#f00"/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps,)(Dashboard);
