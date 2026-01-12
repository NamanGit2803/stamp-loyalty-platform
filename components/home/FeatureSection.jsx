"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
    Users,
    Gift,
    LineChart,
    Smartphone,
    BarChart3,
    Shield,
} from "lucide-react";

const FeatureSection = () => {
    const features = [
        {
            icon: Users,
            title: "Customer Management",
            description: "Track and manage all your customers in one place.",
        },
        {
            icon: Gift,
            title: "Loyalty Rewards",
            description: "Create stamp cards and reward systems easily.",
        },
        {
            icon: LineChart,
            title: "Sales Analytics",
            description: "Track sales, revenue, and customer insights.",
        },
        {
            icon: Smartphone,
            title: "Mobile Friendly",
            description: "Access your business from anywhere, anytime.",
        },
        {
            icon: BarChart3,
            title: "Smart Reports",
            description: "Get detailed reports on customer behavior.",
        },
        {
            icon: Shield,
            title: "Secure & Safe",
            description: "Enterprise-level security for your data.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-15">
            {/* Heading */}
            <div className="text-center mb-11 sm:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
                    Powerful Features
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                    Everything you need to build and manage customer loyalty programs
                </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <Card
                            key={index}
                            className=" p-8 border border-border/50 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 
                transition-all 
                bg-white/90 
                backdrop-blur-sm
              "
                        >
                            <div
                                className="
                w-14 h-14 
                flex items-center justify-center 
                rounded-xl 
                bg-secondary/10
                text-primary 
                mb-4
                shadow-inner
              "
                            >
                                <Icon size={28} strokeWidth={1.8} />
                            </div>

                            <h3 className="text-xl font-semibold text-primary mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default FeatureSection;
