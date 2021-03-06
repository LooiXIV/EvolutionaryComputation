#!/anaconda3/bin/env python3
# -*-utf-8-*-
import os
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
import random as rd
import pickle as pkl 
from scipy.optimize import minimize
from numpy.random import uniform as runi

seedNums = np.arange(10, 41)

os.chdir("Data/")
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

# single objective Gradient Descent with RMSE fitness function
###############################################################
bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

initGuesses = {3:[3.3, 4.3, 0.25, 0.3, 1.0, 15.0],
                16:[3.3, 4.3, 0.25, 0.555, 2.155., 15.0]
                35:[1.0, 4.3, 0.25, 0.2, 2.4, 15.0]
                45:[1.0, 4.3, 0.25, 0.3, 1.0, 15.0]}

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, 37)

SalNMDict = {}
SalLBDict = {}

for sal in Salinities: 
    NMDict = {}
    LBDict = {}
    chData = ChDataDict[sal]
    
    for seedNum in seedNums:

        np.random.seed(seedNum)
        rd.seed(seedNum)
        #initGuess = [runi(bounds[0][0], bounds[0][1]), runi(bounds[1][0], bounds[1][1]), 
        #             runi(bounds[2][0], bounds[2][1]), runi(bounds[3][0], bounds[3][1]), 
        #             runi(bounds[4][0], bounds[4][1]), runi(bounds[5][0], bounds[5][1])]
        initGuess = initGuesses[sal]
        solNM = minimize(fm.FitnessFuncSO, initGuess, method='Nelder-Mead', 
                         bounds=bounds, 
                         args=(y0, time, chData, False, True))

        solLB = minimize(fm.FitnessFuncSO, initGuess, method='L-BFGS-B',
                         bounds=bounds,
                         args=(y0, time, chData, False, True))

        NMDict[seedNum] = solNM
        LBDict[seedNum] = solLB
    SalNMDict[sal] = NMDict
    SalLBDict[sal] = LBDict

with open('GradientBestNM.pkl', 'wb') as outfile:
    pkl.dump(SalNMDict, outfile)

with open('GradientBestLB.pkl', 'wb') as outfile:
    pkl.dump(SalLBDict, outfile)
