import InputError from "@/Components/InputError";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

const StaffEdit = ({ user, roles }) => {
    const { data, setData, processing, patch, errors } = useForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        gender: user.gender || "",
        birthdate: user.birthdate || "",
        phone: user.phone || "",
        status: user.status === 1 ? "active" : "inactive",
        role_id: user.roles[0].id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route("pos.staff.update", user.id), {
            onSuccess: () => {
                router.visit(route("pos.staff.view", user.id));
            },
        });
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-16 w-16 rounded-full border">
                                <AvatarImage
                                    src=""
                                    alt={`${user.first_name} ${user.last_name}`}
                                />
                                <AvatarFallback className="rounded-full">
                                    UL
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <h1 className="font-bold text-lg">
                                    {user.full_name}
                                </h1>
                                <p className="text-xs">{user.roles[0].name.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="first_name">First Name:</Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    className="block w-full"
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.first_name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Last Name:</Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    className="block w-full"
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.last_name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Email:</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="block w-full"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Gender:</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(value) => {
                                        setData("gender", value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            <SelectItem value="m">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="f">
                                                Female
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.gender}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="birthdate">Birthdate:</Label>
                                <Input
                                    id="birthdate"
                                    type="date"
                                    value={data.birthdate}
                                    className="block w-full"
                                    onChange={(e) =>
                                        setData("birthdate", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.birthdate}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone:</Label>
                                <Input
                                    id="phone"
                                    type="number"
                                    value={data.phone}
                                    className="block w-full"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Status:</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => {
                                        setData("status", value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value={"active"}>
                                                Active
                                            </SelectItem>
                                            <SelectItem value={"inactive"}>
                                                Inactive
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label>Roles:</Label>
                                <Select
                                    value={data.role_id}
                                    onValueChange={(value) => {
                                        setData("role_id", parseInt(value));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Roles</SelectLabel>
                                            {roles.map((item, b) => (
                                                <SelectItem
                                                    value={item.id}
                                                    key={b}
                                                >
                                                    {item.name.toUpperCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.role_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 space-x-2">
                            <Link
                                className="flex items-center"
                                href={route("pos.staff.view", user.id)}
                            >
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button disabled={processing} variant="default">
                                {processing && (
                                    <LoaderCircle className="animate-spin" />
                                )}
                                {processing ? "Saving" : "Save"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

StaffEdit.layout = (page) => (
    <AuthenticatedLayout title={"Staff Detail"}>{page}</AuthenticatedLayout>
);

export default StaffEdit;
