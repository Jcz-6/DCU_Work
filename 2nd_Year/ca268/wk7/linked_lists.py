#!/usr/bin/env python3

import sys

class Node(object):

	_index = -1;

	def __init__(self, data):
		Node._index += 1
		self.data = data
		self.next = None
		self.index = Node._index


	def search_for(self, find_this):
		if self.data == find_this:
			return self
		if self.next == None:
			return None
		return self.next.search_for(find_this)
	

def reverse_linked_list(head): # 
									# 
	if not head:					#	explanation at the back of maths copy xdddddd
		return None					#
									#
	
	if head.next == None:
		return head

	new_head = reverse_linked_list(head.next)
	head.next.next = head
	head.next = None
	return new_head


#head = Node(0)
#current = head
#for i in range(2, 101, 2):
#	current.next = Node(i)
#	current = current.next
#	print(current.data)



head = Node("Dublin")
current = head
current.next = Node("Galway")
current = current.next
current.next = Node("Cork")
current = current.next


#dn = head.search_for("Galway")
#if dn:
#	print(dn.data)
#else:
#	print(dn)

rev_list = reverse_linked_list(head)

print(rev_list.data)

