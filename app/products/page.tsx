import type { Metadata } from "next";
import ProductsCatalog from "@/components/ProductsCatalog";

export const metadata: Metadata = {
  title: "Products — HustleHome",
  description:
    "The full HustleHome catalog: verified vendor bundles, an unban bundle, and a receipt bundle — delivered digitally.",
};

export default function ProductsPage() {
  return (
    <main>
      <section>
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-[120px]">
          <h1 className="font-display text-h1 text-white">All products</h1>
          <p className="mt-3 max-w-2xl text-body-sm text-ash">
            Digital guides, vendor lists, and tools — delivered to your inbox
            within an hour of purchase.
          </p>

          <div className="mt-10">
            <ProductsCatalog />
          </div>
        </div>
      </section>
    </main>
  );
}
