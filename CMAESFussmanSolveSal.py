#!/anaconda3/bin/env python3
# -*-utf-8-*-
#import platypus.algorithms as alg
from CMAESFussmanSolve import *
import cma
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm

PlotSol = False 
seedNums = np.arange(10, 41)
smoothDataFile = open('Data/rep1smooth.csv', 'r')
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
Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]

# clip the data organize into the the separate salinities
# and normalize the chlorella data to the correct units
Salinities = [3, 16, 35, 45]
#Salinities = [3]
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


time = np.arange(0, 37)

SalCMAESSol = {}
for sal in ChDataDict.keys():
    data = ChDataDict[sal]
    SalCMAESSol[sal] = {}
    for s in seedNums:
        p = GetSol(data, time, y0, s).xbest
        print(p)
        SalCMAESSol[sal][s] = p  


        '''
        genData = inte.odeint(fm.Fussman_Org, y0, time, args=(p,))
        plt.plot(time, data[:,0], 'orange', label="Chlorella (true)")
        plt.plot(time, data[:,1], 'red', label="Rotifer (true)")
        plt.plot(time, genData[:,1], 'blue', label="Chlorella")
        plt.plot(time, genData[:,2], 'green', label="Rotifer")
        plt.legend()
        plt.show()
        '''

with open("SalCMAESSolutions.pkl", "rb") as outFile:
    pkl.dump(SalCMAESSol, outfile)

