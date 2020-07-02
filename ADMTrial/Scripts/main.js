let originalOrderModels = models;
let sortOrder = localStorage.getItem('sortOrder') === undefined ? "ASC" : localStorage.getItem('sortOrder');
let sortField = localStorage.getItem('sortField') === undefined ? "" : localStorage.getItem('sortField');

let productTable = document.querySelector("table#products");

let sortSelect = document.querySelector("#sort-option");
sortSelect.value = sortField;

sortSelect.addEventListener("change", () => {
    SetSortField(sortSelect.value);
    SortTable();
});

let sortButtons = document.querySelectorAll(".sort-btn");
InitSortButtons();

function InitSortButtons() {
    for (let i = 0, sortBtn; sortBtn = sortButtons[i]; i++) {
        if (sortBtn.dataset.sort == sortOrder) {
            sortBtn.classList.add("active");
        }

        sortBtn.addEventListener("click", () => {
            ClearSortActiveFromAll();
            SetSortOrder(sortBtn.dataset.sort);
            SortTable();
            sortBtn.classList.add("active");
        });
    }
}

function SetSortOrder(newOrder) {
    sortOrder = newOrder;
    localStorage.setItem("sortOrder", newOrder);
}

function SortBy(propertyName, order) {
    models = originalOrderModels;
    models.sort((a, b) => parseFloat(a[propertyName]) - parseFloat(b[propertyName]));

    if (order === "DESC") {
        models.reverse();
    }
}

function ClearSortActiveFromAll() {
    for (let i = 0, sortBtn; sortBtn = sortButtons[i]; i++) {
        sortBtn.classList.remove("active");
    }

}

function ClearProductRows() {
    let productRows = document.querySelectorAll("tr.product");

    for (let i = 0, productRow; productRow = productRows[i]; i++) {
        productRow.remove();
    }
}

function RenderProductRows() {
    ClearProductRows();

    for (var i = 0, product; product = models[i]; i++) {
        RenderProductRow(product);
    }
}

function RenderProductRow(product) {
    let tr = document.createElement("tr");
    tr.classList.add("product");

    let tdImage = document.createElement("td");
    let image = document.createElement("img");
    image.src = "/Content/images/" + product.Image;
    image.alt = product.Title;
    tdImage.appendChild(image);
    tr.appendChild(tdImage);

    let tdDescription = document.createElement("td");
    let pTitle = document.createElement("p");
    pTitle.innerText = product.Title;
    tdDescription.appendChild(pTitle);

    let pDescription = document.createElement("p");
    pDescription.innerHTML = product.DescriptionWithId;
    tdDescription.appendChild(pDescription);

    let aMoreDetails = document.createElement("a");
    aMoreDetails.innerText = "More Details";
    aMoreDetails.href = "/Product/Details/" + product.Id;
    aMoreDetails.classList.add("btn");
    aMoreDetails.classList.add("btn-default");
    tdDescription.appendChild(aMoreDetails);
    tr.appendChild(tdDescription);

    let tdPriceAndAvailable = document.createElement("td");
    let tdPrice = document.createElement("div");
    let tdPriceLabel = document.createElement("div");
    tdPriceLabel.innerText = "Price:";
    tdPrice.appendChild(tdPriceLabel);

    let tdPriceValue = document.createElement("div");
    tdPriceValue.innerText = product.Price + " EUR";
    tdPrice.appendChild(tdPriceValue);
    tdPriceAndAvailable.appendChild(tdPrice);

    let divAvailability = document.createElement("div");
    let divAvailabilityLabel = document.createElement("div");
    divAvailabilityLabel.innerText = "Availability:";
    divAvailability.appendChild(divAvailabilityLabel);

    let divAvailabilityValue = document.createElement("div");

    let formData = new FormData();
    formData.append("id", product.Id);

    let req = new XMLHttpRequest();
    req.open("POST", "/Product/GetAvailability/" + product.Id, true);
    req.onload = function (event) {
        if (req.status === 200) {
            divAvailabilityValue.innerText = JSON.parse(this.responseText).availability;
        }
    };

    req.send(formData);

    divAvailability.appendChild(divAvailabilityValue);
    tdPriceAndAvailable.appendChild(divAvailability);

    tr.appendChild(tdPriceAndAvailable);

    productTable.appendChild(tr);
}

function SetSortField(newField) {
    sortField = newField;
    localStorage.setItem("sortField", newField);
}

function SortTable() {
    if (sortField !== "") {
        SortBy(sortField, sortOrder);
    } else {
        models = originalOrderModels;
    }

    RenderProductRows();
}

SortTable();