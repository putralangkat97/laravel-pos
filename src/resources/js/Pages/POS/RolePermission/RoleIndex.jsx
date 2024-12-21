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

const RoleIndex = ({ roles }) => {
    const [filteredRoles, setFilteredRoles] = useState(roles);
    const [selectedRows, setSelectedRows] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        actions: true,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Unified search handler
    const handleSearch = (value) => {
        setSearchQuery(value);
        const searchTerm = value.toLowerCase();

        const filtered = roles.filter((role) =>
            role.name.toLowerCase().includes(searchTerm)
        );

        setFilteredRoles(filtered);
        setCurrentPage(0);
    };

    const handleSort = (column) => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);

        const sorted = [...filteredRoles].sort((a, b) => {
            if (newDirection === "asc") {
                if (column === "name") {
                    return a.name.localeCompare(b.name);
                }
            } else {
                if (column === "name") {
                    return b.name.localeCompare(a.name);
                }
            }
        });

        setFilteredRoles(sorted);
    };

    // Selection handlers
    const toggleSelectAll = () => {
        if (Object.keys(selectedRows).length === filteredRoles.length) {
            setSelectedRows({});
        } else {
            const newSelected = {};
            filteredRoles.forEach((role) => {
                newSelected[role.id] = true;
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
    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const paginatedRoles = filteredRoles.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Roles</CardTitle>
                <CardDescription>List of all roles.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center gap-4">
                    <Input
                        placeholder="Search role..."
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
                                        filteredRoles.length
                                    }
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            {visibleColumns.name && (
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="font-semibold"
                                        onClick={() => handleSort("name")}
                                    >
                                        Role Name
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
                        {paginatedRoles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows[role.id] || false}
                                        onCheckedChange={() =>
                                            toggleSelectRow(role.id)
                                        }
                                        aria-label={`Select ${role.name}`}
                                    />
                                </TableCell>
                                {visibleColumns.name && (
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "pos.staff.view",
                                                role.id
                                            )}
                                            className="hover:underline hover:font-medium"
                                        >
                                            {role.name}
                                        </Link>
                                    </TableCell>
                                )}
                                {visibleColumns.actions && (
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "pos.staff.view",
                                                role.id
                                            )}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}

                        {paginatedRoles.length === 0 && (
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
                        {filteredRoles.length} row(s) selected.
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

RoleIndex.layout = (page) => (
    <AuthenticatedLayout title={"All Roles"}>{page}</AuthenticatedLayout>
);

export default RoleIndex;
