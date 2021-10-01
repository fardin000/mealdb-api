const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value; 
    // console.log(searchText);

    searchField.value = '';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => displaySearchResult(data.meals));
    
}

const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    meals.forEach(meal => {
        // console.log(meal);

        //  for clearing previous search results
        // 1.searchResult.innerHTML = '';
        // 2.searchResult.textContent = '';
        searchResult.textContent = '';
        
        //invalid-input handling
        // if(meals.length == 0){
        //     document.getElementById('error-msg').innerHTML = "<p class='text-center p-3 bg-danger'> please enter a meal name...</p>";
        // }



        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">

            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">

            <div class="card-body">

                <h5 class="card-title">${meal.strMeal}</h5>

                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                
            </div>
        </div>
      `;
      searchResult.appendChild(div);
    })
}
//div onclick = loadMealDetail(${meal-detail})
//eikhane oporer mealId number bole kono problem koreni , 



const loadMealDetail = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(response => response.json())
    // .then(data => console.log(data.meals[0]));
    .then(data => displayMealDetail(data.meals[0]));
    //shudhu console.log(data) korlei seta meal ke dekhabe na ;
    //karon eita ekta object ---> array er moddhe deya ache ; error khabo;
    //tai (data.meal) dibo ;tao hobe na kron indexing e problem hobe;
    //tahole (data.meal[0]) dile kaj hobe ; mane meal ta pabo;
}

const displayMealDetail = meal => {
    //age (displayMealDetail) ta ke age oporer .then er console.log file e bosaye asho;
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `

    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">

    <div class="card-body">

        <h5 class="card-title">${meal.strMeal}</h5>

        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>

        <a href="${meal.strYoutube}" class="btn btn-primary">Watch Recipe</a>

    </div>`;
    mealDetails.appendChild(div);
}


//problem : every search results are displaying to-gather ; 
//we need to remove the first one during the second search;
//solved in line number 22.23.24;