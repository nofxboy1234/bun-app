CREATE TABLE "profile_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"metadata" jsonb
);
--> statement-breakpoint
ALTER TABLE "profile_info" ADD CONSTRAINT "profile_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;