// Handle form submission and add data to table
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting

    // Get form values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;

    // Collect all hobby inputs
    const hobbyInputs = document.querySelectorAll('[name="hobbies[]"]');
    const hobbies = [];
    hobbyInputs.forEach(input => hobbies.push(input.value));

    // Create a new row for the table
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert new data into the row
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = gender;
    newRow.insertCell(2).textContent = email;
    newRow.insertCell(3).textContent = hobbies.join(', ');  // Join hobbies with comma

    // Add Delete button to the row
    const deleteCell = newRow.insertCell(4);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        newRow.remove();  // Remove the row when delete button is clicked
    };
    deleteCell.appendChild(deleteButton);

    // Clear the form
    document.getElementById('form').reset();
    // Remove dynamically added hobby input fields (except the first one)
    const hobbyContainer = document.getElementById('hobby-container');
    hobbyContainer.innerHTML = '<div class="hobby-input"><input type="text" id="hobbies-1" name="hobbies[]" required><button type="button" class="delete-hobby" onclick="deleteHobby(this)">Delete</button></div>';
});

// Add new hobby input field
document.getElementById('add-hobby').addEventListener('click', function() {
    const hobbyContainer = document.getElementById('hobby-container');
    const hobbyCount = hobbyContainer.getElementsByClassName('hobby-input').length + 1;
    const newHobbyDiv = document.createElement('div');
    newHobbyDiv.classList.add('hobby-input');
    
    const newHobbyInput = document.createElement('input');
    newHobbyInput.type = 'text';
    newHobbyInput.id = `hobbies-${hobbyCount}`;
    newHobbyInput.name = 'hobbies[]';
    
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-hobby');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        newHobbyDiv.remove();  // Remove the specific hobby input when delete button is clicked
    };

    newHobbyDiv.appendChild(newHobbyInput);
    newHobbyDiv.appendChild(deleteButton);
    hobbyContainer.appendChild(newHobbyDiv);
});

// Delete a specific hobby input field
function deleteHobby(button) {
    button.parentElement.remove();  // Remove the specific hobby input field's parent div
}

// Search function to filter the table
function searchTable() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.getElementById('data-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let showRow = false;

        // Check if any cell contains the search term
        for (let j = 0; j < cells.length - 1; j++) { // Exclude last cell (Delete button)
            if (cells[j].textContent.toLowerCase().includes(searchValue)) {
                showRow = true;
                break;
            }
        }

        // Show or hide row based on search match
        if (showRow) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
