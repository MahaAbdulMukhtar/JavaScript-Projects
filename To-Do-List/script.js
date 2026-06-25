// State
let tasks = JSON.parse(localStorage.getItem('tasky_tasks') || '[]');
let currentFilter = 'all';

// Enter key to add task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Theme toggle
document.getElementById('themeBtn').addEventListener('click', function() {
    var html = document.documentElement;
    var isDark = html.getAttribute('data-theme') === 'dark';

    if (isDark) {
        html.setAttribute('data-theme', 'light');
        document.getElementById('themeBtn').innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    } else {
        html.setAttribute('data-theme', 'dark');
        document.getElementById('themeBtn').innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    }
});

// Add a new task
function addTask() {
    var input    = document.getElementById('taskInput');
    var dueDate  = document.getElementById('dueDate').value;
    var priority = document.getElementById('priority').value;
    var text     = input.value.trim();

    if (text === '') {
        shake(input);
        return;
    }

    var newTask = {
        id:        Date.now(),
        text:      text,
        dueDate:   dueDate,
        priority:  priority,
        completed: false
    };

    tasks.push(newTask);

    input.value = '';
    document.getElementById('dueDate').value = '';

    render();
}

// Build and return a task list item element
function createTaskEl(task) {
    var li = document.createElement('li');
    li.className = 'task-item priority-' + task.priority.toLowerCase();

    if (task.completed) {
        li.className += ' completed';
    }

    li.dataset.id = task.id;

    var badgeClass = task.priority.toLowerCase();
    var dateStr    = task.dueDate ? '<i class="fa-solid fa-calendar-days"></i>' + task.dueDate : 'No due date';

    li.innerHTML =
        '<div class="task-info">' +
            '<div class="task-title">' + escHtml(task.text) + '</div>' +
            '<div class="task-meta">' +
                '<span class="task-date">' + dateStr + '</span>' +
                '<span class="badge ' + badgeClass + '">' + task.priority + '</span>' +
            '</div>' +
        '</div>' +
        '<div class="task-actions">' +
            '<button class="icon-btn" title="Toggle complete" onclick="toggleTask(' + task.id + ')"><i class="fa-solid fa-check"></i></button>' +
            '<button class="icon-btn" title="Edit"     onclick="editTask(' + task.id + ')"><i class="fa-solid fa-pen"></i></button>' +
            '<button class="icon-btn" title="Delete"     onclick="deleteTask(' + task.id + ')"><i class="fa-solid fa-trash"></i></button>' +
        '</div>';

    return li;
}

// Render the task list
function render() {
    var list   = document.getElementById('todoList');
    var search = document.getElementById('searchTask').value.trim().toLowerCase();

    list.innerHTML = '';

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        // Search filter
        if (task.text.toLowerCase().indexOf(search) === -1) {
            continue;
        }

        // Tab filter
        if (currentFilter === 'active'    &&  task.completed) continue;
        if (currentFilter === 'completed' && !task.completed) continue;

        list.appendChild(createTaskEl(task));
    }

    updateStats();
    saveTasks();
}

// Toggle a task complete / incomplete
function toggleTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }
    render();
}

// Edit a task's text
function editTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            var newText = prompt('Edit task:', tasks[i].text);
            if (newText && newText.trim() !== '') {
                tasks[i].text = newText.trim();
                render();
            }
            break;
        }
    }
}

// Delete a single task
function deleteTask(id) {
    var remaining = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            remaining.push(tasks[i]);
        }
    }
    tasks = remaining;
    render();
}

// Clear all tasks
function clearAll() {
    if (tasks.length === 0) return;

    if (confirm('Delete all tasks?')) {
        tasks = [];
        render();
    }
}

// Filter buttons (All / Active / Completed)
function setFilter(filter, btn) {
    currentFilter = filter;

    var buttons = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    btn.classList.add('active');
    render();
}

// Called by the search input's oninput attribute
function filterBySearch() {
    render();
}

// Update stat cards and progress bar
function updateStats() {
    var total     = tasks.length;
    var completed = 0;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) completed++;
    }

    var pending = total - completed;
    var pct     = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('totalTasks').textContent     = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent   = pending;
    document.getElementById('progressFill').style.width   = pct + '%';
    document.getElementById('progressPct').textContent    = pct + '%';

    // Show or hide the empty state message
    var emptyState = document.getElementById('emptyState');
    var listLength = document.getElementById('todoList').children.length;

    if (listLength === 0) {
        emptyState.classList.add('visible');
    } else {
        emptyState.classList.remove('visible');
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasky_tasks', JSON.stringify(tasks));
}

// Escape HTML to prevent XSS
function escHtml(str) {
    str = str.replace(/&/g,  '&amp;');
    str = str.replace(/</g,  '&lt;');
    str = str.replace(/>/g,  '&gt;');
    str = str.replace(/"/g,  '&quot;');
    return str;
}

// Shake animation for empty input validation
function shake(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake .3s ease';
    el.addEventListener('animationend', function() {
        el.style.animation = '';
    }, { once: true });
}

// Inject shake keyframe into the page
var shakeStyle = document.createElement('style');
shakeStyle.textContent =
    '@keyframes shake {' +
    '  0%,100% { transform: translateX(0);   }' +
    '  20%     { transform: translateX(-6px); }' +
    '  40%     { transform: translateX(6px);  }' +
    '  60%     { transform: translateX(-4px); }' +
    '  80%     { transform: translateX(4px);  }' +
    '}';
document.head.appendChild(shakeStyle);

// Init — load saved tasks on page open
render();