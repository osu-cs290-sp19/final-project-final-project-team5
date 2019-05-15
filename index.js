/*
 * Add your JavaScript to this file to complete the assignment.
 */

 window.UPLOADCARE_PUBLIC_KEY = '0090a8662cb0acacf77d'
 uploadcare.registerTab('preview', uploadcareTabEffects)

 const widget = uploadcare.Widget('[role=uploadcare-uploader]')
 let images = []

 widget.onUploadComplete(function(info) {
   saveImage(info.cdnUrl).then(() => {
     $('#uploadedImage').parent().html('<a href="javascript:refreshPage()">Refresh it!</a>')
   })
 })

 fetchImages().then(uploadedImages => {
   images = uploadedImages

   const imageHtml = images.reduce((html, url) => {
     const fullUrl = `${url}/-/preview/-/scale_crop/200x200/`

     return (
       html +
       '<div class="col" >' +
       '<a href="#" class="d-block mb-4 h-100">' +
       `<img class="img-fluid img-thumbnail" src="${fullUrl}">` +
       '</a>' +
       '</div>'
     )
   }, '')

   $(imageHtml).appendTo('#imagesContainer')
 })

 /*function fetchImages() {
   return new Promise(resolve => {
     const images = JSON.parse(localStorage.getItem('images') || '[]')

     setTimeout(() => resolve(images), 500)
   })
 }*/

 function saveImage(url) {
   return new Promise(resolve => {
     images.push(url)
     localStorage.setItem('images', JSON.stringify(images))
     setTimeout(() => resolve(), 500)
   })
 }

 function refreshPage() {
   window.location.href = window.location.href
 }
