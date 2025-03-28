package blog

import (
	"backend/utils"

    "github.com/gofiber/fiber/v2" 
)

func blogIndex(c *fiber.Ctx) error {
	translations, err := utils.LoadTranslations("en")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Render("blog/index", fiber.Map{
		"language": "en",
		"translations": translations,
	})
}

func blogGit(c *fiber.Ctx) error {
	translations, err := utils.LoadTranslations("en")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Render("blog/git", fiber.Map{
		"language": "en",
		"translations": translations,
	})
}

func blogUsb(c *fiber.Ctx) error {
	translations, err := utils.LoadTranslations("en")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Render("blog/usb", fiber.Map{
		"language": "en",
		"translations": translations,
	})
}

func blogBackup(c *fiber.Ctx) error {
	translations, err := utils.LoadTranslations("en")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Render("blog/backup", fiber.Map{
		"language": "en",
		"translations": translations,
	})
}

func blogUsers(c *fiber.Ctx) error {
	translations, err := utils.LoadTranslations("en")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Render("blog/users", fiber.Map{
		"language": "en",
		"translations": translations,
	})
}