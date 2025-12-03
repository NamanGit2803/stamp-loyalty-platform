"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/StoreProvider";
import Illustration from "../Illustration";
import PlanCard from "./PlanCard";

function PlanPage() {
  const router = useRouter();
  const { shopStore, userStore } = useStore();

  const shopId = shopStore.shops[0]?.id;

  const handleContinue = async () => {
    if (!shopId) return console.error("Shop not found");
    // await shopStore.selectPlan(shopId, "PRO");
    router.push("/auth/signup/checkout");
  };

  return (

    <div className="min-h-screen w-full flex bg-custom-gradient">

      {/* LEFT ILLUSTRATION SECTION */}
      <Illustration imageSrc={'/plan1.png'} title={'Simple Pricing. Powerful Features.'} />

      {/* RIGHT SIGNUP CARD */}
      <PlanCard/>

    </div>
  );
}

export default observer(PlanPage);
