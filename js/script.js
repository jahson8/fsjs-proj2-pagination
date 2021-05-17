document.addEventListener("DOMContentLoaded", () => {
  /* DOM Selections */
  const pageList = document.querySelector(".js-pages");
  const header = document.querySelector(".js-header");

  /* Helper Functions */
  const generateStudentHTML = (obj) => {
    return ` 
  <li class="student-item cf">
    <div class="student-details">
      <img class="avatar" src="${obj.picture.medium}" alt="Profile Picture">
      <h3>${obj.name.first} ${obj.name.last}</h3>
      <span class="email">${obj.email}</span>
    </div>
    <div class="joined-details">
      <span class="date">${obj.registered.date}</span>
    </div>
  </li>`;
  };

  const generatePageBtnHTML = (num) => {
    return `
      <li>
         <button type="button">${num}</button>
      </li>`;
  };

  /*Display Functions*/

  const showPage = (list, page, numItems) => {
    let start = page * numItems - numItems;
    let end = page * numItems;
    let studentList = document.querySelector(".js-students");
    studentList.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
      if (i >= start && i < end) {
        studentList.innerHTML += generateStudentHTML(list[i]);
      }
    }
  };

  /*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

  const addPageBtns = (list, numItems) => {
    const pageAmt = Math.ceil(list.length / numItems);
    pageList.innerHTML = "";

    for (let i = 1; i <= pageAmt; i++) {
      pageList.innerHTML += generatePageBtnHTML(i);
    }

    const firstBtn = pageList.firstElementChild.firstElementChild;
    firstBtn.className = "active";
  };

  const addSearchBar = () => {
    let search = document.createElement("label");
    search.setAttribute("for", "search");
    search.className = "student-search";
    search.innerHTML = `
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  `;
    header.appendChild(search);
  };

  // Call display functions
  showPage(data, 1, 9);
  addPageBtns(data, 9);
  addSearchBar();

  /* Event Handlers */

  const handlePageChange = (evt) => {
    let targ = evt.target;

    if (targ.tagName === "BUTTON") {
      const activeBtn = document.querySelector(".active");
      let pageNum = parseInt(targ.textContent);
      showPage(data, pageNum, 9);
      active.classList.remove("active");
      targ.className = "active";
    }
  };

  const handleSearch = (evt) => {
    let targ = evt.target;

    if (targ.id === "search") {
      let search = targ.value.trim().toLowerCase();

      const results = data.filter((item) => {
        let firstname = item.name.first.toLowerCase();
        let lastName = item.name.last.toLowerCase();
        return firstname.includes(search) || lastName.includes(search);
      });
      console.log(results);
      pageList.innerHTML = "";
      if (results.length) {
        showPage(results, 1, 9);
        addPageBtns(results, 9);
      } else {
        const studentList = document.querySelector(".js-students");

        studentList.innerHTML = `
        <li class="student-item cf">
          <div class="student-details">
            <h3>No Results</h3>
          </div>
       </li>`;
      }
    }
  };

  /* Event Listeners*/
  pageList.addEventListener("click", handlePageChange);
  header.addEventListener("keyup", handleSearch);
});
