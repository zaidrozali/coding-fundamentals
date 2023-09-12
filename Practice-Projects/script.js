import { apiKey } from "./config.js";

// const url = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=USD&want=EUR&amount=5000';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
	}
};

async function convertCurrency(inputCurrency, outputCurrency, amount) {
    try {
        const response = await fetch(`https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${inputCurrency}&want=${outputCurrency}&amount=${amount}`, options);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}

convertCurrency("USD", "MYR", 10)


// DOM element set up
const currencyElement1 = document.querySelector("#currency1")
const currencyElement2 = document.querySelector("#currency2")
const amountElement1 = document.querySelector("#amount1")
const amountElement2 = document.querySelector("#amount2")
const swap = document.querySelector("#swap")
const rateElement = document.querySelector("#rate")

async function calculate() {
    let currency1 = currencyElement1.value 
    let currency2 = currencyElement2.value 
    let amount = amountElement1.value
    console.log(currency1, currency2, amount)

    let data = await convertCurrency(currency1, currency2, amount)
    console.log("DATA", data)

    let convertedValue = data.new_amount
    let rates = (data.new_amount/data.old_amount)

    rateElement.innerText = `1 ${currency1} : ${rates.toFixed(4)} ${currency2}`
    amountElement2.value = convertedValue
    console.log("Element 2 is updated")
}

amountElement1.addEventListener("input", calculate)
currencyElement1.addEventListener("change", calculate)
currencyElement2.addEventListener("change", calculate)

swap.addEventListener("click", () => {
    let temporaryVariable = currencyElement1.value
    currencyElement1.value = currencyElement2.value
    currencyElement2.value = temporaryVariable
    calculate()
})