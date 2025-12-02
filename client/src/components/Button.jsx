import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '',
  variant = 'primary', // Default to primary
  size = 'md',         // Default to medium
  ...rest              // Capture all other props (like data-testid)
}) => {
  
  // Construct the class string based on props
  // It handles: base class + variant (btn-primary) + size (btn-sm) + disabled state
  const buttonClass = `btn btn-${variant} btn-${size} ${disabled ? 'btn-disabled' : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass.trim()} // .trim() removes extra spaces if className is empty
      {...rest} // Spread the extra props onto the DOM element
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Button;