import React, { Component } from "react";
import { Table, Button, Popconfirm, Tag } from "antd";
import PropTypes from "prop-types";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { getCDN } from "utils";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Ability from "containers/Ability";
import { PERMISSION_CODE } from "constants/global";
import { Link } from "react-router-dom";
import { RiStarSLine } from "react-icons/ri";

export default class ListSong extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onSelect: PropTypes.func,
        onSelectAll: PropTypes.func,
        onPaginate: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        pagination: PropTypes.object.isRequired,
    };

    static defaultProps = {
        data: [],
        onSelect: () => {},
        onSelectAll: () => {},
        onPaginate: () => {},
        onDelete: () => {},
        onEdit: () => {},
        pagination: {},
    };

    render() {
        const {
            data,
            onSelect,
            onSelectAll,
            onPaginate,
            pagination,
            onDelete,
            onEdit,
        } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "shortCode",
                width: 120,
                fixed: "left",
            },
            {
                title: "Tên nghệ sĩ",
                dataIndex: "fullName",
                render: (text, record) => (
                    <Link to={record.link}>
                        {text} {record.isComposer ? <RiStarSLine /> : null}
                    </Link>
                ),
            },
            {
                title: "Chức danh",
                dataIndex: "isComposer",
                render: (value) =>
                    value ? (
                        <Tag color="green">Ca sĩ - Nhạc sĩ</Tag>
                    ) : (
                        <Tag color="green">Ca sĩ</Tag>
                    ),
            },
            {
                title: "Ảnh đại diện",
                dataIndex: "thumbnail",
                render: (thumbnail, record) => (
                    <img
                        width="50"
                        height="50"
                        alt="Ảnh bìa"
                        src={getCDN(thumbnail)}
                    />
                ),
            },
            {
                title: "Ảnh bìa",
                dataIndex: "cover",
                render: (cover, record) => (
                    <img
                        width="50"
                        height="50"
                        alt="Ảnh bìa"
                        src={getCDN(cover)}
                    />
                ),
            },
            {
                title: "Ngày tạo",
                dataIndex: "createdAt",
                render: (time) => moment(time).format("DD/MM/YYYY HH:mm"),
            },
            {
                title: "Ngày cập nhật",
                dataIndex: "updatedAt",
                render: (time) => moment(time).format("DD/MM/YYYY HH:mm"),
            },
            {
                title: "Hành động",
                fixed: "right",
                width: 100,
                render: (text, record) => (
                    <>
                        <Ability roles={[PERMISSION_CODE.UPDATE]}>
                            <Button
                                type="link"
                                icon={<FiEdit3 />}
                                onClick={(e) => onEdit(e, record)}
                            />
                        </Ability>
                        <Ability roles={[PERMISSION_CODE.DELETE]}>
                            <Popconfirm
                                title="Xác nhận xoá thể loại này?"
                                placement="topLeft"
                                okText="Xoá"
                                cancelText="Huỷ"
                                okType="danger"
                                icon={
                                    <QuestionCircleOutlined
                                        style={{ color: "red" }}
                                    />
                                }
                                onConfirm={(e) => onDelete(e, record)}
                            >
                                <Button type="link" danger icon={<FiTrash />} />
                            </Popconfirm>
                        </Ability>
                    </>
                ),
            },
        ];
        return (
            <Table
                size="small"
                rowSelection={{
                    type: "checkbox",
                    onSelect: onSelect,
                    onSelectAll: onSelectAll,
                }}
                locale={{
                    emptyText: "Không có bản ghi nào",
                }}
                pagination={{
                    ...pagination,
                    size: "default",
                    showTotal: (total, range) => <span>Tổng: {total}</span>,
                    onChange: onPaginate,
                }}
                style={{ textAlign: "center" }}
                columns={columns}
                dataSource={data}
            />
        );
    }
}
