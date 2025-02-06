import { ChartArea, ChartBar, Home, Inbox, Settings, ShoppingBag, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  

  const items = [
    {
      title: "Overview",
      url: "/",
      icon: ChartArea
  },
//   {
//     title: "Customers",
//     url: "/",
//     icon: User
// },
    {
        title: "Home",
        url: "/",
        icon: Home
    },
  //   {
  //     title: "Add Products",
  //     url: "/admin/newproduct",
  //     icon: ShoppingBag
  // },
    {
        title: "Inbox",
        url: "/",
        icon: Inbox
    },
    {
        title: "Settings",
        url: "/",
        icon: Settings
    },

  ]
  export function AppSidebar() {
    return (
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item)=>(
                    <SidebarMenuItem key={item.title}>
                        
                     <SidebarMenuButton asChild>
                        <a href={item.url}> 
                            <item.icon/>
                            <span>{item.title}</span>

                        </a>
                     </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  