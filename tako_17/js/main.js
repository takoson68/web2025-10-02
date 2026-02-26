// document.addEventListener('DOMContentLoaded', () => {
 

// });

$(document).ready(() => {
    $('#btnConfirm').on('click', () => {
        $('.alertBox').append(
            `<div class="alert alert-success">
                <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
            </div>`
        )
    })

    $('#btnCancel').on('click', () => {
        $('.alertBox').append(
            `<div class="alert alert-warning">
                <strong>Warning!</strong> You should <a href="#" class="alert-link">read this message</a>.
            </div>`
        )
    })


})
