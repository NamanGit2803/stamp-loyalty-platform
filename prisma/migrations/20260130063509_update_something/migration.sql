-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "cashfreeEvent" TEXT,
ADD COLUMN     "cashfreeMandateId" TEXT,
ADD COLUMN     "cashfreeOrderId" TEXT,
ADD COLUMN     "cashfreePaymentId" TEXT,
ADD COLUMN     "cashfreeSubscriptionId" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "cashfreeMandateId" TEXT,
ADD COLUMN     "cashfreeSubscriptionId" TEXT;
