import { styled } from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

export const AvatarContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--bg-avatar);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const UserName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--foreground);
`;

export const UserTier = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 16px;
  background: var(--secondary-100);
  font-size: 14px;
  color: var(--foreground);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
`;

export const EditButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--green-100);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const DataList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DataLabel = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

export const DataValue = styled.span`
  font-size: 16px;
  color: var(--foreground);
`;

export const LanguageButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  cursor: pointer;
  margin-top: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
`;
