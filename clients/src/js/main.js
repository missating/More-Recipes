const image = document.getElementById('mainImage');

const imageArr = [
  'assets/banner3.jpg',
  'assets/banner2.jpg',
  'assets/banner1.jpg'
];

let imageIndex = 0;
/**
 *
 *
 */
function changeImage() {
  image.setAttribute('src', imageArr[imageIndex]);
  imageIndex++;

  if (imageIndex >= imageArr.length) {
    imageIndex = 0;
  }
}

setInterval(changeImage, 5000);
