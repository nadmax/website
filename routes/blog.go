package routes

import "github.com/gofiber/fiber/v2"

func BlogRoute(app *fiber.App) {
	app.Get("/blog", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("blog/index", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})

	app.Get("/blog/linux", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("blog/linux", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})

	app.Get("/blog/git", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("blog/git", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})

	app.Get("/blog/usb", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("blog/usb", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})

	app.Get("/blog/brr", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("blog/brr", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})

	app.Get("/blog/users", func(c *fiber.Ctx) error {
		lang := c.Locals("language").(string)
		translations := c.Locals("translations")

		return c.Render("blog/users", fiber.Map{
			"language":     lang,
			"translations": translations,
		})
	})
}
