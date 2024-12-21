import {
    Boxes,
    ChartNoAxesCombined,
    FileChartColumn,
    LayoutDashboard,
    Monitor,
    MonitorCheck,
    Settings,
    UserCheck,
    Users,
} from "lucide-react";
import { NavMain as NavApp } from "./NavMain";
import { NavMenu } from "./NavMenu";
import { NavUser } from "./NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";

export function AppSidebar({ ...props }) {
    const { url } = usePage();

    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        mainMenu: [
            {
                name: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
                isActive: url.startsWith("/dashboard"),
            },
            {
                name: "POS",
                url: "#",
                icon: Monitor,
                isActive: false,
            },
        ],
        navMain: [
            {
                title: "Sales",
                url: "#",
                icon: ChartNoAxesCombined,
                isActive: false,
                items: [
                    {
                        title: "Transaction History",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Refund/Returns",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Payment Method",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Sales Overview",
                        url: "#",
                        isActive: false,
                    },
                ],
            },
            {
                title: "Products",
                url: "#",
                icon: Boxes,
                isActive: false,
                items: [
                    {
                        title: "All Products",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Categories",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Stock Management",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Stock History",
                        url: "#",
                        isActive: false,
                    },
                ],
            },
            {
                title: "Membership",
                url: "#",
                icon: UserCheck,
                isActive: false,
                items: [
                    {
                        title: "All Customers",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Membership Levels",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Loyalty Points History",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Point Settings",
                        url: "#",
                        isActive: false,
                    },
                ],
            },
            {
                title: "Reports",
                url: "#",
                icon: FileChartColumn,
                isActive: false,
                items: [
                    {
                        title: "Daily Sales",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Product Sales",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Customer Reports",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Point Transactions",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Staff Performance",
                        url: "#",
                        isActive: false,
                    },
                ],
            },
            {
                title: "Staff",
                url: route("pos.staff.index"),
                icon: Users,
                isActive: (url.startsWith("/staff") || url.startsWith("/role")),
                items: [
                    {
                        title: "All Staff",
                        url: route("pos.staff.index"),
                        isActive: url.startsWith("/staff"),
                    },
                    {
                        title: "Roles & Permissions",
                        url: route("pos.role.index"),
                        isActive: url.startsWith("/role"),
                    },
                    {
                        title: "Activity Logs",
                        url: "#",
                        isActive: false,
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings,
                isActive: false,
                items: [
                    {
                        title: "Store Profile",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "User Profile",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "System Settings",
                        url: "#",
                        isActive: false,
                    },
                    {
                        title: "Backup/Restore",
                        url: "#",
                        isActive: false,
                    },
                ],
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <MonitorCheck className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        POS
                                    </span>
                                    <span className="truncate text-xs">
                                        Pro
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMenu projects={data.mainMenu} />
                <NavApp items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
