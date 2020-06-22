import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Drawer, Form, Input, Upload, Button, notification, Checkbox, DatePicker} from 'antd';
import { FiUpload } from 'react-icons/fi';
import { uploadMedia } from 'services/media';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { updateUser } from 'services/auth';
import { getCDN } from 'utils';
import moment from 'moment';

export default class Create extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onSuccess: PropTypes.func,
        onClose: PropTypes.func
    }

    static defaultProps = {
        visible: false,
        onSuccess: () => {},
        onClose: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            avatarData: "",
            fields: []
        }
    }

    handleUpload = async ({file, onSuccess, onError, onProgress}) => {
        try{
            const result = await uploadMedia(file, (e) => {
                onProgress({
                    percent: Math.ceil(e.loaded / e.total) * 100
                })
            });
            let frd = new FileReader();
            frd.onload = ({target}) => {
                this.setState({avatarData: target.result, avatar: result.data.minimizePath});
            }
            frd.readAsDataURL(file);
        }catch(e){

        }
    }

    handleSubmit = async ({fullName, newPassword, isVip, vipExpiredTime}) => {
        const {avatar} = this.state;
        const {onSuccess, editData} = this.props;
        try{
            if (!avatar) {
                notification.error({message: "Vui lòng tải lên ảnh đại diện!"});
                return;
            }
            if(!fullName){
                this.form.submit();
                return;
            }
            const result = await updateUser(editData._id, fullName, avatar, isVip, vipExpiredTime && vipExpiredTime.hours(23).minutes(59).seconds(59).utc(), newPassword);
            notification.success({
                message: "Cập nhật người dùng thành công"
            });
            onSuccess(result.data);
            this.handleClose();
        }catch(e){
            if(e.errors && e.errors.length){
                let fields = e.errors.map((obj) => {
                    return {
                        name: [obj.param],
                        value: obj.value,
                        errors: [obj.msg]
                    }
                });
                this.form.setFields(fields);
            }
            notification.error({message: e.message});
        }
    }

    handleClose = () => {
        this.setState({avatar: "", avatarData: ""});
        this.props.onClose();
    }

    CustomFooter = () => {
        return (
            <div style={{
                    textAlign: 'right'
                }}>
                <Button
                    onClick={this.handleClose}
                    style={{
                        float: "left"
                    }}>
                    Đóng
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                    Lưu thông tin
                </Button>
            </div>
        )
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (snapshot.isEdit) {
            let fields = [];
            let initData = {
                fullName: snapshot.editData.fullName,
                username: snapshot.editData.username,
                isVip: snapshot.editData.isVip,
                vipExpiredTime: moment(snapshot.editData.vipExpiredTime),
            }
            Object.keys(initData).map((key) => {
                return fields.push({name: [key], value: initData[key]});
            });
            this.setState({
                avatar: snapshot.editData.avatar,
                avatarData: getCDN(snapshot.editData.avatar),
                fields: fields
            });
        }
    }

    getSnapshotBeforeUpdate = (prevProps) => {
        return {
            isEdit: prevProps.editData !== this.props.editData && !!Object.keys(this.props.editData).length,
            editData: this.props.editData
        };
    }

    render() {
        const {avatarData, fields} = this.state;
        const {visible} = this.props;
        return (
            <div>
                <Drawer
                    title="Sửa người dùng"
                    placement="right"
                    width={500}
                    closable={true}
                    destroyOnClose={true}
                    onClose={this.handleClose}
                    visible={visible}
                    footer={this.CustomFooter()}>
                    <Form
                        ref={(el) => this.form = el}
                        fields={fields}
                        onFinish={this.handleSubmit}
                        layout="vertical">
                        <Form.Item label="Ảnh đại diện">
                            <Upload
                                name="avatar"
                                accept="image/*"
                                listType="picture-card"
                                className="category-upload"
                                showUploadList={false}
                                customRequest={this.handleUpload}>
                                {
                                    avatarData
                                        ? <img
                                                src={avatarData}
                                                alt="Ảnh đại diện"
                                                style={{
                                                    width: 150,
                                                    height: 150
                                                }}/>
                                        : <FiUpload style={{fontSize: 24}}/>
                                }
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="fullName"
                            label="Tên hiển thị"
                            rules={[{
                                    required: true,
                                    message: "Vui lòng nhập tên hiển thị"
                                }
                            ]}>
                            <Input placeholder="Nhập tên hiển thị"/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[{
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập"
                                }
                            ]}>
                            <Input disabled placeholder="Nhập tên đăng nhập"/>
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="Mật khẩu mới">
                            <Input type="newPassword" placeholder="Nhập mật khẩu mới"/>
                        </Form.Item>
                        <Form.Item name="isVip" valuePropName="checked">
                            <Checkbox>VIP</Checkbox>
                        </Form.Item>
                        <Form.Item name="vipExpiredTime" label="Ngày hết hạn VIP">
                            <DatePicker locale={locale} placeholder="Chọn ngày" format="DD/MM/YYYY" style={{display: "block"}}/>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        )
    }
}
