#!/anaconda3/bin/env python3
# -*-utf-8-*-
#import platypus.algorithms as alg
from s import *
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

bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, 37)

for sal in Salinities:
    data = ChDataDict[sal]
    print(data.shape)
    def constrainedFitness(parms):
        fitness = fm.FitnessFuncSO(parms, y0, time, data, False, True)
        for n,b in enumerate(bounds):
            if parms[n] > b[1]:
                fitness = fitness*(1 + (parms[n] - b[1])/(b[1] - b[0]))
            elif parms[n] < b[0]:
                fitness = fitness*(1 + (b[0] - parms[n])/(b[1] - b[0]))

        return (fitness,)

        
        
    for s in seedNums:
        np.random.seed(s)
        es = cma.CMAEvolutionStrategy([(b[1] - b[0])/2. for b in bounds], 0.5)
        options = cma.CMAOptions()

        with stdout_redirected():
            bestSol = es.optimize(constrainedFitness, iterations=2000).result
        p = bestSol.xbest
        print(p)


        genData = inte.odeint(fm.Fussman_Org, y0, time, args=(p,))
        plt.plot(time, data[:,0], 'orange', label="Chlorella (true)")
        plt.plot(time, data[:,1], 'red', label="Rotifer (true)")
        plt.plot(time, genData[:,0], 'blue', label="Chlorella")
        plt.plot(time, genData[:,1], 'green', label="Rotifer")
        plt.legend()
        plt.show()



