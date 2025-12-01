//Gerekli DOM elementlerini en başta seçeriz.

const recipeListEl= document.querySelector("#recipe-list");
const welcomeMessageEl= document.querySelector("#welcome-message");
const recipeContentEl= document.querySelector("#recipe-content"); 

/**
 * Sol paneldeki tarif listesini ekrana çizer
 * @param {Array} recipes - Ekrana çizilecek tarif nesnelerinden oluşan dizi.
 */

export function renderRecipeList(recipes){

    //Önceki listeyi temizliyoruz ki tekrar tekrar eklenmesin.

    recipeListEl.innerHTML="";

    recipes.forEach(recipe =>{

        const li = document.createElement("li");
        li.textContent = recipe.title;

        //Tıkladığımızda hangi tarif olduğunu anlamak için ID'sini data attribute olarak ekleriz.

        li.dataset.id = recipe.id;
        recipeListEl.appendChild(li);
    });
}

/**
 * SAğ panalde seçilen bir tarifin detaylarını gösterir
 * @param {Object} recipe - detayları gösterilecek olan reçete nesnesi
 */

export function renderRecipeDetails(recipe){
    //hoş geldin mesajını gizle, detay alanını göster, tarifin içeriğini gösterir

    welcomeMessageEl.classList.add("hidden");
    recipeContentEl.classList.remove("hidden");

    //template literal kullanarak HTML'i oluşturduk

    recipeContentEl.innerHTML = `

    <img src = "${recipe.image}" alt ="${recipe.title}" style = width:100%; height:200px; object-fit:cover; border-radius: 5px;>

    <h2>${recipe.title}</h2>

    <h3>Malzemeler </h3>

    <ul>
        <ul>
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>

    <h3> Yapılışı </h3>
    
    <p>${recipe.instructions}</p>

    <button class ="btn-danger" data-id="${recipe.id}"> Tarifi Sil </button>
        
    `
}