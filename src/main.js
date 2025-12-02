//Gerekli modül ve veriyi içeri aktarıyoruz
//toggleModal'ı da import ettiğimizden emin olalım

import { initialRecipes } from './modules/data.js';
import { renderRecipeList, renderRecipeDetails, toggleModal } from './modules/ui.js';


// --- UYGULAMA STATE'İ ---
// Bu değişkenleri globalde tanımlıyoruz ki her yerden erişilebilsin.
let recipes = []; 
let selectedRecipeId = null;

// --- DOM ELEMENTLERİ ---
// Bunları da globalde 'let' ile tanımlıyoruz, atamasını sonra yapacağız.
let recipeListEl, addRecipeBtn, addRecipeForm, cancelBtn;

// --- FONKSİYONLAR ---

function handleRecipeClick(event) {
    if (event.target.tagName === 'LI') {
        const clickedId = Number(event.target.dataset.id);
        const selectedRecipe = recipes.find(recipe => recipe.id === clickedId);
        if (selectedRecipe) {
            selectedRecipeId = clickedId;
            renderRecipeDetails(selectedRecipe);
        }
    }
}

function handleFormSubmit(event) {
    event.preventDefault(); // Sayfa yenilemesini engelle

    const titleInput = document.querySelector('#new-title');
    const ingredientsInput = document.querySelector('#new-ingredients');
    const instructionsInput = document.querySelector('#new-instructions');
    const imageInput = document.querySelector('#new-image');

    const ingredients = ingredientsInput.value.split(',').map(item => item.trim());

    const newRecipe = {
        id: Date.now(),
        title: titleInput.value,
        ingredients: ingredients,
        instructions: instructionsInput.value,
        image: imageInput.value,
    };

    recipes = [...recipes, newRecipe];
    addRecipeForm.reset();
    toggleModal(false);
    renderRecipeList(recipes);
}

/**
 * Uygulamayı başlatan ve tüm kurulumu yapan ana fonksiyon.
 */
function initializeApp() {
    // 1. Veriyi Yükle: Başlangıç verilerini 'recipes' dizisine kopyala.
    recipes = [...initialRecipes];

    // 2. DOM Elementlerini Seç: Artık DOM'un hazır olduğundan eminiz.
    recipeListEl = document.querySelector('#recipe-list');
    addRecipeBtn = document.querySelector('#add-recipe-btn');
    addRecipeForm = document.querySelector('#add-recipe-form');
    cancelBtn = document.querySelector('#cancel-btn');
    
    // 3. Olay Dinleyicilerini Bağla
    recipeListEl.addEventListener('click', handleRecipeClick);
    addRecipeBtn.addEventListener('click', () => toggleModal(true));
    cancelBtn.addEventListener('click', () => toggleModal(false));
    addRecipeForm.addEventListener('submit', handleFormSubmit);

    // 4. İlk Arayüzü Çiz
    renderRecipeList(recipes);

    console.log("Uygulama DOMContentLoaded sonrası başarıyla başlatıldı ve tarifler yüklendi!");
}

// --- UYGULAMA BAŞLANGICI ---
// Sayfa yüklendiğinde ve DOM hazır olduğunda uygulamayı başlat.
document.addEventListener('DOMContentLoaded', initializeApp);