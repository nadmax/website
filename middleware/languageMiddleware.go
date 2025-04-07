package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/nadmax/website/utils"
)

var supportedLanguages = []string{"en", "fr"}

func LanguageDetectionMiddleware(c *fiber.Ctx) error {
	lang := c.Get("Accept-Language", "en")
	for _, supportedLang := range supportedLanguages {
		if strings.HasPrefix(lang, supportedLang) {
			c.Locals("language", supportedLang)

			return c.Next()
		}
	}
	c.Locals("language", "en")

	return c.Next()
}

func TranslationMiddleware(c *fiber.Ctx) error {
	lang := c.Locals("language").(string)
	page := c.Params("page", "index")

	translations, err := utils.LoadTranslations(lang, page)
	if err != nil {
		return c.Status(500).SendString("Error loading translations")
	}

	c.Locals("translations", translations)

	return c.Next()
}