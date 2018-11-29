#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
import random as rd
import pickle as pkl
import time as timer
from scipy.optimize import differential_evolution as DE

os.chdir("Data/")
PlotSol = False 
seedNums = np.arange(10, 41)
#seedNums = [10]
# read in smoothed data: rep1
smoothDataFile = open('rep1smooth.csv', 'r')
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

# single objective with RMSE fitness function
##############################################
bounds = [#(0.0,1.0), 
          (1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, 37)

SalDESol = {}

for sal in Salinities:

    chData = ChDataDict[sal]
    SalDESol[sal] = {}
    print("Working on Salinity: "+str(sal))
    for seedNum in seedNums:

        t1 = timer.clock()
        
        solutions = DE(fm.FitnessFuncSO, bounds, popsize=100, maxiter=100,
                       args=(y0, time, chData, False, True))
        t2 = timer.clock()
        SalDESol[sal][seedNum] = solutions
        print("seed "+str(seedNum)+" Completed")
        print("Elapsed Time (seconds): "+str(t2-t1))
        if PlotSol:
            # plot the results for the best solution
            parms = solutions.x
            sol = inte.odeint(fm.Fussman_Org, y0, time, args=(parms,))

            fm.PlotFussmanTest(time, sol[:,1], sol[:,2], chData[:,0], chData[:,1])
    print("~"*60)
print(SalDESol[sal])
with open('SalDESolutions.pkl', 'wb') as outfile:
    pkl.dump(SalDESol, outfile)
