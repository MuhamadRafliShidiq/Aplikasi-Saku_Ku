"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
	const imageRef = useRef(null);

	useEffect(() => {
		const imageElement = imageRef.current;

		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const scrollThreshold = 100;

			if (scrollPosition > scrollThreshold) {
				imageElement.classList.add("scrolled");
			} else {
				imageElement.classList.remove("scrolled");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className='pt-30 pb-20 px-4'>
			<div className='container mx-auto text-center'>
				<h1 className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-[75px] pb-6 font-extrabold tracking-tighter pr-2 pb-2'>
					Kelola Keuangan Cerdas <br /> dengan AI
				</h1>
				<p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'> Pantau, Analisis, dan Optimalkan Pengeluaran Secara Real-Time!</p>
				<div className='flex justify-center space-x-4'>
					<Link href='/dashboard'>
						<Button
							size='lg'
							className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white hover:text-white-foreground'>
							Get Started
						</Button>
					</Link>
					{/* <Link href='https://www.youtube.com/roadsidecoder'>
						<Button
							size='lg'
							variant='outline'
							className='px-8'>
							Watch Demo
						</Button>
					</Link> */}
				</div>
				<div className='hero-image-wrapper mt-5 md:mt-5'>
					<div
						ref={imageRef}
						className='hero-image'>
						<Image
							src='/banner.png'
							width={980}
							height={420}
							alt='Dashboard Preview'
							className='rounded-lg shadow-2xl border mx-auto'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
