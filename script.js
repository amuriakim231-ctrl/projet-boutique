document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ANIMATION DES SECTIONS AU DEFILEMENT (FADE-IN EFFECT) ---
    const sections = document.querySelectorAll("section");
    
    const options = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // L'animation ne se joue qu'une seule fois
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add("fade-in"); // On prépare la classe CSS d'invisibilité
        observer.observe(section);
    });

    // --- 2. GALERIE LIGHTBOX INTERACTIVE ---
    const zoomableImages = document.querySelectorAll(".item-img");
    
    // Création dynamique de la boîte d'affichage plein écran
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    zoomableImages.forEach(image => {
        image.addEventListener("click", () => {
            // Récupération de l'image de fond de la carte cliquée
            const bgImage = window.getComputedStyle(image).backgroundImage;
            
            // Création de l'image plein écran dans la lightbox
            const img = document.createElement("img");
            // Extraction robuste de l'URL entre les parenthèses de url(...)
            const extractUrl = bgImage.match(/url\(["']?([^"']+)["']?\)/);
            
            // On vérifie que l'URL est valide et n'est pas "vide"
            if (extractUrl && !extractUrl[1].includes('vide')) {
                img.src = extractUrl[1];
                
                // Nettoyage et affichage
                lightbox.innerHTML = '<span class="close-lightbox">&times;</span>';
                lightbox.appendChild(img);
                lightbox.classList.add("active");
            }
        });
    });

    // Fermer la lightbox en cliquant n'importe où dessus
    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    // --- 3. CARTE OPENSTREETMAP AVEC LEAFLET ---
    const mapElement = document.getElementById("map");
    if (mapElement && typeof L !== 'undefined') {
        const map = L.map(mapElement).setView([-11.6657, 27.4794], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        L.marker([-11.6657, 27.4794])
            .addTo(map)
            .bindPopup("MASTER CLASS WEAR<br>Av. du 30 juin, Lubumbashi")
            .openPopup();
    }
});
