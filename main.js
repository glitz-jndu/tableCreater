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


const headers = [
  { uniqH1: "ref" },
  { uniqH2: "action" },
  { uniqH3: "id" },
  { uniqH4: "name" },
  { uniqH5: "age" },
  { uniqH6: "country" },
  { uniqH7: "phone" },
  { uniqH8: "gender" },
];

let rowsPerPage = 20;
let currentPage = 1;
let filteredData = data;
let draggedColumn = null;

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
    // th.classList.add('scrollable-columns');


    const columnKey = Object.keys(header)[0];
    th.setAttribute('data-column', columnKey);

    const span = document.createElement('span');
    // span.type = 'span';
    span.classList.add('move-handle');
    span.dataset.column = index + 1;

    // span.style.display ='';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('fix-checkbox'); 
    checkbox.dataset.column = index + 1;
    // th.classList.add('scrollable-columns');


    if (index < 3) {
      checkbox.checked = true;
      th.classList.add('fixed-column');
    } 


    
    th.appendChild(span);
    th.appendChild(checkbox); 
    th.appendChild(document.createTextNode(Object.values(header)[0]));

     th.addEventListener('click', function() {
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
     <td id="uniq1"></td>
     <td id="uniq2"></td>
     <td id="uniq3">${row.id}</td>
     <td>${row.name}</td>
     <td>${row.age}</td>
     <td>${row.country}</td>
     <td>${row.phone}</td>
     <td>${row.gender}</td>
    `;
    tableBody.appendChild(tr);
  });



  renderPagination(data.length, page);
fixFirstThreeColumns();
updateCheckboxVisibility();


}








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

document.getElementById('rowsPerPage').addEventListener('change', function() {
  // rowsPerPage = parseInt(this.value);
  const selectedValue = this.value;

    if (selectedValue === 'all') {
        rowsPerPage = filteredData.length; 
    }else if (selectedValue === 'fit to screen'){
      adjustTableToScreenHeight(filteredData)
    }
     else {
        rowsPerPage = parseInt(selectedValue); 
    }
  renderTable(filteredData, 1);
});

function updateCheckboxVisibility() {


  const checkboxes = document.querySelectorAll('.fix-checkbox');

  const fixedTableHeaders = document.querySelectorAll('.fixed-header');
  const fixedColumnsCount = fixedTableHeaders.length;

  console.log('fixedColumnsCount', fixedColumnsCount);




  checkboxes.forEach((checkbox, index) => {
    if (index < fixedColumnsCount) {
      checkbox.checked = true;
      // checkbox.disabled = true;

    } else if(index == fixedColumnsCount){
      checkbox.disabled = false;
                checkbox.style.display = 'inline-block'; 

    }
      else {
        // checkbox.checked = false;
        // checkbox.disabled = true;
                  checkbox.style.display = 'none'; 

      }
    
  });

// checkboxes.forEach((checkbox, index) => {
//   checkbox.addEventListener('click', () => {
//     const header = checkbox.closest('th');
//     const cells = table.querySelectorAll(`td:nth-child(${index + 1})`);

//     if (checkbox.checked) {
//       header.classList.add('fixed-header');
//       cells.forEach(cell => cell.classList.add('fixed-column'));
//     } else {
//       header.classList.remove('fixed-header');
//       cells.forEach(cell => cell.classList.remove('fixed-column'));
//     }

//     updateFixedColumnsPosition();
//   });
// });


}
document.addEventListener('DOMContentLoaded', () => {
  updateCheckboxVisibility();
});

function sortTableByColumn(column, order) {
  const tableBody = document.querySelector('#dataTable tbody');
  const rows = Array.from(tableBody.querySelectorAll('tr'));

  const columnIndex = headers.findIndex(header => Object.keys(header)[0] === column);
  
  const sortedRows = rows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
    const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

    if (!isNaN(cellA) && !isNaN(cellB)) {
      // If the content is a number, sort numerically
      return order === 'asc' ? cellA - cellB : cellB - cellA;
    } else {
      // Otherwise, sort alphabetically
      return order === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  // Remove existing rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Append sorted rows
  sortedRows.forEach(row => tableBody.appendChild(row));
}


function renderPagination(totalItems, currentPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const maxVisibleButtons = 5;
  const halfMax = Math.floor(maxVisibleButtons / 2);

  if (currentPage > 1) {
    const firstButton = document.createElement('button');
    firstButton.textContent = '«';
    firstButton.addEventListener('click', () => {
      renderTable(filteredData, 1);
      currentPage = 1
      ;
    });
    pagination.appendChild(firstButton);
  }

  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = '‹';
    prevButton.addEventListener('click', () => {
      renderTable(filteredData, currentPage - 1);
      currentPage--;
    });
    pagination.appendChild(prevButton);
  }

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

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = '›';
    nextButton.addEventListener('click', () => {
      renderTable(filteredData, currentPage + 1);
      currentPage++;
    });
    pagination.appendChild(nextButton);
  }

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


function fixFirstThreeColumns() {
  const table = document.getElementById('dataTable');
  const fixedColumns = 3;

  const headers = table.querySelectorAll('thead th');
  const rows = table.querySelectorAll('tbody tr');

  headers.forEach((header, index) => {
    if (index < fixedColumns) {
      // header.classList.add('fixed-column');
      header.classList.add('fixed-header');
     
      // header.style.position = 'sticky';
     

      header.style.left = `${index * header.offsetWidth}px`;
      // header.style.zIndex = 10; 
      header.classList.remove('scrollable-columns');
    }
    else{
   
      // header.style.position ='static';
      header.classList.add('scrollable-columns');
    }
  });

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      if (index < fixedColumns) {
        cell.classList.add('fixed-column'); 
        // cell.style.position = 'sticky';
        cell.style.left = `${index * headers[0].offsetWidth}px`;
        // cell.style.zIndex = 5;
        cell.classList.remove('scrollable-columns');

      }
      else{
        // cell.style.position ='static';
        cell.classList.add('scrollable-columns');
      }
    }
   
  );
  });
}










  /* */
  const table = document.getElementById('dataTable');
  let activeColumn = null;
  let activeColumnIndex = -1;
  let dragPreview = null;
  let checkboxUpdatePending = false;
  
  // Start drag
  table.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('move-handle')) {
      activeColumn = e.target.closest('th');
      activeColumnIndex = Array.from(activeColumn.parentNode.children).indexOf(activeColumn);
  
      if (!activeColumn.classList.contains('fixed-column')) {
        createDragPreview(e);
        e.preventDefault();
      } else {
        updateCheckboxVisibility();
        activeColumn = null;
        activeColumnIndex = -1;
      }
    }
  });
  
  // Move drag preview with cursor
  table.addEventListener('mousemove', (e) => {
    if (dragPreview) {
      dragPreview.style.left = `${e.pageX}px`;
      dragPreview.style.top = `${e.pageY}px`;
      updatePlaceholderPosition(e);
      debounceUpdateCheckboxVisibility();  // Debounce checkbox visibility updates
    }
  });
  
  // End drag
  table.addEventListener('mouseup', cleanupDragPreview);
  table.addEventListener('mouseleave', cleanupDragPreview);
  updateCheckboxVisibility();
  
  function createDragPreview(e) {
    dragPreview = document.createElement('div');
    dragPreview.classList.add('drag-preview');
    dragPreview.style.position = 'absolute';
    dragPreview.style.width = `${activeColumn.offsetWidth}px`;
    dragPreview.style.pointerEvents = 'none';
  
    const headerClone = activeColumn.cloneNode(true);
    dragPreview.appendChild(headerClone);
  
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const cellClone = row.children[activeColumnIndex].cloneNode(true);
      dragPreview.appendChild(cellClone);
    });
  
    document.body.appendChild(dragPreview);
  
    dragPreview.style.left = `${e.pageX}px`;
    dragPreview.style.top = `${e.pageY}px`;
  
    activeColumn.classList.add('placeholder');
  }
  
  function updatePlaceholderPosition(e) {
    const targetColumn = document.elementFromPoint(e.clientX, e.clientY).closest('th');
    const targetIndex = Array.from(targetColumn?.parentNode?.children || []).indexOf(targetColumn);
  
    if (targetColumn && targetColumn !== activeColumn && !targetColumn.classList.contains('fixed-column')) {
      targetColumn.insertAdjacentElement(
        activeColumnIndex < targetIndex ? 'afterend' : 'beforebegin',
        activeColumn
      );
  
      updateBodyCells(activeColumnIndex, targetIndex);
      activeColumnIndex = Array.from(activeColumn.parentNode.children).indexOf(activeColumn);
    }
  }
  
  function cleanupDragPreview() {
    if (dragPreview) {
      dragPreview.remove();
      dragPreview = null;
    }
    activeColumn.classList.remove('placeholder');
    activeColumn = null;
    activeColumnIndex = -1;
  }
  
  function updateBodyCells(draggedIndex, targetIndex) {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const draggedCell = row.children[draggedIndex];
      const targetCell = row.children[targetIndex];
      if (targetIndex > draggedIndex) {
        row.insertBefore(draggedCell, targetCell.nextElementSibling);
      } else {
        row.insertBefore(draggedCell, targetCell);
      }
    });
  }
  
  // Debounce the checkbox visibility updates
  function debounceUpdateCheckboxVisibility() {
    if (!checkboxUpdatePending) {
      checkboxUpdatePending = true;
      requestAnimationFrame(() => {
        updateCheckboxVisibility();
        checkboxUpdatePending = false;
      });
    }
  }
   
  
  


  
  table.addEventListener('change', (e) => {
  if (e.target.classList.contains('fix-checkbox')) {
    const clickedColumn = e.target.closest('th');
    const columns = Array.from(table.querySelectorAll('th'));
    const clickedIndex = columns.indexOf(clickedColumn);

    columns.forEach((column, index) => {
      const cells = table.querySelectorAll(`td:nth-child(${index + 1})`);
      const checkbox = column.querySelector('.fix-checkbox');

      if (index <= clickedIndex && checkbox.checked) {
        column.classList.add('fixed-header');
        column.style.left = `${index * column.offsetWidth}px`;
        cells.forEach(cell => cell.classList.add('fixed-column'));
      } else {
        checkbox.checked = false;
        column.classList.remove('fixed-header');
        column.classList.add('scrollable-columns')
        column.style.left = '';  // Reset left position
        cells.forEach(cell => cell.classList.remove('fixed-column'));
      }
    });

    updateFixedColumnsPosition();
  }
});

function updateFixedColumnsPosition() {
  let leftOffset = 0;
  const fixedHeaders = table.querySelectorAll('th.fixed-header');
  fixedHeaders.forEach((header, index) => {
    header.style.left = `${leftOffset}px`;
    const cells = table.querySelectorAll(`td:nth-child(${index + 1})`);
    cells.forEach(cell => cell.style.left = `${leftOffset}px`);
    leftOffset += header.offsetWidth;
  });
}

window.addEventListener('resize', updateFixedColumnsPosition);



  

  /* */

  function adjustTableToScreenHeight() {
    const tableContainer = document.querySelector('.table-wrap');
    const tableBody = document.querySelector('#dataTable tbody');

    const headerHeight = document.getElementById('tableName').offsetHeight || 0;
    const searchHeight = document.getElementById('search-view').offsetHeight || 0;
    const paginationHeight = document.getElementById('pagination').offsetHeight || 0;
    const totalHeight = window.innerHeight;

    const availableHeight = totalHeight - (headerHeight + paginationHeight + searchHeight + 300);

    const rowHeight = tableBody.querySelector('tr') ? tableBody.querySelector('tr').offsetHeight : 40;
    const rowsThatFit = Math.floor(availableHeight / rowHeight);

    rowsPerPage = rowsThatFit > 0 ? rowsThatFit : 5;

    renderTable(filteredData, currentPage);
  }



  window.addEventListener('resize', adjustTableToScreenHeight);





  adjustTableToScreenHeight();
  renderTable(filteredData, currentPage);










