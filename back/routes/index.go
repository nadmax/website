package routes

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	_ "github.com/nadmax/website/utils"
)

func IndexRoute(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		lang := fmt.Sprintf("%v", c.Locals("language"))
		translations := c.Locals("translations").(map[string]interface{})

		return c.JSON(fiber.Map{
			"language":    lang,
			"common": translations["common"],
			"page": translations["page"],
		})
	})
}