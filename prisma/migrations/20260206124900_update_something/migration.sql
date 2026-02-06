-- CreateIndex
CREATE INDEX "Customer_shopId_totalStampCount_idx" ON "Customer"("shopId", "totalStampCount");

-- CreateIndex
CREATE INDEX "Customer_shopId_phone_idx" ON "Customer"("shopId", "phone");

-- CreateIndex
CREATE INDEX "Customer_shopId_stampCount_idx" ON "Customer"("shopId", "stampCount");

-- CreateIndex
CREATE INDEX "Reward_shopId_createdAt_idx" ON "Reward"("shopId", "createdAt");

-- CreateIndex
CREATE INDEX "ScanVerification_shopId_status_createdAt_idx" ON "ScanVerification"("shopId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "ScanVerification_shopId_customerId_status_createdAt_idx" ON "ScanVerification"("shopId", "customerId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Shop_id_idx" ON "Shop"("id");
