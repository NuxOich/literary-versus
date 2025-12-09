// Это наш сервисный слой. Здесь живет логика общения с AI.
// В будущем мы добавим сюда API Key из config.js
// Импортируем ключ из конфига
import { API_KEY } from "./config.js";

export const mockAiAnalysis = async (author1, author2) => {
  return new Promise((resolve) => {
    // ВРЕМЕННО: Проверяем, что ключ виден
    console.log("Используемый API Key:", API_KEY);

    console.log(`Запрос к AI: Сравни ${author1} и ${author2}`);

    setTimeout(() => {
      resolve({
        text: `Сравнение ${author1} и ${author2} завершено. (Ключ успешно подключен!)`,
        gloomLevel: Math.floor(Math.random() * 100),     // Генерируем случайно для драйва
        complexityLevel: Math.floor(Math.random() * 100),
        sarcasmLevel: Math.floor(Math.random() * 100)
      });
    }, 1500);
  });
};