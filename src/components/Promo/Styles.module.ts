import { motion } from 'framer-motion';
import { keyframes, styled } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const AnimatedSpan = styled(motion.span)`
  display: block;
`;

export const PromoFirstLine = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export const LoadingLogoWrapper = styled(motion.div)`
  align-self: center;
  margin: -50px 0 0 -150px;
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top-color: var(--blue-700);
  animation: ${spin} 1s ease-in-out infinite;
`;

export const LoadingText = styled.p`
  margin-top: 8px;
  color: var(--blue-700);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const PromoText = styled.div`
  color: var(--blue-700);
  font-family: Inter;
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: 64px;
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
`;
