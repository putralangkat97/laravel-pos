import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./Partials/AppSidebar";
import { Head } from "@inertiajs/react";

export default function AuthenticatedLayout({ children, title = "POS" }) {
    return (
        <>
            <Head title={title} />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {/* <header className="flex h-16 shrink-0 items-center gap-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"> */}
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-6">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
