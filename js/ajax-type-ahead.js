const inputElement = document.getElementById("input-location");
const dropDownElement = document.getElementById("dropdown-menu");
const addresesListElement = document.querySelector(".addresses-list");
const errorMessage = document.getElementById("error-message");
const spinnerElement = document.querySelector(".spinner");
const placeHolder = inputElement.placeholder;
const baseUrl = "https://api.geocodify.com/v2/autocomplete?api_key=c8fe4855253c67be8e266d1becf5075708deeb08";
const messageNoResult = "No Matching results found...";
let showSpinner;
let response, unitResponseObject;
let addressesArray = [];

const inputClick = async () => {
    let count = dropDownElement.childElementCount;

    console.log("inputClick");
    inputElement.placeholder = "";
    if (count > 1) dropDownElement.style.visibility = "visible";
};

const inputActions = async () => {
    if (inputElement.value === "") {
        inputElement.placeholder = placeHolder;
        cleanAddressSuggestions();
    } else {
        addressesArray = [];
        showSpinner = true;
        controlSpinner(showSpinner);
        await getData(inputElement.value)
            .then(() => {
                getAddressesArray();
                checkArrayResponse();
                fillAddressSuggestions();
            })
            .catch((e) => {
                console.error(e);
                errorMessage.style.display = "block";
            });
        showSpinner = false;
        controlSpinner(showSpinner);
    };
}

const getData = async (userInput) => {
    const encodedQuery = encodeURIComponent(userInput);
    const requestUrl = `${baseUrl}&q=${encodedQuery}`;
    const httpResponse = await fetch(requestUrl);
    response = await httpResponse.json();
}

const getAddressesArray = () => {
    unitResponseObject = response.response.features;
    unitResponseObject.forEach(element => {
        addressesArray.push(element.properties.label);
    });
}

const checkArrayResponse = () => {
    if (addressesArray.length === 0) {
        addressesArray = [messageNoResult];
    }
}

const fillAddressSuggestions = (size = 10) => {
    let addressElement, address;

    cleanAddressSuggestions();
    addressesArray.forEach((element, i) => {
        if (i < size) {
            addressElement = document.createElement("span");
            address = document.createTextNode(element);
            addressElement.append(address);
            addressElement.addEventListener('click', selectAddress);
            dropDownElement.append(addressElement);
        }
    })
    dropDownElement.style.visibility = "visible";
}

const cleanAddressSuggestions = () => {
    const count = addresesListElement.childElementCount;

    if (count > 0) {
        for (let i = 0; i < count; i++) {
            addresesListElement.removeChild(addresesListElement.lastChild);
        }
    }
    dropDownElement.style.visibility = "hidden";
}

const clickActions = (e) => {
    if (e.target !== dropDownElement || e.target !== inputElement) {
        dropDownElement.style.visibility = "hidden";
        if (inputElement.value === "") inputElement.placeholder = placeHolder;
    }
}

const selectAddress = (event) => {
    if (event.target.innerText !== messageNoResult) inputElement.value = event.target.innerText;
    addressesArray = [];
    cleanAddressSuggestions();
}

const controlSpinner = (showSpinner) => {
    console.log('spinener Control', showSpinner)
    console.log(spinnerElement)
    if (showSpinner) {
        dropDownElement.style.visibility = "visible";
        spinnerElement.style.display = "flex";
        addresesListElement.style.display = "none";
    } else {
        spinnerElement.style.display = "none";
        addresesListElement.style.display = "flex";
    }
}

inputElement.addEventListener("input", inputActions);
document.body.addEventListener("click", clickActions);
