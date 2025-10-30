import { getAllProperties } from "@/data/properties";

export async function generateStaticParams() {
  const properties = getAllProperties();

  return properties.map((property) => ({
    id: property.id,
  }));
}
