import React, {useEffect, useState} from 'react';
import Payment from "./Payment";

function Cart(props) {
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState(props.cartData);
    const [confirmedOrder, setConfirmedOrder] = useState(false);

    const handleAmount = (productId, e) => {
        if (e && e.target) {
            const value = parseFloat(e.target.value);
            setAmount(value);
            setData(prevData => prevData.map(item => item.product_id === productId ? {...item, amount: value} : item));
        }
    };

    let capitalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    useEffect(() => {
        setData(props.cartData);
    }, [props.cartData]);

    const onRemove = (product_id) => {
        setData((prevData) => prevData.filter((item) => item.product_id !== product_id));
        props.onRemove(product_id);
    };

    // Function to handle the order confirmation
    const handleOrder = () => {
        setConfirmedOrder(true);
    };
    return (<>
        <div className="container">
            Cart
            <div
                className="container my-4 mx-6"
                style={{display: 'flex', flexWrap: 'wrap',}}>
                {data.map((item) => (<div key={item.product_id} className="card" style={{
                    flex: '0 0 16.666%', marginBottom: '20px', marginLeft: '30px', maxWidth: '18rem',
                }}
                >
                    <img
                        src={item.urli}
                        className="card-img-top"
                        alt={capitalize(item.product_name)}
                        width="200px"
                        height="200px"
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {capitalize(item.product_name)}
                        </h5>
                        <p className="card-text">
                            Price: ${item.product_price}/Kg
                        </p>
                        <label
                            htmlFor={`customRange_${item.product_id}`}
                            className="form-label"
                        >
                            Please Select amount:
                        </label>
                        <input type="range" className="form-range" min="0" max="10" step="0.5"
                               id={`customRange_${item.product_id}`} value={item.amount || 0}
                               onChange={(e) => handleAmount(item.product_id, e)}/>
                        <button type="button" className="btn btn-danger"
                                onClick={() => onRemove(item.product_id)}>
                            Remove-Item
                        </button>
                        <p>Amount: {item.amount || 0}Kg</p>
                    </div>
                </div>))}
            </div>
            {/* Confirm order button */}
            {confirmedOrder ? <Payment sendData={data}/> :
                <div className="d-grid gap-1" style={{marginBottom: '20px'}}>
                    <button className="btn btn-success" type="button" onClick={handleOrder}>
                        Confirm Order and Proceed for Payment
                    </button>
                </div>}

        </div>

    </>);
}

export default Cart;