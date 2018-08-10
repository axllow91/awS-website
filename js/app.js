(() => {

  const mobileWidth = 680;

  const addMenuBackground = () => {
    const pageWidth = window.innerWidth;

    // get scroll position
    // some 
    const boddyOffset = document.body.scrollTop || document.documentElement.scrollTop;
    const navigation = document.querySelector("header nav");

    // compare widths
    if (pageWidth > mobileWidth) {
      // if page is scrolled add class else remove that class
      boddyOffset > 0 ? navigation.classList.add("aw-nav-fixed") : navigation.classList.remove("aw-nav-fixed");
    }
  }

  const reorderResponsiveMenu = () => {

    const pageWidth = window.innerWidth;
    const navContainer = document.querySelector("header nav .aw-container");
    const navigation = document.querySelector("header nav .aw-navigation");
    const mobileNavigation = document.querySelector("body > .aw-navigation");

    if (pageWidth <= mobileWidth && navigation) {
      document.body.insertAdjacentElement("afterbegin", navigation);
    } else if(pageWidth > mobileWidth && mobileNavigation) {
      navContainer.insertAdjacentElement("beforeend", mobileNavigation);
    }
  }

  const mobileMenuToggle = () => {
    // select toggle button
    const menuToggleButton = document.querySelector(".aw-nav-toggle");

    menuToggleButton.addEventListener("click", () => {
      const mobileNavigation = document.querySelector("body > .aw-navigation");

      // add class toggle 
      mobileNavigation.classList.toggle("aw-navigation-opened");
    });

  }

  const onNaveItemClick = () => {
    const navItemList = document.querySelectorAll(".aw-section-link");
    const navItems = [...navItemList];

    navItems.forEach(item => {
      item.addEventListener("click", event => {
        // prevent default behaviour of this links 
        event.preventDefault();

        const sectionId = event.target.getAttribute("href") || event.target.dataset.href;

        scrollToSection(sectionId);
      })
    })
  }

  const scrollToSection = sectionId => {
    // variable introduced in es6 that you can change after declaration
    // The let statement declares a block scope local variable, optionally initializing it to a value.
    let sectionPosition, sectionOffset; // sectionOffset - initial position
    const navigationHeight = document.querySelector("header nav").offsetHeight;
    const pageWidth = window.innerWidth;

    if (sectionId !== "#") {
      // get position of the section
      sectionOffset = document.querySelector(sectionId).offsetTop;

      // calculate the position: position of the section - navigation bar height
      sectionPosition = pageWidth > mobileWidth ? sectionOffset - navigationHeight : sectionOffset;


    } else {
      sectionPosition = 0;
    }

    window.scrollTo({
      // left is x axe -
      // top is y axe |
      'behavior': 'smooth', // this is not supported by all browser
      'left': 0,
      'top': sectionPosition
    })
  }

  const onTestimonialChange = () => {

    let firstChild, lastChild;

    const previousArrow = document.querySelector("#aw-testimonials-prev");
    const nextArrow = document.querySelector("#aw-testimonials-next");

    const testimonials = document.querySelector(".aw-testimonials ul");

    // add event listeners for the left-right arrows
    document.addEventListener("click", () => {
      if (event.target === previousArrow) {
        // move last child into first position
        lastChild = testimonials.lastElementChild;
        // insert last child just after the begining of the testimonials list
        testimonials.insertAdjacentElement("afterbegin", lastChild);
      } else if (event.target === nextArrow) {
        firstChild = testimonials.firstElementChild;
        testimonials.insertAdjacentElement("beforeend", firstChild);
      }
    })

  }

  const onGalleryImageClick = () => {
    const galleryImageList = document.querySelectorAll("#aw-gallery li");
    const gallertyImages = [...galleryImageList]; // array of images

    gallertyImages.forEach(image => {
      image.addEventListener("click", event => {
        galleryImageOpen(event.target);
      })
    })
  }

  const galleryImageOpen = image => {
    // get the source of the img
    const imageSrc = image.getAttribute("src");

    // open image in full res in another div
    const openedImage = `<div class='aw-backdrop'><img src='${imageSrc}' alt='' />
                         <span class='aw-backdrop-close'>X</span>    
                  </div>`;

    // insert the html 
    document.body.insertAdjacentHTML("beforeend", openedImage);

    galleryImageClose();
  }

  const galleryImageClose = () => {
    const closeButton = document.querySelector(".aw-backdrop-close");

    closeButton.addEventListener("click", () => {
      // get the backdrop element
      const backdrop = document.querySelector(".aw-backdrop");

      // remove backdrop
      backdrop.remove();
    })
  }

  // add event listener to page scroll 
  // make navbar appear or dissapear (no background or have background)
  window.addEventListener("scroll", () => {
    addMenuBackground();
  })

  // event listener for resizing the window
  window.addEventListener("resize", () => {
    reorderResponsiveMenu();
  })

  // calling functions
  mobileMenuToggle();
  reorderResponsiveMenu();
  onNaveItemClick();
  onTestimonialChange();
  onGalleryImageClick();

})();