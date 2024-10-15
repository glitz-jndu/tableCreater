// Dummy data for the table
const data = [
  { id: 1, name: "John Doe", age: 25, country: "USA", phone: "0774256345", gender: "male" },
  { id: 2, name: "Jane Smith", age: 30, country: "Canada", phone: "0774256345", gender: "female" },
  { id: 3, name: "Alice Johnson", age: 22, country: "UK", phone: "0764556345", gender: "female" },
  { id: 4, name: "Michael Brown", age: 35, country: "Australia", phone: "0546736345", gender: "male" },
  { id: 5, name: "Emily Davis", age: 29, country: "Ireland", phone: "0776453635", gender: "male" },
  { id: 6, name: "Daniel Wilson", age: 32, country: "New Zealand",phone: "0775463734", gender: "male" },
  { id: 7, name: "Sarah Thomas", age: 28, country: "South Africa",phone: "0774256345", gender: "male"},
  { id: 8, name: "James Taylor", age: 33, country: "USA",phone: "0774256345", gender: "male" },
  { id: 9, name: "Megan Clark", age: 24, country: "Canada",phone: "0774256345", gender: "male" },
  { id: 10, name: "Chris White", age: 31, country: "UK",phone: "0774256345", gender: "male" },
  { id: 11, name: "Daniel Wilson", age: 32, country: "New Zealand",phone: "0774256345", gender: "male" },
  { id: 12, name: "Sarah Thomas", age: 28, country: "South Africa",phone: "0774256345", gender: "male" },
  { id: 13, name: "James Taylor", age: 33, country: "USA",phone: "0774256345", gender: "male" },
  { id: 14, name: "Megan Clark", age: 24, country: "Canada",phone: "0774256345", gender: "male" },
  { id: 15, name: "Chris White", age: 31, country: "UK",phone: "0774256345", gender: "male" },
  { id: 16, name: "Daniel Wilson", age: 32, country: "New Zealand",phone: "0774256345", gender: "male" },
  { id: 17, name: "Sarah Thomas", age: 28, country: "South Africa",phone: "0774256345", gender: "male" },
  { id: 18, name: "James Taylor", age: 33, country: "USA",phone: "0774256345", gender: "male" },
  { id: 19, name: "Megan Clark", age: 24, country: "Canada",phone: "0774256345", gender: "male" },
  { id: 20, name: "Chris White", age: 31, country: "UK",phone: "0774256345", gender: "male" },
  { id: 21, name: "John Doe", age: 25, country: "USA", phone: "0774256345", gender: "male" },
  { id: 22, name: "Jane Smith", age: 30, country: "Canada", phone: "0774256345", gender: "female" },
  { id: 23, name: "Alice Johnson", age: 22, country: "UK", phone: "0764556345", gender: "female" },
  { id: 24, name: "Michael Brown", age: 35, country: "Australia", phone: "0546736345", gender: "male" },
  { id: 25, name: "Emily Davis", age: 29, country: "Ireland", phone: "0776453635", gender: "male" },
  { id: 26, name: "Daniel Wilson", age: 32, country: "New Zealand",phone: "0775463734", gender: "male" },
  { id: 27, name: "Sarah Thomas", age: 28, country: "South Africa",phone: "0774256345", gender: "male"},
  { id: 28, name: "James Taylor", age: 33, country: "USA",phone: "0774256345", gender: "male" },
  { id: 29, name: "Megan Clark", age: 24, country: "Canada",phone: "0774256345", gender: "male" },
  { id: 30, name: "Chris White", age: 31, country: "UK",phone: "0774256345", gender: "male" },
  { id: 31, name: "Daniel Wilson", age: 32, country: "New Zealand",phone: "0774256345", gender: "male" },
  { id: 32, name: "Sarah Thomas", age: 28, country: "South Africa",phone: "0774256345", gender: "male" },
  { id: 33, name: "James Taylor", age: 33, country: "USA",phone: "0774256345", gender: "male" },
  { id: 34, name: "Megan Clark", age: 24, country: "Canada",phone: "0774256345", gender: "male" },
  { id: 35, name: "Chris White", age: 31, country: "UK",phone: "0774256345", gender: "male" },
  { id: 36, name: "Daniel Wilson", age: 32, country: "New Zealand",phone: "0774256345", gender: "male" },
  { id: 37, name: "Sarah Thomas", age: 28, country: "South Africa",phone: "0774256345", gender: "male" },
  { id: 38, name: "James Taylor", age: 33, country: "USA",phone: "0774256345", gender: "male" },
  { id: 39, name: "Megan Clark", age: 24, country: "Canada",phone: "0774256345", gender: "male" },
  { id: 40, name: "Chris White", age: 31, country: "UK",phone: "0774256345", gender: "male" },

];

let rowsPerPage = 10;
let currentPage = 1;
let filteredData = data;

function renderTable(data, page = 1) {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);


  paginatedData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
     <td id="uniq1"></td>
     <td id="uniq2"></td>
      <td id="uniq3">${row.id}</td>
      <td >${row.name}</td>
      <td>${row.age}</td>
      <td>${row.country}</td>
      <td>${row.phone}</td>
      <td>${row.gender}</td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination(data.length, page);
}

// Sorting functionality
document.querySelectorAll('#dataTable th').forEach(th => {
  th.addEventListener('click', function() {
    const column = this.getAttribute('data-column');
    const order = this.getAttribute('data-order');
    const newOrder = order === 'desc' ? 'asc' : 'desc';
    this.setAttribute('data-order', newOrder);
    
    filteredData.sort((a, b) => {
      if (a[column] < b[column]) return newOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });

    document.querySelectorAll('th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
    this.classList.add(`sort-${newOrder}`);
    renderTable(filteredData, currentPage);
  });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.age.toString().includes(searchTerm) ||
    item.country.toLowerCase().includes(searchTerm) ||
    item.phone.toLowerCase().includes(searchTerm) ||
    item.gender.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredData, 1);
});

// Rows per page change
document.getElementById('rowsPerPage').addEventListener('change', function() {
  rowsPerPage = parseInt(this.value);
  renderTable(filteredData, 1);
});

// Pagination rendering
function renderPagination(totalItems, currentPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const maxVisibleButtons = 5;
  const halfMax = Math.floor(maxVisibleButtons / 2);

  // Render the "«" button (go to first page)
  if (currentPage > 1) {
    const firstButton = document.createElement('button');
    firstButton.textContent = '«';
    firstButton.addEventListener('click', () => {
      renderTable(filteredData, 1);
      currentPage = 1;
    });
    pagination.appendChild(firstButton);
  }

  // Render the "‹" button (go to previous page)
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = '‹';
    prevButton.addEventListener('click', () => {
      renderTable(filteredData, currentPage - 1);
      currentPage--;
    });
    pagination.appendChild(prevButton);
  }

  // Render page numbers
  let startPage = Math.max(currentPage - halfMax, 1);
  let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.toggle('active', i === currentPage);
    button.addEventListener('click', () => {
      renderTable(filteredData, i);
      currentPage = i;
    });
    pagination.appendChild(button);
  }

  // Render the "›" button (go to next page)
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = '›';
    nextButton.addEventListener('click', () => {
      renderTable(filteredData, currentPage + 1);
      currentPage++;
    });
    pagination.appendChild(nextButton);
  }

  // Render the "»" button (go to last page)
  if (currentPage < totalPages) {
    const lastButton = document.createElement('button');
    lastButton.textContent = '»';
    lastButton.addEventListener('click', () => {
      renderTable(filteredData, totalPages);
      currentPage = totalPages;
    });
    pagination.appendChild(lastButton);
  }
}


function adjustTableToScreenHeight() {
  const tableContainer = document.querySelector('.table-wrap');
  const tableBody = document.querySelector('#dataTable tbody');

  const headerHeight = document.getElementById('tableName').offsetHeight || 0;
  const searchHeight = document.getElementById('search-view').offsetHeight || 0;
  const paginationHeight = document.getElementById('pagination').offsetHeight || 0;
  const totalHeight = window.innerHeight;
  
  // Calculate the available height for the table
  const availableHeight = totalHeight - (headerHeight + paginationHeight + searchHeight + 50);
  
  // Calculate row height
  const rowHeight = tableBody.querySelector('tr') ? tableBody.querySelector('tr').offsetHeight : 40;
  
  // Calculate how many rows fit into the available height
  const rowsThatFit = Math.floor(availableHeight / rowHeight);
  
  // Set the rowsPerPage based on the calculation
  rowsPerPage = rowsThatFit > 0 ? rowsThatFit : 5;  // Fallback to 5 if the calculation is incorrect
  
  // Render the table with the current page
  renderTable(filteredData, currentPage);
}

// Adjust the table height and rerender when the window is resized
window.addEventListener('resize', adjustTableToScreenHeight);

// Call the function to adjust the table on load
adjustTableToScreenHeight();

// Render the table with initial data and page
renderTable(filteredData, currentPage);

// Handle change in rowsPerPage manually
document.getElementById('rowsPerPage').addEventListener('change', function() {
  rowsPerPage = parseInt(this.value);
  renderTable(filteredData, 1);  // Start from the first page when rows per page changes
});


window.addEventListener('resize', adjustTableToScreenHeight);

adjustTableToScreenHeight();
renderTable(filteredData, currentPage);










