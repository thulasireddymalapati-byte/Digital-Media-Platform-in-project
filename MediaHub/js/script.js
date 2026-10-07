/* 
   HOME SEARCH
 */

function homeSearch() {

    let search =
        document.getElementById("homeSearch").value.trim();


    if (search === "") {

        alert("Please enter something to search.");

        return;
    }


    localStorage.setItem(
        "mediaSearch",
        search
    );


    window.location.href = "news.html";

}



/* 
   NEWS FILTER
 */

function filterNews() {

    let searchInput =
        document.getElementById("newsSearch");


    let categoryInput =
        document.getElementById("categoryFilter");


    if (!searchInput || !categoryInput) {
        return;
    }


    let search =
        searchInput.value.toLowerCase();


    let category =
        categoryInput.value;


    let newsItems =
        document.querySelectorAll(".news-item");


    let count = 0;


    newsItems.forEach(function(item) {

        let title =
            item.getAttribute("data-title")
            .toLowerCase();


        let itemCategory =
            item.getAttribute("data-category");


        let searchMatch =
            title.includes(search);


        let categoryMatch =
            category === "All" ||
            itemCategory === category;


        if (
            searchMatch &&
            categoryMatch
        ) {

            item.style.display = "";

            count++;

        } else {

            item.style.display = "none";

        }

    });


    let noNews =
        document.getElementById("noNews");


    if (noNews) {

        if (count === 0) {

            noNews.style.display = "block";

        } else {

            noNews.style.display = "none";

        }

    }

}



/* 
   VIDEO BUTTON
 */

function playVideo(videoName) {

    alert(
        "Now playing: " + videoName
    );

}



/* 
   CONTACT FORM
 */

let contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let name =
                document.getElementById(
                    "contactName"
                ).value;


            let email =
                document.getElementById(
                    "contactEmail"
                ).value;


            let subject =
                document.getElementById(
                    "contactSubject"
                ).value;


            let message =
                document.getElementById(
                    "contactMessage"
                ).value;


            let contactData = {

                name: name,

                email: email,

                subject: subject,

                message: message,

                date:
                    new Date().toLocaleString()

            };


            localStorage.setItem(
                "mediaHubContact",
                JSON.stringify(contactData)
            );


            alert(
                "Thank you! Your message has been submitted successfully."
            );


            contactForm.reset();

        }
    );

}



/* 
   PAGE LOAD
 */

window.addEventListener(
    "DOMContentLoaded",
    function() {


        /* Saved search */

        let savedSearch =
            localStorage.getItem(
                "mediaSearch"
            );


        let newsSearch =
            document.getElementById(
                "newsSearch"
            );


        if (
            newsSearch &&
            savedSearch
        ) {

            newsSearch.value =
                savedSearch;


            filterNews();


            localStorage.removeItem(
                "mediaSearch"
            );

        }


        /* Category from URL */

        let params =
            new URLSearchParams(
                window.location.search
            );


        let category =
            params.get("category");


        let categoryFilter =
            document.getElementById(
                "categoryFilter"
            );


        if (
            category &&
            categoryFilter
        ) {

            categoryFilter.value =
                category;


            filterNews();

        }

    }
);