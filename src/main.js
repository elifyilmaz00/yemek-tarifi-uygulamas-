// Gerekli modülleri ve veriyi içe aktarıyoruz.
import { initialRecipes } from './modules/data.js';
import { renderRecipeList, renderRecipeDetails } from './modules/ui.js';

// --- UYGULAMA STATE'İ ---
let recipes = [...initialRecipes];
let selectedRecipeId = null;

// --- DOM ELEMENTLERİ ---
// Elementleri burada seçmek yerine, DOM'un hazır olduğundan emin olduktan sonra seçelim.
let recipeListEl;

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

/**
 * Uygulamayı başlatan ana fonksiyon.
 */
function initializeApp() {
    // DOM hazır olduğunda elementleri seçiyoruz.
    recipeListEl = document.querySelector('#recipe-list');
    
    // Olay dinleyicilerini burada bağlıyoruz.
    recipeListEl.addEventListener('click', handleRecipeClick);

    // Başlangıçta, tüm reçeteleri UI modülünü kullanarak listeliyoruz.
    renderRecipeList(recipes);

    console.log("Uygulama DOMContentLoaded sonrası başarıyla başlatıldı!");
}


// --- UYGULAMA BAŞLANGICI ---
// Sayfanın tüm HTML'i yüklendiğinde ve DOM hazır olduğunda 'initializeApp' fonksiyonunu çalıştır.
// Bu, en güvenli yöntemdir.
document.addEventListener('DOMContentLoaded', initializeApp);