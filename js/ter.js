const html = document.documentElement;
const toggleButton = document.getElementById('themeToggle');

let selectedFunction = "sumPositive";

// Default selection
document.querySelector(".card[data-func='sumPositive']").classList.add("active");

// Card click
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedFunction = card.dataset.func;

    const secondInput = document.getElementById("secondInputGroup");
    secondInput.style.display = selectedFunction === "bitwiseAdd" ? "block" : "none";
  });
});

// Run selected function
function runFunction() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const resultDiv = document.getElementById("result");
  let result;

  switch (selectedFunction) {
    case "sumPositive":
      const nums = input1.split(",").map(Number);
      result = nums.reduce((sum, n) => n > 0 ? sum + n : sum, 0);
      break;

    case "secondHighest":
      const arr = input1.split(",").map(Number).sort((a, b) => b - a);
      result = arr.length > 1 ? arr[1] : "Need at least two numbers.";
      break;

    case "bitwiseAdd":
      let a = parseInt(input1);
      let b = parseInt(input2);
      while (b !== 0) {
        let carry = a & b;
        a = a ^ b;
        b = carry << 1;
      }
      result = a;
      break;

    case "titleCase":
      result = input1.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
      break;

    case "sortNames":
      result = input1.split(",").map(s => s.trim()).sort().join(", ");
      break;

    default:
      result = "Unknown function.";
  }

  resultDiv.textContent = "Result: " + result;
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.dataset.theme = savedTheme;
  toggleButton.textContent = savedTheme === "light" ? "🌙" : "🌞";
}

// Toggle theme
function toggleTheme() {
  const isLight = html.dataset.theme === "light";
  const newTheme = isLight ? "dark" : "light";
  html.dataset.theme = newTheme;
  toggleButton.textContent = newTheme === "light" ? "🌙" : "🌞";
  localStorage.setItem("theme", newTheme);
}

toggleButton.addEventListener("click", toggleTheme);

// Keyboard shortcut: Press T
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "t") {
    toggleTheme();
  }
});
