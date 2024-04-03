// // Function to fetch and display reviews
// async function fetchAndDisplayReviews() {
//     try {
//         const response = await fetch('http://localhost:3000/reviewData');
//         const reviewsData = await response.json();

//         // Get the container where reviews will be displayed
//         const reviewsContainer = document.getElementById('reviewsContainer');

//         // Clear existing reviews
//         reviewsContainer.innerHTML = '';

//         const head = document.createElement('h1');
//         head.innerHTML = "feedback form";
//         reviewsContainer.appendChild(head);

//         // Display each review
//         reviewsData.forEach(review => {
//             const reviewElement = document.createElement('div');
//             reviewElement.classList.add('reviewd');
//             reviewElement.innerHTML = `
//                 <p class="rate">Rating: ${review.rating}</p>
//                 <p class="comm">Comment: ${review.Comment}</p>
//                 <button class='edit'>edit</button>
//                 <button class='delete' data-id="${review.ID}">delete</button>
//             `;

//             // Add event listener to delete button
//             const deleteButton = reviewElement.querySelector('.delete');
//             deleteButton.addEventListener('click', async () => {
//                 try {
//                     // Get the ID of the review to delete
//                     const reviewId = deleteButton.dataset.id;

//                     // Make a request to delete endpoint
//                     await fetch(`http://localhost:3000/deleteReview/${reviewId}`, {
//                         method: 'DELETE'
//                     });

//                     // Remove the review element from the DOM
//                     reviewElement.remove();
//                 } catch (error) {
//                     console.error('Error deleting review:', error);
//                 }
//             });

//             reviewsContainer.appendChild(reviewElement);
//         });
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//     }
// }

// // Call the function to fetch and display reviews when the page loads
// window.onload = fetchAndDisplayReviews;



async function fetchAndDisplayReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviewData');
        const reviewsData = await response.json();

        // Get the container where reviews will be displayed
        const reviewsContainer = document.getElementById('reviewsContainer');

        // Clear existing reviews
        reviewsContainer.innerHTML = '';

        const head = document.createElement('h1');
        head.innerHTML = "Feedback Form";
        reviewsContainer.appendChild(head);

        // Display each review
        reviewsData.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-card');
            reviewElement.innerHTML = `
                <p class="rate">Rating: ${review.rating}</p>
                <p class="comm">Comment: ${review.Comment}</p>
                <button class='edit' edit-id ="${review.ID}" >Edit</button>
                <button class='delete' data-id="${review.ID}">Delete</button>
            `;

            const editButton = reviewElement.querySelector('.edit');
            editButton.addEventListener('click', () => {
                const reviewId = review.ID;
                window.location.href = `edit.html?id=${reviewId}`;
            });
           

            // Add event listener to delete button
            const deleteButton = reviewElement.querySelector('.delete');
            deleteButton.addEventListener('click', async () => {
                try {
                    // Get the ID of the review to delete
                    const reviewId = deleteButton.dataset.id;

                    // Make a request to delete endpoint
                    await fetch(`http://localhost:3000/deleteReview/${reviewId}`, {
                        method: 'DELETE'
                    });

                    // Remove the review element from the DOM
                    reviewElement.remove();
                } catch (error) {
                    console.error('Error deleting review:', error);
                }
            });

            reviewsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}



// Call the function to fetch and display reviews when the page loads
window.onload = fetchAndDisplayReviews;


