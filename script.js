// DOM Element Selections
const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const notesList = document.getElementById('notesList');
const noteCountSpan = document.getElementById('noteCount');

// Track total number of notes
let totalNotes = 0;

// Function to update the note count in the DOM
function updateNoteCount() {
    totalNotes = notesList.children.length;
    noteCountSpan.textContent = totalNotes;
}

// Function to add a new note
function addNote() {
    const noteTextValue = noteInput.value.trim();

    // Prevent adding empty notes
    if (noteTextValue === "") {
        alert("Please write something before adding a note!");
        return;
    }

    // 1. Create main list item container (li)
    const li = document.createElement('li');

    // 2. Create the text container (span) using textContent for safety
    const spanText = document.createElement('span');
    spanText.className = 'note-text';
    spanText.textContent = noteTextValue;

    // 3. Create actions wrapper (div for buttons)
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'note-actions';

    // Important Button
    const importantBtn = document.createElement('button');
    importantBtn.textContent = 'Important';
    importantBtn.className = 'important-btn';
    
    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    // --- Event Listeners ---

    // Toggle Important State
    importantBtn.addEventListener('click', () => {
        li.classList.toggle('important');
    });

    // Edit Note functionality
    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === 'Edit') {
            // Switch to edit mode
            const currentText = spanText.textContent;
            const inputField = document.createElement('textarea');
            inputField.className = 'note-text';
            inputField.value = currentText;
            
            li.replaceChild(inputField, spanText);
            editBtn.textContent = 'Save';
            editBtn.style.backgroundColor = '#2980b9';
        } else {
            // Switch back to view mode
            const inputField = li.querySelector('textarea.note-text');
            const updatedText = inputField.value.trim();

            if (updatedText === "") {
                alert("Note cannot be empty!");
                return;
            }

            spanText.textContent = updatedText;
            li.replaceChild(spanText, inputField);
            editBtn.textContent = 'Edit';
            editBtn.style.backgroundColor = '#2ecc71';
        }
    });

    // Delete Note functionality
    deleteBtn.addEventListener('click', () => {
        notesList.removeChild(li);
        updateNoteCount();
    });

    // 4. Append buttons to action container
    actionsDiv.appendChild(importantBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // 5. Append text and actions to list item (li)
    li.appendChild(spanText);
    li.appendChild(actionsDiv);

    // 6. Append list item to the main unordered list (ul)
    notesList.appendChild(li);

    // Reset input field and update count
    noteInput.value = "";
    updateNoteCount();
}

// Event Listener for the Add Button
addBtn.addEventListener('click', addNote);

// Optional: Allow pressing 'Enter' (with Shift) or click handling via keyboard
noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        addNote();
    }
});