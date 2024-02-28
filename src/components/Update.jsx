import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {

//   const [data, setData] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    avenger:""
  });

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/` + id)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/users/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex w-100 vh-100  justify-content-center align-items-center bg-light">
      <div className="w-50 h-50 mt-5 border bg-white shadow px-5 pt-3 pb-5 rounded ">
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone: </label>
            <input
              type="number"
              name="phone"
              className="form-control"
              placeholder="Enter -Phone Number"
              value={values.phone}
              onChange={handleChange}
            />
             <label htmlFor="phone">Avenger Name </label>
             <input
              type="text"
              name="avenger"
              className="form-control"
              placeholder="Enter -Nick Name"
              value={values.avenger}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success mt-4">Update</button>
          <Link to="/" className="btn btn-primary ms-3 mt-4">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
