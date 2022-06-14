// https://www.christosgeo.com/2022/02/16/dropdown-search-filter-in-javascript/
// https://javascript.info/introduction-browser-events
// https://www.spritely.net/how-to-get-clicked-element-data-in-javascript/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// https://www.sololearn.com/Discuss/2328103/how-can-i-create-unique-id-for-html-elements
// https://forum.freecodecamp.org/t/targeting-dynamically-generated-id/261696
/*
 https://gist.github.com/gordonbrander/2230317
 */
// https://cssanimation.rocks/scroll-animations/

// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
// https://stackoverflow.com/questions/27160590/get-id-of-ancestor-element-from-onclick-with-javascript
// https://flaviocopes.com/how-to-check-element-descendant/


const search = document.getElementById('search_country');
const filterSelect = document.getElementById('select_filter')
const matchList = document.getElementById('main_content');
let countriesArr = [];

// Filter by search 
search.addEventListener('keyup', (e) => {
    const inputVal = e.target.value;
    console.log(inputVal)
   const filteredCountries = countriesArr.filter(data => {
        const regex = new RegExp(`${inputVal}`, `gi`);
        return data.name.common.match(regex);
   })

   displayCountries(filteredCountries)
})


// Get countries from Api
const getCountries = async () => {
    try {
        document.querySelector('#loader').removeAttribute("hidden");

        const res = await fetch('https://restcountries.com/v3.1/all');
        countriesArr = await res.json();
        console.log(countriesArr)

        displayCountries(countriesArr)

        if (countriesArr) {
            document.querySelector('#loader').setAttribute('hidden', true)
        }
    }
    catch (err) {
        console.log(err)
    }

}

getCountries();

// Display countries
function displayCountries(data) {
    if (data.length > 0) {
        const html = data.map(match => `
                <div class="col-3 mb-5">
                <div class="card" data-countryid=${match.name.common}>
                  
                        <img src="${match.flags['png']}" class="card-img-top" alt="${match.name.common} Flag">
                  
                        <div class="card-body">
                            <h5 class="card-title">${match.name.common}</h5>
                            <div class="card-text">
                                <span class="detail-title">Population:</span>
                                <span class="detail">${numberWithCommas(match.population)}</span>
                            </div>
                            <div class="card-text">
                                <span class="detail-title">Region:</span>
                                <span class="detail"> ${match.region}</span>
                            </div>
                            <div class="card-text">
                                <span class="detail-title">Capital:</span>
                                <span class="detail">${match.capital}</span>
                            </div>
                        </div>
                  
                </div>
            </div>
            `).join('');

        matchList.innerHTML = html;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


var cards = document.getElementsByClassName("card");

var getCards = function() {					
    var attribute = this.getAttribute("data-countryid");
    console.log(attribute)
    alert('Hello')
};

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', getCards, false);
}

// Get Single Country
function getCountry(val) {
    fetch(`https://restcountries.com/v3.1/name/${val}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not reach website.");
        }
       return response.json()
    })
    .then(data => {
        console.log(data)
    })
}
 