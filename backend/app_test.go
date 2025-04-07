package main_test

import (
    "net/http/httptest"
    "testing"
	. "github.com/nadmax/website/backend"
    "github.com/stretchr/testify/assert"
)

func TestRoutes(t *testing.T) {
	app := SetupApp()

    t.Run("GET / should return a 200 status and render index", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/", nil)
        resp, _ := app.Test(req)
        assert.Equal(t, 200, resp.StatusCode)
    })

    t.Run("GET /about should return a 200 status and render about page", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/about", nil)
        resp, _ := app.Test(req)
        assert.Equal(t, 200, resp.StatusCode)
    })

    t.Run("GET /appointment should redirect to Calendly", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/appointment", nil)
        resp, _ := app.Test(req)
        assert.Equal(t, 302, resp.StatusCode)
        assert.Equal(t, "https://calendly.com/maximiliennadji/30min", resp.Header.Get("Location"))
    })

    t.Run("GET /static should serve static files", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/static/images/logo.svg", nil)
        resp, _ := app.Test(req)
        assert.Equal(t, 200, resp.StatusCode)
    })

    t.Run("GET /blog should return a 200 status and render blog index", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/blog", nil)
        resp, _ := app.Test(req)
        assert.Equal(t, 200, resp.StatusCode)
    })

    t.Run("GET /blog/linux should return a 200 status and render linux blog post", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/blog/linux", nil)
        resp, _ := app.Test(req)
        assert.Equal(t, 200, resp.StatusCode)
    })
}