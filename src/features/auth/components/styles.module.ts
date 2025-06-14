import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  max-width: 345px;
  width: 100%;
  box-sizing: content-box;
  margin: 0 auto;
  height: 100%;
`;

export const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-bottom: 1rem;
`;

export const InfoText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
  text-align: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  margin-top: 24px;
  margin-bottom: 48px;
  color: var(--secondary_300, #3f3d51);
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px; /* 125% */
`;
export const LinksContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;

  a {
    color: #007bff;
    text-decoration: none;
    margin: 0 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CodeInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const CodeInput = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ResendLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  &:hover {
    color: #0056b3;
  }
`;
