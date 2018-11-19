import { domElements } from './base';

export const getInput = () => domElements.searchInput.value;

export const clearInput = () => {
    domElements.searchInput.value = "";
}

export const clearResults = () => {
    domElements.searchResultList.innerHTML = "";
    domElements.searchResPages.innerHTML = "";
}

export const limitRecipeTitle = (title, limit = 18) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}


// export const highlightedSelected = id => {
//     const resultsArr = Array.from(document.querySelectorAll('.results__link'));
//     resultsArr.forEach(el => {
//         el.classList.remove('results__link--active')
//     });

//     document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
// }


const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`
    
    domElements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

//type: prev or next
const createPageButton = (page, type ) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1) {
        //button to go to next page
        button = createPageButton(page, 'next');

    } else if(page === pages && pages > 1) {
        //render button to go to previous page
        button = createPageButton(page, 'prev');


        createPageButton(1, 'next')
    }else if (page < pages){
        //both buttons
        button = `
            ${createPageButton(page, 'prev')}
            ${createPageButton(page, 'next')}`
    }

    domElements.searchResPages.insertAdjacentHTML('afterbegin', button)
};


export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render results current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination
    renderButtons(page, recipes.length, resPerPage);
}