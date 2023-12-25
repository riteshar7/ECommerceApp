const customerBtn = document.querySelector(".customer-button")
const merchantBtn = document.querySelector(".merchant-button")
const role = document.querySelector(".role");


customerBtn.addEventListener('click',() => {
    role.firstElementChild.checked = true
    customerBtn.classList.add('show-border');
    merchantBtn.classList.remove('show-border');
})

merchantBtn.addEventListener('click',() => {
    role.lastElementChild.checked = true
    merchantBtn.classList.add('show-border');
    customerBtn.classList.remove('show-border');
})
