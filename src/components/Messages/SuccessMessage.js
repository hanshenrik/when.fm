import React from 'react';
import { FaThumbsUp } from 'react-icons/lib/fa';

import Message from './Message.js';

const SuccessMessage = ({ ...props }) => (
  <Message icon={<FaThumbsUp />} {...props} />
);

export default SuccessMessage;
