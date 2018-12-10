#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import pickle as pkl
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import scipy.stats as stats
import FussmanModel as fm
import scipy.integrate as inte

orgEsts = [[3.3, 4.30, 0.25, 0.30, 1.00, 15],
           [3.3, 4.30, 0.25, 0.55, 2.16, 15],
           [3.3, 4.30, 0.25, 0.20, 2.40, 15],
           [3.3, 4.30, 0.25, 0.30, 1.00, 15]]

# Read in the read experimental Data
# read in data
smoothDataFile = open('Data/ExpData.csv', 'r')
next(smoothDataFile)


chData = np.zeros((50,8))
for row, line in enumerate(smoothDataFile):
    line = line.strip('\n')
    rowVals = line.split(',')
    for col, colVal in enumerate(rowVals):
        try:
            chData[row, col] = colVal
        except ValueError:
            chData[row, col] = 'NaN'

days = np.arange(0, row)
numCols = len(chData[1,:])

# clip the data organize into the the separate salinities
# and normalize the chlorella data to the correct units
Salinities = [3, 16, 35, 45]
chlInd = np.arange(0,numCols+1,2)
rotInd = np.arange(1,numCols+1,2)
chData = chData[0:row,:]

ChDataDict = {}
for ind, sal in enumerate(Salinities):
    ChDataDict[sal] = np.zeros((row, 2))
    # Chlorella
    ChDataDict[sal][:,0] = chData[:,chlInd[ind]]/(10000.0)
    # Rotifers
    ChDataDict[sal][:,1] = chData[:,rotInd[ind]]


# amount of time in days to run the simulation
t = np.arange(0, 37)
Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]

# line styles
linestyles = [(0, (3, 5, 1, 5, 1, 5)),
            (0, (3, 1, 1, 1, 1, 1)),
            (0, (1, 1)),
            (0, (5, 1))]

fig, Allaxes = plt.subplots(len(ChDataDict.keys()), 2, figsize=(10, 7))
fig.subplots_adjust(wspace=0, hspace=0,
                    left=0.1, right=0.9, 
                    bottom=0.1, top=0.9)

counter = 0
for est, sig in zip(orgEsts, ChDataDict.keys()):
    data = ChDataDict[sig]

    sol = inte.odeint(fm.Fussman_Org, y0, t, args=(est,))

    # plot the estimates
    Allaxes[counter, 0].plot(t, sol[:,0], color="g")
    ax2 = Allaxes[counter, 0].twinx()
    ax2.plot(t, sol[:,1], color="r")
    
    # plot the data
    Allaxes[counter, 1].plot(t, data[:,0], color="darkblue", linestyle=linestyles[2])
    ax22 = Allaxes[counter, 1].twinx()
    ax22.plot(t, data[:,1], color="darkmagenta", linestyle=linestyles[3])
    counter += 1
plt.show()
    


