import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";

const StaffView = ({ user }) => {
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
                                <p className="text-xs">
                                    {user.roles[0].name.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="destructive">Delete</Button>
                            <Link
                                className="flex items-center"
                                href={route("pos.staff.edit", user.id)}
                            >
                                <Button variant="outline">Edit</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label>First Name:</Label>
                            <div className="font-medium">{user.first_name}</div>
                        </div>
                        <div>
                            <Label>Last Name:</Label>
                            <div className="font-medium">{user.last_name}</div>
                        </div>
                        <div>
                            <Label>Created on:</Label>
                            <div className="font-medium">
                                {format(user.created_at, "yyyy-MM-dd hh:mm:ss")}
                            </div>
                        </div>
                        <div>
                            <Label>Email:</Label>
                            <div className="font-medium">{user.email}</div>
                        </div>
                        <div>
                            <Label>Gender:</Label>
                            <div className="font-medium">
                                {user.gender
                                    ? user.gender === "m"
                                        ? "Male"
                                        : "Female"
                                    : "-"}
                            </div>
                        </div>
                        <div>
                            <Label>Birthdate:</Label>
                            <div className="font-medium">
                                {user.birthdate
                                    ? format(user.birthdate, "dd MMMM yyyy")
                                    : "-"}
                            </div>
                        </div>
                        <div>
                            <Label>Phone:</Label>
                            <div className="font-medium">
                                {user.phone || "-"}
                            </div>
                        </div>
                        <div>
                            <Label>Status:</Label>
                            <div className="font-medium">
                                <Badge
                                    variant={
                                        user.status === 0
                                            ? "destructive"
                                            : "none"
                                    }
                                    className={
                                        user.status === 1 &&
                                        "bg-green-500 text-white"
                                    }
                                >
                                    {user.status === 1 ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

StaffView.layout = (page) => (
    <AuthenticatedLayout title={"Staff Detail"}>{page}</AuthenticatedLayout>
);

export default StaffView;
