// Glitch effect when refreshing the nodebb home page

$(document).ready(function() {
            // Get the height and width of the screen
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();

            // Number of glitch boxes to create
            var numBoxes = 50;

            // Create a div to hold the glitch boxes
            var $loader = $("<div>", { id: "DAloader" });

            // Create the glitch boxes and add them to the loader div
            for (var i = 0; i < numBoxes; i++) {
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

            // Function to get a random color
            function getRandomColor() {
                var colors = ["#fdc060", "#f9a34c", "#f48478", "#f2789b", "#e578af", "#cb70ad", "#b36aab", "#7c62ab", "#5f69b1", "#4c76bb", "#3883c5", "#1c8ece", "#00a2db"];
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

            // Set glitch animation intervals
            setInterval(animateGlitch, 100);

            // Set styles when page is fully loaded
            $(window).on("load", function() {
                $loader.css({
                    opacity: 0,
                    transition: "opacity 0.75s"
                });
                setTimeout(function() {
                    $loader.remove();
                }, 750); // Adjust the time as needed
            });
        });
