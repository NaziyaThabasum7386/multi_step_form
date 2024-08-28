import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  // Retrieve form data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  // Persist form data to local storage on form data change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  // Validation logic for step 1
  const validateStep1 = () => {
    let formErrors = {};
    if (formData.name === "") {
      formErrors.name = "Name is a required field";
    } else if (formData.name.length < 3) {
      formErrors.name = "Name must be at least 3 characters";
    }

    if (formData.email === "") {
      formErrors.email = "Email is a required field";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      formErrors.email = "Please enter a valid email address";
    }

    if (formData.phone === "") {
      formErrors.phone = "Phone number is a required field";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Validation logic for step 2
  const validateStep2 = () => {
    let formErrors = {};
    if (formData.address1 === "") {
      formErrors.address1 = "Address Line 1 is a required field";
    }
    if (formData.city === "") {
      formErrors.city = "City is a required field";
    }
    if (formData.state === "") {
      formErrors.state = "State is a required field";
    }
    if (formData.zip === "") {
      formErrors.zip = "Zip Code is a required field";
    } else if (!/^\d{5,6}$/.test(formData.zip)) {
      formErrors.zip = "Zip Code must be 5 or 6 digits";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Move to next step with validation
  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  // Move to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log(formData);
  };

  return (
    <div>
      <h2>Multi-Step Form</h2>
      <div className="tabs">
        <button
          className={step === 1 ? "active" : ""}
          onClick={() => setStep(1)}
        >
          Step 1
        </button>
        <button
          className={step === 2 ? "active" : ""}
          onClick={() => setStep(2)}
          disabled={step < 2}
        >
          Step 2
        </button>
        <button
          className={step === 3 ? "active" : ""}
          onClick={() => setStep(3)}
          disabled={step < 3}
        >
          Step 3
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3>Step 1: Personal Information</h3>
            
            <TextField
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
            />
            <br /><br />
            
            <TextField
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />
            <br /><br />
            
            <TextField
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Phone"
              variant="outlined"
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <br /><br />
            
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Step 2: Address Information</h3>
            <TextField
              id="address1"
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              label="Address Line 1"
              variant="outlined"
              error={!!errors.address1}
              helperText={errors.address1}
            />
            <br /><br />
            
            <TextField
              id="address2"
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              label="Address Line 2"
              variant="outlined"
            />
            <br /><br />
            
            <TextField
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city}
            />
            <br /><br />
            
            <TextField
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              label="State"
              variant="outlined"
              error={!!errors.state}
              helperText={errors.state}
            />
            <br /><br />
            
            <TextField
              id="zip"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              label="Zip Code"
              variant="outlined"
              error={!!errors.zip}
              helperText={errors.zip}
            />
            <br /><br />
            
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Step 3: Confirmation</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address Line 1:</strong> {formData.address1}</p>
            <p><strong>Address Line 2:</strong> {formData.address2}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Zip Code:</strong> {formData.zip}</p>
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
