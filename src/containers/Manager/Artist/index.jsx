import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Space, Card, Button, notification} from 'antd';
import {FiPlus} from 'react-icons/fi';
import {getSkip} from 'utils';
import Ability from 'containers/Ability';
import { PERMISSION_CODE } from 'constants/global';
import { fetchListArtist, deleteArtist } from 'services/artist';

const List = React.lazy(() => import ('components/Manager/Artist/List'));
const Create = React.lazy(() => import ('components/Manager/Artist/Create'));
const Edit = React.lazy(() => import ('components/Manager/Artist/Edit'));

export class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showCreate: false,
            showEdit: false,
            editData: {},
            pagination: {
                skip: 0,
                current: 1,
                pageSize: 100,
                total: 0
            }
        }
    }
    componentDidMount() {
        this.fetchListArtist();
    }

    fetchListArtist = async () => {
        try {
            const result = await fetchListArtist();
            let data = result.data.map((obj, index) => {
                return {
                    key: index,
                    ...obj,
                }
            })
            this.setState({data})
        } catch (e) {
            //
        }
    }

    handlePaginate = (e) => {
        const {pagination} = this.state;
        pagination.skip = getSkip(e, pagination.pageSize);
        pagination.current = e;
        this.setState({pagination});
        this.fetchListArtist();
    }

    handleToggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleCreateSuccess = (item) => {
        let {data} = this.state;
        data.unshift({
            key: data.length,
            ...item
        });
        this.setState({data: [...data]});
    }

    handleDelete = async (e, item) => {
        let {data} = this.state;
        try {
            await deleteArtist(item._id);
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

    handleToggleEdit = (e, item) => {
        this.setState({
            showEdit: !this.state.showEdit,
            editData: item || {}
        });
    }

    handleEditSuccess = (item) => {
        let {data} = this.state;
        let index = data.findIndex((obj) => obj._id === item._id);
        if(index !== -1){
            data[index] = {
                key: index,
                ...item
            }
            this.setState({data: [...data]});
        }
    }

    render() {
        const {data, pagination, showCreate, showEdit, editData} = this.state;
        return (
            <Space
                direction={"vertical"}
                style={{
                    width: "100%",
                    display: "flex"
                }}>
                <Card
                    title="Danh sách thể loại"
                    bordered={false}
                    extra={
                        <Ability roles={[PERMISSION_CODE.CREATE]}>
                            <Button type="primary" icon={<FiPlus className="menu-icon"/>}
                                onClick={this.handleToggleCreate} >Thêm mới</Button>
                        </Ability>
                    }>
                    <List data={data} pagination={pagination} onPaginate={this.handlePaginate} onDelete={this.handleDelete} onEdit={this.handleToggleEdit} />
                    <Create visible={showCreate} onSuccess={this.handleCreateSuccess} onClose={this.handleToggleCreate} />
                    <Edit visible={showEdit} editData={editData} onSuccess={this.handleEditSuccess} onClose={this.handleToggleEdit}/>
                </Card>
            </Space>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
