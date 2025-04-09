package routes

import "github.com/gofiber/fiber/v2"

func AppointmentRoute(app *fiber.App) {
	app.Get("/appointment", func(c *fiber.Ctx) error {
		return c.Redirect("https://calendly.com/maximiliennadji/30min")
	})
}