let rowsPerPage = 3;
      let currentPage = 1;
      const table = document.querySelector('.table');
      const rows = table.querySelectorAll('tbody tr');
      let totalPages = Math.ceil(rows.length / rowsPerPage);

      function displayRows(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.forEach((row, index) => {
          if (index >= start && index < end) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
        document.getElementById('prevBtn').disabled = page === 1;
        document.getElementById('nextBtn').disabled = page === totalPages;
      }

      function nextPage() {
        if (currentPage < totalPages) {
          currentPage++;
          displayRows(currentPage);
        }
      }

      function prevPage() {
        if (currentPage > 1) {
          currentPage--;
          displayRows(currentPage);
        }
      }

      function changeRowsPerPage() {
        const select = document.getElementById('rowsPerPage');
        rowsPerPage = parseInt(select.value);
        totalPages = Math.ceil(rows.length / rowsPerPage);
        currentPage = 1; // Reset to the first page
        displayRows(currentPage);
      }

//       displayRows(currentPage); // Initial display




      // Search function
      function myFunction() {
        var input, filter, table, tr, td, i, j, txtValue;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        table = document.querySelector('.table');
        tr = table.getElementsByTagName('tr');

        for (i = 1; i < tr.length; i++) {
          tr[i].style.display = "none";
          td = tr[i].getElementsByTagName('td');
          for (j = 0; j < td.length; j++) {
            if (td[j]) {
              txtValue = td[j].textContent || td[j].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
              }
            }
          }
        }
      }


      
const fetchTableHeaders = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['ID', 'Name', 'Age', 'Email']);
        }, 100);
    });
};

const fetchTableData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { ID: 1, Name: 'Alice', Age: 25, Email: 'alice@example.com' },
                { ID: 2, Name: 'Bob', Age: 30, Email: 'bob@example.com' },
                { ID: 3, Name: 'Charlie', Age: 22, Email: 'charlie@example.com' },
            ]);
        }, 1000);
    });
};

const generateTable = async () => {
    const headers = await fetchTableHeaders();
    const data = await fetchTableData();

    const table = document.createElement('table');

    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    const tbody = table.createTBody();
    data.forEach(item => {
        const row = tbody.insertRow();
        headers.forEach(header => {
            const cell = row.insertCell();
            cell.textContent = item[header];
        });
    });

    document.getElementById('table-container').appendChild(table);
};

generateTable();
