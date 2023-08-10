

export const validate = (values) => {
    const errors = {};
  
    if (!values.fullName) {
      errors.fullName = "Required";
    } else if (values.fullName.length > 20) {
      errors.fullName = "Must be 15 characters or less";
    }
  
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be atleast 8 characters";
    }
  
    if(values.role ==='manufacturer'){
      if ( !values.address) {
      errors.address = "Required";
      } else if (values.address.length > 100) {
      errors.address = "Must be 100 characters or less";
      }
  }
  
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!values.role) {
      errors.role = "Required";
    }
    return errors;
  };
  


  