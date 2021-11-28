import {useEffect, useState} from 'react'
import axios from 'axios'
function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    // kiểm tra user đăng nhập có phải là user thông thường hay là admin 
    useEffect(()=>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
    // xét các trường hợp để thêm sản phẩm và giỏ hàng
    const addCart = async(product) =>{
        if(!isLogged) return alert("Please sign in to buy products")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart,{...product, quantity:1}])

            await axios.patch('/user/addCart', {cart:[...cart, {...product, quantity:1}]}, {
                headers: {Authorization: token}
            })
        }else{
            alert("The product has been added to cart")
        }

    }

    return {
        isLogged: [isLogged, setIsLogged], 
        isAdmin: [isAdmin, setIsAdmin],
        cart:  [cart, setCart],
        addCart: addCart,
        history: [history,setHistory]
    }
}

export default UserAPI
