import Image from "next/image";
import { SearchAlert, Smartphone } from 'lucide-react';
import CustomerShopsTable from "@/components/customer/customerShopTable";

const CustomerDetailsPage = async ({ params }) => {
    const { customerId } = await params;
    const { default: prisma } = await import("@/lib/prisma");

    // fetch customer 
    const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        select: { phone: true },
    });

    if (!customer) {
        return (
            <div className=" h-dvh w-full flex flex-col items-center justify-center gap-4">
                <Image
                    src="/not-found.jpg"
                    alt="Customer Not Found"
                    width={400}
                    height={800}
                    priority
                />

                <p className="text-lg font-medium flex gap-1 items-center">
                    <SearchAlert className="text-error-text-1 size-5" /> Customer not found
                </p>
            </div>
        );
    }

    // fetch customer details  
    const customerShopDetails = await prisma.customer.findMany({
        where: {
            phone: customer.phone,
        },
        include: {
            shop: {
                select: {
                    shopName: true,
                    targetStamps: true,
                    reward: true,
                },
            }
        },
    });

    const sortedDetails = customerShopDetails.sort((a, b) => {
        const aRemaining = a.shop.targetStamps - a.stampCount;
        const bRemaining = b.shop.targetStamps - b.stampCount;

        return aRemaining - bRemaining; // smaller remaining first
    });


    const user = customerShopDetails[0]

    return (
        <div className="min-h-screen bg-custom-gradient p-4 space-y-6">
            {/* Header Section */}
            <div className="overflow-hidden rounded-3xl p-6 shadow-lg bg-linear-to-br from-primary via-secondary to-extra/60 text-muted">
                {/* Branding */}
                <div className="flex justify-between items-start">
                    <div>
                        <span className='logo-font'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span>

                        <h1 className="text-2xl font-bold mt-1 capitalize">
                            {user.name}
                        </h1>
                    </div>

                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-lg font-semibold">
                        {user.name?.charAt(0)}
                    </div>
                </div>

                {/* Decorative Stamp Badge */}
                <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-medium">
                    ⭐ Member Phone: +91 {user.phone}
                </div>
            </div>

            {/* Shops Table */}
            <CustomerShopsTable shops={sortedDetails} />
        </div>
    );
};

export default CustomerDetailsPage;
