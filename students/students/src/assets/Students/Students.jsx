import React, { useState } from "react";
import "./students.css";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Students() {
  let initionalvalue = {firstname: "",lastname: "",rollno: "",gender: ""}
  let [stud_data, setStud_data] = useState(initionalvalue);
  let [data, setData] = useState([]);
  let [form_error, setForm_error] = useState({});

  useEffect(() => {
    getStudentsdetails();
  }, []);

  const getStudentsdetails = async () => {
    try {
      let result = await fetch(`http://localhost:5000/getstudents`);
      if (!result.ok) {
        if (result.status === 404) {
          toast.error("No students found");
          setData([]);
          return;
        }
        toast.error(`Failed to fetch students: ${result.statusText}`);
        return;
      }
      let data = await result.json();
      setData(data);
    } catch (error) {
      toast("Error fetching students:", error);
    }
  };

  const insertStudentsdetails = async () => {
        try {
      const response = await fetch("http://localhost:5000/insertstudents", {
        method: "POST",
        body: JSON.stringify({
          first_name: stud_data.firstname,
          last_name: stud_data.lastname,
          rollnumber: stud_data.rollno,
          gender: stud_data.gender,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if(response.ok){
        toast.success("record inserted successfully");
        getStudentsdetails();
      }
    } catch (error) {
      toast("Error inserting students:", error);
    }
    
  };

  const deletestudent = async (studId) => {
    try {
      let result = await fetch(`http://localhost:5000/deletestudent/${studId}`, {
        method: "Delete",
      });
      if(result.ok){
        toast.success("record deleted successfully");
        getStudentsdetails();
      }
    } catch (error) {
      toast("Error deleting students:", error);
    }
  };
  
  const handelchange = (e) => {
    const { name, value } = e.target;
    setStud_data({ ...stud_data, [name]: value });
  };

  const handelsubmit = (e) => {
    
    e.preventDefault();
    let temp = validate(stud_data);
    setForm_error(validate(stud_data));
    if (Object.keys(temp).length === 0) {
      insertStudentsdetails();
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.fn = "First name is require !";
      
    }
    if (!values.lastname) {
      errors.ln = "Last name is require !";
      
    }
    if (!values.rollno) {
      errors.rn = "Roll no is require !";
      
    }
    if (!values.gender) {
      errors.gen = "select gender !";
      
    }
    return errors;
  };

  return (
    <div className="maindiv">
      <h1>Student Entry</h1>
      <form onSubmit={handelsubmit}>
        <div className="container">
          <label htmlFor="">First Name *</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={handelchange}
          />
          <p>{form_error.fn}</p>

          <label htmlFor="">Last Name *</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={handelchange}
          />
          <p>{form_error.ln}</p>
          <label htmlFor="">Roll Number *</label>
          <input
            type="text"
            placeholder="Roll Number"
            name="rollno"
            onChange={handelchange}
          />
          <p>{form_error.rn}</p>
          <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
            <div>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={stud_data.gender === "female"}
                onChange={handelchange}
              />
              <label htmlFor="">Female</label>
            </div>
            <div>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={stud_data.gender === "male"}
                onChange={handelchange}
              />
              <label htmlFor="">Male</label>
              <p>{form_error.gen}</p>
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "50px" }}
          >
            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
          </div>
        </div>
      </form>
      <div className="viewdata">
        <h1>Students List</h1>
        <h3>Total Students : {data.length}</h3>
        <div className="listdata">
          {data.map((e) => {
            return (
              <div style={{ display: "flex", margin: "10px" }}>
                <div>
                  <img src="" />
                </div>
                <div className="detaildata">
                  <h3>
                    {e.first_name} {e.last_name}
                  </h3>
                  <h4>Roll No : {e.rollnumber}</h4>
                  <input
                    type="button"
                    value="delete"
                    id={e.id}
                    onClick={() => deletestudent(e._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar
        theme="colored"
      />
    </div>
  );
}
