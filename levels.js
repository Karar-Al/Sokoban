const level1Layout =
`##########
#P       #
#   O    #
#        #
#        #
#        #
#        #
#   X    #
#        #
##########`

const level2Layout =
`##########
#        #
#   O  P #
#        #
##    ####
#        #
#      X #
#        #
#        #
##########`

const level3Layout =
`##########
#        #
#  OO  P #
#        #
##    ####
#        #
#      X #
#  X     #
#        #
##########`

const levels = [
  new Level(level1Layout, 'Level 1'),
  new Level(level2Layout, 'Level 2'),
  new Level(level3Layout, 'Level 3')
]
