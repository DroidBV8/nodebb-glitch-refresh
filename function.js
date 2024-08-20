// Glitch effect when refreshing the nodebb home page

$(document).ready(function() {
    var glitchInterval;
    var loaderId = "DAloader";
    var effectDisplayed = false; // Flag to ensure effect is displayed
    
    // Get the height and width of the screen
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // Function to get a random color
    function getRandomColor() {
        var colors = ["#444444ff", "#545454ff", "#636363ff", "#737373ff", "#828282ff", "#929292ff", "#A2A2A2ff", "#B1B1B1ff", "#C1C1C1ff", "#D0D0D0ff", "#E0E0E0ff", "#EFEFEFff", "#FFFFFFff"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to animate the glitch effect
    function animateGlitch() {
        $(".box").each(function() {
            $(this).css({
                left: Math.floor(Math.random() * screenWidth) + "px",
                top: Math.floor(Math.random() * screenHeight) + "px",
                width: Math.floor(Math.random() * 200) + "px",
                height: Math.floor(Math.random() * 5) + "px"
            });
        });
    }

    // Function to clean up loader and stop the animation
    function cleanUpLoader() {
        if (effectDisplayed) {
            console.log("Cleaning up loader");
            clearInterval(glitchInterval);
            $("#" + loaderId).remove();
        }
    }

    // Function to set up the glitch effect
    function setupGlitchEffect() {
        // Create a div to hold the glitch boxes
        var $loader = $("<div>", { id: loaderId });

        // Create the glitch boxes and add them to the loader div
        for (var i = 0; i < 50; i++) {
            var $box = $("<div>", { class: "box" });
            $box.css({
                width: Math.floor(Math.random() * 200) + "px",
                height: Math.floor(Math.random() * 5) + "px",
                left: Math.floor(Math.random() * screenWidth) + "px",
                top: Math.floor(Math.random() * screenHeight) + "px",
                backgroundColor: getRandomColor()
            });
            $loader.append($box);
        }

        // Add the loader div to the page
        $("body").prepend($loader);

        // Start the glitch animation with an interval
        glitchInterval = setInterval(animateGlitch, 100);
    }

    // Set styles when the page is fully loaded
    $(window).on("load", function() {
        setupGlitchEffect();
        
        // Ensure the effect is visible before fading out
        setTimeout(function() {
            effectDisplayed = true;
            $("#" + loaderId).css({
                opacity: 0,
                transition: "opacity 0.75s"
            });

            // Clean up after fade out transition
            setTimeout(cleanUpLoader, 750); // Time must match transition duration
        }, 0); // Immediate effect display
    });

    // Clean up loader on beforeunload and pagehide
    $(window).on("beforeunload pagehide", function() {
        cleanUpLoader();
    });

    // Extra cleanup on unload to handle rapid refreshes
    $(window).on("unload", function() {
        cleanUpLoader();
    });
});
