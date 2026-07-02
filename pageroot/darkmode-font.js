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

// ----- Dark Mode -----
function setDarkMode(enabled){
    if(enabled) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('darkMode', enabled);
}
const savedDark = localStorage.getItem('darkMode')==='true';
setDarkMode(savedDark);

darkBtn.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark'));
});

// ----- Font Switch -----
function setFontModern(enabled){
    document.body.style.setProperty('--body-font', enabled ? "'Inter', sans-serif" : "'Latin Modern Roman', serif");
    document.body.style.setProperty('--serif-font', enabled ? "'Inter', sans-serif" : "'LMSans10', sans-serif");
    localStorage.setItem('modernFont', enabled);
}

const savedFont = localStorage.getItem('modernFont')==='true';
setFontModern(savedFont);

fontBtn.addEventListener('click', () => {
    const isModern = document.body.style.getPropertyValue('--body-font').includes('Inter');
    setFontModern(!isModern);
});
