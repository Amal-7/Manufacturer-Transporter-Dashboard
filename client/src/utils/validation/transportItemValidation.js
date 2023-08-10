

export const validate = (values) => {
    const errors = {};
  
    if (!values.from) {
      errors.from = "Required";
    } else if (values.from.length > 100) {
      errors.fullName = "Must be 100 characters or less";
    }
  
    if (!values.to) {
      errors.to = "Required";
    } else if (values.to.length > 100) {
      errors.password = "Must be 100 characters or less";
    }
  
    if (!values.quantity) {
      errors.quantity = "Required";
    } 
  
    if (!values.pickup) {
      errors.email = "Required";
    } 
  
    if (!values.transporter) {
      errors.role = "Required";
    }
    return errors;
  };