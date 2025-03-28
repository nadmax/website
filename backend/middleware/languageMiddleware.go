package middleware

import (
	"strings"
	"github.com/gofiber/fiber/v2"
)

var supportedLanguages = []string{"en", "fr"}

func LanguageMiddleware(c *fiber.Ctx) error {
	lang := strings.Split(c.Path(), "/")[1]

	if isSupportedLanguage(lang) {
		c.Locals("language", lang)
		newPath := strings.Replace(c.Path(), "/" + lang, "", 1)
		c.Request().SetRequestURI(newPath)

		return c.Next()
	}

	acceptLanguage := c.Get("Accept-Language")
	preferredLang := getPreferredLanguage(acceptLanguage)

	return c.Redirect("/" + preferredLang + c.Path())
}

func isSupportedLanguage(lang string) bool {
	for _, supportedLang := range supportedLanguages {
		if lang == supportedLang {
			return true
		}
	}

	return false
}

func getPreferredLanguage(acceptLanguage string) string {
	for _, lang := range supportedLanguages {
		if strings.HasPrefix(acceptLanguage, lang) {
			return lang
		}
	}

	return "en"
}