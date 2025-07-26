document.addEventListener('DOMContentLoaded', function() {
    // ======== DATA =========
    const coursesByCategory = {
        all: ["Next.js", "C with C++", "WordPress", "Python", "DSA and C++", "PHP Core & Advanced", "Java Core & Advanced", "Digital Marketing", "Front End (React / Angular)", "Python with Django", "React Native", "Video Editing", "MERN Stack", "MEAN Stack", "Java Full Stack", "Python Full Stack", "Data Analysis"],
        web: ["Next.js", "WordPress", "PHP Core & Advanced", "Front End (React / Angular)", "Python with Django", "MERN Stack", "MEAN Stack", "Java Full Stack", "Python Full Stack"],
        language: ["C with C++", "Python", "Java Core & Advanced", "DSA and C++"],
        app: ["React Native"],
        ai:["Data Analysis","Machin learning"],
        other:["Digital Marketing", "Video Editing"]
    };

    // ======== DESKTOP DROPDOWN ELEMENTS =========
    const coursesLinkDesktop = document.getElementById('courses-link');
    const dropdownPanel = document.getElementById('dropdown-panel');
    const categoryList = document.getElementById('category-list');
    const courseList = document.getElementById('course-list');

    let dropdownVisible = false;

    // ======== MOBILE NAVIGATION ELEMENTS =========
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeButton = document.getElementById('close-mobile-nav');
    const mobileNavLinks = mobileNavOverlay ? mobileNavOverlay.querySelectorAll('ul.mobile-nav-page a') : [];
    const mobileCoursesLink = document.getElementById('mobile-courses-link'); // New ID for mobile courses link
    let mobileCoursesDropdown = null; // Will be set dynamically

    // Function to open the mobile menu
    function openMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
        }
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling

            // Also hide the nested mobile courses dropdown if open
            if (mobileCoursesDropdown && mobileCoursesDropdown.classList.contains('active')) {
                mobileCoursesDropdown.classList.remove('active');
            }
        }
    }

    // Event listener for the hamburger icon to TOGGLE the mobile menu
    if (hamburgerIcon && mobileNavOverlay) {
        hamburgerIcon.addEventListener('click', function() {
            if (mobileNavOverlay.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Event listener for closing the mobile menu using the close button
    if (closeButton) {
        closeButton.addEventListener('click', closeMobileMenu);
    }

    // Event listeners for closing the mobile menu when a link is clicked inside the mobile menu
    mobileNavLinks.forEach(link => {
        // Exclude the 'Courses' link from closing the menu immediately
        if (link.id !== 'mobile-courses-link') {
            link.addEventListener('click', closeMobileMenu);
        }
    });

    // Close mobile menu if user clicks directly on the overlay background
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function(event) {
            if (event.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // ======== DESKTOP DROPDOWN LOGIC ========

    // Toggle dropdown on click of desktop Courses link
    if (coursesLinkDesktop && dropdownPanel) {
        coursesLinkDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownVisible = !dropdownVisible;
            if (dropdownVisible) {
                dropdownPanel.classList.add('show-dropdown');
                coursesLinkDesktop.classList.add('active'); // Add active class to link
            } else {
                dropdownPanel.classList.remove('show-dropdown');
                coursesLinkDesktop.classList.remove('active'); // Remove active class from link
            }
        });
    }

    // Hide desktop dropdown on click outside
    document.addEventListener('click', (e) => {
        if (dropdownPanel && coursesLinkDesktop &&
            !dropdownPanel.contains(e.target) && e.target !== coursesLinkDesktop) {
            dropdownPanel.classList.remove('show-dropdown');
            coursesLinkDesktop.classList.remove('active'); // Remove active class
            dropdownVisible = false;
        }
    });

    // Handle hover over category in desktop dropdown
    if (categoryList && courseList) {
        const categoryItems = categoryList.querySelectorAll('li');

        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Remove 'active' class from all categories
                categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active'); // Add 'active' to current category

                // Get course list based on category
                const category = item.getAttribute('data-category');
                const courses = coursesByCategory[category];

                // Clear and insert course items
                courseList.innerHTML = "";
                if (courses) {
                    courses.forEach(course => {
                        const li = document.createElement('li');
                        li.textContent = course;
                        courseList.appendChild(li);
                    });
                }
            });
        });

        // Default load (show web dev courses on initial dropdown open)
        // This will be triggered when the dropdown first becomes visible
        // We'll call it here to ensure the first category is active and its courses are shown
        // if the dropdown is visible initially (though it's display: none by default)
        // Or ensure it runs when the dropdown becomes visible.
        // For now, let's make sure it runs if categories exist.
        if (categoryItems.length > 0) {
            categoryItems[0].dispatchEvent(new Event('mouseenter'));
        }
    }

    // ======== MOBILE COURSES NESTED DROPDOWN LOGIC ========

    // Inject mobile courses dropdown HTML if mobileCoursesLink exists
    if (mobileCoursesLink) {
        const mobileCoursesDropdownHTML = `
            <ul class="mobile-courses-dropdown">
                ${Object.keys(coursesByCategory).map(categoryKey => `
                    <li><a href="#" class="mobile-category-link" data-category="${categoryKey}">${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}</a></li>
                `).join('')}
            </ul>
        `;
        // Insert the dropdown after the "Courses" link in the mobile menu
        mobileCoursesLink.insertAdjacentHTML('afterend', mobileCoursesDropdownHTML);
        mobileCoursesDropdown = mobileCoursesLink.nextElementSibling; // Get the newly created dropdown

        mobileCoursesLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            // Toggle the 'active' class on the mobile courses dropdown
            if (mobileCoursesDropdown) {
                mobileCoursesDropdown.classList.toggle('active');
            }
        });

        // Add event listeners for the sub-category links in the mobile dropdown
        if (mobileCoursesDropdown) {
            const mobileCategoryLinks = mobileCoursesDropdown.querySelectorAll('.mobile-category-link');
            mobileCategoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = e.target.getAttribute('data-category');
                    const courses = coursesByCategory[category];

                    // For mobile, you might want to replace the category list with the actual courses
                    // Or, navigate to a separate page showing courses, or show a simple alert.
                    // For this example, let's just log them or potentially close the menu.
                    console.log(`Clicked on mobile category: ${category}`);
                    console.log('Courses:', courses);
                    // You could close the mobile menu here if a sub-category click means navigation
                    // closeMobileMenu();

                    // Optional: If you want to list courses within the mobile dropdown dynamically
                    // This gets more complex with nested lists. For now, we just log.
                    // A better UX would be to open a new "screen" within the overlay for courses or link to a page.
                });
            });
        }
    }
});