package main

import (
	"github.com/nadmax/website/backend/middleware"
	"github.com/nadmax/website/backend/routes"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/template/pug/v2"
)

func SetupApp() *fiber.App {
	engine := pug.New("../frontend/views", ".pug")
	app := fiber.New(fiber.Config{
		Views: engine,
	
	})
	
	app.Use(compress.New(compress.Config{
		Level: 6,
	}))
	app.Use(cache.New(cache.Config{
		CacheControl: false,
	}))
	
	app.Static("/", "../frontend/public")
	app.Static("/", "../frontend/./scripts")
	app.Static("/locales", "./locales")
	app.Static("/static", "../frontend/assets")
	
	app.Use(middleware.LanguageDetectionMiddleware)
	app.Use(middleware.TranslationMiddleware)
	
	routes.IndexRoute(app)
	routes.AppointmentRoute(app)
	routes.AboutRoute(app)
	routes.BlogRoute(app)

	return app
}

func main() {
	app := SetupApp()
	log.Fatal(app.Listen(":8080"))
}