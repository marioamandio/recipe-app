// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import {domElements, renderLoader, clearLoader, elementStrings} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

/*global state of the app
    search object
    current recipe object
    shopping list obj
    liked recipes
*/
const state = {};


const controlSearch = async () => {
    //1 get query from view
    const query = searchView.getInput();

    if(query) {
        //2 new search obj and add to state
        state.search = new Search(query);
        
        // 3)prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(domElements.searchRes);

        // 4) search for recipes
        await state.search.getResults();

        // 5) render results on UI
        clearLoader()
        searchView.renderResults(state.search.recipes);
    }
}

domElements.searchForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    controlSearch();
});

domElements.searchResPages.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.btn-inline');
    
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);

    }
})

/*
    Recipe Controller
*/
const controlRecipe = async () => {

    //get id from url
    const id = window.location.hash.replace('#', "")

    if(id) {
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(domElements.recipe);

        //highlight selected search item
        // searchView.highlightedSelected(id);

        //create new recipe obj
        state.recipe = new Recipe(id);

        //testing
        
        try {
                //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients()

            //calc time and service
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader()
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (err) {
            clearLoader()
            console.log(err)
            alert('error processing recipe :(')
            

        }
        

    }
}

/*
    LIST CONTROLLER
*/

const controlList = () => {
    //create new list if there is no list
    if(!state.list) state.list = new List();

    //add each ingredient to the list

    state.recipe.ingredients.forEach((el) => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item)
    })
}

/*
    LIKE CONTROLLER
*/
//testing


const controlLike = () => {
    // if(!state.likes) state.likes = new Likes();

    const currentId = state.recipe.id

    //user has not yet liked recipe
    if(!state.likes.isLiked(currentId)) {
        //add like to state
        const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img)

        //toggle the like button
        likesView.toggleLikeBtn(true);

        //add like to ui list
        likesView.renderLike(newLike)

        //user has liked  recipe
    } else {
        //remove like from state
        state.likes.deleteLike(currentId)
        //toggle the like button
        likesView.toggleLikeBtn(false);
        //remove from ui list
        likesView.deleteLike(currentId);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes())
}





['hashchange', 'load'].forEach((ev) => window.addEventListener(ev, controlRecipe))


//handle delete and update list item events
domElements.shopping.addEventListener('click', ev => {
    const id = ev.target.closest('.shopping__item').dataset.itemid;

    //handle delete button
    if(ev.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id)
        
        //delete from UI
        listView.deleteItem(id)

        //handle count update
    } else if(ev.target.matches('.shopping__count-value')) {
        const val = parseFloat(ev.target.value, 10);
        state.list.updateCount(id, val);
        console.log(state.list)
    }
});


//Restore like recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    //restore likes
    state.likes.readStorage();

    //toggle button
    likesView.toggleLikeMenu(state.likes.getNumLikes())

    //render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
});






// handling recipe button clicks
domElements.recipe.addEventListener('click', (ev) => {

    if(ev.target.matches('.btn-decrease, .btn-decrease *')) {

        if(state.recipe.servings > 1) {
            //decrease button was clicked
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe)
        }
        

    } else if(ev.target.matches('.btn-increase, .btn-increase *')) {
        //increase button was clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe)
    
    } else if(ev.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add ingredients 
        controlList()
    } else if(ev.target.matches('.recipe__love, .recipe__love *')) {
        //LIKE CONTROLER
        controlLike();
    }

    
})





// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

//0bb191b36ee4d4385525e5b936954819
//https://www.food2fork.com/api/search