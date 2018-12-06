#!/anaconda3/bin/env python3
# -*-utf-8-*-
import numpy as np
import scipy.integrate as inte
import matplotlib.pyplot as plt
import FussmanModel as fm
import random as rd
import pickle as pkl 
from platypus import NSGAII, SPEA2, CMAES, Problem, Real
import functools

smoothPlot = False
plotTest = True
GenOwn = False
PlotResults = False
setSeed = False
seedVal = 10
AlgoToUse = NSGAII 
nameModifier = 'NSGAII'

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


Ni = 80
C = 2.5
R = 0.7
y0 = [Ni, C, R]

# d, Ni, betaC, rhoC, Kc, m, betaR, rhoR, Kr, tau, Se, pwr
bounds = [#Real(0.01, 1.0), 
          Real(0.01, 10.0), Real(1.0, 50.0), 
          Real(0.01, 5.0), Real(0.0, 10.0), Real(0.1, 50.0), Real(0.01, 50.0)]


time = np.arange(0, row)
numEvals = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000]
SalHypVolStor = {}

for sal in Salinities:
    HypVolStor = {}
    print("Working on Salinity: "+str(sal)+"gpL")
    chData = ChDataDict[sal]
    
    for e in numEvals:
        # set the random seed
        np.random.seed(seedVal)
        rd.seed(seedVal)
        # define the problem
        fitnessFunc = Problem(6, 2)
        fitnessFunc.types = bounds
        fitnessFunc.function = functools.partial(fm.FittnessFuncMO, 
                                        y0=y0, t=time, data=chData,
                                        RMSE=True)

        algorithm = AlgoToUse(fitnessFunc)
        algorithm.population = 1000
        try:
            algorithm.run(e)
            
            paretoSet = []
            for r in algorithm.result:
                paretoSet.append([r.objectives[0], r.objectives[1]])
            HypVolStor[e] = paretoSet

            SalHypVolStor[sal] = HypVolStor
        except ZeroDivisionError:
            SalHypoVolStor[sal] = 'Divided By Zero'
        print("Done with e = "+str(e))
        print("~"*100)
# Write Data to Json
with open('ParetoSets'+nameModifier+'.pkl', 'wb') as outfile:
    pkl.dump(SalHypVolStor, outfile)
