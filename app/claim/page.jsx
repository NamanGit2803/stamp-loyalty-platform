import ClaimPage from "@/components/claimPage/claimPageComponent";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const shopId = params.shopId;

  return <ClaimPage shopId={shopId} />;
}
