/* Definition for singly-linked list.
 function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
 }
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let faster = (slow = head);
  while (faster && faster.next) {
    faster = faster.next.next;
    slow = slow.next;
  }
  return slow;
};
