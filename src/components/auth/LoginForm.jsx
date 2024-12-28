import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faWarning } from '@fortawesome/free-solid-svg-icons';
import {
  LoginContainer,
  LoginContent,
  BrandSection,
  Logo,
  LoginCard,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Input,
  Button
} from '../../styles/auth/LoginStyles';
import RoleSelector from './RoleSelector';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: var(--error);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Check if admin credentials are used with admin role
    if (email === 'admin@edupro.com' && password === 'admin123') {
      if (selectedRole === 'admin') {
        console.log('Admin logged in successfully');
        navigate('/admin/dashboard');
      } else {
        setError('Please select the correct role for these credentials');
      }
    } else if (selectedRole === 'admin') {
      setError('Invalid admin credentials');
    } else if (selectedRole === 'staff') {
      const staffAccounts = JSON.parse(localStorage.getItem('staffAccounts')) || [];
      const staffMember = staffAccounts.find(
        staff => staff.email === email && staff.password === password
      );

      if (staffMember) {
        localStorage.setItem('currentStaff', JSON.stringify(staffMember));
        console.log('Staff logged in successfully');
        navigate('/staff/dashboard');
      } else {
        setError('Invalid staff credentials');
      }
    } else if (selectedRole === 'student') {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const student = students.find(
        student => student.email === email && student.password === password
      );

      if (student) {
        localStorage.setItem('currentStudent', JSON.stringify(student));
        console.log('Student logged in successfully');
        navigate('/student/dashboard');
      } else {
        setError('Invalid student credentials');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <LoginContainer>
      <BrandSection
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Logo>EduPro</Logo>
        <motion.p variants={itemVariants}>
          Empowering Education Through Technology
        </motion.p>
      </BrandSection>
      
      <LoginContent>
        <LoginCard
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Title>Welcome Back</Title>
          <Subtitle>Please sign in to continue</Subtitle>
          
          <motion.div variants={itemVariants}>
            <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          </motion.div>
          
          <Form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <InputGroup>
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  style={{ 
                    position: 'absolute', 
                    left: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--text-secondary)'
                  }} 
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderColor: error ? 'var(--error)' : undefined }}
                />
              </InputGroup>
            </motion.div>

            <motion.div variants={itemVariants}>
              <InputGroup>
                <FontAwesomeIcon 
                  icon={faLock} 
                  style={{ 
                    position: 'absolute', 
                    left: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--text-secondary)'
                  }} 
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderColor: error ? 'var(--error)' : undefined }}
                />
              </InputGroup>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ErrorMessage>
                  <FontAwesomeIcon icon={faWarning} />
                  {error}
                </ErrorMessage>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </Button>
            </motion.div>
          </Form>
        </LoginCard>
      </LoginContent>
    </LoginContainer>
  );
};

export default LoginForm; 