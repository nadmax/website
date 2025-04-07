package routes

import (
	"fmt"
	"github.com/gofiber/fiber/v2"	
)

func IndexRoute(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		lang := fmt.Sprintf("%v", c.Locals("language"))
		translations := c.Locals("translations")

		return c.Render("index", fiber.Map{
			"language": lang,
			"translations": translations,
		})
	})
}