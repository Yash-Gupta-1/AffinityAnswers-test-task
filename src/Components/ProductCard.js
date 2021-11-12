import React, { useState } from "react";
import { Backdrop, Button, Fade, IconButton, Rating } from "@mui/material";
import Modal from '@mui/material/Modal';
import { Close, Favorite, ShoppingCart } from "@mui/icons-material";
import { makeStyles } from '@material-ui/core/styles';
import { getCartProducts } from "./Header";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '50%',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
// };
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
        height: 'fit-content',
        position: 'relative',
        [theme.breakpoints.up('xs')]: {
            width: '90%',
            height: 'fit-content'
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            height: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
            height: '90%'
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '60%',
            height: 'fit-content'
        },
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },

}));

const ProductCard = ({ product }) => {
    const classes = useStyles()
    const options = {
        value: product.rating.rate,
        readOnly: true,
        precision: 0.5,
    };


    const addtoCart = async () => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'))
        cartItems = cartItems === null ? [] : cartItems
        let obj = {
            data: product
        }
        let addedProduct = [...cartItems]
        let isProductExist = cartItems.some((item) => item.data.id === product.id)
        if (!isProductExist) {
            addedProduct.push(obj)
            localStorage.setItem('cartItems', JSON.stringify(addedProduct))
            getCartProducts()
        } else {
            alert('Product already exist')
        }
    }

    function ProductModal() {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [quantity, setQuantity] = useState(1)


        const increaseQuantity = () => {
            setQuantity(quantity + 1)
        }

        const decreaseQuantity = () => {
            setQuantity(quantity - 1)
        }
        return (
            <div>
                <div className="productCard">
                    <img onClick={handleOpen} src={product.image} alt="product" />.
                    <Button fullWidth onClick={() => addtoCart(product.id)}><ShoppingCart /> Add to cart</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    className={classes.modal}
                    BackdropComponent={Backdrop}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                            <div className="productModal">
                                <div className="productModal_Img">
                                    <img src={product.image} alt={product.image} />
                                </div>
                                <div className="productModal_Details">
                                    <h2>{product.title}</h2>
                                    <h2 style={{ color: 'red' }}>₹ {product.price.toFixed(0)}</h2>
                                    <div>
                                        <Rating {...options} />{" "}
                                        <p className="">
                                            {" "}
                                            ({product.rating.count} Reviews)
                                        </p>
                                    </div>

                                    <div className="rowDis quantity">
                                        <Button variant="outlined" disabled={quantity < 2 && true} onClick={decreaseQuantity}>-</Button>
                                        <p>{quantity}</p>
                                        <Button variant="outlined" onClick={increaseQuantity}>+</Button>
                                    </div>

                                    <div className="rowDis cart_fav_Btn">
                                        <Button variant="outlined"><Favorite /></Button>
                                        <Button variant="outlined"><ShoppingCart /></Button>
                                    </div>
                                    <Button variant="contained" className="buyNow_Btn" fullWidth={true}>Buy Now</Button>

                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }

    return (
        // <Link className="productCard" to="#">
        //     <img src={product.image} alt="product" />.
        //     <Button fullWidth onClick={() => addtoCart(product.id)}>Add to cart</Button>
        //     {/* <p>{product.title}</p>
        //     <div>
        //         <Rating {...options} />{" "}
        //         <span className="productCardSpan">
        //             {" "}
        //             (10 Reviews)
        //         </span>
        //     </div>
        //     <span>{`₹${"300"}`}</span> */}
        // </Link>

        <ProductModal />
    );
};

export default ProductCard;