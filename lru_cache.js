var LinkedList = require('./linked_list');

function LRUCache(size, callback) {
  this.list = new LinkedList();
  this.hash = {};
  this.size = size;
  this.stored = 0;
  this.callback = callback;
}

LRUCache.prototype = {
  get: function (key) {
    var node = this.hash[key];
    if(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;

      node.prev = this.list.last.prev;
      node.next = this.list.last;
      this.list.last.prev.next = node;
      this.list.last.prev = node;
    } else {
      if(this.size === this.stored) {
        delete this.hash[this.list.first.next.key];
        this.list.shift();
        this.stored--;
      }
      this.list.push(key, this.callback(key));
      this.hash[key] = this.list.last.prev;
      this.stored++;
    }
    return this.list.last.prev.val;
  }
};



function wait(key) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + 1000) {}
  return key * 2;
}

var cache = new LRUCache(4, wait);
console.log(cache.get(2));
console.log(cache.get(3));
console.log(cache.get(4));
console.log(cache.get(3));
console.log(cache.get(8));
console.log(cache.get(9));
console.log(cache.get(16));
console.log(cache.get(3));
console.log(cache.get(3));
console.log(cache.get(2));
