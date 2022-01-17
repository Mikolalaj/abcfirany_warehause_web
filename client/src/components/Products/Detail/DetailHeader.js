import './DetailHeader.css'
import { IoMdPricetag } from 'react-icons/io';

function DetailHeader({ symbol, comments, sale, img }) {
    return (
        <div className="detail-header">
            <img src={img} alt={symbol} />
            <div className="detail-description">
                <h1>{symbol}</h1>
                {sale && <p className="sale"><IoMdPricetag/>Wyprzedaż</p>}
                <p>{comments}</p>
            </div>
        </div>
    )
}

export default DetailHeader;