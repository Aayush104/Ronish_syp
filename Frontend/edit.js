const urlString = window.location.href;
const url = new URL(urlString);
const searchParams = url.searchParams;
const id = searchParams.get('id');

console.log(id);

const btn = document.getElementById('btn');

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const response = await fetch(`http://localhost:3000/edit/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
    });

    if (response.ok) { // Check if response is successful (status in range 200-299)
        const responseData = await response.json();
        if (responseData === "success") {
            window.location.href = 'review.html'; // Corrected redirection syntax
        }
    } else {
        console.error('Failed to edit.'); // Handle other response status codes
    }
});
