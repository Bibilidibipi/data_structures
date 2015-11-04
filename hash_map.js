// Let's pretend javascript doesn't give us objects or dynamic arrays. That is,
// `new Array(n)` gives us a static array of length n.

var LinkedList = require('./linked_list');

// This only accepts integers as keys
function Hash() {
  this.size = 1;
  this.count = 0;
  this.arr = new Array(this.size);
}

Hash.prototype = {
  get: function (key) {
    var list = this.arr[this._hash(key) % this.size];
    if(!list) { return; }
    var node = list.first;
    while(node !== list.last) {
      if(node.key === key) { return node.val; }
      node = node.next;
    }
  },

  set: function (key, val) {
    this._set(key, val, this.arr);
    if(this.count === this.size) { this._expand(); }
  },

  _set: function (key, val, arr) {
    var idx = this._hash(key) % this.size;
    var list = arr[idx];
    if(!list) { 
      list = arr[idx] = new LinkedList();
    } else {
      var node = list.first;
      while(node !== list.last) {
        if(node.key === key) { node.val = val; return; }
        node = node.next;
      }
    }    
    list.push(key, val);  
    this.count++;
  },

  _expand: function () {
    this.size = this.size * 2;
    this.count = 0;
    var new_array = new Array(this.size);
    for(var i = 0; i < this.arr.length; i++) {
      var list = this.arr[i];
      if(!list) { continue; }
      var node = list.first.next;
      while(node !== list.last) {
        this._set(node.key, node.val, new_array);
        node = node.next; 
      }
    }
    this.arr = new_array;
  },

// Not rigourously pseudorandom; just a toy ;)
  _hash: function (n) {
    return Math.floor(((((n * 47) % 26) / 33) % 1) * 472529) % 1000000;
  }
};

var h = new Hash();
console.log(h);

h.set(6, 'hi');
h.set(6, 'bear');
h.set(1, 'bear');
h.set(222, 'grin');
h.set(743, 'toggle');

console.log(h);
console.log(h.get(6));
console.log(h.get(1));
console.log(h.get(222));
console.log(h.get(743));
