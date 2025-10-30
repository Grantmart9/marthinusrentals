import { getAllProperties } from "@/data/properties";

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const properties = getAllProperties();

  return properties.map((property) => ({
    id: property.id,
  }));
}

import { Suspense } from "react";
import PropertyDetailPage from "./PropertyDetailPage";

// Server component wrapper with Suspense for useSearchParams
export default function PropertyDetailPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyDetailPage />
    </Suspense>
  );
}
