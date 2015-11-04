function LinkedList() {
  this.last = new Node();
  this.first = new Node({ next: this.last });
  this.last.prev = this.first;
}

function Node(options) {
  this.key = options && options.key;
  this.val = options && options.val;
  this.next = options && options.next;
  this.prev = options && options.prev;
}

LinkedList.prototype = {
  push: function (key, val) {
    var node = new Node({ 
      key: key, 
      val: val, 
      prev: this.last.prev, 
      next: this.last 
    });
    this.last.prev.next = node;
    this.last.prev = node;
  },

  shift: function () {
    var node = this.first.next;
    this.first.next = node.next;
    node.next.prev = this.first;
  }
};

module.exports = LinkedList;
