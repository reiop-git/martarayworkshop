// Calculator
(function () {
	const display = document.getElementById("calc-display");
	if (!display) return;

	let current = "0";
	let stored = null;
	let operator = null;
	let waitingForOperand = false;

	function updateDisplay(val) {
		display.textContent = val.length > 12 ? parseFloat(val).toPrecision(8) : val;
	}

	document.querySelector(".calc-grid").addEventListener("click", function (e) {
		const btn = e.target.closest(".calc-btn");
		if (!btn) return;

		const action = btn.dataset.action;
		const value = btn.dataset.value;

		if (action === "digit") {
			if (waitingForOperand) {
				current = value;
				waitingForOperand = false;
			} else {
				current = current === "0" ? value : current + value;
			}
			updateDisplay(current);
		} else if (action === "dot") {
			if (waitingForOperand) { current = "0."; waitingForOperand = false; }
			else if (!current.includes(".")) current += ".";
			updateDisplay(current);
		} else if (action === "clear") {
			current = "0"; stored = null; operator = null; waitingForOperand = false;
			updateDisplay(current);
		} else if (action === "sign") {
			current = String(parseFloat(current) * -1);
			updateDisplay(current);
		} else if (action === "percent") {
			current = String(parseFloat(current) / 100);
			updateDisplay(current);
		} else if (action === "op") {
			if (operator && !waitingForOperand) {
				const result = calculate(parseFloat(stored), parseFloat(current), operator);
				current = String(result);
				updateDisplay(current);
			}
			stored = current;
			operator = value;
			waitingForOperand = true;
		} else if (action === "equals") {
			if (operator && !waitingForOperand) {
				const result = calculate(parseFloat(stored), parseFloat(current), operator);
				current = String(result);
				operator = null; stored = null; waitingForOperand = true;
				updateDisplay(current);
			}
		}
	});

	function calculate(a, b, op) {
		if (op === "+") return a + b;
		if (op === "-") return a - b;
		if (op === "*") return a * b;
		if (op === "/") return b !== 0 ? a / b : "Error";
	}
})();

const yearNode = document.querySelector("#year");
if (yearNode) {
	yearNode.textContent = String(new Date().getFullYear());
}

const sections = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));
