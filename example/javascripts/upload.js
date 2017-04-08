
/*eslint-disable */
$('.upload-btn').on('click', () => {
  $('#upload-input').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function () {
  const files = $(this).get(0).files;

  if (files.length > 0) {
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    const formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: 'http://localhost:3000/convert',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success(data) {
        console.log(`upload successful!\n${data}`);
      },
      xhr() {
        // create an XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', (evt) => {
          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            let percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(`${percentComplete}%`);
            $('.progress-bar').width(`${percentComplete}%`);

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }
          }
        }, false);

        return xhr;
      },
    });
  }
});
