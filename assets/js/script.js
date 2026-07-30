document.addEventListener("DOMContentLoaded", () => {
    const difficultySelect = document.getElementById("difficultySelect");
    const sampleTextArea = document.getElementById("sampleText");

    if (!difficultySelect || !sampleTextArea) {
        return;
    }

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
        sampleTextArea.value = options[randomIndex];
    };

    difficultySelect.addEventListener("change", renderSampleText);
    renderSampleText();
});
