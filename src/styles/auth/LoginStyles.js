import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
    opacity: 0.1;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--highlight) 0%, transparent 70%);
    opacity: 0.1;
    z-index: 0;
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1;
`;

export const BrandSection = styled(motion.div)`
  flex: 1;
  max-width: 500px;
  padding: 4rem;
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const Logo = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-color), var(--highlight));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const LoginCard = styled(motion.div)`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.1);
  }
`;

export const Button = styled(motion.button)`
  background: linear-gradient(135deg, var(--accent-color), var(--highlight));
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const RoleButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const RoleButton = styled(motion.button)`
  padding: 1rem;
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
  background: ${props => props.active ? 'rgba(33, 150, 243, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-primary)'};
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(33, 150, 243, 0.1);
    border-color: var(--accent-color);
  }
`; 