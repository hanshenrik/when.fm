import React from 'react';
import { FaThumbsDown } from 'react-icons/lib/fa';

import Message from './Message.js';

const ErrorMessage = ({ ...props }) => (
  <Message icon={<FaThumbsDown />} {...props} />
)

export default ErrorMessage;
