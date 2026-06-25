# Tasky — To-Do List App

A clean, responsive to-do list web app built with vanilla HTML, CSS, and JavaScript.

---

## Live Preview
[View Live](https://mahaabdulmukhtar.github.io/JavaScript-Projects/To-Do-List/)

---

## Features

- **Add tasks** with a due date and priority level (High / Medium / Low)
- **Priority color coding** — red, yellow, and green left-border indicators on each task
- **Search** tasks in real time using the search bar
- **Filter** tasks by All / Active / Completed
- **Edit** any task inline via a prompt
- **Delete** individual tasks or clear all at once
- **Mark complete** — completed tasks are visually struck through and dimmed
- **Live stats** — Total, Completed, and Pending task counts update automatically
- **Progress bar** — shows your completion percentage
- **Dark mode** toggle with smooth theme switching
- **Persistent storage** — tasks are saved to `localStorage` and survive page refresh
- **Keyboard shortcut** — press `Enter` in the task input to add a task

---

## Project Structure

```
tasky/
├── index.html    
├── style.css     
├── script.js  
└── README.md
```

---

## How to Use

| Action | How |
|---|---|
| Add a task | Type in the task field → pick a date and priority → click **+ Add Task** or press `Enter` |
| Complete a task | Click the ✅ button on any task |
| Edit a task | Click the ✏️ button and update the text in the prompt |
| Delete a task | Click the 🗑️ button on the task |
| Filter tasks | Click **All**, **Active**, or **Completed** |
| Search tasks | Type in the search bar — results filter live |
| Clear everything | Click **🗑 Clear All** |
| Toggle dark mode | Click the **🌙 Dark Mode** button in the top right |

---

## Technologies Used

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Keyframe Animations)
- Vanilla JavaScript (ES6+)
- Web Storage API (`localStorage`)
- Google Fonts — [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

## Key Concepts Practiced

- DOM manipulation and event handling
- Data-driven rendering (tasks stored as objects, UI rebuilt from state)
- CSS custom properties for theming
- `localStorage` for client-side persistence
- Responsive design with CSS Grid and media queries
- Input validation and user feedback (shake animation on empty submit)

---

## Author

**Maha Abdul Mukhtar**  
BS Computer Science — Virtual University of Pakistan  
