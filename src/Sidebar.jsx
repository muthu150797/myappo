import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
  CDBBadge,
  CDBIcon,
} from 'cdbreact';

const SubMenu = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <CDBSidebarMenuItem icon={icon} onClick={toggleSubMenu}>
        {title}
      </CDBSidebarMenuItem>
      {isOpen && <div style={{ paddingLeft: '20px' }}>{children}</div>}
    </>
  );
};

const Sidebar = () => {
  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader>
        Admin Panel
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem
            suffix={
              <CDBBadge color="danger" size="small" borderType="pill">
                new
              </CDBBadge>
            }
            icon="th-large"
          >
            Dashboard
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="sticky-note"
            suffix={
              <CDBBadge color="danger" size="small" borderType="pill">
                new
              </CDBBadge>
            }
          >
           <Link className="sidebar-nav" to="/dashboard/settings" style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>Settings</Link>
          </CDBSidebarMenuItem>

          {/* Custom Multi-Level Menu */}
          <SubMenu title="Account" icon="user" className="icon-lg"  suffix={
              <CDBBadge  size="small" borderType="pill">
                <span class="pro-arrow-wrapper"><span class="pro-arrow"></span></span>
              </CDBBadge>
            }>
            <CDBSidebarMenuItem >
            <Link className="sidebar-nav" to="/dashboard/home" style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>Users</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>Dapartments</CDBSidebarMenuItem>
            <CDBSidebarMenuItem>Payments</CDBSidebarMenuItem>
          </SubMenu>

          <SubMenu title="Sidemenu2" icon="book">
            <CDBSidebarMenuItem>submenu 1</CDBSidebarMenuItem>
            <CDBSidebarMenuItem>submenu 2</CDBSidebarMenuItem>
            <CDBSidebarMenuItem>submenu 3</CDBSidebarMenuItem>
          </SubMenu>

          <SubMenu title="MultiLevel with Icon" icon="table">
            <CDBSidebarMenuItem>submenu 1</CDBSidebarMenuItem>
            <CDBSidebarMenuItem>submenu 2</CDBSidebarMenuItem>
            <SubMenu title="submenu 3">
              <CDBSidebarMenuItem>submenu 3.1</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>submenu 3.2</CDBSidebarMenuItem>
              <SubMenu title="subnt">
                <CDBSidebarMenuItem>submenu 3.3.1</CDBSidebarMenuItem>
                <CDBSidebarMenuItem>submenu 3.3.2</CDBSidebarMenuItem>
                <CDBSidebarMenuItem>submenu 3.3.3</CDBSidebarMenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 5px',
          }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
