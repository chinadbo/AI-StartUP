import * as React from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "offcanvas" | "icon" | "none";
  collapsed?: boolean;
  onCollapse?: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsible = "offcanvas", children, collapsed, onCollapse, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={`h-full w-64 bg-background border-r ${className}`}
        {...props}
      >
        <div className="flex flex-col h-full">
          {children}
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`p-4 border-b flex items-center gap-2 ${className}`}
      {...props}
    />
  )
);

SidebarHeader.displayName = "SidebarHeader";

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex-1 overflow-y-auto p-2 ${className}`}
      {...props}
    />
  )
);

SidebarContent.displayName = "SidebarContent";

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, active, ...props }, ref) => (
    <div
      ref={ref}
      className={`p-2 rounded-md cursor-pointer ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-accent"
      } ${className}`}
      {...props}
    />
  )
);

SidebarItem.displayName = "SidebarItem";

export { Sidebar, SidebarHeader, SidebarContent, SidebarItem };