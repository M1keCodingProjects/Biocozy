window.onload =_=> {
    const resetSnowflake = function(snowflake) {
        snowflake.style.setProperty("--size",      `${Math.random() * .25 + .25}rem`);
        snowflake.style.setProperty("--x-coord",   `${Math.random() * 100      }vw` );
        snowflake.style.setProperty("--wobble",    `${Math.random() * 100 - 50 }px` );
        snowflake.style.setProperty("--time",      `${Math.random() * 6.5 + 3.3}s`  );
        snowflake.style.setProperty("--glow-time", `${Math.random() * 6   + 4.8}s`  );
        snowflake.style.setProperty("--delay",     `${Math.random() * 5        }s`  );
        snowflake.style.setProperty("opacity",     `${Math.random() + 0.1      }`   );
    };

    const snowflakes = Array(300);
    for(let i = 0; i < snowflakes.length; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflakes[i] = snowflake;
        resetSnowflake(snowflake);
        document.body.querySelector(".snow-container").appendChild(snowflake);
    }
};