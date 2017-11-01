var image = document.getElementById("mainImage");

var imageArr = [
  "img/banner3.jpg",
  "img/banner2.jpg",
  "img/banner1.jpg"
];

var imageIndex = 0;

function changeImage() {
  image.setAttribute("src", imageArr[imageIndex]);
  imageIndex++;

  if (imageIndex >= imageArr.length) {
    imageIndex = 0;
  }
}

setInterval(changeImage, 5000);
