// We are pretending that javascript's `new Array(n)` will give us a static
// array of length n.

function DynamicArray() {
  this.arr = new Array(1);
  this.size = 1;
  this.length = 0;
  this.start = 0;
}

DynamicArray.prototype = {
  get: function (i) {
    return this.arr[(this.start + i) % this.size];
  },

  set: function (i, val) {
    this.arr[(this.start + i) % this.size] = val;
  },

  push: function (val) {
    if(this.length === this.size) {
      this._expand();
    }
    this.set(this.length++, val);
  },

  pop: function () {
    return this.arr[this.length-- - 1];
  },
    
  unshift: function (val) {
    if(this.length === this.size) {
      this._expand();
    }
    this.start = (this.start + this.size - 1) % this.size;
    this.length++;
    this.set(0, val);
  },

  shift: function () {
    var el = this.get(0);
    this.length--;
    this.start = (this.start + 1) % this.size;
    return el;
  },

  _expand: function () {
    this.size = this.size * 2;
    var new_arr = new Array(this.size);
    for(var i = 0; i < this.length; i++) {
      new_arr[i] = this.get(i);
    }
    this.arr = new_arr;
    this.start = 0;
  }
};



var array = new DynamicArray();
for(var i = 0; i < 5; i++) {
  array.push(i * 2);
  console.log(array);
}

console.log(array.get(3));
array.set(3, 33);
console.log(array);

array.push(44);
console.log(array);

array.unshift(8);
console.log(array);

console.log(array.shift());
console.log(array);

console.log(array.pop());
console.log(array);

for(var i = 0; i < array.length; i++) {
  console.log(array.get(i));
}
