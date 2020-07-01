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
    console.log("SortBy", order);

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
    image.src = product.Image;
    image.alt = product.Title;
    tdImage.appendChild(image);
    tr.appendChild(tdImage);

    let tdDescription = document.createElement("td");
    let pTitle = document.createElement("p");
    pTitle.innerText = product.Title;
    tdDescription.appendChild(pTitle);

    let pDescription = document.createElement("p");
    pDescription.innerText = product.DescriptionWithId;
    let pPopularity = document.createElement("p"); // REMOVE AFTER
    pPopularity.innerText = product.Popularity; // REMOVE AFTER
    tdDescription.appendChild(pPopularity); // REMOVE AFTER

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
    tdPriceLabel.innerText = "Price";
    tdPrice.appendChild(tdPriceLabel);

    let tdPriceValue = document.createElement("div");
    tdPriceLabel.innerText = product.Price + " EUR";
    tdPrice.appendChild(tdPriceValue);
    tdPriceAndAvailable.appendChild(tdPrice);

    let divAvailability = document.createElement("div");
    let divAvailabilityLabel = document.createElement("div");
    divAvailabilityLabel .innerText = "Availability";
    divAvailability.appendChild(divAvailabilityLabel);

    let divAvailabilityValue = document.createElement("div");
    divAvailabilityValue.innerText = product.Price + " EUR";
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
        console.log("SortTable", sortField, sortOrder);
    } else {
        models = originalOrderModels;
        console.log("SortTable DEFAULT");
    }

    RenderProductRows();
}

SortTable();