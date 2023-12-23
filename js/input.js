var inputs = document.querySelectorAll("input");

window.addEventListener("load", () => {
    inputs.forEach(input => {

        setInterval(classe, 500)

        function classe() {
            input.classList.add("thumb");
        }
    });
});
