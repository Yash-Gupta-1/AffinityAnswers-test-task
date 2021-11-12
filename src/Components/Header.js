import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../StyleSheet/Header.css'
import { Avatar, Badge, Button } from '@mui/material'
import { Close, ShoppingCart } from '@mui/icons-material'

export const getCartProducts = async () => {
    const data = localStorage.getItem('cartItems')
    if (data) {
        return JSON.parse(data)
    } else {
        return []
    }
}

const Header = () => {
    const [products, setProducts] = useState([])



    const CartProducts = async () => {
        if (products) {
            await getCartProducts().then((res) => {
                setProducts(res)
            })
        }
    }
    const [quantity, setQuantity] = useState(1)


    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(quantity - 1)
    }

    const removeItem = (id) => {
        let data = JSON.parse(localStorage.getItem("cartItems"))
        console.log('data', data);

        let index = products.findIndex(element => element.data.id === id)
        if (index > -1) {
            data.splice(index, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(data))
        getCartProducts()
    }

    useEffect(() => {

        CartProducts()

    }, [CartProducts])

    return (
        <header className="header">
            <div className="headerLeft">
                <div className="logo">
                    <Link to="/">
                        <h2>
                            <em>BlablaCart</em>
                        </h2>
                    </Link>
                </div>

            </div>

            <div className="headerRight rowDis">
                <div className="cart">
                    <Badge anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }} className='badge' badgeContent={products && products.length} color="primary">
                        <Button className="rowDis" style={{ color: "white" }}>
                            Cart
                            <ShoppingCart className="mx-1" />
                        </Button>
                    </Badge>
                    <div className="HoverContainer">
                        {/* <span className="squareBox"></span> */}
                        {

                            products &&
                                products.length !== 0 ? (
                                <>
                                    <div className="">
                                        <p>{products.length} items </p>
                                        {/* <Link to="/cart" className="link">
                                            <Button>View Cart</Button>
                                        </Link> */}
                                    </div>

                                    <div className="cartHoverItems">
                                        {
                                            products.length > 0 && (
                                                products
                                                    .map((item, index) => (
                                                        <>
                                                            <div key={index} className="cartHoverItem border-bottom">
                                                                <div className="rowDis">
                                                                    <div className="cartItemImage">
                                                                        <div className="cartRemove" onClick={() => removeItem(item.data.id)}>
                                                                            <Close />
                                                                        </div>
                                                                        <Link target="_blank" to="#">
                                                                            <img src={item.data.image} alt="cart" width={50} />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="">
                                                                        <p className="ellipsis">{item.data.title}</p>
                                                                        {/* <p style={{ color: 'red' }}><b> {item.price.toFixed(0)}</b></p> */}

                                                                        <div className="rowDis quantity">
                                                                            <h5>Quantity</h5>
                                                                            <div className='rowDis'>
                                                                                <button variant="text" disabled={quantity < 2 && true} onClick={decreaseQuantity}>-</button>
                                                                                <p>{quantity}</p>
                                                                                <button variant="text" onClick={increaseQuantity}>+</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                            )
                                        }
                                        {/* <div className="d-flex align-items-start justify-content-between w-100 border-bottom p-1 my-1">
                                            <p>TOTAL</p>
                                            <p>₹ {totalAmount * 100}</p>
                                        </div> */}
                                        <Button className="mt-1 link" fullWidth={true}>View Cart</Button>

                                    </div>
                                </>
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <center>
                                        <img width={200} src="https://z.nooncdn.com/s/app/com/noon/images/empty-state-cart.svg" alt="cart" />
                                        <h2>Your cart is empty</h2>
                                        {/* <Link to="/productlist" className="continueBtn link Full">
                                            <Button variant="outlined" className="mx-2">Shopping Now</Button>
                                        </Link> */}
                                    </center>
                                </div>
                            )
                        }

                    </div>
                </div>
                <div className="rowDis">
                    <Avatar style={{ marginRight: 10, marginLeft: 10 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <h3>User Name</h3>
                </div>
            </div>

        </header >
    )
}

export default Header
