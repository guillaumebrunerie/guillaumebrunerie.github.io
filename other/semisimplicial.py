#!/usr/bin/python2

# The idea is that for every n we have
#
# X_n : ...
#       (x_{e_i} : X_{k_i} ... x_{e_i^j} ...)
#       ...
#       -> Set
# X_n = ?
#
# where
# * the e_i are all the sequences of 0 and 1 of length (n+1), except the two
#   constant sequences,
# * k_i is the number of ones minus 1 in the sequence e_i (between 0 and n-1),
# * for i fixed, the e_i^j are all the sequences of 0 and 1 of length (n+1),
#   smaller than e_i for the product order (i.e. each bit is smaller than or
#   equal to the corresponding bit in e_i), except e_i and the constantly zero
#   sequence.
#
# For instance
#
# X3 : (x0001 : X0) (x0010 : X0) (x0100 : X0) (x1000 : X0)
#      (x0011 : X1 x0001 x0010) (x0101 : X1 x0001 x0100)
#      (x0110 : X1 x0010 x0100) (x1001 : X1 x0001 x1000)
#      (x1010 : X1 x0010 x1000) (x1100 : X1 x0100 x1000)
#      (x0111 : X2 x0001 x0010 x0100 x0011 x0101 x0110)
#      (x1011 : X2 x0001 x0010 x1000 x0011 x1001 x1010)
#      (x1101 : X2 x0001 x0100 x1000 x0101 x1001 x1100)
#      (x1110 : X2 x0010 x0100 x1000 x0110 x1010 x1100)
#      -> Set
# X3 = {!!}
#
# Moreover, for i fixed the e_i^j's have to be sorted by number of ones
# increasing, and similarly for the e_i's for a given n, and the sorting has to
# be done is a consistent way so that the types of the arguments match (i.e. the
# order of the e_i^j's has to be the same as the order of the e_i's for n = k_i)
#
# Categorically, we can see a e_i as the description of a map to [n] which isn't
# the identity, so they represent the matching object at [n], and the e_i^j are
# the composites of a map followed by e_i, so they represent the matching object
# at the domain of the corresponding e_i.

import sys

def main(n):
    if n < 0:
        raise ValueError
    for i in range(n+1):
        if i == 0:
            print "X0 : Set\nX0 = ?\n"
        else:
            print total(i)
            print "X" + str(i) + " = ?\n"

# Create X_n
def total(n):
    s = "X" + str(n) + " : "

    # Create all lists of 0 and 1 of length n+1
    l = [[]]
    for i in range(n+1):
        l = duplicate01(l)

    count = 0
    tot = 0
    for k in sorted(l, key=sum):
        if tot != sum(k):
            count = 0
        tot = sum(k)
        # For each such list, create the associated argument
        arg = create(k)

        # Indentation
        if tot == 0:
            s += arg
        elif tot == 1:
            count += 1
            if count <= n:
                s += arg + " "
            else:
                s += arg
        elif tot == 2:
            if count == 0 and n > 1:
                s += "\n     " + arg
                if n <= 6:
                    count = 3
                else:
                    count = 4
            else:
                s += " " + arg
            count -= 1
        elif tot == 3:
            if count == 0:
                s += "\n     " + arg
                count = 2
            else:
                s += " " + arg
            count -= 1
        else:
            s += "\n     " + arg

    # Conclusion
    s = s + "-> Set"
    return s

# Duplicate each element of [l] by adding [0] and [1] at the end.
# There is probably a much simpler way to do that.
def duplicate01(l):
    l2 = []
    for k in l:
        k0 = [x for x in k]
        k0.append(0)
        k1 = [x for x in k]
        k1.append(1)
        l2.extend([k0, k1])
    return l2

# Returns the argument associated to the list [l]
def create(l):
    k = sum(l) - 1
    if k == 0:
        return "(x" + stringify(l) + " : X0)"
    if k == -1 or k == len(l) - 1:
        return ""

    # Keep a copy of [l]
    l2 = [x for x in l]
    s = "(x" + stringify(l) + " : X" + str(k) + " "
    length = len(l)
    kk = k
    count = 0

    # Add all the arguments
    for k in sorted(sublists(l), key=sum):
        if sum(k) == 0:
            continue
        if k == l2:
            s = s[:-1] + ")"
            continue
        s = s + "x" + stringify(k)

        # Indentation
        count += 1
        if (kk == 4 and count == 15) or (kk > 4 and count == 16):
            s = s + "\n" + " " * (length + 13)
            if kk > 4:
                count = 0
        else:
            s = s + " "
    return s

# Create all "sublists" of [l]
def sublists(l):
    if len(l) == 0:
        return [[]]
    x = l.pop()
    l2 = sublists(l)
    if x == 0:
        for k in l2:
            k.append(0)
        return l2
    else:
        return duplicate01(l2)

def stringify(l):
    s = ""
    for x in l:
        s = s + str(x)
    return s

# Run it with a sensible default
try:
    main(int(sys.argv[1]) if len(sys.argv) > 1 else 7)
except:
    print "Usage: " + sys.argv[0] + " [n]\nwhere [n] is a number or omitted."
