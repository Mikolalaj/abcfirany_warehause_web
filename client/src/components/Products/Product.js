

function Product({product_id, symbol, img, sale, comments}) {

    return (
    <div key={product_id} className='product'>
        <img src={img} alt={symbol} />
        <h1>{symbol}</h1>
        <p>{comments}</p>
        <p>{sale}</p>
    </div>
    );
}

export default Product;
