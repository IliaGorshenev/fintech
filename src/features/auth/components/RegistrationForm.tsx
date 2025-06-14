import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../../components/Form/Button';
import { FormErrorMessage } from '../../../components/Form/ErrorMessage';
import { InputField } from '../../../components/Form/InputField';

import { Checkbox, CheckboxGroup } from '@/components/Form/Checkbox';
import { LoadingSmallLogoIcon } from '@/components/icons';
import { fakeRegisterUser } from '../hooks/useAuth';

import { useErrorNotification } from '@/components/hooks/useError';
import { registrationEmailAtom, registrationUserDataAtom } from '@/store/auth';
import { initialRegistrationSchema } from '../validation/authSchemas';
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
      // @ts-ignore
      const initialResponse = await fakeRegisterUser(data);

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
            onChange={(e) => setValue('acceptTerms', e.target.checked)}
            error={!!errors.acceptTerms}
            errorMessage={errors.acceptTerms?.message}
          />
          <Checkbox
            id="acceptMarketing"
            label="Согласен на рассылку рекламных уведомлений"
            checked={watch('acceptMarketing')}
            onChange={(e) => setValue('acceptMarketing', e.target.checked)}
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
