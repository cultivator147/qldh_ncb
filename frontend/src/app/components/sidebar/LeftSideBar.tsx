import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';
import "../../../App.css";
import { SidebarData, SidebarItem } from './SidebarItem';
export const LeftSideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-list'>
     {SidebarData.map((data) => (<SidebarItem title={data.title} icon={data.icon} link={data.link}/>))}
     </div>

    </div>
  );
}