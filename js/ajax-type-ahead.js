const inputElement = document.getElementById("input-location");
const dropDownElement = document.getElementById("dropdown-menu");
const errorMessage = document.getElementById("error-message");
const placeHolder = inputElement.placeholder;
const baseUrl = "https://api.geocodify.com/v2/autocomplete?api_key=c8fe4855253c67be8e266d1becf5075708deeb08";
const messageNoResult = "No Matching results found...";
let response, unitResponseObject;
let addressesArray = [];

const inputClick = async () => {
    console.log("inputClick");
    inputElement.placeholder = "";
    if (dropDownElement.childElementCount > 1) dropDownElement.style.visibility = "visible";
};

const inputActions = async () => {
    console.log("inputActions")
    if (inputElement.value === "") {
        inputElement.placeholder = placeHolder;
        cleanAddressSuggestions();
    } else {
        addressesArray = [];
        await getData(inputElement.value)
            .then(() => {
                getAddressesArray();
                checkArrayResponse();
                fillAddressSuggestions();
            })
            .catch(() => {
                errorMessage.style.display = "block";
            });
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
    const count = dropDownElement.childElementCount;

    if (count > 0) {
        for (let i = 0; i < count; i++) {
            dropDownElement.removeChild(dropDownElement.lastChild);
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

inputElement.addEventListener("input", inputActions);
document.body.addEventListener("click", clickActions);
