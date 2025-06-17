import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Checkbox, CheckboxGroup } from '@/components/Form/Checkbox';
import { LoadingSmallLogoIcon } from '@/icons/icons';

import { useErrorNotification } from '@/hooks/useError';
import { registrationEmailAtom, registrationUserDataAtom } from '@/store/auth';

import { fakeRegisterUser } from '@/hooks/useAuth';
import { initialRegistrationSchema } from '@/validation/authSchemas';
import { Button } from '@heroui/button';
import { FormErrorMessage } from '../Form/ErrorMessage';
import { InputField } from '../Form/InputField';
import { Container, FormContainer, LinksContainer, Title } from './styles.module';

// Define a type for the initial registration data
interface InitialRegistrationData {
  fullName: string;
  email: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export const RegistrationForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showError } = useErrorNotification();
  // Jotai state setters
  const setRegistrationEmail = useSetAtom(registrationEmailAtom);
  const setRegistrationUserData = useSetAtom(registrationUserDataAtom);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm<InitialRegistrationData>({
    resolver: zodResolver(initialRegistrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      acceptTerms: false,
      acceptMarketing: false,
    },
  });

  console.log('Rendering RegistrationForm');
  const handleCheckboxChange = (fieldName: 'acceptTerms' | 'acceptMarketing') => (e: ChangeEvent<Element>) => {
    if (e.target instanceof HTMLInputElement) {
      setValue(fieldName, e.target.checked);
    }
  };

  const handleInitialStep = async () => {
    setServerError(undefined);
    setIsLoading(true);

    try {
      const isValid = await trigger(['fullName', 'email', 'acceptTerms', 'acceptMarketing']);
      console.log('Form is valid:', isValid);

      if (!isValid) {
        setIsLoading(false);
        return;
      }

      const data = getValues();
      const registrationData = {
        ...data,
        password: '', // These will be set in a later step
        confirmPassword: '',
      };

      const initialResponse = await fakeRegisterUser(registrationData);

      if (initialResponse.success) {
        // Store data in Jotai atoms
        setRegistrationEmail(data.email);
        setRegistrationUserData(data);

        // Navigate to verification page with email as a parameter
        navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        showError(initialResponse.message);
      }
    } catch (error) {
      showError('An unexpected error occurred during registration.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoadingSmallLogoIcon />
      <Title>Регистрация</Title>
      <FormContainer>
        {serverError && <FormErrorMessage message={serverError} />}

        <InputField label="Ваше имя" registration={register('fullName')} placeholder="Введите имя" error={errors.fullName} />
        <InputField label="Ваш E-mail" registration={register('email')} type="email" placeholder="Введите почту" error={errors.email} autoCapitalize="none" />
        <CheckboxGroup>
      <Checkbox
        id="acceptTerms"
        label={
          <>
            Я ознакомлен с <Link to="/terms">пользовательским соглашением</Link> и <Link to="/privacy">политикой конфиденциальности</Link>
          </>
        }
        checked={watch('acceptTerms')}
        onChange={handleCheckboxChange('acceptTerms')}
        error={!!errors.acceptTerms}
        errorMessage={errors.acceptTerms?.message}
      />
      <Checkbox
        id="acceptMarketing"
        label="Согласен на рассылку рекламных уведомлений"
        checked={watch('acceptMarketing')}
        onChange={handleCheckboxChange('acceptMarketing')}
      />
    </CheckboxGroup>

        <Button type="button" isLoading={isLoading} disabled={isLoading} onClick={handleInitialStep}>
          Отправить код
        </Button>

        <LinksContainer>
          Есть аккаунт? <Link to="/auth">Войти</Link>
        </LinksContainer>
      </FormContainer>
    </Container>
  );
};
