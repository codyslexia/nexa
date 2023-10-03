package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func status(c *gin.Context) {
	c.JSON(http.StatusOK, response{
		Code:    http.StatusOK,
		Message: "up",
	})
}

func not_found(c *gin.Context) {
	c.JSON(http.StatusNotFound, response{
		Code:    http.StatusNotFound,
		Message: "Not found",
	})
}

func main() {
	router := gin.Default()
	router.Any("/", not_found)
	router.Any("/:any", not_found)
	router.GET("/status", status)

	router.Run("localhost:8080")
}
