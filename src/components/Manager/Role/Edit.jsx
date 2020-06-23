import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Form,
    Input,
    Button,
    notification,
    Checkbox,
} from "antd";
import { setFormErrors } from "utils";
import { updateRole } from "services/auth";

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
            fields: []
        }
    }

    handleSubmit = async ({
        description,
        permissionCodes
    }) => {
        const { onSuccess, editData } = this.props;
        try {
            if (!description) {
                this.form.submit();
                return;
            }
            const result = await updateRole(editData.roleId, description, permissionCodes);
            notification.success({
                message: "Cập nhật quyền thành công",
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
            setFormErrors(this.form, e.errors);
            notification.error({ message: e.message });
        }
    };

    handleClose = () => {
        this.props.onClose();
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (snapshot.isEdit) {
            let fields = [];
            let initData = {
                description: snapshot.editData.description,
                permissionCodes: snapshot.editData.permissionCodes
            };
            Object.keys(initData).map((key) => {
                return fields.push({ name: [key], value: initData[key] });
            });
            this.setState({
                fields: fields
            });
        }
    };

    getSnapshotBeforeUpdate = (prevProps) => {
        return {
            isEdit:
                prevProps.editData !== this.props.editData &&
                !!Object.keys(this.props.editData).length,
            editData: this.props.editData,
        };
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
                    Lưu thông tin
                </Button>
            </div>
        );
    };

    render() {
        const {fields} = this.state;
        const { visible, listPermissions } = this.props;
        return (
            <div>
                <Drawer
                    title="Sửa quyền"
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
                        fields={fields}
                        initialValues={{
                            description: "",
                            permissionCodes: []
                        }}
                        onFinish={this.handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mô tả",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mô tả" />
                        </Form.Item>
                        <Form.Item name="permissionCodes" label="Quyền" rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ít nhất 1 quyền",
                                },
                            ]}>
                            <Checkbox.Group options={listPermissions}></Checkbox.Group>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}
