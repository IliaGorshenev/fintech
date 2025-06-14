import { motion } from 'framer-motion';
import React from 'react';

import { useTheme } from '@heroui/use-theme';
import { LoadingSmallLogoIcon } from '../icons';
import { AnimatedSpan, LoadingLogoWrapper, LoadingSpinner, LoadingText, PromoFirstLine, PromoText } from './Styles.module';

const LoadingComponent: React.FC<{ message?: string }> = ({ message = 'Загрузка' }) => {
  return (
    <>
      <div style={{ zIndex: '10', margin: 'auto auto 53px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LoadingSpinner />
        <LoadingText>{message}</LoadingText>
      </div>
    </>
  );
};

const MainLogo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <LoadingLogoWrapper
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 50,
          damping: 15,
          delay: 0.3,
          duration: 1.2,
        },
      }}>
      <motion.img
        src={theme === 'dark' ? '/main-logo-dark.png' : '/main-logo.png'}
        alt="Blue Logo"
        animate={{
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </LoadingLogoWrapper>
  );
};
const LoadingPromo: React.FC = () => {
  return (
    <PromoText>
      <PromoFirstLine
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}>
        <AnimatedSpan
          style={{ marginRight: 'auto' }}
          variants={{
            hidden: { x: -100, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                duration: 0.6,
              },
            },
          }}>
          БУДУЩЕЕ
        </AnimatedSpan>
        <AnimatedSpan
          style={{ marginRight: 'auto' }}
          variants={{
            hidden: { x: 100, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                duration: 0.6,
              },
            },
          }}>
          ТРЕЙДИНГА
        </AnimatedSpan>
        <motion.span
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          variants={{
            hidden: { x: -100, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                duration: 0.6,
              },
            },
          }}>
          УЖЕ <LoadingSmallLogoIcon />
        </motion.span>
      </PromoFirstLine>
      <AnimatedSpan
        style={{ marginLeft: 'auto' }}
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            delay: 0.6,
            duration: 0.6,
          },
        }}>
        ЗДЕСЬ
      </AnimatedSpan>
    </PromoText>
  );
};
export const Promo: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100%' }}>
      <LoadingPromo />
      <MainLogo />
      <LoadingComponent />
    </div>
  );
};
