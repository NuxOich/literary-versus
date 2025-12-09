// Это наш сервисный слой. Здесь живет логика общения с AI.
// В будущем мы добавим сюда API Key из config.js

export const mockAiAnalysis = async (author1, author2) => {
  return new Promise((resolve) => {
    console.log(`Запрос к AI: Сравни ${author1} и ${author2}`);

    setTimeout(() => {
      resolve({
        text: `Сравнение ${author1} и ${author2} завершено. Это битва титанов.`,
        gloomLevel: Math.floor(Math.random() * 100),     // Генерируем случайно для драйва
        complexityLevel: Math.floor(Math.random() * 100),
        sarcasmLevel: Math.floor(Math.random() * 100)
      });
    }, 1500);
  });
};