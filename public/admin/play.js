"use strict";

(function () {
  window.addEventListener("load", init);

  /**
   * This init function will set all event handlers for the dialog and open dialog box
   */
  function init() {
    addAccountsEventListeners();

    console.log("==== accounts ====");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("ids");
    const accountId = ids;

    if (queryString) {
      id("mode").value = "edit";
      getAccount(accountId);
    } else {
      id("mode").value = "add";
    }
  }

  function addAccountsEventListeners() {
    // Get the form element
    const accountsForm = id("accountsForm");

    // Add 'submit' event handler
    accountsForm.addEventListener(
      "submit",
      function (event) {
        postAccountCmd(event);
      },
      false
    );
  }

  async function getAccount(accountId) {
    try {
      const formData = new FormData();
      formData.append(
        "sqlcommand",
        "select Account_id, Name, date_format(Date_Created, '%Y-%m-%d') as Date_Created, Email from Accounts where Account_id = " +
          accountId
      );
      let res = await fetch("/admin/admin-cmd", {
        method: "POST",
        body: formData,
      });

      checkStatus(res);
      let data = await res.json();
      console.log(data);
      console.log("===== check status");
      id("Account_id").value = data[0].Account_id;
      id("Date_Created").value = data[0].Date_Created;
      id("Email").value = data[0].Email;
      id("Name").value = data[0].Name;
      console.log(id("Account_id").value);
    } catch (err) {
      handleError();
    }
  }

  async function postAccountCmd(event) {
    try {
      event.preventDefault();

      const accountId = id("Account_id").value;
      const name = id("Name").value;
      const dateCreated = id("Date_Created").value;
      const email = id("Email").value;

      const formData = new FormData();
      const mode = id("mode").value;

      let sql;
      if (mode === "add") {
        sql = `insert into ACCOUNTS (Account_id, Name, Date_Created, Email) values (${accountId}, '${name}', '${dateCreated}', '${email}')`;
      } else {
        sql = `update ACCOUNTS set Name = '${name}', Date_Created = '${dateCreated}', Email = '${email}' where Account_id = ${accountId}`;
      }
      console.log(sql);

      formData.append("sqlcommand", sql);
      let res = await fetch("/admin/admin-cmd", {
        method: "POST",
        body: formData,
      });

      checkStatus(res);

      window.location.href = "/index.html";
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
