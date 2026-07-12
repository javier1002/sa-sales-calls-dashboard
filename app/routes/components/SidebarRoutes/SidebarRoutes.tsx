"use client"
import { SidebarItem } from '@/components/SidebarItem/SidebarItem';
import { dataGeneralSidebar, dataToolsSidebar } from './SidebarRoutes.data';
import { Separator } from '@base-ui/react';

export function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p>GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator  />
        <div className="p-2 md:p-6">
          <p>TOOLS</p>
          {dataToolsSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}