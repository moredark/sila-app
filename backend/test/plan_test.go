package test

import (
	"Sila/auth"
	"Sila/config"
	"Sila/internal/models"
	"Sila/internal/routes"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPlanFlow(t *testing.T) {
	user := CreateTestUser(t)

	muscleGroup := models.MuscleGroup{
		NameEng: "Test Muscle Group",
		NameRu:  "Тестовая группа мышц",
	}
	config.DB.Create(&muscleGroup)

	exercise := models.Exercise{
		NameEng:       "Test Exercise",
		NameRu:        "Тестовое упражение",
		MuscleGroupID: muscleGroup.ID,
	}
	config.DB.Create(&exercise)

	app := fiber.New()
	routes.SetupPlanRoutes(app)

	token, err := auth.GenerateToken(user.ID.String(), user.Email, user.Role.Name)
	if err != nil {
		t.Fatalf("Failed to generate JWT token: %v", err)
	}

	// Create Plan
	createPayload := models.CreatePlanRequest{
		Name:        "Test Plan",
		Description: "Test Description",
		Exercises: []models.PlanExerciseRequest{
			{
				ExerciseID:  exercise.ID,
				Order:       1,
				Description: "Test exercise description",
			},
		},
	}
	createBody, _ := json.Marshal(createPayload)
	createReq := httptest.NewRequest("POST", "/plans/", bytes.NewBuffer(createBody))
	createReq.Header.Set("Content-Type", "application/json")
	createReq.Header.Set("Authorization", "Bearer "+token)

	createResp, _ := app.Test(createReq, -1)
	assert.Equal(t, http.StatusCreated, createResp.StatusCode)

	var createRespBody models.PlanSummaryResponse
	err = json.NewDecoder(createResp.Body).Decode(&createRespBody)
	if err != nil {
		t.Fatalf("Failed to decode create response body: %v", err)
	}
	assert.Equal(t, createPayload.Name, createRespBody.Name)

	planID := createRespBody.ID

	// Get Plans
	getPlansReq := httptest.NewRequest("GET", "/plans/", nil)
	getPlansReq.Header.Set("Authorization", "Bearer "+token)

	getPlansResp, _ := app.Test(getPlansReq, -1)
	assert.Equal(t, http.StatusOK, getPlansResp.StatusCode)

	var getPlansRespBody models.PaginatedPlanResponse
	err = json.NewDecoder(getPlansResp.Body).Decode(&getPlansRespBody)
	if err != nil {
		t.Fatalf("Failed to decode get plans response body: %v", err)
	}
	assert.Greater(t, len(getPlansRespBody.Items), 0)

	// Get Plan
	getPlanReq := httptest.NewRequest("GET", fmt.Sprintf("/plans/%d", planID), nil)
	getPlanReq.Header.Set("Authorization", "Bearer "+token)

	getPlanResp, _ := app.Test(getPlanReq, -1)
	assert.Equal(t, http.StatusOK, getPlanResp.StatusCode)

	var getPlanRespBody models.PlanDetailResponse
	err = json.NewDecoder(getPlanResp.Body).Decode(&getPlanRespBody)
	if err != nil {
		t.Fatalf("Failed to decode get plan response body: %v", err)
	}
	assert.Equal(t, createPayload.Name, getPlanRespBody.Name)
	assert.Equal(t, len(createPayload.Exercises), len(getPlanRespBody.Exercises))

	// Update Plan
	updatePayload := models.UpdatePlanRequest{
		Name:        "Updated Test Plan",
		Description: "Updated Test Description",
		Exercises: []models.PlanExerciseRequest{
			{
				ExerciseID:  exercise.ID,
				Order:       1,
				Description: "Updated test exercise description",
			},
		},
	}
	updateBody, _ := json.Marshal(updatePayload)
	updateReq := httptest.NewRequest("PUT", fmt.Sprintf("/plans/%d", planID), bytes.NewBuffer(updateBody))
	updateReq.Header.Set("Content-Type", "application/json")
	updateReq.Header.Set("Authorization", "Bearer "+token)

	updateResp, _ := app.Test(updateReq, -1)
	assert.Equal(t, http.StatusOK, updateResp.StatusCode)

	var updateRespBody models.PlanDetailResponse
	err = json.NewDecoder(updateResp.Body).Decode(&updateRespBody)
	if err != nil {
		t.Fatalf("Failed to decode update response body: %v", err)
	}
	assert.Equal(t, updatePayload.Name, updateRespBody.Name)

	// Delete Plan
	deleteReq := httptest.NewRequest("DELETE", fmt.Sprintf("/plans/%d", planID), nil)
	deleteReq.Header.Set("Authorization", "Bearer "+token)

	deleteResp, _ := app.Test(deleteReq, -1)
	assert.Equal(t, http.StatusNoContent, deleteResp.StatusCode)

	// Verify deletion
	getDeletedPlanReq := httptest.NewRequest("GET", fmt.Sprintf("/plans/%d", planID), nil)
	getDeletedPlanReq.Header.Set("Authorization", "Bearer "+token)

	getDeletedPlanResp, _ := app.Test(getDeletedPlanReq, -1)
	assert.Equal(t, http.StatusNotFound, getDeletedPlanResp.StatusCode)
}
