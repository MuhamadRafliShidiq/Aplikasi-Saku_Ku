"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5", "#9FA8DA"];

export function DashboardOverview({ accounts, transactions }) {
	const [selectedAccountId, setSelectedAccountId] = useState(accounts.find((a) => a.isDefault)?.id || accounts[0]?.id);

	const accountTransactions = transactions.filter((t) => t.accountId === selectedAccountId);

	const recentTransactions = accountTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

	const currentDate = new Date();
	const currentMonthExpenses = accountTransactions.filter((t) => {
		const transactionDate = new Date(t.date);
		return t.type === "EXPENSE" && transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear();
	});

	const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
		const category = transaction.category;
		if (!acc[category]) {
			acc[category] = 0;
		}
		acc[category] += transaction.amount;
		return acc;
	}, {});

	const pieChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
		name: category,
		value: amount,
	}));

	return (
		<div className='grid gap-6 md:grid-cols-2'>
			<div>
				<Card className='shadow-lg hover:shadow-xl transition duration-300'>
					<CardHeader className='flex flex-row items-center justify-between pb-4'>
						<CardTitle className='text-lg font-semibold'>Recent Transactions</CardTitle>
						<Select
							value={selectedAccountId}
							onValueChange={setSelectedAccountId}>
							<SelectTrigger className='w-[160px]'>
								<SelectValue placeholder='Select account' />
							</SelectTrigger>
							<SelectContent>
								{accounts.map((account) => (
									<SelectItem
										key={account.id}
										value={account.id}>
										{account.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{recentTransactions.length === 0 ? (
								<p className='text-center text-muted-foreground py-4'>No recent transactions</p>
							) : (
								recentTransactions.map((transaction) => (
									<div
										key={transaction.id}
										className='flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition duration-200'>
										<div>
											<p className='text-sm font-medium'>{transaction.description || "Untitled"}</p>
											<p className='text-xs text-muted-foreground'>{format(new Date(transaction.date), "PP")}</p>
										</div>
										<div className={cn("flex items-center text-sm font-semibold", transaction.type === "EXPENSE" ? "text-red-500" : "text-green-500")}>
											{transaction.type === "EXPENSE" ? <ArrowDownRight className='mr-1 h-4 w-4' /> : <ArrowUpRight className='mr-1 h-4 w-4' />}${transaction.amount.toFixed(2)}
										</div>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<div>
				<Card className='shadow-lg hover:shadow-xl transition duration-300'>
					<CardHeader>
						<CardTitle className='text-lg font-semibold'>Monthly Expense Breakdown</CardTitle>
					</CardHeader>
					<CardContent className='p-0 pb-5 flex justify-center'>
						{pieChartData.length === 0 ? (
							<p className='text-center text-muted-foreground py-4'>No expenses this month</p>
						) : (
							<div className='h-[300px] w-full flex items-center justify-center'>
								<ResponsiveContainer
									width='100%'
									height='100%'>
									<PieChart>
										<Pie
											data={pieChartData}
											cx='50%'
											cy='50%'
											outerRadius={90}
											fill='#8884d8'
											dataKey='value'
											label={({ name, value }) => `${name}: $${value.toFixed(2)}`}>
											{pieChartData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
													className='transition duration-200 hover:opacity-75'
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(value) => `$${value.toFixed(2)}`}
											contentStyle={{
												backgroundColor: "hsl(var(--popover))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "var(--radius)",
											}}
										/>
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
