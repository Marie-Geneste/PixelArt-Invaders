const app = {
    gridSize: null,
    gridContainer: null,
    configFormHTMLElmt: null,
    pixelSize: null,
    styles: ['blue', 'green', 'red', 'fof'],
    currentColor: null,
    // Une méthode est une fonction qu'on vient ranger dans une propriété d'objet
    handlePixelClick: function(event) {
        const clickedPixel = event.target;
        if(clickedPixel.classList.contains(app.currentColor)){
            clickedPixel.className = 'pixel';
        } else {
            clickedPixel.className = `pixel ${app.currentColor}`;
        }
    },
    handleFormSubmit: function(event){
        event.preventDefault();
        const inputHTMLElmt = document.querySelector('.configuration input:first-child');
        app.gridSize = inputHTMLElmt.value;
        const pixelSizeInputHTMLElmt = document.querySelector('.configuration input:nth-child(2n)');
        app.pixelSize = pixelSizeInputHTMLElmt.value;
        app.drawGrid(app.gridSize, app.pixelSize);
    },
    handleColorClick: function(event){
        const clickedColorLink = event.target;
        const oldColorLink = document.querySelector('.palette-color--active');
        if(oldColorLink){
            oldColorLink.classList.remove('palette-color--active');
        }
        clickedColorLink.classList.add('palette-color--active');

        app.currentColor = clickedColorLink.classList[1];
    },
    drawGrid: function(gridSize, pixelSize){
        app.gridContainer.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            const rowHTMLElmt = document.createElement('div');
            rowHTMLElmt.classList.add('row');
            for (let j = 0; j < gridSize; j++) {
                const pixelHTMLElmt = document.createElement('div');
                pixelHTMLElmt.classList.add('pixel');
                if(pixelSize){
                    pixelHTMLElmt.style.height = `${pixelSize}px`;
                    pixelHTMLElmt.style.width = `${pixelSize}px`;
                }
                pixelHTMLElmt.addEventListener('click', app.handlePixelClick);
                rowHTMLElmt.appendChild(pixelHTMLElmt);
            }
            app.gridContainer.appendChild(rowHTMLElmt);
        }
    },
    drawForm: function(){
        const gridSizeInputHTMLELmt = document.createElement('input');
        gridSizeInputHTMLELmt.type = 'number';
        gridSizeInputHTMLELmt.placeholder = 'Taille de la grille';
    
        app.configFormHTMLElmt.appendChild(gridSizeInputHTMLELmt);

        const pixelSizeInputHTMLElmt = document.createElement('input');
        pixelSizeInputHTMLElmt.type = 'number';
        pixelSizeInputHTMLElmt.placeholder = 'Taille des pixels';
        app.configFormHTMLElmt.appendChild(pixelSizeInputHTMLElmt);

    
        const buttonHTMLElmt = document.createElement('button');
        buttonHTMLElmt.type = 'submit';
        buttonHTMLElmt.textContent = 'Valider';
    
        app.configFormHTMLElmt.appendChild(buttonHTMLElmt);
    
        app.configFormHTMLElmt.addEventListener('submit', app.handleFormSubmit);
    },
    drawPalette: function(){
        const paletteContainerHTMLElmt = document.createElement('div');
        paletteContainerHTMLElmt.id = 'palette-container';
        document.body.appendChild(paletteContainerHTMLElmt);
        // On va boucler sur notre tableau style et générer un lien pour chaque couleur
        for(let color of app.styles){
            const paletteColorLink = document.createElement('a');
            paletteColorLink.classList.add('palette-color');
            paletteColorLink.classList.add(color);

            paletteColorLink.addEventListener('click',app.handleColorClick);

            paletteContainerHTMLElmt.appendChild(paletteColorLink);
        }
    

    },
    init: function() {
    // à l'initialisation on charge directement dans notre propriété dédiée la zone
    // dans laquelle on voudra générer la grille
        app.gridContainer = document.getElementById('invader');
    
        app.configFormHTMLElmt = document.querySelector('.configuration');
    
        app.drawForm();

        app.drawPalette();
    }
};

app.init();
