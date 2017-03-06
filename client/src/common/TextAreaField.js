/**
 * TextAreaField.js
 *
 * @description :: TextArea Field: renders HTML elements of `<TextArea />` field.
 * @docs        :: http://
 */
 
import React from 'react';

const TextAreaField = ({ input, label, placeholder, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label  className="control-label">{label}</label>
    <div>
      <textarea {...input} className="form-control" rows="7"  placeholder={placeholder} type={type}/>
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

export default TextAreaField;
