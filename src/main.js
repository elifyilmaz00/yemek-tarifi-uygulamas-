import { initialRecipes } from './modules/data.js';
import { renderRecipeList, renderRecipeDetails, toggleModal } from './modules/ui.js';

// --- UYGULAMA STATE'İ ---
let recipes = [];
let selectedRecipeId = null;

// --- DOM ELEMENTLERİ (Globalde let ile tanımlı) ---
let recipeListEl, addRecipeBtn, addRecipeForm, cancelBtn, recipeDetailsPanel;

// --- LOCAL STORAGE FONKSİYONLARI ---
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipes() {
    const recipesJSON = localStorage.getItem('recipes');
    // Eğer storage boşsa null yerine boş dizi döndürmek daha güvenli olabilir.
    return recipesJSON ? JSON.parse(recipesJSON) : null;
}

// --- OLAY YÖNETİCİLERİ (EVENT HANDLERS) ---
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
    event.preventDefault();
    const titleInput = document.querySelector('#new-title');
    const ingredientsInput = document.querySelector('#new-ingredients');
    const instructionsInput = document.querySelector('#new-instructions');
    const imageInput = document.querySelector('#new-image');

    const newRecipe = {
        id: Date.now(),
        title: titleInput.value,
        ingredients: ingredientsInput.value.split(',').map(item => item.trim()),
        instructions: instructionsInput.value,
        image: imageInput.value,
    };

    recipes = [...recipes, newRecipe];
    saveRecipes(); // DEĞİŞİKLİK OLDU, KAYDET!
    addRecipeForm.reset();
    toggleModal(false);
    renderRecipeList(recipes);
}

function handleDetailsClick(event) {
    if (event.target.classList.contains('btn-danger')) {
        const recipeIdToDelete = Number(event.target.dataset.id);
        const isConfirmed = confirm("Bu tarifi silmek istediğinizden emin misiniz?");
        if (isConfirmed) {
            recipes = recipes.filter(recipe => recipe.id !== recipeIdToDelete);
            saveRecipes(); // DEĞİŞİKLİK OLDU, KAYDET!
            renderRecipeList(recipes);
            document.querySelector('#welcome-message').classList.remove('hidden');
            document.querySelector('#recipe-content').classList.add('hidden');
        }
    }
}

// --- UYGULAMA BAŞLATMA ---
function initializeApp() {
    // 1. VERİYİ YÜKLE
    const savedRecipes = loadRecipes();
    if (savedRecipes && savedRecipes.length > 0) { // Kayıtlı veri varsa VE boş değilse
        recipes = savedRecipes;
    } else {
        recipes = [...initialRecipes];
    }
    
    // 2. DOM ELEMENTLERİNİ SEÇ
    recipeListEl = document.querySelector('#recipe-list');
    addRecipeBtn = document.querySelector('#add-recipe-btn');
    addRecipeForm = document.querySelector('#add-recipe-form');
    cancelBtn = document.querySelector('#cancel-btn');
    recipeDetailsPanel = document.querySelector('.recipe-details-panel');
    
    // 3. OLAY DİNLEYİCİLERİNİ BAĞLA
    recipeListEl.addEventListener('click', handleRecipeClick);
    addRecipeBtn.addEventListener('click', () => toggleModal(true));
    cancelBtn.addEventListener('click', () => toggleModal(false));
    addRecipeForm.addEventListener('submit', handleFormSubmit);
    recipeDetailsPanel.addEventListener('click', handleDetailsClick);

    // 4. İLK ARAYÜZÜ ÇİZ
    renderRecipeList(recipes);

    console.log("Uygulama başarıyla başlatıldı. Tarif sayısı:", recipes.length);
}

document.addEventListener('DOMContentLoaded', initializeApp);