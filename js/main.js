//^html element
let nameInput = document.querySelector("#sitename")
let urlInput = document.querySelector("#siteurl")
const searchInput = document.querySelector("#search")
const addBtn = document.querySelector("#add-btn")
const updateBtn = document.querySelector("#update-btn")
const marksRow = document.querySelector("#marks")
const readMy = document.querySelector("#readme")
const doc = document.querySelector("#doc")
const validRoll = document.querySelector("#valid-roll")
const nameVI = document.querySelector("#name-vi")
const urlVI = document.querySelector("#url-vi")
//* app variables
let marksList = JSON.parse(localStorage.getItem('marks')) || []
let updateIndex = 0
let nameV = false
let urlV = false
//!  functions
if (marksList[0] != null) {
    displayAll()
    searchInput.classList.remove("d-none")
}
function del(index) {
    marksList.splice(index, 1)
    localStorage.setItem('marks', JSON.stringify(marksList))
    if (marksList[0] == null) {
        searchInput.classList.add("d-none")
    }
    searchInput.classList.remove("d-none")
    displayAll()
    updateBtn.classList.add("d-none")
    addBtn.classList.remove("d-none")
}
function visit(index) {
    window.open(marksList[index].url, "blank")
}
function preupdate(index) {
    if (
        updateBtn.classList.contains("d-none")
    ) {
        updateIndex = index
        addBtn.classList.toggle("d-none")
        updateBtn.classList.toggle("d-none")
        nameInput.value = marksList[index].name
        urlInput.value = marksList[index].url
        searchInput.classList.add("d-none")
        marksRow.innerHTML = ''
        display(index)
        const updateMark = document.querySelector("#update-mark")
        updateMark.style.top = "-15%"
        nameV = true
        urlV = true
        nameInput.classList.remove("is-invalid")
        urlInput.classList.remove("is-invalid")
        validRoll.classList.add('d-none')
    }
}
function display(i) {
    let mark =
        ` <div class="col col-lg-3 col-md-4 col-sm-6 mb-3 d-flex justify-content-around">
                        <div class="carde position-relative">
                            <div class="back  w-100 h-100 position-absolute">
                            </div>
                            <div class="front  w-100 h-100 position-absolute justify-content-between ">
                                <span class="update"  onclick=preupdate(${i}) id="update-mark" ></span>
                                <span>${i + 1}</span>
                                <h2>${marksList[i].name}</h2>
                                <div class="btn-group d-flex justify-content-around">
                                    <button class="card-btn b1"  data="${i}"> Visit</button>
                                    <button class="card-btn b2" data="${i} "> Delete </button>
                                </div>
                            </div>
                        </div></div>
                          `;
    marksRow.innerHTML += mark
}
function displayAll() {
    marksRow.innerHTML = ''
    for (let i = 0; i < marksList.length; i++) {
        display(i);
    }
    document.querySelectorAll(`.b2`).forEach(element => {
        element.addEventListener('click', function(e){  
    del(e.target.getAttribute('data'))
        })    
        });
    document.querySelectorAll(`.b1`).forEach(element => {
        element.addEventListener('click', function(e){  
    visit(e.target.getAttribute('data'))
        })
        });
}
function clear() {
    nameInput.value = '';
    urlInput.value = '';
    searchInput.value = '';
}
function add() {
    if (nameV && urlV) {
        var set = {
            name: nameInput.value,
            url: urlInput.value,
        }
        marksList.push(set)
        localStorage.setItem('marks', JSON.stringify(marksList))
        searchInput.classList.remove("d-none")
        displayAll()
        clear()
        nameInput.classList.remove("is-valid")
        urlInput.classList.remove("is-valid")
        validRoll.classList.add('d-none')
        urlV = nameV = false
        nameVI.style.color = "red"
        urlVI.style.color = "red"
    }
    else {
        if (
            !nameInput.classList.contains("is-valid")
        ) {
            nameInput.classList.add("is-invalid")
        }
        if (
            !urlInput.classList.contains("is-valid")
        ) {
            urlInput.classList.add("is-invalid")
        }
        validRoll.classList.remove('d-none')
    }
}
function update() {
    if (nameV && urlV) {
        addBtn.classList.toggle("d-none")
        updateBtn.classList.toggle("d-none")
        var set = {
            name: nameInput.value,
            url: urlInput.value,
        }
        marksList.splice(updateIndex, 1, set)
        localStorage.setItem('marks', JSON.stringify(marksList))
        searchInput.classList.remove("d-none")
        displayAll()
        clear()
        nameInput.classList.remove("is-valid")
        urlInput.classList.remove("is-valid")
        validRoll.classList.add('d-none')
        nameVI.style.color = "red"
        urlVI.style.color = "red"
        nameV = false
        urlV = false
    }
    else {
        if (
            nameV == false
        ) {
            nameInput.classList.add("is-invalid")
        }
        else {
            nameVI.style.color = "green"

        }
        if (
            urlV == false
        ) {
            urlInput.classList.add("is-invalid")
        } else {
            urlVI.style.color = "green"

        }


        validRoll.classList.remove('d-none')
    }
}
//^  events
readMy.addEventListener("click", function () {
    if (
        doc.classList.contains('d-none')
    ) {
        doc.classList.remove('d-none')
    }
    else {
        doc.classList.add('d-none')
    }
    validRoll.classList.add('d-none')
    nameInput.classList.remove('is-invalid', "is-valid")
    urlInput.classList.remove('is-invalid', "is-valid")
})
window.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        if (updateBtn.classList.contains("d-none")) {
            add()
        }
        else {
            update()
        }
    }
})
searchInput.addEventListener('input', function () {
    marksRow.innerHTML = ''
    for (let i = 0; i < marksList.length; i++) {
        if ((marksList[i].name.toLowerCase()).includes(searchInput.value.toLowerCase())) {
            display(i)
        }
    }
})
const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,10}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
const nameRegex = /.{3,}/
nameInput.addEventListener("input", function () {
    if (nameRegex.test(nameInput.value)) {
        nameVI.style.color = "green"
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        nameV = true
    }
    else {
        nameVI.style.color = "red"
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        nameV = false
    }
})
urlInput.addEventListener("input", function () {
    if (urlRegex.test(urlInput.value)) {
        urlVI.style.color = "green"
        urlInput.classList.add("is-valid")
        urlInput.classList.remove("is-invalid")
        urlV = true
    }
    else {
        urlVI.style.color = "red"
        urlInput.classList.add("is-invalid")
        urlInput.classList.remove("is-valid")
        urlV = false
    }
})