import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Form,
    Input,
    Upload,
    Button,
    notification,
    Checkbox,
    DatePicker,
} from "antd";
import { FiUpload } from "react-icons/fi";
import { uploadMedia } from "services/media";
import locale from "antd/es/date-picker/locale/vi_VN";
import { createUser } from "services/auth";
import { setFormErrors } from "utils";

export default class Create extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onSuccess: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        visible: false,
        onSuccess: () => {},
        onClose: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            avatarData: "",
        };
    }

    handleUpload = async ({ file, onSuccess, onError, onProgress }) => {
        try {
            const result = await uploadMedia(file, (e) => {
                onProgress({
                    percent: Math.ceil(e.loaded / e.total) * 100,
                });
            });
            let frd = new FileReader();
            frd.onload = ({ target }) => {
                this.setState({
                    avatarData: target.result,
                    avatar: result.data.minimizePath,
                });
            };
            frd.readAsDataURL(file);
        } catch (e) {}
    };

    handleSubmit = async ({
        fullName,
        username,
        password,
        isVip,
        vipExpiredTime,
    }) => {
        const { avatar } = this.state;
        const { onSuccess } = this.props;
        try {
            if (!fullName) {
                this.form.submit();
                return;
            }
            const result = await createUser(
                fullName,
                username,
                password,
                password,
                avatar,
                isVip,
                vipExpiredTime &&
                    vipExpiredTime.hours(23).minutes(59).seconds(59).utc()
            );
            notification.success({
                message: "Tạo người dùng thành công",
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
            setFormErrors(this.form, e.errors);
            notification.error({ message: e.message });
        }
    };

    handleClose = () => {
        this.setState({ avatar: "", avatarData: "" });
        this.props.onClose();
    };

    CustomFooter = () => {
        return (
            <div
                style={{
                    textAlign: "right",
                }}
            >
                <Button
                    onClick={this.handleClose}
                    style={{
                        float: "left",
                    }}
                >
                    Đóng
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                    Tạo người dùng
                </Button>
            </div>
        );
    };

    render() {
        const { avatarData } = this.state;
        const { visible } = this.props;
        return (
            <div>
                <Drawer
                    title="Thêm người dùng"
                    placement="right"
                    width={500}
                    closable={true}
                    destroyOnClose={true}
                    onClose={this.handleClose}
                    visible={visible}
                    footer={this.CustomFooter()}
                >
                    <Form
                        ref={(el) => (this.form = el)}
                        fields={[]}
                        initialValues={{
                            fullName: "",
                            username: "",
                            password: "",
                            isVip: false,
                            vipExpiredTime: null,
                        }}
                        onFinish={this.handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item label="Ảnh đại diện">
                            <Upload
                                name="avatar"
                                accept="image/*"
                                listType="picture-card"
                                className="category-upload"
                                showUploadList={false}
                                customRequest={this.handleUpload}
                            >
                                {avatarData ? (
                                    <img
                                        src={avatarData}
                                        alt="Ảnh đại diện"
                                        style={{
                                            width: 150,
                                            height: 150,
                                        }}
                                    />
                                ) : (
                                    <FiUpload style={{ fontSize: 24 }} />
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="fullName"
                            label="Tên hiển thị"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên hiển thị",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên hiển thị" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item name="isVip" valuePropName="checked">
                            <Checkbox>VIP</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="vipExpiredTime"
                            label="Ngày hết hạn VIP"
                        >
                            <DatePicker
                                locale={locale}
                                placeholder="Chọn ngày"
                                format="DD/MM/YYYY"
                                style={{ display: "block" }}
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}
