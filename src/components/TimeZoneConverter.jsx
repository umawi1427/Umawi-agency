import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object({
  dateTime: Yup.date().required('Date and time are required'),
  fromTimeZone: Yup.string().required('From TimeZone is required'),
  toTimeZone: Yup.string().required('To TimeZone is required'),
});

const TimeZoneConverter = () => {
  const [showConvertedTime, setShowConvertedTime] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));
  const [audio] = useState(new Audio('https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/snares/5[kb]sidestick.aif.mp3'));

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = moment().format('YYYY-MM-DDTHH:mm');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      setCurrentTime(now.format('YYYY-MM-DDTHH:mm:ss'));
      audio.play();
    }, 1000);

    return () => clearInterval(interval);
  }, [audio]);

  const handleConvert = (values, { setFieldValue, setSubmitting, setErrors }) => {
    try {
      if (values.dateTime && values.fromTimeZone && values.toTimeZone) {
        const converted = moment.tz(values.dateTime, values.fromTimeZone).tz(values.toTimeZone).format('YYYY-MM-DD HH:mm:ss');
        setFieldValue('convertedTime', converted);
        setShowConvertedTime(true);
      }
    } catch (error) {
      setErrors({ convertedTime: 'Error in conversion' });
    }
    setSubmitting(false);
  };

  const timeZones = moment.tz.names();

  const currentMoment = moment(currentTime, 'YYYY-MM-DDTHH:mm:ss');
  const seconds = currentMoment.seconds();
  const minutes = currentMoment.minutes();
  const hours = currentMoment.hours();
  const date = currentMoment.format('MM DD YYYY');

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-10">
          <div className="d-flex justify-content-between">
            <div className="form-container flex-grow-1 me-3">
              <div className="card p-4 shadow">
                <Formik
                  initialValues={{
                    dateTime: now,
                    fromTimeZone: userTimeZone,
                    toTimeZone: '',
                    convertedTime: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleConvert}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <h2>Time Zone Converter</h2>

                      <div className="mb-3">
                        <label htmlFor="dateTime" className="form-label">Select Date and Time</label>
                        <Field
                          type="datetime-local"
                          id="dateTime"
                          name="dateTime"
                          className="form-control"
                        />
                        <ErrorMessage name="dateTime" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fromTimeZone" className="form-label">From Time Zone</label>
                        <Field as="select" id="fromTimeZone" name="fromTimeZone" className="form-select">
                          <option value="">Select From TimeZone</option>
                          {timeZones.map((zone) => (
                            <option key={zone} value={zone}>
                              {zone}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="fromTimeZone" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="toTimeZone" className="form-label">To Time Zone</label>
                        <Field as="select" id="toTimeZone" name="toTimeZone" className="form-select">
                          <option value="">Select To TimeZone</option>
                          {timeZones.map((zone) => (
                            <option key={zone} value={zone}>
                              {zone}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="toTimeZone" component="div" className="text-danger" />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Convert
                      </button>

                      {showConvertedTime && (
                        <div className="mt-3">
                          <h3>Converted Time</h3>
                          <Field name="convertedTime">
                            {({ field }) => (
                              <p>{field.value}</p>
                            )}
                          </Field>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
            <div className="clock-container">
              <div className="clock">
                <div
                  className="hourHand"
                  style={{ transform: `rotate(${hourDeg}deg)` }}
                ></div>
                <div
                  className="minuteHand"
                  style={{ transform: `rotate(${minuteDeg}deg)` }}
                ></div>
                <div
                  className="secondHand"
                  style={{ transform: `rotate(${secondDeg}deg)` }}
                ></div>
                <div className="center"></div>
                <div className="date">
                  <span>{date}</span>
                </div>
                <ul>
                  {Array.from({ length: 12 }, (_, i) => (
                    <li key={i}>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <style jsx>{`
  .form-container {
    flex: 1;
  }
  .clock-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .clock {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: antiquewhite;
    border: 20px solid cornsilk;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {
    background-color: #000;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    z-index: 50;
  }
  .hourHand {
    width: 10px;
    height: 75px;
    background-color: #000;
    transform-origin: bottom center;
    border-radius: 4px;
    position: absolute;
    top: calc(23%);
    z-index: 10;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
  }
  .minuteHand {
    width: 5px;
    height: 120px;
    background-color: #000;
    transform-origin: bottom center;
    border-radius: 4px;
    position: absolute;
    top: calc(5%);
    z-index: 9;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
  }
  .secondHand {
    width: 2px;
    height: 120px;
    background-color: red;
    transform-origin: bottom center;
    border-radius: 4px;
    position: absolute;
    top: calc(5%);
    transition: all 0.06s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    z-index: 8;
  }
  .date {
    position: absolute;
    top: calc(63%);
    left: calc(50%);
    border: 1px solid #fff8dc;
    background-color: #fff;
    padding: 5px;
    box-shadow: inset 0px 2px 5px rgba(0, 0, 0, .4);
    border-radius: 5px;
    min-width: 100px;
    text-align: center;
    font-size: 14px;
    color: red;
    transform: translate(-50%, -50%);
  }
  .clock ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .clock ul li {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: black;
    transform: translateY(-10px);
  }
  .clock ul li:nth-child(1) { transform: rotate(30deg) translateY(-120px); }
  .clock ul li:nth-child(2) { transform: rotate(60deg) translateY(-120px); }
  .clock ul li:nth-child(3) { transform: rotate(90deg) translateY(-120px); }
  .clock ul li:nth-child(4) { transform: rotate(120deg) translateY(-120px); }
  .clock ul li:nth-child(5) { transform: rotate(150deg) translateY(-120px); }
  .clock ul li:nth-child(6) { transform: rotate(180deg) translateY(-120px); }
  .clock ul li:nth-child(7) { transform: rotate(210deg) translateY(-120px); }
  .clock ul li:nth-child(8) { transform: rotate(240deg) translateY(-120px); }
  .clock ul li:nth-child(9) { transform: rotate(270deg) translateY(-120px); }
  .clock ul li:nth-child(10) { transform: rotate(300deg) translateY(-120px); }
  .clock ul li:nth-child(11) { transform: rotate(330deg) translateY(-120px); }
  .clock ul li:nth-child(12) { transform: rotate(360deg) translateY(-120px); }
`}</style>


    </div>
  );
};

export default TimeZoneConverter;