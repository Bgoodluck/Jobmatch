// "use client";

// import { membershipPlans } from "@/utils";
// import CommonCard from "../common-card";
// import JobIcon from "../job-icon";
// import { Button } from "../ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   createPriceIdAction,
//   createStripePaymentAction,
//   updateProfileAction,
// } from "@/actions";
// import { loadStripe } from "@stripe/stripe-js";
// import { stripePK } from "@/constant";
// import { useEffect } from "react";

// const stripePromise = loadStripe(stripePK);

// function Membership({ profileInfo }) {
//   const router = useRouter();

//   const pathName = useSearchParams();

//   async function handlePayment(getCurrentPlan) {
//     const stripe = await stripePromise;

//     const extractPriceId = await createPriceIdAction({
//       amount: Number(getCurrentPlan?.price),
//     });

//     if (extractPriceId) {
//       sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
//       const result = await createStripePaymentAction({
//         lineItems: [
//           {
//             price: extractPriceId?.id,
//             quantity: 1,
//           },
//         ],
//       });
//       console.log(result);
//       await stripe.redirectToCheckout({
//         sessionId: result?.id,
//       });
//     }
//     console.log(extractPriceId);
//   }

//   async function updateProfile() {
//     const fetchCurrentPlanFromSessionStorage = JSON.parse(
//       sessionStorage.getItem("currentPlan")
//     );
//     await updateProfileAction(
//       {
//         ...profileInfo,
//         isPremiumUser: true,
//         memberShipType: fetchCurrentPlanFromSessionStorage?.type,
//         memberShipStartDate: new Date().toString(),
//         membershipEndDate: new Date(
//           new Date().getFullYear() +
//             fetchCurrentPlanFromSessionStorage?.type ===
//           "basic"
//             ? 1
//             : fetchCurrentPlanFromSessionStorage?.plan === "silver"
//             ? 2
//             : fetchCurrentPlanFromSessionStorage?.plan === "platinum"
//             ? 5
//             : 7,
//           new Date().getMonth(),
//           new Date().getDay()
//         ),
//       },
//       "/membership"
//     );
//   }

//   useEffect(() => {
//     if (pathName.get("status") === "success") {
//       updateProfile();
//     }
//   }, [pathName]);

//   console.log(profileInfo);

//   return (
//     <div className="mx-auto max-w-7xl">
//       <div className="flex items-baseline justify-between border-b pb-6 pt-24:">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-950">
//           {profileInfo?.isPremiumUser
//             ? "You are a premium user"
//             : "Choose a Plan"}
//         </h1>
//         <div>
//           {profileInfo?.isPremiumUser ? (
//             <Button
//               className="flex h-11 items-center justify-center px-5"
//               style={{
//                 backgroundColor: membershipPlans.find(
//                   (plan) => plan.type === profileInfo?.memberShipType
//                 )?.color,
//               }}
//             >
//               {
//                 membershipPlans.find(
//                   (planItem) => planItem.type === profileInfo?.memberShipType
//                 ).heading
//               }
//             </Button>
//           ) : null}
//         </div>
//       </div>
//       <div className="py-20 pb-24 pt-6">
//         <div className="container mx-auto p-0 space-y-8">
//           <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
//             {membershipPlans.map((plan, index) => (
//               <CommonCard
//                 key={index}
//                 icon={
//                   <div className="flex justify-between">
//                     <div>
//                       <JobIcon />
//                     </div>
//                     <h1 className="font-bold text-2xl">{plan.heading}</h1>
//                   </div>
//                 }
//                 jobTitle={`₦ ${plan.price} /yr`}
//                 description={plan.type}
//                 footerContent={
//                   <>
//                     <Button
//                       className="flex h-11 items-center justify-center px-5 mr-2 "
//                       onClick={() =>
//                         router.push(`/memberfeatures/${plan.type}`)
//                       }
//                     >
//                       View Features
//                     </Button>

//                     {profileInfo?.memberShipType === "gold" ||
//                       (profileInfo?.memberShipType === "basic" &&
//                         index === 0) ||
//                       (profileInfo?.memberShipType === "silver" &&
//                         index >= 0 &&
//                         index < 2) ||
//                       (profileInfo?.memberShipType === "platinum" &&
//                       index >= 3 &&
//                       index < 3 ? null : (
//                         <Button
//                           className="disabled:opacity-55 flex h-11 items-center justify-center px-5"
//                           style={{ backgroundColor: plan.color }}
//                           onClick={() => handlePayment(plan)}
//                         >
//                           {
//                             profileInfo?.memberShipType === "basic" ||
//                             profileInfo?.memberShipType === "silver" ||
//                             profileInfo?.memberShipType === "platinum" ?
//                             "Upgrade Plan" : "Get Premium"
//                           }
//                         </Button>
//                       ))}
//                   </>
//                 }
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Membership;


"use client";

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createPriceIdAction,
  createStripePaymentAction,
  updateProfileAction,
} from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { stripePK } from "@/constant";
import { useEffect } from "react";

const stripePromise = loadStripe(stripePK);

const planOrder = ["basic", "silver", "platinum", "gold"]; // Define the order of plans

function Membership({ profileInfo }) {
  const router = useRouter();
  const pathName = useSearchParams();

  async function handlePayment(getCurrentPlan) {
    const stripe = await stripePromise;

    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });

    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });
      console.log(result);
      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }
    console.log(extractPriceId);
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );
    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toString(),
        membershipEndDate: new Date(
          new Date().getFullYear() +
            (fetchCurrentPlanFromSessionStorage?.type === "basic"
              ? 1
              : fetchCurrentPlanFromSessionStorage?.type === "silver"
              ? 2
              : fetchCurrentPlanFromSessionStorage?.type === "platinum"
              ? 5
              : 7),
          new Date().getMonth(),
          new Date().getDay()
        ),
      },
      "/membership"
    );
  }

  useEffect(() => {
    if (pathName.get("status") === "success") {
      updateProfile();
    }
  }, [pathName]);

  console.log(profileInfo);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between dark:border-white border-b pb-6 pt-24:">
        <h1 className="text-3xl font-bold tracking-tight dark:text-white text-gray-950">
          {profileInfo?.isPremiumUser
            ? "You are a premium user"
            : "Choose a Plan"}
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button
              className="flex h-11 items-center justify-center px-5 dark:text-black"
              style={{
                backgroundColor: membershipPlans.find(
                  (plan) => plan.type === profileInfo?.memberShipType
                )?.color,
              }}
            >
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => {
              const currentPlanIndex = planOrder.indexOf(profileInfo?.memberShipType);
              const isDisabled = planOrder.indexOf(plan.type) <= currentPlanIndex;

              return (
                <CommonCard
                  key={index}
                  icon={
                    <div className="flex justify-between">
                      <div>
                        <JobIcon />
                      </div>
                      <h1 className="font-bold text-2xl dark:text-black">{plan.heading}</h1>
                    </div>
                  }
                  jobTitle={`₦ ${plan.price} /yr`}
                  description={plan.type}
                  footerContent={
                    <>
                      <Button
                        className="flex h-11 items-center justify-center px-5 mr-2"
                        onClick={() =>
                            router.push(`/memberfeatures/${plan.type}`)
                        }
                      >
                        View Features
                      </Button>

                      <Button
                        className={`flex h-11 items-center justify-center px-5 ${isDisabled ? "disabled:opacity-55" : ""}`}
                        style={{ backgroundColor: plan.color }}
                        onClick={() => !isDisabled && handlePayment(plan)}
                        disabled={isDisabled}
                      >
                        {isDisabled ? "Upgrade Plan" : "Get Premium"}
                      </Button>
                    </>
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
