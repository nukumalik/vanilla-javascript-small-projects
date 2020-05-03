const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showSuccess(input) {
	input.parentElement.className = 'form-control success';
}

function showError(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	const id = input.id;
	let name = id === 'password2' ? 'Confirm password' : id.charAt(0).toUpperCase() + id.slice(1);

	formControl.className = 'form-control error';
	small.innerHTML = message ? `${name} ${message}` : `${name} is required`;
}

function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (input.value.trim()) return re.test(input.value) ? showSuccess(input) : showError(input, 'is not valid');
	return;
}

function checkPassword(input) {
	if (input.value.trim()) {
		if (!/^(?=.*[a-z])/g.test(input.value)) showError(input, 'at least has 1 lowercase');
		else if (!/^(?=.*[A-Z])/g.test(input.value)) showError(input, 'at least has 1 uppercase');
		else if (!/^(?=.*\d)/g.test(input.value)) showError(input, 'at least has 1 number');
		else if (!/^(?=.*[#$^+=!*()@%&])/g.test(input.value)) showError(input, 'at least has special character');
		else if (!/^(?=.{8,})/g.test(input.value)) showError(input, 'at least has 8 character or more');
	}
}

function checkField(inputArr) {
	inputArr.forEach((input) => (!input.value.trim() ? showError(input) : showSuccess(input)));
}

function isMatch(confirm, password) {
	if (confirm.value !== password.value) return showError(confirm, 'is not match');
	return;
}

form.addEventListener('submit', function (e) {
	e.preventDefault();

	checkField([username, email, password, password2]);
	checkEmail(email);
	checkPassword(password);
	isMatch(password2, password);
});
