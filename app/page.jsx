import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { howItWorksData, statsData, testimonialsData } from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import CardComponent from "@/components/card";

export default function Home() {
	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<HeroSection />
			{/* Stats Section */}
			<section className='py-20 bg-blue-50'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						{statsData.map((stat, index) => (
							<div
								key={index}
								className='text-center'>
								<div className='text-4xl font-bold text-blue-600 mb-2'>{stat.value}</div>
								<div className='text-gray-600'>{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				id='features'
				className='py-20'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-12'>Segala yang Anda butuhkan untuk mengelola keuangan Anda</h2>
					<CardComponent />
				</div>
			</section>

			{/* How It Works Section */}
			<section className='py-20 bg-blue-50'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-16'>Cara Kerjanya</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
						{howItWorksData.map((step, index) => (
							<div
								key={index}
								className='text-center'>
								<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>{step.icon}</div>
								<h3 className='text-xl font-semibold mb-4'>{step.title}</h3>
								<p className='text-gray-600'>{step.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section
				id='testimonials'
				className='py-20'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-16'>Apa Kata Pengguna Kami?</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{testimonialsData.map((testimonial, index) => (
							<Card
								key={index}
								className='p-6'>
								<CardContent className='pt-4'>
									<div className='flex items-center mb-4'>
										<Image
											src={testimonial.image}
											alt={testimonial.name}
											width={40}
											height={40}
											className='rounded-full'
										/>
										<div className='ml-4'>
											<div className='font-semibold'>{testimonial.name}</div>
											<div className='text-sm text-gray-600'>{testimonial.role}</div>
										</div>
									</div>
									<p className='text-gray-600'>{testimonial.quote}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-blue-600'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold text-white mb-4'>Ready to Take Control of Your Finances?</h2>
					<p className='text-blue-100 mb-8 max-w-2xl mx-auto'>Bergabunglah dengan ribuan pengguna yang telah mengelola keuangan mereka lebih cerdas dengan Saku-Ku</p>
					<Link href='/dashboard'>
						<Button
							size='lg'
							className='bg-white text-blue-600 hover:bg-blue-50 animate-bounce'>
							Start Free Trial
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
