import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const ShowPassword = ({ value, onChange, name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

 return (
    <InputGroup>
      <Form.Control
        {...props}
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Button 
        variant="outline-secondary" 
        onClick={() => setShowPassword(!showPassword)}
        style={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)', 
            color: 'white',
            zIndex: 0 
        }}
      >
        {showPassword ? <EyeSlash /> : <Eye />}
      </Button>
    </InputGroup>
  );
};

export default ShowPassword;