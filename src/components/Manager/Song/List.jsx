import React, {Component} from 'react'
import {Table, Tag, Button, Popconfirm} from 'antd';
import PropTypes from 'prop-types';
import { FiTrash, FiEdit3 } from 'react-icons/fi';
import { getCDN } from 'utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SONG_STATUS, PERMISSION_CODE } from 'constants/global';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Ability from 'containers/Ability';

export default class ListSong extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onSelect: PropTypes.func,
        onSelectAll: PropTypes.func,
        onPaginate: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        pagination: PropTypes.object.isRequired
    }

    static defaultProps = {
        data: [],
        onSelect: () => {},
        onSelectAll: () => {},
        onPaginate: () => {},
        onDelete: () => {},
        onEdit: () => {},
        pagination: {}
    }


    getStatus = (status) => {
        switch(parseInt(status)){
            case SONG_STATUS.ACTIVE:
                return <Tag color="green">Đang hoạt động</Tag>;
            case SONG_STATUS.PRIVATE:
                return <Tag color="red">Riêng tư</Tag>;
            case SONG_STATUS.PENDING:
                return <Tag color="orange">Chờ duyệt</Tag>;
            default:
                return "";
        }
    }

    render() {
        const {data, onSelect, onSelectAll, onPaginate, pagination, onDelete, onEdit} = this.props;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'shortCode',
                fixed: "left"
            },
            {
                title: 'Tên bài hát',
                width: 250,
                dataIndex: 'title',
                render: (text, record) => <a href={record.link}>{text}</a>
            },
            {
                title: 'Ảnh bìa',
                dataIndex: 'thumbnail',
                render: (thumbnail, record) => <img width="50" height="50" alt="Ảnh bìa" src={getCDN(thumbnail)} />
            },
            {
                title: 'Loại',
                dataIndex: 'isOfficial',
                render: (value, record) => (
                    <>
                        <Tag color="green" key={0}><a href={record.link}>MP3</a></Tag>
                        {value ? <Tag color="geekblue" key={1}><a href={record.mvLink}>MV</a></Tag> : null}
                    </>
                )
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                render: (status) => this.getStatus(status)
            },
            {
                title: 'Zone',
                dataIndex: 'zone'
            },
            {
                title: 'Nghệ sĩ',
                dataIndex: 'artists',
                render: (artists) => artists.map((obj, index) => <React.Fragment key={index}><Link to={`/nghe-si/${obj.shortCode}.html`}>{obj.fullName}</Link>, </React.Fragment>)
            },
            {
                title: 'Danh mục',
                dataIndex: 'categories',
                render: (categories) => categories.map((obj, index) => <React.Fragment key={index}><Link to={`/the-loai/${obj.shortCode}.html`}>{obj.title}</Link>, </React.Fragment>)
            },
            {
                title: 'Lượt thích',
                dataIndex: 'like'
            },
            {
                title: 'Bình luận',
                dataIndex: 'comment'
            },
            {
                title: 'Lượt nghe',
                dataIndex: 'listen'
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                render: (time) => moment(time).format('DD/MM/YYYY HH:mm')
            },
            {
                title: 'Ngày cập nhật',
                dataIndex: 'updatedAt',
                render: (time) => moment(time).format('DD/MM/YYYY HH:mm')
            },
            {
                title: 'Hành động',
                fixed: "right",
                width: 100,
                render: (text, record) => (
                    <>
                        <Ability roles={[PERMISSION_CODE.UPDATE]}>
                            <Button type="link" icon={<FiEdit3/>} onClick={(e) => onEdit(e, record)}/>
                        </Ability>
                        <Ability roles={[PERMISSION_CODE.DELETE]}>
                            <Popconfirm title="Xác nhận xoá bài hát này?" placement="topLeft" okText="Xoá" cancelText="Huỷ" okType="danger" icon={<QuestionCircleOutlined style = {{ color: 'red' }}/>} onConfirm={(e) => onDelete(e, record)}>
                                <Button type="link" danger icon={<FiTrash/>}/>
                            </Popconfirm>
                        </Ability>
                    </>
                )
            }
        ];
        return (
            <Table
                size="small"
                scroll={{x: "100vw"}}
                rowSelection={{
                    type: "checkbox",
                    onSelect: onSelect,
                    onSelectAll: onSelectAll
                }}
                locale={{
                    emptyText: "Không có bản ghi nào"
                }}
                pagination={{
                    ...pagination,
                    showTotal: (total, range) => <span>Tổng: {total}</span>,
                    onChange: onPaginate
                }}
                style={{textAlign: "center"}}
                columns={columns}
                dataSource={data}/>
        )
    }
}
