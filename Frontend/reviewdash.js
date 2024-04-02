const btn = document.getElementById('btn');

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const response = await fetch('http://localhost:3000/review', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
    });

    const responseData = await response.json();

    if (response.status === 400) {
        toastr.error(responseData.error); // Displaying the error message from the backend
    }
});
