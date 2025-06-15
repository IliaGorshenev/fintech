import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface SelectFieldProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const SelectWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--foreground);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;
const SelectButton = styled.button<{ $isOpen: boolean; $hasError: boolean }>`
  width: 100%;
  height: 42px;
  min-height: 32px;
  padding: 8px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.$hasError ? 'var(--error)' : props.$isOpen ? 'var(--primary)' : 'var(--grey-700)')};
  border-radius: 8px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  background: var(--background);
  color: var(--foreground);
  cursor: pointer;
  text-align: left;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const ErrorText = styled.p`
  color: var(--error);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 0.25rem;
`;

const SelectedValue = styled.span<{ $isPlaceholder: boolean }>`
  color: ${(props) => (props.$isPlaceholder ? 'var(--grayscale_400, #a1a1aa)' : 'var(--foreground)')};
`;

const ArrowIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease;
`;

const OptionsContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: var(--background);
  border: 1px solid var(--grey-700);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  padding: 4px 0;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  background-color: ${(props) => (props.$isSelected ? 'rgba(52, 76, 255, 0.1)' : 'transparent')};
  color: ${(props) => (props.$isSelected ? 'var(--primary)' : 'var(--foreground)')};

  &:hover {
    background-color: rgba(52, 76, 255, 0.05);
  }

  &:active {
    background-color: rgba(52, 76, 255, 0.1);
  }
`;

// Hidden native select for form submission
const HiddenSelect = styled.select`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, onChange, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder || '';
  const isPlaceholder = !selectedOption && !!placeholder;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <SelectContainer ref={containerRef}>
        <SelectButton type="button" onClick={handleToggle} $isOpen={isOpen} $hasError={!!error}>
          <SelectedValue $isPlaceholder={isPlaceholder}>{displayValue}</SelectedValue>
          <ArrowIcon $isOpen={isOpen}>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.78 5.9668L9.4333 10.3135C8.49997 11.2468 8.49997 11.2468 7.56664 10.3135L3.21997 5.9668"
                stroke="#3F3D51"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ArrowIcon>
        </SelectButton>

        <OptionsContainer $isOpen={isOpen}>
          {placeholder && (
            <Option $isSelected={!value} onClick={() => handleOptionClick('')}>
              {placeholder}
            </Option>
          )}
          {options.map((option) => (
            <Option key={option.value} $isSelected={option.value === value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </Option>
          ))}
        </OptionsContainer>

        {/* Hidden native select for form submission */}
        <HiddenSelect value={value} onChange={(e) => onChange(e.target.value)}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </HiddenSelect>
      </SelectContainer>
      {error && <ErrorText role="alert">{error}</ErrorText>}
    </SelectWrapper>
  );
};
