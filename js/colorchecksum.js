

/**
* Creates a grayscale color checksum in a canvas
*/
function graycolor_checksum(canvas_id, hex_checksum, blocks_per_row, debug){
	

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
		if(blocks_per_row!=null && i>0 && i%blocks_per_row == 0){
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

function get_color_block(i, hex_checksum){
	var color_byte = "";
	if(hex_checksum[i] == undefined){
		if(hex_checksum[i+1] == undefined){
			color_byte = "00";
		}else{
			color_byte = hex_checksum[i]+"00";
		}
	}else{
		color_byte = hex_checksum[i] + hex_checksum[i+1];
	}
	
	return color_byte
}


/**
* Creates a color checksum in a canvas
*/
function color_checksum(canvas_id, hex_checksum, blocks_per_row, debug){
	

	var canvas = document.getElementById(canvas_id);

	var num_of_bytes = hex_checksum.length / 2;

	var rect_size = $("#"+canvas_id).width()/blocks_per_row;

	console.log(hex_checksum);

	var ctx = canvas.getContext('2d');
	var x = 0;
	var y = 0;
	
	// First we make a block that says how many chars have the checksum
	var hex_checksum_char_length = (hex_checksum.length).toString(16);
	
	// Zero-padded length of the hex checksum in hexadecimal
	var zero_padded_hex_checksum_char_length = "";
	var num_of_zeros = 6-hex_checksum_char_length.length;
	for(var i=0; i<num_of_zeros; i++){
		zero_padded_hex_checksum_char_length += "0";
	}
	zero_padded_hex_checksum_char_length += hex_checksum_char_length;
	
	// Color block
	ctx.fillStyle = "#"+zero_padded_hex_checksum_char_length;
	ctx.fillRect(x,y,rect_size,rect_size);
	
	// Color that symbolizes the length of the string
	if(typeof debug != "undefined" && debug){
		ctx.font = "bold 16px Arial";
		ctx.fillStyle="#FF0000";
		ctx.fillText(zero_padded_hex_checksum_char_length, x, y+rect_size/2);
	}

	// Prepare x-coordinate for the first real block	
	x = rect_size;

	// Each 6 positions of the string are interpreted as an RGB trio
	for(var i=0; i < hex_checksum.length; i+=6){
		
		// Each blocks_per_row block, we jump to next row
		if(blocks_per_row!=null && i > 1 && (i+1) % blocks_per_row == 0){
			x = 0;
			y += rect_size;	
		}		
		
		// Each byte is the concatenation of the next hex characters
		var byte_r = get_color_block(i, hex_checksum);
		var byte_g = get_color_block(i+2, hex_checksum);
		var byte_b = get_color_block(i+4, hex_checksum);
		
		// Block of color
		ctx.fillStyle = "#"+byte_r + byte_g + byte_b;
		ctx.fillRect(x,y,rect_size,rect_size);
		
		// Debug information
		if(typeof debug != "undefined" && debug){
			ctx.font = "bold 16px Arial";
			ctx.fillStyle="#FF0000";
			ctx.fillText(byte_r+byte_g+byte_b, x, y+rect_size/2);
		}
		
		// Prepare x-coordinate for next block
		x += rect_size;
	}
	
}