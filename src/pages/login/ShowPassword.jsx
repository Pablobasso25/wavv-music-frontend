import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const ShowPassword = ({ value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <Form.Control
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-dark text-white border-secondary" 
        required
      />
      <Button 
        variant="outline-secondary" 
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeSlash /> : <Eye />}
      </Button>
    </InputGroup>
  );
};

export default ShowPassword;