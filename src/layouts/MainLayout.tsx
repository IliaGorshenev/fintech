import { BurgerMenu, ChangeArrowsIcon, InvoiceIcon, MoneyIcon, PocketIcon } from '@/icons/icons';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background);
  position: relative;
`;

const Content = styled.main`
  flex: 3;
`;

const Navbar = styled.nav`
  position: sticky;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto; /* Center horizontally */
  border-radius: 16px;
  background: var(--background);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  display: flex; /* Changed to flex */
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 90%;
  box-sizing: border-box;
`;

const NavItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  width: 56px;
  height: 56px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  aspect-ratio: 1/1;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  /* Apply active state styling based on prop */
  background: ${(props) => (props.$isActive ? 'var(--focus_op_20_light, rgba(52, 76, 255, 0.20))' : 'transparent')};

  /* Dark mode specific styling for active state */
  .dark & {
    background: ${(props) => (props.$isActive ? 'var(--focus_op_20_dark, rgba(146, 222, 32, 0.20))' : 'transparent')};
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) setActiveTab('home');
    else if (path.includes('reshuffle')) setActiveTab('wallet');
    else if (path.includes('exchange')) setActiveTab('exchange');
    else if (path.includes('invoice')) setActiveTab('profile');
    else if (path.includes('settings')) setActiveTab('settings');
  }, [location]);

  return (
    <LayoutContainer>
      <Content>{children}</Content>
      <Navbar>
        <NavLink to="/dashboard">
          <NavItem $isActive={activeTab === 'home'}>
            <PocketIcon />
          </NavItem>
        </NavLink>

        <NavLink to="/reshuffle">
          <NavItem $isActive={activeTab === 'wallet'}>
            <MoneyIcon />
          </NavItem>
        </NavLink>

        <NavLink to="/exchange">
          <NavItem $isActive={activeTab === 'exchange'}>
            <ChangeArrowsIcon />
          </NavItem>
        </NavLink>

        <NavLink to="/invoice">
          <NavItem $isActive={activeTab === 'profile'}>
            <InvoiceIcon />
          </NavItem>
        </NavLink>

        <NavLink to="/settings">
          <NavItem $isActive={activeTab === 'settings'}>
            <BurgerMenu />
          </NavItem>
        </NavLink>
      </Navbar>
    </LayoutContainer>
  );
};

export default MainLayout;
