#!/anaconda3/bin/env python3
# -*-utf-8-*-

import numpy as np
import matplotlib.pyplot as plt
import scipy.interpolate as inter

normalize = True
smoothing = True
smoothPlot = True
plotRaw = False
# read in chemostat data
chemostatFile = open('ChemostatRep1.csv', 'r')
# skip the first line
next(chemostatFile)

chData = np.zeros((50,8))
for row, line in enumerate(chemostatFile):
    line = line.strip('\n')
    rowVals = line.split(',')
    for col, colVal in enumerate(rowVals):
        try:
            chData[row, col] = colVal
        except ValueError:
            chData[row, col] = 'NaN'

days = np.arange(0, row)
# clip the original data structure
chData = chData[0:row,:]
chDataNorm = np.zeros((len(days),8))

# normalize the data:
if normalize:
    for c in np.arange(0, chData.shape[1]):
        maxval = np.nanmax(chData[:,c])
        chDataNorm[:,c] = chData[:,c]/maxval

# smooth the data
smoothData = np.zeros((len(days),13))
if smoothing:
    for c in np.arange(0, chData.shape[1]):
        # deal with the nans
        splineObj = inter.UnivariateSpline(days, chData[:,c], s=10)
        smoothData[:,c] = splineObj(days)
        print(c, smoothData[:,c]-chData[:,c])
        print('#'*100)

if plotRaw:
    ind = 0
    # plot the original raw data:
    fig, ax = plt.subplots(2,2, figsize=(12,8))
    fig.subplots_adjust(wspace=0.4, hspace=0.2)
    for r in np.arange(0,2):

        for c in np.arange(0,2):
            # Chlorella
            ax[r,c].plot(days, chDataNorm[:,ind], color='green')
            ax[r,c].set_xlabel('Days')
            ax[r,c].set_ylabel('Chlorella Density')
            # Rotifers
            ax2 = ax[r,c].twinx()
            ax2.plot(days, chDataNorm[:,ind+1], color='red')
            ax2.set_ylabel('Rotifer Density')
            ind +=3 

    plt.show()

# plot the smoothed data
if smoothPlot:
    ind = 0
    fig, ax = plt.subplots(2,2, figsize=(12,8))
    fig.subplots_adjust(wspace=0.4, hspace=0.2)
    for r in np.arange(0,2):
        for c in np.arange(0,2):

            # Chlorella
            normData = smoothData[:,ind]/np.max(smoothData[:,ind])
            ax[r,c].plot(days, normData, color='green')
            ax[r,c].set_xlabel('Days')
            ax[r,c].set_ylabel('Chlorella Density')

            # Rotifers
            normData = smoothData[:,ind+1]/np.max(smoothData[:,ind+1])
            ax2 = ax[r,c].twinx()
            ax2.plot(days, normData, color='red')
            ax2.set_ylabel('Rotifer Density')
            ind +=1

    plt.show()
