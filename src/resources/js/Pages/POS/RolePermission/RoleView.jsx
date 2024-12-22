import PermissionGroup from "@/Components/PermissionGroup";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

const RoleView = ({ role, grouped_permissions, role_permissions }) => {
    const { data, setData, post, processing } = useForm({
        permissions: role_permissions,
    });

    console.log(data.permissions, role_permissions);
    const handlePermissionToggle = (permissionId) => {
        const newPermissions = data.permissions.includes(permissionId)
            ? data.permissions.filter((id) => id !== permissionId)
            : [...data.permissions, permissionId];

        setData("permissions", newPermissions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pos.staff.permissions.update", role.id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="mb-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>{role.name.toUpperCase()}</CardTitle>
                        <div className="flex space-x-2">
                            <Button variant="destructive">Delete</Button>
                            <Link
                                className="flex items-center"
                                href={route("pos.staff.edit", role.id)}
                            >
                                <Button variant="outline">Edit</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="mb-4">
                Permissions of the role{" "}
                <span className="font-bold">{role.name.toUpperCase()}</span>.
                You can turn on/off the permission.
            </div>

            <div className="space-y-4">
                {Object.entries(grouped_permissions).map(
                    ([group, permissions]) => (
                        <PermissionGroup
                            key={group}
                            title={group}
                            permissions={permissions}
                            data_permissions={data}
                            handlePermissionToggle={handlePermissionToggle}
                        />
                    )
                )}
            </div>

            <div className="mt-6">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </div>
        </form>
    );
};

RoleView.layout = (page) => (
    <AuthenticatedLayout title={"Role Detail"}>{page}</AuthenticatedLayout>
);

export default RoleView;
