import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2, LogIn } from "lucide-react";

const Login = ({ status, canResetPassword, className, ...props }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>
                            Login with your email account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 block">
                                <Label
                                    className="flex items-center"
                                    htmlFor="remember_me"
                                >
                                    <Checkbox
                                        id="remember_me"
                                        checked={data.remember}
                                        onCheckedChange={(e) => {
                                            setData("remember", e);
                                        }}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </Label>
                            </div>

                            <div className="mt-4 flex items-center justify-center">
                                {canResetPassword && (
                                    <></>
                                    // <Link
                                    //     href={route("password.request")}
                                    //     className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    // >
                                    //     Forgot your password?
                                    // </Link>
                                )}

                                <Button
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <LogIn />
                                    )}{" "}
                                    Login
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

Login.layout = (page) => <GuestLayout title="Login">{page}</GuestLayout>;

export default Login;
