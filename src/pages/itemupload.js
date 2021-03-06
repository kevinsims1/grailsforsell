import React, { useState } from 'react'
import DropZone from '../components/dropzone'
import { useAlert } from 'react-alert'

import '../css/bare.css'

const ItemUpload = () => {
  const [state, setState] = useState({
    pic: '',
    name: '',
    price: '00.00',
    size: 's',
    description: '',
    category: 'vintage',
    condition: 'new',
    image: ''
  })

  const alert = useAlert()

  const onChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(state)
    const localCart = localStorage.getItem('cart')
    const newItem = await fetch(
      `https://grailsforsell.herokuapp.com/items/create?id=${localCart}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...state }),
      }
    )
    if (newItem) {
      alert.show('Item added!')
      setState({
        pic: {},
        name: '',
        price: '00.00',
        size: '',
        description: '',
        category: '',
        condition: '',
      })
    }
  }
  return (
    <div className="Wrap">
      <form
        onSubmit={onSubmit}
        style={{
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          margin: '1rem',
        }}
      >
        <div className="form">
          <label>Name</label>
          <input
            placeholder="Name"
            name="name"
            value={state.name}
            onChange={onChange}
          />
        </div>

        <div className="form">
          <label>Size</label>
          <select
            placeholder="Size"
            name="size"
            value={state.size}
            onChange={onChange}
          >
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
            <option value="xxxl">XXXL</option>
          </select>
        </div>
        <div className="form">
          <label>Price</label>
          <input
            placeholder="$100.00"
            name="price"
            value={state.price}
            onChange={onChange}
          />
        </div>

        <div className="form">
          <label>Description</label>
          <textarea
            placeholder="Description"
            name="description"
            value={state.description}
            onChange={onChange}
          />
        </div>

        <div className="form">
          <label>Category</label>
          <select
            placeholder="Category"
            name="category"
            value={state.category}
            onChange={onChange}
          >
            <option value="vintage">Vintage</option>
            <option value="streetwear">Streetwear</option>
            <option value="hype">Hype</option>
          </select>
        </div>
        <div className="form">
          <label>Condition</label>
          <select
            placeholder="Condition"
            name="condition"
            value={state.condition}
            onChange={onChange}
          >
            <option>Used</option>
            <option>New</option>
          </select>
        </div>

        <div className="form">
          <label>Photo</label>
          <DropZone state={state} setState={setState} alert={alert} />
        </div>

        <div className="form">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default ItemUpload
