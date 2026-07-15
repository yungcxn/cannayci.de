// ----- Create buttons -----
const darkBtn = document.createElement('button');
darkBtn.id = 'darkModeToggle';
darkBtn.className = 'toggle-btn';
darkBtn.innerHTML = '\u{1F313}';
document.body.appendChild(darkBtn);

const fontBtn = document.createElement('button');
fontBtn.id = 'fontToggle';
fontBtn.className = 'toggle-btn';
fontBtn.innerHTML = 'A';
document.body.appendChild(fontBtn);

// ----- Light Mode (opt-in override; dark is the CSS default) -----
function setLightMode(enabled){
if(enabled) document.body.classList.add('light');
else document.body.classList.remove('light');
    localStorage.setItem('lightMode', enabled);
}
const savedLight = localStorage.getItem('lightMode')==='true';
setLightMode(savedLight);

darkBtn.addEventListener('click', () => {
setLightMode(!document.body.classList.contains('light'));
});

// ----- Font Switch -----
function setFontModern(enabled) {
    document.body.classList.toggle('font-modern', enabled);
    localStorage.setItem('modernFont', enabled);
}

const savedFont = localStorage.getItem('modernFont') === 'true';
setFontModern(savedFont);

fontBtn.addEventListener('click', () => {
    const isModern = document.body.classList.contains('font-modern');
    setFontModern(!isModern);
});