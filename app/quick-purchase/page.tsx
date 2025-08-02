// page.tsx (in app/quick-purchase/)
import { Suspense } from "react";
import QuickPurchaseClient from "@/components/common/QuickPurchaseClient";

export default function QuickPurchasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuickPurchaseClient />
    </Suspense>
  );
}
