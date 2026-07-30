# Type Racer

Type Racer is a responsive typing speed test application built with Bootstrap 5, custom CSS, and vanilla JavaScript. It lets users choose a difficulty level, practice with random sample text, track time and WPM, and get real-time feedback on typing accuracy.

Live project: [https://amirmhmdi.github.io/TypeRacer/](https://amirmhmdi.github.io/TypeRacer/)

## Project Overview

This project was developed as a pair programming exercise with GitHub Copilot. Copilot was used as a collaborative coding partner to help scaffold the page, refine the layout, implement the game logic, and build the interactive user experience.

## Features

- Responsive layout that works on mobile, tablet, and desktop.
- Difficulty selector with random prompt generation for Easy, Medium, and Hard.
- Start-on-typing test flow.
- Stop the test by pressing `Enter`.
- Live word feedback while typing.
- Correct words are highlighted in blue.
- Incorrect words are highlighted in red.
- Stopwatch timer with time displayed to two decimal places.
- WPM calculation based on correctly typed words and elapsed time.
- Instruction modal for quick guidance.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8
- Font Awesome
- Google Fonts: Alegreya and Nunito

## How It Works

1. Choose a difficulty level.
2. A random text prompt is displayed for that difficulty.
3. Start typing to begin the timer.
4. Correct words highlight in blue and incorrect words in red in real time.
5. Press `Enter` to end the test.
6. View the final time and WPM in the Results panel.

## Project Structure

- `index.html` - main page markup.
- `assets/css/style.css` - custom styling.
- `assets/js/script.js` - app logic, prompt selection, timer, WPM, and live feedback.
- `assets/images/` - image assets folder.

## Running Locally

To run the project locally, open `index.html` in your browser. No build step is required.

## Notes

- The app uses Bootstrap for the responsive layout and modal.
- The sample text is generated dynamically based on the selected difficulty.
- The typing area stays disabled until the test is ready to be used, and the buttons update based on the current test state.
