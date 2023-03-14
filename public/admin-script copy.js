"use strict";

(function () {
  window.addEventListener("load", init);

  /**
   * This init function will set all event handlers for the dialog and open dialog box
   */
  function init() {
    addMenuEventListeners();
    addClassInfoEventListeners();

    id("div-database").classList.add("show");
  }

  /**
   * Add all menu event listeners
   */
  function addMenuEventListeners() {
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

  /**
   * Hide all secions including the home section and show the selected section
   * Ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav
   *
   * @param {string} content - The selected element id
   */
  function showContent(content) {
    id("div-database").classList.remove("show");

    document.getElementById(content).classList.add("show");
  }

  function renderTable(data, header) {
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

    // Add the data rows.
    for (var i = 0; i < data.length; i++) {
      row = table.insertRow(-1);
      for (var j = 0; j < columnCount; j++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = Object.values(data[i])[j];
      }
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
      renderTable(data.accounts, [
        "Account ID",
        "Name",
        "Date Created",
        "Email",
      ]);
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
      renderTable(data.average_rating, [
        "Game ID",
        "Number of Reviews",
        "Total Rating",
      ]);
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
      renderTable(data.game_list, ["Account ID", "Game ID", "Group Name"]);
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
      renderTable(data.plays, ["Account ID", "Game ID", "Hours Played"]);
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
      renderTable(data.reviews, [
        "Account ID",
        "Game ID",
        "Rating",
        "R Comment",
      ]);
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
      renderTable(data.video_games, [
        "Game ID",
        "Release Date",
        "Title",
        "Platforms",
        "Genres",
        "Developer",
        "Publisher",
      ]);
    } catch (err) {
      handleError();
    }
  }

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
