document.addEventListener('DOMContentLoaded', () => {
    const post = document.getElementById('post');

    // Function to display the loading screen after a post is created
    function loader() {
        // Hide the new post form and title section
        document.getElementById('new-post-form').classList.add('errorstyle');
        document.getElementById('titlegone').classList.add('errorstyle');

        // Modify the loader's class to show the loading screen with a success message
        document.getElementById('divpost').classList.add('flex', 'flex-col', 'justify-center', 'items-center');
        document.getElementById('divpost').innerHTML = `
            <div class="flex flex-col items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-16 h-14 text-green-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4-4" />
                </svg>
                <div class="text-2xl font-bold">Post created successfully</div>
            </div>
        `;
    }

    // Function to handle the post creation process
    function creatpost(event) {
        event.preventDefault(); // Prevent the form from submitting and reloading the page

        const token = window.localStorage.getItem('token');
        const titlepost = document.querySelectorAll('input')[0].value;
        const bodypost = document.querySelector('textarea').value; // Assuming it's a textarea
        const imageurl = document.getElementById('post-image').files[0]; // Get the uploaded file

        // Create FormData object to send the post data
        let formdata = new FormData();
        formdata.append("title", titlepost);
        formdata.append("body", bodypost);
        formdata.append("image", imageurl);

        const baseurl = 'https://tarmeezacademy.com/api/v1';

        // Making the POST request to create a new post
        axios.post(`${baseurl}/posts`, formdata, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            console.log(response);
            console.log(imageurl);

            // Call the loader function to show the success message
            loader();
        })
        .catch((error) => {
            console.log(error);
            let failed = error.response.data.message;
            
            // Call the autherror function to show the error message
            autherror(failed);
        });
    }

    // Function to display an error message if authentication fails
    function autherror(failed) {
        // Hide the new post form and title section
        document.getElementById('new-post-form').classList.add('errorstyle');
        document.getElementById('titlegone').classList.add('errorstyle');

        // Show the error message in the loader section
        document.getElementById('divpost').classList.add('flex', 'flex-col', 'justify-center', 'items-center');
        document.getElementById('divpost').innerHTML = `
            <div id="auth-error" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14h.01M4.938 4.938a9 9 0 0112.727 12.727M9 9v2m0 4h.01M9 3h6m-2 4v2m0 4h.01M12 5v14m-2-2h4" />
                </svg>
                <span>${failed}</span>
            </div>
        `;
    }

    // Add event listener to the post button to trigger the creatpost function
    post.addEventListener('click', creatpost);
});

