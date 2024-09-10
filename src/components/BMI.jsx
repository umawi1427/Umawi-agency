import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  weight: Yup.number().required('Weight is required').positive('Weight must be a positive number').integer('Weight must be an integer'),
  height: Yup.number().required('Height is required').positive('Height must be a positive number').integer('Height must be an integer'),
});
const BMI = () => {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const calculateBMI = (values) => {
    const heightInMeters = values.height / 100;
    const bmiValue = values.weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    const bmiNumber = parseFloat(bmiValue.toFixed(2));
    if (bmiNumber < 18.5) setCategory('Underweight');
    else if (bmiNumber >= 18.5 && bmiNumber < 24.9) setCategory('Normal weight');
    else if (bmiNumber >= 24.9 && bmiNumber < 29.9) setCategory('Overweight');
    else setCategory('Obesity');
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6">
          <div className="card p-4 shadow">
            <h1 className="text-center mb-4">BMI Calculator (+17)</h1>
            <Formik
              initialValues={{ weight: '', height: '' }}
              onSubmit={calculateBMI}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mb-3">
                    <label htmlFor="weight">Weight (kg)</label>
                    <Field
                      type="number"
                      className={`form-control ${errors.weight && touched.weight ? 'is-invalid' : ''}`}
                      id="weight"
                      name="weight"
                    />
                    {errors.weight && touched.weight ? (
                      <div className="invalid-feedback">{errors.weight}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="height">Height (cm)</label>
                    <Field
                      type="number"
                      className={`form-control ${errors.height && touched.height ? 'is-invalid' : ''}`}
                      id="height"
                      name="height"
                    />
                    {errors.height && touched.height ? (
                      <div className="invalid-feedback">{errors.height}</div>
                    ) : null}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Calculate BMI</button>
                </Form>
              )}
            </Formik>
            {bmi && (
              <div className="mt-4 text-center">
                <h2>BMI: {bmi}</h2>
                <p className="lead">{category}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;
