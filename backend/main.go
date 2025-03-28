package main

import (
	_ "backend/middleware"
	"backend/routes"
	"backend/routes/blog"
	"html/template"

	"fmt"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"

	"log"
)

func setupTemplateEngine() *html.Engine {
	engine := html.New("../frontend/templates", ".html")

	engine.AddFunc("safeHTML", func(v interface{}) interface{} {
		return template.HTML(v.(string))
	})

	return engine
}

func main() {
	app := fiber.New(fiber.Config{
		Views: setupTemplateEngine(),
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	app.Static("/", "../frontend/assets")
	app.Static("/", "../frontend/public")
	app.Static("/", "../frontend/scripts")

	routes.IndexRoute(app)
	routes.AboutRoute(app)
	blog.BlogRoutes(app)

	fmt.Println(`🐳 App starting on http://localhost:8080`)
	log.Fatal(app.Listen(":8080"))
}