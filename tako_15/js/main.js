$(document).ready(() => {
  const data = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'London' },
    { name: 'Bob Johnson', age: 40, city: 'Paris' },
    { name: 'Otto Popen', age: 40, city: 'Ban Gon' }
  ];

  const $myTable = $('#myTable');

  $.each(data, (_, item) => {

    let row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.city}</td>
      </tr>
    `;
    $myTable.append(row);
  });
});
