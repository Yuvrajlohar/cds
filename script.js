document.addEventListener('DOMContentLoaded', function () {
    // ======== DATA WITH LINKS =========
    const coursesByCategory = {
        all: [
            { name: "Next.js", link: "nextjs.html" },
            { name: "C with C++", link: "c.html" },
            { name: "WordPress", link: "wordpress.html" },
            { name: "Python", link: "python.html" },
            { name: "DSA and C++", link: "dsa.html" },
            { name: "PHP Core & Advanced", link: "php.html" },
            { name: "Java Core & Advanced", link: "java.html" },
            { name: "Digital Marketing", link: "marketing.html" },
            { name: "Front End (React / Angular)", link: "frontend.html" },
            { name: "Python with Django", link: "django.html" },
            { name: "React Native", link: "reactnative.html" },
            { name: "Video Editing", link: "video.html" },
            { name: "MERN Stack", link: "mern.html" },
            { name: "MEAN Stack", link: "mean.html" },
            { name: "Java Full Stack", link: "javafs.html" },
            { name: "Python Full Stack", link: "pythonfs.html" },
            { name: "Data Analysis", link: "analysis.html" }
        ],
        web: [
            { name: "Next.js", link: "nextjs.html" },
            { name: "WordPress", link: "wordpress.html" },
            { name: "PHP Core & Advanced", link: "php.html" },
            { name: "Front End (React / Angular)", link: "frontend.html" },
            { name: "Python with Django", link: "django.html" },
            { name: "MERN Stack", link: "mern.html" },
            { name: "MEAN Stack", link: "mean.html" },
            { name: "Java Full Stack", link: "javafullstack.html" },
            { name: "Python Full Stack", link: "pythonfullstack.html" }
        ],
        language: [
            { name: "C with C++", link: "c.html" },
            { name: "Python", link: "python.html" },
            { name: "Java Core & Advanced", link: "java.html" },
            { name: "DSA and C++", link: "dsa.html" }
        ],
        app: [
            { name: "React Native", link: "reactnative.html" }
        ],
        ai: [
            { name: "Data Analysis", link: "dataanalysis.html" },
            { name: "Machine Learning", link: "ml.html" }
        ],
        other: [
            { name: "Digital Marketing", link: "marketing.html" },
            { name: "Video Editing", link: "videoediting.html" }
        ]
    };

    const coursesLinkDesktop = document.getElementById('courses-link');
    const dropdownPanel = document.getElementById('dropdown-panel');
    const categoryList = document.getElementById('category-list');
    const courseList = document.getElementById('course-list');
    let dropdownVisible = false;

    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeButton = document.getElementById('close-mobile-nav');
    const mobileNavLinks = mobileNavOverlay ? mobileNavOverlay.querySelectorAll('ul.mobile-nav-page a') : [];
    const mobileCoursesLink = document.getElementById('mobile-courses-link');
    let mobileCoursesDropdown = null;

    function openMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (mobileCoursesDropdown && mobileCoursesDropdown.classList.contains('active')) {
                mobileCoursesDropdown.classList.remove('active');
            }
        }
    }

    if (hamburgerIcon && mobileNavOverlay) {
        hamburgerIcon.addEventListener('click', function () {
            if (mobileNavOverlay.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        if (link.id !== 'mobile-courses-link') {
            link.addEventListener('click', closeMobileMenu);
        }
    });

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function (event) {
            if (event.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // ======== DESKTOP COURSES DROPDOWN =========
    if (coursesLinkDesktop && dropdownPanel) {
        coursesLinkDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownVisible = !dropdownVisible;
            if (dropdownVisible) {
                dropdownPanel.classList.add('show-dropdown');
                coursesLinkDesktop.classList.add('active');
            } else {
                dropdownPanel.classList.remove('show-dropdown');
                coursesLinkDesktop.classList.remove('active');
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (dropdownPanel && coursesLinkDesktop &&
            !dropdownPanel.contains(e.target) && e.target !== coursesLinkDesktop) {
            dropdownPanel.classList.remove('show-dropdown');
            coursesLinkDesktop.classList.remove('active');
            dropdownVisible = false;
        }
    });

    if (categoryList && courseList) {
        const categoryItems = categoryList.querySelectorAll('li');

        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const category = item.getAttribute('data-category');
                const courses = coursesByCategory[category];
                courseList.innerHTML = "";
                if (courses) {
                    courses.forEach(course => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = course.link;
                        a.textContent = course.name;
                        li.appendChild(a);
                        courseList.appendChild(li);
                    });
                }
            });
        });

        if (categoryItems.length > 0) {
            categoryItems[0].dispatchEvent(new Event('mouseenter'));
        }
    }

    // ======== MOBILE DROPDOWN FOR COURSES =========
    if (mobileCoursesLink) {
        const mobileCoursesDropdownHTML = `
            <ul class="mobile-courses-dropdown">
                ${Object.keys(coursesByCategory).map(categoryKey => `
                    <li><a href="#" class="mobile-category-link" data-category="${categoryKey}">${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}</a></li>
                `).join('')}
            </ul>
        `;
        mobileCoursesLink.insertAdjacentHTML('afterend', mobileCoursesDropdownHTML);
        mobileCoursesDropdown = mobileCoursesLink.nextElementSibling;

        mobileCoursesLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (mobileCoursesDropdown) {
                mobileCoursesDropdown.classList.toggle('active');
            }
        });

        if (mobileCoursesDropdown) {
            const mobileCategoryLinks = mobileCoursesDropdown.querySelectorAll('.mobile-category-link');
            mobileCategoryLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const category = e.target.getAttribute('data-category');
                    const courses = coursesByCategory[category];

                    if (courses) {
                        const courseListHTML = `
                            <ul class="mobile-course-links">
                                ${courses.map(c => `<li><a href="${c.link}">${c.name}</a></li>`).join('')}
                            </ul>
                        `;
                        mobileCoursesDropdown.innerHTML = `
                            <li><a href="#" class="back-to-categories">← Back to Categories</a></li>
                            ${courseListHTML}
                        `;

                        const backLink = mobileCoursesDropdown.querySelector('.back-to-categories');
                        backLink.addEventListener('click', function (e) {
                            e.preventDefault();
                            mobileCoursesDropdown.innerHTML = mobileCoursesDropdownHTML;
                            // rebind links
                            mobileCoursesDropdown.querySelectorAll('.mobile-category-link').forEach(l => {
                                l.addEventListener('click', arguments.callee);
                            });
                        });
                    }
                });
            });
        }
    }
});
