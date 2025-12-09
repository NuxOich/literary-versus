import { API_KEY, API_URL, MODEL_NAME } from './config.js';

export const mockAiAnalysis = async (author1, author2) => {
  // Объединяем промпты (Gemini любит, когда всё в одном сообщении)
  const combinedPrompt = `
    Ты — литературный критик. Сравни авторов: ${author1} и ${author2}.
    Твой ответ должен быть СТРОГО валидным JSON объектом. Не добавляй markdown разметку (вроде \`\`\`json).
    
    Структура JSON:
    {
        "text": "Текст сравнения (минимум 3 предложения, на русском языке)",
        "gloomLevel": число от 0 до 100,
        "complexityLevel": число от 0 до 100,
        "sarcasmLevel": число от 0 до 100
    }
    `;

  // Берём модель из `config.js`. Если не задана, используем текущую как запас.
  const defaultModel = MODEL_NAME || "mistralai/devstral-2512:free";
  const fallbackCandidates = [defaultModel, "gpt-4o-mini", "google/gemini-flash-1.5-8b"];

  console.log(`Отправляем запрос к LLM (попытка с моделью: ${defaultModel})...`);

  try {
    let lastError = null;
    let response = null;

    for (const model of fallbackCandidates) {
      try {
        console.log(`Попытка запроса с моделью: ${model}`);
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': window.location.href,
            'X-Title': 'Literary Versus'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "user", content: combinedPrompt }
            ]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`Модель ${model} вернула статус ${response.status}:`, errorText);
          lastError = new Error(`Model ${model} error: ${response.status}`);
          // попробуем следующую модель
          continue;
        }

        // успешный ответ
        const data = await response.json();
        console.log(`✅ УСПЕХ! Ответ сгенерировала модель: ${model}`);
        // --------------------------
        const content = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
        console.log("Ответ получен:", content);
        const cleanJson = content.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanJson);

      } catch (innerErr) {
        console.warn(`Ошибка при запросе моделью ${model}:`, innerErr);
        lastError = innerErr;
        // пробуем следующую модель
      }
    }

    // Если дошли сюда — ни одна модель не вернула рабочий ответ
    throw lastError || new Error('No successful model response');

  } catch (error) {
    console.error("Финальная ошибка:", error);
    alert("Ошибка. Проверь консоль (F12)!");
    return {
      text: "Не удалось получить данные от AI.",
      gloomLevel: 0,
      complexityLevel: 0,
      sarcasmLevel: 0
    };
  }
};