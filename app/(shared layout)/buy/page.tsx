import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Ticket, Shirt } from "lucide-react";

export default async function BuyPage() {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
            <div className="text-center mb-14">
                <h1 className="text-4xl font-bold text-white">
                    What We Offer
                </h1>
                <p className="mt-6 text-l text-gray-200">
                    Experience TEDxIITPatna through our exclusive offerings
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
                <div className="flex-1 bg-gray-100 rounded-xl shadow-xl p-10 flex flex-col items-center text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="mb-8">
                        <Ticket className="size-14 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Event Tickets
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-10">
                        Secure your spot at TEDxIITPatna. Limited seats
                        available.
                    </p>
                    <button className="w-full rounded-xl bg-red-600 py-5 text-lg font-semibold text-white transition hover:bg-red-700">
                        Get Tickets
                    </button>
                </div>
                <div className="flex-1 bg-gray-100 rounded-xl shadow-xl p-10 flex flex-col items-center text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="mb-8">
                        <Shirt className="size-14 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Official Merchandise
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-10">
                        Exclusive TEDxIITPatna branded items. Hoodies,
                        T-shirts, and more.
                    </p>
                    <button className="w-full rounded-xl bg-red-600 py-5 text-lg font-semibold text-white transition hover:bg-red-700">
                        Get Merchandise
                    </button>
                </div>

            </div>
        </div>
    );
}