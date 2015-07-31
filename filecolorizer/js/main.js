$(document).ready(function(){
				
	if (window.File && window.FileReader && window.FileList && window.Blob) {
  					// Great success! All the File APIs are supported.
	} else {
  		console.error('The File APIs are not fully supported in this browser.');
  		return false;
	}

	/**
	* Gotten from http://www.html5rocks.com/es/tutorials/file/dndfiles/
	* Handle the file upload
	*/
	function handleFileSelect(evt) {
    	evt.stopPropagation();
    	evt.preventDefault();

    	var files = evt.dataTransfer.files; // FileList object.

		var reader = new FileReader();
		
		reader.onload = function(uploadFileEvent) {
	    	// Data from the file
	    	var fileData = uploadFileEvent.target.result;
	    	// Conversion to hexadecimal
	    	var hexString = fileData.hexEncode();
	    	var size = hexString.length;
	    	console.log(size);
	    	var side_size = Math.ceil(Math.sqrt(size));
	    	console.log(side_size);
	    	$("#grayscale_canvas").prop("width",side_size).prop("height",side_size);
	    	// Show as image
	    	graycolor("grayscale_canvas", hexString, side_size, false);
	    };

    	// files is a FileList of File objects. List some properties.
    	var output = [];
    	for (var i = 0; i<files.length; i++) {
      		var file = files[i];
      		
      		reader.readAsBinaryString(file);
      		
      		var file_name = escape(file.name);
      		var file_type = file.type;
      		var file_size = file.size;
      		var file_content = file.result;
    	}
    	//document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  	}

  	function handleDragOver(evt) {
    	evt.stopPropagation();
    	evt.preventDefault();
    	
    	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  	}

  	// Setup the dnd listeners.
  	var dropZone = document.getElementById('drop_zone');
  	dropZone.addEventListener('dragover', handleDragOver, false);
  	dropZone.addEventListener('drop', handleFileSelect, false);


});