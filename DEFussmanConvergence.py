#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
import random as rd
import pickle as pkl
from scipy.optimize import differential_evolution as DE

os.chdir("Data/")

seedNum = 10
seedNums = np.arange(10, 41)
# read in data
smoothDataFile = open('ExpData.csv', 'r')
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

# single objective with RMSE fitness function
##############################################
bounds = [#(0.0,1.0), 
          (1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]
Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, row)

np.random.seed(seedNum)
rd.seed(seedNum)


numIters = [1, 2, 10, 15, 25, 50, 75, 100]
SalDEConverge = {}

for sal in Salinities:
    DEConverge = {} # Temp holding dict
    chData = ChDataDict[sal]
    
    for seedNum in seedNums:
        DEConverge[seedNum] = {}
        for e in numIters:

            solutions = DE(fm.FitnessFuncSO, bounds, maxiter=e, popsize=100,
                           args=(y0, time, chData, False, True))
            DEConverge[seedNum][e] = solutions 

        SalDEConverge[sal] = DEConverge

with open('SalDEConverge.pkl', 'wb') as outfile:
    pkl.dump(SalDEConverge, outfile)

