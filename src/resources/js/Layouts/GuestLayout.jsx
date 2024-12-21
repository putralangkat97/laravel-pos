import { Head, Link } from "@inertiajs/react";
import { MonitorCheck } from "lucide-react";

export default function GuestLayout({ children, title = "POS" }) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 self-center font-medium text-lg"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <MonitorCheck className="size-4" />
                        </div>
                        Point of Sales
                    </Link>
                    {children}
                </div>
            </div>
        </>
    );
}
