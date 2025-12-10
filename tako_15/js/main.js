$(document).ready(() => {
  const data = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'London' },
    { name: 'Bob Johnson', age: 40, city: 'Paris' }
  ];

  const $myTable = $('#myTable');

  // myTable.innerHTML += `
  //   <tr>
  //     <td>Jane Smith</td>
  //     <td>25</td>
  //     <td>London</td>
  //   </tr>
  // `;

  $.each(data, (_, item) => {
    const $row = $('<tr></tr>')
      .append($('<td></td>').text(item.name))
      .append($('<td></td>').text(item.age))
      .append($('<td></td>').text(item.city));

    $myTable.append($row);
  });
});
