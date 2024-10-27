// script.js
const headers = [
    { id: 'ID' },
    { name: 'Name' },
    { age: 'Age' },
    { country: 'Country' },
    { phone: 'Phone' },
    { gender: 'Gender' }
];

const data = [
    { id: 1, name: 'Alice', age: 24, country: 'USA', phone: '123-456-7890', gender: 'Female' },
    { id: 2, name: 'Bob', age: 27, country: 'Canada', phone: '987-654-3210', gender: 'Male' },
    { id: 3, name: 'Charlie', age: 30, country: 'UK', phone: '555-555-5555', gender: 'Male' },
    { id: 4, name: 'Diana', age: 22, country: 'Australia', phone: '444-444-4444', gender: 'Female' },
    { id: 5, name: 'Edward', age: 29, country: 'USA', phone: '333-333-3333', gender: 'Male' },
    { id: 6, name: 'Fiona', age: 35, country: 'Canada', phone: '222-222-2222', gender: 'Female' },
    { id: 7, name: 'George', age: 26, country: 'UK', phone: '111-111-1111', gender: 'Male' },
    { id: 8, name: 'Hannah', age: 31, country: 'Australia', phone: '666-666-6666', gender: 'Female' }
];

const rowsPerPage = 5;

function renderTable(data, page = 1) {
    const tableBody = document.querySelector('#dataTable tbody');
    const tableHead = document.querySelector('#dataTable thead');
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');

    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.classList.add('header');
        th.setAttribute('data-order', 'desc');

        const columnKey = Object.keys(header)[0];
        th.setAttribute('data-column', columnKey);

        // Create checkbox for column visibility
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = index < 3; // Default checked for fixed columns
        checkbox.classList.add('column-checkbox');
        checkbox.dataset.column = columnKey; // Store column key in the checkbox

        th.appendChild(checkbox);
        th.appendChild(document.createTextNode(Object.values(header)[0]));

        th.addEventListener('click', function () {
            const column = this.getAttribute('data-column');
            const currentOrder = this.getAttribute('data-order');
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            this.setAttribute('data-order', newOrder);

            const allHeaders = document.querySelectorAll('th');
            allHeaders.forEach(header => {
                header.classList.remove('sort-asc', 'sort-desc');
            });

            if (newOrder === 'asc') {
                this.classList.add('sort-asc');
            } else {
                this.classList.add('sort-desc');
            }

            sortTableByColumn(column, newOrder);
        });

        headerRow.appendChild(th);
    });
    
    tableHead.appendChild(headerRow);

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
            <td>${row.phone}</td>
            <td>${row.gender}</td>
        `;
        tableBody.appendChild(tr);
    });

    renderPagination(data.length, page);
}

// Sort table by a specific column
function sortTableByColumn(column, order) {
    const sortedData = [...data].sort((a, b) => {
        if (a[column] < b[column]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[column] > b[column]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    renderTable(sortedData);
}

// Pagination for the table
function renderPagination(totalItems, currentPage) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const totalPages = Math.ceil(totalItems / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.className = i === currentPage ? 'active' : '';
        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            renderTable(data, i);
        });
        paginationDiv.appendChild(pageLink);
    }
}

// Initial render
renderTable(data);
    