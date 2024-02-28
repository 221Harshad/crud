import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import './Home.css'
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [records,setRecords] = useState(data);
  
  //To fetch the records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        if (response.status < 200 || response.status >= 300) {
          throw new Error("No response available");
        }
        setData(response.data);
        setRecords(response.data)
      } catch (error) {
        // console.log(error.message)
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  // console.log(error)

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((res) => {
            setData(data.filter(item => item.id !== id)); 
        })
        .catch((err) => console.log(err));
    }
  };

  const Filter = (e) => {
    const searchText = e.target.value.toLowerCase(); // Convert input text to lowercase
   
      setRecords(data.filter(val => val.name.toLowerCase().includes(searchText)));
    
  }
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="text-rainbow">List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <input type="text" className="form-control" onChange={Filter} placeholder="Search"/>
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="ps-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              records.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>
                    <Link
                      to={`/read/${data.id}`}
                      className="btn btn-sm btn-info me-2 ms-4"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/update/${data.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {error && error.message}
          </tbody>
        </table>
      </div>
    </div>
  );
};




export default Home;
