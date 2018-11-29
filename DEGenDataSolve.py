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

# read in the generated Data
with open("Data/GeneratedData.pkl", "rb") as infile:
    GenData = pkl.load(infile)

# single objective with RMSE fitness function
##############################################
bounds = [(1.0, 10.0), (1.0, 25.0), 
          (0.01, 0.50), (0.0, 0.9), (0.1, 10.0), (1.0, 50.0)]

Ni = 80
C = 2.5
R = 0.7

y0 = [Ni, C, R]
seedNums = np.arange(10, 41)
Sigmas = [0, 0.5, 1.25, 1.50]
time = np.arange(0, 40)
SigDESol = {}

for sig in Sigmas:

    chData = GenData[sig]
    SigDESol[sig] = {}
    print("Working on Salinity: "+str(sig))
    for seedNum in seedNums:

        t1 = timer.clock()
        
        #solutions = DE(fm.FitnessFuncSO, bounds, popsize=100, maxiter=100,
        #               args=(y0, time, chData, False, True))
        solutions = DE(fm.FitnessFuncSO, bounds, popsize=10, maxiter=10,
                       args=(y0, time, chData, False, True))
        t2 = timer.clock()
        SigDESol[sig][seedNum] = solutions
        print("seed "+str(seedNum)+" Completed")
        print("Elapsed Time (seconds): "+str(t2-t1))
    print("~"*60)

with open('SalDESolutions.pkl', 'wb') as outfile:
    pkl.dump(SigDESol, outfile)

