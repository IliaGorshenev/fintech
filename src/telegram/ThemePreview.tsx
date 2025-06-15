import React from 'react';
import { styled } from 'styled-components';

interface ThemePreviewProps {
  children: React.ReactNode;
}

const PreviewContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ThemePanel = styled.div`
  flex: 1;
  overflow: auto;
  height: 100%;
  position: relative;
`;

const ThemeLabel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1000;
`;

export const ThemePreview: React.FC<ThemePreviewProps> = ({ children }) => {
  return (
    <PreviewContainer>
      <ThemePanel>
        <ThemeLabel>Light Theme</ThemeLabel>

        <div className="light">{children}</div>
      </ThemePanel>
      <ThemePanel>
        <ThemeLabel>Dark Theme</ThemeLabel>

        <div className="dark">{children}</div>
      </ThemePanel>
    </PreviewContainer>
  );
};
