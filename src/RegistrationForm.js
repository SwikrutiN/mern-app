import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const existingEmails = ['test@example.com', 'user@domain.com']; // Simulating existing emails

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle course selection as a checkbox group
      const updatedCourses = checked
        ? [...formData.course, value]
        : formData.course.filter((course) => course !== value);
      setFormData({ ...formData, course: updatedCourses });
    } else if (type === 'file') {
      // Handle file upload with validation
      const file = e.target.files[0];
      if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'png') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: 'Only JPG and PNG files are allowed',
          }));
        } else {
          setFormData({ ...formData, image: file });
          setErrors((prevErrors) => {
            const { image, ...rest } = prevErrors; // Remove the image error if any
            return rest;
          });
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    } else if (existingEmails.includes(formData.email)) {
      errors.email = "This email is already registered";
    }
    
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    
    if (!formData.designation) errors.designation = "Designation is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (formData.course.length === 0) errors.course = "Select at least one course";
    if (!formData.image) errors.image = "Image is required";
    if (formData.image && !['jpg', 'png'].includes(formData.image.name.split('.').pop().toLowerCase())) {
      errors.image = 'Only JPG and PNG files are allowed';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted:', formData);
      // Additional code for form submission can go here
    }
  };

  return (
    <div className="form-container">
      <h2>Create Employee</h2> {/* Updated heading */}
      <form onSubmit={handleSubmit}>
        
        {/* Name Field */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        {/* Email Field */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        {/* Mobile Field */}
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </label>

        {/* Designation Dropdown */}
        <label>
          Designation:
          <select name="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p className="error">{errors.designation}</p>}
        </label>

        {/* Gender Radio Buttons */}
        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        {/* Course Checkboxes */}
        <label>Course:</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes('MCA')}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes('BCA')}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes('BSC')}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>
        {errors.course && <p className="error">{errors.course}</p>}

        {/* Image Upload */}
        <label>
          Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
