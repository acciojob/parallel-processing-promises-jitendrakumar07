const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const downloadButton = document.getElementById("download-images-button");
downloadButton.addEventListener("click", downloadImages);

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
    img.src = url;
  });
}

async function downloadImages() {
  // Display loading spinner
  output.innerHTML = '<div id="loading">Loading...</div>';

  try {
    const imagePromises = images.map((image) => downloadImage(image.url));
    const downloadedImages = await Promise.all(imagePromises);

    document.getElementById('loading').style.display = 'none'; 

    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });
  } catch (error) {
    output.innerHTML = `<div id="error">Error: ${error.message}</div>`;
  }
}
