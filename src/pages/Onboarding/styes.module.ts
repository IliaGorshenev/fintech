import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components
export const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 48px 24px;
  background: var(--bg-onboarding);
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 240px;
  justify-content: center;
`;

export const PaginationDot = styled.div<{ $isActive: boolean }>`
  height: 4px;
  flex: 1;
  border-radius: 100px;
  background: ${(props) => (props.$isActive ? 'var(--blue-700)' : 'var(--secondary-foreground)')};
  transition: background 0.3s ease;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex: 3;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

export const Title = styled.h1`
  color: var(--foreground);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 16px;
`;

export const Subtitle = styled.p`
  color: var(--third-foregorund);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 32px;
`;
export const ImageContainer = styled.div<{ $isWide?: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.$isWide ? '100%' : '350px')};
  margin: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const StyledImage = styled(motion.img)<{ $isWide?: boolean }>`
  width: ${(props) => (props.$isWide ? '650px' : '100%')};
  height: auto;
  object-fit: contain;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: auto;
`;

export const SkipButton = styled.button`
  background: none;
  border: none;
  color: var(--grayscale_500, #71717a);
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
