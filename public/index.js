/*
 * Add your JavaScript to this file to complete the assignment.
 */

window.UPLOADCARE_PUBLIC_KEY = '0090a8662cb0acacf77d'
 uploadcare.registerTab('preview', uploadcareTabEffects)

 const widget = uploadcare.Widget('[role=uploadcare-uploader]')
 let images = []

 widget.onUploadComplete(function(info) {
   saveImage(info.cdnUrl).then(() => {
     $('#uploadedImage').parent().html('<a href="javascript:refreshPage()"</a>')
     window.location.reload();
   })
 })

 // fetchImages().then(uploadedImages => {
 //   images = uploadedImages
 //
 //   const imageHtml = images.reduce((html, url) => {
 //     const fullUrl = `${url}/-/preview/-/scale_crop/200x200/`
 //
 //     return (
 //       html +
 //       '<div class="col" >' +
 //       '<a href="#" class="d-block mb-4 h-100">' +
 //       `<img class="img-fluid img-thumbnail" src="${fullUrl}">` +
 //       '</a>' +
 //       '</div>'
 //     )
 //   }, '')
 //
 //   $(imageHtml).appendTo('#imagesContainer')
 // })

 // function fetchImages() {
 //     return new Promise(resolve => {
 //         const images = JSON.parse(localStorage.getItem('images') || '[]')
 //         var imagesource = images[images.length - 1];
 //         if (!images) {
 //             alert("Something went wrong with image processing");
 //         } else {
 //             console.log("Starting to process image");
 //             var photoCardTemplate = Handlebars.templates.photoCaption;
 //             var newPhotoCardHTML = photoCardTemplate({
 //                 URL: imagesource,
 //                 Username: "Billy",
 //                 ProfileIcon: "fa fa-user"
 //             });
 //             var photoCardContainer = document.querySelector('#imagesContainer');
 //             photoCardContainer.insertAdjacentHTML('beforeend', newPhotoCardHTML);
 //         };
 //
 //         /*setTimeout(() => resolve(images), 500)*/
 //     })
 // }


 function saveImage(url) {
     return new Promise(resolve => {
         images.push(url)
         localStorage.setItem('images', JSON.stringify(images))

         const imageImport = JSON.parse(localStorage.getItem('images') || '[]')
         var imagesource = imageImport[images.length - 1];

         if (!imagesource) {
             alert("Couldn't get the photo");
         } else {

             var postRequest = new XMLHttpRequest();
             var User = getPersonIdFromURL();
             var requestURL = '/' + User  + '/addPhoto';
             postRequest.open('POST', requestURL);

             var requestBody = JSON.stringify({
                 url: imagesource,
                 userName: User,
                 profileIcon: "fa fa-user",
                 description: "..."
             });

             postRequest.addEventListener('load', function (event) {
                 if (event.target.status === 200) {
                     var photoCaptionTemplate = Handlebars.templates.photoCaption;
                     var newPhotoCardHTML = photoCaptionTemplate({
                         url: imagesource,
                         userName: User,
                         profileIcon: "fa fa-user",
                         description: "..."

                     });
                     var photoCardContainer = document.querySelector('#imagesContainer');
                     photoCardContainer.insertAdjacentHTML('beforeend', newPhotoCardHTML);
                 } else {
                     alert("Error storing photo: " + event.target.response);
                 }
             });
             postRequest.setRequestHeader('Content-Type', 'application/json');
             postRequest.send(requestBody);
             setTimeout(() => resolve(), 500)
         }
     })
    };

 function refreshPage() {
   window.location.href = window.location.href
 }
 var LikeArray = {};
 var LikeButton = document.querySelectorAll('#post-like-button');
 for (i = 0; i < LikeButton.length; i++) {
     j = i;
     LikeButton[i].addEventListener('click', AddEventListeners(i));
 }

 function AddEventListeners(i) {
     return function (event) {
         console.log("clicked the like button");
         var AssociatedImage = event.currentTarget.parentNode.parentNode.parentNode.getElementsByClassName('post-content')[0].getElementsByTagName('img')[0].src;
         console.log("AssociatedImage is " + AssociatedImage);
         var postRequest = new XMLHttpRequest();
         var User = getPersonIdFromURL();
         var requestURL = '/' + User + '/Like';
         postRequest.open('POST', requestURL);
         console.log("LikeArray[" + AssociatedImage + "] is: " + i);
         var requestBody = JSON.stringify({
             userName: User,
             Image: AssociatedImage,
             Number: i
         });
         console.log("Sending post request of " + requestBody);
         postRequest.setRequestHeader('Content-Type', 'application/json');
         postRequest.send(requestBody);
     };
 }

 function getPersonIdFromURL() {
     var path = window.location.pathname;
     var pathParts = path.split('/');
     if (pathParts[1]) {
         return pathParts[1];
     } else {
         return null;
     }
 }

 /* modal interaction */

 //change password modal open part (remove hidden)
 var modal = document.querySelector(".modal");
 var modal_button = document.querySelector("#navbar-profile-button");

 function remove_hidden(){
   document.getElementById("create-profile-modal").classList.remove('hidden');
   document.getElementById("modal-backdrop").classList.remove('hidden');
 }

 modal_button.addEventListener('click', remove_hidden);

 //change password modal close part (rollback hidden option)


 $(document).keydown(function(event) {
  if (event.keyCode == 27) {
    document.getElementById("create-profile-modal").classList.add('hidden');
    document.getElementById("modal-backdrop").classList.add('hidden');
  }
});


$("#post-like-button").click(function(){
$("#post-like-button").css({"color":"red"});
});
