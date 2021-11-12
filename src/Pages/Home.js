import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import '../StyleSheet/Home.css'
import { MenuItem } from '@mui/material'
import { Category } from '@mui/icons-material'
import ProductCard from '../Components/ProductCard'
import { Link, useLocation } from 'react-router-dom'
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const query = useQuery()

    useEffect(() => {
        setLoading(true)
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [])
    return (
        <div className='home'>
            <Header products={products} />
            <div className="main">
                <aside className='sidebar'>
                    <div className="productFilters">
                        {
                            products.length > 0 &&
                            <Link to="/">
                                <MenuItem style={{ margin: 5, textTransform: 'capitalize' }} ><Category style={{ marginRight: 5 }} /> All Products</MenuItem>
                            </Link>

                        }
                        {
                            products.length > 0 &&
                            products
                                .filter((v, i, a) => a.findIndex(t => (t.category === v.category)) === i)
                                .map((item, index) => (
                                    <Link key={index} to={`/?cat=${item.category}`} >
                                        <MenuItem aria-valuetext={item.category} className='rowDis link' fullWidth style={{ margin: 5, textTransform: 'capitalize' }}><Category style={{ marginRight: 5 }} /> {item.category}</MenuItem>
                                    </Link>
                                ))
                        }
                    </div>
                </aside>
                <div className="products">
                    {
                        query.get('cat') !== null ? (
                            <h4>Product under Category {query.get('cat')}</h4>
                        ) : (
                            <h4>All products</h4>
                        )
                    }
                    <div className="productsContainer">

                        {
                            loading ? (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '80vh',
                                    width: '100%'
                                }}>
                                    <BarLoader color={"#2196f3"} loading={loading} css={override} size={150} />
                                </div>
                            ) : (
                                query.get('cat') !== null ? (
                                    products
                                        .filter((item) => item.category === query.get('cat'))
                                        .map((item, index) => (
                                            <ProductCard key={index} product={item} />
                                        ))
                                ) : (
                                    products.map((item, index) => (
                                        <ProductCard key={index} product={item} />
                                    ))
                                )
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
