package main

import (
	"github.com/nadmax/website/middleware"
	"github.com/nadmax/website/routes"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/compress"
)

func SetupApp() *fiber.App {
	app := fiber.New(fiber.Config{})
	
	app.Use(compress.New(compress.Config{
		Level: 6,
	}))
	app.Use(cache.New(cache.Config{
		CacheControl: false,
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))
	
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