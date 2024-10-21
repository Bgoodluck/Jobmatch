'use client';

import { membershipPlans } from "@/utils";
import { useParams } from 'next/navigation';
import { Button } from "../ui/button";

function MembershipFeatures() {
    // Use URL params to figure out which plan is being viewed
    const params = useParams();
    const selectedPlan = membershipPlans.find(plan => plan.type === params.type);

    return (
        <div className="mx-auto max-w-7xl py-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
                    {selectedPlan?.heading} Plan Features
                </h1>
                <p className="text-lg dark:text-white text-gray-600 mb-10">
                    All the benefits you get with the {selectedPlan?.heading} plan.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <ul className="list-disc pl-5 space-y-2 mb-8">
                    {/* Check if features is an array or an object */}
                    {Array.isArray(selectedPlan?.features) ? (
                        selectedPlan?.features.map((feature, idx) => (
                            <li key={idx} className="text-lg">
                                {feature}
                            </li>
                        ))
                    ) : (
                        <>
                            <h3 className="text-xl font-bold">Recruiter Features</h3>
                            {selectedPlan?.features.recruiter.map((feature, idx) => (
                                <li key={idx} className="text-lg">
                                    {feature}
                                </li>
                            ))}
                            <h3 className="text-xl font-bold mt-6">Candidate Features</h3>
                            {selectedPlan?.features.candidate.map((feature, idx) => (
                                <li key={idx} className="text-lg">
                                    {feature}
                                </li>
                            ))}
                        </>
                    )}
                </ul>

                <div className="text-center">
                    <Button className="px-5 py-3 bg-[tomato] text-white" onClick={() => history.back()}>
                        Back to Plans
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MembershipFeatures;
