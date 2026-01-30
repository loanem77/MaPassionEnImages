const listeImages = document.querySelector('.liste-images');

let numCase = 0;

function actualiserAffichage() {
    let htmlContent = '';

    //Positionnement des images selon les dates de celles-ci
    images.sort((a, b) => new Date(a.date) - new Date(b.date));

    //Création des zones images en html
    images.forEach(function (image, index) {
        //console.log("Image : " + image.titre);
        let position;
        let stylepolaroid;

        if (index % 2 === 0) {
            position = 'gauche';
            stylepolaroid = 'polaroid';
        } else {
            position = 'droite';
            stylepolaroid = 'polaroid2'
        }
        const imageHTML = `
    <div class="pic ${position}">
        <div class="${stylepolaroid}" onclick="toggleZoom(this)">
            <img src="${image.url}" alt="${image.titre}" class="background-pola">
            <p class="legende-pola">© ${image.propriete}</p>
            <p class="img-title">${image.titre}</p>
        </div>
        <section>
            <p>Date : ${image.date}</p>
            <p>${image.description}</p>
        </section>
    </div>
    `;

        htmlContent += imageHTML;
        numCase += 1;

    })
    listeImages.innerHTML = htmlContent;
    function zoomImage(element) {
        element.classList.toggle('zoom-active');
    }

}
actualiserAffichage();

//Zoom
function toggleZoom(element) {
    if (element.classList.contains('zoom-active')) {
        element.classList.remove('zoom-active');

        const placeholder = document.getElementById('zoom-placeholder');
        if (placeholder) placeholder.remove();

    } else {
        const placeholder = document.createElement('div');
        placeholder.id = 'zoom-placeholder';

        placeholder.style.width = element.offsetWidth + "px";
        placeholder.style.height = element.offsetHeight + "px";
        placeholder.style.margin = window.getComputedStyle(element).margin;
        placeholder.style.transform = window.getComputedStyle(element).transform;

        element.parentNode.insertBefore(placeholder, element);

        element.classList.add('zoom-active');
    }
}

//Formulaire

const form = document.getElementById("imageForm");

let url = document.getElementById("url");
let title = document.getElementById("titre");
let description = document.getElementById("description");
let date = document.getElementById("date");
let propriete = document.getElementById("propriete");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let APIurl = "https://gambette.butmmi.o2switch.site/api.php?format=json&login=musy&email=loane.musy@edu.univ-eiffel.fr" + "&message=" + title.value + description.value + url.value + date.value + propriete.value
    console.log('URL générée :', encodeURI(APIurl))

    fetch(APIurl).then(function (response) {
        response.json().then(function (data) {
            console.log("Réponse reçue : ")
            console.log(data);
        })
    })

    let nouvelleImage = {
        titre: title.value,
        description: description.value,
        url: url.value,
        date: date.value,
        propriete: propriete.value
    };

    images.push(nouvelleImage);
    actualiserAffichage();

    form.reset();
    
});