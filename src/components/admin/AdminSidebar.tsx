import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Calendar,
  BookOpen,
  Images,
  Newspaper,
  Settings,
  Shield,
  Database,
  BarChart3,
  LogOut,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: BarChart3, exactPath: true },
  { title: 'Faculty Management', url: '/admin/faculty', icon: Users },
  { title: 'Events Management', url: '/admin/events', icon: Calendar },
  { title: 'Content', url: '/admin/materials', icon: BookOpen },
  { title: 'Gallery Management', url: '/admin/gallery', icon: Images },
  { title: 'News & Articles', url: '/admin/news', icon: Newspaper },
  { title: 'Backup & Restore', url: '/admin/backup', icon: Database },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string, exactPath?: boolean) => {
    if (exactPath) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getNavClass = (path: string, exactPath?: boolean) =>
    isActive(path, exactPath)
      ? "bg-primary text-primary-foreground"
      : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="hover:bg-muted/50">
                    <Home className="h-4 w-4" />
                    {!collapsed && <span>Back to Site</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url, item.exactPath)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          {!collapsed && (
            <div className="mb-2 p-2 bg-muted/50 rounded text-xs">
              <div className="font-medium">{user?.name}</div>
              <div className="text-muted-foreground capitalize">{user?.role}</div>
            </div>
          )}
          <Button
            variant="outline"
            size={collapsed ? "icon" : "sm"}
            onClick={logout}
            className="w-full"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
