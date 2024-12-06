// events after submitting the form
document.getElementById('form').onsubmit = function(event) {
    // prevent the form from submitting
    event.preventDefault();

    // consent checkbox
    const checkBox = document.getElementById('checkbox');

    // check if the checkbox is checked
    if (!checkBox.checked) {
        alert('Please check the box before proceeding.');
    } else {
        // redirect to the serialdemo page if validation passes
        window.location.href = '/serialdemo.html';
    }
};