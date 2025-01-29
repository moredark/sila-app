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
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestWorkoutFlow(t *testing.T) {
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
	routes.SetupWorkoutRoutes(app)

	token, err := auth.GenerateToken(user.ID.String(), user.Email, user.Role.Name)
	if err != nil {
		t.Fatalf("Failed to generate JWT token: %v", err)
	}

	startPayload := map[string]int{
		"exercise_id": exercise.ID,
	}
	startBody, _ := json.Marshal(startPayload)
	startReq := httptest.NewRequest("POST", "/workout/start", bytes.NewBuffer(startBody))
	startReq.Header.Set("Content-Type", "application/json")
	startReq.Header.Set("Authorization", "Bearer "+token)

	startResp, _ := app.Test(startReq, -1)
	assert.Equal(t, http.StatusOK, startResp.StatusCode)

	var startRespBody map[string]interface{}
	err = json.NewDecoder(startResp.Body).Decode(&startRespBody)
	if err != nil {
		t.Fatalf("Failed to decode start response body: %v", err)
	}
	sessionID := int(startRespBody["session_id"].(float64))

	log.Println("Workout session started with ID:", sessionID)

	for i := 1; i <= 3; i++ {
		addSetPayload := map[string]interface{}{
			"weight": 10.0 * float64(i),
			"reps":   10 * i,
		}

		addSetBody, _ := json.Marshal(addSetPayload)
		addSetReq := httptest.NewRequest("POST", fmt.Sprintf("/workout/add-set/%d", sessionID), bytes.NewBuffer(addSetBody))
		addSetReq.Header.Set("Content-Type", "application/json")
		addSetReq.Header.Set("Authorization", "Bearer "+token)

		addSetResp, _ := app.Test(addSetReq, -1)
		assert.Equal(t, http.StatusOK, addSetResp.StatusCode)

		log.Printf("Set %d added to workout session %d", i, sessionID)
	}

	incompleteReq := httptest.NewRequest("GET", "/workout/incomplete", nil)
	incompleteReq.Header.Set("Authorization", "Bearer "+token)

	incompleteResp, _ := app.Test(incompleteReq, -1)
	assert.Equal(t, http.StatusOK, incompleteResp.StatusCode)

	var incompleteRespBody []models.IncompleteWorkoutResponse
	err = json.NewDecoder(incompleteResp.Body).Decode(&incompleteRespBody)
	if err != nil {
		t.Fatalf("Failed to decode incomplete workout response body: %v", err)
	}

	assert.Greater(t, len(incompleteRespBody), 0, "There should be at least one incomplete workout")
	assert.Equal(t, sessionID, incompleteRespBody[0].ID)

	log.Println("Incomplete workout session found with ID:", sessionID)

	completePayload := map[string]string{
		"note": "Good workout",
	}
	completeBody, _ := json.Marshal(completePayload)
	completeReq := httptest.NewRequest("PUT", fmt.Sprintf("/workout/complete/%d", sessionID), bytes.NewBuffer(completeBody))
	completeReq.Header.Set("Content-Type", "application/json")
	completeReq.Header.Set("Authorization", "Bearer "+token)

	completeResp, _ := app.Test(completeReq, -1)
	assert.Equal(t, http.StatusOK, completeResp.StatusCode)

	var completeRespBody map[string]interface{}
	err = json.NewDecoder(completeResp.Body).Decode(&completeRespBody)
	if err != nil {
		t.Fatalf("Failed to decode complete workout response body: %v", err)
	}
	assert.Equal(t, true, completeRespBody["is_completed"])

	log.Println("Workout session completed with ID:", sessionID)
}
