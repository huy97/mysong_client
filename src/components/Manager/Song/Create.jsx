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
import Dragger from 'antd/lib/upload/Dragger';
import styles from './index.module.scss';
import {MEDIA_TYPE} from 'constants/global';
import {LoadingOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {uploadMedia} from 'services/media';
import {createSong} from 'services/song';
import { FiTrash, FiUpload } from 'react-icons/fi';

export default class Create extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
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
            fileList: [],
            medias: []
        }
    }

    handleUploadFile = async ({
        file,
        onSuccess,
        onError,
        onProgress
    }, isThumbnail = false) => {
        try {
            let {medias, fileList} = this.state;
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
            }else{
                fileList.push(file);
            }
            medias.push({uid: file.uid, media: result.data, fileList});
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
        let {medias, fileList} = this.state;
        fileList = fileList.filter((media) => media.uid !== file.uid);
        medias = medias.filter((media) => media.uid !== file.uid);
        this.setState({medias, fileList});
    }

    handleSubmit = async ({
        title,
        isOfficial,
        lyrics,
        zone,
        categories,
        artists
    }) => {
        const {medias, thumbnail, thumbnailMedium} = this.state;
        const {onSuccess} = this.props;
        try {
            if (!medias.length) {
                notification.error({message: "Vui lòng tải lên tệp media!"});
                return;
            }
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
                lyrics,
                zone,
                categories,
                artists,
                thumbnail,
                thumbnailMedium,
                mediaIds: medias.filter((media) => media.media.mediaType !== MEDIA_TYPE.IMAGE).map((media) => media.media._id)
            }
            const result = await createSong(data);
            notification.success({
                message: "Tạo bài hát thành công"
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
            notification.error({message: e.message});
        }
    }

    handleClose = () => {
        const {onClose} = this.props;
        this.setState({
            thumbnail: "",
            thumbnailData: "",
            fileList: [],
            medias: []
        });
        onClose();
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
                    Tạo bài hát
                </Button>
            </div>
        )
    }

    render() {
        const {thumbnailData, medias, isUploadThumbnail, fileList} = this.state;
        const {visible, artists, categories} = this.props;
        return (
            <div>
                <Drawer
                    title="Thêm bài hát"
                    width={720}
                    placement="right"
                    closable={true}
                    maskClosable={false}
                    onClose={this.handleClose}
                    visible={visible}
                    footer={this.CustomFooter()}>
                    <Dragger
                        name="file"
                        accept="audio/*,video/*"
                        fileList={fileList}
                        multiple={true}
                        customRequest={this.handleUploadFile}
                        onRemove={this.handleRemoveFile}
                        height={150}>
                        <p className="ant-upload-drag-icon">
                            <FiUpload style={{fontSize: "48px"}}/>
                        </p>
                        <p className="ant-upload-text">Kéo thả tệp hoặc bấm vào đây để tải lên</p>
                    </Dragger>
                    {
                        medias.length
                            ? <div className={styles.form}>
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
                                        hideRequiredMark="hideRequiredMark"
                                        initialValues={{
                                            title: "",
                                            isOfficial: false,
                                            lyrics: [],
                                            zone: "public",
                                            categories: [],
                                            artists: []
                                        }}
                                        fields={[]}
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
                                                                    onConfirm={() => remove(field.name)}>
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
                            : null
                    }
                </Drawer>
            </div>
        )
    }
}
