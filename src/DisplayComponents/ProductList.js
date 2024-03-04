import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Cart from "./Cart";
function ProductList() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartB, setCartB] = useState("Add to Cart");
    const navigate = useNavigate();

    let toCart = ()=>{
        navigate("/Cart")
    }
    // Below code will fetch products from backend using API and then upload them in the products hook
    useEffect(() => {
        fetch('http://localhost:5000/get-products')
            .then(response => response.json())
            .then(data => setProducts(data.product_list))
            .catch(error => console.error("Error fetching product data", error));
    }, []);

    // Below fuction get's called everytime Add to cart button is clicked and then state of
    // cart hook is changed by adding a product into it(P.S "...cart" is used to bring in the previous state of hook so everytime it is updated previously saved items doesn't get lost)
    const updateCart = (productId) => {
        const product = products.find(p => p.product_id === productId);

        // Check if the product is already in the cart
        if (!cart.some(item => item.urli === product.urli)) {
            setCart([...cart, product]);

            // Update the button text and disable the button
            setProducts(prevProducts => {
                return prevProducts.map(p => (p.product_id === productId ? { ...p, addedToCart: true } : p));
            });
            setCartB("ADDED");
        }
    }
    const onRemove = (product_id) => {
        const updatedCart = cart.filter(item => item.product_id !== product_id);
        setCart(updatedCart);

        // Update the button text and enable the button
        setProducts(prevProducts => {
            return prevProducts.map(p => (p.product_id === product_id ? { ...p, addedToCart: false } : p));
        });
        setCartB("Add to Cart");
    };
    useEffect(() => {
        // Check if the product is in the cart, and update the button text accordingly
        if (products.some(product => cart.some(item => item.urli === product.urli))) {
            setCartB("ADDED");
        } else {
            setCartB("Add to Cart");
        }
    }, [cart, products]);

    return (
        <>
            <h2>Product List</h2>
            <div className="card-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product</th>
                        <th scope="col">To Cart</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.product_id}>
                                <th scope="row">{product.product_id}</th>
                                <td>{product.product_name}</td>
                                <td>{product.product_price}</td>
                                <td>
                                    <img
                                        src={product.urli}
                                        alt={product.product_name}
                                        style={{width: '50px', height: '50px'}}
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-success"
                                        onClick={() => updateCart(product.product_id)}
                                    >
                                        {product.addedToCart ? 'ADDED' : 'Add to Cart'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <div className="container d-flex justify-content-center align-items-center">
                        <a className="navbar-brand" href="#">
                            <img
                                src="https://png.pngtree.com/element_our/20190531/ourmid/pngtree-shopping-cart-convenient-icon-image_1287807.jpg"
                                alt="Logo" width="30" height="24"
                                className="d-inline-block align-text-top"/>
                            Your Cart
                        </a>
                    </div>
                </div>
            </nav>
            {cart.length > 0 ? (
                <Cart cartData={cart} onRemove={onRemove} />
            ) : (
                <>
                    <p>Your Cart will be shown here</p>
                    <div className="container mx-4">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                </>
            )}

        </>

    );
}

export default ProductList;



