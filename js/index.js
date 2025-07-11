const html = document.documentElement;
const toggleButton = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    html.dataset.theme = savedTheme;
    toggleButton.textContent = savedTheme === "light" ? "🌙" : "🌞";
}

function toggleTheme() {
    const isLight = html.dataset.theme === "light";
    const newTheme = isLight ? "dark" : "light";
    html.dataset.theme = newTheme;
    toggleButton.textContent = newTheme === "light" ? "🌙" : "🌞";
    localStorage.setItem("theme", newTheme);
}

toggleButton.addEventListener("click", toggleTheme);

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "t") toggleTheme();
});
