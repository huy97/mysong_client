import React, {Component} from 'react'
import {
    Card,
    Button,
    notification,
    Form,
    Select,
    Input,
    Space
} from 'antd'
import {SONG_STATUS, PERMISSION_CODE} from 'constants/global';
import {fetchListSong, deleteSong} from 'services/song';
import {FiPlus} from 'react-icons/fi';
import {fetchListArtist} from 'services/artist';
import {fetchListCategory} from 'services/category';
import {getSkip} from 'utils';
import {fetchSongLyric} from 'services/lyric';
import Ability from 'containers/Ability';

const List = React.lazy(() => import('components/Manager/Song/List'));
const Create = React.lazy(() => import('components/Manager/Song/Create'));
const Edit = React.lazy(() => import('components/Manager/Song/Edit'));

export default class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: SONG_STATUS.ACTIVE,
            isOfficial: "",
            keyword: "",
            showCreate: false,
            showEdit: false,
            editData: {},
            artists: [],
            categories: [],
            pagination: {
                skip: 0,
                current: 1,
                pageSize: 100,
                total: 0
            },
            data: []
        }
    }

    componentDidMount() {
        this.fetchListSong();
        this.fetchListArtist();
        this.fetchListCategory();
    }

    fetchListSong = async () => {
        const {status, isOfficial, keyword, pagination} = this.state;
        try {
            const result = await fetchListSong(
                status,
                isOfficial,
                keyword,
                pagination.skip,
                pagination.pageSize
            );
            let data = result.data.map((obj, index) => {
                    return {
                        key: index,
                        ...obj
                    }
                });
            pagination.total = result.total;
            this.setState({data: data, pagination});
        } catch (e) {
            //
        }
    }

    fetchListArtist = async () => {
        try {
            const result = await fetchListArtist();
            this.setState({artists: result.data});
        } catch (e) {
            //
        }
    }

    fetchListCategory = async () => {
        try {
            const result = await fetchListCategory();
            this.setState({categories: result.data})
        } catch (e) {
            //
        }
    }

    handleToggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        });
    }

    handleCreateSuccess = (item) => {
        let {data} = this.state;
        data = [
            {
                key: data.length,
                ...item
            },
            ...data
        ];
        this.setState({data});
    }

    handlePaginate = (e) => {
        const {pagination} = this.state;
        pagination.skip = getSkip(e, pagination.pageSize);
        pagination.current = e;
        this.setState({pagination});
        this.fetchListSong();
    }

    handleToggleEdit = async (e, item) => {
        try {
            let editData = item;
            if (item) {
                let lyricResult = await fetchSongLyric(item._id);
                editData.lyrics = lyricResult.data;
                this.setState({
                    editData,
                    showEdit: !this.state.showEdit
                });
            } else {
                this.setState({
                    editData: {},
                    showEdit: !this.state.showEdit
                });
            }
        } catch (e) {
            this.setState({
                editData: {},
                showEdit: !this.state.showEdit
            });
        }
    }

    handleUpdateSuccess = (item) => {
        let {data} = this.state;
        let index = data.findIndex((obj) => obj._id === item._id);
        if (index !== -1) {
            data[index] = {
                key: data[index].key,
                ...item
            };
            this.setState({
                data: [...data]
            });
        }
    }

    handleDelete = async (e, item) => {
        let {data} = this.state;
        try {
            await deleteSong(item._id);
            let index = data.findIndex((obj) => obj._id === item._id);
            if (index !== -1) {
                data.splice(index, 1);
                this.setState({
                    data: [...data]
                });
            }
        } catch (e) {
            notification.error({message: e.message});
        }
    }

    handleSearch = ({isOfficial, status, keyword}) => {
        this.setState({
            isOfficial,
            status,
            keyword
        });
        this.fetchListSong();
    }

    render() {
        const {
            data,
            showCreate,
            showEdit,
            editData,
            artists,
            categories,
            pagination
        } = this.state;
        return (
            <Space direction="vertical" style={{width: "100%", display: "flex"}}>
                <Card title="Tìm kiếm" bordered={false}>
                    <Form
                        initialValues={{
                            status: SONG_STATUS.ACTIVE,
                            isOfficial: "",
                            keyword: ""
                        }}
                        onFinish={this.handleSearch}
                        layout="inline">
                        <Form.Item name="isOfficial" label="Loại">
                            <Select>
                                <Select.Option value="">Tất cả</Select.Option>
                                <Select.Option value="0">MP3</Select.Option>
                                <Select.Option value="1">MV</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="status" label="Trạng thái">
                            <Select>
                                <Select.Option value="">Tất cả</Select.Option>
                                <Select.Option value={SONG_STATUS.ACTIVE}>Đang hoạt động</Select.Option>
                                <Select.Option value={SONG_STATUS.PENDING}>Chờ duyệt</Select.Option>
                                <Select.Option value={SONG_STATUS.PRIVATE}>Riêng tư</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="keyword" label="Từ khoá">
                            <Input placeholder="Nhập tên bài hát, ca sĩ"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" title="Tìm kiếm">Tìm kiếm</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card
                    title="Danh sách bài hát"
                    bordered={false}
                    extra={
                        <Ability roles={[PERMISSION_CODE.CREATE]}>
                            <Button type="primary"
                                icon={<FiPlus className="menu-icon"/>}
                                onClick ={this.handleToggleCreate}>Thêm mới</Button>
                        </Ability>}>
                    <List
                        data={data}
                        pagination={pagination}
                        onPaginate={this.handlePaginate}
                        onEdit={this.handleToggleEdit}
                        onDelete={this.handleDelete}/>
                    <Create
                        visible={showCreate}
                        onClose={this.handleToggleCreate}
                        onSuccess={this.handleCreateSuccess}
                        artists={artists}
                        categories={categories}/>
                    <Edit
                        visible={showEdit}
                        onClose={this.handleToggleEdit}
                        onSuccess={this.handleUpdateSuccess}
                        artists={artists}
                        categories={categories}
                        editData={editData}/>
                </Card>
            </Space>
        )
    }
}
