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
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.age}</td>
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
function renderPagination(totalItems, currentPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.toggle('active', i === currentPage);
    button.addEventListener('click', () => {
      renderTable(filteredData, i);
      currentPage = i;
    });
    pagination.appendChild(button);
  }
}

// Initial table render
renderTable(filteredData, currentPage);
