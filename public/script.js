"use strict";

(function () {
  window.addEventListener("load", init);

  /**
   * This init function will set all event handlers for the dialog and open dialog box
   */
  function init() {
    addMenuEventListeners();
    addClassInfoEventListeners();

    id("div-home").classList.add("show");
  }

  /**
   * Add all menu event listeners
   */
  function addMenuEventListeners() {
    id("home").addEventListener(
      "click",
      function () {
        showContent("div-home");
      },
      false
    );
    id("classes").addEventListener(
      "click",
      function () {
        showContent("div-classes");
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

  /**
   * Add all class info event listeners
   */
  function addClassInfoEventListeners() {
    id("cse154").addEventListener(
      "click",
      function () {
        moreClassInfo("CSE154");
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
    id("div-home").classList.remove("show");
    id("div-classes").classList.remove("show");
    id("div-database").classList.remove("show");

    document.getElementById(content).classList.add("show");
  }

  function moreClassInfo(className) {
    let element = id("class-info");
    element.innerText =
      "This course covers techniques for database design and reporting, as well as database system concepts necessary for implementation and optimization. The first part of the course will cover concepts and techniques useful in database design, reporting, and implementation, including the relational model, relational algebra, Structured Query Language (SQL), entity-relationship modeling, and normalization. The second part of the course will cover object role modeling and the phases of database design methodology (conceptual, logical, and physical). Additional topics, such as transaction management, query processing, and current trends will be addressed as time permits.";
    element.classList.add("class-info-high-light");
  }

  function renderTable(data) {
    //Create a HTML Table element.
    var table = gen("TABLE");
    table.border = "1";
    //Get the count of columns.
    var columnCount = Object.keys(data[0]).length;
    var row;

    //Add the data rows.
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
    let url = "/accounts";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dataTable");
      id("dtHeader").innerText = "Accounts";
      renderTable(data.accounts);
    } catch (err) {
      handleError();
    }
  }

  async function getAllAverageRating() {
    let url = "/average_rating";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Average Rating";
      renderTable(data.average_rating);
    } catch (err) {
      handleError();
    }
  }

  async function getAllGameList() {
    let url = "/game_list";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Game List";
      renderTable(data.game_list);
    } catch (err) {
      handleError();
    }
  }

  async function getAllPlays() {
    let url = "/plays";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Plays";
      renderTable(data.plays);
    } catch (err) {
      handleError();
    }
  }

  async function getAllReviews() {
    let url = "/reviews";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Reviews";
      renderTable(data.reviews);
    } catch (err) {
      handleError();
    }
  }

  async function getAllVideoGames() {
    let url = "/video_games";
    try {
      let res = await fetch(url);
      checkStatus(res);
      let data = await res.json();
      id("dtHeader").innerText = "Video Games";
      renderTable(data.video_games);
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
