const authorInput1 = document.getElementById('author-1');
const authorInput2 = document.getElementById('author-2');
const fightBtn = document.getElementById('fight-btn');
const resultArea = document.getElementById('result-area');

// Новые селекторы для графики
const analysisText = document.getElementById('analysis-text');
const statsBlock = document.getElementById('stats-block');
const barGloom = document.getElementById('bar-gloom');
const barComplexity = document.getElementById('bar-complexity');
const barSarcasm = document.getElementById('bar-sarcasm');
// Обновленный Mock API: теперь возвращает ОБЪЕКТ, а не строку
const mockAiAnalysis = async (author1, author2) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Имитируем, что AI подумал и вернул JSON
      resolve({
        text: `Сравнение ${author1} и ${author2} завершено. Первый выделяется глубоким психологизмом, второй — работой c подсознательными страхами.`,
        gloomLevel: 85,      // Уровень мрачности (число для графика)
        complexityLevel: 60,  // Уровень сложности (число для графика)
        sarcasmLevel: 30 // Уровень сарказма (Я добавил)
      });
    }, 2000);
  });
};

const handleCompare = async () => {
  const name1 = authorInput1.value.trim();
  const name2 = authorInput2.value.trim();

  if (!name1 || !name2) {
    alert('Введите обоих авторов!');
    return;
  }

  // Сброс интерфейса перед загрузкой
  fightBtn.disabled = true;
  fightBtn.innerText = 'Анализируем...';
  resultArea.classList.add('hidden');
  statsBlock.classList.add('hidden'); // Прячем графики
  barGloom.style.width = '0%';        // Сбрасываем длину полосок
  barComplexity.style.width = '0%';
  barSarcasm.style.width = '0%';


  try {
    // Получаем ОБЪЕКТ data
    const data = await mockAiAnalysis(name1, name2);

    // 1. Вставляем текст
    analysisText.innerText = data.text;

    // 2. Показываем блок результатов
    resultArea.classList.remove('hidden');
    statsBlock.classList.remove('hidden');

    // 3. Запускаем анимацию графиков (небольшая задержка, чтобы глаз успел заметить)
    setTimeout(() => {
      barGloom.style.width = `${data.gloomLevel}%`;
      barComplexity.style.width = `${data.complexityLevel}%`;
      barSarcasm.style.width = `${data.sarcasmLevel}%`;
    }, 100);

  } catch (error) {
    console.error(error);
    alert('Ошибка');
  } finally {
    fightBtn.disabled = false;
    fightBtn.innerText = 'Сравнить стили';
  }
};

fightBtn.addEventListener('click', handleCompare);