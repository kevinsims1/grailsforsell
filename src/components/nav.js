import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useAlert } from 'react-alert'
import '../css/bare.css'
const Nav = () => {
  const [stripe, setStripe] = useState(null)
  const alert = useAlert()
  const localCart = localStorage.getItem('cart')
  useEffect(
    () => setStripe(window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY || 'pk_live_51GwCfaFyetTzufDNcpEmglcKUNAVrgJIBTA9Itkxkq5qgDl0fRY5YDSfzs1P7CndIDKbJEiqIqC3WqmeUeTYbDRO00FQxgmv4i')),
    []
  )

  const goToCheckout = async () => {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      const res = await fetch(
        `https://grailsforsell.herokuapp.com/user/checkout?id=${localCart}`
      )
      const data = await res.json()

      if (data.id) {
        stripe
          .redirectToCheckout({
            sessionId: data.id,
          })
          .then(function (result) {
            console.log(result.error.message)
          })
        return
      }
    }
    alert.show('Please sign in')
  }

  if(localCart){
    return (
      <div className="nav">
        <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'baseline', marginBottom: '10px'}}>
          <NavLink to="/" className="navTitle">
            Grails For Sell
          </NavLink>
          <div>
            <NavLink to="/create" className="navLinks">Create</NavLink>
            <NavLink to="/signup" className="navLinks">Register</NavLink>
            <button
              onClick={goToCheckout}
              style={{ border: 'none', padding: '5px' }}
            >
              <FaShoppingCart size={10} />
            </button>
          </div>
        </div>
  
        <div className="options">
          <NavLink to="/vintage" className="navItem">
            Vintage
          </NavLink>
          <NavLink to="/streetwear" className="navItem">
            Streetwear
          </NavLink>
          <NavLink to="/hype" className="navItem">
            Hype
          </NavLink>
        </div>
      </div>
    )
  }
  return (
    <div className="nav">
      <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'baseline', marginBottom: '10px'}}>
        <NavLink to="/" className="navTitle">
          Grails For Sell
        </NavLink>
        <div>
          <NavLink to="/signin" className="navLinks">Login</NavLink>
          <NavLink to="/signup" className="navLinks">Register</NavLink>
          <button
            onClick={goToCheckout}
            style={{ border: 'none', padding: '5px' }}
          >
            <FaShoppingCart size={10} />
          </button>
        </div>
      </div>

      <div className="options">
        <NavLink to="/vintage" className="navItem">
          Vintage
        </NavLink>
        <NavLink to="/streetwear" className="navItem">
          Streetwear
        </NavLink>
        <NavLink to="/hype" className="navItem">
          Hype
        </NavLink>
      </div>
    </div>
  )
}

export default Nav
