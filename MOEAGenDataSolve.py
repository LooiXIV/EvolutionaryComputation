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

seedVal = 10
AlgosToUse = [NSGAII, SPEA2] 
namesModifier = ['NSGAII', 'SPEA2']

AlgoToUse = NSGAII
nameModifier = 'NSGAII'
# read in the generated Data
with open("Data/GeneratedData.pkl", "rb") as infile:
    GenData = pkl.load(infile)

# multi-objective with RMSE fitness function
##################################################

bounds = [Real(0.01, 10.0), Real(1.0, 50.0), 
          Real(0.01, 5.0), Real(0.0, 10.0), Real(0.1, 50.0), Real(0.01, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
time = np.arange(0, 40)

Sigmas = [0, 0.5, 1.25, 1.50]


#for AlgoToUse, nameModifier in zip(AlgosToUse, namesModifier):

SolDict = {}
for sig in Sigmas:
    print("Sigma = "+str(sig))    
    chData = GenData[sig]
    
    # define the problem
    fitnessFunc = Problem(6, 2)
    fitnessFunc.types = bounds
    fitnessFunc.function = functools.partial(fm.FittnessFuncMO, 
                                    y0=y0, t=time, data=chData,
                                    RMSE=True)

    algorithm = AlgoToUse(fitnessFunc)
    algorithm.population = 1000
    algorithm.run(100000)
    obj1 = []
    obj2 = []

    # reorganize the results to the console/add to list
    for r in algorithm.result:
        obj1.append(r.objectives[0])
        obj2.append(r.objectives[1])

    # find point closest to the "ideal" point
    obj_dist = []
    for o1, o2 in zip(obj1, obj2):
        obj_dist.append(np.sqrt(o1**2 + o2**2))

    resultPos = np.nanargmin(obj_dist)

    SolDict[sig] = {}
    SolDict[sig]['Best_Solution'] = algorithm.result[resultPos].variables
    SolDict[sig]['End_Solutions'] = algorithm.result
    paretoSet = np.zeros((len(obj1),2))
    paretoSet[:,0] = obj1
    paretoSet[:,1] = obj2
    SolDict[sig]['Pareto_Set'] = paretoSet 

with open('Data/BestSolutions'+nameModifier+'GenData2.pkl', 'wb') as outfile:
    pkl.dump(SolDict, outfile)

