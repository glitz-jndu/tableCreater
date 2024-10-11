// Dummy data for the table
const data = [
  { id: 1, name: "John Doe", age: 25, country: "USA" },
  { id: 2, name: "Jane Smith", age: 30, country: "Canada" },
  { id: 3, name: "Alice Johnson", age: 22, country: "UK" },
  { id: 4, name: "Michael Brown", age: 35, country: "Australia" },
  { id: 5, name: "Emily Davis", age: 29, country: "Ireland" },
  { id: 6, name: "Daniel Wilson", age: 32, country: "New Zealand" },
  { id: 7, name: "Sarah Thomas", age: 28, country: "South Africa" },
  { id: 8, name: "James Taylor", age: 33, country: "USA" },
  { id: 9, name: "Megan Clark", age: 24, country: "Canada" },
  { id: 10, name: "Chris White", age: 31, country: "UK" },
  { id: 11, name: "Daniel Wilson", age: 32, country: "New Zealand" },
  { id: 12, name: "Sarah Thomas", age: 28, country: "South Africa" },
  { id: 13, name: "James Taylor", age: 33, country: "USA" },
  { id: 14, name: "Megan Clark", age: 24, country: "Canada" },
  { id: 15, name: "Chris White", age: 31, country: "UK" },
  { id: 16, name: "Daniel Wilson", age: 32, country: "New Zealand" },
  { id: 17, name: "Sarah Thomas", age: 28, country: "South Africa" },
  { id: 18, name: "James Taylor", age: 33, country: "USA" },
  { id: 19, name: "Megan Clark", age: 24, country: "Canada" },
  { id: 20, name: "Chris White", age: 31, country: "UK" },
 
];

let rowsPerPage = 5;
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
      <td id="uniq">${row.id}</td>
      <td id="uniq">${row.name}</td>
      <td >${row.age}</td>
      <td>${row.country}</td>
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
    item.country.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredData, 1);
});

// Rows per page change
document.getElementById('rowsPerPage').addEventListener('change', function() {
  rowsPerPage = parseInt(this.value);
  renderTable(filteredData, 1);
});

// Pagination rendering
// Pagination rendering
function renderPagination(totalItems, currentPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const maxVisibleButtons = 5; // Number of visible page buttons at a time
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

// Initial table render
renderTable(filteredData, currentPage);



