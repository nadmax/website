package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

func LoadTranslations(lang string) (map[string]interface{}, error) {
	translationsFilePath := filepath.Join("./locales", fmt.Sprintf("%s.json", lang))
	file, err := os.Open(translationsFilePath)
	if err != nil {
		return nil, fmt.Errorf("error reading translation file: %s", err.Error())
	}
	defer file.Close()

	var translations map[string]interface{}
	if err := json.NewDecoder(file).Decode(&translations); err != nil {
		return nil, fmt.Errorf("error parsing translation file: %s", err.Error())
	}

	return translations, nil
}
