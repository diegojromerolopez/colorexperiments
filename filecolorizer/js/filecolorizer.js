/**
* Gotten from http://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
*/
String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += hex;
    }

    return result
}


/**
* Creates a grayscale color image from a hexadecimal string
*/
function graycolor(canvas_id, hex_checksum, blocks_per_row, debug){
	

	var canvas = document.getElementById(canvas_id);

	var num_of_bytes = hex_checksum.length / 2;

	var rect_size = $("#"+canvas_id).width()/blocks_per_row;

	console.log(hex_checksum);

	var ctx = canvas.getContext('2d');
	var x = 0;
	var y = 0;
	
	// Para cada dos posiciones en la cadena con el resumen en hexadecimal
	for(var i=0; i < hex_checksum.length; i+=2){
		
		// Each blocks_per_row block, we jump to next row
		if(blocks_per_row!=null && i>0 && i%(blocks_per_row*2) == 0){
			x = 0;
			y += rect_size;	
		}		
		
		// Each byte is the concatenation of the next hex characters
		var byte_i = hex_checksum[i] + hex_checksum[i+1];
		
		// Block of gray color
  
		ctx.fillStyle="#"+byte_i+byte_i+byte_i;
		ctx.fillRect(x,y,rect_size,rect_size);
		
		// Debug information
		if(typeof debug != "undefined" && debug){
			ctx.font = "bold 16px Arial";
			ctx.fillStyle="#FF0000";
			ctx.fillText(byte_i, x, y+rect_size/2);
		}
		
		// Prepare x-coordinate for next block
		x += rect_size;
	}
	
}
