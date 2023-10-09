// add delay to the page loading
setTimeout(function() {
    //your code to be executed after 1 second
    let currentPosition = 1; // Mulai dari gambar pertama
    const totalSlides = 2; // Jumlah total gambar

    const slides = document.querySelectorAll(".slide");

    function showSlide(n) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slides[n].style.display = "flex";
    }

    function nextSlide() {
      currentPosition = (currentPosition % totalSlides) + 1;
      showSlide(currentPosition - 1);
    }

    function prevSlide() {
      currentPosition = ((currentPosition - 2 + totalSlides) % totalSlides) + 1;
      showSlide(currentPosition - 1);
    }

    // Initial display
    showSlide(currentPosition - 1);
}, 10000);