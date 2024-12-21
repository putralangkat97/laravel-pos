import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronDown, Eye } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const StaffIndex = ({ users }) => {
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedRows, setSelectedRows] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState({
        full_name: true,
        email: true,
        roles: true,
        actions: true,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Unified search handler
    const handleSearch = (value) => {
        setSearchQuery(value);
        const searchTerm = value.toLowerCase();

        const filtered = users.filter(
            (user) =>
                user.full_name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.roles[0].name.toLowerCase().includes(searchTerm)
        );

        setFilteredUsers(filtered);
        setCurrentPage(0);
    };

    const handleSort = (column) => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);

        const sorted = [...filteredUsers].sort((a, b) => {
            if (newDirection === "asc") {
                if (column === "email") {
                    return a.email.localeCompare(b.email);
                } else if (column === "full_name") {
                    return a.full_name.localeCompare(b.full_name);
                } else if (column === "roles") {
                    return a.roles[0].name.localeCompare(b.roles[0].name);
                }
            } else {
                if (column === "email") {
                    return b.email.localeCompare(a.email);
                } else if (column === "full_name") {
                    return b.full_name.localeCompare(a.full_name);
                } else if (column === "roles") {
                    return b.roles[0].name.localeCompare(a.roles[0].name);
                }
            }
        });

        setFilteredUsers(sorted);
    };

    // Selection handlers
    const toggleSelectAll = () => {
        if (Object.keys(selectedRows).length === filteredUsers.length) {
            setSelectedRows({});
        } else {
            const newSelected = {};
            filteredUsers.forEach((user) => {
                newSelected[user.id] = true;
            });
            setSelectedRows(newSelected);
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Staff</CardTitle>
                <CardDescription>List of all staff.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center gap-4">
                    <Input
                        placeholder="Search staff..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {Object.keys(visibleColumns).map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column}
                                    className="capitalize cursor-pointer"
                                    checked={visibleColumns[column]}
                                    onCheckedChange={(checked) =>
                                        setVisibleColumns((prev) => ({
                                            ...prev,
                                            [column]: checked,
                                        }))
                                    }
                                >
                                    {column.replace("_", " ")}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox
                                    checked={
                                        Object.keys(selectedRows).length ===
                                        filteredUsers.length
                                    }
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            {visibleColumns.full_name && (
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="font-semibold"
                                        onClick={() => handleSort("full_name")}
                                    >
                                        Full Name
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                            )}
                            {visibleColumns.email && (
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="font-semibold"
                                        onClick={() => handleSort("email")}
                                    >
                                        Email
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                            )}
                            {visibleColumns.roles && (
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="font-semibold"
                                        onClick={() => handleSort("roles")}
                                    >
                                        Role
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                            )}
                            {visibleColumns.actions && (
                                <TableHead>Actions</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows[user.id] || false}
                                        onCheckedChange={() =>
                                            toggleSelectRow(user.id)
                                        }
                                        aria-label={`Select ${user.full_name}`}
                                    />
                                </TableCell>
                                {visibleColumns.full_name && (
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "pos.staff.view",
                                                user.id
                                            )}
                                            className="hover:underline hover:font-medium"
                                        >
                                            {user.full_name}
                                        </Link>
                                    </TableCell>
                                )}
                                {visibleColumns.email && (
                                    <TableCell>{user.email}</TableCell>
                                )}
                                {visibleColumns.roles && (
                                    <TableCell>{user.roles[0].name}</TableCell>
                                )}
                                {visibleColumns.actions && (
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "pos.staff.view",
                                                user.id
                                            )}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}

                        {paginatedUsers.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        Object.values(visibleColumns).filter(
                                            Boolean
                                        ).length + 1
                                    }
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-end space-x-2 pt-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {Object.keys(selectedRows).length} of{" "}
                        {filteredUsers.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(0, prev - 1))
                            }
                            disabled={currentPage === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(totalPages - 1, prev + 1)
                                )
                            }
                            disabled={currentPage === totalPages - 1}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

StaffIndex.layout = (page) => (
    <AuthenticatedLayout title={"All Staff"}>{page}</AuthenticatedLayout>
);

export default StaffIndex;
