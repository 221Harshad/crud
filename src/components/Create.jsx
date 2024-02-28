import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Create = () => {

    const [values,setValues] = useState({
        name:"",
        email:"",
        phone:"",
        avenger:"",
        contact:""
    })
    
    const navigate = useNavigate()
    const handleChange = (e)=>{
     const {name,value} = e.target;
     setValues({
        ...values,
        [name]:value
     })
    }

    // console.log(values);

    const handleSubmit = (e)=>{
         e.preventDefault();
         axios.post("http://localhost:3000/users", values)
         .then((res)=>{
            console.log(res);
            navigate('/')
         }).catch((error)=>{
            console.log(error)
         })
    }
  return (
    <div className='d-flex w-100 vh-100  justify-content-center align-items-center bg-light'>
        <div className='w-50 h-60 mt-5 border bg-white shadow px-5 pt-3 pb-5 rounded '>
            <h1>Add a User</h1>
            <form onSubmit={handleSubmit}>
             <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" className='form-control' placeholder='Enter Name' value={values.name} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" className='form-control' placeholder='Enter Email' value={values.email} onChange={handleChange} />
                <label htmlFor="phone">Phone: </label>
                <input type="number" name='phone' className='form-control' placeholder='Enter -Phone Number' value={values.phone} onChange={handleChange} />
                <label htmlFor="avenger">Avenger: </label>
                <input type="text" name='avenger' className='form-control' placeholder='Enter -Nick Name' value={values.avenger} onChange={handleChange} />
                <label htmlFor="contact">Contact Via: </label>
                <input type="text" name='contact' className='form-control' placeholder='Enter -Contact' value={values.contact} onChange={handleChange} />
             </div>
             <button className='btn btn-success mt-4'>Submit</button>
             <Link to="/" className="btn btn-primary ms-3 mt-4">Back</Link>
            </form>
        </div>
    </div>
  )
}

export default Create