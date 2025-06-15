import { styled } from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--background);
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  display: flex;
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: var(--bg-avatar);
  margin-right: 12px;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--foreground);
`;

export const UserHandle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const SendButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #344cff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2a3fd1;
  }
`;

export const TopSection = styled.div`
  display: flex;
  padding: 24px;
  padding-top: 62px;
  flex-direction: column;
  align-items: stretch;
  border-radius: 0px 0px 24px 24px;
  background: var(--background);
  z-index: 10;

  /* header_shadow_light */
  box-shadow: 0px 4px 12px 0px rgba(52, 76, 255, 0.24);
`;

export const BalanceSection = styled.div`
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const BalanceLabel = styled.p`
  font-size: 14px;
  color: var(--foreground);
  margin: 0 0 8px 0;
`;

export const BalanceAmount = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: var(--foreground);
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: #344cff;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #2a3fd1;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 32px;
`;

export const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

export const ActionIcon = styled.div`
  border-radius: 8px;
  padding: 12px;
  background-color: var(--bg-icons);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: #344cff;
`;

export const ActionLabel = styled.span`
  font-size: 12px;
  color: var(--foreground);
  text-align: center;
`;

export const CurrencySection = styled.div`
  background-color: var(--background);
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--foreground);
`;

export const CurrencyHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 0 0 12px 0;
  margin-bottom: 12px;
`;

export const HeaderLabel = styled.span`
  font-size: 14px;
  color: var(--foreground);
  text-align: right;

  &:first-child {
    text-align: left;
  }
`;

export const CurrencyItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 12px 0;
`;

export const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CurrencyIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 12px;
  color: #555;
`;

export const CurrencyDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CurrencyName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
`;

export const IconWrapper = styled.div<{ bg: string; border: string }>`
  background-color: ${(props) => props.bg};
  border: 1px solid ${(props) => props.border};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 12px;

  & > svg {
    max-width: 26px;
  }
`;

export const CurrencyStyledTicker = styled.span<{ bg: string; color: string }>`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  align-self: baseline;
`;

export const RateValue = styled.span`
  font-size: 14px;
  color: var(--foreground);
  text-align: right;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 72px 24px 24px 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  background-color: var(--background);
  color: var(--foreground);
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const InputWithSymbol = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 16px;
    cursor: pointer;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  gap: 12px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: var(--primary);
  flex: 1;
`;
