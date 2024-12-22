import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const PermissionGroup = ({ title, permissions, handlePermissionToggle, data_permissions }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    {permissions.map((permission) => (
                        <div
                            className="flex items-center justify-between space-x-4"
                            key={permission.id}
                        >
                            <Label
                                htmlFor={`permission-${permission.id}`}
                                className="flex flex-col space-y-1"
                            >
                                <span>{permission.name}</span>
                                <span className="text-xs font-normal leading-snug text-muted-foreground">
                                    {permission.description}
                                </span>
                            </Label>
                            <Switch
                                id={`permission-${permission.id}`}
                                checked={data_permissions.permissions.includes(
                                    permission.id
                                )}
                                onCheckedChange={() =>
                                    handlePermissionToggle(permission.id)
                                }
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PermissionGroup;
