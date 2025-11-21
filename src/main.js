//Gerekli modülleri ve veriyi içeri aktarıyoruz

import {initialRecipes} from "./modules/data.js";
import {renderRecipeList, renderRecipeDetails} from "./modules/ui.js";

//UYGULAMA STATE'İ
//Uygulamamızın o anki tüm verisini burada tutacağız
//Başlangıçta, data.js'ten gelen verileri kullanıyoruz

let recipes = [...initialRecipes]; //initialRecipes'in kopyasını oluştururuz
let selectRecipeId = null; //Başlangıçta seçili tarif yok

//DOM ELEMENTLERİ

const recipeListEl = document.querySelector("recipe-list");

//FONKSİYONLAR

/**
 * Tarif listesinden bir elemana tıkladığında çalışır.
 * @param {Event} event - tıklama olayı
 */

function handleRecipeClick(event){
    //olay delegasyonu: tıklanan elemanın bir "LI" olduğundan emin oluyoruz

    if(event.target.tagName ==="LI"){
        const clickedId = Number(event.target.dataset.id);

        //tıklanan tarifi "recipes" dizisi içinden buluyoruz

        const selectedRecipe = recipes.find(recipe => recipe.id ===clickedId);

        if(relectedRecipe){

            //seçilen tarifin id'sini state'e kaydediyoruz

            selectedRecipeId=clickedId;

            //UI modülünü çağırarak detayı ekrana çizdiriyoruz

            renderRecipeDetails(selectedRecipe);
        }

    }
}

