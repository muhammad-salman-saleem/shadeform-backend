-- CreateTable
CREATE TABLE "Instance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cloud" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "shade_instance_type" TEXT NOT NULL,
    "cloud_instance_type" TEXT NOT NULL,
    "cloud_assigned_id" TEXT NOT NULL,
    "shade_cloud" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "configuration" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "ssh_user" TEXT NOT NULL,
    "ssh_port" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "cost_estimate" REAL NOT NULL,
    "hourly_price" INTEGER NOT NULL,
    "launch_configuration" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME
);
