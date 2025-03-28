package routes

import (
	"backend/utils"

	_ "strings"
	"github.com/gofiber/fiber/v2"
)

func IndexRoute(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		translations, err := utils.LoadTranslations("en")
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Render("index", fiber.Map{
			"language": "en",
			"translations": translations,
		})
	})
}