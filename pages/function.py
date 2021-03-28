# This is a function file for doing backend algorithm


# Djikstra algorithm
def Djikstra(start=(0, 0), end=(g.x_elems - 1, g.y_elems - 1)):
    g.reset(False)
    end = g.grid[end[1]][end[0]]
    # Paths to extend
    openSet = [g.grid[start[1]][start[0]]]
    # already visited / checked / extended
    closedSet = []
    while openSet:
        lowest = 0
        for i in range(len(openSet)):
            if openSet[i].f < openSet[lowest].f:
                lowest = i

        current = openSet[lowest]

        if current == end:
            path = []  # If we ever need it
            tmp = current
            tmp.isPath = True
            path.append(tmp)
            while tmp.camefrom != None:
                path.append(tmp.camefrom)
                tmp = tmp.camefrom
                tmp.isPath = True  # Draw the path
            g.draw()
            display.update()
            print(len(path))
            return

        # Mark the current node as visited / checked
        openSet.remove(current)
        closeSet.append(current)

        # Draw the current node (green) + checked nodes(red)
        current.isCurrent = True
        g.draw()
        current.isCurrent = False
        current.checked = True
        display.update()

        for node in current.neighbours:
            if not node.isWall and not node in closedSet:
                tempG = current.g + 1
                if node in openSet:
                    if tempG < node.g:
                        node.g = tempG
                else:
                    node.g = tempG
                    openSet.append(node)

                node.f = node.g
                node.camefrom = current
        for eve in event.get():
            if eve.type == QUIT:
                sys.exit()
            if eve.type == KEYDOWN:
                if eve.key == K_n:
                    return
    return(None)