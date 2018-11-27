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

GenOwn = False
PlotResults = False
setSeed = False
seedVal = 10
AlgoToUse = NSGAII 
nameModifier = 'NSGAII'

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

# set the random seed
np.random.seed(seedVal)
rd.seed(seedVal)

if GenOwn:
    # Generate our own data
    ############################################################
    ##3 g/L##
    # bb - m = 0.7 (growth rate)
    # Initial Conditions
    Ni = 80
    C = 2.5
    R = 0.7

    # Parameters
    delta=0.4;	    		#d=dilution rate
    e=0.25;				#e=assimilation efficiency
    m=0.0;   			#m=mortality (same as dilution)
    betaC=3.3;		    	#bc=maximum recuitment rate for Chlorella
    betaR=2.25;	    		#bb=maximum recruitment rate for Brachionus
    Kc=4.3;				#half saturation constant for Chlorella
    Kr=15;				#half saturation constant for Brachionus

    y0 = [Ni, C, R]

    parms = [delta, 
             betaC, Kc,
             e, m, betaR, Kr]

    # d, Ni, betaC, rhoC, Kc, m, betaR, rhoR, Kr, tau, Se, pwr
    GenData = inte.odeint(fm.Fussman_Org, y0, days, args=(parms,))


# multi-objective with RMSE fitness function
##################################################

bounds = [#Real(0.01, 1.0), 
          Real(0.01, 10.0), Real(1.0, 50.0), 
          Real(0.01, 5.0), Real(0.0, 10.0), Real(0.1, 50.0), Real(0.01, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, row)


SolDict = {}
for sal in Salinities:
    print("Working on Salinity: "+str(sal)+"gpL")    
    chData = ChDataDict[sal]
    # define the problem
    fitnessFunc = Problem(6, 2)
    fitnessFunc.types = bounds
    fitnessFunc.function = functools.partial(fm.FittnessFuncMO, 
                                    y0=y0, t=time, data=chData,
                                    RMSE=True)

    algorithm = AlgoToUse(fitnessFunc)
    algorithm.population = 1000

    try:
        algorithm.run(100000)

        obj1 = []
        obj2 = []

        # print the results to the console/add to list
        for r in algorithm.result:
            #print(r.objectives)
            obj1.append(r.objectives[0])
            obj2.append(r.objectives[1])


        # find point closest to the "ideal" point
        obj_dist = []
        for o1, o2 in zip(obj1, obj2):
            obj_dist.append(np.sqrt(o1**2 + o2**2))

        resultPos = np.nanargmin(obj_dist)

        SolDict[sal] = {}
        SolDict[sal]['Best_Solution'] = algorithm.result[resultPos].variables
        SolDict[sal]['End_Solutions'] = algorithm.result
        paretoSet = np.zeros((len(obj1),2))
        paretoSet[:,0] = obj1
        paretoSet[:,1] = obj2
        SolDict[sal]['Pareto_Set'] = paretoSet 
    except ZeroDivisionError:
        SolDict[sal] = 'Divide By Zero'
    if PlotResults:
        ## Plot Results
        # plot the OBjectives for Rotifer and Chlorella
        plt.scatter(obj1, obj2)
        plt.xlabel('Chlorella MSE')
        plt.ylabel('Rotifer MSE')
        plt.show()

        # plot the results for the best solution
        parms = algorithm.result[resultPos].variables
        sol = inte.odeint(fm.Fussman_Org, y0, time, args=(parms,))

        fm.PlotFussmanTest(time, sol[:,1], sol[:,2], chData[:,0], chData[:,1])

with open('BestSolutions'+nameModifier+'.pkl', 'wb') as outfile:
    pkl.dump(SolDict, outfile)
