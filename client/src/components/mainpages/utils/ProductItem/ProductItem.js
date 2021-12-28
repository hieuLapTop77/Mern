import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'
import {GlobalState} from '../../../../GlobalState'
function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {
    const state = useContext(GlobalState)
    const click = state.userAPI.click
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <div>
                
                <Link id ="title" to ={`/detail/${product._id}`} onClick={() => click(product)}>
                    <img src={product.images.url} alt="" />

                </Link>
            </div>
            

            <div className="product_box">
                <h2 title={product.title}> 
                    <Link id ="title" to ={`/detail/${product._id}`}>{product.title}</Link>
                </h2>
                <span>${product.price}</span>
                <div className="details">
                    <p>{product.screenSize} Inches</p>
                    <p>{product.ram} GB</p>
                    <p>{product.memory} GB</p>
                    {/* <p>{product.status}</p> */}
                    {/* <p>{product.pin}</p> */}
                </div>
                <p>{product.description}</p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem