import React from 'react';
import { RoleButtons, RoleButton } from '../../styles/auth/LoginStyles';
import { motion } from 'framer-motion';

const RoleSelector = ({ selectedRole, setSelectedRole }) => {
  const roles = ['Admin', 'Staff', 'Student'];

  return (
    <RoleButtons>
      {roles.map((role) => (
        <RoleButton
          key={role}
          active={selectedRole === role.toLowerCase()}
          onClick={() => setSelectedRole(role.toLowerCase())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {role}
        </RoleButton>
      ))}
    </RoleButtons>
  );
};

export default RoleSelector; 