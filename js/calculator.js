$(function() {

function Screen() {
  this.current = 0;
  this.buffer = 0;
  this.opcode = 1; // 1: sum; 2: substr; 3: multi; 4: divide; 5: result
  this.error = 0;
  this.print = function(val) {
    if (val != "Error") {
      $("#screen").val(parseFloat(val.toFixed(8)));
    } else {
      $("#screen").val(val);      
    }
  }
  this.clear = function() {
    this.current = 0;
    this.buffer = 0;
    this.opcode = 1;
    this.print(this.current);
    $(":button").prop("disabled", false);
  }  
  this.update = function(val) {
    if (this.current.toString().charAt(0) == "0") {
      this.current = parseInt(val);
    } else {
      this.current = parseInt(this.current.toString() + val);
    }
    this.print(this.current);
  }
  this.doMath = function(opcode) {
    switch (this.opcode) {
      case 1:
        this.buffer += this.current;
        break;
      case 2:
        this.buffer -= this.current;
        break;
      case 3:
        this.buffer *= this.current;
        break;
      case 4:
        if (this.current === 0) {
          this.error = 1;
          break;
        }
        this.buffer /= this.current;
        break;
    }
    this.opcode = opcode;

    if (this.error === 0) {
      this.print(this.buffer);
      this.current = 0;
    } else {
      this.error = 0;
      this.clear();
      this.print("Error");
      $(":button").prop("disabled", true)
      $("#c").prop("disabled", false);
    }
  }

  this.print(this.buffer);
}

screen = new Screen();

$(":button").click(function() {
  if (this.id.charAt(0) == "d") {
    screen.update(this.id.slice(-1));
  }

  if (this.id.charAt(0) == "o") {
    screen.doMath(parseInt(this.id.slice(-1)));
  }

  if (this.id.charAt(0) == "c") {
    screen.clear();
  }
});     
});