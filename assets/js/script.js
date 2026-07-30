document.addEventListener("DOMContentLoaded", () => {
    const difficultySelect = document.getElementById("difficultySelect");
    const sampleTextArea = document.getElementById("sampleText");
    const startButton = document.getElementById("startBtn");
    const stopButton = document.getElementById("stopBtn");
    const retryButton = document.getElementById("retryBtn");
    const levelResult = document.getElementById("levelResult");
    const timeResult = document.getElementById("timeResult");
    const wpmResult = document.getElementById("wpmResult");
    const typingArea = document.getElementById("typingArea");

    if (!difficultySelect || !sampleTextArea || !startButton || !stopButton || !retryButton || !levelResult || !timeResult || !wpmResult || !typingArea) {
        return;
    }

    const testState = {
        startTime: null,
        timerId: null,
        isRunning: false,
        sampleText: "",
    };

    const textPool = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "Typing is a skill that improves with daily practice.",
            "A calm mind helps you type with more accuracy.",
            "Practice makes progress, and progress builds confidence.",
            "Start slowly, stay accurate, and then build your speed.",
        ],
        medium: [
            "A steady rhythm, careful focus, and clean finger movement can significantly improve typing performance.",
            "When you practice typing regularly, your speed grows naturally while your mistakes become fewer.",
            "The most reliable way to type faster is to balance precision with controlled, relaxed momentum.",
            "Good typing comes from accuracy first, because speed without control usually leads to more corrections.",
            "Reading ahead by a few words can help your fingers prepare for the next sequence more efficiently.",
        ],
        hard: [
            "Synchronized keystrokes, compositional rhythm, and disciplined attention to punctuation are essential when the text becomes more demanding.",
            "Mastery of typing requires consistent practice, deliberate correction of weak patterns, and the patience to keep refining technique.",
            "Complex passages challenge your memory, your timing, and your ability to maintain accuracy under pressure.",
            "A high typing score depends on more than speed; it requires smooth transitions, accurate spacing, and confident repetition.",
            "Advanced typists often keep their eyes slightly ahead of the cursor, allowing each new word to flow without hesitation.",
        ],
    };

    const getDifficultyKey = () => {
        const value = difficultySelect.value.toLowerCase();
        return textPool[value] ? value : "easy";
    };

    const renderSampleText = () => {
        const difficultyKey = getDifficultyKey();
        const options = textPool[difficultyKey];
        const randomIndex = Math.floor(Math.random() * options.length);
        testState.sampleText = options[randomIndex];
        renderSampleTextWords(testState.sampleText);
        updateDifficultyDisplay();
    };

    const renderSampleTextWords = (sampleText) => {
        const words = splitWords(sampleText);
        sampleTextArea.innerHTML = words
            .map((word, index) => `<span class="sample-word" data-word-index="${index}">${word}</span>`)
            .join(" ");
    };

    const updateDifficultyDisplay = () => {
        const difficultyKey = getDifficultyKey();
        levelResult.textContent = `${difficultyKey.charAt(0).toUpperCase()}${difficultyKey.slice(1)}`;
    };

    const formatElapsedTime = (elapsedMilliseconds) => {
        return (elapsedMilliseconds / 1000).toFixed(2);
    };

    const updateTimeDisplay = (elapsedMilliseconds) => {
        timeResult.textContent = `${formatElapsedTime(elapsedMilliseconds)}s`;
    };

    const updateWpmDisplay = (wpm) => {
        wpmResult.textContent = String(wpm);
    };

    const getTypedWords = () => {
        return splitWords(typingArea.value);
    };

    const clearWordHighlighting = () => {
        sampleTextArea.querySelectorAll(".sample-word").forEach((wordElement) => {
            wordElement.classList.remove("correct", "incorrect");
        });
    };

    const updateWordHighlighting = () => {
        const typedWords = getTypedWords();
        const sampleWords = splitWords(testState.sampleText);
        const wordElements = sampleTextArea.querySelectorAll(".sample-word");

        wordElements.forEach((wordElement, index) => {
            wordElement.classList.remove("correct", "incorrect");

            if (index >= typedWords.length) {
                return;
            }

            const typedWord = normalizeWord(typedWords[index]);
            const sampleWord = normalizeWord(sampleWords[index] || "");

            if (typedWord === sampleWord) {
                wordElement.classList.add("correct");
            } else {
                wordElement.classList.add("incorrect");
            }
        });
    };

    const handleTypingInput = () => {
        if (!testState.isRunning && typingArea.value.trim().length > 0) {
            startTest();
        }

        updateWordHighlighting();
    };

    const setButtonState = (isRunning) => {
        startButton.disabled = isRunning;
        stopButton.disabled = !isRunning;
    };

    const setTypingAreaState = (isEnabled) => {
        typingArea.disabled = !isEnabled;
    };

    const clearRunningTimer = () => {
        if (testState.timerId) {
            window.clearInterval(testState.timerId);
            testState.timerId = null;
        }
    };

    const splitWords = (text) => {
        return text.trim().length === 0 ? [] : text.trim().split(/\s+/);
    };

    const normalizeWord = (word) => {
        return word.trim().toLowerCase();
    };

    const calculateCorrectWordCount = (sampleText, typedText) => {
        const sampleWords = splitWords(sampleText);
        const typedWords = splitWords(typedText);
        const maximumWords = Math.min(sampleWords.length, typedWords.length);
        let correctWordCount = 0;

        for (let index = 0; index < maximumWords; index += 1) {
            if (normalizeWord(sampleWords[index]) === normalizeWord(typedWords[index])) {
                correctWordCount += 1;
            }
        }

        return correctWordCount;
    };

    const calculateWpm = (correctWordCount, elapsedMilliseconds) => {
        if (elapsedMilliseconds <= 0) {
            return 0;
        }

        const elapsedMinutes = elapsedMilliseconds / 60000;
        return Math.round(correctWordCount / elapsedMinutes);
    };

    const startTest = () => {
        if (testState.isRunning) {
            return;
        }

        testState.isRunning = true;
        testState.startTime = Date.now();
        setTypingAreaState(true);
        updateTimeDisplay(0);
        setButtonState(true);
        typingArea.focus();

        clearRunningTimer();
        testState.timerId = window.setInterval(() => {
            const elapsedMilliseconds = Date.now() - testState.startTime;
            updateTimeDisplay(elapsedMilliseconds);
        }, 10);
    };

    const stopTest = () => {
        if (!testState.isRunning) {
            return;
        }

        const elapsedMilliseconds = Date.now() - testState.startTime;
        const correctWordCount = calculateCorrectWordCount(testState.sampleText, typingArea.value);
        const wpm = calculateWpm(correctWordCount, elapsedMilliseconds);
        clearRunningTimer();
        updateTimeDisplay(elapsedMilliseconds);
        updateWpmDisplay(wpm);
        testState.isRunning = false;
        testState.startTime = null;
        setButtonState(false);
        setTypingAreaState(false);
    };

    const handleTypingKeydown = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        if (testState.isRunning) {
            stopTest();
        }
    };

    const resetTest = () => {
        clearRunningTimer();
        testState.isRunning = false;
        testState.startTime = null;
        typingArea.value = "";
        setTypingAreaState(true);
        updateTimeDisplay(0);
        updateWpmDisplay(0);
        setButtonState(false);
        clearWordHighlighting();
    };

    difficultySelect.addEventListener("change", renderSampleText);
    typingArea.addEventListener("input", handleTypingInput);
    typingArea.addEventListener("keydown", handleTypingKeydown);
    startButton.addEventListener("click", () => {
        typingArea.focus();
    });
    stopButton.addEventListener("click", stopTest);
    retryButton.addEventListener("click", resetTest);
    renderSampleText();
    updateTimeDisplay(0);
    updateWpmDisplay(0);
    updateDifficultyDisplay();
    setButtonState(false);
    setTypingAreaState(true);
    clearWordHighlighting();
});
