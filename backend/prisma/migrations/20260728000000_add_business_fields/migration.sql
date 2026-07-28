-- Add new fields to Business table
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "addressAs"     TEXT NOT NULL DEFAULT '';
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "radius"        INTEGER NOT NULL DEFAULT 15;
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "map"           TEXT NOT NULL DEFAULT '';
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "shortLocation" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "heroImage"     TEXT NOT NULL DEFAULT '';

-- Add nameAs to Service
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "nameAs" TEXT NOT NULL DEFAULT '';

-- Create License table
CREATE TABLE IF NOT EXISTS "License" (
  "id"         SERIAL PRIMARY KEY,
  "businessId" INTEGER NOT NULL,
  "label"      TEXT NOT NULL,
  "filename"   TEXT NOT NULL,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "License_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
