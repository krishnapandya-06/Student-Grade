let currentEditIndex = null;

document.addEventListener("DOMContentLoaded", displayRecords);

function getRecords() {
  const records = localStorage.getItem("records");
  return records ? JSON.parse(records) : [];
}

function displayRecords() {
  const recordList = document.getElementById("record-list");
  recordList.innerHTML = "";

  const records = getRecords();

  if (records.length === 0) {
    recordList.innerHTML = `<tr><td colspan="4">No records available</td></tr>`;
    return;
  }

  records.forEach((record, index) => {
    recordList.innerHTML += `
      <tr>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>${new Date(record.date).toLocaleString()}</td>
        <td>
          <button class="ui-button-edit" onclick="loadRecord(${index})">Edit</button>
          <button class="ui-button-delete" onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function addRecord() {
  const nameInput = document.getElementById("input-name").value.trim();
  const detailsInput = document.getElementById("input-details").value.trim();

  if (!nameInput || !detailsInput) {
    alert("Both name and details are required.");
    return;
  }

  const newRecord = {
    id: generateUniqueId(),
    name: nameInput,
    details: detailsInput,
    date: new Date(),
  };

  const records = getRecords();
  records.push(newRecord);
  localStorage.setItem("records", JSON.stringify(records));

  clearForm();
  displayRecords();
}

function loadRecord(index) {
  const records = getRecords();
  const record = records[index];

  document.getElementById("input-name").value = record.name;
  document.getElementById("input-details").value = record.details;

  currentEditIndex = index;

  document.getElementById("add-button").style.display = "none";
  document.getElementById("update-button").style.display = "inline-block";
}

function updateRecord() {
  const records = getRecords();

  records[currentEditIndex].name = document
    .getElementById("input-name")
    .value.trim();
  records[currentEditIndex].details = document
    .getElementById("input-details")
    .value.trim();
  records[currentEditIndex].date = new Date();

  localStorage.setItem("records", JSON.stringify(records));

  clearForm();
  displayRecords();

  document.getElementById("add-button").style.display = "inline-block";
  document.getElementById("update-button").style.display = "none";

  currentEditIndex = null;
}

function deleteRecord(index) {
  const records = getRecords();
  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  displayRecords();
}

function searchRecords() {
  const query = document.getElementById("input-search").value.toLowerCase();
  const records = getRecords();
  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(query)
  );

  const recordList = document.getElementById("record-list");
  recordList.innerHTML = "";

  if (filteredRecords.length === 0) {
    recordList.innerHTML = `<tr><td colspan="4">No records found</td></tr>`;
    return;
  }

  filteredRecords.forEach((record, index) => {
    recordList.innerHTML += `
      <tr>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>${new Date(record.date).toLocaleString()}</td>
        <td>
          <button class="ui-button-edit" onclick="loadRecord(${index})">Edit</button>
          <button class="ui-button-delete" onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function generateUniqueId() {
  return Math.floor(Math.random() * Date.now());
}

function clearForm() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-details").value = "";
}
