package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestStatus(t *testing.T) {
	router := gin.Default()
	router.GET("/status", status)

	req, err := http.NewRequest("GET", "/status", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
	assert.Equal(t, "{\"code\":200,\"message\":\"up\"}\n", rr.Body.String())
}

func TestNotFound(t *testing.T) {
	router := gin.Default()
	router.Any("/", not_found)
	router.Any("/:any", not_found)

	req, err := http.NewRequest("GET", "/not-found", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusNotFound, rr.Code)
	assert.Equal(t, "{\"code\":404,\"message\":\"Not found\"}\n", rr.Body.String())
}
