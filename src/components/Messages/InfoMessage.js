import React from 'react';
import { FaHandPeaceO } from 'react-icons/lib/fa';

import Message from './Message.js';

const InfoMessage = ({ ...props }) => (
  <Message icon={<FaHandPeaceO />} {...props} />
)

export default InfoMessage;
