var image = document.getElementById("mainImage");

var imageArr = [
  "img/3.jpg",
  "img/2.jpg",
  "img/1.jpg"
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
