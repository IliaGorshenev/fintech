import { styled } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  min-height: 100vh;
  width: 100%;
  padding: 24px;
  padding-top: 62px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--foreground);
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--input-bg);
  color: var(--foreground);
  font-size: 16px;
  margin-bottom: 16px;

  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

export const FileUploadSection = styled.div`
  margin-bottom: 20px;
`;

export const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  color: var(--primary);
  cursor: pointer;
  margin-bottom: 12px;

  input {
    display: none;
  }

  svg {
    margin-right: 8px;
  }
`;

export const FileList1 = styled.div`
  margin-top: 12px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: var(--input-bg);
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const FileIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: var(--text-secondary);
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-right: 8px;
`;

export const FileName = styled.span`
  flex: 1;
  font-size: 14px;
  color: var(--foreground);
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: var(--error);
  }
`;
