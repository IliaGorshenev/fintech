import { Button } from '@/components/Form/Button';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingData } from './consts';
import { Title } from '../styles.module';
import { OnboardingContainer, PaginationContainer, PaginationDot, ContentContainer, Subtitle, ImageContainer, StyledImage, ButtonContainer } from './styes.module';

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
