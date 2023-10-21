-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('PENDING', 'GOOD', 'BLACKLISTED', 'LATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "MemberStatus" DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "InviteStatus";
