"use strict";

(function () {
  window.addEventListener("load", init);

  /**
   * This init function will set all event handlers for the dialog and open dialog box
   */
  function init() {
    addMenuEventListeners();
    addAdminEventListeners();
    showContent("div-admin");
  }

  function addAdminEventListeners() {
    // Get the form element
    const adminForm = id("adminForm");

    // Add 'submit' event handler
    adminForm.addEventListener(
      "submit",
      function (event) {
        postAdminCmd(event);
      },
      false
    );
  }

  async function postAdminCmd(event) {
    try {
      const adminForm = id("adminForm");
      event.preventDefault();
      const formData = new FormData(adminForm);
      console.log("Form Data");
      for (let obj of formData) {
        console.log(obj);
      }

      // const formData1 = new FormData();
      // formData1.append("sqlcommand", "select * from plays");

      let res = await fetch("/admin/admin-cmd", {
        method: "POST",
        body: formData,
      });
      checkStatus(res);
      let data = await res.json();

      renderAdminTable(data);
    } catch (err) {
      handleError();
    }
  }

  /**
   * Add all menu event listeners
   */
  function addMenuEventListeners() {
    id("admin").addEventListener(
      "click",
      function () {
        showContent("div-admin");
      },
      false
    );
    id("accounts").addEventListener(
      "click",
      function () {
        getAllAccounts();
        showContent("div-database");
      },
      false
    );
    id("average_rating").addEventListener(
      "click",
      function () {
        getAllAverageRating();
        showContent("div-database");
      },
      false
    );
    id("game_list").addEventListener(
      "click",
      function () {
        getAllGameList();
        showContent("div-database");
      },
      false
    );
    id("plays").addEventListener(
      "click",
      function () {
        getAllPlays();
        showContent("div-database");
      },
      false
    );
    id("reviews").addEventListener(
      "click",
      function () {
        getAllReviews();
        showContent("div-database");
      },
      false
    );
    id("video_games").addEventListener(
      "click",
      function () {
        getAllVideoGames();
        showContent("div-database");
      },
      false
    );
  }

  function showContent(content) {
    id("div-admin").classList.remove("show");
    id("div-database").classList.remove("show");

    document.getElementById(content).classList.add("show");
  }

  // ================================= Admin Command Line =============================//

  function renderAdminTable(data) {
    //Create a HTML Table element.
    var table = gen("TABLE");
    table.border = "1";
    //Get the count of columns.
    var columnCount = Object.keys(data[0]).length;
    var row;

    // Add the data rows.
    for (var i = 0; i < data.length; i++) {
      row = table.insertRow(-1);
      for (var j = 0; j < columnCount; j++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = Object.values(data[i])[j];
      }
    }
    var dataTable = id("adminDataTable");
    dataTable.innerHTML = "";
    dataTable.appendChild(table);
  }

  // ============================ All Tables ==================================//

  function renderTable(data, url, ids, header) {
    //Create a HTML Table element.
    var table = gen("TABLE");
    table.border = "1";
    //Get the count of columns.
    var columnCount = Object.keys(data[0]).length;
    var row;

    // Add the header row
    var row = table.insertRow(-1);
    for (var i = 0; i < header.length; i++) {
      var headerCell = gen("TH");
      headerCell.innerHTML = header[i];
      row.appendChild(headerCell);
    }

    // Add anchor link
    var newAnchor = gen("a");
    newAnchor.setAttribute("href", url + ".html");
    newAnchor.innerHTML = "Add";
    var headerCell = gen("TH");
    headerCell.appendChild(newAnchor);
    row.appendChild(headerCell);

    // Add the data rows.
    var editAnchor;
    for (var i = 0; i < data.length; i++) {
      row = table.insertRow(-1);
      for (var j = 0; j < columnCount; j++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = Object.values(data[i])[j];
      }

      var dbIdsArray = ids.map((value) => {
        return Object.values(data[i])[value];
      });
      editAnchor = gen("a");
      editAnchor.setAttribute("href", url + ".html?ids=" + dbIdsArray.join());
      editAnchor.innerHTML = "Edit";
      var headerCell = gen("TD");
      headerCell.appendChild(editAnchor);
      row.appendChild(headerCell);
    }
    var dataTable = id("dataTable");
    dataTable.innerHTML = "";
    dataTable.appendChild(table);
  }

  async function getAllAccounts() {
    let url = "/admin/accounts";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dataTable");
      id("dtHeader").innerText = "Accounts";
      renderTable(
        data.accounts,
        url,
        [0],
        ["Account ID", "Name", "Date Created", "Email"]
      );
    } catch (err) {
      handleError();
    }
  }

  async function getAllAverageRating() {
    let url = "/admin/average_rating";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Average Rating";
      renderTable(
        data.average_rating,
        url,
        [0],
        ["Game ID", "Number of Reviews", "Total Rating"]
      );
    } catch (err) {
      handleError();
    }
  }

  async function getAllGameList() {
    let url = "/admin/game_list";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Game List";
      renderTable(
        data.game_list,
        url,
        [0, 1],
        ["Account ID", "Game ID", "Group Name"]
      );
    } catch (err) {
      handleError();
    }
  }

  async function getAllPlays() {
    let url = "/admin/plays";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Plays";
      renderTable(
        data.plays,
        url,
        [0, 1],
        ["Account ID", "Game ID", "Hours Played"]
      );
    } catch (err) {
      handleError();
    }
  }

  async function getAllReviews() {
    let url = "/admin/reviews";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Reviews";
      renderTable(
        data.reviews,
        url,
        [0, 1],
        ["Account ID", "Game ID", "Rating", "R Comment"]
      );
    } catch (err) {
      handleError();
    }
  }

  async function getAllVideoGames() {
    let url = "/admin/video_games";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Video Games";
      renderTable(
        data.video_games,
        url,
        [0],
        [
          "Game ID",
          "Release Date",
          "Title",
          "Platforms",
          "Genres",
          "Developer",
          "Publisher",
        ]
      );
    } catch (err) {
      handleError();
    }
  }

  // ================================= Utilites =============================//

  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  function handleError() {
    throw Error("Error occurs!");
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
