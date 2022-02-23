const cartItemUpdateFormElements = document.querySelectorAll(
    ".cart-item-management"
);

async function updateCartItem(event) {
    event.preventDefault();

    const form = event.target;

    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response;
    try {
        response = await fetch("/cart/items", {
            method: "Patch",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                quantity,
                _csrf: csrfToken,
            }),
        });
    } catch (error) {
        alert(error);
        return;
    }
    if (!response.ok) {
        alert(`${response.status} ${response.statusText}`);
        return;
    }
    const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener("submit", updateCartItem);
}
