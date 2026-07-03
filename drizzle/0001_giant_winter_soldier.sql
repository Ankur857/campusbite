CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"rating" numeric(2, 1) DEFAULT '0',
	"rating_count" integer DEFAULT 0,
	"stock" integer DEFAULT 100,
	"prep_time" integer DEFAULT 10,
	"is_veg" boolean DEFAULT true,
	"is_trending" boolean DEFAULT false,
	"is_popular" boolean DEFAULT false,
	"available" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cart_id" uuid NOT NULL,
	"food_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price_at_addition" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "image_url" TO "image";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "clerk_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER'::"public"."role";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bite_points" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "category_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "food_category_idx" ON "foods" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "food_trending_idx" ON "foods" USING btree ("is_trending");--> statement-breakpoint
CREATE INDEX "food_available_idx" ON "foods" USING btree ("available");--> statement-breakpoint
CREATE UNIQUE INDEX "user_cart_idx" ON "cart" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "cart_idx" ON "cart_items" USING btree ("cart_id");--> statement-breakpoint
CREATE INDEX "food_idx" ON "cart_items" USING btree ("food_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_food_per_cart" ON "cart_items" USING btree ("cart_id","food_id");--> statement-breakpoint
CREATE INDEX "clerk_idx" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");