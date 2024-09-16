import '../styles.scss'
import imageDefaultDocument from '@/assets/images/document/image-default.png'
import IconEditDocument from '@/assets/images/icons/duotone/pencil.svg'
import Close from '@/assets/images/icons/duotone/xmark.svg'
import { Tooltip } from 'antd'
import { setInfoDocument } from '@/states/modules/document'
import { useDispatch, useSelector } from 'react-redux'
import Handle from '@/pages/Document/handle'
import InlineSVG from 'react-inlinesvg'

function PicturesDocument({ type, dataImage }) {
    const dispatch = useDispatch()
    const infoDocument = useSelector((state) => state.document.infoDocument)
    const {
        handleChangePicturesDocument
    } = Handle()

    return (
        <>
            <div className={`flex relative ml-2 mr-5`} >
                <input
                    id={type}
                    type="file"
                    accept="image/*"
                    className={`hidden`}
                    onChange={(file) => handleChangePicturesDocument(file, type)}
                />
                <Tooltip title="Chỉnh sửa ảnh phòng">
                    <label
                        className={`icon-img-document icon-edit-img-document`}
                        htmlFor={type}
                    >
                        <InlineSVG src={IconEditDocument} alt="" className={`icon-action`} />
                    </label>
                </Tooltip>
                <Tooltip title="Xóa ảnh phòng">
                    <div
                        className={`icon-img-document icon-remove-img-document`}
                        onClick={() => dispatch(setInfoDocument({ ...infoDocument, [`${type}Url`]: '', [`${type}`]: '' }))}
                    >
                        <InlineSVG src={Close} alt="" className={`icon-action`} />
                    </div>
                </Tooltip>
                <div className={``}>
                    <img
                        src={dataImage ? dataImage : imageDefaultDocument}
                        crossOrigin="anonymous"
                        alt="img-document"
                        className={`img-avt-document`}
                    />
                </div>
            </div>
        </>
    )
}

export default PicturesDocument