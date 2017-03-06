/**
 * FormFields.js
 *
 * @description :: FormFields: renders HTML elements of `<INPUT />` fields.
 * @docs        :: http://
 */
 
import React from 'react';

const FormFields = ({ input, label, placeholder, val, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label  className="control-label">{label}</label>
    <div>
      <input {...input} className="form-control" value={val} placeholder={placeholder} type={type} />
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

export default FormFields;


