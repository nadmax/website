package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"
)

type Translations struct {
	common map[string]interface{}
	page map[string]interface{}
}

func NewTranslations(common map[string]interface{}, page map[string]interface{}) *Translations {
	return &Translations{
		common: common,
		page:   page,
	}
}

// GetCommon returns the common translations map
func (t *Translations) GetCommon() map[string]interface{} {
	return t.common
}

// GetPage returns the page translations map
func (t *Translations) GetPage() map[string]interface{} {
	return t.page
}

var translationsCache = make(map[string]Translations)
var mu sync.RWMutex

func LoadTranslations(lang, page string) (Translations, error) {
	cacheKey := fmt.Sprintf("%s-%s", lang, page)

	mu.RLock()
	if cached, ok := translationsCache[cacheKey]; ok {
		mu.RUnlock()
		
		return cached, nil
	}
	mu.RUnlock()

	commonPath := filepath.Join("locales", lang, "common.json")
	pagePath := filepath.Join("locales", lang, fmt.Sprintf("%s.json", page))

	commonData, err := os.ReadFile(commonPath)
	if err != nil {
		return Translations{}, fmt.Errorf("failed to read common.json: %w", err)
	}

	pageData := []byte("{}")
	if _, err := os.Stat(pagePath); err == nil {
		pageData, err = os.ReadFile(pagePath)
		if err != nil {
			return Translations{}, fmt.Errorf("failed to read page file: %w", err)
		}
	}

	var common, pageTranslations map[string]interface{}
	if err := json.Unmarshal(commonData, &common); err != nil {
		return Translations{}, fmt.Errorf("failed to unmarshal common.json: %w", err)
	}

	if err := json.Unmarshal(pageData, &pageTranslations); err != nil {
		return Translations{}, fmt.Errorf("failed to unmarshal page JSON: %w", err)
	}

	result := Translations{
		common: common,
		page:   pageTranslations,
	}

	mu.Lock()
	translationsCache[cacheKey] = result
	mu.Unlock()

	return result, nil
}