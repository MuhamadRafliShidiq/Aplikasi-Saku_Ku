import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
	const [accounts, transactions] = await Promise.all([getUserAccounts(), getDashboardData()]);

	const defaultAccount = accounts?.find((account) => account.isDefault);

	// Get budget for default account
	let budgetData = null;
	if (defaultAccount) {
		budgetData = await getCurrentBudget(defaultAccount.id);
	}

	return (
		<div className='space-y-8 p-6'>
			{/* Budget Progress */}
			<div className=''>
				<BudgetProgress
					className='bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-[1.02]'
					initialBudget={budgetData?.budget}
					currentExpenses={budgetData?.currentExpenses || 0}
				/>
			</div>

			{/* Dashboard Overview */}
			<div className='grid-cols-2'>
				<DashboardOverview
					className='bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-[1.02]'
					accounts={accounts}
					transactions={transactions || []}
				/>
			</div>

			{/* Accounts Grid */}
			<div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				<CreateAccountDrawer>
					<Card className='hover:shadow-lg transition-all cursor-pointer border-dashed border-2 border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-8 transform hover:scale-[1.05] hover:bg-gray-200'>
						<CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full pt-5'>
							<Plus className='h-12 w-12 text-gray-600 mb-3 transition-transform transform hover:rotate-180' />
							<p className='text-lg font-semibold text-gray-700'>Add New Account</p>
						</CardContent>
					</Card>
				</CreateAccountDrawer>
				{accounts.length > 0 &&
					accounts?.map((account) => (
						<AccountCard
							key={account.id}
							account={account}
						/>
					))}
			</div>
		</div>
	);
}
