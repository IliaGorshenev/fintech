import { Button } from '@/components/Form/Button';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const onboardingData = [
  {
    id: 1,
    title: 'Обменивайте фиатные валюты и криптовалюты',

    image: '/ob-1.png',
  },
  {
    id: 2,
    title: 'Создавайте заявки на переводы и инвойсы',
    subtitle: 'Менеджер поможет с запросом',
    image: '/ob-2.png',
  },
  {
    id: 3,
    title: 'Выбирайте наиболее удобный офис для сделок и просматривайте их статус',
    subtitle: 'Создавайте финансовые цели и достигайте их',
    image: '/ob-3.png',
  },
  {
    id: 4,
    title: 'Отслеживайте Ваш уровень и бонусы',
    subtitle: 'В разделе «Бонусная программа»',
    image: '/ob-4.png',
  },
];

// Styled components
const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 48px 24px;
  background: var(--bg_onboarding, linear-gradient(180deg, #fff 0%, #e3e3f3 100%));
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 240px;
  justify-content: center;
`;

const PaginationDot = styled.div<{ $isActive: boolean }>`
  height: 4px;
  flex: 1;
  border-radius: 100px;
  background: ${(props) => (props.$isActive ? 'var(--primary_light_300, #344CFF)' : 'var(--grayscale_200, #ECEDEE)')};
  transition: background 0.3s ease;
`;

const ContentContainer = styled.div`
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

const Title = styled.h1`
  color: var(--secondary_300, #3f3d51);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  color: var(--grayscale_500, #71717a);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 32px;
`;
const ImageContainer = styled.div<{ $isWide?: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.$isWide ? '100%' : '350px')};
  margin: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const StyledImage = styled(motion.img)<{ $isWide?: boolean }>`
  width: ${(props) => (props.$isWide ? '650px' : '100%')};
  height: auto;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: auto;
`;

const SkipButton = styled.button`
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

const OnBoardingPages: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to the main app when onboarding is complete
      navigate('/dashboard');
    }
  };

  const skipOnboarding = () => {
    navigate('/');
  };

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const currentData = onboardingData[currentStep];

  return (
    <OnboardingContainer>
      <PaginationContainer>
        {onboardingData.map((_, index) => (
          <PaginationDot key={index} $isActive={index === currentStep} />
        ))}
      </PaginationContainer>

      <ContentContainer>
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Title>{currentData.title}</Title>
            <Subtitle>{currentData.subtitle}</Subtitle>

            <ImageContainer $isWide={currentStep === 2}>
              <StyledImage
                src={currentData.image}
                alt={`Onboarding step ${currentStep + 1}`}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                $isWide={currentStep === 2}
              />
            </ImageContainer>
          </motion.div>
        </AnimatePresence>

        <ButtonContainer>
          <Button onClick={nextStep} fullWidth>
            {currentStep === onboardingData.length - 1 ? 'На главный экран' : 'Далее'}
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </OnboardingContainer>
  );
};

export default OnBoardingPages;
