import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
	await checkUser();

	return (
		<header className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
			<nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
				<Link href='/'>
					<Image
						src={"/logo.png"}
						alt='Welth Logo'
						width={100}
						height={50}
						className='ml-10'
					/>
				</Link>

				{/* Navigation Links - Different for signed in/out users */}
				<div className='hidden md:flex items-center space-x-8'>
					<SignedOut>
						<a
							href='#features'
							className='text-gray-600 hover:text-blue-600'>
							Features
						</a>
						<a
							href='#testimonials'
							className='text-gray-600 hover:text-blue-600'>
							Testimonials
						</a>
					</SignedOut>
				</div>

				{/* Action Buttons */}
				<div className='flex items-center space-x-4'>
					<SignedIn>
						<Link
							href='/dashboard'
							className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
							<Button
								variant='outline'
								type='button'
								className={"bg-blue-500 hover:bg-blue-600 text-white hover:text-white-foreground"}>
								<LayoutDashboard size={18} />
								<span className='hidden md:inline'>Dashboard</span>
							</Button>
						</Link>
						<a href='/transaction/create'>
							<Button className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white hover:text-white-foreground'>
								<PenBox size={18} />
								<span className='hidden md:inline'>Add Transaction</span>
							</Button>
						</a>
					</SignedIn>
					<SignedOut>
						<SignInButton forceRedirectUrl='/dashboard'>
							<Button
								className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white hover:text-white-foreground'
								variant='outline'>
								Login
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									avatarBox: "w-10 h-10",
								},
							}}
						/>
					</SignedIn>
				</div>
			</nav>
		</header>
	);
};

export default Header;
