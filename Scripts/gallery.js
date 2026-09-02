const galleryContentElement = document.querySelector("#galleryContent");

const galleryImages = [
    {
        src: "Images/pixel_hacker_room.jpg",
        alt: "Cozy Hacker Room",
        caption: "Cozy Lofi Hacker Room (Pixel Art)"
    },
    {
        src: "Images/pixel_cyber_city.jpg",
        alt: "Pixel Cyber City",
        caption: "Cyber Cityscape (Pixel Art)"
    },
    {
        src: "Images/pixel_coder_cat.jpg",
        alt: "BitCoder Cat",
        caption: "BitCoder Companion"
    },
    {
        src: "Images/Nature_Night.png",
        alt: "Midnight Mountains",
        caption: "Midnight Mountains"
    },
    {
        src: "Images/Nature.png",
        alt: "Nature Landscape",
        caption: "Nature Landscape"
    }
];

function loadGalleryContent() {
    if (!galleryContentElement) return;

    galleryContentElement.innerHTML = "";

    galleryImages.forEach((image) => {
        const item = document.createElement("div");
        item.classList.add("gallery_image_container", "clickable");
        item.title = `Click to set as wallpaper: ${image.caption}`;

        const img = document.createElement("img");
        img.classList.add("gallery_image");
        img.src = image.src;
        img.alt = image.alt;

        item.addEventListener("click", () => {
            document.documentElement.style.setProperty("--bg-image", `url("${image.src}")`);
            document.body.style.setProperty("--bg-image", `url("${image.src}")`);
            const desk = document.getElementById("desktop");
            if (desk) desk.style.backgroundImage = `url("${image.src}")`;
            localStorage.setItem("coderOS_custom_wallpaper", image.src);
            if (window.cyberAudio) window.cyberAudio.playWindowOpen();
        });

        galleryContentElement.appendChild(item);
        item.appendChild(img);
    });
}

loadGalleryContent();

// Restore custom wallpaper on load
const savedWall = localStorage.getItem("coderOS_custom_wallpaper");
if (savedWall) {
    document.documentElement.style.setProperty("--bg-image", `url("${savedWall}")`);
    document.body.style.setProperty("--bg-image", `url("${savedWall}")`);
    const desk = document.getElementById("desktop");
    if (desk) desk.style.backgroundImage = `url("${savedWall}")`;
}