import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Award,
    DollarSign,
    ShoppingBag,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const salesData = [
    { date: "Mon", amount: 1200 },
    { date: "Tue", amount: 800 },
    { date: "Wed", amount: 1600 },
    { date: "Thu", amount: 1000 },
    { date: "Fri", amount: 1400 },
    { date: "Sat", amount: 2000 },
    { date: "Sun", amount: 1800 },
];

const Dashboard = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Sales Analytics Section */}
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Inventory Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Low Stock Items
                                </p>
                                <p className="text-2xl font-bold">24</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Top Selling
                                </p>
                                <p className="text-lg font-medium">
                                    Coffee Beans
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customer & Membership Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Membership Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    New Members
                                </p>
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-xs text-muted-foreground">
                                    +8% from last week
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Award className="mr-2 h-4 w-4 text-blue-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Top Level Members
                                </p>
                                <p className="text-2xl font-bold">45</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center space-x-4">
                            <DollarSign className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm font-medium">
                                    Total Sales Today
                                </p>
                                <p className="text-2xl font-bold">$2,456</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Users className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium">
                                    Active Members
                                </p>
                                <p className="text-2xl font-bold">1,234</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Award className="h-8 w-8 text-purple-500" />
                            <div>
                                <p className="text-sm font-medium">
                                    Active Vouchers
                                </p>
                                <p className="text-2xl font-bold">45</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <TrendingDown className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-sm font-medium">
                                    Low Stock Items
                                </p>
                                <p className="text-2xl font-bold">8</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

Dashboard.layout = (page) => (
    <AuthenticatedLayout title={"Dashboard"}>{page}</AuthenticatedLayout>
);

export default Dashboard;
