import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Drawer,
    Form,
    Input,
    Upload,
    Spin,
    Select,
    Button,
    Popconfirm,
    notification,
    Checkbox
} from 'antd';
import styles from './index.module.scss';
import {MEDIA_TYPE, SONG_STATUS} from 'constants/global';
import {LoadingOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {uploadMedia} from 'services/media';
import {updateSong} from 'services/song';
import {deleteSongLyric, updateSongLyric} from 'services/lyric';
import {getCDN} from 'utils';
import { FiTrash, FiUpload } from 'react-icons/fi';

export default class Edit extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        editData: PropTypes.object.isRequired,
        artists: PropTypes.array,
        categories: PropTypes.array,
        onSuccess: PropTypes.func,
        onClose: PropTypes.func
    }

    static defaultProps = {
        visible: false,
        artists: [],
        categories: [],
        onSuccess: () => {},
        onClose: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            thumbnail: "",
            thumbnailMedium: "",
            thumbnailData: "",
            isUploadThumbnail: false,
            fields: [],
            medias: [],
            lyrics: []
        }
    }

    handleUploadFile = async ({
        file,
        onSuccess,
        onError,
        onProgress
    }, isThumbnail = false) => {
        try {
            let {medias} = this.state;
            if (isThumbnail) {
                medias = medias.filter((obj) => obj.media.mediaType !== MEDIA_TYPE.IMAGE);
                this.setState({isUploadThumbnail: true, medias, thumbnailData: ""});
            }
            const result = await uploadMedia(file, (e) => {
                onProgress({
                    percent: Math.ceil(e.loaded / e.total) * 100
                })
            });
            if (result.data.mediaType === MEDIA_TYPE.IMAGE) {
                if (isThumbnail) {
                    let frd = new FileReader();
                    frd.onload = ({target}) => {
                        this.setState({thumbnailData: target.result, thumbnailMedium: result.data.filePath, thumbnail: result.data.minimizePath});
                    }
                    frd.readAsDataURL(file);
                }
            }
            medias.push({uid: file.uid, media: result.data});
            this.setState({
                medias,
                isUploadThumbnail: false
            }, () => onSuccess());
        } catch (e) {
            if (isThumbnail) {
                this.setState({isUploadThumbnail: false});
            }
            onError(e);
        }
    }

    handleRemoveFile = (file) => {
        let {medias} = this.state;
        medias = medias.filter((media) => media.uid !== file.uid);
        this.setState({medias});
    }

    handleSubmit = async ({
        title,
        isOfficial,
        lyrics,
        zone,
        status,
        categories,
        artists
    }) => {
        const {medias, thumbnail, thumbnailMedium} = this.state;
        const {onSuccess, onClose, editData} = this.props;
        try {
            if (!thumbnail) {
                notification.error({message: "Vui lòng tải lên ảnh bìa!"});
                return;
            }
            if(!title){
                this.form.submit();
                return;
            }
            let data = {
                title,
                isOfficial,
                lyrics: lyrics.filter((obj, index) => index >= this.state.lyrics.length),
                zone,
                status,
                categories,
                artists,
                thumbnail,
                thumbnailMedium,
                mediaIds: medias
                    .filter((media) => media.media.mediaType !== MEDIA_TYPE.IMAGE)
                    .map((media) => media.media._id)
            }
            const result = await updateSong(editData._id, data);
            await Promise.all(this.state.lyrics.map((lyric, index) => {
                return updateSongLyric(lyric._id, lyrics[index]);
            }));
            notification.success({message: "Lưu thông tin thành công"});
            onSuccess(result.data);
            onClose();
        } catch (e) {
            notification.error({message: e.message});
        }
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (snapshot.isEdit) {
            let fields = [];
            let initData = {
                title: snapshot.editData.title,
                isOfficial: snapshot.editData.isOfficial,
                lyrics: snapshot
                    .editData
                    .lyrics
                    .map((obj) => obj.content),
                zone: snapshot.editData.zone,
                status: snapshot.editData.status,
                categories: snapshot
                    .editData
                    .categories
                    .map((obj) => obj._id),
                artists: snapshot
                    .editData
                    .artists
                    .map((obj) => obj._id)
            }
            Object.keys(initData).map((key) => {
                return fields.push({name: [key], value: initData[key]});
            });
            this.setState({
                thumbnail: snapshot.editData.thumbnail,
                thumbnailMedium: snapshot.editData.thumbnailMedium,
                thumbnailData: getCDN(snapshot.editData.thumbnail),
                fields: fields,
                lyrics: snapshot.editData.lyrics,
                medias: []
            });
        }
    }

    getSnapshotBeforeUpdate = (prevProps) => {
        return {
            isEdit: prevProps.editData !== this.props.editData && !!Object.keys(this.props.editData).length,
            editData: this.props.editData
        };
    }

    handleRemoveLyric = async (index) => {
        let {lyrics} = this.state;
        try {
            if (lyrics[index]) {
                await deleteSongLyric(lyrics[index]._id);
                lyrics.splice(index, 1);
                this.setState({lyrics});
            }
        } catch (e) {
            //
        }
    }

    CustomFooter = () => {
        const {onClose} = this.props;
        return (
            <div style={{
                    textAlign: 'right'
                }}>
                <Button
                    onClick={onClose}
                    style={{
                        float: "left"
                    }}>
                    Đóng
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                    Lưu thay đổi
                </Button>
            </div>
        )
    }

    render() {
        const {thumbnailData, isUploadThumbnail, fields} = this.state;
        const {visible, onClose, artists, categories} = this.props;
        return (
            <div>
                <Drawer
                    title="Sửa bài hát"
                    width={720}
                    placement="right"
                    closable={true}
                    maskClosable={false}
                    onClose={onClose}
                    visible={visible}
                    footer={this.CustomFooter()}>
                    <div className={styles.form}>
                        <Upload
                            accept="image/*"
                            name="file"
                            listType="picture-card"
                            className={styles.thumbnail}
                            showUploadList={false}
                            customRequest={(e) => this.handleUploadFile(e, true)}
                            onChange={this.handleChange}>
                            {
                                thumbnailData
                                    ? <img
                                            src={thumbnailData}
                                            alt="Ảnh bìa"
                                            style={{
                                                width: '100%'
                                            }}/>
                                    : <div>
                                            {
                                                isUploadThumbnail
                                                    ? <Spin
                                                            indicator={<LoadingOutlined size = {
                                                                32
                                                            } />
}/>
                                                    : <FiUpload size={32}/>
                                            }
                                        </div>
                            }
                        </Upload>
                        <Form
                            ref={(el) => this.form = el}
                            onFinish={this.handleSubmit}
                            layout="vertical"
                            fields={fields}
                            style={{
                                flex: 1,
                                marginLeft: 10
                            }}>
                            <Form.Item
                                name="title"
                                label="Tên bài hát"
                                rules={[{
                                        required: true,
                                        message: "Vui lòng nhập tên bài hát"
                                    }
                                ]}>
                                <Input placeholder="Nhập tên bài hát"/>
                            </Form.Item>
                            <Form.Item name="isOfficial" valuePropName="checked">
                                <Checkbox>MV</Checkbox>
                            </Form.Item>
                            <Form.Item name="zone" label="Chế độ riêng tư">
                                <Select placeholder="Chọn chế độ">
                                    <Select.Option value="public">Không</Select.Option>
                                    <Select.Option value="private">Cá nhân</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="status" label="Trạng thái">
                                <Select placeholder="Chọn trạng thái">
                                    <Select.Option value={SONG_STATUS.ACTIVE}>Đang hoạt động</Select.Option>
                                    <Select.Option value={SONG_STATUS.PRIVATE}>Riêng tư</Select.Option>
                                    <Select.Option value={SONG_STATUS.PENDING}>Chờ duyệt</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Form.Item
                                    name="artists"
                                    label="Nghệ sĩ"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 8px)'
                                    }}>
                                    <Select mode="multiple" placeholder="Chọn nghệ sĩ">
                                        {
                                            artists.map(
                                                (artist, key) => (<Select.Option key={key} value={artist._id}>{artist.fullName}</Select.Option>)
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Thể loại"
                                    name="categories"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 8px)',
                                        marginLeft: 16
                                    }}>
                                    <Select mode="multiple" placeholder="Chọn thể loại">
                                        {
                                            categories.map(
                                                (category, key) => (<Select.Option key={key} value={category._id}>{category.title}</Select.Option>)
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                            </Form.Item>
                            <Form.List name="lyrics">
                                {
                                    (fields, {add, remove}) => (
                                        <> {
                                            fields.map((field, key) => (
                                                <Form.Item key={key} label="Lời bài hát">
                                                    <Form.Item
                                                        {...field}
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 'calc(100% - 30px)'
                                                        }}>
                                                        <Input.TextArea/>
                                                    </Form.Item>
                                                    <Popconfirm
                                                        title="Xác nhận xoá lời bài hát này"
                                                        okText="Xoá"
                                                        placement="topRight"
                                                        okType="danger"
                                                        cancelText="Huỷ"
                                                        icon={<QuestionCircleOutlined style = {{ color: 'red' }}/>}
                                                        onConfirm={() => {
                                                            remove(field.name);
                                                            this.handleRemoveLyric(key);
                                                        }}>
                                                        <Button
                                                            danger="danger"
                                                            icon={<FiTrash/>}
                                                            style={{
                                                                border: 0,
                                                                width: 30,
                                                                height: 20
                                                            }}></Button>
                                                    </Popconfirm>
                                                </Form.Item>
                                            ))
                                        } < Form.Item > <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            style={{
                                                width: '50%'
                                            }}>
                                            <PlusOutlined/>
                                            Thêm lời bài hát
                                        </Button>
                                    </Form.Item>
                                </>
                                    )
                                }
                            </Form.List>
                        </Form>
                    </div>
                </Drawer>
            </div>
        )
    }
}
