package main

import "github.com/labstack/echo/v4"

func main() {
    e := echo.New()

    e.Static("/assets", "assets")
    e.Static("/scripts", "scripts")
    e.GET("/", func(c echo.Context) error {
        return c.File("index.html")
    })

    e.Logger.Fatal(e.Start(":3000"))
}