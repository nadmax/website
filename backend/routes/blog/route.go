package blog

import (
    "github.com/gofiber/fiber/v2"
)

func BlogRoutes(app *fiber.App) {
	blogGroup := app.Group("/blog")

	blogGroup.Get("/", blogIndex)
	blogGroup.Get("/git", blogGit)
	blogGroup.Get("/bootable-usb", blogUsb)
	blogGroup.Get("/backup-restore-recovery", blogBackup)
	blogGroup.Get("/user-group-file-permissions", blogUsers)
}