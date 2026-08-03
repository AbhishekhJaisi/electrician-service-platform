-- Add email + customerId to Booking
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "email"      TEXT NOT NULL DEFAULT '';
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "customerId" INTEGER;

-- Create Customer table
CREATE TABLE IF NOT EXISTS "Customer" (
  "id"        SERIAL PRIMARY KEY,
  "email"     TEXT NOT NULL UNIQUE,
  "name"      TEXT NOT NULL DEFAULT '',
  "otp"       TEXT,
  "otpExpiry" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key
ALTER TABLE "Booking" ADD CONSTRAINT IF NOT EXISTS "Booking_customerId_fkey"
  FOREIGN KEY ("customerId") REFERENCES "Customer"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
