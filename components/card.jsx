"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { featuresData } from "@/data/landing";

const CardComponent = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
			{featuresData.map((feature, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.2 }}>
					<Card className='p-8 bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl'>
						<CardContent className='space-y-6 flex flex-col items-center text-center'>
							<div className='text-blue-600 text-5xl'>{feature.icon}</div>
							<h3 className='text-2xl font-semibold text-gray-800'>{feature.title}</h3>
							<p className='text-gray-600'>{feature.description}</p>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</div>
	);
};

export default CardComponent;
