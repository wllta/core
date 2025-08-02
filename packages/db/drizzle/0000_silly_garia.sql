CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"telegram_id" bigint NOT NULL,
	"added_to_attachment_menu" boolean,
	"allows_write_to_pm" boolean,
	"is_premium" boolean,
	"is_bot" boolean,
	"first_name" varchar(128) NOT NULL,
	"last_name" varchar(128),
	"username" varchar(128),
	"language_code" varchar(16),
	"photo_url" text,
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id")
);
