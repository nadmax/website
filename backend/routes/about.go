package routes

import "github.com/gofiber/fiber/v2"

func AboutRoute(app *fiber.App) {
	app.Get("/about", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("about", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})
}