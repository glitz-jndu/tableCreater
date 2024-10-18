// Unit test for the column sorting functionality

// Given the following data and headers
const data = [
  // ...
];

const headers = [
  // ...
];

// And the following renderTable function
function renderTable(data, page = 1) {
  // ...
}

// The test case should cover multiple column sorts
test('maintains correct order after multiple column sorts', () => {
  // Arrange
  const expectedOrder = [
    { column: 'id', order: 'asc' },
    { column: 'name', order: 'desc' },
    { column: 'age', order: 'asc' },
    { column: 'country', order: 'desc' },
    { column: 'phone', order: 'asc' },
    { column: 'gender', order: 'desc' },
  ];

  // Act
  expectedOrder.forEach(({ column, order }) => {
    const th = document.querySelector(`th[data-column="${column}"]`);
    th.setAttribute('data-order', order);
    th.click();
  });

  // Assert
  const sortedData = data.sort((a, b) => {
    let result = 0;

    expectedOrder.forEach(({ column, order }) => {
      if (order === 'asc') {
        result = a[column] < b[column] ? -1 : 1;
      } else {
        result = a[column] > b[column] ? -1 : 1;
      }
    });

    return result;
  });

  const tableRows = document.querySelectorAll('#dataTable tbody tr');
  tableRows.forEach((row, index) => {
    const rowData = Object.fromEntries(headers.map(({ uniqH1, uniqH2, uniqH3, uniqH4, uniqH5, uniqH6, uniqH7, uniqH8 }) => {
      return [uniqH1 || uniqH2 || uniqH3 || uniqH4 || uniqH5 || uniqH6 || uniqH7 || uniqH8, row.querySelector(`td:nth-child(${index + 1})`).textContent];
    }));

    expect(rowData).toEqual(sortedData[index]);
  });
});