document.addEventListener("DOMContentLoaded", () => {
  /* DOM Selections */
  const pageList = document.querySelector(".js-pages");
  const header = document.querySelector(".js-header");

  // Copy  info from Data Array into results array
  let results = [...data];

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

  // Searchs through Data Array for matches and updates results array
  const searchFunction = (targ) => {
    let search = targ.value.trim().toLowerCase();

    results = data.filter((item) => {
      let firstname = item.name.first.toLowerCase();
      let lastName = item.name.last.toLowerCase();
      return firstname.includes(search) || lastName.includes(search);
    });
  };

  /*Display Functions*/

  // Shows and updates students  onscreen
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

  // This function  creates and appends the elements needed for the pagination buttons
  const addPageBtns = (list, numItems) => {
    const pageAmt = Math.ceil(list.length / numItems);
    pageList.innerHTML = "";

    for (let i = 1; i <= pageAmt; i++) {
      pageList.innerHTML += generatePageBtnHTML(i);
    }

    const firstBtn = pageList.firstElementChild.firstElementChild;
    firstBtn.className = "active";
  };

  // Generates SearchBar HTML and adds it to the page

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

  showPage(results, 1, 9);
  addPageBtns(results, 9);
  addSearchBar();

  /* Event Handlers */

  // Changes the page results when user clicks a pagination button
  const handlePageChange = (evt) => {
    let targ = evt.target;

    if (targ.tagName === "BUTTON") {
      const activeBtn = document.querySelector(".active");
      let pageNum = parseInt(targ.textContent);
      showPage(results, pageNum, 9);
      activeBtn.classList.remove("active");
      targ.className = "active";
    }
  };

  // Search funtionality

  const handleSearch = (evt) => {
    let targ = evt.target;

    if (targ.id === "search") {
      pageList.innerHTML = "";
      searchFunction(targ);

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
