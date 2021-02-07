const foodInput = document.getElementById('foodInput');


//search button handle
document.getElementById('searchBtn').addEventListener('click', () => {
    const foodIngredientDiv = document.getElementById('foodIngredient');
    const foodsDiv = document.getElementById('foods');
    const errorTextDiv = document.getElementById('errorText');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=` + foodInput.value + ``)
        .then(res => res.json())
        .then(data => displayFoods(data))
        .catch(error => {
            const errorMessage = `
                <h5 class="error-text">Food name is invalid</h5>
            `
            errorTextDiv.innerHTML = errorMessage;
        });

    const displayFoods = foods => {
        foodsDiv.innerHTML = '';
        foodIngredientDiv.innerHTML = '';
        errorTextDiv.innerHTML = '';
        foods.meals.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food';

            const foodInfo = `
                <img onclick = "foodDetails('${food.idMeal}')" src="${food.strMealThumb}">
                <h5 onclick = "foodDetails('${food.idMeal}')">${food.strMeal}</h5>
            `
            foodDiv.innerHTML = foodInfo;
            foodsDiv.appendChild(foodDiv);

        });
    }

})


//getting individual food details
const foodDetails = foodDetail => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetail}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderFoodInfo(data));
}


//render food info and display food ingredient
const renderFoodInfo = meal => {
    const foodIngredientDiv = document.getElementById('foodIngredient');
    const foodsDiv = document.getElementById('foods');
    foodsDiv.innerHTML = '';
    foodIngredientDiv.innerHTML = `
        <img src="${meal.meals[0].strMealThumb}">
        <h1>${meal.meals[0].strMeal}</h1>
        <h4>Ingredients</h4>
    `
    meal.meals.forEach(food => {
        const foodArr = Object.values(food);
        const ingredient = foodArr.slice(9, 28);
        const measure = foodArr.slice(29, 48);

        const foodIngredient = measure.map(function (itm, i) {
            return [itm + ' ' + ingredient[i]];
        }).join("<br>");

        if (foodIngredient !== "" && foodIngredient !== null) {
            const foodIngredientUl = document.createElement('ul');
            const foodIngredientList = `
                <li>${foodIngredient}</li>
            `
            foodIngredientUl.innerHTML = foodIngredientList;
            foodIngredientDiv.appendChild(foodIngredientUl);
        }
    });
}