function applySavedTheme(){
    const savedTheme = localStorage.getItem('theme');
    
    if(savedTheme){
        document.body.classList.add(savedTheme);
    }

    const themeToggle = document.getElementById("theme-toggle");
    if(themeToggle){
        themeToggle.innerText = document.body.classList.contains("light-theme") 
         ? "🌙 Dark Mode" : "☀️ Light Mode";
    }
}

function toggleTheme(){
    document.body.classList.toggle("light-theme");

    const currentTheme = document.body.classList.contains("light-theme") 
    ? "light-theme" : "";
    localStorage.setItem("theme", currentTheme);

    const themeToggle = document.getElementById("theme-toggle");
    if(themeToggle){
        themeToggle.innerText = currentTheme === "light-theme"
        ?"🌙 Dark Mode" : "☀️ Light Mode";
    }
}

applySavedTheme();

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    if(themeToggle){
        themeToggle.addEventListener("click", toggleTheme);
    }
});